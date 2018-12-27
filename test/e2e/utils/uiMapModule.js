/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

//Project location path
const dirPath = '/Users/shankerthebunker/git/Protractor-Gradle';

var XLSX = require('xlsx');

/**
 * read uiMap.xlsx using 'npm xlsx'
 */
readUIMap = function() {
	var workbook = XLSX.readFile(dirPath + '/test/e2e/resources/uiMap.xlsx');
	return workbook;
}

/**
 * Find json format for uiMap.xlsx
 * 
 * @return json string  value
 */
toUIMapJson = function() {
	try {
		var workbook = readUIMap();
		var jsonResult = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
			if (roa.length > 0) {
				jsonResult[sheetName] = roa;
			}
		});
		return jsonResult;
	} catch (error) {
		console.error(error.message);
		return null;
	}
}

/**
 * fetchElementBy: creates ElementFinder.locator and, webElement for 
 * protractor automation from uiMap.xlsx
 * 
 * @param locatorType: type of locators to choose from  Object Repo.
 * @param locator: locator string 
 * 
 * @return protractor web element
 */
fetchElementBy = function(locatorType, locator) {
	locatorType = locatorType.replace(/(^\s+|\s+$)/g, '');
	var _element = undefined;
	
	try {
		switch (locatorType) {
		case 'id':
			_element = element(by.id(locator));
			break;
			
		case 'name':
			_element = element(by.name(locator));
			break;

		case 'css':
			_element = element(by.css(locator));
			break;

		case 'className':
			_element = element(by.className(locator));
			break;

		case 'xpath':
			_element = element(by.xpath(locator));
			break;

		case 'linkText':
			_element = element(by.linkText(locator));
			break;

		case 'partialLinkText':
			_element = element(by.partialLinkText(locator));
			break;

		case 'buttonText':
			_element = element(by.buttonText(locator));
			break;

		case 'partialButtonText':
			_element = element(by.partialButtonText(locator));
			break;

		case 'deepCss':
			_element = element(by.deepCss(locator));
			break;

		case 'binding':
			_element = element(by.binding(locator));
			break;

		case 'exactBinding':
			_element = element(by.exactBinding(locator));
			break;

		case 'model':
			_element = element(by.model(locator));
			break;

		case 'repeater':
			_element = element(by.repeater(locator));
			break;

		case 'exactRepeater':
			_element = element(by.exactRepeater(locator));
			break;

		case 'options':
			_element = element(by.options(locator));
			break;

		default:
			throw 'No Such Element Locator Type Found';
		}
	} catch (error) {
		console.error(error.message);
	}
	
	return _element;
}

/**
 * getExcelUIMap: create and, return webElement
 * 
 * @param: elementName: element string from xlsx map
 * @return: protractor element 
 */
exports.getExcelUIMap = function(elementName) {
	var __element = '';

	try {
		var pageName = elementName.split('.')[0];
		var locator = elementName.split('.')[1];

		var workbook = readUIMap();
		var worksheet = workbook.Sheets['locators'];
		var excelRows = XLSX.utils.sheet_to_row_object_array(worksheet);

		for (var i = 0; i < excelRows.length; i++) {
			if (excelRows[i].pageName === pageName && excelRows[i].elementName === locator) {
				__element = fetchElementBy(excelRows[i].locatorTypes, excelRows[i].locator);
				break;		
			}
		}
	} catch (error) {
		console.error(error.message);
	}
	return __element;
}