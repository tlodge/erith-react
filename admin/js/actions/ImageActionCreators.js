var constraints = {video: true, audio: true};
var video;
var dataURL;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ErithConstants = require('../constants/ErithConstants');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ActionTypes = ErithConstants.ActionTypes;
var canvas;

module.exports = {

    deleteImage: function(image){
      WebAPIUtils.deleteImage(image)
    },
}
