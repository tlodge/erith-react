/** @jsx React.DOM */
var React = require('react');


var Image = React.createClass({
  	render: function() {
   	 	return <img src={this.props.source} style={this.props.imageStyle}></img>;
  	}
});

module.exports = Image;