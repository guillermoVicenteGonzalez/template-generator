# template-generator

A simple project generator that uses public github templates as a boilterplate for javascript projects.

DISCLAIMER: This is a personal project and although everyone is welcome to use it, it still has a long way to go and so do the projects it generates

## Execution

`npx @gvicenteg/project-generator`

## Project Summary

This project uses `inquirer/prompts` to present to the user in a visually appealing way a series of questions meant to generate a new node project based on one of a series of templates stored in github.

This templates will be then cloned using degit (to eliminate any git metadata in the process) and adapt the project to the preferences specified by the user.

## Project structure

The project is (for now) divided into 2 main sections.

The prompts file holds fuctions in charge of asking the user the questions needed to generate the project. This is achieved through the inquierer/prompts library. This file also uses the Themes file to add additional styles.

The generation file defines functions whose purpose is to clone the appropiate templates from their repositories (via degit) and modify the result of that process to adequate the final project to the options specified by the user => Modify dependencies, package.json and config files.

The templates are defined under the templates.ts file and are of type `projectTemplate`. There we define the repository where the template lives and its configuration options such as additional modules or variants of the same template.

Using a `projectTemplate`as well as the information given by the user, the program will generate a `Project` model and will use it to clone the template and eliminate or add any additional dependencies.

## Issues and bad code practices

The types used in this project are a mess and could use some serious revising. Nevertheless, given the small nature of the project this does not pose an inmediate problem but could become an issue in the near future.

Also, Error handling is almost non-existent and could pose another threat to take into account

### Package.json

The package json dependency deletion should be handled as the file deletion is, eg, each dependency has associated scripts to be deleted. Just by using regex the modules will likely be deleted correctly but not the scripts

## Todo

- [ ] Colors
  - [ ] Common color palete
- [ ] Project name color
- [x] More questions
  - [x] Project name
  - [x] package-json options
- [x] Validations
  - [x] Valid path
  - [x] Valid repo format
- [ ] Project generation
  - [x] Conditional generation (options, config files etc)
    - [x] Degit.json (remove license etc)
    - [ ] Subdirectories
    - [x] package.json creation (maintain modules add metadata)
  - [ ] Branch generation?
  - [x] Mark repositories as templates (for github and for this)
- [x] Export to npm
- [ ] Error handling
- [ ] Investigate about licenses
- [ ] Husky
