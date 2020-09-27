$('.login a').click(function () {
    $('.login').hide().next().show()
})
$('.register a').click(function () {
    $('.register').hide().prev().show()
})

// 注册
$('.register form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data: data,
        success: function (res) {
            layer.msg(res.message)
            if (res.status === 0) {
                $('.register form')[0].reset()
                $('.register').hide().prev().show()
            }
        }

    })
})

let forms = layui.form
console.log(forms);
forms.verify({
    len: [/^\S{6,12}$/, '密码必须6到12位，且不能出现空格'],
    pass: function (val) {
        let pwd = $('.pwd').val()
        if (pwd != val) return '两次密码不一致'}
});

//登陆