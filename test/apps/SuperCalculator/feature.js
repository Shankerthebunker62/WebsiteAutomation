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

let report = require(dirPath + '/utils/report/reportModule.js');

const SuperCalculator = require(dirPath.replace('e2e', 'apps') + '/' + appName + '/scriptModule.js');
let _SuperCalculator = new SuperCalculator();

const testCasePurpose01 = 'Addition and Substraction Super Calculator';
const testCasePurpose02 = 'Multiplication and Division Super Calculator';
const testCasePurpose03 = 'Modulus Super Calculator';
const testCasePurpose04 = 'Super Calculator Demo';

xdescribe(testCasePurpose01, function() {

    beforeAll(function() {
        report.createSummaryOutputMainTestBody(testCasePurpose01);
    });

    beforeEach(function() {

    });

    it('Launching Browser', function() {
        _SuperCalculator.launchUrl('_DefaultCompRow');
    });

    it('Add Two Numbers', function() {
        _SuperCalculator.Add('_DefaultCompRowTwo');
    });

    it('Substract Two Numbers', function() {
        _SuperCalculator.Substract('_DefaultCompRowTwo');
    });

    it('Closing Browser', function() {
        _SuperCalculator.closeBrowser();
    });

    afterEach(function() {

    });

    afterAll(function() {
        report.createSummaryOutputMainTestBodyEnd();
    });
});

xdescribe(testCasePurpose02, function() {

    beforeAll(function() {
        report.createSummaryOutputMainTestBody(testCasePurpose02);
    });

    beforeEach(function() {

    });

    it('Launching Browser', function() {
        _SuperCalculator.launchUrl('_DefaultCompRow');
    });

    it('Multiply Two Numbers', function() {
        _SuperCalculator.Multiply('_DefaultCompRowTwo');
    });

    it('Divide Two Numbers', function() {
        _SuperCalculator.Divide('_DefaultCompRowOne');
    });

    it('Closing Browser', function() {
        _SuperCalculator.closeBrowser();
    });

    afterEach(function() {

    });

    afterAll(function() {
        report.createSummaryOutputMainTestBodyEnd();
    });
});

xdescribe(testCasePurpose03, function() {

    beforeAll(function() {
        report.createSummaryOutputMainTestBody(testCasePurpose03);
    });

    beforeEach(function() {

    });

    it('Launching Browser', function() {
        _SuperCalculator.launchUrl('_DefaultCompRow');
    });

    it('Module Two Numbers', function() {
        _SuperCalculator.Module('_DefaultCompRowOne');
    });

    it('Closing Browser', function() {
        _SuperCalculator.closeBrowser();
    });

    afterEach(function() {

    });

    afterAll(function() {
        report.createSummaryOutputMainTestBodyEnd();
    });
});

describe(testCasePurpose04, function() {

    beforeAll(function() {
        report.createSummaryOutputMainTestBody(testCasePurpose03);
    });

    beforeEach(function() {

    });

    it('Launching Browser', function() {
        _SuperCalculator.launchUrl('_DefaultCompRow');
    });

    it('Add Two Numbers', function() {
        _SuperCalculator.Add('_DefaultCompRowTwo');
    });

    it('Substract Two Numbers', function() {
        _SuperCalculator.Substract('_DefaultCompRowTwo');
    });

    it('Multiply Two Numbers', function() {
        _SuperCalculator.Multiply('_DefaultCompRowTwo');
    });

    it('Divide Two Numbers', function() {
        _SuperCalculator.Divide('_DefaultCompRowOne');
    });

    it('Module Two Numbers', function() {
        _SuperCalculator.Module('_DefaultCompRowOne');
    });

    it('Closing Browser', function() {
        _SuperCalculator.closeBrowser();
    });

    afterEach(function() {

    });

    afterAll(function() {
        report.createSummaryOutputMainTestBodyEnd();
    });
});