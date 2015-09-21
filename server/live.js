var socket = require('socket.io');

module.exports = function(server){
  
  console.log("initing live!!");

  var io = socket.listen(server);

  io.on('connection', function (socket) {
    console.log("seen a connection!");
  });
  
  return{
    sendmessage: function(message){
      io.emit("message", message);
    },
    sendimages: function(images){
      io.emit("images", images);
    },
    sendtags: function(tags){
      io.emit("tags", tags);
    },
    sendping: function(){
      
      io.emit("ping", {});
      console.log("emitted a ping!!");
    },
    sendreload: function(){
      io.emit("reload", {});
    },
    sendreloadack: function(reload){
      console.log("sending a reload ack!!");
      io.emit("reloadack", reload);
    },
    sendresponse: function(response){
      io.emit("pingresponse", response);
    },
  };
};
