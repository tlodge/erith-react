var request = require('superagent');
var ServerActionCreators = require("../actions/ServerActionCreators");

module.exports = {
	
	getImages: function(image){

		request
     		.get('/images')
     		.set('Accept', 'application/json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		         	console.log(res.body);
		         	ServerActionCreators.receivedImageList(res.body);
		        }
		    });
	},

	sendMessage: function(message){

		request
     		.post('/message/add')
     		.send(JSON.stringify({message: message}))
     		.set('Accept', 'application/json')
     		.type('json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		         console.log(res.body);
		         ServerActionCreators.receivedMessage(res.body);
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
	
	deleteImage: function(image){
		request
     		.post('/image/delete')
     		.send(JSON.stringify({image: image}))
     		.set('Accept', 'application/json')
     		.type('json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		         console.log(res.body);
		         ServerActionCreators.receivedImageList(res.body);
		        }
		    });
	},

	getTags: function(tag){
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


	addTag: function(tag){
		request
     		.get('/tag/add')
     		.query({tag:tag})
     		.set('Accept', 'application/json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		         ServerActionCreators.receivedTagList(res.body);
		       }
		    });
	},

	deleteTag: function(tag){
		request
     		.get('/tag/delete')
     		.query({tag:tag})
     		.set('Accept', 'application/json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		         ServerActionCreators.receivedTagList(res.body);
		       }
		    });
	},

	

};
