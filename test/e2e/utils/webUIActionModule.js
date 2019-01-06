/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

// Initialize the eyes SDK and set your private API key.
// devDependencies as : "eyes.selenium": "0.0.83",
// let Eyes = require('eyes.selenium').Eyes;
// let eyes = new Eyes();
// eyes.setApiKey(browser.params.API_KEY);

//Project location path
const dirPath = '/Users/shankerthebunker/git/Protractor-Gradle';

/**
 * Web page test data fetch method to be used
 */
const testDataModule = require(dirPath + '/test/e2e/utils/testDataModule.js');
/**
 * Web page UI webElement creator method to be used
 */
const uiMapModule = require(dirPath + '/test/e2e/utils/uiMapModule.js');

// http://www.collectionsjs.com/ --> for collections alternative in .js

let EC = protractor.ExpectedConditions;
let action = browser.actions();

let _element = null;
let _testData = null;

/**
 * launchApplication: launches to url of application under test
 * 
 * @param url: url of the said application
 * @result return type of action boolean (true/false)
 */
exports.launchApplication = function(pageData, dataColumn, testCasePurpose) {
	let _result = false;
	
	try {
		let _url = testDataModule.getExcelTestData(pageData, dataColumn);
		
		browser.driver.getSession().then((session) => {
		      console.debug(session);
		});
		
		// eyes.open(browser, testCasePurpose, testCasePurpose + '_' + (new Date()).getTime());
		
		browser.get(_url);
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

/**
 * close: closes the current browser/tab open
 * 
 * @return return type of action boolean (true/false)
 */
exports.close = function () {
	let _result = false;
	
	try {
		browser.manage().logs().get('browser').then(function(browserLog) {
		  console.log('log: ' + require('util').inspect(browserLog));
		});
		
		browser.close();
		
		// eyes.close();
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

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
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		_element.clear();
		_element.sendKeys(_testData);
		
		// eyes.checkWindow(_testData);
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

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
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		let _data = element(_element.locator()).$('option:checked').getText();
		expect(element(_element.locator()).$('option:checked').getText()).toEqual(_testData);
		
		// eyes.checkWindow(_testData);
		
		if (_data === _testData)
			_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
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
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		let _data = _element.getAttribute('value');
		expect(_element.getAttribute('value')).toEqual(_testData);
		
		// eyes.checkWindow(_testData);
		
		if (_data === _testData)
			_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;	
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
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		let _data = _element.getText();
		expect(_element.getText()).toEqual(_testData);
		
		// eyes.checkWindow(_testData);
		
		if (_data === _testData)
			_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
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
	let _result = false;
	
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		let _data = browser.getTitle();
		expect(browser.getTitle()).toEqual(_testData);
		
		// eyes.checkWindow(_testData);
		
		if (_data === _testData)
			_result = true;
	}  catch (error) {
		console.error(error.message);
	}
	
	return _result;
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
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		_element.sendKeys(_testData);
		
		// eyes.checkWindow(_testData);
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

/**
 * click: perform click on the element
 * 
 * @param elementName: element created to web page interaction
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.click = function (elementName) {
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		_element.click();
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

/**
 * sendKeysEnter: perform click on the element
 * 
 * @param elementName: element created to web page interaction
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.sendKeysEnter = function (elementName) {
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		_element.sendKeys(protractor.Key.ENTER);
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

/**
 * clear: perform clear on the element text field
 * 
 * @param elementName: element created to web page interaction
 * 
 * @result: return type of element action boolean (true/false)
 */
exports.clear = function (elementName) {
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		_element.clear();
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

exports.clearCokkies = function () {
	let _result = false;
	
	try {
		browser.manage().deleteAllCookies();
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

exports.clearSession = function () {
	let _result = false;
	
	try {
		browser.executeScript('window.sessionStorage.clear();');
		browser.executeScript('window.localStorage.clear();');
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

exports.restart = function () {
	let _result = false;
	
	try {
		browser.restart();
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

exports.back = function () {
	let _result = false;
	
	try {
		browser.navigate().back();
		
		_result = true;
	} catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

exports.refresh = function () {
	let _result = false;
	
	try {
		browser.navigate().refresh();
		
		_result = true;
	}  catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

exports.doubleClick = function(elementName) {
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		action.doubleClick(_element).perform();
		
		_result = true;
	}  catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

exports.rightClick = function(elementName) {
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		browser.actions().mouseMove(_element.getLocation()).perform();
		browser.actions().click(protractor.Button.RIGHT).perform();
		
		_result = true;
	}  catch (error) {
		console.error(error.message);
	}
	
	return _result;
};

exports.mouseHoverAction = function(elementName) {
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		browser.actions().mouseMove(_element).perform();
		
		_result = true;
	}  catch (error) {
		console.error(error.message);
	}
	
	return _result;
};
