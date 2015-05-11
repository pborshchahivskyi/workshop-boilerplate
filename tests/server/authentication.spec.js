before(()=>{require('../../rest').start();})
after((done)=>{require('../../rest').end(done);})


var request = require('request').defaults({jar: true});
var expect = require('chai').expect;

var user = {
  username: 'govment',
  password: '123123'
  }

describe('authentication', function(){
  describe('if not logged in', function(){
    var code;
    before(function(done){
      request.get('http://localhost:3000/api/user', function(err, resp, body){
        code = resp.statusCode;
        done()
      })
    });
    it('should be forbidden', function(){
      expect(code).to.equal(403);
    });
  })

  describe('if logged in', function(){
    var code;
    before(function(done){
      request.post('http://localhost:3000/api/login', {body:user, json:true}, function(err, resp, body){
        request.get('http://localhost:3000/api/user', function(err, resp, body){
          code = resp.statusCode;
          done()
        })
      });
    });
    it('should be passed', function(){
      expect(code).to.equal(200);
    });
  })
})
