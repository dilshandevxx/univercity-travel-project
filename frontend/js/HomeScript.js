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

// Leaflet MAP SCRIPT
// Initialize Leaflet map centered on Sri Lanka
        const map = L.map('map',{scrollWheelZoom: false}).setView([7.8731, 80.7718], 7); // Sri Lanka


        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([6.9271, 79.8612]).addTo(map)
          .bindPopup('Hello, Colombo!')
          .openPopup();


          // Get elements
          const searchBtn = document.querySelector('.search-btn');
          const searchInput = document.getElementById('search');

          // Search marker variable
          let searchMarker = null;

          // Search function
          function searchLocation() {
            const query = searchInput.value.trim();
            
            if (!query) {
              alert('Please enter a location');
              return;
            }

            // Show loading
            searchBtn.textContent = 'Searching...';
            searchBtn.disabled = true;

            // Search using Nominatim API
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=lk&limit=1`)
              .then(response => response.json())
              .then(data => {
                searchBtn.textContent = 'Search';
                searchBtn.disabled = false;

                if (data.length > 0) {
                  const lat = parseFloat(data[0].lat);
                  const lon = parseFloat(data[0].lon);
                  const name = data[0].display_name;

                  // Remove old marker
                  if (searchMarker) {
                    map.removeLayer(searchMarker);
                  }

                  // Add new marker
                  searchMarker = L.marker([lat, lon]).addTo(map)
                    .bindPopup(`<b>${name}</b>`)
                    .openPopup();

                  // Move to location
                  map.flyTo([lat, lon], 13, { duration: 1.5 });

                } else {
                  alert('Location not found');
                }
              })
              .catch(error => {
                searchBtn.textContent = 'Search';
                searchBtn.disabled = false;
                alert('Search failed. Please try again.');
              });
          }

          // Button click
          searchBtn.addEventListener('click', searchLocation);

          // Enter key
          searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
              searchLocation();
            }
          });
//Contact form
