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
    }
  }
}
