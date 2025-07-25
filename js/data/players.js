const allPlayerData = {
    player1: {
        username: "Lorelai", 
        catchCoins: 0,
        gems: 0,
        profile: {
            score: 0,
            caughtBalls: 0,
            livesGained: 0,
            livesLost: 0,
            lgLL: 0
        },
        settings: {
            keys: {
                left: "A",
                right: "D",
                jump: "Space",
                starPower: "Q"
            },
            touch: {
                mover: "ArrowKeys",
                opacity: 1,
                direction: "Normal",
                indexes: {
                    moverIndex: 0,
                    opacityIndex: 5,
                    directionIndex: 0
                }
            }
        },
        skins: {
            selectedSkin: {
                name: "Basket",
                src: "Media/Skins/Basket.png",
                selectedStarPower: "Go Big Or Go Home"
            },
            unlockedSkins: {
                "Basket": {
                    upgradePoints: 10,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Shopping Cart": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                }
            },
            lockedSkins: {
                "Red Stocking": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Green Stocking": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Beaver": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Squirrel": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Witch Hat": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Ghost": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Creeper": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Enderman": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Goblin": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                }
            }
        },
    },
    player2: {
        username: "DevPizza",
        catchCoins: 0,
        gems: 0,
        profile: {
            ballsCaught: 7500,
        },
        settings: {
            keys: {
                left: "ArrowLeft",
                right: "ArrowRight",
                jump: "ArrowUp",
                starPower: "ArrowDown"
            },
            touch: {
                mover: "ArrowKeys",
                opacity: 1,
                direction: "Normal",
                indexes: {
                    moverIndex: 0,
                    opacityIndex: 5,
                    directionIndex: 0
                }
            }
        },
        skins: {
            selectedSkin: {
                name: "Basket",
                src: "Media/Skins/Basket.png",
                selectedStarPower: "Basket Battalion"
            },
            unlockedSkins: {
                "Basket": {
                    upgradePoints: 10,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                }
            },
            lockedSkins: {
                "Shopping Cart": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Red Stocking": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Green Stocking": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Beaver": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Squirrel": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Witch Hat": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Ghost": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Creeper": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Enderman": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                },
                "Goblin": {
                    upgradePoints: 0,
                    currentLevel: 1,
                    health: 6,
                    speed: 8,
                    starPower: null
                }
            }
        }
    },
    playerSelection: {
        selectedPlayer: "player1",
        twoSelectedPlayers: ["player1", "player2"],
        totalPlayers: 2
    },
    generalStats: {
        movement: "keyboard",
        levelDifficulty: {
            name: "Potato",
            multiplier: 1
        },
        levelTime: "3m",
        spawnLeaves: true,
        spawnInterval: 3000,
        musicVolume: 0.5,
        sfxVolume: 0.5,
        indexes: {
            difficultyIndex: 0,
            timeIndex: 0,
            currentTrackIndex: 3,
            musicVolumeIndex: 5,
            sfxVolumeIndex: 5,
            leafRateIndex: 2
        }
    }
};

export {allPlayerData};