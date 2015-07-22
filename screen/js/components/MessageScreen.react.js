var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var ImageActionCreators = require('../actions/ImageActionCreators');
var injectTapEventPlugin = require("react-tap-event-plugin");
var MessageStore = require('../stores/MessageStore');

injectTapEventPlugin();

function getStateFromStores(){
  return {
      message: MessageStore.message()
  }
}

var MessageScreen = React.createClass({

  getInitialState: function() {
      return getStateFromStores();
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    	return <div>
                
                  <div className="takepicbackground"></div>
                  <div onTouchTap={this._handleTouch} className="messagebox">
                      <div className="messagetext">
                        {this.state.message}
                      </div>
                  </div>
                
             </div>
  },

  _handleTouch: function(e){
    e.stopPropagation();
    e.preventDefault();
    ImageActionCreators.cancel();
  },

  _onChange: function(event){
      this.setState(getStateFromStores());
  }

});

module.exports = MessageScreen;
