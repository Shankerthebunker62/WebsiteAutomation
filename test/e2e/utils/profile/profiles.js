/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Project location path
const dirPath = browser.params.dirPath;
//const dirPath = '/Users/shankerthebunker/git/WebsiteAutomation';

// https://www.npmjs.com/package/firefox-profile
let FirefoxProfile = require('firefox-profile');

/**
 * Conversion of the log4js framework to work with node.
 */
let console = require(dirPath + '/utils/logger/logModule.js');

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
    firefoxProfile.setPreference('browser.download.dir', browser.params.downloadPath);
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
            firefox_profile: encodedProfile
        }];
        deferred.resolve(multiCapabilities);
    });

    return deferred.promise;
};