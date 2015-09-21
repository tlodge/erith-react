// This file bootstraps the entire application.
var React = require('react');
var $ = require('jquery');
var MainScreen = require('./components/MainScreen.react');
var MessageScreen = require('./components/MessageScreen.react');
var TagScreen = require('./components/TagScreen.react');
var SystemScreen = require('./components/SystemScreen.react');
var injectTapEventPlugin = require("react-tap-event-plugin");
var MessageStream = require('./utils/MessageStream');
var WebAPIUtils = require('./utils/WebAPIUtils');

//window.React = React; // export for http://fb.me/react-devtools
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

React.initializeTouchEvents(true);
injectTapEventPlugin();

WebAPIUtils.getTags();
WebAPIUtils.getLatestMessage();

MessageStream.init();


var App = React.createClass({

	getInitialState: function(){
		return {width: $(window).width(), height:$(window).height()};
	},

	componentWillMount: function(){
		window.addEventListener('resize', this._handleResize);
	},

	componentWillUnmount: function(){
		window.removeEventListener('resize', this._handleResize);
	},

	render: function(){

		var props = this.state;
		
		var containerstyle = {
			width: $(window).width(),
			height: $(window).height(),
			overflowX: 'hidden',
			overflowY: 'hidden',
		};
		
		return(
	        <div style={containerstyle}>
	          <RouteHandler {...props}/>
	          <div className="navigation">
	            <ul className="navbar">
					<li><Link to="photos">photos</Link></li>
					<li><Link to="messages">messages</Link></li>
					<li><Link to="tags">tags</Link></li>
					<li><Link to="system">system</Link></li>
	            </ul>
	          </div>
	        </div>
    	);
	},

	_handleResize: function(){
		this.setState({width: $(window).width(), height:$(window).height()});
	},
});

var routes = (
  <Route handler={App}>
	<Route name="photos"    handler={MainScreen}/>
	<Route name="messages"  handler={MessageScreen}/>
	<Route name="tags"   	handler={TagScreen}/>
	<Route name="system"   	handler={SystemScreen}/>
	<DefaultRoute handler={MainScreen} />
  </Route>
);

Router.run(routes, function(Handler, state){
    React.render(<Handler/>, document.getElementById('erith'));
});
