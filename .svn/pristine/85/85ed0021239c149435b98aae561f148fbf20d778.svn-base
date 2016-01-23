var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dao = require('../CrStructure.js');
var server = require('../server.js');
var async = require('async');
var needle = require('needle');
var http = require('http');
var https = require('https');
var url = require('url');
var querystring = require('querystring');
var beaconDao = Dao.mongoose.models.beacon;
var ExhibitionDAO = Dao.mongoose.models.exhibition;
var userDAO = Dao.mongoose.models.user;
var notificationDao = Dao.mongoose.models.notification;
var ObjectId = mongoose.Types.ObjectId;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;


/*数据库连接信息host,port,user,pwd*/
var db_name = 'SnTPMJFRIcnMnJujtQId'; // 数据库名，从云平台获取
var db_host = 'mongo.duapp.com'; // 数据库地址
var db_port = '8908'; // 数据库端口
var username = '4ea46a5d26bf4884b7a12de5f362f9cd'; // 用户名（API KEY）
var password = '78e53609d14a4d0e89138a581504a466'; // 密码(Secret KEY)
var mongo_url = "";

if (process.env.homeloc == "CN_CTUL") {
	db_host = 'localhost';
	db_name = 'oDataTest';
	db_port = '27017';
	mongo_url = 'mongodb://' + db_host + '/' + db_name;
} else {
	db_name = 'SnTPMJFRIcnMnJujtQId'; // 数据库名，从云平台获取
	db_host = 'mongo.duapp.com'; // 数据库地址
	db_port = '8908'; // 数据库端口
	mongo_url = "mongodb://" + username + ":" + password + "@" + db_host + ':' + db_port + '/' + db_name;
}

/* GET beacons page. */
router.get('/beacons/:id/:exid', function(req, res, next) {

	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		var artid = req.params.id;
		var exhiID = req.params.exid
			//console.log("exhi = "+exhi);  
			beaconDao.find(function(err, result) {

				mongoose.connection.close();
				console.log(result);
				var artitem = [];
				for (var i = 0; i <= result.length - 1; i++) {
					for(var j = 0; j < result[i].Art.length; j++){
						console.log(result[i].Art[j]);
						if (result[i].Art[j]._id == artid) artitem.push(result[i]);
					}


				//console.log(artitem); 
			};

			//console.log(result); 
			res.render('beacons.jade', {
				title: 'Beacon数据列表',
				list: artitem,
				artID: artid,
				exhiID: exhiID
			});
		});
		});

	/**/


});

/* GET arts page. */
router.get('/arts/:id', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		ExhibitionDAO.find(function(err, exresult) {
			mongoose.connection.close();

			var exhi = req.params.id;
			if (exhi >= exresult.length || exhi < 0 || exhi == null) {
				res.redirect('/exhi');
			}
			//console.log(JSON.parse(exresult[1]));
			//console.log(exresult[exhi]);
			else {
				res.render('arts.jade', {

					Art: exresult[exhi].Art,
					exhi: exresult[exhi]
				});
			}

		})
	})
});

/* GET exhi page. */
router.get('/', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		beaconDao.find()
			// .sort({startDate: -1 })
			.exec(function(err, result) {
				mongoose.connection.close();

				console.log(result);
				res.render('beacons', {
					title: '配置Beacon',
					//Art: result[1].Art,
					beacon: result,
					beaconNum: result.length
				});
			});
		})
});
/* GET beacon info. */
router.get('/info', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		beaconDao.find()
			// .sort({startDate: -1 })
			.exec(function(err, result) {

				mongoose.connection.close();

				//console.log(result);
				
				res.json(result);
			});
		})
});

/* GET exhi page. */
router.get('/:id/arts', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		beaconDao.findById(req.params.id, function(err, doc){
			mongoose.connection.close();
			res.json(doc.Art);
		});
	})
});



/* API： postExhi . */
router.post('/update', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		var beacon = [];

		//beacon.push(req.body);
		//console.log(req.body);
		console.log(req.body);
		console.log(req.body.Art);
		// var  ExhibitionEntity = new ExhibitionDAO(exhi);
		beaconDao.update({_id: req.body._id}, 
			{$set:{
				//_id: beacon._id,
				beaconUUID : req.body.beaconUUID,
				major      : req.body.major,
				minor      : req.body.minor,
				triggerDistance : req.body.triggerDistance,
				triggerDuration: req.body.triggerDuration,
				triggerMessage: req.body.triggerMessage,
				itemNum    : req.body.itemNum,
				Exhi: req.body.Exhi,
				Art: req.body.Art
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
    			console.log('success');
    			res.json(200, {
    				status: 'success'
    			});
    		}
    	});

	})

});


module.exports = router;
