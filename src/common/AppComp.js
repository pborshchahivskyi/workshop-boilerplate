'use strict';
var React = require('react');
var {RouteHandler, Navigation, Link} = require('react-router');
var React = require('react/addons');
var grail = require('grail');
// Handle the HTML rendering on the server
var AppComp = React.createClass({
  mixins: [React.addons.LinkedStateMixin, grail.ContextMixin],
  getInitialState (){
    return {
      me: this.context.stores.MeStore.get(),
    }
  },
  componentDidMount() {
    this.context.stores.MeStore.on('change', this.change);
  },
  change(me){
    //set state only if mounted
    if(!this.isMounted()) return;
    this.setState({me: me});
  },
  render: function() {
    console.log("rendering app");
    var ProfileLink;
    if(this.state.me.id){
      ProfileLink = <Link to="home">{this.state.me.username}</Link>;
    } else {
      ProfileLink = <Link to="login">Login</Link>
    }
    return (<div className="container">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="home">TenderGov</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>{ProfileLink}</li>
          </ul>
        </div>
      </nav>
      <RouteHandler/>
    </div>);
  }
});

module.exports = AppComp;
