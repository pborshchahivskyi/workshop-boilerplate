


module.exports = {
  getSession(){
    return new Promise((resolve, reject)=>{
      var request = require('request').defaults({jar: true});
      var user = {
        username: 'company',
        password: '123123'
      }
      request.post('http://localhost:3000/api/login', {body:user, json:true}, function(err, resp, body){
        resolve(request);
      })
    })
  },
  getGovSession(){
    return new Promise((resolve, reject)=>{
      var request = require('request').defaults({jar: true});
      var user = {
        username: 'govment',
        password: '123123'
      }
      request.post('http://localhost:3000/api/login', {body:user, json:true}, function(err, resp, body){
        resolve(request);
      })
    })
  }
}
