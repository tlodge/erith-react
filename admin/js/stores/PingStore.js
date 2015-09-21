/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * PingStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ErithConstants = require('../constants/ErithConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _ping = {};

var ActionTypes = ErithConstants.ActionTypes;

var _updatePing = function(ping){
	_ping = ping;
};

var PingStore = assign({}, EventEmitter.prototype, {

  latest: function() {
    return _ping || {};
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

    
    case ActionTypes.PING_RESPONSE:
        console.log("updating ping!!");
        _updatePing(action.action.response);
        PingStore.emitChange();
        break;

    default:
      // no op
  }
});

module.exports = PingStore;
