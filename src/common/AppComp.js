'use strict';
var React = require('react');
var {RouteHandler, Navigation, Link} = require('react-router')
// Handle the HTML rendering on the server
var AppComp = React.createClass({
  render: function() {
    return (<div className="container">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="home">TenderGov</Link>
          </div>
        </div>
      </nav>
      <RouteHandler/>
    </div>);
  }
});

module.exports = AppComp;
