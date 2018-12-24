let filePath = '/Users/shankerthebunker/git/Protractor-Gradle/test/e2e/resources/';
var XLSX = require('xlsx');

readTestData = function () {
	var workbook = XLSX.readFile(filePath + 'testData.xlsx');
	return workbook;
}

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
			console.log('Test Data found as : ' + testData + ' at (' + row + ',' + col + ')');
		}

	} catch (error) {
		console.log(error.message);
	}
	return testData;
}