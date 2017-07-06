var WaterFall = require('./js/waterfall')

require('./css/index.css')

var waterfall

window.onload = function() {
    var boxTpl = '<div class="container">' +
        '<div class="box">' +
        '<div class="pic" style="height:{height}px;background-color:{bgColor}">' +
        '<h1 class="title">{number}</h1>' +
        '</div>' +
        '</div>' +
        '</div>'

    waterfall = new WaterFall({
        parent: document.querySelector('.container'),
        boxClass: 'box',
        getData: getData,
        boxTpl: boxTpl
    })
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
            bgColor: randomColor(),
            number: i + 1
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