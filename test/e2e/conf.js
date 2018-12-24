const Path = require('path');

var HtmlReporter = require('protractor-beautiful-reporter');
var VideoReporter = require('protractor-video-reporter');

exports.config = {
		getPageTimeout: 10,
		
		allScriptsTimeout: 30000,
		
		directConnect: true,
		
		capabilities: {
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
					var videoPath = Path.join(Path.normalize('./videos/'), 'protractor-specs.mov');

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
			    
			    //ffmpegCmd: path.normalize('./node_modules/ffmpeg-binaries/bin/ffmpeg.exe'),   --> Windows OS
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
		         baseDirectory: './reports/HtmlReport',
		         
		         docTitle: 'Protractor Automation Report',
		         docName: 'Automation_Report.html',
					
		         gatherBrowserLogs: true,
		         preserveDirectory: false
		    }).getJasmine2Reporter());
			
			browser.driver.manage().window().maximize();
			
			browser.waitForAngularEnabled(true); //true for angular, false otherwise.
		},
		
		specs: ['test\e2e\specs\calculator-spec.js'],
		
		resultJsonOutputFile: 'console.json',
		
		framework: 'jasmine',
		
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