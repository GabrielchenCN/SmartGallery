//get beacons data  
$(function() {
  var host = window.location.host;
  var url = "http://" + host + "/beacons/info";
  //  alert(url);
  $.ajax({
    type: "get",
    //async: true,
    url: url,
    //url: "http://127.0.0.1:18080/exhi/postExhi",
    /*url: "http://smartgallery.duapp.com/exhi/postExhi",*/

    success: function(data) {
      //  绑定数据
      if (data != "") {
       // alert("请先选择beacon");
        for (var i = 0; i <= data.length - 1; i++) {
          //添加beacons到选择框
          $("#chooseBeacons").append('<option value = "' + data[i]._id + '" >' + data[i]._id + '</option>')


        }
        //绑定选择beacons的响应事件
        $(document).on("change", "#chooseBeacons", function(e) {

          BindingBeaconData(data, $("#chooseBeacons").val());
        })



      } else alert("跨域请求错误！");

      //请求exhi数据

      var url1 = "http://" + host + "/exhi/part"
      $.ajax({
        type: "get",
        //async: true,
        url: url1,
        success: function(exdata) {
          //请求exhi数据
          if (exdata != "") {

            for (var i = 0; i <= exdata.length - 1; i++) {
              //添加beacons到选择框
              $("#chooseExhi").append('<option value = "' + exdata[i]._id + '" >' + exdata[i].subject + '</option>')


            }
            //绑定选择exhi的响应事件
            /*$(document).on("change", "#chooseExhi", function(e) {

              BindingArtData($("#chooseExhi").val());
            })*/



          } else alert("跨域请求错误！");
        },
        error: function(exdata) {
          alert("Server Error , Please Refresh");
          //location.reload();

        }
      });

      
    },
    error: function(data) {
      alert("Server Error , Please Refresh");
      location.reload();

    }
  });

})

//绑定选择exhi的响应事件
$(function(){

  $(document).on("change", "#chooseExhi", function(e) {

              BindingArtData($("#chooseExhi").val());
            })

})



// Binding  Beacon Data
var BindingBeaconData = function(data,id) {

   var len=data.length;
    $("#beaconsArtTable").children("tbody").children("tr").remove();
   for(var i = 0 ;i<len;i++){
     if(data[i]._id==id){
       $("#beacons_id").val(data[i]._id);
       $("#beaconUUID").val(data[i].beaconUUID);
       $("#major").val(data[i].major);
       $("#minor").val(data[i].minor);
       $("#triggerDistance").val(data[i].triggerDistance);
       $("#triggerDuration").val(data[i].triggerDuration);
       $("#triggerMessage").val(data[i].triggerMessage);
        $("#itemNum").val(data[i].itemNum);
       
      $("#chooseExhi").val(data[i].Exhi);

        for(var j = 0 ,len1 =data[i].Art.length;j<len1;j++){
          //add multiView to string
    var multiView = '';
    var len2 = data[i].Art[j].multiView.length;
    for(var n=0 ;n<len2;n++){
      multiView = multiView +data[i].Art.multiView[n].url+",";
    }
           
              console.log(data[i].Art[j].artist.name);

        $("#beaconsArtTable").children("tbody").append('<tr><th scope = "row"></th><td>' + data[i].Art[j].title + '</td><td>' + data[i].Art[j].price + '</td><td>' + data[i].Art[j].cateName + '</td><td>' + data[i].Art[j].artist.name + '</td><td><button class="btn btn-danger  btn-xs deletesearch" >delete</button></td>' +
       '<td class="size" style="display:none">' + data[i].Art[j].size + '</td>' +
       '<td class="decsription" style="display:none">' + data[i].Art[j].decsription + '</td>' +
       '<td class="posterURL" style="display:none">' + data[i].Art[j].posterURL + '</td>' +
       '<td class="posterThumbnailURL" style="display:none">' + data[i].Art[j].posterThumbnailURL + '</td>' +
       '<td class="artist_id" style="display:none">' + data[i].Art[j].artist._id + '</td>' +
       '<td class="art_id" style="display:none">' + data[i].Art[j]._id + '</td>' +
       '<td class="year" style="display:none">' + data[i].Art[j].year + '</td>' +
       '<td class="multiView" style="display:none">' + multiView + '</td>' +
       '</tr>');
       

      }
       
       
     }
   }
  


}

// Binding Art Data
var BindingArtData = function(id) {
  var host = window.location.host;
  var url1 = "http://" + host + "/exhi/"+id+"/arts";
  $("#exhiArtTable").children("tbody").children("tr").remove();
  if(id!="emptyValue"){

  $.ajax({
        type: "get",
        //async: true,
        url: url1,
        success: function(exdata) {
          //请求exhi数据
          if (exdata != "") {
            
            for(var i= 0,len=exdata.length;i<len;i++){
               var multiView = '';
    var len2 = exdata[i].multiView.length;
    for(var n=0 ;n<len2;n++){
      multiView = multiView +exdata[i].multiView[n].url+",";
    }
         $("#exhiArtTable").children("tbody").append('<tr><th scope = "row">' + i + '</th><td>' + exdata[i].title + '</td><td>' + exdata[i].price + '</td><td>' + exdata[i].cateName + '</td><td>' + exdata[i].artist.name + '</td><td><button class="btn btn-info  btn-xs addsearch"  type="button">add</button></td>' +

          '<td style="display:none">' + exdata[i].size + '</td>' +
          '<td style="display:none">' + exdata[i].decsription + '</td>' +
          '<td style="display:none">' + exdata[i].posterURL + '</td>' +
          '<td style="display:none">' + exdata[i].posterThumbnailURL + '</td>' +
          '<td style="display:none">' + exdata[i].artist._id + '</td>' +
          '<td style="display:none">' + exdata[i]._id + '</td>' +
          '<td style="display:none">' + exdata[i].year + '</td>' +
          '<td style="display:none">' + multiView + '</td>' +
          '</tr>'

        );

            }
            


          } else alert("跨域请求错误！");
        },
        error: function(exdata) {
          alert("Server Error , Please Refresh");
          //location.reload();

        }
      }); 
    

  }

}


//delete art in the beacons
$(function() {
  $(document).on("click", ".deletesearch", function(e) {
    /*$(".deletesearch").on("click",function(e){*/
    $(this).parent().parent().remove();


  })

});

//post beacons Data
var submitBeacons = function(beacons) {
  var host = window.location.host;
  var url = "http://" + host + "/beacons/update";
  //  alert(url);
  $.ajax({
    type: "post",
    dataType: "json",
    url: url,
    //url: "http://127.0.0.1:18080/exhi/postExhi",
    /*url: "http://smartgallery.duapp.com/exhi/postExhi",*/
    data: beacons,
    success: function(exdata) {
      alert("success");
    },
    error:function(exdata) {
      alert("error");
    },
    statusCode: {

      200: function() {
        //alert('success，beaconUUID: "' + beacons.beaconUUID + '"');
        location.reload();
      },
      506: function() {
        alert(' Server Internal Error');

      }

    }
    /* ,
       success: function (data) {
           if (data != "") {
                
               alert('success，Exhibition subject name is "'+exhi.subject+'"');
               location.reload();
               
           }
       }*/
  });
}

//packaging Data


$(function() {
  $("#submitBeacons").on('click', function(e) {
    var JSONObject = new Object();
    var Art = [];
    var artcategory = [];
    if ($("#chooseExhi").val() == "emptyValue") {
      alert("请绑定展会否则不可以上传数据！");
      return false;
    }

    if ($("#beaconsArtTable").children('tbody').html().trim() == "") {
      alert("请添加画作");
      return false;
    } else {
      $("#beaconsArtTable tbody tr").each(function() {
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
        //artEle.recommended=$(this).children("td:eq(10)").text();
        //add multiView
         var multiObj = {};
         var multiView = []
         var val =$(this).children("td:eq(12)").text().split(",");
         var len = val.length;
         // 最后一个为空值
         for(var j=0 ;j<len-1;j++){
          multiObj.url = val[j];
          multiView.push(multiObj);
          }
         artEle.multiView = multiView;
        //add art list 
        artlistEle._id = $(this).children("td:eq(9)").text();
        artlistEle.name = $(this).children("td:eq(3)").text();
        artist.push(artlistEle);
       //console.log(artlist);
        artEle.artist = artlistEle;

        //add art
        Art.push(artEle);
        
      })
    }
    //弃用此方法生成ID改由后台生成
    /*JSONObject._id=id_24();*/
    JSONObject._id = $("#beacons_id").val();
    JSONObject.beaconUUID = $("#beaconUUID").val();
    JSONObject.major = $("#major").val();
    JSONObject.minor = $("#minor").val();
    JSONObject.triggerDistance = $("#triggerDistance").val();
    JSONObject.triggerDuration = $("#triggerDuration").val();
    JSONObject.triggerMessage = $("#triggerMessage").val();
    JSONObject.itemNum = $("#itemNum").val();
    JSONObject.Exhi = $("#chooseExhi").val();
    
    JSONObject.Art = Art;
    
    submitBeacons(JSONObject);
    //alert(JSONObject);

  })

});

//add btn
$(function() {
  $(document).on("click", ".addsearch", function(e) {
    /* $(".addsearch").on("click",function(e){*/
    var title = $(this).parent().parent().children("td:eq(0)").text();
    var price = $(this).parent().parent().children("td:eq(1)").text();
    var cateName = $(this).parent().parent().children("td:eq(2)").text();
    var artist = $(this).parent().parent().children("td:eq(3)").text();
    //extra information
    var size = $(this).parent().parent().children("td:eq(5)").text();
    var decsription = $(this).parent().parent().children("td:eq(6)").text();
    var posterURL = $(this).parent().parent().children("td:eq(7)").text();
    var posterThumbnailURL = $(this).parent().parent().children("td:eq(8)").text();
    var artist_id = $(this).parent().parent().children("td:eq(9)").text();
    var art_id = $(this).parent().parent().children("td:eq(10)").text();
    var year = $(this).parent().parent().children("td:eq(11)").text();
    var multiView = $(this).parent().parent().children("td:eq(12)").text();
    $("#beaconsArtTable").children("tbody").append('<tr><th scope = "row"></th><td>' + title + '</td><td>' + price + '</td><td>' + cateName + '</td><td>' + artist + '</td><td><button class="btn btn-danger  btn-xs deletesearch" >delete</button></td>' +
      '<td class="size" style="display:none">' + size + '</td>' +
      '<td class="decsription" style="display:none">' + decsription + '</td>' +
      '<td class="posterURL" style="display:none">' + posterURL + '</td>' +
      '<td class="posterThumbnailURL" style="display:none">' + posterThumbnailURL + '</td>' +
      '<td class="artist_id" style="display:none">' + artist_id + '</td>' +
      '<td class="art_id" style="display:none">' + art_id + '</td>' +
      '<td class="year" style="display:none">' + year + '</td>' +
      '<td class="multiView" style="display:none">' + multiView + '</td>' +
      '</tr>');


  });
});