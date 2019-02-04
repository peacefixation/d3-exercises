function generateNumbers(n, min, max) {
    let data = [];
    for(let i = 0; i < n; i++) {
        data.push(rand(min, max));
    }
    return data;
}

function generatePoints(n, min, max) {
    let data = [];
    for(let i = 0; i < n; i++) {
        data.push([rand(min, max), rand(min, max)]);
    }
    return data;
}

function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}