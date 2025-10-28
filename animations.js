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

// ===== COUNTER ANIMATION SYSTEM =====
// Counter animation for numbers
function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  const suffix = counter.getAttribute('data-suffix') || '';
  const duration = 4000; // 4 seconds
  const start = 0;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    
    const current = Math.floor(start + (target - start) * easeOutQuart);
    counter.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target + suffix;
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCounter(entry.target);
    }
  });
}, {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
});

// Initialize counters when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // ... existing code ...
  
  // Observe counter elements
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => counterObserver.observe(counter));
});
class TestimonialCarousel {
  constructor() {
    this.carousel = document.querySelector('.testimonial-carousel');
    this.slides = document.querySelector('.testimonial-slide');
    this.cards = document.querySelectorAll('.testimonial-card');
    this.dots = document.querySelectorAll('.carousel-dot');
    
    this.currentIndex = 0;
    this.totalSlides = this.cards.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds
    
    // Mouse drag variables
    this.isDragging = false;
    this.startPos = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.animationID = 0;
    
    this.init();
  }
  
  init() {
    if (!this.carousel || !this.slides || this.cards.length === 0) return;
    
    // Set up dot navigation
    this.dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.getAttribute('data-slide'));
        this.goToSlide(slideIndex);
      });
    });
    
    // Start autoplay
    // this.startAutoPlay();
    
    // Pause autoplay on hover
    // this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    // this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    
    // Touch/swipe support for mobile
    this.setupTouchSupport();
    
    // Mouse drag support
    this.setupMouseSupport();
    
    // Update initial state
    this.updateCarousel();
    this.carousel.style.cursor = 'grab'; // Set initial cursor
  }
  
  updateCarousel() {
    // Move slides
    const translateX = -this.currentIndex * 100;
    this.slides.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    this.dots.forEach((dot, index) => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'));
      dot.classList.toggle('active', slideIndex === this.currentIndex);
      dot.classList.toggle('bg-blue-500', slideIndex === this.currentIndex);
      dot.classList.toggle('bg-gray-300', slideIndex !== this.currentIndex);
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
  
  // startAutoPlay() {
  //   this.stopAutoPlay(); // Clear any existing interval
  //   this.autoPlayInterval = setInterval(() => {
  //     this.nextSlide();
  //   }, this.autoPlayDelay);
  // }
  
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
      
      // this.startAutoPlay();
    });
  }
  
  setupMouseSupport() {
    // Mouse down
    this.carousel.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.startPos = e.clientX;
      this.stopAutoPlay();
      this.carousel.style.cursor = 'grabbing';
      this.carousel.classList.add('dragging');
      e.preventDefault(); // Prevent text selection
    });
    
    // Mouse move
    this.carousel.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      
      const currentPosition = e.clientX;
      const diff = currentPosition - this.startPos;
      const containerWidth = this.carousel.offsetWidth;
      const dragPercentage = (diff / containerWidth) * 100;
      
      // Apply transform with drag
      const currentTranslate = -this.currentIndex * 100 + dragPercentage;
      this.slides.style.transform = `translateX(${currentTranslate}%)`;
    });
    
    // Mouse up
    this.carousel.addEventListener('mouseup', (e) => {
      if (!this.isDragging) return;
      
      this.isDragging = false;
      this.carousel.style.cursor = 'grab';
      this.carousel.classList.remove('dragging');
      
      // Determine slide direction based on drag distance
      const endPos = e.clientX;
      const diff = this.startPos - endPos;
      const containerWidth = this.carousel.offsetWidth;
      const threshold = containerWidth * 0.1; // 10% of container width
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.nextSlide(); // Dragged left
        } else {
          this.prevSlide(); // Dragged right
        }
      } else {
        // Snap back to current slide
        this.updateCarousel();
      }
      
      // this.startAutoPlay();
    });
    
    // Mouse leave (cancel drag)
    this.carousel.addEventListener('mouseleave', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.carousel.style.cursor = 'grab';
        this.carousel.classList.remove('dragging');
        this.updateCarousel();
        // this.startAutoPlay();
      }
    });
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialCarousel();
});