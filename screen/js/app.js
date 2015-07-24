// This file bootstraps the entire application.

var ErithApp = require('./components/ErithApp.react');
var React = require('react');
var MessageStream = require('./utils/MessageStream');

window.React = React; // export for http://fb.me/react-devtools
MessageStream.init();

React.render(
    <ErithApp />, document.getElementById('erith')
);
