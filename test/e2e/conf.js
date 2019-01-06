/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

const Path = require('path');

let HtmlReporter = require('protractor-beautiful-reporter');
let VideoReporter = require('protractor-video-reporter');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
		
		getPageTimeout: 30,
		
		allScriptsTimeout: 60000,
		
		// Only for Google-Chrome &, Morzilla-FireFox
		directConnect: true,
		
		capabilities: {
			'shardTestFiles': true,
			'maxInstances': 1,
			    
			'browserName': 'chrome',
			'logName': 'Chrome - English',
			
			chromeOptions: {
				args: ["--disable-gpu", "test-type", "disable-popup-blocking", "start-maximized", "disable-infobars", "--headless"] // "--headless"
			}
		},
		
		params: {
			// Applitools Eyes api_key to publish my results to dashboard
			// global: variable = value {call it as browser.params.variable}
			API_KEY: '4g99KGsTdYyykThqEva6NdXb9nnw9ZTvi99yIyF8IO107FE110'
		},
		
		onPrepare: function () {
			VideoReporter.prototype.jasmineStarted = function() {
				var self = this;
				if (self.options.singleVideo) {
					var videoPath = Path.join(Path.normalize('./videos/'), 'protractor-specs-' + (new Date()) +'.mov');

					self._startScreencast(videoPath);

					if (self.options.createSubtitles) {
						self._subtitles = [];
						self._jasmineStartTime = new Date();
					}
				}
			};
				    
			jasmine.getEnv().addReporter(new VideoReporter({
			    baseDirectory: Path.normalize('./videos/'),
			    
			    singleVideo: true,
			    createSubtitles: true,
			    saveSuccessVideos: true,
			    
			    //ffmpegCmd: Path.normalize('./node_modules/ffmpeg-binaries/bin/ffmpeg.exe'),  // --> Windows OS
	            //ffmpegCmd: Path.normalize('/usr/local/bin/ffmpeg'), // --> Unix/Linux OS
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
		         baseDirectory: './reports/HtmlReport_' + Date(),
		         
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
			
			browser.driver.manage().window().maximize();
			
			browser.waitForAngularEnabled(true); //true for angular, false otherwise.
		},
		
		specs: ['test\e2e\specs\*.js'],
		
		restartBrowserBetweenTests: false,
		
		SELENIUM_PROMISE_MANAGER: true,
		
		ignoreUncaughtExceptions: true,
		
		logLevel: 'ERROR'|'WARN'|'INFO'|'DEBUG',
		
		resultJsonOutputFile: 'console.json',
		
		//highlightDelay: 1000,
		
		framework: 'jasmine2',
		
		jasmineNodeOpts: {
			showColors: true,
			
			isVerbose: true,
			
			includeStackTrace: true,
			
			defaultTimeoutInterval: 60000,
			
			realtimeFailure: true,
			
			print: function () {
				console.log();
			}
		}
}
