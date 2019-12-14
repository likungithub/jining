
var ndhtlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/ndht/findAllNdht',
        editUrl: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        ndhtGrid: null,
        fwzt: '',
        other: '',
        jszt: ''
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $manualdata:null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#'+ uuid +'-manager-container');
        jqueryMap.$manualdata = $('#'+ uuid +'ManagerList_m');
    };
        var initlistGrid=function(){
            configMap.ndhtGrid = jqueryMap.$manualdata.DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false, //屏蔽排序
                "searching": false,//屏蔽datatales的查询框
                "processing": true, // 打开数据加载时的等待效果
                "serverSide": true, // 打开后台分页
                "autoWidth": false,
                "ajax": {
                    "url": configMap.path + configMap.dataUrl,
                    "dataSrc": "aaData",
                    "method": "POST",
                    "data": function (data) {
                         data.startDate =$("#ndht_startDate",jqueryMap.$content).val();
                         data.endDate = $("#ndht_endDate",jqueryMap.$content).val();
                     }
                },
                "columns": [
                    {
                        class: "text-left",
                        "data": "id",
                        "render": function (data) {
                            return '<div class="datagrid-cell-check"><input type="checkbox" name="ids" value=' + data + '></div>';
                        }
                    },
                    {
                        class: "text-left",
                        "data": "htmc",
                        "render": function (data, type, row) {
                            if (data==null||data=="") {
                                data="";
                            }
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                        }
                    },
                    {
                        class: "text-left",
                        "data": "dwmc",
                        "render": function (data, type, row) {
                            if (data==null||data=="") {
                                data="";
                            }
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                        }
                    },
                    {
                        class: "text-left",
                        "data": "ypmc",
                        "render": function (data, type, row) {
                            if (data==null||data=="") {
                                data="";
                            }
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                        }
                    },
                    {
                        class: "text-left",
                        "data": "lxdh",
                        "render": function (data, type, row) {
                            if (data==null||data=="") {
                                data="";
                            }
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                        }
                    },
                    {
                        "data": "lrrq",
                        class: "text-left",
                        render:function(data, type, row){
                            if(data!=''&&data!=null){
                                data =  moment(data).format('YYYY-MM-DD');
                            }else {
                                data="";
                            }
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                        }
                    },
                    {
                        class: "text-left",
                        "data": "yzbm",
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
                    "sInfoThousands": ",",
                    "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                },
                "drawCallback": function () { // 数据加载完成后执行
                    $('[data-toggle="tooltip"]').tooltip();
                }
            });
        }
        var chaxunBtn=function () {//查询
            configMap.ndhtGrid.ajax.reload();
        }
    //导出excel
    var daochuBtn=function () {
        var ids=[];//定义一个数组
        $('input[name="ids"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if(ids.length>0){
            window.location.href = "/statisticalanalysis/ndht/exportNdhtExcel?ids="+ids;
        }else {
            Messenger().post({
                message: "请选择导出数据",
                type: 'info',
                id:"ordermessenger"
            });
        }

    }
    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            initlistGrid();
            laydate.render({
                elem: "#ndht_startDate" //指定元素
            });
            laydate.render({
                elem: "#ndht_endDate" //指定元素
            });
            $("#ndht_chaxun",jqueryMap.$content).off('click').on('click',function () {
                chaxunBtn();
            });//查询
            $("#ndht_chongzhi",jqueryMap.$content).off('click').on('click',function () {//重置
                $("input").val("");
                configMap.ndhtGrid.ajax.reload();
            })
            $("#ndht-daochu",jqueryMap.$content).off('click').on('click',function () {//导出Excel
                daochuBtn();
            })
            $('input[name="check1"]',jqueryMap.$content).off('click').on('click',function () {
                if(this.checked){
                    $('input[name="ids"]',jqueryMap.$content).attr("checked","checked");
                }else{
                    $('input[name="ids"]',jqueryMap.$content).attr("checked",null);
                }
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();


//@ sourceURL=contractlist.js