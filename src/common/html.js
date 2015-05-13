'use strict';
var React = require('react');

// Handle the HTML rendering on the server
var Html = React.createClass({
render: function() {
  return (<html>
        <head>
          <title></title>
          <link rel="icon" type="image/png" href="/images/favicon.png" />
        </head>
        <body>
          <div dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script src="/js/main.js"></script>
      </html>);
}
});

module.exports = Html;
