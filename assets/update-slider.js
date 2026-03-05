(function () {
	function swiperInit() {
		subSliderInit(true, 12);
		sliderInit(true);
		popupSliderInit(true);
	}

	document.addEventListener('shopify:section:load', function (e) {
		swiperInit();
	});

	swiperInit();
})();
