let $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

$image.cropper(options);

let form = layui.form
// 获取分类
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        if (res.status === 0) {
            let html = template('render_cate', res)
            $('.select').append(html)
            form.render('select')
            // 富文本编辑器
            initEditor()
        }
    }
})

$('button:contains("选择封面")').on('click', function (){
    $('input[type="file"]').click()
})

$('input[type=file]').on('change', function (){
    let file = this.files[0]
    let url = URL.createObjectURL(file)
    $image.cropper('destroy').attr('src', url).cropper(options);

})

$('form').on('submit', function (e){
    e.preventDefault();
    let data = new FormData(this)
    data.set('content', tinyMCE.activeEditor.getContent())

    let canvas = $image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    });
    canvas.toBlob(function (blob){
        data.append('cover_img', blob)
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: data,
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message);
                if (res.status === 0) {
                    location.href = '/article/article.html';
                }
            }
        })
    })
})
