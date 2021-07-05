$(function() {

    var laypage = layui.laypage;

    function padZero(n) {
        return n > 9 ? '0' + n : n
    }

    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss
    }


    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initTable()
    initCate()


    function initTable() {

        $.get('/my/article/list/', q, function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            console.log(res.data);
            var htmlStr = template('tpl-table', res.data)

            $('tbody').html(htmlStr)
            renderPage(res.total)


        })
    }

    function initCate() {
        $.get('/my/article/cates', function(res) {
            if (res.stutas !== 0) {
                return layui.layer.msg(res.message)
            }
            var htmlStr = template('tpl-cate', res)
            console.log(htmlStr);
            $('[name=cate_id]').html(htmlStr)
            layui.layer.render()

        })
    }


    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: 'total',
            limit: 'q.pagesize',
            curr: 'q.pagenum',
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }

            }

        })
    }

    $('body').on('click', '.btn-del', function() {
        var len = $('.btn-del').length
        var id = $(this).attr('data-id')
        layui.layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {

            layui.layerlayui.layer.msg(res.message)
            $.get('/my/article/delete/' + id, function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)


                if (leg === 1) {
                    q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                }
                initTable()

            })

            layer.close(index);
        });

    })
})