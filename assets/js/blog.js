// Blog page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const searchInput = document.getElementById('blog-search');
  const clearSearchBtn = document.getElementById('clear-search');
  const searchResults = document.getElementById('search-results');
  const postCards = document.querySelectorAll('.post-card');
  const featuredPost = document.querySelector('.featured-post');
  const postsCount = document.getElementById('posts-count');
  
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
    searchResults.innerHTML = '';
    
    if (query.length === 0) {
      searchResults.style.display = 'none';
      postCards.forEach(card => card.style.display = '');
      if (featuredPost) featuredPost.style.display = '';
      updatePostsCount();
      return;
    }
    
    postCards.forEach(card => {
      const title = card.getAttribute('data-title') || '';
      const content = card.getAttribute('data-content') || '';
      const tags = card.getAttribute('data-tags') || '';
      
      if (title.includes(query) || content.includes(query) || tags.includes(query)) {
        card.style.display = '';
        matchCount++;
        
        // Add to search results dropdown (limit to 5)
        if (matchCount <= 5) {
          const resultItem = document.createElement('div');
          resultItem.className = 'search-result-item';
          resultItem.textContent = card.querySelector('.post-link').textContent;
          resultItem.addEventListener('click', function() {
            window.location.href = card.querySelector('.post-link').href;
          });
          searchResults.appendChild(resultItem);
        }
      } else {
        card.style.display = 'none';
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
  
  // Close search results when clicking outside
  document.addEventListener('click', function(event) {
    if (event.target !== searchInput && !searchResults.contains(event.target)) {
      searchResults.style.display = 'none';
    }
  });
  
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
