// import { RepoDirection } from "types";
import degit from "degit";
import * as fs from "fs";
import { Project, RepoDirection, templateOptions } from "../types/types";

export async function createProject(project: Project) {
	//genero los ficheros y creo el directorio
	await createProjectDir(project.name);
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

	if (!options || !options.license) files.push("LICENSE");

	if (!options || !options.gitignore) files.push(".gitignore");

	if (!options || !options.gitignore) files.push("docker");

	return files;
}

function customizeProjectOptions(dir: string, options: templateOptions = null) {
	const files = getFilesToDelete(options).map(file => `"${file}"`);
	if (!files || files.length <= 0) return;

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

async function createProjectDir(path: string) {
	if (fs.existsSync(path)) {
		console.log("directory exists. Deleting");
		//check if it is empty
		await deleteDir(path);
	}
	fs.mkdirSync(path);
}

async function deleteDir(path: string): Promise<boolean> {
	const promise: Promise<boolean> = new Promise((resolve, reject) => {
		fs.rm(path, { recursive: true, force: true }, err => {
			if (err) {
				reject(err);
				throw err;
			}

			resolve(true);
		});
	});

	return promise;
}
