import { json } from "express";

// Custom dropdown for units selection built using prompt code from ChatGPT. It replaces the default select element with a custom dropdown for better styling and user experience.
const dropdown = document.getElementById("unitsDropdown");
const selected = dropdown.querySelector(".dropdown-selected");
const items = dropdown.querySelectorAll(".dropdown-item");
const hiddenInput = document.getElementById("unitsValue");

// Toggle dropdown
selected.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

// Select item
items.forEach(item => {
  item.addEventListener("click", () => {
    selected.querySelector("span").textContent = item.textContent;
    hiddenInput.value = item.dataset.value;
    dropdown.classList.remove("active");
  });
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});

// custom dropdown end

// Fetch cities for autocomplete using the geocoding API and populate the datalist with the results. This allows users to see suggestions as they type in the city name, improving the user experience and making it easier to find the correct city.

// const cityInput = document.querySelector(".search-input");
// const matchingCities = document.querySelector(".matching_city");

// cityInput.addEventListener("input", async () => {
//   const query = cityInput.value.trim();

//   if (query.length > 0) {
//     try {
//       const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`);
//       const data = await response.json();

//        console.log('Geocoding API response for autocomplete:', data);
//     } 
//     catch (error) {
//       console.error("Error fetching city data:", error);
//       json({ error: "Failed to fetch city data" });
//       return;
//     }
   
//   };
// });
