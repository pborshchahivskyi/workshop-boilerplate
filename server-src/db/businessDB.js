/*
Бизнес
название компании
описание
теги

REST:
POST /api/business
GET /api/business
GET /api/business/:id
PUT /api/business/:id
DELETE /api/business/:id
*/
var businesses = [
  {
    uid:2,
    id:1,
    name: "Рога и Копыта",
    description: "",
    tags: []
  },
  {
    uid:3,
    id:2,
    name: "ТД ПродуктТрикотаж",
    description: "",
    tags: []
  },
  {
    uid:4,
    id:3,
    name: "ЭкспоАудитСтандарт",
    description: "",
    tags: []
  }
];


module.exports = {
  getAll(cb){
    return cb(null, businesses);
  },
  getById(id, cb) {
    return cb(null,
      businesses.reduce(
        where({id:id}), null))
  },
  updateById(id, newBusiness, cb){
    var i = businesses.reduce(
      iwhere({id:id}), null);

    Object.keys(newBusiness).forEach((key) => {
      businesses[i][key] = newBusiness[key]
    });

    cb(null, businesses[i]);
  },
  deleteById(id, cb){
    businesses = businesses.reduce((result, business)=>{
      if(business.id !== id) result.push(business);
      result;
    }, []);
    cb();
  },
  getWhere(opt, cb){
    return cb(null,
      businesses.reduce(
        where(opt), null));
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
