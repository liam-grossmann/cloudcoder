# Cloud Coder Website


## Introduction
Contains code for the cloud coder website. Built using

| Component     | Version |
|-------------- | ------- |
| HTML5         |         |
| Angular cli   | 1.0.0   |
| Angular       | 4.4.3   |
| Bootstrap     | 3.3.7   | 
| jQuery        | 3.2.1   |
| d3-ng-service | 1.17    | 
| D3.js         | 1.0     |

See the package.json for all other dependencies.



<br><br>
## Running the Project
* Install the latest version of node js
* NPM install the latest version of Angular CLI
* Issue the following commands
```
c:\> npm install  (install all the required packages)
c:\> ng serve     (compile and run the web server)
```
* Open http://localhost:4200/



<br><br>
## Build and Deploy
Open a command line prompt and type the following commands
```
c:\> ng build --target=production
c:\> powershell -File DeployCloudCoder.ps1
```

When you run the powershell command you will be prompted to logon to Azure. 

NOTE: If the powershell Deploy does not work, you can always do it manually using ftp. See README_FTP.md.



<br><br>
## Shrinkwrap
The project was shrinkwrapped using the following commands
```
c:\> npm prune
c:\> npm shrinkwrap
```



<br><br>
## Web.Config
Please note that the web.config must be copied manually (if it is changed). The web.config fixes two issues
* 404 for woff font files
* redirects for angular components when user select F5.



<br><br>
## To Do
01) Add flip for prices feed https://davidwalsh.name/css-flip

03) https://desandro.github.io/3dtransforms/docs/card-flip.html

Notes: 
I have copied the pluralsight D3 courses on the MAC. See
Documents\Pluralsight\Downloaded
This includes a tutorial on D3 maps and also Mike Bostocks example.

I've also copied some examples.

There are some cool charts on the eu website for GDP etc.
showing per country etc.
you can get all the data.
quite cool.
There are lots of docs from the eu site on energy.
https://ec.europa.eu/energy/en/topics/energy-strategy-and-energy-union/2020-energy-strategy


01) Make the charts render in real time - so that the user sees them drawing
    We've used a curtan which is working but a bit hacky. The background is a off.
    https://bl.ocks.org/phvaillant/53b90038b9c5ac5f6b817a4f63fbc2af

    Second way is to reveal:
    http://big-elephants.com/2014-06/unrolling-line-charts-d3js/

    This one includes a reference to mike bostock.
    https://bost.ocks.org/mike/path/

    Which he calls path transitions.
    Nice.

02) I'd like the range to be + / - 1 so that the chart values are better spaced out.

03) Make the charts update in real time - that would be really cool.

04) Add D3 map example - a whole new example
    Good tutorial.
    http://maptimeboston.github.io/d3-maptime/#/

05) Add Material Design example

06) Add blog. Some good ideas on pluralsight. Static content





<br><br>
## Google Crawl
Google crawl for liamgrossmann.com



<br><br>
## Warnings
Not too sure if this is an issue. Backstrech seems to be working
npm WARN deprecated jquery.backstretch@2.1.15: Please move to the official package name `jquery-backstretch`

The following warnings are not serious and only affect windows. On MAC, this should run cleanly:
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules\chokidar\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

On the MAC we get
npm WARN deprecated jquery.backstretch@2.1.15: Please move to the official package name `jquery-backstretch`
npm WARN prefer global node-gyp@3.6.2 should be installed with -g



