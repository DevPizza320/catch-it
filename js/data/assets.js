const gameAssets = {
    images: {
        generic: {
            background: {
                catchIt: "Media/Background/CatchIt.png",
                catchItBig: "Media/Background/CatchItBig.png",
                leaf: "Media/Background/leaf.png",
                leaves: "Media/Background/leaves.png",
                loading: "Media/Background/loading.png",
                text: "Media/Background/text.png"
            },
            icons: {
                achievment: "Media/Icons/Achievement.png",
                coin: "Media/Icons/Coin.png",
                gem: "Media/Icons/Gem.png",
                health: "Media/Icons/Health.png",
                leftArrow: "Media/Icons/LeftArrow.png",
                lootCrate: "Media/Icons/LootCrate.png",
                news: "Media/Icons/News.png",
                powerUp: "Media/Icons/PowerUp.png",
                profile: "Media/Icons/Profile.png",
                rightArrow: "Media/Icons/RightArrow.png",
                settings: "Media/Icons/Settings.png",
                shop: "Media/Icons/Shop.png",
                skins: "Media/Icons/Skins.png",
                speed: "Media/Icons/Speed.png"
            },
            skins: {
                basket: "Media/Skins/Basket.png",
                beaver: "Media/Skins/Beaver.png",
                creeper: "Media/Skins/Creeper.png",
                enderman: "Media/Skins/Enderman.png",
                ghost: "Media/Skins/Ghost.png",
                goblin: "Media/Skins/Goblin.png",
                greenStocking: "Media/Skins/GreenStocking.png",
                redStocking: "Media/Skins/RedStocking.png",
                shoppingCart: "Media/Skins/ShoppingCart.png",
                squirrel: "Media/Skins/Squirrel.png",
                witchHat: "Media/Skins/WitchHat.png"
            },
            starPowers: {
                acornAssault: "Media/Star Powers/AcornAssault.png",
                acrobat: "Media/Star Powers/Acrobat.png",
                basketBattalion: "Media/Star Powers/BasketBattalion.png",
                catastrophicCurse: "Media/Star Powers/CatastrophicCurse.png",
                coalStorm: "Media/Star Powers/CoalStorm.png",
                demolitionDay: "Media/Star Powers/DemolitionDay.png",
                denDefence: "Media/Star Powers/DenDefence.png",
                fragOut: "Media/Star Powers/FragOut.png",
                glitchedReality: "Media/Star Powers/GlitchedReality.png",
                goBigOrGoHome: "Media/Star Powers/GoBigOrGoHome.png",
                hallucination: "Media/Star Powers/Hallucination.png",
                hauntedDreams: "Media/Star Powers/HauntedDreams.png",
                hoHoHo: "Media/Star Powers/HoHoHo.png",
                joySnatcher: "Media/Star Powers/JoySnatcher.png",
                magicalMagnet: "Media/Star Powers/MagicalMagnet.png",
                niceOrNaughty: "Media/Star Powers/NiceOrNaughty.png",
                pickPocket: "Media/Star Powers/PickPocket.png",
                relocation: "Media/Star Powers/Relocation.png",
                safeZone: "Media/Star Powers/SafeZone.png",
                shoppingSpree: "Media/Star Powers/ShoppingSpree.png",
                taxEvasion: "Media/Star Powers/TaxEvasion.png",
                wackyWheels: "Media/Star Powers/WackyWheels.png"
            }
        },
        levels: {
            SpaceRace: {
                b: "Media/Background/GameLevels/SpaceRace.png",
                objects: {
                    rock: "Media/Objects/Rock.png",
                    star: "Media/Objects/Star.png",
                    asteroid: "Media/Objects/Asteroid.png"
                }
            },
            Forest: {
                b: "Media/Background/GameLevels/Forest.png",
                objects: {
                    fox: "Media/Objects/Fox.png",
                    sapling: "Media/Objects/Sapling.png",
                    bear: "Media/Objects/Bear.png"
                }
            },
            Halloween: {
                b: "Media/Background/GameLevels/Halloween.png",
                objects: {
                    bat: "Media/Objects/Bat.png",
                    cobweb: "Media/Objects/Cobweb.png",
                    potion: "Media/Objects/Potion.png",
                    pumpkin: "Media/Objects/Pumpkin.png"
                }
            },
            Christmas: {
                b: "Media/Background/GameLevels/Christmas.png",
                objects: {
                    candyCane: "Media/Objects/CandyCane.png",
                    coal: "Media/Objects/Coal.png",
                    grinch: "Media/Objects/Grinch.png",
                    sac: "Media/Objects/Sac.png"
                }
            },
            TheFirstNight: {
                b: "Media/Background/GameLevels/TheFirstNight.png",
                objects: {
                    apple: "Media/Objects/Apple.png",
                    diamond: "Media/Objects/Diamond.png",
                    iron: "Media/Objects/Iron.png",
                    zombie: "Media/Objects/Zombie.png",
                    skeleton: "Media/Objects/Skeleton.png"
                }
            },
            TheDeepDark: {
                b: "Media/Background/GameLevels/TheDeepDark.png",
                objects: {
                    discFragment: "Media/Objects/DiscFragment.png",
                    dripstone: "Media/Objects/Dripstone.png",
                    potion: "Media/Objects/Potion.png",
                    sculkShrieker: "Media/Objects/SculkShrieker",
                    sonicBoom: "Media/Objects/SonicBoom",
                    xp: "Media/Objects/XP.png",
                    wardenIdle: "Media/Objects/WardenIdle.gif",
                    wardenAttacking: "Media/Objects/WardenAttacking"
                }
            }
        }
    },
    audios: {
        sfx: {
            generic: {
                load: "Media/Background/SFX/load.mp3",
                buttonSound: "Media/Background/SFX/ButtonClick.mp3",
                starPowerSelected: "Media/Background/SFX/StarPowerSelected.mp3",
                gameOver: "Media/Background/SFX/GameOverSound.mp3"
            }
        },
        backgroundMusic: {
            main: {
                Chill1: "Media/MusicOptions/Chill 1.mp3",
                Chill2: "Media/MusicOptions/Chill 2.mp3",
                Chill3: "Media/MusicOptions/Chill 3.mp3",
                Mystical1: "Media/MusicOptions/Mystical 1.mp3",
                Mystical2: "Media/MusicOptions/Mystical 2.mp3",
                Mystical3: "Media/MusicOptions/Mystical 3.mp3"
            },
            levels: {
                SpaceRace: {
                    b: "Media/Background/Audios/SpaceRace.mp3",
                    objects: {
                        rock: "Media/Background/SFX/Rock.mp3",
                        star: "Media/Background/SFX/Star.mp3",
                        asteroid: "Media/Background/SFX/Asteroid.mp3"
                    }
                },
                Forest: {
                    b: "Media/Background/Audios/Forest.mp3",
                    objects: {
                        fox: "Media/Background/SFX/Fox.mp3",
                        sapling: "Media/Background/SFX/Sapling.mp3",
                        bear: "Media/Background/SFX/Bear.mp3"
                    }
                },
                Halloween: {
                    b: "Media/Background/Audios/Halloween.mp3",
                    objects: {
                        bat: "Media/Background/SFX/Bat.mp3",
                        cobweb: "Media/Background/SFX/Cobweb.mp3",
                        pumpkin: "Media/Background/SFX/Pumpkin.mp3",
                        glass: "Media/Background/SFX/Glass.mp3",
                        damage: "Media/Background/SFX/Damage.mp3",
                        points: "Media/Background/SFX/Points.mp3",
                        speed: "Media/Background/SFX/Speed.mp3"
                    }
                },
                Christmas: "Media/Background/Audios/Christmas.mp3",
                TheFirstNight: "Media/Background/Audios/TheFirstNight.mp3",
                TheDeepDark: "Media/Background/Audios/TheDeepDark.mp3"
            }
        }
    }
}

export { gameAssets };