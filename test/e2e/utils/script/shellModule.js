/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Project location path
const dirPath = browser.params.dirPath;

// Resource Path
const uploadPath = browser.params.uploadPath;
const downloadPath = browser.params.downloadPath;
const execFilePath = browser.params.execFilePath;

const TIMEOUT_IN_MILISECONDS = 2000;

//https://www.npmjs.com/package/shelljs
let shell = require('shelljs');

//https://www.npmjs.com/package/node-osascript
let osascript = require('node-osascript');

/**
 * Conversion of the log4js framework to work with node.
 */
const console = require(dirPath + '/utils/logger/logModule.js');

/***********************************************************
 ********************* osascript Script *********************
 ***********************************************************/

// _osaScript = can also be script or, '/script.scpt'
exports.executeOSAScript = function(_osaScript) {
    osascript.execute(execFilePath + _osaScript, function(error, result, raw) {
        if (error) {
            console.error(`error: ${error.message}, stackTrace ${error.stack}`);
            return;
        }
        console.log(result, raw);
    });
};

exports.executeFileUploadOSAScript = function(_fileToUpload, _browserName) {
    let osaScript = "tell application \"System Events\" " + "\n set frontmost of process \"" + _browserName + "\" to true " +
        "\n end tell" + "\n tell application \"System Events\" " + "\n delay 3" + "\n key code 36" +
        "\n end tell" + "\n set posixpath to \"" + _fileToUpload + " \" " + "\n " +
        "\n tell application \"System Events\" " + "\n tell application \"System Events\" " +
        "\n delay 3" + "\n keystroke posixpath" + "\n delay 3" + "\n keystroke return" +
        "\n delay 3" + "\n keystroke return" + "\n end tell" + "\n end tell"

    osascript.execute(osaScript, function(error, result, raw) {
        if (error) {
            console.error(`error: ${error.message}, stackTrace ${error.stack}`);
            return;
        }
        console.log(result, raw);
    });
};

/***********************************************************
 *********************** Shell Script ***********************
 ***********************************************************/

// _fileName = can be shell command or, './someshellscript.sh'
exports.executeShellFile = function(fileName) {
    const {
        stdout,
        stderr,
        code
    } = shell.exec(execFilePath + fileName, {
        silent: true
    });
    if (stderr) console.error(`stderr: ${stderr}`);
    if (stdout) console.debug(`stdout: ${stdout}`);
    if (code) console.log(`code: ${code}`);
};