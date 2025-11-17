// ========================================
// NEW JAVASCRIPT FUNCTIONS ADDED
// ========================================

// NEW FUNCTION: Show profile detail view when "Book me" is clicked from card
function showProfile() {
  document.getElementById("cardView").style.display = "none"; // Hide the cards view
  document.getElementById("profileView").style.display = "block"; // Show the profile detail view
  window.scrollTo(0, 0); // Scroll to top of page
}

// NEW FUNCTION: Go back to cards view when "Back" button is clicked
function showCards() {
  document.getElementById("profileView").style.display = "none"; // Hide the profile detail view
  document.getElementById("cardView").style.display = "block"; // Show the cards view
  window.scrollTo(0, 0); // Scroll to top of page
}

// Function to open booking popup (same as before)
function bookNow() {
  document.getElementById("bookingPopup").classList.add("active");
}

// Function to open contact popup (same as before)
function contactMe() {
  document.getElementById("contactPopup").classList.add("active");
}

// Function to close popups (same as before)
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
