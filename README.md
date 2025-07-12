# WebSolCr - SaaS Application Engineering

A modern, responsive SaaS marketing website built with HTML template components, Tailwind CSS, and vanilla JavaScript. Optimized for performance and GitHub Pages deployment.

## Features

- ⚡ **Lightning Fast** - HTML template components with vanilla JavaScript
- 📱 **Fully Responsive** - Looks great on all devices
- 🎨 **Modern Design** - Built with Tailwind CSS utility classes
- 🚀 **SEO Optimized** - Semantic HTML and meta tags
- 🧩 **Component-Based** - Modular HTML templates for easy maintenance
- 📈 **Conversion Focused** - Strategic CTAs and service-focused messaging
- 🌐 **GitHub Pages Ready** - No build process required

## Tech Stack

- **HTML5** - Semantic markup with template components
- **Tailwind CSS** - Utility-first styling via CDN
- **Vanilla JavaScript** - Component loader and smooth interactions
- **GitHub Pages** - Static hosting and automatic deployment

## Architecture

### Component Structure

```
websolcr/
├── index.html (main page with component placeholders)
├── templates/
│   ├── navigation.html (header navigation)
│   ├── hero.html (main hero section)
│   ├── features.html (services section)
│   ├── cta.html (call-to-action)
│   └── footer.html (footer)
└── js/
    └── simple-components.js (component loader)
```

### How It Works

1. `index.html` contains component placeholders with `data-component` attributes
2. `simple-components.js` fetches HTML templates and renders them dynamically
3. Each component gets initialized with its own event handlers and functionality
4. No build process or ES6 modules required - perfect for GitHub Pages

## Getting Started

### Local Development

1. Clone the repository

```bash
git clone https://github.com/websolcr/websolcr.git
cd websolcr
```

2. Open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html -> "Open with Live Server"
```

3. Visit `http://localhost:8000` to view the site

### Customization

#### Brand & Content

- Update company name, tagline, and content in `index.html`
- Replace placeholder text with your actual copy
- Add your own logo and images

#### Styling

- Customize colors in the Tailwind config section of `index.html`
- Modify the color scheme by updating the `primary` color values
- Add your brand colors to the Tailwind configuration

#### Features & Pricing

- Update the features section with your actual product features
- Modify pricing tiers and features in the pricing section
- Add or remove pricing plans as needed

## Deployment

### GitHub Pages with Environment Variables

This project uses GitHub Secrets to securely handle EmailJS credentials during deployment.

#### Setting Up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following repository secrets:
   - `EMAILJS_SERVICE_ID` - Your EmailJS service ID
   - `EMAILJS_TEMPLATE_ID` - Your EmailJS template ID  
   - `EMAILJS_PUBLIC_KEY` - Your EmailJS public key
   - `CONTACT_EMAIL` - Your contact email address

#### Deployment Process

1. Push your code to the `main` branch
2. GitHub Actions will automatically:
   - Create `config.js` with your secrets during build
   - Deploy to GitHub Pages
3. Your site will be available at `https://yourusername.github.io/yourrepo`

#### Local Development

For local development, create a `config.js` file based on `config.example.js`:

```bash
cp config.example.js config.js
# Edit config.js with your actual EmailJS credentials
```

**Note**: `config.js` is in `.gitignore` to prevent committing credentials to the repository.

### Custom Domain

1. Add a `CNAME` file with your domain name
2. Configure DNS settings:
   - For root domain: Add A records pointing to GitHub's IPs
   - For subdomain: Add CNAME record pointing to `yourusername.github.io`

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11+ (with graceful degradation)

## File Structure

```
├── index.html              # Main landing page
├── js/
│   └── simple-components.js # Component loader and interactions
├── templates/              # HTML component templates
│   ├── navigation.html
│   ├── hero.html
│   ├── features.html
│   ├── about.html
│   ├── tech-partners.html
│   ├── testimonials.html
│   ├── cta.html
│   └── footer.html
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment with secrets
├── config.example.js       # Template for local development
├── .gitignore             # Excludes config.js with credentials
├── README.md              # This file
└── CNAME                  # Custom domain (optional)
```

## Key Sections

1. **Hero** - Main value proposition and CTA
2. **Features** - Product/service highlights
3. **Pricing** - Transparent pricing tiers
4. **CTA** - Final conversion push
5. **Footer** - Additional links and information

## Optimization Tips

### Images

- Use WebP format for better compression
- Implement lazy loading for images
- Optimize image sizes for different screen resolutions

### Performance

- Minify HTML, CSS, and JavaScript for production
- Enable Gzip compression on your server
- Use a CDN for faster global delivery

### SEO

- Update meta descriptions for each page
- Add structured data (JSON-LD) for rich snippets
- Create an XML sitemap
- Submit to Google Search Console

## Analytics & Tracking

Add your tracking codes:

```html
<!-- Google Analytics 4 -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please contact [your-email@company.com](mailto:your-email@company.com)

---

Built with ❤️ for modern SaaS companies
