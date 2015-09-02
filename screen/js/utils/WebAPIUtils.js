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

	sendImageToServer: function(image){

		request
     		.post('/image')
     		.send(JSON.stringify({image: image}))
     		.set('Accept', 'application/json')
     		.type('json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		         ServerActionCreators.savedImageToServer(res.body.url);
		        }
		    });
	}
};
