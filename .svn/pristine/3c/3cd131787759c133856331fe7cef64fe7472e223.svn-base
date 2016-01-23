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


var beaconDao = Dao.mongoose.models.beacon;
var ExhibitionDAO = Dao.mongoose.models.exhibition;
var mixArtDAO = Dao.mongoose.models.mixArt;
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
				for (var j = 0; j < result[i].Art.length; j++) {
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

		ExhibitionDAO.find()
			// .sort({startDate: -1 })
			.exec(function(err, exresult) {
				mongoose.connection.close();

				//console.log(exresult);
				res.render('exhi', {
					title: '展会维护中心',
					Art: exresult[1].Art,
					exhis: exresult,
					exhiNum: exresult.length
				});
			});
	})
});

//function delete pic 
function deletePic(posterURL, posterThumbnailURL) {
	var pathArr = posterURL.split('/');
	var pathArrTh = posterThumbnailURL.split('/');

	var oposterURL = path.dirname(__dirname) + "/public/images/exhi/" + pathArr[4];
	var oposterThumbnailURL = path.dirname(__dirname) + "/public/images/exhi/" + pathArrTh[4];
	fs.unlink(oposterURL, function() {
		console.log('Delete posterURL success');
	});
	fs.unlink(oposterThumbnailURL, function() {
		console.log('Delete posterThumbnailURL success');
	});
}


/* delete exhi page. */
router.delete('/', function(req, res, next) {
	var id = req.body._id
	console.log(req.body._id);
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		ExhibitionDAO.findById(id, function(err, doc) {
			// doc 是单个文档
			if (err) {
				res.json(203, {
					msg: "delele failed ",
					err: err
				});
			};
			console.log(doc);
			deletePic(doc.posterURL, doc.posterThumbnailURL);
			ExhibitionDAO.remove({
				_id: id
			}, function(err, docs) {
				mongoose.connection.close();

				if (err) {
					res.json(203, {
						msg: "delele failed ",
						err: err
					});
				};
				/*console.log(req.body.posterURL);
				console.log(req.body.posterURL.toString);*/
				//deletePic(req.body.posterURL.toString,req.body.posterThumbnailURL.toString);
				res.json(200, {
					msg: "delele success "
				});
			});
			//console.log(doc.Art);

		});


		// .sort({startDate: -1 })


	})
});

/* get exhi by Id. */
router.get('/:id/arts', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		ExhibitionDAO.findById(req.params.id, function(err, doc) {
			// doc 是单个文档
			mongoose.connection.close();
			console.log(doc.Art);
			res.send(doc.Art);
		});

	})
});

/* GET all exhi(s) and only return id and name. */
router.get('/part', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		ExhibitionDAO.find({}, {
			'_id': 1,
			'subject': 1
		}, function(err, docs) {
			mongoose.connection.close();
			console.log(docs);
			res.json(docs);
		});

	})
});

/* GET addExhi page. */
router.get('/addExhi', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		ExhibitionDAO.find(function(err, exresult) {
			mongoose.connection.close();


			res.render('addExhi', {
				title: '新增展会',
				Art: exresult[1].Art,
				exhi: exresult,
				Scene: exresult.Scene,
				exhiNum: exresult.length
			});
		});



		//console.log(exresult);


	})
});

/* Get Exhi update page. */
router.get('/updateExhi/:id', function(req, res, next) {
	var id = req.params.id;
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		ExhibitionDAO.findById(id, function(err, exresult) {
			mongoose.connection.close();
			console.log(exresult);
			console.log(exresult.artCategory);
			res.render('setExhi', {
				title: '配置展会',
				Art: exresult.Art,
				exhi: exresult,
				Scene: exresult.Scene,
				artCategory: exresult.artCategory,
				exhiNum: exresult.length
			});
		});
	})
});
/******************************更新mixArt 接口函数***********************************/

var mixArt = function(objSubject) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		mixArtDAO.remove({
				'Exhi.subject': objSubject
			}, function(err, docs) {
				if (err) {
					mongoose.connection.close();
					console.log(err);
					return false;
				};
				//add mixArts
				var num = 0;
				var len = 0;
				ExhibitionDAO.find({
					subject: objSubject
				}).exec((function(err, docs) {
					/*console.log(docs.Art);*/
					
					len = docs[0].Art.length;
					
					docs.forEach(function(exhi, i) {
						exhi.Art.forEach(function(art, j) {
							num++;
							var exhiMain = exhi;

							//console.log(exhi);

							var mixArts = {
								Exhi: {
									_id: exhiMain['_id'],
									subject: exhiMain['subject'],
									decsription: exhiMain['decsription'],
									major: exhiMain['major'],
									vanue: exhiMain['vanue'],
									city: exhiMain['city'],
									curator: exhiMain['curator'],
									startDate: exhiMain['startDate'],
									startTime: exhiMain['startTime'],
									endDate: exhiMain['endDate'],
									endTime: exhiMain['endTime'],
									posterURL: exhiMain['posterURL'],
									posterThumbnailURL: exhiMain['posterThumbnailURL'],
									address: exhiMain['address'],
									artCategory: exhiMain['artCategory'],
									Scene: exhiMain['Scene'],
								},
								Art: {
									_id: art['_id'],
									title: art['title'],
									size: art['size'],
									price: art['price'],
									decsription: art['decsription'],
									year: art['year'],
									cateName: art['cateName'],
									posterURL: art['posterURL'],
									posterThumbnailURL: art['posterThumbnailURL'],
									artist: {
										name: art['artist']['name']
									},
									// multiView: art['multiView']
								}
							};

							if (i == 1 && j == 1) {
								console.log(mixArts);
							}

							mixArtDAO.create(mixArts, function(err, docs) {

								if (err) {
									console.log(err);

								};
								//console.log("-------mixArts----------");
								//console.log(docs)
								num++;
								//console.log("len:" + len);
								//console.log("num:" + num);

								if (num == len ||num > len) {
									mongoose.connection.close();
									console.log('Connection is closed');
									
									
								};



							});



						});
					});
					//mongoose.connection.close();
				}));
				//add end 


			}


		)



		setTimeout(done, 5000);
	});
};

/* post Exhi data API. */
router.post('/updateExhi/:id', function(req, res, next) {
	//var id = req.params.id;
	var id = req.body._id;
	var objSubject = req.body.subject;
	//生成ID
	var _id = new ObjectId();
	//console.log(req.body._id);

	//console.log(req.body._id);
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		ExhibitionDAO.remove({
			_id: id
		}, function(err, docs) {
			//mongoose.connection.close();

			if (err) {
				res.json(203, {
					msg: "update failed ,can't delete",
					err: err
				});
			};
			if (docs) {
				var exhi = [];
				//新设置一个id
				req.body._id = _id;
				exhi.push(req.body);


				ExhibitionDAO.create(exhi, function(err, docs) {
					mongoose.connection.close();

					if (err) {
						res.json(506, {
							msg: "update failed ,can't add"
						});
						console.log(err);

					};
					mixArt(objSubject);
					console.log("-----------------");
					console.log(docs);
					res.json(200, {
						'exhi': docs,
						msg: "update success",
						newid: _id
					});


				});

			}

		});


	})
});

/* API： postExhi . */
router.post('/postExhi', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;
		var exhi = [];
		exhi.push(req.body);
		//生成ID
		var _id = new ObjectId();
		//console.log(req.body._id);
		req.body._id = _id;
		//console.log(req.body._id);
		var objSubject = req.body.subject;
		// var  ExhibitionEntity = new ExhibitionDAO(exhi);
		ExhibitionDAO.create(exhi, function(err, docs) {
			mongoose.connection.close();

			if (err) {
				res.json(506, {
					'error': err,
					msg: err
				});
				console.log(err);

			};
			console.log(objSubject);

			/*var mixArtVal = mixArt(objSubject);*/
			mixArt(objSubject);

			//console.log(mixArtVal);
			console.log("-----------------");
			console.log(docs);
				res.json(200, {
					'exhi': docs,
					msg: "success"
				});
				})
			})

});

//upload picture to server
router.post('/uploadPic/:val', multipart(), function(req, res, next) {

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
	var picNum = 0;
	if (method == "1") {
		//上传到服务器
		//get filename
		console.log(req.files);
		//posterURL 
		var filename = req.files.posterURL.originalFilename || path.basename(req.files.posterURL.ws.path);
		var len = 0;
		var mark = false;
		if (req.files.Scene) {
			mark = true;
			len = req.files.Scene.length;
			console.log("mark" + len);
		}

		var allFileName = [];
		var SceneEnd = [];
		//allFileName.put(filename);
		//console.log(filename);
		if (req.files.posterURL) {
			var targetPath = path.dirname(__dirname) + "/public/images/exhi/" + filename;
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


		if (req.files.Scene) {
			if (len) {
				for (var i = 0; i < len; i++) {

					(function(e) {
						var targetPath = path.dirname(__dirname) + "/public/images/exhi/" + req.files.Scene[e].originalFilename;

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
								fs.createReadStream(req.files.Scene[e].path).pipe(fs.createWriteStream(targetPath));
								SceneEnd.push({
									url: 'http://' + req.headers.host + '/images/exhi/' + req.files.Scene[e].originalFilename
								});
								console.log("excuted");
								if (e == len - 1) {
									res.json(200, {
										msg: 'http://' + req.headers.host + '/images/exhi/' + filename,
										Scene: SceneEnd
									});
								}
							}

						});
					})(i)
				}
			} else {
				var targetPath = path.dirname(__dirname) + "/public/images/exhi/" + req.files.Scene.originalFilename;

				fs.exists(targetPath, function(exists) {

					if (exists) {
						console.log("exists");
						res.json(203, {
							msg: 'File exists'
						});
					} else {
						//copy file
						console.log(targetPath);
						fs.createReadStream(req.files.Scene.path).pipe(fs.createWriteStream(targetPath));
						SceneEnd.push({
							url: 'http://' + req.headers.host + '/images/exhi/' + req.files.Scene.originalFilename
						});
						console.log("excuted");

						res.json(200, {
							msg: 'http://' + req.headers.host + '/images/exhi/' + filename,
							Scene: SceneEnd
						});

					}

				});
			}
		} else {
			res.json(200, {
				msg: 'http://' + req.headers.host + '/images/exhi/' + filename,
				Scene: SceneEnd
			});
		}
		//console.log("mark" + SceneEnd[0]);

	} else if (method == "2") {
		//console.log(req.files);
		//posterURL 
		var filename = req.files.posterURL.originalFilename || path.basename(req.files.posterURL.ws.path);
		if (req.files.Scene) {
			var len = req.files.Scene.length;
			//console.log(len);
		}


		var allFileName = [];
		var posterURL = [];
		var SceneEnd = [];
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
					var targetPath = path.dirname(__dirname) + "/public/images/temp/" + req.files.Scene[e].originalFilename;

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
							fs.createReadStream(req.files.Scene[e].path).pipe(fs.createWriteStream(targetPath));
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

				if (req.files.Scene) {
					if (len) {
						for (var k = 0; k < len; k++) {
							(function(e) {
								console.log("e:" + e);
								newFileName = req.files.Scene[e].originalFilename.split('.');
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

									function(result) {
										console.log("result:" + result);
										console.log(result.secure_url);
										if (result.secure_url) {
											var newSecureURL = result.secure_url.split('upload');
											var lastSecureURL = newSecureURL[0] + 'upload' + '/w_0.5,h_0.5' + newSecureURL[1];
											//while(e != SceneEnd.push({posterURL: result.secure_url, posterThumbnailURL: lastSecureURL})-1){

											SceneEnd.push({
												url: result.secure_url
											});
											picNum++;
											//}
											//SceneEnd.push({posterURL: result.secure_url});
											console.log("SceneEnd" + e + ":" + SceneEnd[e]);
											if (picNum == len) {
												res.json(200, {
													posterURL: posterURL,
													Scene: SceneEnd
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
						newFileName = req.files.Scene.originalFilename.split('.');
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

								SceneEnd.push({
									url: result.secure_url
								});
								console.log("SceneEnd" + ":" + SceneEnd[0]);
								//console.log("e:"+e)

								res.json(200, {
									posterURL: posterURL,
									Scene: SceneEnd
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



/* Post Exhibition Newspage. */
router.post('/publish', function(req, res, next) {
	mongoose.connect(mongo_url, function(err) {
		if (err) throw err;

		async.waterfall(
			[
				function(callback) {
					//	console.log("-------req.body----------");
					//	console.log(req.body);

					ExhibitionDAO.findById(req.body['_id']).exec(
						(function(err, exhiMain) {

							var pubExhi = {
									_id: exhiMain['_id'],
									subject: exhiMain['subject'],
									decsription: exhiMain['decsription'],
									major: exhiMain['major'],
									vanue: exhiMain['vanue'],
									curator: exhiMain['curator'],
									startDate: exhiMain['startDate'],
									startTime: exhiMain['startTime'],
									endDate: exhiMain['endDate'],
									endTime: exhiMain['endTime'],
									posterURL: exhiMain['posterURL'],
									posterThumbnailURL: exhiMain['posterThumbnailURL'],
									address: exhiMain['address'],
									artCategory: exhiMain['artCategory'],
								}
								// console.log("-------pubExhi----------");
								// console.log(pubExhi);

							callback(err, pubExhi);
						})
					)
				},
				function(pubExhi, callback) {
					var pbExhi = pubExhi;
					userDAO.find({
							'token': {
								$ne: ''
							}
						}).exists('token')
						.exec((function(err, arrUser) {
							callback(err, pbExhi, arrUser);
						}))
				},
				function(pbExhi, arrUser, callback) {
					var arrtoken = []
					var pubExhi = pbExhi;

					async.each(arrUser, function(user, callback) {
							var noti = {
								_id: new ObjectId(),
								Exhi: pubExhi,
								user: user['user'],
								token: user['token'],
								date: pubExhi['startDate'],
								startTime: pubExhi['startTime'],
							};
							arrtoken.push(user['token']);


							notificationDao.create(noti, function(err, docs) {
								if (err) {
									console.log(err);
								};
								//console.log("-------noti----------");
								//console.log(docs);
							});

							callback(null); // must call once
						},
						function(err) {
							//关掉链接
							mongoose.connection.close();
							if (err) {
								console.error("error");
							};

							var slaert = pubExhi['vanue'] + "将于" + pubExhi['startDate'] + "举办" + pubExhi['subject'] + "，敬请参加!";

							console.log('--arroken----');
							console.log(arrtoken);

							var pubDetail = {
								"tokens": arrtoken,
								"notification": {
									"alert": slaert,
									"ios": {
										"badge": "1",
										"sound": "ping.aiff",
										"expiry": "1423238641",
										"priority": "10",
										"contentAvailable": "true",
										"payload": {
											"decsription": pubExhi["decsription"],
											"endDate": pubExhi["endDate"],
											"endTime": pubExhi["endTime"],
											"major": pubExhi["major"],
											"posterThumbnailURL": pubExhi["posterThumbnailURL"],
											"posterURL": pubExhi["posterURL"],
											"startDate": pubExhi["startDate"],
											"startTime": pubExhi["startTime"],
											"subject": pubExhi["subject"],
											"vanue": pubExhi["vanue"],
											"id": pubExhi["_id"]
										}
									},
									"android": {
										"collapseKey": "foo",
										"delayWhileIdle": "true",
										"timeToLive": "300",
										"payload": {
											"key1": "value",
											"key2": "value"
										}
									}
								}
							};

							var pubHead = {

								'Cache-Control': 'no-cache',
								'X-Ionic-Application-Id': "dfde4e1d",
								'Authorization': 'Basic NWE3YWJlNDkyY2YxMTg0NTY3ZmMyYTlkYWUxZjBjMzQwOTRhYTlkYjU5OGE3ZTI4Og==',
								'Content-Type': 'application/json'
							};

							callback(err, pubDetail, pubHead);

						})
				},
			],
			function(err, pubDetail, pubHead) {

				console.log(pubDetail);

				if (err) {
					console.log(err);
				}

				var testdd = {
					"tokens": [
						"7daf41361f46f03c1922c58a3cdce6f2af61e1cde4781ca0924a08bac8db54a9",
						"47fb48dba62b098d3dbe8668d58e6aead1d34219d4523dddf168d47a6707adab",
						"87cc1430cb4b3cf1aa683d65c6e18cfaa4f2b3a086739a1b7676f31755b130e7",
						"ff626a1698899bd6c601de7374b71c90d8f6520405ebaa185ef0da48f3eaf0ec",
						"7d52d9dc544c6d7fbbba39d5551c540c4d557ade3929ba2d1cc4c96e96b40db2"
					],
					"notification": {
						"alert": "收到消息表示后台发送通知成功，请微信或短信通知我^_^",
						"ios": {
							"badge": "1",
							"sound": "ping.aiff",
							"expiry": "1423238641",
							"priority": "10",
							"contentAvailable": "true",
							"payload": {
								"decsription": "SAP云服务中心，企业成功之选画展",
								"endDate": "2015-08-07",
								"endTime": "18:00",
								"major": "15",
								"posterThumbnailURL": "http://smartgallery.duapp.com/images/1000-1.png",
								"posterURL": "http://smartgallery.duapp.com/images/1000-1.png",
								"startDate": "2015-08-07",
								"startTime": "15:00",
								"subject": "成功之选",
								"vanue": "SAP成都云服务中心",
								"id": "55c42873f85fd30e19f2d28d"
							}
						},
						"android": {
							"collapseKey": "foo",
							"delayWhileIdle": "true",
							"timeToLive": "300",
							"payload": {
								"key1": "value",
								"key2": "value"
							}
						}
					}
				};
				/** 		
					var scontent = querystring.stringify(testdd);
					console.log(scontent);
						
					var push_url = 'https://push.ionic.io/api/v1/push';
					

					var options = { 
						multipart: true,
						headers : pubHead };
					needle.post(push_url, testdd, options, function (err, resp) {
						console.log('------------push ionic ------------');
						//  console.log(resp);
					});

					*/



				var postData = JSON.stringify(pubDetail);

				var post_option = url.parse('https://push.ionic.io/api/v1/push');
				post_option.method = 'POST';
				//post_option.port = 443;

				post_option.headers = {
					'X-Ionic-Application-Id': "dfde4e1d",
					'Cache-Control': 'no-cache',
					'Authorization': 'Basic NWE3YWJlNDkyY2YxMTg0NTY3ZmMyYTlkYWUxZjBjMzQwOTRhYTlkYjU5OGE3ZTI4Og==',
					'Content-Type': 'application/json'
				};

				var post_req = https.request(post_option, function(res) {
					console.log("statusCode: ", res.statusCode);
					console.log("headers: ", res.headers);

					res.on('data', function(buffer) {
						console.log('-------data------');
						console.log(buffer.toString());
					});
				});


				post_req.write(postData);
				post_req.end();

				post_req.on('error', function(e) {
					console.log('-------error------');
					console.error(e);
				});

			});

	});
});



function done() {
	//关掉链接
	mongoose.connection.close();
	console.log('Connection is closed');
	/*
	// 删除DB
	 mongoose.connection.db.dropDatabase(function () {
	     mongoose.connection.close();
	     console.log('Connection is closed');
	});
	*/
}


module.exports = router;