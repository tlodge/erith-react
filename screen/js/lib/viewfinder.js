var ImageActionCreators = require('../actions/ImageActionCreators');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ErithConstants = require('../constants/ErithConstants');

var ActionTypes = ErithConstants.ActionTypes;
var ypadding = 0; //state.height/15;
var horizdiv = 2.2;
var d3 = require('./d3');

var videowidth;
var videoheight;
var radius;
var originX;
var originY;
var cX;
var cY;
var self;
var _tags;

var ViewFinder = {


  create: function(props) {
    self = this;
    cX = props.ow / 2; //+ (props.ow-props.vw)/2;
    cY = props.oh / 2;
    radius = props.vh / 2;
    originX = props.ow / 2;
    originY = props.vh + (props.oh - props.vh) / 2; //props.height/2;//ypadding+props.height/horizdiv;


    var svg = d3.select("svg");


    var vf = svg.append('g')
      .attr('class', 'viewfinder');

    vf.append("circle")
      .attr("class", "outervfc")
      .attr("cx", cX)
      .attr("cy", cY)
      .attr("r", radius + 6)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .style("fill-opacity", "0");

    vf.append("circle")
      .attr("class", "middlevfc")
      .attr("cx", cX)
      .attr("cy", cY)
      .attr("r", radius + 2)
      .style("stroke", "#5a87aa")
      .style("stroke-width", 6)
      .style("fill-opacity", "0");

    vf.append("circle")
      .attr("class", "innervfc")
      .attr("cx", cX)
      .attr("cy", cY)
      .attr("r", radius)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .style("fill-opacity", "0");

    var clicker = svg.append("g").attr("class", "toplayer");
    var tags = svg.append('g').attr("class", "tags");


    clicker.append("circle")
      .attr("class", "clicker")
      .attr("cx", originX)
      .attr("cy", originY)
      .attr("r", radius / 4)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .style("fill", "#f09077")
      .on("click", this.startpicturetaking);


    clicker.append("text")
      .attr("class", "countdown")
      .attr("dy", ".35em")
      .attr("x", originX)
      .attr("y", originY)
      .attr("text-anchor", "middle")
      .style("font-size", (radius / 4 * 1.2) + "px")
      .style("fill", "white")
      .style("opacity", 0)
      .text("5")
      .on("click", this.startpicturetaking);

    var lensradius = radius / 6;
    var cameraheight = (radius / 3.5);
    /* add the camera */
    var camera = clicker.append("g")
      .attr("class", "camera");



    camera.append("circle")
      .attr("cx", originX)
      .attr("cy", originY - 10)
      .attr("r", lensradius)
      .style("fill", "#e6e6e6")
      .style("stroke", "black")
      .on("click", this.startpicturetaking);

    camera.append("rect")
      .attr("x", originX - radius / 4 - 5)
      .attr("y", originY - cameraheight / 2)
      .attr("width", (radius / 4 * 2) + 10)
      .attr("height", cameraheight)
      .attr("rx", 5)
      .style("fill", "#e6e6e6")
      .style("stroke", "black")
      .on("click", this.startpicturetaking);

    camera.append("circle")
      .attr("cx", originX)
      .attr("cy", originY)
      .attr("r", lensradius)
      .style("fill", "white")
      .style("stroke", "black")
      .on("click", this.startpicturetaking);

    camera.append("circle")
      .attr("cx", originX)
      .attr("cy", originY)
      .attr("r", lensradius - 3)
      .style("fill", "white")
      .style("stroke", "black")
      .style("fill", "#f09077")
      .style("opacity", 0.4)
      .on("click", this.startpicturetaking);

    camera.append("circle")
      .attr("cx", originX - lensradius - 10)
      .attr("cy", originY - lensradius + 15)
      .attr("r", 5)
      .style("fill", "white")
      .style("stroke", "black")
      .on("click", this.startpicturetaking);



    this.message(clicker, radius, cX, cY);

   
    //setInterval(this.auto, 10000);

  },

  showmessagescreen: function() {
    console.log("in message clicked!!!!");
    ImageActionCreators.messageClicked();
  },

  message: function(node, radius, cx, cy) {

    var arc = d3.svg.arc().innerRadius(radius + 7).outerRadius(radius + 50).startAngle(Math.PI / 2).endAngle(-Math.PI / 2);

    var path = node.append("path")
      .attr("d", arc)
      .attr("id", "path1")
      .attr("transform", "translate(" + cx + "," + cy + ")")
      .attr("fill", "#fff")
      .attr("opacity", 0.8)
      .on("click", this.showmessagescreen);

    var text = node.append("text")
      .attr("class", "message")
      .attr("x", 10)
      .attr("dy", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "30px")
      .on("click", this.showmessagescreen);

    var message = text.append("textPath")
      .attr("class", "textpath")
      .attr("stroke", "black")
      .attr("xlink:href", "#path1")
      .attr("startOffset", "25%")
      .on("click", this.showmessagescreen);

    this.updatemessage("");
  },

  updatemessage: function(m) {
    d3.select(".textpath").text(m.substring(0, 60));
  },

  updatetags: function(tags) {
    _tags = tags;
    console.log("viewfwinfder uodated tags to");
    console.log(_tags);
     this.tags();
  },

  hidemessage: function() {
    d3.select("text.message")
      .transition(1000)
      .attr("opacity", 0);

    d3.select("#path1")
      .attr("opacity", 0);
  },

  showmessage: function() {
    d3.select("text.message")
      .transition(1000)
      .attr("opacity", 1);

    d3.select("#path1")
      .attr("opacity", 0.8);
  },

  hidecamera: function() {
    d3.select("g.camera")
      .transition()
      .duration(2000)
      .attr("opacity", 0);
  },

  showcamera: function() {
    d3.select("g.camera")
      .transition()
      .duration(2000)
      .attr("opacity", 1);
  },

  countdown: function() {
    d3.select("text.countdown").style("opacity", 1.0);
    this.hidecamera();
    this.transition();
  },

  showtags: function() {

    d3.selectAll("circle.tag")
      .transition()
      .duration(1000)
      .attr("r", radius / 4);


    d3.selectAll("text.tag")
      .transition()
      .duration(1000)
      .style("opacity", 1);
  },

  hidetags: function() {

    d3.selectAll("circle.tag")
      .transition()
      .duration(1000)
      .attr("r", 0);

    d3.selectAll("text.tag")
      .transition()
      .duration(1000)
      .style("opacity", 0);

  },

  tags: function() {

    var wedge = 180 / 6 * Math.PI / 180;

    var tagdata = _tags.map(function(tag) {
      return {
        text: tag,
        selected: false
      };
    });

    console.log("IN TAGS AND TAG DTAA IS");
    console.log(tagdata);

    var tagger = d3.select("g.tags");

    var tags = tagger.selectAll("g.tag").data(tagdata, function(d) {
      return d.text;
    });

    var tag = tags.enter()
      .append("g")
      .attr("class", "tag");


    tag.append("circle")
      .attr("class", function(d, i) {
        return "tag tag-" + i;
      })
      .attr("r", 0)
      .attr("cx", function(d, i) {

        var offset = i < 4 ? 135 * Math.PI / 180 : (135 + 180) * Math.PI / 180;
        i = i % 4;
        return cX + (radius * 1.5 * Math.cos(offset + (i * wedge)));

      })
      .attr("cy", function(d, i) {

        var offset = i < 4 ? 135 * Math.PI / 180 : (135 + 180) * Math.PI / 180;
        i = i % 4;
        return cY + (radius * 1.5 * Math.sin(offset + (i * wedge)));
      })
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", "2")
      .on("click", function(d, i) {

        if (!d.selected) {
          d3.select(this).style("fill", "#008080");
          d3.select("text.tag-" + i).style("fill", "white");
          d.selected = true;
        } else {
          d3.select(this).style("fill", "white");
          d3.select("text.tag-" + i).style("fill", "black");
          d.selected = false;
        }
      });

    tag.append("text")
      .attr("class", function(d, i) {
        return "tag tag-" + i;
      })
      .attr("x", function(d, i) {

        var offset = i < 4 ? 135 * Math.PI / 180 : (135 + 180) * Math.PI / 180;
        i = i % 4;
        return cX + (radius * 1.5 * Math.cos(offset + (i * wedge)));

      })
      .attr("y", function(d, i) {

        var offset = i < 4 ? 135 * Math.PI / 180 : (135 + 180) * Math.PI / 180;
        i = i % 4;
        return cY + (radius * 1.5 * Math.sin(offset + (i * wedge)));
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("font-size", (radius / 4 * 0.4) + "px")
      .style("fill", "black")
      .style("opacity", 0)
      .text(function(d) {
        return d.text;
      })
      .on("click", function(d, i) {

        if (!d.selected) {
          d3.select(this).style("fill", "white");
          d3.select("circle.tag-" + i).style("fill", "#008080");
          d.selected = true;
        } else {
          d3.select(this).style("fill", "black");
          d3.select("circle.tag-" + i).style("fill", "white");
          d.selected = false;
        }
      });
  },

  startpicturetaking: function() {
    self.hidetags();
    self.hidemessage();
    ImageActionCreators.countDown();
    self.countdown();
  },

  auto: function() {
    self.startpicturetaking();
  },

  transition: function(callback) {
    d3.select("circle.clicker").transition()
      .duration(5000)
      .ease("linear")
      .attrTween("cx", this.handleXTween)
      .attrTween("cy", this.handleYTween)
      .each("end", function() {

        ImageActionCreators.takePicture();
        this.showtags();
        this.showcamera();
      }.bind(this));

    d3.select("text.countdown").transition()
      .duration(5000)
      .ease("linear")
      .attrTween("x", this.handleXTween)
      .attrTween("y", this.handleYTween)
      .tween("text", function() {
        var i = d3.interpolateRound(5, 1);
        return function(t) {
          this.textContent = i(t);
        };
      })
      .each("end", function() {
        d3.select(this).style("opacity", 0);
      });

  },



  handleXTween: function(d, i, a) {
    var origin = cX;
    var r = radius;
    return function(t) {
      var offset = 0.25;
      return origin + (r * Math.cos(2 * Math.PI * (offset + t)));
    };
  },

  handleYTween: function(d, i, a) {
    var origin = cY;
    var r = radius;
    return function(t) {
      var offset = 0.25;
      return origin + (r * Math.sin(2 * Math.PI * (offset + t)));
    };
  }


};


AppDispatcher.register(function(action) {
  switch (action.action.type) {

    case ActionTypes.CHANGE_SCREEN:
      console.log("nice seen a change screen!!!");
      console.log(action.action.screen);
      if (action.action.screen === "home") {
        console.log("SHOWING MESSAGE!!");
        ViewFinder.showmessage();
      }
      break;

    default:
      //no op
  }
});

module.exports = ViewFinder;