var AppDispatcher = require('../dispatcher/AppDispatcher');
var ErithConstants = require('../constants/ErithConstants');
var ActionTypes = ErithConstants.ActionTypes;

module.exports = {

    addTag: function(tag){
        AppDispatcher.handleViewAction({
          type: ActionTypes.ADD_TAG,
          tag: tag
        });
    },

    removeTag: function(tag){
        AppDispatcher.handleViewAction({
          type: ActionTypes.REMOVE_TAG,
          tag: tag
        });
    },
};
