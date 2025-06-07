---
layout: default
title: Blog
permalink: /blog/
pagination: 
  enabled: true
  per_page: 8
---

<script src="{{ '/assets/js/blog.js' | relative_url }}" defer></script>

<div class="blog-container">
  <header class="page-header">
    <div class="page-header-background">
      <div class="header-pattern"></div>
      <div class="header-gradient"></div>
    </div>
    <div class="page-header-content">
      <div class="header-icon">
        <i class="fas fa-infinity logo logo-xl"></i>
      </div>
      <h1 class="page-title animate__animated animate__fadeInDown">Mathematical Insights</h1>
      <p class="page-description animate-on-scroll" data-animation="animate__fadeIn">
        Exploring the elegance, complexity, and profound applications of mathematics through rigorous analysis and thoughtful discourse. Discover the hidden patterns that govern our universe.
      </p>
      <div class="blog-stats animate-on-scroll" data-animation="animate__fadeIn" data-delay="200ms">
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ site.posts.size }}</span>
            <span class="stat-label">Articles Published</span>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-tags"></i>
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ site.categories.size }}</span>
            <span class="stat-label">Mathematical Topics</span>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ site.posts | map: 'content' | join: ' ' | number_of_words | divided_by: 200 }}</span>
            <span class="stat-label">Minutes of Reading</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Enhanced Search and Discovery Section -->
  <section class="blog-search-section animate-on-scroll" data-animation="animate__fadeIn">
    <div class="search-container">
      <div class="search-header">
        <h2 class="search-title">Discover Mathematical Content</h2>
        <p class="search-subtitle">Search through our collection of mathematical articles and insights</p>
      </div>
      
      <div class="search-input-wrapper">
        <div class="search-input-container">
          <i class="fas fa-search search-icon"></i>
          <input type="text" id="blog-search" class="blog-search" 
                 placeholder="Search articles by title, content, mathematical concepts..." 
                 aria-label="Search blog posts">
          <button id="clear-search" class="clear-search-btn" title="Clear search">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="search-suggestions" id="search-suggestions"></div>
      </div>
    </div>
    <div id="search-results" class="search-results"></div>
  </section>

  <!-- Featured Article Showcase -->
  {% assign featured_posts = site.posts | where: "featured", true | sort: "date" | reverse %}
  {% if featured_posts.size > 0 %}
    {% assign featured_post = featured_posts.first %}
  {% else %}
    {% assign featured_post = site.posts.first %}
  {% endif %}
  {%- if featured_post -%}
  <section class="featured-section animate-on-scroll" data-animation="animate__fadeIn">
    <div class="section-header section-header-decorated">
      <div class="section-title-container">
        <h2 class="section-title">Featured Article</h2>
      </div>
      <div class="featured-badge">
        <i class="fas fa-crown"></i>
        <span>Editor's Choice</span>
      </div>
    </div>
    
    <article class="featured-post-card" data-title="{{ featured_post.title }}" 
             data-content="{{ featured_post.content | strip_html }}" 
             data-tags="{{ featured_post.categories | join: ' ' }}">
      {% if featured_post.image %}
      <div class="featured-post-image">
        <img src="{{ featured_post.image | relative_url }}" alt="{{ featured_post.title }}" loading="lazy">
        <div class="image-overlay">
          <div class="image-gradient"></div>
        </div>
      </div>
      {% endif %}
      
      <div class="featured-post-content">
        <header class="featured-post-header">
          {% if featured_post.categories.first %}
          <div class="article-category-tag">
            <i class="fas fa-{% if featured_post.categories.first contains 'Number' %}calculator{% elsif featured_post.categories.first contains 'Analysis' %}chart-line{% elsif featured_post.categories.first contains 'Topology' %}project-diagram{% elsif featured_post.categories.first contains 'Applied' %}cogs{% else %}infinity{% endif %}"></i>
            <span>{{ featured_post.categories.first }}</span>
          </div>
          {% endif %}
          <div class="post-difficulty">
            <span class="difficulty-badge intermediate">
              <i class="fas fa-signal"></i>
              <span>Intermediate</span>
            </span>
          </div>
          <h3 class="featured-post-title">
            <a href="{{ featured_post.url | relative_url }}" class="post-link">
              {{ featured_post.title | escape }}
            </a>
          </h3>
          <div class="featured-post-meta">
            <span class="post-date">
              <i class="far fa-calendar-alt"></i>
              <span>{{ featured_post.date | date: "%B %-d, %Y" }}</span>
            </span>
            <span class="meta-divider">•</span>
            <span class="read-time">
              <i class="far fa-clock"></i>
              <span>{{ featured_post.content | number_of_words | divided_by: 200 | plus: 1 }} min read</span>
            </span>
            <span class="meta-divider">•</span>
            <span class="word-count">
              <i class="fas fa-file-word"></i>
              <span>{{ featured_post.content | number_of_words }} words</span>
            </span>
          </div>
        </header>
        
        <div class="featured-post-excerpt">
          <p>{{ featured_post.excerpt | strip_html | truncatewords: 35 }}</p>
        </div>
        
        <footer class="featured-post-footer">
          {% if featured_post.categories %}
          <div class="post-tags">
            {% for category in featured_post.categories limit: 3 %}
              <span class="post-tag" data-tag="{{ category }}">
                <i class="fas fa-tag"></i>
                <span>{{ category | replace: '-', ' ' }}</span>
              </span>
            {% endfor %}
          </div>
          {% endif %}
          <a href="{{ featured_post.url | relative_url }}" class="read-more-btn">
            <span>Continue Reading</span>
            <i class="fas fa-arrow-right"></i>
          </a>
        </footer>
      </div>
    </article>
  </section>
  {%- endif -%}

  <!-- Enhanced Articles Grid Section -->
  <section class="all-posts-section animate-on-scroll" data-animation="animate__fadeIn">
    <div class="section-header section-header-decorated">
      <div class="section-title-container">
        <h2 class="section-title">Latest Articles</h2>
      </div>
    </div>
    
    <!-- Moved Post Controls Bar -->
    <div class="blog-controls-bar">
      <div class="posts-controls">
        <div class="posts-summary">
          <span id="posts-count" class="posts-count"></span>
        </div>
        <div class="view-controls">
          <div class="sort-dropdown">
            <button class="sort-btn" id="sort-btn" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-sort-amount-down-alt"></i>
              <span>Sort by Date</span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="sort-options" id="sort-options" role="menu">
              <button class="sort-option active" data-sort="date" role="menuitemradio" aria-checked="true">
                <i class="fas fa-calendar-alt"></i> <span>Date</span>
              </button>
              <button class="sort-option" data-sort="title" role="menuitemradio" aria-checked="false">
                <i class="fas fa-font"></i> <span>Title</span>
              </button>
              <button class="sort-option" data-sort="reading-time" role="menuitemradio" aria-checked="false">
                <i class="far fa-clock"></i> <span>Reading Time</span>
              </button>
            </div>
          </div>
          <div class="view-toggle">
            <button class="view-btn active" data-view="grid" title="Grid view" aria-label="Switch to grid view" aria-pressed="true">
              <i class="fas fa-th-large"></i>
            </button>
            <button class="view-btn" data-view="list" title="List view" aria-label="Switch to list view" aria-pressed="false">
              <i class="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="posts-container post-grid" id="posts-container">
      {%- if site.posts.size > 0 -%}
        {%- if paginator.posts.size > 0 -%}
          {%- for post in paginator.posts -%}
            {%- unless post.url == featured_post.url -%}
            <article class="post-card animate-on-scroll" data-animation="animate__fadeInUp" 
                     data-title="{{ post.title | downcase }}" 
                     data-content="{{ post.content | strip_html | downcase }}" 
                     data-tags="{{ post.categories | join: ' ' | downcase }}"
                     data-date="{{ post.date | date: '%Y%m%d' }}"
                     data-reading-time="{{ post.content | number_of_words | divided_by: 200 | plus: 1 }}"
                     data-delay="{{ forloop.index | times: 50 }}ms">
              
              <div class="post-card-header">
                {% if post.image %}
                <div class="post-card-image">
                  <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
                  <div class="image-overlay">
                    <div class="image-gradient"></div>
                  </div>
                </div>
                {% endif %}
                
                <div class="post-difficulty">
                  <span class="difficulty-badge {% cycle 'beginner', 'intermediate', 'advanced' %}">
                    <i class="fas fa-signal"></i>
                    <span>{% cycle 'Beginner', 'Intermediate', 'Advanced' %}</span>
                  </span>
                </div>
              </div>
              
              <div class="post-card-content">
                <header class="post-card-header-content">
                  {% if post.categories.first %}
                  <div class="article-category-tag">
                     <i class="fas fa-{% if post.categories.first contains 'Number' %}calculator{% elsif post.categories.first contains 'Analysis' %}chart-line{% elsif post.categories.first contains 'Topology' %}project-diagram{% elsif post.categories.first contains 'Applied' %}cogs{% else %}infinity{% endif %}"></i>
                     <span>{{ post.categories.first | replace: '-', ' ' }}</span>
                  </div>
                  {% endif %}
                  <h3 class="post-card-title">
                    <a href="{{ post.url | relative_url }}" class="post-link">
                      {{ post.title | escape }}
                    </a>
                  </h3>
                  <div class="post-card-meta">
                    <span class="post-date">
                      <i class="far fa-calendar-alt"></i>
                      <span>{{ post.date | date: "%b %-d, %Y" }}</span>
                    </span>
                    <span class="meta-divider">•</span>
                    <span class="read-time">
                      <i class="far fa-clock"></i>
                      <span>{{ post.content | number_of_words | divided_by: 200 | plus: 1 }} min</span>
                    </span>
                    <span class="meta-divider">•</span>
                    <span class="word-count">
                      <i class="fas fa-file-word"></i>
                      <span>{{ post.content | number_of_words }}</span>
                    </span>
                  </div>
                </header>
                
                <div class="post-card-excerpt">
                  <p>{{ post.excerpt | strip_html | truncatewords: 22 }}</p>
                </div>
                
                <footer class="post-card-footer">
                  {% if post.categories %}
                  <div class="post-tags">
                    {% for category in post.categories limit: 2 %}
                      <span class="post-tag" data-tag="{{ category }}">
                        <i class="fas fa-tag"></i>
                        <span>{{ category | replace: '-', ' ' }}</span>
                      </span>
                    {% endfor %}
                  </div>
                  {% endif %}
                  <a href="{{ post.url | relative_url }}" class="read-more-link">
                    <span>Read Article</span>
                    <i class="fas fa-arrow-right"></i>
                  </a>
                </footer>
              </div>
            </article>
            {%- endunless -%}
          {%- endfor -%}
        {%- else -%}
          {%- for post in site.posts -%}
            {%- unless post.url == featured_post.url -%}
            <article class="post-card animate-on-scroll" data-animation="animate__fadeInUp" 
                     data-title="{{ post.title | downcase }}" 
                     data-content="{{ post.content | strip_html | downcase }}" 
                     data-tags="{{ post.categories | join: ' ' | downcase }}"
                     data-date="{{ post.date | date: '%Y%m%d' }}"
                     data-reading-time="{{ post.content | number_of_words | divided_by: 200 | plus: 1 }}"
                     data-delay="{{ forloop.index | times: 100 }}ms">
              {% if post.image %}
              <div class="post-card-image">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
                <div class="image-overlay">
                </div>
              </div>
              {% endif %}
              
              <div class="post-card-content">
                <header class="post-card-header">
                  {% if post.categories.first %}
                  <div class="article-category-tag">
                     <i class="fas fa-{% if post.categories.first contains 'Number' %}calculator{% elsif post.categories.first contains 'Analysis' %}chart-line{% elsif post.categories.first contains 'Topology' %}project-diagram{% elsif post.categories.first contains 'Applied' %}cogs{% else %}infinity{% endif %}"></i>
                     <span>{{ post.categories.first | replace: '-', ' ' }}</span>
                  </div>
                  {% endif %}
                  <h3 class="post-card-title">
                    <a href="{{ post.url | relative_url }}" class="post-link">
                      {{ post.title | escape }}
                    </a>
                  </h3>
                  <div class="post-card-meta">
                    <span class="post-date">
                      <i class="far fa-calendar-alt"></i>
                      {{ post.date | date: "%b %-d, %Y" }}
                    </span>
                    <span class="read-time">
                      <i class="far fa-clock"></i>
                      {{ post.content | number_of_words | divided_by: 200 | plus: 1 }} min
                    </span>
                  </div>
                </header>
                
                <div class="post-card-excerpt">
                  {{ post.excerpt | strip_html | truncatewords: 20 }}
                </div>
                
                <footer class="post-card-footer">
                  {% if post.categories %}
                  <div class="post-tags">
                    {% for category in post.categories limit: 2 %}
                      <span class="post-tag" data-tag="{{ category }}">
                        <i class="fas fa-tag"></i>
                        <span>{{ category | replace: '-', ' ' }}</span>
                      </span>
                    {% endfor %}
                  </div>
                  {% endif %}
                  <a href="{{ post.url | relative_url }}" class="read-more-link">
                    Read Article
                    <i class="fas fa-arrow-right"></i>
                  </a>
                </footer>
              </div>
            </article>
            {%- endunless -%}
          {%- endfor -%}
        {%- endif -%}
      {%- else -%}
        <div class="no-posts-message">
          <i class="fas fa-file-alt"></i>
          <h3>No articles yet</h3>
          <p>Check back soon for mathematical insights and explorations.</p>
        </div>
      {%- endif -%}
    </div>
  </section>

  <!-- Enhanced Pagination -->
  {% if paginator.total_pages > 1 %}
  <nav class="pagination-nav animate-on-scroll" data-animation="animate__fadeIn" aria-label="Blog pagination">
    <div class="pagination-container">
      {% if paginator.previous_page %}
        <a href="{{ paginator.previous_page_path | relative_url }}" class="pagination-btn pagination-prev">
          <i class="fas fa-chevron-left"></i>
          <span>Previous</span>
        </a>
      {% endif %}
      
      <div class="pagination-numbers">
        {% assign start_page = paginator.page | minus: 2 %}
        {% assign end_page = paginator.page | plus: 2 %}
        {% if start_page < 1 %}
          {% assign start_page = 1 %}
          {% assign end_page = 5 %}
        {% endif %}
        {% if end_page > paginator.total_pages %}
          {% assign end_page = paginator.total_pages %}
          {% assign start_page = paginator.total_pages | minus: 4 %}
          {% if start_page < 1 %}
            {% assign start_page = 1 %}
          {% endif %}
        {% endif %}
        
        {% if start_page > 1 %}
          <a href="{{ site.paginate_path | relative_url | replace: ':num', 1 }}" class="pagination-number">1</a>
          {% if start_page > 2 %}
            <span class="pagination-ellipsis">...</span>
          {% endif %}
        {% endif %}
        
        {% for page in (start_page..end_page) %}
          {% if page == paginator.page %}
            <span class="pagination-number pagination-current">{{ page }}</span>
          {% else %}
            <a href="{{ site.paginate_path | relative_url | replace: ':num', page }}" class="pagination-number">{{ page }}</a>
          {% endif %}
        {% endfor %}
        
        {% if end_page < paginator.total_pages %}
          {% assign one_less_than_total_pages = paginator.total_pages | minus: 1 %}
          {% if end_page < one_less_than_total_pages %}
            <span class="pagination-ellipsis">...</span>
          {% endif %}
          <a href="{{ site.paginate_path | relative_url | replace: ':num', paginator.total_pages }}" class="pagination-number">{{ paginator.total_pages }}</a>
        {% endif %}
      </div>
      
      {% if paginator.next_page %}
        <a href="{{ paginator.next_page_path | relative_url }}" class="pagination-btn pagination-next">
          <span>Next</span>
          <i class="fas fa-chevron-right"></i>
        </a>
      {% endif %}
    </div>
    
    <div class="pagination-info">
      <span>Page {{ paginator.page }} of {{ paginator.total_pages }}</span>
    </div>
  </nav>
  {% endif %}
</div>
