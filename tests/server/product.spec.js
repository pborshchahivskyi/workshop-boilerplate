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

describe('products', ()=>{
  var request;
  before((done) => {
    util.getSession().then((req)=>{
      request = req;
      done();
    });
  })
  describe('get /api/products should return productses', ()=>{
    var products;
    before((done)=>{
      request.get('http://localhost:3000/api/products',{json:true}, (err, resp, body)=>{
        products=body;
        done();
      })
    });
    it('should be an array', ()=>{
      expect(products.length).above(1);
    })
    describe('post /api/products shuld add new product', ()=>{
      var newProduct, newProducts;
      before((done)=>{
        request.post('http://localhost:3000/api/products', {body:newProdMock, json:true}, (err, resp, body)=>{
          newProduct=body;
          request.get('http://localhost:3000/api/products',{json:true}, (err, resp, body)=>{
            newProducts=body;
            done();
          })
        })
      })
      it('shuld add id/bid for product',()=>{
        expect(newProduct).to.have.property('id');
        expect(newProduct).to.have.property('bid');
      })
      it('shuld add item to prod list',()=>{
        expect(newProducts.length).to.equal(products.length + 1);
      })
      describe('and del /api/products/:id', ()=>{
        var deleting, cleanupProducts;
        before((done)=>{
          request.del('http://localhost:3000/api/products/' + newProduct.id,{json:true}, (err, resp, body)=>{
            deleting=body;
            request.get('http://localhost:3000/api/products',{json:true}, (err, resp, body)=>{
              cleanupProducts=body;
              done();
            })
          })
        })
        it('should run succesfully', ()=>{
          expect(deleting).to.have.property('message','OK')
        })
        it('should remove element from products', ()=>{
          expect(cleanupProducts).to.eql(products)
        })
      })
    })
  })
  describe('get /api/products/:id should return productses', ()=>{
    var productses;
    before((done)=>{
      request.get('http://localhost:3000/api/products/1', (err, resp, body)=>{
        productses=body;
        done();
      })
    });
    it('should return products with id=1', ()=>{
      expect(JSON.parse(productses)).to.have.property('id',1);
    })
    describe('can be changed',()=>{
      var changedproducts;
      before((done)=>{
        request.put('http://localhost:3000/api/products/1', {body:changed, json:true}, (err, resp, body)=>{
          changedproducts=body;
          done();
        })
      })
      it('should change name', ()=>{
        expect(changedproducts).to.have.property('name', changed.name);
      })
    })
  })


});
