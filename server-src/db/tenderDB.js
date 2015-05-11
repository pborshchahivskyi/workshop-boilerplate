var Product = require('./productDB');

var tenders = [
  {
    id:1,
    name: " нужны Рога 300кг",
    description: "",
    tags: [],
    products: [
      {
        pid: 1,
        price: 20
      },
      {
        pid: 3,
        price: 23
      }
    ]
  },
  {
    id:2,
    name: "нужны Копыта 10кг",
    description: "",
    tags: []
  },
  {
    id:3,
    name: "нужен Трикотаж 100кг",
    description: "",
    tags: []
  },
  {
    id:4,
    name: "нужен 100500 Аудит",
    description: "",
    tags: []
  }
];


module.exports = {
  withOpt(opt){
    return {
      save(newProduct, cb){
        Object.assign(newProduct, opt);
        newProduct.id = +tenders[tenders.length - 1].id + 1;
        tenders.push(newProduct);
        cb(null, newProduct);
      },
      getAll(cb){
        return cb(null, tenders.reduce(allWhere(opt), []));
      },
      getById(id, cb) {
        var query = {id:id};
        Object.assign(query, opt);
        return cb(null,
          tenders.reduce(
            where(query), null));
      },
      addProduct(id, product, cb){
        var query = {id:id};
        var i = tenders.reduce(
          iwhere(query), null);
          if(!tenders[i].products) tenders[i].products = [];
        var foundProduct = tenders[i].products.reduce(
          iwhere({pid: product.id}), null);
        if(!foundProduct){
          tenders[i].products.push({
            pid: product.id,
            price: product.price
          })
          return cb(null, tenders[i]);
        }
        return cb("Already exists");
      },
      getProducts(id, cb){
        var query = {id:id};
        var tender = tenders.reduce(
          where(query), null);
          if(!tender.products) tender.products = [];
          var idsArr = tender.products.map(item=>item.pid);
          Product.withOpt({}).getByIds(idsArr, (err, prods)=>{
            tender.products = tender.products.map((pr,i)=>{
              Object.assign(pr, prods[i]);
              return pr;
            })
            cb(null, tender.products);
          })
      },
      removeProduct(id,cb){
        var query = {id:id};
        var i = tenders.reduce(
          iwhere(query), null);
        tenders[i].products = tenders[i].products.reduce(
          function(res, prod){
            if(prod.id !== +id) res.push(prod);
            return res;
          }, []);
        cb(null);
      },
      updateById(id, newProduct, cb){
        var query = {id:id};
        Object.assign(query, opt);
        var i = tenders.reduce(
          iwhere(query), null);

        Object.keys(newProduct).forEach((key) => {
          tenders[i][key] = newProduct[key]
        });

        cb(null, tenders[i]);
      },
      deleteById(id, cb){
        var query = {id:id};
        Object.assign(query, opt);
        //TODO: fixit
        tenders = tenders.reduce((result, business)=>{
          if(business.id !== +id) result.push(business);
          return result;
        }, []);
        cb();
      }
    }
  }
}

function iwhere(opts){
  return (res, item, i) =>{
    if(res) return res;
    var found = Object.keys(opts).reduce((bool, key) =>{
      if(!bool || item[key] != opts[key]) return false;
      return true;
    }, true);

    if(found) return i;
    return res;
  }
}


function allWhere(opts){
  return (res, item, i)=>{
    var found = Object.keys(opts).reduce((bool, key) =>{
      if(!bool || item[key] != opts[key]) return false;
      return true;
    }, true);
    if(found) res.push(item);
    return res;
  }
}

function where(opts){
  return (res, item, i) =>{
    if(res) return res;
    var found = Object.keys(opts).reduce((bool, key) =>{
      if(!bool || item[key] != opts[key]) return false;
      return true;
    }, true);

    if(found) return item;
    return res;
  }
}
