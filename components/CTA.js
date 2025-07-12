export class CTA {
  constructor(props = {}) {
    this.props = {
      title: 'Ready to build something amazing together?',
      subtitle: 'Let\'s discuss your vision. We\'ll craft exactly what you need with clean code, extensible architecture, and unwavering dedication to your success.',
      primaryButtonText: 'Get In Touch',
      secondaryButtonText: 'View Our Process',
      primaryButtonHref: '#contact',
      secondaryButtonHref: '#process',
      ...props
    };
  }

  render() {
    return `
      <section class="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            ${this.props.title}
          </h2>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            ${this.props.subtitle}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              class="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              data-href="${this.props.primaryButtonHref}"
            >
              ${this.props.primaryButtonText}
            </button>
            <button 
              class="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              data-href="${this.props.secondaryButtonHref}"
            >
              ${this.props.secondaryButtonText}
            </button>
          </div>
        </div>
      </section>
    `;
  }

  init(element) {
    // Add click handlers for buttons
    const buttons = element.querySelectorAll('button[data-href]');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const href = button.dataset.href;
        
        if (href.startsWith('#')) {
          // Internal anchor link
          const targetSection = document.querySelector(href);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // External link
          window.open(href, '_blank');
        }
      });
    });
  }
}
