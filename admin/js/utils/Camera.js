var d3 = require('../lib/d3');
var vf = require('../lib/viewfinder');
var CameraActionCreators = require('../actions/CameraActionCreators');
var ViewFinderActionCreators = require('../actions/ViewFinderActionCreators');
var video;
var dataURL;
var imageCount = 0;
var MAX_IMAGES = 9;
var constraints = {video: true, audio: true};
var localStream = null;
var circle;
var video;
var props;

module.exports = {

	componentDidMount: function() {
		console.log("ODDD---> am in component did mount!!");
		ScreenStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		ScreenStore.removeChangeListener(this._onChange);
	},

	init: function(p) {
		props  = p;
		video = document.getElementById("localVideo");


		if (navigator.webkitGetUserMedia){
			navigator.webkitGetUserMedia(constraints,function(stream){
				video.src = window.URL.createObjectURL(stream);
				video.play();
			}, this.handleUserMediaError);
		}
		else if(navigator.getUserMedia) { // Standard
			navigator.getUserMedia(constraints, function(stream) {
				video.src = stream;
				video.play();
			}, this.handleUserMediaError);
		}else if(navigator.mozGetUserMedia) { // Firefox-prefixed
			navigator.mozGetUserMedia(constraints, function(stream){
				video.src = window.URL.createObjectURL(stream);
				video.play();
			}, this.handleUserMediaError);
		}
		props.handleClick = this.handleClick;
		vf.create(props);
	},

  handleUserMediaError: function(error) {
    alert("[!] getUserMedia error: ", error);
  },

	//savepicture: function(){
		//CameraActionCreators.imageReadyToBeSaved(dataURL);
	//},

	handleClick: function(){

		ViewFinderActionCreators.clickPressed();

		vf.countdown(function(){
			var canvas = document.getElementById("canvas");

			var context = canvas.getContext("2d");


			context.drawImage(video, 0, 0, props.vw, props.vh);
			//var dataURL = compressImage(canvas, 20);

	 		var dataURL = canvas.toDataURL("image/jpeg", 1.0);

			console.log("data url is");
			console.log(dataURL);
			if (dataURL == null) {
				alert("We couldn't compress the image small enough");
				return;
			}
			CameraActionCreators.pictureTaken(dataURL);
		});
	},

	_onChange: function(){
		var screen = ScreenStore.currentScreen();

		if (screen.id === "home"){
			console.log("screen is tags!!")
			//d3c.tags(this.getChartState(),0);
		}
	}
};
