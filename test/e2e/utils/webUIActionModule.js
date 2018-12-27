/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

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
		
		_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

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
		
		_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

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
		
		if (_data === _testData)
			_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

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
		console.log(error.message);
	}
	
	return _result;
}

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
		console.log(error.message);
	}
	
	return _result;
}

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
		console.log(error.message);
	}
	
	return _result;
}

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
		
		if (_data === _testData)
			_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;	
}

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
		
		if (_data === _testData)
			_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

close = function () {
	let _result = false;
	
	try {
		browser.close();
		
		_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

clearCokkies = function () {
	let _result = false;
	
	try {
		browser.manage().deleteAllCookies();
		
		_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

clearSession = function () {
	let _result = false;
	
	try {
		browser.executeScript('window.sessionStorage.clear();');
		browser.executeScript('window.localStorage.clear();');
		
		_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

restart = function () {
	let _result = false;
	
	try {
		browser.restart();
		
		_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

back = function () {
	let _result = false;
	
	try {
		browser.navigate().back();
		
		_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

refresh = function () {
	let _result = false;
	
	try {
		browser.navigate().refresh();
		
		_result = true;
	}  catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

doubleClick = function(elementName) {
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		action.doubleClick(_element).perform();
		
		_result = true;
	}  catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

rightClick = function(elementName) {
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		browser.actions().mouseMove(_element.getLocation()).perform();
		browser.actions().click(protractor.Button.RIGHT).perform();
		
		_result = true;
	}  catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

mouseHoverAction = function(elementName) {
	let _result = false;
	
	_element = uiMapModule.getExcelUIMap(elementName);
	
	try {
		browser.actions().mouseMove(_element).perform();
		
		_result = true;
	}  catch (error) {
		console.log(error.message);
	}
	
	return _result;
}

verifyPageTitle = function(pageData, dataColumn) {
	let _result = false;
	
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	try {
		let _data = browser.getTitle();
		expect(browser.getTitle()).toEqual(_testData);
		
		if (_data === _testData)
			_result = true;
	}  catch (error) {
		console.log(error.message);
	}
	
	return _result;
}