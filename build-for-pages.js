#!/usr/bin/env node

/**
 * Build script to create a GitHub Pages compatible version
 * This bundles all components into a single file without ES6 modules
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Building for GitHub Pages...');

// Read all component files
const componentsDir = path.join(__dirname, 'components');
const components = {};

// Read each component
const componentFiles = fs.readdirSync(componentsDir);
componentFiles.forEach(file => {
  if (file.endsWith('.js')) {
    const componentName = file.replace('.js', '');
    const content = fs.readFileSync(path.join(componentsDir, file), 'utf8');
    
    // Remove export statements and class declarations for bundling
    const classContent = content
      .replace(/export\s+class\s+/g, 'class ')
      .replace(/import.*?;/g, ''); // Remove any imports
    
    components[componentName] = classContent;
  }
});

// Create bundled JavaScript
const bundledJS = `
// WebSolCr - Bundled Components for GitHub Pages
// Generated automatically - do not edit directly

${Object.values(components).join('\n\n')}

// Component Loader (inline)
class ComponentLoader {
  constructor() {
    this.components = new Map();
  }

  register(name, component) {
    this.components.set(name, component);
  }

  async render(name, props = {}, target = null) {
    const Component = this.components.get(name);
    if (!Component) {
      throw new Error(\`Component "\${name}" not found\`);
    }

    const instance = new Component(props);
    const html = await instance.render();
    
    if (target) {
      target.innerHTML = html;
      if (instance.attachEventListeners) {
        instance.attachEventListeners();
      }
    }
    
    return html;
  }

  async loadAll() {
    const componentElements = document.querySelectorAll('[data-component]');
    
    for (const element of componentElements) {
      const componentName = element.dataset.component;
      const props = element.dataset.props ? JSON.parse(element.dataset.props) : {};
      
      try {
        await this.render(componentName, props, element);
      } catch (error) {
        console.error(\`Failed to load component "\${componentName}":`, error);
        element.innerHTML = \`<div class="p-4 text-red-600">Error loading \${componentName} component</div>\`;
      }
    }
  }
}

// Initialize
const componentLoader = new ComponentLoader();

// Register all components
componentLoader.register('navigation', Navigation);
componentLoader.register('hero', Hero);
componentLoader.register('features', Features);
componentLoader.register('cta', CTA);
componentLoader.register('footer', Footer);

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
  try {
    await componentLoader.loadAll();
    console.log('✅ All components loaded successfully');
  } catch (error) {
    console.error('❌ Failed to load components:', error);
  }
});
`;

// Write bundled JS file
fs.writeFileSync(path.join(__dirname, 'js', 'bundle.js'), bundledJS);

// Create GitHub Pages compatible HTML
const htmlTemplate = fs.readFileSync(path.join(__dirname, 'index-components.html'), 'utf8');
const githubPagesHTML = htmlTemplate
  .replace('<script type="module" src="js/main-components.js"></script>', '<script src="js/bundle.js"></script>')
  .replace('href="js/componentLoader.js"', 'href="js/bundle.js"')
  .replace('href="js/main-components.js"', 'href="js/bundle.js"');

// Write the GitHub Pages compatible index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), githubPagesHTML);

console.log('✅ GitHub Pages build complete!');
console.log('📁 Generated files:');
console.log('   - index.html (GitHub Pages compatible)');
console.log('   - js/bundle.js (bundled components)');
console.log('');
console.log('🚀 Ready for GitHub Pages deployment!');
