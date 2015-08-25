var constraints = {video: true, audio: true};
var video;
var dataURL;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ErithConstants = require('../constants/ErithConstants');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ActionTypes = ErithConstants.ActionTypes;
var canvas;

module.exports = {

    setUpVideo: function(){

      video = document.getElementById("localVideo");
      canvas = document.getElementById("canvas");

      if (navigator.webkitGetUserMedia){
        navigator.webkitGetUserMedia(constraints,function(stream){
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, this.handleUserMediaError);
      }
      else if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(constraints, function(stream) {
          video.src = stream;
          video.play();
        }, this.handleUserMediaError);
      }else if(navigator.mozGetUserMedia) { // Firefox-prefixed
        navigator.mozGetUserMedia(constraints, function(stream){
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, this.handleUserMediaError);
      }
    },


    /*
    *This is called when the clicker is first pressed
    */
    countDown: function(){
      canvas.style.opacity = 0;
      AppDispatcher.handleViewAction({
        type: ActionTypes.CHANGE_SCREEN,
         screen: 'takepicture',
      });
    },
   /*
    * This is called when the timer has timed out and the picture
    * must be taken
    */
    takePicture: function(){

			var context = canvas.getContext("2d");

			context.drawImage(video, 0, 0, 640, 480);
     
	 		dataURL = canvas.toDataURL("image/jpeg", 0.5);
    
			if (dataURL === null) {
				alert("We couldn't compress the image small enough");
				return;
			}

      canvas.style.opacity = 1;
      
      AppDispatcher.handleViewAction({
          type: ActionTypes.CHANGE_SCREEN,
          screen: 'picturetaken',
      });

      console.log("OK WILL SAVE PICTURE IN JUST OVER A SECOND!");
      setTimeout(this.savePicture, 1500);
      
    },

    savePicture: function(){

      //send the picture to the server
      console.log("sending image to server!");
      WebAPIUtils.sendImageToServer(dataURL);

      canvas.style.opacity = 0;

      AppDispatcher.handleViewAction({
          type: ActionTypes.CHANGE_SCREEN,
          screen: 'home',
      });
    },

    messageClicked: function(){
     AppDispatcher.handleViewAction({
          type: ActionTypes.CHANGE_SCREEN,
          screen: 'messages',
      });
    },

    cancel: function(){
      canvas.style.opacity = 0;
      AppDispatcher.handleViewAction({
          type: ActionTypes.CHANGE_SCREEN,
          screen: 'home',
      });
    },

    handleUserMediaError: function(error) {
      alert("[!] getUserMedia error: ", error);
    },
};
