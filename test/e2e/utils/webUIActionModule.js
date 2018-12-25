/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

/**
 * Web page test data fetch method to be used
 */
const testDataModule = require('/Users/shankerthebunker/git/Protractor-Gradle/test/e2e/utils/testDataModule.js');
/**
 * Web page UI webElement creator method to be used
 */
const uiMapModule = require('/Users/shankerthebunker/git/Protractor-Gradle/test/e2e/utils/uiMapModule.js');

// http://www.collectionsjs.com/ --> for collections alternative in .js

let EC = protractor.ExpectedConditions;
let action = browser.actions();

let _result = false;
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
	_element = uiMapModule.getExcelUIMap(elementName);
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	console.log('Element found: ' + _element.locator());
	console.log('Test Data found: ' + _testData);
	
	try {
		_element.sendKeys(_testData);
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
	_element = uiMapModule.getExcelUIMap(elementName);
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	console.log('Element found: ' + _element.locator());
	console.log('Test Data found: ' + _testData);
	
	try {
		_element.clear();
		_element.sendKeys(_testData);
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
	_element = uiMapModule.getExcelUIMap(elementName);
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	console.log('Element found: ' + _element.locator());
	console.log('Test Data found: ' + _testData);
	
	try {
		expect(element(_element.locator()).$('option:checked').getText()).toEqual(_testData);
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
	_element = uiMapModule.getExcelUIMap(elementName);
	
	console.log('Element found: ' + _element.locator());
	
	try {
		_element.click();
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
	_element = uiMapModule.getExcelUIMap(elementName);
	
	console.log('Element found: ' + _element.locator());
	
	try {
		_element.sendKeys(protractor.Key.ENTER);
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
	_element = uiMapModule.getExcelUIMap(elementName);
	
	console.log('Element found: ' + _element.locator());
	
	try {
		_element.clear();
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
	_element = uiMapModule.getExcelUIMap(elementName);
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	console.log('Element found: ' + _element.locator());
	console.log('Test Data found: ' + _testData);
	
	try {
		expect(_element.getAttribute('value')).toEqual(_testData);
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
	_element = uiMapModule.getExcelUIMap(elementName);
	_testData = testDataModule.getExcelTestData(pageData, dataColumn);
	
	console.log('Element found: ' + _element.locator());
	console.log('Test Data found: ' + _testData);
	
	try {
		expect(_element.getText()).toEqual(_testData);
	} catch (error) {
		console.log(error.message);
	}
	
	return _result;
}