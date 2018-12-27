/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

const dirPath = '/Users/shankerthebunker/git/Protractor-Gradle';

const SuperCalculator = require(dirPath + '/test/e2e/scripts/Super-Calculator-Module.js');

let _SuperCalculator = new SuperCalculator();

describe('Protractor Demo App 01', function() {
	
	beforeAll(function() {
		_SuperCalculator.launchUrl();
	});
	
	it('Multiply Two Numbers', function() {
		_SuperCalculator.Multiply('_DefaultCompRowTwo');
	});
	
	it('Add Two Numbers', function() {
		_SuperCalculator.Add('_DefaultCompRowTwo');
	});
	
	it('Module Two Numbers', function() {
		_SuperCalculator.Module('_DefaultCompRowTwo');
	});
	
	it('Divide Two Numbers', function() {
		_SuperCalculator.Divide('_DefaultCompRowTwo');
	});
	
	it('Substract Two Numbers', function() {
		_SuperCalculator.Substract('_DefaultCompRowTwo');
	});
	
	afterAll(function() {
		_SuperCalculator.closeBrowser();
	});
});