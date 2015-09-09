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
          background: 'red url(' + this.state.currentpicture.image + ') no-repeat center center fixed',
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          OBackground: 'cover',
          backgroundSize: 'cover',
      };

      var titlebar = {
        position: 'absolute',
        height: 60,
        width: '100%',
        top: 0,
        left: 0,
        background: '#66b5a0',
        color: 'white',
        textAlign: 'center',
        lineHeight: '60px',
        fontSize: '150%',
      };

      var tagbar = {
         position: 'absolute',
        height: 60,
        width: '100%',
        bottom: 0,
        left: 0,
        background: '#66b5a0',
        color: 'white',
      };


      console.log("tags are ");
      console.log(this.state.currentpicture.tags);

      var tags = this.state.currentpicture.tags.map(function(tag){
          return <li>{tag}</li>;
      });

      var container = {
        width: this.props.width,
        height: this.props.height -120,
      };

    	return   <div onTouchTap={this._handleTouch}>
                <div style={titlebar}>{this.state.currentpicture.ts}</div>
                <div style={imageStyle}> 
                  <div style={container}></div>
                </div>
                <div style={tagbar}>
                  <ul className="inline-list">
                    {tags}
                  </ul>
                </div>

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
