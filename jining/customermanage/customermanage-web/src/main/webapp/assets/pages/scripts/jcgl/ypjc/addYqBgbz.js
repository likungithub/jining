var addYqjcListz = function () {
// 全局属性参数
    var configMap = {
        dataUrl:'customermanage/ypjc/findYpYq',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        addYqGrid: null,
        uuid:'',
        ypid:''
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $ypManageDialog:null,
    };
    //赋值
    var setJqueryMap = function(uuid) {
        jqueryMap.$container = $('#'+uuid+'-manager-container');
        jqueryMap.$blockTarget = $('body');
    };
    var initlistGrid = function() {
        configMap.addYqGrid = $("#addYq_ManagerList",jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url":configMap.dataUrl,
                "dataSrc": "aaData",
                "method": "POST",
                "data": function (data) {
                    data.sbmc = $("#addYq_sbmc",jqueryMap.$container).val();
                    data.skbh = $("#addYq_skbh",jqueryMap.$container).val();
                    data.ypid = configMap.ypid;
                }
            },
            "columns": [
                {
                    class:"text-left",
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="yqids" value="'+data+'"/>';
                    }
                },
                {
                    class:"text-left",
                    "data": "sbmc",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data":"ggxh",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "skbh",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "zqddj",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "sbyz",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
            }
        });
    }

    return{
        init:function (uuid,ypid) {
            configMap.ypid = ypid;
            setJqueryMap(uuid);
            initlistGrid();
            $('[name="addyqcheck"]',jqueryMap.$container).on('click',function () {
                if($('[name="addyqcheck"]',jqueryMap.$container).prop("checked")){
                    //选中
                    $('[name="yqids"]',jqueryMap.$container).prop("checked",true);
                }else{
                    $('[name="yqids"]',jqueryMap.$container).prop("checked",false);
                }
            });
            jqueryMap.$container.find("#addYq_chaxun").on("click",function () {//查询
                configMap.addYqGrid.ajax.reload();
            });
            jqueryMap.$container.find("#addYq_chongzhi").on("click",function () {//重置
                $("input").val("");
                configMap.addYqGrid.ajax.reload();
            });
        },
        getYqData:function () {//让外部获得仪器的id
            data={};
            var  yqids = [];
            var  sbmcs=[];
            jqueryMap.$container.find('[name="yqids"]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.addYqGrid.cell(el.parent()).index().row;
                var id = configMap.addYqGrid.row(rowIndex).data().id;
                var sbmc=configMap.addYqGrid.row(rowIndex).data().sbmc;
                yqids.push(id);
                sbmcs.push(sbmc);
            });
            data.sbmcs=sbmcs;
            data.yqids=yqids;
            return data
        }
    }
}();


