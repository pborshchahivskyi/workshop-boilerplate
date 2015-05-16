'use strict';
var React = require('react/addons');
var grail = require('grail');
var AppComp = React.createClass({
    mixins: [React.addons.LinkedStateMixin, grail.ContextMixin],
    getInitialState (){
        return {
            tenders: this.context.stores.tendersStore.get()
        }
    },
    componentDidMount() {
        console.log(this.context.stores)
        this.context.stores.tendersStore.on('change', this.change);
    },
    change(tenders) {
        console.log('doh', tenders);
        this.tenders = tenders;
    },
    render: function() {
        console.log("rendering tenders");
        return (<div>
            <h1>Tenders</h1>
            {this.state.tenders.map(function(row, i) {
                return <div className="panel panel-default">
                    <div className="panel-heading">{row.name}</div>
                    <div className="panel-body">{row.description}</div>
                </div>
            })}
            </div>
        );
    }
});

module.exports = AppComp;
