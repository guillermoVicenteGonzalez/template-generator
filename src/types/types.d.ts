//This should be somewhere
type Choice<Value> = {
	value: Value;
	name?: string;
	description?: string;
	short?: string;
	disabled?: boolean | string;
};

//main model for templates
export interface ProjectTemplate {
	name: string;
	repo: string;
	color?: templateColor;
	options?: templateOption[];
	variants?: { name: string; branch: string; description?: string }[];
	description: string;
}

//a set of templates
export interface templateCollection {
	[key: templateKey]: ProjectTemplate;
}

//a contract between the template model and the choice model for the select input
export interface templateChoice extends Choice<string> {
	name: string;
	value: string;
	description: string;
	options?: templateOptions;
}

//The options that can be enabled to the RESULTING template.
export interface templateOptions {
	eslint?: boolean;
	prettier?: boolean;
	vsconfig?: boolean;
	license?: boolean;
	gitignore?: boolean;
	docker?: boolean;
	blueprints?: boolean;
	storybook?: boolean;
	typescript?: boolean; //branch where ts is used ?
}

export type templateOption = keyof templateOptions;

//an array that can only contain members ot the template options interface
//used to be passed to a select input
// export type SelectableOptions = Array<templateOption>;

/**
 * TYPE ALIASES
 */
type RepoDirection = string;
type templateKey = string;
type templateColor = `#${string}`;

//FINAL MODEL FOR PROJECT GENERATION.
export interface Project {
	name: string;
	templateRepo: RepoDirection;
	options?: templateOptions;
	description: string;
	author: string;
}
