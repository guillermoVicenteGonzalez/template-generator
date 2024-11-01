export interface ProjectSettingsType {
	name: string;
	template: ProjectTemplate;
}

export interface ProjectTemplate {
	name: string;
	repo: RepoDirection;
}

type RepoDirection = string;
