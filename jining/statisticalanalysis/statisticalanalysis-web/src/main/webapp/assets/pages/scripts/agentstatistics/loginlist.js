/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment, jQuery, bootbox, _ */
var chargeView = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/agentstatistics/loginlist',
        viewPageUrl: '/log/LoginLog/view.jsp',
        dljgbm: '',
        chargeGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看日志信息"><i class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize"></i></a>'
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $content: null,
        $chargeDialog: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#agentloginlist');
    };
    //初始化表格
    var initchargeGrid = function () {
        configMap.chargeGrid = $('#charge_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    var starDate=$('[name="starDate"]',jqueryMap.$content).val();
                    var endDate=$('[name="endDate"]',jqueryMap.$content).val();
                    var zydm=$('[name="username"]',jqueryMap.$content).val();
                    var dljgbm = configMap.dljgbm;
                    data.starDate = starDate;
                    data.endDate = endDate;
                    data.zydm = zydm;
                    data.dljgbm = dljgbm;
                }
            },
            "columns": [
                {
                    "data": "logintime",
                    "render": function (data, type, row) {
                        if (data != null) {
                            return moment(data).format('YYYY-MM-DD HH-mm-ss');
                        } else {
                            return "";
                        }
                    }
                },
                {
                    "data": "outtime",
                    "render": function (data, type, row) {
                        if (data != null) {
                            return moment(data).format('YYYY-MM-DD HH-mm-ss');
                        } else {
                            return "";
                        }
                    }
                },
                {
                    className: 'text-center',
                    "data": "personname"
                },
                {
                    className: 'text-center',
                    "data": "logintype",
                    "render":function (data, type, row){
                        var name="";
                        if (data === "001") {
                            name = "PC";
                        } else if (data === "002") {
                            name = "Android";
                        } else if (data === "003") {
                            name = "IOS";
                        }
                        return name;
                    }
                },
                {
                    className: 'text-center',
                    "render": function (data, type, row) {
                        return configMap.viewBtn_html;
                    }
                }
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var viewContainer = jqueryMap.$content.find('[data-type="view"]');// $('[data-type="view"]');
                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewLog);
                }
            }
        });
    };

    var viewLog = function () {
        var el = $(this);
        var rowIndex = configMap.chargeGrid.cell(el.parent()).index().row;
        var id = configMap.chargeGrid.row(rowIndex).data().id;
        openModal("查看日志信息", configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {
            cancel: {
                label:'<i class="fa fa-times iconMr"></i> 关&nbsp;闭 ',
                className: 'btn btn-default borderRadius4'
            }
        };
        if (type === 'select') {
            dialogButtons.success = {
                label: "确定",
                className: "btn-success",
                callback: function () {
                    jqueryMap.$logDialog.modal('hide');
                    return false;
                }
            };
        }
        $.get(url, function (html) {
            jqueryMap.$logDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                className:"loginlog-m"
            });
        });
    };

    var getZY = function (){
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/" + configMap.dljgbm,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                var optionhtml = '<option value=>全部</option>';
                for(var i = 0;i<datas.length;i++){
                    optionhtml += '<option value="'+datas[i].zydm+'">'+datas[i].name+'</option>'
                }
                $('[name="username"]').append(optionhtml);
            }
        });
    }

    return {
        // 初始化
        init: function (dljgbm) {
            configMap.dljgbm = dljgbm;
            setJqueryMap();
            //获取所选代理机构的全部职员
            getZY();
            jqueryMap.$content.find('.beginTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true,
            });
            jqueryMap.$content.find('.endTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true,
            });
            initchargeGrid();
            $('.Search-btn',jqueryMap.$content).off('click').on('click',function (){
                configMap.chargeGrid.ajax.reload();
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=edit.js