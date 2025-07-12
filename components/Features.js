export class Features {
  constructor(props = {}) {
    this.props = {
      title: 'Our SaaS Engineering Services',
      subtitle: 'End-to-end SaaS application development with client-centered approach, future-extensible architecture, and comprehensive launch and maintenance support',
      features: [
        {
          icon: '🛠️',
          title: 'SaaS Application Engineering',
          description: 'Full-stack SaaS development with clean, maintainable code. We build scalable applications using modern frameworks and proven architectural patterns.'
        },
        {
          icon: '❤️',
          title: 'Client-Centered Solutions',
          description: 'We listen deeply to understand your exact needs. Every solution is tailored specifically for your business goals and user requirements.'
        },
        {
          icon: '🔄',
          title: 'Extensible Architecture',
          description: 'Built to grow with you. Our SaaS applications are designed for easy feature additions, seamless scaling, and future-proof evolution.'
        },
        {
          icon: '🔧',
          title: 'Launch and Maintain',
          description: 'Complete launch support and ongoing maintenance. We\'re with you from deployment through growth, ensuring your application stays optimized.'
        }
      ],
      ...props
    };
  }

  render() {
    return `
      <section id="features" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ${this.props.title}
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              ${this.props.subtitle}
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${this.props.features.map((feature, index) => `
              <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group" data-animate data-delay="${index * 100}">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  ${feature.icon}
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">
                  ${feature.title}
                </h3>
                <p class="text-gray-600">
                  ${feature.description}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  init(element) {
    // Set up intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);
        }
      });
    }, observerOptions);

    // Observe feature cards for animations
    const featureCards = element.querySelectorAll('[data-animate]');
    featureCards.forEach((card) => {
      // Initial state
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      
      observer.observe(card);
    });
  }
}
