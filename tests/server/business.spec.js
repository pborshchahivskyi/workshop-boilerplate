//before(()=>{require('../../rest').start();})
//after((done)=>{require('../../rest').end(done);})
var util =require('./util');
var expect = require('chai').expect;

var changed = {
  name: 'MockName'
}

describe('business', ()=>{
  var request;
  before((done) => {
    util.getSession().then((req)=>{
      request = req;
      done();
    });
  })
  describe('get /api/business should return businesses', ()=>{
    var businesses;
    before((done)=>{
      request.get('http://localhost:3000/api/business', (err, resp, body)=>{
        businesses=body;
        done();
      })
    });
    it('should be an array', ()=>{
      expect(JSON.parse(businesses).length).above(1);
    })
  })
  describe('get /api/business/:id should return businesses', ()=>{
    var businesses;
    before((done)=>{
      request.get('http://localhost:3000/api/business/1', (err, resp, body)=>{
        businesses=body;
        done();
      })
    });
    it('should return business with id=1', ()=>{
      expect(JSON.parse(businesses)).to.have.property('id',1);
    })
    describe('can be changed',()=>{
      var changedBusiness;
      before((done)=>{
        request.put('http://localhost:3000/api/business/1', {body:changed, json:true}, (err, resp, body)=>{
          changedBusiness=body;
          done();
        })
      })
      it('should change name', ()=>{
        expect(changedBusiness).to.have.property('name', changed.name);
      })
    })
  })


});
