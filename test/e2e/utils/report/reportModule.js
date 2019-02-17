/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Fetches static variables
const StaticModule = require(`/Users/shankerthebunker/git/WebsiteAutomation/test/e2e/staticModule.js`);
let _StaticModule = new StaticModule();

// https://www.w3schools.com/nodejs/nodejs_filesystem.asp
let fs = require('fs');

const TIMEOUT_IN_MILISECONDS = 500;

/**
 * Conversion of the log4js framework to work with node.
 */
const console = require(_StaticModule.projectPath() + '/test/e2e/utils/logger/logModule.js');
/**
 * Mail HTML Execution Report
 */
let mailSummaryReport = require(_StaticModule.projectPath() + '/test/e2e/utils/report/mailModule.js');
	
// https://www.npmjs.com/package/protractor-take-screenshots-on-demand
let screenshots = require('protractor-take-screenshots-on-demand');

sleep = function (_sleepTimeOutInMilliSeconds) {
	return new Promise(resolve => setTimeout(resolve, _sleepTimeOutInMilliSeconds)).then(() => {
		console.log(`Waiting ...`);
	}).catch((error) => {
		 console.error(`Couldn't wait !!, error: ${error.message}, stackTrace ${error.stack}`);
	});
};

getDate = function() {
	let date = new Date(),
		year = date.getFullYear(),
	    month = (date.getMonth() + 1).toString(),
	    formatedMonth = (month.length === 1) ? ("0" + month) : month,
	    day = date.getDate().toString(),
	    formatedDay = (day.length === 1) ? ("0" + day) : day,
	    hour = date.getHours().toString(),
	    formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
	    minute = date.getMinutes().toString(),
	    formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
	    second = date.getSeconds().toString(),
	    formatedSecond = (second.length === 1) ? ("0" + second) : second;
	    return formatedDay + "-" + formatedMonth + "-" + year + " " + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
};

getExecutionDurationDifference = function (startTime, endTime) {
	let seconds = Math.floor((endTime - (startTime))/1000);
	let minutes = Math.floor(seconds/60);
	let hours = Math.floor(minutes/60);
	let days = Math.floor(hours/24);

	hours = hours-(days*24);
	minutes = minutes-(days*24*60)-(hours*60);
	seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
	
	return `${days} days: ${hours} hrs : ${minutes} mins : ${seconds} secs`;
};

sendingSummaryReport = async function () {
	await sleep (TIMEOUT_IN_MILISECONDS);
	
	await mailSummaryReport.sendMailI ();
	await mailSummaryReport.sendMailII ();
	await mailSummaryReport.sendMailIII ();
	await mailSummaryReport.sendMailIV ();
	
	await sleep (TIMEOUT_IN_MILISECONDS);
};

exports.createSummaryOutput = async function () {
	let executionStartTime = getDate();
	
	let heading = (`<!DOCTYPE HTML>
			<html>
			<head>
			<title>${_StaticModule.automationReport()}</title>
			<style>

			html {
				font-family: sans-serif;
				-ms-text-size-adjust: 100%;
				-webkit-text-size-adjust: 100%
			}

			body {
				margin: 0
			}

			article, aside, details, figcaption, figure, footer, header, hgroup,
				main, nav, section, summary {
				display: block
			}

			audio, canvas, progress, video {
				display: inline-block;
				vertical-align: baseline
			}

			audio:not([controls]){
				display:none;
				height:0
			}
			[hidden], template {
				display: none
			}

			a {
				background: transparent
			}

			a:active, a:hover {
				outline: 0
			}

			abbr[title] {
				border-bottom: 1px dotted
			}

			b, strong {
				font-weight: bold
			}

			dfn {
				font-style: italic
			}

			h1 {
				font-size: 2em;
				margin: 0.67em 0
			}

			mark {
				background: #ff0;
				color: #000
			}

			small {
				font-size: 80%
			}

			sub, sup {
				font-size: 75%;
				line-height: 0;
				position: relative;
				vertical-align: baseline
			}

			sup {
				top: -0.5em
			}

			sub {
				bottom: -0.25em
			}

			img {
				border: 0
			}

			svg:not(:root){
				overflow:hidden
			}
			figure {
				margin: 1em 40px
			}

			hr {
				-moz-box-sizing: content-box;
				box-sizing: content-box;
				height: 0
			}

			pre {
				overflow: auto
			}

			code, kbd, pre, samp {
				font-family: monospace, monospace;
				font-size: 1em
			}

			button, input, optgroup, select, textarea {
				color: inherit;
				font: inherit;
				margin: 0
			}

			button {
				overflow: visible
			}

			button, select {
				text-transform: none
			}

			button, html input[type="button"], input[type="reset"], input[type="submit"]
				{
				-webkit-appearance: button;
				cursor: pointer
			}

			button[disabled], html input[disabled] {
				cursor: default
			}

			button::-moz-focus-inner, input::-moz-focus-inner {
				border: 0;
				padding: 0
			}

			input {
				line-height: normal
			}

			input[type="checkbox"], input[type="radio"] {
				box-sizing: border-box;
				padding: 0
			}

			input[type="number"]::-webkit-inner-spin-button, input[type="number"]:
					:-webkit-outer-spin-button {
				height: auto
			}

			input[type="search"] {
				-webkit-appearance: textfield;
				-moz-box-sizing: content-box;
				-webkit-box-sizing: content-box;
				box-sizing: content-box
			}

			input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {
				-webkit-appearance: none
			}

			fieldset {
				border: 1px solid #c0c0c0;
				margin: 0 2px;
				padding: 0.35em 0.625em 0.75em
			}

			legend {
				border: 0;
				padding: 0
			}

			textarea {
				overflow: auto
			}

			optgroup {
				font-weight: bold
			}

			table {
				border-collapse: collapse;
				border -spacing: 0
			}

			td, th {
				padding: 0
			}

			* {
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box
			}

			*:before, *:after {
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box
			}

			html {
				font-size: 62.5%;
				-webkit-tap-highlight -color: rgba(0, 0, 0, 0)
			}

			body {
				font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
				font-size: 14px;
				line-height: 1.42857143;
				color: #333;
				background-color: #fff
			}

			input, button, select, textarea {
				font-family: inherit;
				font-size: inherit;
				line-height: inherit
			}

			a {
				color: #428bca;
				text-decoration: none
			}

			a:hover, a:focus {
				color: #2a6496;
				text-decoration: underline
			}

			a:focus {
				outline: thin dotted;
				outline: 5px auto -webkit-focus-ring-color;
				outline-offset: -2px
			}

			figure {
				margin: 0
			}

			img {
				vertical-align: middle
			}

			.img-responsive {
				display: block;
				max-width: 100%;
				height: auto
			}

			.img-rounded {
				border-radius: 6px
			}

			.img-thumbnail {
				padding: 4px;
				line-height: 1.42857143;
				background-color: #fff;
				border: 1px solid #ddd;
				border-radius: 4px;
				-webkit-transition: all .2s ease-in-out;
				transition: all .2s ease-in -out;
				display: inline-block;
				max-width: 100%;
				height: auto
			}

			.img-circle {
				border-radius: 50%
			}

			hr {
				margin-top: 20px;
				margin-bottom: 20px;
				border: 0;
				border-top: 1px solid #eee
			}

			.sr-only {
				position: absolute;
				width: 1px;
				height: 1px;
				margin: -1px;
				padding: 0;
				overflow: hidden;
				clip: rect(0, 0, 0, 0);
				border: 0
			}

			table {
				max-width: 100%;
				background-color: transparent
			}

			th {
				text-align: left
			}

			.table {
				width: 100%;
				margin-bottom: 20px
			}

			.table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td,
				.table>tbody>tr>td, .table>tfoot>tr>td {
				padding: 8px;
				line-height: 1.42857143;
				vertical-align: top;
				border-top: 1px solid #ddd
			}

			.table>thead>tr>th {
				vertical-align: bottom;
				border-bottom: 2px solid #ddd
			}

			.table>caption+thead>tr:first-child>th, .table>colgroup+thead>tr:first-child>th,
				.table>thead:first-child>tr:first-child>th, .table>caption+thead>tr:first-child>td,
				.table>colgroup+thead>tr:first-child>td, .table>thead:first-child>tr:first-child>td
				{
				border-top: 0
			}

			.table>tbody+tbody {
				border-top: 2px solid #ddd
			}

			.table .table {
				background- color: #fff
			}

			.table-condensed>thead>tr>th, .table-condensed>tbody>tr>th,
				.table-condensed>tfoot>tr>th, .table-condensed>thead>tr>td,
				.table-condensed>tbody>tr>td, .table-condensed>tfoot>tr>td {
				padding: 5px
			}

			.table-bordered {
				border: 1px solid #ddd
			}

			.table-
					bordered>thead>tr>th, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>th,
				.table-bordered>thead>tr>td, .table-bordered>tbody>tr>td,
				.table-bordered>tfoot>tr>td {
				border: 1px solid #ddd
			}

			.table-bordered>thead>tr>th, .table-bordered>thead>tr>td {
				border -bottom-width: 2px
			}

			.table-striped>tbody>tr:nth-child(odd)>td, .table-striped>tbody>tr:nth-child(odd)>th
				{
				background-color: #f9f9f9
			}

			.table-hover>tbody>tr:hover>td, .table-hover>tbody>tr:hover>th {
				background-color: #f5f5f5
			}

			table col[class*="col-"] {
				position: static;
				float: none;
				display: table-column
			}

			table td[class*="col-"], table th[class*="col-"] {
				position: static;
				float: none;
				display: table-cell
			}

			.table>thead>tr>td.active, .table>tbody>tr>td.active, .table>tfoot>tr>td.active,
				.table>thead>tr>th
					.active, .table>tbody>tr>th.active, .table>tfoot>tr>th.active, .table>thead>tr.active>td,
				.table>tbody>tr.active>td, .table>tfoot>tr.active>td, .table>thead>tr.active>th,
				.table>tbody>tr.active>th, .table>tfoot>tr.active>th {
				background-color: #f5f5f5
			}

			.table-hover>tbody>tr>td.active:hover, .table-hover>tbody>tr>th.active:hover,
				.table-hover>tbody>tr.active:hover>td, .table-hover>tbody>tr.active:hover>th
				{
				background-color: #e8e8e8
			}

			.table>thead>tr>td.success, .table>tbody>tr>td.success, .table>tfoot>tr>td.success,
				.table>thead>tr>th.success, .table>tbody>tr>th.success, .table>tfoot>tr>th.success,
				.table>thead>tr.success>td, .table>tbody>tr.success>td, .table>tfoot>tr.success>td,
				.table>thead>tr.success>th, .table>tbody>tr.success>th, .table>tfoot>tr.success>th
				{
				background-color: #dff0d8
			}

			.table-hover>tbody>tr>td.success:hover, .table-hover>tbody>tr>th.success:hover,
				.table-hover>tbody>tr.success:hover>td, .table-hover>tbody>tr.success:hover>th
				{
				background-color: #d0e9c6
			}

			.table>thead>tr>td.info, .table>tbody>tr>td.info, .table>tfoot>tr>td.info,
				.table>thead>tr>th.info, .table>tbody>tr>th.info, .table>tfoot>tr>th.info,
				.table>thead>tr.info>td, .table>tbody>tr.info>td, .table>tfoot>tr.info>td,
				.table>thead>tr.info>th, .table>tbody>tr.info>th, .table>tfoot>tr.info>th
				{
				background-color: #d9edf7
			}

			.table-hover>tbody>tr>td.info:hover, .table-hover>tbody>tr>th.info:hover,
				.table-hover>tbody>tr.info:hover>td, .table-hover>tbody>tr.info:hover>th
				{
				background-color: #c4e3f3
			}

			.table>thead>tr>td.warning, .table>tbody>tr>td.warning, .table>tfoot>tr>td.warning,
				.table>thead>tr>th.warning, .table>tbody>tr>th.warning, .table>tfoot>tr>th.warning,
				.table>thead>tr.warning>td, .table>tbody>tr.warning>td, .table>tfoot>tr.warning>td,
				.table>thead>tr.warning>th, .table>tbody>tr.warning>th, .table>tfoot>tr.warning>th
				{
				background-color: #fcf8e3
			}

			.table-hover>tbody>tr>td.warning:hover, .table-hover>tbody>tr>th.warning:hover,
				.table-hover>tbody>tr.warning:hover>td, .table-hover>tbody>tr.warning:hover>th
				{
				background -color: #faf2cc
			}

			.table>thead>tr>td.danger, .table>tbody>tr>td.danger, .table>tfoot>tr>td.danger,
				.table>thead>tr>th.danger, .table>tbody>tr>th.danger, .table>tfoot>tr>th.danger,
				.table>thead>tr.danger>td, .table>tbody>tr.danger>td, .table>tfoot>tr.danger>td,
				.table>thead>tr.danger>th, .table>tbody>tr.danger>th, .table>tfoot>tr.danger>th
				{
				background-color: #f2dede
			}

			.table-hover>tbody>tr>td.danger:hover, .table-hover>tbody>tr>th.danger:hover,
				.table-hover>tbody>tr.danger:hover>td, .table-hover>tbody>tr
					.danger:hover>th {
				background-color: #ebcccc
			}

			@media ( max-width :767px) {
				.table-responsive {
					width: 100%;
					margin-bottom: 15px;
					overflow-y: hidden;
					overflow-x: scroll;
					-ms-overflow-style: -ms-autohiding-scrollbar;
					border: 1px solid #ddd;
					-webkit-overflow-scrolling: touch
				}
				.table-responsive>.table {
					margin-bottom: 0
				}
				.table-responsive>.table>thead>tr>th, .table-responsive>.table>tbody>tr>th,
					.table-responsive>.table>tfoot>tr>th, .table-responsive>.table>thead>tr>td,
					.table-responsive>.table>tbody>tr>td, .table-
					responsive>.table>tfoot>tr>td {
					white-space: nowrap
				}
				.table-responsive>.table-bordered {
					border: 0
				}
				.table-responsive>.table-bordered>thead>tr>th:first-child,
					.table-responsive>.table-bordered>tbody>tr>th:first-child,
					.table-responsive>.table-bordered>tfoot>tr>th:first-child,
					.table-responsive>.table-bordered>thead>tr>td:first-child,
					.table-responsive>.table-bordered>tbody>tr>td:first-child,
					.table-responsive>.table-bordered>tfoot>tr>td:first-child {
					border-left: 0
				}
				.table-responsive>.table-bordered>thead>tr>th:last-child,
					.table-responsive>.table-bordered>tbody>tr>th:last-child,
					.table-responsive>.table-bordered>tfoot>tr>th:last-child,
					.table-responsive>.table-bordered>thead>tr>td:last-child,
					.table-responsive>.table-bordered>tbody>tr>td:last-
					child, .table-responsive>.table-bordered>tfoot>tr>td:last-child {
					border-right: 0
				}
				.table-responsive>.table-bordered>tbody>tr:last-child>th,
					.table-responsive>.table-bordered>tfoot>tr:last-child>th,
					.table-responsive>.table-bordered>tbody>tr:last-child>td,
					.table-responsive>.table-bordered>tfoot>tr:last-child>td {
					border-bottom: 0
				}
			}

			.media, .media-body {
				overflow: hidden;
				zoom: 1
			}

			.media, .media .media {
				margin-top: 15px
			}

			.media:first-child {
				margin-top: 0
			}

			.media-object {
				display: block
			}

			.media-heading {
				margin: 0 0 5px
			}

			.media>.pull-left {
				margin-right: 10px
			}

			.media>.pull-right {
				margin-left: 10px
			}

			.media-list {
				padding-left: 0;
				list-style: none
			}

			.clearfix:before, .clearfix:after {
				content: " ";
				display: table
			}

			.clearfix:after {
				clear: both
			}

			.center-block {
				display: block;
				margin-left: auto;
				margin-right: auto
			}

			.pull-right {
				float: right !important
			}

			.pull-left {
				float: left !important
			}

			.hide {
				display: none !important
			}

			.show {
				display: block !important
			}

			.invisible {
				visibility: hidden
			}

			.text-hide {
				font: 0/0 a;
				color: transparent;
				text-shadow: none;
				background-color: transparent;
				border: 0
			}

			.hidden {
				display: none !important;
				visibility: hidden !important
			}

			.affix {
				position: fixed
			}

			@
			-ms-viewport {
				width: device-width
			}

			.visible-xs, .visible-sm, .visible-md, .visible-lg {
				display: none !important
			}

			@media ( max-width : 767px) {
				.visible-xs {
					display: block !important
				}
				table.visible-xs {
					display: table
				}
				tr.visible-xs {
					display: table-row !important
				}
				th.visible-xs, td.visible-xs {
					display: table-cell !important
				}
			}

			@media ( min-width :768px) and (max-width:991px) {
				.visible-sm {
					display: block !important
				}
				table.visible-sm {
					display: table
				}
				tr.visible-sm {
					display: table-row !important
				}
				th.visible-sm, td.visible-sm {
					display: table-cell !important
				}
			}

			@media ( min-width :992px) and (max-width:1199px) {
				.visible-md {
					display: block !important
				}
				table
					.visible-md {
					display: table
				}
				tr.visible-md {
					display: table-row !important
				}
				th.visible-md, td.visible-md {
					display: table-cell !important
				}
			}

			@media ( min-width :1200px) {
				.visible-lg {
					display: block !important
				}
				table.visible-lg {
					display: table
				}
				tr.visible-lg {
					display: table-row !important
				}
				th.visible-lg, td.visible-lg {
					display: table-cell !important
				}
			}

			@media ( max-width :767px) {
				.hidden-xs {
					display: none !important
				}
			}

			@media ( min-width :768px) and (max-width:991px) {
				.hidden-sm {
					display: none !important
				}
			}

			@media ( min-width : 992px) and (max-width:1199px) {
				.hidden-md {
					display: none !important
				}
			}

			@media ( min-width :1200px) {
				.hidden-lg {
					display: none !important
				}
			}

			.visible-print {
				display: none !important
			}

			@media print {
				.visible-print {
					display: block !important
				}
				table.visible-print {
					display: table
				}
				tr.visible-print {
					display: table-row !important
				}
				th.visible-print, td.visible-print {
					display: table-cell !important
				}
			}

			@media print {
				.hidden-print {
					display: none !important
				}
			}
			</style>
			</head>

			<body>
				<br>
				<h3 align='center' style='color: #0d10df'>${_StaticModule.reportHeader()}</h3>
				<table class='table table-striped'>
					<tr></tr>
					<tr>
						<th colspan='2' style='text-align: center' bgcolor='#78BCFF' id="feature">${_StaticModule.feature()}</th>
					</tr>
					<tr>
						<td>
							<table class='table table-hover'>
								<tr>
									<th>Operating System</th>
									<td id="os">${_StaticModule.operatingSystem()}</td>
								</tr>
								<tr>
									<th>Environment</th>
									<td>${_StaticModule.environment()}</td>
								</tr>
								<tr>
									<th>Browser</th>
									<td id="browser">${_StaticModule.browserName()}</td>
								</tr>
								<tr>
									<th>Execution Start Time</th>
									<td>${executionStartTime}</td>
								</tr>
								<tr>
									<th>Execution End Time</th>
									<td>$executionEndTime</td>
								</tr>
								<tr>
									<th>Execution Duration</th>
									<td>$executionDuration</td>
								</tr>
							</table>
						</td>
						<td>
							<table class='table table-hover'>
								<tr>
									<th>Test Type</th>
									<td>${_StaticModule.testType()}</td>
								</tr>
								<tr>
									<th>Total Main Tests</th>
									<td id="mainTestCount">$mainTestCount</td>
								</tr>
								<tr>
									<th>Total Sub Tests</th>
									<td>$totalSubTestCount</td>
								</tr>
								<tr>
									<th>Passed Sub Tests</th>
									<td id="passedSubTestCount">$passedSubTestCount</td>
								</tr>
								<tr>
									<th>Failed Sub Tests</th>
									<td id="failedSubTestCount">$failedSubTestCount</td>
								</tr>
								<tr>
									<th>Pass Percentage</th>
									<td>$passPercentage</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>

				<table class='table table-striped'>
					<tr>
						<th colspan='2' style='text-align: center' bgcolor='#78BCFF'>
							Results
						</th>
					</tr>
				</table>

				<table class='table table-striped' border='1'>
					<tr>
						<th>Sl.No.</th>
						<th>Test Purpose</th>
					</tr>`);
	
	fs.unlink(_StaticModule.fileName(), function (error) {
		if (error) {
			console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		}
		console.log('File deleted!');
	});
	
	fs.open(_StaticModule.fileName(), 'w', function (error, file) {
		if (error) {
			console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		}
		console.log(`File: ${file}`);
		console.log('File Created!');
	});
	
	fs.appendFile(_StaticModule.fileName(), heading, function (error) {
		if (error) {
			console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		}
		console.log('Heading Added!');
	});
	
	await sleep (TIMEOUT_IN_MILISECONDS);
	
	return;
};

exports.createSummaryOutputMainTestBody = async function (testPurpose) {
	let mainTestIndex = (browser.params.mainTestIndex) + 1;
	
	let mainTestBody = (`<tr>
			<td align='center'>${mainTestIndex}</td>
			<td>${testPurpose}<br> <br>
				<table class='table table-striped' border='1'>
					<tr>
						<th>Sl.No.</th>
						<th>Pass/Fail</th>
						<th>Sub Test Case</th>
						<th>Expected Result</th>
						<th>Actual Result</th>
						<th>Screenshot Result</th>
					</tr>`);
	
	fs.appendFile(_StaticModule.fileName(), mainTestBody, function (error) {
		if (error) {
			console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		}
		console.log('Main Test Body Added!');
	});
	
	browser.params.mainTestIndex = mainTestIndex;
	browser.params.subTestCount = 0;
	
	await sleep (TIMEOUT_IN_MILISECONDS);
	
	return;
};

exports.createSummaryOutputSubTestBody = async function (testStepPurpose, expectedResult, result) {
	let fontColour = '';
	let status = '';
	let imageAppender = '';
	let actualResult = '';
	let imageFilePath = '';
	
	let subTestCount = (browser.params.subTestCount) + 1;
	
	if (!result) {
		let screnshotFile = (new Date().getTime());
		
	    // take screenshots
	    screenshots.takeScreenshot(screnshotFile);
		imageFilePath = `${dirPath}/target/screenshots/chrome-${screnshotFile}.png`;
		imageAppender = `<br><img src='${imageFilePath}' style='width:70%;'/>`;
	}
	
	if (result) {
	    status = 'PASS';
		fontColour = 'green';
		actualResult = expectedResult + ' :passed';
		
		browser.params.passedSubTestCount += 1;
	} else {
	    status = 'FAIL';
		fontColour = 'red';
		actualResult = expectedResult + ' :failed';
		
		browser.params.failedSubTestCount += 1;
	}
	
	let subTestBody = (`<tr>
			<td align='center'>${subTestCount}</td>
			<td align='center'><font color='${fontColour}'>${status}</font></td>
			<td>${testStepPurpose}</td>
			<td>${expectedResult}</td>
			<td>${actualResult}</td>
			<td>${imageAppender}</td>
		</tr>`);
	
	fs.appendFile(_StaticModule.fileName(), subTestBody, function (error) {
		if (error) {
			console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		}
		console.log('Main Test Body Added!');
	});
	
	browser.params.subTestCount = subTestCount;
	browser.params.totalSubTestCount += 1;
	
	await sleep (TIMEOUT_IN_MILISECONDS);
	
	return;
};

exports.createSummaryOutputMainTestBodyEnd = async function () {
	let mainTestBodyEnd = (`</table>
			</td>
		</tr>`);
	
	fs.appendFile(_StaticModule.fileName(), mainTestBodyEnd, function (error) {
		if (error) {
			console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		}
		console.log('Main Test BodyEnded!');
	});
	
	await sleep (TIMEOUT_IN_MILISECONDS);
	
	return;
};

exports.finalizeSummaryOutput = async function() {
	let headingEnd = (`</table>
			</body>
			</html>`);
	
	fs.appendFile(_StaticModule.fileName(), headingEnd, function (error) {
		if (error) {
			console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		}
		console.log('Heading Ended!');
	});
	
	await sleep (TIMEOUT_IN_MILISECONDS);
	
	fs.readFile(_StaticModule.fileName(), 'utf8', (error, data) => {
		if (error) {
			console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		} else {
			let executionStartTime = browser.params.executionStartTime;
			let executionEndTime = new Date();
			let executionDuration = getExecutionDurationDifference(executionStartTime, executionEndTime);
			
			console.log(`Execution Start Time: ${executionStartTime}`);
			console.log(`Execution End Time: ${executionEndTime}`);
			console.log(`Execution Duration : ${executionDuration}`);
			
			data = data.replace('$executionEndTime', getDate());
			data = data.replace('$executionDuration', executionDuration);
			
			let mainTestCount = browser.params.mainTestIndex;
			let totalSubTestCount = browser.params.totalSubTestCount;
			let passedSubTestCount = browser.params.passedSubTestCount;
			let failedSubTestCount = browser.params.failedSubTestCount;
			
			data = data.replace('$mainTestCount', mainTestCount);
			data = data.replace('$totalSubTestCount', totalSubTestCount);
			data = data.replace('$passedSubTestCount', passedSubTestCount);
			data = data.replace('$failedSubTestCount', failedSubTestCount);
			
			console.log(`Total Main Tests: ${mainTestCount}`);
			console.log(`Total Sub Tests: ${totalSubTestCount}`);
			console.log(`Passed Sub Tests: ${passedSubTestCount}`);
			console.log(`Failed Sub Tests: ${failedSubTestCount}`);
			
			let passPercentage = ((passedSubTestCount/totalSubTestCount) * 100);
			
			data = data.replace('$passPercentage', passPercentage + ' %');
			
			console.log(`Pass Percentage: ${passPercentage} %`);
			
			fs.writeFile(_StaticModule.fileName(), data, function (error) {
				if (error) {
					console.error(`error: ${error.message}, stackTrace ${error.stack}`);
				}
				console.log('Finalized Automation Report!');
			});
		}
	});
	
	await sleep (TIMEOUT_IN_MILISECONDS);
	
	await sendingSummaryReport ();
	
	await sleep (TIMEOUT_IN_MILISECONDS);
	
	return;
};