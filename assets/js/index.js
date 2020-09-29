// 获取个人信息
function getUser() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                let user = res.data.nickname || res.data.username
                let first = res.data.username.substr(0, 1).toUpperCase()
                $('.username').text(user)
                res.data.user_pic ? $('.layui-nav-img').attr('src', res.data.user_pic).show() : $('.avatar').text(first).css('display', 'inline-block')
            }
        }
    })
}
getUser()

$('.logout').click(function () {
    layer.confirm('你确定要退出么？', {
        icon: 3,
        title: '提示'
    }, function (index) {
        localStorage.removeItem('token')
        location.href = '/login.html'

        layer.close(index);
    });


})