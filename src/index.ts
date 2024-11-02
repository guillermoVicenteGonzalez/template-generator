import { createProject } from "./modules/generation";
import {
	confirmDeletePreviousContent,
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

	//inquires
	const templateKey = await getTemplateSelection();
	const template = templateManager.templates[templateKey];
	const projectName = await getProjectName();
	const modules = await getProjectModules(template.options);

	//project object generation
	projectModel.options = generateProjectOptions(modules);
	projectModel.name = projectName;
	projectModel.templateRepo = template.repo;

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
}

main();
