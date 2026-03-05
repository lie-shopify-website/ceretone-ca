(function () {
  const playVideo = (video) => {
    // Play video logic
    video.play();

    // Trigger Google Analytics event
    trackButtonClick();
  };

  const stopVideo = (video) => {
    // Stop video logic
    video.pause();
  };

  const initSection = (section) => {
    let sectionVideo = document.currentScript ? document.currentScript.parentElement : section;

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playVideo(sectionVideo); // Play video when the section comes into view
        } else {
          stopVideo(sectionVideo); // Stop video when the section goes out of view
        }
      });
    });

    sectionObserver.observe(sectionVideo); // Observe the section for visibility
  };

  document.addEventListener("shopify:section:load", function (section) {
    initSection(section.target);
  });

  // Google Analytics tracking function
  function trackButtonClick() {
    if (typeof gtag === 'function') {
      gtag('event', 'home_video_click', {
        'event_category': 'engagement',
        'event_label': 'Homepage Video'
      });
    } else {
      console.error('GA4 gtag function not found.');
    }
  }
})();
