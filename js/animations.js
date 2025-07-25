const skinImage = document.getElementById("skin-img");
const animationButtons = document.querySelectorAll("#upgrade-button, #select-button");
const upgradeButton = document.getElementById("upgrade-button");

animationButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Get the computed transform before stopping idle animation
        const computedStyle = window.getComputedStyle(skinImage);
        const currentTransform = computedStyle.transform;

        // Remove idle animation temporarily
        skinImage.style.animation = "none";
        skinImage.style.transform = currentTransform; // Keep current position
        void skinImage.offsetWidth; // Force reflow

        // Apply upgrade animation
        skinImage.style.animation = "upgradeSpin 3s ease-out";

        setTimeout(() => {
            // Restore the idle animation from the last position
            skinImage.style.animation = "none";
            skinImage.style.transform = currentTransform; // Maintain the last transform
            void skinImage.offsetWidth; // Force reflow again
            skinImage.style.animation = "idleRotate 8s infinite ease-in-out";
        }, 3000); // Matches upgrade animation duration
    })
})

const starPowerSkinImg = document.getElementById("current-skin-img");
starPowerSkinImg.style.animation = "idleRotate 8s infinite ease-in-out";