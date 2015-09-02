/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * TagStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ErithConstants = require('../constants/ErithConstants');

var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _tags = [];
var ActionTypes = ErithConstants.ActionTypes;


var _addtag = function(tag){
  if (_tags.indexOf(tag) == -1){
    _tags.push(tag);
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

		case ActionTypes.ADD_TAG:
        _addtag(action.action.tag);
				TagStore.emitChange();
				break;

    case ActionTypes.REMOVE_TAG:
        TagStore.emitChange();
        break;
    
    default:
      // no op
  }
});

module.exports = TagStore;
