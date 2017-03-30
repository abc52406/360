$(function () {
	var w = $(window).width(), h = $(window).height();
	var imgpath=GetQueryString("ip")||'sun.jpg';
	var title=decodeURI(GetQueryString("tt")||'全景图');
	$(document).attr("title",title);
	loadPredefinedPanorama();
	function loadPredefinedPanorama() {
		var div = document.getElementById('container');
		var PSV = new PhotoSphereViewer({
			panorama: imgpath,
			container: div,
			time_anim: false,
			navbar: true,
			size: {
				width: w,
				height: h
			}
		});
	}
	function upload() {
		var file = document.getElementById('pano').files[0];
		var reader = new FileReader();
		reader.onload = function() {
			var div = document.getElementById('container');
			var PSV = new PhotoSphereViewer({
				panorama: reader.result,
				container: div,
				time_anim: false,
				navbar: true,
				size: {
					width: w,
					height: h
				}
			});
		};
		reader.readAsDataURL(file);
	}
});
function GetQueryString(prop, url) {
    var re = new RegExp("[?|&]" + prop + "=([^\\&]*)", "i");
    if (!url) {
        url = document.location.search;
    }
    else {
        if (url.indexOf("?") >= 0) {
            url = url.split("?")[1];
        }
        else {
            url = "";
        }
    }
    var a = re.exec(url);
    if (a == null) return "";
    return a[1];
}

var mpid = 'feC-43Ecgh09oDfg-3C';
var share_pic = GetQueryString("si")||'';
var share_url;
var weChatUrlBase =  'http://server.pengbo.info/wxapi/jssdkjsonp?mpid='+ mpid +'&callback=1234&callurl=';
var weChatUrl;
var sharetitle=GetQueryString("st")||'全景图';
var sharedesc=GetQueryString("sd")||'';
wechatConfig();
function wechatConfig() {
    weChatUrl = weChatUrlBase + location.href.replace(/&/g, '@').split('#')[0];
    share_url = window.location.href;
    $.ajax({
        type: 'post',
        url: weChatUrl,
        dataType: "jsonp",
        crossDomain: !0,
        jsonpCallback: "callbackfn",
        success: function(data) {
            var config_obj = data;
            wx.config({
                debug: false,
                appId: config_obj.appId,
                timestamp: config_obj.timestamp,
                nonceStr: config_obj.nonceStr,
                signature: config_obj.signature,
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });
            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: sharetitle,
                    desc: sharedesc,
                    link: share_url.replace(/\@/g, '#'),
                    imgUrl: share_pic,
                    success: function (res) {
						_hmt.push(['_trackEvent', 'click', 'sharefriend','','']);
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                    }
                });

                // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
                wx.onMenuShareTimeline({
                    title: sharedesc,
                    link: share_url.replace(/\@/g, '#'),
                    imgUrl: share_pic,
                    success: function (res) {
						_hmt.push(['_trackEvent', 'click', 'sharefriendspace','','']);
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                    }
                });
            });
            wx.error(function(res){
            });
        },
        error:function(xhr, type) {
        }
    });
}