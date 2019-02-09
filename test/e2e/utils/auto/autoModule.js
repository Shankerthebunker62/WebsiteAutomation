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

// https://www.npmjs.com/package/autoit
let autoit = require('autoit');

// https://www.npmjs.com/package/shelljs
let shell = require('shelljs');

// https://www.npmjs.com/package/child_process
const {execFile} = require('child_process');

// https://www.npmjs.com/package/winreg
let registry = require('winreg');

// https://www.npmjs.com/package/regedit
let regedit = require('regedit');

// https://www.npmjs.com/package/node-osascript
let osascript = require('node-osascript');

/***********************************************************
********************** AutoIt Script ***********************
***********************************************************/

exports.uploadFileIEAutoitXScript = function (_windowTitle, _fileToUpload) {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.controlFocus(_windowTitle, '', 'Edit1');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.ControlSetText(_windowTitle, '', 'Edit1', _uploadPath + _fileToUpload);
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		auto.controlClick(_windowTitle, '', 'Button1');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.downloadFileIEAutoitXScript = function (_windowTitle, _fileToDownload) {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('!{N}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{TAB}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{DOWN}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{DOWN}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{ENTER}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{DEL}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.ControlSetText('Save As', '', 'Edit1', _uploadPath + _fileToDownload);
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.closeDownloadIEAutoitXScript = function () {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('!{N}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{TAB}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{TAB}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{TAB}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{ENTER}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.windowSecurityIEAutoitXScript = function (_username, _password) {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.WinWaitActive('Windows Security');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.controlFocus('Windows Security', '', 'Edit1');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.ControlSetText('Windows Security', '', 'Edit1', _username);
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.controlFocus('Windows Security', '', 'Edit2');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.ControlSetText('Windows Security', '', 'Edit2', _password);
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.controlClick('Windows Security', '', 'Button2');
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
		autoit.Send('{TAB}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{ENTER}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{ENTER}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{ESC}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

exports.printChromeAutoitXScript = function () {
	try {
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
		autoit.Send('{ENTER}');
		autoit.Sleep(TIMEOUT_IN_MILISECONDS);
	} catch (error) {
		console.error(error.message);
	}
};

/***********************************************************
********************* osascript Script *********************
***********************************************************/

// _osaScript = can also be script or, '/script.scpt'
exports.executeOSAScript = function (_osaScript) {
	osascript.execute(execFilePath+_osaScript, function(err, result, raw) {
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
	const { stdout, stderr, code } = sh.exec(execFilePath+fileName, { silent: true });
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
    	execFile(fileName, params, { cwd: path }, (err, data) => {
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
    	execFile(execFilePath+fileName, params, { cwd: path }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });

    });
    return promise;
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

/***********************************************************
************************ Exe Script ************************
***********************************************************/

exports.executeExeFile = function(fileName) {
	execFile(execFilePath+fileName, function(error, data) {  
		if (error) console.error(error.message);
		console.log(data.toString());                       
	});  
};