// Global Tray Count (used in Menu.html)
let trayCount = 0;
let vegActive = false;
let nonvegActive = false;

// Check page type based on URL or existing elements
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("tray-icon")) {
    initMenuPage();
  }

  if (document.getElementById("feedback-form")) {
    initFeedbackForm();
  }

  const addButtons = document.querySelectorAll(".add-to-order");
  if (addButtons.length > 0) {
    addButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        alert("Item added to Tray!"); // You can replace this with actual logic
      });
    });
  }
});

// Menu Page Logic
function initMenuPage() {
  document.getElementById("veg-btn").addEventListener("click", toggleVeg);
  document.getElementById("nonveg-btn").addEventListener("click", toggleNonVeg);

  const trayButtons = document.querySelectorAll(".menu-card button");
  trayButtons.forEach(btn => {
    btn.addEventListener("click", addToTray);
  });
}

function toggleVeg() {
  vegActive = !vegActive;
  nonvegActive = false;
  updateButtons();
  filterMenu();
}

function toggleNonVeg() {
  nonvegActive = !nonvegActive;
  vegActive = false;
  updateButtons();
  filterMenu();
}

function updateButtons() {
  document.getElementById("veg-btn").classList.toggle("active-veg", vegActive);
  document.getElementById("nonveg-btn").classList.toggle("active-nonveg", nonvegActive);
}

function filterMenu() {
  const cards = document.querySelectorAll(".menu-card");
  cards.forEach(card => {
    const isVeg = card.classList.contains("veg");
    const isNonVeg = card.classList.contains("nonveg");

    if (vegActive && isVeg) card.style.display = "block";
    else if (nonvegActive && isNonVeg) card.style.display = "block";
    else if (!vegActive && !nonvegActive) card.style.display = "block";
    else card.style.display = "none";
  });
}

function addToTray() {
  trayCount++;
  const trayDisplay = document.getElementById("tray-count");
  if (trayDisplay) trayDisplay.innerText = trayCount;
}

// Feedback Form Logic (Home Page)
function initFeedbackForm() {
  const form = document.getElementById("feedback-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const rating = document.getElementById("rating").value;
    const comments = document.getElementById("comments").value;

    if (rating < 1 || rating > 5) {
      alert("Please enter a rating between 1 and 5.");
      return;
    }

    alert("Thank you for your feedback!");
    form.reset();
  });
}
