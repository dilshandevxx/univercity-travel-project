// Navigation
function showSection(section) {
  // Hide all sections
  const sections = [
    "dashboard",
    "profile",
    "tours",
    "add-tour",
    "bookings",
    "messages",
    "settings",
  ];
  sections.forEach((s) => {
    const el = document.getElementById(s + "-section");
    if (el) el.style.display = "none";
  });

  // Show selected section
  const selectedSection = document.getElementById(section + "-section");
  if (selectedSection) {
    selectedSection.style.display = "block";
  }

  // Update active nav link
  document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  event.target.classList.add("active");
}

function showAddTourForm() {
  showSection("add-tour");
}

// Tour Management
function editTour() {
  alert("Edit tour functionality - Opens tour edit form");
}

function deleteTour(btn) {
  if (confirm("Are you sure you want to delete this tour?")) {
    btn.closest(".tour-card").remove();
    alert("Tour deleted successfully!");
  }
}

function saveTour() {
  const title = document.getElementById("tour-title").value;
  const description = document.getElementById("tour-description").value;
  const location = document.getElementById("tour-location").value;
  const duration = document.getElementById("tour-duration").value;
  const price = document.getElementById("tour-price").value;

  if (!title || !description || !location || !duration || !price) {
    alert("Please fill in all required fields");
    return;
  }

  alert("Tour saved successfully!");
  showSection("tours");
}

// Booking Management
function showBookingTab(tab) {
  document.querySelectorAll(".nav-tabs .nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  event.target.classList.add("active");

  if (tab === "upcoming") {
    document.getElementById("upcoming-bookings").style.display = "block";
    document.getElementById("past-bookings").style.display = "none";
  } else {
    document.getElementById("upcoming-bookings").style.display = "none";
    document.getElementById("past-bookings").style.display = "block";
  }
}

function acceptBooking(btn) {
  const badge = btn.closest(".col-md-4").querySelector(".badge");
  badge.className = "badge badge-confirmed mb-3";
  badge.textContent = "Confirmed";

  const buttonDiv = btn.parentElement;
  buttonDiv.innerHTML = `
                <button class="btn btn-sm btn-info me-1">
                    <i class="fas fa-eye me-1"></i>View Details
                </button>
                <button class="btn btn-sm btn-primary" onclick="showSection('messages')">
                    <i class="fas fa-envelope me-1"></i>Message
                </button>
            `;

  alert("Booking accepted! Traveler has been notified.");
}

function declineBooking(btn) {
  if (confirm("Are you sure you want to decline this booking?")) {
    btn.closest(".booking-card").remove();
    alert("Booking declined. Traveler has been notified.");
  }
}

// Profile Management
function saveProfile() {
  alert("Profile updated successfully!");
}

function toggleAvailability(day) {
  if (day.classList.contains("available")) {
    day.classList.remove("available");
    day.classList.add("unavailable");
  } else {
    day.classList.remove("unavailable");
    day.classList.add("available");
  }
}

// Messaging
function selectChat(name) {
  document.getElementById("chat-name").textContent = name;

  // Remove unread styling
  document.querySelectorAll(".message-card").forEach((card) => {
    card.classList.remove("unread");
  });
  event.currentTarget.classList.remove("unread");

  // Update badge
  const badge = document.getElementById("message-badge");
  const currentCount = parseInt(badge.textContent);
  if (currentCount > 0) {
    badge.textContent = currentCount - 1;
  }
}

function sendMessage() {
  const input = document.getElementById("message-input");
  const message = input.value.trim();

  if (message) {
    const messagesDiv = document.getElementById("chat-messages");
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    const messageDiv = document.createElement("div");
    messageDiv.className = "message-bubble sent";
    messageDiv.innerHTML = `
                    ${message}
                    <div class="small mt-1" style="opacity: 0.8;">${time}</div>
                `;

    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    input.value = "";
  }
}

// Settings
function changePassword() {
  alert("Password changed successfully!");
}

function saveNotifications() {
  alert("Notification preferences saved!");
}

function deactivateAccount() {
  if (
    confirm(
      "Are you sure you want to deactivate your account? You can reactivate it later."
    )
  ) {
    alert("Account deactivated. You can reactivate by logging in again.");
  }
}

function deleteAccount() {
  const confirmation = prompt(
    'This action cannot be undone. Type "DELETE" to confirm:'
  );
  if (confirmation === "DELETE") {
    alert(
      "Account deletion process initiated. You will receive a confirmation email."
    );
  }
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    // In a real application, this would redirect to login page
  }
}

// Function to update guider name and profile image in dashboard
function updateGuiderInfo() {
  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      // Update name in dashboard welcome header
      const nameElement = document.querySelector("#dashboard-section h3");
      if (nameElement && user.full_name) {
        nameElement.textContent = `Hi, ${user.full_name}👋`;
      }
      // Update profile image in dashboard welcome header
      const imgElement = document.querySelector(
        "#dashboard-section .profile-img"
      );
      if (imgElement && user.profile_image) {
        imgElement.src = user.profile_image;
        imgElement.alt = `${user.full_name}'s profile picture`;
      }
      // Update profile image in profile section
      const profileImgElement = document.querySelector(
        "#profile-section img.rounded-circle"
      );
      if (profileImgElement && user.profile_image) {
        profileImgElement.src = user.profile_image;
        profileImgElement.alt = `${user.full_name}'s profile picture`;
      }
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }
}

// Call updateGuiderInfo on page load
document.addEventListener("DOMContentLoaded", updateGuiderInfo);
