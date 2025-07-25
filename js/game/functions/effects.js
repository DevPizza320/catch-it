export function regen(durationMs, intervalMs, step, entity, audio) {
    if (!entity) return;
    
    let maxIntervals = durationMs / intervalMs;
    let activeIntervals = 0;

    const regenEffect = setInterval(() => {
        if (activeIntervals < maxIntervals) {
            entity.lives += step;
            activeIntervals++;

            if (audio) {
                audio.play();
            }
        } else {
            clearInterval(regenEffect);
        }
    }, intervalMs)
}

export function damage(durationMs, intervalMs, step, entity, audio) {
    if (!entity) return;
    
    let maxIntervals = durationMs / intervalMs;
    let activeIntervals = 0;

    const damageEffect = setInterval(() => {
        if (activeIntervals < maxIntervals) {
            entity.lives -= step;
            activeIntervals++;

            if (audio) {
                audio.play();
            }
        } else {
            clearInterval(damageEffect);
        }
    }, intervalMs)
}

export function speed(boostAmount, durationMs, stackable = false, stackLimit = 1, entity, audio = null) {
    if (!entity) return;

    let activeStacks = 0;

    const speedEffect = () => {
        if (!stackable && activeStacks >= 1) return;

        if (stackable && activeStacks >= stackLimit) return;

        const originalSpeed = entity.speed;
        entity.speed *= boostAmount;
        activeStacks++;

        if (audio) {
            audio.play();
        }

        setTimeout(() => {
            entity.speed = originalSpeed;
            activeStacks--;
        }, durationMs);
    };

    speedEffect();
}

export function slowness(boostAmount, durationMs, stackable = false, stackLimit = 1, entity, audio = null) {
    if (!entity) return;

    let activeStacks = 0;;
    const slownessEffect = () => {
        if (!stackable && activeStacks >= 1) return;

        if (stackable && activeStacks >= stackLimit) return;

        const originalSpeed = entity.movementSpeed;
        entity.movementSpeed *= boostAmount;
        activeStacks++;

        if (audio) {
            audio.play();
        }

        setTimeout(() => {
            entity.movementSpeed = originalSpeed;
            activeStacks--;
        }, durationMs);
    };

    slownessEffect();
}