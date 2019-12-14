var ypzbCkJcxm = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        jd: 2,//默认精度为小数点后两位
        ypid: '',
        qywtGrid: null,
        form:''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $selectSpgg: null
    };

    var setJqueryMap = function () {
    };
    //委托单列表
    var initWtGrid = function () {
        configMap.qywtGrid = $('#ckjcxmlist_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "scrollX":true,//水平滚动
            "ajax": {
                "url": "customermanage/jcxm/getJcxmList",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypid = configMap.ypid;
                    data.jcxm = '';
                    data.yl = '';
                    data.xl = '';
                    data.jclbdm = '';
                }
            },
            "columns": [
                {
                    class:"text-center",
                    "data": "jclbdm",
                    "render": function (data, type, row) {
                        if(data=="001"){
                            data="食品";
                        } else if(data=="002"){
                            data="药品";
                        } else if (data=="003"){
                            data="农产品";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "zwmc_bm",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcx",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "xlz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jldw",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    "data":"cpdlmc",
                    class:"text-center",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "yl",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cyl",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "xl",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "jcfa",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cpdldm",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jclbdm",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "pdyj",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "pdyjmc",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zm",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bl",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_pd",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bjf",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "pdnh",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "xlzmrz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcyj",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcyjmc",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_cma",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_cmaf",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_cnas",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_catl",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bzffjcxdw",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bzzxyxx",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bzzxyxxdw",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bzzdyxx",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bzzdyxxdw",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "wswnz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "wswmz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "wswcz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_xtpd",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jg",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_bzff",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbzl",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbzldw",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "yyckjz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
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
            "drawCallback": function () { // 数据加载完成后执行

            }
        });
    };

    return {
        // 初始化
        init: function (ypid) {
            configMap.ypid = ypid;
            configMap.form = 'ypzbs';
            setJqueryMap();
            initWtGrid();
            console.log(configMap.ypid);
            console.log(configMap.form);



        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        }
    };
}();
