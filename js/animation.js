/**
 * PREMIUM AI SALES ASSISTANT - ANIMATION SYSTEM (animation.js)
 * Coordinates AOS scrolling, interactive hover elements, and responsive layout safety
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize AOS (Animate On Scroll) library with premium timings
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 750,
      easing: "ease-out-quad",
      once: true,
      offset: 80,
      delay: 50
    });
  }

  // 2. Automated Safety: Layout-Shift Protection for AOS horizontal translations
  // Automatically attaches 'aos-overflow-guard' class to parents/sections of elements using fade-left/right
  const animatedSlides = document.querySelectorAll('[data-aos="fade-left"], [data-aos="fade-right"]');
  animatedSlides.forEach(element => {
    const section = element.closest("section") || element.closest(".container-fluid") || element.parentElement;
    if (section) {
      section.classList.add("aos-overflow-guard");
    }
  });

  // 3. Interactive Counter Animation System
  const counters = document.querySelectorAll(".animate-counter");
  if (counters.length > 0) {
    const startCounter = (element) => {
      const target = parseInt(element.getAttribute("data-target") || "0", 10);
      const suffix = element.getAttribute("data-suffix") || "";
      const duration = parseInt(element.getAttribute("data-duration") || "1500", 10);
      
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentCount = Math.floor(progress * target);
        
        element.textContent = currentCount.toLocaleString() + suffix;
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          element.textContent = target.toLocaleString() + suffix;
        }
      };
      
      window.requestAnimationFrame(step);
    };

    // Use IntersectionObserver to trigger counter on view scroll
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // 4. Cursor Hover Tilt / Parallax Effect on Premium Cards
  const tiltCards = document.querySelectorAll(".premium-card-tilt");
  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X position relative to card
      const y = e.clientY - rect.top;  // Mouse Y position relative to card
      
      // Calculate center point
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Compute subtle rotate angles (max 6 degrees tilt for luxury effect)
      const rotateX = ((centerY - y) / centerY) * 5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
});
