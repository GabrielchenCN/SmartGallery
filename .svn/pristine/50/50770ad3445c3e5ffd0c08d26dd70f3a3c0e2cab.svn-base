$('document').ready(function() {
  $('#addScene').click(function(e) {
    $("#SceneLabel").after('<input type="file" class="form-control Scene" name="Scene" id="Scene" placeholder="细节图"/>');


  });
});


//submit exhi info and method post

var submitExhi = function(exhi) {
    var host = window.location.host;
    var url = "http://" + host + "/exhi/postExhi";
    //  alert(url);
    $.ajax({
      type: "post",
      dataType: "json",
      url: "http://" + host + "/exhi/postExhi",

      data: exhi,

      success: function(data) {
        //$('#myModel').modal('hide');
        $('progress').attr('value', '100');
        $('progress').after('<p>上传已成功,继续上传,请<a href=""http://' + host + '/exhi/addExhi"">刷新</a></p>');
        alert("Save Successful");
      },
      error: function(data) {
        //alert(' Can not enter Server' + url);
      },
      statusCode: {


        200: function(data) {

          // location.reload();
        },
        506: function(data) {
          alert(' Server Internal Error ,' + data.msg + '');

        }

      }
    })


  }
  // generate the value of id. should use md5 in the future
  //弃用此方法生成ID改由后台生成

var id_24 = function() {
  var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  var result = "";
  for (var i = 0; i < 24; i++) {
    var r = Math.floor(Math.random() * 62); //取得0-62间的随机数，目的是以此当下标取数组data里的值！  
    result += data[r]; //输出20次随机数的同时，让rrr加20次，就是20位的随机字符串了。  
  }
  return result;
}

//formatted exhi data
$(function() {
  var host = window.location.host;
  $("#submitExhisecond").on('click', function(e) {
    var JSONObject = new Object();
    var Art = [];
    var artCategory = [];
    if ($("input[name='catebox']:checked").html() == undefined) {
      alert("请选择类型");
      return false;
    }
    $("input[name='catebox']:checked").each(function() {
        var artcateEle = new Object();
        artcateEle.cateName = $(this).attr('value');
        artCategory.push(artcateEle);
      })
      //alert(artcategory);
    if ($("#uploadtable tbody").children().html() == undefined) {
      alert("请添加画作");
      return false;
    } else {
      $("#uploadtable tbody tr").each(function() {
        var artEle = new Object();
        var artlistEle = new Object();
        var artist = [];
        artEle._id = $(this).children("td:eq(10)").text();
        artEle.title = $(this).children("td:eq(0)").text();
        artEle.size = $(this).children("td:eq(5)").text();
        artEle.price = $(this).children("td:eq(1)").text();
        artEle.decsription = $(this).children("td:eq(6)").text();
        artEle.year = $(this).children("td:eq(11)").text();
        artEle.cateName = $(this).children("td:eq(2)").text();
        artEle.posterURL = $(this).children("td:eq(7)").text();
        artEle.posterThumbnailURL = $(this).children("td:eq(8)").text();

        //add multiView
        var multiObj = {};
        var multiView = []
        var val = $(this).children("td:eq(12)").text().split(",");
        var len = val.length;
        // 最后一个为空值
        for (var j = 0; j < len - 1; j++) {
          multiObj.url = val[j];
          multiView.push(multiObj);
        }
        artEle.multiView = multiView;
        //artEle.recommended=$(this).children("td:eq(10)").text();

        //add art list 
        artlistEle._id = $(this).children("td:eq(9)").text();
        artlistEle.name = $(this).children("td:eq(3)").text();
        artist.push(artlistEle);
        artEle.artist = artlistEle;

        //add art
        Art.push(artEle);
      })
    }
    //弃用此方法生成ID改由后台生成
    /*JSONObject._id=id_24();*/
    JSONObject._id = '';
    JSONObject.subject = $("#subject").val();
    JSONObject.decsription = $("#decsription").val();
    JSONObject.vanue = $("#vanue").val();
    JSONObject.curator = $("#curator").val();
    JSONObject.startDate = $("#startDate").val();
    JSONObject.startTime = $("#startTime").val();
    JSONObject.endDate = $("#endDate").val();
    JSONObject.endTime = $("#endTime").val();
    //JSONObject.posterURL = $("#posterURL").val();
    //JSONObject.posterThumbnailURL = $("#posterURL").val();
    JSONObject.address = $("#address").val();
    JSONObject.Art = Art;
    JSONObject.artCategory = artCategory;
    //ajax请求并返回 图片链接
    if ($("#submitExhisecond").parent().parent().children('.modal-body').children().val() == "1") {
      //上传到服务器并且存储数据到数据库,不支持老IE
      var formData = new FormData($("#uploadForm")[0]);
      //var formData = new FormData($("#posterURL"));
      $.ajax({
        url: 'http://' + host + '/exhi/uploadPic/1',
        type: 'POST',
        data: formData,
        async: true, //异步执行
        cache: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        beforeSend: function() {
          $('#submitExhisecond').attr('disabled', 'disabled');
          $('.modal-body').append('<div><progress><span id="objprogress">85</span>%</progress></div>')

        },
        completed: function() {


        },
        success: function(returndata) {


        },
        error: function(returndata) {

          $('#submitExhisecond').removeAttr('disabled');
          $('progress').remove();
          alert("error on upload picture,Please upload again! ");
        },
        statusCode: {


          200: function(returndata) {
            var Scene = [];
            JSONObject.posterURL = returndata.msg;
            JSONObject.posterThumbnailURL = returndata.msg;
            JSONObject.Scene = returndata.Scene;
            submitExhi(JSONObject);

          },
          //文件冲突
          203: function(data) {
            $('#submitExhisecond').removeAttr('disabled');
            $('progress').parent().remove();

            alert('upload failed! msg:' + data.msg);

          }

        }
      });


      /*  $('#posterURL').ajaxfileupload({*/
      /*   $('input[type="file"]').ajaxfileupload({
      'action':'http://'+host+'/art/uploadPic/1'*/
      /* });*/


    } else if ($("#submitExhisecond").parent().parent().children('.modal-body').children().val() == "2") {
      //上传到cloudinary并且存储数据到数据库
      //上传到服务器并且存储数据到数据库,不支持老IE
      var formData = new FormData($("#uploadForm")[0]);
      //var formData = new FormData($("#posterURL"));
      $.ajax({
        url: 'http://' + host + '/exhi/uploadPic/2',
        type: 'POST',
        data: formData,
        async: true, //异步执行
        cache: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        beforeSend: function() {
          $('#submitExhisecond').attr('disabled', 'disabled');
          $('.modal-body').append('<div><progress><span id="objprogress">85</span>%</progress><p>正在上传</p></div>');

        },
        completed: function() {
          $('progress').parent().remove();

        },
        success: function(returndata) {


        },
        error: function(returndata) {

          $('#submitExhisecond').removeAttr('disabled');

          $('progress').parent().remove();
          alert("error on upload picture,Please upload again!");
        },
        statusCode: {


          200: function(returndata) {
            JSONObject.Scene = returndata.Scene;
            JSONObject.posterURL = returndata.posterURL;
            JSONObject.posterThumbnailURL = returndata.posterThumbnailURL;
            submitExhi(JSONObject);

          },
          //文件冲突
          203: function(data) {
            $('#submitExhisecond').removeAttr('disabled');
            $('progress').parent().remove();

            alert('upload failed!:' + data.msg);

          }

        }
      });
    }


    //执行成功执行此函数
    //
    //alert(JSONObject);

  })

});


//update exhi


var updateExhi = function(exhi) {
  var host = window.location.host;
  var url = "http://" + host + "/exhi/updateExhi";
  //  alert(url);
  $.ajax({
    type: "post",
    dataType: "json",
    url: "http://" + host + "/exhi/updateExhi/" + exhi._id,

    data: exhi,

    success: function(data) {
      //$('#myModel').modal('hide');
      var toExhi = function() {
        window.location.href = "http://" + host + "/exhi";
      }

      $('progress').attr('value', '100');
      $('progress').after('<p>上传已成功,2秒后刷新</p>');
      setTimeout('toExhi()', 2000);
      alert("Save Successful");
    },
    error: function(data) {
      //alert(' Can not enter Server' + url);
    },
    statusCode: {


      200: function(data) {

        // location.reload();;
      },
      506: function(data) {
        alert(' Server Internal Error ,' + data.error + '');

      }

    }
  })


}

//formatted exhi data
/*$(function() {
  var host = window.location.host;
  $("#updateExhisecond").on('click', function(e) {
    var JSONObject = new Object();
    var Art = [];
    var artCategory = [];
    if ($("input[name='catebox']:checked").html() == undefined) {
      alert("请选择类型");
      return false;
    }
    $("input[name='catebox']:checked").each(function() {
        var artcateEle = new Object();
        artcateEle.cateName = $(this).attr('value');
        artCategory.push(artcateEle);
      })
      
    if ($("#uploadtable tbody").children().html() == undefined) {
      alert("请添加画作");
      return false;
    } else {
      $("#uploadtable tbody tr").each(function() {
        var artEle = new Object();
        var artlistEle = new Object();
        var artist = [];
        artEle._id = $(this).children("td:eq(10)").text();
        artEle.title = $(this).children("td:eq(0)").text();
        artEle.size = $(this).children("td:eq(5)").text();
        artEle.price = $(this).children("td:eq(1)").text();
        artEle.decsription = $(this).children("td:eq(6)").text();
        artEle.year = $(this).children("td:eq(11)").text();
        artEle.cateName = $(this).children("td:eq(2)").text();
        artEle.posterURL = $(this).children("td:eq(7)").text();
        artEle.posterThumbnailURL = $(this).children("td:eq(8)").text();

        //add multiView
        var multiObj = {};
        var multiView = []
        var val = $(this).children("td:eq(12)").text().split(",");
        var len = val.length;
        // 最后一个为空值
        for (var j = 0; j < len - 1; j++) {
          multiObj.url = val[j];
          multiView.push(multiObj);
        }
        artEle.multiView = multiView;
       
        artlistEle._id = $(this).children("td:eq(9)").text();
        artlistEle.name = $(this).children("td:eq(3)").text();
        artist.push(artlistEle);
        artEle.artist = artlistEle;

        //add art
        Art.push(artEle);
      })
    }
    //弃用此方法生成ID改由后台生成
   
    var url =window.location.pathname.split("/");
    var id = url[3];
    JSONObject._id = id;
    JSONObject.subject = $("#subject").val();
    JSONObject.decsription = $("#decsription").val();
    JSONObject.vanue = $("#vanue").val();
    JSONObject.curator = $("#curator").val();
    JSONObject.startDate = $("#startDate").val();
    JSONObject.startTime = $("#startTime").val();
    JSONObject.endDate = $("#endDate").val();
    JSONObject.endTime = $("#endTime").val();
    //JSONObject.posterURL = $("#posterURL").val();
    //JSONObject.posterThumbnailURL = $("#posterURL").val();
    JSONObject.address = $("#address").val();
    JSONObject.Art = Art;
    JSONObject.artCategory = artCategory;
    //ajax请求并返回 图片链接
    if ($("#updateExhisecond").parent().parent().children('.modal-body').children().val() == "1") {
      //上传到服务器并且存储数据到数据库,不支持老IE
      var formData = new FormData($("#uploadForm")[0]);
      //var formData = new FormData($("#posterURL"));
      $.ajax({
        url: 'http://' + host + '/exhi/uploadPic/1',
        type: 'POST',
        data: formData,
        async: true, //异步执行
        cache: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        beforeSend: function() {
          $('#updateExhisecond').attr('disabled', 'disabled');
          $('.modal-body').append('<div><progress><span id="objprogress">85</span>%</progress></div>')

        },
        completed: function() {


        },
        success: function(returndata) {


        },
        error: function(returndata) {

          $('#updateExhisecond').removeAttr('disabled');
          $('progress').remove();
          alert("error on upload picture,Please upload again! ");
        },
        statusCode: {


          200: function(returndata) {
            var Scene = [];
            JSONObject.posterURL = returndata.msg;
            JSONObject.posterThumbnailURL = returndata.msg;
            JSONObject.Scene = returndata.Scene;
            updateExhi(JSONObject);

          },
          //文件冲突
          203: function(data) {
            $('#updateExhisecond').removeAttr('disabled');
            $('progress').parent().remove();

            alert('upload failed! msg:' + data.msg);

          }

        }
      });



    } else if ($("#updateExhisecond").parent().parent().children('.modal-body').children().val() == "2") {
      //上传到cloudinary并且存储数据到数据库
      //上传到服务器并且存储数据到数据库,不支持老IE
      var formData = new FormData($("#uploadForm")[0]);
      //var formData = new FormData($("#posterURL"));
      $.ajax({
        url: 'http://' + host + '/exhi/uploadPic/2',
        type: 'POST',
        data: formData,
        async: true, //异步执行
        cache: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        beforeSend: function() {
          $('#updateExhisecond').attr('disabled', 'disabled');
          $('.modal-body').append('<div><progress><span id="objprogress">85</span>%</progress><p>正在上传</p></div>');

        },
        completed: function() {
          $('progress').parent().remove();

        },
        success: function(returndata) {


        },
        error: function(returndata) {

          $('#updateExhisecond').removeAttr('disabled');

          $('progress').parent().remove();
          alert("error on upload picture,Please upload again!");
        },
        statusCode: {


          200: function(returndata) {
            JSONObject.Scene = returndata.Scene;
            JSONObject.posterURL = returndata.posterURL;
            JSONObject.posterThumbnailURL = returndata.posterThumbnailURL;
            updateExhi(JSONObject);

          },
          //文件冲突
          203: function(data) {
            $('#updateExhisecond').removeAttr('disabled');
            $('progress').parent().remove();

            alert('upload failed!:' + data.msg);

          }

        }
      });
    }


    //执行成功执行此函数
    //
    //alert(JSONObject);

  })

});


*/



//in the exhi list 

//method post
$(function() {
  $(".btnPublishExhi").on('click', function(e) {
    var JSONObject = new Object();
    //$(this).parent().children('#ID')；
    JSONObject._id = $(this).val();
    //JSONObject._id=$(this).parent().children('#t_beacon_id').val();


    //alert(JSONObject._id);
    publishExhi(JSONObject);


  })
})
var publishExhi = function(exhi) {

  var host = window.location.host; //alert(beacon._id);
  $.ajax({
    type: "post",
    dataType: "json",
    url: "http://" + host + "/exhi/publish",
    data: exhi,
    success: function(data) {
      if (data != "") {

        alert('success');
        location.reload();

      }
    }
  });
}


//method update
$(function() {
  $(".btnSetExhi").on('click', function(e) {
    var JSONObject = new Object();
    //$(this).parent().children('#ID')；
    JSONObject._id = $(this).val();
    //JSONObject._id=$(this).parent().children('#t_beacon_id').val();


    //alert(JSONObject._id);
    setExhi(JSONObject);


  })
})
var setExhi = function(exhi) {

  var host = window.location.host; //alert(beacon._id);
  window.location.href = "http://" + host + "/exhi/updateExhi/" + exhi._id;

}

//method delete
$(function() {
  $(".btnDeleteExhi").on('click', function(e) {
    var JSONObject = new Object();
    //$(this).parent().children('#ID')；
    JSONObject._id = $(this).val();
    //alert(JSONObject._id);
     if(confirm("确定要清空数据:"+JSONObject._id+"?"))
  {
  deleteExhi(JSONObject);
  }
    //JSONObject._id=$(this).parent().children('#t_beacon_id').val();


    //alert(JSONObject._id);
    


  })
})
var deleteExhi = function(exhi) {

  var host = window.location.host; //alert(beacon._id);
  $.ajax({
    type: "delete",
    dataType: "json",
    url: "http://" + host + "/exhi",
    data: exhi,
    success: function(data) {

    },
    statusCode: {


      200: function(data) {
        if (data != "") {

          alert(data.msg);
          location.reload();

        }
      },
      //
      203: function(data) {
        if (data != "") {

          alert(data.msg);
          //location.reload();

        }

      }

    }

  });
}



//上传图片并且存储数据到数据库
/*$(function() {
  $(document).on("click", "#submitExhisecond", function(e) {
    var host = window.location.host;
    //获取数据
    var JSONObject = new Object();
    var artist = new Object();
    artist._id = $("#selectArtist").val();
    artist.name = $("#selectArtist").find("option:selected").text()
    JSONObject._id = '';
    JSONObject.title = $("#arttitle").val();
    JSONObject.artist = artist;
    JSONObject.price = $("#artprice").val();
    JSONObject.size = $("#artsize").val();
    JSONObject.decsription = $("#artdecsription").val();
    JSONObject.year = $("#artyear").val();
    JSONObject.cateName = $("#artcateName").val();
    JSONObject.posterURL = '';
    JSONObject.posterThumbnailURL = '';

  

  })

});*/
/***********************************post操作******************************************/
/******************************post method******************************************/
$(function() {
  $(document).on("click", "#submitExhifirst", function(e) {
    var isEmpty = "";

    $("form input,textarea").each(function() {
      if ($(this).val() == '' && $(this).attr('placeholder') != '') {
        isEmpty = isEmpty + $(this).attr('placeholder') + ',';


      }
    })
    if ($(".deleteMutiPic").length == 0) {
      isEmpty = isEmpty + "细节图" + ','
    }

    if ($("#showposterURL").attr("src") == "") {
      isEmpty = isEmpty + "主图片"
    }


    if (isEmpty != '') {
      alert("以下信息不可为空：" + isEmpty);
      // $('#myModel').modal('hide');
    }
    //post art
    var JSONObject = new Object();
    var Art = [];
    var artCategory = [];
    if ($("input[name='catebox']:checked").html() == undefined) {
      alert("请选择类型");
      return false;
    }
    $("input[name='catebox']:checked").each(function() {
        var artcateEle = new Object();
        artcateEle.cateName = $(this).attr('value');
        artCategory.push(artcateEle);
      })
      //alert(artcategory);
    if ($("#uploadtable tbody").children().html() == undefined) {
      alert("请添加画作");
      return false;
    } else {
      $("#uploadtable tbody tr").each(function() {
        var artEle = new Object();
        var artlistEle = new Object();
        var artist = [];
        artEle._id = $(this).children("td:eq(10)").text();
        artEle.title = $(this).children("td:eq(0)").text();
        artEle.size = $(this).children("td:eq(5)").text();
        artEle.price = $(this).children("td:eq(1)").text();
        artEle.decsription = $(this).children("td:eq(6)").text();
        artEle.year = $(this).children("td:eq(11)").text();
        artEle.cateName = $(this).children("td:eq(2)").text();
        artEle.posterURL = $(this).children("td:eq(7)").text();
        artEle.posterThumbnailURL = $(this).children("td:eq(8)").text();

        //add multiView
        var multiObj = {};
        var multiView = []
        var val = $(this).children("td:eq(12)").text().split(",");
        var len = val.length;
        // 最后一个为空值
        for (var j = 0; j < len - 1; j++) {
          multiObj.url = val[j];
          multiView.push(multiObj);
        }
        artEle.multiView = multiView;
        //artEle.recommended=$(this).children("td:eq(10)").text();

        //add art list 
        artlistEle._id = $(this).children("td:eq(9)").text();
        artlistEle.name = $(this).children("td:eq(3)").text();
        artist.push(artlistEle);
        artEle.artist = artlistEle;

        //add art
        Art.push(artEle);
      })
    }
    //弃用此方法生成ID改由后台生成
    /*JSONObject._id=id_24();*/

    JSONObject._id = '';
    JSONObject.subject = $("#subject").val();
    JSONObject.decsription = $("#decsription").val();
    JSONObject.vanue = $("#vanue").val();
    JSONObject.curator = $("#curator").val();
    JSONObject.startDate = $("#startDate").val();
    JSONObject.startTime = $("#startTime").val();
    JSONObject.endDate = $("#endDate").val();
    JSONObject.endTime = $("#endTime").val();
    //JSONObject.posterURL = $("#posterURL").val();
    //JSONObject.posterThumbnailURL = $("#posterURL").val();
    JSONObject.address = $("#address").val();
    JSONObject.Art = Art;
    JSONObject.artCategory = artCategory;
    JSONObject.posterURL = $("#showposterURL").attr("src");
    JSONObject.posterThumbnailURL = $("#showposterURL").attr("src");
    /* JSONObject.Scene = returndata.Scene;
            JSONObject.posterURL = returndata.posterURL;
            JSONObject.posterThumbnailURL = returndata.posterThumbnailURL;*/
    var Scene = [];
    $("#uploadmutitable tbody").children().each(function() {
      var multiViewEle = {};
      multiViewEle.url = $(this).children("th").children("a").children("img").attr('src');
      Scene.push(multiViewEle);
      console.log(Scene);
    })


    JSONObject.Scene = Scene;
    var host = window.location.host;
    var url = "http://" + host + "/exhi/postExhi";
    $.ajax({
      type: "post",
      dataType: "json",
      url: url,
      //url: "http://127.0.0.1:18080/exhi/postExhi",
      /*url: "http://smartgallery.duapp.com/exhi/postExhi",*/
      data: JSONObject,
      statusCode: {


        200: function(data) {


          alert('success，exhi is "' + data.msg);

        },
        506: function(data) {
          alert(' Server Internal Error ,' + data.msg + '');

        }

      }
    });



  })

});


/******************************update method******************************************/
$(function() {
  $(document).on("click", "#updateExhifirst", function(e) {
    var isEmpty = "";

    $("form input,textarea").each(function() {
      if ($(this).val() == '' && $(this).attr('placeholder') != '') {
        isEmpty = isEmpty + $(this).attr('placeholder') + ',';


      }
    })
    if ($(".deleteMutiPic").length == 0) {
      isEmpty = isEmpty + "细节图" + ','
    }

    if ($("#showposterURL").attr("src") == "") {
      isEmpty = isEmpty + "主图片"
    }


    if (isEmpty != '') {
      alert("以下信息不可为空：" + isEmpty);
      // $('#myModel').modal('hide');
    }
    //post art
    var JSONObject = new Object();
    var Art = [];
    var artCategory = [];
    if ($("input[name='catebox']:checked").html() == undefined) {
      alert("请选择类型");
      return false;
    }
    $("input[name='catebox']:checked").each(function() {
        var artcateEle = new Object();
        artcateEle.cateName = $(this).attr('value');
        artCategory.push(artcateEle);
      })
      //alert(artcategory);
    if ($("#uploadtable tbody").children().html() == undefined) {
      alert("请添加画作");
      return false;
    } else {
      $("#uploadtable tbody tr").each(function() {
        var artEle = new Object();
        var artlistEle = new Object();
        var artist = [];
        artEle._id = $(this).children("td:eq(10)").text();
        artEle.title = $(this).children("td:eq(0)").text();
        artEle.size = $(this).children("td:eq(5)").text();
        artEle.price = $(this).children("td:eq(1)").text();
        artEle.decsription = $(this).children("td:eq(6)").text();
        artEle.year = $(this).children("td:eq(11)").text();
        artEle.cateName = $(this).children("td:eq(2)").text();
        artEle.posterURL = $(this).children("td:eq(7)").text();
        artEle.posterThumbnailURL = $(this).children("td:eq(8)").text();

        //add multiView
        var multiObj = {};
        var multiView = []
        var val = $(this).children("td:eq(12)").text().split(",");
        var len = val.length;
        // 最后一个为空值
        for (var j = 0; j < len - 1; j++) {
          multiObj.url = val[j];
          multiView.push(multiObj);
        }
        artEle.multiView = multiView;
        //artEle.recommended=$(this).children("td:eq(10)").text();

        //add art list 
        artlistEle._id = $(this).children("td:eq(9)").text();
        artlistEle.name = $(this).children("td:eq(3)").text();
        artist.push(artlistEle);
        artEle.artist = artlistEle;

        //add art
        Art.push(artEle);
      })
    }
    //弃用此方法生成ID改由后台生成
    /*JSONObject._id=id_24();*/
    var ourl =window.location.pathname.split("/");
    var oid = ourl[3];
    JSONObject._id = oid;
    
    JSONObject.subject = $("#subject").val();
    JSONObject.decsription = $("#decsription").val();
    JSONObject.vanue = $("#vanue").val();
    JSONObject.curator = $("#curator").val();
    JSONObject.startDate = $("#startDate").val();
    JSONObject.startTime = $("#startTime").val();
    JSONObject.endDate = $("#endDate").val();
    JSONObject.endTime = $("#endTime").val();
    //JSONObject.posterURL = $("#posterURL").val();
    //JSONObject.posterThumbnailURL = $("#posterURL").val();
    JSONObject.address = $("#address").val();
    JSONObject.Art = Art;
    JSONObject.artCategory = artCategory;
    JSONObject.posterURL = $("#showposterURL").attr("src");
    JSONObject.posterThumbnailURL = $("#showposterURL").attr("src");
    /* JSONObject.Scene = returndata.Scene;
            JSONObject.posterURL = returndata.posterURL;
            JSONObject.posterThumbnailURL = returndata.posterThumbnailURL;*/
    var Scene = [];
    $("#uploadmutitable tbody").children().each(function() {
      var multiViewEle = {};
      multiViewEle.url = $(this).children("th").children("a").children("img").attr('src');
      Scene.push(multiViewEle);
      console.log(Scene);
    })


    JSONObject.Scene = Scene;
     var host = window.location.host;
  var url = "http://" + host + "/exhi/updateExhi/"+oid;
    $.ajax({
      type: "post",
      dataType: "json",
      url: url,
      //url: "http://127.0.0.1:18080/exhi/postExhi",
      /*url: "http://smartgallery.duapp.com/exhi/postExhi",*/
      data: JSONObject,
      statusCode: {


        200: function(data) {


          alert('success，exhi is "' + data.msg);
        if (data.newid) {
         
           window.location.href = "http://" + host + "/exhi/updateExhi/"+data.newid;
     
        }

        },
        506: function(data) {
          alert(' Server Internal Error ,' + data.msg + '');

        }

      }
    });



  })

});

/***********************************图片选择操作******************************************/

//绑定按钮
$(function() {
  $("#searchPic").on('click', function(e) {
    searchPictures();


  })
})

var searchPictures = function() {
  //alert(beacon._id);
  var host = window.location.host;
  var pictures = {};
  pictures.picName = $("#picName").val();
  pictures.picFolder = $("#picFolder").val();
  pictures.picType = $("#picType").val();
  console.log(pictures);

  var sendurl = "http://" + host + "/odata/pictures?$filter=";
  var picturesNum = 0;
  var picturesArr = [];
  if (pictures.picName) {
    picturesNum++;
    picturesArr.push({
      key: "picName",
      value: pictures.picName
    });
    // alert(art.downprice.trim());
    // sendurl = sendurl + "name eq " + "'" + pictures.name.trim() + "'";

  };

  if (pictures.picFolder) {
    picturesNum++;
    picturesArr.push({
      key: "picFolder",
      value: pictures.picFolder
    });
    // alert(art.upprice.trim());

    //alert(sendurl);
  };

  if (pictures.picType) {
    picturesNum++;
    picturesArr.push({
      key: "picType",
      value: pictures.picType
    });
    // alert(art.upprice.trim());

    //alert(sendurl);
  };
  if (picturesArr) {
    var glen = picturesArr.length;
    if (glen == 1) {
      sendurl = sendurl + picturesArr[0].key + " eq " + "'" + picturesArr[0].value + "'"
    } else if (glen > 1) {
      sendurl = sendurl + picturesArr[0].key + " eq " + "'" + picturesArr[0].value + "'"
      for (var i = 1; i < glen; i++) {
        sendurl = sendurl + " and " + picturesArr[i].key + " eq " + "'" + picturesArr[i].value + "'"
      }
    }


  } else sendurl = "http://" + host + "/odata/pictures";


  // alert(urlo);
  $.ajax({
    type: "get",
    //dataType: "json",
    //url: "http://smartgallery.duapp.com/odata/arts?$filter=price le"++"",
    url: sendurl,
    //data: beacon,
    success: function(data) {
      if (data != "") {

      //  alert(data.value.length + "：成功");
        showpicturesData(data);

      }
    },
    statusCode: {

      551: function() {
        alert("跨域错误，稍后再试");
        //location.reload() ;
      }
    }
  });
}


//绑定数据
var showpicturesData = function(data) {
  var j = 0;
  $("#picLists").children("tbody").children("tr").remove();
  for (var i = 0; i <= data.value.length - 1; i++) {
    (function(i) {
      j = i + 1;


      //add multiView

      $("#picLists").children("tbody").append('<tr><th> <a href="' + data.value[i].picURL + '"  target="_blank" class="thumbnail" ><img style="width:80px;height:80px" src="' +
        data.value[i].picURL + '" alt="..."></a></th><td>' + data.value[i].picName +
        '</td><td>' + data.value[i].picFolder + '</td><td>' + data.value[i].picType +
        '</td>' + '<td><button class="btn btn-info  btn-xs toPosterURL"  type="button">设为主图片</button></td>' +
        '</br><td><button class="btn btn-info  btn-xs toMultiView"  type="button">设为细节图</button></td>' +
        '<td style="display:none" id="pid">' + data.value[i].id + '</td>' +

        '</tr>'

      );


    })(i);
  }
}

//设置为主图片
//choose picture btn 
$(function() {
  $(document).on("click", ".toPosterURL", function(e) {

    var picURL = $(this).parent().parent().children('th').children("a").children("img").attr('src');
    $("#showposterURL").attr('src', picURL);

  })

});
//设置为细节图

$(function() {
  $(document).on("click", ".toMultiView", function(e) {

    /* $(".addsearch").on("click",function(e){*/
    var picURL = $(this).parent().parent().children('th').children("a").children("img").attr('src');
    var picName = $(this).parent().parent().children("td:eq(0)").text();
    var picFolder = $(this).parent().parent().children("td:eq(1)").text();
    var picType = $(this).parent().parent().children("td:eq(2)").text();



    $("#uploadmutitable").children("tbody").append('<tr><th> <a href="' +
      picURL + '"  target="_blank" class="thumbnail" ><img style="width:80px;height:80px" src="' +
      picURL + '" alt="..."></a></th><td>' + picName +
      '</td><td>' + picFolder + '</td><td>' + picType +
      '</td>' + '<td><button class="btn btn-warning  btn-xs deleteMutiPic"  type="button">取消</button></td>' +



      '</tr>');


  });
});

//取消细节图
$(function() {
  $(document).on("click", ".deleteMutiPic", function(e) {
    $(this).parent().parent().remove();



  });
});