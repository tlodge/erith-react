/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * ImageStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ErithConstants = require('../constants/ErithConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var MAX_IMAGES = 6;
var imageCount  = 0;
var _images = [];

var ActionTypes = ErithConstants.ActionTypes;


function _saveImage(image){
	var index = imageCount++%(MAX_IMAGES);
	window.sessionStorage.setItem("selfie"+ index, image);
}

function _setImageList(images){
  _images = images;
}

function _addImage(url){
  _images.push(url);
}
var ImageStore = assign({}, EventEmitter.prototype, {

  getAll: function(){
    return _images;
  },

  /*getAll: function(){

		var _images  = [];

		for (var i = 0; i < MAX_IMAGES; i++){
			var m = window.sessionStorage.getItem("selfie"+i);
				if (m){
					_images.push(m);
				}
		}
		console.log(_images);
		return _images;
  },*/

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
ImageStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.action.type) {
  	case ActionTypes.IMAGE_READY_TO_BE_SAVED:
			//_saveImage(action.action.imageData);
      ImageStore.emitChange();
      break;

    case ActionTypes.IMAGE_LIST:
      _setImageList(action.action.list);
      ImageStore.emitChange();
      break;

    case ActionTypes.IMAGE_SAVED_TO_SERVER:
      _addImage(action.action.url);
      ImageStore.emitChange();
      break;
    
    default:
      // no op
  }
});

module.exports = ImageStore;
