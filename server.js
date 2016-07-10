var express = require('express');
var bodyParser = require("body-parser");
var global = require('global_variables');
var business = require('business');
var fs = require("fs");

var app = express();
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
	var erro = {"error": "Could not decode request: JSON parsing failed"};
	result = { "status" : 400, "exchange" : erro};
})

app.get('/sourceData', function (req, res) {
	fs.readFile( global.data_path + "payload.json", 'utf8', function (err, data) {
	   handleResponse(res, 200, data);
	});
})

app.post('/filteredData', function (req, res) {
	var result = business.filterFullPayLoad(req.body);
	console.log(result.exchange);
	handleResponse(res, result.status, result.exchange);
})

app.post('/', function (req, res) {
	var result = business.filterFullPayLoad(req.body);
	console.log(result.exchange);
	handleResponse(res, result.status, result.exchange);
})


var server = app.listen(process.env.PORT || 8081, function () {
  console.log("Service running 8081....");
})


function handleResponse(res, code, exchange) {
  res.status(code || 500).json(exchange);
}
