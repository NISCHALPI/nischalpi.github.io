# Mathematics PhD Portfolio

This is a professional portfolio website for a mathematics PhD student, built with Jekyll and designed to be deployed on GitHub Pages.

## Features

- Clean, professional design with subtle animations
- Mobile-responsive layout
- MathJax support for mathematical notation
- Blog section with sample posts
- Research publications with BibTeX integration
- Teaching materials and philosophy
- Books and resources recommendations
- Contact information and form

## Getting Started

### Prerequisites

- Ruby version 2.5.0 or higher
- RubyGems
- GCC and Make

### Installation

1. Clone this repository
2. Install dependencies:
```
bundle install
```

3. Build the site and run the local server:
```
bundle exec jekyll serve
```

4. Browse to http://localhost:4000/math-portfolio/

## Deployment on GitHub Pages

1. Push this repository to GitHub
2. In your GitHub repository settings, enable GitHub Pages and select the main branch as the source

## Customizing

### Site Configuration

Edit `_config.yml` to customize:
- Site title and description
- Your author information
- Social media links
- Navigation links
- Other site-wide settings

### Content

- Home page: `index.md`
- Research: `research.md`
- Blog: `blog.md` and posts in the `_posts` directory
- Teaching: `teaching.md`
- Books & Resources: `books.md`
- Contact: `contact.md`

### Adding Blog Posts

Create new files in the `_posts` directory with the naming convention `YYYY-MM-DD-title.md`. Include the following front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
categories: Category1 Category2
mathjax: true
---
```

### Adding Publications

Edit the BibTeX file in `_bibliography/references.bib` to add your publications.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- Jekyll theme based on [Minimal](https://github.com/pages-themes/minimal)
- Animations powered by [Animate.css](https://animate.style/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Mathematical typesetting by [MathJax](https://www.mathjax.org/)
