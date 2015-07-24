var http = require('http');
var Promise = require('bluebird');
var express = require('express');
var bodyparser = require('body-parser');
var hbs = require('hbs');
var app = express();
var fs = require("fs");
var path = require("path");

Promise.promisifyAll(fs);

//to support POSTs
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/screen/', express.static("static/screen/"));
app.use('/shared/', express.static("static/shared/"));
app.use('/admin/', express.static("static/admin/"));

app.set('view engine', 'html');

app.engine('html', hbs.__express);
var server = http.createServer(app);
var live = require("./live")(server);

var DIRECTORY = path.join("static","shared","uploads");

app.get('/images/', function(req,res){
  	fs.readdirAsync(DIRECTORY).then(function(list){
  		list.sort();
  		var images = list.map(function(filename){
  			return "/erith/shared/uploads/"+filename;
  		})
  		res.send(images);
  	});
});

app.post('/image/', function(req, res){
	var image = req.body.image;
	var data = image.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');

	var ts 	  = Date.now();
	var filename  = path.join(DIRECTORY, ts + ".jpg");
	
	fs.writeFileAsync(filename, buf).then(function(){
		res.send({success:true, url:"/erith/shared/uploads/"+ts+".jpg"});
	},function(err){
		res.send({success:false});
	});	
});

//this needs to be locked down..
app.post('/message/', function(req, res){
	var message = req.body.message;
	res.send({success:true});
	console.log("seen a new message so posting something live!!");
	live.sendmessage(message);
});

server.listen(8081);
