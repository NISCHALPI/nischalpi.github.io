#!/bin/bash

# Check if Ruby is installed
if ! command -v ruby &> /dev/null; then
    echo "Ruby is not installed. Please install Ruby before continuing."
    exit 1
fi

# Check if Bundler is installed
if ! command -v bundle &> /dev/null; then
    echo "Bundler is not installed. Installing now..."
    gem install bundler
fi

# Install dependencies if they're not already installed
if [ ! -d "vendor/bundle" ]; then
    echo "Installing dependencies..."
    bundle install --path vendor/bundle
fi

# Clean any previous build files
echo "Cleaning previous build..."
bundle exec jekyll clean

# Kill any existing Jekyll processes
echo "Stopping any running Jekyll processes..."
pkill -f jekyll || true

# Run the Jekyll server
echo "Starting Jekyll server..."
bundle exec jekyll serve --port 4001

# Note: The server will continue running until you press Ctrl+C
