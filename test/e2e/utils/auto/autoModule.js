/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Project location path
const dirPath = browser.params.dirPath;

const TIMEOUT_IN_MILISECONDS = 2000; 

const uploadPath = (dirPath + '/test/e2e/resources/uploads/');
const downloadPath = (dirPath + '/test/e2e/resources/downloads/');
const execFilePath = (dirPath + '/test/e2e/resources/execFile/');

// https://www.npmjs.com/package/autoit
let autoit = require('autoit');

// https://www.npmjs.com/package/shelljs
let shell = require('shelljs');

// https://www.npmjs.com/package/child_process
let exec = require('child_process');

// https://www.npmjs.com/package/winreg
let Registry = require('winreg');

// https://www.npmjs.com/package/regedit
let regedit = require('regedit');

// https://www.npmjs.com/package/node-osascript
let osascript = require('node-osascript');

/***********************************************************
********************** AutoIt Script ***********************
***********************************************************/

exports.uploadFileAutoitXScript = function (_windowTitle, _fileToUpload) {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.controlFocus(_windowTitle, "", "Edit1");
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.ControlSetText(_windowTitle, "", "Edit1", _uploadPath + _fileToUpload);
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		auto.controlClick(_windowTitle, "", "Button1");
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.downloadFileAutoitXScript = function (_windowTitle, _fileToDownload) {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.closeDownloadAutoitXScript = function (_windowTitle) {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.windowSecurityAutoitXScript = function (_username, _password) {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.WinWaitActive('Windows Security');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send(_username);
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{TAB}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send(_password);
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{ENTER}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.loginAutoitXScript = function (_username, _password) {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send(_username);
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{TAB}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send(_password);
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{ENTER}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.printIEAutoitXScript = function () {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.printChromeAutoitXScript = function () {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.selectCertificateIEAutoitXScript = function () {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.selectCertificateChromeAutoitXScript = function () {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.acceptCertificateIEAutoitXScript = function () {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.denyCertificateIEAutoitXScript = function () {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

/***********************************************************
*********************** Shell Script ***********************
***********************************************************/

// _osaScript = can also be script or, 'path/to/script.scpt' 
exports.executeOSAScript = function (_osaScript) {
	osascript.execute(_osaScript, function(err, result, raw) {
		if (err) return console.error(err);
			console.log(result, raw);
	});
};

exports.executeFileUploadOSAScript = function (_fileToUpload, _browserName) {
	let osaScript = "tell application \"System Events\" " + "\n set frontmost of process \""+_browserName+"\" to true "
	+ "\n end tell" + "\n tell application \"System Events\" " + "\n delay 3" + "\n key code 36"
	+ "\n end tell" + "\n set posixpath to \"" + _fileToUpload + " \" " + "\n "
	+ "\n tell application \"System Events\" " + "\n tell application \"System Events\" "
	+ "\n delay 3" + "\n keystroke posixpath" + "\n delay 3" + "\n keystroke return"
	+ "\n delay 3" + "\n keystroke return" + "\n end tell" + "\n end tell"
		
	osascript.execute(osaScript, function(err, result, raw) {
		if (err) return console.error(err);
			console.log(result, raw);
	});
};

/***********************************************************
*********************** Shell Script ***********************
***********************************************************/

// _fileName = can be shell command or, './someshellscript.sh'
exports.executeShellFile = function(fileName) {
	const { stdout, stderr, code } = sh.exec(fileName, { silent: true });
	if (stderr) console.log(`stderr: ${stderr}`);
	if (stdout) console.log(`stdout: ${stdout}`);
	if (code) console.log(`code: ${code}`);
};

/***********************************************************
************************ CMD Script ************************
***********************************************************/

/**
 * Function to execute exe
 * 
 * @param {string} fileName The name of the executable file to run.
 * @param {string[]} params List of string arguments.
 * @param {string} path Current working directory of the child process.
 */
exports.executeFile = function(fileName, params, path) {
    let promise = new Promise((resolve, reject) => {
        exec(fileName, params, { cwd: path }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });

    });
    return promise;
};

/**
 * Function to execute exe
 * 
 * @param {string} fileName The name of the executable file to run.
 */
exports.executeFile = function(fileName) {
    let promise = new Promise((resolve, reject) => {
        exec(execFilePath+fileName, params, { cwd: path }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });

    });
    return promise;
};

exports.executeExeFile = function(fileName) {
	exec(execFilePath+fileName, function(err, data) {  
		if (err) console.log(err)
		console.log(data.toString());                       
	});  
};

/***********************************************************
********************** RegEdit Script **********************
***********************************************************/

exports.listAutoStartPrograms = function() {
	let regKey = new Registry({                                       	// new operator is optional
		hive: Registry.HKCU,                                        	// open registry hive HKEY_CURRENT_USER
		key :  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' 	// key containing autostart programs
	});
	
	regKey.values(function (err, items /* array of RegistryItem */) {
		if (err)
			console.log('ERROR: '+err);
		else
			for (var i=0; i<items.length; i++)
				console.log('ITEM: '+items[i].name+'\t'+items[i].type+'\t'+items[i].value);
	});
};