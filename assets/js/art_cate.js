$(function() {
    var form = layui.form
    initArCateList()

    function initArCateList() {
        $.get('/my/article/cates', function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // layui.layer.msg(res.message)
            // console.log(res);
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
        })

    }
    //为添加按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCart').on('click', function() {
            indexAdd = layui.layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#loding-add').html()
            });
        })
        //通过代理的方式为form 添加submit 绑定事件

    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        // console.log('ok');
        $.post('/my/article/addcates', $(this).serialize(), function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            initArCateList()
            layui.layer.msg(res.message)
            layui.layer.close(indexAdd)
        })
    })

    //通过代理的方式为 编辑按钮 添加点击 绑定事件
    var indexEdit = null
    $('tbody').on('click', '.btnEdit', function() {
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $('#loding-edit').html()
        });
        // console.log(1);

        var id = $(this).attr('data-id')
            // console.log(id);
        $.get('/my/article/cates/' + id, function(res) {
            form.val('form-edit', res.data)

        })



    })

    //通过代理的方式为form-edit 绑定提交事件
    $('body').on('submit', '#form-edit', function(e) {

        e.preventDefault()
        $.post('/my/article/updatecate', $(this).serialize(), function(res) {

            if (res.status !== 0) {
                return layui.layer.msg(res.message)

            }
            layui.layer.msg(res.message)
            layui.layer.close(indexEdit)

            initArCateList()

        })

        // var id = $(this).attr('data-Id')
        // $.ajax({
        //     method: 'POST',
        //     url: '/my/article/updatecate',
        //     data: $(this).serialize(),
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layui.layer.msg(res.message)
        //         }


        //         layui.layer.msg(res.message)
        //         layui.layer.close(indexEdit)
        //         initArCateList()

        //     }
        // })

    })
    $('tbody').on('click', '#btnDel', function() {

        var id = $(this).attr('data-id')
        console.log($(this));
        console.log($('#btnDel'));
        layui.layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.get('/my/article/deletecate/' + id, function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                layer.close(index);
                initArCateList()
            })


        });

    })


})