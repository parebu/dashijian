$.ajaxPrefilter(function(options) {

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.indexOf(/my/) !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token')
                //强制跳转到登陆页面
            location.href = '/login.html'
        }
    }
})