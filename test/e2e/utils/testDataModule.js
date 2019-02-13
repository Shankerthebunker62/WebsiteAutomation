/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Project location path
const dirPath = browser.params.dirPath;

// Application Name
const appName = browser.params.appName;

let XLSX = require('xlsx');

/**
 * Conversion of the log4js framework to work with node.
 */
const console = require(dirPath + '/test/e2e/utils/logger/logModule.js');

/**
 * read testData.xlsx using 'npm xlsx'
 */
readTestData = function () {
	let workbook = XLSX.readFile(dirPath + '/test/apps/' + appName + '/testData.xlsx');
	return workbook;
}

/**
 * Find json format for testData.xlsx
 * 
 * @return json string  value
 */
toTestDataJson = function () {
	try {
		let workbook = readTestData();
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
 * getExcelTestData: fetches test data string from data sheet
 * 
 * @param pageData: contains page name and, rowId of of data on page to be used
 * @param dataColumn: test data column under which test data is available
 * 
 * @result test data string for automation
 */
exports.getExcelTestData = function (pageData, dataColumn) {
	let testData = '';

	let row = 0;
	let col = 0;
	
	let sheetName = pageData.split('.')[0];
	let rowId = pageData.split('.')[1];

	try {
		let workbook = readTestData();
		let worksheet = workbook.Sheets[sheetName];
		let range = XLSX.utils.decode_range(worksheet['!ref']);

		for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
			let nextCell = worksheet[XLSX.utils.encode_cell({
				r : rowNum,
				c : 0
			})];
			
			if (typeof nextCell !== undefined || typeof nextCell !== null) {
				if (rowId === nextCell.w) {
					row = rowNum;
					break;
				}
			}
		}
		
		for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
			let nextCell = worksheet[XLSX.utils.encode_cell({
				r : 0,
				c : colNum
			})];
			
			if (typeof nextCell !== undefined || typeof nextCell !== null) {
				if (dataColumn === nextCell.w) {
					col = colNum;
					break;
				}
			}
		}
		
		let nextCell = worksheet[XLSX.utils.encode_cell({
			r : row,
			c : col
		})];
		
		if (typeof nextCell !== undefined || typeof nextCell !== null) {
			testData = nextCell.w;
		}
		
		console.debug(`TestData is found as: ${testData}`);
	} catch (error) {
		console.error(error.message);
	}
	return testData;
}