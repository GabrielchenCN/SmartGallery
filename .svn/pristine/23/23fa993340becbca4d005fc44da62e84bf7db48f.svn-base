var searchGalleries = function() {
  //alert(beacon._id);
  var host = window.location.host;
  var galleries = {};
  galleries.name = $("#galleryName").val();
  galleries.city = $("#city").val();
  galleries.address = $("#address").val();
  console.log(galleries);

  var sendurl = "http://" + host + "/odata/galleries?$filter=";
  var galleriesNum = 0;
  var galleriesArr = [];
  if (galleries.name) {
    galleriesNum++;
    galleriesArr.push({
      key: "name",
      value: galleries.name
    });

    // alert(art.downprice.trim());
    // sendurl = sendurl + "name eq " + "'" + galleries.name.trim() + "'";

  };

  if (galleries.city) {
    galleriesNum++;
    galleriesArr.push({
      key: "city",
      value: galleries.city
    });
    // alert(art.upprice.trim());

    //alert(sendurl);
  };

  if (galleries.address) {
    galleriesNum++;
    galleriesArr.push({
      key: "address",
      value: galleries.address
    });
    // alert(art.upprice.trim());

    //alert(sendurl);
  };
  if (galleriesArr) {
    var glen = galleriesArr.length;
    if (glen == 1) {
      sendurl = sendurl + galleriesArr[0].key + " eq " + "'" + galleriesArr[0].value + "'"
    } else if (glen > 1) {
      sendurl = sendurl + galleriesArr[0].key + " eq " + "'" + galleriesArr[0].value + "'"
      for (var i = 1; i < glen; i++) {
        sendurl = sendurl + " and " + galleriesArr[i].key + " eq " + "'" + galleriesArr[i].value + "'"
      }
    }


  } else sendurl = "http://" + host + "/odata/galleries";


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
        showGalleriesData(data);

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

//btn to searchGalleries
$(function() {
  $("#searchGallery").on('click', function(e) {
    searchGalleries();


  })
})

var showGalleriesData = function(data) {
  var j = 0;
  $("#galleryLists").children("tbody").children("tr").remove();
  for (var i = 0; i <= data.value.length - 1; i++) {
    (function(i) {
      j = i + 1;
      
      //add multiView
      $("#galleryLists").children("tbody").append('<tr><th scope = "row">' + j + '</th><td>' + data.value[i].name + '</td><td>' + data.value[i].city + '</td><td>' + data.value[i].address + '</td>' + 
        '<td><button class="btn btn-info  btn-xs gallerySetting"  type="button">配置</button></td>' +
        '<td><button class="btn btn-danger  btn-xs deleteGallery"  type="button">删除</button></td>'+

        '<td style="display:none" id="gid">' + data.value[i].id + '</td>' +
        '</tr>'

      );

    })(i);
  }
}

//btn to set gallery
$(function() {
  $(document).on("click", ".gallerySetting", function(e) {
    var name = $(this).parent().parent().children("td:eq(0)").text(); 
    //  alert("click：" + name);
    window.location.href = "/galleries/gallerySetting/" + name; 
  })
})

//btn to delete gallery
$(function() {
  $(document).on("click", ".deleteGallery", function(e) {
     if (!confirm("确认要删除画廊："+$(this).parent().parent().children("td:eq(0)").text()+"?")) {
            return false;
        }
      else{
      var id = $(this).parent().parent().children("td:eq(5)").text();
      var JSONObject = new Object();
      JSONObject.id=id;
      var host = window.location.host;
      $.ajax({
        type: "delete",
        dataType: "json",
        url: "http://" + host + "/galleries",

        data: JSONObject,

        success: function(data) {
          //$('#myModel').modal('hide');


        },
        error: function(data) {
          alert("删除失败！");
        },
        statusCode: {


          200: function(data) {
            alert("删除成功!");
            searchGalleries();
          },
          203: function(data) {
            alert(' Server Internal Error ,' + msg + '');

          }

        }
      })

      }
  })
})

//btn to add gallery
$(function() {
  $(document).on("click", ".addGallery", function(e) {

    window.location.href = "/galleries/addGallery";
  })
})


//保证信息不为空
$(function() {
  $(document).on("click", "#submitGalleryfirst", function(e) {
    var isEmpty = "";

    $("#uploadForm input,textarea").each(function() {
      if ($(this).val() == '' && $(this).attr('placeholder')!="gid") {
        isEmpty = isEmpty + $(this).attr('placeholder') + ',';


      }
    })
    if (isEmpty != '') {
      alert("以下信息不可为空：" + isEmpty);
      $('#myModel').modal('hide');
    }

    return false;



  })

});


//上传图片并且存储数据到数据库
$(function() {
  $(document).on("click", "#submitGalleryfirst", function(e) {
    var host = window.location.host;
    //获取数据
    var JSONObject = new Object();
    if ($("#gid").val()) {
      JSONObject._id = $("#gid").val();
      JSONObject.name = $("#galleryName").val();
      JSONObject.city = $("#city").val();
      JSONObject.address = $("#address").val();
      JSONObject.posterURL = $("#showposterURL").attr("src");
      JSONObject.longitude = $("#longitude").val();
      JSONObject.latitude = $("#latitude").val();
      JSONObject.description = $("#galleryDescription").val();

      $.ajax({
        type: "post",
        dataType: "json",
        url: "http://" + host + "/galleries/ModifyGallery",

        data: JSONObject,

        success: function(data) {
          //$('#myModel').modal('hide');


        },
        error: function(data) {
          alert("上传失败！");
        },
        statusCode: {


          200: function(data) {
            alert("上传成功!");
            location.reload();
          },
          506: function(data) {
            alert(' Server Internal Error ,' + data.error + '');

          }

        }
      })
    }
  else {
      //JSONObject._id = $("#gid").val();
      JSONObject.name = $("#galleryName").val();
      JSONObject.city = $("#city").val();
      JSONObject.address = $("#address").val();
      JSONObject.posterURL = $("#showposterURL").attr("src");
      JSONObject.longitude = $("#longitude").val();
      JSONObject.latitude = $("#latitude").val();
      JSONObject.description = $("#galleryDescription").val();

      $.ajax({
        type: "post",
        dataType: "json",
        url: "http://" + host + "/galleries/addGallery",

        data: JSONObject,

        success: function(data) {
          //$('#myModel').modal('hide');


        },
        error: function(data) {
          alert("上传失败！");
        },
        statusCode: {


          200: function(data) {
            alert("上传成功!");
            // location.reload();
          },
          506: function(data) {
            alert(' Server Internal Error ,' + data.error + '');

          }

        }
      })

  }



  });

});

//绑定搜索按钮
$(function() {
  $("#searchPicture").on('click', function(e) {
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

      $("#picLists").children("tbody").append('<tr><th> <a href="' + data.value[i].picURL + '"  target="_blank" class="thumbnail" ><img style="width:80px" src="' + data.value[i].picURL + '" alt="..."></a></th><td>' + data.value[i].picName + '</td><td>' + data.value[i].picFolder + '</td><td>' + data.value[i].picType + '</td>' + '<td><button class="btn btn-info  btn-xs deletePic"  type="button">选为主图片</button></td>' +

        '<td style="display:none" id="pid">' + data.value[i].id + '</td>' +

        '</tr>'

      );


    })(i);
  }
}

//choose picture btn 
$(function() {
  $(document).on("click", ".deletePic", function(e) {

    var picURL = $(this).parent().parent().children('th').children("a").children("img").attr('src');
    $("#showposterURL").attr('src', picURL);

  })

});