import { checkbox, input, select } from "@inquirer/prompts";
import { TEMPLATES } from "../templates";
import { DefaultTheme } from "./themes";

export async function getTemplateSelection() {
	const selection = await select({
		message: "Select the template you want",
		choices: TEMPLATES.map(t => t.name),
		default: TEMPLATES[0].name,
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
