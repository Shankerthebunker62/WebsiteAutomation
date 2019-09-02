/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: September, 2019.                           			   	   *
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

const testCasePurpose = 'Addition and Substraction Calculator';

describe(testCasePurpose, function() {

    beforeAll(function() {
        report.createSummaryOutputMainTestBody(testCasePurpose);
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