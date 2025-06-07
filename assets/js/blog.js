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
      
      // Show featured post and main sections
      if (featuredPost) {
        featuredPost.style.display = '';
        featuredPost.classList.add('animate__animated', 'animate__fadeIn');
      }
      
      // Show main sections
      const featuredSection = document.querySelector('.featured-section');
      const allPostsSection = document.querySelector('.all-posts-section');
      const blogControlsBar = document.querySelector('.blog-controls-bar');
      const paginationNav = document.querySelector('.pagination-nav');
      
      if (featuredSection) featuredSection.style.display = 'block';
      if (allPostsSection) allPostsSection.style.display = 'block';
      if (blogControlsBar) blogControlsBar.style.display = 'block';
      if (paginationNav) paginationNav.style.display = 'block';
      
      if (searchResults) {
        searchResults.style.display = 'none';
        searchResults.innerHTML = '';
      }
      updatePostsCount();
      return;
    }
    
    // Hide main sections during search for clean interface
    const featuredSection = document.querySelector('.featured-section');
    const allPostsSection = document.querySelector('.all-posts-section');
    const blogControlsBar = document.querySelector('.blog-controls-bar');
    const paginationNav = document.querySelector('.pagination-nav');
    
    if (featuredSection) featuredSection.style.display = 'none';
    if (allPostsSection) allPostsSection.style.display = 'none';
    if (blogControlsBar) blogControlsBar.style.display = 'none';
    if (paginationNav) paginationNav.style.display = 'none';
    
    // Show search results container
    if (searchResults) {
      searchResults.style.display = 'block';
    }
    
    // Filter and display search results
    const searchResultsHtml = [];
    
    // Create an array of all posts to search through (including featured post)
    const allPosts = [];
    
    // Add featured post if it exists
    if (featuredPost) {
      allPosts.push(featuredPost);
    }
    
    // Add all regular post cards
    postCards.forEach(card => {
      allPosts.push(card);
    });
    
    allPosts.forEach((card, i) => {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const content = (card.getAttribute('data-content') || '').toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      
      if (title.includes(query) || content.includes(query) || tags.includes(query)) {
        matchCount++;
        
        // Get post details from the card
        const postLink = card.querySelector('.post-link');
        const postTitle = card.classList.contains('featured-post-card') 
          ? card.querySelector('.featured-post-title') 
          : card.querySelector('.post-card-title');
        const postExcerpt = card.classList.contains('featured-post-card') 
          ? card.querySelector('.featured-post-excerpt') 
          : card.querySelector('.post-card-excerpt');
        const postMeta = card.classList.contains('featured-post-card') 
          ? card.querySelector('.featured-post-meta') 
          : card.querySelector('.post-card-meta');
        const categoryTag = card.querySelector('.article-category-tag');
        const postTags = card.querySelector('.post-tags');
        
        if (postLink && postTitle) {
          const isFeaturedResult = card.classList.contains('featured-post-card');
          const searchResultItem = `
            <article class="search-result-item animate__animated animate__fadeInUp" style="animation-delay: ${(matchCount - 1) * 100}ms">
              <div class="search-result-content">
                <header class="search-result-header">
                  ${categoryTag ? categoryTag.outerHTML : ''}
                  ${isFeaturedResult ? '<div class="featured-indicator"><i class="fas fa-crown"></i><span>Featured</span></div>' : ''}
                  <h3 class="search-result-title">
                    <a href="${postLink.href}" class="post-link">${postTitle.textContent.trim()}</a>
                  </h3>
                  ${postMeta ? `<div class="search-result-meta">${postMeta.innerHTML}</div>` : ''}
                </header>
                ${postExcerpt ? `<div class="search-result-excerpt">${postExcerpt.innerHTML}</div>` : ''}
                <footer class="search-result-footer">
                  ${postTags ? postTags.outerHTML : ''}
                  <a href="${postLink.href}" class="read-more-link">
                    <span>Read Article</span>
                    <i class="fas fa-arrow-right"></i>
                  </a>
                </footer>
              </div>
            </article>
          `;
          searchResultsHtml.push(searchResultItem);
        }
      }
    });
    
    // Update search results display
    if (searchResults) {
      if (matchCount > 0) {
        searchResults.innerHTML = `
          <div class="search-results-header">
            <h3 class="search-results-title">
              <i class="fas fa-search"></i>
              Search Results for "${query}"
            </h3>
            <p class="search-results-count">${matchCount} article${matchCount !== 1 ? 's' : ''} found</p>
            <button class="show-all-btn" onclick="showAllPosts()">
              <i class="fas fa-grid-3x3"></i>
              <span>Show All Posts</span>
            </button>
          </div>
          <div class="search-results-grid">
            ${searchResultsHtml.join('')}
          </div>
        `;
      } else {
        searchResults.innerHTML = `
          <div class="search-no-results">
            <div class="no-results-icon">
              <i class="fas fa-search"></i>
            </div>
            <h3>No articles found</h3>
            <p>No articles match your search for "<strong>${query}</strong>". Try different keywords or check the spelling.</p>
            <div class="search-suggestions-list">
              <p>You might want to search for:</p>
              <ul>
                <li><button class="suggestion-btn" onclick="document.getElementById('blog-search').value='topology'; document.getElementById('blog-search').dispatchEvent(new Event('input'));">Topology</button></li>
                <li><button class="suggestion-btn" onclick="document.getElementById('blog-search').value='analysis'; document.getElementById('blog-search').dispatchEvent(new Event('input'));">Analysis</button></li>
                <li><button class="suggestion-btn" onclick="document.getElementById('blog-search').value='number theory'; document.getElementById('blog-search').dispatchEvent(new Event('input'));">Number Theory</button></li>
                <li><button class="suggestion-btn" onclick="document.getElementById('blog-search').value='euler'; document.getElementById('blog-search').dispatchEvent(new Event('input'));">Euler</button></li>
              </ul>
            </div>
            <button class="show-all-btn" onclick="showAllPosts()">
              <i class="fas fa-grid-3x3"></i>
              <span>Show All Posts</span>
            </button>
          </div>
        `;
      }
    }
  }
  
  // Filter by tag functionality
  function filterByTag(tag) {
    // Clear search input first
    if (searchInput) {
      searchInput.value = '';
    }
    toggleClearSearchButton();
    
    // Hide main sections during filtering for clean interface
    const featuredSection = document.querySelector('.featured-section');
    const allPostsSection = document.querySelector('.all-posts-section');
    const blogControlsBar = document.querySelector('.blog-controls-bar');
    const paginationNav = document.querySelector('.pagination-nav');
    
    if (featuredSection) featuredSection.style.display = 'none';
    if (allPostsSection) allPostsSection.style.display = 'none';
    if (blogControlsBar) blogControlsBar.style.display = 'none';
    if (paginationNav) paginationNav.style.display = 'none';
    
    // Show search results container
    if (searchResults) {
      searchResults.style.display = 'block';
    }
    
    // Filter and display tag results
    let visibleCount = 0;
    const tagResultsHtml = [];
    
    // Create an array of all posts to search through (including featured post)
    const allPosts = [];
    
    // Add featured post if it exists
    if (featuredPost) {
      allPosts.push(featuredPost);
    }
    
    // Add all regular post cards
    postCards.forEach(card => {
      allPosts.push(card);
    });
    
    allPosts.forEach(card => {
      const cardTags = (card.getAttribute('data-tags') || '').toLowerCase();
      if (cardTags.includes(tag.toLowerCase())) {
        visibleCount++;
        
        // Get post details from the card
        const postLink = card.querySelector('.post-link');
        const postTitle = card.classList.contains('featured-post-card') 
          ? card.querySelector('.featured-post-title') 
          : card.querySelector('.post-card-title');
        const postExcerpt = card.classList.contains('featured-post-card') 
          ? card.querySelector('.featured-post-excerpt') 
          : card.querySelector('.post-card-excerpt');
        const postMeta = card.classList.contains('featured-post-card') 
          ? card.querySelector('.featured-post-meta') 
          : card.querySelector('.post-card-meta');
        const categoryTag = card.querySelector('.article-category-tag');
        const postTags = card.querySelector('.post-tags');
        
        if (postLink && postTitle) {
          const isFeaturedResult = card.classList.contains('featured-post-card');
          const tagResultItem = `
            <article class="search-result-item animate__animated animate__fadeInUp" style="animation-delay: ${(visibleCount - 1) * 100}ms">
              <div class="search-result-content">
                <header class="search-result-header">
                  ${categoryTag ? categoryTag.outerHTML : ''}
                  ${isFeaturedResult ? '<div class="featured-indicator"><i class="fas fa-crown"></i><span>Featured</span></div>' : ''}
                  <h3 class="search-result-title">
                    <a href="${postLink.href}" class="post-link">${postTitle.textContent.trim()}</a>
                  </h3>
                  ${postMeta ? `<div class="search-result-meta">${postMeta.innerHTML}</div>` : ''}
                </header>
                ${postExcerpt ? `<div class="search-result-excerpt">${postExcerpt.innerHTML}</div>` : ''}
                <footer class="search-result-footer">
                  ${postTags ? postTags.outerHTML : ''}
                  <a href="${postLink.href}" class="read-more-link">
                    <span>Read Article</span>
                    <i class="fas fa-arrow-right"></i>
                  </a>
                </footer>
              </div>
            </article>
          `;
          tagResultsHtml.push(tagResultItem);
        }
      }
    });
    
    // Update search results display
    if (searchResults) {
      if (visibleCount > 0) {
        searchResults.innerHTML = `
          <div class="search-results-header">
            <h3 class="search-results-title">
              <i class="fas fa-tag"></i>
              Articles tagged with "${tag.replace('-', ' ')}"
            </h3>
            <p class="search-results-count">${visibleCount} article${visibleCount !== 1 ? 's' : ''} found</p>
            <button class="show-all-btn" onclick="showAllPosts()">
              <i class="fas fa-grid-3x3"></i>
              <span>Show All Posts</span>
            </button>
          </div>
          <div class="search-results-grid">
            ${tagResultsHtml.join('')}
          </div>
        `;
      } else {
        searchResults.innerHTML = `
          <div class="search-no-results">
            <div class="no-results-icon">
              <i class="fas fa-tag"></i>
            </div>
            <h3>No articles found</h3>
            <p>No articles are tagged with "<strong>${tag.replace('-', ' ')}</strong>".</p>
            <button class="show-all-btn" onclick="showAllPosts()">
              <i class="fas fa-grid-3x3"></i>
              <span>Show All Posts</span>
            </button>
          </div>
        `;
      }
    }
  }
  
  // Update posts count
  function updatePostsCount() {
    let visibleCount = 0;
    let totalCount = 0;
    
    // Count featured post if it exists and is visible
    if (featuredPost) {
      totalCount++;
      if (featuredPost.style.display !== 'none') {
        visibleCount++;
      }
    }
    
    // Count regular post cards
    postCards.forEach(card => {
      totalCount++;
      if (card.style.display !== 'none') {
        visibleCount++;
      }
    });
    
    if (postsCount) {
      postsCount.textContent = `Showing ${visibleCount} of ${totalCount} posts`;
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
  
  // Function to show all posts (reset to normal view)
  window.showAllPosts = function() {
    // Clear search input
    if (searchInput) {
      searchInput.value = '';
    }
    toggleClearSearchButton();
    
    // Show main sections
    const featuredSection = document.querySelector('.featured-section');
    const allPostsSection = document.querySelector('.all-posts-section');
    const blogControlsBar = document.querySelector('.blog-controls-bar');
    const paginationNav = document.querySelector('.pagination-nav');
    
    if (featuredSection) featuredSection.style.display = 'block';
    if (allPostsSection) allPostsSection.style.display = 'block';
    if (blogControlsBar) blogControlsBar.style.display = 'block';
    if (paginationNav) paginationNav.style.display = 'block';
    
    // Hide search results
    if (searchResults) {
      searchResults.style.display = 'none';
      searchResults.innerHTML = '';
    }
    
    // Reset all post cards visibility
    postCards.forEach((card, i) => {
      card.style.display = '';
      // Re-animate cards with staggered delay
      setTimeout(() => {
        card.classList.add('animate__animated', 'animate__fadeInUp');
        card.style.animationDelay = (i * 50) + 'ms';
      }, 50);
    });
    
    // Show featured post
    if (featuredPost) {
      featuredPost.style.display = '';
      featuredPost.classList.add('animate__animated', 'animate__fadeIn');
    }
    
    updatePostsCount();
  };
  
  // Add escape key functionality to reset search
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && searchInput && (searchInput.value || searchResults.style.display === 'block')) {
      window.showAllPosts();
    }
  });
});
