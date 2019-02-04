// interpolate between colors { r, g, b }
function lerpRGB(color1, color2, n, nMin, nMax) {
    let t = scaleBetween(n, nMin, nMax, 0, 1);

    let color = {};
    color.r = color1.r + ((color2.r - color1.r) * t);
    color.g = color1.g + ((color2.g - color1.g) * t);
    color.b = color1.b + ((color2.b - color1.b) * t);
    return color;
}

// scale a number from one range to another
function scaleBetween(n, oldMin, oldMax, newMin, newMax) {
    return ((n - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
}