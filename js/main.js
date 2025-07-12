// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll functionality
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu");
  const mobileNav = document.getElementById("mobile-nav");

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileNav.classList.toggle("hidden");

      // Toggle hamburger icon
      const icon = this.querySelector("svg");
      if (mobileNav.classList.contains("hidden")) {
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      } else {
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
      }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileNav.classList.add("hidden");
        const icon = mobileMenuBtn.querySelector("svg");
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      });
    });
  }

  // Navbar background on scroll
  const navbar = document.getElementById("navbar");
  let lastScrollY = window.scrollY;

  function updateNavbar() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add("bg-white/95", "shadow-lg");
      navbar.classList.remove("bg-white/90");
    } else {
      navbar.classList.add("bg-white/90");
      navbar.classList.remove("bg-white/95", "shadow-lg");
    }

    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", updateNavbar);

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe feature cards for animations
  const featureCards = document.querySelectorAll("[data-animate]");
  featureCards.forEach((card, index) => {
    // Initial state
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;

    observer.observe(card);
  });

  // Button interactions
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });

    button.addEventListener("mousedown", function () {
      this.style.transform = "translateY(0) scale(0.98)";
    });

    button.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-2px) scale(1)";
    });
  });

  // CTA button actions
  const startTrialBtns = document.querySelectorAll(
    '#start-trial, button:contains("Start Free Trial"), button:contains("Start 14-Day Trial")'
  );
  startTrialBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Add your sign-up logic here
      console.log("Redirecting to sign up...");
      // window.location.href = '/signup';
    });
  });

  const watchDemoBtn = document.getElementById("watch-demo");
  if (watchDemoBtn) {
    watchDemoBtn.addEventListener("click", function () {
      // Add your demo logic here
      console.log("Opening demo...");
      // You could open a modal, redirect to a demo page, or embed a video
    });
  }

  // Pricing card hover effects
  const pricingCards = document.querySelectorAll(".bg-white.rounded-2xl.p-8");
  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
      this.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "";
    });
  });

  // Add loading states for forms (when you add them)
  function showLoading(button) {
    const originalText = button.textContent;
    button.textContent = "Loading...";
    button.disabled = true;

    // Simulate loading
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  }

  // Typing animation for hero title (optional)
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = "";

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Add subtle parallax effect to hero section
  const hero = document.querySelector("#home");
  if (hero) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      if (scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // Add number counting animation for stats (if you add any)
  function animateNumber(element, finalNumber, duration = 2000) {
    const start = 0;
    const increment = finalNumber / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current);

      if (current >= finalNumber) {
        element.textContent = finalNumber;
        clearInterval(timer);
      }
    }, 16);
  }

  // Add form validation helper (for future contact forms)
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transform transition-transform duration-300 translate-x-full ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Slide in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Slide out and remove
    setTimeout(() => {
      notification.style.transform = "translateX(full)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      // Close mobile menu if open
      if (mobileNav && !mobileNav.classList.contains("hidden")) {
        mobileNav.classList.add("hidden");
        const icon = mobileMenuBtn.querySelector("svg");
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      }
    }
  });

  // Performance optimization: Throttle scroll events
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply throttling to scroll events
  window.addEventListener("scroll", throttle(updateNavbar, 10));

  console.log("🚀 YourSaaS website loaded successfully!");
});

// Utility function to add smooth transitions to elements
function addSmoothTransition(element, properties = "all", duration = "0.3s") {
  element.style.transition = `${properties} ${duration} ease`;
}

// Add focus management for accessibility
document.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
  }
});

document.addEventListener("mousedown", function () {
  document.body.classList.remove("user-is-tabbing");
});
