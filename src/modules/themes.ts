import chalk from "chalk";
/**
 *
 * @param text
 * Transforms text color depending on the option selected
 */
function transformText(key: string, text: string) {
	switch (key) {
		case "Vue":
			return chalk.green(text);

		case "7-1-SCSS":
			return chalk.red(text);

		case "React + Vite":
			return chalk.blue(text);

		case "Express":
			return chalk.yellow(text);

		default:
			return chalk.red("no match");
	}
}

export const DefaultTheme = {
	style: {
		answer: (text: string) => transformText(text, `The answer is ${text}`),
	},
};
