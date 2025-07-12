#!/bin/bash

# Simple build script for WebSolCr component-based site

echo "🚀 Building WebSolCr..."

# Check if we're using the component-based approach
if [ -f "index-components.html" ]; then
    echo "📦 Using component-based build"
    
    # Copy component-based files for production
    cp index-components.html index.html
    
    # Update the script references to not use modules (for broader browser support)
    # This is a simple approach - for more complex builds, use a proper bundler
    
    echo "✅ Component-based build complete!"
    echo "📁 Files ready for deployment:"
    echo "   - index.html (component-based)"
    echo "   - js/componentLoader.js"
    echo "   - js/main-components.js"
    echo "   - components/*.js"
    
else
    echo "⚠️  Component files not found. Using original index.html"
fi

echo ""
echo "🎯 To use components in production:"
echo "   1. Ensure your server supports ES6 modules"
echo "   2. Or use a bundler like Webpack/Rollup for broader support"
echo "   3. Test with: python -m http.server 8000"
