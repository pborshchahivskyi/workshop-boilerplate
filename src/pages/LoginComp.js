'use strict';
var React = require('react/addons');
var grail = require('grail');
// Handle the HTML rendering on the server
var LoginComp = React.createClass({
  mixins: [React.addons.LinkedStateMixin, grail.ContextMixin],
  getInitialState (){
    return {
      errors: this.context.stores.LoginErrorsStore.get(),
      username:'',
      password:''}
  },
  componentDidMount() {
    this.context.stores.LoginErrorsStore.on('change', this.change);
  },
  change(items){
    //set state only if mounted
    if(!this.isMounted()) return;
    this.setState({errors: items});
  },
  login(e){
    this.context.doAction('signup', {
      username: this.state.username,
      password: this.state.password,
    });
    e.stopPropagation();
    e.preventDefault()
  },
  render(){
    
    var errors;
    if(this.state.errors) {
      errors = <div className="alert alert-danger" role="alert">{this.state.errors}</div>;
    }
    return (<div>
        <form className="form-signin" onSubmit={this.login}>
        <h2 className="form-signin-heading">Please sign in</h2>
        {errors}
        <label htmlFor="inputUsername" className="sr-only">Email address</label>
        <input type="username" id="inputUsername" valueLink={this.linkState('username')} className="form-control" placeholder="Username" required="" autofocus=""/>
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" valueLink={this.linkState('password')} className="form-control" placeholder="Password" required=""/>
        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.submit}>Sign in</button>
      </form>
    </div>);
  }
});

module.exports = LoginComp;
