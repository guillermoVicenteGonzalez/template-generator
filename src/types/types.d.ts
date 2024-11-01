//This should be somewhere
type Choice<Value> = {
	value: Value;
	name?: string;
	description?: string;
	short?: string;
	disabled?: boolean | string;
};

export interface ProjectTemplate {
	name: string;
	repo: string;
	color?: templateColor;
	description: string;
}

export interface templateCollection {
	[key: templateKey]: ProjectTemplate;
}

export interface templateChoice extends Choice<string> {
	name: string;
	value: string;
	description: string;
}

type RepoDirection = string;
type templateKey = string;
type templateColor = `#${string}`;
