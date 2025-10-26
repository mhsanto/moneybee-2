// ===== ANIMATION SYSTEM =====
// Intersection Observer for scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    } else {
      entry.target.classList.remove('animated');
    }
  });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Hero section load animation
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    // Small delay to ensure styles are applied
    setTimeout(() => {
      heroSection.classList.add('hero-loaded');
    }, 100);
  }

  // Observe all scroll-triggered animation elements, excluding hero elements
  const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.hero-title):not(.hero-description):not(.hero-button):not(.hero-card)');
  animatedElements.forEach(el => observer.observe(el));
});