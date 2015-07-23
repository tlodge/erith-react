// This file bootstraps the entire application.

var AdminApp = require('./components/AdminApp.react');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

React.render(
    <AdminApp />, document.getElementById('erith')
);
