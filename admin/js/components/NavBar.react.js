var React = require('react');


function getStateFromStores(){
  return {
      navItems: []
      //images: ImageStore.getAll()
  }
}

var NavBar = React.createClass({

  getInitialState: function(){
		return getStateFromStores();
	},

  componentDidMount: function() {
    //ImageStore.addChangeListener(this._onChange);
    //WebAPIUtils.getImages();
  },

  componentWillUnmount: function() {
    //ImageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    	return <div style={{
                            position:'absolute', 
                            bottom: 0,
                            width: "100%",
                            height:this.props.height, 
                            background:"#000"}}>
                          
              </div>
  },

  _onChange: function(event){
  		this.setState(getStateFromStores());
  }

});

module.exports = NavBar;
