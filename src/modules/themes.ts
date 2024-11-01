/**
 *
 * @param text
 * Transforms text color depending on the option selected
 */

import { Separator } from "@inquirer/prompts";
import chalk from "chalk";

const CURSOR_COLOR = "#e6e6fa";
const MAIN_COLOR = "#ff0000";
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

export const SelectTheme = {
	style: {
		answer: (text: string) => `Template =>  ${chalk.bold(text)}`,
		description: (text: string) =>
			`${chalk.hex(MAIN_COLOR)(new Separator().separator)}\n${chalk.inverse(
				text
			)}`,
		highlight: (text: string) => chalk.hex(CURSOR_COLOR).bold(text),
	},
};

export const InputTheme = {
	spinner: {
		interval: 5,
	},
	defaultAnswer: (text: string) => chalk.dim(text),
	answer: (text: string) => chalk.hex(MAIN_COLOR)(text),
};
