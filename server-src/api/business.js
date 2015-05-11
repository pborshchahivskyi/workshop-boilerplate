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

var Business = require('../db/businessDB');

module.exports = function(app){
  app.get('/api/business', middlewerize(Business.getAll));
  app.get('/api/business/:id', getBusiness);
  app.put('/api/business/:id', updateBusiness);
//  app.del('/api/business/:id', deleteBusiness);
}

function getBusiness(req,res,next){
  Business.getById(req.params.id, (err, result)=>{
    if(err) return next(err);
    res.json(result);
  })
}

function updateBusiness(req,res,next){
  Business.updateById(req.params.id, req.body, (err, result)=>{
    if(err) return next(err);
    res.json(result);
  })
}
/*
function deleteBusiness(req,res,next){
  Business.getById(req.params.id, (err, result)=>{
    if(err) return next(err);
    res.json({message: "OK"});
  })
}*/


function middlewerize(cb){
  return function(req, res, next){
    cb(function(err, result){
      if(err) return next(err);
      res.json(result);
    })
  }
}
