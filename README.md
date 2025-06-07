# Nischal Bhattarai - Mathematics PhD Portfolio

A professional Jekyll-based portfolio website for mathematics PhD students and academics. This site showcases academic work, research, teaching experience, and provides a platform for mathematical blogging with full MathJax support.

🌟 **Live Site:** [https://nischalpi.github.io](https://nischalpi.github.io)

## 🚀 Quick Start Guide

### Prerequisites
- **Ruby** 3.2+ installed
- **Git** for version control
- **Text editor** (VS Code, Sublime, etc.)

### Local Development Setup
```bash
# Clone and setup
git clone https://github.com/NISCHALPI/nischalpi.github.io.git
cd nischalpi.github.io

# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# View at: http://localhost:4000
```

## 📝 Content Management Guide

### Adding New Blog Posts

1. **Create a new file** in `_posts/` folder with the naming format:
   ```
   YYYY-MM-DD-your-post-title.md
   ```

2. **Add the front matter** at the top of your file:
   ```yaml
   ---
   layout: post
   title: "Your Amazing Math Topic"
   date: 2025-06-07
   categories: [Number Theory, Analysis]  # Choose relevant categories
   tags: [riemann-hypothesis, prime-numbers, analysis]
   mathjax: true  # Enable math rendering
   description: "A brief description of your post for SEO"
   ---
   ```

3. **Write your content** using Markdown with MathJax:
   ```markdown
   # Introduction

   When discussing the Riemann Hypothesis, we often start with the zeta function:

   $$\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}$$

   For inline math, use single dollar signs like $\pi \approx 3.14159$.

   ## Your Section

   Continue writing your mathematical content...
   ```

4. **Save and test** locally with `bundle exec jekyll serve`

### Example Blog Post Structure
```markdown
---
layout: post
title: "Understanding the Riemann Hypothesis"
date: 2025-06-07
categories: [Number Theory]
tags: [riemann-hypothesis, zeta-function, prime-numbers]
mathjax: true
description: "An exploration of one of mathematics' greatest unsolved problems"
---

# The Riemann Hypothesis: A Mathematical Mystery

The Riemann Hypothesis stands as one of the most famous unsolved problems in mathematics...

## The Riemann Zeta Function

The journey begins with Euler's zeta function:

$$\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} = \prod_{p \text{ prime}} \frac{1}{1-p^{-s}}$$

## Critical Line and Non-Trivial Zeros

The hypothesis states that all non-trivial zeros of $\zeta(s)$ lie on the critical line $\Re(s) = \frac{1}{2}$...
```

## 🎨 Customizing Your Site

### Basic Site Information
Edit `_config.yml` to update:
```yaml
title: "Your Name | Mathematics PhD"
description: "Your specialization description"
author: "Your Full Name"
email: "your.email@university.edu"
url: "https://yourusername.github.io"
```

### Navigation Menu
Update the navigation in `_config.yml`:
```yaml
header_pages:
  - index.md          # Home page
  - research.md       # Research & Publications
  - blog.md          # Blog posts
  - teaching.md      # Teaching experience
  - resources.md     # Useful resources
  - contact.md       # Contact information
```

### Adding Your Information

1. **Update the homepage** (`index.md`):
   - Replace the bio section with your information
   - Update research interests
   - Add your photo to `/assets/images/profile.jpg`

2. **Research page** (`research.md`):
   - Add your publications
   - Include current research projects
   - Link to papers and preprints

3. **Teaching page** (`teaching.md`):
   - List courses you've taught
   - Include teaching philosophy
   - Add links to course materials

### Managing Publications
Add your publications to `_bibliography/references.bib`:
```bibtex
@article{your2024paper,
  title={Your Amazing Mathematical Result},
  author={Bhattarai, Nischal and Collaborator, Jane},
  journal={Journal of Pure Mathematics},
  volume={42},
  number={3},
  pages={123--456},
  year={2024},
  publisher={Mathematical Society}
}
```

## 🎯 Advanced Features

### Categories and Tags
- **Categories**: Broad topics like "Number Theory", "Analysis", "Topology"
- **Tags**: Specific topics like "riemann-hypothesis", "measure-theory", "algebraic-topology"

### Math Rendering
Use MathJax for beautiful mathematical expressions:

- **Inline math**: `$E = mc^2$` → $E = mc^2$
- **Display math**: 
  ```latex
  $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
  ```
- **Aligned equations**:
  ```latex
  $$\begin{align}
  f(x) &= ax^2 + bx + c \\
  f'(x) &= 2ax + b
  \end{align}$$
  ```

### Adding Images
1. Place images in `/assets/images/`
2. Reference in posts:
   ```markdown
   ![Description]({{ site.baseurl }}/assets/images/your-image.jpg)
   ```

### Code Highlighting
```python
# Python code example
import numpy as np
import matplotlib.pyplot as plt

def riemann_zeta_approximation(s, terms=1000):
    return sum(1/n**s for n in range(1, terms+1))
```

## 🚀 Deployment & Updates

### Making Changes Live
1. **Make your changes** locally
2. **Test locally**: `bundle exec jekyll serve`
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Add new blog post about topology"
   git push origin main
   ```
4. **GitHub Actions** will automatically deploy your changes (takes 2-5 minutes)

### Updating Dependencies
```bash
# Update gems
bundle update

# If you encounter Ruby version issues
bundle install
```

## 📋 Content Checklist

### For New Blog Posts:
- [ ] Proper filename format (`YYYY-MM-DD-title.md`)
- [ ] Complete front matter with title, date, categories, tags
- [ ] MathJax enabled if using math (`mathjax: true`)
- [ ] Clear, descriptive title and description
- [ ] Proofread for mathematical notation and content
- [ ] Test locally before pushing

### For Site Updates:
- [ ] Update `_config.yml` with your information
- [ ] Replace placeholder content with your details
- [ ] Add your profile photo
- [ ] Update research and teaching pages
- [ ] Test all navigation links
- [ ] Verify contact information

## 🛠️ Troubleshooting

### Common Issues:

1. **Math not rendering**: Ensure `mathjax: true` in front matter
2. **Site not updating**: Check GitHub Actions tab for build errors
3. **Local server issues**: Run `bundle install` and try again
4. **Ruby version errors**: Update to Ruby 3.2+ or match `.github/workflows/jekyll.yml`

### Getting Help:
- Check [Jekyll Documentation](https://jekyllrb.com/docs/)
- View [GitHub Pages Docs](https://docs.github.com/en/pages)
- Issues? Create a GitHub issue in your repository

## 📚 Quick Reference

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Ruby** version 2.5.0 or higher
  - Check with `ruby -v`
  - Install from [Ruby official site](https://www.ruby-lang.org/en/documentation/installation/)
- **RubyGems** (usually comes with Ruby)
  - Check with `gem -v`
- **GCC and Make** (required for some gem installations)
  - For Ubuntu/Debian: `sudo apt-get install build-essential`
  - For macOS: Install Xcode Command Line Tools with `xcode-select --install`
  - For Windows: Use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install) or [RubyInstaller](https://rubyinstaller.org/)
- **Git** for version control and deployment
  - Check with `git --version`
  - Install from [Git official site](https://git-scm.com/downloads)

## Local Development

### Initial Setup

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/username/math-portfolio.git
   cd math-portfolio
   ```

2. **Install Jekyll and dependencies**:
   ```bash
   gem install bundler
   bundle install
   ```

3. **Build and serve the site locally**:
   ```bash
   bundle exec jekyll serve
   ```

4. **Access your local site** by navigating to:
   ```
   http://localhost:4000/math-portfolio/
   ```

### Making Changes

- Edit files in your text editor of choice
- Jekyll will automatically regenerate the site when you save changes
- Refresh your browser to see the updates
- Use `bundle exec jekyll serve --livereload` for automatic browser refresh on changes

## Detailed Deployment Guide

### Setting Up GitHub Pages

1. **Create a new GitHub repository**:
   - Sign in to [GitHub](https://github.com/)
   - Click the "+" icon in the top right and select "New repository"
   - Name your repository `yourusername.github.io` for a user/organization site or any name for a project site
   - Keep the repository public for free GitHub Pages hosting
   - Click "Create repository"

2. **Push your code to GitHub**:
   ```bash
   # If starting with this template
   git remote set-url origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   
   # If starting with your existing code
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

3. **Configure GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" > "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click "Save"
   - Wait a few minutes for your site to be built and deployed

4. **Update site configuration**:
   - Edit `_config.yml` and update the following:
     ```yaml
     # Important: update these values
     url: "https://yourusername.github.io" 
     baseurl: "/your-repo-name"  # use "" if your repo is named yourusername.github.io
     repository: "yourusername/your-repo-name"
     github:
       repository_nwo: "yourusername/your-repo-name"
     ```

5. **Verify deployment**:
   - Go to `https://yourusername.github.io/your-repo-name/` to see your site
   - For user/organization sites, the URL will be `https://yourusername.github.io/`

### Using Custom Domains

1. **Purchase a domain name** from a registrar of your choice (Namecheap, GoDaddy, Google Domains, etc.)

2. **Configure DNS settings** at your domain registrar:
   - Add an `A` record pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add a `CNAME` record with:
     - Name: `www` (or subdomain of your choice)
     - Value: `yourusername.github.io`

3. **Add custom domain to GitHub Pages**:
   - Go to repository "Settings" > "Pages"
   - Under "Custom domain", enter your domain name
   - Check "Enforce HTTPS" once available (may take up to 24 hours)

4. **Add CNAME file**:
   - Create a file named `CNAME` in the root of your repository
   - Add a single line containing your domain name: `yourdomain.com`
   - Commit and push this file to your repository

## Blog Setup and Configuration

### Basic Blog Configuration

1. **Enable blog features** in `_config.yml`:
   ```yaml
   # Blog settings
   paginate: 5 # Number of posts per page
   paginate_path: "/blog/page:num/"
   permalink: /blog/:year/:month/:day/:title/
   ```

2. **Customize blog layout** by editing `blog.md` and files in `_layouts/` directory

### Creating Blog Posts

1. **Create a new post** in the `_posts` directory with the naming convention `YYYY-MM-DD-title.md`

2. **Add front matter** to your post:
   ```yaml
   ---
   layout: post
   title: "Your Fascinating Math Topic"
   date: YYYY-MM-DD
   categories: [Category1, Category2]
   tags: [tag1, tag2, tag3]
   mathjax: true  # Enable MathJax for math rendering
   image: /assets/images/your-featured-image.jpg  # Optional featured image
   ---
   ```

3. **Write your content** using Markdown with MathJax for mathematical expressions:
   ```markdown
   # Main Heading

   Introduction to your topic...

   ## Subheading

   When $a \ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are
   
   $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$$

   ### Further discussion

   More content with inline math like $E=mc^2$ or display equations:
   
   $$\frac{d}{dx}\left(\int_{a}^{x}f(t)dt\right)=f(x)$$
   ```

### Implementing Categories and Tags

1. **Create category pages** in the `categories` directory:
   - Create directory: `mkdir -p categories`
   - Create a file for each category, e.g., `categories/number-theory.md`
   ```yaml
   ---
   layout: category
   title: Number Theory
   category: Number-Theory
   permalink: /categories/number-theory/
   ---
   ```

2. **Create tag pages** in the `tags` directory:
   - Create directory: `mkdir -p tags`
   - Create a file for each tag, e.g., `tags/riemann-hypothesis.md`
   ```yaml
   ---
   layout: tag
   title: Riemann Hypothesis
   tag: riemann-hypothesis
   permalink: /tags/riemann-hypothesis/
   ---
   ```

3. **Add category/tag navigation** to your blog layout or sidebar

## Adding and Managing Comments

### Option 1: Disqus (Popular, Easy to Set Up)

1. **Create a Disqus account** at [disqus.com](https://disqus.com/) and register your site

2. **Configure Disqus** in `_config.yml`:
   ```yaml
   # Disqus Comments
   disqus:
     shortname: your-disqus-shortname
     # Comment count on posts (set to true to show comment count, false to hide)
     count: true
   ```

3. **Add Disqus to post layout** by creating/editing `_layouts/post.html`:
   ```html
   ---
   layout: default
   ---
   <article class="post">
     <!-- Post content here -->
     
     {% if site.disqus.shortname %}
     <div id="disqus_thread"></div>
     <script>
       var disqus_config = function () {
         this.page.url = '{{ page.url | absolute_url }}';
         this.page.identifier = '{{ page.url | absolute_url }}';
       };
       (function() {
         var d = document, s = d.createElement('script');
         s.src = 'https://{{ site.disqus.shortname }}.disqus.com/embed.js';
         s.setAttribute('data-timestamp', +new Date());
         (d.head || d.body).appendChild(s);
       })();
     </script>
     <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
     {% endif %}
   </article>
   ```

### Option 2: Utterances (GitHub-based)

1. **Install the Utterances app** to your GitHub repository:
   - Go to [utteranc.es](https://utteranc.es/)
   - Follow instructions to install the GitHub app to your repository

2. **Add Utterances to post layout** by creating/editing `_layouts/post.html`:
   ```html
   ---
   layout: default
   ---
   <article class="post">
     <!-- Post content here -->
     
     <script src="https://utteranc.es/client.js"
       repo="yourusername/your-repo-name"
       issue-term="pathname"
       theme="github-light"
       crossorigin="anonymous"
       async>
     </script>
   </article>
   ```

### Option 3: Giscus (GitHub Discussions-based)

1. **Enable GitHub Discussions** in your repository:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Features" section
   - Check "Discussions"

2. **Install the Giscus app** to your GitHub repository:
   - Go to [giscus.app](https://giscus.app/)
   - Follow instructions to install the GitHub app to your repository
   - Generate your configuration snippet

3. **Add Giscus to post layout** by creating/editing `_layouts/post.html`:
   ```html
   ---
   layout: default
   ---
   <article class="post">
     <!-- Post content here -->
     
     <script src="https://giscus.app/client.js"
       data-repo="yourusername/your-repo-name"
       data-repo-id="[Your repo ID]"
       data-category="Announcements"
       data-category-id="[Category ID]"
       data-mapping="pathname"
       data-reactions-enabled="1"
       data-emit-metadata="0"
       data-theme="light"
       crossorigin="anonymous"
       async>
     </script>
   </article>
   ```

## Customizing Your Site

### Site Configuration

Edit `_config.yml` to customize:

```yaml
# Basic information
title: "Your Name, PhD"
description: "Mathematics PhD Portfolio - Specializing in Your Math Field"
author: "Your Full Name"
email: "your.email@example.com"
logo: "/assets/images/your-profile-photo.jpg"

# Social media profiles
social:
  - platform: github
    user_url: https://github.com/yourusername
  - platform: google_scholar
    user_url: https://scholar.google.com/citations?user=YOUR_ID
  - platform: linkedin
    user_url: https://www.linkedin.com/in/yourusername
  - platform: orcid
    user_url: https://orcid.org/0000-0000-0000-0000
  - platform: researchgate
    user_url: https://www.researchgate.net/profile/Your_Profile

# Navigation structure
header_pages:
  - index.md
  - research.md
  - publications.md
  - blog.md
  - teaching.md
  - resources.md
  - contact.md
```

### Themes and Styling

1. **Change themes** by modifying the theme settings in `_config.yml`:
   ```yaml
   # For local development:
   theme: minima
   
   # For GitHub Pages:
   # remote_theme: pages-themes/minimal@v0.2.0
   ```

2. **Customize CSS** by creating or editing files in the `_sass` directory:
   - `_sass/main.scss` for main styles
   - `_sass/variables.scss` for color schemes and typography

3. **Add custom JavaScript** in the `assets/js` directory

### Adding Custom Functionality

1. **Create custom layouts** in the `_layouts` directory
2. **Add custom includes** in the `_includes` directory
3. **Extend functionality with plugins** by adding them to the `Gemfile` and `_config.yml`

## Content Management

### Research Publications

1. **BibTeX integration**:
   - Place your BibTeX file at `_bibliography/references.bib`
   - Configure Jekyll Scholar in `_config.yml`
   ```yaml
   # Jekyll Scholar configuration
   scholar:
     style: apa
     locale: en
     sort_by: year,month
     order: descending
     source: _bibliography
     bibliography: references.bib
     bibliography_template: bib
     replace_strings: true
     join_strings: true
     details_dir: bibliography
     details_layout: bibtex.html
     details_link: Details
     query: "@*"
   ```

2. **Display publications** using Jekyll Scholar in your research page:
   ```liquid
   ---
   layout: page
   title: Research
   permalink: /research/
   ---
   
   # Research Publications
   
   {% bibliography %}
   ```

### Teaching Materials

1. **Organize teaching materials** in appropriate directories:
   - Course notes in `teaching/notes/`
   - Assignments in `teaching/assignments/`
   - Lecture slides in `teaching/slides/`

2. **Link to materials** from your teaching page

### Resources Section

Organize recommended books, software, and other resources in a structured way in your resources page.

## Advanced Customization

### Adding Analytics

1. **Set up Google Analytics** by adding your tracking ID to `_config.yml`:
   ```yaml
   # Google Analytics
   google_analytics: UA-XXXXXXXX-X  # for Universal Analytics
   # OR
   google_analytics: G-XXXXXXXXXX  # for Google Analytics 4
   ```

2. **Add the analytics script** to your site's head by creating/editing `_includes/google-analytics.html`

### SEO Optimization

1. **Configure Jekyll SEO tag plugin** in `_config.yml`:
   ```yaml
   # SEO settings
   twitter:
     username: yourusername
   social:
     name: Your Name
     links:
       - https://twitter.com/yourusername
       - https://www.facebook.com/yourusername
       - https://www.linkedin.com/in/yourusername
       - https://github.com/yourusername
   ```

2. **Add metadata** to each page's front matter:
   ```yaml
   ---
   title: "Page Title"
   description: "Page description for search engines"
   image: /assets/images/featured-image.jpg
   ---
   ```

### Custom Domain Email

1. **Set up email forwarding** through your domain registrar
2. **Or set up Google Workspace** (paid) for professional email hosting

## Troubleshooting

### Common Issues and Solutions

1. **Jekyll build errors**:
   - Check Ruby and Jekyll versions compatibility
   - Ensure all gems are properly installed with `bundle install`
   - Look for syntax errors in your Liquid templates

2. **GitHub Pages deployment issues**:
   - Check the "Actions" tab in your GitHub repository to see build logs
   - Verify that your _config.yml is properly formatted
   - Make sure your repository is public (for free GitHub Pages)

3. **MathJax rendering issues**:
   - Ensure MathJax is properly loaded in your layout
   - Check syntax of mathematical expressions
   - Use proper delimiters: inline math with `$...$` and display math with `$$...$$`

### Getting Help

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [MathJax Documentation](https://docs.mathjax.org/)
- [Jekyll Talk Forum](https://talk.jekyllrb.com/)

## License and Credits

This project is open source and available under the [MIT License](LICENSE).

### Acknowledgements

- Jekyll theme based on [Minimal](https://github.com/pages-themes/minimal)
- Animations powered by [Animate.css](https://animate.style/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Mathematical typesetting by [MathJax](https://www.mathjax.org/)
- Blog search functionality by [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search)

---

### File Structure Quick Reference
```
├── _config.yml           # Main site configuration
├── index.md              # Homepage content
├── blog.md               # Blog page
├── research.md           # Research page
├── teaching.md           # Teaching page
├── resources.md          # Resources page
├── contact.md            # Contact page
├── _posts/               # Blog posts (YYYY-MM-DD-title.md)
├── _layouts/             # HTML templates
├── _includes/            # Reusable HTML components
├── _sass/                # SCSS/CSS styling
├── assets/
│   ├── images/           # Images and photos
│   ├── js/               # JavaScript files
│   ├── css/              # Additional CSS
│   └── pdfs/             # PDF documents
├── _bibliography/        # BibTeX files
└── .github/workflows/    # GitHub Actions for deployment
```

### Common Commands
```bash
# Development
bundle exec jekyll serve          # Serve locally
bundle exec jekyll build          # Build site
bundle exec jekyll clean          # Clean build files

# Git workflow
git add .                         # Stage changes
git commit -m "Your message"      # Commit changes
git push origin main              # Deploy to GitHub

# Maintenance
bundle update                     # Update gems
bundle install                    # Install dependencies
```

### Math Examples for Posts

**Inline Math:**
```markdown
The famous equation $E = mc^2$ shows the relationship between energy and mass.
```

**Display Math:**
```markdown
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
```

**Theorem Environment:**
```markdown
**Theorem (Fundamental Theorem of Calculus):** Let $f$ be continuous on $[a,b]$. Then:

$$\frac{d}{dx}\left(\int_{a}^{x}f(t)dt\right)=f(x)$$
```

## 🎓 Academic Features

### Research Integration
- **arXiv links**: Add preprint links to your research page
- **Google Scholar**: Link to your citation profile
- **ORCID**: Include your researcher ID
- **ResearchGate**: Connect your academic profile

### Teaching Resources
- Upload lecture notes as PDFs to `/assets/pdfs/`
- Create problem sets with solutions
- Link to course websites
- Include teaching evaluations (optional)

### Conference Presentations
Add a presentations section to showcase:
- Conference talks
- Seminar presentations  
- Workshop participation
- Invited lectures

## 🔧 Technical Details

### Supported Features
- ✅ MathJax 3.x for mathematics
- ✅ Responsive design (mobile-friendly)
- ✅ Dark/light mode toggle
- ✅ Search functionality
- ✅ Category and tag filtering
- ✅ RSS feed generation
- ✅ SEO optimization
- ✅ Analytics integration
- ✅ Comment systems
- ✅ Social media integration

### Browser Support
- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Created by:** [Nischal Bhattarai](https://github.com/NISCHALPI)  
**Last Updated:** June 2025  
**Version:** 1.0

For questions or issues, please [create an issue](https://github.com/NISCHALPI/nischalpi.github.io/issues) on GitHub.
