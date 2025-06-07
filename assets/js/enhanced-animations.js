// Enhanced animations and interactive elements for the website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize smooth scroll for anchor links
  initSmoothScroll();
  
  // Progress bar at the top of the page
  initProgressBar();
  
  // Hero section particle effect
  createHeroParticles();
  
  // Add ripple effect to buttons
  initRippleEffect();
  
  // Initialize image zoom effect
  initImageZoom();
  
  // Custom cursor effect
  initCustomCursor();
  
  // Initialize page transitions
  initPageTransitions();
  
  // Enhanced infinity symbol interactions
  initInfinityLogoEffects();
});

// Create smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
}

// Progress bar that shows scroll position
function initProgressBar() {
  // Update progress bar on scroll - no need to create elements as they're in the HTML
  window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
      indicator.style.width = scrolled + '%';
    }
  });
}

// Create floating particles in the hero section
function createHeroParticles() {
  const heroSection = document.querySelector('.hero-section, .page-content > .wrapper > :first-child');
  
  if(heroSection) {
    // Make the hero section a positioned container if it's not already
    if(getComputedStyle(heroSection).position === 'static') {
      heroSection.style.position = 'relative';
    }
    
    // Create particles
    const particleCount = window.innerWidth < 768 ? 15 : 25;
    
    for(let i = 0; i < particleCount; i++) {
      const size = Math.random() * 10 + 5;
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      
      // Random animation delay and duration for more natural effect
      const delay = Math.random() * 5;
      const duration = 15 + Math.random() * 20;
      
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      heroSection.appendChild(particle);
    }
  }
}

// Add ripple effect to buttons
function initRippleEffect() {
  const buttons = document.querySelectorAll('.button, .btn, .post-card-category, .site-nav .page-link');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      // Remove the ripple element after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });
}

// Image zoom functionality
function initImageZoom() {
  const images = document.querySelectorAll('.post-content img, .research-image');
  
  images.forEach(img => {
    img.addEventListener('click', function() {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'img-zoom-overlay';
      
      // Create zoomed image
      const zoomedImg = document.createElement('img');
      zoomedImg.src = this.src;
      zoomedImg.alt = this.alt;
      zoomedImg.className = 'img-zoomed';
      
      // Add to DOM
      document.body.appendChild(overlay);
      document.body.appendChild(zoomedImg);
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      
      // Close zoom on click
      overlay.addEventListener('click', closeZoom);
      zoomedImg.addEventListener('click', closeZoom);
      
      function closeZoom() {
        overlay.remove();
        zoomedImg.remove();
        document.body.style.overflow = '';
      }
    });
  });
}

// Custom cursor effect
function initCustomCursor() {
  // Create custom cursor elements if they don't exist
  if(!document.querySelector('.custom-cursor')) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Change cursor style when hovering over links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .btn, input[type="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
    
    // Hide the cursor when the mouse leaves the window
    document.addEventListener('mouseleave', () => {
      cursor.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', () => {
      cursor.style.display = 'block';
    });
    
    // Add cursor-active class on mouse down
    document.addEventListener('mousedown', () => {
      cursor.classList.add('cursor-active');
    });
    
    document.addEventListener('mouseup', () => {
      cursor.classList.remove('cursor-active');
    });
  }
}

// Page transitions
function initPageTransitions() {
  // Make sure all animate.css classes are applied
  document.querySelectorAll('.page-content .wrapper > *:not([class*="animate__"])').forEach(element => {
    element.classList.add('animate__animated', 'animate__fadeIn');
  });
  
  // Add scroll animations to all sections
  document.querySelectorAll('section, .section, article > *').forEach((section, index) => {
    if(!section.classList.contains('animate-on-scroll')) {
      section.classList.add('animate-on-scroll');
      section.setAttribute('data-animation', 'animate__fadeInUp');
      section.setAttribute('data-delay', index * 100);
      section.style.opacity = '0';
    }
  });
  
  // Observe elements for scroll animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const animation = target.dataset.animation || 'animate__fadeIn';
        const delay = target.dataset.delay || 0;
        
        setTimeout(() => {
          target.classList.add('animate__animated', animation);
          target.style.opacity = '1';
          observer.unobserve(target);
        }, delay);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  document.querySelectorAll('.animate-on-scroll').forEach(item => {
    observer.observe(item);
  });
}

// Enhanced infinity symbol interactions
function initInfinityLogoEffects() {
  const infinityLogos = document.querySelectorAll('.logo');
  
  infinityLogos.forEach(logo => {
    // Only apply effects to infinity symbols
    if (logo.classList.contains('fa-infinity')) {
      // Add sparkle effect on hover
      logo.addEventListener('mouseenter', function() {
        createSparkleEffect(this);
      });
      
      // Add click effect
      logo.addEventListener('click', function(e) {
        e.preventDefault();
        createInfinityRipple(this, e);
        
        // Add a brief intense glow
        this.style.filter = 'drop-shadow(0 0 20px rgba(var(--primary-color-rgb), 0.9))';
        setTimeout(() => {
          this.style.filter = '';
        }, 300);
      });
    }
  });
}

// Create sparkle particles around infinity symbol
function createSparkleEffect(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'logo-sparkle';
    sparkle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${centerX}px;
      top: ${centerY}px;
      opacity: 0;
    `;
    
    document.body.appendChild(sparkle);
    
    // Animate sparkle
    const angle = (i * 60) * Math.PI / 180;
    const distance = 30 + Math.random() * 20;
    const endX = centerX + Math.cos(angle) * distance;
    const endY = centerY + Math.sin(angle) * distance;
    
    sparkle.animate([
      { 
        transform: 'translate(0, 0) scale(0)', 
        opacity: 0 
      },
      { 
        transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1)`, 
        opacity: 1,
        offset: 0.5
      },
      { 
        transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, 
        opacity: 0 
      }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
      sparkle.remove();
    };
  }
}

// Enhanced ripple effect specifically for infinity symbols
function createInfinityRipple(element, event) {
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, transparent 1px, rgba(var(--primary-color-rgb), 0.3) 1px);
    transform: scale(0);
    animation: logoRipple 0.6s linear;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    pointer-events: none;
  `;
  
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }
  
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}
