const allSkins = [
  {
    name: "Basket",
    rarity: "Basic",
    image: "Media/Skins/Basket.png",
    maxLevel: 10,
    desc: "Woven from ancient wood and sealed with a curious grin, this lively container hides more than just fruit beneath its lid.",
    starPowerInfo: {
      "Go Big Or Go Home": {
        image: "Media/Star Powers/GoBigOrGoHome.png",
        desc: "Upon activation, Basket doubles in size for 5 seconds! Bigger reach, bigger presence — it’s go big time, or go home empty-handed.",
        durationMs: 5000,
        obtainable: "purchase",
        cost: 2500
      },
      "Basket Battalion": {
        image: "Media/Star Powers/BasketBattalion.png",
        desc: "Upon activation, basket splits into two clones that dash outward, and bouncing back after hitting the edge. Everything they catch goes straight to Basket!",
        durationMs: null,
        obtainable: "unlock",
        cost: null
      }
    }
  },
  {
    name: "Shopping Cart",
    rarity: "Common",
    image: "Media/Skins/ShoppingCart.png",
    maxLevel: 10,
    desc: "Forged from cold steel and abandoned in silent aisles, this restless cart rolls with a purpose only it remembers.",
    starPowerInfo: {
      "Wacky Wheels": {
        image: "Media/Star Powers/WackyWheels.png",
        desc: "Upon activation, Shopping Cart kicks into overdrive, gaining a 25% speed boost for 8 seconds. With wobbly wheels and wild energy, it zips across the level like it just saw a 90% off sale!",
        durationMs: 8000,
        obtainable: "purchase",
        cost: 2500
      },
      "Shopping Spree": {
        image: "Media/Star Powers/ShoppingSpree.png",
        desc: "Upon activation, Shopping Cart enters deal-hunting mode! For 5 seconds, all gains from friendly objects are boosted by 50% — more points, more value, more shopping glory!",
        durationMs: 5000,
        obtainable: "unlock",
        cost: null
      }
    }
  },
  {
    name: "Red Stocking",
    rarity: "Common",
    image: "Media/Skins/RedStocking.png",
    maxLevel: 10,
    desc: "Once hung with care, now wandering with cheer, this stitched enigma carries forgotten wishes in every step. He allegedly is Green Stocking's cousin.",
    starPowerInfo: {
      "Nice or Naughty": {
        image: "Media/Star Powers/NiceOrNaughty.png",
        desc: "Upon activation, Red Stocking plays the gift game! For 5 seconds, every good item the opponent catches gives him a 15% speed boost — while every good item he catches slows the opponent by 15%. Effects stack... so choose your presents wisely!",
        durationMs: 5000,
        obtainable: "purchase",
        cost: 2500
      },
      "Coalstorm": {
        image: "Media/Star Powers/Coalstorm.png",
        desc: "Upon activation, Red Stocking turns generous gifts into nasty tricks! For 5 seconds, any item the opponent catches transforms into a lump of coal — and it hurts.",
        durationMs: 5000,
        obtainable: "unlock",
        cost: null
      }
    }
  },
  {
    name: "Green Stocking",
    rarity: "Common",
    image: "Media/Skins/GreenStocking.png",
    maxLevel: 10,
    desc: "A jolly little stocking brimming with holiday spirit and cheer. Yet something deep inside it never made it to the fireplace.",
    starPowerInfo: {
      "Joy Snatcher": {
        image: "Media/Star Powers/JoySnatcher.png",
        desc: "Upon activation, Green Stocking flips the rules for 8 seconds. Bad items? Pfft — 95% chance they turn into sweet rewards instead. As for the other 5%... well, something hilariously catastrophic might happen. But hey, worth the risk, right?",
        durationMs: 10000,
        obtainable: "purchase",
        cost: 2500
      },
      "Ho, Ho, Ho": {
        image: "Media/Star Powers/HoHoHo.png",
        desc: "Upon activation, Green Stocking spreads the holiday cheer — all bad objects turn into shiny presents filled with surprise rewards! Just... don’t ask what’s inside. Some gifts weren’t meant to be unwrapped.",
        durationMs: null,
        obtainable: "unlock",
        cost: null
      }
    }
  },
  {
    name: "Beaver",
    rarity: "Rare",
    image: "Media/Skins/Beaver.png",
    maxLevel: 10,
    desc: "A cheerful critter with endless energy and a knack for building. But no one knows what he is truly preparing for.",
    starPowerInfo: {
      "Safe Zone": {
        image: "Media/Star Powers/SafeZone.png",
        desc: "Upon activation, Beaver surrounds himself with a glowing protective orb for 8 seconds. Bad items bounce right off, and a steady regeneration keeps him strong. It’s his zone — and nothing unwanted gets in.",
        durationMs: 10000,
        obtainable: "purchase",
        cost: 2500
      },
      "Den Defence": {
        image: "Media/Star Powers/DenDefence.png",
        desc: "Upon activation, Beaver builds a fortified den for 8 seconds. Enemies who dare enter get punished with damage, while Beaver enjoys a 50% gain boost from any good items caught within. His turf, his rules.",
        durationMs: 8000,
        obtainable: "unlock",
        cost: null
      }
    }
  },
  {
    name: "Squirrel",
    rarity: "Rare",
    image: "Media/Skins/Squirrel.png",
    maxLevel: 10,
    desc: "Quick, clever, and always one step ahead, this nimble trickster darts through the shadows. No one knows what he is really after.",
    starPowerInfo: {
      "Acrobat": {
        image: "Media/Star Powers/Acrobat.png",
        desc: "Upon activation, the fearless squirrel unlocks his ultimate move — jumping! For 8 seconds, he bounces through the air with style, dodging danger and snatching rewards like a true performer.",
        durationMs: 8000,
        obtainable: "purchase",
        cost: 2500
      },
      "Acorn Assault": {
        image: "Media/Star Powers/AcornAssault.png",
        desc: "Upon activation, the squirrel snaps — unleashing a furious storm of falling acorns that rain down hard on his enemies. It’s fast, it’s relentless… and it’s personal. Who’s the cute one now?",
        durationMs: null,
        obtainable: "unlock",
        cost: null
      }
    }
  },
  {
    name: "Witch Hat",
    rarity: "Epic",
    image: "Media/Skins/WitchHat.png",
    maxLevel: 10,
    desc: "An ancient hat, said to be enchanted with the power to cast spells. But who knows what it truly holds?",
    starPowerInfo: {
      "Catastrophic Curse": {
        image: "Media/Star Powers/CatastrophicCurse.png",
        desc: "Upon activation, Witch Hat whispers the curse she was never meant to speak. For 8 seconds, no good items may reach her foes — only silence, and the slow creep of despair. Some gifts were never meant to be yours.",
        durationMs: 8000,
        obtainable: "purchase",
        cost: 2500
      },
      "Magical Magnet": {
        image: "Media/Star Powers/MagicalMagnet.png",
        desc: "Upon activation, Witch Hat channels her full power for 5 seconds, creating a swirling vortex that pulls in every good object nearby. Nothing escapes its grasp.",
        durationMs: 5000,
        obtainable: "unlock",
        cost: null
      }
    }
  },
  {
    name: "Ghost",
    rarity: "Epic",
    image: "Media/Skins/Ghost.png",
    maxLevel: 10,
    desc: " A translucent figure, drifting silently between realms. It lingers just out of sight, its true intentions hidden in the mist.",
    starPowerInfo: {
      "Hallucination": {
        image: "Media/Star Powers/Hallucination.png",
        desc: "Upon activation, Ghost distorts the enemy’s mind, twisting their controls for 8 seconds — left is right, right is left, nothing makes sense. You’re not just losing control... you’re losing reality.",
        durationMs: 8000,
        obtainable: "purchase",
        cost: 2500
      },
      "Haunted Dreams": {
        image: "Media/Star Powers/HauntedDreams.png",
        desc: "Upon activation, Ghost plunges the enemy into a paralyzing nightmare for 5 seconds. Their movement freezes, trapped in fear, while unseen horrors slowly sap their lives. Escape? Not a chance.",
        durationMs: 5000,
        obtainable: "unlock",
        cost: null
      }
    }
  },
  {
    name: "Creeper",
    rarity: "Mythical",
    image: "Media/Skins/Creeper.png",
    maxLevel: 10,
    desc: "A silent stalker, its presence known only by the faint hiss that precedes its arrival. No one ever sees it coming, and by the time they do, it is too late.",
    starPowerInfo: {
      "Frag Out": {
        image: "Media/Star Powers/FragOut.png",
        desc: "Upon activation, Creeper just wants to have a blast, and hurls a near-fatal grenade that detonates with explosive force, launching his enemies sky-high and stealing a third of their lives. Boom — game changer.",
        durationMs: null,
        obtainable: "purchase",
        cost: 2500
      },
      "Demolition Day": {
        image: "Media/Star Powers/DemolitionDay.png",
        desc: "Upon activation, Creeper clears the skies — every bad object currently falling detonates instantly in a fiery burst. For each explosion, Creeper is rewarded with a bonus life. Mayhem fuels him.",
        durationMs: null,
        obtainable: "unlock",
        cost: null
      }
    }
  },
  {
    name: "Enderman",
    rarity: "Mythical",
    image: "Media/Skins/Enderman.png",
    maxLevel: 10,
    desc: "A tall figure, shifting in and out of reality, its eyes fixed on something far beyond. It moves with purpose, though no one truly knows its destination.",
    starPowerInfo: {
      "Relocation": {
        image: "Media/Star Powers/Relocation.png",
        desc: "Upon activation, Enderman vanishes into the shadows, swapping places with his enemy in the blink of an eye. For 8 seconds he also gains a 25% speed boost, moving with unnatural speed,  — a monster in the dark, always one step ahead.",
        durationMs: null,
        obtainable: "purchase",
        cost: 2500
      },
      "Glitched Reality": {
        image: "Media/Star Powers/GlitchedReality.png",
        desc: "Upon activation, Enderman begins to tear at the fabric of the world. For 8 seconds every good item he catches has a 75% chance to duplicate nearby — as if reality itself is… slipping.",
        durationMs: 8000,
        obtainable: "unlock",
        cost: null
      }
    }
  },
  {
    name: "Goblin",
    rarity: "Jungle",
    image: "Media/Skins/Goblin.png",
    maxLevel: 10,
    desc: "A tall figure, shifting in and out of reality, its eyes fixed on something far beyond. It moves with purpose, though no one truly knows its destination.",
    starPowerInfo: {
      "Tax Evasion": {
        image: "Media/Star Powers/TaxEvasion.png",
        desc: "Upon activation, Goblin becomes untouchable — bad items no longer harm him. Instead, their punishing effects are generously donated to his enemy, while he enjoys a 25% life boost for 8 seconds.",
        durationMs: 8000,
        obtainable: "purchase",
        cost: 2500
      },
      "Pickpocket": {
        image: "Media/Star Powers/Pickpocket.png",
        desc: "Upon activation, Goblin gives in to pure greed. For 5 seconds, every good effect the enemy catches is silently stolen and redirected to him instead. Why earn it… when you can steal it?",
        durationMs: 5000,
        obtainable: "unlock",
        cost: null
      }
    }
  }
];

const rarityInfo = {
  Basic: { border: "#0c5876", background: "#197799" },
  Common: { border: "blue", background: "#1733ad" },
  Rare: { border: "#742c06", background: "#a04a1b" },
  Epic: { border: "rgb(78, 6, 104)", background: "#8d20ad" },
  Mythical: { border: "#5c0404", background: "#ac1e1e" },
  Jungle: { border: "#054725", background: "#17894e" }
};

const levelData = [
  { level: 1, powerPointsRequired: 20, upgradeCost: 40, livesAddition: 0, speedAddition: 0 },
  { level: 2, powerPointsRequired: 50, upgradeCost: 100, livesAddition: 1, speedAddition: 0 },
  { level: 3, powerPointsRequired: 80, upgradeCost: 160, livesAddition: 0, speedAddition: .5 },
  { level: 4, powerPointsRequired: 140, upgradeCost: 280, livesAddition: 1, speedAddition: 0 },
  { level: 5, powerPointsRequired: 300, upgradeCost: 600, livesAddition: 0, speedAddition: .5 },
  { level: 6, powerPointsRequired: 480, upgradeCost: 960, livesAddition: 1, speedAddition: 0 },
  { level: 7, powerPointsRequired: 660, upgradeCost: 1320, livesAddition: 0, speedAddition: .5 },
  { level: 8, powerPointsRequired: 880, upgradeCost: 1760, livesAddition: 0, speedAddition: 0 },
  { level: 9, powerPointsRequired: 1080, upgradeCost: 2160, livesAddition: 1, speedAddition: 1.5 },
  { level: 10, powerPointsRequired: 1440, upgradeCost: 2880, livesAddition: 0, speedAddition: 0 }
];

export { allSkins, rarityInfo, levelData };