import { loadFromLocalStorage, getUserDeviceType, err } from "./data/helper-functions.js";

function encodeBackup(type, player) {
    let data = loadFromLocalStorage("allPlayerData");

    if (!data) {
        err("BACKUP_ERR detected: Process aborted", "warn");
        return;
    } else {
        if (type !== "all" && data[player]) {
            data = data[player];
        } else {
            console.error("BACKUP_ERR detected: Process aborted");
            return;
        }
    }
    console.log(data);
    const base64 = btoa(data);

    const o = base64.split('').map((char, i) => i % 3 === 0 ? String.fromCharCode(char.charCodeAt(0) + 2) : char).join('');

    const checksum = base64.length % 97;

    return `🌿${checksum}.${o}`;
}

function decodeBackup(backupCode) {
    if (!backupCode.startsWith('🌿')) {
        err("BACKUP_ERR detected: Invalid code format");
        return;
    }

    const [checksumPart, o] = backupCode.slice(1).split('.');

    const restoredBase64 = o.split('').map((char, i) =>
        i % 3 === 0 ? String.fromCharCode(char.charCodeAt(0) - 2) : char
    ).join('');

    const calculatedChecksum = restoredBase64.length % 97;
    if (parseInt(checksumPart) !== calculatedChecksum) {
        err("BACKUP_ERR detected: Tampering detected");
        return;
    }

    const jsonData = atob(restoredBase64);
    return jsonData;
}

function copyBackupCode() {
    try {
        const code = encodeBackup();
        navigator.clipboard.writeText(code).then(() => {
            alert("Backup code copied! Save it somewhere safe.");
        });
    } catch (e) {
        err("BACKUP_ERR detected: Process failed" + e.message);
        return;
    }
}