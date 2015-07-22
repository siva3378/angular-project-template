Angular Project template with Gulp & Karma-Jasmine configurations
==================================================
This is ready made project or a project template, which contains app folder structure and mostly used 
 
- app file configuration // for gulp & karma
- package.json // for node
- bower json // for client lib manager
- very useful gulp tasks // like build tasks & others
- karma configuration with reporters 

This file explains how to set-up environment to start work with this project template along with how to execute unit test runner with test-case & coverage reports

Developer tools required
---------------------------------
Following software needs to be installed for UI development with this project template  

- Node.js & npm (Node package manager)
- Git
- Chrome browser


Step 1: Installing Node & Bower packages locally
-------------------------------------------------
Once Node & npm is installed in your machine, you can install all node packages with node console.

1. start > search and open "Node.js command prompt"
2. Change the current directory in your console to <project directory>\web\src\main\webapp\dev" by using "cd" command
    Eg: > cd "C:\Users\UserName\Documents\Workspaces\project_name\web\src\main\webapp\dev"
    
3.	Execute following commands in "Node.js command prompt" to install node packages 

        npm install -g bower gulp rimraf 
        npm install -g karma karma-cli karma-coverage karma-html-reporter karma-chrome-launcher
        npm install

4.	Execute following commands in "Node.js command prompt" to install bower packages

        bower install -save //To install app libraries
        bower install jasmine jasmine-expect jasmine-jquery -save-dev //To install app testing libraries

Step 2: Set up Chrome Browser  for Karma runner
-----------------------------------------
Karma runner requires an environment variable called "CHROME_BIN" (for Chrome browser). This can be done at the user account level by searching with word "env" in start 

1.	Start > search "env" > open "Edit environment variable for your account".
2.	Click on "New" button under "User Variables for ..."
3.	In Variable name enter : CHROME_BIN
4.	In Variable value enter : "path to exe file of chrome browser" Eg: C:\Users\PalaSK\AppData\Local\Google\Chrome\Application\chrome.exe
5.	Restart your command prompt and enter "%CHROME_BIN%" which should open a chrome browser
6.	If the above step doesn’t open a chrome browser, please check the path you have provided in environment variables

Step 3: Few Gulp tasks
-------------------------------
You can execute following commands to perform development tasks

- To compile your sass to css

        gulp styles

- To watch and compile sass to css automatically

        gulp sass-watcher

- To convert all your html templates & push those into angularTemplateCache

        gulp html2js

- To watch your source html templates & converts all & push those into angularTemplateCache

        gulp html2js-watcher

- To compress all css, js files for build

        not implemented yet ;)


Step 4: Running javascript unit test cases
-------------------------------------------
- Open "Node.js command prompt"
- Change current directory to "dev" & generate html templates by using gulp tasks

        gulp html2js

>This gulp task specified in dev/gulpfile.js which converts all your html templates to javascript templates and pushs into angular template cache. Whenever you change any html file, you should execute this command or you can execute a watcher command in a separate window

- Run any one of following command

>Below command start karma runner & executes all the test cases. It will not generate any reports

        karma start

> Below command start karma runner & executes all the test cases. It will generate 3 reports

>1. "html" - generates a html file for all test cases
- "coverage" - generates coverage report 
- "dots" - displays test cases in console
- You can find these reports in following directories  
    - For list of unit tests    : "dev/reports/unit-test/Chrome xx.x.xx.html" 
    - For coverage report       : "dev/reports/coverage/<latest-folder>/index.html"

        karma start --reporters html,coverage,dots	
 
Step 5: Excluding dev-files in maven build:
-------------------------------------------
npm installs more than 30,000 files in "dev" directory. When we do maven clean & build, maven tries to put all these node modules inside *.war file, which takes more than 1 hour. So In order to exclude "dev-files" folder insert following plugin in <project directory>\web\pom.xml (inside plugins tag)

     <plugins>
     <!-- other plugins -->
     <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>2.1</version>
            <configuration>
                <warSourceExcludes>dev/**</warSourceExcludes>
            </configuration>
     </plugin>
     <!-- other plugins -->
     </plugins>

