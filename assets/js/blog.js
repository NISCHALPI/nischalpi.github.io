// Blog page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const searchInput = document.getElementById('blog-search');
  const clearSearchBtn = document.getElementById('clear-search');
  const searchResults = document.getElementById('search-results');
  const postCards = document.querySelectorAll('.post-card');
  const featuredPost = document.querySelector('.featured-post-card');
  const postsCount = document.getElementById('posts-count');
  const sortBtn = document.getElementById('sort-btn');
  const sortOptions = document.getElementById('sort-options');
  const sortOptionButtons = document.querySelectorAll('.sort-option');
  const viewButtons = document.querySelectorAll('.view-btn');
  const postsContainer = document.getElementById('posts-container');
  
  // Sort functionality
  let currentSort = 'date';
  let currentView = 'grid';
  
  // Initialize sort dropdown
  if (sortBtn && sortOptions) {
    // Toggle dropdown
    sortBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = sortBtn.getAttribute('aria-expanded') === 'true';
      const transitionTiming = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      
      sortBtn.setAttribute('aria-expanded', !isOpen);
      sortBtn.classList.toggle('open', !isOpen);
      
      if (!isOpen) {
        sortOptions.classList.add('show');
        // Add margin to push content down with appropriate space
        if (postsContainer) {
          postsContainer.style.transition = `margin-top ${transitionTiming}`;
          postsContainer.style.marginTop = '170px'; // Increased from 120px
        }
      } else {
        sortOptions.classList.remove('show');
        // Reset margin to original spacing
        if (postsContainer) {
          postsContainer.style.transition = `margin-top ${transitionTiming}`;
          postsContainer.style.marginTop = '2rem';
        }
      }
    });

    // Handle sort option selection
    sortOptionButtons.forEach(option => {
      option.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const sortType = this.getAttribute('data-sort');
        if (sortType && sortType !== currentSort) {
          // Update active state
          sortOptionButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-checked', 'false');
          });
          this.classList.add('active');
          this.setAttribute('aria-checked', 'true');
          
          // Update button text
          const sortText = this.querySelector('span').textContent;
          sortBtn.querySelector('span').textContent = `Sort by ${sortText}`;
          
          currentSort = sortType;
          sortPosts(sortType);
        }
        
        // Close dropdown
        sortBtn.setAttribute('aria-expanded', 'false');
        sortBtn.classList.remove('open');
        sortOptions.classList.remove('show');
        // Reset margin when closing dropdown
        if (postsContainer) {
          postsContainer.style.transition = 'margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          postsContainer.style.marginTop = '2rem';
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!sortBtn.contains(e.target) && !sortOptions.contains(e.target)) {
        sortBtn.setAttribute('aria-expanded', 'false');
        sortBtn.classList.remove('open');
        sortOptions.classList.remove('show');
        // Reset margin when closing dropdown
        if (postsContainer) {
          postsContainer.style.transition = 'margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          postsContainer.style.marginTop = '2rem';
        }
      }
    });
  }

  // View toggle functionality
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const view = this.getAttribute('data-view');
      if (view !== currentView) {
        // Update button states
        viewButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        
        // Update container classes
        if (postsContainer) {
          postsContainer.classList.remove('post-grid', 'post-list');
          postsContainer.classList.add(view === 'grid' ? 'post-grid' : 'post-list');
        }
        
        currentView = view;
      }
    });
  });

  // Sort posts function
  function sortPosts(sortType) {
    const posts = Array.from(postCards);
    
    posts.sort((a, b) => {
      switch(sortType) {
        case 'date':
          const dateA = parseInt(a.getAttribute('data-date')) || 0;
          const dateB = parseInt(b.getAttribute('data-date')) || 0;
          return dateB - dateA; // Newest first
          
        case 'title':
          const titleA = a.getAttribute('data-title') || '';
          const titleB = b.getAttribute('data-title') || '';
          return titleA.localeCompare(titleB);
          
        case 'reading-time':
          const timeA = parseInt(a.getAttribute('data-reading-time')) || 0;
          const timeB = parseInt(b.getAttribute('data-reading-time')) || 0;
          return timeA - timeB; // Shortest first
          
        default:
          return 0;
      }
    });
    
    // Reorder DOM elements
    posts.forEach((post, index) => {
      if (postsContainer) {
        postsContainer.appendChild(post);
        // Add staggered animation
        post.style.animationDelay = (index * 50) + 'ms';
        post.classList.remove('animate__animated', 'animate__fadeInUp');
        // Trigger reflow
        post.offsetHeight;
        post.classList.add('animate__animated', 'animate__fadeInUp');
      }
    });
  }

  // Initialize animations for blog elements with staggered timing
  function initBlogAnimations() {
    // Animate title and description
    const pageTitle = document.querySelector('.page-title');
    const pageDesc = document.querySelector('.page-description');
    
    if (pageTitle) {
      pageTitle.classList.add('animate__animated', 'animate__fadeInDown');
      pageTitle.style.animationDelay = '0ms';
    }
    
    if (pageDesc) {
      pageDesc.classList.add('animate__animated', 'animate__fadeIn');
      pageDesc.style.animationDelay = '200ms';
    }
    
    // Featured post animation
    if (featuredPost) {
      featuredPost.classList.add('animate__animated', 'animate__fadeIn');
      featuredPost.style.animationDelay = '600ms';
    }
    
    // Stagger post card animations
    postCards.forEach((card, index) => {
      card.classList.add('animate__animated', 'animate__fadeInUp');
      card.style.animationDelay = (600 + (index * 100)) + 'ms';
    });
  }
  
  // Run the animations initialization
  initBlogAnimations();
  
  // Set initial posts count
  updatePostsCount();
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      filterPosts(query);
      toggleClearSearchButton();
    });
  }
  
  // Clear search
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', function() {
      searchInput.value = '';
      filterPosts('');
      toggleClearSearchButton();
    });
  }
  
  // Toggle clear search button visibility
  function toggleClearSearchButton() {
    if (clearSearchBtn && searchInput) {
      if (searchInput.value.length > 0) {
        clearSearchBtn.style.display = 'block';
      } else {
        clearSearchBtn.style.display = 'none';
      }
    }
  }
  
  // Initialize clear button state
  toggleClearSearchButton();
  
  // Filter posts based on search query
  function filterPosts(query) {
    let matchCount = 0;
    
    if (query.length === 0) {
      // Reset all animations and visibility when clearing search
      postCards.forEach((card, i) => {
        card.style.display = '';
        // Re-animate cards with staggered delay when returning to full view
        setTimeout(() => {
          card.classList.add('animate__animated', 'animate__fadeInUp');
          card.style.animationDelay = (i * 100) + 'ms';
        }, 50);
      });
      if (featuredPost) {
        featuredPost.style.display = '';
        featuredPost.classList.add('animate__animated', 'animate__fadeIn');
      }
      if (searchResults) {
        searchResults.style.display = 'none';
      }
      updatePostsCount();
      return;
    }
    
    postCards.forEach((card, i) => {
      const title = card.getAttribute('data-title') || '';
      const content = card.getAttribute('data-content') || '';
      const tags = card.getAttribute('data-tags') || '';
      
      if (title.includes(query) || content.includes(query) || tags.includes(query)) {
        card.style.display = '';
        // Animate matching cards with consistent but staggered animation
        card.classList.add('animate__animated', 'animate__fadeInUp');
        card.style.animationDelay = (matchCount * 100) + 'ms';
        matchCount++;
      } else {
        card.style.display = 'none';
        // Remove animation classes from hidden cards
        card.classList.remove('animate__animated', 'animate__fadeInUp');
      }
    });
    
    // Hide featured post during search
    if (featuredPost) featuredPost.style.display = 'none';
    
    // Update search results display
    if (searchResults) {
      searchResults.innerHTML = '';
      if (matchCount > 0) {
        const resultText = document.createElement('div');
        resultText.className = 'search-result-summary';
        resultText.textContent = `Found ${matchCount} matching article${matchCount !== 1 ? 's' : ''}`;
        searchResults.appendChild(resultText);
        searchResults.style.display = 'block';
      } else {
        const noResults = document.createElement('div');
        noResults.className = 'search-no-results';
        noResults.innerHTML = '<i class="fas fa-search"></i><span>No matching posts found</span>';
        searchResults.appendChild(noResults);
        searchResults.style.display = 'block';
      }
    }
    
    updatePostsCount();
  }
  
  // Filter by tag functionality
  function filterByTag(tag) {
    // Filter posts
    let visibleCount = 0;
    
    postCards.forEach(card => {
      const cardTags = card.getAttribute('data-tags') || '';
      if (cardTags.includes(tag.toLowerCase())) {
        card.style.display = '';
        card.classList.add('animate__animated', 'animate__fadeInUp');
        card.style.animationDelay = (visibleCount * 100) + 'ms';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.classList.remove('animate__animated', 'animate__fadeInUp');
      }
    });
    
    // Hide featured post during filtering
    if (featuredPost) featuredPost.style.display = 'none';
    
    // Clear search
    if (searchInput) {
      searchInput.value = '';
    }
    if (searchResults) {
      searchResults.style.display = 'none';
    }
    toggleClearSearchButton();
    
    updatePostsCount();
  }
  
  // Update posts count
  function updatePostsCount() {
    let visibleCount = 0;
    postCards.forEach(card => {
      if (card.style.display !== 'none') {
        visibleCount++;
      }
    });
    
    if (postsCount) {
      postsCount.textContent = `Showing ${visibleCount} of ${postCards.length} posts`;
    }
  }
  
  // Tag filtering for post tags
  document.querySelectorAll('.post-tag').forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const tagValue = this.getAttribute('data-tag');
      if (tagValue) {
        filterByTag(tagValue);
      }
    });
  });
});
