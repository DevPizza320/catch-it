import { allPlayerData } from "./players.js";
import { allSkins } from "./skins.js"

// === GENERAL FUNCTIONS ===
// =========================

export function log(arg) {
    if (Array.isArray(arg)) {
        arg.forEach(a => console.log(a));
    } else {
        console.log(arg);
    }
}

export function show(elements, display = "flex") {
    if (!elements) return;

    if (!Array.isArray(elements)) {
        elements = [elements];
    }

    elements.forEach((el, index) => {
        if (typeof display === "string") {
            el.style.display = display;
        } else if (Array.isArray(display)) {
            el.style.display = display[index] || "flex";
        }
    });
}

export function hide(elements) {
    if (!elements) return;

    if (!Array.isArray(elements)) {
        elements = [elements];
    }

    elements.forEach(el => {
        el.style.display = "none";
    });
}

export function getUserDeviceType() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return "touch";
    } else {
        return "keyboard";
    }
}

export function saveToLocalStorage(key, value) {
    try {
        const serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);
    } catch (err) {
        console.error("Could not save to localStorage:", err);
    }
}

export function loadFromLocalStorage(key) {
    try {
        const serialized = localStorage.getItem(key);
        if (serialized === null) return null;
        return JSON.parse(serialized);
    } catch (err) {
        console.error("Could not load from localStorage:", err);
        return null;
    }
}

export function resetLocalStorage() {
    localStorage.clear();
    console.log("✅ localStorage has been cleared.");
}

export function clearKeyFromLocalStorage(key) {
    localStorage.removeItem(key);
    console.log(`🧹 Removed '${key}' from localStorage.`);
}

export function logLocalStorageContents() {
    if (localStorage.length === 0) {
        console.log("📦 localStorage is empty.");
        return;
    }

    console.log("📦 localStorage contents:");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            const value = JSON.parse(localStorage.getItem(key));
            console.log(`🔑 ${key}:`, value);
        } catch (e) {
            // fallback if value isn't valid JSON
            console.log(`🔑 ${key}:`, localStorage.getItem(key));
        }
    }
}

export function err(message, type = "err") {
    if (getUserDeviceType() === 'touch') {
        alert(message);
    } else {
        if (type === "err") {
            console.error(message);
        } else if (type === "warn") {
            console.warn(message);
        }
    }
}

// === SPECIFIC FUNCTIONS ===
// ==========================

export function setPlayerUserNames(index) {
    const data = loadFromLocalStorage("allPlayerData");
    if (!data) {
        console.error("No player data found in localStorage.");
        return;
    }

    if (!index) {
        console.error("Invalid argument given while setting username.");
        return;
    } else if (index <= data.playerSelection.totalPlayers) {
        return data[`player${index}`].username;
    } else {
        console.error("Invalid argument given while setting username.");
        return;
    }
}

export function modifySettings(device = "keyboard") {
    const allPlayerData = loadFromLocalStorage("allPlayerData");
    if (!allPlayerData || !allPlayerData.playerSelection) {
        console.error("⛔ allPlayerData is missing or invalid");
        return;
    }

    const leftGroup = document.getElementById("left-group");
    const rightGroup = document.getElementById("right-group");
    const classToAppend = "woodenButton";

    const playerToggleButton = document.getElementById("playerToggleButton");
    playerToggleButton.textContent = allPlayerData["player1"].username;
    let settingsIndex = 1;
    let currentSettingsPlayer = "player1";

    playerToggleButton.addEventListener("click", () => {
        if (settingsIndex < allPlayerData.playerSelection.totalPlayers) {
            settingsIndex++;
        } else {
            settingsIndex = 1;
        }
        currentSettingsPlayer = `player${settingsIndex}`;
        playerToggleButton.textContent = allPlayerData[currentSettingsPlayer].username;

        if (getUserDeviceType() === 'keyboard') {
            setupKeyButtons(currentSettingsPlayer);
        }
    });

    if (device === "keyboard") {
        const keyboardObjects = [
            {
                idToAppend: "",
                dataCategory: true,
                text: "Left: "
            },
            {
                idToAppend: "moveLeftButton",
                dataCategory: null,
                text: allPlayerData[allPlayerData.playerSelection.selectedPlayer].settings.keys.left
            },
            {
                idToAppend: "",
                dataCategory: true,
                text: "Right: "
            },
            {
                idToAppend: "moveRightButton",
                dataCategory: null,
                text: allPlayerData[allPlayerData.playerSelection.selectedPlayer].settings.keys.right
            },
            {
                idToAppend: "",
                dataCategory: true,
                text: "Jump: "
            },
            {
                idToAppend: "jumpButton",
                dataCategory: null,
                text: allPlayerData[allPlayerData.playerSelection.selectedPlayer].settings.keys.jump
            },
            {
                idToAppend: "",
                dataCategory: true,
                text: "Ability: "
            },
            {
                idToAppend: "useStarPowerButton",
                dataCategory: null,
                text: allPlayerData[allPlayerData.playerSelection.selectedPlayer].settings.keys.starPower
            }
        ]

        keyboardObjects.forEach((obj, index) => {
            const currentObj = keyboardObjects[index];
            const button = document.createElement("button");
            button.className = classToAppend;

            if (currentObj.idToAppend != "") {
                button.id = currentObj.idToAppend;
            };

            if (currentObj.dataCategory != null) {
                button.setAttribute("data-category", currentObj.dataCategory);
            };

            button.textContent = currentObj.text;

            if (index % 2 == 0) {
                leftGroup.appendChild(button);
            } else {
                rightGroup.appendChild(button);
            }
        })

        setupKeyButtons(currentSettingsPlayer);

        function setupKeyButtons(currentPlayerId) {
            let keyButtons = Array.from(document.querySelectorAll("#moveLeftButton, #moveRightButton, #jumpButton, #useStarPowerButton"));
            let waitingForKey = false;
            let timeoutId = null;
            let currentKeyBtn = null;
            let currentHandleKey = null;

            keyButtons.forEach((btn, i) => {
                const newBtn = btn.cloneNode(true);
                btn.replaceWith(newBtn);
            });

            keyButtons = Array.from(document.querySelectorAll("#moveLeftButton, #moveRightButton, #jumpButton, #useStarPowerButton"));

            const validKeys = new Set([
                " ", "Space",
                "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
                ...Array.from({ length: 10 }, (_, i) => String(i)),
                ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
            ]);

            const allPlayerData = loadFromLocalStorage("allPlayerData");
            const playerKeys = Object.keys(allPlayerData[currentPlayerId].settings.keys);
            const playerKeyValues = Object.values(allPlayerData[currentPlayerId].settings.keys);

            keyButtons.forEach((btn, i) => {
                btn.textContent = playerKeyValues[i] || "Set Key";
            });

            function cancelKeySelection() {
                if (waitingForKey && currentHandleKey) {
                    document.removeEventListener("keydown", currentHandleKey);
                    clearTimeout(timeoutId);
                    if (currentKeyBtn) {
                        currentKeyBtn.textContent = playerKeyValues[keyButtons.indexOf(currentKeyBtn)] || "Set Key";
                    }
                    waitingForKey = false;
                    currentHandleKey = null;
                    currentKeyBtn = null;
                    timeoutId = null;
                }
            }

            keyButtons.forEach((keyBtn, index) => {
                keyBtn.addEventListener("click", () => {
                    if (waitingForKey) return;

                    keyBtn.textContent = "Enter key...";
                    waitingForKey = true;
                    currentKeyBtn = keyBtn;

                    const handleKey = (e) => {
                        let key = e.key;

                        if (key.length === 1 && key >= 'a' && key <= 'z') {
                            key = key.toUpperCase();
                        }

                        if (key === " ") key = "Space";

                        if (validKeys.has(key)) {
                            playerKeyValues[index] = key;
                            allPlayerData[currentPlayerId].settings.keys[playerKeys[index]] = key;
                            saveToLocalStorage("allPlayerData", allPlayerData);
                            keyBtn.textContent = key;
                            console.log("Stored key:", key);
                        } else {
                            console.error("Invalid key pressed:", e.key);
                            keyBtn.textContent = "Invalid key!";
                            setTimeout(() => {
                                keyBtn.textContent = playerKeyValues[index] || "Set Key";
                            }, 1000);
                        }

                        document.removeEventListener("keydown", handleKey);
                        clearTimeout(timeoutId);
                        waitingForKey = false;
                        currentHandleKey = null;
                        currentKeyBtn = null;
                        timeoutId = null;
                    };

                    currentHandleKey = handleKey;
                    document.addEventListener("keydown", handleKey);

                    timeoutId = setTimeout(() => {
                        keyBtn.textContent = playerKeyValues[index];
                        console.warn("Key selection timed out.");
                        cancelKeySelection();
                    }, 10000);
                });
            });
        }
    } else if (device === "touch") {
        const touchObjects = [
            {
                idToAppend: "",
                dataCategory: true,
                text: "Selected: "
            },
            {
                idToAppend: "moverSelector",
                dataCategory: null,
                text: allPlayerData[allPlayerData.playerSelection.selectedPlayer].settings.touch.mover
            },
            {
                idToAppend: "",
                dataCategory: true,
                text: "Opacity: "
            },
            {
                idToAppend: "opacitySelector",
                dataCategory: null,
                text: allPlayerData[allPlayerData.playerSelection.selectedPlayer].settings.touch.opacity
            },
            {
                idToAppend: "",
                dataCategory: true,
                text: "Direction: "
            },
            {
                idToAppend: "directionSelector",
                dataCategory: null,
                text: allPlayerData[allPlayerData.playerSelection.selectedPlayer].settings.touch.direction
            }
        ]

        touchObjects.forEach((obj, index) => {
            const currentObj = touchObjects[index];
            const button = document.createElement("button");
            button.className = classToAppend;

            if (currentObj.idToAppend != "") {
                button.id = currentObj.idToAppend;
            };

            if (currentObj.dataCategory != null) {
                button.setAttribute("data-category", currentObj.dataCategory);
            };

            button.textContent = currentObj.text;

            if (index % 2 == 0) {
                leftGroup.appendChild(button);
            } else {
                rightGroup.appendChild(button);
            }
        })

        const moverSelector = document.getElementById("moverSelector");
        const opacitySelector = document.getElementById("opacitySelector");
        const directionSelector = document.getElementById("directionSelector");

        let moverIndex = allPlayerData[currentSettingsPlayer].settings.touch.indexes.moverIndex;
        let opacityIndex = allPlayerData[currentSettingsPlayer].settings.touch.indexes.opacityIndex;
        let directionIndex = allPlayerData[currentSettingsPlayer].settings.touch.indexes.directionIndex;

        const moves = ["Arrow Keys", "Slider"];
        const opacities = [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1];
        const directions = ["Normal", "Flipped"];

        moverSelector.addEventListener("click", () => {
            moverIndex = (moverIndex + 1) % moves.length;

            allPlayerData[currentSettingsPlayer].settings.touch.indexes.moverIndex = moverIndex;
            allPlayerData[currentSettingsPlayer].settings.touch.mover = moves[moverIndex];

            saveToLocalStorage("allPlayerData", allPlayerData);
            moverSelector.textContent = moves[moverIndex];
        });

        opacitySelector.addEventListener("click", () => {
            opacityIndex = (opacityIndex + 1) % opacities.length;

            allPlayerData[currentSettingsPlayer].settings.touch.indexes.opacityIndex = opacityIndex;
            allPlayerData[currentSettingsPlayer].settings.touch.opacity = opacities[opacityIndex];

            saveToLocalStorage("allPlayerData", allPlayerData);
            opacitySelector.textContent = opacities[opacityIndex];
        });

        directionSelector.addEventListener("click", () => {
            directionIndex = (directionIndex + 1) % directions.length;

            allPlayerData[currentSettingsPlayer].settings.touch.indexes.directionIndex = directionIndex;
            allPlayerData[currentSettingsPlayer].settings.touch.direction = directions[directionIndex];

            saveToLocalStorage("allPlayerData", allPlayerData);
            directionSelector.textContent = directions[directionIndex];
        });

        playerToggleButton.addEventListener("click", () => {
            moverSelector.textContent = allPlayerData[currentSettingsPlayer].settings.touch.mover;
            opacitySelector.textContent = allPlayerData[currentSettingsPlayer].settings.touch.opacity;
            directionSelector.textContent = allPlayerData[currentSettingsPlayer].settings.touch.direction;
        })
    }
}

export function createMobileControls(player, index, type = "left", flipped = false) {
    let elements = [];

    // Movement Controls
    if (player.settings.touch.mover === 'ArrowKeys') {
        const leftArrow = document.createElement('img');
        leftArrow.id = `moverLeft${index}`;
        leftArrow.dataset.name = 'LeftArrow';
        leftArrow.src = "../../../Media/Icons/LeftArrow.png";

        const rightArrow = document.createElement('img');
        rightArrow.id = `moverRight${index}`;
        rightArrow.dataset.name = 'RightArrow';
        rightArrow.src = "../../../Media/Icons/RightArrow.png";

        elements.push(leftArrow, rightArrow);
    } else if (player.settings.touch.mover === 'Slider') {
        const slider = document.createElement("input");
        slider.id = `moverSlider${index}`;
        slider.type = "range";
        slider.classList.add("movementSlider");
        slider.min = -1;
        slider.max = 1;
        slider.step = 0.01;
        slider.value = 0;

        slider.dataset.name = "Slider";
        elements.push(slider);
    }

    // Optional: Star Power
    if (player.skins.selectedSkin.selectedStarPower != null) {
        const starPowerWrapper = document.createElement('div');
        starPowerWrapper.id = `starPowerWrapper${index}`;
        starPowerWrapper.classList.add('star-wrapper');
        const coolDownText = document.createElement('span');
        coolDownText.classList.add('cooldown-text');
        coolDownText.textContent = '10s';

        const starPowerBtn = document.createElement('img');
        starPowerBtn.dataset.name = 'StarPower';
        const selectedSkinName = player.skins.selectedSkin.name;
        const selectedStarPowerName = player.skins.selectedSkin.selectedStarPower;

        const starPowerImage = allSkins
            .find(skin => skin.name === selectedSkinName)
            ?.starPowerInfo?.[selectedStarPowerName]?.image;

        starPowerBtn.src = `../../../${starPowerImage}`;

        starPowerWrapper.appendChild(starPowerBtn);
        starPowerWrapper.appendChild(coolDownText);

        elements.push(starPowerWrapper);
    }

    // Optional: Jump
    if (player.skins.unlockedSkins["Squirrel"] && player.skins.selectedSkin.selectedStarPower === 'Acrobat') {
        const jumpBtn = document.createElement('img');
        jumpBtn.id = `moverJumper${index}`;
        jumpBtn.dataset.name = 'Jump';
        jumpBtn.src = "../../../Media/Icons/Jump.png";

        elements.push(jumpBtn);
    }

    // --- Reordering Logic ---

    // Extract arrows if they exist
    const arrowIndex = elements.findIndex(el => el.dataset.name === "LeftArrow");
    let finalControls = [];

    if (arrowIndex !== -1) {
        const leftArrow = elements[arrowIndex];
        const rightArrow = elements[arrowIndex + 1];

        const before = elements.slice(0, arrowIndex);
        const after = elements.slice(arrowIndex + 2);

        if (type === "right") {
            // Flip extras around the arrows
            finalControls = [...after.reverse(), leftArrow, rightArrow, ...before.reverse()];
        } else {
            finalControls = [...before, leftArrow, rightArrow, ...after];
        }

        if (flipped) {
            const pre = finalControls.slice(0, finalControls.indexOf(leftArrow));
            const post = finalControls.slice(finalControls.indexOf(rightArrow) + 1);
            finalControls = [...post.reverse(), leftArrow, rightArrow, ...pre.reverse()];
        }
    } else {
        // No arrows, just flip extras if needed
        finalControls = flipped ? [...elements].reverse() : elements;
    }

    return finalControls;
}

export function appendMobileControls(list1, list2, after) {
    const mobileControls = document.createElement('div');
    mobileControls.classList.add("mobile-controls");
    const player1Controls = document.createElement('div');
    player1Controls.classList.add("player", "player-1");
    const player2Controls = document.createElement('div');
    player2Controls.classList.add("player", "player-2");

    list1.forEach(el => player1Controls.appendChild(el));
    list2.forEach(el => player2Controls.appendChild(el));

    mobileControls.appendChild(player1Controls);
    mobileControls.appendChild(player2Controls);

    after.after(mobileControls);
}
// resetLocalStorage()
if (!loadFromLocalStorage("allPlayerData")) {
    saveToLocalStorage("allPlayerData", allPlayerData);
    console.log("bruh");
}

logLocalStorageContents();
// modifySettings(getUserDeviceType());