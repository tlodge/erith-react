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

    savedImageToServer: function(url){
      AppDispatcher.handleServerAction({
          type: ActionTypes.IMAGE_SAVED_TO_SERVER,
          url: url
      });
    }
}
