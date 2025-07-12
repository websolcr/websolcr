export class Footer {
  constructor(props = {}) {
    this.props = {
      brandName: "WebSolCr",
      description:
        "Expert SaaS application engineering with client-centered solutions and future-extensible architecture.",
      socialLinks: [
        { name: "Twitter", href: "#", label: "Twitter" },
        { name: "LinkedIn", href: "#", label: "LinkedIn" },
        { name: "GitHub", href: "#", label: "GitHub" },
      ],
      sections: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Documentation", href: "#" },
            { label: "API", href: "#" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#about" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Contact", href: "#contact" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Help Center", href: "#" },
            { label: "Community", href: "#" },
            { label: "Status", href: "#" },
            { label: "Security", href: "#" },
          ],
        },
      ],
      copyright: "2025",
      legalLinks: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
      ...props,
    };
  }

  render() {
    return `
      <footer class="bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="md:col-span-1">
              <h4 class="text-2xl font-bold mb-4">${this.props.brandName}</h4>
              <p class="text-gray-400 mb-6">
                ${this.props.description}
              </p>
              <div class="flex space-x-4">
                ${this.props.socialLinks
                  .map(
                    (social) => `
                  <a href="${social.href}" class="text-gray-400 hover:text-white transition-colors" aria-label="${social.label}">
                    ${social.name}
                  </a>
                `
                  )
                  .join("")}
              </div>
            </div>
            ${this.props.sections
              .map(
                (section) => `
              <div>
                <h5 class="font-semibold mb-4">${section.title}</h5>
                <ul class="space-y-2">
                  ${section.links
                    .map(
                      (link) => `
                    <li>
                      <a href="${link.href}" class="text-gray-400 hover:text-white transition-colors">
                        ${link.label}
                      </a>
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400">
              &copy; ${this.props.copyright} ${
      this.props.brandName
    }. All rights reserved.
            </p>
            <div class="flex space-x-6 mt-4 md:mt-0">
              ${this.props.legalLinks
                .map(
                  (link) => `
                <a href="${link.href}" class="text-gray-400 hover:text-white transition-colors">
                  ${link.label}
                </a>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  init(element) {
    // Add smooth scroll for internal links
    const links = element.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
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
  }
}
