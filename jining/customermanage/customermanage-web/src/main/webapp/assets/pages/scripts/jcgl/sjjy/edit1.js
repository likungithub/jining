var sjjyEditList = function () {
    var configMap = {
        id :'',
        path: '',
        uuid:'',
        dataUrl: "customermanage/xinsjjh/sjjh",
        nowData:"",
    };

    function delnull(d){
        if(d==undefined){
            return '';
        }
        if(d=='null'){
            return '';
        }
        return d;
    }


   return {
       // 初始化
       init: function (id, uuid) {
           configMap.id = id;
           configMap.uuid = uuid;
           var initGridypjcedit = $('#ManagerList_sjjhck').DataTable({
               "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
               "ordering": false, //屏蔽排序
               "searching": false,//屏蔽datatales的查询框
               "processing": true, // 打开数据加载时的等待效果
               "serverSide": true, // 打开后台分页
               "autoWidth": false,
               "ajax": {
                   "dataSrc": "aaData",
                   "url": configMap.dataUrl,
                   "method": "POST",
                   "dataType": "JSON",
                   "data": function (data) {
                       data.ypid1 = id;
                   }
               },
               "columns": [
                   {
                       class: "text-left",
                       "data": "jcxmmc",
                       render: function (d, t, r) {
                           d = delnull(d);
                           return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                       }
                   },
                   {
                       class: "text-left",
                       "data": "xlz",
                       render: function (d, t, r) {
                           d = delnull(d);
                           return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                       }
                   },
                   {
                       class: "text-left",
                       "data": "jcz",
                       render: function (d, t, r) {
                           d = delnull(d);
                           return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                       }
                   },
                 /*  {
                       class: "text-left",
                       "data": "wd",
                       render: function (d, t, r) {
                           d = delnull(d);
                           return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                       }
                   },
                   {
                       class: "text-left",
                       "data": "sd",
                       render: function (d, t, r) {
                           d = delnull(d);
                           return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                       }
                   },*/
                /*   {
                       class: "text-left",
                       "data": "jcff",
                       render: function (d, t, r) {
                           d = delnull(d);
                           return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                       }
                   },*/
                   {
                       class: "text-left",
                       "data": "s_date",
                       render: function (d, t, r) {
                           if(d!=null){
                               d = moment(d).format('YYYY-MM-DD');
                           }else {
                               d='';
                           }
                           return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                       }
                   },
                   {
                       class: "text-left",
                       "data": "e_date",
                       render: function (d, t, r) {
                           if(d!=null){
                               d = moment(d).format('YYYY-MM-DD');
                           }else {
                               d='';
                           }
                           return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                       }
                   },
                   {
                       class: "text-left",
                       "data": "ZXRY_DM",
                       render: function (d, t, r) {
                           d = delnull(d);
                           return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
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
               // "initComplete":function () { //加载完数据之后执行
               // }

               "drawCallback": function () { // 数据加载完成后执行
                   xxContainer = $('[data-toggle="tooltip"]');//显示详细
                   if (xxContainer.length > 0) {
                       xxContainer.tooltip();
                   }
                   ;
               }

           });
       },
       // 设置路径
       setPath: function (path) {
           configMap.path = path;
       }
   }
}();

