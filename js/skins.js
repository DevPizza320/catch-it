import { allPlayerData } from "./data/players.js";
import { allSkins, rarityInfo, levelData } from "./data/skins.js";
import { gameAssets } from "./data/assets.js"
import { showCanvas, buttonSound, setCurrencyButtonsVisibility } from "./buttons.js";

const skinDetailsDiv = document.getElementById("skinDetailsDiv");
const skinName = document.getElementById("skin-name").querySelector('span');
const skinNameDiv = document.getElementById("skin-name");
const skinImg = document.getElementById("skin-img");
const skinDesc = document.getElementById("skin-info").querySelector('p');
const leftArrow = skinDetailsDiv.querySelector(".left-arrow");
const rightArrow = skinDetailsDiv.querySelector(".right-arrow");
const selectButton = document.getElementById("select-button");
const upgradeButton = document.getElementById("upgrade-button");

const currentSkinDiv = document.getElementById("current-skin");
const currentSkinImg = document.getElementById("current-skin-img");
const mainStarPowerNames = document.querySelectorAll(".open-star-pwr-window span");
const mainStarPowerImages = document.querySelectorAll(".open-star-pwr-window img");
const starPowerImages = document.querySelector(".star-power-list").querySelectorAll("img");
const starPowerDescImg = document.querySelector(".star-pwr-desc-img").querySelector(".star-pwr-img");
const starPowerDescName = document.querySelector(".star-pwr-desc-name");
const starPowerDescDesc = document.querySelector(".star-pwr-desc-desc");
const skinHealth = document.getElementById("skin-health");
const skinSpeed = document.getElementById("skin-speed");

const player1Selector = document.getElementById("player-1-selector");
const player2Selector = document.getElementById("player-2-selector");
const skinShowDiv1 = document.getElementById("skinShowDiv1");
const skinShowDiv2 = document.getElementById("skinShowDiv2");

const player1Icon = document.getElementById("p1Profile").querySelector(".player-icon img");
const player2Icon = document.getElementById("p2Profile").querySelector(".player-icon img");

let currentSkins = [];
let currentSkinIndex = 0;
let currentPlayerKey = "";

// Save player data
function savePlayerData() {
  localStorage.setItem("player1Skins", JSON.stringify(player1Skins));
  localStorage.setItem("player2Skins", JSON.stringify(player2Skins));
}

// === SHOWING DETAILS ===

function showSkinDetails(skin) {
  // Save index so arrows know where we are
  currentSkinIndex = currentSkins.findIndex(s => s.name === skin.name);

  const playerData = allPlayerData[currentPlayerKey];
  const skinData =
    playerData.skins.unlockedSkins[skin.name] ??
    playerData.skins.lockedSkins[skin.name];
  const currentLevel = skinData?.currentLevel || 1;
  const upgradePoints = skinData?.upgradePoints ?? 0;

  if (!playerData.skins.unlockedSkins[skin.name]) {
    selectButton.style.display = "none";
    upgradeButton.style.display = "none";
  } else if (playerData.skins.unlockedSkins[skin.name]) {
    selectButton.style.display = "grid";
    upgradeButton.style.display = "grid";
  }

  // Fill the visible fields
  skinName.textContent = skin.name;
  skinNameDiv.style.border = `0.5vw solid ${rarityInfo[skin.rarity].border}`;
  skinNameDiv.style.backgroundColor = rarityInfo[skin.rarity].background;
  skinImg.src = skin.image;
  skinDesc.textContent = skin.desc;

  currentSkinDiv.style.background = `radial-gradient(${rarityInfo[skin.rarity].background} 40%, ${rarityInfo[skin.rarity].border})`;
  currentSkinImg.src = skin.image;

  const starPowerNames = Object.keys(skin.starPowerInfo);
  mainStarPowerNames.forEach((name, index) => {
    name.textContent = starPowerNames[index];
  });

  mainStarPowerImages.forEach((img, index) => {
    img.src = skin.starPowerInfo[starPowerNames[index]].image;
  });

  skinHealth.textContent = `Health: ${skinData.health}`;
  skinSpeed.textContent = `Speed: ${skinData.speed}`;

  starPowerImages.forEach((img, index) => {
    img.src = skin.starPowerInfo[starPowerNames[index]].image;
    starPowerDescImg.src = skin.starPowerInfo[starPowerNames[0]].image;
    starPowerDescName.textContent = starPowerNames[0];
    starPowerDescDesc.textContent = skin.starPowerInfo[starPowerNames[0]].desc;

    img.addEventListener("click", () => {
      gameAssets.audios.sfx.starPowerSelected.play();
      allPlayerData[currentPlayerKey].skins.selectedSkin.selectedStarPower = starPowerNames[index];

      starPowerDescImg.src = skin.starPowerInfo[allPlayerData[currentPlayerKey].skins.selectedSkin.selectedStarPower].image;
      starPowerDescName.textContent = starPowerNames[index];
      starPowerDescDesc.textContent = skin.starPowerInfo[starPowerNames[index]].desc;
    })
  });


  updateDetails(currentLevel, upgradePoints);
  setCurrencyButtonsVisibility(true);
  updateArrowState();
}

function showStarPowerDetails() {
  const starPowerWindow = document.getElementById("forStarPowers");
  const starPowerImages = document.querySelectorAll(".open-star-pwr-window");

  // Show the star power window
  starPowerImages.forEach(image => {
    image.addEventListener("click", () => {
      starPowerWindow.style.display = "grid";
    });
  });

  // Hide only when clicking the background (not the inner window)
  starPowerWindow.addEventListener("click", (event) => {
    if (event.target === starPowerWindow) {
      starPowerWindow.style.display = "none";
    }
  });
}

function updateDetails(playerSkinLevel, playerSkinPoints) {


  const upgradeCostText = document.getElementById("upgrade-cost-text");
  upgradeCostText.textContent = `${levelData[playerSkinLevel - 1].upgradeCost} 🪙`;

  const powerPointsFill = document.getElementById("powerpoints-fill");
  powerPointsFill.style.width = `${(playerSkinPoints / levelData[playerSkinLevel - 1].powerPointsRequired) * 100}%`;

  const powerpointsText = document.getElementById("powerpoints-text");
  powerpointsText.textContent = `${playerSkinPoints} / ${levelData[playerSkinLevel - 1].powerPointsRequired}`;
}

function updateArrowState() {
  /* LEFT */
  if (currentSkinIndex === 0) {
    leftArrow.classList.add("disabled");
    leftArrow.classList.remove("hoverable");
  } else {
    leftArrow.classList.remove("disabled");
    leftArrow.classList.add("hoverable");
  }

  /* RIGHT */
  if (currentSkinIndex === currentSkins.length - 1) {      //  ← note “‑1”
    rightArrow.classList.add("disabled");
    rightArrow.classList.remove("hoverable");
  } else {
    rightArrow.classList.remove("disabled");
    rightArrow.classList.add("hoverable");
  }
}


function showPlayerSkins(playerKey, container) {
  currentPlayerKey = playerKey;
  const playerData = allPlayerData[playerKey];
  if (!playerData) {
    console.error(`Player "${playerKey}" not found.`);
    return;
  }

  const skinShowDiv = container;
  skinShowDiv.style.display = "grid";

  const otherDiv = container === skinShowDiv1 ? skinShowDiv2 : skinShowDiv1;
  otherDiv.style.display = "none";
  otherDiv.innerHTML = "";  // full wipe, even listeners gone

  // Append it inside the skinsCanvas container or wherever it fits logically
  // Adjust this selector to your actual desired parent container
  const skinsCanvasContainer = document.querySelector("#skinsCanvas")?.parentElement;
  if (!skinsCanvasContainer) {
    console.error("Parent container for skinShowDiv not found.");
    return;
  }
  if (skinShowDiv.parentElement !== skinsCanvasContainer) {
    skinsCanvasContainer.appendChild(skinShowDiv);
  }

  skinShowDiv.innerHTML = ""; // Clear previous content

  const unlockedNames = Object.keys(playerData.skins.unlockedSkins || {});
  const lockedNames = Object.keys(playerData.skins.lockedSkins || {});

  const unlockedSkins = allSkins.filter(skin => unlockedNames.includes(skin.name));
  const lockedSkins = allSkins.filter(skin => lockedNames.includes(skin.name));

  currentSkins = [...unlockedSkins, ...lockedSkins];
  function createSkinButton(skin, level = 1) {
    const button = document.createElement("button");
    button.className = `${skin.rarity.toLowerCase()}-skin`;

    const selectedPlayerKey = allPlayerData.playerSelection.selectedPlayer;
    const selectedSkinName = skin.name;
    const skinData =
      allPlayerData[selectedPlayerKey].skins.unlockedSkins[selectedSkinName] ??
      allPlayerData[selectedPlayerKey].skins.lockedSkins[selectedSkinName];
    const currentLevel = skinData?.currentLevel || 1;
    const upgradePoints = skinData.upgradePoints;
    const percentage = (upgradePoints / levelData[currentLevel - 1].powerPointsRequired) * 100

    button.innerHTML = `
      <img src="${skin.image}" class="skin-image" alt="${skin.name}">
      <div class="power-container">
        <div class="power-bar">
          <div class="power-fill" style="width: ${percentage}%"></div>
        </div>
        <div class="power-text">${upgradePoints} / ${levelData[currentLevel - 1].powerPointsRequired}</div>
      </div>
    `;

    // button.style.border = "3px solid lime";
    // button.style.background = "#222";
    // button.style.color = "white";

    button.addEventListener("click", () => {
      showCanvas(skinDetailsDiv, "flex");
      showSkinDetails(skin);
      buttonSound.play();

      updateDetails(currentLevel, upgradePoints);
      showStarPowerDetails();

      setCurrencyButtonsVisibility(true);
    });

    return button;
  }

  // Add first paragraph
  const unlockedSkinsP = document.createElement("p");
  unlockedSkinsP.className = "full-width-text top";
  unlockedSkinsP.textContent = "Unlocked Skins:";
  skinShowDiv.appendChild(unlockedSkinsP);

  // Add unlocked skins
  unlockedSkins.forEach(skin => {
    const level = playerData.skins.unlockedSkins[skin.name]?.currentLevel || 1;
    const skinBtn = createSkinButton(skin, level);
    skinShowDiv.appendChild(skinBtn);
  });

  // Separator paragraph
  if (lockedSkins.length > 0) {
    const separator = document.createElement("p");
    separator.className = "full-width-text bottom";
    separator.textContent = "Skins to be unlocked:";
    skinShowDiv.appendChild(separator);
  }

  // Add locked skins
  lockedSkins.forEach(skin => {
    const level = playerData.skins.lockedSkins[skin.name]?.currentLevel || 1;
    const skinBtn = createSkinButton(skin, level);
    skinBtn.classList.add("locked-skin");
    skinShowDiv.appendChild(skinBtn);
  });
}

// === SELECTING AND UPGRADING ===

function handleSkinSelection() {
  allPlayerData[currentPlayerKey].skins.selectedSkin.name = allSkins[currentSkinIndex].name;
  allPlayerData[currentPlayerKey].skins.selectedSkin.src = allSkins[currentSkinIndex].image;

  player1Selector.querySelector("img").src = allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[0]].skins.selectedSkin.src;
  player1Icon.src = allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[0]].skins.selectedSkin.src;
  player2Selector.querySelector("img").src = allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[1]].skins.selectedSkin.src;
  player2Icon.src = allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[1]].skins.selectedSkin.src;

  console.log(allSkins[currentSkinIndex].name)
}

let isArrowBusy = false;

leftArrow.addEventListener("click", () => {
  setTimeout(() => {
    if (isArrowBusy || currentSkinIndex <= 0) return;
    isArrowBusy = true;

    showSkinDetails(currentSkins[currentSkinIndex - 1]);
    buttonSound.play();

    requestAnimationFrame(() => isArrowBusy = false);
  }, 500)
});

rightArrow.addEventListener("click", () => {
  setTimeout(() => {
    if (isArrowBusy || currentSkinIndex >= currentSkins.length - 1) return;
    isArrowBusy = true;

    showSkinDetails(currentSkins[currentSkinIndex + 1]);
    buttonSound.play();

    requestAnimationFrame(() => isArrowBusy = false);
  }, 500)
});

selectButton.addEventListener("click", handleSkinSelection);

player1Selector.addEventListener("click", () => {
  allPlayerData.playerSelection.selectedPlayer =
    allPlayerData.playerSelection.twoSelectedPlayers[0];

  showPlayerSkins("player1", skinShowDiv1);
});

player2Selector.addEventListener("click", () => {
  allPlayerData.playerSelection.selectedPlayer =
    allPlayerData.playerSelection.twoSelectedPlayers[1];

  showPlayerSkins("player2", skinShowDiv2);
});

document.getElementById("powerpoints-fill").style.width = "90%";

export {
  allSkins,
  rarityInfo,
  levelData,
  updateDetails,
  savePlayerData,
  showPlayerSkins
}