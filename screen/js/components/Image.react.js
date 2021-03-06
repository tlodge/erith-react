/** @jsx React.DOM */
var React = require('react');
var ImageActionCreators = require('../actions/ImageActionCreators');

var Image = React.createClass({

  	render: function() {


   	 	return 		<div> 
   	 					<img  src={this.props.image.image} style={this.props.imageStyle}></img>
   	 					<div style={this.props.hitStyle} onTouchTap={this._showImage}></div>
   	 				</div>;
   	 			
  	},

  	_showImage: function(){
  		ImageActionCreators.imageSelected(this.props.image);
  	}
});

module.exports = Image;