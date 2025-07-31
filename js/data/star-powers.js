import * as fn from "../js/game/functions/game-functions.js"



function goBigOrGoHome(player) {
    if (player.starPower.active || player.starPower.cooldown) return;

    player.starPower.active = true;
    player.starPower.cooldown = true;

    player.starPower.originalWidth = player.width;
    player.starPower.originalHeight = player.height;
    player.starPower.originalSpeed = player.speed;

    player.width *= 2;

    const newHeight = player.height * 2;
    player.y -= (newHeight - player.height);
    player.height = newHeight;

    player.speed *= 2;

    setTimeout(() => {
        player.y += (player.height - player.starPower.originalHeight);
        player.height = player.starPower.originalHeight;
        player.width = player.starPower.originalWidth;
        player.speed = player.starPower.originalSpeed;

        player.starPower.active = false;

        setTimeout(() => {
            player.starPower.cooldown = false;
        }, 10000); // e.g. 10s cooldown
    }, player.starPower.duration);
}

function basketBattalion(canvas, ctx, player) {
    let startPos = player.x;
    const basketImg = new Image();
    basketImg.src = "Media/Skins/Basket.png";

    let baskets = [
        {
            x: player.x - player.width * 1.25,
            y: player.y,
            width: player.width,
            height: player.height,
            direction: "left",
            img: basketImg,
            score: 0,
            lives: player.health,
            speed: player.speed,
            caughtBalls: 0
        },
        {
            x: player.x + player.width * 1.25,
            y: player.y,
            width: player.width,
            height: player.height,
            direction: "right",
            img: basketImg,
            score: 0,
            lives: player.health,
            speed: player.speed,
            caughtBalls: 0
        }
    ]

    // Ensure baskets don't get placed off screen
    if (baskets[0].x < 0) {
        baskets[0].x = player.x + player.width * 1.25;
        baskets[0].dir = "right";

        baskets[1].x = player.x + player.width * 2.5;
    } else if (baskets[1].x + baskets[1].width > canvas.width) {
        baskets[1].x = player.x - player.width * 2.5;
        baskets[1].dir = "left";
    }

    function loop() {
        fn.drawEntities(ctx, baskets);
        fn.moveEntities(baskets);
        fn.checkCollisions()
    }
}