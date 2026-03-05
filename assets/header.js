(function () {
		function throttle(fn, delay) {
			let lastTime = 0;
			return function (...args) {
				let now = Date.now();
				if (now - lastTime >= delay) {
					fn.apply(this, args);
					lastTime = now;
				}
			};
		}

		function IsPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPad", "iPod"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		};
		window.addEventListener('DOMContentLoaded', function() {
			menuProcess();
		});

		//窗口变化监听,避免resize多次执行卡顿
		// var resizeTimer = null;
		// $(window).bind('resize', function () {
		// 	if (resizeTimer) clearTimeout(resizeTimer);
		// 	resizeTimer = setTimeout(function () {
		// 		menuProcess();
		// 	}, 100);
		// });

		// $(window).bind('resize', function () {
		// 	menuProcess();
		// });

		function menuProcess(){


			/* 按需加载图片，鼠标悬浮一级导航触发 */
			$('header-nav .top-menu-item').mouseover(function(){
				$(this).find('picture').each(function(inx, picture){
					let currImg = $(picture).find('img');
					let currSource = $(picture).find('source');
					currImg.attr('src', currImg.attr('data-src'));
					currSource.attr('srcset', currSource.attr('data-srcset'));
				});
			});
			/* 按需加载图片，手机端点击一级导航触发 */
			$('header-nav .top-menu-item').on('click', function(){
				$(this).find('picture').each(function(inx, picture){
					let currImg = $(picture).find('img');
					let currSource = $(picture).find('source');

					currImg.attr('src', currImg.attr('data-src'));
					currSource.attr('srcset', currSource.attr('data-srcset'));
				});
			});


			var isPC=IsPC();
			if(isPC){
				/* Mage菜单 */
				$('header-nav .tab-header .item').mouseover(function(){
					$(this).addClass('active').siblings().removeClass('active');

					let inx = $(this).index();
					
					let tabContent = $(this).parents('.tab-layout').find('.tab-content');
					tabContent.find('.mega-menu-item').removeClass('active');
					tabContent.find('.mega-menu-item').eq(inx).addClass('active');
				});

				/* Mage菜单检查内容是否出现滚动条 */
				// $('header-nav .top-menu-item').mouseover(function(){
				// 	let scrollContainers = $(this).find('.tab-content .js-scroll-content');
					
				// 	scrollContainers.each(function(){
				// 		let scrollContainer = $(this);
				// 		if(scrollContainer && scrollContainer.prop('scrollHeight') > scrollContainer.innerHeight()){
				// 			scrollContainer.parents('.js-scroll-container').addClass('has-scroll');
				// 		}else{
				// 			scrollContainer.parents('.js-scroll-container').removeClass('has-scroll');
				// 		}
				// 	});
				// });
				

				/* 默认菜单 */
				$('header-nav .default-menu .child-menu-item').mouseover(function(){
					if($(this).hasClass('js-has-child')){
						$(this).parents('.js-child-menu-items').addClass('over');
					}else{
						$(this).parents('.js-child-menu-items').removeClass('over');
					}

					// /* 检查内容是否出现滚动条 */
					// let scrollContainer = tabContent.find('.mega-menu-item').eq(inx).find('.js-scroll-content');
					// if(scrollContainer && scrollContainer.prop('scrollHeight') > scrollContainer.innerHeight()){
					//     scrollContainer.parent('.js-scroll-container').addClass('has-scroll');
					// }else{
					//     scrollContainer.parent('.js-scroll-container').removeClass('has-scroll');
					// }

				}).mouseout(function(){
					$(this).parents('.js-child-menu-items').removeClass('over');
				});


				// /* 监听 内容是否出现滚动条 */
				// $(".js-scroll-content").on("scroll", function(){
				// 	let _this = $(this);
				// 	if (_this.scrollTop() + _this.innerHeight() >= _this.prop('scrollHeight') - 1) {
				// 		_this.parents('.js-scroll-container').addClass("is-scroll-bottom");
				// 	} else {
				// 		_this.parents('.js-scroll-container').removeClass("is-scroll-bottom");
				// 	}
					
				// });

			} else {
				/* 手机端展开与收缩 */
				$('.js-expand-header').on('click', function(e){
					if($(this).hasClass('js_allow_redirect')){
						return true; /* 不做动作 */
					}

					e.preventDefault();

					let expandParent = $(this).parent('.js-expand-parent');
					if(expandParent.hasClass('mb-active')){
						expandParent.removeClass('mb-active');
					}else{
						expandParent.addClass('mb-active');
					}

					/* 各自展开模式或者单一展开模式 */
					if(expandParent.hasClass('js-expand-single')){
						expandParent.siblings().removeClass('mb-active');
					}
				});
			}
		}

		
})();