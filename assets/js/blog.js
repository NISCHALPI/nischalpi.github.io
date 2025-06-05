// Blog page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const searchInput = document.getElementById('blog-search');
  const clearSearchBtn = document.getElementById('clear-search');
  const searchResults = document.getElementById('search-results');
  const postCards = document.querySelectorAll('.post-card');
  const featuredPost = document.querySelector('.featured-post');
  const postsCount = document.getElementById('posts-count');
  
  // Initialize animations for blog elements with staggered timing
  function initBlogAnimations() {
    // Animate title and description
    const pageTitle = document.querySelector('.page-title');
    const pageDesc = document.querySelector('.page-description');
    const searchContainer = document.querySelector('.blog-search-container');
    
    if (pageTitle) {
      pageTitle.classList.add('animate__animated', 'animate__fadeInDown');
      pageTitle.style.animationDelay = '0ms';
    }
    
    if (pageDesc) {
      pageDesc.classList.add('animate__animated', 'animate__fadeIn');
      pageDesc.style.animationDelay = '200ms';
    }
    
    if (searchContainer) {
      searchContainer.classList.add('animate__animated', 'animate__fadeIn');
      searchContainer.style.animationDelay = '400ms';
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
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    filterPosts(query);
    toggleClearSearchButton();
  });
  
  // Clear search
  clearSearchBtn.addEventListener('click', function() {
    searchInput.value = '';
    filterPosts('');
    toggleClearSearchButton();
  });
  
  // Toggle clear search button visibility
  function toggleClearSearchButton() {
    if (searchInput.value.length > 0) {
      clearSearchBtn.style.display = 'block';
    } else {
      clearSearchBtn.style.display = 'none';
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
    
    // Show/hide search results dropdown
    if (matchCount > 0) {
      searchResults.style.display = 'block';
      if (matchCount > 5) {
        const moreResults = document.createElement('div');
        moreResults.className = 'search-result-more';
        moreResults.textContent = `+ ${matchCount - 5} more results`;
        searchResults.appendChild(moreResults);
      }
    } else {
      searchResults.innerHTML = '<div class="search-no-results">No matching posts found</div>';
      searchResults.style.display = 'block';
    }
    
    updatePostsCount();
  }
  
  // No need for the click outside handler since we removed the dropdown
  
  // Filter by tag - simplified version
  function filterByTag(tag) {
    // Filter posts
    let visibleCount = 0;
    
    postCards.forEach(card => {
      const cardTags = card.getAttribute('data-tags') || '';
      if (cardTags.includes(tag)) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Hide featured post during filtering
    if (featuredPost) featuredPost.style.display = 'none';
    
    // Clear search
    searchInput.value = '';
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
  document.querySelectorAll('.post-card-tags .post-tag, .featured-post-tags .post-tag').forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const tagValue = this.getAttribute('data-tag');
      filterByTag(tagValue);
    });
  });
});
