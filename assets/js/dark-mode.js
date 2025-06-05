// Script to handle dark mode toggling

// Function to set the theme
function setTheme(theme) {
  // Set the theme attribute on both html and body
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update the icons
  const moonIcon = document.querySelector('.theme-toggle .fa-moon');
  const sunIcon = document.querySelector('.theme-toggle .fa-sun');
  
  if (moonIcon && sunIcon) {
    if (theme === 'dark') {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'inline-block';
    } else {
      moonIcon.style.display = 'inline-block';
      sunIcon.style.display = 'none';
    }
  }

  // Add transition class
  document.body.classList.add('theme-transition');
  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 300);
}

// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');

  // Check for saved user preference
  const savedTheme = localStorage.getItem('theme');

  // Apply saved theme or system preference
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  // Handle theme toggle button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Force remove and set to ensure clean state
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      
      // Set new theme after a brief delay
      setTimeout(() => {
        setTheme(newTheme);
      }, 10);

      // Add a smooth transition effect
      document.body.classList.add('theme-transition');
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 300);
    });
  } else {
    console.error('Theme toggle button not found. Ensure the button with id "theme-toggle" exists in the HTML.');
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Add a class to indicate JavaScript is enabled
  document.body.classList.add('js-enabled');
});
