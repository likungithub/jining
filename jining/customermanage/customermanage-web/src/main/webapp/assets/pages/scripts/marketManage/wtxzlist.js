/**
 *
 */
var wtxzlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/zfwt/getZfwtAll',//控制层映射
        // addUrl:'/marketManage/zfwt_jbxx.jsp',//添加政府委托信息的路径
        addUrl:'/zfwt/tozfwt',
        addJcxUrl:'/marketManage/jcxmlistcy.jsp',
        importUrl:'/marketManage/importExcel.jsp',//引入表格的路径
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        zfwtGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改抽样单信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除抽样单信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        classType: '',
        fwzt: '',
        other: '',
        qywt : '',
        printBqdy:'/zfwt/qywtdybq'
    };

    // 全局Dom
    var jqueryMap = {
        $ManageDialog:null,
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $container:null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#wtxz' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data_wtxz');
        jqueryMap.$container = $('#wtxz' + uuid);
    };

    var initZfwtGrid = function () {
        configMap.zfwtGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.searchText1 = $('[name="cydbh"]',jqueryMap.$content).val();
                    data.searchText2 = $('[name="ypmc"]',jqueryMap.$content).val();
                    data.searchText3 = $('[name="bcjdwmc"]',jqueryMap.$content).val();
                    data.ny = $('[name="wtny"]',jqueryMap.$content).val();
                    data.cydh ="";
                }
            },
            "columns": [
                {
                    "data": "wtid",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_wtxz" value="'+data+'" id="wtid_' + data + '"/>';
                    }
                },
                {
                	class:"text-center",
                	"data": "cydbm"
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
                    "data": "sjdw"
                },
                {
                    class:"text-center",
                    "data": "scdw"
                },
                {
                    class:"text-center",
                    "data": "wtdw"
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

            initZfwtGrid();
            //查询
            $("#wtxzSearch",jqueryMap.$content).off('click').on('click',function (){
                configMap.zfwtGrid.ajax.reload();
            });

        },

        setPath: function (path) {
            configMap.path = path;
        },
        reload: function () {
            configMap.zfwtGrid.ajax.reload();
        }
    };
}();
//@ sourceURL=contractlist.js
	
	