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

/**
 * Conversion of the log4js framework to work with node.
 */
const console = require(dirPath + '/test/e2e/utils/logger/logModule.js');

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