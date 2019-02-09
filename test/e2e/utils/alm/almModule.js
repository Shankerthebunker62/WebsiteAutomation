/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Project location path
const dirPath = browser.params.dirPath;

// https://gist.github.com/jungleeforce/af83f36fec0aa9a102c6
let https = require('https');
let fs = require('fs');
//this refers to a place where I have all my config like host, userName, password etc
let config = {
	"host" : "",
	"alm_userName" : "",
	"alm_password" : "",
	"release" : "",
	"domain" : "",
	"project" : "",
	"queryParam" : "",
	"fields" : "",
	"defectFieldMapping" : [ "", "", "" ]
};

let options = {
		host : config.host, 
	    path : "/qcbin/authentication-point/authenticate",
	    method: "GET",
	    headers : {'Authorization': 'Basic ' + new Buffer(config.alm_userName + ':' + config.alm_password).toString('base64')}
};

// Authenticating the user into ALM
ALMConnect(options, 'header','', function(status, data) {
    if(status){
        //get the LWSSO_Cookie from the header. This is the session cookie which will be used in all callouts to ALM.
        if(data.headers["set-cookie"] != undefined ) {
            extractDefects(data.headers["set-cookie"]);
        } else {
            console.log('Dagnabbit!! ERROR:  Unable to login, check your username/password/serverURL.');
        }
    } else {
        console.log('Dagnabbit!! ERROR:  ' + JSON.stringify(data));
    }
});

extractDefects = function(LWSSO_Cookie) {
	let queryParam = "{";
    // Add Release
    queryParam += "detected-in-rel["+config.release+"];";
    // Add all your request parameters here. Its a little complicated initially, but you will get a hang of it. 
    // Make sure to use encodeURIComponents() for all the values in the query parameters.
    queryParam+="}";
    // Get all the fields that you want to query. Lesser the fields smaller the XML returned, faster is the call.
    let fields = config.defectFieldMapping.fieldArray.join(',');
    let opt = {
        host: config.host,
        path: "/qcbin/rest/domains/"+config.domain+"/projects/"+config.project+"/defects?query="+config.queryParam+"&fields="+config.fields+"&page-size=max",
        method:"GET",
        headers: {"Cookie":LWSSO_Cookie}
    };
 
    ALMConnect(opt, 'data','',function(status,data){
        if(status){
            // Write the defects to an XML file in local drive.
            fs.writeFileSync('newDefect.xml',data);
            // Once you get the defectXML you can parse it into JSON and push it other databases like SFDC etc..     
        }else{
            console.log('Dagnabbit!! ERROR:  ' + JSON.stringify(data));
        }
    });
};

ALMConnect = function (opt, responseType,requestBody, callback) {
	let request = https.request(opt, function(res){
        res.setEncoding('utf8');
        let XMLoutput='';
        res.on('data',function(chunk){
            XMLoutput+=chunk;
        });
        res.on('end',function(){
            if(responseType=='data'){
                callback(true,XMLoutput);
            } else {
                callback(true, res);
            }
        });
    });
    request.on('error',function(e){
        callback(false,e);
    });
    if(opt.method=='POST' || opt.method == 'PUT'){
        request.write(requestBody);
    }
    request.end();
};

//https://www.npmjs.com/package/hpe-alm-octane-js-rest-sdk
let Octane = require('octane');

exports.getAllDefects = function(_host, _port, _shared_space_id, workspace_id, _username, _password) {
	let octane = new Octane({
		  protocol: "https",
		  host: _host,
		  port: _port,
		  shared_space_id: _shared_space_id,
		  workspace_id: workspace_id
	});
	
	octane.authenticate({
		  username: _username,
		  password: _password
	}, function (err) {
		  if (err) {
		    console.log('Error - %s', err.message)
		    return
		  }
		  
		  // get all defects
		  octane.defects.getAll({}, function (err, defects) {
		    if (err) {
		      console.log('Error - %s', err.message)
		      return
		    }
		 
		    console.log(defects.meta.total_count)
		    defects.forEach(function (defect) {
		      console.log(defect)
		    })
		  });
	});
};

//https://admhelp.microfocus.com/alm/en/12.60/api_refs/REST_TECH_PREVIEW/ALM_REST_API_TP.html#REST_API_Tech_Preview/General/How_to_Do_Common_Tasks.html%3FTocPath%3DHow%2520to%2520Do%2520Common%2520Tasks%7C_____0