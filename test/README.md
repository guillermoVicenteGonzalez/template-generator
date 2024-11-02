# 7-1-template

a 7-1 architecture project template meant to be used by project generators

## Description

This is a simple template project that implements the 7-1 Css pattern along with SCSS and a simple pipeline to generate a css file as simple and native as possible to remove clutter, enforce cleanness and simplicity and be as performant as possible. It is however not meant for big or even middle-sized projects and does not have js in mind although it is prepared to be easily extended to include it.

### 7-1 Pattern

The 7-1 Pattern is an architectural blueprint based on divding css code into partials. The name means that there should be 7 folders (each with its own purpose) holding partial css code and 1 main file at the root level that only imports all the partials together

### Features

- mixins

### Pipeline

## Commands

`npm run start` - compiles sass in watch mode and launches live-server
`npm run build:css` - compiles scss code and transforms the resulting css
`npm run build` - Creates a dist folder and only copies the needed html, css and js

## Using icon fonts

The concat package can be used to concatenate icon fonts. The script would look like this

`"concat:css": "concat -o css/style.concat.css css/icon-fonts.css css/style.comp.css",`

And the final css build like this

`"build:css": "npm-run-all compile:sass concat:css prefix:css compress:css"`

Be careful as the input of the prefix:css script should be changed to the result of the concat one

## Using javascript

This template does not focus on javascript functionality, just on implementing as cleanly and "clutter free" as possible the 7-1 Architecture with SCSS. However, it alredy has the mechanism in place to build a javascript deployment pipeline. The pipeline as well as the js architecture to use depends completely on the preferences of the programmer using this template.
