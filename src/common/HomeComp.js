'use strict';
var React = require('react');
var {RouteHandler, Navigation} = require('react-router')
// Handle the HTML rendering on the server
var AppComp = React.createClass({
  render: function() {
    return (<h1>HOME</h1>);
  }
});

module.exports = AppComp;
