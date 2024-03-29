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
        jqueryMap.$selectSpgg = $('#importjcxmExcel');
    };

    var showRequest = function () {
        var fileDir = $("#upjcxmFile").val();
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

    /**
     * 下载模板
     */
    var importDown = function () {
        window.location.href = "/customermanage/jcb/downloadJcxmExcel";
    }

    var subimtBtn = function (callback) {
        var re = showRequest();
        
        if (re) {
            callback(false);
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在导入数据，请稍候...'
            });
            var form = $("form[id=formjcxmb]");
            var options = {
                url: '/customermanage/jcb/importJcxmbExcel',
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
            // callback(false);
        }
    }


    return {
        // 初始化
        init: function (type) {
            setJqueryMap();
            configMap.type = type;

            //下载模板
            $('#importDownJcxm').off('click').on('click', function () {
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
