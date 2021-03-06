var appVersion = "";
var appKey;
//获取版本号
window.RXXBWallet.getAppConfig("getApp");

//版本回调
function getApp(res) {
    var result = changeToObject(res);
    appVersion = result.appVersion?result.appVersion:"1.0.0";
    appKey = result.appKey?result.appKey:"-";
    initPage(appVersion,appKey);
}

//获取数据渲染页面
function initPage(appVersion,appKey) {
    var pageUrl = serverUrl+"/api/wallet/redirect/apply/card";
    var pageDate = {
        app_version: appVersion,
        app_key: appKey
    };
    pageDate = JSON.stringify(pageDate);
    window.RXXBWallet.doPostWithEncrypt(pageUrl, pageDate, "getPage");
}

//异常函数
function methodError(res) {
    var result = changeToObject(res);
    if(result.errorCode == 0){
        //无网
        window.RXXBWallet.doToastMsg(result.errorMsg);
    }else if(result.errorCode == 1){
        //连接失败
        window.RXXBWallet.doToastMsg(result.errorMsg);
    }else if(result.errorCode == 2){
        //json入参错误
        window.RXXBWallet.doToastMsg(result.errorMsg);
    }
}


function getPage(res) {
    if(res) {
        var page = JSON.parse(res);
        if (page.retcode == 1) {
            var resData = page.data;
            var list = resData.list;
            for (var i = 0; i < list.length; i++) {
                var node = list[i];
                var is_new = node.is_new == 1 ? 'new' : '';
                var is_recommend = node.is_recommend == 1 ? "jian" : "";
                var imgPic = node.urlPic?node.urlPic:"";
                var applyTo = node.linkTo?node.linkTo:"javascript:void(0);";
                var item = '<li class="'+is_new+' '+is_recommend+'" data-link = "'+applyTo+'">'
                    + '<div class="imgBox">'
                    + '<img src="' + imgPic + '"/>'
                    + '</div>'
                    + '<div class="tipBox">'
                    + '<div class="tip_l">'
                    + '<p class="bankName">' + node.name + '</p>'
                    + '<p class="tip">' + node.description + '</p>'
                    + '</div>'
                    + '<div class="tip_r">'
                    +'<a href="javascript:void(0);" class="applyBtn">申请</a>'
                    + '</div>'
                    + '</div>'
                    + '</li>';
                item = $(item).unbind("click").bind("click",function () {
                    window.location.href = $(this).attr("data-link");
                });
                item.appendTo($(".banks"));
            }
        } else {
            // alert("获取数据错误")
            showEmpty();
        }
    }else{
        initPage(appVersion,appKey);
    }

}

//异常函数
function methodError(res) {
    var result = JSON.parse(res);
    if(result.errorCode == 0){
        //无网
        window.RXXBWallet.doToastMsg(result.errorMsg);
    }else if(result.errorCode == 1){
        //连接失败
        window.RXXBWallet.doToastMsg(result.errorMsg);
    }else if(result.errorCode == 2){
        //json入参错误
        window.RXXBWallet.doToastMsg(result.errorMsg);
    }else{
        window.RXXBWallet.doToastMsg(result.errorMsg);
    }
}