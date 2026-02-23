

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

const cityInput = document.querySelector(".search-input");
const matchingCities = document.querySelector(".matching_city");
const noResultMsg = document.querySelector('.no-result-message');
const homeFooter = document.querySelector('.home-footer');
const loaderIcon = document.querySelector('.loading-icon');
const progress = document.querySelector('.progress')

     

cityInput.addEventListener("input", async () => {
  const query = cityInput.value.trim();
  matchingCities.innerHTML = "";
  matchingCities.classList.add('hidden');
  noResultMsg.classList.remove('hidden');
  homeFooter.classList.remove('hidden');
  


  if (query.length < 2) return;
  matchingCities.classList.remove('hidden');
  noResultMsg.classList.add('hidden');
  homeFooter.classList.add('hidden')
  
  
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`
    );

    const data = await response.json();

    if (!data.results) {
    
       matchingCities.innerHTML = `<li class="">
                <p id="search-in-progress">
                    <img src="/assets/images/icon-loading.svg" alt="loading" class="loading-icon loader"> Search in progress
                </p>
            </li>`
        
       
     
      return;
    
    }


   

  
    data.results.forEach(city => {
      const li = document.createElement("li");
      li.textContent = `${city.name}, ${city.country}`;
      li.style.cursor = "pointer";
      li.style.padding = "5px";

      li.addEventListener("click", () => {
        cityInput.value = city.name;
        matchingCities.innerHTML = "";
        matchingCities.classList.add('hidden')
      });

      
      matchingCities.appendChild(li);
    });

  } catch (error) {
  
    console.error("Error:", error);
  }
});
