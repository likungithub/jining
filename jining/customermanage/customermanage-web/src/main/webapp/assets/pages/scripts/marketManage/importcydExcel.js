var setInExcel = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        jd: 2,//默认精度为小数点后两位
        type: '',
        qywtGrid: null
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $selectSpgg: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$selectSpgg = $('#importcydExcel');
    };
    //委托单列表
    var initWtGrid = function () {
        configMap.qywtGrid = $('#wtdlist').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "ajax": {
                "url": "/customermanage/cydxxgl/getWtAll",
                "dataSrc": "aaData"
            },
            "columns": [
                {
                    "data": "wtid",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox" value="'+data+'" id="qywt_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "data": "wtid"
                },
                {
                    class:"text-center",
                    "data":"dwmc"
                },
                {
                    class:"text-center",
                    "data": "lxdh"
                },
                {
                    class:"text-center",
                    "data": "yzbm"
                },
                {
                    class:"text-center",
                    "data": "ypmc"
                },
                {
                    class:"text-center",
                    "data": "ypsl"
                },
                {
                    class:"text-center",
                    "data":  "if_sl",
                    render:function(d,t,r){
                        if(d == "1"){
                            d="已受理";
                        }else {
                            d="未受理";
                        }
                        return  d;
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
    var showRequest = function () {
        var fileDir = $("#upcydxxglFile").val();
        var suffix = fileDir.substr(fileDir.lastIndexOf("."));
        if ("" == fileDir) {
            App.alert({
                container: jqueryMap.$selectSpgg.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '选择需要导入的Excel文件！',
                icon: 'fa fa-warning'
            });
            return false;
        }
        else if (".xls" != suffix && ".xlsx" != suffix) {

            App.alert({
                container: jqueryMap.$selectSpgg.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '选择.xls格式的文件导入！',
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    }

    var seWt = function () {
        //定义一个数组接受勾选项
        var selectWt = []
        $("input[name='checkbox_checkbox']:checked",jqueryMap.$selectSpgg).each(function () {
            selectWt.push($(this).val())
        })
        if(selectWt.length==1){
            return true;
        }else {
            App.alert({
                container: jqueryMap.$selectSpgg.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请勾选一行委托',
                icon: 'fa fa-warning'
            });
            return false;
        }
    }
    /**
     * 下载模板
     */
    var importDown = function () {
        window.location.href = "/customermanage/cydxxgl/downloadCydExcel";
    }

    var subimtBtn = function (callback) {
        var re = showRequest();
        var selectWt = seWt();

        if (re && selectWt) {
            callback(false);
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在导入数据，请稍候...'
            });
            var form = $("form[id=formyqsbcgtz]");
            var wtinfo = $("[name='checkbox_checkbox']:checked")[0];
            var wtid = wtinfo.value;
            var options = {
                url: '/customermanage/cydxxgl/importCydExcel?wtid='+wtid,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    App.unblockUI(jqueryMap.$blockTarget);
                    if(data.success){
                        Messenger().post({
                            message:'导入成功',
                            type:'info'
                        })
                        callback(true);
                    }else{
                        Messenger().post({
                            message:'导入失败',
                            type:'error'
                        })
                        callback(false);
                    }
                },
                error: function () {
                    App.unblockUI(jqueryMap.$blockTarget);
                    Messenger().post({
                        message:'出错了',
                        type:'error'
                    })
                    callback(false);
                }
            };
            form.ajaxSubmit(options);
        } else {
            /*callback(false);*/
        }
    }


    return {
        // 初始化
        init: function (type) {
            setJqueryMap();
            initWtGrid();
            configMap.type = type;

            //下载模板
            $('#importDown').off('click').on('click', function () {
                importDown();
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },

        // 保存选择的货品信息，参数为回掉函数
        subimtBtn: function (callback) {
            subimtBtn(callback);
        }
    };
}();
