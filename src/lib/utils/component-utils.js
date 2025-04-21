/**
 * Component Utilities
 * 
 * Helper functions for working with web components
 */

/**
 * Registers a custom element if it hasn't been registered already
 * @param {string} tagName - The custom element tag name (must contain a hyphen)
 * @param {CustomElementConstructor} elementClass - The element class
 * @returns {boolean} - Whether registration was successful
 */
export function registerComponent(tagName, elementClass) {
  if (!tagName.includes('-')) {
    console.error('Custom element tag names must contain a hyphen (-)');
    return false;
  }
  
  if (!customElements.get(tagName)) {
    customElements.define(tagName, elementClass);
    return true;
  }
  
  return false;
}

/**
 * Creates a template element from HTML string
 * @param {string} html - HTML content
 * @returns {HTMLTemplateElement} - Template element
 */
export function createTemplate(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template;
}

/**
 * Converts an object to CSS custom properties
 * @param {Object} props - Object with property names and values
 * @param {string} prefix - Optional prefix for property names
 * @returns {string} - CSS custom properties string
 */
export function objectToCssProperties(props, prefix = '') {
  return Object.entries(props)
    .map(([key, value]) => {
      const propName = prefix ? `--${prefix}-${key}` : `--${key}`;
      return `${propName}: ${value};`;
    })
    .join('\n');
}
