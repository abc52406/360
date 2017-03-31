var mpid = 'ex-9eE-V8sdwH96D';
var share_pic = GetQueryString("si")||'';
var share_url;
var weChatUrlBase = 'http://wechat.xiaoyaomall.com/wxapi/jssdkjsonp?mpid=' + mpid +'&callback=1234&urlmode=base64&callurl=';
var weChatUrl;
var sharetitle=GetQueryString("st")||'全景图';
var sharedesc=GetQueryString("sd")||'';
wechatConfig();
function wechatConfig() {
    weChatUrl = weChatUrlBase + location.href.replace(/&/g, '@').split('#')[0].EncodeBase64();
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