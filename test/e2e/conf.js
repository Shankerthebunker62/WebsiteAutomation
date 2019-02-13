/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// protractor config file documentation available
// https://github.com/angular/protractor/blob/master/lib/config.ts

const Path = require('path');

// Project Path location
const projectPath = `/Users/shankerthebunker/git/WebsiteAutomation`;

// binary path location
const ieBinary = (`${projectPath}/test/e2e/resources/binary/IEDriverServer.exe`);
const edgeBinary = (`${projectPath}/test/e2e/resources/binary/MicrosoftWebDriver.exe`);
const operaBinary = (`${projectPath}/test/e2e/resources/binary/operadriver`);
const chromeBinary = (`${projectPath}/test/e2e/resources/binary/chromedriver`);
const firefoxBinary = (`${projectPath}/test/e2e/resources/binary/geckodriver`);

// protractor automation reports BDD html/video/console

// https://www.npmjs.com/package/protractor-beautiful-reporter
let HtmlReporter = require('protractor-beautiful-reporter');
// https://www.npmjs.com/package/protractor-video-reporter
let VideoReporter = require('protractor-video-reporter');
// https://www.npmjs.com/package/jasmine-spec-reporter
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

// Protractor take screenshots on demand makes screenshot in any place where it is needed
// https://www.npmjs.com/package/protractor-take-screenshots-on-demand
let screenshots = require('protractor-take-screenshots-on-demand');

// Profile settings
let profiles = require(projectPath + '/test/e2e/utils/profile/profiles.js');

// HTML Execution Report
let report = require(projectPath + '/test/e2e/utils/report/reportModule.js');

exports.config = {

    /**
     * If true, Protractor will connect directly to the browser Drivers
     * at the locations specified by chromeDriver and firefoxPath. Only Chrome
     * and Firefox are supported for direct connect.
     *
     * default: false
     */
    directConnect: true,
    
    /**
     * The location of the standalone Selenium Server jar file, relative
     * to the location of webdriver-manager. If no other method of starting
     * Selenium Server is found, this will default to
     * node_modules/protractor/node_modules/webdriver-manager/selenium/<jar file>
     */
     // seleniumServerJar: string;

    /**
     * The timeout milliseconds waiting for a local standalone Selenium Server to start.
     *
     * default: 30000ms
     */
     // seleniumServerStartTimeout: number;
    
    /**
     * The address of a running Selenium Server. If specified, Protractor will
     * connect to an already running instance of Selenium. This usually looks like
     * seleniumAddress: 'http://localhost:4444/wd/hub'
     */
     // seleniumAddress: 'http://localhost:4444/wd/hub',
    
    /**
     * Can be an object which will be passed to the SeleniumServer class as args.
     * See a full list of options at
     * https://github.com/SeleniumHQ/selenium/blob/master/javascript/node/selenium-webdriver/remote/index.js
     * If you specify `args` or `port` in this object, it will overwrite the
     * values set via the deprecated config values `seleniumPort` and
     * `seleniumArgs`.
     */
    localSeleniumStandaloneOpts : {
    	  jvmArgs : [`-Dwebdriver.ie.driver=${ieBinary}`, `-Dwebdriver.edge.driver=${edgeBinary}`, `-Dwebdriver.opera.driver=${operaBinary}`, `-Dwebdriver.chrome.driver=${chromeBinary}`, `-Dwebdriver.gecko.driver=${firefoxBinary}`, `-Dwebdriver.safari.noinstall=true`]
    },
    

	/**
	 * How long to wait for a page to load.
	 */
    getPageTimeout: 30,

    /**
     * The timeout in milliseconds for each script run on the browser. This
     * should be longer than the maximum time your application needs to
     * stabilize between tasks.
     */
    allScriptsTimeout: 60000,

    /**
     * The params object will be passed directly to the Protractor instance,
     * and can be accessed from your test as browser.params. It is an arbitrary
     * object and can contain anything you may need in your test.
     */
    params: {
        // Project location path
        dirPath: projectPath,
        
        // Resource location path
        uploadPath: (`${projectPath}/test/e2e/resources/uploads/`),
        downloadPath: (`${projectPath}/test/e2e/resources/downloads/`),
        execFilePath: (`${projectPath}/test/e2e/resources/execFile/`),
        
        // Application under test should be same as 
        // the folder under which script, testData and, uiMap is kept
        appName: 'SuperCalculator',
        
        executionStartTime: new Date(),
        
        mainTestIndex: 0,
        subTestCount: 0,
        
        totalSubTestCount: 0,
        passedSubTestCount: 0,
        failedSubTestCount: 0
    },
    

    /**
     * Required. Spec patterns are relative to the location of this config.
     */
    specs: ['test\e2e\specs\*.js'],

    /**
     * If true, protractor will restart the browser between each test. Default
     * value is false.
     *
     * CAUTION: This will cause your tests to slow down drastically.
     */
    restartBrowserBetweenTests: false,

    /**
     * Enable/disable the WebDriver Control Flow.
     *
     * WebDriverJS (and by extention, Protractor) uses a Control Flow to manage the order in which
     * commands are executed and promises are resolved (see docs/control-flow.md for details).
     * However, as syntax like `async`/`await` are being introduced, WebDriverJS has decided to
     * deprecate the control flow, and have users manage the asynchronous activity themselves
     * (details here: https://github.com/SeleniumHQ/selenium/issues/2969).
     *
     * At the moment, the WebDriver Control Flow is still enabled by default. You can disable it by
     * setting the environment variable `SELENIUM_PROMISE_MANAGER` to `0`.  In a webdriver release in
     * Q4 2017, the Control Flow will be disabled by default, but you will be able to re-enable it by
     * setting `SELENIUM_PROMISE_MANAGER` to `1`.  At a later point, the control flow will be removed
     * for good.
     *
     * If you don't like managing environment variables, you can set this option in your config file,
     * and Protractor will handle enabling/disabling the control flow for you.  Setting this option
     * is higher priority than the `SELENIUM_PROMISE_MANAGER` environment variable.
     *
     * @type {boolean=}
     */
    SELENIUM_PROMISE_MANAGER: true,

    /**
     * If set, Protractor will ignore uncaught exceptions instead of exiting
     * without an error code. The exceptions will still be logged as warnings.
     */
    ignoreUncaughtExceptions: true,

    /**
     * Protractor log level
     *
     * default: INFO
     */
    logLevel: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG',
    
    /**
     * If set, will create a log file in the given directory with a readable log of
     * the webdriver commands it executes.
     *
     * This is an experimental feature. Enabling this will also turn on Blocking Proxy
     * synchronization, which is also experimental.
     */
     // webDriverLogDir: 'browser.log',

    /**
     * If set, protractor will save the test output in json format at this path.
     * The path is relative to the location of this config.
     */
    resultJsonOutputFile: 'console.json',

    /**
     * If set, Protractor will pause the specified amount of time (in milliseconds)
     * before interactions with browser elements (ie, sending keys, clicking). It will
     * also highlight the element it's about to interact with.
     *
     * This is an experimental feature. Enabling this will also turn on Blocking Proxy
     * synchronization, which is also experimental.
     */
     // highlightDelay: 1000,

    /**
     * Test framework to use. This may be one of: jasmine, mocha or custom.
     * Default value is 'jasmine'
     *
     * When the framework is set to "custom" you'll need to additionally
     * set frameworkPath with the path relative to the config file or absolute:
     *
     *   framework: 'custom',
     *   frameworkPath: './frameworks/my_custom_jasmine.js',
     *
     * See github.com/angular/protractor/blob/master/lib/frameworks/README.md
     * to comply with the interface details of your custom implementation.
     *
     * Jasmine is fully supported as test and assertion frameworks.
     * Mocha has limited support. You will need to include your
     * own assertion framework (such as Chai) if working with Mocha.
     */
    framework: 'jasmine2',

    /**
     * Options to be passed to jasmine.
     *
     * See https://github.com/jasmine/jasmine-npm/blob/master/lib/jasmine.js
     * for the exact options available.
     */
    jasmineNodeOpts: {
        showColors: true,

        isVerbose: true,

        includeStackTrace: true,

        defaultTimeoutInterval: 60000,

        realtimeFailure: true,

        print: function() {
            console.log();
        }
    },

    /**
     * Protractor can launch your tests on one or more browsers. If you are
     * testing on a single browser, use the capabilities option. If you are
     * testing on multiple browsers, use the multiCapabilities array.
     *
     * For a list of available capabilities, see
     * https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
     * In addition, you may specify count, shardTestFiles, and maxInstances.
     */
    capabilities: {
        'shardTestFiles': true,
        'maxInstances': 1,

        'browserName': 'chrome',
        'logName': 'Chrome - English',
        'chromeOptions': {
            'args': ['--disable-gpu', 'test-type', 'disable-popup-blocking', 'start-maximized', 'disable-infobars'], // '--headless'
            'prefs': {
                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': projectPath + '/test/e2e/resources/downloads/'
                }
            }
        }
     },
    
    /**
     * A callback function called once configs are read but before any
     * environment setup. This will only run once, and before onPrepare.
     *
     * You can specify a file containing code to run by setting beforeLaunch to
     * the filename string.
     *
     * At this point, global variable 'protractor' object will NOT be set up,
     * and globals from the test framework will NOT be available. The main
     * purpose of this function should be to bring up test dependencies.
     */
    beforeLaunch: function() {
    	report.createSummaryOutput ();
    },

    /**
     * A callback function called once protractor is ready and available, and
     * before the specs are executed. If multiple capabilities are being run,
     * this will run once per capability.
     *
     * You can specify a file containing code to run by setting onPrepare to
     * the filename string. onPrepare can optionally return a promise, which
     * Protractor will wait for before continuing execution. This can be used if
     * the preparation involves any asynchronous calls, e.g. interacting with
     * the browser. Otherwise Protractor cannot guarantee order of execution
     * and may start the tests before preparation finishes.
     *
     * At this point, global variable 'protractor' object will be set up, and
     * globals from the test framework will be available.
     */
     onPrepare: function() {
        VideoReporter.prototype.jasmineStarted = function() {
            var self = this;
            if (self.options.singleVideo) {
                var videoPath = Path.join(Path.normalize('./reports/'), 'protractor-specs-' + (new Date().getTime()) + '.mov');

                self._startScreencast(videoPath);

                if (self.options.createSubtitles) {
                    self._subtitles = [];
                    self._jasmineStartTime = new Date();
                }
            }
         };

        jasmine.getEnv().addReporter(new VideoReporter({
            baseDirectory: Path.normalize('./reports/'),

            singleVideo: true,
            createSubtitles: true,
            saveSuccessVideos: true,

            //ffmpegCmd: Path.normalize('.\\node_modules\\ffmpeg\\bin\\ffmpeg.exe'),    // --> Windows OS
            //ffmpegCmd: Path.normalize('/usr/local/bin/ffmpeg'), 						// --> Unix/Linux OS
            ffmpegArgs: [
                '-y',
                '-r', '30',
                '-f', 'avfoundation',
                '-i', '1',
                '-g', '300',
                '-vcodec', 'mpeg4'
             ]
         }));

         jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: './reports/HtmlReport_' + (new Date().getTime()),

            docTitle: 'Protractor Automation Report',
            docName: 'Automation_Report.html',

            gatherBrowserLogs: true,
            preserveDirectory: false
         }).getJasmine2Reporter());

         jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'all', // display stack-trace for each failed assertion, values: (all|specs|summary|none)
            displaySuccessesSummary: true,
            displayFailuresSummary: true,
            displayPendingSummary: true,
            displaySuccessfulSpec: true,
            displayFailedSpec: true,
            displayPendingSpec: true,
            displaySpecDuration: true,
            displaySuiteNumber: true,

            colors: {
                success: 'green',
                failure: 'red',
                pending: 'yellow'
            },

            prefixes: {
                success: '✓ ',
                failure: '✗ ',
                pending: '* '
            },

            customProcessors: []
         }));
        
         // joiner between browser name and file name
         screenshots.browserNameJoiner = '-'; //this is the default
         // folder of screenshots
         screenshots.screenShotDirectory = 'target/screenshots';
         // creates folder of screenshots
         screenshots.createDirectory();

         browser.waitForAngularEnabled(true); //true for angular, false otherwise.
     },
    
    /**
     * A callback function called once tests are finished. onComplete can
     * optionally return a promise, which Protractor will wait for before
     * shutting down webdriver.
     *
     * At this point, tests will be done but global objects will still be
     * available.
     */
    onComplete: function() {
    	report.finalizeSummaryOutput ();
    }
};