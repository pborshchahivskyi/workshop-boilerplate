var grail = require('grail');
var React = require('react/addons');
var Router = require('react-router');
var {Route, DefaultRoute, Link} = Router;
var RouteHandler = Router.RouteHandler;


var app = grail.createApp({Layout: require("./common/html"), router:Router});
require('./common/main.scss');
require('./config')(app);

var AppComp = require('./common/AppComp'),
    HomeComp = require('./common/HomeComp'),
    MeStore = require('./common/MeStore');




  var routes = (<Route path="/" name="home" handler={AppComp}
                    stores={MeStore} ignoreScrollBehavior>
      <DefaultRoute handler={HomeComp}/>
      {require('./pages/LoginPage')(app)}
    </Route>)

app.useRoutes(routes);

module.exports = app.init();
