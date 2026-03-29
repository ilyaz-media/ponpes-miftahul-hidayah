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
