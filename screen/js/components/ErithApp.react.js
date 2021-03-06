/** @jsx React.DOM */
var React = require('react');
React.initializeTouchEvents(true);

var MainScreen 					= require('./MainScreen.react');
var TakePictureScreen 	= require('./TakePictureScreen.react');
var PictureTakenScreen 	= require('./PictureTakenScreen.react');
var MessageScreen 	= require('./MessageScreen.react');
var FullPictureScreen = require('./FullPictureScreen.react');
var ImageActionCreators = require('../actions/ImageActionCreators');
var d3viewfinder = require('../lib/viewfinder');
var $ = require('../lib/jquery.min');
var ScreenStore = require('../stores/ScreenStore');
var MessageStore = require('../stores/MessageStore');
var TagStore = require('../stores/TagStore');
var cx = require('react/lib/cx');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

getStateFromStores = function(){
	return {
		windowwidth:$(window).width(),
		windowheight:$(window).height(),
		screen: ScreenStore.currentScreen(),
		message: MessageStore.message(),
		tags: TagStore.getAll(),
		selected: TagStore.selected(),
	};
};

var ErithApp = React.createClass({

	getInitialState: function() {
    	return getStateFromStores();
  	},

	componentDidMount: function(){
	 	ScreenStore.addChangeListener(this._onChange);
	 	MessageStore.addChangeListener(this._onChange);
	 	TagStore.addChangeListener(this._onChange);
	 	ImageActionCreators.setUpVideo();
		d3viewfinder.create({vh:480, vw:480, oh:640, ow:$(window).width(), radius:200});
		d3viewfinder.updatemessage(this.state.message.message);
		window.addEventListener('resize', this._handleResize);
	},

	componentWillUnmount: function(){
		ScreenStore.removeChangeListener(this._onChange);
		MessageStore.removeChangeListener(this._onChange);
		TagStore.removeChangeListener(this._onChange);	
		window.removeEventListener('resize', this._handleResize);
	},

  	render: function() {
 
  		var screen;

  		var camerahidden = false;
  		switch (this.state.screen.id){
  			
  			case "takepicture":
  				screen = <TakePictureScreen width={this.state.windowwidth} height={this.state.windowheight}/>;
  				break;

  			case "fullpicture":
  				camerahidden = true;
  				screen = <FullPictureScreen width={this.state.windowwidth} height={this.state.windowheight}/>;
  				break;

			case "picturetaken":
	  			screen = <PictureTakenScreen width={this.state.windowwidth} height={this.state.windowheight}/>;
	  			break;

	  		case "messages":
	  			camerahidden = true;
	  			screen = <MessageScreen width={this.state.windowwidth} height={this.state.windowheight}/>;
	  			break;

  			default:
  				d3viewfinder.hidetags();
  				screen = <MainScreen width={this.state.windowwidth} height={this.state.windowheight}/>;
  		}

		var maskStyle ={

			MozBorderRadius:"240px",
			borderRadius:"240px",
			overflow:"hidden",
			position:"absolute",
			top:  (this.state.windowheight - 480) / 2,
			left: (this.state.windowwidth - 480) / 2,
			zIndex:-100,
			width:480,
			height:480,
		};

		var canvasStyle={
			position:"absolute",
			zIndex:10,
			width:640,
			height:480,
			left: -(640-480)/2,
		};


		var svgStyle = {
			position:"absolute",
			top:  (this.state.windowheight - 640) / 2,
			width:this.state.windowwidth,
			height:640,
		};
		
	 		var videoStyle={
			position: "relative",
			width:640,
			height:480,
			left: -(640-480)/2,
		};
		
		
		d3viewfinder.updatemessage(this.state.message.message);
		
		console.log("UPDATING TAGS!!!");

		d3viewfinder.updatetags(this.state.tags.map(function(tag){
			return {text:tag, selected: this.state.selected.indexOf(tag) != -1};
		}.bind(this)));
		
		var containerstyle = {
			width: $(window).width(),
			height: $(window).height(),
			maxWidth: $(window).width(),
			maxHeight: $(window).height(),
			overflowX: 'hidden',
			overflowY: 'hidden',
		};

		return	<div style={containerstyle}>
				    	<div>
				    		<div>{screen}</div>
				    	</div>
						<div id="videos" className={cx({'hidden': camerahidden})}>
					    <div  style={maskStyle} className="masktmp">
							<canvas id="canvas" width="640" height="480" style={canvasStyle}></canvas>
					       	<video id="localVideo" style={videoStyle} ref="video" autoPlay muted></video>
					    </div>
						<svg id="overlay" style={svgStyle}></svg>
					 </div>	
			       </div>;
  	},

  	_handleResize: function(){
  		this.setState({windowwidth: $(window).width(), windowheight:$(window).height()});
  		d3viewfinder.update({vh:480, vw:480, oh:640, ow:$(window).width(), radius:200});
  	},

  	_onChange: function() {
		this.setState(getStateFromStores());
  	}

});

module.exports = ErithApp;
