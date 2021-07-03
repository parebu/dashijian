$(function() {
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })

    getuser()
    var layer = layui.layer

    function getuser() {
        $.get(
            "/my/userinfo",
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.messaga)
                }
                // console.log(res);
                form.val('userInfo', res.data)
            }
        )
    }

    //重置表单的数据
    $('#btnReset').on('click', function(e) {
            e.preventDefault();
            getuser()
        })
        // 更新用户信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.post('/my/userinfo', $(this).serialize(), function(res) {
            if (res.status !== 0) {
                return layer.msg('res.message')

            }
            layer.msg(res.message)
            window.parent.getUserInfo()
        })

    })
})