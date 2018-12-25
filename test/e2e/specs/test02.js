/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

const SuperCalculator = require('/Users/shankerthebunker/git/Protractor-Gradle/test/e2e/scripts/Super-Calculator-Module.js');

var _SuperCalculator = new SuperCalculator();

describe('Protractor Demo App 02', function() {
	
	beforeAll(function() {
		_SuperCalculator.launchUrl();
	});
	
	it('Multiply Two Numbers', function() {
		_SuperCalculator.Multiply('_DefaultCompRowTwo');
	});
	
	it('Add Two Numbers', function() {
		_SuperCalculator.Add('_DefaultCompRowOne');
	});
	
	it('Module Two Numbers', function() {
		_SuperCalculator.Module('_DefaultCompRowTwo');
	});
	
	it('Divide Two Numbers', function() {
		_SuperCalculator.Divide('_DefaultCompRowOne');
	});
	
	it('Substract Two Numbers', function() {
		_SuperCalculator.Substract('_DefaultCompRowTwo');
	});
	
	afterAll(function() {
		_SuperCalculator.closeBrowser();
	});
});