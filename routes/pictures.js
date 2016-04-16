var express = require('express');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');
var Dao = require('../CrStructure.js');
//var uploadPic = require('../public/javascripts/common.js');
var server = require('../server.js');
var async = require('async');
var needle = require('needle');
var fs = require('fs');
var multipart = require('connect-multiparty');
var cloudinary = require('cloudinary');
var async = require('async');


var pictureDAO = Dao.mongoose.models.picture;

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


function mkdirsSync(dirpath) {
	//如果想设置文件夹权限 fs.mkdirSync(pathtmp,mode) 传入mode参数
	if (!fs.existsSync(dirpath)) {
		var pathtmp;
		dirpath.split(path.sep).forEach(function (dirname) {
			if (pathtmp) {
				pathtmp = path.join(pathtmp, dirname);
			} else {
				pathtmp = dirname;
			}
			if (!fs.existsSync(pathtmp)) {
				if (!fs.mkdirSync(pathtmp)) {
					return "-1";
				}
			}
		});
	} else {
		return "-2"
	};
	return "1";
};


/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('pictures', {
		title: '图片管理'
	});
});
/*  API delete picture. */
router.delete('/', function (req, res, next) {
	var id = req.body.id;
	mongoose.connect(mongo_url, function (err) {
		if (err) throw err;

		pictureDAO.findById(id, function (err, doc) {
			// doc 是单个文档
			if (err) {
				res.json(203, {
					msg: "delele failed ",
					err: err
				});
			};
			console.log(doc);
			var pathVal = path.dirname(__dirname) + "/public/images/picture/" + doc.picFolder + "/" + doc.picName + "." + doc.picFormat;
			console.log(pathVal);
			fs.unlink(pathVal, function (err) {
				if (err) {
					res.json(203, {
						msg: "delele failed ",
						err: err
					});
				};
				console.log('Delete posterURL success');
			});
			pictureDAO.remove({
				_id: id
			}, function (err, docs) {
				mongoose.connection.close();

				if (err) {
					res.json(203, {
						msg: "delele failed ",
						err: err
					});
				};

				res.json(200, {
					msg: "delele success "
				});
			});


		});

	})
});

/* GET add page. */
router.get('/addPicture', function (req, res, next) {
	res.render('addPicture', {
		title: '新增图片'
	});
});


/* POST PICTURE API. */
router.post('/addPicture', function (req, res, next) {

	mongoose.connect(mongo_url, function (err) {
		if (err) throw err;
		
		//************************************************
		//post上json数组时，req.body得到值格式有问题，以下代码为格式化数据为json数组
        var a = Object.keys(req.body)[0];
		var b = "[" + a + "]";
		var picArr = JSON.parse(b);
		//************************************************
		
		var len = picArr.length;			
		for(var i = 0 ; i < len ; i++){
			var _id =new ObjectId();
			picArr[i]._id = _id;
		}
			
		
		pictureDAO.create(picArr, function (err, docs) {
		mongoose.connection.close();
			if (err) {
				console.log(err);
				res.json(506, {
					'msg': err
				});
			};
			
		res.json(200, {
			'msg': "save success"
		});
		
			console.log("-----------------");
			console.log(docs);
		});
		
		
		//************************************************
		/*
			async.each(picArr, function(picObj, callback) {
					
					pictureDAO.create(picObj, function(err, docs) {
						if (err) {
							console.log(err);
						};
						console.log("-----------------");
						console.log(docs);
	
					});
	
					callback(null); // must call once
				},
				function(err) {
					
   					setTimeout(done, 500);
	
					if (err) {
						console.error("error");
						res.json(506, {
						'msg': err
					});
					} else {
						res.json(200, {
							'msg': "save success"
						});
					}
				});
				*/
	})
});



router.get('/catalog', function (req, res, next) {

	var checkdirpath = path.dirname(__dirname) + "/public/images/picture";
	var dirArr = [];

	fs.readdir(checkdirpath, function (err, files) {
		if (err) {
			console.log(err);
		}
		dirArr = files;
		console.log(dirArr[0]);
		res.json(200, {
			'catalog': dirArr
		});
	});


});

router.post('/mkdir', function (req, res, next) {
	var filename = req.body.filename;
	var dirpath = path.dirname(__dirname) + "/public/images/picture/" + filename;

	var bln = mkdirsSync(dirpath);


	if (bln == "1") {
		res.json(200, {
			'msg': "success"
		});
	} else if (bln == "-1") {

		res.json(200, {
			'msg': "文件创建失败"
		});
	} else if (bln == "-2") {
		res.json(200, {
			'msg': "文件夹存在"
		});

	} else {
		res.json(200, {
			'msg': "未知返回"
		});
	}

});
//upload picture and save data into mongo
router.post('/uploadPic/:val/:folder', multipart(), function (req, res, next) {

	uploadPic(req, res);
	//uploadPic.uploadPic(val);

});

function uploadPic(req, res, next) {
	if (!req.files) {
		res.json(203, {
			msg: 'null file'
		});
	};
	var method = req.params.val;
	var folder = req.params.folder;
	var picNum = 0;
	if (method == "1") {
		//上传到服务器
		//get filename
		console.log(req.files);
		//posterURL 
		/*var filename = req.files.posterURL.originalFilename || path.basename(req.files.posterURL.ws.path);*/
		var len = 0;
		var mark = false;
		if (req.files.multiPicture) {
			mark = true;
			len = req.files.multiPicture.length;
			console.log("mark" + len);
		}

		var allFileName = [];
		var multiPictureEnd = [];
		//allFileName.put(filename);
		//console.log(filename);
		/*	if (req.files.posterURL) {
				var targetPath = path.dirname(__dirname) + "/public/images/exhi/" + filename;
				console.log("targetPath" + targetPath);
				(function(e) {
					fs.exists(e, function(exists) {

						if (exists) {
							console.log("exists");
							res.json(203, {mul
								msg: 'File exists'
							});
							return;
							//res.send('File exists');
						} else {
							//copy file
							console.log("posterURL" + e);
							fs.createReadStream(req.files.posterURL.path).pipe(fs.createWriteStream(e));
						}
					});
				})(targetPath)
			}*/


		if (req.files.multiPicture) {
			if (len) {
				for (var i = 0; i < len; i++) {

					(function (e,len) {
						var targetPath = path.dirname(__dirname) + "/public/images/picture/" + folder + "/" + req.files.multiPicture[e].originalFilename;
						var arrlen = len;
						fs.exists(targetPath, function(exists) {
							console.log(e);
							if (exists) {
								console.log("exists");
								res.json(203, {
									msg: 'File exists'
								});
							} else {
								//copy file

								console.log(e);
								console.log(targetPath);
								fs.createReadStream(req.files.multiPicture[e].path).pipe(fs.createWriteStream(targetPath));
								multiPictureEnd.push({
									url: 'http://' + req.headers.host + '/images/picture/' + folder + '/' + req.files.multiPicture[e].originalFilename
								});
								console.log("excuted");
								if (e == arrlen - 1) {
									res.json(200, {
										msg: 'http://' + req.headers.host + '/images/picture/' +folder+'/'+filename,
										multiPicture: multiPictureEnd									});
								}
							}

						});
					})(i,len)
				}
			} else {
				var targetPath = path.dirname(__dirname) + "/public/images/picture/" + folder + "/" + req.files.multiPicture.originalFilename;

				fs.exists(targetPath, function (exists) {

					if (exists) {
						console.log("exists");
						res.json(203, {
							msg: 'File exists'
						});
					} else {
						//copy file
						console.log(targetPath);
						fs.createReadStream(req.files.multiPicture.path).pipe(fs.createWriteStream(targetPath));
						multiPictureEnd.push({
							url: 'http://' + req.headers.host + '/images/picture/' + folder + '/' + req.files.multiPicture.originalFilename
						});
						console.log("excuted");

						res.json(200, {
							msg: 'http://' + req.headers.host + '/images/picture/' + folder + '/' + filename,
							multiPicture: multiPictureEnd
						});

					}

				});
			}
		} else {
			res.status(200).json({
				msg: 'http://' + req.headers.host + '/images/picture/' + folder + '/' + filename,
				multiPicture: multiPictureEnd
			});
		}
		//console.log("mark" + multiPictureEnd[0]);

	} else if (method == "2") {
		//console.log(req.files);
		//posterURL 
		var filename = req.files.posterURL.originalFilename || path.basename(req.files.posterURL.ws.path);
		if (req.files.multiPicture) {
			var len = req.files.multiPicture.length;
			//console.log(len);
		}


		var allFileName = [];
		var posterURL = [];
		var multiPictureEnd = [];
		//allFileName.put(filename);
		//console.log(filename);
		var targetPath = "";
		targetPath = path.dirname(__dirname) + "/public/images/temp/" + filename;
		fs.exists(targetPath, function (exists) {

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

		if (len) {
			for (var i = 0; i < len; i++) {

				(function (e) {
					var targetPath = path.dirname(__dirname) + "/public/images/temp/" + req.files.multiPicture[e].originalFilename;

					fs.exists(targetPath, function (exists) {
						//console.log(e);
						if (exists) {
							console.log("exists");
							res.json(203, {
								msg: 'File exists'
							});
						} else {
							//copy file

							//console.log(e);
							//console.log(targetPath);
							fs.createReadStream(req.files.multiPicture[e].path).pipe(fs.createWriteStream(targetPath));
							//console.log("excuted");
						}

					});
				})(i)
			}
		}



		//上传到cloudinary
		//这里需要配置成最后产品的key和secret
		cloudinary.config({
			cloud_name: 'dzpm6vdrp',
			api_key: '326236893721664',
			api_secret: 'Wt8zNEivobv0AJeHvbh5JWiKowo'
		});

		var newFileName = filename.split('.');
		var length = newFileName.length;
		var lastFileName = '';

		//拼接文件名
		for (var k = 0; k < length - 1; k++) {
			(function (e) {
				lastFileName = lastFileName + newFileName[e];
			})(k)
		}

		//console.log(lastFileName);

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

		//部署的时候需要修改
		//cloudinary.uploader.upload('test.jpg', function(result) { console.log(result);
		var pic_url = './public/images/temp/' + "夏日山居图.jpg";
		cloudinary.uploader.upload('./public/images/temp/test.jpg', function (result) {
			console.log(result);
			//console.log(result.secure_url);
			if (result.secure_url) {
				console.log(result.secure_url);
				var newSecureURL = result.secure_url.split('upload');
				var lastSecureURL = newSecureURL[0] + 'upload' + '/w_0.5,h_0.5' + newSecureURL[1];
				//(function(e1, e2){
				posterURL.push({
					posterURL: result.secure_url,
					posterThumbnailURL: lastSecureURL
				});
				//})(result.secure_url, lastSecureURL)
				console.log("result.secure_url:" + result.secure_url);
				console.log("posterThumbnailURL:" + lastSecureURL);
				console.log(posterURL[0].posterURL);

				if (req.files.multiPicture) {
					if (len) {
						for (var k = 0; k < len; k++) {
							(function (e) {
								console.log("e:" + e);
								newFileName = req.files.multiPicture[e].originalFilename.split('.');
								length = newFileName.length;
								lastFileName = '';
								for (var j = 0; j < length - 1; j++) {
									lastFileName = lastFileName + newFileName[j];
								}

								//console.log(lastFileName);
								//设置传入cloudinary的id
								var data = {};
								data.public_id = lastFileName;

								//部署的时候需要修改
								//cloudinary.uploader.upload('test.jpg', function(result) { console.log(result);
								var pic_url = './public/images/temp/' + "夏日山居图.jpg";
								var picInWeblink = 'http://res.cloudinary.com/dzpm6vdrp/image/upload/v1439446470/xhxplnagafu1p26u4dyl.jpg';
								/*cloudinary.uploader.upload('./public/images/temp/test.jpg', function(result) {*/
								cloudinary.uploader.upload(picInWeblink,

									function (result) {
										console.log("result:" + result);
										console.log(result.secure_url);
										if (result.secure_url) {
											var newSecureURL = result.secure_url.split('upload');
											var lastSecureURL = newSecureURL[0] + 'upload' + '/w_0.5,h_0.5' + newSecureURL[1];
											//while(e != multiPictureEnd.push({posterURL: result.secure_url, posterThumbnailURL: lastSecureURL})-1){

											multiPictureEnd.push({
												url: result.secure_url
											});
											picNum++;
											//}
											//multiPictureEnd.push({posterURL: result.secure_url});
											console.log("multiPictureEnd" + e + ":" + multiPictureEnd[e]);
											if (picNum == len) {
												res.json(200, {
													posterURL: posterURL,
													multiPicture: multiPictureEnd
												});
											}

										} else {

											res.json(203, {
												msg: 'upload failed!'
											});
										}
										/*fs.unlink(targetPath, function() {
										    console.log('Delete success');
										});*/
									}, data

									);
							})(k)
						}
					}
					//如果不存在细节图，
					else {
						newFileName = req.files.multiPicture.originalFilename.split('.');
						length = newFileName.length;
						lastFileName = '';
						for (var j = 0; j < length - 1; j++) {
							lastFileName = lastFileName + newFileName[j];
						}

						//console.log(lastFileName);

						var data = {};
						data.public_id = lastFileName;

						var pic_url = './public/images/temp/' + "夏日山居图.jpg";
						cloudinary.uploader.upload('./public/images/temp/test.jpg', function (result) {
							console.log('result' + result);
							console.log(result.secure_url);
							if (result.secure_url) {
								var newSecureURL = result.secure_url.split('upload');
								var lastSecureURL = newSecureURL[0] + 'upload' + '/w_0.5,h_0.5' + newSecureURL[1];

								multiPictureEnd.push({
									url: result.secure_url
								});
								console.log("multiPictureEnd" + ":" + multiPictureEnd[0]);
								//console.log("e:"+e)

								res.json(200, {
									posterURL: posterURL,
									multiPicture: multiPictureEnd
								});

							} else {

								res.json(203, {
									msg: 'upload failed!'
								});
							}
							/*fs.unlink(targetPath, function() {
							    console.log('Delete success');
							});*/
						}, data);
					}
				}

			} else {

				res.json(203, {
					msg: 'upload failed!'
				});
			}


			/*fs.unlink(targetPath, function() {
			    console.log('Delete success');
			});*/
		}, data);

	}
}
function done() {
    //关掉链接
    mongoose.connection.close();
   // console.log('Connection is closed');
    /*
    // 删除DB
     mongoose.connection.db.dropDatabase(function () {
         mongoose.connection.close();
         console.log('Connection is closed');
    });
    */
}

module.exports = router;
