process.env.HOSTNAME = "http://localhost:3000";
require.extensions['.scss'] = function(){
  return null;
}
var mockery = require('mockery');
mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
});

// inject agent to mimic browser session
var request = require('superagent').agent();
var Resource = require('../../src/Resource')(request);

mockery.registerMock('./Resource', function(){
  return Resource;
});

var expect = require('chai').expect;
var clientApp = require('../../src/main');
var app = clientApp.app;

var sinon = require('sinon');

app.context.params ={};
var doAction = app.appActions.withContext(app.context).doAction;

var wrongCreds = {
  username: "wrong",
  password: "wrong"
};

var prperCreds = {
  username: "govment",
  password: "123123"
};

describe('user tries to login', function(){
  describe('with wrong credentials', function(){
    var LoginErrorsStore = app.context.stores.LoginErrorsStore;
    var error;
    before(function(done){
      doAction('signup',wrongCreds).then(function(){
        error = LoginErrorsStore.get();
        done();
      });
    })
    it('the error store shoul be filled with proper error', function(){
      expect(error).to.equal('Unknown user wrong');
    })
  })
  describe('with proper credentials', function(){
    var MeStore = app.context.stores.MeStore;
    var user;
    before(function(done){
      app.context.app = {
        transitionTo: sinon.spy()
      }
      doAction('signup',prperCreds).then(function(){
        user = MeStore.get();
        done();
      });
    })
    it('MeStore should be filled properly', function(){
      expect(user).to.have.property('id',1);
      expect(user).to.have.property('email','bob@example.com');
      expect(user).to.have.property('username','govment');

    })
    it('the app should be transitioned to home', function(){
      expect(app.context.app.transitionTo.calledOnce).to.be.ok;
      expect(app.context.app.transitionTo.getCall(0).args[0]).to.equal('home');
    })
  })
})
