import { checkbox, input, select } from "@inquirer/prompts";
import { templateManager } from "../templates/templateManager";
import { DefaultTheme } from "./themes";

export async function getTemplateSelection() {
	const selection = await select({
		message: "Select the template you want",
		choices: templateManager.choices,
		default: templateManager.choices[0],
		loop: true,
		theme: DefaultTheme,
	});

	return selection;
}

export async function getProjectName() {
	const projectName = await input({
		message: "Choose a name for your project",
	});

	return projectName;
}

export async function getProjectModules() {
	const modules = await checkbox({
		message: "select extra dependencies",
		choices: ["tsconfig", "eslint", "prettier"],
	});

	return modules;
}
