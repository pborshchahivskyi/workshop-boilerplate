/*
Тендер
название тендера
описание
теги

REST:
POST /api/tenders
GET /api/tenders
GET /api/tenders/:id
PUT /api/tenders/:id
DELETE /api/tenders/:id

POST /api/tenders/:id/products
GET /api/tenders/:id/products
DELETE /api/tenders/:id/products/:id

создание тендера генерирует сообщение в бокс бизнесов у которых соотв теги
*/

var Tender = require('../db/tenderDB');

module.exports = function(app){
	app.post('/api/tenders', saveTender);
  app.get('/api/tenders', gettenders);
  app.get('/api/tenders/:id', getTender);
  app.put('/api/tenders/:id', updateTender);
  app.del('/api/tenders/:id', deleteTender);
	app.post('/api/tenders/:id/products', participateTender);
	app.get('/api/tenders/:id/products', getParticipants);
	app.del('/api/tenders/:id/products/:pid', removeParticipant);
}

function participateTender(req,res,next){
	var opt = req.user.id == 1?{}:{bid: req.user.business.id};
	Tender.withOpt({}).addProduct(req.params.id, req.body, (err, result)=>{
		if(err) return next(err);
		res.json(result);
	})
}

function getParticipants(req,res,next){
	var opt = req.user.id == 1?{}:{bid: req.user.business.id};
	Tender.withOpt({}).getProducts(req.params.id,  (err, result)=>{
		if(err) return next(err);
		res.json(result);
	})

}

function removeParticipant(req,res,next){
	var opt = req.user.id == 1?{}:{bid: req.user.business.id};
	Tender.withOpt({}).removeProduct(req.params.id,  (err, result)=>{
		if(err) return next(err);
		res.json(result);
	})

}

function saveTender(req,res,next){
	if(req.user.id !== 1) return next('Not Authorized');
	var opt = req.user.id == 1?{}:{bid: req.user.business.id};
	Tender.withOpt(opt).save(req.body, (err, result)=>{
    if(err) return next(err);
    res.json(result);
  })
}

function gettenders(req,res,next){
	var opt = {};
  Tender.withOpt(opt).getAll((err, result)=>{
    if(err) return next(err);
    res.json(result);
  })
}


function getTender(req,res,next){
	var opt = {};
  Tender.withOpt(opt).getById(req.params.id, (err, result)=>{
    if(err) return next(err);
    res.json(result);
  })
}

function updateTender(req,res,next){
	if(req.user.id !== 1) return next('Not Authorized');
	var opt = {};
  Tender.withOpt(opt).updateById(req.params.id, req.body, (err, result)=>{
    if(err) return next(err);
    res.json(result);
  })
}

function deleteTender(req,res,next){
	if(req.user.id !== 1) return next('Not Authorized');
	var opt = {};
  Tender.withOpt(opt).deleteById(req.params.id, (err, result)=>{
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
