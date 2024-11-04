#!/usr/bin/env node
import {
	createNewPackageJson,
	createProject,
	generateProjectOptions,
} from "./modules/generation";
import {
	confirmDeletePreviousContent,
	confirmSelection,
	getProjectAuthor,
	getProjectDescription,
	getProjectModules,
	getProjectName,
	getTemplateSelection,
} from "./modules/prompts";
import { templateManager } from "./templates/templateManager";
import { type Project } from "./types/types";

async function main() {
	const projectModel: Project = {
		name: "test",
		templateRepo: "none",
		author: "john doe",
		description: "",
	};

	//inquires
	const templateKey = await getTemplateSelection();
	const template = templateManager.templates[templateKey];
	const projectName = await getProjectName();
	const modules = await getProjectModules(template.options);
	const name = await getProjectAuthor();
	const description = await getProjectDescription();

	//project object generation
	projectModel.options = generateProjectOptions(modules, template.options);
	projectModel.name = projectName;
	projectModel.templateRepo = template.repo;
	projectModel.author = name;
	projectModel.description = description;

	//confirmation
	const confirmation = await confirmSelection(projectModel);
	if (!confirmation) return;

	const deletePrevious = await confirmDeletePreviousContent(projectModel.name);
	if (!deletePrevious) return;

	//project generation
	const result = await createProject(projectModel);
	if (result) {
		console.log("project created succesfully");
	} else {
		console.log("An error ocurred trying to fetch the project template");
	}

	//dependency deletion
	// eliminateDependencies(projectModel.options, projectModel.name);
	createNewPackageJson(projectModel);
	return;
}

main();
