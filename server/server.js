var http = require('http');
var Promise = require('bluebird');
var express = require('express');
var bodyparser = require('body-parser');
var hbs = require('hbs');
var app = express();
var fs = require("fs");
var path = require("path");
var db = require("./db");

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
var TRASHDIRECTORY = path.join("static","shared","trash");

db.create_tables();

var _getImageList = function(){
	return fs.readdirAsync(DIRECTORY).then(function(list){
  		list.sort(function(a,b){
  			if (a < b){
  				return 1;
  			}else if (a>b){
  				return -1;
  			}
  			return 0;
  		});
  		var images = list.map(function(filename){
  			return "/shared/uploads/"+filename;
  		});
  		return images.slice(0,Math.min(6,images.length));
  	});
};

var _deleteImage = function(image){

	var fileToRename = path.join(DIRECTORY, image);
	var newPath = path.join(TRASHDIRECTORY, image);
	
	return fs.renameAsync(fileToRename, newPath).then(function(){
		return {success:true};
	},function(err){
		throw err;
	});
	
};

app.get('/', function(req,res){
	console.log("nice am here!");
	res.send({success:true});
});

app.get('/tag/delete', function(req,res){
	var tag = req.query.tag;
	return db.delete_tag(tag).then(function(result){
		return db.fetch_tags();
	}, function(err){
		res.send({success: false});
	}).then(function(tags){
		res.send(tags);
		return tags;
	}).then(function (tags){
		live.sendtags(tags);
	});
});

app.get('/tag/add', function(req,res){
	var tag = req.query.tag;
	
	return db.add_tag(tag).then(function(result){
		return db.fetch_tags();
	}, function(err){
		res.send({success: false});
	}).then(function(tags){
		res.send(tags);
		return tags;
	}).then(function (tags){
		live.sendtags(tags);
	});
});

app.get('/tags', function(req, res){
	return db.fetch_tags().then(function(result){
		res.send(result);
	});
});

app.post('/image/add', function(req, res){
	var image = req.body.image;
	var data = image.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');

	var ts 	  = Date.now();
	var filename  = path.join(DIRECTORY, ts + ".jpg");
	
	fs.writeFileAsync(filename, buf).then(function(){
		res.send({success:true, url:"/shared/uploads/"+ts+".jpg"});
	},function(err){
		res.send({success:false});
	}).then(_getImageList).then(function(images){
		console.log("am here --- will send out images!!");
		console.log(images);
		live.sendimages(images);
	});	
});

app.get('/images/', function(req,res){
	_getImageList().then(function(images){
		res.send(images);
	});
});


//this needs to be locked down..
app.post('/image/delete/', function(req, res){
	var components 	= req.body.image.split("/");
	var image = components[components.length-1];
	
	_deleteImage(image)
	
	.then(_getImageList)

	.then(function(images){
	 	res.send(images);
	 	live.sendimages(images);
	});
});

app.get('/message/latest', function(req,res){
	return db.fetch_latest_message().then(function(result){
		res.send(result);
	}, function(error){
		console.log(error);
		res.send({message:"", ts:-1});
	});
});

//this needs to be locked down..
app.post('/message/add', function(req, res){
	var message = req.body.message;
	var ts = new Date().getTime();
	return db.add_message(message,ts).then(function(result){
		res.send({
			message: message,
			ts: ts,
		});
	}).then(function(){
		console.log("sending live message!");
		live.sendmessage({
			message: message,
			ts: ts,
		});
	});
});

server.listen(8080);
