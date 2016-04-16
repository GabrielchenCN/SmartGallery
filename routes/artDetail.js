var express = require('express');
var router = express.Router();
var async = require('async');
var needle = require('needle');
var Dao = require('../CrStructure.js');
var mongoose = require('mongoose');

var artDAO = Dao.mongoose.models.art;

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

/* GET home page. */
router.get('/', function (req, res, next) {
	if (!req.query["id"]) { return; }
	/*
	var fvalue = req.query["id"];
	var surl = 'http://smartgallery.duapp.com/odata/arts?$filter=_id%20eq%20%27' + fvalue + '%27';

	
    console.log(surl);
    needle.get(surl, function (err, resp) {

		console.log(resp);
		console.log(resp.body.value[0]);

		if (!err && resp.statusCode == 200) {
			var paint = resp.body.value[0];
			res.render('paint', { paint: paint });
		}

	});
	
 */

	mongoose.connect(mongo_url, function (err) {
		if (err) throw err;
		//console.log(req.query.id);
		artDAO.find({ _id: req.query.id }, function (err, doc) {
			// doc 是单个文档
			mongoose.connection.close();
			// console.log(doc);
			if (doc.length >= 1) {
				res.render('paint', {
					paint: doc[0]
				});
			}
		});
	})


});




module.exports = router;
