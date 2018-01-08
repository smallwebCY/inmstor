/*
* @Author: 李燕南
* @Date:   2017-09-23 19:23:59
* @Last Modified by:   李燕南941477476@qq.com
* @Last Modified time: 2017-09-24 10:54:50
*/
;(function (window, $){
	/*
		constructor {} 计时按钮构造函数	
    */
    function TimerButton(){}

	/*倒计时
	    param { options: object } [必填] 倒计时所需的参数
	*/
	TimerButton.prototype.SecondCountDown = function (options) {
	    var countDown = {};
	    countDown.options = {
	        time: 60,//总时间
	        progress: function () { },//计时正在进行中
	        started: function () { },//计时开始
	        breaked: function () { },//计时中断
	        end: function (){}//计时结束
	    }
	    if (({}).toString.call(options) == "[object Object]" && options.window != window) {
	        for (var i in options) {
	            countDown.options[i] = options[i];
	        }
	    }

	    countDown.timer = null;//存储计时器
	    countDown.time = 0;//当前时间
	    countDown._continueRun = true;//是否继续

	    //开始计时
	    countDown.start = function () {
	        var that = this,
	            time = that.options.time || 60,
	            count = 0,//记录定时器执行了多少次
	            interval = 1000,//每次执行间隔
	            start = new Date().getTime(),//开始执行时间
	            targetTime = that.options.time * 1000;//目标时间
	        clearTimeout(that.timer);

	        if (that.options.started && (({}).toString.call(that.options.started) == "[object Function]")) {
	            that.options.started(time);
	        }
	        this._continueRun = true;
	        that.timer = setTimeout(function () {
	            if (that._continueRun) {
	                var wucha = 0,//计算误差
	                    //下一次执行时间,下一次执行时间 = 每次执行间隔 - 误差
	                    nextRunTime = interval,
	                    currentFn = arguments.callee;
	                count++;
	                wucha = new Date().getTime() - (start + count * interval);
	                wucha = (wucha <= 0) ? 0 : wucha;
	                nextRunTime = interval - wucha;
	                nextRunTime = (nextRunTime <= 0) ? 0 : nextRunTime;


                    time--;
                    //在外部可以获取到倒计时当前时间
                    if (that.options.progress && (({}).toString.call(that.options.progress) == "[object Function]")) {
                        that.options.progress(time);
                    }
                    that.time = time;
                    that.timer = setTimeout(currentFn, nextRunTime);

                    //console.log("误差：" + wucha + "，下一次执行时间：" + nextRunTime);
	                if ((targetTime -= interval) <= 0) {
	                    clearTimeout(that.timer);
	                    /*time = 60;*/
	                    if (that.options.end && (({}).toString.call(that.options.end) == "[object Function]")) {
	                        that.options.end(time);
	                    }
	                    that.time = time;
	                    return;
	                } 
	            } else {
	                clearTimeout(that.timer);
	            }
	        }, interval);
	    }
	    //中断计时
	    countDown.abort = function () {
	        this._continueRun = false;
	        clearTimeout(this.timer);
	        this.time--;
	        if (this.options.breaked && (({}).toString.call(this.options.breaked) == "[object Function]")) {
	            this.options.breaked(this.time);
	        }
	    }
	    return countDown;
	}

	/*按钮倒计时功能，如发送验证码按钮
	    param { eles: dom、jQuery object } [必填] 发送验证码的按钮
	    param { options: object } [必填] 发送验证码相关配置
	*/
	TimerButton.prototype.verify = function (eles,options) {
	    eles = $(eles);
	    if (!eles.length || eles.length == 0) {
	        throw "必须传递一个元素！";
	    }
	    var self = this,
	        timedown = {},
	        verifyObj = {},
	        _options = {
	            time: 60,
	            event: "click",
	            condition: function () { },//执行条件，若condition为true则会执行
	            unableClass: "",//按钮不能使用时的class
	            runningText: " s后重新获取",//计时正在进行中时按钮显示的文字
	            timeUpText: "重新获取",//时间到了时按钮显示的文字
	            progress: function () { },//计时正在进行中时的回调
	            timeUp: function () { },//计时结束时执行的回调
	            abort: function () { },//中断计时
	            eventFn: function () { }//事件执行后的回调
	        }
	    $.extend(_options, options);

	    eles.on(_options.event, function () {
	        if (this.unabled) { return; }
	        var canRun = true;
	        if ($.isFunction(_options.condition)) {
	            canRun = _options.condition.call(this);
	        } else {
	            canRun = _options.condition;
	        }
	        if (!canRun) { return; }

	        var that = this,
	            $this = $(that),
	            timedown = self.SecondCountDown({
	                time: _options.time,
	                progress: function (time) {
	                    _options.progress.call(that, time);
	                },
	                end: function (time) {
	                    that.unabled = false;
	                    $this.removeClass(_options.unableClass);
	                    _options.timeUp.call(that, time);
	                },
	                breaked: function (time) {
	                    that.unabled = false;
	                    $this.removeClass(_options.unableClass);
	                    _options.abort.call(that, time);
	                }
	            });
	        timedown.start();
	        this.timedown = timedown;
	        that.unabled = true;
	        $this.addClass(_options.unableClass);
	        _options.eventFn.call(this);

	    });
	   
	}

    window.timerButton = new TimerButton();
})(window, jQuery);

