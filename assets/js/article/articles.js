
function renderCates(){
    $.ajax({
        url: '/my/article/cates',
        success: function (res){
            console.log(res);
            let html = template('tpl-list', res)
            // document.getElementsByTagName('tbody')[0].innerHTML = html
            $('tbody').html(html)
        }
    })
}
renderCates()

let addIndex; 
$('.add-cates').click(function (){
    addIndex =  layer.open({
        type: 1, 
        title: '添加文章分类',
        content: $('#add-cates').html(), //这里content是一个普通的String
        area: ['500px', '250px']
      });
})

$('body').on('submit', '.add-form', function (e){
    e.preventDefault();
    let data = $(this).serialize()
    // console.log(data);
    $.ajax({
        url: '/my/article/addcates',
        type: 'POST',
        data: data,
        success: function (res){
            console.log(res);
            layer.close(addIndex)
            renderCates()
            
        }
    })
    
})

    




































// let form = layui.form

// // 渲染列表
// function renderArticle() {
//     $.ajax({
//         url: '/my/article/cates',
//         success: function (res) {
//             if (res.status === 0) {
//                 let html = template('tpl-list', res)
//                 $('tbody').html(html)
//             }
//         }
//     })
// }
// renderArticle()

// // 显示添加框

// let addIndex;
// $('.add-cates').click(function () {
//     addIndex = layer.open({
//         type: 1,
//         title: '添加文章分类',
//         content: $('#add-cates').html(), //这里content是一个普通的String
//         area: ['500px', '250px']
//     });
// })

// // 点击添加内容

// $('body').on('submit', '.add-form', function (e) {
//     e.preventDefault();
//     let data = $(this).serialize()
//     $.ajax({
//         type: 'POST',
//         url: '/my/article/addcates',
//         data: data,
//         success: function (res) {
//             layer.msg(res.message)
//             if (res.status === 0) {

//                 renderArticle()
//                 layer.close(addIndex)
//             }
//         }
//     })
// })

// // 删除分类


// $('body').on('click', 'button:contains("删除")', function () {
//     let delIdx = $(this).data('id')
//     layer.confirm('你确定要删除？', {
//         icon: 3,
//         title: '提示'
//     }, function (index) {
//         //do something
//         $.ajax({
//             url: '/my/article/deletecate/' + delIdx,
//             success: function (res) {
//                 layer.msg(res.message)
//                 if (res.status === 0) {
//                     renderArticle()
//                 }
//             }
//         })
//         layer.close(index);
//     });
// })

// // 编辑分类框，数据回填
// let editIndex ;
// $('body').on('click', 'button:contains("编辑")', function () {
//     let data = $(this).data()
//     data.Id = data.id
//     // console.log(data);
//     editIndex = layer.open({
//         type: 1,
//         title: '修改文章分类',
//         content: $('#edit-cates').html(), //这里content是一个普通的String
//         area: ['500px', '250px']
//     });
//     form.val('edit', data)
// })

// // 确认修改
// $('body').on('submit', '.edit-form', function (e){
//     e.preventDefault();
//     let data = $(this).serialize()
//     $.ajax({
//         type: 'POST',
//         url: '/my/article/updatecate',
//         data: data,
//         success: function (res){
//             layer.msg(res.message)
//             if(res.status === 0) {
//                 renderArticle()
//                 layer.close(editIndex)
//             }
//         }

//     })
// })