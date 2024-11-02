import { createProject } from "./modules/generation";
import {
	confirmSelection,
	getProjectModules,
	getProjectName,
	getTemplateSelection,
} from "./modules/prompts";
import { templateManager } from "./templates/templateManager";
import { templateOption, templateOptions, type Project } from "./types/types";

function generateProjectOptions(
	modulesList: templateOption[]
): templateOptions {
	const projectOptions: templateOptions = {
		eslint: false,
		prettier: false,
		typescript: false,
		vsconfig: false,
	};

	if (!modulesList || modulesList.length <= 0) return null;
	modulesList.forEach(item => {
		projectOptions[item] = true;
	});

	return projectOptions;
}

async function main() {
	const projectModel: Project = {
		name: "test",
		templateRepo: "none",
		author: "john doe",
	};

	const templateKey = await getTemplateSelection();
	const template = templateManager.templates[templateKey];
	const projectName = await getProjectName();
	const modules = await getProjectModules(template.options);
	// const templateRepo = TEMPLATES.find(t => t.name == templateName);
	// if (templateRepo == null) return false;

	projectModel.options = generateProjectOptions(modules);

	projectModel.name = projectName;
	projectModel.templateRepo = template.repo;

	const confirmation = await confirmSelection(projectModel);
	// const result = await cloneTemplate(template.repo, projectName);
	const result = await createProject(projectModel);
	if (result) {
		console.log("project created succesfully");
	} else {
		console.log("An error ocurred trying to fetch the project template");
	}
}

main();
