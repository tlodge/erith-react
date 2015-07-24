/** @jsx React.DOM */
var React = require('react');
//var ViewFinder 					= require('./ViewFinder.react')
var MainScreen 					= require('./MainScreen.react')
var TakePictureScreen 	= require('./TakePictureScreen.react')
var PictureTakenScreen 	= require('./PictureTakenScreen.react')
var MessageScreen 	= require('./MessageScreen.react')
//var Camera = require('../utils/Camera')
var ImageActionCreators = require('../actions/ImageActionCreators')
var d3viewfinder = require('../lib/viewfinder')
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

var ErithApp = React.createClass({

	getInitialState: function() {
    	return getStateFromStores();
  	},

	componentDidMount: function(){
	 	ScreenStore.addChangeListener(this._onChange);
	 	MessageStore.addChangeListener(this._onChange);
	 	ImageActionCreators.setUpVideo();
		d3viewfinder.create({vh:480, vw:480, oh:640, ow:$(window).width(), radius:200});
		d3viewfinder.updatemessage(this.state.message);
	},

	componentWillUnmount: function(){
		ScreenStore.removeChangeListener(this._onChange);
		MessageStore.removeChangeListener(this._onChange);
	},

  	render: function() {
  		
		
	
  		var screen;

  		var camerahidden = false;
  		switch (this.state.screen.id){
  			
  			case "takepicture":
  				screen = <TakePictureScreen width={this.state.windowwidth} height={this.state.windowheight}/>
  				break;

			case "picturetaken":
	  			screen = <PictureTakenScreen width={this.state.windowwidth} height={this.state.windowheight}/>
	  			break;

	  		case "messages":
	  			camerahidden = true;
	  			screen = <MessageScreen width={this.state.windowwidth} height={this.state.windowheight}/>
	  			break;

  			default:
  				d3viewfinder.hidetags();
  				screen = <MainScreen width={this.state.windowwidth} height={this.state.windowheight}/>
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
			}

			var canvasStyle={
				position:"absolute",
				zIndex:10,
				width:640,
				height:480,
				left: -(640-480)/2,
			}


			var svgStyle = {
				position:"absolute",
				top:  (this.state.windowheight - 640) / 2,
				width:this.state.windowwidth,
				height:640,
			}
  		
   	 		var videoStyle={
				position: "relative",
				width:640,
				height:480,
				left: -(640-480)/2,
			}
			
			
			d3viewfinder.updatemessage(this.state.message);

			return	<div>
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
  			       </div>
  	},

  	_onChange: function() {
		this.setState(getStateFromStores());
  	}

});

module.exports = ErithApp;
