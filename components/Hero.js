export class Hero {
  constructor(props = {}) {
    this.props = {
      title: "SaaS Application",
      titleHighlight: "Engineering",
      description:
        "We engineer client-centered SaaS applications that are built to last. Future-extensible solutions with clean code, comprehensive launch support, and ongoing maintenance you can trust.",
      primaryButtonText: "Start Your Project",
      secondaryButtonText: "Learn More",
      services: [
        "SaaS Engineering",
        "Client Solutions",
        "Launch & Maintain",
        "Future-Extensible",
      ],
      ...props,
    };
  }

  render() {
    return `
      <section id="home" class="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div class="mb-12 lg:mb-0">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                ${this.props.title}
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${this.props.titleHighlight}
                </span>
              </h1>
              <p class="mt-6 text-xl text-gray-600 max-w-3xl">
                ${this.props.description}
              </p>
              <div class="mt-8 flex flex-col sm:flex-row gap-4">
                <button class="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" id="start-project">
                  ${this.props.primaryButtonText}
                </button>
                <button class="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors" id="learn-more">
                  ${this.props.secondaryButtonText}
                </button>
              </div>
              <div class="mt-12">
                <p class="text-sm text-gray-500 mb-4">Our core services</p>
                <div class="flex flex-wrap gap-6">
                  ${this.props.services
                    .map(
                      (service) => `
                    <div class="bg-white px-4 py-2 rounded-lg shadow-sm text-gray-600 font-medium">
                      ${service}
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
            </div>
            <div class="relative">
              <div class="bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div class="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div class="p-6">
                  <div class="flex space-x-4 mb-6">
                    <div class="w-16 bg-gray-200 h-full rounded-lg"></div>
                    <div class="flex-1 space-y-4">
                      <div class="h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-16 bg-gray-100 rounded-lg"></div>
                        <div class="h-16 bg-gray-100 rounded-lg"></div>
                        <div class="h-16 bg-gray-100 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  init(element) {
    // Add button click handlers
    const startButton = element.querySelector("#start-project");
    const learnButton = element.querySelector("#learn-more");

    if (startButton) {
      startButton.addEventListener("click", () => {
        // Scroll to contact section
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    if (learnButton) {
      learnButton.addEventListener("click", () => {
        // Scroll to features section
        const featuresSection = document.querySelector("#features");
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }
}
