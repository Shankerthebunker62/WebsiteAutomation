/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

const dirPath = '/Users/shankerthebunker/git/Protractor-Gradle';

var XLSX = require('xlsx');

/**
 * read testData.xlsx using 'npm xlsx'
 */
readTestData = function () {
	var workbook = XLSX.readFile(dirPath + '/test/e2e/resources/testData.xlsx');
	return workbook;
}

/**
 * Find json format for testData.xlsx
 * 
 * @return json string  value
 */
toTestDataJson = function () {
	try {
		var workbook = readTestData();
		var jsonResult = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
			if (roa.length > 0) {
				jsonResult[sheetName] = roa;
			}
		});
		return jsonResult;
	} catch (error) {
		console.log(error.message);
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
	var testData = '';

	var row = 0;
	var col = 0;
	
	var sheetName = pageData.split('.')[0];
	var rowId = pageData.split('.')[1];

	try {
		var workbook = readTestData();
		var worksheet = workbook.Sheets[sheetName];
		var range = XLSX.utils.decode_range(worksheet['!ref']);

		for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
			var nextCell = worksheet[XLSX.utils.encode_cell({
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
			var nextCell = worksheet[XLSX.utils.encode_cell({
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
		
		var nextCell = worksheet[XLSX.utils.encode_cell({
			r : row,
			c : col
		})];
		
		if (typeof nextCell !== undefined || typeof nextCell !== null) {
			testData = nextCell.w;
		}

	} catch (error) {
		console.log(error.message);
	}
	return testData;
}