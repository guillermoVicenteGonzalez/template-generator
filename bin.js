#! /usr/bin/env node
System.register("modules/generation", ["degit", "fs"], function (exports_1, context_1) {
    "use strict";
    var degit_1, fs;
    var __moduleName = context_1 && context_1.id;
    async function createProject(project) {
        //genero los ficheros y creo el directorio
        await createProjectDir(project.name);
        customizeProjectOptions(project.name, project.options);
        cloneTemplate(project.templateRepo, project.name);
        return true;
    }
    exports_1("createProject", createProject);
    function validateRepoName(name) {
        const exp = new RegExp("((git|ssh|http(s)?)|(git@[w.]+))(:(//)?)([w.@:/-~]+)(.git)(/)?");
        return exp.test(name);
    }
    async function cloneTemplate(direction, projectPath = "test") {
        if (!validateRepoName(direction)) {
            return false;
        }
        const emitter = degit_1.default(direction, {
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
    exports_1("cloneTemplate", cloneTemplate);
    function getFilesToDelete(options) {
        const files = [];
        if (!options || !options.eslint)
            files.push("eslint.config.mjs", "eslint.config.js", "eslint.config.json", "eslintrc.js");
        if (!options || !options.vsconfig)
            files.push(".vscode");
        if (!options || !options.prettier)
            files.push(".prettierrc.json");
        if (!options || !options.license)
            files.push("LICENSE");
        if (!options || !options.gitignore)
            files.push(".gitignore");
        if (!options || !options.gitignore)
            files.push("docker");
        return files;
    }
    function customizeProjectOptions(dir, options = null) {
        const files = getFilesToDelete(options).map(file => `"${file}"`);
        if (!files || files.length <= 0)
            return;
        fs.writeFileSync(`${dir}/degit.json`, `[
	{
	"action":"remove",
	"files":[${files.toString()}]	
	}	
	]`);
    }
    async function createProjectDir(path) {
        if (fs.existsSync(path)) {
            console.log("directory exists. Deleting");
            //check if it is empty
            await deleteDir(path);
        }
        fs.mkdirSync(path);
    }
    async function deleteDir(path) {
        const promise = new Promise((resolve, reject) => {
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
    return {
        setters: [
            function (degit_1_1) {
                degit_1 = degit_1_1;
            },
            function (fs_1) {
                fs = fs_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("templates/templates", [], function (exports_2, context_2) {
    "use strict";
    var templates;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            templates = {
                vue: {
                    name: "Vue + vite",
                    repo: "https://github.com/guillermoVicenteGonzalez/7-1-template.git",
                    color: "#41B883",
                    options: [
                        "eslint",
                        "prettier",
                        "vsconfig",
                        "license",
                        "gitignore",
                        "typescript",
                        "docker",
                    ],
                    description: "A vue + vite project template including typescript, scss and other features",
                },
                "React+Vite": {
                    name: "React + Vite SWC",
                    repo: "https://github.com/guillermoVicenteGonzalez/react-template.git",
                    color: "#61dbfb",
                    options: [
                        "eslint",
                        "prettier",
                        "vsconfig",
                        "license",
                        "gitignore",
                        "typescript",
                        "docker",
                    ],
                    description: "A react + vite + swc project template including typescript scss and others",
                },
                scss: {
                    name: "7-1 + SCSS",
                    repo: "https://github.com/guillermoVicenteGonzalez/7-1-template.git",
                    color: "#cd6799",
                    options: ["vsconfig", "license", "prettier"],
                    description: "A simple project tempalte based on the 7-1 architecture and SCSS features",
                },
                express: {
                    name: "Express js",
                    repo: "repositorio",
                    color: "#f0db4f",
                    options: [
                        "eslint",
                        "prettier",
                        "vsconfig",
                        "license",
                        "gitignore",
                        "typescript",
                        "docker",
                    ],
                    description: "A simple project template for express js using typescript, eslint and prettier",
                },
            };
            exports_2("default", templates);
        }
    };
});
System.register("templates/templateManager", ["chalk", "templates/templates"], function (exports_3, context_3) {
    "use strict";
    var chalk_1, templates_1, TemplateManager, templateManager;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (chalk_1_1) {
                chalk_1 = chalk_1_1;
            },
            function (templates_1_1) {
                templates_1 = templates_1_1;
            }
        ],
        execute: function () {
            TemplateManager = class TemplateManager {
                constructor(templates) {
                    this.templates = templates;
                    this.choices = this.parseChoices(this.templates);
                }
                parseChoices(templates) {
                    const arr = [];
                    for (const key in templates) {
                        arr.push({
                            value: key,
                            name: chalk_1.default.hex(templates[key].color)(templates[key].name),
                            description: chalk_1.default.hex(templates[key].color)(templates[key].description),
                            short: null,
                            disabled: false,
                        });
                    }
                    return arr;
                }
            };
            exports_3("templateManager", templateManager = new TemplateManager(templates_1.default));
        }
    };
});
/**
 *
 * @param text
 * Transforms text color depending on the option selected
 */
System.register("modules/themes", ["@inquirer/prompts", "chalk"], function (exports_4, context_4) {
    "use strict";
    var prompts_1, chalk_2, CURSOR_COLOR, MAIN_COLOR, SelectTheme, InputTheme;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (prompts_1_1) {
                prompts_1 = prompts_1_1;
            },
            function (chalk_2_1) {
                chalk_2 = chalk_2_1;
            }
        ],
        execute: function () {/**
             *
             * @param text
             * Transforms text color depending on the option selected
             */
            CURSOR_COLOR = "#e6e6fa";
            MAIN_COLOR = "#ff0000";
            // function transformText(key: string, text: string) {
            // 	switch (true) {
            // 		case /Vue/g.test(key):
            // 			return chalk.rgb(0, 255, 0).bold(text);
            // 		case /SCSS/g.test(key):
            // 			return chalk.rgb(255, 0, 0)(text);
            // 		case /React/g.test(key):
            // 			return chalk.rgb(0, 0, 255)(text);
            // 		case /Express/g.test(key):
            // 			return chalk.hex("#FFFF00")(text);
            // 		default:
            // 			return chalk.hex("#FF0000").bold(`no match for:${text}`);
            // 	}
            // }
            exports_4("SelectTheme", SelectTheme = {
                style: {
                    answer: (text) => chalk_2.default.hex(MAIN_COLOR)(`Template =>  ${chalk_2.default.bold(text)}`),
                    description: (text) => `${new prompts_1.Separator().separator}\n${chalk_2.default.inverse(text)}`,
                    highlight: (text) => chalk_2.default.hex(CURSOR_COLOR).bold(text),
                },
            });
            exports_4("InputTheme", InputTheme = {
                spinner: {
                    interval: 5,
                },
                defaultAnswer: (text) => chalk_2.default.dim(text),
                answer: (text) => chalk_2.default.hex(MAIN_COLOR)(text),
            });
        }
    };
});
System.register("modules/prompts", ["@inquirer/prompts", "fs", "templates/templateManager", "modules/themes"], function (exports_5, context_5) {
    "use strict";
    var prompts_2, fs, templateManager_1, themes_1;
    var __moduleName = context_5 && context_5.id;
    async function getTemplateSelection() {
        const selection = await prompts_2.select({
            message: "Select the template you want",
            choices: templateManager_1.templateManager.choices,
            default: templateManager_1.templateManager.choices[0],
            loop: true,
            theme: themes_1.SelectTheme,
        });
        return selection;
    }
    exports_5("getTemplateSelection", getTemplateSelection);
    async function getProjectName() {
        const projectName = await prompts_2.input({
            message: "Choose a name for your project",
            theme: themes_1.InputTheme,
            default: "test",
            required: true,
        });
        return projectName;
    }
    exports_5("getProjectName", getProjectName);
    async function getProjectModules(options) {
        if (!options || options.length == 0)
            return null;
        const modules = await prompts_2.checkbox({
            message: "select extra dependencies",
            choices: options,
        });
        return modules;
    }
    exports_5("getProjectModules", getProjectModules);
    async function confirmSelection(selections) {
        const message = `Is the following configuration correct: 
${new prompts_2.Separator().separator}
Template: ${selections.name}
Project name ${selections.name}
Author: ${selections.author}
${selections.options != null
            ? `additional configurations: ${selections.options}`
            : ""}\n`;
        const answer = await prompts_2.confirm({
            default: true,
            message: message,
        });
        return answer;
    }
    exports_5("confirmSelection", confirmSelection);
    async function confirmDeletePreviousContent(path) {
        if (fs.existsSync(path)) {
            if (fs.readdirSync(path).length > 0) {
                const answer = await prompts_2.confirm({
                    message: "A directory with the same name as your project alredy exists. Proceeding would mean its deletion.\nContinue?: ",
                });
                return answer;
            }
        }
        return true;
    }
    exports_5("confirmDeletePreviousContent", confirmDeletePreviousContent);
    return {
        setters: [
            function (prompts_2_1) {
                prompts_2 = prompts_2_1;
            },
            function (fs_2) {
                fs = fs_2;
            },
            function (templateManager_1_1) {
                templateManager_1 = templateManager_1_1;
            },
            function (themes_1_1) {
                themes_1 = themes_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("index", ["modules/generation", "modules/prompts", "templates/templateManager"], function (exports_6, context_6) {
    "use strict";
    var generation_1, prompts_3, templateManager_2;
    var __moduleName = context_6 && context_6.id;
    function generateProjectOptions(modulesList) {
        const projectOptions = {
            eslint: false,
            prettier: false,
            typescript: false,
            vsconfig: false,
        };
        if (!modulesList || modulesList.length <= 0)
            return null;
        modulesList.forEach(item => {
            projectOptions[item] = true;
        });
        return projectOptions;
    }
    async function main() {
        const projectModel = {
            name: "test",
            templateRepo: "none",
            author: "john doe",
        };
        //inquires
        const templateKey = await prompts_3.getTemplateSelection();
        const template = templateManager_2.templateManager.templates[templateKey];
        const projectName = await prompts_3.getProjectName();
        const modules = await prompts_3.getProjectModules(template.options);
        //project object generation
        projectModel.options = generateProjectOptions(modules);
        projectModel.name = projectName;
        projectModel.templateRepo = template.repo;
        //confirmation
        const confirmation = await prompts_3.confirmSelection(projectModel);
        if (!confirmation)
            return;
        const deletePrevious = await prompts_3.confirmDeletePreviousContent(projectModel.name);
        if (!deletePrevious)
            return;
        //project generation
        const result = await generation_1.createProject(projectModel);
        if (result) {
            console.log("project created succesfully");
        }
        else {
            console.log("An error ocurred trying to fetch the project template");
        }
    }
    return {
        setters: [
            function (generation_1_1) {
                generation_1 = generation_1_1;
            },
            function (prompts_3_1) {
                prompts_3 = prompts_3_1;
            },
            function (templateManager_2_1) {
                templateManager_2 = templateManager_2_1;
            }
        ],
        execute: function () {
            main();
        }
    };
});
