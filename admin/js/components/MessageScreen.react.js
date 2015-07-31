var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var MessageActionCreators = require('../actions/MessageActionCreators');
var $ = require('../lib/jquery.min');
var injectTapEventPlugin = require("react-tap-event-plugin");
var MessageStore = require('../stores/MessageStore');
var ENTER_KEY_CODE = 13;

injectTapEventPlugin();

function getStateFromStores(){
  return {
      currentmessage: MessageStore.message(),
  	  newmessage : ""
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
  
  		var width = $(window).width();
  		var height = $(window).height();
  		var padding = 40;
  		var messageboxheight = height - (padding*4);
  		var textareaheight = 100;
  		
  		var greenbar = {
  			background: "#66b5a0",
  			height: height / 5,
  			width: '100%',
  		}
  		
  		var messagebox = {
  			background: "white",
  			border: "1px solid #000",
  			position: 'absolute',
  			top: 20,
  			left: 20,
  			width:  width - padding,
  			height: messageboxheight,
  			opacity: 1.0,
  		}
  		
  		var buttonbar ={
  			position: "absolute",
  			bottom: padding,
  			left: padding/2,
  		}
  		
  		var messagetext = {
  			fontSize: "150%",
  			padding: "0px 10px 10px 10px",
  			height: messageboxheight - textareaheight - (56) - padding/2,
  			overflowY: 'auto',
  			clear: 'both',
  		}
  		
    	return <div>
    			  <div style={greenbar}></div>
    			  <div style={messagebox}>
    			  	<div className="messageboxtitle"> current message </div>
    			  	<div className="messageboxdate">05 Aug 2015 12.34</div>
    			  	<div style={messagetext}>{this.state.currentmessage}</div>
    			  	<MessageComposer message={this.state.newmessage} width={width-padding} height={messageboxheight} textareaheight={textareaheight} newMessage={this._newMessage} />
    			  </div>
    			  <div style={buttonbar}>
    			  	<div onTouchTap={this._sendMessage} className="button">send</div>
    			  </div>
             </div>
  },

  _sendMessage: function(){
   	MessageActionCreators.newMessage(this.state.newmessage);
  	//this.setState({newmessage:""});
  },
  
  _newMessage: function(message){
   	this.setState({newmessage:message})
  },

  _onChange: function(event){
      this.setState(getStateFromStores());
  }

});

var MessageComposer = React.createClass({

  getInitialState: function() {
    return {text: this.props.message};
  },

  render: function() {
  
  	var titleheight = 56;
  	
    var myStyle = {
      height: this.props.textareaheight,
      width: this.props.width,
      fontSize: "120%"
    }

	var placement = {
		position: 'absolute',
		top: this.props.height - this.props.textareaheight ,
	}
	
    return (
    	<div style={placement}>
    	
        <textarea
          className="message-composer"
          style={myStyle}
          name="message"
          value={this.props.message}
          placeholder="type your new message"
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}/>
        </div>
    );
  },

  _onChange: function(event, value) {
    this.props.newMessage(event.target.value);
    //this.setState({text: event.target.value});
  },

  /*_onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        this.props.newMessage(text);
      }
      //this.setState({text: ''});
    }
  }*/

});

module.exports = MessageScreen;
