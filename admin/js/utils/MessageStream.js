var io = require('socket.io-client');
var ServerActionCreators = require('../actions/ServerActionCreators');
var socket;

module.exports = {
    
    init: function(namespace, channelId){
      console.log("initing message stream with ns " + namespace);
      socket = io();
      
      socket.on("message", function(data){
          console.log("great!!! seen new message!!!");
          console.log(data)
      });
      
      socket.on("images", function(images){
          console.log("great!!! seen new image list!!");
          console.log(images);
          ServerActionCreators.receivedImageList(images);
      });

    },

}
