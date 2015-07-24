/** @jsx React.DOM */
var React = require('react');
var MainScreen = require('./MainScreen.react')
var $ = require('../lib/jquery.min')

React.initializeTouchEvents(true);


var PhotoScreen = React.createClass({

	componentDidMount: function(){
	 
	},

	componentWillUnmount: function(){

	},

  	render: function() {
  		
  		var width  =  $(window).width();
		var height = $(window).height();
  		var navbarheight = 60;
  		var imagescreenheight = height-navbarheight;

		return	<div>
					<MainScreen width={width} height={height}/>
				</div>
  			       
  	}
});

module.exports = PhotoScreen;
