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

var artDAO = Dao.mongoose.models.art;

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
/*cloudinary.config({
    cloud_name: 'dzpm6vdrp',
    api_key: '326236893721664',
    api_secret: 'Wt8zNEivobv0AJeHvbh5JWiKowo'
});*/

/* GET users listing. */
router.get('/', function(req, res, next) {
	//res.send('redirect...');
	res.render('art', {
		title: '画作'
	});
});


/* GET addExhi page. */
router.get('/addArt', function(req, res, next) {

	var doc = {};

	//console.log(exresult);
	res.render('addArt', {
		title: '新增画作',
		data: doc
	});

});

/* GET gallerySetting page. */
router.get('/artSetting/:id', function(req, res, next) {

	//var id  = req.params.id;
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		artDAO.findById(req.params.id, function(err, doc) {
			// doc 是单个文档
			mongoose.connection.close();

			console.log(req.params.id);
			console.log(doc);
			res.render('setArt', {
				title: '配置画作',
				data: doc
			});
		});

	})



});



/* API： post Art update and create . */
router.post('/addArt', function(req, res, next) {
	console.log(req.body);
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		var art = [];
		//id存在，更新方法，先删除
		if (req.body._id) {
			artDAO.remove({
				_id: req.body._id
			}, function(err, docs) {
				

				if (err) {
					res.json(506, {
						msg: "delele failed ,can not update",
						err: err
					});
				};
				console.log("-----------------");
				console.log('delele success');
				var _id = new ObjectId();
				req.body._id = _id;
				art.push(req.body);
				artDAO.create(art, function(err, docs) {
					mongoose.connection.close();


					if (err) {
						console.log(err);
						res.json(506, {
							msg: err
						});

					};
					console.log("-----------------");
					console.log(docs);
					res.json(200, {
						msg: "update success ",
						newid:_id
					});
				});

			});

		} else {
			//id不存在，新建数据，生成ID
			var _id = new ObjectId();
			req.body._id = _id;
			art.push(req.body);
			artDAO.create(art, function(err, docs) {
				mongoose.connection.close();


				if (err) {
					console.log(err);
					res.json(506, {
						msg: err
					});

				};
				console.log("-----------------");
				console.log(docs);
				res.json(200, {
					msg: docs
				});
			});

		}



	})
});

/* API： delete  Art . */
router.delete('/', function(req, res, next) {
	//res.send('redirect...');
	var id = req.body.id;
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		artDAO.remove({
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

/* API： uploadPic . */
router.post('/uploadPic/:val', multipart(), function(req, res, next) {

	uploadPic(req, res);
	//uploadPic.uploadPic(val);

});

function uploadPic(req, res, next) {

	var method = req.params.val;
	var picNum = 0;
	if (method == "1") {
		//上传到服务器
		//get filename
		console.log(req.files);
		//posterURL 
		var filename = req.files.posterURL.originalFilename || path.basename(req.files.posterURL.ws.path);
		var len = 0;
		var mark = false;
		if (req.files.multiView) {
			mark = true;
			len = req.files.multiView.length;
			console.log("mark" + len);
		}

		var allFileName = [];
		var multiViewEnd = [];
		//allFileName.put(filename);
		//console.log(filename);
		if (req.files.posterURL) {
			var targetPath = path.dirname(__dirname) + "/public/images/art/" + filename;
			console.log("targetPath" + targetPath);
			(function(e) {
				fs.exists(e, function(exists) {

					if (exists) {
						console.log("exists");
						res.json(203, {
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
		}


		if (req.files.multiView) {
			if (len) {
				for (var i = 0; i < len; i++) {

					(function(e) {
						var targetPath = path.dirname(__dirname) + "/public/images/art/" + req.files.multiView[e].originalFilename;

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
								fs.createReadStream(req.files.multiView[e].path).pipe(fs.createWriteStream(targetPath));
								multiViewEnd.push({
									url: 'http://' + req.headers.host + '/images/art/' + req.files.multiView[e].originalFilename
								});
								console.log("excuted");
								if (e == len - 1) {
									res.json(200, {
										msg: 'http://' + req.headers.host + '/images/art/' + filename,
										multiView: multiViewEnd
									});
								}
							}

						});
					})(i)
				}
			} else {
				var targetPath = path.dirname(__dirname) + "/public/images/art/" + req.files.multiView.originalFilename;

				fs.exists(targetPath, function(exists) {

					if (exists) {
						console.log("exists");
						res.json(203, {
							msg: 'File exists'
						});
					} else {
						//copy file
						console.log(targetPath);
						fs.createReadStream(req.files.multiView.path).pipe(fs.createWriteStream(targetPath));
						multiViewEnd.push({
							url: 'http://' + req.headers.host + '/images/art/' + req.files.multiView.originalFilename
						});
						console.log("excuted");

						res.json(200, {
							msg: 'http://' + req.headers.host + '/images/art/' + filename,
							multiView: multiViewEnd
						});

					}

				});
			}
		}
		/*else if(req.files.multiView){
        
                var targetPath = path.dirname(__dirname) + "/public/images/art/" + req.files.multiView.originalFilename;

                fs.exists(targetPath, function(exists) {
                    
                    if (exists) {
                        console.log("exists");
                        res.json(203, {
                            msg: 'File exists'
                        });
                    } else {
        //copy file
        console.log(targetPath);
        fs.createReadStream(req.files.multiView.path).pipe(fs.createWriteStream(targetPath));
        multiViewEnd.push({url: 'http://' + req.headers.host + '/images/art/' + req.files.multiView.originalFilename});
        console.log("excuted");
        
            res.json(200, {
                msg: 'http://' + req.headers.host + '/images/art/' + filename,
                multiView: multiViewEnd
            });
        
    }

});
            
}*/
		else {
			res.json(200, {
				msg: 'http://' + req.headers.host + '/images/art/' + filename,
				multiView: multiViewEnd
			});
		}
		//console.log("mark" + multiViewEnd[0]);

	} else if (method == "2") {

		/*console.log(req.files);
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
});*/



		//console.log(req.files);
		//posterURL 
		var filename = req.files.posterURL.originalFilename || path.basename(req.files.posterURL.ws.path);
		if (req.files.multiView) {
			var len = req.files.multiView.length;
			//console.log(len);
		}


		var allFileName = [];
		var posterURL = [];
		var multiViewEnd = [];
		//allFileName.put(filename);
		//console.log(filename);
		var targetPath = "";
		targetPath = path.dirname(__dirname) + "/public/images/temp/" + filename;
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

		if (len) {
			for (var i = 0; i < len; i++) {

				(function(e) {
					var targetPath = path.dirname(__dirname) + "/public/images/temp/" + req.files.multiView[e].originalFilename;

					fs.exists(targetPath, function(exists) {
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
							fs.createReadStream(req.files.multiView[e].path).pipe(fs.createWriteStream(targetPath));
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
			(function(e) {
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
		cloudinary.uploader.upload('./public/images/temp/test.jpg', function(result) {
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

				if (req.files.multiView) {
					if (len) {
						for (var k = 0; k < len; k++) {
							(function(e) {
								console.log("e:" + e);
								newFileName = req.files.multiView[e].originalFilename.split('.');
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
								var picInWeblink ='http://res.cloudinary.com/dzpm6vdrp/image/upload/v1439446470/xhxplnagafu1p26u4dyl.jpg';
								/*cloudinary.uploader.upload('./public/images/temp/test.jpg', function(result) {*/
								cloudinary.uploader.upload(picInWeblink,

									function(result) {
										console.log("result:" + result);
										console.log(result.secure_url);
										if (result.secure_url) {
											var newSecureURL = result.secure_url.split('upload');
											var lastSecureURL = newSecureURL[0] + 'upload' + '/w_0.5,h_0.5' + newSecureURL[1];
											//while(e != multiViewEnd.push({posterURL: result.secure_url, posterThumbnailURL: lastSecureURL})-1){

											multiViewEnd.push({
												url: result.secure_url
											});
											picNum++;
											//}
											//multiViewEnd.push({posterURL: result.secure_url});
											console.log("multiViewEnd" + e + ":" + multiViewEnd[e]);
											if (picNum == len) {
												res.json(200, {
													posterURL: posterURL,
													multiView: multiViewEnd
												});
											}

											/*res.json(200, {
											    posterURL: result.secure_url,
											    posterThumbnailURL: lastSecureURL
											})*/
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
						newFileName = req.files.multiView.originalFilename.split('.');
						length = newFileName.length;
						lastFileName = '';
						for (var j = 0; j < length - 1; j++) {
							lastFileName = lastFileName + newFileName[j];
						}

						//console.log(lastFileName);

						var data = {};
						data.public_id = lastFileName;

						var pic_url = './public/images/temp/' + "夏日山居图.jpg";
						cloudinary.uploader.upload('./public/images/temp/test.jpg', function(result) {
							console.log('result' + result);
							console.log(result.secure_url);
							if (result.secure_url) {
								var newSecureURL = result.secure_url.split('upload');
								var lastSecureURL = newSecureURL[0] + 'upload' + '/w_0.5,h_0.5' + newSecureURL[1];

								multiViewEnd.push({
									url: result.secure_url
								});
								console.log("multiViewEnd" + ":" + multiViewEnd[0]);
								//console.log("e:"+e)

								res.json(200, {
									posterURL: posterURL,
									multiView: multiViewEnd
								});


								/*res.json(200, {
								    posterURL: result.secure_url,
								    posterThumbnailURL: lastSecureURL
								})*/
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

module.exports = router;
