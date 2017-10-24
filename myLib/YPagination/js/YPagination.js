(function($) {
    $.fn.YPagination = function(config, callback) {
        var a = {
            pageSize: 10, //每一页的按钮数量
            total: 0, //总页码
            minPage: 1, //当前页面最小的页码
            maxPage: 1, //当前页面最大的页码
            activeButton: 1, //当前选中按钮的位置
            activePage: 1, //当前选中按钮的页码
        }
        if (config) $.extend(a, config);
        refresh()


        function refresh(begin, end) { //创建按钮
            if (a.total <= 1) return
            $('.YPagination').empty()
            $('.YPagination').append('<ul></ul>');
            $('.YPagination ul').append('<li class="iconfont  icon-fanhui pre"></li>')
            if (!begin) begin = 1
            if (!end) end = a.pageSize > a.total ? a.total : a.pageSize

            for (var i = begin; i <= end; i++) {
                var name = ''
                if (i == a.activePage) name = '  active'
                $('.YPagination ul').append(' <li page="' + i + '" class="pageButton' + name + '">' + i + '</li>')
            }
            $('.YPagination ul').append('<li class="iconfont  icon-gengduo next"></li>')
            $('.YPagination ul').append('<li class="input"><input class="pageIndex"></li>')
            $('.YPagination ul').append('<li class="goTo">GO</li>')
            a.minPage = begin
            a.maxPage = end
            bindAll()
        }

        function init() { //按钮状态
            if (a.activePage <= 1) {
                $('.pre').addClass('disabled')
            } else {
                $('.pre').removeClass('disabled')
            }
            if (a.activePage >= a.total) {
                $('.next').addClass('disabled')
            } else {
                $('.next').removeClass('disabled')
            }
        }

        function bindAll() { //绑定所有按钮事件
            $('.pageButton').on('click', function() { //点击页码按钮
                $(this).addClass('active').siblings().removeClass('active')
                a.activeButton = parseInt($('.YPagination ul li').index(this))
                a.activePage = parseInt($(this).attr('page'))
                callback($(this).attr('page'))
                init()
                console.log(a)
            })
            $('.pre,.next').on('click', function() { //上一步or下一步
                if ($(this).hasClass('disabled')) return
                if ($(this).hasClass('pre')) {
                    clickPre()
                    init()
                } else if ($(this).hasClass('next')) {
                    clickNext()
                    init()
                }
            })
            $('.goTo').on('click', function() {
                var pageIndex = parseInt($('.pageIndex').val())
                if (pageIndex < 1 || pageIndex > a.total) return
                clickGo(pageIndex)
            })
        }

        function clickPre() {
            if (a.activePage <= a.minPage) {
                var begin, end;
                begin = a.activePage - 1;
                end = begin + a.pageSize - 1;
                refresh(begin, end)
                $('.YPagination ul li').eq(parseInt(a.activeButton)).click()
                return
            }
            $('.YPagination ul li').eq(parseInt(a.activeButton) - 1).click()

        }

        function clickNext() {
            if (a.activePage >= a.maxPage) {
                var begin, end;
                end = a.activePage + 1;
                begin = end - a.pageSize + 1;
                refresh(begin, end)
                $('.YPagination ul li').eq(parseInt(a.activeButton)).click()
                return
            }
            $('.YPagination ul li').eq(parseInt(a.activeButton) + 1).click()
        }

        function clickGo(pageIndex) {
            var begin, end;
            if (pageIndex < a.minPage) {
                begin = pageIndex;
                end = begin + a.pageSize - 1;
                refresh(begin, end)
                $('.YPagination ul li').eq(1).click()
                return
            }
            if (pageIndex > a.maxPage) {
                if (pageIndex - a.pageSize < 1) {
                    begin = 1;
                    end = begin + a.pageSize
                } else {
                    end = pageIndex;
                    begin = end - a.pageSize + 1;
                }

                refresh(begin, end)
                $.each($('.pageButton'), function(i, v) {
                    if ($(v).attr('page') == pageIndex) {
                        $(v).click()
                        return
                    }
                })
                return
            }
            $.each($('.pageButton'), function(i, v) {
                if ($(v).attr('page') == pageIndex) {
                    $(v).click()
                    return
                }
            })
        }
    }

})(jQuery)