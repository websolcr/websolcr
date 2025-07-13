// Simple HTML Template Component System
// No ES6 modules required - perfect for GitHub Pages

class SimpleComponentLoader {
  constructor() {
    this.templates = new Map();
    this.loadPromises = new Map();
  }

  // Send contact email using EmailJS
  async sendContactEmail(data) {
    console.log('Sending contact email with data:', data);
    
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
      
      console.log('Email sent successfully via EmailJS:', response);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Failed to send email via EmailJS:', error);
      throw error;
    }
  }

  // Load and cache a template
  async loadTemplate(name, url) {
    console.log(`📥 Loading template: ${name} from ${url}`);
    console.log(`📥 Template name type: ${typeof name}`);
    console.log(`📥 Template name length: ${name.length}`);

    if (this.loadPromises.has(name)) {
      console.log(`📦 Using cached promise for ${name}`);
      return this.loadPromises.get(name);
    }

    const promise = new Promise((resolve, reject) => {
      // Try fetch first, fallback to XMLHttpRequest for Safari
      if (typeof fetch !== "undefined") {
        fetch(url)
          .then((response) => {
            console.log(
              `📡 Fetch response for ${name}: ${response.status} ${response.statusText}`
            );
            if (!response.ok) {
              throw new Error(
                `Failed to load template ${name}: ${response.status}`
              );
            }
            return response.text();
          })
          .then((html) => {
            console.log(`💾 Caching template ${name}, length: ${html.length}`);
            this.templates.set(name, html);
            resolve(html);
          })
          .catch((error) => {
            console.error(
              `❌ Fetch failed for ${name}, trying XMLHttpRequest:`,
              error
            );
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
          console.log(`📡 XHR response for ${name}: ${xhr.status}`);
          console.log(
            `💾 Caching template ${name}, length: ${xhr.responseText.length}`
          );
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
    console.log(`🎯 Rendering component: ${name} from ${templateUrl}`);
    console.log(`🎯 Component name type: ${typeof name}`);
    console.log(`🎯 Component name length: ${name.length}`);
    console.log(`🎯 Target element:`, targetElement);
    console.log(`🎯 Target element dataset:`, targetElement.dataset);
    
    try {
      const template = await this.loadTemplate(name, templateUrl);
      console.log(`📄 Template loaded for ${name}, length: ${template.length}`);
      console.log(`📄 Template preview:`, template.substring(0, 200) + "...");

      // Create a temporary container to parse the template
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = template;

      // Extract content from the template tag
      const templateTag = tempContainer.querySelector("template");
      if (templateTag) {
        console.log(`📋 Found template tag for ${name}`);
        console.log(`📋 Template tag id:`, templateTag.id);
        // Safari-compatible template content extraction
        let content = templateTag.innerHTML;
        if (!content && templateTag.content) {
          // Fallback for older browsers
          content = templateTag.content.innerHTML;
        }
        console.log(`📋 Template content length:`, content.length);
        console.log(`📋 Template content preview:`, content.substring(0, 200) + "...");
        console.log(`📋 Template content includes TEST LOADED:`, content.includes("TEST LOADED"));
        targetElement.innerHTML = content;
      } else {
        console.log(`📄 No template tag found for ${name}, using raw content`);
        console.log(`📄 Raw content includes TEST LOADED:`, template.includes("TEST LOADED"));
        targetElement.innerHTML = template;
      }

      // Initialize component-specific functionality
      this.initializeComponent(name, targetElement);
      console.log(`✅ Component ${name} rendered successfully`);
      console.log(`✅ Final innerHTML length:`, targetElement.innerHTML.length);
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
        console.log('CTA button clicked:', button.textContent);
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
        console.log(`🔍 About component found! Template URL: "${templateUrl}"`);
        console.log(`🔍 componentMap.about value: "${componentMap.about}"`);
      }
      else if (componentName === "tech-partners")
        templateUrl = componentMap["tech-partners"];
      else if (componentName === "published-work") {
        templateUrl = componentMap["published-work"];
        console.log(`🔍 Published Work component found! Template URL: "${templateUrl}"`);
        console.log(`🔍 componentMap["published-work"] value: "${componentMap["published-work"]}"`);
        console.log(`🔍 componentMap keys:`, Object.keys(componentMap));
        console.log(`🔍 componentMap has published-work:`, "published-work" in componentMap);
      }
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
  console.log("🚀 DOM ready - starting component loading");

  // Set a fallback timeout to hide loading indicator
  const loadingTimeout = setTimeout(() => {
    console.log("⏰ Loading timeout reached - hiding loading indicator");
    const loading = document.getElementById("loading");
    if (loading) {
      loading.style.opacity = "0";
      loading.style.transition = "opacity 0.3s ease-out";
      setTimeout(() => loading.remove(), 300);
    }
  }, 5000); // 5 second fallback

  try {
    await componentLoader.loadAllComponents();
    console.log("✅ Component loading completed");

    // Clear the timeout since we loaded successfully
    clearTimeout(loadingTimeout);

    // Hide loading indicator immediately after components load
    const loading = document.getElementById("loading");
    if (loading) {
      console.log(
        "🎉 Hiding loading indicator after successful component load"
      );
      loading.style.opacity = "0";
      loading.style.transition = "opacity 0.3s ease-out";
      setTimeout(() => loading.remove(), 300);
    }
  } catch (error) {
    console.error("❌ Component loading failed:", error);
    // Still hide loading indicator even if there was an error
    clearTimeout(loadingTimeout);
    const loading = document.getElementById("loading");
    if (loading) {
      console.log("⚠️ Hiding loading indicator after error");
      loading.style.opacity = "0";
      loading.style.transition = "opacity 0.3s ease-out";
      setTimeout(() => loading.remove(), 300);
    }
  }
});

// Also try loading on window load as a fallback
window.addEventListener("load", async () => {
  console.log("🔄 Window load fired - checking if components need loading");
  const componentElements = document.querySelectorAll("[data-component]");
  const unloadedElements = Array.from(componentElements).filter(
    (el) => !el.innerHTML || el.innerHTML.includes("Unknown component")
  );

  if (unloadedElements.length > 0) {
    console.log(
      `🔄 Found ${unloadedElements.length} unloaded components, retrying...`
    );
    try {
      await componentLoader.loadAllComponents();
      console.log("✅ Component loading completed on window load");
    } catch (error) {
      console.error("❌ Component loading failed on window load:", error);
    }
  }

  // Force hide loading indicator if still visible
  setTimeout(() => {
    const loading = document.getElementById("loading");
    if (loading && loading.style.opacity !== "0") {
      console.log("🔧 Force hiding loading indicator from window load");
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
    console.log("🦁 Safari fallback - hiding loading indicator");
    loading.style.opacity = "0";
    loading.style.transition = "opacity 0.3s ease-out";
    setTimeout(() => loading.remove(), 300);
  }
}, 3000); // 3 second fallback for Safari
