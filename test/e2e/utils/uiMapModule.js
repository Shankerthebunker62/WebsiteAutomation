/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

//Project location path
const dirPath = browser.params.dirPath;

let XLSX = require('xlsx');

/**
 * read uiMap.xlsx using 'npm xlsx'
 */
readUIMap = function() {
	let workbook = XLSX.readFile(dirPath + '/test/e2e/resources/uiMap.xlsx');
	return workbook;
}

/**
 * Find json format for uiMap.xlsx
 * 
 * @return json string  value
 */
toUIMapJson = function() {
	try {
		let workbook = readUIMap();
		let jsonResult = {};
		workbook.SheetNames.forEach(function(sheetName) {
			let roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
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
	let _element = undefined;
	
	try {
		switch (locatorType) {
		case 'id':
			_element = element (by.id(locator));
			break;
			
		case 'name':
			_element = element (by.name(locator));
			break;

		case 'css':
			_element = element (by.css(locator));
			break;

		case 'className':
			_element = element (by.className(locator));
			break;

		case 'xpath':
			_element = element (by.xpath(locator));
			break;

		case 'linkText':
			_element = element (by.linkText(locator));
			break;

		case 'partialLinkText':
			_element = element (by.partialLinkText(locator));
			break;

		case 'buttonText':
			_element = element (by.buttonText(locator));
			break;

		case 'partialButtonText':
			_element = element (by.partialButtonText(locator));
			break;

		case 'deepCss':
			_element = element (by.deepCss(locator));
			break;

		case 'binding':
			_element = element (by.binding(locator));
			break;

		case 'exactBinding':
			_element = element (by.exactBinding(locator));
			break;

		case 'model':
			_element = element (by.model(locator));
			break;

		case 'repeater':
			_element = element (by.repeater(locator));
			break;

		case 'exactRepeater':
			_element = element (by.exactRepeater(locator));
			break;

		case 'options':
			_element = element (by.options(locator));
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
	let _element = '';

	try {
		let pageName = elementName.split('.')[0];
		let locator = elementName.split('.')[1];

		let workbook = readUIMap();
		let worksheet = workbook.Sheets['locators'];
		let excelRows = XLSX.utils.sheet_to_row_object_array(worksheet);

		for (let i = 0; i < excelRows.length; i++) {
			if (excelRows[i].pageName === pageName && excelRows[i].elementName === locator) {
				_element = fetchElementBy(excelRows[i].locatorTypes, excelRows[i].locator);
				break;		
			}
		}
		
		console.debug(`Element is found as: ${_element.locator()}`);
	} catch (error) {
		console.error(error.message);
	}
	return _element;
}

/**
 * fetchElementsBy: creates ElementFinder.locator and, webElement for 
 * protractor automation from uiMap.xlsx
 * 
 * @param locatorType: type of locators to choose from  Object Repo.
 * @param locator: locator string 
 * 
 * @return protractor web element list
 */
fetchElementsBy = function(locatorType, locator) {
	locatorType = locatorType.replace(/(^\s+|\s+$)/g, '');
	let _element = undefined;
	
	try {
		switch (locatorType) {
		case 'id':
			_element = element.all (by.id(locator));
			break;
			
		case 'name':
			_element = element.all (by.name(locator));
			break;

		case 'css':
			_element = element.all (by.css(locator));
			break;

		case 'className':
			_element = element.all (by.className(locator));
			break;

		case 'xpath':
			_element = element.all (by.xpath(locator));
			break;

		case 'linkText':
			_element = element.all (by.linkText(locator));
			break;

		case 'partialLinkText':
			_element = element.all (by.partialLinkText(locator));
			break;

		case 'buttonText':
			_element = element.all (by.buttonText(locator));
			break;

		case 'partialButtonText':
			_element = element.all (by.partialButtonText(locator));
			break;

		case 'deepCss':
			_element = element.all (by.deepCss(locator));
			break;

		case 'binding':
			_element = element.all (by.binding(locator));
			break;

		case 'exactBinding':
			_element = element.all (by.exactBinding(locator));
			break;

		case 'model':
			_element = element.all (by.model(locator));
			break;

		case 'repeater':
			_element = element.all (by.repeater(locator));
			break;

		case 'exactRepeater':
			_element = element.all (by.exactRepeater(locator));
			break;

		case 'options':
			_element = element.all (by.options(locator));
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
 * getExcelUIMapList: create and, return List<WebElement>
 * 
 * @param: elementName: element string from xlsx map
 * @return: protractor element list 
 */
exports.getExcelUIMapList = function(elementName) {
	let _element = '';

	try {
		let pageName = elementName.split('.')[0];
		let locator = elementName.split('.')[1];

		let workbook = readUIMap();
		let worksheet = workbook.Sheets['locators'];
		let excelRows = XLSX.utils.sheet_to_row_object_array(worksheet);

		for (let i = 0; i < excelRows.length; i++) {
			if (excelRows[i].pageName === pageName && excelRows[i].elementName === locator) {
				_element = fetchElementBy(excelRows[i].locatorTypes, excelRows[i].locator);
				break;		
			}
		}
		
		console.debug(`Element is found as: ${_element.locator()}`);
	} catch (error) {
		console.error(error.message);
	}
	return _element;
}