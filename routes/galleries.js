var express = require('express');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');
var Dao = require('../CrStructure.js');
var server = require('../server.js');
var async = require('async');
var needle = require('needle');
var fs = require('fs');
var multipart = require('connect-multiparty');
var cloudinary = require('cloudinary');
var router = express.Router();
var GalleriesDAO = Dao.mongoose.models.gallery;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var cloudinary = require('cloudinary');

/*数据库连接信息host,port,user,pwd*/
var db_name = ''; // 数据库名，从云平台获取
var db_host = 'mongo.duapp.com'; // 数据库地址
var db_port = '8908'; // 数据库端口
var username = ''; // 用户名（API KEY）
var password = ''; // 密码(Secret KEY)
var mongo_url = "";

if (process.env.homeloc == "CN_CTUL") {
	db_host = 'localhost';
	db_name = 'oDataTest';
	db_port = '27017';
	mongo_url = 'mongodb://' + db_host + '/' + db_name;
} else {
	db_name = ''; // 数据库名，从云平台获取
	db_host = 'mongo.duapp.com'; // 数据库地址
	db_port = '8908'; // 数据库端口
	mongo_url = "mongodb://" + username + ":" + password + "@" + db_host + ':' + db_port + '/' + db_name;
}

/*cloudinary 配置，需要设置成自己的key和secret*/
cloudinary.config({
	cloud_name: 'dzpm6vdrp',
	api_key: '326236893721664',
	api_secret: 'Wt8zNEivobv0AJeHvbh5JWiKowo'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('galleries', {
		title: 'galleries'
	});
});

/* GET home page. */
router.get('/addGallery', function(req, res, next) {
	//res.render('gallerySetting', { title: 'gallerySetting' });
	var gallerise = {

	};
	res.render('addGallery', {
		title: '配置画廊',
		data: gallerise
	});
});
/* POST  ModifyGallery  API. */
router.post('/ModifyGallery', function(req, res, next) {
	//res.render('gallerySetting', { title: 'gallerySetting' });
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		
		//beacon.push(req.body);
		//console.log(req.body);
		//console.log(req.body);
		
		// var  ExhibitionEntity = new ExhibitionDAO(exhi);
		GalleriesDAO.update({_id: req.body._id}, 
			{$set:{
				//_id: beacon._id,
				name : req.body.name,
				address  : req.body.address,
				description: req.body.description,
				longitude  : req.body.longitude,
				latitude : req.body.latitude,
				posterURL: req.body.posterURL,
				city: req.body.city,
				
				
			}}, function(err) {
				console.log(err);
				mongoose.connection.close();

				if (err) {
					res.json(506, {
						'error': err
					});
					console.log(err);

				}
				else{
					console.log("-----------------");
    			    console.log('ModifyGallery success');
    			res.json(200, {
    				status: 'success'
    			});
    		}
    	});

	})


});


/* POST  addGallery  API. */
router.post('/addGallery', function(req, res, next) {
	//res.render('gallerySetting', { title: 'gallerySetting' });
		var _id = new ObjectId();
		req.body._id = _id;
	var gallery = req.body;
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		
		GalleriesDAO.create(gallery, function(err, docs) {
	
				console.log(err);
				mongoose.connection.close();

				if (err) {
					res.json(506, {
						'error': err
					});
					console.log(err);

				}
				else{
					console.log("-----------------");
    			    console.log('addGallery success');
    			res.json(200, {
    				status: 'success'
    			});
    		}
    	});

	})


});

/* delete Gallery  API. */
router.delete('/', function(req, res, next) {
	//res.render('gallerySetting', { title: 'gallerySetting' });
		
	var id = req.body.id;
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		
		GalleriesDAO.remove({
			_id: id
		}, function(err, docs) {
			mongoose.connection.close();

			if (err) {
				res.json(203, {
					msg: "delele failed ",
					err: err
				});
			};
			console.log("-----------------");
    			    console.log('delele success');
			res.json(200, {
				
				msg: "delele success "
			});
		});


	})

	

});



/* GET gallerySetting page. */
router.get('/gallerySetting/:id', function(req, res, next) {
	
	var name  = req.params.id;
	mongoose.connect(mongo_url, function(err) {
			if (err) throw err;

var qParam = { name : name};
		//	console.log(qParam);
		//	GalleriesDAO.find(req.params.id, function(err, doc) {
			GalleriesDAO.find(qParam).exec(function(err, doc) {
			 // doc 是单个文档
				mongoose.connection.close(); 				
				// console.log(doc[0]);
				 if (doc.length >= 1) {
				    res.render('addGallery', {
					title: '配置画廊',
					data: doc[0]
				  })
				};
			});

		})
		//
	/*var gallerise = {
		name: "成都美术馆",
		city: "成都",
		address: "成都光华村",
		_id: "3ab2ass13s321adsa213",
		posterURL: "http://smartgallery.duapp.com/images/3000-1.png",
		longitude: "11.11",
		latitude: "44.66"
	}*/


});


module.exports = router;
