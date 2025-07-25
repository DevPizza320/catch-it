const assetsToLoad = [];
const failedAssets = [];

const extensionTypeMap = {
    ".png": "image",
    ".gif": "image",
    ".jpg": "image",
    ".jpeg": "image",
    ".mp3": "audio",
    ".wav": "audio",
    ".ogg": "audio",
    ".mp4": "video",
    ".webm": "video",
};

let loadingText = null;
let loadingFill = null;

export function initLoaderDOM() {
    loadingText = document.querySelector(".loader-text");
    loadingFill = document.querySelector(".loader-fill");

    console.log("initLoaderDOM called.");
    console.log("loadingText:", loadingText);
    console.log("loadingFill:", loadingFill);

    if (!loadingText || !loadingFill) {
        console.warn("Loader elements not found!");
        return;
    }

    loadingText.textContent = "Loading... 0%";
    loadingFill.style.width = "5%";
}

export function updateLoader(percent) {
    console.log(`updateLoader called with ${percent}%`);

    if (!loadingText || !loadingFill) {
        console.warn("Loader elements missing during update!");
        return;
    }

    loadingText.textContent = `Loading... ${percent}%`;
    loadingFill.style.width = `${percent}%`;
}


// Load one image/audio/video from a url
export function loadAsset(src, type) {
    return new Promise((resolve) => {
        let el;
        const done = () => {
            console.log(`Successfully loaded: ${src}`);
            resolve();
        }
        const fail = () => {
            console.error(`Failed to load: ${type}, with source ${src}`);
            failedAssets.push({ src, type });
            resolve();
        };

        if (type === 'image') {
            el = new Image();
            el.onload = done;
            el.onerror = fail;
            el.src = src;
        } else if (type === 'audio') {
            el = new Audio();
            el.oncanplaythrough = done;
            el.onerror = fail;
            el.src = src;
        }
        assetsToLoad.push(el);
    });
}

/** 
* @param {Array<{src: string, type: 'image' | 'audio' | 'video'}>} assets
*/

export async function preloadManualAssets(assets, delayMs = 100) {
    let loaded = 0;
    const total = assets.length;

    for (const a of assets) {
        await new Promise(res => setTimeout(res, delayMs)); // delay before each load
        await loadAsset(a.src, a.type);

        loaded++;
        const percent = Math.round((loaded / total) * 100);
        console.log(percent);

        if (percent < 100) {
            loadingText.textContent = `Loading... ${percent}%`;
            loadingFill.style.width = `${percent}%`;
        } else {
            loadingText.textContent = "Loading complete";
            window.location.replace('index.html');
        }
    }

    if (failedAssets.length > 0) {
        console.warn("Failed assets: ", failedAssets);
    }
}

export function extractMediaPaths(mediaObj, extension) {
    const paths = [];

    function recurse(obj) {
        for (const key in obj) {
            if (typeof obj[key] === 'string' && obj[key].endsWith(extension)) {
                paths.push(obj[key]);
            } else if (typeof obj[key] === 'object') {
                recurse(obj[key]);
            }
        }
    }

    recurse(mediaObj);
    return paths;
}

export function extractTypedAssets(mediaObj) {
    const result = [];

    function recurse(obj) {
        for (const key in obj) {
            const val = obj[key];

            if (typeof val === 'string') {
                for (const ext in extensionTypeMap) {
                    if (val.endsWith(ext)) {
                        result.push({ src: val, type: extensionTypeMap[ext] });
                        break;
                    }
                }
            } else if (typeof val === 'object') {
                recurse(val);
            }
        }
    }

    recurse(mediaObj);
    return result;  // [{src, type}, ...]
}

