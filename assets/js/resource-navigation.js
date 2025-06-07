// Resource section navigation
document.addEventListener('DOMContentLoaded', () => {
  function isMobile() {
    return window.innerWidth <= 768;
  }

  function updateNavButtons(section) {
    const grid = section.querySelector('.resource-grid');
    const prevBtn = section.querySelector('.prev');
    const nextBtn = section.querySelector('.next');
    
    if (grid && prevBtn && nextBtn) {
      // Hide buttons on mobile
      if (isMobile()) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
      }
      
      // Show buttons on desktop
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
      
      // Update button states
      prevBtn.disabled = grid.scrollLeft <= 0;
      nextBtn.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1; // -1 for rounding errors
      
      // Update button visibility
      prevBtn.style.opacity = prevBtn.disabled ? '0' : '1';
      nextBtn.style.opacity = nextBtn.disabled ? '0' : '1';
    }
  }

  function scrollSection(button, direction) {
    // Don't scroll on mobile
    if (isMobile()) return;
    
    const section = button.closest('.resources-section');
    const grid = section.querySelector('.resource-grid');
    const cards = Array.from(grid.children);
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth;
    const gridWidth = grid.clientWidth;
    const cardsPerView = Math.floor(gridWidth / cardWidth);
    const scrollAmount = direction === 'next' ? cardWidth * cardsPerView : -cardWidth * cardsPerView;
    
    const currentScroll = grid.scrollLeft;
    const targetScroll = currentScroll + scrollAmount;
    
    // Smooth scroll to target
    grid.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    // Update button states after scroll animation
    const animationDuration = 300; // match CSS transition duration
    setTimeout(() => {
      updateNavButtons(section);
    }, animationDuration);
  }

  // Initialize all resource sections
  const sections = document.querySelectorAll('.resources-section');
  sections.forEach(section => {
    const grid = section.querySelector('.resource-grid');
    
    if (grid) {
      // Initial button state
      updateNavButtons(section);
      
      // Update on scroll (only on desktop)
      if (!isMobile()) {
        grid.addEventListener('scroll', () => {
          updateNavButtons(section);
        });
      }
      
      // Update on resize
      window.addEventListener('resize', () => {
        updateNavButtons(section);
      });
      
      // Add touch scroll handling (only on desktop)
      if (!isMobile()) {
        let isScrolling;
        grid.addEventListener('scroll', () => {
          window.clearTimeout(isScrolling);
          isScrolling = setTimeout(() => {
            updateNavButtons(section);
          }, 66); // Throttle scroll events
        });
      }
    }
  });
  
  // Make scrollSection available globally
  window.scrollSection = scrollSection;
});
