//before(()=>{require('../../rest').start();})
//after((done)=>{require('../../rest').end(done);})
var util =require('./util');
var expect = require('chai').expect;

var changed = {
  name: 'MockName'
}
var newProdMock = {
  name: "ProdMock",
  description: "",
  tags: [],
}

describe('tenders', ()=>{
  var request;
  before((done) => {
    util.getGovSession().then((req)=>{
      request = req;
      done();
    });
  })
  describe('get /api/tenders should return tenderses', ()=>{
    var tenders;
    before((done)=>{
      request.get('http://localhost:3000/api/tenders',{json:true}, (err, resp, body)=>{
        tenders=body;
        done();
      })
    });
    it('should be an array', ()=>{
      expect(tenders.length).above(1);
    })
    describe('post /api/tenders shuld add new tender', ()=>{
      var newProduct, newtenders;
      before((done)=>{
        request.post('http://localhost:3000/api/tenders', {body:newProdMock, json:true}, (err, resp, body)=>{
          newProduct=body;
          request.get('http://localhost:3000/api/tenders',{json:true}, (err, resp, body)=>{
            newtenders=body;
            done();
          })
        })
      })
      it('shuld add id for product',()=>{
        expect(newProduct).to.have.property('id');
      })
      it('shuld add item to prod list',()=>{
        expect(newtenders.length).to.equal(tenders.length + 1);
      })
      describe('and del /api/tenders/:id', ()=>{
        var deleting, cleanuptenders;
        before((done)=>{
          request.del('http://localhost:3000/api/tenders/' + newProduct.id,{json:true}, (err, resp, body)=>{
            deleting=body;
            request.get('http://localhost:3000/api/tenders',{json:true}, (err, resp, body)=>{
              cleanuptenders=body;
              done();
            })
          })
        })
        it('should run succesfully', ()=>{
          expect(deleting).to.have.property('message','OK')
        })
        it('should remove element from tenders', ()=>{
          expect(cleanuptenders).to.eql(tenders)
        })
      })
    })
  })
  describe('get /api/tenders/:id should return tenderses', ()=>{
    var tenderses;
    before((done)=>{
      request.get('http://localhost:3000/api/tenders/1', (err, resp, body)=>{
        tenderses=body;
        done();
      })
    });
    it('should return tenders with id=1', ()=>{
      expect(JSON.parse(tenderses)).to.have.property('id',1);
    })
    describe('can be changed',()=>{
      var changedtenders;
      before((done)=>{
        request.put('http://localhost:3000/api/tenders/1', {body:changed, json:true}, (err, resp, body)=>{
          changedtenders=body;
          done();
        })
      })
      it('should change name', ()=>{
        expect(changedtenders).to.have.property('name', changed.name);
      })
    })
  })
  describe('the business can participate in created tender', ()=>{
    var newTender, products, tenderResult;
    before((done)=>{
      util.getGovSession().then((bsinessReq)=>{
        request.post('http://localhost:3000/api/tenders', {body:newProdMock, json:true}, (err, resp, body)=>{
          newTender=body;
          bsinessReq.get('http://localhost:3000/api/products',{json:true}, (err, resp, body)=>{
            products=body;
            var product = products[1];
            product.price = 100;
            bsinessReq.post('http://localhost:3000/api/tenders/'+newTender.id+'/products', {body:products[1], json:true}, (err, resp, body)=>{
              tenderResult = body;
              done();
            })
          })
        });
      });
    })
    it('the product will be added to tender with correspondent price',()=>{
      expect(tenderResult.products[0]).to.have.property("pid",products[1].id);
      expect(tenderResult.products[0]).to.have.property("price",100);
    })
    describe('you can get products with GET /api/tenders/:id/products', ()=>{
      var getProductsResult;
      before((done)=>{
        request.get('http://localhost:3000/api/tenders/'+newTender.id+'/products', {json:true}, (err, resp, body)=>{
          getProductsResult = body;
          done();
        })
      })
      it('will return full denormalized products list',()=>{
        expect(getProductsResult[0]).to.have.property("id",products[1].id);
        expect(getProductsResult[0]).to.have.property("price",100);
        expect(getProductsResult[0]).to.have.property("name");
        expect(getProductsResult[0]).to.have.property("bid");
      })
    })
  })
});
