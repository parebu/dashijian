$(function() {

    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能和旧密码一样'
            }


        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一样'
            }

        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();

        // $.ajax({
        //         method: 'post',
        //         url: '/my/updatepwd',
        //         data: $(this).serialize(),
        //         success: function(res) {

        //             if (res.status !== 0) {
        //                 return layui.layer.msg(res.message)
        //             }

        //             layui.layer.msg(res.message)
        //$('.layui-form')[0].reset()
        //         }

        //     })
        $.post('/my/updatepwd', $('.layui-form').serialize(), function(res) {
            if (res.status !== 0) {
                console.log(res);
                return layui.layer.msg(res.message)
            }
            console.log(res);
            layui.layer.msg(res.message)
            $('.layui-form')[0].reset()
        })

    })
})