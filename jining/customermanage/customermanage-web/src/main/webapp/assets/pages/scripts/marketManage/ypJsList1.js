
var ypJsList1 = function () {
    var TableInit = function () {
        var oTableInit = new Object();
        //初始化Table
        oTableInit.Init = function () {
            $('#test-table').bootstrapTable({
                url: '/customermanage/datatable/getAll',         //请求后台的URL（*）
                method: 'post',                      //请求方式（*）
                //toolbar: '#toolbar',                //工具按钮用哪个容器
                striped: true,                      //是否显示行间隔色
                cache: false,//是否使用缓存，默认为true，
                pagination: true,                   //是否显示分页（*）
                //sortable: false,                     //是否启用排序
                //sortOrder: "asc",
                contentType: 'application/x-www-form-urlencoded',
                undefinedText: "空",//当数据为 undefined 时显示的字符排序方式
                queryParams: function (params) {
                    return {
                        pageSize: params.limit, // 每页要显示的数据条数
                        offset: params.offset, // 每页显示数据的开始行号
                        sort: params.sort, // 要排序的字段
                        sortOrder: params.order, // 排序规则
                        /*  dataId: $("#dataId").val() // 额外添加的参数*/
                    }
                },//传递参数（*）
                sidePagination: "server",     //分页方式：client客户端分页，server服务端分页（*）
                pageNumber:1,                       //初始化加载第一页，默认第一页
              /*  pageSize: 10,                       //每页的记录行数（*）*/
                pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                strictSearch: true,
                clickToSelect: true,                //是否启用点击选中行
               // height: 460,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "id",                     //每一行的唯一标识，一般为主键列
                cardView: false,                    //是否显示详细视图
                detailView: true,                   //是否显示父子表
                columns: [{
                    field: 'ID',
                    title: '<div class="datagrid-cell-check"><input type="checkbox" name="ck"/></div>',
                    align: 'center', // 左右居中
                    valign: 'middle', // 上下居中
                    formatter:function () {
                        return '<div class="datagrid-cell-check"><input type="checkbox" name="ck"/></div>'
                    }
                },{
                    field: 'YPMC',
                    title: '样品名称',
                    align: 'center', // 左右居中
                    valign: 'middle' // 上下居中
                }, {
                    field: 'YPBM',
                    title: '样品编码',
                    align: 'center', // 左右居中
                    valign: 'middle' // 上下居中
                },{
                    field: 'SB',
                    title: '商标',
                    align: 'center', // 左右居中
                    valign: 'middle' // 上下居中
                },{
                    field: 'BZQ',
                    title: '保质期',
                    align: 'center', // 左右居中
                    valign: 'middle' // 上下居中
                },{
                    field: 'YPPHHBH',
                    title: '样品批号',
                    align: 'center', // 左右居中
                    valign: 'middle' // 上下居中
                }]
            });
        };

        // //得到查询的参数
        // oTableInit.queryParams = function (params) {
        //     var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        //         limit: params.limit,   //页面大小
        //         offset: params.offset,  //页码
        //
        //     };
        //     return temp;
        // };
        return oTableInit;
    };

    return {
        init: function (uuid) {
            /*jqueryMap.$content.find('.beginTime').datepicker({
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
            });*/
          
            /*initypjsGrid();*/
            TableInit().Init();
            /*$("#addypjs",jqueryMap.$content).off('click').on('click',function (){
                addypjs();
            });*/

/*            $("#reset").click(function () {//重置
                $("input").val("");
            });
            //查询
            $("#ypjsSearch",jqueryMap.$content).off('click').on('click',function (){
            	configMap.ypjsGrid.ajax.reload();
            })
            //选择人员
            $($('#btn_ryxz'+uuid)).off('click').on('click',function(){
		        if($("input[type='checkbox']:checked",jqueryMap.$content).length == 0 ){
		        	//console.info($("input[type='checkbox']:checked",jqueryMap.$content).length);
		        	Messenger().post("请选择人员!");
		        	return;
		        }
                //选择人员
            	openModal1('样品接收-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any','edit2','1');
              });*/
        },
        setPath: function (path) {
           /* configMap.path = path;*/
        },
        reload: function () {
            /*configMap.ypjsGrid.ajax.reload();*/
        }
    };
}();


//@ sourceURL=contractlist.js