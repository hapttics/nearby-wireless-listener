/* 
    Created by: @mi_balle
    This node file gets a stream of tweets by reading them from the twitter streaming API,
    store them in a local file with a predefined size and finally save the file to a blob
    repository in the cloud.
*/

/* -- Used Packages -- */
var config = require('../config');
var spawn = require('child_process').spawn;

// TODO: If the list of fields is changed, ensure the right number is checked down in the bufvalues.length variable.
//       actually, add it to a function and pass an array with the optional field names. This may require to specify
//	 the data type in a dictionary instead of an array, so those later can be transformed to JSON.
const args = [
	"-oL", "tshark",
	"-i", "mon0",
	"-I",
	"-Y", "wlan.fc.type_subtype == 4",
	"-T", "fields",
	"-e", "frame.time_epoch",
	"-e", "wlan.sa",
	"-e", "radiotap.dbm_antsignal",
	"-e", "wlan_mgt.ssid",
	"-e", "radiotap.channel.type.2ghz",
	"-e", "radiotap.channel.type.5ghz",
	"-e", "wlan.fc.type",
	"-e", "wlan.fc.subtype",
	"-e", "wlan.sa_resolved",
	"-E", "separator=,",
//	"-E", "quote=d",
	"-n"
];

var child = spawn("stdbuf", args);

child.stdout.on('data', function(buf) {
	var bufline = String(buf);
	var buftoks = bufline.split('\n')
	// TODO: A buffer instance may contain one or more lines. At this point this has to be recognized and nest
	//       all below actions to process each separately.
	buftoks.forEach(wLineItem => {
		console.log("[INF] [RAW] " + wLineItem.replace(/[\n\r]/g, ''));
	});
	
	// var logentry = '';
	// var bufvalues = bufline.split(",");
	// if(bufvalues.length == 9) {
	// 	logentry = {
	// 		"timestamp": Number(bufvalues[0]), // Transform to JS epoch time (*1000)
	// 		"mac": bufvalues[1],
	// 		"dbm": Number(bufvalues[2]),
	// 		"wlansa": bufvalues[3],
	// 		"is2ghz": Number(bufvalues[4]) == 1 ? true : false,
	// 		"is5ghz": Number(bufvalues[5]) == 1 ? true : false,
	// 		"fctype": Number(bufvalues[6]),
	// 		"fcsubtype": Number(bufvalues[7]),
	// 		"saresolved": bufvalues[8].replace(/[\n\r]/g, '')
	// 	};
	// 	insertEvent(db, logentry, function(result) {
	// 		if(result == 1) { console.log("[INF] [DBADD] " + bufline.replace(/[\n\r]/g, '')) }
	// 	});
	// 	// console.log(JSON.stringify(logentry).replace(/[\n\r]/g, ''));
	// }
	// else {
	// 	console.log("[WRG] Invalid number of bufvalues");
	// }
});











// var MongoClient = require('mongodb').MongoClient, assert = require('assert');
// var url = 'mongodb://localhost/wifiraw';

// var insertEvent = function(db, item, callback) {
// 	// Get the documents collection 
// 	var listened = db.collection('listened');
// 	// Insert some documents 
// 	listened.insertOne(item);
	
// 	callback(1)
// }

// MongoClient.connect(url, function(err, db) {
// 	assert.equal(null, err);
// 	console.log("[INF] Connected correctly to the MongoDB server");



// 	child.stderr.on('data', function(buf) {
// 		console.log('[ERR] %s', String(buf));
// 	});

// 	child.on('close', function(code) {
// 		db.close();
// 		console.log('[END] MongoDB connection closed');
// 		console.log('[END] Process ended with code', code);
// 	});
  
// });


