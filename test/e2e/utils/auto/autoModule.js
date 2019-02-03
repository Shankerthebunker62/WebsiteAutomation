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

const uploadPath = require(dirPath + '/test/e2e/resources/uploads/');
const downloadPath = require(dirPath + '/test/e2e/resources/downloads/');

// https://www.npmjs.com/package/autoit
let autoit = require('autoit');

// https://www.npmjs.com/package/shelljs
let shell = require('shelljs');

// https://www.npmjs.com/package/child_process
let child = require('child_process');

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



/***********************************************************
************************ CMD Script ************************
***********************************************************/

