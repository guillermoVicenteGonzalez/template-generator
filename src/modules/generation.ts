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

export function test() {
	return "buenos dias";
}

export async function cloneTemplate(
	direction: RepoDirection,
	projectPath: string = "./test/"
) {
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
}
