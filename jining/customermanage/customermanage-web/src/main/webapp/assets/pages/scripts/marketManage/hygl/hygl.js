var yqyysyListyygl = function () {
    var configMap = {
        dataUrl: "customermanage/hygl/selectHygl",
        nowData:""
    };
    // 全局Dom
    var jqueryMap = {
        $container: null
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$container = $('#ypjshygl');
    };
    var initGridhygl = $('#hygl_table').DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth":false,
        "ajax": {
            "dataSrc": "aaData",
            "url":configMap.dataUrl,
            "method":"POST",
            "data":function (data) {
                data.ypmc=$("#ypmc").val();
                data.htmc=$("#htmc").val();
                data.hyry=$("#hyry").val();
            }
        },
        "columns": [
            {   class:"text-center",
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="che"  value="' + data + '"/>';
                }
            },
            {   class:"text-center",
                "data": "htbm",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }

            },
            {   class:"text-center",
                "data": "htmc",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }

            },
            {   class:"text-center",
                "data": "ypbm",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }

            },
            {   class:"text-center",
                "data": "ypmc",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }
            },
            {   class:"text-center",
                "data": "ypsl",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }

            },
            {   class:"text-center",
                "data": "ypzt",
                "render": function (data) {
                    if (data != "204") {
                        data = "已完成";
                    }
                        return data;

                }
            },
            {   class:"text-center",
                "data": "hyry",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }
            },
            {   class:"text-center",
                "data": "hysj",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }
            }
        ],
        "language": {
            "zeroRecords": "暂时没有数据",
            "infoEmpty": "无记录",
            "sEmptyTable": "暂时没有数据",
            "sInfoThousands":",",
            "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
        },
        "initComplete":function () {//加载完数据之后执行
            var hyglContainer = $("#hyglSearch");
            var hyglresetContainer = $("#hyglreset");
            var hyglhyglContainer = $("#hyglhyglUpdate");
            var khqzContainer = $("#btn_khqz");

            if(hyglContainer.length > 0){
                hyglContainer.off('click').on('click',hyglSeatch);
            }
            if(hyglresetContainer.length > 0){
                hyglresetContainer.off('click').on('click',hyglresetSeatch);
            }
            if(hyglhyglContainer.length > 0){
                hyglhyglContainer.off('click').on('click',hyglhyglSeatch);
            }
            if(khqzContainer.length > 0){
                khqzContainer.off('click').on('click',khqzSeatch);
            }
        }
    });
    var hyglSeatch = function () {
        initGridhygl.ajax.reload();
    }
    function openFileIIs(qzpath){
        try{
            var objShell=new ActiveXObject("WScript.Shell");
            var aa = objShell.Run(qzpath);
            objShell = null;
        } catch(e)
        {
            alert('找不到文件"'+qzpath+'"(或它的组件之一)。请确定路径和文件名是否正确.');
            alert(e);
        }
    }
    //客户签字
    var khqzSeatch = function () {
        openFileIIs("C:\\qianzidemo\\immortal.bat");
        kehuqz();
    }


    var kehuqz = function (){
        $('#ypjshygl').find('[name=che]:checked').each(function () {
            var el = $(this);
            var Row = el.parents('tr')[0];
            var Data = $("#hygl_table").dataTable().fnGetData(Row);
            var ypbm = Data.ypbm;
            console.log(ypbm)
            $.ajax({
                url: "customermanage/bglq/kehuqz?id="+ypbm,
                type: 'POST',
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message:"打开签字板",
                            type:"info"
                        });
                        initGridhygl.ajax.reload();
                    } else {
                        Messenger().post({
                            message: result.message,
                            type: 'danger'
                        });
                    }
                },
                error: function (result) {
                    $('#saveKhxx').html("保存");
                    Messenger().post({
                        message: '保存失败！',
                        type: 'danger'
                    });
                }
            });
        });
    };
    /*重置*/
    var hyglresetSeatch = function () {
        $("input").val("");
        initGridhygl.ajax.reload();
    }
    /*还样*/
    var hyglhyglSeatch = function () {
        $.ajax({
            url:"customermanage/hygl/hyglUpdate",
            type: 'POST',
            data:$("#hygl_form").serialize(),
            success:function () {
                Messenger().post({
                    message: '还样成功！'
                });
                initGridhygl.ajax.reload();
            },
            error:function () {
                Messenger().post({
                    message: '还样失败！'
                });
            }
        });
    }
}();