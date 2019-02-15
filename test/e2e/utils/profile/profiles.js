/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Fetches static variables
const StaticModule = require(`/Users/shankerthebunker/git/WebsiteAutomation/test/e2e/staticModule.js`);
let _StaticModule = new StaticModule();

//Project location path
const dirPath = _StaticModule.projectPath();

/**
 * Conversion of the log4js framework to work with node.
 */
const console = require(dirPath + '/test/e2e/utils/logger/logModule.js');

// https://www.npmjs.com/package/firefox-profile
let FirefoxProfile = require('firefox-profile');

let q = require('q');

exports.getFirefoxProfile = function() {
	let deferred = q.defer();

	let firefoxProfile = new FirefoxProfile();
	
    // activate and open firebug by default for all sites
	firefoxProfile.setPreference('extensions.firebug.allPagesActivation', 'on');
	
    // activate the console panel
    firefoxProfile.setPreference('extensions.firebug.console.enableSites', true);
    
    // show the console panel
    firefoxProfile.setPreference('extensions.firebug.defaultPanelName', 'console');
    
    // file download
    firefoxProfile.setPreference('browser.download.folderList', '2');
    firefoxProfile.setPreference('browser.download.dir', _StaticModule.downloadPath());
    firefoxProfile.setPreference('browser.helperApps.neverAsk.saveToDisk', 'application/zip');
    
    // done with prefs?
    firefoxProfile.updatePreferences();
    
	firefoxProfile.encoded(function(encodedProfile) {
		let multiCapabilities = [{
			'browserName': 'firefox',
			'logName': 'Firefox - English',
			'moz:firefoxOptions': {
				'args': ['--verbose', '--safe-mode'] // '--headless'
			},
			firefox_profile : encodedProfile
		}];
		deferred.resolve(multiCapabilities);
  });

  return deferred.promise;
};