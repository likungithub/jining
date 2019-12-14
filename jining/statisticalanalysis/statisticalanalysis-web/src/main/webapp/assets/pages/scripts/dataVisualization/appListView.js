var appListView = function () {

    var configMap = {
        path: '',
        dataUrl: '/welcome/getAPPDLData',
        stepaddUrl:'/processManage/addBzxx',
        stepeditUrl:'/processManage/updatebzxx',
        getBzxxUrl:'/processManage/queryjbxx/',
        addUrl:'/processManage/addProcess',
        getAllBzxx : '/processManage/querybzxx_lcid/',
        delUrl: '/processManage/deljbxx/',
        editUrl:'/processManage/updatejbxx/',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        statusUrl: '/contractaudit/status',
        appListGrid: null,
        statusredis: null,
        fsbz: 0,
        lcid:null,
        step:0,
        viewGrid:null,
        type:1
    };
    var htbmjson = [];

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $contractauditstarDate: null,
        $contractauditendDate: null,
        $content: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        // jqueryMap.$content = $('#processmanagement');
        jqueryMap.$manualdata = $('.cusAndMesTab table.listTable');
        // jqueryMap.$contractauditstarDate=jqueryMap.$content.find('div#starDate_div');
        // jqueryMap.$contractauditendDate=jqueryMap.$content.find('div#endDate_Div');
    };




    var initappListGrid = function () {
        // var data = initPorcessmanagementData();
        configMap.appListGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "ajax": {
                "url": configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.type = configMap.type;
                }
            },
            "columns": [
                {
                    "data": "loginaccount"
                },
                {
                    "data": "personname"
                },
                {
                    "data": "logintime",
                    "render": function (data, type, row) {
                        return moment(data)
                            .format('YYYY-MM-DD');
                    }
                },
                {
                    "data": "logintype"
                },
                {
                    "data": "ip"
                },{
                    "data": "dljg_bm"
                },
                {
                    "data": "dljg_mc"
                },

            ],
            "language": {
                // url: configMap.path + configMap.datatablesLanguageFile,
                "zeroRecords": "暂时没有客户",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有客户",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            }
        });
    };

//进入页面查询列表
    var initPorcessmanagementData = function () {

        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: configMap.dataUrl,
            dataType: 'JSON',
            type: 'get',
            // data: JSON.stringify(data),
            success: function (datas) {
                configMap.porcessmanagementGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    configMap.porcessmanagementGrid.rows.add(datas).draw();
                    // return datas;
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };


    return {
        init: function () {
            localStorage.clear();
            setJqueryMap();

            initappListGrid();

            $(".clickTab li").on("click",function () {
                if($(this).attr("data") == 1){
                    configMap.type = 1;
                    configMap.appListGrid.ajax.reload();
                }else{
                    configMap.type = 0;
                    configMap.appListGrid.ajax.reload();
                }
            })
        },

        setPath: function (path) {
            configMap.path = path;
        }
    };
}();