// Common user functionality for all pages

// Function to get user info from token
function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (e) {
    return null;
  }
}

// Function to update user name in navigation
function updateUserName() {
  const user = getUserFromToken();
  const userSection = document.querySelector(".user-section span");

  if (userSection) {
    if (user && user.username) {
      userSection.textContent = user.username;
    } else {
      userSection.textContent = "Traveler";
    }
  }
}

// Call updateUserName on page load
document.addEventListener("DOMContentLoaded", updateUserName);
