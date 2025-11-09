const animation_element = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        //entry.target.classList.remove("animate");
      }
    });
  },
  {
    threshold: 0.5,
  }
);

for (let i = 0; i < animation_element.length; i++) {
  const el = animation_element[i];

  observer.observe(el);
}

// --------- Trip planning Form -------------

// Get elements
const openBtn = document.getElementById("openBtn");
const modal = document.getElementById("popupForm");
const closeBtn = document.querySelector(".close");

// Open popup
openBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close popup when clicking "x"
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close popup when clicking outside the form
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
