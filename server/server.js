var http = require('http');
var Promise = require('bluebird');
var express = require('express');
var expressSession = require('express-session');
var bodyparser = require('body-parser');
var hbs = require('hbs');
var app = express();
var fs = require("fs");
var path = require("path");
var db = require("./db");
var bcrypt = require('bcrypt');

Promise.promisifyAll(fs);

//to support POSTs
app.use(expressSession({secret: 'erithS3cr3tKey'}));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/', express.static("static/"));
//app.use('/js/', express.static("static/js/"));

app.set('view engine', 'html');

app.engine('html', hbs.__express);
var server = http.createServer(app);
var live = require("./live")(server);
var auth = require("./auth")(app);

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

function ensureAuthenticated(req, res, next){
  
  if (req.isAuthenticated()){
  	return next(null);
  }
  res.redirect("/login");
}

app.get('/createaccounts', function(req,res){
	return db.create_user('admin', bcrypt.hashSync('er1thadm1n',10)).then(function(result){
		return db.create_user('screen', bcrypt.hashSync('er1thscr33n',10));
	}).then(function(){
		res.send({success:true});
	});
});

app.get('/', ensureAuthenticated, function(req,res){
	console.log(req.user);
	if (req.user.username === "admin"){
		res.render('admin');
	}else{
		res.render('screen');
	}
	//res.render('admin');
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
	console.log("AT IMAGE ADD!!");
	var image = req.body.image;
	var tags = req.body.tags;
	console.log("got image with tags");
	console.log(tags);
	var data = image.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');

	var ts 	  = Date.now();
	var filename  = path.join(DIRECTORY, ts + ".jpg");
	var url = "/shared/uploads/"+ts+".jpg";

	fs.writeFileAsync(filename, buf).then(function(){
		res.send({success:true, url:url});
	},function(err){
		res.send({success:false});
	})
	.then(db.create_image(url, tags.toString(), ts))
	.then(function(){
		return db.fetch_image_list();
	}).then(function(images){
		live.sendimages(images);
	});

	/*.then(_getImageList).then(function(images){
		console.log("am here --- will send out images!!");
		console.log(images);
		live.sendimages(images);
	});*/	
});

app.get('/images/', function(req,res){
	
	db.fetch_image_list().then(function(images){
		res.send(images);
	});
	//_getImageList().then(function(images){
	//	res.send(images);
	//});
});


//this needs to be locked down..
app.post('/image/delete/', function(req, res){
	console.log("seen delete");
	var image = req.body.image;
	var components 	= image.split("/");
	var file = components[components.length-1];
	
	_deleteImage(file)
	
	.then(db.delete_image(image))

	.then(function(){
		return db.fetch_image_list();
	})

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
