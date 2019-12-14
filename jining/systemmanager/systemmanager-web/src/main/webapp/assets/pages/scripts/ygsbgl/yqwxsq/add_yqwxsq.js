var init =function(){
    var initGrid = $('#ManagerList_m').DataTable( {
        "processing": true,
        "serverSide": true,
        "sAjaxDataProp":"",
        'ordering':false,
        "order": [],
        "bFilter": false,
        "bSort": true, //排序功能
        "bInfo":false,//是否显示是否启用底边信息栏
        "sAjaxSource": "systemmanager/yqwhjl/findall1",
        'autoWidth': false,
        'pagingType': 'full_numbers',
        "language": {
            'lengthMenu': '每页显示 _MENU_ 记录',
            'zeroRecords': '没有数据 - 抱歉',
            'info': ' 第_PAGE_ 页/共 _PAGES_页',
            'infoEmpty': '没有符合条件的记录',
            'search': '查找',
            'infoFiltered': '(从  _MAX_ 条记录中过滤)',
            'paginate': { "first":  "首页 ", "last": "末页", "next": "下一页","previous": "上一页"}

        },
        "columns": [
            { "data": "id" },
            { "data": "scrq" },
            { "data": "name" },
            { "data": "whr" },
            { "data": "whrq" },
            { "data": "whnr" },
            { "data": "zt" },
            { "data": "bzxx" },
            {
                "data":"id",
                "render":function (data,type,row) {
                    return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp' +
                    '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>'
                }
            }

        ],
        "initComplete":function () {//加载完数据之后执行
            var editContainer = $("#ManagerList_m").find('[name="contractedit"]');
            var deleteContainer = $("#ManagerList_m").find('[name="contractdelete"]');

            if(deleteContainer.length > 0){
                deleteContainer.off('click').on('click', deleteBtn);
                initGrid.ajax.reload();
            }
            if (editContainer.length > 0){
                editContainer.off('click').on('click', editBtn);
                initGrid.ajax.reload();
            }
        }
    } );
    //刷新
 /*   setTimeout(function () {
        $('#ManagerList_m').dataTable().ajax.load();
    },3000);*/
    //删除
   var deleteBtn = function (){
      var d = $(this);
       var Row = d.parents('tr')[0];
       var Data = $("#ManagerList_m").dataTable().fnGetData(Row)
        $.ajax({
            url:"systemmanager/yqwhjl/delete",
            type: 'POST',
            data:Data,
            dataType:"json",
            success:function () {
                alert("删除成功")
            },
            error:function () {
                alert("删除失败")
            }
        });
   }
   //修改
    var editBtn = function () {
       //显示模态框
        $("#myModal2").modal({show:true});
        var d = $(this);
        var Row = d.parents('tr')[0];
        var Data = $("#ManagerList_m").dataTable().fnGetData(Row);
        console.log(findone(Data))
        findone(Data)
        $("#tijiao").off('click').on('click',function () {
            $.ajax({
                url:"systemmanager/yqwhjl/update",
                type: 'POST',
                data:$("#addUser-form-datas").serialize(),
                dataType:"json",
                success:function () {
                    alert("更新成功")

                    $("#myModal2").modal('hide');
                },
                error:function () {
                    alert("更新失败")
                }
            });
        });


    }
    //查询一个
    var findone = function (data) {
        $.ajax({
            url:"systemmanager/yqwhjl/findone",
            data:data,
            type:"POST",
            dataType:"json",
            success:function (data) {
                callBack(data)

            }
        });
    }
    //数据回显
    var callBack = function (data) {
       console.log(data)
        $("#dh").val(data.id);
        $("#mc").val(data.name);
        $("#sqrq").val(data.sqrq);
        $("#whrq").val(data.whrq);
        $("#whr").val(data.whr);
        $("[name='zt'][value="+data.zt+']').attr("checked",true);
        $("#whnr").val(data.whnr);
    }

}();

