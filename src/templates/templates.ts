import { templateCollection } from "../types/types";

const templates: templateCollection = {
	vue: {
		name: "Vue + vite",
		repo: "https://github.com/guillermoVicenteGonzalez/7-1-template.git",
		color: "#41B883",
		options: ["eslint", "prettier", "vsconfig"],
		description:
			"A vue + vite project template including typescript, scss and other features",
	},
	"React+Vite": {
		name: "React + Vite SWC",
		repo: "Repositorio",
		color: "#61dbfb",
		description:
			"A react + vite + swc project template including typescript scss and others",
	},
	scss: {
		name: "7-1 + SCSS",
		repo: "https://github.com/guillermoVicenteGonzalez/7-1-template.git",
		color: "#cd6799",
		description:
			"A simple project tempalte based on the 7-1 architecture and SCSS features",
	},
	express: {
		name: "Express js",
		repo: "repositorio",
		color: "#f0db4f",
		description:
			"A simple project template for express js using typescript, eslint and prettier",
	},
};

export default templates;
