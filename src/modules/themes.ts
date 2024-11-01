/**
 *
 * @param text
 * Transforms text color depending on the option selected
 */

import { Separator } from "@inquirer/prompts";
import chalk from "chalk";

// function transformText(key: string, text: string) {
// 	switch (true) {
// 		case /Vue/g.test(key):
// 			return chalk.rgb(0, 255, 0).bold(text);

// 		case /SCSS/g.test(key):
// 			return chalk.rgb(255, 0, 0)(text);

// 		case /React/g.test(key):
// 			return chalk.rgb(0, 0, 255)(text);

// 		case /Express/g.test(key):
// 			return chalk.hex("#FFFF00")(text);

// 		default:
// 			return chalk.hex("#FF0000").bold(`no match for:${text}`);
// 	}
// }

export const DefaultTheme = {
	style: {
		answer: (text: string) => `Template =>  ${chalk.bold(text)}`,
		description: (text: string) => `${new Separator().separator}\n${text}`,
		highlight: (text: string) => chalk.inverse(text),
	},
};
