var AppDispatcher = require('../dispatcher/AppDispatcher');
var ErithConstants = require('../constants/ErithConstants');
var ActionTypes = ErithConstants.ActionTypes;
var WebAPIUtils = require('../utils/WebAPIUtils');

module.exports = {

    reload: function(){
      WebAPIUtils.reload();        
    },

    ping: function(){
      WebAPIUtils.ping();      
    },
};
