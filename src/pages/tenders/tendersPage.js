var React  = require('react');
var Router = require('react-router');
var grail = require('grail');
var {Route, DefaultRoute, Link} = Router;
var tendersComp = require('./tendersComp')


var tendersStore = grail.BasicStoreFactory('tendersStore', {
    tenders: [],
    init(context){
        context.actions.on('tenders:update', this.update.bind(this));
    },
    update(data){
        this.tenders = data;
        this.emit('change', this.tenders);
        console.log(this.tenders);
    },
    get(){
        return this.tenders;
    }
});

module.exports = (app)=>{
    var tendersAction = app.actions.create('tenders')
        .get('/api/tenders')
        .emit('tenders:update');

    return <Route path="tenders" name="tenders" handler={tendersComp} stores={tendersStore} action={tendersAction}/>;
};
