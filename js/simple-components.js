// Simple HTML Template Component System
// No ES6 modules required - perfect for GitHub Pages

class SimpleComponentLoader {
  constructor() {
    this.templates = new Map();
    this.loadPromises = new Map();
  }

  // Load and cache a template
  async loadTemplate(name, url) {
    if (this.loadPromises.has(name)) {
      return this.loadPromises.get(name);
    }

    const promise = fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load template ${name}: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        this.templates.set(name, html);
        return html;
      })
      .catch(error => {
        console.error(`Error loading template ${name}:`, error);
        this.templates.set(name, `<div class="p-4 text-red-600">Error loading ${name} component</div>`);
        return this.templates.get(name);
      });

    this.loadPromises.set(name, promise);
    return promise;
  }

  // Render a template into a target element
  async renderComponent(name, targetElement, templateUrl) {
    try {
      const template = await this.loadTemplate(name, templateUrl);
      
      // Create a temporary container to parse the template
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = template;
      
      // Extract content from the template tag
      const templateTag = tempContainer.querySelector('template');
      if (templateTag) {
        targetElement.innerHTML = templateTag.innerHTML;
      } else {
        targetElement.innerHTML = template;
      }

      // Initialize component-specific functionality
      this.initializeComponent(name, targetElement);
      
    } catch (error) {
      console.error(`Failed to render component ${name}:`, error);
      targetElement.innerHTML = `<div class="p-4 text-red-600">Failed to load ${name} component</div>`;
    }
  }

  // Initialize component-specific JavaScript
  initializeComponent(name, element) {
    switch (name) {
      case 'navigation':
        this.initNavigation(element);
        break;
      case 'hero':
        this.initHero(element);
        break;
      case 'features':
        this.initFeatures(element);
        break;
      case 'cta':
        this.initCTA(element);
        break;
      case 'footer':
        this.initFooter(element);
        break;
    }
  }

  // Navigation component initialization
  initNavigation(element) {
    const mobileMenuBtn = element.querySelector('#mobile-menu-btn');
    const mobileNav = element.querySelector('#mobile-nav');
    let isMobileMenuOpen = false;

    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        mobileNav.classList.toggle('hidden', !isMobileMenuOpen);
      });
    }

    // Smooth scrolling for navigation links
    element.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu if open
          if (isMobileMenuOpen) {
            isMobileMenuOpen = false;
            mobileNav.classList.add('hidden');
          }
        }
      });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = element.querySelector('#navbar');
      if (window.scrollY > 10) {
        navbar.classList.add('bg-white/95');
      } else {
        navbar.classList.remove('bg-white/95');
      }
    });
  }

  // Hero component initialization
  initHero(element) {
    const startProjectBtn = element.querySelector('#start-project');
    const learnMoreBtn = element.querySelector('#learn-more');

    if (startProjectBtn) {
      startProjectBtn.addEventListener('click', () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', () => {
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // Features component initialization
  initFeatures(element) {
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    element.querySelectorAll('[data-animate]').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }

  // CTA component initialization
  initCTA(element) {
    const buttons = element.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Add contact functionality here
        console.log('CTA button clicked:', button.textContent);
      });
    });
  }

  // Footer component initialization
  initFooter(element) {
    // Smooth scrolling for footer links
    element.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Load all components on the page
  async loadAllComponents() {
    const componentMap = {
      'navigation': 'templates/navigation.html',
      'hero': 'templates/hero.html',
      'features': 'templates/features.html',
      'cta': 'templates/cta.html',
      'footer': 'templates/footer.html'
    };

    const componentElements = document.querySelectorAll('[data-component]');
    const loadPromises = [];

    componentElements.forEach(element => {
      const componentName = element.dataset.component;
      const templateUrl = componentMap[componentName];
      
      if (templateUrl) {
        const promise = this.renderComponent(componentName, element, templateUrl);
        loadPromises.push(promise);
      } else {
        console.warn(`Unknown component: ${componentName}`);
        element.innerHTML = `<div class="p-4 text-yellow-600">Unknown component: ${componentName}</div>`;
      }
    });

    try {
      await Promise.all(loadPromises);
      console.log('✅ All components loaded successfully');
    } catch (error) {
      console.error('❌ Some components failed to load:', error);
    }
  }
}

// Initialize the component loader
const componentLoader = new SimpleComponentLoader();

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await componentLoader.loadAllComponents();
});
