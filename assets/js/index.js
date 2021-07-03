$(function() {
    getUserInfo()
    var layer = layui.layer
    $('#btn').on('click', function() {
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function(index) {
            //do something

            //清空本地存储中的token

            localStorage.removeItem('token')
                // 重新跳转到登陆页面
            location.href = '/login.html'
                // 关闭confirm 询问框
            layer.close(index);
        })
    })
})

function getUserInfo() {
    $.ajax({

        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },

        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar（）函数渲染用户的头像
            renderAvatar(res.data)
        },
        //不论成功还是失败 最终都会调用complete 回调函数
        // complete: function(res) {
        //     // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //     //     // 1.强制清空token
        //     //     localStorage.removeItem('token')
        //     //         //强制跳转到登陆页面
        //     //     location.href = '/login.html'
        //     // }
        // }

    })
}
//渲染用户头像
function renderAvatar(data) {
    //获取用户名称
    var name = data.nickname || data.username
        //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 3.按需渲染用户头像

    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }


}