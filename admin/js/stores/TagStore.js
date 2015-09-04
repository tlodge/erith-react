/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * TagStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ErithConstants = require('../constants/ErithConstants');
var WebAPIUtils = require('../utils/WebAPIUtils');

var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _tags = [];
var ActionTypes = ErithConstants.ActionTypes;
var MAXTAGS = 8;


var _settags = function(tags){
  _tags = tags;
};

var _addtag = function(tag){
  if (_tags.length < MAXTAGS){
    if (_tags.indexOf(tag) == -1){
      WebAPIUtils.addTag(tag);
    }
  }
};

var _removetag = function(tag){
  var idx = _tags.indexOf(tag);
  if (idx != -1){
     WebAPIUtils.deleteTag(tag);
  }
};

var TagStore = assign({}, EventEmitter.prototype, {

  tags: function() {
    return _tags;
  },

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
AppDispatcher.register(function(action) {

  switch(action.action.type) {

    case ActionTypes.RAW_TAGS:
        _settags(action.action.tags);
        TagStore.emitChange();
        break;

		case ActionTypes.ADD_TAG:
        _addtag(action.action.tag);
				break;

    case ActionTypes.REMOVE_TAG:
        _removetag(action.action.tag);
        break;
    
    default:
      // no op
  }
});

module.exports = TagStore;
