// import { allSkins, levelData } from "./skins.js";
// import { player1, player2 } from "./player-data.js";

// // Each player's owned skins (stored in local storage)
// let player1Skins = JSON.parse(localStorage.getItem("player1Skins")) || {};
// let player2Skins = JSON.parse(localStorage.getItem("player2Skins")) || {};

// // Example: Player's total currency (modify this to use actual game currency)
// let player1Currency = player1.catchCoins;
// let player2Currency = player2.catchCoins;

// // Unlock a skin for a player
// function unlockSkin(playerSkins, skinName) {
//     if (!playerSkins[skinName]) {
//         const skinData = allSkins.find(skin => skin.name === skinName);
//         if (skinData) {
//             playerSkins[skinName] = {
//                 level: 1,
//                 powerPoints: 0,
//                 powerUp: null,
//                 starPower: null,
//                 image: skinData.image
//             };
//             console.log(`${skinName} unlocked!`);
//         }
//     }
// }

// // Upgrade function using common level data
// function upgradeSkin(playerSkins, playerCurrency, skinName) {
//     if (!playerSkins[skinName]) {
//         console.log(`${skinName} is not unlocked!`);
//         return;
//     }

//     let currentLevel = playerSkins[skinName].level;

//     if (currentLevel >= 10) {
//         console.log(`${skinName} is already at max level!`);
//         return;
//     }

//     let nextLevelData = levelData[currentLevel]; // Get shared level data
//     let requiredPowerPoints = nextLevelData.powerPointsRequired;
//     let requiredCurrency = nextLevelData.upgradeCost;

//     if (playerSkins[skinName].powerPoints >= requiredPowerPoints && playerCurrency >= requiredCurrency) {
//         playerSkins[skinName].level++;
//         playerCurrency -= requiredCurrency; // Deduct currency
//         console.log(`${skinName} upgraded to Level ${playerSkins[skinName].level}!`);
//     } else {
//         console.log(`Not enough power points or currency to upgrade ${skinName}!`);
//     }
// }

// // Save player data
// function savePlayerData() {
//     localStorage.setItem("player1Skins", JSON.stringify(player1Skins));
//     localStorage.setItem("player2Skins", JSON.stringify(player2Skins));
// }

// // Export functions
// export { player1Skins, player2Skins, unlockSkin, upgradeSkin, savePlayerData };
