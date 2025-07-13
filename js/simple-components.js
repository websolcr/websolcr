// Simple HTML Template Component System
// No ES6 modules required - perfect for GitHub Pages

class SimpleComponentLoader {
  constructor() {
    this.templates = new Map();
    this.loadPromises = new Map();
  }

  // Send contact email using EmailJS
  async sendContactEmail(data) {
    // Get EmailJS configuration
    const SERVICE_ID = window.EMAILJS_SERVICE_ID || 'your-emailjs-service-id';
    const TEMPLATE_ID = window.EMAILJS_TEMPLATE_ID || 'your-emailjs-template-id';
    const PUBLIC_KEY = window.EMAILJS_PUBLIC_KEY || 'your-emailjs-public-key';
    
    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: 'sureshhemal@hotmail.com',
      to_name: 'Suresh Hemal',
      from_name: data.name,
      from_email: data.email,
      company: data.company || 'Not specified',
      project_type: data['project-type'],
      message: data.message,
      subject: `New Contact Form Submission - ${data['project-type']}`
    };
    
    try {
      // Send email via EmailJS with new format (no public key parameter needed)
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Failed to send email via EmailJS:', error);
      throw error;
    }
  }

  // Load and cache a template
  async loadTemplate(name, url) {
    if (this.loadPromises.has(name)) {
      return this.loadPromises.get(name);
    }

    const promise = new Promise((resolve, reject) => {
      // Try fetch first, fallback to XMLHttpRequest for Safari
      if (typeof fetch !== "undefined") {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Failed to load template ${name}: ${response.status}`
              );
            }
            return response.text();
          })
          .then((html) => {
            this.templates.set(name, html);
            resolve(html);
          })
          .catch((error) => {
            // Fallback to XMLHttpRequest
            this.loadWithXMLHttpRequest(url, name, resolve, reject);
          });
      } else {
        // Use XMLHttpRequest directly
        this.loadWithXMLHttpRequest(url, name, resolve, reject);
      }
    }).catch((error) => {
      console.error(`❌ Error loading template ${name}:`, error);
      const errorHtml = `<div class="p-4 text-red-600">Error loading ${name} component</div>`;
      this.templates.set(name, errorHtml);
      return errorHtml;
    });

    this.loadPromises.set(name, promise);
    return promise;
  }

  // Fallback method using XMLHttpRequest
  loadWithXMLHttpRequest(url, name, resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.templates.set(name, xhr.responseText);
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Failed to load template ${name}: ${xhr.status}`));
        }
      }
    };
    xhr.onerror = () => {
      reject(new Error(`Network error loading template ${name}`));
    };
    xhr.send();
  }

  // Render a template into a target element
  async renderComponent(name, targetElement, templateUrl) {
    try {
      const template = await this.loadTemplate(name, templateUrl);

      // Create a temporary container to parse the template
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = template;

      // Extract content from the template tag
      const templateTag = tempContainer.querySelector("template");
      if (templateTag) {
        let content = templateTag.innerHTML;
        if (!content && templateTag.content) {
          // Fallback for older browsers
          content = templateTag.content.innerHTML;
        }
        targetElement.innerHTML = content;
      } else {
        targetElement.innerHTML = template;
      }

      // Initialize component-specific functionality
      this.initializeComponent(name, targetElement);
    } catch (error) {
      console.error(`❌ Failed to render component ${name}:`, error);
      targetElement.innerHTML = `<div class="p-4 text-red-600">Failed to load ${name} component</div>`;
    }
  }

  // Initialize component-specific JavaScript
  initializeComponent(name, element) {
    switch (name) {
      case "navigation":
        this.initNavigation(element);
        break;
      case "hero":
        this.initHero(element);
        break;
      case "features":
        this.initFeatures(element);
        break;
      case "about":
        this.initAbout(element);
        break;
      case "tech-partners":
        this.initTechPartners(element);
        break;
      case "published-work":
        this.initPublishedWork(element);
        break;
      case "testimonials":
        this.initTestimonials(element);
        break;
      case "cta":
        this.initCTA(element);
        break;
      case "footer":
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    element.querySelectorAll("[data-animate]").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
  }

  // About component initialization
  initAbout(element) {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    element.querySelectorAll(".bg-primary-50").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
  }

  // CTA component initialization
  initCTA(element) {
    // Contact form toggle functionality
    const contactToggle = element.querySelector('#contact-toggle');
    const contactForm = element.querySelector('#contact-form');
    const closeForm = element.querySelector('#close-form');
    const formElement = element.querySelector('#contact-form-element');

    if (contactToggle && contactForm) {
      contactToggle.addEventListener('click', () => {
        contactForm.classList.remove('hidden');
        contactForm.style.display = 'block';
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    if (closeForm && contactForm) {
      closeForm.addEventListener('click', () => {
        contactForm.classList.add('hidden');
        contactForm.style.display = 'none';
      });
    }

    // Form submission handling
    if (formElement) {
      formElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = formElement.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
          // Send email using EmailJS (you'll need to set up EmailJS account)
          // For now, we'll simulate the email sending
          await this.sendContactEmail(data);
          
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
          successMessage.innerHTML = `
            <strong>Thank you!</strong> Your message has been sent. We'll get back to you within 24 hours.
          `;
          
          // Replace form with success message
          formElement.innerHTML = '';
          formElement.appendChild(successMessage);
          
          // Hide form after 3 seconds
          setTimeout(() => {
            contactForm.classList.add('hidden');
            contactForm.style.display = 'none';
            // Reset form after hiding
            setTimeout(() => {
              formElement.innerHTML = formElement.getAttribute('data-original-html') || '';
              this.initCTA(element); // Re-initialize event listeners
            }, 300);
          }, 3000);
          
        } catch (error) {
          console.error('Failed to send email:', error);
          
          // Show error message
          const errorMessage = document.createElement('div');
          errorMessage.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
          errorMessage.innerHTML = `
            <strong>Error!</strong> Failed to send message. Please try again or contact us directly.
          `;
          
          // Insert error message at the top of the form
          formElement.insertBefore(errorMessage, formElement.firstChild);
          
          // Reset button
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      });
    }

    // Handle other buttons (like "View Our Process")
    const otherButtons = element.querySelectorAll('button:not(#contact-toggle):not(#close-form)');
    otherButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Add specific functionality for other buttons here
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

  // Tech Partners component initialization
  initTechPartners(element) {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    element.querySelectorAll(".group").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
  }

  // Testimonials component initialization
  initTestimonials(element) {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    element.querySelectorAll(".bg-white").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
  }

  // Published Work component initialization
  initPublishedWork(element) {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    element.querySelectorAll(".bg-gradient-to-br").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });

    // Fetch package download count from Packagist
    this.fetchPackageStats(element);
  }

  // Fetch package statistics from Packagist API
  async fetchPackageStats(element) {
    try {
      const packageName = 'sureshhemal/laravel-sms-sri-lanka';
      // Add cache-busting parameter to ensure fresh data
      const timestamp = Date.now();
      const apiUrl = `https://packagist.org/packages/${packageName}.json?t=${timestamp}`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const packageData = data.package;
      
      if (packageData) {
        // Extract download statistics
        const downloads = packageData.downloads?.total || 0;
        const monthlyDownloads = packageData.downloads?.monthly || 0;
        const dailyDownloads = packageData.downloads?.daily || 0;
        
        // Update the download count in the UI
        this.updateDownloadCount(element, downloads, monthlyDownloads, dailyDownloads);
      }
    } catch (error) {
      // Fallback to default values if API fails
      this.updateDownloadCount(element, 0, 0, 0);
      
      // Show a subtle error indicator
      const downloadsDiv = element.querySelector('.downloads-stat');
      if (downloadsDiv) {
        const numberElement = downloadsDiv.querySelector('.text-2xl');
        if (numberElement) {
          numberElement.textContent = 'N/A';
          numberElement.style.color = '#9CA3AF'; // gray-400
        }
      }
    }
  }

  // Update download count in the UI
  updateDownloadCount(element, totalDownloads, monthlyDownloads, dailyDownloads) {
    // Find the stats container in the package visualization
    const statsContainer = element.querySelector('.grid.grid-cols-2.gap-4.mb-6');
    
    if (statsContainer) {
      // Find the downloads stat div
      let downloadsDiv = statsContainer.querySelector('.downloads-stat');
      
      if (downloadsDiv) {
        // Format the download count
        const formatNumber = (num) => {
          if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
          } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
          }
          return num.toString();
        };
        
        // Update the content with a loading animation
        const numberElement = downloadsDiv.querySelector('.text-2xl');
        if (numberElement) {
          // Add a subtle loading animation
          numberElement.style.opacity = '0.5';
          numberElement.style.transform = 'scale(0.95)';
          numberElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          
          setTimeout(() => {
            numberElement.textContent = formatNumber(totalDownloads);
            numberElement.style.opacity = '1';
            numberElement.style.transform = 'scale(1)';
          }, 200);
        }
      }
    }
  }

  // Load all components on the page
  async loadAllComponents() {
    const componentMap = {
      navigation: "templates/navigation.html",
      hero: "templates/hero.html",
      features: "templates/features.html",
      about: "templates/about.html",
      "tech-partners": "templates/tech-partners.html",
      "published-work": "templates/published-work.html",
      "our-work": "templates/our-work.html",
      testimonials: "templates/testimonials.html",
      cta: "templates/cta.html",
      footer: "templates/footer.html",
    };

    console.log("Component map:", componentMap);
    console.log("Component map keys:", Object.keys(componentMap));
    console.log(
      "tech-partners in componentMap:",
      "tech-partners" in componentMap
    );
    console.log(
      "testimonials in componentMap:",
      "testimonials" in componentMap
    );
    console.log(
      "published-work in componentMap:",
      "published-work" in componentMap
    );
    console.log(
      "componentMap['tech-partners']:",
      componentMap["tech-partners"]
    );
    console.log("componentMap['testimonials']:", componentMap["testimonials"]);
    console.log("componentMap['published-work']:", componentMap["published-work"]);

    const componentElements = document.querySelectorAll("[data-component]");
    console.log(`Found ${componentElements.length} component elements to load`);

    const loadPromises = [];

    componentElements.forEach((element, index) => {
      const componentName = element.dataset.component;
      console.log(`Component name from dataset: "${componentName}"`);
      console.log(`Component name type: ${typeof componentName}`);
      console.log(`Component name length: ${componentName.length}`);

      // More explicit lookup for Safari compatibility
      let templateUrl = null;
      if (componentName === "navigation") templateUrl = componentMap.navigation;
      else if (componentName === "hero") templateUrl = componentMap.hero;
      else if (componentName === "features")
        templateUrl = componentMap.features;
      else if (componentName === "about") {
        templateUrl = componentMap.about;
      }
      else if (componentName === "tech-partners")
        templateUrl = componentMap["tech-partners"];
      else if (componentName === "published-work") {
        templateUrl = componentMap["published-work"];
      }
      else if (componentName === "our-work")
        templateUrl = componentMap["our-work"];
      else if (componentName === "testimonials")
        templateUrl = componentMap.testimonials;
      else if (componentName === "cta") templateUrl = componentMap.cta;
      else if (componentName === "footer") templateUrl = componentMap.footer;

      console.log(
        `Processing component ${index + 1}/${
          componentElements.length
        }: "${componentName}"`
      );
      console.log(`Template URL: "${templateUrl}"`);
      console.log(`Template URL type: ${typeof templateUrl}`);
      console.log(`Component name exact match check: "${componentName}" === "published-work" = ${componentName === "published-work"}`);
      console.log(`Component map has published-work:`, "published-work" in componentMap);
      console.log(`Component map published-work value:`, componentMap["published-work"]);

      if (templateUrl) {
        console.log(`✅ Found template URL for ${componentName}: ${templateUrl}`);
        const promise = this.renderComponent(
          componentName,
          element,
          templateUrl
        );
        loadPromises.push(promise);
      } else {
        console.warn(`❌ Unknown component: ${componentName}`);
        console.warn(
          `Available components: ${Object.keys(componentMap).join(", ")}`
        );
        console.warn(`Component map keys:`, Object.keys(componentMap));
        console.warn(`Component map values:`, Object.values(componentMap));
        element.innerHTML = `<div class="p-4 text-yellow-600">Unknown component: ${componentName}</div>`;
      }
    });

    try {
      await Promise.all(loadPromises);
      console.log("✅ All components loaded successfully");

      // Debug: Check if components are visible
      componentElements.forEach((element, index) => {
        const componentName = element.dataset.component;
        console.log(
          `Component ${index + 1}: ${componentName} - innerHTML length: ${
            element.innerHTML.length
          }`
        );
        console.log(
          `Component ${index + 1}: ${componentName} - visible: ${
            element.offsetHeight > 0
          }`
        );
      });
    } catch (error) {
      console.error("❌ Some components failed to load:", error);
    }
  }
}

// Initialize the component loader
const componentLoader = new SimpleComponentLoader();

// Safari-compatible DOM ready function
function domReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

// Auto-load components when DOM is ready
domReady(async () => {
  const loadingTimeout = setTimeout(() => {
    const loading = document.getElementById("loading");
    if (loading) {
      loading.style.opacity = "0";
      loading.style.transition = "opacity 0.3s ease-out";
      setTimeout(() => loading.remove(), 300);
    }
  }, 5000); // 5 second fallback

  try {
    await componentLoader.loadAllComponents();
    clearTimeout(loadingTimeout);
    const loading = document.getElementById("loading");
    if (loading) {
      loading.style.opacity = "0";
      loading.style.transition = "opacity 0.3s ease-out";
      setTimeout(() => loading.remove(), 300);
    }
  } catch (error) {
    console.error("❌ Component loading failed:", error);
    clearTimeout(loadingTimeout);
    const loading = document.getElementById("loading");
    if (loading) {
      loading.style.opacity = "0";
      loading.style.transition = "opacity 0.3s ease-out";
      setTimeout(() => loading.remove(), 300);
    }
  }
});

// Also try loading on window load as a fallback
window.addEventListener("load", async () => {
  const componentElements = document.querySelectorAll("[data-component]");
  const unloadedElements = Array.from(componentElements).filter(
    (el) => !el.innerHTML || el.innerHTML.includes("Unknown component")
  );

  if (unloadedElements.length > 0) {
    try {
      await componentLoader.loadAllComponents();
    } catch (error) {
      console.error("❌ Component loading failed on window load:", error);
    }
  }

  setTimeout(() => {
    const loading = document.getElementById("loading");
    if (loading && loading.style.opacity !== "0") {
      loading.style.opacity = "0";
      loading.style.transition = "opacity 0.3s ease-out";
      setTimeout(() => loading.remove(), 300);
    }
  }, 1000);
});

// Safari-specific fallback - simple timeout to hide loading
setTimeout(() => {
  const loading = document.getElementById("loading");
  if (loading) {
    loading.style.opacity = "0";
    loading.style.transition = "opacity 0.3s ease-out";
    setTimeout(() => loading.remove(), 300);
  }
}, 3000); // 3 second fallback for Safari
