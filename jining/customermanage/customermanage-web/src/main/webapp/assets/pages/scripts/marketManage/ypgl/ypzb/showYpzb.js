var zbkszb = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        jcxmids: [],
        ckeds:[],
        ids: [],
        id: '',
        path: '',
        uuid: '',
        initGridypjcedit: null,
        xlz: null,
        m_bzwz :'',
        zbzs:'0',
        ypids: "",
        zbksid:'',
        wtids:'',
        ypmcs:''
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $container: null,
        $editForm: null,
        $Dialogts:null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$container = $('#' + configMap.uuid + '-ypjcEdit-container');
        jqueryMap.$editForm = $('#' + configMap.uuid + 'editForm');
    };

    function delnull(d) {
        if (d == undefined) {
            return '';
        }
        if (d == 'null') {
            return '';
        }
        return d;
    }

    var initlistGrid = function () {
        configMap.initGridypjcedit = $('#ManagerList_ypjcedit', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "dataSrc": "aaData",
                "url":  "customermanage/ypglZbxx/getKsList?ypids="+configMap.id,
                "method": "POST",
                "data": function (data) {
                }
            },
            "columns": [
                {
                    class: "text-center",
                    "data": "zbks_dm",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        configMap.zbksid = data;
                        return '<input type="hidden" name="zbks_dm"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbzs",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        if((data*1)>0)
                        {
                            configMap.zbzs =data;
                        }
                        return '<input type="hidden" name="zbzs"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbks_mc",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbzl",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        if(configMap.zbksid=='999')//说明是总数量
                        {
                            data = configMap.zbzs;
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
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
            "drawCallback": function () {//加载完数据之后执行
                var tootip1Container = $('[data-toggle="tooltip"]', jqueryMap.$container);
                if (tootip1Container.length > 0) {
                    tootip1Container.tooltip();
                }
            }
        });
    };


    return {
        // 初始化
        init: function (id, uuid) {
            configMap.id = id;
            configMap.uuid = uuid;
            setJqueryMap();
            initlistGrid();

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        getBzwz:function(){
            return configMap.m_bzwz;
        },
        setData:function(ypids,wtids,ypmcs){
            configMap.ypids =ypids;
            configMap.wtids =wtids;
            configMap.ypmcs =ypmcs;
        }
    };
}();
