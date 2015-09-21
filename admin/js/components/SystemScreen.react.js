var React = require('react/addons');
var injectTapEventPlugin = require("react-tap-event-plugin");
var SystemActionCreators = require('../actions/SystemActionCreators');
var PingStore = require('../stores/PingStore');
var ENTER_KEY_CODE = 13;

injectTapEventPlugin();

function getStateFromStores(){
  return {
    ping: PingStore.latest(),
    reload: PingStore.reload(),
  };
}
var SystemScreen = React.createClass({

  getInitialState: function() {
      return getStateFromStores();
  },

  componentDidMount: function() {
    PingStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PingStore.removeChangeListener(this._onChange);
  },


  render: function() {
  
  	var greenbar = {
  		background: "#66b5a0",
  		height: this.props.height / 5,
  		width: '100%',
      position: 'relative',
  	};
  			
    var vcenter = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '100%',
      textAlign: 'center',
      color: 'white',
      fontSize: '130%',
    };   

    var systemcontainer = {
      padding: 15
    };

    var latestping, latestreload;

    if (this.state.ping.ts){
      latestping = this.state.ping.id + ": " + this.state.ping.ts; 
    }
    if (this.state.reload.ts){
      latestreload = "last reload: " + this.state.reload.ts;
    }

    return <div>
        			<div style={greenbar}>
                  <div style={vcenter}>System checks</div>
              </div>
              <div style={systemcontainer}>
                <div className="row">
                  <div className="large-2 columns">
                      <a onTouchTap={this._reload} className="button">reload</a>
                  </div>
                   <div className="large-10 columns">
                      <p> This will get the app to reload from the network.  Worth doing if it appears to be misbehaving </p>
                      <p><strong> {latestreload} </strong></p>
                  </div>
                </div>
                <div className="row">
                  <div className="large-2 columns">
                      <a onTouchTap={this._ping} className="button">ping</a>
                  </div>
                  <div className="large-10 columns">
                     <p> This will send a message to check if the app is running.  If you get no response the network is down or the app has crashed</p>
                     <p><strong> {latestping} </strong></p>
                  </div>
                </div>
              </div>
            </div>;
  },

  _reload: function(){
    console.log("reloading");
    SystemActionCreators.reload();
  },

  _ping: function(){
    console.log("pinging");
    SystemActionCreators.ping();
  },

  _onChange: function(event){
      this.setState(getStateFromStores());
  }


});

module.exports = SystemScreen;
