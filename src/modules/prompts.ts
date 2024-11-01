import { checkbox, input, select } from "@inquirer/prompts";
import { SelectableOptions } from "guillermo/types/types";
import { templateManager } from "../templates/templateManager";
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

export async function getProjectModules(options: SelectableOptions) {
	if (!options || options.length == 0) return null;
	const modules = await checkbox({
		message: "select extra dependencies",
		choices: options,
	});

	return modules;
}
