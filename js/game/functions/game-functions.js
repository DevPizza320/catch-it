import { loadFromLocalStorage, getUserDeviceType } from "../../data/helper-functions.js";

export function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export function initializeGameObjects(canvas, particles, extraProps = {}) {
    console.log("Initializing game objects...");

    const basePlayerTemplate = (index) => {
        const localData = loadFromLocalStorage("allPlayerData");
        const playerId = localData.playerSelection.twoSelectedPlayers[index];
        const playerData = localData[playerId];

        // Get selectedSkin info
        const selectedSkinObj = playerData.skins.selectedSkin;
        const fallbackSkin = "Basket";

        const selectedSkinName = selectedSkinObj?.name ?? fallbackSkin;
        const selectedSkinSrc = "../../../" + selectedSkinObj?.src ?? "../../../Media/Skins/Basket.png";
        const selectedSkinImage = new Image();
        selectedSkinImage.src = selectedSkinSrc;

        const skinData = playerData.skins.unlockedSkins[selectedSkinName];

        if (!skinData) {
            console.error(`Skin data for "${selectedSkinName}" not found in unlockedSkins for ${playerId}`);
            return null;
        }

        const isMobileUser = getUserDeviceType() === 'touch';
        const mobileY = canvas.height - (canvas.height * 0.066 + canvas.height * 0.15);
        const hasStarPower = selectedSkinObj?.selectedStarPower !== null;
        const canJump = selectedSkinObj?.selectedStarPower === "Acrobat";

        const s = {
            x: (index === 0 ? canvas.width / 4 : 3 * canvas.width / 4) - canvas.width * 0.05,
            y: canvas.height - canvas.height * 0.1,
            width: canvas.height * 0.1,
            height: canvas.height * 0.1,
            img: selectedSkinImage,
            score: 0,
            lives: skinData.health,
            livesGained: 0,
            livesLost: 0,
            speed: skinData.speed,
            movementSpeed: skinData.speed,
            canMove: true,
            canJump: canJump,
            caughtBalls: 0,
            shriekersActivated: 0,
            starPower: hasStarPower ? {
                active: false,
                cooldown: 10000,
                duration: skinData,
                action: null,
                originalWidth: null,
                originalHeight: null,
                originalSpeed: null
            } : null,
            ...extraProps
        };

        if (isMobileUser) {
            s.y = mobileY;
        }

        return s;
    };

    let players = [
        basePlayerTemplate(0),
        basePlayerTemplate(1)
    ].filter(Boolean); // removes nulls if any


    particles.length = 0;
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: Math.random() * 0.5 + 0.2
        });
    }
    return players;
}

export function getGameVariables(isBossFight = false) {
    const localData = loadFromLocalStorage("allPlayerData");
    if (isBossFight) {
        return {
            current: "menu",
            countdown: 5,
            timer: 600
        }
    } else return {
        current: "menu",
        countdown: 5,
        timer: localData.generalStats.levelTime.split('')[0] * 60
    }
}

export function addKeyListeners(players, state, audio, statBar, fn) {
    const localData = loadFromLocalStorage("allPlayerData");
    const firstPlayer = localData[localData.playerSelection.twoSelectedPlayers[0]];
    const secondPlayer = localData[localData.playerSelection.twoSelectedPlayers[1]];

    const fPKeyLeft = firstPlayer.settings.keys.left === ("ArrowLeft" || "ArrowRight") ? firstPlayer.settings.keys.left : firstPlayer.settings.keys.left.toLowerCase();
    const fPKeyRight = firstPlayer.settings.keys.right === ("ArrowLeft" || "ArrowRight") ? firstPlayer.settings.keys.right : firstPlayer.settings.keys.right.toLowerCase();
    const sPKeyLeft = secondPlayer.settings.keys.left === ("ArrowLeft" || "ArrowRight") ? secondPlayer.settings.keys.left : secondPlayer.settings.keys.left.toLowerCase();
    const sPKeyRight = secondPlayer.settings.keys.right === ("ArrowRight" || "ArrowLeft") ? secondPlayer.settings.keys.right : secondPlayer.settings.keys.right.toLowerCase();

    document.addEventListener("keydown", (e) => {
        if (e.key === fPKeyLeft) players[0].direction = "left";
        if (e.key === fPKeyRight) players[0].direction = "right";
        if (e.key === sPKeyLeft) players[1].direction = "left";
        if (e.key === sPKeyRight) players[1].direction = "right";
        if (e.key === "Enter" && state.current === "menu") startCountdown(audio, state, statBar, null, fn);
        if (e.key === firstPlayer.settings.keys.starPower) { console.log("Player 1 activated!") } // FIRST PLAYER SP ACTIVATE
        if (e.key === secondPlayer.settings.keys.starPower) { console.log("Player 2 activated!") } // SAME FOR SECOND
    });
    document.addEventListener("keyup", (e) => {
        if ([fPKeyLeft, fPKeyRight].includes(e.key)) players[0].direction = null;
        if ([sPKeyLeft, sPKeyRight].includes(e.key)) players[1].direction = null;
    });
}

export function addMobileListeners(players, aLeftP1 = null, aRightP1 = null, aLeftP2 = null, aRightP2 = null,
    sP1 = null, sP2 = null, spP1 = null, spP2 = null, jP1 = null, jP2 = null, state, audio, statBar, controls, fn) {
    const localData = loadFromLocalStorage("allPlayerData");
    const firstPlayer = localData[localData.playerSelection.twoSelectedPlayers[0]];
    const secondPlayer = localData[localData.playerSelection.twoSelectedPlayers[1]];
    document.addEventListener("click", () => {
        if (state.current === "menu") {
            startCountdown(audio, state, statBar, controls, fn);
        }
    })

    if (aLeftP1 != null && aRightP1 != null) {
        aLeftP1.addEventListener('pointerdown', () => players[0].direction = "left");
        aLeftP1.addEventListener('pointerup', () => players[0].direction = null);
        aRightP1.addEventListener('pointerdown', () => players[0].direction = "right");
        aRightP1.addEventListener('pointerup', () => players[0].direction = null);
    }

    if (aLeftP2 != null && aRightP2 != null) {
        aLeftP2.addEventListener('pointerdown', () => players[1].direction = "left");
        aLeftP2.addEventListener('pointerup', () => players[1].direction = null);
        aRightP2.addEventListener('pointerdown', () => players[1].direction = "right");
        aRightP2.addEventListener('pointerup', () => players[1].direction = null);
    }

    if (sP1 != null) {
        sP1.addEventListener('input', function() {
            if (this.value < 0) {
                players[0].direction = "left";
            } else {
                players[0].direction = "right";
            }
        });
    }

    if (sP2 != null) {
        sP2.addEventListener('input', () => {
            players[1].movementSpeed = Math.abs(players[1].speed * parseInt(sP2.input));
            if (sP2.input < 0) {
                players[1].direction = "left";
            } else if (sP2.input === 0) {
                players[1].direction = null;
            } else {
                players[1].direction = "right";
            }
        });
    }

    if (spP1 != null) {
        spP1.addEventListener('click', () => { if (players[0].starPower.cooldown === null) { players[0].starPower.action() } });
    }

    if (spP2 != null) {
        spP2.addEventListener('click', () => { if (players[1].starPower.cooldown === null) { players[1].starPower.action() } });
    }

    if (jP1 != null) {
        jP1.addEventListener('click', () => alert("Player 1 Jumped!"));
    }

    if (jP2 != null) {
        jP2.addEventListener('click', () => alert("Player 2 Jumped!"));
    }
}

export function drawMenu(ctx, canvas, borderClr = "white", fillClr = "white", isMobile = false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = fillClr;
    ctx.font = `${canvas.width / 15}px Arial Black`;
    const startText = isMobile ? "Tap SCREEN to Start" : "Press ENTER to Start";
    const textWidth = ctx.measureText(startText).width;

    ctx.fillText(startText, canvas.width / 2 - textWidth / 2, canvas.height / 2);

    ctx.lineWidth = 4;
    ctx.strokeStyle = borderClr;
    ctx.strokeText(startText, canvas.width / 2 - textWidth / 2, canvas.height / 2);

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

export function drawCountdown(ctx, canvas, borderClr = "white", fillClr = "white", current) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Text Shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = fillClr;
    ctx.font = `${canvas.width / 15}px 'Arial Black'`;
    const countdownText = `Starting in ${current.countdown}...`;
    const textWidth = ctx.measureText(countdownText).width;

    ctx.fillText(countdownText, canvas.width / 2 - textWidth / 2, canvas.height / 2);

    ctx.lineWidth = 4;
    ctx.strokeStyle = borderClr;
    ctx.strokeText(countdownText, canvas.width / 2 - textWidth / 2, canvas.height / 2);

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

export function updateUI(players, state) {
    const p1Lives = document.getElementById("p1Lives");
    const p2Lives = document.getElementById("p2Lives");
    const p1Score = document.getElementById("p1Score");
    const p2Score = document.getElementById("p2Score");
    const gameTime = document.getElementById("gameTime");

    p1Lives.querySelector("span").textContent = `${players[0].lives} ❤️`;
    p1Score.textContent = `${players[0].score} 🪙`;
    p2Lives.querySelector("span").textContent = `${players[1].lives} ❤️`;
    p2Score.textContent = `${players[1].score} 🪙`;

    // Use classList.toggle to add/remove the 'low-lives' class
    p1Lives.classList.toggle('low-lives', players[0].lives <= 3);
    p2Lives.classList.toggle('low-lives', players[1].lives <= 3);

    // Update time
    const minutes = Math.floor(state.timer / 60);
    const seconds = state.timer % 60;
    gameTime.querySelector("span").textContent = `${minutes}:${String(seconds).padStart(2, '0')} 🕒`;
}

export function handleVideoPlayback(videoElement, nextState, audio) {
    videoElement.style.display = "block";
    videoElement.play();

    videoElement.onended = function () {
        videoElement.style.display = "none";
        gameState.current = nextState;
        gamePaused = false;

        if (audio) {
            audio.play();
        }
    };
}

export function generateGameOverScreen(players, loserIndex, url) {
    const allPlayerData = loadFromLocalStorage("allPlayerData");
    const winnerIndex = loserIndex === 0 ? 1 : 0;
    const winnerSrc = "../../../" + allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[winnerIndex]].skins.selectedSkin.src;
    const loserSrc = "../../../" + allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[loserIndex]].skins.selectedSkin.src;

    const firstPlayer = allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[0]];
    const secondPlayer = allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[1]];
    const container = document.createElement('div');

    container.innerHTML = `
        <div class="container">
        <div class="game-over-text">Game Over!</div>
        <div class="game-over-background">
            <div class="loser"></div>
        </div>
        <div class="game-over-overlay">
            <div class="player-container" id="winner-player">
                <img src="../../../${winnerSrc}">
                <div class="stats winner-stats">
                    <span id="winner-username">${allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[winnerIndex]].username || "Player 1"} - Winner!</span>
                    <div class="player-stats-grid">
                        <div class="score-box">
                            <span class="score-info">Score:</span>
                            <span class="score-stats">${players[winnerIndex].score}</span>
                        </div>
                        <div class="lives-box">
                            <span class="score-info">Lives:</span>
                            <span class="score-stats">${players[winnerIndex].lives}</span>
                        </div>
                        <div class="lives-gained-box">
                            <span class="score-info">LG:</span>
                            <span class="score-stats">${players[winnerIndex].livesGained}</span>
                        </div>
                        <div class="lives-lost-box">
                            <span class="score-info">LL:</span>
                            <span class="score-stats">${players[winnerIndex].livesLost}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="white-line">
                <div class="smaller-line" id="smaller-line-1"></div>
                <div class="smaller-line" id="smaller-line-2"></div>
            </div>
            <div class="player-container" id="loser-player">
                <img src="../../../${loserSrc}">
                <div class="stats loser-stats">
                    <span id="loser-username">${allPlayerData[allPlayerData.playerSelection.twoSelectedPlayers[loserIndex]].username || "Player 2"} - Loser!</span>
                    <div class="player-stats-grid">
                        <div class="score-box">
                            <span class="score-info">Score:</span>
                            <span class="score-stats">${players[loserIndex].score}</span>
                        </div>
                        <div class="lives-box">
                            <span class="score-info">Lives:</span>
                            <span class="score-stats">${players[loserIndex].lives}</span>
                        </div>
                        <div class="lives-gained-box">
                            <span class="score-info">LG:</span>
                            <span class="score-stats">${players[loserIndex].livesGained}</span>
                        </div>
                        <div class="lives-lost-box">
                            <span class="score-info">LL:</span>
                            <span class="score-stats">${players[loserIndex].livesLost}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button id="exit-button">Proceed</button>
    </div>
    `
    container.style.display = "flex";
    container.style.position = "absolute"
    container.style.zIndex = "10000";
    document.body.appendChild(container);

    document.getElementById("exit-button").addEventListener("click", () => {
        setTimeout(() => {
            window.location.replace("../../../" + url);
        }, 500)
    })
}

export function handleGameOver(players, state) {
    // Determine winner/loser based on lives and scores
    let loserIndex = -1;
    // Check if any player lost all lives
    players.forEach((player, index) => {
        if (player.lives <= 0) {
            loserIndex = index;
            state.current = "gameover";
            generateGameOverScreen(players, loserIndex, 'index.html');
            return;
        }
    });

    // If no one lost all lives, determine based on scores
    if (loserIndex === -1 && state.time <= 0) {
        const lowestScore = Math.min(...players.map(player => player.score));
        loserIndex = players.findIndex(player => player.score === lowestScore);
        state.current = "gameover";
        generateGameOverScreen(players, player1Img, player2Img, loserIndex);
        return;
    }
}

export function renderPopups(canvas, ctx, popups) {
    const currentTime = Date.now();

    popups.forEach((popup, index) => {
        const elapsedTime = currentTime - popup.startTime;
        if (elapsedTime > popup.duration) {
            // Remove the popup if its time has expired
            popups.splice(index, 1);
            return;
        }

        // Calculate fade-out effect
        popup.opacity = Math.max(0, 1 - elapsedTime / popup.duration);

        // Draw the popup text
        ctx.globalAlpha = popup.opacity;
        ctx.font = `${canvas.width / 50}px Arial Black`;
        ctx.fillStyle = popup.color || "white";
        ctx.lineWidth = popup.strokeSize || 1;
        ctx.strokeStyle = popup.stroke || "black";
        ctx.strokeText(popup.text, popup.x, popup.y - elapsedTime / 20); // Move upwards over time
        ctx.fillText(popup.text, popup.x, popup.y - elapsedTime / 20);
        ctx.globalAlpha = 1; // Reset globalAlpha for other drawings
    });
}

export function createPopup(popups, text, x, y, color = "white", stroke = "black") {
    popups.push({
        text,
        x,
        y,
        opacity: 1,
        duration: 1500,
        startTime: Date.now(),
        color: color,
        strokeSize: 8,
        stroke: stroke
    });
}

export function spawnObject(object, x, y, width, height, speed, color = null, img = null, condition = null) {
    if (condition === true) return;

    if (img === null) {
        object.push({
            x: x,
            y: y,
            width: width,
            height: height,
            speed: speed,
            color: color
        })
    } else {
        object.push({
            x: x,
            y: y,
            width: width,
            height: height,
            speed: speed,
            img: img
        })
    }
}

export function moveParticles(canvas, particles, multiplier) {
    particles.forEach(particle => {
        particle.y += particle.speed;
        if (particle.y > canvas.height * multiplier) particle.y = 0;
    });
}

export function moveObjects(canvas, obj, multiplier, condition = null) {
    if (condition === true) return;
    
    obj.forEach((ob, index) => {
        ob.y += ob.speed;
        if (ob.y > canvas.height * multiplier) obj.splice(index, 1);
    });
}

export function clearObjects(obj) {
    obj.forEach(ob => {
        ob.length = 0;
    })
}

export function moveEntity(canvas, entities, condition = null) {
    if (condition === true) return;
    
    entities.forEach(entity => {
        if (entity.direction === "left" && entity.x > 0) entity.x -= entity.movementSpeed;
        if (entity.direction === "right" && entity.x < canvas.width - entity.width) entity.x += entity.movementSpeed;
    });
}

export function jump(players, jumper) {
    // nn
}

export function playAudio(audio) {
    audio.play().catch(error => {
        console.error("Couldn't play audio element: ", error);
    })
}

export function runMultipleCallbacks(callbacks) {
    callbacks.forEach(cb => {
        if (typeof cb === 'function') {
            cb.fn(...cb.args);
        }
    })
}

export function checkCollisions(object, entities, top = null, callbackFn = null) {
    const objToRemove = [];

    object.forEach(obj => {
        const objRight = obj.x + obj.width;
        const objBottom = obj.y + obj.height; // ✅ fixed
        const objLeft = obj.x;
        const objTop = obj.y;

        entities.forEach((entity, index) => {
            const entityRight = entity.x + entity.width;
            const entityBottom = entity.y + entity.height;
            const entityLeft = entity.x;
            const entityTop = top === null ? entity.y : top;

            const isColliding =
                objRight > entityLeft &&
                objLeft < entityRight &&
                objBottom > entityTop &&
                objTop < entityBottom;

            if (isColliding) {
                objToRemove.push(obj);

                if (typeof callbackFn === 'function') {
                    const callbacks = callbackFn(index, obj); // ✅ pass obj to callback
                    callbacks.forEach(cb => {
                        if (typeof cb.fn === 'function') {
                            cb.fn(...(cb.args || []));
                        }
                    });
                }
            }
        });
    });

    // Remove collided objects
    objToRemove.reverse().forEach(objToDelete => {
        const index = object.indexOf(objToDelete);
        if (index !== -1) object.splice(index, 1);
    });
}

export function modifyData(type = 'score', data, recipient) {
    if (type === 'score') {
        recipient += data;
    } else if (type === 'lives') {
        recipient += data;
    }
}

export function doBallRewards(players, multiplier) {
    players.forEach((player) => {
        if (player.caughtBalls > 50 * multiplier) {
            player.lives++;
            player.caughtBalls = 0;
        }
    })
}

export function drawParticles(ctx, fill, particles) {
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
    });
}

export function drawObjects(obj, ctx, type = "object") {
    if (type === "object") {
        obj.forEach(o => {
            ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
        })
    } else if (type === "ball") {
        obj.forEach(o => {
            ctx.beginPath();
            ctx.arc(o.x, o.y, o.width, 0, Math.PI * 2);
            ctx.fillStyle = o.color;
            ctx.fill();
        })
    }
}

export function drawEntities(ctx, entities) {
    entities.forEach(ent => {
        ctx.drawImage(ent.img, ent.x, ent.y, ent.width, ent.height);
    })
}

export function checkForGameOver(entities) {
    entities.forEach(entity => {
        if (entity.lives <= 0) {
            gameState.current = "gameover";
        }
    })
}

export function startCountdown(audio, state, statBar, controls = null, fn) {
    playAudio(audio);
    state.current = "countdown";
    let countdownInterval = setInterval(() => {
        if (state.countdown > 0) {
            state.countdown--;
        } else {
            clearInterval(countdownInterval);
            state.current = "playing";
            statBar.style.display = "flex";
            if (controls !== null) {
                controls.style.display = "flex";
            }
            if (typeof fn === 'function') {
                fn();
            }
        }
    }, 1000);
}

export function startTimer(state, playingState, customFn) {
    let timerInterval = setInterval(() => {
        if (state.current === playingState) {
            if (state.timer > 0) {
                state.timer--;
            } else {
                if (typeof customFn === 'function') {
                    customFn();
                }
            }
        } else if (state.timer > 0) {
            state.timer--;
        } else {
            clearInterval(timerInterval);
            state.current = "gameover";
        }
    }, 1000)
}

// === SPECIFIC FUNCTIONS ===