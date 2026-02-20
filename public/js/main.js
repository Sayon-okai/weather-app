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