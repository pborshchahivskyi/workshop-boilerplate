var Business = require('./businessDB');
var users = [
    { id: 1, username: 'govment', password: '123123', email: 'bob@example.com' }
  , { id: 2, username: 'company', password: '123123', email: 'joe@example.com' }
  , { id: 3, username: 'company1', password: '123123', email: 'joe1@example.com' }
  , { id: 4, username: 'company2', password: '123123', email: 'joe2@example.com' }
  , { id: 5, username: 'company3', password: '123123', email: 'joe3@example.com' }
];

module.exports = {
  findById:function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
      Business.getWhere({uid:users[idx].id}, (err, business)=>{
        users[idx].business = business;
        fn(null, users[idx]);
      })

    } else {
      fn(new Error('User ' + id + ' does not exist'));
    }
  },
  findByUsername:function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      if (user.username === username) {
        return fn(null, user);
      }
    }
    return fn(null, null);
  }

}
