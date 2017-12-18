function YHaulBox(callback) {
    var boxLoaction = [] //代表所有盒子的位置
    var contentAll = [] //所有的内容
    var destination; //目的地
    getBoxLoaction(boxLoaction) //获取所有盒子的位置
    console.log(boxLoaction)
    var defaultLoaction = {}


    $.each($('.content'), function(i, v) {
            $(v).attr('identification', i)
            var content = {}
            content.defaultTop = $(this).css('top')
            content.defaultLeft = $(this).css('left')
            content.this = $(v)

            contentAll.push(content)
        })
        //console.log(boxLoaction)
    $('.content').on('mousedown', function() {
        //console.log('按下')

        move(this)
    })
    $('.content').on('mouseup', function() {
        //console.log('抬起')
        var _this = this
        var content = findThis(_this)

        //console.log(content)
        $(this).unbind('mousemove') //解除移动
        var loaction = judgeLoaction(this)
        if (loaction) {
            // console.log('成功了')
        } else {
            $(this).css({
                top: content.defaultTop,
                left: content.defaultLeft
            })
            var thisObj = findThis(_this)
            thisObj.home = '';
        }
    })



    function findThis(elm) { //在所有内容中找到代表自己的对象
        var obj = {};
        $.each(contentAll, function(i, v) {
            if ($(v.this).attr('identification') == $(elm).attr('identification')) {
                return obj = v
            }
        })
        return obj
    }

    function getBoxLoaction(arr) { //获取所有盒子的位置

        $.each($('.box'), function(i, v) {
            $(v).attr('boxIdentification', i)
            var loaction = {}
            loaction.left = $(v).offset().left
            loaction.top = $(v).offset().top
            loaction.width = parseInt($(v).css('width'))
            loaction.height = parseInt($(v).css('height'))
            loaction.elm = $(v)
            arr.push(loaction)
        })
    }

    function move(_this) { //移动函数
        $(_this).on('mousemove', function(e) {
            //console.log('移动')
            var xx = e.originalEvent.x || e.originalEvent.layerX || 0;
            var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
            var x = xx - parseInt($(this).css('width')) / 2
            var y = yy - parseInt($(this).css('height')) / 2
                //console.log(xx + '=====' + yy)
                //console.log(x + '=====' + y)
            $(this).css('left', x)
            $(this).css('top', y)
        })
    }

    function judgeLoaction(_this) { //判断位置是否是某一个盒子的位置
        var thisLoaction = getContentLoaction(_this)
            //console.log(thisLoaction)
            //console.log(loaction)
        var flag = false
        $.each(boxLoaction, function(i, v) {
            //console.log(v)
            var throttle = true
            $.each(thisLoaction, function(j, k) {
                //console.log(k)
                var xFlag = (k.left >= v.left) && (k.left <= (v.left + v.width))
                var yFlag = (k.top >= v.top) && (k.top <= (v.top + v.height))
                    //console.log(xFlag && yFlag)
                if (xFlag && yFlag) {
                    destination = v.elm
                    console.log(judgeBoxOccupied(destination, _this))
                    if (judgeBoxOccupied(destination, _this)) {
                        var thisObj = findThis(_this)
                        console.log(thisObj)
                        var top = thisObj.nowTop || thisObj.defaultTop
                        var left = thisObj.nowLeft || thisObj.defaultLeft
                        $(_this).css({
                            top: top,
                            left: left
                        })

                    } else {
                        $(_this).css({
                            top: v.top,
                            left: v.left
                        })
                        $(v.elm).attr('occupy', true)
                        var thisObj = findThis(_this)
                        thisObj.nowTop = v.top + 'px'
                        thisObj.nowLeft = v.left + 'px'
                        thisObj.home = v.elm
                            // console.log(contentAll)
                            //   console.log(boxLoaction)
                    }
                    throttle = false
                    flag = true
                    return false
                }
            })
            if (!throttle) return false
        })
        return flag
    }

    function getContentLoaction(_this) { //获取一个盒子的位置
        var thisLoaction = []
        var dot1 = {}
        dot1.left = $(_this).offset().left
        dot1.top = $(_this).offset().top
        thisLoaction.push(dot1)
        var dot2 = {}
        dot2.left = $(_this).offset().left + parseInt($(_this).css('width'))
        dot2.top = $(_this).offset().top
        thisLoaction.push(dot2)
        var dot3 = {}
        dot3.left = $(_this).offset().left
        dot3.top = $(_this).offset().top + parseInt($(_this).css('height'))
        thisLoaction.push(dot3)
        var dot4 = {}
        dot4.left = $(_this).offset().left + parseInt($(_this).css('width'))
        dot4.top = $(_this).offset().top + parseInt($(_this).css('height'))
        thisLoaction.push(dot4)
        return thisLoaction
    }

    function judgeBoxOccupied(box, k) { //判断当前盒子是否被占据
        var flag = false //true代表被占用
        $.each(contentAll, function(i, v) {
            if (v.home) {
                console.log($(v.home).attr('boxidentification') + '=======' + $(box).attr('boxidentification'))
                var tOf = $(v.home).attr('boxidentification') == $(box).attr('boxidentification')
                if (tOf) {
                    //console.log(k)
                    var thisObj = findThis(k)
                    if (!thisObj.home) {
                        return flag = true
                    } else if (!($(thisObj).attr('boxidentification') == $(box).attr('boxidentification'))) {
                        return flag = true
                    }

                }
            }
        })
        return flag
    }
}