/**
 * Created by Administrator on 2016/5/17.
 */

;(function($,finallyLoad){
$(document).ready(function(){
    finallyLoad.createScript = function(src,id,isSogou){
        var script=document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", src);
        if(isSogou && id){
            script.setAttribute("sogouid", id);
        }
        var heads = document.getElementsByTagName("head");
        if(heads.length)
            heads[0].appendChild(script);
        else
            document.documentElement.appendChild(script);
    };

    finallyLoad.getQueryString = function(key,url){
        var theRequest = {};
        if(!url){
            url = decodeURIComponent(url);
            url = location.hash.replace(/^#!?/, '')+(location.search && location.hash.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search);
        }
        url = decodeURIComponent(url);
        url = url.substring(url.indexOf('?'),url.length);
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            if(str.indexOf("?")>-1){
                str = str.replace("?","");
            }
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest[key];
    };
    finallyLoad.isSogouRemove = function (){
        var result = JSON.parse(sessionStorage.getItem("origin")) ||finallyLoad.getQueryString("origin");
        if(finallyLoad.getQueryString("origin")){
            localStorage.setItem("origin",JSON.stringify(finallyLoad.getQueryString("origin")));
            sessionStorage.setItem("origin",JSON.stringify(finallyLoad.getQueryString("origin")));
        }
        //搜狗更改
        if(result === "Sogou"){
            $(".vux-header").remove();
            finallyLoad.createScript("http://fuwu.wap.sogou.com/static/partner.js","053",true);
        }
    };
    finallyLoad.isSogouRemove();

    
});
})(window.Zepto,  window.finallyLoad ? window.finallyLoad : window.finallyLoad = {});
