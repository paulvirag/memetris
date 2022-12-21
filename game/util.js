module.exports = {
    copy: piece => piece.map(row => [...row]),
    getSeed: () => Math.floor(Math.random() * 2147483647),
}
