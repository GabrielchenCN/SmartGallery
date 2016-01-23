/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/serve-static/nodeserve-static.d.ts"/>
/// <reference path="../typings/mongoose/mongoose.d.ts"/>
/// <reference path="../typings/mime/mime.ts"/>
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dao = require('./CrStructure.js');
var async = require('async');
var needle = require('needle');

var ArtistDAO = Dao.mongoose.models.artist;
var ArtDAO = Dao.mongoose.models.art;
var GalleryDAO = Dao.mongoose.models.gallery;
var beaconDao = Dao.mongoose.models.beacon;
var ExhibitionDAO = Dao.mongoose.models.exhibition;
var notificationDao = Dao.mongoose.models.notification;
var ObjectId = mongoose.Types.ObjectId;


function crDD() {
    //数据库连接信息host,port,user,pwd
    var db_name = 'SnTPMJFRIcnMnJujtQId'; // 数据库名，从云平台获取
    var db_host = 'mongo.duapp.com'; // 数据库地址
    var db_port = '8908'; // 数据库端口
    var username = '4ea46a5d26bf4884b7a12de5f362f9cd'; // 用户名（API KEY）
    var password = '78e53609d14a4d0e89138a581504a466'; // 密码(Secret KEY)
    var mongo_url = "";

/*
if (process.env.SERVER_SOFTWARE == 'bae/3.0') {
var db_name = 'SnTPMJFRIcnMnJujtQId';                  // 数据库名，从云平台获取
var db_host =  'mongo.duapp.com';      // 数据库地址
var db_port =  '8908';   // 数据库端口
  var db_options = {
        server: {poolSize: 5},
        user: username,
        pass: password,
    };    
} else {
    db_host = 'localhost';
    db_name = 'oDataTest';
    db_port = '27017';
}
*/

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

    mongoose.connect(mongo_url, function(err) {
        // if we failed to connect, abort
        if (err) throw err;

        // we connected ok        
        createData();

        // var itab = ExhibitionDAO.find()  
        /*
         JourneyDAO.find()
         .populate('exhibition')
         .exec(function (err, doc) {
                    console.log(doc) ;
                 });

        */

    });
}

function createData() {

    var arrArtist = [{
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, 
    {
        obj: new ObjectId()
    }, 
    {
        obj: new ObjectId()
    }
    //size =13
    ];

    var arrArt = [{
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        },
        {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }
        //size = 38
    ];
    var arrExhi = [{
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, ];
    
    var arrBeacon = [{
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, ];



    // gallery
    var gallerys = [{
        name: "SAP成都云服务中心",
        address: "成都市高新区天府大道天府软件园B6楼",
        longitude: "",
        latitude: ""
    }];

    GalleryDAO.create(gallerys, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
       // console.log(docs);
    });




    //artists         
    var artists = [{
            _id: arrArtist[0].obj,
            name: "Sap",
        }
    ];


    ArtistDAO.create(artists, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
       // console.log(docs);
    });

    //art         
    var arts = [];

    arts.push({
        _id: arrArt[0].obj,
        title: "雅豪",
        size: "",
        price: "5000",
        decsription: "雅豪成功之选",
        year: "1940",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Sapex/heuer.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Sapex/heuer.jpg",
        artist: {
            _id: arrArtist[0].obj,
            name: "SAP"
        }
    });    
    
    arts.push({
        _id: arrArt[1].obj,
        title: "联想",
        size: "",
        price: "5500",
        decsription: "联想成功之选",
        year: "2010",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Sapex/lenovo.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Sapex/lenovo.jpg",
        artist: {
            _id: arrArtist[0].obj,
            name: "SAP"
        }
    });
    
    arts.push({
        _id: arrArt[2].obj,
        title: "NEC",
        size: "",
        price: "2500",
        decsription: "NEC成功之选",
        year: "2012",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Sapex/nec.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Sapex/nec.jpg",
        artist: {
            _id: arrArtist[0].obj,
            name: "SAP"
        }
    });
    
    arts.push({
        _id: arrArt[3].obj,
        title: "SHARP",
        size: "",
        price: "3500",
        decsription: "SHARP成功之选",
        year: "2015",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Sapex/sharp.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Sapex/sharp.jpg",
        artist: {
            _id: arrArtist[0].obj,
            name: "SAP"
        }
    });

    ArtDAO.create(arts, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
       // console.log(docs);
    });

    //  exhibitions
    var exhibitions = [];

    exhibitions.push({
        _id: arrExhi[0].obj,
        major: "15",
        subject: "成功之选",
        decsription: "SAP云服务中心，企业成功之选画展",
        vanue: "SAP成都云服务中心",
        curator: "成功企业",
        startDate: "2015-08-07",
        startTime: "15:00",
        endDate: "2015-08-07",
        endTime: "18:00",
        artCategory: [{
            cateName: "油画"
        }],
        posterURL: "http://smartgallery.duapp.com/images/1000-1.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/1000-1.png",
        address: "成都市高新区天府大道天府软件园B6楼",
        Art: [{
        _id: arrArt[0].obj,
        title: "雅豪",
        size: "",
        price: "5000",
        decsription: "雅豪成功之选",
        year: "1940",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Sapex/heuer.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Sapex/heuer.jpg",
        artist: {
            _id: arrArtist[0].obj,
            name: "SAP"
        }
    }, {
        _id: arrArt[1].obj,
        title: "联想",
        size: "",
        price: "5500",
        decsription: "联想成功之选",
        year: "2010",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Sapex/lenovo.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Sapex/lenovo.jpg",
        artist: {
            _id: arrArtist[0].obj,
            name: "SAP"
        }
    },{
        _id: arrArt[2].obj,
        title: "NEC",
        size: "",
        price: "2500",
        decsription: "NEC成功之选",
        year: "2012",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Sapex/nec.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Sapex/nec.jpg",
        artist: {
            _id: arrArtist[0].obj,
            name: "SAP"
        }
    },{
        _id: arrArt[3].obj,
        title: "SHARP",
        size: "",
        price: "3500",
        decsription: "SHARP成功之选",
        year: "2015",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Sapex/sharp.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Sapex/sharp.jpg",
        artist: {
            _id: arrArtist[0].obj,
            name: "SAP"
        }
    }

        ]
    });


    ExhibitionDAO.create(exhibitions, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
       // console.log(docs);

    });

    //beacons
    var beacons = [
        {
            _id :arrBeacon[0].obj,
            beaconUUID: "BK001",
            major: "15",
            minor: "1",
            triggerDistance: "0.1",
            Art: { _id: arrArt[0].obj },
            Exhi: { _id: arrExhi[0].obj },
        },
        {
            _id :arrBeacon[1].obj,
            beaconUUID: "BK002",
            major: "15",
            minor: "1",
            triggerDistance: "0.2",
            Art: { _id: arrArt[1].obj },
            Exhi: { _id: arrExhi[0].obj },
        },
        {
            _id :arrBeacon[2].obj,
            beaconUUID: "BK003",
            major: "15",
            minor: "1",
            triggerDistance: "0.3",
            Art: { _id: arrArt[2].obj },
            Exhi: { _id: arrExhi[0].obj },
        },
        {
            _id :arrBeacon[3].obj,
            beaconUUID: "BK004",
            major: "15",
            minor: "1",
            triggerDistance: "0.1",
            Art: { _id: arrArt[3].obj },
            Exhi: { _id: arrExhi[0].obj },
        },
        
    ];
    beaconDao.create(beacons, function (err, docs) {
        if (err) {
            console.log(err);
        };
        console.log("-------beacons----------");
        console.log(docs);
    });    
    
    setTimeout(done, 5000);
}   

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




//crDD();


exports.crdd = crDD;