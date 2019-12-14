
var  htcx_chakanlist = function () {
// 全局属性参数
    var configMap = {
        wtid: '',
        path:"",
        htcxGrid:null,
        chakanUrl:"/htcx/findYp",
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $ManageDataTable: null,
        $ManageDialog: null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#htcx_chankan' + uuid);
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = $('#htcx_chakan_table', jqueryMap.$container);
    };
     var initGrid=function(){
         configMap.htcxGrid= jqueryMap.$ManageDataTable.DataTable({
             "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
             "ordering": false, //屏蔽排序
             "searching": false,//屏蔽datatales的查询框
             "processing": true, // 打开数据加载时的等待效果
             "serverSide": true, // 打开后台分页
             "autoWidth":false,
             "ajax": {
                 "url": configMap.path+configMap.chakanUrl,
                 "dataSrc": "aaData",
                 "data": function (data) {
                     data.wtid =configMap.wtid;
                 }
             },
             "columns": [
                 {
                     class:"text-center",
                     "data": "YPMC",
                     "render": function (data, type, row) {
                         if (data==null||data=="") {
                             data="";
                         }
                         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                     }

                 },
                 {
                     class:"text-center",
                     "data": "ID",
                     "render": function (data, type, row) {
                         if (data==null||data=="") {
                             data="";
                         }
                         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                     }
                 },
                 {
                     class:"text-center",
                     "data":"GGXH",
                     "render": function (data, type, row) {
                         if (data==null||data=="") {
                             data="";
                         }
                         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                     }
                 },
                 {
                     class:"text-center",
                     "data":"YPDJ",
                     "render": function (data, type, row) {
                         if (data==null||data=="") {
                             data="";
                         }
                         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                     }
                 },

                 {
                     class:"text-center",
                     "data": "JYLB",
                     "render": function (data, type, row) {
                         if (data==null||data=="") {
                             data="";
                         }
                         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                     }
                 },
                 {
                     class:"text-center",
                     "data": "YPSL",
                     "render": function (data, type, row) {
                         if (data==null||data=="") {
                             data="";
                         }
                         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                     }
                 },

                 {
                     class:"text-center",
                     "data": "YPJCZT",
                     render:function (data,type,row) {
                         if(data=="001"||data=="000"){
                             data="样品未检测";
                         }
                         if(data=="002"){
                             data="样品检测通过";
                         }
                         if(data=="003"){
                             data="样品检测未通过";
                         }
                         if(data==null||data==""){
                             data="";
                         }
                         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                     }
                 },

             ],
             "language": {
                 "zeroRecords": "暂时没有数据",
                 "infoEmpty": "无记录",
                 "sEmptyTable": "暂时没有数据",
                 "sInfoThousands":",",
                 "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
             },
             "drawCallback": function () { // 数据加载完成后执行
                 var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container).tooltip();

                 if (tootipContainer.length > 0) {
                     tootipContainer.tooltip();
                 }
             }
         });
     }

    return {
        init:function (uuid,wtid) {
            setJqueryMap(uuid);
            configMap.wtid=wtid;
            initGrid();
        },
        setPath:function (path) {
            configMap.path=path;
        }

    }
}();
	
	