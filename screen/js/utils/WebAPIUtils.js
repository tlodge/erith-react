var request = require('superagent');
var ServerActionCreators = require("../actions/ServerActionCreators");

module.exports = {
	
	getImages: function(){

		request
     		.get('/images')
     		.set('Accept', 'application/json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		       		console.log("OK RECEUVED");
		       		console.log(res.body);
		         	ServerActionCreators.receivedImageList(res.body);
		        }
		    });
	},

	getTags: function(){

		request
     		.get('/tags')
     		.set('Accept', 'application/json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		         ServerActionCreators.receivedTagList(res.body);
		       }
		    });
	},

	getLatestMessage : function(){
		request
     		.get('/message/latest')
     		.set('Accept', 'application/json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		         ServerActionCreators.receivedMessage(res.body);
		       }
		    });

	},

	sendImageToServer: function(data){
		//JSON.stringify({image: image})
		request
     		.post('/image/add')
     		.send(data)
     		.set('Accept', 'application/json')
     		.type('json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		         ServerActionCreators.savedImageToServer(res.body.url);
		        }
		    });
	},

	respondToPing: function(){
		console.log("calling system/pingresponse!!");
		request
     		.get('/system/pingresponse')
     		.set('Accept', 'application/json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		        console.log(res.body);
		       }
		    });
	},

	reloadAck: function(){
		request
     		.get('/system/reloadack')
     		.set('Accept', 'application/json')
     		.end(function(err, res){
		       if (err){
		         location.reload(true);  
		       }else{
		         location.reload(true);  
		       }
		    });	
	}
};
