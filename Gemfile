source "https://rubygems.org"

# For GitHub Pages compatibility - this should be the primary gem
gem "github-pages", group: :jekyll_plugins

# Only use Jekyll directly for local development
# Uncomment the line below for local development only
# gem "jekyll", "~> 3.9.0"

# Theme
gem "minima", "~> 2.5"

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17.0"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-scholar"
  gem "jekyll-paginate"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.8.0", :platforms => [:jruby]

gem "webrick", "~> 1.8"
