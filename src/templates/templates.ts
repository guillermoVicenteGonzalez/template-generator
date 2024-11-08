import { templateCollection } from "../types/types";

const templates: templateCollection = {
	vue: {
		name: "Vue + vite",
		repo: "guillermoVicenteGonzalez/vue-template",
		color: "#41B883",
		options: [
			"eslint",
			"prettier",
			"vsconfig",
			"license",
			"gitignore",
			"docker",
			"husky",
		],
		variants: [
			{
				name: "typescript",
				branch: "typescript",
				description: "A template featuring typescript support",
			},
		],
		description:
			"A vue + vite project template including typescript, scss and other features",
	},
	"React+Vite": {
		name: "React + Vite SWC",
		repo: "guillermoVicenteGonzalez/react-template",
		color: "#61dbfb",
		options: [
			"eslint",
			"prettier",
			"vsconfig",
			"license",
			"gitignore",
			"docker",
			"storybook",
			"husky",
		],
		variants: [
			{
				name: "tsx",
				branch: "tsx",
				description: "The project is prepared to use typescript and tsx",
			},
		],
		description:
			"A react + vite + swc project template including typescript scss and others",
	},
	scss: {
		name: "7-1 + SCSS",
		repo: "guillermoVicenteGonzalez/7-1-template.git",
		color: "#cd6799",
		options: ["vsconfig", "license", "prettier", "husky"],
		variants: [
			{
				name: "javascript",
				branch: "js",
				description: "minimal native js setup",
			},
		],
		description:
			"A simple project tempalte based on the 7-1 architecture and SCSS features",
	},
	express: {
		name: "Express js",
		repo: "guillermoVicenteGonzalez/express-template",
		color: "#f0db4f",
		options: [
			"eslint",
			"prettier",
			"vsconfig",
			"license",
			"gitignore",
			"docker",
			"husky",
		],
		variants: [
			{
				name: "typescript",
				branch: "typescript",
				description: "The project is prepared to be used alongside typescript",
			},
		],
		description:
			"A simple project template for express js using typescript, eslint and prettier",
	},
};

export default templates;
