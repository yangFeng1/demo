(function($) {
    $.fn.YAlertModal = function(config) {
        var layer = '<div id="modalLayer"></div>';
        var alertModal = config.elm;
        var classOrId = $(alertModal).attr('class') ? '.' + $(alertModal).attr('class') : '#' + $(alertModal).attr('id')
        $('body').append(alertModal)
        var elmW = $(classOrId).css('width')
        var elmH = $(classOrId).css('height')
        var marginLeft = '-' + parseInt(elmW) / 2 + 'px'
        var marginTop = '-' + parseInt(elmH) / 2 + 'px'
        $('body').append(layer)
        $('#modalLayer').css({
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            display: 'none',
            zIndex: '888',
            background: 'rgba(0, 0, 0, 0.5)'
        })
        $(classOrId).css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginLeft: marginLeft,
            marginTop: marginTop,
            display: 'none',
            zIndex: '999'
        })
        $(this).on('click', function() {
            $('#modalLayer').fadeIn(500)
            $(classOrId).fadeIn(500)
        })
        $('#modalLayer').on('click', function() {
            $('#modalLayer').fadeOut(500)
            $(classOrId).fadeOut(500)
        })
        $(config.replace).on('click', function() {
            $('#modalLayer').click()
        })
    }
})($)