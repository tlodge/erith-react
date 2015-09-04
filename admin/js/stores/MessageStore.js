/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * MessageStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ErithConstants = require('../constants/ErithConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _message="";
var ActionTypes = ErithConstants.ActionTypes;

function _updateMessage(message){
	_message = message;
}

var MessageStore = assign({}, EventEmitter.prototype, {

  message: function() {
    return _message;
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

		//case ActionTypes.NEW_MESSAGE:
		//	  _updateMessage(action.action.message);
		//		MessageStore.emitChange();
		//		break;
    
    case ActionTypes.RAW_MESSAGE:
        _updateMessage(action.action.message);
        MessageStore.emitChange();
        break;

    default:
      // no op
  }
});

module.exports = MessageStore;
