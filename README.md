# Cloud Coder
Cloud Coder website


Steps to run this project
* Install the latest version of node js
* NPM install the latest version of Angular CLI
* Issue the following commands
 - npm install  (install all the required packages)
 - ng serve     (compile and run the web server)
 - Open http://localhost:4200/


The project was built using
* Angular 2
* Angular cli
* Material 2

See the package.json for all other dependencies.

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24.


## Build and Deploy
ng build --target=production
Then deploy to azure using ftp. See README_FTP.md



## To Do
01) Add flip for prices feed https://davidwalsh.name/css-flip
02) Add Google analytics.


## Warnings
Not too sure if this is an issue. Backstrech seems to be working
npm WARN deprecated jquery.backstretch@2.1.15: Please move to the official package name `jquery-backstretch`

The following warnings are not serious and only affect windows. On MAC, this should run cleanly:
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules\chokidar\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
