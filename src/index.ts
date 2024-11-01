import { cloneTemplate } from "./modules/generation";
import {
	getProjectModules,
	getProjectName,
	getTemplateSelection,
} from "./modules/prompts";
import { templateManager } from "./templates/templateManager";

async function createProject() {
	const templateKey = await getTemplateSelection();
	const template = templateManager.templates[templateKey];
	const projectName = await getProjectName();
	const modules = await getProjectModules(template.options);
	// const templateRepo = TEMPLATES.find(t => t.name == templateName);
	// if (templateRepo == null) return false;
	await cloneTemplate(template.repo, projectName);
}

createProject();
