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

//https://www.npmjs.com/package/child_process
const {execFile} = require('child_process');

// https://www.npmjs.com/package/winreg
let registry = require('winreg');

// https://www.npmjs.com/package/regedit
let regedit = require('regedit');

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