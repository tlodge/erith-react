var io = require('socket.io-client');
var ServerActionCreators = require('../actions/ServerActionCreators');
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

    },

};
