var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TakePictureScreen = React.createClass({

  componentDidMount: function() {

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
             </div>
  }

});

module.exports = TakePictureScreen;
