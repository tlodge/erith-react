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
          background: 'url(' + this.state.currentpicture.image + ') no-repeat center center fixed',
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          OBackground: 'cover',
          backgroundSize: 'cover',
      };

      var titlebar = {
        height: 60,
        width: '100%',
        top: 0,
        left: 0,
        background: '#445662',
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
        background: '#445662',
      };

     
      var tagstyle ={
          width: 50
      };

      var tagcontainer ={
        width: 120,
        marginLeft: 'auto',
        marginRight: 'auto', 
        textAlign: 'center',
      };

      var tags = this.state.currentpicture.tags.map(function(tag){
          if (tag.trim() !== ""){
            return (<li>
                  <div style={tagcontainer}>
                    <img src="/images/tag.svg" style={tagstyle}/>
                    <div>{tag}</div>
                  </div>
                </li>);
          }
          return "";
      });

       var taglabelbar ={
        position: 'absolute',
        height: 90,
        width: '100%',
        bottom: 0,
        left: 0,
        color: 'white',
        fontSize: '130%',
        marginLeft: 'auto',
        marginRight: 'auto',
      };

      var container = {
        width: this.props.width,
        height: this.props.height,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',// -120,
        background: '#7bb6a4'
      };

      var listStyle = {
        width: tagcontainer.width * (tags.length + 1)
      };

      var mainimagestyle = {
        width: 640,
        height: 480,
      };

       /*<div style={imageStyle}> 
                  <div style={container}>

                  </div>
                </div>*/

        /*<*/
    	return   <div onTouchTap={this._handleTouch}>
                  <div style={titlebar}>{this.state.currentpicture.ts}</div>
                  
                  <div style={container}>
                    <img src={this.state.currentpicture.image} style={mainimagestyle}/>
                  </div>

                  <div style={tagbar}></div>

                 
                    <div style={taglabelbar}>
                     <ul className="inline-list" style={listStyle}>
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
