import { input, select } from "@inquirer/prompts";
import { cloneTemplate } from "./modules/generation";
import { TEMPLATES } from "./templates";

async function getTemplateSelection() {
	const selection = await select({
		message: "Select the template you want",
		choices: TEMPLATES.map(t => t.name),
	});

	return selection;
}

async function createProject() {
	const templateName = await getTemplateSelection();
	const projectName = await input({
		message: "Choose a name for your project",
	});
	const templateRepo = TEMPLATES.find(t => t.name == templateName);
	if (templateRepo == null) return false;
	await cloneTemplate(templateRepo.repo, projectName);
}

createProject();
