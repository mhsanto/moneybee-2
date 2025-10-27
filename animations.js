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

// ===== TESTIMONIAL CAROUSEL SYSTEM =====
class TestimonialCarousel {
  constructor() {
    this.carousel = document.querySelector('.testimonial-carousel');
    this.slides = document.querySelector('.testimonial-slide');
    this.cards = document.querySelectorAll('.testimonial-card');
    this.prevBtn = document.querySelector('.carousel-nav.prev');
    this.nextBtn = document.querySelector('.carousel-nav.next');
    this.dots = document.querySelectorAll('.carousel-dot');
    
    this.currentIndex = 0;
    this.totalSlides = this.cards.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds
    
    this.init();
  }
  
  init() {
    if (!this.carousel || !this.slides || this.cards.length === 0) return;
    
    // Set up event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Set up dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Start autoplay
    this.startAutoPlay();
    
    // Pause autoplay on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    
    // Touch/swipe support for mobile
    this.setupTouchSupport();
    
    // Update initial state
    this.updateCarousel();
  }
  
  updateCarousel() {
    // Move slides
    const translateX = -this.currentIndex * 100;
    this.slides.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel();
  }
  
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }
  
  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  setupTouchSupport() {
    let startX = 0;
    let endX = 0;
    
    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.stopAutoPlay();
    });
    
    this.carousel.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });
    
    this.carousel.addEventListener('touchend', () => {
      const diffX = startX - endX;
      const threshold = 50; // Minimum swipe distance
      
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          this.nextSlide(); // Swipe left
        } else {
          this.prevSlide(); // Swipe right
        }
      }
      
      this.startAutoPlay();
    });
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialCarousel();
});