export class ComponentLoader {
  constructor() {
    this.components = new Map();
  }

  /**
   * Register a component
   * @param {string} name - Component name
   * @param {Function} component - Component class or function
   */
  register(name, component) {
    this.components.set(name, component);
  }

  /**
   * Render a component
   * @param {string} name - Component name
   * @param {Object} props - Component properties
   * @param {HTMLElement} target - Target element to render into
   */
  async render(name, props = {}, target = null) {
    const Component = this.components.get(name);
    if (!Component) {
      throw new Error(`Component "${name}" not found`);
    }

    const instance = new Component(props);
    const html = await instance.render();
    
    if (target) {
      target.innerHTML = html;
      // Initialize component after rendering
      if (instance.init) {
        instance.init(target);
      }
    }
    
    return html;
  }

  /**
   * Load and render all components in the DOM
   */
  async loadAll() {
    const componentElements = document.querySelectorAll('[data-component]');
    
    for (const element of componentElements) {
      const componentName = element.dataset.component;
      const props = element.dataset.props ? JSON.parse(element.dataset.props) : {};
      
      try {
        await this.render(componentName, props, element);
      } catch (error) {
        console.error(`Failed to load component "${componentName}":`, error);
      }
    }
  }
}

// Global component loader instance
export const componentLoader = new ComponentLoader();
