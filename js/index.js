$(function () {
    var w = $(window).width(), h = $(window).height(), PSV;
    $(".loading").width(w).height(h);
    var div = document.getElementById('container');
	var imgpath=GetQueryString("ip")||'sun.jpg';
	var title=decodeURI(GetQueryString("tt")||'全景图');
	$(document).attr("title",title);
    loadPredefinedPanorama();
    $(window).resize(function () {
        w = $(window).width(), h = $(window).height();
        $("#container,#container canvas").width(w).height(h);
    });
    if (GetQueryString("share") == "T") {
        loadscript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function () {
            loadscript("http://qiniu.mgcc.com.cn/wechat/js/base64.min.js", function () {
                loadscript("js/share.js")
            })
        })
    }
	function loadPredefinedPanorama() {
		PSV = new PhotoSphereViewer({
			panorama: imgpath,
			container: div,
			time_anim: false,
			navbar: true,
			size: {
				width: w,
				height: h
            },
            loading_msg:'',
            onready: function () {
                $(".loading").hide();
            }
        });
        PSV.fitToContainer();
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

    function loadscript(url, callback) {
        var script = document.createElement("script");
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") { script.onreadystatechange = null; callback && callback(); }
            }
        }
        else {
            script.onload = function () {
                callback && callback();
            }
        }
        var v = GetQueryString("ver") || "1";
        script.src = (url.indexOf("?") > 0) ? (url + "&ver=" + v) : (url + "?ver=" + v);
        var _s = document.getElementsByTagName("script")[0];
        _s.parentNode.insertBefore(script, _s);
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