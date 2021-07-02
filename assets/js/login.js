$(function() {

    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()

    })
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()

        })
        // 从layui中获取form对象

    var form = layui.form
    var layer = layui.layer
        //通过form.verify（）函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一直的规则

        repwd: function(value) {

            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败 则return一个提示消息即可

            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name = username]').val(),
            password: $('#form_reg [name = password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#link_login').click()
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.post('/api/login', {
            username: $('#form_login [name = username]').val(),
            password: $('#form_login [name = password]').val()
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登陆成功')
            localStorage.setItem('taken', res.taken)
            location.href = '/index.html'
        })
    })

})