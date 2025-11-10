// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scroll for navigation links (including dropdown items)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }

        // Close dropdown menu
        const dropdownMenu = this.closest(".dropdown-menu");
        if (dropdownMenu) {
          const dropdown = bootstrap.Dropdown.getInstance(
            this.closest(".dropdown").querySelector(
              '[data-bs-toggle="dropdown"]'
            )
          );
          if (dropdown) {
            dropdown.hide();
          }
        }
      }
    }
  });
});

// Hero buttons scroll to sections
document.querySelector(".btn-city").addEventListener("click", function () {
  const byCitySection = document.getElementById("byCity");
  const offsetTop = byCitySection.offsetTop - 80;
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
});

document.querySelector(".btn-category").addEventListener("click", function () {
  const byCategorySection = document.getElementById("byCategory");
  const offsetTop = byCategorySection.offsetTop - 80;
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
});

// Cities Data
const cities = [
  {
    name: "Colombo",
    description:
      "The vibrant capital city blending modernity with colonial charm, bustling markets, and oceanfront promenades.",
    image: "../assets/Destination/colombo.jpg",
    subtitle: '"The Gateway to Sri Lanka"',
  },
  {
    name: "Galle",
    description:
      "A UNESCO World Heritage site, Galle Fort showcases Dutch colonial architecture, charming boutiques, and stunning ocean views.",
    image: "../assets/Destination/galle.jpg",
    subtitle: '"Dutch Colonial Charm by the Indian Ocean"',
  },
  {
    name: "Kandy",
    description:
      "Kandy, the hill country jewel, is home to the sacred Temple of the Tooth Relic, a UNESCO World Heritage site. Surrounded by misty mountains and the serene Kandy Lake, this cultural hub comes alive during the Esala Perahera festival with vibrant processions.",
    image: "../assets/Destination/kandy.jpg",
    subtitle: '"The Cultural Capital Nestled in Misty Hills"',
  },
  {
    name: "Ella",
    description:
      "A picturesque hill station surrounded by tea plantations, waterfalls, and hiking trails offering breathtaking mountain views.",
    image: "../assets/Destination/Ella.webp",
    subtitle: '"Mountain Paradise in the Highlands"',
  },
  {
    name: "Sigiriya",
    description:
      "Ancient rock fortress rising 200 meters high, featuring stunning frescoes and palace ruins atop this UNESCO World Heritage site.",
    image: "../assets/Destination/sigiriya.jpg",
    subtitle: '"The Lion Rock Fortress"',
  },
];

// Current city index (starting with Kandy - index 2)
let currentCityIndex = 2;

// Get DOM elements
const timelineDots = document.querySelectorAll(".timeline-dot");
const cityInfo = document.querySelector(".city-info");
const mainCard = document.querySelector(".main-card");
const previewCard = document.querySelector(".preview-card");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Add transition styles
cityInfo.style.transition = "opacity 0.3s ease-in-out";
mainCard.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
previewCard.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

// Function to get next city index
function getNextCityIndex(currentIndex) {
  return (currentIndex + 1) % cities.length;
}

// Function to get previous city index
function getPrevCityIndex(currentIndex) {
  return (currentIndex - 1 + cities.length) % cities.length;
}

// Function to update city content
function updateCityContent(index, direction = "next") {
  const currentCity = cities[index];
  const nextIndex = getNextCityIndex(index);
  const nextCity = cities[nextIndex];

  // Update timeline dots
  timelineDots.forEach((d) => d.classList.remove("active"));
  timelineDots[index].classList.add("active");

  // Fade out effect
  cityInfo.style.opacity = "0";
  mainCard.style.opacity = "0";
  previewCard.style.opacity = "0";

  // Add slide animation based on direction
  if (direction === "next") {
    mainCard.style.transform = "translateX(-50px)";
    previewCard.style.transform = "translateX(-50px)";
  } else {
    mainCard.style.transform = "translateX(50px)";
    previewCard.style.transform = "translateX(50px)";
  }

  setTimeout(() => {
    // Update city info
    cityInfo.querySelector("h3").textContent = currentCity.name;
    cityInfo.querySelector("p").textContent = currentCity.description;

    // Update main card (current city)
    mainCard.querySelector("img").src = currentCity.image;
    mainCard.querySelector("h4").textContent = currentCity.name;
    mainCard.querySelector("p").textContent = currentCity.subtitle;

    // Update preview card (next city)
    previewCard.querySelector("img").src = nextCity.image;
    previewCard.querySelector("h4").textContent = nextCity.name;
    previewCard.querySelector("p").textContent = nextCity.subtitle;

    // Fade in and reset position
    cityInfo.style.opacity = "1";
    mainCard.style.opacity = "1";
    previewCard.style.opacity = "0.7";
    mainCard.style.transform = "translateX(0)";
    previewCard.style.transform = "translateX(0)";
  }, 300);
}

// Timeline dots click event
timelineDots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    if (index !== currentCityIndex) {
      const direction = index > currentCityIndex ? "next" : "prev";
      currentCityIndex = index;
      updateCityContent(currentCityIndex, direction);
    }
  });
});

// Next button click event
nextBtn.addEventListener("click", function () {
  currentCityIndex = getNextCityIndex(currentCityIndex);
  updateCityContent(currentCityIndex, "next");
});

// Previous button click event
prevBtn.addEventListener("click", function () {
  currentCityIndex = getPrevCityIndex(currentCityIndex);
  updateCityContent(currentCityIndex, "prev");
});

// Click on preview card to go to next
previewCard.addEventListener("click", function () {
  currentCityIndex = getNextCityIndex(currentCityIndex);
  updateCityContent(currentCityIndex, "next");
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    currentCityIndex = getPrevCityIndex(currentCityIndex);
    updateCityContent(currentCityIndex, "prev");
  } else if (e.key === "ArrowRight") {
    currentCityIndex = getNextCityIndex(currentCityIndex);
    updateCityContent(currentCityIndex, "next");
  }
});

// Category cards hover effect
const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) rotateX(2deg)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotateX(0)";
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all category cards
document.querySelectorAll(".category-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s ease-out";
  observer.observe(card);
});

// Search functionality
const searchInput = document.querySelector(".search-box input");
const searchIcon = document.querySelector(".search-box i");

searchInput.addEventListener("focus", function () {
  this.style.width = "300px";
  searchIcon.style.color = "#1a73e8";
});

searchInput.addEventListener("blur", function () {
  if (this.value === "") {
    this.style.width = "250px";
    searchIcon.style.color = "#666";
  }
});

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const searchTerm = this.value.toLowerCase();
    console.log("Searching for:", searchTerm);
    alert("Search functionality: " + searchTerm);
  }
});

// Mobile menu close on link click
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    if (window.innerWidth < 992) {
      navbarCollapse.classList.remove("show");
    }
  });
});

// Add active state to navigation based on scroll position
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Initialize tooltips if using Bootstrap tooltips
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Page load animation
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in";
    document.body.style.opacity = "1";
  }, 100);
});

// Auto-play carousel (optional - uncomment to enable)
/*
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        currentCityIndex = getNextCityIndex(currentCityIndex);
        updateCityContent(currentCityIndex, 'next');
    }, 5000); // Change city every 5 seconds
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Start auto-play on page load
startAutoPlay();

// Stop auto-play when user interacts
[prevBtn, nextBtn, previewCard, ...timelineDots].forEach(element => {
    element.addEventListener('click', () => {
        stopAutoPlay();
        setTimeout(startAutoPlay, 10000); // Resume after 10 seconds of inactivity
    });
});
*/

console.log("Sri Lanka Tourism Website Loaded Successfully!");
console.log("Current City:", cities[currentCityIndex].name);
