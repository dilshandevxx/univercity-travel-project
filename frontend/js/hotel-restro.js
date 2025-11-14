const cityDetails = {
  Colombo: {
    title: "Colombo",
    description:
      "Colombo is the commercial capital of Sri Lanka, offering a blend of modern high-rises and colonial architecture. It serves as the main gateway to the country.",
    hotels: [
      {
        name: "Shangri-La Colombo",
        desc: "A luxury 5-star urban sanctuary overlooking the Indian Ocean and Galle Face Green.",
        rating: 5,
        image: "/univercity-travel-project/frontend/assets/images/10.jpg",
      },
      {
        name: "Cinnamon Grand Colombo",
        desc: "Located in the business district, known for its extensive dining options and large pool.",
        rating: 5,
        image: "/univercity-travel-project/frontend/assets/images/11.jpg",
      },
      {
        name: "Hilton Colombo Hotel",
        desc: "Experience world-class hospitality in the heart of the city, perfect for business travelers.",
        rating: 4.5,
        image: "/univercity-travel-project/frontend/assets/images/12.jpg",
      },
    ],
  },

  Kandy: {
    title: "Kandy",
    description:
      "Kandy, the hill country jewel, is home to the sacred Temple of the Tooth Relic, a UNESCO World Heritage site. Surrounded by misty mountains and the serene Kandy Lake, this cultural hub comes alive during the Esala Perahera festival with vibrant processions.",
    hotels: [
      {
        name: "The Trees, Kandy",
        desc: "The Trees, Kandy offers a 5-star hotel experience in Kandy city center. <br>Guests enjoy a rooftop swimming pool.",
        rating: 5,
        image: "/univercity-travel-project/frontend/assets/images/13.jpg",
      },
      {
        name: "Cinnamon Citadel Kandy",
        desc: "Set by the Mahaweli River, this hotel is known for its serene setting and exceptional service.",
        rating: 4.5,
        image: "/univercity-travel-project/frontend/assets/images/14.jpg",
      },
      {
        name: "The Radh",
        desc: "Boutique luxury located right in the heart of Kandy city, close to the Temple of the Tooth.",
        rating: 4,
        image: "/univercity-travel-project/frontend/assets/images/15.jpg",
      },
    ],
  },
  Galle: {
    title: "Galle",
    description:
      "Galle, a coastal gem, is famous for its well-preserved Dutch Fort and colonial architecture. The city offers a mix of history, beaches, and boutique hotels overlooking the Indian Ocean.",
    hotels: [
      {
        name: "radisson blu resort",
        desc: "Boasting oceanfront suites and a spectacular rooftop bar overlooking the Indian Ocean.",
        rating: 5,
        image: "/univercity-travel-project/frontend/assets/images/16.jpg",
      },
      {
        name: "Fort Bazaar",
        desc: "A charming boutique hotel situated within the historic Galle Fort.",
        rating: 4.5,
        image: "/univercity-travel-project/frontend/assets/images/17.jpg",
      },
      {
        name: "Jetwing Lighthouse",
        desc: "A Geoffrey Bawa masterpiece with an infinity pool overlooking the sea.",
        rating: 5,
        image: "/univercity-travel-project/frontend/assets/images/18.jpg",
      },
    ],
  },
  "Nuwara Eliya": {
    title: "Nuwara Eliya",
    description:
      "Nuwara Eliya, often called 'Little England', is famous for its cool climate, tea plantations, and colonial-era bungalows.",
    hotels: [
      {
        name: "Grand Hotel",
        desc: "A stately colonial-era hotel with impeccable service and lush gardens.",
        rating: 5,
        image: "/univercity-travel-project/frontend/assets/images/19.jpg",
      },
      {
        name: "Heritance Tea Factory",
        desc: "A unique hotel built within an old tea factory atop a hill.",
        rating: 5,
        image: "/univercity-travel-project/frontend/assets/images/20.jpg",
      },
      {
        name: "The Golden Ridge Hotel",
        desc: "A unique hotel built within an old tea factory atop a hill.",
        rating: 4.5,
        image: "/univercity-travel-project/frontend/assets/images/21.jpg",
      },
    ],
  },
  Negombo: {
    title: "Negombo",
    description:
      "Negombo is a major city on the west coast, known for its long sandy beaches and a vibrant fishing industry.",
    hotels: [
      {
        name: "Jetwing Blue",
        desc: "A modern resort right on the beach with luxurious rooms and pools.",
        rating: 4.5,
        image: "/univercity-travel-project/frontend/assets/images/22.jpg",
      },
      {
        name: "Heritance Negombo",
        desc: "Offers a relaxed, sun-kissed experience with direct beach access.",
        rating: 4,
        image: "/univercity-travel-project/frontend/assets/images/23.jpg",
      },
      {
        name: "Camelot Beach Hotel",
        desc: "Offers a pool bar at the beachfront pool. <br>It has an Ayurvedic spa and balcony with partial or full sea views.",
        rating: 4,
        image: "/univercity-travel-project/frontend/assets/images/24.jpg",
      },
    ],
  },
  Sigiriya: {
    title: "Sigiriya",
    description:
      "Home to the iconic Lion Rock fortress, Sigiriya is a historical and archaeological marvel in the Central Province.",
    hotels: [
      {
        name: "Sigiriya Village Hotel",
        desc: "Eco-friendly resort with a stunning view of the Sigiriya Rock.",
        rating: 4,
        image: "/univercity-travel-project/frontend/assets/images/25.jpg",
      },
      {
        name: "Jetwing Vil Uyana",
        desc: "A highly-rated eco-luxury resort built on paddy fields and marshes.",
        rating: 5,
        image: "/univercity-travel-project/frontend/assets/images/26.jpg",
      },
      {
        name: "Elephas Resort & Spa",
        desc: "Elephas Resort & Spa in Habarana offers family rooms with air-conditioning, private bathrooms, and modern amenities.",
        rating: 5,
        image: "/univercity-travel-project/frontend/assets/images/27.jpg",
      },
    ],
  },
};

const cityCards = document.querySelectorAll(".city-card");
const cityTitle = document.getElementById("city-title");
const cityDescription = document.getElementById("city-description");
const hotelListings = document.querySelector(".hotel-listings");

function generateStarIcons(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>';
    } else if (i - 0.5 === rating) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return `<div class="rating text-warning">${stars}</div>`;
}

function renderHotels(hotels) {
  hotelListings.innerHTML = ""; // Clear previous hotels
  if (hotels.length === 0) {
    hotelListings.innerHTML =
      '<p class="text-muted">No hotels found for this city.</p>';
    return;
  }

  hotels.forEach((hotel) => {
    console.log(`${hotel.name}: website =`, hotel.website); // Add this line

    const hotelHtml = `
            <div class="col-md-4 hotel-card">
              <img src="${
                hotel.image || "/travel-website/images/hotel-placeholder.jpg"
              }" class="img-fluid rounded-3 mb-3" alt="${hotel.name}" />
              <h5 class="hotel-name">${hotel.name}</h5>
              <p class="hotel-description">${hotel.desc}</p>
              ${generateStarIcons(hotel.rating)}
            </div>
          `;
    hotelListings.insertAdjacentHTML("beforeend", hotelHtml);
  });

  // Add See More button after hotels
  //   hotelListings.insertAdjacentHTML(
  //     "afterend",
  //     '<button class="btn btn-primary mt-5 px-5 py-2">See more</button>'
  //   );
}

function updateCityDetails(city) {
  const data = cityDetails[city];
  if (!data) return;

  cityTitle.textContent = city;
  cityDescription.textContent = data.description;
  renderHotels(data.hotels);
}

cityCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Remove 'active' class from all cards
    cityCards.forEach((c) => c.classList.remove("active"));

    // Add 'active' class to the clicked card
    card.classList.add("active");

    const city = card.getAttribute("data-city");
    updateCityDetails(city);
  });
});

// Initialize with Colombo details on load (or Kandy as in the image)
updateCityDetails("Kandy"); // Initial load based on the image's selected city
//

// gallery
// Hotel filtering and scrolling
const hotelLabels = document.querySelectorAll(
  ".hotel-filter-section .top-content label"
);

hotelLabels.forEach((label) => {
  label.addEventListener("click", () => {
    // Scroll to the hotel filter section
    const filterSection = document.querySelector(".hotel-filter-section");
    filterSection.scrollIntoView({ behavior: "smooth" });
  });
});
