import { checkbox, confirm, input, select, Separator } from "@inquirer/prompts";
import * as fs from "fs";
import { templateManager } from "../templates/templateManager";
import { Project, templateOption } from "../types/types";
import { InputTheme, SelectTheme } from "./themes";

export async function getTemplateSelection() {
	const selection = await select({
		message: "Select the template you want",
		choices: templateManager.choices,
		default: templateManager.choices[0],
		loop: true,
		theme: SelectTheme,
	});

	return selection;
}

export async function getProjectName() {
	const projectName = await input({
		message: "Choose a name for your project",
		theme: InputTheme,
		default: "test",
		required: true,
	});

	return projectName;
}

export async function getProjectModules(options: templateOption[]) {
	if (!options || options.length == 0) return null;
	const modules: templateOption[] = await checkbox({
		message: "select extra dependencies",
		choices: options,
	});

	return modules;
}

export async function getProjectAuthor() {
	return await input({ message: "Author: " });
}

export async function getProjectDescription() {
	return await input({ message: "Write a small Project description" });
}

export async function confirmSelection(selections: Project) {
	let selectedModules: templateOption[] = [];
	for (const key in selections.options) {
		if (selections.options[key] == true) {
			selectedModules.push(key as templateOption);
		}
	}

	const message = `Is the following configuration correct: 
${new Separator().separator}
Template: ${selections.name}
Project name ${selections.name}
Author: ${selections.author}
${
	selections.options != null
		? `additional configurations: ${selectedModules}`
		: ""
}\n`;

	const answer = await confirm({
		default: true,
		message: message,
	});

	return answer;
}

export async function confirmDeletePreviousContent(path: string) {
	if (fs.existsSync(path)) {
		if (fs.readdirSync(path).length > 0) {
			const answer = await confirm({
				message:
					"A directory with the same name as your project alredy exists. Proceeding would mean its deletion.\nContinue?: ",
			});

			return answer;
		}
	}

	return true;
}
