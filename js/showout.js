(function (doc, win) {
	var docEl = doc.documentElement
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientHeight = docEl.clientHeight;
			if (!clientHeight) return;
			if (clientHeight >= 640) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientHeight / 667) + 'px';
			}
		};
	
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
