export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function hypotenuseСalculation(deltaX, deltaY) {
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
}
function cartesianToPolar(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const angle = Math.atan2(deltaY, deltaX); // Angle in radians
    return {
        angle,
        distance,
    };
}
function polarToCartesian(x1, y1, angle, distance) {
    const x2 = x1 + distance * Math.cos(angle);
    const y2 = y1 + distance * Math.sin(angle);
    return {
        x2,
        y2,
    };
}
