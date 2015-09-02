var React = require('react');
var ImageStore = require('../stores/ImageStore');
var ImageActionCreators = require('../actions/ImageActionCreators');
var WebAPIUtils = require('../utils/WebAPIUtils');

function getStateFromStores(){
  return {
      images: ImageStore.getAll()
  };
}

var MainScreen = React.createClass({

  getInitialState: function(){
		return getStateFromStores();
	},

  componentDidMount: function() {
    ImageStore.addChangeListener(this._onChange);
    WebAPIUtils.getImages();
  },

  componentWillUnmount: function() {
    ImageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    	//var _images = ["./images/tom1.jpg","./images/tom2.jpg","./images/tom3.jpg","./images/tom4.jpg","./images/tom5.jpg","./images/tom6.jpg","./images/tom7.jpg","./images/tom8.jpg","./images/tom1.jpg"];


  		var htow = 640/480;
  		var wtoh = 480/640;
  		var padding = 5;
  		var width = this.props.width;// / 3 - padding;
  		var height = this.props.height;// / 3 - padding;

      var dimensions = [
        {x:0 ,y:0,h:height/2-padding, w:width/2},
        {x:width/2+padding, y:0, h:height/3, w:(width/2)},
        {x:0, y:height/2, h:height/2, w:width/2},
        {x:width/2 +padding, y:height/3+padding, h:height/3-padding, w:width/2},
        {x:width/2 +padding, y:(height/3)*2 + padding, h:height/3-padding, w:(width/2)/1.5 - padding},
        {x:width/2 + (width/2)/1.5 + padding, y:(height/3)*2+padding, h:height/3-padding, w: ((width/2)-(width/2)/1.5)}
      ];

  		var images = this.state.images.map(function(image, i){
      	var landscape = dimensions[i].w * wtoh > dimensions[i].h;

        var w = landscape ? dimensions[i].w : dimensions[i].h * htow;
        var h = landscape ? dimensions[i].w * wtoh : dimensions[i].h;
        var hdelta = (h-dimensions[i].h)/2;
        console.log(hdelta);

        var imageStyle ={
          position: 'absolute',
          top: dimensions[i].y-hdelta,
          left: dimensions[i].x,
          width:  w,
          height: h,
          clip: "rect(" + hdelta + "px, " + dimensions[i].w + "px," + (dimensions[i].h+hdelta) + "px, 0px)",
          zIndex: -99999,
        }

        var deleteImageStyle ={
          position: 'absolute',
          top: dimensions[i].y + 15,
          left: dimensions[i].x + dimensions[i].w - 45,
        }

  			return <div>
                <Image source={image} imageStyle={imageStyle} />
                <TagBox x={dimensions[i].x}
                        y={dimensions[i].y} 
                        width={dimensions[i].w} 
                        height={dimensions[i].h} />
                <Delete source={image} x={dimensions[i].x}
                        y={dimensions[i].y} 
                        width={dimensions[i].w} />
              </div>
  		});

  		return <div>{images}</div>
  },

  _onChange: function(event){
  		this.setState(getStateFromStores());
  }

});

var TagBox = React.createClass({

    render: function(){

      var tagBoxStyle ={
          position: 'absolute',
          top: this.props.y+ this.props.height - 25,
          left: this.props.x,
          width: this.props.width,
          background: '#333333',
          opacity: 0.8,
          height:25,
          color: 'white',
          textAlign: 'center',
          lineHeight: "25px",
          zIndex: -99999,
          overflowX: 'hidden'
      }

      return <div style={tagBoxStyle}><strong>12 March 2.30pm</strong></div>
    }
});

var Image = React.createClass({
    render: function() {
      return  <img src={this.props.source} style={this.props.imageStyle}></img>
    },

    
});

var Delete = React.createClass({
    render: function(){
      
      var deleteImageStyle ={
          position: 'absolute',
          top: this.props.y + 15,
          left: this.props.x + this.props.width - 45,
      }

      return <div onTouchTap={this._deleteImage}  className="deleteImage" style={deleteImageStyle}>x</div>
    },

    _deleteImage: function(){
      console.log("would delete");
      console.log(this.props.source);
      ImageActionCreators.deleteImage(this.props.source);
    }
});


module.exports = MainScreen;
