/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

//Project location path
const dirPath = browser.params.dirPath;

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

// http://www.collectionsjs.com/ --> for collections alternative in .js

let dragAndDrop = require('html-dnd').code;
let crypto = require('crypto');
let uuid = require('uuid');

/************************************************************
 **************** Browser/Window/Alert Action ***************
 ***********************************************************/

/**
 * launchApplication: launches to url of application under test
 * 
 * @param url: url of the said application
 * @result return type of action boolean (true/false)
 */
exports.launchApplication = function(pageData, dataColumn) {
	let _url = testDataModule.getExcelTestData(pageData, dataColumn);
	
	browser.get(_url).then(() => {
		console.log(`Opening URL ${_url} ...`);
	}).catch((error) => {
		console.error(`Couldn't opening URL ${_url} !!, error: ${error.message}`);
	});
		
	browser.driver.getSession().then((session) => {
		console.debug(session);
	}).catch((error) => {
		console.error(`Couldn't get browser session !!, error: ${error.message}`);
	});
};

/**
 * close: closes the current browser/tab open
 * 
 * @return return type of action boolean (true/false)
 */
exports.close = function () {
	browser.close().then(() => {
		console.log(`Closing browser ...`);
	}).catch((error) => {
		console.error(`Couldn't close browser !!, error: ${error.message}`);
	});
};

exports.maximize = function () {
	browser.driver.manage().window().maximize().then(() => {
		console.log(`Maximizing browser window ...`);
	}).catch((error) => {
		console.error(`Couldn't maximize browser window !!, error: ${error.message}`);
	});
};

/**
 * Clears all cookies on the browser
 */
exports.clearCokkies = function () {
	browser.manage().deleteAllCookies().then(() => {
		console.log(`Deleting cookies ...`);
	}).catch((error) => {
		console.error(`Couldn't delete cookies !!, error: ${error.message}`);
	});
};

/**
 * Clears any user/non-user session currently active on the browser
 */
exports.clearSession = function () {
	browser.executeScript('window.sessionStorage.clear();').then(() => {
		console.log(`Executing window.sessionStorage.clear() ...`);
	}).catch((error) => {
		console.error(`Couldn't execute window.sessionStorage.clear() !!, error: ${error.message}`);
	});
		
	browser.executeScript('window.localStorage.clear();').then(() => {
		console.log(`Executing window.localStorage.clear() ...`);
	}).catch((error) => {
		console.error(`Couldn't execute window.localStorage.clear() !!, error: ${error.message}`);
	});
};

/**
 * Restarts the browser instance
 */
exports.restart = function () {
	browser.restart().then(() => {
		console.log(`Restarting ...`);
	}).catch((error) => {
		console.error(`Couldn't restart !!, error: ${error.message}`);
	});
};

/**
 * Navigate back a page on the browser
 */
exports.back = function () {
	browser.navigate().back().then(() => {
		console.log(`Navigating back ...`);
	}).catch((error) => {
		console.error(`Couldn't navigate back !!, error: ${error.message}`);
	});
};

/**
 * Refreshs the browser page
 */
exports.refresh = function () {
	browser.navigate().refresh().then(() => {
		console.log(`Refreshing ...`);
	}).catch((error) => {
		console.error(`Couldn't refresh !!, error: ${error.message}`);
	});
};

/**
 * Wait on browser in milliseconds
 */
exports.sleep = function (_sleepTimeOutInMilliSeconds) {
	browser.sleep(_sleepTimeOutInMilliSeconds).then(() => {
		console.log(`Waiting ...`);
	}).catch((error) => {
		 console.error(`Couldn't wait !!, error: ${error.message}`);
	});
};

/**
 * Sleep on webDriver instance in milliSeconds
 */
exports.driverSleep = function (_sleepTimeOutInMilliSeconds) {
	browser.driver.sleep(_sleepTimeOutInMilliSeconds).then(() => {
		console.log(`Waiting ...`);
	}).catch((error) => {
		 console.error(`Couldn't wait !!, error: ${error.message}`);
	});
};

/**
 * Checks for an alert on the page and, dismisses it
 */
exports.dismissAlert  = function () {
	conditionsModule.alertIsPresent().then(() => {
		console.log(`Alert is found`);
		
		browser.switchTo().alert().dismiss().then(() => {
			console.log(`Alert is found and, dismissed`);
		}).catch((error) => {
		    console.error(`Alert dismiss failed, error: ${error.message}`);
		});
      }).catch((error) => {
        console.error(`Alert is not found, error: ${error.message}`);
      });
};

/**
 * Checks for an alert on the page and, accepts it
 */
exports.acceptAlert  = function () {
	conditionsModule.alertIsPresent().then(() => {
		console.log(`Alert is found`);
		
		browser.switchTo().alert().accept().then(() => {
			console.log(`Alert is found and, accepted`);
		}).catch((error) => {
			console.error(`Alert accept failed, error: ${error.message}`);
		});
	}).catch((error) => {
	    console.error(`Alert is not found, error: ${error.message}`);
	});
};

exports.switchToWindowHandle = function (pageData, dataColumn) {
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	let _result = false;
	
	try {
		browser.getAllWindowHandles().then(function(handles){
			 for (let windowHandle of handles) {
				 browser.switchTo().window(windowHandle);
				 
				 browser.getTitle().then(function(title){
					if(title == '_testData' && _result === false){
						console.log(`Successfully switched to window handle with title ${_testData}`);
						_result = true;
					}
				});
				 
				if (_result)
					break;
			 };
		});
	} catch (error) {
		console.error(`error: ${error.message}`);
		return null;
	}
};

exports.switchToFrame = function(elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.switchTo().frame(_element).then(() => {
			console.log(`Switched to frame ${elementName}`);
		}).catch((error) => {
			console.error(`Failed to switch to frame ${elementName}, error: ${error.message}`);
		});
	} catch (error) {
		console.error(`error: ${error.message}`);
		return null;
	}
};

exports.switchToDefaultContent = function() {
	try {
		browser.switchTo().defaultContent().then(() => {
			console.log(`Switching back from frame`);
		}).catch((error) => {
			console.error(`Switching back from frame failed, error: ${error.message}`);
		});
	} catch (error) {
		console.error(`error: ${error.message}`);
		return null;
	}
};

/************************************************************
 ****************** WebElement/WebElements ******************
 ***********************************************************/

exports.getWebElement = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		return _element;
	} catch (error) {
		console.error(`error: ${error.message}`);
		return null;
	}
};

exports.getWebElements = function (elementName) {
	try {
		let _elements = uiMapModule.getExcelUIMapList(elementName);
		return _elements;
	} catch (error) {
		console.error(`error: ${error.message}`);
		return null;
	}
};

/************************************************************
 ********************* Keyboard Action **********************
 ***********************************************************/

/**
 * setValue: send keys on the element
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.setValue = function (elementName, pageData, dataColumn) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	_element.clear().then(() => {
		console.log(`Element ${elementName} clear is passed`);
	}).catch((error) => {
	    console.error(`Element ${elementName} clear is failed, error: ${error.message}`);
	});
		
	_element.sendKeys(_testData).then(() => {
		console.log(`Element ${elementName} setValue ${_testData} is passed`);
	}).catch((error) => {
	    console.error(`Element ${elementName} setValue ${_testData} is failed, error: ${error.message}`);
	});
};

/**
 * setValueRandomString: send keys on the element
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.setValueRandom = function (elementName, pageData, dataColumn) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	if (_testData !== null || _testData !== '')
		_testData += generateString();
	else
		_testData = generateString();
		
	_element.clear().then(() => {
		console.log(`Element ${elementName} clear is passed`);
	}).catch((error) => {
	    console.error(`Element ${elementName} clear is failed, error: ${error.message}`);
	});
		
	_element.sendKeys(_testData).then(() => {
		console.log(`Element ${elementName} setValue ${_testData} is passed`);
	}).catch((error) => {
	    console.error(`Element ${elementName} setValue ${_testData} is failed, error: ${error.message}`);
	});
};

/**
 * setValueTimeStamp: send keys on the element
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.setValueTimeStamp = function (elementName, pageData, dataColumn) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	if (_testData !== null || _testData !== '')
		_testData += getTimeStamp();
	else
		_testData = getTimeStamp();
		
	_element.clear().then(() => {
		console.log(`Element ${elementName} clear is passed`);
	}).catch((error) => {
	    console.error(`Element ${elementName} clear is failed, error: ${error.message}`);
	});
		
	_element.sendKeys(_testData).then(() => {
		console.log(`Element ${elementName} setValue ${_testData} is passed`);
	}).catch((error) => {
	    console.error(`Element ${elementName} setValue ${_testData} is failed, error: ${error.message}`);
	});
};

/**
 * setValueEnter: send keys on the element and, press enter
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.setValueEnter = function (elementName, pageData, dataColumn) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	_element.clear().then(() => {
		console.log(`Element ${elementName} clear is passed`);
	}).catch((error) => {
	    console.error(`Element ${elementName} clear is failed, error: ${error.message}`);
	});
		
	_element.sendKeys(_testData + protractor.Key.ENTER).then(() => {
		console.log(`Element ${elementName} setValue ${_testData + protractor.Key.ENTER} is passed`);
	}).catch((error) => {
	   console.error(`Element ${elementName} setValue ${_testData + protractor.Key.ENTER} is failed, error: ${error.message}`);
	});
};

/**
 * setValueCharByChar: send keys on the element character by character
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.setValueCharByChar = function (elementName, pageData, dataColumn) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	_element.clear().then(() => {
		console.log(`Element ${elementName} clear is passed`);
      }).catch((error) => {
        console.error(`Element ${elementName} clear is failed, error: ${error.message}`);
      });
	
	let chars = _testData.split('');
	
	for (let i=0; i<chars.length; i++) {
		_element.sendKeys(chars[i]).then(() => {
			console.log(`Element ${elementName} setValue ${chars[i]} is passed`);
	      }).catch((error) => {
	        console.error(`Element ${elementName} setValue ${chars[i]} is failed, error: ${error.message}`);
	      });
		
		browser.sleep(500).then(() => {
			console.log(`Waiting ...`);
		}).catch((error) => {
			 console.error(`Couldn't wait !!, error: ${error.message}`);
		});
	}
};

/**
 * select: send keys on the element to select by text
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.select = function (elementName, pageData, dataColumn) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	_element.sendKeys(_testData).then(() => {
		console.log(`Element ${elementName} select data ${_testData} is passed`);
	 }).catch((error) => {
	    console.error(`Element ${elementName} select data ${_testData} is failed, error: ${error.message}`);
	 });
};

/**
 * sendKeysEnter: perform click on the element
 * 
 * @param elementName: element created to web page interaction
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.sendKeysEnter = function (elementName) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_element.sendKeys(protractor.Key.ENTER).then(() => {
		console.log(`Element ${elementName} send keys enter is passed`);
	}).catch((error) => {
	    console.error(`Element ${elementName} send keys enter is failed, error: ${error.message}`);
	});
};

/**
 * clear: perform clear on the element text field
 * 
 * @param elementName: element created to web page interaction
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.clear = function (elementName) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_element.clear().then((isTrue) => {
		console.log(`Element ${elementName} clear is passed`);
	 }) .catch((error) => {
	    console.error(`Element ${elementName} clear is failed, error: ${error.message}`);
	 });
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
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.verifySelectOption = function (elementName, pageData, dataColumn) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		element(_element.locator()).$('option:checked').getText().then(function (text) {
	        if (text === _testData || text.includes(_testData) || _testData.includes(text)) {
	        	console.log(`Element ${elementName} selected option ${_testData} to ${text} is passed`);
	        } else {
	        	console.log(`Element ${elementName} selected option ${_testData} to ${text} is failed`);
	        }
		});
		
		let _data = element(_element.locator()).$('option:checked').getText();
		expect(_data).toContain(_testData);
	} catch (error) {
		console.error(`Element ${elementName} selected option ${_testData} is failed, error: ${error.message}`);
	}
};

/**
 * verifyValue: verify value on the element
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.verifyValue = function (elementName, pageData, dataColumn) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		_element.getAttribute('value').then(function (text) {
	        if (text === _testData || text.includes(_testData) || _testData.includes(text)) {
	        	console.log(`Element ${elementName} get value ${_testData} to ${text} is passed`);
	        } else {
	        	console.log(`Element ${elementName} get value ${_testData} to ${text} is failed`);
	        }
		});
		
		let _data = _element.getAttribute('value');
		expect(_data).toContain(_testData);
	} catch (error) {
		console.error(`Element ${elementName} get value ${_testData} is failed, error: ${error.message}`);
	}
};

/**
 * verifyText: verify text on the element by getText()
 * 
 * @param elementName: element created to web page interaction
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.verifyText = function (elementName, pageData, dataColumn) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		_element.getText().then(function (text) {
	        if (text === _testData || text.includes(_testData) || _testData.includes(text)) {
	        	console.log(`Element ${elementName} get text ${_testData} to ${text} is passed`);
	        } else {
	        	console.error(`Element ${elementName} get text ${_testData} to ${text} is failed`);
	        }
		});
			
		let _data = _element.getText();
		expect(_data).toContain(_testData);
	} catch (error) {
		console.log(`Element ${elementName} get text ${_testData} is failed, error: ${error.message}`);
	}
};

/**
 * verifyPageTitle: validates if correct page title is open
 * 
 * @param pageData: sheetName and, _rowId from where to pick data
 * @param dataColumn: column under which test data is to found
 * 
 * @result: return type of action boolean (true/false)
 */
exports.verifyPageTitle = function(pageData, dataColumn) {	
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		browser.getTitle().then(function (text) {
	        if (text === _testData || text.includes(_testData) || _testData.includes(text)) {
	        	console.log(`Verify title ${_testData} to ${_data} is passed`);
	        } else {
	        	console.log(`Verify title ${_testData} to ${_data} is failed`);
	        }
		});
		
		let _data = browser.getTitle();
		expect(_data).toContain(_testData);
	} catch (error) {
		console.error(`Verify title ${_testData} is failed, error: ${error.message}`);
	}
};

exports.verifyAlertText = function (pageData, dataColumn) {	
	let _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		conditionsModule.alertIsPresent();
		
		browser.switchTo().alert().getText().then(function (text) {
	        if (text === _testData || text.includes(_testData) || _testData.includes(text)) {
	        	console.log(`Alert get text ${_testData} to ${text} is passed`);
	        } else {
	        	console.error(`Alert get text ${_testData} to ${text} is failed`);
	        }
		});
		
		let _data = browser.switchTo().alert().getText();
		expect(_data).toContain(_testData);
	} catch (error) {
		console.error(`Verify alet text ${_testData} is failed, error: ${error.message}`);
	}
};

/**
 * Verify if element is displayed or, not
 * 
 * @param elementName: element created to web page interaction
 * 
 * @returns: return type of element action boolean (true/false)
 */
exports.verifyElementIsDisplayed = function(elementName) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		let isDisplayed = _element.isDisplayed();
		expect(isDisplayed).toBeTruthy();
        
        if (isDisplayed) {
	        console.log(`Element ${elementName} is displayed passed`);
        } else {
        	console.log(`Element ${elementName} is displayed failed`);
        }
	} catch (error) {
		console.error(`Element ${elementName} is displayed failed, error: ${error.message}`);
	}
};

exports.verifyElementIsNotPresent = function(elementName) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		let isPresent = _element.isPresent();
		expect(isPresent).to.become(false).and.notify(next);
        
        if (!isPresent) {
	        console.log(`Element ${elementName} is not displayed passed`);
        } else {
        	console.log(`Element ${elementName} is displayed failed`);
        }
	} catch (error) {
		console.error(`Element ${elementName} is displayed failed, error: ${error.message}`);
	}
};

/************************************************************
 *********************** Mouse Action ***********************
 ***********************************************************/

/**
 * click: perform click on the element
 * 
 * @param elementName: element created to web page interaction
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.click = function (elementName) {	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_element.click().then(() => {
		console.log(`Element ${elementName} click is passed`);
	}).catch((error) => {
	    console.error(`Element ${elementName} click is failed, error: ${error.message}`);
	});
};

/**
 * Performs double click action on an element
 * 
 * @param elementName: element created to web page interaction
 * 
 * @return: return type of element action boolean (true/false)
 */
exports.doubleClick = function(elementName) {
	let _action = browser.actions();
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_action.doubleClick(_element).perform().then(() => {
		console.log(`Element ${elementName} mouse double click is passed`);
	}).catch((error) => {
	    console.error(`Element ${elementName} mouse double click is failed, error: ${error.message}`);
	});
};

/**
 * Performs right click on a webElement
 * 
 * @param elementName: element created to web page interaction
 * 
 * @return: return type of element action boolean (true/false)
 */
exports.rightClick = function(elementName) {
	let _action = browser.actions();
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_action.mouseMove(_element.getLocation()).perform().then(() => {
		console.log(`Element ${elementName} mouse move is passed`);
	 }).catch((error) => {
	    console.error(`Element ${elementName} mouse move is failed, error: ${error.message}`);
	 });
		
	_action.click(protractor.Button.RIGHT).perform().then(() => {
		console.log(`Element ${elementName} mouse click right is passed`);
	 }).catch((error) => {
	    console.error(`Element ${elementName} mouse click right is failed, error: ${error.message}`);
	 });
};

/**
 * Performs mouse hover action to check tool tips etc. 
 * 
 * @param elementName: element created to web page interaction
 * 
 * @return: return type of element action boolean (true/false)
 */
exports.mouseHoverAction = function(elementName) {
	let _action = browser.actions();	
	let _element = uiMapModule.getExcelUIMap(elementName);
	
	_action.mouseMove(_element).perform().then(() => {
		console.log(`Element ${elementName} mouse over is passed`);
	 }).catch((error) => {
	    console.error(`Element ${elementName} mouse over is failed, error: ${error.message}`);
	 });
};

exports.dragAndDrop = function (elementFrom, elementTo) {
	let _action = browser.actions();	
	let _fromElement = uiMapModule.getExcelUIMap(elementFrom);
	let _toElement = uiMapModule.getExcelUIMap(elementTo);
	
	_action.dragAndDrop(_fromElement, _toElement).perform().then(() => {
		console.log(`Element ${elementFrom} drag to Element ${elementTo} is passed`);
    }).catch((error) => {
      console.error(`Element ${elementFrom} drag to Element ${elementTo} is failed, error: ${error.message}`);
    });
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
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
		console.error(`error: ${error.message}`);
		return false;
	}
};

/************************************************************
 *********************JavaScript Action *********************
 ***********************************************************/

exports.highlightElement = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.executeScript('arguments[0].setAttribute(\'style\', arguments[1]);', _element.getWebElement(), 'color: green; background-color: #FFFF00;').then(() => {
			console.log(`Giving highlight style to element ${elementName} ...`);
		}).catch((error) => {
			console.error(`Couldn't give highlight style to element ${elementName} !!, error: ${error.message}`);
		});
		
		browser.sleep(1000).then(() => {
			console.log(`Waiting ...`);
		}).catch((error) => {
			console.error(`Couldn't wait !!, error: ${error.message}`);
		});
		
		browser.executeScript('arguments[0].setAttribute(\'style\', arguments[1]);', _element.getWebElement(), '').then(() => {
			console.log(`Removing highlight style to element ${elementName} ...`);
		}).catch((error) => {
			console.error(`Couldn't remove highlight style to element ${elementName} !!, error: ${error.message}`);
		});
		
		return true;
	} catch (error) {
		console.error(`error: ${error.message}`);
		return false;
	}
};

exports.highlightWebElement = function (_elementName) {
	try {
		browser.executeScript('arguments[0].setAttribute(\'style\', arguments[1]);', _elementName.getWebElement(), 'color: green; background-color: #FFFF00;').then(() => {
			console.log(`Giving highlight style to element ${_elementName.locator()} ...`);
		}).catch((error) => {
			console.error(`Couldn't give highlight style to element ${_elementName.locator()} !!, error: ${error.message}`);
		});
		
		browser.sleep(2000).then(() => {
			console.log(`Waiting ...`);
		}).catch((error) => {
			console.error(`Couldn't wait !!, error: ${error.message}`);
		});
		
		browser.executeScript('arguments[0].setAttribute(\'style\', arguments[1]);', _elementName.getWebElement(), '').then(() => {
			console.log(`Removing highlight style to element ${_elementName.locator()} ...`);
		}).catch((error) => {
			console.error(`Couldn't remove highlight style to element ${_elementName.locator()} !!, error: ${error.message}`);
		});
		
		return true;
	} catch (error) {
		console.error(`error: ${error.message}`);
		return false;
	}
};

exports.unhideElement = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.executeScript(function (arguments) {
		    arguments[0].style.visibility = 'visible'; 
		    arguments[0].style.display = 'block';
		}, _element.getWebElement()).then(() => {
			console.log(`Making element ${elementName} visible`);
		}).catch((error) => {
			console.error(`Failed to make element ${elementName} visible, error: ${error.message}`);
		});
		
		return true;
	} catch (error) {
		console.error(`error: ${error.message}`);
		return false;
	}
};

exports.javaScriptClick = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.executeScript('arguments[0].click();', _element.getWebElement()).then(() => {
			console.log(`Java Script click on element ${elementName}`);
		}).catch((error) => {
			console.error(`Java Script click on element ${elementName} failed, error: ${error.message}`);
		});
		
		return true;
	} catch (error) {
		console.error(`error: ${error.message}`);
		return false;
	}
};
	
exports.mouseHoverJavaScript = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.executeScript('if(document.createEvent){var evObj = document.createEvent(\'MouseEvents\');evObj.initEvent(\'mouseover\', true, false); arguments[0].dispatchEvent(evObj);} else if(document.createEventObject) { arguments[0].fireEvent(\'onmouseover\');}', _element.getWebElement());
		
		return true;
	} catch (error) {
		console.error(`error: ${error.message}`);
		return false;
	}
};	
	
exports.scrollingToElement = function (elementName) {
	try {
		let _element = uiMapModule.getExcelUIMap(elementName);
		
		browser.executeScript('arguments[0].scrollIntoView(true);', _element.getWebElement()).then(() => {
			console.log(`Scrolling onto element ${elementName}`);
		}).catch((error) => {
			console.error(`Scrolling onto element ${elementName} failed, error: ${error.message}`);
		});
		
		return true;
	} catch (error) {
		console.error(`error: ${error.message}`);
		return false;
	}
};
	
exports.dragAndDropHtmlDnD = function (elementFrom, elementTo) {
	try {
		let _fromElement = uiMapModule.getExcelUIMap(elementFrom);
		let _toElement = uiMapModule.getExcelUIMap(elementTo);
		
		browser.executeScript(dragAndDrop, _fromElement, _toElement).then(() => {
			console.log(`drag element ${elementFrom} to element ${elementTo}`);
		}).catch((error) => {
			console.error(`drag element ${elementFrom} to element ${elementTo} failed, error: ${error.message}`);
		});
		
		return true;
	} catch (error) {
		console.error(`error: ${error.message}`);
		return false;
	}
};	

/************************************************************
 ********************* Utility Methods **********************
 ***********************************************************/

generateString = function() {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};

generateCryptoHexString = function(length) {
	if (typeof length !== 'number')
		throw 'length should be a number';
	return crypto.randomBytes(Math.floor(length/2)).toString('hex');
};

generateUUIDString = function() {
	return uuid.v4();
};

getTimeStamp = function () {
	return new Date().getTime();
};