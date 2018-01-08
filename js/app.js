$(function(){
	var util = {
	    //提示
	    tips: function (content, timeout) {
	        $(".indexct_tips").remove();
	        var msgHtml = '<div class="indexct_tips">' +
	            '<p>' + content + '</p>' +
	            '<div class="indexct_tips_overlay">'+
	           '<img src="loadimg/live_weixin.png"/>'
	            '</div>' +
	            '</div>';
	        $(msgHtml).appendTo("body");
	    },
	    //提示
	    successTips: function (content, timeout) {
	        $(".successTips").remove();
	        var msgHtml = '<div class="successTips">' +
	            '<p>' + content + '</p>' +
	            '<div class="successTips_overlay"></div>' +
	            '</div>';
	        $(msgHtml).appendTo("body").fadeOut(timeout || 1000);
	//      util.tips("ssss")
			
	    },
	    isWeixn: function () {
	        var ua = navigator.userAgent.toLowerCase();
	        if (ua.match(/MicroMessenger/i) == "micromessenger") {
	            return true;
	        } else {
	            return false;
	        }
	    },
	    _IsIOS:function () {
		    var ua = navigator.userAgent.toLowerCase();
		    if (ua.match(/iPhone\sOS/i) == "iphone os") {
		        return true;
		    } else {
		        return false;
		    }
		},
		_IsAndroid:function () {
		    var ua = navigator.userAgent.toLowerCase();
		    if (ua.match(/Android/i) == "android") {
		        return true;
		    } else {
		        return false;
		    }
		},
		getQueryString : function () {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	        var r = window.location.href.split("=");
	        if (r != null) return unescape(r[1]);
	        return null;
   		},
   		getQueryStringMore: function (name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return unescape(r[2]);
	        return null;
    	}
	};
	
	$(".close-btn").on("click",function(){
		if($(".dialog").hasClass("dialog--open")){
			$(".dialog").addClass("dialog--close")
		}
		
		if(util._IsAndroid()){
		    window.inmjump.finish();
		}else if(util._IsIOS()) {
			location.href = "iosclose"
		}else{
			return
		}
			
	});
//	window.open("","_self").close();
	$(".detail-btn").on("click",function(){
		var inf_para = util.getQueryString();
		if(util._IsAndroid()){
//			alert()
			window.inmjump.changeStatusbar();
		}
		window.location.href = "yearshow.html"+'?appCard='+inf_para;
		//window.location.href = "yearshow.html"+'?appCard='+inf_para;
	});
	
})


