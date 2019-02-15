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

// https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

/**
 * Conversion of the log4js framework to work with node.
 */
const console = require(dirPath + '/test/e2e/utils/logger/logModule.js');

/**
 * Web page test data fetch method to be used
 */
const testDataModule = require(dirPath + '/test/e2e/utils/testDataModule.js');

/**
 * Web page UI webElement creator method to be used
 */
const uiMapModule = require(dirPath + '/test/e2e/utils/uiMapModule.js');

/**
 * UI webElement expected conditions creator method to be used
 */
const conditionsModule = require(dirPath + '/test/e2e/utils/additional/conditionsModule.js');

/**
 * autoIt/Shell/CMD/Bat/OAScript method to be used
 */
const cmdModule = require(dirPath + '/test/e2e/utils/script/cmdModule.js');
const shellModule = require(dirPath + '/test/e2e/utils/script/shellModule.js');

/**
 * DB Validation method to be used
 */
const dbModule = require(dirPath + '/test/e2e/utils/db/dbModule.js');

/**
 * Reporting each step of execution method to be used
 */
const reportModule = require(dirPath + '/test/e2e/utils/report/reportModule.js');

// http://www.collectionsjs.com/ --> for collections alternative in .js

// Drag-n-Drop method to be used
let dragAndDrop = require('html-dnd').code;

// hex string method to be used
let crypto = require('crypto');

// UUID Generator method to be used
let uuid = require('uuid');

/************************************************************
 **************** Browser/Window/Alert Action ***************
 ***********************************************************/

/**
 * launchApplication: launches to url of application under test
 * 
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @param url: url of the said application
 */
exports.launchApplication = function(pageData, dataColumn) {
	let _url = testDataModule.getExcelTestData(pageData, dataColumn);
	
	let _result = true;
	
	browser.get(_url).then(() => {
		console.log(`Opening URL ${_url} ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't opening URL ${_url} !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
		
	browser.driver.getSession().then((session) => {
		console.log(session);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't get browser session !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to launch the application url` ,`Launching application url ${_url}` , _result);
};

/**
 * close: closes the current browser/tab open
 * 
 * @return return type of action boolean (true/false)
 */
exports.close = function () {
	let _result = true;
	
	browser.close().then(() => {
		console.log(`Closing browser ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't close browser !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to close the current open browser` ,`Closing the current browser` , _result);
};

/**
 * Maximize current window on focus
 */
exports.maximize = function () {
	let _result = true;
	
	browser.driver.manage().window().maximize().then(() => {
		console.log(`Maximizing browser window ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't maximize browser window !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to maximize the current browser` ,`Maximizing the current browser` , _result);
};

/**
 * Clears all cookies on the browser
 */
exports.clearCokkies = function () {
	let _result = true;
	
	browser.manage().deleteAllCookies().then(() => {
		console.log(`Deleting cookies ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't delete cookies !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to clear the current session cokkies` ,`Clearing the current session cokkies` , _result);
};

/**
 * Clears any user/non-user session currently active on the browser
 */
exports.clearSession = function () {
	let _result = true;
	
	browser.executeScript('window.sessionStorage.clear();').then(() => {
		console.log(`Executing window.sessionStorage.clear() ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't execute window.sessionStorage.clear() !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
		
	browser.executeScript('window.localStorage.clear();').then(() => {
		console.log(`Executing window.localStorage.clear() ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't execute window.localStorage.clear() !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to clear the current browser session` ,`Clearing the current browser session` , _result);
};

/**
 * Restarts the browser instance
 */
exports.restart = function () {
	let _result = true;
	
	browser.restart().then(() => {
		console.log(`Closing and Restarting browser ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't restart !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to restart the browser` ,`Restarting the browser` , _result);
};

/**
 * Navigate back a page on the browser
 */
exports.back = function () {
	let _result = true;
	
	browser.navigate().back().then(() => {
		console.log(`Navigating back ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't navigate back !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to navigate back in the browser` ,`Navigate back in the browser` , _result);
};

/**
 * Refresh the browser page
 */
exports.refresh = function () {
	let _result = true;
	
	browser.navigate().refresh().then(() => {
		console.log(`Refreshing ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't refresh !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to refresh the current browser` ,`Refreshing the current browser` , _result);
};

/**
 * Wait on browser in milliseconds
 * 
 * @param _sleepTimeOutInMilliSeconds: sleep Time Out In MilliSeconds
 */
exports.sleep = function (_sleepTimeOutInMilliSeconds) {
	let _result = true;
	
	browser.sleep(_sleepTimeOutInMilliSeconds).then(() => {
		console.log(`Waiting ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't wait !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to pause\sleep for certain timeout` ,`Sleeping\Pausing for ${_sleepTimeOutInMilliSeconds} milli-seconds` , _result);
};

/**
 * Sleep on webDriver instance in milliSeconds
 * 
 * @param _sleepTimeOutInMilliSeconds: sleep Time Out In MilliSeconds
 */
exports.driverSleep = function (_sleepTimeOutInMilliSeconds) {
	let _result = true;
	
	browser.driver.sleep(_sleepTimeOutInMilliSeconds).then(() => {
		console.log(`Waiting ...`);
	}).catch((error) => {
		_result = false;
		console.error(`Couldn't wait !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to pause\sleep for certain timeout` ,`Sleeping\Pausing for ${_sleepTimeOutInMilliSeconds} milli-seconds` , _result);
};

/**
 * Checks for an alert on the page and, dismisses it
 */
exports.dismissAlert  = function () {
	let _result = true;
	
	conditionsModule.alertIsPresent().then(() => {
		console.log(`Alert is found`);
		
		browser.switchTo().alert().dismiss().then(() => {
			console.log(`Alert is found and, dismissed`);
		}).catch((error) => {
			_result = false;
		    console.error(`Alert dismiss failed, error: ${error.message}, stackTrace ${error.stack}`);
		});
      }).catch((error) => {
    	  _result = false;
    	  console.error(`Alert is not found, error: ${error.message}, stackTrace ${error.stack}`);
      });
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to dismiss the alert if present` ,`Dismissing the alert when found` , _result);
};

/**
 * Checks for an alert on the page and, accepts it
 */
exports.acceptAlert  = function () {
	let _result = true;
	
	conditionsModule.alertIsPresent().then(() => {
		console.log(`Alert is found`);
		
		browser.switchTo().alert().accept().then(() => {
			console.log(`Alert is found and, accepted`);
		}).catch((error) => {
			_result = false;
			console.error(`Alert accept failed, error: ${error.message}, stackTrace ${error.stack}`);
		});
	}).catch((error) => {
		_result = false;
	    console.error(`Alert is not found, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to accept the alert if present` ,`Accepting the alert when found` , _result);
};

/**
 * Switch Window Handle: switching to a window whose title is provided
 * 
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.switchToWindowHandle = function (pageData, dataColumn) {
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	let _result = false;
	
	try {
		browser.getAllWindowHandles().then(function(handles){
			 for (let windowHandle of handles) {
				 browser.switchTo().window(windowHandle);
				 
				 browser.getTitle().then(function(title){
					if(title === _testData && _result === false){
						console.log(`Successfully switched to window handle with title ${_testData}`);
						_result = true;
					}
				});
				 
				if (_result)
					break;
			 };
		});
		
		if (!_result)
			console.log(`Failed to switch to window handle with title ${_testData}`);
		
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to switch to window with title ${_testData}` ,`Switching to window with title ${_testData}` , _result);
};

/**
 * switchToFrame: switching to the frame by locator
 * 
 * @param elementName: element of frame
 */
exports.switchToFrame = function(elementName) {
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		browser.switchTo().frame(_element).then(() => {
			console.log(`Switched to frame ${elementName}`);
		}).catch((error) => {
			_result = false;
			console.error(`Failed to switch to frame ${elementName}, error: ${error.message}, stackTrace ${error.stack}`);
		});
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to switch to frame ${elementName}` ,`Switching to frame ${elementName}` , _result);
};

/**
 * switchToDefaultContent: switching out of any/all frames
 */
exports.switchToDefaultContent = function() {
	let _result = true;
	
	try {
		browser.switchTo().defaultContent().then(() => {
			console.log(`Switching back from frame`);
		}).catch((error) => {
			_result = false;
			console.error(`Switching back from frame failed, error: ${error.message}, stackTrace ${error.stack}`);
		});
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to switch to default content` ,`Switching to default content` , _result);
};

/************************************************************
 ****************** WebElement/WebElements ******************
 ***********************************************************/

/**
 * Get element under test
 * 
 * @param elementName: element locator
 * @return element: web element fetched 
 */
exports.getWebElement = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		return _element;
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return null;
	}
};

/**
 * Get element list under test
 * 
 * @param elementName: elements' locator
 * @return elements: web element list fetched 
 */
exports.getWebElements = function (elementName) {
	try {
		let _elements = uiMapModule.getExcelUIMapList(elementName);
		return _elements;
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return null;
	}
};

/************************************************************
 ****************** Test Data String/Value ******************
 ***********************************************************/

/**
 * Get test data to be used in test
 * 
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * @return _testData: data under test
 */
exports.getTestData = function (pageData, dataColumn) {
	try {
		let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
		return _testData;
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return null;
	}
};

/************************************************************
 ********************* Keyboard Action **********************
 ***********************************************************/

/**
 * fileUpload: send keys on the element to upload file
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.fileUpload = function (elementName, pageData, dataColumn) {
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = uploadPath + testDataModule.getExcelTestData(pageData, dataColumn);
	
	_element.sendKeys(_testData).then(() => {
		console.log(`Element ${elementName} setValue ${_testData} is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} setValue ${_testData} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to upload the file ${_testData}` ,`Uploading the file ${_testData} on element ${elementName}` , _result);
};

/**
 * setValue: send keys on the element
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.setValue = function (elementName, pageData, dataColumn) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	_element.clear().then(() => {
		console.log(`Element ${elementName} clear is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} clear is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
		
	_element.sendKeys(_testData).then(() => {
		console.log(`Element ${elementName} setValue ${_testData} is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} setValue ${_testData} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to setValue ${_testData} on element ${elementName}` ,`Setting value ${_testData} on element ${elementName}` , _result);
};

/**
 * setValueRandomString: send keys on the element
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.setValueRandom = function (elementName, pageData, dataColumn) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	if (_testData !== null || _testData !== '')
		_testData += generateString();
	else
		_testData = generateString();
		
	_element.clear().then(() => {
		console.log(`Element ${elementName} clear is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} clear is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
		
	_element.sendKeys(_testData).then(() => {
		console.log(`Element ${elementName} setValue ${_testData} is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} setValue ${_testData} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to setValue ${_testData} on element ${elementName}` ,`Setting value ${_testData} on element ${elementName}` , _result);
};

/**
 * setValueTimeStamp: send keys on the element
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.setValueTimeStamp = function (elementName, pageData, dataColumn) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	if (_testData !== null || _testData !== '')
		_testData += getTimeStamp();
	else
		_testData = getTimeStamp();
		
	_element.clear().then(() => {
		console.log(`Element ${elementName} clear is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} clear is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
		
	_element.sendKeys(_testData).then(() => {
		console.log(`Element ${elementName} setValue ${_testData} is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} setValue ${_testData} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to setValue ${_testData} on element ${elementName}` ,`Setting value ${_testData} on element ${elementName}` , _result);
};

/**
 * setValueEnter: send keys on the element and, press enter
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.setValueEnter = function (elementName, pageData, dataColumn) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	_element.clear().then(() => {
		console.log(`Element ${elementName} clear is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} clear is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
		
	_element.sendKeys(_testData + protractor.Key.ENTER).then(() => {
		console.log(`Element ${elementName} setValue ${_testData + protractor.Key.ENTER} is passed`);
	}).catch((error) => {
		_result = false;
		console.error(`Element ${elementName} setValue ${_testData + protractor.Key.ENTER} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to setValue ${_testData} on element ${elementName} and, press enter` ,`Setting value ${_testData} on element ${elementName} and, press enter` , _result);
};

/**
 * setValueCharByChar: send keys on the element character by character
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.setValueCharByChar = function (elementName, pageData, dataColumn) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	_element.clear().then(() => {
		console.log(`Element ${elementName} clear is passed`);
      }).catch((error) => {
    	  _result = false;
    	  console.error(`Element ${elementName} clear is failed, error: ${error.message}, stackTrace ${error.stack}`);
      });
	
	let chars = _testData.split('');
	
	for (let i=0; i<chars.length; i++) {
		_element.sendKeys(chars[i]).then(() => {
			console.log(`Element ${elementName} setValue ${chars[i]} is passed`);
	      }).catch((error) => {
	    	  _result = false;
	    	  console.error(`Element ${elementName} setValue ${chars[i]} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	      });
		
		browser.sleep(250).then(() => {
			console.log(`Waiting ...`);
		}).catch((error) => {
			_result = false;
			console.error(`Couldn't wait !!, error: ${error.message}, stackTrace ${error.stack}`);
		});
	}
	
	_element.sendKeys(protractor.Key.ENTER).then(() => {
		console.log(`Element ${elementName} send keys enter is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} send keys enter is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to setValue ${_testData} on element ${elementName} character by character` ,`Setting value ${_testData} on element ${elementName} character by character` , _result);
};

/**
 * select: send keys on the element to select by text
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.select = function (elementName, pageData, dataColumn) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	_element.sendKeys(_testData).then(() => {
		console.log(`Element ${elementName} select data ${_testData} is passed`);
	 }).catch((error) => {
		 _result = false;
	    console.error(`Element ${elementName} select data ${_testData} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	 });
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to select option ${_testData} from dropdown on element ${elementName}` ,`Select option ${_testData} from dropdown on element ${elementName}` , _result);
};

/**
 * sendKeysEnter: perform click on the element
 * 
 * @param elementName: element created to web page interaction
 */
exports.sendKeysEnter = function (elementName) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_element.sendKeys(protractor.Key.ENTER).then(() => {
		console.log(`Element ${elementName} send keys enter is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} send keys enter is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to press enter key on element ${elementName}` ,`Press enter on element ${elementName}` , _result);
};

/**
 * clear: perform clear on the element text field
 * 
 * @param elementName: element created to web page interaction
 */
exports.clear = function (elementName) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_element.clear().then((isTrue) => {
		console.log(`Element ${elementName} clear is passed`);
	 }).catch((error) => {
		 _result = false;
		 console.error(`Element ${elementName} clear is failed, error: ${error.message}, stackTrace ${error.stack}`);
	 });
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to clear data on element ${elementName}` ,`Clearing data on element ${elementName}` , _result);
};

/************************************************************
 *********************** Verify Action **********************
 ***********************************************************/

/**
 * verifySelectOption: verify selected option on the element
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.verifySelectOption = function (elementName, pageData, dataColumn) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		element(_element.locator()).$('option:checked').getText().then(function (text) {
	        if (text === _testData || text.includes(_testData) || _testData.includes(text)) {
	        	console.log(`Element ${elementName} selected option ${_testData} to ${text} is passed`);
	        } else {
	        	_result = false;
	        	console.log(`Element ${elementName} selected option ${_testData} to ${text} is failed`);
	        }
		});
		
		let _data = element(_element.locator()).$('option:checked').getText();
		expect(_data).toContain(_testData);
	} catch (error) {
		_result = false;
		console.error(`Element ${elementName} selected option ${_testData} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to validated the dropdown option ${_testData} on element ${elementName}` ,`Validating dropdown option ${_testData} on element ${elementName}` , _result);
};

/**
 * verifyValue: verify value on the element
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.verifyValue = function (elementName, pageData, dataColumn) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		_element.getAttribute('value').then(function (text) {
	        if (text === _testData || text.includes(_testData) || _testData.includes(text)) {
	        	console.log(`Element ${elementName} get value ${_testData} to ${text} is passed`);
	        } else {
	        	_result = false;
	        	console.log(`Element ${elementName} get value ${_testData} to ${text} is failed`);
	        }
		});
		
		let _data = _element.getAttribute('value');
		expect(_data).toContain(_testData);
	} catch (error) {
		_result = false;
		console.error(`Element ${elementName} get value ${_testData} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to validate value ${_testData} on element ${elementName}` ,`Validating value ${_testData} on element ${elementName}` , _result);
};

/**
 * verifyText: verify text on the element by getText()
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.verifyText = function (elementName, pageData, dataColumn) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		_element.getText().then(function (text) {
	        if (text === _testData || text.includes(_testData) || _testData.includes(text)) {
	        	console.log(`Element ${elementName} get text ${_testData} to ${text} is passed`);
	        } else {
	        	_result = false;
	        	console.error(`Element ${elementName} get text ${_testData} to ${text} is failed`);
	        }
		});
			
		let _data = _element.getText();
		expect(_data).toContain(_testData);
	} catch (error) {
		_result = false;
		console.log(`Element ${elementName} get text ${_testData} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to validate text ${_testData} on element ${elementName}` ,`Validating text ${_testData} on element ${elementName}` , _result);
};

/**
 * verifyPageTitle: validates if correct page title is open
 * 
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.verifyPageTitle = function(pageData, dataColumn) {	
	let _result = true;
	
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		browser.getTitle().then(function (text) {
	        if (text === _testData || text.includes(_testData) || _testData.includes(text)) {
	        	console.log(`Verify title ${_testData} to ${_data} is passed`);
	        } else {
	        	_result = false;
	        	console.log(`Verify title ${_testData} to ${_data} is failed`);
	        }
		});
		
		let _data = browser.getTitle();
		expect(_data).toContain(_testData);
	} catch (error) {
		_result = false;
		console.error(`Verify title ${_testData} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to validate page title as ${_testData}` ,`Validating page title as ${_testData}` , _result);
};

/**
 * verifyAlertText: validates if correct alert is open
 * 
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 */
exports.verifyAlertText = function (pageData, dataColumn) {	
	let _result = true;
	
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		conditionsModule.alertIsPresent();
		
		browser.switchTo().alert().getText().then(function (text) {
	        if (text === _testData || text.includes(_testData) || _testData.includes(text)) {
	        	console.log(`Alert get text ${_testData} to ${text} is passed`);
	        } else {
	        	_result = false;
	        	console.error(`Alert get text ${_testData} to ${text} is failed`);
	        }
		});
		
		let _data = browser.switchTo().alert().getText();
		expect(_data).toContain(_testData);
	} catch (error) {
		_result = false;
		console.error(`Verify alet text ${_testData} is failed, error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to validate alert text as ${_testData}` ,`Validating alert text as ${_testData}` , _result);
};

/**
 * Verify if element is displayed or, not
 * 
 * @param elementName: element created to web page interaction
 */
exports.verifyElementIsDisplayed = function(elementName) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		let isDisplayed = _element.isDisplayed();
		expect(isDisplayed).toBeTruthy();
        
        if (isDisplayed) {
	        console.log(`Element ${elementName} is displayed passed`);
        } else {
        	_result = false;
        	console.log(`Element ${elementName} is displayed failed`);
        }
	} catch (error) {
		_result = false;
		console.error(`Element ${elementName} is displayed failed, error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to check element ${elementName} is displayed` ,`Validating element ${elementName} is displayed` , _result);
};

/**
 * Verify if element is present or, not
 * 
 * @param elementName: element created to web page interaction
 */
exports.verifyElementIsNotPresent = function(elementName) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		let isPresent = _element.isPresent();
		expect(isPresent).to.become(false).and.notify(next);
        
        if (!isPresent) {
	        console.log(`Element ${elementName} is not displayed passed`);
        } else {
        	_result = false;
        	console.log(`Element ${elementName} is displayed failed`);
        }
	} catch (error) {
		_result = false;
		console.error(`Element ${elementName} is displayed failed, error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to check element ${elementName} is not displayed` ,`Validating element ${elementName} is not displayed` , _result);
};

/************************************************************
 *********************** Mouse Action ***********************
 ***********************************************************/

/**
 * click: perform click on the element
 * 
 * @param elementName: element created to web page interaction
 */
exports.click = function (elementName) {	
	let _result = true;
	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_element.click().then(() => {
		console.log(`Element ${elementName} click is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} click is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to click on element ${elementName}` ,`Clicking on element ${elementName}` , _result);
};

/**
 * Performs double click action on an element
 * 
 * @param elementName: element created to web page interaction
 */
exports.doubleClick = function(elementName) {
	let _result = true;
	
	let _action = browser.actions();
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_action.doubleClick(_element).perform().then(() => {
		console.log(`Element ${elementName} mouse double click is passed`);
	}).catch((error) => {
		_result = false;
	    console.error(`Element ${elementName} mouse double click is failed, error: ${error.message}, stackTrace ${error.stack}`);
	});
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to double click on element ${elementName}` ,`Double click on element ${elementName}` , _result);
};

/**
 * Performs right click on a webElement
 * 
 * @param elementName: element created to web page interaction
 */
exports.rightClick = function(elementName) {
	let _result = true;
	
	let _action = browser.actions();
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_action.mouseMove(_element.getLocation()).perform().then(() => {
		console.log(`Element ${elementName} mouse move is passed`);
	 }).catch((error) => {
		 _result = false;
	    console.error(`Element ${elementName} mouse move is failed, error: ${error.message}, stackTrace ${error.stack}`);
	 });
		
	_action.click(protractor.Button.RIGHT).perform().then(() => {
		console.log(`Element ${elementName} mouse click right is passed`);
	 }).catch((error) => {
		 _result = false;
	    console.error(`Element ${elementName} mouse click right is failed, error: ${error.message}, stackTrace ${error.stack}`);
	 });
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to right click on element ${elementName}` ,`Right click on element ${elementName}` , _result);
};

/**
 * Performs mouse hover action to check tool tips etc. 
 * 
 * @param elementName: element created to web page interaction
 */
exports.mouseHoverAction = function(elementName) {
	let _result = true;
	
	let _action = browser.actions();	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_action.mouseMove(_element).perform().then(() => {
		console.log(`Element ${elementName} mouse over is passed`);
	 }).catch((error) => {
		 _result = false;
	    console.error(`Element ${elementName} mouse over is failed, error: ${error.message}, stackTrace ${error.stack}`);
	 });
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to hover mouse over the element ${elementName}` ,`Mouse hover on element ${elementName}` , _result);
};

/**
 * Performs drag-n-drop action. 
 * 
 * @param elementFrom: element created to be dragged from
 * @param elementTo: element created to be dragged fromto
 */
exports.dragAndDrop = function (elementFrom, elementTo) {
	let _result = true;
	
	let _action = browser.actions();	
	let _fromElement = uiMapModule.getExcelUIMap(elementFrom);
	let _toElement = uiMapModule.getExcelUIMap(elementTo);
	
	_action.dragAndDrop(_fromElement, _toElement).perform().then(() => {
		console.log(`Element ${elementFrom} drag to Element ${elementTo} is passed`);
    }).catch((error) => {
    	_result = false;
    	console.error(`Element ${elementFrom} drag to Element ${elementTo} is failed, error: ${error.message}, stackTrace ${error.stack}`);
    });
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to drag ${elementFrom} to ${elementTo}` ,`Drag and drop ${elementFrom} to ${elementTo}` , _result);
};

/************************************************************
 ****************** Expected/Check Conditions ***************
 ***********************************************************/

// returned promise should be string/boolean

/**
 * Checks if alert is present on page or, not
 * 
 * @return: true/false
 */
exports.checkIfAlertPresent = function () {
	try {
		return conditionsModule.alertIsPresent();
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if the element is in click able state or not
 * 
 * @param elementName: element created to web page interaction
 * 
 * @return: true/false
 */
exports.checkIfElementClickable = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		return conditionsModule.waitForElementToBeClickable(_element);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Check if element has given text present or, not
 * could be used as verify element text
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @return: true/false
 */
exports.checkIfElementTextPresent = function (elementName, pageData, dataColumn) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
		return conditionsModule.waitForElementTextToBePresentIn(_element, _testData);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if the element has the required value as attribute or, not
 * could be used as get element value verify
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @return: true/false
 */
exports.checkIfElementValuePresent = function (elementName, pageData, dataColumn) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
		return conditionsModule.waitForElementTextToBePresentInValue(_element, _testData);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if title contains the given value/character/string
 * 
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found 
 * 
 * @return: true/false
 */
exports.checkIfTitleContains = function (pageData, dataColumn) {
	try {
		let _testData = testDataModule.getExcelTestData(pageData, dataColumn);	
		return conditionsModule.titleContains(_testData);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if page title is as expected or, not
 * could be used as verify title/page
 * 
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found 
 * 
 * @return: true/false
 */
exports.checkIfTitleIs = function (pageData, dataColumn) {
	try {
		let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
		return conditionsModule.titleIs(_testData);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if url contains a given string/character/value or,  not
 * 
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found 
 * 
 * @return: true/false
 */
exports.checkIfUrlContains = function (pageData, dataColumn) {	
	try {
		let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
		return conditionsModule.urlContains(_testData);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if url is as expected or not
 * could be used as verify url condition
 * 
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @return: true/false
 */
exports.checkIfUrlIs = function (pageData, dataColumn) {	
	try {
		let _testData = testDataModule.getExcelTestData(pageData, dataColumn);		
		return conditionsModule.urlIs(_testData);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if element is present {has loaded} or, not
 * 
 * @param elementName: element created to web page interaction
 * 
 * @return: true/false
 */
exports.checkIfElementPresent = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);	
		return conditionsModule.waitForElementPresenceOf(_element);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if element has become stale {selenium/protractor actions could be performed} or, not
 * 
 * @param elementName: element created to web page interaction
 * 
 * @return: true/false
 */
exports.checkIfElementStale = function (elementName) {	
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);		
		return conditionsModule.waitForElementStalenessOf(_element);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if element has become visible or, not
 * 
 * @param elementName: element created to web page interaction
 * 
 * @return: true/false
 */
exports.checkIfElementVisible = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		return conditionsModule.waitForElementVisiblity(_element);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if element has become invisible or, not
 * could be used as no such element condition
 * 
 * @param elementName: element created to web page interaction 
 * 
 * @return: true/false
 */
exports.checkIfElementInvisible = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		return conditionsModule.waitForElementInvisibilityOf(_element);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if element is selected or, not
 * 
 * @param elementName: element created to web page interaction
 * 
 * @return: true/false
 */
exports.checkIfElementSelected = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		return conditionsModule.waitForElementToBeSelected(_element);
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/**
 * Checks if element is displayed or, not
 * 
 * @param elementName: element created to web page interaction
 * 
 * @returns: true/false
 */
exports.checkIfElementIsDisplayed = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		return _element.isDisplayed();
	} catch (error) {
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		return false;
	}
};

/************************************************************
 *********************JavaScript Action *********************
 ***********************************************************/

/**
 * Highlight element provided for about '1000 ms' with color '#FFFF00' 
 * 
 * @param elementName: element to be highlighted
 */
exports.highlightElement = function (elementName) {
	let _result = true;
	
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.executeScript('arguments[0].setAttribute(\'style\', arguments[1]);', _element.getWebElement(), 'color: green; background-color: #FFFF00;').then(() => {
			console.log(`Giving highlight style to element ${elementName} ...`);
		}).catch((error) => {
			_result = false;
			console.error(`Couldn't give highlight style to element ${elementName} !!, error: ${error.message}, stackTrace ${error.stack}`);
		});
		
		browser.sleep(1000).then(() => {
			console.log(`Waiting ...`);
		}).catch((error) => {
			_result = false;
			console.error(`Couldn't wait !!, error: ${error.message}, stackTrace ${error.stack}`);
		});
		
		browser.executeScript('arguments[0].setAttribute(\'style\', arguments[1]);', _element.getWebElement(), '').then(() => {
			console.log(`Removing highlight style to element ${elementName} ...`);
		}).catch((error) => {
			_result = false;
			console.error(`Couldn't remove highlight style to element ${elementName} !!, error: ${error.message}, stackTrace ${error.stack}`);
		});
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to highlight ${elementName}` ,`Highlight ${elementName}` , _result);
};

/**
 * Highlight element provided for about '1000 ms' with color '#FFFF00' 
 * 
 * @param _elementName: web element to be highlighted
 */
exports.highlightWebElement = function (_elementName) {
	let _result = true;
	
	try {
		browser.executeScript('arguments[0].setAttribute(\'style\', arguments[1]);', _elementName.getWebElement(), 'color: green; background-color: #FFFF00;').then(() => {
			console.log(`Giving highlight style to element ${_elementName.locator()} ...`);
		}).catch((error) => {
			_result = false;
			console.error(`Couldn't give highlight style to element ${_elementName.locator()} !!, error: ${error.message}, stackTrace ${error.stack}`);
		});
		
		browser.sleep(2000).then(() => {
			console.log(`Waiting ...`);
		}).catch((error) => {
			_result = false;
			console.error(`Couldn't wait !!, error: ${error.message}, stackTrace ${error.stack}`);
		});
		
		browser.executeScript('arguments[0].setAttribute(\'style\', arguments[1]);', _elementName.getWebElement(), '').then(() => {
			console.log(`Removing highlight style to element ${_elementName.locator()} ...`);
		}).catch((error) => {
			_result = false;
			console.error(`Couldn't remove highlight style to element ${_elementName.locator()} !!, error: ${error.message}, stackTrace ${error.stack}`);
		});
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to highlight webElement ${_elementName.locator()}` ,`Highlight webElement ${_elementName.locator()}` , _result);
};

/**
 * Unlock/Unhide element to be used further use
 * 
 * @param elementName: element to unhide/made visible 
 */
exports.unhideElement = function (elementName) {
	let _result = true;
	
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.executeScript(function (arguments) {
		    arguments[0].style.visibility = 'visible'; 
		    arguments[0].style.display = 'block';
		}, _element.getWebElement()).then(() => {
			console.log(`Making element ${elementName} visible`);
		}).catch((error) => {
			_result = false;
			console.error(`Failed to make element ${elementName} visible, error: ${error.message}, stackTrace ${error.stack}`);
		});
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to unhide ${elementName}` ,`Unhiding ${elementName}` , _result);
};

/**
 * Performing java script action on element
 * 
 * @param elementName: element on which java script click is to be performed
 */
exports.javaScriptClick = function (elementName) {
	let _result = true;
	
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.executeScript('arguments[0].click();', _element.getWebElement()).then(() => {
			console.log(`Java Script click on element ${elementName}`);
		}).catch((error) => {
			_result = false;
			console.error(`Java Script click on element ${elementName} failed, error: ${error.message}, stackTrace ${error.stack}`);
		});
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to perform javaScript click on ${elementName}` ,`JavaScript clicking on ${elementName}` , _result);
};
	
/**
 * Mouse hover action on a webelement using java script
 * 
 * @param elementName: element for mouse hover action
 */
exports.mouseHoverJavaScript = function (elementName) {
	let _result = true;
	
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.executeScript('if(document.createEvent){var evObj = document.createEvent(\'MouseEvents\');evObj.initEvent(\'mouseover\', true, false); arguments[0].dispatchEvent(evObj);} else if(document.createEventObject) { arguments[0].fireEvent(\'onmouseover\');}', _element.getWebElement());
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to perform mouse hover action using javaScript on ${elementName}` ,`Perform javaScript mouse hover action on ${elementName}` , _result);
};	
	
/**
 * Scroll element in view of web page in browser
 * 
 * @param elementName: element to be scrolled to
 */
exports.scrollingToElement = function (elementName) {
	let _result = true;
	
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.executeScript('arguments[0].scrollIntoView(true);', _element.getWebElement()).then(() => {
			console.log(`Scrolling onto element ${elementName}`);
		}).catch((error) => {
			_result = false;
			console.error(`Scrolling onto element ${elementName} failed, error: ${error.message}, stackTrace ${error.stack}`);
		});
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to scroll ${elementName} into view` ,`Scroll ${elementName} into view` , _result);
};

/**
 * Performs drag-n-drop action. It used external module html-dnd to
 * achieve drag-n-drop action on browsers.
 * 
 * @param elementFrom: element created to be dragged from
 * @param elementTo: element created to be dragged fromto
 */
exports.dragAndDropHtmlDnD = function (elementFrom, elementTo) {
	let _result = true;
	
	try {
		let _fromElement = uiMapModule.getExcelUIMap(elementFrom);
		let _toElement = uiMapModule.getExcelUIMap(elementTo);
		
		browser.executeScript(dragAndDrop, _fromElement, _toElement).then(() => {
			console.log(`drag element ${elementFrom} to element ${elementTo}`);
		}).catch((error) => {
			_result = false;
			console.error(`drag element ${elementFrom} to element ${elementTo} failed, error: ${error.message}, stackTrace ${error.stack}`);
		});
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to drag ${elementFrom} and, drop to ${elementTo} using HtmlDnD module` ,`Drag ${elementFrom} and, drop to ${elementTo}` , _result);
};	

/************************************************************
 ********************* Utility Methods **********************
 ***********************************************************/

/**
 * Generates alpha-numberic string
 * 
 * @returns string: alpha-numberic text
 */
generateString = function() {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};

/**
 * Return a crypto-hex string of expected length
 * 
 * @param length: string length expected 
 * @returns string: alpha-numberic text
 */
generateCryptoHexString = function(length) {
	if (typeof length !== 'number')
		throw 'length should be a number';
	return crypto.randomBytes(Math.floor(length/2)).toString('hex');
};

/**
 * Return a UUID string
 * @returns string: alpha-numberic uuid text
 */
generateUUIDString = function() {
	return uuid.v4();
};

/**
 * Returns current time stamp
 * 
 * @returns string: date-time stamp
 */
getTimeStamp = function () {
	return new Date().getTime();
};

/***********************************************************
 ********************* OAScript Methods ********************
 **********************************************************/

/**
 * Used to execute apple script .scpt file in nodeJs
 * 
 * @param name of the .scpt placed in 'execFile' folder
 * @returns: true/false
 */
exports.executeOSAScript = function (pageData, dataColumnOAScript) {
	let _result = true;
	
	let _osaScript = testDataModule.getExcelTestData(pageData, dataColumnOAScript);
	try {
		shellModule.executeOSAScript(_osaScript);
		console.log(`Executing ${_osaScript}`);
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to execute apple script ${_osaScript}` ,`Executing apple script ${_osaScript}` , _result);
};

/**
 * Used to execute apple-script to upload file on the browser
 * The required file should be place in 'uploads' folder
 * 
 * @param fileToBeUpload: name of the file to upload
 * @param BrowserName: name of the browser under focus
 * @returns: true/false
 */
exports.executeFileUploadOSAScript = function (pageData, dataColumnFileToUpload, dataColumnBrowserName) {
	let _result = true;
	
	let _fileToUpload = testDataModule.getExcelTestData(pageData, dataColumnFileToUpload);
	let _browserName = testDataModule.getExcelTestData(pageData, dataColumnBrowserName);
	try {
		shellModule.executeFileUploadOSAScript(_fileToUpload, _browserName);
		console.log(`Executing apple script to upload file ${_fileToUpload} on browser ${_browserName}`);
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to upload file ${_fileToUpload} in browser ${_browserName} using apple script` ,`Uploading file ${_fileToUpload} in browser ${_browserName} using apple script` , _result);
};

/***********************************************************
******************** Shell Script Methods ******************
***********************************************************/

/**
 * Executing shell '.sh' file name provided in data sheet
 * 
 * @param name of the .sh placed in 'execFile' folder
 * @returns: true/false
 */
exports.executeShellFile = function(pageData, dataColumnFileName) {
	let _result = true;
	
	let _fileName = testDataModule.getExcelTestData(pageData, dataColumnFileName);
	try {
		shellModule.executeShellFile(_fileName);
		console.log(`Executing ${_fileName}`);
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to execute shell-script ${_fileName}` ,`Executing shell-script ${_fileName}` , _result);
};

/***********************************************************
************************ CMD Script ************************
***********************************************************/

/**
 * Executing .bat/.exe file with provided arguments and, file path
 * 
 * @param fileName: bat/exe file to be execute
 * @param param: args to be passed onto exe/bat file
 * @param path: location on exe/bat file
 * @returns: true/false
 */
exports.executeFile = function(pageData, dataColumnFileName, dataColumnParams, dataColumnPath) {
	let _result = true;
	
	let _fileName = testDataModule.getExcelTestData(pageData, dataColumnFileName);
	let _params = testDataModule.getExcelTestData(pageData, dataColumnParams);
	let _path = testDataModule.getExcelTestData(pageData, dataColumnPath);
	try {
		cmdModule.executeFile(_fileName,_params,_path);
		console.log(`Executing ${_fileName} using param ${_params} on path ${_path}`);
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to execute CMD: ${_fileName} ${_params} ${_path}` ,`Executing CMD: ${_fileName} ${_params} ${_path}` , _result);
};

/**
 * Executing .bat/.exe file 
 * 
 * @param fileName: bat/exe file to be execute
 * @returns: true/false
 */
exports.executeFile = function(pageData, dataColumnFileName) {
	let _result = true;
	
	let _fileName = testDataModule.getExcelTestData(pageData, dataColumnFileName);
	try {
		cmdModule.executeFile(_fileName);
		console.log(`Executing ${_fileName}`);
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to execute CMD: ${_fileName}` ,`Executing CMD: ${_fileName}` , _result);
};

/***********************************************************
********************** RegEdit Script **********************
***********************************************************/

/**
 * Fetch regEdit settings of current user
 */
exports.listAutoStartPrograms = function() {
	let _result = true;
	
	try {
		cmdModule.listAutoStartPrograms();
		console.log(`Fetching list Auto Start Programs`);
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to run regEdit to list all auto start programs` ,`Running regEdit to list all auto start programs` , _result);
};

/***********************************************************
 ********************* Execute Methods *********************
 **********************************************************/

/**
 * Executing .bat/.exe file 
 * 
 * @param fileName: bat/exe file to be execute form data sheet
 * @param timeOut: sleep until .exe/.bat is to be executed from data sheet
 * @returns: true/false
 */
exports.executeExeFile = function(pageData, dataColumnFileName, dataColumnTimeOut) {
	let _result = true;
	
	let _fileName = testDataModule.getExcelTestData(pageData, dataColumnFileName);
	let _timeOutInMiliSeconds = testDataModule.getExcelTestData(pageData, dataColumnFileName);
	try {
		setTimeoutPromise(_timeOutInMiliSeconds, true).then((value) => {
			// boolean === true (passing values is optional)
			// This is executed after about ${_timeOutInMiliSeconds} milliseconds.
			cmdModule.executeExeFile(_fileName);
			console.log(`Executing ${_fileName} after about ${_timeOutInMiliSeconds} milliseconds`);
		});
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to execute EXE: ${_fileName} after ${_timeOutInMiliSeconds} milli-seconds` ,`Executing EXE: ${_fileName} after ${_timeOutInMiliSeconds} milli-seconds` , _result);
};

/**
 * Executing .bat/.exe file 
 * 
 * @param fileName: bat/exe file to be execute
 * @param timeOut: sleep until .exe/.bat is to be executed
 * @returns: true/false
 */
exports.executeExeFile = function(_fileName, _timeOutInMiliSeconds) {
	let _result = true;
	
	try {
		setTimeoutPromise(_timeOutInMiliSeconds, true).then((value) => {
			// boolean === true (passing values is optional)
			// This is executed after about ${_timeOutInMiliSeconds} milliseconds.
			cmdModule.executeExeFile(_fileName);
			console.log(`Executing ${_fileName} after about ${_timeOutInMiliSeconds} milliseconds`);
		});
	} catch (error) {
		_result = false;
		console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	}
	
	reportModule.createSummaryOutputSubTestBody(`Verify user is able to execute EXE: ${_fileName} after ${_timeOutInMiliSeconds} milli-seconds` ,`Executing EXE: ${_fileName} after ${_timeOutInMiliSeconds} milli-seconds` , _result);
};