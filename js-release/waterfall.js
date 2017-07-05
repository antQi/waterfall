function WaterFall(containerEle, boxClass) {
    this.containerEle = containerEle
    this.boxClass = boxClass
    this.isFirst = true
}

WaterFall.prototype._setBaseStyle = function() {
    this.boxWidth = this.boxs[0].offsetWidth
    this.containerEle.style.width = this.cols * this.boxWidth + 'px'
    this.containerEle.style.margin = '0 auto'
}

WaterFall.prototype._setBoxs = function() {
    this.boxs = Array.prototype.slice.call(document.getElementsByClassName(this.boxClass))

}

WaterFall.prototype._setTpl = function() {

}

WaterFall.prototype._setCols = function() {
    this.cols = Math.floor(document.documentElement.clientWidth / this.boxs[0].offsetWidth)
}

WaterFall.prototype.render = function(data) {
    var self = this
    if (!self.boxTpl) {
        self.boxNode = document.getElementsByClassName(self.boxClass)
        self.boxNode = self.boxNode ? self.boxNode[0].cloneNode(true) : ''
        self.boxTpl = self.boxNode.outerHTML
    }
    var nodeStr = self.boxTpl
    var html = '';
    for (var i = 0; i < data.length; i++) {
        var domStr = nodeStr
        for (var key in data[i]) {
            var reg = new RegExp('\\{' + key + '\\}', 'g')
            domStr = domStr.replace(reg, data[i][key])
        }
        html += domStr
    }
    var parser = new DOMParser()
    var dom = parser.parseFromString(html, 'text/html')
    var domList = dom.body.getElementsByClassName(self.boxClass)
    var docfrag = document.createDocumentFragment();
    var len = domList.length
    for (var j = 0; j < len; j++) {
        if (domList[j]) {
            docfrag.appendChild(domList[j])
        }
    }
    if (self.isFirst) {
        self.containerEle.getElementsByClassName(this.boxClass)[0].remove()
    }
    self.containerEle.appendChild(docfrag)
}


WaterFall.prototype.init = function(getData) {
    var self = this

    var e = window.event
    if (e.type !== 'resize') {
        self.render(getData())
    }
    self.getData = getData
    self._setBoxs()
    self._setCols()
    self._setBaseStyle()

    var arr = []
    var boxsEles = this.boxs
    var len = self.cols
    for (var i = 0; i < boxsEles.length; i++) {
        if (i < len) {
            boxsEles[i].style.position = ''
            boxsEles[i].style.top = ''
            boxsEles[i].style.left = ''
            arr.push(boxsEles[i].offsetHeight)
        } else {
            var minHeight = Math.min.apply(null, arr)
            var minHeightIndex = arr.indexOf(minHeight)
            self.setFallStyle(minHeightIndex, minHeight, i)
            arr[minHeightIndex] += boxsEles[i].offsetHeight
        }
    }
    self.scroll()
}


WaterFall.prototype.setFallStyle = function(index, minHeight, eleIndex) {
    var box = this.boxs[eleIndex]
    box.style.position = 'absolute'
    box.style.top = minHeight + 'px'
    box.style.left = this.boxWidth * index + 'px'
        // box.style.transform = 'translate3d(0, 0, 0)'
        // box.style.transitionDuration = '300ms'
}

WaterFall.prototype.scroll = function() {
    var self = this
    window.onscroll = function() {
        var lastHeight = self.boxs[self.boxs.length - 1].offsetTop + Math.floor(self.boxs[self.boxs.length - 1].offsetHeight / 2)
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        var innerHeight = document.body.clientHeight || document.documentElement.clientHeight

        if (scrollTop + innerHeight >= lastHeight) {
            self.init(self.getData)
        }
    }
}