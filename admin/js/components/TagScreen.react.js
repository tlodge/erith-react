var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var MessageActionCreators = require('../actions/MessageActionCreators');
var injectTapEventPlugin = require("react-tap-event-plugin");
var TagStore = require('../stores/TagStore');
var ENTER_KEY_CODE = 13;

injectTapEventPlugin();

function getStateFromStores(){
  return {
     tags: TagStore.tags()
  };
}

var TagScreen = React.createClass({

  getInitialState: function() {
      return getStateFromStores();
  },

  componentDidMount: function() {
    TagStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TagStore.removeChangeListener(this._onChange);
  },

  render: function() {
  
  	var greenbar = {
  		background: "#66b5a0",
  		height: this.props.height / 5,
  		width: '100%',
  	};
  			
    return <div>
        			<div style={greenbar}></div>
              <h1> tags </h1>
            </div>;
  },

  _onChange: function(event){
      this.setState(getStateFromStores());
  }

});

module.exports = TagScreen;
