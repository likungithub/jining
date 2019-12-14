var yqyysyListypjc = function () {
    var configMap = {
        path: '',
        uuid:'',
        dataUrl: "customermanage/ypjc/ypjcEdit",
        nowData:"",
    };

    var initGridypjcedit = $('#ManagerList_ypjcedit').DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth":false,
        "ajax": {
            "dataSrc": "aaData",
            "url":"customermanage/ypjc/ypjcEdit",
            "method":"POST",
            "data":function (data) {
                /*data.ypmc=$("#ypmc").val();
                data.htmc=$("#htmc").val();*/
                data.ypid1=$('[name="checkbox_checkbox"]:checked').val();
            }
        },
        "columns": [
            {   class:"text-center",
                "data": "jcxmid",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="ypjcche"  value="' + data + '"/>';
                }
            },
            {   class:"text-center",
                "data": "ypid"

            },
            {   class:"text-center",
                "data": "zwmc"

            },
            {   class:"text-center",
                "data": "jcz",
                "render": function (data, type, row) {
                    if(data!= null){
                        return '<input type="text" name="che"  value=' + data + '>';
                    }else{
                        return '<input type="text" name="che">';
                    }
                }
            },
            {   class:"text-center",
                "data": "wd",
                "render": function (data, type, row) {
                    if(data!= null){
                        return '<input type="text" name="che"  value=' + data + '>';
                    }else{
                        return '<input type="text" name="che">';
                    }
                }

            },

            {   class:"text-center",
                "data": "sd",
                "render": function (data, type, row) {
                    if(data!= null){
                        return '<input type="text" name="che"  value=' + data + '>';
                    }else{
                        return '<input type="text" name="che">';
                    }
                }

            },
            {   class:"text-center",
                "data": "ypjczt"

            },
            {   class:"text-center",
                "data": "name",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }
            },
            {   class:"text-center",
                "data": "jcx"

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
            /*var yycxContainer = $("#yycxSearch");

            if(yycxContainer.length > 0){
                yycxContainer.off('click').on('click',yycxSeatch);
            }*/
        }
    });
    /*var save = function (callback) {
        /!*练习模态框传值*!/
        if ($("input[type='checkbox']:checked", jqueryMap.$content).length == 0) {
            Messenger().post("请选择一条数据");
            return;
        }
        var dd = $("[name='ypjcche']:checked")[0];
        var rowIndex = $("#ManagerList_ypjcedit").cell($(dd).parent().parent()).index().row;
        var data1 = $("#ManagerList_ypjcedit").row(rowIndex).data();
        alert("1233");
    }*/
    /*var yycxSeatch = function () {
        initGridyycx.ajax.reload();
    }*/
}();