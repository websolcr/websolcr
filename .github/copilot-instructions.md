<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# WebSolCr - SaaS Marketing Website - Copilot Instructions

This is a modern SaaS marketing website built with HTML template components, Tailwind CSS, and vanilla JavaScript. The focus is on performance, conversion optimization, and modern design.

## Project Context

- **Purpose**: Marketing website for WebSolCr - SaaS Application Engineering services
- **Tech Stack**: HTML Template Components, Tailwind CSS (CDN), Vanilla JavaScript
- **Architecture**: Component-based using HTML templates and dynamic loading
- **Hosting**: GitHub Pages (static hosting)
- **Target**: B2B SaaS customers seeking engineering services

## Code Style Guidelines

### HTML Components

- Use semantic HTML5 elements in template files
- Store components as HTML templates in `/templates/` folder
- Use `data-component` attributes for component placeholders
- Include proper meta tags for SEO in main `index.html`
- Maintain accessibility with ARIA labels and proper heading hierarchy
- Keep template structure clean and well-commented

### CSS (Tailwind)

- Use Tailwind utility classes for styling
- Follow mobile-first responsive design
- Use the custom color palette defined in tailwind.config
- Prefer Tailwind classes over custom CSS
- No separate CSS files - everything via Tailwind CDN

### JavaScript

- Write vanilla JavaScript (no frameworks or ES6 modules)
- Use `simple-components.js` for component loading and initialization
- Focus on performance and smooth animations
- Add proper error handling for template loading
- Comment complex logic and component initialization

## Design Principles

- **Performance First**: Optimize for speed and Core Web Vitals
- **Mobile-First**: Design for mobile, enhance for desktop
- **Conversion-Focused**: Clear CTAs and user flow
- **Accessible**: WCAG 2.1 AA compliance
- **SEO-Optimized**: Semantic markup and meta tags

## Content Guidelines

- Use action-oriented, benefit-focused copy
- Include social proof and testimonials
- Maintain consistent brand voice
- Focus on customer pain points and solutions

## File Structure

Current clean architecture:

```
websolcr/
├── index.html (main page with component placeholders)
├── templates/
│   ├── navigation.html (header navigation)
│   ├── hero.html (main hero section)
│   ├── features.html (services section)
│   ├── cta.html (call-to-action)
│   └── footer.html (footer component)
├── js/
│   └── simple-components.js (component loader)
└── .github/workflows/deploy.yml (GitHub Pages deployment)
```

## Component System

- Components are HTML templates loaded dynamically
- Each template contains complete HTML for one section
- `simple-components.js` handles template loading and initialization
- No build process required - perfect for GitHub Pages
- Components initialized with individual event handlers

When making changes:

1. Edit templates in `/templates/` folder for content changes
2. Modify `simple-components.js` for functionality changes
3. Update `index.html` only for meta tags or new component placeholders
4. Prioritize page speed and performance
5. Ensure mobile responsiveness
6. Maintain accessibility standards
7. Test component loading and interactions
