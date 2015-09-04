var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var MessageActionCreators = require('../actions/MessageActionCreators');
var injectTapEventPlugin = require("react-tap-event-plugin");
var TagStore = require('../stores/TagStore');
var TagActionCreators = require('../actions/TagActionCreators');
var ENTER_KEY_CODE = 13;

injectTapEventPlugin();

function getStateFromStores(){
  return {
     tags: TagStore.tags()
  };
}

var TagScreen = React.createClass({

  getInitialState: function() {
      return getStateFromStores();
  },

  componentDidMount: function() {
    TagStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TagStore.removeChangeListener(this._onChange);
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
      width: '100%'
    };   

    var tagcontainer = {
      padding: 15
    };

    var props = this.state;

    return <div>
        			<div style={greenbar}>
                  <div style={vcenter}><TagCreator /></div>
              </div>
              <div style={tagcontainer}>
                <TagList {...props} />
              </div>
            </div>;
  },

  _onChange: function(event){
      this.setState(getStateFromStores());
  }

});

TagCreator = React.createClass({
  
  getInitialState: function() {
    return {text: ''};
  },

  render: function(){
    return (<form>
              <div className="row">
                <div className="large-12 columns">
                  <div className="row collapse">
                    <div className="small-10 columns">
                      <input type="text"  value={this.state.text} onChange={this._onChange} placeholder="new tag name"/>
                    </div>
                    <div className="small-2 columns">
                      <a onTouchTap={this._addTag} className="button postfix">add tag</a>
                    </div>
                  </div>
                </div>
              </div>
           </form>);
  },

  
  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  _addTag : function(){
     console.log("Adding tag!!");
     var text = this.state.text.trim();
      if (text) {
        TagActionCreators.addTag(text);
      }
      this.setState({text: ''});
  },

});

TagList = React.createClass({
  render: function(){
    var tags = this.props.tags.map(function(tag){
      var props = {tag:tag};
      return <Tag {...props}/>;
    });

    return <ul className="inline-list">
              {tags}
           </ul>;
  }
});

Tag = React.createClass({
  
  render: function(){
    return <li><a onTouchTap={this._removeTag} className="button">{this.props.tag} x</a></li>; 
  },

  _removeTag: function(){
    TagActionCreators.removeTag(this.props.tag);
    console.log("would remove tag!!");
  },
});

module.exports = TagScreen;
