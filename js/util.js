/**
 * cookie 相关
 * @type {{prefix: string, set: cookie.set, get: cookie.get, del: cookie.del, name: cookie.name}}
 */
var cookie = {
    prefix: "",
    set: function (name, val, timeout) {
        expires = new Date, expires.setTime(expires.getTime() + 1e3 * timeout), document.cookie = this.name(name) + "=" + escape(val) + "; expires=" + expires.toGMTString() + "; path=/"
    },
    get: function (name) {
        for (cookie_name = this.name(name) + "=", cookie_length = document.cookie.length, cookie_begin = 0; cookie_begin < cookie_length;) {
            if (value_begin = cookie_begin + cookie_name.length, document.cookie.substring(cookie_begin, value_begin) == cookie_name) {
                var valStr = document.cookie.indexOf(";", value_begin);
                return -1 == valStr && (valStr = cookie_length), unescape(document.cookie.substring(value_begin, valStr))
            }
            if (cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1, 0 == cookie_begin)break
        }
        return null
    },
    del: function (name) {
        new Date;
        document.cookie = this.name(name) + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/"
    },
    name: function (name) {
        return this.prefix + name
    }
};

/**
 * 微信锁,防止方法重复提交.
 */
var wx_lock = {
    open: function (fname) {
        if (wx_lock[fname + "_lock"] == "on") {
            return true;
        } else {
            wx_lock[fname + "_lock"] = "on";
            return false;
        }
    },
    close: function (fname) {
        wx_lock[fname + "_lock"] = "";
    }
};

/**
 * 通用
 * @type {{tips: util.tips}}
 */
var util = {
    //提示
    tips: function (content, timeout) {
        $(".indexct_tips").remove();
        var msgHtml = '<div class="indexct_tips">' +
            '<p>' + content + '</p>' +
            '<div class="indexct_tips_overlay"></div>' +
            '</div>';
        $(msgHtml).appendTo("body").fadeOut(timeout || 300000);
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
    //提示
    prize1:function(getPrizeTxt){
    	$(".prize-layer").remove();
    	var prizeStr = '<div class="prize-layer">'+
			'<div class="prize-wrap">'+
				'<div class="prize-txt">'+
					'<h1>恭喜你！</h1>'+
					'<p>'+'获得'+getPrizeTxt+'</p>'+
				'</div>'+
				'<div class="information">'+
				'<input type="text" name="" id="name" value="" placeholder="请填写姓名"/>'+
					'<input type="text" name="" id="" value="" placeholder="请填写手机号码获取"/><label for=""></label>'+
					'<section class="express-area">'+
			            '<a id="expressArea" href="javascript:void(0)">'+
			                '<dl>'+
			                    '<dd>省   市   区/县</dd>'+
			                '</dl>'+
			           '</a>'+
			        '</section>'+
					'<input type="text" name="" id="" value="" placeholder="请输入地址"/><label for=""></label>'+
				'</div>'+
				'<div class="prize-confirm">'+
					'<img class="tell" src="../cap-img/getPrize.png"/>'+
				'</div>'+
			'</div>'+
		'</div>';
		$(prizeStr).appendTo("body");
    },
    prize2:function(getPrizeTxt){
    	$(".prize-layer").remove();
    	var prizeStr = '<div class="prize-layer">'+
			'<div class="prize-wrap">'+
				'<div class="prize-txt">'+
					'<h1>'+'获得'+'恭喜你！</h1>'+
					'<p>'+getPrizeTxt+'</p>'+
				'</div>'+
				'<div class="information">'+
					'<input type="text" name="" id="" value="" placeholder="请填写手机号码获取"/><label for=""></label>'+
				'</div>'+
				'<div class="prize-confirm">'+
					'<img class="tell" src="../cap-img/getPrize.png"/>'+
				'</div>'+
			'</div>'+
		'</div>';
		$(prizeStr).appendTo("body");
		
    },
    prize3:function(){
    	$(".prize-layer").remove();
    	var prizeStr = '<div class="prize-layer">'+
			'<div class="prize-wrap">'+
				'<div class="prize-txt">'+
					'<h1>非常遗憾！</h1>'+
					'<p>再来一次，再来一次吧</p>'+
				'</div>'+
				'<div class="prize-confirm">'+
					'<img class="onceAgain" src="../cap-img/losePrize.png"/>'+
				'</div>'+
			'</div>'+
		'</div>';
		$(prizeStr).appendTo("body");
    },
    confirm: function (content, callback) {
        $(".weui_dialog_confirm").remove();
        var msgHtml = '<div class="weui_dialog_confirm"><div class="weui_mask"></div><div class="weui_dialog">' +
            '<div class="weui_dialog_hd"><strong class="weui_dialog_title">确认</strong></div>' +
            '<div class="weui_dialog_bd">' + content + '</div>' +
            '<div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog primary">确定</a>' +
            '<a href="javascript:;" class="weui_btn_dialog default" onclick="$(\'.weui_dialog_confirm\').remove();">取消</a></div></div>' +
            '</div>';
        $(msgHtml).appendTo("body");
        $(".weui_btn_dialog.primary").one("click", function () {
            $.isFunction(callback) && callback();
            $('.weui_dialog_confirm').remove();
        })
    },
    //是否微信
    isWeixn: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    //验证手机号
    isMobel: function (value) {
        if (/^(1)\d{10}$/g.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    //截取字符串 str：字符串  ，len 需要截取的长度
    cutString: function (str, len) {
        if (str.length > len) {
            str = str.substring(0, len);
            return str;
        } else {
            return str;
        }
    },
    //截取掉最后一个字符
    cutLastOne:function(str){
    	str = str.substring(0,str.length-1);
    	return str;
    },
    //获取url参数
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    //判断是否有特殊字符
    matchSpecial: function (str) {
        var containSpecial = RegExp(/[(\~)(\!)(\@)(\#)(\$)(\%)(\s)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\,)(\')(\")(\.)(\/)(\<)(\>)(\?)(\【)(\】)(\（)(\）)]/gi);
        return ( str.match(containSpecial) );
    },
    //判断是否有特殊字符
    containSpecial: function (s) {
        var containSpecial = RegExp(/[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\,)(\')(\")(\.)(\/)(\<)(\>)(\?)(\【)(\】)(\（)(\）)]+/);
        return ( containSpecial.test(s) );
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
	_elseios:function () {
	    var ua = navigator.userAgent.toLowerCase();
	    if (/(iPad|iPod)/i.test(ua)) {
	        return true;
	    } else {
	        return false;
	    }
	}
};
$(function(){
    window.sysinfo && window.sysinfo.cookie && window.sysinfo.cookie.pre && (cookie.prefix = window.sysinfo.cookie.pre);
})