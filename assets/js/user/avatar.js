let $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

$image.cropper(options);

$('button:contains("上传")').on('click', function (){
    $('input[type=file]').trigger('click')
})
$('input[type=file]').on('change', function (){
    let file = this.files[0]
    let url = URL.createObjectURL(file)
    $image.cropper('destroy').attr('src', url).cropper(options);

})

$('button:contains("确定")').on('click', function () {
    let dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    let str = dataURL.toDataURL('image/png')
    console.log(str);
    $.ajax({
        type: 'POST', 
        url: '/my/update/avatar',
        data: {avatar: str},
        success: function (res){
            layer.msg(res.message)
            if(res.status === 0) {
                window.parent.getUser()
            }
        }
    })
})