/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

const Path = require('path');

var HtmlReporter = require('protractor-beautiful-reporter');
var VideoReporter = require('protractor-video-reporter');

exports.config = {
		
		getPageTimeout: 10,
		
		allScriptsTimeout: 30000,
		
		// Only for Google-Chrome &, Morzilla-FireFox
		directConnect: true,
		
		capabilities: {
			'shardTestFiles': true,
			'maxInstances': 1,
			    
			'browserName': 'chrome',
			'logName': 'Chrome - English',
			
			chromeOptions: {
				args: ["--disable-gpu", "test-type", "disable-popup-blocking", "start-maximized", "disable-infobars"]
			}
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
			    
			    //ffmpegCmd: Path.normalize('./node_modules/ffmpeg-binaries/bin/ffmpeg.exe'),   --> Windows OS
	            //ffmpegCmd: Path.normalize('/usr/local/bin/ffmpeg'), --> Unix/Linux OS
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
			
			browser.driver.manage().window().maximize();
			
			browser.waitForAngularEnabled(true); //true for angular, false otherwise.
		},
		
		specs: ['test\e2e\specs\*.js'],
		
		resultJsonOutputFile: 'console.json',
		
		restartBrowserBetweenTests: false,
		
		framework: 'jasmine2',
		
		jasmineNodeOpts: {
			showColors: true,
			
			isVerbose: true,
			
			includeStackTrace: true,
			
			defaultTimeoutInterval: 30000,
			
			print: function () {
				console.log();
			}
		}
}