var AppDispatcher = require('../dispatcher/AppDispatcher');
var ErithConstants = require('../constants/ErithConstants');
var ActionTypes = ErithConstants.ActionTypes;


module.exports = {

    receivedImageList: function(list){
        AppDispatcher.handleServerAction({
          type: ActionTypes.IMAGE_LIST,
          list: list
        });
    },

    receivedTagList: function(tags){
        AppDispatcher.handleServerAction({
          type: ActionTypes.RAW_TAGS,
          tags: tags
        });
    },

    receivedMessage: function(message){
       AppDispatcher.handleServerAction({
          type: ActionTypes.RAW_MESSAGE,
          message: message,
        });
    },

    savedImageToServer: function(url){
      AppDispatcher.handleServerAction({
          type: ActionTypes.IMAGE_SAVED_TO_SERVER,
          url: url
      });
    },

    deletedImage: function(image){
      console.log("deleted");
      console.log(image);
      AppDispatcher.handleServerAction({
          type: ActionTypes.IMAGE_DELETED,
          image: image
      });
    },

    receivedPingResponse: function(response){
       console.log("great - seen ping response!");
       console.log(response);
       AppDispatcher.handleServerAction({
          type: ActionTypes.PING_RESPONSE,
          response: response
      });
    },

    receivedReloadAck: function(reload){
      
       AppDispatcher.handleServerAction({
          type: ActionTypes.RELOAD_ACK,
          reload: reload
      });
    }
};
