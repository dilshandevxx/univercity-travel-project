// Photo Gallery JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Filter button click handler
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      // Filter gallery items
      galleryItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    });
  });

  // Modal functionality
  const modal = new bootstrap.Modal(document.getElementById("imageModal"));
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");

  // Gallery item click handler
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.querySelector(".gallery-info h3").textContent;
      const description = item.querySelector(".gallery-info p").textContent;

      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalTitle.textContent = title;
      modalDescription.textContent = description;

      modal.show();
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(13, 50, 82, 0.98)";
    } else {
      navbar.style.background = "rgba(13, 50, 82, 0.95)";
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe gallery items for animation
  galleryItems.forEach((item) => {
    observer.observe(item);
  });

  // Keyboard navigation for modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal._isShown) {
      modal.hide();
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next image (if implemented)
      console.log("Swipe left");
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous image (if implemented)
      console.log("Swipe right");
    }
  }

  // Lazy loading for images (if needed in future)
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  // Preload critical images
  const criticalImages = [
    "../assets/HomeAssets/Logo.png",
    "../assets/HomeAssets/HeroPhoto.jpg",
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Add loading class to body initially
  document.body.classList.add("loaded");

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Debounced scroll handler
  const debouncedScroll = debounce(() => {
    // Scroll-based animations or effects can be added here
  }, 16);

  window.addEventListener("scroll", debouncedScroll);

  // Error handling for images
  galleryItems.forEach((item) => {
    const img = item.querySelector("img");
    img.addEventListener("error", () => {
      console.warn(`Failed to load image: ${img.src}`);
      // Could set a fallback image here
      // img.src = '../assets/fallback-image.jpg';
    });
  });

  console.log("Photo Gallery initialized successfully");
});
