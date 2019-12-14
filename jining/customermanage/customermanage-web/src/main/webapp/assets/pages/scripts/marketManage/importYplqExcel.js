var setInExcelYplq = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        jd: 2,//默认精度为小数点后两位
        type: '',
        yplqdyGrid: null
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
    //样品列表
    var initWtGridYplq = function () {
        configMap.yplqdyGrid = $('#wtdlist').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "ajax": {
                "url": "customermanage/datatable/selectyplq",
                "dataSrc": "aaData",
                "data":function (data) {
                    data.ksrq=$('#ksrq').val();
                    data.jsrq=$('#jsrq').val();
                },
            },
            "columns": [
                {
                    class:"text-center",
                    "data": "lrrq"
                },
                {
                    class:"text-center",
                    "data":"ypmc"
                },
                {
                    class:"text-center",
                    "data": "scdw"
                },
                {
                    class:"text-center",
                    "data": "syry"
                },
                {
                    class:"text-center",
                    "data": "wtid"
                },
                {
                    class:"text-center",
                    "data": "ypbm"
                },
                {
                    class:"text-center",
                    "data": "ypsl"
                },
                {
                    class:"text-center",
                    "data": "bysl"
                },
                {
                    class:"text-center",
                    "data": "jsr"
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
                var cxyplqContainer = $("#btn_cxyplq");//查询
                if(cxyplqContainer.length > 0){
                    cxyplqContainer.off('click').on('click', findBtnYplq);
                }

            }
        });
    };
    /*条件查询*/
    var findBtnYplq = function (){
        configMap.yplqdyGrid.ajax.reload();
    }



    return {
        // 初始化
        init: function (type) {
            setJqueryMap();
            initWtGridYplq();
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
