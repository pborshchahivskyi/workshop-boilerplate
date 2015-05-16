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

var prperCreds = {
    username: "govment",
    password: "123123"
};

// test

describe('check tenders exists', function(){
    var MeStore = app.context.stores.MeStore;
    var tendersStore = app.context.stores.tendersStore;
    var user, tenders;
    before(function(done) {
        app.context.app = {
            transitionTo: sinon.spy()
        }
        doAction('signup', prperCreds).then(function () {
            user = MeStore.get();
            doAction('tenders').then(function () {
                tenders = tendersStore.get();
                done();
            })
        })
    })

    it('there should be four tenders', function(){
         expect(tenders.length).to.equal(4);
    })
})
