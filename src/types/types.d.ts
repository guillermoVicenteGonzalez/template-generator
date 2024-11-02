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
	typescript?: boolean;
	eslint?: boolean;
	prettier?: boolean;
	vsconfig?: boolean;
	license?: boolean;
	gitignore?: boolean;
	docker?: boolean;
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
	author: string;
}
