var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var WebAPIUtils = require('../utils/WebAPIUtils');

var TakePictureScreen = React.createClass({

  componentDidMount: function() {
    console.log("TAKE PICTURE SCREEN MOUNTED!!");
    WebAPIUtils.getTags();
  },

  componentWillUnmount: function() {

  },

  render: function() {
    	return <div>
                <ReactCSSTransitionGroup transitionName="takepicture" transitionAppear={true}>
                  <div className="takepicheader"></div>
                  <div className="takepicsmile"></div>
                  <div className="takepicbackground"></div>
                </ReactCSSTransitionGroup>
             </div>;
  }

});

module.exports = TakePictureScreen;
