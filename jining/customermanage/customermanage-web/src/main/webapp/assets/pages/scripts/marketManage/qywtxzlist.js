/**
 *
 */
var qywtxzlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/zfwt/getQywtAll',
        addUrl:'/marketManage/qywt_jbxx.jsp',
        addUrl2:'/zfwt/toqywt',
        addJcxUrl:'/marketManage/jcxmlist.jsp',
        importUrl:'/marketManage/importExcel.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        qywtGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改企业委托信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除企业委托信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        qywt : '',
        wttype:'',
        printBqdy:'/zfwt/qywtdybq'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $container:null,
        $wtManageDataTable: null,
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#wtList-manager-content');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#qywtxz' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#qylist_data');
        jqueryMap.$wtManageDataTable = $('#qylist_data', jqueryMap.$container);
    };

    var qywtjson = [];
    var ypxxjson = [];


    var initQywtGrid = function () {
        configMap.qywtGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.searchText = $('[name="wtdwmc"]',jqueryMap.$content).val();
                    data.searchText1 = $('[name="ypmc"]',jqueryMap.$content).val();
                    data.type = configMap.wttype;
                    data.ypbm = $('[name="ypbm"]',jqueryMap.$content).val();
                    data.ny = $('[name="wtny"]',jqueryMap.$content).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_qywtxz" value="'+data+'" id="qywt_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydbm"
                },
                {
                    class:"text-center",
                    "data":"wtdw"
                },
                {
                    class:"text-center",
                    "data": "wtdwdh"
                },
                {
                    class:"text-center",
                    "data": "ypbm"
                },
                {
                    class:"text-center",
                    "data": "ypmc"
                },
                {
                    class:"text-center",
                    "data": "ypsl"
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
        init: function (uuid) {
            setJqueryMap(uuid);

            jqueryMap.$content.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            jqueryMap.$content.find('.endTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            initQywtGrid();

            //查询
            $("#qywtSearch",jqueryMap.$content).off('click').on('click',function (){
                configMap.qywtGrid.ajax.reload();
            });


        },
        setPath: function (path) {
            configMap.path = path;
        },
        setType: function (type) {
            configMap.wttype = '001';
        },
        reload: function () {
            configMap.qywtGrid.ajax.reload();
        }
    };
}();
//@ sourceURL=contractlist.js
	
	