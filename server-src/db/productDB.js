var products = [
  {
    id:1,
    name: "Рога",
    description: "",
    tags: [],
    bid:1
  },
  {
    id:2,
    name: "Копыта",
    description: "",
    tags: [],
    bid:1
  },
  {
    id:3,
    name: "Трикотаж",
    description: "",
    tags: [],
    bid:2
  },
  {
    id:4,
    name: "Аудит",
    description: "",
    tags: [],
    bid:3
  }
];


module.exports = {
  withOpt(opt){
    return {
      save(newProduct, cb){
        Object.assign(newProduct, opt);
        newProduct.id = +products[products.length - 1].id + 1;
        products.push(newProduct);
        cb(null, newProduct);
      },
      getAll(cb){
        return cb(null, products.reduce(allWhere(opt), []));
      },
      getByIds(idArr, cb) {
        cb(null, idArr.map(i=>{
          return products.reduce(
            where({id:i}), null)
        }))
      },
      getById(id, cb) {
        var query = {id:id};
        Object.assign(query, opt);
        return cb(null,
          products.reduce(
            where(query), null));
      },
      updateById(id, newProduct, cb){
        var query = {id:id};
        Object.assign(query, opt);
        var i = products.reduce(
          iwhere(query), null);

        Object.keys(newProduct).forEach((key) => {
          products[i][key] = newProduct[key]
        });

        cb(null, products[i]);
      },
      deleteById(id, cb){
        var query = {id:id};
        Object.assign(query, opt);
        //TODO: fixit
        products = products.reduce((result, business)=>{
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
