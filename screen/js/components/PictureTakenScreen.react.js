var React = require('react/addons');
var ImageActionCreators = require('../actions/ImageActionCreators');
var injectTapEventPlugin = require("react-tap-event-plugin");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

injectTapEventPlugin();

var TakePictureScreen = React.createClass({

  componentDidMount: function() {

  },

  componentWillUnmount: function() {

  },
  // <div onTouchTap={this._handleTryAgain} className="large-6 columns">hmmm, try again</div>
  render: function() {
    	return (
                <div>
                    <div className="takepicheader"></div>
                    <div className="takepicbackground"></div>
                    <ReactCSSTransitionGroup transitionName="takepicture" transitionAppear={true}>
                      <div onTouchTap={this._handleUse} className="use"></div>
                      <div onTouchTap={this._handleCancel} className="cancel"></div>
                    </ReactCSSTransitionGroup>
                </div>
             )
  },


  _handleUse: function(){
    console.log("HANDLE USE HAS BEEN CLICKED!!");
    //ViewFinderActionCreators.usePressed();
    //CameraActionCreators.imageReadyToBeSaved();
    ImageActionCreators.savePicture();
  },

  _handleCancel: function(){
    console.log("HANDLE CANCEL HAS BEEN CLICKED!!");
    ImageActionCreators.cancel();

  }

});

module.exports = TakePictureScreen;
