/*
Продукт/сервис
название
описание
теги

{
	name:
	description:
	id:
	bid:
	tags: [id,id,id]
}

REST:
POST /api/products
GET /api/products
GET /api/products/:id
PUT /api/products/:id
DELETE /api/products/:id

options:
bid:
tags:

Business will have access only for it’s products
*/

var Product = require('../db/ProductDB');

module.exports = function(app){
	app.post('/api/products', saveProduct);
  app.get('/api/products', getProducts);
  app.get('/api/products/:id', getProduct);
  app.put('/api/products/:id', updateProduct);
  app.del('/api/products/:id', deleteProduct);
}

function saveProduct(req,res,next){
	var opt = req.user.id == 1?{}:{bid: req.user.business.id};
	Product.withOpt(opt).save(req.body, (err, result)=>{
    if(err) return next(err);
    res.json(result);
  })
}

function getProducts(req,res,next){
	var opt = req.user.id == 1?{}:{bid: req.user.business.id};
  Product.withOpt(opt).getAll((err, result)=>{
    if(err) return next(err);
    res.json(result);
  })
}


function getProduct(req,res,next){
	var opt = {};
  Product.withOpt(opt).getById(req.params.id, (err, result)=>{
    if(err) return next(err);
    res.json(result);
  })
}

function updateProduct(req,res,next){
	var opt = req.user.id == 1?{}:{bid: req.user.business.id};
  Product.withOpt(opt).updateById(req.params.id, req.body, (err, result)=>{
    if(err) return next(err);
    res.json(result);
  })
}

function deleteProduct(req,res,next){
	var opt = req.user.id == 1?{}:{bid: req.user.business.id};
  Product.withOpt(opt).deleteById(req.params.id, (err, result)=>{
    if(err) return next(err);
    res.json({message: "OK"});
  })
}


function middlewerize(cb){
  return function(req, res, next){
    cb(function(err, result){
      if(err) return next(err);
      res.json(result);
    })
  }
}
