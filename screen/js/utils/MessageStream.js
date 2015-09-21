var io = require('socket.io-client');
var ServerActionCreators = require('../actions/ServerActionCreators');
var SystemActionCreators = require('../actions/SystemActionCreators');

var socket;

module.exports = {
    
    init: function(){
      
      var socket = io.connect();//'http://localhost', {path: '/erith/socket.io'});
	  
	  socket.on('message', function (data) {
	    ServerActionCreators.receivedMessage(data);
	  });

	  socket.on('images', function (data) {
	    ServerActionCreators.receivedImageList(data);
	  });

	  socket.on('tags', function (data) {
	    ServerActionCreators.receivedTagList(data);
	  });

	  socket.on('reload', function (data) {
	  	console.log("seen a reload");
	  	location.reload(true);  
	  });

	  socket.on('ping', function (data) {
	  	console.log("seen a ping!!!");
	    SystemActionCreators.respond_to_ping();
	  });
    },

};
