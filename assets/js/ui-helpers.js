// assets/js/ui-helpers.js
document.addEventListener('DOMContentLoaded', function() {
  // --- Back to Top Button Functionality ---
  const backToTopButton = document.getElementById('backToTopBtn');

  if (backToTopButton) {
    // Show or hide the button based on scroll position
    const scrollFunction = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = 'block';
        // Optional: Add animation class for appearing
        // backToTopButton.classList.add('animate-fadeInScaleUp'); 
      } else {
        backToTopButton.style.display = 'none';
        // Optional: Remove animation class for disappearing
        // backToTopButton.classList.remove('animate-fadeInScaleUp');
      }
    };

    window.addEventListener('scroll', scrollFunction);

    // Scroll to top when the button is clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Add more modular UI helper functions below ---
  // Example: Lazy loading images
  // const lazyLoadImages = () => { ... };
  // if (document.querySelectorAll('img[data-src]').length > 0) {
  //   lazyLoadImages();
  // }

  // Example: Smooth scroll for internal links
  // const smoothScrollInternalLinks = () => { ... };
  // smoothScrollInternalLinks();
});
