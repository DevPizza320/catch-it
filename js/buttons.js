import { show, hide, setPlayerUserNames, loadFromLocalStorage, logLocalStorageContents, getUserDeviceType } from "./data/helper-functions.js";
import { showPlayerSkins } from "./skins.js";

const allPlayerData = loadFromLocalStorage("allPlayerData");

// Canvases
const jungleCanvas = document.getElementById("jungleCanvas");

// Wooden Button (all buttons)
const woodenButton = document.querySelectorAll(".woodenButton, .open-star-pwr-window, .empty-canvas");

// Back Button
const backButton = document.getElementById("backButton");
backButton.style.display = "none";

// Canvas Buttons
const settingsButton = document.getElementById("settingsButton");
const skinButton = document.getElementById("skinButton");

// Currency Buttons
const p1GemButton = document.getElementById("p1GemButton");
const p2GemButton = document.getElementById("p2GemButton");
const p1CatchCoinButton = document.getElementById("p1CatchCoinButton");
const p2CatchCoinButton = document.getElementById("p2CatchCoinButton");

// === MAIN CANVAS ===

const homeScreenButtons = document.querySelectorAll(".home-screen");
const exitButton = document.getElementById("exitButton");

// === LEVELS CANVAS ===

const levelsButton = document.getElementById("levelsButton");
const levelsCanvas = document.getElementById("levelsCanvas");

const levelsContainer = document.querySelector(".levels-container");

// === PROFILE CANVAS ===
const profileButton = document.getElementById("profileButton");
const profileCanvas = document.getElementById("profileCanvas");
const profileWrapper = document.querySelector(".profile-wrapper");
hide([profileCanvas, profileWrapper]);

// === SETTINGS CANVAS ===

const settingsWrapper = document.querySelector(".settings-wrapper");
const settingsCanvas = document.getElementById("settingsCanvas");
hide(settingsCanvas);

// === SKIN CANVAS ===

const skinsCanvas = document.getElementById("skinsCanvas");
hide(skinsCanvas);

const skinShowDiv = document.querySelector(".skinShowDiv");
hide(skinShowDiv);

const skinShowDivs = document.querySelectorAll(".skinShowDiv");

const skinButtons = skinShowDiv.querySelectorAll("button");
skinButtons.forEach((button) => {
  hide(button);
});

const playerSelection = document.querySelector(".playerSelection");
hide(playerSelection);

const player1Selector = document.getElementById("player-1-selector");
player1Selector.querySelector("span").textContent = `${setPlayerUserNames(1)}`;

const player2Selector = document.getElementById("player-2-selector");
player2Selector.querySelector("span").textContent = `${setPlayerUserNames(2)}`;

const skinDetailsDiv = document.getElementById("skinDetailsDiv");

// Button Click
const buttonSound = new Audio("Media/Background/SFX/ButtonClick.mp3");
buttonSound.volume = allPlayerData.generalStats.sfxVolume || 1;

// Function to show or hide currency buttons
function setCurrencyButtonsVisibility(visible) {
  const displayStyle = visible ? "flex" : "none"; // Show when visible, hide otherwise
  p1GemButton.style.display = displayStyle;
  p2GemButton.style.display = displayStyle;
  p1CatchCoinButton.style.display = displayStyle;
  p2CatchCoinButton.style.display = displayStyle;

  p1GemButton.querySelector("span").textContent = allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[0]].gems;
  p2GemButton.querySelector("span").textContent = allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[1]].gems;
  p1CatchCoinButton.querySelector("span").textContent = allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[0]].catchCoins;
  p2CatchCoinButton.querySelector("span").textContent = allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[1]].catchCoins;

}

// Ensure currency buttons are initially visible (since jungleCanvas is the main screen)
setCurrencyButtonsVisibility(true);

let canvasToShow = null; // Global variable to track current canvas
let lastCanvas = null;

// Function to show a specific canvas and the back button
function showCanvas(canvas, display = "block") {
  lastCanvas = canvasToShow;

  // Hide all canvases
  hide([jungleCanvas, levelsCanvas, settingsCanvas, profileCanvas, skinsCanvas, skinDetailsDiv]);

  // Hide currency buttons by default
  setCurrencyButtonsVisibility(false);

  // Show the target canvas
  canvas.style.display = display;
  canvasToShow = canvas; // Update the global canvasToShow variable

  // Show or hide the back button
  if (canvas !== jungleCanvas) {
    show(backButton, "block");
  } else {
    hide(backButton)
  }

  // Show currency buttons ONLY on jungleCanvas and skinsCanvas
  if (canvas === jungleCanvas || canvas === skinsCanvas) {
    setCurrencyButtonsVisibility(true);
  }

  // Additional logic based on the canvas shown
  if (profileCanvas.style.display === "block") {
    profileWrapper.scrollTop = 0;
    show(profileWrapper, "flex");
  } else {
    hide(profileWrapper);
  }
  if (settingsCanvas.style.display === "block") {
    show(settingsWrapper, "flex");
  } else {
    hide(settingsWrapper);
  }
  if (skinsCanvas.style.display === "block") {
    skinShowDivs.forEach(div => show(div, "grid")); // ← show both for safety
    skinButtons.forEach(button => show(button, "flex"));
    skinShowDiv.scrollTop = 0;
    show(playerSelection, "flex");
  } else {
    skinShowDivs.forEach(div => hide(div)); // ← this is the important fix
    skinButtons.forEach(button => hide(button));
    hide(playerSelection);
  }
  if (levelsCanvas.style.display === "flex") {
    show(levelsContainer, "flex");
    levelsContainer.scrollTop = 0; 0;
  } else {
    hide(levelsContainer);
  }
}

// Add click event to all buttons
woodenButton.forEach((button) => {
  button.addEventListener("click", () => {
    buttonSound.play();
  });
});

exitButton.addEventListener("click", () => {
  window.close();
})

// Add click event to the back button
backButton.addEventListener("click", () => {
  if (canvasToShow === skinDetailsDiv && lastCanvas) {
    showCanvas(lastCanvas);
  } else {
    showCanvas(jungleCanvas);
    homeScreenButtons.forEach(button => {
      show(button, "flex");
    })
  }
});


// Add click event to the settings button
levelsButton.addEventListener("click", () => {
  showCanvas(levelsCanvas, "flex");
  setCurrencyButtonsVisibility(true);
  homeScreenButtons.forEach(button => {
    hide(button);
  })
})

profileButton.addEventListener("click", () => {
  showCanvas(profileCanvas);
});

settingsButton.addEventListener("click", () => {
  showCanvas(settingsCanvas);
  homeScreenButtons.forEach(button => {
    hide(button);
  });
  logLocalStorageContents();
});

// Add click event to the skin button
skinButton.addEventListener("click", () => {
  showCanvas(skinsCanvas);
  showPlayerSkins("player1", document.getElementById("skinShowDiv1"));
});

export { showCanvas, setCurrencyButtonsVisibility, buttonSound };