// Deployment Configuration for EmailJS
// This file can be safely committed to version control
// It will use environment variables or fallback to example values

window.EMAILJS_CONFIG = {
  SERVICE_ID: process.env.EMAILJS_SERVICE_ID || 'service_rsrwfsy',
  TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID || 'template_wlvuoeg', 
  PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY || '5av2wCVISBH1JBB3-',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'sureshhemal@hotmail.com'
}; 