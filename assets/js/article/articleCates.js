// 获取文章分类列表
let laypage = layui.laypage
let form = layui.form
let data = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: '',

}
function renderCates(){
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res){
            let html = template('tpl-list', res)
            $('tbody').html(html)
            showPage(res.total)
        }
    })
}
renderCates()

// 分页器
function showPage(ct){
  laypage.render({
    elem: 'page', 
    count: ct,
    limit: data.pagesize,
    limits: [3,6,9],
    curr: data.pagenum,
    layout: ['count','prev', 'page', 'next', 'limit', 'skip'],
    jump : function (obj, first){
        if(!first) {
            data.pagenum = obj.curr
            data.pagesize = obj.limit
            renderCates()
        }
    }
  });
}

// 渲染筛选
$.ajax({
    url: '/my/article/cates',
    success: function (res){
        // console.log(res);
        let html = template('filter', res)
        $('select[name=cate_id]').html(html)
        form.render('select');
    }
})

$('.filter').submit(function (e){
    e.preventDefault();
    let selectData = $(this).serializeArray()
    data.cate_id = selectData[0].value
    data.state = selectData[1].value

    data.pagenum = 1
    renderCates()
})

// 删除文章

$('body').on('click', 'button:contains("删除")', function (){
    let id = $(this).data('id')
    layer.confirm('确定删除么', function (index){

        $.ajax({
            url: '/my/article/delete/' + id,
            success: function (res){
                layer.msg(res.message)
                if(res.status === 0) {
                    renderCates()
                }
            }
        })

        layer.close(index)
    })
})