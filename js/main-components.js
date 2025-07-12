// Component-based main.js
import { componentLoader } from "./componentLoader.js";
import { Navigation } from "../components/Navigation.js";
import { Hero } from "../components/Hero.js";
import { Features } from "../components/Features.js";
import { CTA } from "../components/CTA.js";
import { Footer } from "../components/Footer.js";

// Register all components
componentLoader.register("navigation", Navigation);
componentLoader.register("hero", Hero);
componentLoader.register("features", Features);
componentLoader.register("cta", CTA);
componentLoader.register("footer", Footer);

// Initialize the application
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Load all components
    await componentLoader.loadAll();

    // Global smooth scrolling for any remaining navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      if (link.dataset.handled) return; // Skip if already handled by component

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

    console.log("✅ All components loaded successfully");
  } catch (error) {
    console.error("❌ Failed to load components:", error);

    // Fallback: show error message to user
    document.body.innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p class="text-gray-600 mb-6">We're having trouble loading the page. Please try refreshing.</p>
          <button onclick="window.location.reload()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Refresh Page
          </button>
        </div>
      </div>
    `;
  }
});

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
  });
}
