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
		         console.log(res.body);
		         ServerActionCreators.savedImageToServer(res.body.url);
		        }
		    });
	}
}
