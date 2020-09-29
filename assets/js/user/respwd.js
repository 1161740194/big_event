let form = layui.form
form.verify({
    len: [/^\S{6,12}$/, '密码必须6到12位，且不能出现空格'],
    some: function (val){
        let oldPwd = $('input[name=oldPwd]').val()
        if(val === oldPwd) return '新旧密码相同'
    },
    every: function (val){
        let rePwd = $('input[name=newPwd]').val()
        if(val !== rePwd) return '两次密码不一致'
    }
})

$('form').on('submit', function (e){
    e.preventDefault();
    let data = $(this).serialize()
    $.ajax({
        type: "POST",
        url: "/my/updatepwd",
        data: data,
        success: function (res) {
            if(res.status === 0) {
                layer.confirm(`${res.message}，需要重新登陆？`, {icon: 3, title:'提示'}, function(index){
                    //do something
                   window.parent.location.href = '/login.html'
                  });
            }
        }
    });
})