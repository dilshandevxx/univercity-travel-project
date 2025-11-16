function bookNow() {
  document.getElementById("bookingPopup").classList.add("active");
}

function contactMe() {
  document.getElementById("contactPopup").classList.add("active");
}

function closePopup(popupId) {
  document.getElementById(popupId).classList.remove("active");
}

// Close popup when clicking outside the form
document.querySelectorAll(".popup-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });
});

// Close popup with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".popup-overlay").forEach((overlay) => {
      overlay.classList.remove("active");
    });
  }
});

// Handle booking form submission
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("bookName").value,
    email: document.getElementById("bookEmail").value,
    phone: document.getElementById("bookPhone").value,
    date: document.getElementById("bookDate").value,
    time: document.getElementById("bookTime").value,
    service: document.getElementById("bookService").value,
    message: document.getElementById("bookMessage").value,
  };

  console.log("Booking Data:", formData);

  document.getElementById("bookingSuccess").classList.add("show");
  document.getElementById("bookingForm").reset();

  setTimeout(() => {
    document.getElementById("bookingSuccess").classList.remove("show");
    closePopup("bookingPopup");
  }, 3000);
});

// Handle contact form submission
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    phone: document.getElementById("contactPhone").value,
    subject: document.getElementById("contactSubject").value,
    message: document.getElementById("contactMessage").value,
  };

  console.log("Contact Data:", formData);

  document.getElementById("contactSuccess").classList.add("show");
  document.getElementById("contactForm").reset();

  setTimeout(() => {
    document.getElementById("contactSuccess").classList.remove("show");
    closePopup("contactPopup");
  }, 3000);
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Add entrance animations
window.addEventListener("load", () => {
  const profileCard = document.querySelector(".profile-card");
  if (profileCard) {
    profileCard.style.opacity = "0";
    setTimeout(() => {
      profileCard.style.transition = "opacity 0.6s ease";
      profileCard.style.opacity = "1";
    }, 100);
  }
});
