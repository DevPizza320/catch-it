// import { allSkins } from "./skins.js";

// const PLAYER_DEFAULTS = {
//   username: "Player",
//   currentSkin: "Basket",  // Default skin
//   catchCoins: 0,
//   gems: 0,
//   unlockedSkins: ["Basket"], // Ensure Basket is unlocked
// };

// function loadPlayerData(playerKey) {
//   let playerData = JSON.parse(localStorage.getItem(playerKey));

//   if (!playerData) {
//     playerData = {
//       username: playerKey === "player1Data" ? "Player 1" : "Player 2",
//       currentSkin: "Basket",
//       unlockedSkins: ["Basket"], // Ensure Basket is always unlocked
//       catchCoins: 0,
//       gems: 0
//     };
//     savePlayerData(playerKey, playerData);
//   } else {
//     // Ensure Basket is always included in unlocked skins
//     if (!playerData.unlockedSkins.includes("Basket")) {
//       playerData.unlockedSkins.push("Basket");
//       savePlayerData(playerKey, playerData);
//     }
//   }

//   return playerData;
// }

// // Save player data to local storage
// function savePlayerData(playerKey, data) {
//   localStorage.setItem(playerKey, JSON.stringify(data));
// }

// // Reset player data (useful for testing or new accounts)
// function resetPlayerData(playerKey) {
//   localStorage.setItem(playerKey, JSON.stringify(PLAYER_DEFAULTS));
// }

// // Initialize both players
// const player1 = loadPlayerData("player1Data");
// const player2 = loadPlayerData("player2Data");

// // Example usage:
// // player1.username = "NewName";
// // savePlayerData("player1Data", player1);
// player1.username = "Qn.Lorelai";
// player2.username = "DevPizza";

// // Save the updated player data to local storage
// savePlayerData("player1Data", player1);
// savePlayerData("player2Data", player2);

// let selectedPlayer = "player1Data"; // Default to Player 1

// document.getElementById("player-1-selector").addEventListener("click", function () {
//   selectedPlayer = "player1Data";
//   updateUnlockedSkinsUI(selectedPlayer); // Update UI when Player 1 is selected
// });

// document.getElementById("player-2-selector").addEventListener("click", function () {
//   selectedPlayer = "player2Data";
//   updateUnlockedSkinsUI(selectedPlayer); // Update UI when Player 2 is selected
// });

// // Ensure "Basket" is unlocked for both players, if not already unlocked
// function ensureBasketUnlocked() {
//   if (!player1.unlockedSkins.includes("Basket")) {
//     player1.unlockedSkins.push("Basket");
//   }
//   if (!player2.unlockedSkins.includes("Basket")) {
//     player2.unlockedSkins.push("Basket");
//   }
// }

// function resetUnlockedSkins(player) {
//   player.unlockedSkins = ["Basket"];
//   savePlayerData("player1Data", player1);  // Save the reset data
//   savePlayerData("player2Data", player2);  // Save the reset data
//   updateUnlockedSkinsUI(selectedPlayer);   // Refresh UI for the selected player
// }

// // Function to unlock skin for a specific player
// function unlockSkin(playerKey, skinName) {
//   const playerData = loadPlayerData(playerKey);

//   // Check if the skin is already unlocked
//   if (!playerData.unlockedSkins.includes(skinName)) {
//     playerData.unlockedSkins.push(skinName);
//     savePlayerData(playerKey, playerData); // Save to local storage
//     updateUnlockedSkinsUI(playerKey); // Update UI for that player
//   }
// }

// export { player1, player2, selectedPlayer };