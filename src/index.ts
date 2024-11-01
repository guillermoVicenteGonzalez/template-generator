import { cloneTemplate } from "./modules/generation";
import {
	getProjectModules,
	getProjectName,
	getTemplateSelection,
} from "./modules/prompts";
import { TEMPLATES } from "./templates";

async function createProject() {
	const templateName = await getTemplateSelection();
	const projectName = await getProjectName();
	const modules = await getProjectModules();
	const templateRepo = TEMPLATES.find(t => t.name == templateName);
	if (templateRepo == null) return false;
	await cloneTemplate(templateRepo.repo, projectName);
}

createProject();
