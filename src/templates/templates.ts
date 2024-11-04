import { templateCollection } from "../types/types";

const templates: templateCollection = {
	vue: {
		name: "Vue + vite",
		repo: "https://github.com/guillermoVicenteGonzalez/7-1-template.git",
		color: "#41B883",
		options: [
			"eslint",
			"prettier",
			"vsconfig",
			"license",
			"gitignore",
			"typescript",
			"docker",
		],
		description:
			"A vue + vite project template including typescript, scss and other features",
	},
	"React+Vite": {
		name: "React + Vite SWC",
		repo: "guillermoVicenteGonzalez/react-template#main",
		color: "#61dbfb",
		options: [
			"eslint",
			"prettier",
			"vsconfig",
			"license",
			"gitignore",
			"typescript",
			"docker",
			"storybook",
		],
		description:
			"A react + vite + swc project template including typescript scss and others",
	},
	scss: {
		name: "7-1 + SCSS",
		repo: "https://github.com/guillermoVicenteGonzalez/7-1-template.git#main",
		color: "#cd6799",
		options: ["vsconfig", "license", "prettier"],
		description:
			"A simple project tempalte based on the 7-1 architecture and SCSS features",
	},
	express: {
		name: "Express js",
		repo: "guillermoVicenteGonzalez/7-1-template#main",
		color: "#f0db4f",
		options: [
			"eslint",
			"prettier",
			"vsconfig",
			"license",
			"gitignore",
			"typescript",
			"docker",
		],
		description:
			"A simple project template for express js using typescript, eslint and prettier",
	},
};

export default templates;
