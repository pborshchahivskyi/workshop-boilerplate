var grail = require('grail');
var React = require('react/addons');
var Router = require('react-router');
var {Route, DefaultRoute, Link} = Router;
var RouteHandler = Router.RouteHandler;


var app = grail.createApp({Layout: require("./common/html")});

//require('./config')(app);
//var actions = require('./actions');
//actions(app.actions)//add actions

//var app = grail.createApp();
//The routes
// home
// - active
// - completed
/*var routes = <Route path="/" name="home" handler={AppComp} stores={ItemsStore} ignoreScrollBehavior>
    <Route name="active" path="active" handler = {ItemsComp} action={actions.getActive} />
    <Route name="completed" path="completed" handler = {ItemsComp} action={actions.getCompleted}/>
    <DefaultRoute handler = {ItemsComp} action={actions.getItems} />
  </Route>*/
var LoginComp = require('./common/LoginComp')

  var routes =<Route path="/" name="home" handler={LoginComp} ignoreScrollBehavior>
    </Route>

app.useRoutes(routes);

module.exports = app.init();
