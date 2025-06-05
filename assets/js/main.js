// Enhanced JavaScript file for the PhD portfolio website

document.addEventListener('DOMContentLoaded', function() {

  // Initialize animations for elements with animate-on-scroll class
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const elementVisible = 50; // Show elements sooner
      
      // Only animate if element is in viewport
      if (elementTop < window.innerHeight - elementVisible && elementBottom > 0) {
        const animation = element.dataset.animation || 'animate__fadeIn';
        const delay = element.dataset.delay || 0; // Allow custom delay
        
        // Add animation with delay
        setTimeout(() => {
          element.classList.add('animate__animated', animation);
          element.style.opacity = '1';
        }, delay);
      }
    });
  };
  
  // Add animate-on-scroll class to common elements if not already present
  const addAnimationClasses = () => {
    // Elements to animate
    const selectors = [
      '.post-card', 
      '.timeline-item', 
      '.research-item', 
      '.publication-item',
      '.home-section > h2',
      '.contact-form'
    ];
    
    selectors.forEach((selector, index) => {
      const items = document.querySelectorAll(selector);
      items.forEach((item, i) => {
        if (!item.classList.contains('animate-on-scroll')) {
          item.classList.add('animate-on-scroll');
          item.style.opacity = '0'; // Start invisible
          
          // Set different animations based on element type
          switch(selector) {
            case '.post-card':
            case '.research-item':
            case '.publication-item':
              item.dataset.animation = 'animate__fadeInUp';
              item.dataset.delay = (i * 100) + 'ms'; // Stagger items
              break;
            case '.timeline-item':
              item.dataset.animation = 'animate__fadeInUp';
              item.dataset.delay = (i * 150) + 'ms';
              break;
            case '.home-section > h2':
              item.dataset.animation = 'animate__fadeInDown';
              break;
            default:
              item.dataset.animation = 'animate__fadeIn';
          }
        }
      });
    });
  };
  
  // Run animation setup
  addAnimationClasses();
  
  // Run animation check on scroll with throttling for performance
  let animationScrollTimeout;
  window.addEventListener('scroll', () => {
    if (animationScrollTimeout) {
      window.cancelAnimationFrame(animationScrollTimeout);
    }
    animationScrollTimeout = window.requestAnimationFrame(animateOnScroll);
  });
  
  // Run once on page load
  animateOnScroll();
  
  // Mobile navigation toggle
  const menuIcon = document.querySelector('.menu-icon');
  const siteNav = document.querySelector('.site-nav');
  
  if (menuIcon) {
    menuIcon.addEventListener('click', function() {
      siteNav.classList.toggle('nav-open');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (siteNav && siteNav.classList.contains('nav-open') && !siteNav.contains(event.target)) {
      siteNav.classList.remove('nav-open');
    }
  });
  
  // Note: Theme toggle functionality is now handled by dark-mode.js
  // This ensures theme toggle works efficiently and eliminates duplication
  
  // MathJax configuration for math rendering
  if (typeof MathJax !== 'undefined') {
    MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        displayMath: [['$$','$$'], ['\\[','\\]']],
        processEscapes: true
      }
    });
  }
  
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Enhanced parallax effect and background animations for hero section
  const heroSection = document.querySelector('.home-hero');
  if (heroSection) {
    // Create particles in hero background for visual interest
    const createParticles = () => {
      // Only create particles if not mobile (for performance)
      if (window.innerWidth < 768) return;
      
      const particleCount = 15; // Fewer particles for performance
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        
        // Random properties for each particle
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const animDuration = Math.random() * 20 + 10;
        const animDelay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${animDuration}s`;
        particle.style.animationDelay = `${animDelay}s`;
        
        heroSection.appendChild(particle);
      }
    };
    
    createParticles();
    
    // Subtle parallax effect on scroll
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      const translateY = scrollPosition * 0.3;
      const opacity = 1 - (scrollPosition / 700); // Fade out as user scrolls
      
      // Only apply effect when section is in view
      if (opacity > 0) {
        heroSection.querySelector('h1').style.transform = `translateY(${translateY * 0.2}px)`;
        heroSection.querySelector('p').style.transform = `translateY(${translateY * 0.1}px)`;
        heroSection.style.opacity = opacity;
      }
    });
  }
  
  // Enhanced image handling
  const enhanceImages = () => {
    // Initialize image lazy loading
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        if (img.dataset.src) img.src = img.dataset.src;
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
      document.body.appendChild(script);
    }
    
    // Add zoom effect to post images on click
    document.querySelectorAll('.post-content img').forEach(img => {
      img.addEventListener('click', () => {
        // Toggle a zoomed class
        img.classList.toggle('img-zoomed');
        
        // If zoomed, add an overlay behind the image
        if (img.classList.contains('img-zoomed')) {
          const overlay = document.createElement('div');
          overlay.classList.add('img-zoom-overlay');
          document.body.appendChild(overlay);
          
          // Allow clicking overlay to close zoomed image
          overlay.addEventListener('click', () => {
            img.classList.remove('img-zoomed');
            overlay.remove();
          });
        } else {
          // Remove overlay if unzoomed
          const overlay = document.querySelector('.img-zoom-overlay');
          if (overlay) overlay.remove();
        }
      });
    });
  };
  
  enhanceImages();
  
  // Enhanced header behavior on scroll with performance optimization
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    let lastScrollTop = 0;
    let headerScrollTimeout;
    
    function updateHeaderState() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Always ensure proper background when scrolled
      if (scrollTop > 20) {
        siteHeader.classList.add('scrolled');
        document.body.style.setProperty('--header-bg-opacity', '0.95');
      } else {
        siteHeader.classList.remove('scrolled');
        document.body.style.setProperty('--header-bg-opacity', '1');
      }
      
      // Add hide/show header on scroll down/up
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down & not at top - hide header
        siteHeader.classList.add('header-hidden');
      } else {
        // Scrolling up or at top - show header
        siteHeader.classList.remove('header-hidden');
      }
      
      lastScrollTop = scrollTop;
    }
    
    // Throttled scroll handler using requestAnimationFrame
    function handleHeaderScroll() {
      if (headerScrollTimeout) {
        window.cancelAnimationFrame(headerScrollTimeout);
      }
      headerScrollTimeout = window.requestAnimationFrame(updateHeaderState);
    }
    
    // Handle initial scroll position (e.g., on page refresh)
    updateHeaderState();
    
    // Add scroll event listener with performance optimization
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  }
  
  // Add hover effects for elements
  const addHoverEffects = () => {
    // Add ripple effect to buttons
    document.querySelectorAll('.button, .btn, .post-card-category').forEach(button => {
      button.addEventListener('mouseenter', function() {
        if (!this.querySelector('.ripple-effect')) {
          const ripple = document.createElement('span');
          ripple.classList.add('ripple-effect');
          this.appendChild(ripple);
          
          // Remove ripple after animation completes
          setTimeout(() => {
            ripple.remove();
          }, 1000);
        }
      });
    });
    
    // Enhanced card hover interactions
    document.querySelectorAll('.post-card, .research-card, .publication-item').forEach(card => {
      // Lift effect on hover
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px)';
        this.style.zIndex = '1';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.zIndex = '';
      });
    });
  };
  
  addHoverEffects();
  
  // Add custom cursor effect for links (desktop only)
  if (window.innerWidth > 768) {
    const createCursorEffect = () => {
      const cursor = document.createElement('div');
      cursor.classList.add('custom-cursor');
      document.body.appendChild(cursor);
      
      // Move cursor with mouse
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
      
      // Change cursor style on interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .post-card, input, textarea');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-hover');
        });
      });
    };
    
    // Uncomment to enable custom cursor
    // createCursorEffect();
  }
  
  // Initialize any tooltips
  const initTooltips = () => {
    document.querySelectorAll('[data-tooltip]').forEach(element => {
      element.addEventListener('mouseenter', function() {
        const tooltipText = this.getAttribute('data-tooltip');
        
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = tooltipText;
        
        document.body.appendChild(tooltip);
        
        const elemRect = this.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Position tooltip above the element
        tooltip.style.left = `${elemRect.left + (elemRect.width / 2) - (tooltipRect.width / 2)}px`;
        tooltip.style.top = `${elemRect.top - tooltipRect.height - 10 + window.scrollY}px`;
        
        // Add visible class to trigger animation
        setTimeout(() => {
          tooltip.classList.add('tooltip-visible');
        }, 10);
        
        this.addEventListener('mouseleave', function() {
          tooltip.classList.remove('tooltip-visible');
          
          // Remove tooltip after fade out
          setTimeout(() => {
            tooltip.remove();
          }, 300);
        });
      });
    });
  };
  
  initTooltips();
  
  // Resource section navigation
  function scrollSection(button, direction) {
    const section = button.closest('.resources-section');
    const grid = section.querySelector('.resource-grid');
    const cardWidth = 300 + 32; // card width + gap
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    
    grid.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    // Update button states after scroll
    setTimeout(() => {
      const prevBtn = section.querySelector('.prev');
      const nextBtn = section.querySelector('.next');
      
      prevBtn.disabled = grid.scrollLeft <= 0;
      nextBtn.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth;
    }, 300);
  }
  
  // Initialize resources if they exist
  const sections = document.querySelectorAll('.resources-section');
  sections.forEach(section => {
    const grid = section.querySelector('.resource-grid');
    const prevBtn = section.querySelector('.prev');
    const nextBtn = section.querySelector('.next');
    
    if (grid && prevBtn && nextBtn) {
      prevBtn.disabled = true; // Initially disable prev button
      nextBtn.disabled = grid.scrollWidth <= grid.clientWidth; // Disable next if no overflow
      
      // Update button states on resize
      window.addEventListener('resize', () => {
        prevBtn.disabled = grid.scrollLeft <= 0;
        nextBtn.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth;
      });
    }
  });
  
  // Handle header transparency and scroll state
  if (siteHeader) {
    // Handle initial scroll position (e.g., on page refresh)
    updateHeaderState();
  }
});
