// This file bootstraps the entire application.

var ErithApp = require('./components/ErithApp.react');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

React.render(
    <ErithApp />, document.getElementById('erith')
);
