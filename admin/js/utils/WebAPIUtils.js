var request = require('superagent');
var ServerActionCreators = require("../actions/ServerActionCreators");

module.exports = {
	
	getImages: function(image){

		request
     		.get('/erith/images')
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
     		.post('/erith/message')
     		.send(JSON.stringify({message: message}))
     		.set('Accept', 'application/json')
     		.type('json')
     		.end(function(err, res){
		       if (err){
		         console.log(err);
		       }else{
		         console.log(res.body);
		         ServerActionCreators.savedMessageToServer(res.body);
		        }
		    });
	}


}