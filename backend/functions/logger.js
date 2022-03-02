
exports.logger = (message) => {
    const time = new Date().toLocaleString("de-DE", {
        timeZone: "Europe/Berlin" 
    })
    // .replace(/T/, ' ').replace(/\..+/, '')

    console.log("[" + time + "] " + message);
}