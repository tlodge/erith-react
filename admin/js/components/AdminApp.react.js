/** @jsx React.DOM */
var React = require('react');
var MainScreen = require('./MainScreen.react')
var NavBar = require('./NavBar.react')
var $ = require('../lib/jquery.min')
var ScreenStore = require('../stores/ScreenStore')
var MessageStore = require('../stores/MessageStore')
var cx = require('react/lib/cx');

React.initializeTouchEvents(true);

getStateFromStores = function(){
	return {
		windowwidth:$(window).width(),
		windowheight:$(window).height(),
		screen: ScreenStore.currentScreen(),
		message: MessageStore.message() || "",
	};
}

var AdminApp = React.createClass({

	getInitialState: function() {
    	return getStateFromStores();
  	},

	componentDidMount: function(){
	 	ScreenStore.addChangeListener(this._onChange);
	 	MessageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		ScreenStore.removeChangeListener(this._onChange);
		MessageStore.addChangeListener(this._onChange);
	},

  	render: function() {
  		
  		var navbarheight = 60;
  		var imagescreenheight = this.state.windowheight-navbarheight;
  		var screen;

  		switch (this.state.screen.id){
  			

	  		case "messages":
	  			screen = <MessageScreen width={this.state.windowwidth} height={imagescreenheight}/>
	  			break;

  			default:
  				screen = <MainScreen width={this.state.windowwidth} height={imagescreenheight}/>
  		}

		return	<div>
					{screen}
					<NavBar height={navbarheight}/>
				</div>
  			       
  	},

  	_onChange: function() {
		this.setState(getStateFromStores());
  	}

});

module.exports = AdminApp;
