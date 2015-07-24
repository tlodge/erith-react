var io = require('socket.io-client');
var ServerActionCreators = require('../actions/ServerActionCreators');
var socket;

module.exports = {
    
    init: function(){
      
      var socket = io.connect('http://localhost', {path: '/erith/socket.io'});
	  
	  socket.on('message', function (data) {
	    console.log(data);
	    ServerActionCreators.receivedMessage(data);
	    //socket.emit('my other event', { my: 'data' });
	  });

    },

}