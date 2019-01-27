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
 * Web page UI action method to be used
 */
const uiDriver = require(dirPath + '/test/e2e/utils/webUIActionModule.js');

/**
 * Super Calculator Class to script/add components for
 * activity flow diagram which is to be performed
 */
var SuperCalculator = function () {
	
	/**
	 * launchUrl method to launch application url which is under test
	 */
	this.launchUrl = function (_rowId, testCasePurpose) {
		if (_rowId === null || _rowId === undefined)
			throw '_rowId cannot be null';
		else 
			pageData = 'launchUrl.' + _rowId;
		
		uiDriver.launchApplication(pageData, 'Navigate@URL', testCasePurpose);
	};
	
	/**
	 * Module method to perform module of two number and,  verify the result
	 */
	this.Module = function (_rowId) {
		if (_rowId === null || _rowId === undefined)
			throw '_rowId cannot be null';
		else 
			pageData = 'Module.' + _rowId;
		
		uiDriver.setValue ('Module.first', pageData, 'type@ValueOne');
		
		uiDriver.verifyValue ('Module.first', pageData, 'type@ValueOne');
		
		uiDriver.setValue ('Module.second', pageData, 'type@ValueTwo');
		
		uiDriver.verifyValue ('Module.second', pageData, 'type@ValueTwo');
		
		uiDriver.select ('Module.operator', pageData, 'Select@Operator');
		
		uiDriver.verifySelectOption ('Module.operator', pageData, 'Select@Operator');
		
		uiDriver.click ('Module.submit');
		
		uiDriver.verifyText ('Module.output', pageData, 'verify@Output');
	};

	/**
	 * Add method to perform addition of two number and,  verify the result
	 */
	this.Add = function(_rowId) {
		if (_rowId === null || _rowId === undefined)
			throw '_rowId cannot be null';
		else 
			pageData = 'Add.' + _rowId;
		
		uiDriver.setValue ('Add.first', pageData, 'type@ValueOne');
		
		uiDriver.verifyValue ('Add.first', pageData, 'type@ValueOne');
		
		uiDriver.setValue ('Add.second', pageData, 'type@ValueTwo');
		
		uiDriver.verifyValue ('Add.second', pageData, 'type@ValueTwo');

		uiDriver.select ('Add.operator', pageData, 'Select@Operator');
		
		uiDriver.verifySelectOption ('Add.operator', pageData, 'Select@Operator');
		
		uiDriver.click ('Add.submit');
		
		uiDriver.verifyText ('Add.output', pageData, 'verify@Output');
	};

	/**
	 * Substract method to perform substraction of two number and,  verify the result
	 */
	this.Substract = function(_rowId) {
		if (_rowId === null || _rowId === undefined)
			throw '_rowId cannot be null';
		else 
			pageData = 'Substract.' + _rowId;
		
		uiDriver.setValue ('Substract.first', pageData, 'type@ValueOne');
		
		uiDriver.verifyValue ('Substract.first', pageData, 'type@ValueOne');
		
		uiDriver.setValue ('Substract.second', pageData, 'type@ValueTwo');
		
		uiDriver.verifyValue ('Substract.second', pageData, 'type@ValueTwo');
		
		uiDriver.select ('Substract.operator', pageData, 'Select@Operator');
		
		uiDriver.verifySelectOption ('Substract.operator', pageData, 'Select@Operator');
		
		uiDriver.click ('Substract.submit');
		
		uiDriver.verifyText ('Substract.output', pageData, 'verify@Output');
	};
	
	/**
	 * Multiply method to perform multiplication of two number and,  verify the result
	 */
	this.Multiply = function(_rowId) {
		if (_rowId === null || _rowId === undefined)
			throw '_rowId cannot be null';
		else 
			pageData = 'Multiply.' + _rowId;
		
		uiDriver.setValue ('Multiply.first', pageData, 'type@ValueOne');
		
		uiDriver.verifyValue ('Multiply.first', pageData, 'type@ValueOne');
		
		uiDriver.setValue ('Multiply.second', pageData, 'type@ValueTwo');
		
		uiDriver.verifyValue ('Multiply.second', pageData, 'type@ValueTwo');

		uiDriver.select ('Multiply.operator', pageData, 'Select@Operator');
		
		uiDriver.verifySelectOption ('Multiply.operator', pageData, 'Select@Operator');
		
		uiDriver.click ('Multiply.submit');
		
		uiDriver.verifyText ('Multiply.output', pageData, 'verify@Output');
	};
	
	/**
	 * Divide method to perform division of two number and,  verify the result
	 */
	this.Divide = function(_rowId) {
		if (_rowId === null || _rowId === undefined)
			throw '_rowId cannot be null';
		else 
			pageData = 'Divide.' + _rowId;
		
		uiDriver.setValue ('Divide.first', pageData, 'type@ValueOne');
		
		uiDriver.verifyValue ('Divide.first', pageData, 'type@ValueOne');
		
		uiDriver.setValue ('Divide.second', pageData, 'type@ValueTwo');
		
		uiDriver.verifyValue ('Divide.second', pageData, 'type@ValueTwo');

		uiDriver.select ('Divide.operator', pageData, 'Select@Operator');
		
		uiDriver.verifySelectOption ('Divide.operator', pageData, 'Select@Operator');
		
		uiDriver.click ('Divide.submit');
		
		uiDriver.verifyText ('Divide.output', pageData, 'verify@Output');
	};
	
	/**
	 * Close  browser after application test has been performed
	 */
	this.closeBrowser = function () {
		uiDriver.close();
	};
};

module.exports = SuperCalculator;