var waterfall

window.onload = function() {
    waterfall = new WaterFall(document.querySelector('.container'), 'box', getData)
    waterfall.init(getData)
}

window.onresize = function() {
    waterfall.init()
}

function getData(params) {
    var data = []
    var len = 20
    for (var i = 0; i < len; i++) {
        data.push({
            height: randomInt(100, 350),
            bgColor: randomColor()
        })
    }
    return data
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor() {
    var colorRange = '0123456789abcdef'.split('')
    var color = []
    while (color.length < 6) {
        color.push(colorRange[randomInt(0, 15)])
    }
    return '#' + color.join('')
}