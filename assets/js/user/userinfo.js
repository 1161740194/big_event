let form = layui.form
function getUserInfo(){
    $.ajax({
        url: '/my/userinfo',
        success: function (res){
            form.val('formTest', res.data)
        }
    })


}
getUserInfo()

$('form').on('submit', function (e){
    e.preventDefault();
    let data = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: data,
        success: function (res){
            layer.msg(res.message)
            if(res.status === 0) {
                window.parent.getUser()
            }
        }
    })
})