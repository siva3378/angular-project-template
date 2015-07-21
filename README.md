Angular Project template with Gulp & Karma-Jasmine configurations
=================================================================

Demo project for AngularJS
How to unit test AngularJS components with jasmine and karma.
Increase productivity using gulp & bower


Developer tools required
---------------------------------
Following software needs to be installed for UI development environment.  
•	Node.js & npm (Node package manager)
•	Git
•	Chrome browser


Step 1: Installing Node & Bower packages locally:
-------------------------------------------------
Once Node & npm is installed in your machine, you can install all other node packages with node console.
1.	start > search and open "Node.js command prompt"
2.	Change the current directory in your console to <project directory>\web\src\main\webapp\dev-files" by using "cd" command
    Eg: > cd "C:\Users\PalaSK\Documents\Accurev Workspaces\cmpl_ormgl_dev_v2\web\src\main\webapp\dev-files"
    
3.	Execute following commands in "Node.js command prompt" to install node packages 
    npm install -g bower gulp rimraf 
    npm install -g karma karma-cli karma-coverage karma-html-reporter karma-chrome-launcher
    npm install

4.	Execute following commands in "Node.js command prompt" to install bower packages
    bower install -save //To install app libraries
    bower install jasmine jasmine-expect jasmine-jquery -save-dev //To install app testing libraries

Step 2: Browser set up for Karma runner:
-----------------------------------------
Karma runner requires an environment variable called "CHROME_BIN" (for Chrome browser). This can be done at the user account level by searching with word "env" in start 
    1.	Start > search "env" > open "Edit environment variable for your account".
    2.	Click on "New" button under "User Variables for ..."
    3.	In Variable name enter : CHROME_BIN
    4.	In Variable value enter : <path to exe file of chrome browser>. 
    Eg: C:\Users\PalaSK\AppData\Local\Google\Chrome\Application\chrome.exe
    5.	Restart your command prompt and enter "%CHROME_BIN%" which should open a chrome browser
    6.	If the above step doesn’t open a chrome browser, please check the path you have provided in environment variables

Step 3: Running javascript unit test cases:
-------------------------------------------
    1.	Open "Node.js command prompt"
    2.	Change current directory to "dev" & generate html templates by using gulp tasks
> gulp html2js
    /* This gulp task specified in dev-files/gulpfile.js which converts all our html templates to javascript templates and push into angular template cache. Whenever you change any html file, you should execute this command or you can watch for changes by executing "gulp html2js-watcher" command in a separate window which always watch for changes in html files, generates and push templates into angular template cache automatically*/

    3.	Run any one of following command
// Below command start karma runner & executes all the test cases. It will not generate any reports
> karma start

// Below command start karma runner & executes all the test cases. It will generate 3 reports
    1.	"html" - generates a html file for all test cases
    2.	"coverage" - generates coverage report 
    3.	"dots" - displays test cases in console     
•	You can find these reports in following directories  
    o	For list of unit tests    : "dev/reports/unit-test/Chrome xx.x.xx.html" 
    o	For coverage report       : "dev/reports/coverage/<latest-folder>/index.html"
> karma start --reporters html,coverage,dots	
 
Step 4: Excluding dev-files in maven build:
-------------------------------------------
npm installs more than 25000 files in "dev-files" directory. When we do maven clean & build, maven tries to put all these node modules inside *.war file, which takes more than 1 hour. So In order to exclude "dev-files" folder insert following plugin in <project directory>\web\pom.xml (inside plugins tag)
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