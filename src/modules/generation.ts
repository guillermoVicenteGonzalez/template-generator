// import { RepoDirection } from "types";
import degit from "degit";
import * as fs from "fs";
import { Project, RepoDirection, templateOptions } from "../types/types";

export async function createProject(project: Project) {
	//genero los ficheros y creo el directorio
	customizeProjectOptions(project.name, project.options);
	cloneTemplate(project.templateRepo, project.name);
	return true;
}

function validateRepoName(name: string) {
	const exp = new RegExp(
		"((git|ssh|http(s)?)|(git@[w.]+))(:(//)?)([w.@:/-~]+)(.git)(/)?"
	);
	return exp.test(name);
}

export async function cloneTemplate(
	direction: RepoDirection,
	projectPath: string = "test"
) {
	if (!validateRepoName(direction)) {
		return false;
	}

	const emitter = degit(direction, {
		cache: true,
		force: true,
		verbose: false,
	});

	// emitter.on("info", info => {
	// 	console.log(info.message);
	// });

	emitter.clone(projectPath).then(() => {
		console.log("done");
	});

	await emitter.clone(projectPath).catch(err => {
		console.log(err);
		return false;
	});

	return true;
}

function getFilesToDelete(options: templateOptions) {
	const files: string[] = [];
	if (!options || !options.eslint)
		files.push(
			"eslint.config.mjs",
			"eslint.config.js",
			"eslint.config.json",
			"eslintrc.js"
		);

	if (!options || !options.vsconfig) files.push(".vscode");

	if (!options || !options.prettier) files.push(".prettierrc.json");

	return files;
}

function customizeProjectOptions(dir: string, options: templateOptions = null) {
	const files = getFilesToDelete(options).map(file => `"${file}"`);
	if (!files || files.length <= 0) return;

	fs.mkdirSync(dir);
	fs.writeFileSync(
		`${dir}/degit.json`,
		`[
	{
	"action":"remove",
	"files":[${files.toString()}]	
	}	
	]`
	);
}
