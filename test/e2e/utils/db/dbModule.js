/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Project location path
const dirPath = browser.params.dirPath;

// https://www.npmjs.com/package/mongodb
let MongoClient = require('mongodb').MongoClient;

// https://www.npmjs.com/package/mysql
let mysql = require('mysql');

// https://www.npmjs.com/package/mssql
let mssql = require('mssql');

// https://www.npmjs.com/package/oracledb
let oracledb = require('oracledb');

exports.executeMySqlQuery = function (_host, _user, _password, _database, _query) {
	// sql query result
	let _result = null;
	
	let connection = mysql.createConnection({
		host: _host,
		user: _user,
		password: _password,
		database: _database
	});
	
	connection.connect(function(err) {
		if (err) throw err;
		connection.query(_query, function (err, result, fields) {
			if (err) throw err;
			console.log(`Query: ${_query} fetches Result: ${result}`);
			console.log(`${fields}`);
			_result = result;
		});
	});
	
	return _result;
};

exports.executeMSSQLQuery = function (_server, _user, _password, _database, _query) {
	// sql query result
	let _result = null;
	
	let config = {
			user: _user,
		    password: _password,
		    server: _server, // You can use 'localhost\\instance' to connect to named instance
		    database: _database,
		 
		    options: {
		        encrypt: false // Use this if you're on Windows Azure
		    }
	};
	
	mssql.connect(config, err => {
		// ... error checks
		
		const request = new mssql.Request();
		request.stream = true; // You can set streaming differently for each request
		request.query(_query); // or request.execute(procedure)
		
	    request.on('recordset', columns => {
	        // Emitted once for each recordset in a query
	    });
	    request.on('row', row => {
	        // Emitted for each row in a recordset
	    });
	    request.on('error', err => {
	        // May be emitted multiple times
	    });
	    request.on('done', result => {
	        // Always emitted as the last one
	    	console.log(`Query: ${_query} fetches Result: ${result}`);
	    	_result = result;
	    });
	});
	
	mssql.on('error', err => {
	    // ... error handler
	});
	
	return _result;
};

// https://github.com/oracle/node-oracledb/blob/master/doc/api.md#resultsethandling
exports.executeOracleDBQuery = function (_server, _user, _password, _database, _query) {
	// sql query result
	let _result = null;
	
	oracledb.autoCommit = true;
	oracledb.events = true;
	
	console.log(`Oracle client library version number is ${oracledb.oracleClientVersion}`);
	
	oracledb.getConnection({
		user          : _user,
		password      : _password,
		connectString : _server
	}, function(err, connection) {
			if (err) { 
				console.error(err.message); return; 
			}
			connection.execute(_query,
			      function(err, result) {
			        if (err) { 
			        	console.error(err.message); return; 
			        }
			        console.log(result.rows);
			        _result = result.rows;
			});
	});
	
	return _result;
};