var express = require('express');
var bodyParser = require("body-parser");
var global = require('global_variables');
var business = require('business');
var fs = require("fs");

var app = express();
app.use(bodyParser.json());

app.get('/sourceData', function (req, res) {
	console.log(global.data_path);
   fs.readFile( global.data_path + "payload.json", 'utf8', function (err, data) {
       res.end( data );
   });
})

app.post('/filteredData', function (req, res) {
	//console.log(req.body);
    //res.end("ok");
	var result = business.FilterFullPayLoad(req.body);
	res.end(result);
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})