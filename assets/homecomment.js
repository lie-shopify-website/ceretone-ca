(function () {
    const initSlider = (section) => {
        let parent;
        if (document.currentScript) {
            parent = document.currentScript.parentElement;
        }
        else {
            parent = section;
        }
        const slider = parent.querySelector('.homecommentSwiper');

        if (slider) {
            const buttonNext = parent.querySelector('.swiper-button-next');
            const buttonPrev = parent.querySelector('.swiper-button-prev');

            const featuredArticlesSlider = new Swiper(slider, {
                slidesPerView: 3,
                spaceBetween: 40,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    100: {
                        spaceBetween: 40,
                        slidesPerView: 1,
                    },
                    768: {
                        spaceBetween: 40,
                        slidesPerView: 2,
                    },
                    1200: {
                        spaceBetween: 40,
                        slidesPerView: 3,
                    },
                    1360: {
                        spaceBetween: 40,
                        slidesPerView: 3,
                    },
                },
            })
        }
    }

    initSlider();
    var slides = document.querySelectorAll('.homecomment_swiper_slide');
    var maxHeight = 0;
    slides.forEach(function (slide) {
        var slideHeight = slide.offsetHeight;
        if (slideHeight > maxHeight) {
            maxHeight = slideHeight;
        }
    });
    slides.forEach(function (slide) {
        slide.style.height = maxHeight + 'px';
    });
    document.addEventListener('shopify:section:load', function (section) {
        initSlider(section.target);
    });
})()