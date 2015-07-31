// This file bootstraps the entire application.
var React = require('react');
var PhotoScreen = require('./components/PhotoScreen.react');
var MessageScreen = require('./components/MessageScreen.react');
var MessageStream = require('./utils/MessageStream');
MessageStream.init();


window.React = React; // export for http://fb.me/react-devtools
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({

	render: function(){
		return(
	        <div>
	          <RouteHandler />
	          <div className="navigation">
	            <ul className="navbar">
					<li><Link to="photos">photos</Link></li>
					<li><Link to="messages">messages</Link></li>
	            </ul>
	          </div>
	        </div>
    	);
	}
});

var routes = (
  <Route handler={App}>
	<Route name="photos"     handler={PhotoScreen}/>
	<Route name="messages"   handler={MessageScreen}/>
	<DefaultRoute handler={PhotoScreen} />
  </Route>
);

Router.run(routes, function(Handler, state){
    React.render(<Handler/>, document.getElementById('erith'));
});
