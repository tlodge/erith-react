var React = require('react/addons');
var ImageActionCreators = require('../actions/ImageActionCreators');
var ImageStore = require('../stores/ImageStore');


function getStateFromStores(){
  return {
      currentpicture : ImageStore.currentPicture(),
  };
}

var  FullPictureScreen = React.createClass({

  getInitialState: function() {
      return getStateFromStores();
  },

  componentDidMount: function() {
    ImageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ImageStore.removeChangeListener(this._onChange);
  },

  render: function() {
      var imageStyle = {
         position: 'absolute',
          top: 60,
          background: 'red url(' + this.state.currentpicture + ') no-repeat center center fixed',
          '-webkit-background-size': 'cover',
          '-moz-background-size': 'cover',
          '-o-background': 'cover',
          'background-size': 'cover',
      };

      var titlebar = {
        position: 'absolute',
        height: 60,
        width: '100%',
        top: 0,
        left: 0,
        background: '#3f3f3f',
        color: 'white',
      };

      var tagbar = {
         position: 'absolute',
        height: 60,
        width: '100%',
        bottom: 0,
        left: 0,
        background: '#3f3f3f',
        color: 'white',
      };

      var container = {
        width: this.props.width,
        height: this.props.height -120,
      };

    	return   <div onTouchTap={this._handleTouch}>
                <div style={titlebar}></div>
                <div style={imageStyle}> 
                  <div style={container}></div>
                </div>
                <div style={tagbar}></div>
              </div>;
               
  },


  _handleTouch: function(e){
    ImageActionCreators.cancel();
  },

  _onChange: function(event){
      this.setState(getStateFromStores());
  }

});

module.exports = FullPictureScreen;
