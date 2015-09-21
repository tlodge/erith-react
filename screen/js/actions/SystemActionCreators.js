var AppDispatcher = require('../dispatcher/AppDispatcher');
var WebAPIUtils = require('../utils/WebAPIUtils');



module.exports = {

    respond_to_ping: function(){
      WebAPIUtils.respondToPing();
    },

    reload: function(){
      WebAPIUtils.reloadAck();
    }
};
