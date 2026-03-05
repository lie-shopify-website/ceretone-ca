(function () {
  const initSlider = (section) => {
    let parent;
    if (document.currentScript) {
      parent = document.currentScript.parentElement;
    } else {
      parent = section;
    }
    const slider = parent.querySelector('.LOGOcarouselmySwiper2');

    if (slider) {
      var swiper = new Swiper(".LOGOcarouselmySwiper", {
        spaceBetween: 30,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".LOGO_swiper_button_next",
          prevEl: ".LOGO_swiper_button_prev",
        },
        breakpoints: {
          100: {
            spaceBetween: 10,
            slidesPerView: 5,
          },
          768: {
            spaceBetween: 10,
            slidesPerView: 5,
          },
          1200: {
            spaceBetween: 10,
            slidesPerView: 5,
          },
          1360: {
            spaceBetween: 20,
            slidesPerView: 5,
          },
        },
      });

      const featuredArticlesSlider = new Swiper(slider, {
        loop: true, // Enable looping
        spaceBetween: 10,
        thumbs: {
          swiper: swiper,
        },
        // Remove or comment out the autoplay configuration to disable autoplay
        // autoplay: {
        //   delay: 7000,
        //   disableOnInteraction: false,
        // },
        navigation: {
          nextEl: ".LOGO_swiper_button_next",
          prevEl: ".LOGO_swiper_button_prev",
        },
      });

      // Add event listeners for manual navigation buttons
      const nextButton = parent.querySelector('.LOGO_swiper_button_next');
      const prevButton = parent.querySelector('.LOGO_swiper_button_prev');

      if (nextButton) {
        nextButton.addEventListener('click', function () {
          featuredArticlesSlider.slideNext();
        });
      }

      if (prevButton) {
        prevButton.addEventListener('click', function () {
          featuredArticlesSlider.slidePrev();
        });
      }
    }
  };

  initSlider();

  // var slides = document.querySelectorAll('.LOGOcarousel_box_flex');
  // var maxHeight = 0;
  // slides.forEach(function (slide) {
  //   var slideHeight = slide.offsetHeight;
  //   if (slideHeight > maxHeight) {
  //     maxHeight = slideHeight;
  //   }
  // });
  // slides.forEach(function (slide) {
  //   slide.style.height = maxHeight + 'px';
  // });

  document.addEventListener('shopify:section:load', function (section) {
    initSlider(section.target);
  });
})();
