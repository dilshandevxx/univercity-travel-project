// PROFILES DATA ARRAY
// ========================================
const guidesData = [
  {
    id: 1,
    name: "Nilantha",
    title: "Nature Lover",
    rating: 5,
    reviews: 15,
    image: "/univercity-travel-project/frontend/assets/images/g10.jpg",
    location: "Colombo",
    languages: "Sinhala, English",
    responseTime: "less than 3 hours",
    category: "Chauffeur",
    contact: "0771248963",
    address: "No. 52 Panchikawatte Road, 10",
    email: "dilshan.perera97@gmail.com",
    description: [
      "Hi, I'm Nilantha. I'd been working as a Navigator and travelled around the world before joining Colombo harbour as a Tug Master.",
      "My passion is travelling and enjoy the beauty around the country, if you want to enjoy your vacation with authentic experiences and explore the hidden gems of Sri Lanka, I'm here to make your journey unforgettable!",
    ],
  },
  {
    id: 2,
    name: "Kavinda",
    title: "Adventure Specialist",
    rating: 5,
    reviews: 28,
    image: "/univercity-travel-project/frontend/assets/images/g2.jpg",
    location: "Kandy",
    languages: "Sinhala, English, Tamil",
    responseTime: "less than 1 hour",
    category: "Tour Guide",
    contact: "0772345678",
    address: "No. 15 Temple Road, Kandy",
    email: "kavinda.adventure@gmail.com",
    description: [
      "Hello! I'm Kavinda, a certified tour guide with 10 years of experience in adventure tourism.",
      "I specialize in trekking, wildlife safaris, and cultural tours. Let me show you the real Sri Lanka beyond the tourist hotspots!",
    ],
  },
  {
    id: 3,
    name: "Shalini",
    title: "Cultural Expert",
    rating: 5,
    reviews: 42,
    image: "/univercity-travel-project/frontend/assets/images/g3.png",
    location: "Galle",
    languages: "English, Sinhala, French",
    responseTime: "less than 2 hours",
    category: "Heritage Guide",
    contact: "0773456789",
    address: "No. 88 Fort Road, Galle",
    email: "shalini.cultural@gmail.com",
    description: [
      "Greetings! I'm Shalini, passionate about Sri Lankan history and culture.",
      "With a degree in archaeology and years of guiding experience, I offer immersive cultural tours that bring history to life. Perfect for those who want to understand the soul of Sri Lanka!",
    ],
  },

  {
    id: 4,
    name: "Asela",
    title: "Ancient City Historian",
    rating: 5,
    reviews: 110,
    image: "/univercity-travel-project/frontend/assets/images/g4.jpg",
    location: "Sigiriya/Polonnaruwa",
    languages: "English, Sinhala, Japanese",
    responseTime: "within 1 hour",
    category: "Archaeology",
    contact: "0701122334",
    address: "Near Sigiriya Rock Fortress",
    email: "asela.history@gmail.com",
    description: [
      "I'm Asela, your historian for the Cultural Triangle. I make ancient ruins fascinating!",
      "I provide in-depth tours of Sigiriya, Dambulla, and Polonnaruwa, focusing on the historical and engineering marvels of the ancient kingdoms.",
    ],
  },
  {
    id: 5,
    name: "Nuwan",
    title: "Coastal Escape Planner",
    rating: 4,
    reviews: 67,
    image: "/univercity-travel-project/frontend/assets/images/g5.jpg",
    location: "Mirissa/Unawatuna",
    languages: "English, Russian, Italian",
    responseTime: "less than 4 hours",
    category: "Beach & Watersports",
    contact: "0765432109",
    address: "Main Street, Mirissa",
    email: "nuwan.coastal@gmail.com",
    description: [
      "Planning a perfect beach holiday? I'm Nuwan, specializing in the Southern Coast's best spots.",
      "I arrange whale watching trips, surfing lessons, and the most relaxing stays. Fluent in several languages for international travelers.",
    ],
  },
  {
    id: 6,
    name: "Yasiru",
    title: "Local Cuisine Master",
    rating: 5,
    reviews: 31,
    image: "/univercity-travel-project/frontend/assets/images/g6.jpg",
    location: "Colombo",
    languages: "English, Sinhala, Hindi",
    responseTime: "within 2 hours",
    category: "Food & Culinary",
    contact: "0778899001",
    address: "Bambalapitiya, Colombo 04",
    email: "yasiru.foodie@gmail.com",
    description: [
      "Let me, Yasiru, introduce you to the authentic and vibrant street food scene of Colombo!",
      "I lead customized food tours, cooking classes, and visits to local markets, unlocking the secrets of Sri Lankan spices and flavors.",
    ],
  },
  {
    id: 7,
    name: "Ramesh",
    title: "Northern Explorer",
    rating: 4,
    reviews: 24,
    image: "/univercity-travel-project/frontend/assets/images/g7.jpg",
    location: "Jaffna",
    languages: "English, Tamil",
    responseTime: "less than 3 hours",
    category: "Regional Specialist",
    contact: "0787654321",
    address: "Kopay Road, Jaffna",
    email: "ramesh.north@gmail.com",
    description: [
      "I'm Ramesh, a specialist in the unique culture and history of the Northern Province, focusing on Jaffna and the islands.",
      "I offer tours that cover ancient temples, colonial architecture, and the resilient local lifestyle. Experience a different side of Sri Lanka!",
    ],
  },
  {
    id: 8,
    name: "Tharindu",
    title: "Wellness & Yoga Guide",
    rating: 5,
    reviews: 79,
    image: "/univercity-travel-project/frontend/assets/images/g8.png",
    location: "Kandy/Central Hills",
    languages: "English, Sinhala, Spanish",
    responseTime: "within 1 hour",
    category: "Health & Retreats",
    contact: "0719008877",
    address: "Peradeniya Road, Kandy",
    email: "tharindu.yoga@gmail.com",
    description: [
      "I am Tharindu, a certified Yoga and Ayurveda practitioner. I help you find tranquility in the Central Hills.",
      "I arrange personalized wellness retreats, meditation sessions, and guided tours to natural healing spots. Rejuvenate your mind and body.",
    ],
  },
  {
    id: 9,
    name: "Prasath",
    title: "Wildlife Specialist",
    rating: 5,
    reviews: 88,
    image: "/univercity-travel-project/frontend/assets/images/g9.jpg",
    location: "Yala National Park",
    languages: "English, Sinhala",
    responseTime: "less than 1 hour",
    category: "Nature & Safari",
    contact: "0712345678",
    address: "Tissamaharamaya, Hambantota",
    email: "prasath.safari@gmail.com",
    description: [
      "I'm Prasath, your expert guide for thrilling wildlife safaris in Yala and surrounding national parks.",
      "A certified tracker with over 15 years of experience, I specialize in leopard sightings and birdwatching. Let's explore the wild heart of Sri Lanka!",
    ],
  },
];

// ========================================
// GLOBAL VARIABLE
// ========================================
let currentGuideId = null;

// ========================================
// FUNCTION: Create a single guide card
// This function was originally incomplete in the body
// ========================================
function createGuideCard(guide) {
  const card = document.createElement("div");
  card.className = "profile-card";

  // Generate star rating (multiply star character by rating number)
  const stars = "★".repeat(guide.rating);

  // Build the card HTML (This is the HTML from the start of your original prompt)
  card.innerHTML = `
                <div class="profile-header">
                    <div class="profile-image">
                        <img src="${guide.image}" alt="${guide.name}">
                    </div>
                    <div class="profile-info">
                        <h1 class="profile-name">${guide.name}</h1>
                        <p class="profile-title">${guide.title}</p>
                        <div class="rating">
                            <span class="stars">${stars}</span>
                            <span class="reviews">${guide.reviews} reviews</span>
                        </div>
                        <div class="badge">
                            <svg class="badge-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
                            </svg>
                            Responds quickly
                        </div>
                    </div>
                </div>

                <div class="profile-details">
                    <div class="detail-item">
                        <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <div class="detail-text">
                            I live in <span class="detail-value">${guide.location}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                        </svg>
                        <div class="detail-text">
                            I speak <span class="detail-value">${guide.languages}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div class="detail-text">
                            Verified <span class="detail-value">Local host</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div class="detail-text">
                            Response time <span class="detail-value">${guide.responseTime}</span>
                        </div>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="showProfile(${guide.id})">Book me</button>
                </div>
            `;

  return card;
}

// ========================================
// FUNCTION: Initialize all guide cards
// ========================================
function initializeGuides() {
  const cardContainer = document.querySelector(".card-container");

  // Clear existing content
  cardContainer.innerHTML = "";

  // Loop through each guide and create a card
  guidesData.forEach((guide) => {
    const card = createGuideCard(guide);
    cardContainer.appendChild(card);
  });
}

// ========================================
// FUNCTION: Show detailed profile view
// ========================================
function showProfile(guideId) {
  // Store which guide is currently being viewed
  currentGuideId = guideId;

  // Find the guide's data from the array using the ID
  const guide = guidesData.find((g) => g.id === guideId);

  // If guide not found, show error and exit
  if (!guide) {
    console.error("Guide not found!");
    return;
  }

  // Update the profile view with this guide's information
  updateProfileView(guide);

  // Hide the cards view, show the detail view
  document.getElementById("cardView").style.display = "none";
  document.getElementById("profileView").style.display = "block";

  // Scroll to top of page
  window.scrollTo(0, 0);
}

// ========================================
// FUNCTION: Update profile detail view
// ========================================
function updateProfileView(guide) {
  const profileView = document.getElementById("profileView");

  // Generate star rating
  const stars = "★".repeat(guide.rating);

  // Update the profile card section
  const profileCard = profileView.querySelector(".profile-card");
  profileCard.innerHTML = `
                <div class="profile-header">
                    <div class="profile-image">
                        <img src="${guide.image}" alt="${guide.name}">
                    </div>
                    <div class="profile-info">
                        <h1 class="profile-name">${guide.name}</h1>
                        <p class="profile-title">${guide.title}</p>
                        <div class="rating">
                            <span class="stars">${stars}</span>
                            <span class="reviews">${guide.reviews} reviews</span>
                        </div>
                        <div class="badge">
                            <svg class="badge-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
                            </svg>
                            Responds quickly
                        </div>
                    </div>
                </div>

                <div class="profile-details">
                    <div class="detail-item">
                        <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <div class="detail-text">
                            I live in <span class="detail-value">${guide.location}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                        </svg>
                        <div class="detail-text">
                            I speak <span class="detail-value">${guide.languages}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div class="detail-text">
                            Verified <span class="detail-value">Local host</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div class="detail-text">
                            Response time <span class="detail-value">${guide.responseTime}</span>
                        </div>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="bookNow()">Book me</button>
                    <button class="btn btn-secondary" onclick="contactMe()">Contact me</button>
                </div>
            `;

  // Update content section with guide's description
  const contentSection = profileView.querySelector(".content-section");

  // Convert description array to HTML paragraphs
  const descriptionsHTML = guide.description
    .map((paragraph) => `<p class="description">${paragraph}</p>`)
    .join("");

  contentSection.innerHTML = `
                ${descriptionsHTML}
                
                <div class="details">
                    <dl class="row">
                        <dt class="col-sm-3">Category</dt>
                        <dd class="col-sm-9">${guide.category}</dd>

                        <dt class="col-sm-3">Languages</dt>
                        <dd class="col-sm-9">${guide.languages}</dd>

                        <dt class="col-sm-3">Contact</dt>
                        <dd class="col-sm-9">${guide.contact}</dd>

                        <dt class="col-sm-3 text-truncate">Address</dt>
                        <dd class="col-sm-9">${guide.address}</dd>

                        <dt class="col-sm-3">Email</dt>
                        <dd class="col-sm-9">${guide.email}</dd>
                    </dl>
                </div>
            `;

  // Update contact popup with current guide's phone number
  document.getElementById("contactPhone").value = `+94 ${guide.contact}`;

  // Update the call button to use current guide's phone
  document.querySelector("#contactPopup .submit-btn").onclick = function () {
    window.location.href = `tel:+94${guide.contact}`;
  };
}

// ========================================
// FUNCTION: Go back to cards view
// ========================================
function showCards() {
  // Hide detail view, show cards view
  document.getElementById("profileView").style.display = "none";
  document.getElementById("cardView").style.display = "block";

  // Scroll to top
  window.scrollTo(0, 0);
}

// ========================================
// FUNCTION: Open booking popup
// ========================================
function bookNow() {
  document.getElementById("bookingPopup").classList.add("active");
}

// ========================================
// FUNCTION: Open contact popup
// ========================================
function contactMe() {
  document.getElementById("contactPopup").classList.add("active");
}

// ========================================
// FUNCTION: Close popup
// ========================================
function closePopup(popupId) {
  document.getElementById(popupId).classList.remove("active");
}

// ========================================
// PAGE INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  // Create all guide cards
  initializeGuides();

  // Close popup when clicking outside the form
  document.querySelectorAll(".popup-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      // Only close if clicking the overlay itself, not the form
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });

  // Close popup when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".popup-overlay").forEach((overlay) => {
        overlay.classList.remove("active");
      });
    }
  });

  // Handle booking form submission
  document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Collect form data
    const formData = {
      guideId: currentGuideId, // Include which guide was booked
      guideName: guidesData.find((g) => g.id === currentGuideId)?.name,
      name: document.getElementById("bookName").value,
      email: document.getElementById("bookEmail").value,
      phone: document.getElementById("bookPhone").value,
      date: document.getElementById("bookDate").value,
      time: document.getElementById("bookTime").value,
      service: document.getElementById("bookService").value,
      message: document.getElementById("bookMessage").value,
    };

    // Log the booking data (in real app, send to server)
    console.log("Booking Data:", formData);

    // Show success message
    document.getElementById("bookingSuccess").classList.add("show");

    // Reset form
    document.getElementById("bookingForm").reset();

    // Hide success message and close popup after 3 seconds
    setTimeout(() => {
      document.getElementById("bookingSuccess").classList.remove("show");
      closePopup("bookingPopup");
    }, 2000);
  });
});
