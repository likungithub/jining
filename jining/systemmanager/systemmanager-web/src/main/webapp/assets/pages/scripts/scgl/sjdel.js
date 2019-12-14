/**
 *
 */
var sjsclist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/ypgl/getsjscAll',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        other: ''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#sjsc' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('#list_sjsc');
    };
    var initsjscGrid = function () {
        configMap.sjscGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "method": "POST",
                "dataSrc": "aaData"

              /*  "data": function (data) {
                    data.HtstartTime = $('[name="htlrstarDate"]',jqueryMap.$content).val();
                    data.jszt = '200';
                    data.HtendTime = $('[name="htlrendDate"]',jqueryMap.$content).val();
                    data.htbh = $('[name="htbh"]',jqueryMap.$content).val();
                    data.htlx = $('[name="htlx"]',jqueryMap.$content).val();
                    data.htmc = $('[name="htmc"]',jqueryMap.$content).val();	
                    data.wtdwmc = $('[name="wtdwmc"]',jqueryMap.$content).val();
                    data.ywry = $('[name="ywry"]',jqueryMap.$content).val();
                    data.BgstartTime = $('[name="zwbgstarDate"]',jqueryMap.$content).val();
                    data.BgendTime = $('[name="zwbgendDate"]',jqueryMap.$content).val();
                }*/
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data,type,row) {
                        return '<input type="checkbox" name="ids" value="'+data+'"/>';
                    }
                },        
                {
                    class:"text-center",
                    "data": "cydbh",
                    "render": function (data,type,row) {
                            isNull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "rwlx",
                    "render": function (data,type,row) {
                        isNull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
             {
                    class:"text-center",
                    "data": "ypmc",
                 "render": function (data,type,row) {
                     isNull(data);
                     return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                 }
                },
                {
                    class:"text-center",
                    "data": "yply",
                    "render": function (data,type,row) {
                        isNull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cyrq",
                    render:function(data, type, row){
                        if(data!=''&&data!=null){
                            data = moment(data).format('YYYY-MM-DD');
                        }else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "jybgzt",
                    "render": function (data,type,row) {
                        isNull(data);
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
                var editContainer = jqueryMap.$content.find('[name="sjscedit"]');
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
    };

    var isNull=function (data) {//检验data是否是空值  如果是空值返会空字符串
        if(data==null || data==""){
            data="";
        }
    }
    return{
        inint:function (uuid) {
            setJqueryMap(uuid);
            initsjscGrid();
        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();


//@ sourceURL=contractlist.js