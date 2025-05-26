// Get the container where extension cards will be rendered
const extensionList = document.getElementById("extension-list");

// Initialize an empty array to store the extensions data
let extensions = [];

// Fetch the extension data from a JSON file
fetch("data.json")
  .then((res) => res.json()) // Convert the response to JSON
  .then((data) => {
    extensions = data; // Store the data in the extensions array
    renderExtensions("all"); // Initially render all extensions
  });

// Function to render extension cards based on a filter (all, enabled, or disabled)
function renderExtensions(filter = "all") {
  extensionList.innerHTML = ""; // Clear existing cards before rendering

  // Filter the extensions based on the selected filter
  const filterBtn = document.querySelectorAll(".filter button");
  filterBtn.forEach((btn) => {
if(document.body.classList.contains("light")) btn.classList.add("light")
  console.log(btn)
  })
  console.log(filterBtn)
  const filtered = extensions.filter((ext) =>
    filter === "all"       // If 'all' is selected, include all extensions
      ? true
      : filter === "enabled" // If 'enabled' is selected, include only active extensions
      ? ext.isActive
      : !ext.isActive        // Otherwise, include only inactive extensions
);

  // Loop through the filtered extensions and create cards for each
  filtered.forEach((ext, index) => {
    // Create the main card container
    const card = document.createElement("div");
    card.className = `extension-card ${ext.isActive ? "active" : "disabled"}`; // Add class based on active status

    // Create and configure the logo image
    const logo = document.createElement("img");
    logo.src = ext.logo;
    logo.alt = ext.name;

    // Create the extension title
    const title = document.createElement("h3");
    title.textContent = ext.name;

    // Create the extension description
    const desc = document.createElement("p");
    desc.textContent = ext.description;

    // Create the 'Remove' button and assign a click event to remove the extension
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
removeBtn.className = document.body.classList.contains("light") ? "removeBtn light" : "removeBtn";
    removeBtn.onclick = () => {
      extensions.splice(index, 1); // Remove extension from the array
      renderExtensions(filter);   // Re-render the list
    };

    // Create the toggle switch and assign a click event to toggle isActive
    const toggle = document.createElement("div");
    toggle.className = "toggle";
    toggle.onclick = () => {
      ext.isActive = !ext.isActive; // Toggle the active status
      renderExtensions(filter);     // Re-render the list
    };

    // Create a div to hold the logo and text
    const cardContent = document.createElement("div");
    cardContent.className = "cardContent";

    // Create a container for title and description
    const cardText = document.createElement("div");
    cardText.className = "cardText";
    cardText.appendChild(title);  // Add title to cardText
    cardText.appendChild(desc);   // Add description to cardText

    // Add logo and text to the card content
    cardContent.appendChild(logo);
    cardContent.appendChild(cardText);

    // Create a div to hold the buttons
    const buttonDiv = document.createElement("div")
    buttonDiv.className = "buttonDiv"
    buttonDiv.appendChild(removeBtn); // Add remove button
    buttonDiv.appendChild(toggle);    // Add toggle switch

    // Assemble the full card
    card.appendChild(cardContent); // Add content to card
    card.appendChild(buttonDiv);   // Add buttons to card

    // Append the card to the extension list container
    extensionList.appendChild(card);
  });
}

// Initial render call in case the data is already loaded
renderExtensions();

// Add click event listeners to all filter buttons
// (e.g., All, Enabled, Disabled)
document.querySelectorAll(".filter button").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    document.querySelectorAll(".filter button").forEach((b) => b.classList.remove("active"));

    // Add active class to the clicked button
    btn.classList.add("active");

    // Call renderExtensions with the selected filter
    renderExtensions(btn.dataset.filter);
  });
});

// === DARK/LIGHT TOGGLE ===

// Get the theme toggle button (moon/sun icon)
const themeToggle = document.getElementById("themeToggle");

// Function to apply the theme (light or dark)
function setTheme(mode) {
  // Add or remove the 'light' class on body
  document.body.classList.toggle("light", mode === "light");
  
  // Save the selected theme in local storage
  localStorage.setItem("theme", mode);

  // Change the icon based on the mode
  const iconSrc = mode === "light"
    ? "./assets/images/icon-moon.svg"
    : "./assets/images/icon-sun.svg";

  // Update the toggle button with the icon
  themeToggle.innerHTML = `<img src="${iconSrc}" alt="theme icon" />`;
}

// Add event listener to toggle theme on click
themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light"); // Check current theme
  const newTheme = isLight ? "dark" : "light"; // Determine new theme
  setTheme(newTheme); // Apply new theme
});

// On page load, apply the saved theme from local storage
const savedTheme = localStorage.getItem("theme") || "dark"; // Default to dark if none saved
setTheme(savedTheme); // Apply the saved or default theme
