/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * ScreenStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ErithConstants = require('../constants/ErithConstants');
var ImageStore = require('./ImageStore');

var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _screens = {
			home :  {id:"home"},
			takepicture: {id:"takepicture"},
			picturetaken: {id:"picturetaken"},
      messages: {id:"messages"}
};

var _currentscreen = "home";

var ActionTypes = ErithConstants.ActionTypes;

function _changeScreen(screen){

	_currentscreen = screen;
}

var ScreenStore = assign({}, EventEmitter.prototype, {

  currentScreen: function() {
    return _screens[_currentscreen];
  },

  getAll: function(){
  	return Object.keys(_screens).map(function(key){
  		return _screens[key];
  	});
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

		case ActionTypes.CHANGE_SCREEN:
      
       if (action.action.screen === "messages" && _currentscreen !== "home")
          return;
      _changeScreen(action.action.screen);
       ScreenStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ScreenStore;
