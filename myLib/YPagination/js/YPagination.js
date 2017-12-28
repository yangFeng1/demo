(function($) {
    $.fn.YPagination = function(config, callback) {
        var a = {
            pageSize: 10, //每一页的按钮数量
            total: 0, //总页码
            minPage: 1, //当前页面最小的页码
            maxPage: 1, //当前页面最大的页码
            activeButton: 1, //当前选中按钮的位置
            activePage: 1, //当前选中按钮的页码
            //beyondPage:  输入页码超出总页码是执行的函数  
        }
        if (config) $.extend(a, config);
        var _this = this
        refresh()
        
        function refresh(begin, end) { //创建按钮
            if (a.total <= 1) return
            _this.find('.YPagination').remove()
            _this.append('<div class="YPagination"></div>')
            
            _this.find('.YPagination').append('<ul></ul>');
            _this.find('.YPagination ul').append('<li class="iconfont  icon-fanhui pre Ypage"></li>')
            if (!begin) begin = 1
            if (!end) end = a.pageSize > a.total ? a.total : a.pageSize
            for (var i = begin; i <= end; i++) {
                var name = ''
                if (i == a.activePage) name = '  YActive'
               _this.find('.YPagination ul').append(' <li page="' + i + '" class="pageButton Ypage' + name + '">' + i + '</li>')
            }
            _this.find('.YPagination ul').append('<li class="iconfont  icon-gengduo next Ypage"></li>')
             _this.find('.YPagination ul').append('<li class="input Ypage"><input class="pageIndex  YpageInp"></li>')
             _this.find('.YPagination ul').append('<li class="goTo Ypage">GO</li>')
            a.minPage = begin
            a.maxPage = end
            bindAll()
        }

        function init() { //按钮状态
            if (a.activePage <= 1) {
                 _this.find('.pre').addClass('disabled')
            } else {
                 _this.find('.pre').removeClass('disabled')
            }
            if (a.activePage >= a.total) {
                 _this.find('.next').addClass('disabled')
            } else {
                _this.find('.next').removeClass('disabled')
            }
        }

        function bindAll() { //绑定所有按钮事件
             _this.find('.pageButton').on('click', function() { //点击页码按钮
                $(this).addClass('YActive').siblings().removeClass('YActive')
                a.activeButton = parseInt(_this.find('.YPagination ul li').index(this))
                a.activePage = parseInt(_this.find(this).attr('page'))
                callback($(this).attr('page'))
                init()
            })
            _this.find('.pre,.next').on('click', function() { //上一步or下一步
                if ($(this).hasClass('disabled')) return
                if ($(this).hasClass('pre')) {
                    clickPre()
                    init()
                } else if ($(this).hasClass('next')) {
                    clickNext()
                    init()
                }
            })
             _this.find('.goTo').on('click', function() {
                var pageIndex = parseInt($('.pageIndex').val())
                if (pageIndex < 1 || pageIndex > a.total) return a.beyondPage()
                clickGo(pageIndex)
            })
        }

        function clickPre() {
            if (a.activePage <= a.minPage) {
                var begin, end;
                begin = a.activePage - 1;
                end = begin + a.pageSize - 1;
                refresh(begin, end)
                 _this.find('.YPagination ul li').eq(parseInt(a.activeButton)).click()
                return
            }
             _this.find('.YPagination ul li').eq(parseInt(a.activeButton) - 1).click()

        }

        function clickNext() {
            if (a.activePage >= a.maxPage) {
                var begin, end;
                end = a.activePage + 1;
                begin = end - a.pageSize + 1;
                refresh(begin, end)
                _this.find('.YPagination ul li').eq(parseInt(a.activeButton)).click()
                return
            }
            _this.find('.YPagination ul li').eq(parseInt(a.activeButton) + 1).click()
        }

        function clickGo(pageIndex) {//跳转页面
            var begin, end;
            if (pageIndex < a.minPage) {
                begin = pageIndex;
                end = begin + a.pageSize - 1;
                refresh(begin, end)
                _this.find('.YPagination ul li').eq(1).click()
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
                $.each(  _this.find('.pageButton'), function(i, v) {
                    if ($(v).attr('page') == pageIndex) {
                        $(v).click()
                        return
                    }
                })
                return
            }
            $.each(  _this.find('.pageButton'), function(i, v) {
                if ($(v).attr('page') == pageIndex) {
                    $(v).click()
                    return
                }
            })
        }
    }

})(jQuery)
