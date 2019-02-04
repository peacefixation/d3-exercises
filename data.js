function generateNumbers(n, min, max) {
    let data = [];
    for(let i = 0; i < n; i++) {
        data.push(Math.random() * (max - min) + min);
    }
    return data;
}