// Script to apply theme immediately before page content loads
// This prevents white flash during page transitions

(function() {
  // Get saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  
  // Apply saved theme or check system preference
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.classList.add('theme-applied');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add('theme-applied');
  }
})();
