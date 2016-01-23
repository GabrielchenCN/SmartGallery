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

var artDAO = Dao.mongoose.models.art;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var cloudinary = require('cloudinary');

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

/*cloudinary 配置，需要设置成自己的key和secret*/
cloudinary.config({
	cloud_name: 'dzpm6vdrp',
	api_key: '326236893721664',
	api_secret: 'Wt8zNEivobv0AJeHvbh5JWiKowo'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	//res.send('redirect...');
	res.redirect('/art/addArt');
});


/* GET addExhi page. */
router.get('/addArt', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		artDAO.find(function(err, exresult) {
			mongoose.connection.close();

			//console.log(exresult);
			res.render('addArt', {
				title: '新增画作'
			});
		});
	})
});


/* API： post Art . */
router.post('/addArt', function(req, res, next) {
	console.log(req.body);
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		var art = [];

		//生成ID
		var _id = new ObjectId();
		req.body._id = _id;
		art.push(req.body);
		artDAO.create(art, function(err, docs) {
			mongoose.connection.close();


			if (err) {
				console.log(err);
				res.json(506, {
					'error': err
				});

			};
			console.log("-----------------");
			console.log(docs);
			res.json(200, {
				'art': docs
			});
		});
	})
});


router.post('/uploadPic/:val', multipart(), function(req, res, next) {
	var method = req.params.val;
	if (method == "1") {
		//上传到服务器
		//get filename
		console.log(req.files);
		//posterURL 
		var filename = req.files.posterURL.originalFilename || path.basename(req.files.posterURL.ws.path);

		//copy file to a public directory
		var targetPath = path.dirname(__dirname) + "/public/images/art/" + filename;
		fs.exists(targetPath, function(exists) {

			if (exists) {
				console.log("exists");
				res.json(203, {
					msg: 'File exists'
				});
				//res.send('File exists');
			} else {
				//copy file
				fs.createReadStream(req.files.posterURL.path).pipe(fs.createWriteStream(targetPath));
				console.log("excuted");
				//return file url
				res.json(200, {
					msg: 'http://' + req.headers.host + '/images/art/' + filename
				});
				//res.send('http://' + req.headers.host + '/images/art/' + filename);

			}
		});
		//res.json(200, { 'picURL': docs })



	} else if (method == "2") {

		console.log(req.files);
		//posterURL 
		var filename = req.files.posterURL.originalFilename || path.basename(req.files.posterURL.ws.path);

		//copy file to a public directory
		var targetPath = path.dirname(__dirname) + "/public/images/temp/" + filename;
		fs.exists(targetPath, function(exists) {

			if (exists) {
				console.log("exists");
				res.json(203, {
					msg: 'File exists'
				});
				return;
				//res.send('File exists');
			} else {
				//copy file
				fs.createReadStream(req.files.posterURL.path).pipe(fs.createWriteStream(targetPath));
			}
		});

		//上传到cloudinary
		//这里需要配置成最后产品的key和secret
		cloudinary.config({
			'cloud_name': 'dehiuh4ek',
			'api_key': '392341567971929',
			'api_secret': 'HfX-ezXkfvSr56IYGMEUFj3xfIc'
		});

		var newFileName = filename.split('.');
		var length = newFileName.length;
		var lastFileName = '';
		for (var i = 0; i < length - 1; i++) {
			lastFileName = lastFileName + newFileName[i];
		}

		console.log(lastFileName);

		var data = {};
		data.public_id = lastFileName;

		/*some attributes you can define
		{
			public_id: 'sample_id', 
			crop: 'limit',
			width: 2000,
			height: 2000,
			eager: [
			{ width: 200, height: 200, crop: 'thumb', gravity: 'face',
			radius: 20, effect: 'sepia' },
			{ width: 100, height: 150, crop: 'fit', format: 'png' }
			],                                     
			tags: ['special', 'for_homepage']
		}*/

		/*fs.chmod(path.dirname(__dirname) + "/public/images/temp/" + filename, 777, function(err){
			console.log(err);
		});
*/
		//部署的时候需要修改
		//cloudinary.uploader.upload('test.jpg', function(result) { console.log(result);
		var pic_url= './public/images/temp/' + "夏日山居图.jpg";
		cloudinary.uploader.upload('./public/images/temp/夏日山居图.jpg', function(result) {
				console.log(result);
				console.log(result.secure_url);
				if (result.secure_url) {
					var newSecureURL = result.secure_url.split('upload');
					var lastSecureURL = newSecureURL[0] + 'upload' + '/w_0.5,h_0.5' + newSecureURL[1];
					res.json(200, {
							posterURL: result.secure_url,
							posterThumbnailURL: lastSecureURL
						})
					} else {

						res.json(203, {
							msg: 'upload failed!'
						});
					}


				 fs.unlink(targetPath, function() {
				console.log('Delete success');
			});
		}, data);
}

});

module.exports = router;