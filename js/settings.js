import { getUserDeviceType, loadFromLocalStorage, modifySettings, saveToLocalStorage } from "./data/helper-functions.js";

const allPlayerData = loadFromLocalStorage("allPlayerData");

document.addEventListener("DOMContentLoaded", () => {
  // Difficulty levels
  const difficulties = [{name: "Potato", multiplier: 1}, {name: "Easy", multiplier: 1.5},
    {name: "Normal", multiplier: 2}, {name: "Hard", multiplier: 2.5}, {name: "Warrior", multiplier: 3}
  ];
  let currentDifficultyIndex = allPlayerData.generalStats.indexes.difficultyIndex;

  difficultyButton.textContent = difficulties[currentDifficultyIndex].name;
  difficultyButton.addEventListener("click", () => {
    if (settingsCanvas.style.display === "block") {
      // Cycle through difficulty levels
      currentDifficultyIndex = (currentDifficultyIndex + 1) % difficulties.length;
      allPlayerData.generalStats.indexes.difficultyIndex = currentDifficultyIndex;

      allPlayerData.generalStats.levelDifficulty.name = difficulties[currentDifficultyIndex].name;
      allPlayerData.generalStats.levelDifficulty.multiplier = difficulties[currentDifficultyIndex].multiplier;
      saveToLocalStorage("allPlayerData", allPlayerData);
      difficultyButton.textContent = difficulties[currentDifficultyIndex].name;
    }
  });

  // Level times
  const times = ["3m", "4m", "5m", "7m", "10m"];
  let currentTimeIndex = allPlayerData.generalStats.indexes.timeIndex;
  timeButton.textContent = times[currentTimeIndex];

  timeButton.addEventListener("click", () => {
    if (settingsCanvas.style.display === "block") {
      // Cycle through level times
      currentTimeIndex = (currentTimeIndex + 1) % times.length;
      allPlayerData.generalStats.indexes.timeIndex = currentTimeIndex;

      // Update button text
      allPlayerData.generalStats.levelTime = times[currentTimeIndex];
      saveToLocalStorage("allPlayerData", allPlayerData);
      timeButton.textContent = times[currentTimeIndex];
    }
  });

  // Music
  window.musicTracks = [
    { name: "Chill 1", file: "Media/MusicOptions/Chill 1.mp3" },
    { name: "Chill 2", file: "Media/MusicOptions/Chill 2.mp3" },
    { name: "Chill 3", file: "Media/MusicOptions/Chill 3.mp3" },
    { name: "Mystical 1", file: "Media/MusicOptions/Mystical 1.mp3" },
    { name: "Mystical 2", file: "Media/MusicOptions/Mystical 2.mp3" },
    { name: "Mystical 3", file: "Media/MusicOptions/Mystical 3.mp3" }
  ];

  let currentTrackIndex = allPlayerData.generalStats.indexes.currentTrackIndex;

  // Function to select the next music track
  function selectNextTrack() {
    console.log("Selecting next track...");
    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    const selectedTrack = musicTracks[currentTrackIndex];
    allPlayerData.generalStats.indexes.currentTrackIndex = currentTrackIndex;
    saveToLocalStorage("allPlayerData", allPlayerData);

    console.log(`Selected track: ${selectedTrack.name}, file: ${selectedTrack.file}`);

    // Update the button text to reflect the selected track
    bgMusicButton.textContent = selectedTrack.name;

    // Dispatch a custom event to notify CatchIt.js about the track change
    const trackChangeEvent = new CustomEvent("trackSelected", {
      detail: { selectedTrack },
    });

    console.log("Dispatching trackSelected event...");
    document.dispatchEvent(trackChangeEvent);
  }


  // Attach event listener to the music button
  bgMusicButton.addEventListener("click", () => {
    console.log("Music button clicked...");
    selectNextTrack();
  });

  const spawnLeavesButton = document.getElementById("spawnLeavesButton");
  const spawnIntervalButton = document.getElementById("spawnIntervalButton");

  spawnLeavesButton.textContent = allPlayerData.generalStats.spawnLeaves;

  spawnLeavesButton.addEventListener("click", () => {
    allPlayerData.generalStats.spawnLeaves = !allPlayerData.generalStats.spawnLeaves
    spawnLeavesButton.textContent = allPlayerData.generalStats.spawnLeaves;

    spawnIntervalButton.classList.toggle("grayscale", !allPlayerData.generalStats.spawnLeaves);
    console.log(spawnIntervalButton.style.filter);
  });

  
  const leafRates = [1000, 2000, 3000, 4000, 5000];
  let currentLeafRateIndex = allPlayerData.generalStats.indexes.leafRateIndex;

  spawnIntervalButton.textContent = leafRates[currentLeafRateIndex];
  spawnIntervalButton.addEventListener("click", () => {
    if (settingsCanvas.style.display === "block") {
      currentLeafRateIndex = (currentLeafRateIndex + 1) % leafRates.length;
      allPlayerData.generalStats.indexes.leafRateIndex = currentLeafRateIndex;
      
      spawnIntervalButton.textContent = leafRates[currentLeafRateIndex];
      allPlayerData.generalStats.spawnInterval = leafRates[currentLeafRateIndex];
      saveToLocalStorage("allPlayerData", allPlayerData);
    }
  });

  const volumes = [0, .1, .2, .3, .4, .5 , .6, .7, .8, .9, 1];
  let musicVolumeIndex = allPlayerData.generalStats.indexes.musicVolumeIndex;
  let sfxVolumeIndex = allPlayerData.generalStats.indexes.sfxVolumeIndex;

  const musicVolumeButton = document.getElementById("musicVolumeButton");
  const sfxVolumeButton = document.getElementById("sfxVolumeButton");

  musicVolumeButton.textContent = volumes[musicVolumeIndex];
  sfxVolumeButton.textContent = volumes[sfxVolumeIndex];

  musicVolumeButton.addEventListener("click", () => {
    musicVolumeIndex = (musicVolumeIndex + 1) % volumes.length;

    allPlayerData.generalStats.indexes.musicVolumeIndex = musicVolumeIndex;
    allPlayerData.generalStats.musicVolume = volumes[musicVolumeIndex];
    saveToLocalStorage("allPlayerData", allPlayerData);

    musicVolumeButton.textContent = volumes[musicVolumeIndex];
  });
  
  sfxVolumeButton.addEventListener("click", () => {
    sfxVolumeIndex = (sfxVolumeIndex + 1) % volumes.length;

    allPlayerData.generalStats.sfxVolume = volumes[sfxVolumeIndex];
    saveToLocalStorage("allPlayerData", allPlayerData);

    sfxVolumeButton.textContent = volumes[sfxVolumeIndex];
  });

  modifySettings(getUserDeviceType());
});