// Resource section navigation - Updated for scrollable grid layout
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all resource sections for smooth scrolling
  const sections = document.querySelectorAll('.resources-section');
  
  sections.forEach(section => {
    const grid = section.querySelector('.resource-grid');
    
    if (grid) {
      // Add smooth scrolling behavior
      grid.style.scrollBehavior = 'smooth';
      
      // Optional: Add keyboard navigation for accessibility
      grid.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const scrollAmount = e.key === 'ArrowDown' ? 100 : -100;
          grid.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
          });
        }
      });
      
      // Make grid focusable for keyboard navigation
      if (!grid.hasAttribute('tabindex')) {
        grid.setAttribute('tabindex', '0');
      }
    }
  });
});
