/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * ErithConstants
 */

var keyMirror = require('keymirror');

module.exports = {

	ActionTypes: keyMirror({
		CLICK_PRESSED: null,
		CHANGE_SCREEN: null,
		NEW_MESSAGE: null,
		IMAGE_LIST:null,
		IMAGE_SAVED_TO_SERVER: null,
		IMAGE_DELETED: null,
  	}),

  	PayloadSources: keyMirror({
    	SERVER_ACTION: null,
    	VIEW_ACTION: null
  	}),
};
