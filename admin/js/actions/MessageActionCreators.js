var AppDispatcher = require('../dispatcher/AppDispatcher');
var ErithConstants = require('../constants/ErithConstants');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ActionTypes = ErithConstants.ActionTypes;

module.exports = {

    newMessage: function(message){
        AppDispatcher.handleViewAction({
          type: ActionTypes.NEW_MESSAGE,
          message: message
        });
        WebAPIUtils.sendMessage(message);
    },
}
