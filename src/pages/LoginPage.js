var React  = require('react');
var LoginComp = require('./LoginComp');
var Router = require('react-router');
var grail = require('grail');
var {Route, DefaultRoute, Link} = Router;
require('./login.scss');

var LoginErrorsStore = grail.BasicStoreFactory('LoginErrorsStore', {
  message: null,
  init(context){
    context.actions.on('signup:fail', this.signupFail.bind(this));
    context.actions.on('errors:clean', this.clean.bind(this));
  },
  signupFail(data){
    this.message = data.message;
    this.emit('change', this.message);
    console.log(this.message);
  },
  clean(){
    this.message = null;
    this.emit('change', this.message);
  },
  get(){
    return this.message;
  }
});


module.exports = (app)=>{
  app.actions.create('signup')
  .emit('errors:clean')
  .post('/api/login')
  .emit('me:update')
  .redirect('home')
  .catchEmit('signup:fail');

  return <Route path="login" name="login" handler={LoginComp} stores={LoginErrorsStore}/>;
}
