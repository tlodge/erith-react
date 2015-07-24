var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var MessageActionCreators = require('../actions/MessageActionCreators');

var injectTapEventPlugin = require("react-tap-event-plugin");
var MessageStore = require('../stores/MessageStore');
var ENTER_KEY_CODE = 13;

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
                  <div class="row">
                    <div class="large-12 columns">
                      <h1> {this.state.message} </h1>
                    </div>
                  </div>
                  <div class="row">
                     <div class="large-12 columns">
                      <MessageComposer newMessage={this._newMessage} />
                     </div>
                  </div>
             </div>
  },

  _newMessage: function(message){
    MessageActionCreators.newMessage(message);
  },

  _onChange: function(event){
      this.setState(getStateFromStores());
  }

});

var MessageComposer = React.createClass({

  getInitialState: function() {
    return {text: ''};
  },

  render: function() {
    var myStyle = {
      height: 300,
    }

    return (
        <textarea
          className="message-composer"
          style={myStyle}
          name="message"
          value={this.state.text}
          placeholder="type your response"
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}/>
    );
  },

  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        this.props.newMessage(text);
      }
      this.setState({text: ''});
    }
  }

});

module.exports = MessageScreen;
