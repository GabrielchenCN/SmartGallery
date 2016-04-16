var express = require('express');
var router = express.Router();
var WCAPI = require('wechat-api');
var async = require('async');
var needle = require('needle');
var cheerio = require('cheerio');
var superagent = require('superagent');

// constants for wechat account info
var token = '';
var appid = '';// 'wxe1a631a902d42ad8';//
var encodingAESKey = '';
var secret = '';// '5a6c0dca28d2f613e5f9ace2a1d21c8b';//
var admin = '';
var api = new WCAPI(appid, secret);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('addnews', { title: 'Add news' });
});

router.post('/', function (req, res, next) {
  
  console.log("post");
  // Get our form values. These rely on the "name" attributes
  var Title = req.body.Title,
    PicURL = req.body.PicURL,
    OrigURL = req.body.OrigURL,
    Content = req.body.Content;


  async.waterfall(
    [
      function (callback) {
        // upload material
        api.uploadMaterial(PicURL, 'image', function (err, result) {
          console.log(err);
          console.log(result);
          if (!err) {
            PicURL = result.url;
          }
          callback(err, result);
        })
      },
      function (Pic, callback) {
        //upload news
        superagent.get(OrigURL).end(function (err, sres) {
          if (err) {
            return next(err);
          }
          var $ = cheerio.load(sres.text);
    
          Content=$('.answer').html();
           var article = {
              "articles": [
                {
                  "title": Title,
                  "thumb_media_id": Pic.media_id,
                  "show_cover_pic": 0,
                  "content": Content,
                  "content_source_url": OrigURL
                }
              ]
    
            };
            api.uploadNewsMaterial(article, function (err, result) {
              console.log(err);
              console.log(result);
              callback(err, result);
            })        
      });
      },
      function (news, callback) {
        // get followers
        api.getFollowers(function (err, result) {
          console.log(err);
          console.log(result);
          callback(err, result);
        });
      },
      function (follower, callback) {
        // get the latest news
        api.getMaterials('news', 0, 1, function (err, result) {
          console.log(err);
          console.log(result);
          
          var data = { 'Categroy': '会员资讯', 'Media_ID': result.item[0].media_id, 'Title': Title, 'PicURL' : PicURL, 
                        'URL' : result.item[0].content.news_item[0].url, 'Date:' : Date( ) };
          needle.post('http://monkeymountain.duapp.com/news', data, function (err, resp) {
                console.log(resp.body);
          });
          
          callback(err, result, follower);
        })
      },
      function (News, Follower, callback) {
        api.massSendNews(News.item[0].media_id, Follower.data.openid, function (err, result) {
          console.log(err);
          console.log(result);
          callback(err, result);
        })
      }
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      else {
        console.log(result);
        res.send(result);
      }
    }
    );
  // api.getMaterials('news', 0, 3, function (err, result) {
  //   console.log(err);
  //   console.log(result);
  //   res.send(result);
  // })

});
module.exports = router;
