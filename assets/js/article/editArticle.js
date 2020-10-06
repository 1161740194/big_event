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

// 获取穿过来的id
let id = new URLSearchParams(location.search).get('id')

// 列表渲染
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        let html = template('render_cate', res)
        $('.select').append(html)
        // 更新渲染
        form.render('select');
        // 数据回填
        $.ajax({
            url: '/my/article/' + id,
            success: function (res) {
                if (res.status === 0) {
                    form.val('render', res.data);
                    initEditor();
                    $image.cropper('destroy').attr('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img).cropper(options);
                }
            }
        });
    }
});

$('button:contains("选择封面")').on('click', function () {
    $('input[type="file"]').click()
})

$('input[type=file]').on('change', function () {
    let file = this.files[0]
    let url = URL.createObjectURL(file)
    $image.cropper('destroy').attr('src', url).cropper(options);

})

$('form').on('submit', function (e) {
    e.preventDefault();
    let data = new FormData(this)
    // 获取富文本编辑器的内容，设置到formdat中
    data.set('content', tinyMCE.activeEditor.getContent())

    // 图片剪裁
    let canvas = $image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    });

    canvas.toBlob(function (blob) {
        // 剪裁后的图片追加到formdata中
        data.append('cover_img', blob)
        data.append('Id', id)
        $.ajax({
            type: 'POST',
            url: '/my/article/edit',
            data: data,
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message);
                if (res.status === 0) {
                    location.href = '/article/articleCates.html';
                }
            }
        })
    })
})