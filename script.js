// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) => {
  n.addEventListener("click", () => {
    if (hamburger && navMenu) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (!header) return;

  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 5px 30px rgba(0,0,0,0.15)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  }
});

// slide show

class Slideshow {
  constructor() {
    this.slideIndex = 1;
    this.slides = document.querySelectorAll(".slide");
    this.dots = document.querySelectorAll(".dot");
    this.slideshowContainer = document.querySelector(".slideshow-container");
    this.autoSlideInterval = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.startAutoSlide();
  }

  bindEvents() {
    // Navigation arrows
    document
      .querySelector(".prev")
      .addEventListener("click", () => this.changeSlide(-1));
    document
      .querySelector(".next")
      .addEventListener("click", () => this.changeSlide(1));

    // Dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.currentSlide(index + 1));
    });

    // Hover pause/resume
    this.slideshowContainer.addEventListener("mouseenter", () =>
      this.pauseAutoSlide(),
    );
    this.slideshowContainer.addEventListener("mouseleave", () =>
      this.startAutoSlide(),
    );
  }

  showSlide(n) {
    // Reset all slides and dots
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    // Handle wrap around
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    // Activate current slide and dot
    this.slides[this.slideIndex - 1].classList.add("active");
    this.dots[this.slideIndex - 1].classList.add("active");
  }

  changeSlide(n) {
    this.showSlide((this.slideIndex += n));
  }

  currentSlide(n) {
    this.showSlide((this.slideIndex = n));
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.changeSlide(1);
    }, 5000);
  }

  pauseAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}

// Initialize slideshow when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Slideshow();
});
