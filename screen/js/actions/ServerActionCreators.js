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

    receivedMessage: function(message){
        AppDispatcher.handleServerAction({
          type: ActionTypes.RAW_MESSAGE,
          message: message
        });
    },

    receivedTagList: function(tags){
        AppDispatcher.handleServerAction({
          type: ActionTypes.RAW_TAGS,
          tags: tags
        });
    },

    savedImageToServer: function(url){
      AppDispatcher.handleServerAction({
          type: ActionTypes.IMAGE_SAVED_TO_SERVER,
          url: url
      });
    }
};
