---
layout: default
title: Blog
permalink: /blog/
pagination: 
  enabled: true
---

<script src="{{ '/assets/js/blog.js' | relative_url }}" defer></script>

<div class="blog-container">
  <header class="page-header">
    <h1 class="page-title animate__animated animate__fadeIn">{{ page.title }}</h1>
    <p class="page-description animate-on-scroll" data-animation="animate__fadeIn">Thoughts, insights, and explorations in the world of mathematics.</p>
  </header>

  <!-- Blog Search Bar -->
  <div class="blog-search-container animate-on-scroll" data-animation="animate__fadeIn">
    <div class="search-input-wrapper">
      <i class="fas fa-search search-icon"></i>
      <input type="text" id="blog-search" class="blog-search" placeholder="Search posts by title, content, or tag..." aria-label="Search blog posts">
      <button id="clear-search" class="clear-search-btn" title="Clear search"><i class="fas fa-times"></i></button>
    </div>
    <div id="search-results" class="search-results"></div>
  </div>

  <!-- Featured Blog Post -->
  {% assign featured_posts = site.posts | where: "featured", true | sort: "date" | reverse %}
  {% if featured_posts.size > 0 %}
    {% assign featured_post = featured_posts.first %}
  {% else %}
    {% assign featured_post = site.posts.first %}
  {% endif %}
  {% if featured_post %}
  <div class="featured-post animate-on-scroll" data-animation="animate__fadeIn">
    <h2 class="featured-title">Featured Post</h2>
    <div class="featured-post-card">
      {% if featured_post.image %}
      <div class="featured-post-image">
        <img src="{{ featured_post.image | relative_url }}" alt="{{ featured_post.title }}">
      </div>
      {% endif %}
      <div class="featured-post-content">
        <h3>
          <a class="featured-post-link" href="{{ featured_post.url | relative_url }}">
            {{ featured_post.title | escape }}
          </a>
        </h3>
        <div class="featured-post-excerpt">
          {{ featured_post.excerpt | strip_html | truncatewords: 50 }}
        </div>
        <div class="featured-post-meta">
          <span class="post-meta"><i class="far fa-calendar-alt"></i> {{ featured_post.date | date: "%b %-d, %Y" }}</span>
          <div class="featured-post-tags">
            {% for category in featured_post.categories %}
              <a href="#" class="post-tag" data-tag="{{ category | slugify }}">{{ category }}</a>
            {% endfor %}
          </div>
        </div>
        <div class="featured-post-read-more">
          <a href="{{ featured_post.url | relative_url }}" class="featured-read-more-link">Read More</a>
        </div>
      </div>
    </div>
  </div>
  {% endif %}

  <div class="blog-posts-heading">
    <h2>All Posts</h2>
    <p id="posts-count" class="posts-count"></p>
  </div>

  <div class="grid-container post-grid">
    {%- if site.posts.size > 0 -%}
      {%- if paginator.posts.size > 0 -%}
        {%- for post in paginator.posts -%}
          {%- unless post.url == featured_post.url -%}
          <div class="card post-card animate-on-scroll" data-animation="animate__fadeInUp" data-tags="{% for cat in post.categories %}{{ cat | slugify }} {% endfor %}" data-title="{{ post.title | escape | downcase }}" data-content="{{ post.excerpt | strip_html | downcase }}">
            {% if post.image %}
            <div class="post-card-image">
              <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
            </div>
            {% endif %}
            <div class="post-card-content">
              <h3>
                <a class="post-link" href="{{ post.url | relative_url }}">
                  {{ post.title | escape }}
                </a>
              </h3>
              <div class="post-card-meta">
                <span class="post-meta"><i class="far fa-calendar-alt"></i> {{ post.date | date: "%B %-d, %Y" }}</span>
                <div class="post-card-tags">
                  {% for category in post.categories %}
                    <a href="#" class="post-tag" data-tag="{{ category | slugify }}">{{ category }}</a>
                  {% endfor %}
                </div>
              </div>
              <div class="post-card-read-more">
                <a href="{{ post.url | relative_url }}" class="read-more-link">Read More</a>
              </div>
            </div>
          </div>
          {%- endunless -%}
        {%- endfor -%}
      {%- else -%}
        {%- for post in site.posts -%}
          {%- unless post.url == featured_post.url -%}
          <div class="card post-card animate-on-scroll" data-animation="animate__fadeInUp" data-tags="{% for cat in post.categories %}{{ cat | slugify }} {% endfor %}" data-title="{{ post.title | escape | downcase }}" data-content="{{ post.excerpt | strip_html | downcase }}">
            {% if post.image %}
            <div class="post-card-image">
              <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
            </div>
            {% endif %}
            <div class="post-card-content">
              <h3>
                <a class="post-link" href="{{ post.url | relative_url }}">
                  {{ post.title | escape }}
                </a>
              </h3>
              <div class="post-card-meta">
                <span class="post-meta"><i class="far fa-calendar-alt"></i> {{ post.date | date: "%B %-d, %Y" }}</span>
                <div class="post-card-tags">
                  {% for category in post.categories %}
                    <a href="#" class="post-tag" data-tag="{{ category | slugify }}">{{ category }}</a>
                  {% endfor %}
                </div>
              </div>
              <div class="post-card-read-more">
                <a href="{{ post.url | relative_url }}" class="read-more-link">Read More</a>
              </div>
            </div>
          </div>
          {%- endunless -%}
        {%- endfor -%}
      {%- endif -%}
    {%- endif -%}
  </div>

  <!-- Pagination links -->
  {% if paginator.total_pages > 1 %}
  <div class="pagination animate-on-scroll" data-animation="animate__fadeIn">
    {% if paginator.previous_page %}
      <a href="{{ paginator.previous_page_path | relative_url }}" class="button">&laquo; Prev</a>
    {% endif %}
    
    {% for page in (1..paginator.total_pages) %}
      {% if page == paginator.page %}
        <span class="pagination-current">{{ page }}</span>
      {% else %}
        <a href="{{ site.paginate_path | relative_url | replace: ':num', page }}">{{ page }}</a>
      {% endif %}
    {% endfor %}
    
    {% if paginator.next_page %}
      <a href="{{ paginator.next_page_path | relative_url }}" class="button">Next &raquo;</a>
    {% endif %}
  </div>
  {% endif %}
</div>
