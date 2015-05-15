'use strict';
var React = require('react');
var {RouteHandler, Navigation, Link} = require('react-router')
// Handle the HTML rendering on the server
var AppComp = React.createClass({
  render: function() {
    console.log("rendering home");
    return (<h1>HOME</h1>);
  }
});

module.exports = AppComp;
