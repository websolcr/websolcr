export class Navigation {
  constructor(props = {}) {
    this.props = {
      brandName: 'WebSolCr',
      links: [
        { href: '#features', label: 'Features' },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' }
      ],
      ctaText: 'Get Started',
      ctaHref: '#contact',
      ...props
    };
  }

  render() {
    return `
      <nav class="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex-shrink-0">
              <a href="#home" class="text-2xl font-bold text-gray-900">${this.props.brandName}</a>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-8">
                ${this.props.links.map(link => `
                  <a href="${link.href}" class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                    ${link.label}
                  </a>
                `).join('')}
                <a href="${this.props.ctaHref}" class="bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                  ${this.props.ctaText}
                </a>
              </div>
            </div>
            <div class="md:hidden">
              <button class="text-gray-700 hover:text-gray-900" id="mobile-menu">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- Mobile menu -->
        <div class="md:hidden hidden" id="mobile-nav">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            ${this.props.links.map(link => `
              <a href="${link.href}" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600">
                ${link.label}
              </a>
            `).join('')}
            <a href="${this.props.ctaHref}" class="block mx-3 mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg text-center font-medium">
              ${this.props.ctaText}
            </a>
          </div>
        </div>
      </nav>
    `;
  }

  init(element) {
    // Mobile menu toggle functionality
    const mobileMenuBtn = element.querySelector("#mobile-menu");
    const mobileNav = element.querySelector("#mobile-nav");

    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener("click", function () {
        mobileNav.classList.toggle("hidden");

        // Toggle hamburger icon
        const icon = this.querySelector("svg");
        if (mobileNav.classList.contains("hidden")) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
        }
      });

      // Close mobile menu when clicking on a link
      const mobileLinks = mobileNav.querySelectorAll("a");
      mobileLinks.forEach((link) => {
        link.addEventListener("click", function () {
          mobileNav.classList.add("hidden");
          const icon = mobileMenuBtn.querySelector("svg");
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        });
      });
    }

    // Navbar background on scroll
    const navbar = element.querySelector("#navbar");
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
  }
}
