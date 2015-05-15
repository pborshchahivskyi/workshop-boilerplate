var grail = require('grail');
module.exports = grail.BasicStoreFactory('MeStore', {
  data: {
    type: 'guest',
    id: null
  },
  init(context){
    context.actions.on('me:update', this.update.bind(this));
  },
  update(data){
    this.data = data;
    this.emit('change', this.data);
  },
  get(){
    return this.data;
  }
});
