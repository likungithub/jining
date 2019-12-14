var yqyysyListyycx = function () {
    var configMap = {
        dataUrl: "customermanage/yycx/yycx",
        nowData:"",
    };
    var initGridyycx = $('#yycx_tname').DataTable({
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
            }
        },
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="che"  value="' + data + '"/>';
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
                "data": "ypdw",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }

            },
            {   class:"text-center",
                "data": "ypbctj",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }

            },
            {   class:"text-center",
                "data": "cczq",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }
            },
            {   class:"text-center",
                "data": "bzq",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }

            },
            {   class:"text-center",
                "data": "ypjczt",
                "render": function (data) {
                    if(data=='001'){
                        data="未检测"
                    }
                    if(data=='002'){
                        data="检测通过"
                    }
                    if(data=='003'){
                        data="检测未通过"
                    }
                    return data;
                }

            },
            {   class:"text-center",
                "data": "clfs",
                "render": function (data) {
                    if(data=='0'){
                        data="不返还"
                    }
                    if(data=='1'){
                        data="返还"
                    }
                    return data;
                }
            },
            {   class:"text-center",
                "data": "bzxx",
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
            var yycxContainer = $("#yycxSearch");

            if(yycxContainer.length > 0){
                yycxContainer.off('click').on('click',yycxSeatch);
            }
        }
    });
    var yycxSeatch = function () {
        initGridyycx.ajax.reload();
    }
}();