var React = require('react');
var Image = require('./Image.react');
var ImageStore = require('../stores/ImageStore');
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
    WebAPIUtils.getLatestMessage();
  },

  componentWillUnmount: function() {
    ImageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    	//var _images = ["./images/tom1.jpg","./images/tom2.jpg","./images/tom3.jpg","./images/tom4.jpg","./images/tom5.jpg","./images/tom6.jpg","./images/tom7.jpg","./images/tom8.jpg","./images/tom1.jpg"];


  		var htow = 640/480;
  		var wtoh = 480/640;
  		var padding = 5;

      var viewfinderradius = this.props.height/3;
  		var width = this.props.width;// / 3 - padding;
  		var height = this.props.height;// / 3 - padding;

  		//find out which is bigger, the scaled width or the scaled height
  		var sheight  = width * wtoh;
  		var swidth   = height * htow;

  		dim = {};
  		//if (sheight > swidth){
  			dim = {w:width, h:sheight};
  		//}
  		//else{
  		//	dim = {w:swidth, h:height}
  		//}

      var dimensions = [
        {x:0 ,y:0,h:height/2-padding, w:width/2},
        {x:width/2+padding, y:0, h:height/3, w:width/2},
        {x:0, y:height/2, h:height/2, w:width/2},
        {x:width/2+viewfinderradius/2+padding, y:height/3+padding, h:height/3-padding, w:width/2-viewfinderradius/2},
        {x:width/2 +padding, y:(height/3)*2 + padding, h:height/3-padding, w:(width/2)/1.5 - padding},
        {x:width/2 + (width/2)/1.5 + padding, y:(height/3)*2+padding, h:height/3-padding, w:(width/2)-(width/2)/1.5}
      ];

      var TAGBOXHEIGHT = 40;

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
        };

        var tagBoxStyle ={
          position: 'absolute',
          top: dimensions[i].y + dimensions[i].h - TAGBOXHEIGHT,
          left: dimensions[i].x,
          background: '#333333',
          opacity: 0.8,
          width:   dimensions[i].w,
          height:TAGBOXHEIGHT,
          color: 'white',
          textAlign: 'center',
          lineHeight: TAGBOXHEIGHT + "px",
          zIndex: -99999,
          paddingLeft: 10,
          paddingRight: 10,
        };


        var hitStyle = {
          position: 'absolute',
          top: dimensions[i].y + dimensions[i].h - TAGBOXHEIGHT,
          left: dimensions[i].x,
          opacity: 0.8,
          width:  w,
          height:TAGBOXHEIGHT,
          textAlign: 'center',
          lineHeight: TAGBOXHEIGHT + "px",
          zIndex: 99999,
        };

        var alignment = dimensions[i].x === 0 ? "left" : "right";

  			return  <div>
                  <Image image={image} hitStyle={hitStyle} imageStyle={imageStyle} />
                  <div className="clearifx" style={tagBoxStyle}>
                     <strong>{image.ts}</strong>
                     <div className={alignment}><i className="fa fa-search-plus"></i></div>
                  </div>
                </div>;

  		});

  		return <div>{images}</div>;
  },

  _tapped: function(){
    console.log("APPED");
  },

  _onChange: function(event){
  		this.setState(getStateFromStores());
  }

});



module.exports = MainScreen;
