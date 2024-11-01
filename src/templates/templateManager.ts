import chalk from "chalk";
import { templateChoice, templateCollection } from "../types/types";
import templates from "./templates";

class TemplateManager {
	templates: templateCollection;
	choices: templateChoice[];

	constructor(templates: templateCollection) {
		this.templates = templates;
		this.choices = this.parseChoices(this.templates);
	}

	parseChoices(templates: templateCollection): templateChoice[] {
		const arr: templateChoice[] = [];
		for (const key in templates) {
			arr.push({
				value: key,
				name: chalk.hex(templates[key].color)(templates[key].name),
				description: templates[key].description,
				short: null,
				disabled: false,
			});
		}

		return arr;
	}
}

export const templateManager = new TemplateManager(templates);
