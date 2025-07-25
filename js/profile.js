import { loadFromLocalStorage, logLocalStorageContents, saveToLocalStorage } from "./data/helper-functions.js";

const allPlayerData = loadFromLocalStorage("allPlayerData");

function updateProfile(playerKey, category) {
    
    const index = playerKey.split("r")[1];
    
    const nameElement = document.getElementById(`player-${index}-name`);
    const scoreElement = document.getElementById(`player-${index}-score`);
    const caughtBallsElement = document.getElementById(`player-${index}-caught-balls`);
    const livesGainedElement = document.getElementById(`player-${index}-lives-gained`);
    const livesLostElement = document.getElementById(`player-${index}-lives-lost`);
    const lgllElement = document.getElementById(`player-${index}-lgll`);
}

document.getElementById("player-1-name").value = allPlayerData["player1"].username;
document.getElementById("player-2-name").value = allPlayerData["player2"].username;
document.getElementById("player-1-name").addEventListener('input', function() {
    allPlayerData["player1"].username = this.value;
    saveToLocalStorage("allPlayerData", allPlayerData);
});

document.getElementById("player-2-name").addEventListener('input', function() {
    allPlayerData["player2"].username = this.value;
    saveToLocalStorage("allPlayerData", allPlayerData);
});