---
layout: default
title: Blog
permalink: /blog/
pagination: 
  enabled: true
---

<div class="blog-container">
  <header class="page-header">
    <h1 class="page-title animate__animated animate__fadeIn">{{ page.title }}</h1>
    <p class="page-description animate-on-scroll" data-animation="animate__fadeIn">Thoughts, insights, and explorations in the world of mathematics.</p>
  </header>

  <div class="blog-categories animate-on-scroll" data-animation="animate__fadeIn">
    <span class="category-label">Filter by category:</span>
    <div class="category-buttons">
      <button class="category-button active" data-category="all">All</button>
      {% assign categories = site.posts | map: "categories" | flatten | uniq %}
      {% for category in categories %}
        <button class="category-button" data-category="{{ category | slugify }}">{{ category }}</button>
      {% endfor %}
    </div>
  </div>

  <div class="grid-container post-grid">
    {%- if site.posts.size > 0 -%}
      {%- for post in paginator.posts -%}
      <div class="card post-card animate-on-scroll" data-animation="animate__fadeInUp" data-categories="{% for cat in post.categories %}{{ cat | slugify }} {% endfor %}">
        <div class="post-card-content">
          <h2>
            <a class="post-link" href="{{ post.url | relative_url }}">
              {{ post.title | escape }}
            </a>
          </h2>
          <div class="post-card-excerpt">
            {{ post.excerpt | strip_html | truncatewords: 30 }}
          </div>
          <div class="post-card-meta">
            <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
            <div class="post-card-categories">
              {% for category in post.categories %}
                <span class="post-card-category">{{ category }}</span>
              {% endfor %}
            </div>
          </div>
        </div>
      </div>
      {%- endfor -%}
    {%- endif -%}
  </div>

  <!-- Pagination links -->
  {% if paginator.total_pages > 1 %}
  <div class="pagination">
    {% if paginator.previous_page %}
      <a href="{{ paginator.previous_page_path | relative_url }}" class="pagination-previous">&laquo; Previous</a>
    {% endif %}

    {% for page in (1..paginator.total_pages) %}
      {% if page == paginator.page %}
        <span class="pagination-item current">{{ page }}</span>
      {% elsif page == 1 %}
        <a href="{{ '/blog/' | relative_url }}" class="pagination-item">{{ page }}</a>
      {% else %}
        <a href="{{ site.paginate_path | relative_url | replace: ':num', page }}" class="pagination-item">{{ page }}</a>
      {% endif %}
    {% endfor %}

    {% if paginator.next_page %}
      <a href="{{ paginator.next_page_path | relative_url }}" class="pagination-next">Next &raquo;</a>
    {% endif %}
  </div>
  {% endif %}
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

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-button');
    const postCards = document.querySelectorAll('.post-card');
    
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter posts
        postCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-categories').includes(category)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
</script>
