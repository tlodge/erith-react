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
var _tags = [];
var _selected = [];

var ActionTypes = ErithConstants.ActionTypes;

var _setTags = function(tags){
  _tags = tags;
};

var _deselectTags = function(){
  _selected = [];
};

var _setSelected = function(tag){
  console.log("tag selected");
  var idx = _selected.indexOf(tag);
  
  if (idx == -1){
    _selected.push(tag);
  }else{
    _selected.splice(idx, 1);
  }
  console.log(_selected);
};

var TagStore = assign({}, EventEmitter.prototype, {

  getAll: function(){
    return _tags;
  },

  selected: function(){
    return _selected;
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
TagStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.action.type) {
  	
    case ActionTypes.CHANGE_SCREEN:
      _deselectTags();
      TagStore.emitChange();
      break;

    case ActionTypes.TAG_SELECTED:
      _setSelected(action.action.tag);
      TagStore.emitChange();
      break;

    case ActionTypes.RAW_TAGS:
      _setTags(action.action.tags);
      TagStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TagStore;
