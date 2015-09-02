var AppDispatcher = require('../dispatcher/AppDispatcher');
var ErithConstants = require('../constants/ErithConstants');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ActionTypes = ErithConstants.ActionTypes;

module.exports = {

    addTag: function(tag){
        AppDispatcher.handleViewAction({
          type: ActionTypes.ADD_TAG,
          tag: tag
        });
    },
};
