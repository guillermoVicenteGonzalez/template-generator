// import { RepoDirection } from "types";
// // import { RepoDirection } from "types";
import degit from "degit";
import { RepoDirection } from "../types/types";

// export async function cloneTemplate(direction: RepoDirection) {
// 	const emitter = degit(direction, {
// 		cache: true,
// 		force: true,
// 		verbose: false,
// 	});

// 	emitter.on("info", info => {
// 		console.log(info.message);
// 	});

// 	emitter.clone("path/to/dest").then(() => {
// 		console.log("done");
// 	});
// }

function validateRepoName(name: string) {
	const exp = new RegExp(
		"((git|ssh|http(s)?)|(git@[w.]+))(:(//)?)([w.@:/-~]+)(.git)(/)?"
	);
	return exp.test(name);
}

export async function cloneTemplate(
	direction: RepoDirection,
	projectPath: string = "./test/"
) {
	if (!validateRepoName(direction)) {
		return false;
	}

	const emitter = degit(direction, {
		cache: true,
		force: true,
		verbose: false,
	});

	emitter.on("info", info => {
		console.log(info.message);
	});

	emitter.clone(projectPath).then(() => {
		console.log("done");
	});

	return true;
}
