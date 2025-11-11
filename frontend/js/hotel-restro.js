// {
//    <script
//       src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
//     ></script>
//     <script>
//       const cityDetails = {
//         Kandy: {
//           title: "Kandy",
//           description: "Kandy, the hill country jewel, is home to the sacred Temple of the Tooth Relic, a UNESCO World Heritage site. Surrounded by misty mountains and the serene Kandy Lake, this cultural hub comes alive during the Esala Perahera festival with vibrant processions.",
//           hotels: [
//             { name: "Earl's Regency", desc: "A luxury hotel offering stunning views of the surrounding mountains and valleys.", rating: 5 },
//             { name: "Cinnamon Citadel Kandy", desc: "Set by the Mahaweli River, this hotel is known for its serene setting and exceptional service.", rating: 4.5 },
//             { name: "The Radh", desc: "Boutique luxury located right in the heart of Kandy city, close to the Temple of the Tooth.", rating: 4 },
//           ]
//         },
//         Galle: {
//           title: "Galle",
//           description: "Galle, a coastal gem, is famous for its well-preserved Dutch Fort and colonial architecture. The city offers a mix of history, beaches, and boutique hotels overlooking the Indian Ocean.",
//           hotels: [
//             { name: "Amari Galle", desc: "Boasting oceanfront suites and a spectacular rooftop bar overlooking the Indian Ocean.", rating: 5 },
//             { name: "Fort Bazaar", desc: "A charming boutique hotel situated within the historic Galle Fort.", rating: 4.5 },
//             { name: "Jetwing Lighthouse", desc: "A Geoffrey Bawa masterpiece with an infinity pool overlooking the sea.", rating: 5 },
//           ]
//         },
//         "Nuwara Eliya": {
//           title: "Nuwara Eliya",
//           description: "Nuwara Eliya, often called 'Little England', is famous for its cool climate, tea plantations, and colonial-era bungalows.",
//           hotels: [
//             { name: "Grand Hotel", desc: "A stately colonial-era hotel with impeccable service and lush gardens.", rating: 5 },
//             { name: "Heritance Tea Factory", desc: "A unique hotel built within an old tea factory atop a hill.", rating: 5 },
//           ]
//         },
//         Negombo: {
//           title: "Negombo",
//           description: "Negombo is a major city on the west coast, known for its long sandy beaches and a vibrant fishing industry.",
//           hotels: [
//             { name: "Jetwing Blue", desc: "A modern resort right on the beach with luxurious rooms and pools.", rating: 4.5 },
//             { name: "Heritance Negombo", desc: "Offers a relaxed, sun-kissed experience with direct beach access.", rating: 4 },
//           ]
//         },
//         Sigiriya: {
//           title: "Sigiriya",
//           description: "Home to the iconic Lion Rock fortress, Sigiriya is a historical and archaeological marvel in the Central Province.",
//           hotels: [
//             { name: "Sigiriya Village Hotel", desc: "Eco-friendly resort with a stunning view of the Sigiriya Rock.", rating: 4 },
//             { name: "Jetwing Vil Uyana", desc: "A highly-rated eco-luxury resort built on paddy fields and marshes.", rating: 5 },
//           ]
//         },
//         Colombo: {
//           title: "Colombo",
//           description: "Colombo is the commercial capital of Sri Lanka, offering a blend of modern high-rises and colonial architecture. It serves as the main gateway to the country.",
//           hotels: [
//             { name: "Shangri-La Colombo", desc: "A luxury 5-star urban sanctuary overlooking the Indian Ocean and Galle Face Green.", rating: 5 },
//             { name: "Cinnamon Grand Colombo", desc: "Located in the business district, known for its extensive dining options and large pool.", rating: 5 },
//             { name: "Hilton Colombo Hotel", desc: "Experience world-class hospitality in the heart of the city, perfect for business travelers.", rating: 4.5 },
//           ]
//         }
//       };

//       const cityCards = document.querySelectorAll(".city-card");
//       const cityTitle = document.getElementById("city-title");
//       const cityDescription = document.getElementById("city-description");
//       const hotelListings = document.querySelector(".hotel-listings");

//       function generateStarIcons(rating) {
//         let stars = '';
//         for (let i = 1; i <= 5; i++) {
//           if (i <= rating) {
//             stars += '<i class="fas fa-star"></i>';
//           } else if (i - 0.5 === rating) {
//             stars += '<i class="fas fa-star-half-alt"></i>';
//           } else {
//             stars += '<i class="far fa-star"></i>';
//           }
//         }
//         return `<div class="rating text-warning">${stars}</div>`;
//       }

//       function renderHotels(hotels) {
//         hotelListings.innerHTML = ''; // Clear previous hotels
//         if (hotels.length === 0) {
//           hotelListings.innerHTML = '<p class="text-muted">No hotels found for this city.</p>';
//           return;
//         }

//         hotels.forEach(hotel => {
//           const hotelHtml = `
//             <div class="col-md-4 hotel-card">
//               <img src="/travel-website/images/hotel-placeholder.jpg" class="img-fluid rounded-3 mb-3" alt="${hotel.name}" />
//               <h5 class="hotel-name">${hotel.name}</h5>
//               <p class="hotel-description">${hotel.desc}</p>
//               ${generateStarIcons(hotel.rating)}
//             </div>
//           `;
//           hotelListings.insertAdjacentHTML('beforeend', hotelHtml);
//         });

//         // Add See More button after hotels
//         hotelListings.insertAdjacentHTML('afterend', '<button class="btn btn-primary mt-5 px-5 py-2">See more</button>');
//       }

//       function updateCityDetails(city) {
//         const data = cityDetails[city];
//         if (!data) return;

//         cityTitle.textContent = city;
//         cityDescription.textContent = data.description;
//         renderHotels(data.hotels);
//       }

//       cityCards.forEach((card) => {
//         card.addEventListener("click", () => {
//           // Remove 'active' class from all cards
//           cityCards.forEach(c => c.classList.remove('active'));

//           // Add 'active' class to the clicked card
//           card.classList.add('active');

//           const city = card.getAttribute('data-city');
//           updateCityDetails(city);
//         });
//       });

//       // Initialize with Colombo details on load (or Kandy as in the image)
//       updateCityDetails('Kandy'); // Initial load based on the image's selected city
//     </script>

// }
