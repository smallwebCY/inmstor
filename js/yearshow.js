/**
 * cookie 相关
 * @type {{prefix: string, set: cookie.set, get: cookie.get, del: cookie.del, name: cookie.name}}
 */
var cookie = {
	prefix: "",
	set: function(name, val, timeout) {
		expires = new Date, expires.setTime(expires.getTime() + 1e3 * timeout), document.cookie = this.name(name) + "=" + escape(val) + "; expires=" + expires.toGMTString() + "; path=/"
	},
	get: function(name) {
		for(cookie_name = this.name(name) + "=", cookie_length = document.cookie.length, cookie_begin = 0; cookie_begin < cookie_length;) {
			if(value_begin = cookie_begin + cookie_name.length, document.cookie.substring(cookie_begin, value_begin) == cookie_name) {
				var valStr = document.cookie.indexOf(";", value_begin);
				return -1 == valStr && (valStr = cookie_length), unescape(document.cookie.substring(value_begin, valStr))
			}
			if(cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1, 0 == cookie_begin) break
		}
		return null
	},
	del: function(name) {
		new Date;
		document.cookie = this.name(name) + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/"
	},
	name: function(name) {
		return this.prefix + name
	}
};
//提示竖屏
var util = {
	//提示
	tips: function(content, timeout) {
		$(".indexct_tips").remove();
		var msgHtml = '<div class="indexct_tips">' +
			'<p>' + content + '</p>' +
			'<div class="indexct_tips_overlay">' +
			'</div>' +
			'</div>';
		$('body').append(msgHtml);
	},
	//提示
	successTips: function(content, timeout) {
		$(".successTips").remove();
		var msgHtml = '<div class="successTips">' +
			'<div class="successTips_overlay">' +
			'<p>' + content + '</p>' +
			'</div>' +
			'</div>';
		$(msgHtml).appendTo("body").fadeOut(timeout || 1000);
		//      util.tips("ssss")

	},
	beforSuccessTips: function(src) {
		$(".successTips").remove();
		var msgHtml = '<div class="successTips">' +
			'<div class="successTips_overlay">' +
			'<img src=' + src + ' />' +
			'</div>' +
			'</div>';
		$(msgHtml).appendTo("body");
		//      util.tips("ssss")

	},
	isWeixn: function() {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	_IsIOS: function() {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/iPhone\sOS/i) == "iphone os") {
			return true;
		} else {
			return false;
		}
	},
	_IsAndroid: function() {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/Android/i) == "android") {
			return true;
		} else {
			return false;
		}
	},
	getQueryString: function() {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.href.split("=");
		if(r != null) return r[1];
		return null;
	},
	getQueryStringMore: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
};
//横屏时处理
$(window).bind('orientationchange', function(e) {
	//		alert()
	util.tips("请在竖屏状态使用");
	//	    var evtObj = e||window.event;
	//	    evtObj.preventDefault();
	if(window.orientation == 0 || window.orientation == 180) {
		//          $("body").attr("class", "portrait");
		$(".indexct_tips").remove();
		orientation = 'portrait';
		//          return false;
	} else if(window.orientation == 90 || window.orientation == -90) {
		//          $("body").attr("class", "landscape");
		$(".indexct_tips").remove();
		orientation = 'landscape';
		util.tips("请在竖屏状态使用");
		//          $(document).on("touchmove",function(evt){
		//				var e0vtObj = evt||window.event;
		//				evtObj.preventDefault();
		//			})
		//          return false;
	}
});
var info = {
	userId: util.getQueryString(),
	data: '3130417',
	data2: '2364517',
	data3: '3746623',
	data4: '3236528',
	data5: '3479562',
	relinltime: 0
}
$(".set-back").on("click", function() {
	if(util._IsAndroid()) {
		window.inmjump.finish();
	} else if(util._IsIOS()) {
		location.href = "iosclose"
	} else {
		return
	}
});
$(".set-share").on("click", function() {
	console.log(1)
	if(util._IsAndroid()) {
		window.inmjump.shareYearData();
	} else if(util._IsIOS()) {
		location.href = "iosshare"
	} else {
		return
	}
});
$(".cut-share").on("click", function() {
		console.log(1)
		if(util._IsAndroid()) {
			window.inmjump.shareYearData();
		} else if(util._IsIOS()) {
			location.href = "iosshare"
		} else {
			return
		}
	})
$(function() {
	if(info.userId == null || info.userId == '') {
		$(".detail-btn-a").on("click", function() {
			var phone = $("#j_phone").val();
			var verify = $(".phone").val();
			var vipinfo = {
				phone: phone,
				verify: verify
			}
			var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/,
				flag = phoneReg.test(vipinfo.phone);
			console.log(vipinfo.verify);
			if(!flag) {
				if(vipinfo.phone == '') {
					util.successTips("号码不能为空");
				} else {
					util.successTips("请正确输入手机号码");
				};load-wrap
			} else {
				if(vipinfo.verify == '') {
					util.successTips("验证码不能为空");
				}else{
					$.ajax({
						type: "get",
						url: "https://inmyearshow.inm.cc:7002/api/InmAppPhone/GetCardByPhone?phone=" + vipinfo.phone + "&smsCode=" + vipinfo.verify,
						async: true,
						datatype: "json",
						headers: {
							"Accept": "application/json;charset=utf-8",
							"contentType": "application/json;charset=utf-8"
						},
						success: function(str) {
							console.log(str)
							if(str == '' || str == null) {
								util.successTips("手机号码或验证码不正确");
							} else {
								console.log(str);
								$("#somedialog").css("display", "none");
								getdata(str);
								
//								cookie.set("usermd5", str, 1000);
//								var _savetime = parseInt(cookie.get('savetime'));
								$(".ticket-get").on("click", function() {
									util.beforSuccessTips("https://apitst.inm.cc/showyear/img/loading.gif");
//									var _usermd5 = parseInt(cookie.get('usermd5'));
//									console.log(_usermd5)
									$.ajax({
										type: "get",
										url: "https://inmyearshow.inm.cc:7002/api/InmAppTicket/GetStarLevelByUserId?appCard=" + str,
										//url:"http://192.168.2.222:7002/api/InmAppTicket/GetStarLevelByUserId?appCard="+info.data,
										datatype: "json",
										onreadystatechange: function(status) {
											console.log(ajax.status)
										},
										async: true,
										success: function(tick) {
											console.log(str)
											var sta = parseInt(tick);
											if(sta == 0) {
												util.successTips("你已领取", 2000);
											} else if(sta = '请求频繁') {
												util.successTips("请求频繁", 2000);
											} else {
												util.successTips("领取成功<br />请到电子券查看", 2000);
											}
										},
										error: function(XMLHttpRequest, textStatus, errorThrown) {
											console.log(str);
											util.successTips("网络错误", 2000);
										}
									});
								});
							}
						},
						error: function() {
							util.successTips("服务器异常");
						}
					});
			//			$("#somedialog").css("display","none");
				}
			}
		})
	} else {
		$("#somedialog").css("display", "none");
		getdata(info.userId);
	}

	function getdata(appCard) {
		$.ajax({
			type: "get",
			//url:"http://192.168.2.222:7002/api/InmAppH5/GetSummaryByUserId?appCard="+info.data5,
			url: "https://inmyearshow.inm.cc:7002/api/InmAppH5/GetSummaryByUserId?appCard=" + appCard,
			datatype: "json",
			async: true,
			timeout: 5000,
			complete: function(XMLHttpRequest, status) {
				if(status == 'timeout') {
//					window.location.href = "https://apitst.inm.cc/showyear/errorpage/error.html?appCard="+appCard;
				}
			},
			headers: {
				"Accept": "application/json;charset=utf-8",
				"contentType": "application/json;charset=utf-8"
			},
			success: function(str) {
				console.log(1)
				$(".load-wrap").css("display", "none");
				if(str == null || str == "") {
					util.successTips("数据加载失败", 2000);
				}
				console.log(str)
				var removeloading = function() {
						if(util._IsAndroid()) {
							window.inmjump.hideLoadingDialog();
							$(".load-wrap").css("display", "none");
						} else if(util._IsIOS()) {
							location.href = "ioscdialog";
							$(".load-wrap").css("display", "none");
						} else {
							$(".load-wrap").css("display", "none");
						}
					}
					//			removeloading()
					//获取数据 进行归类
				var dataInfo = {
					Integral: str.Integral,
					RegistTime: {
						year: new Date(str.RegistTime).getFullYear(),
						month: new Date(str.RegistTime).getMonth() + 1,
						day: new Date(str.RegistTime).getDate()
					},
					VipTime: str.VipTime,
					drinkPercent: [{
						value: str.Baking,
						name: '烘培'
					}, {
						value: str.Yogurt,
						name: '酸奶'
					}, {
						value: str.Milk,
						name: '牛奶'
					}, ],
					drinkQuantity: {
						CostMilk: str.CostMilk,
						CostYogurt: str.CostYogurt,
						MilkTotal: str.MilkTotal
					},
					MostCostType: str.MostCostType,
					TypeCountPri: str.TypeCountPri,
					TypeCountSec: str.TypeCountSec,
					CostTypeCount: str.CostTypeCount,
					MaxCostTime: {
						year: new Date(str.MaxCostTime).getFullYear(),
						month: new Date(str.MaxCostTime).getMonth() + 1,
						day: new Date(str.MaxCostTime).getDate()
					},
					DiscountTime: str.DiscountTime,
					DiscountMoney: str.DiscountMoney,
					CostIntegral: str.CostIntegral,
					CostTime: str.CostTime,
					TotalIntegral: str.TotalIntegral,
					LastLoginTime: {
						year: new Date(str.LastLoginTime).getFullYear(),
						month: new Date(str.LastLoginTime).getMonth() + 1,
						day: new Date(str.LastLoginTime).getDate()
					},
					StarLevel: str.StarLevel,
					Rank: str.Rank,
					Percent: str.Percent

				};
				//填充积分  判断积分 根据积分展示等级
				$("#count-number").attr("data-to", dataInfo.Integral);
				var identity = parseFloat(dataInfo.Integral);
				var _identityLvele = (0 <= identity && identity <= 10) ? 0 :
					(10 < (identity) && identity <= 20 ? 1 :
						(20 < (identity) && identity <= 25 ? 2 :
							(25 < (identity) && identity <= 40 ? 3 :
								(40 < (identity) && identity <= 100 ? 4 : 5))));
				switch(_identityLvele) {
					case 0:
						$(".identity").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/level/img-rich6.png) no-repeat center center",
							"background-size": "auto 100%"
						})
						break;
					case 1:
						$(".identity").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/level/img-rich5.png) no-repeat center center",
							"background-size": "auto 100%"
						})
						break;
					case 2:
						$(".identity").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/level/img-rich4.png) no-repeat center center",
							"background-size": "auto 100%"
						})
						break;
					case 3:
						$(".identity").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/level/img-rich3.png) no-repeat center center",
							"background-size": "auto 100%"
						})
						break;
					case 4:
						$(".identity").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/level/img-rich2.png) no-repeat center center",
							"background-size": "auto 100%"
						})
						break;
					case 5:
						$(".identity").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/level/img-rich1.png) no-repeat center center",
							"background-size": "auto 100%"
						})
						break;
				}
				//			console.log(_identityLvele);
				//注册年月日
				$(".count-number-year").attr("data-to", dataInfo.RegistTime.year);
				$(".count-number-month").attr("data-to", dataInfo.RegistTime.month);
				$(".count-number-day").attr("data-to", dataInfo.RegistTime.day);
				$(".count-number-all-day").attr("data-to", dataInfo.VipTime);
				//调用函数 执行生成 pie图 饼图
				consumerpie(dataInfo.drinkPercent);
				//调用  动态加载数据
				$('.timer').each(count);
				//两类产品消费量  （L） 判断量  展示 等级
				$(".pure-num").html(dataInfo.drinkQuantity.CostMilk);
				$(".sour-num").html(dataInfo.drinkQuantity.CostYogurt);
				$(".bowl-num").html(dataInfo.drinkQuantity.MilkTotal);
				// 根据 奶量 消耗 评定星级
				var _MilkTotal = parseInt(dataInfo.drinkQuantity.MilkTotal);
				if(0<=_MilkTotal&&_MilkTotal<=76) {
					$(".drink-level").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/drink/drink-level-01.png")
				} else if(76<_MilkTotal&&_MilkTotal<=116) {
					$(".drink-level").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/drink/drink-level-02.png")
				} else if(116<_MilkTotal&&_MilkTotal<=216) {
					$(".drink-level").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/drink/drink-level-03.png")
				} else {
					$(".drink-level").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/drink/drink-level-04.png")
				}
				//最喜欢的牛奶 和 搭配的食物
				if(dataInfo.MostCostType == null || dataInfo.MostCostType == 0) {
					$(".favorite-milk-name").html('没有什么');
				} else {
					$(".favorite-milk-name").html(dataInfo.MostCostType);
				};
				if((dataInfo.TypeCountPri == null || dataInfo.TypeCountPri == 0) && (dataInfo.TypeCountSec == null || dataInfo.TypeCountSec == 0)) {
					$(".favorite-else-name").find("span").eq(1).html('没有什么');
				} else {
					if(dataInfo.TypeCountPri == null || dataInfo.TypeCountPri == 0) {
						$(".favorite-else-name").find("span").eq(0).html('');
						$(".favorite-else-name").find("span").eq(1).html(dataInfo.TypeCountSec);
					} else {
						$(".favorite-else-name").find("span").eq(0).html(dataInfo.TypeCountPri);
						$(".favorite-else-name").find("span").eq(1).html('');
					};
				};
				//购买的食物种类  与对应的等级

				if(dataInfo.CostTypeCount !== null) {
					$(".favor-product-num").html(dataInfo.CostTypeCount);
					var _CostTypeCount = parseInt(dataInfo.CostTypeCount);
					if(0 <= _CostTypeCount && _CostTypeCount <= 30) {
						$(".attitude-sort-img").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/attitude/attitude-deep1.png");

					} else if(30 < _CostTypeCount && _CostTypeCount <= 60) {
						$(".attitude-sort-img").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/attitude/attitude-deep2.png");
					} else {
						$(".attitude-sort-changetxt").html("哇！2017居然尝试了");
						$(".attitude-sort-img").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/attitude/attitude-deep3.png");

					};
				};
				//消费最多的日期
				$(".attitude-max-year").html(dataInfo.MaxCostTime.year);
				$(".attitude-max-month").html(dataInfo.MaxCostTime.month);
				$(".attitude-max-day").html(dataInfo.MaxCostTime.day);
				//参与活动 获得和使用积分情况
				$(".consume-join-times").find("span").html(dataInfo.DiscountTime);
				$(".consume-use-points").find("span").html(dataInfo.CostIntegral);
				$(".consume-save-money").find("span").html(dataInfo.DiscountMoney);
				//持家指数
				var _DiscountTime = parseInt(dataInfo.DiscountTime);
				if(_DiscountTime == 0) {
					$(".consume-level").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/consume/consume-level-04.png");
				} else if(0 < _DiscountTime && _DiscountTime <= 4) {
					$(".consume-level").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/consume/consume-level-03.png");
				} else if(4 < _DiscountTime && _DiscountTime <= 10) {
					$(".consume-level").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/consume/consume-level-02.png");
				} else {
					$(".consume-level").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/consume/consume-level-01.png");
				};
				//关键词 和 消费状况 打败多少会员
				var _StarLevel = parseInt(dataInfo.StarLevel);
				if(_StarLevel == 1) {
					$(".keyword-img").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/keyword/keyword-img01.png");
				} else if(_StarLevel == 2) {
					$(".keyword-img").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/keyword/keyword-img02.png");

				} else if(_StarLevel == 3) {
					$(".keyword-img").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/keyword/keyword-img03.png");

				} else if(_StarLevel == 4) {
					$(".keyword-img").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/keyword/keyword-img04.png");

				} else {
					$(".keyword-img").find("img").attr("src", "https://apitst.inm.cc/showyear/img/yearshow/keyword/keyword-img05.png");

				};
				$("#summary-times").html(dataInfo.CostTime);
				$("#summary-points").html(dataInfo.TotalIntegral);
				$("#summary-beyond").html(dataInfo.Percent + '%');
				//			$(".summary-percent").html(dataInfo.Rank+'%');

				//距离2017 12 15 的天数
				//			var _LastLoginTime = Math.ceil(((new Date("2017-12-15T00:00:00")).getTime() - (new Date(dataInfo.LastLoginTime)).getTime())/(86400*1000));
				$(".distance-year-num").html(dataInfo.LastLoginTime.year);
				$(".distance-month-num").html(dataInfo.LastLoginTime.month);
				$(".distance-day-num").html(dataInfo.LastLoginTime.day);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				var relinksetInterval = setInterval(function() {
					//				console.log(info.relinltime)
					cookie.set("savetime", info.relinltime, 100);
					var _savetime = parseInt(cookie.get('savetime'));

					if(_savetime >= 1) {
						clearInterval(relinksetInterval);
//							window.location.href = "https://apitst.inm.cc/showyear/errorpage/error.html?appCard="+appCard;
					} else {

						getdata()
						info.relinltime++;
					}

				}, 2000)
			}
		});

		$.ajax({
			type: "get",
			//url:"http://inmyearshow.inm.cc:7002/api/InmAppH5/GetSharePageByUserId?appCard="+info.data,
			//url:"http://192.168.2.222:7002/api/InmAppH5/GetSharePageByUserId?appCard="+info.data2,
			url: "https://inmyearshow.inm.cc:7002/api/InmAppH5/GetSharePageByUserId?appCard=" + appCard,
			async: true,
			datatype: "json",
			success: function(str) {
				console.log(str)
				var shareDate = {
					IntegralOne: str.IntegralOne,
					MilkTwo: str.MilkTwo,
					MilkThree: str.MilkThree,
					DiscountFour: str.DiscountFour,
					LevelFive:str.LevelFive,
					Rank: str.Rank,
					Integral: str.Integral,
					Percent: str.Percent
				};
				$(".summary-list1").html(shareDate.IntegralOne);
				$(".summary-list2").html(shareDate.MilkTwo);
				$(".summary-list3").html(shareDate.MilkThree);
				$(".summary-list4").html(shareDate.DiscountFour);
				$(".summary-list5").html(shareDate.MilkTwo);
				$(".summary-list6").html(shareDate.LevelFive);
				$(".summary-percent").html(shareDate.Percent + '%');
					var _Integral = parseFloat(shareDate.Percent);
					var _identityLvele = 					(0<=_Integral&&_Integral<=60)?0:
					(60<(_Integral)&&_Integral<=70?1:
					(70<(_Integral)&&_Integral<=80?2:
					(80<(_Integral)&&_Integral<=90?3:
					(90<(_Integral)&&_Integral<=95?4:5))));
				switch(_identityLvele) {
					case 0:
						$(".summary-sort").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/shareout/integrallevel6.png) no-repeat center top",
							"background-size": "100%"
						})
						break;
					case 1:
						$(".summary-sort").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/shareout/integrallevel5.png) no-repeat center top",
							"background-size": "100%"
						})
						break;
					case 2:
						$(".summary-sort").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/shareout/integrallevel4.png) no-repeat center top",
							"background-size": "100%"
						})
						break;
					case 3:
						$(".summary-sort").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/shareout/integrallevel3.png) no-repeat center top",
							"background-size": "100%"
						})
						break;
					case 4:
						$(".summary-sort").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/shareout/integrallevel2.png) no-repeat center top",
							"background-size": "100%"
						})
						break;
					case 5:
						$(".summary-sort").css({
							"background": "url(https://apitst.inm.cc/showyear/img/yearshow/shareout/integrallevel1.png) no-repeat center top",
							"background-size": "100%"
						})
						break;
				}
			},
			error: function() {

			}
		});
	}

	//alert()
	$.fn.countTo = function(options) {
		options = options || {};

		return $(this).each(function() {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from: $(this).data('from'),
				to: $(this).data('to'),
				speed: $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals: $(this).data('decimals')
			}, options);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};

			$self.data('countTo', data);

			// if an existing interval can be found, clear it first
			if(data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if(typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if(loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if(typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0, // the number the element should start at
		to: 0, // the number the element should end at
		speed: 1000, // how long it should take to count between the target numbers
		refreshInterval: 100, // how often the element should be updated
		decimals: 0, // the number of decimal places to show
		formatter: formatter, // handler for formatting the value before rendering
		onUpdate: null, // callback method for every time the element is updated
		onComplete: null // callback method for when the element finishes updating
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
	// custom formatting example
	$('#count-number').data('countToOptions', {
		formatter: function(value, options) {
			return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
		}
	});

	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}
	//	$('.timer').each(count);
	//占比盘图 pie
	function consumerpie(drinkPercent) {
		var piechart = echarts.init(document.getElementById('piechart'));
		piechartoption = {
			title: {
				text: '2017年你的消费占比',
				subtext: '',
				x: '',
				textStyle: {
					color: '#000',
					fontSize: "14",
				}
			},
			tooltip: {
				show: true,
				position: [10, 10],
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)",
				textStyle: {

				}
			},
			legend: {

			},
			toolbox: {
				show: false,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['pie', 'funnel']
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			//	    timeline:{
			//	    	lineStyle:{
			//	    		show:true,
			//	    	},
			//	    },
			series: [{
				name: '消费占比',
				type: 'pie',
				hoverAnimation: false,
				center: ['60%', '60%'],
				roseType: false,
				label: {
					normal: {
						formatter: "{b} \n {d}%",
						align: 'right',
						//							position:'inside',
						padding: [15, 0, 0, 5],
						textStyle: {
							show: true,
							color: '#000000',
							fontFamily: "",
							fontWeight: 900,
							fontSize: "14",
						}
					},
					emphasis: {
						show: true
					}
				},
				labelLine: {
					normal: {
						show: true,
						length: 5,
						length2: 10,
					}
				},
				data: drinkPercent,
			}]
		}
		piechart.setOption(piechartoption);
	}
})