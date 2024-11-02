import { cloneTemplate } from "./modules/generation";
import {
	confirmSelection,
	getProjectModules,
	getProjectName,
	getTemplateSelection,
} from "./modules/prompts";
import { templateManager } from "./templates/templateManager";
import { type Project } from "./types/types";

async function createProject() {
	const projectModel: Project = {
		name: "test",
		template: "none",
		author: "john doe",
	};

	const templateKey = await getTemplateSelection();
	const template = templateManager.templates[templateKey];
	const projectName = await getProjectName();
	const modules = await getProjectModules(template.options);
	// const templateRepo = TEMPLATES.find(t => t.name == templateName);
	// if (templateRepo == null) return false;

	projectModel.name = projectName;
	if (modules) projectModel.options = modules;
	projectModel.template = templateKey;

	const confirmation = await confirmSelection(projectModel);
	const result = await cloneTemplate(template.repo, projectName);
	if (result) {
		console.log("project created succesfully");
	} else {
		console.log("An error ocurred trying to fetch the project template");
	}
}

createProject();
