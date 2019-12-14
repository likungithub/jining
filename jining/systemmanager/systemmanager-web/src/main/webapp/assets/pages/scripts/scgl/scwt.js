/**
 *
 */
var rwgllist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/scwt/findAllScwt',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        spflid: '/rwgl/spflid',
        jsonUrl:'/rwgl/jieshouJson',
        rwglGrid:null,
        ids:null,
        jiazai:'/rwgl/jiazai',
        cleanUrl:"/rwgl/cleanTempScJcxm",
        delUrl:"/scwt/deleteRwglExcel"
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $manualdata:null,
        $ypManageDialog:null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#rwgl' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('#list_rwgl');
    };
    var initrwglGrid = function () {
        configMap.rwglGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "scrollX":true,//水平滚动
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method": "POST",
                "data": function (data) {
                      data.startDate = $('[name="cystartDate"]',jqueryMap.$content).val();
                      data.endDate = $('[name="cyendDate"]',jqueryMap.$content).val();
                      data.ypmc = $('[name="ypmc"]',jqueryMap.$content).val();
                  }
            },
            "columns": [
                {
                    "data": "ID",
                    "render": function (data,type,row) {
                        return '<input type="checkbox" name="ids" value="'+data+'"/>';
                    }
                },
                {
                    class:"text-center",
                    "data": "WTID",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SC_CYDH",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SJWZ_BZ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        if(data=='Y')
                        {
                            data="是";
                        }else
                        {
                            data="否";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SC_TB_BD",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        if(data=='Y')
                        {
                            data="是";
                        }else
                        {
                            data="否";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "RWLY",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYRQ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYDD",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPMC",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CHANPINZL",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPLAIYUAN",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SB",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPPHHBH",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SCRQ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BZQ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPZXBZ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "GGXH",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPDJ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SCXKBH",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPDANJIA",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "IF_CK",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YBJS",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPSL",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPDW",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BYSL",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPBGFL",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPXT",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPBCTJ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYYPBZ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "JSYPDZ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "JSYPJZRQ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SJDW",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "QYLX",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BCJDWDZ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "FRDB",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "NXSE",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YYZZH",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BCJDWLXR",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BCJDWYDDH",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BCJDWCZ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BCJDWYB",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SCDW",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SCDZ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SCDWLXR",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "SCDWLXDH",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYDW",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYDWXXDZ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYDWLXR",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYDWLXDH",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYDWCZ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYDWYB",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYRY",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BZ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYDDSSHJ",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BCJDWGM",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BCJDWQY",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYFW",
                    "render": function (data,type,row) {
                        data=delnull(data);
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
                //$('[data-toggle="tooltip"]').tooltip();
            }
        });
    };
    function delnull(data){//判断数据是否为空值
        if(data==undefined){
            return '';
        }
        if(data=='null'){
            return '';
        }
        return data;
    }
    var chaxun=function () {//查询
        configMap.rwglGrid.ajax.reload();
    }

    var tbjcx=function () {//同步检测项
        var ids=[];//定义一个数组
        var scbhs=[];
        var jcxtbbz=false;
        $('input[name="ids"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为ids的复选框，其中选中的执行函数
            var el = $(this);
            var rowIndex = configMap.rwglGrid.cell(el.parent()).index().row;
            var id = configMap.rwglGrid.row(rowIndex).data().ID;
            var scCydh = configMap.rwglGrid.row(rowIndex).data().SC_CYDH;
            var sjwzBz = configMap.rwglGrid.row(rowIndex).data().SJWZ_BZ;
            if(sjwzBz=='Y')
            {
                jcxtbbz=true;
                return;
            }
            ids.push(id);//将选中的值添加到数组ids中
            scbhs.push(scCydh);
        });

        if(jcxtbbz)
        {
            Messenger().post({
                message: '请选择尚未同步检测项的数据!',
                type: 'info',
                id:"ordermessenger"
            });
            return;
        }

        if(ids.length>0){
            bootbox.dialog({
                title: '提示',
                message: '是否通过网络连接省抽系统同步省抽抽样单的检测项？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '连接省抽系统同步检测项，请等待一段时间再次进行查询，谢谢。'
                            });
                            $.ajax({
                                url:configMap.path+"/scwt/scTbJcxm",
                                type:"post",
                                data:{"ids":ids.toString(),"sccydh":scbhs.toString()},
                                success:function (data) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    configMap.rwglGrid.ajax.reload();
                                    Messenger().post({
                                        message: data.info,
                                        type: 'success',
                                        id:"ordermessenger"
                                    });
                                },
                                error:function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    configMap.rwglGrid.ajax.reload();
                                    Messenger().post({
                                        message: '检测项同步失败！',
                                        type: 'error',
                                        id:"ordermessenger"
                                    });
                                    return;
                                }
                            });
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }else {
            Messenger().post({
                message:"请选择要同步的数据",
                type: 'info',
                id:"ordermessenger"
            });
        }

    }
    var tbbdwt=function () {//同步本地委托
        var ids=[];//定义一个数组
        var jcxtbbz=false;
        var bdBz=false;
        $('input[name="ids"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为ids的复选框，其中选中的执行函数
            var el = $(this);
            var rowIndex = configMap.rwglGrid.cell(el.parent()).index().row;
            var id = configMap.rwglGrid.row(rowIndex).data().ID;
            var sjwzBz = configMap.rwglGrid.row(rowIndex).data().SJWZ_BZ;
            var bdtbBz = configMap.rwglGrid.row(rowIndex).data().SC_TB_BD;
            if(sjwzBz=='N')
            {
                jcxtbbz=true;
                return;
            }
            if(bdtbBz=='Y')
            {
                bdBz=true;
                return;
            }
            ids.push(id);//将选中的值添加到数组ids中
        });

        if(bdBz)
        {
            Messenger().post({
                message: '已经同步到本地的省抽抽样单不能再同步!',
                type: 'info',
                id:"ordermessenger"
            });
            return;
        }
        if(jcxtbbz)
        {
            Messenger().post({
                message: '请选择已同步检测项的数据!',
                type: 'info',
                id:"ordermessenger"
            });
            return;
        }

        if(ids.length>0){
            bootbox.dialog({
                title: '提示',
                message: '是否通将省抽委托同步到本地委托,同步后的委托不可撤销？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在同步数据，请稍等。'
                            });
                            $.ajax({
                                url:configMap.path+"/scwt/scTbBdWt",
                                type:"post",
                                data:{"ids":ids.toString()},
                                success:function (data) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    configMap.rwglGrid.ajax.reload();
                                    Messenger().post({
                                        message: data.info,
                                        type: 'success',
                                        id:"ordermessenger"
                                    });
                                },
                                error:function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    configMap.rwglGrid.ajax.reload();
                                    Messenger().post({
                                        message: '抽样单同步本地委托失败！',
                                        type: 'error',
                                        id:"ordermessenger"
                                    });
                                    return;
                                }
                            });
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }else {
            Messenger().post({
                message:"请选择要同步的数据",
                type: 'info',
                id:"ordermessenger"
            });
        }

    }
    //导入excel
    var  daoru=function () {
        openModal("模板导入","/systemmanager/scgl/scimportRwglExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                    Messenger().post({
                        message: "导入成功",
                        type: 'info',
                        id:"drcghhh"
                    });
                    configMap.rwglGrid.ajax.reload();
                }
            });
        });
    }
//打开模态框组件
    var openModal = function (title, url, type, func) {
        var dialogButtons = {};

        if (type === 'daoru') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
        }

        $.get(url, function (html) {
            jqueryMap.$ypManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    //导出excel
    // var daochuBtn=function () {
    //     var ids=[];//定义一个数组
    //     $('input[name="ids"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为ids的复选框，其中选中的执行函数
    //         ids.push($(this).val());//将选中的值添加到数组ids中
    //     });
    //    if(ids.length>0){
    //       /* $.ajax({  //清空temp_sc_jcxm表的信息
    //            url: configMap.path + configMap.cleanUrl,
    //            async:false,
    //            type: "post",
    //            success: function (data) {
    //                console.log(data.info);
    //            }
    //        });
    //
    //        $.ajax({//后台获得值食品分类id    循环插入数据
    //            url: configMap.path + configMap.spflid,
    //            async:false,
    //            type: "post",
    //            data: {"ids": ids.toString()},
    //            success: function (data) {
    //                var spflids = data.spflids;
    //                for (var i = 0; i < spflids.length; i++) {
    //                    getItemsByCategoryId(spflids[i]);
    //                }
    //            }
    //        });
    //        sleep(1000);//睡眠*/
    //        window.location.href = "/systemmanager/rwgl/exportRwglExcel?ids="+ ids;
    //    }else {
    //         Messenger().post({
    //             message: "请选择导出数据",
    //             type: 'info',
    //             id:"ordermessenger"
    //         });
    //     }
    //
    // }
    //获得接口中的json字符串
    // var getItemsByCategoryId =function (categoryId) {
    //     $.ajax({
    //         url:"http://124.128.39.242:8087/sample/command/dispatcher/com.inspur.transfer.SampleDataTrans/loadInspectItemByCateId",
    //         async:false,
    //         type:"post",
    //         data:{"categoryId":categoryId},
    //         dataType:"jsonp",
    //         success:function (data) {
    //             var info=JSON.stringify(data);
    //             $.ajax({
    //                 url:configMap.path+configMap.jsonUrl,
    //                 async:false,
    //                 type:"post",
    //                 data:{"info":info},
    //                 success:function (data){
    //
    //                 },
    //                 error:function () {
    //                     Messenger().post({
    //                         message: "网络异常",
    //                         type: 'info',
    //                         id:"ordermessenger"
    //                     });
    //                     return;
    //                 }
    //             });
    //         },
    //         error:function (data) {
    //             Messenger().post({
    //                 message: "网络异常",
    //                 type: 'info',
    //                 id:"ordermessenger"
    //             });
    //             return;
    //         }
    //     });
    // }
    // //睡眠计时器
    // var sleep= function(n) {
    //     var start = new Date().getTime();
    //     while (true) {
    //         if (new Date().getTime() - start > n) {
    //             break;
    //         }
    //     }
    // }
    var delBtn=function () {//删除按钮
        var ids=[];//定义一个数组
        var bdtb=false;
        $('input[name="ids"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为ids的复选框，其中选中的执行函数
            var el = $(this);
            var rowIndex = configMap.rwglGrid.cell(el.parent()).index().row;
            var id = configMap.rwglGrid.row(rowIndex).data().ID;
            var scCydh = configMap.rwglGrid.row(rowIndex).data().SC_CYDH;
            var bdtbbz = configMap.rwglGrid.row(rowIndex).data().SC_TB_BD;//本地同步标志
            var sjwzBz = configMap.rwglGrid.row(rowIndex).data().SJWZ_BZ;
            if(bdtbbz=='Y')
            {
                bdtb=true;
                return;
            }
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if(bdtb)
        {
            Messenger().post({
                message: '已经同步到本地的委托省抽委托单不能删除！',
                type: 'info',
                id:"ordermessenger"
            });
            return;
        }
        if(ids.length>0){
            bootbox.dialog({
                title: '提示',
                message: '是否要删除？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                         callback: function () {
                             App.blockUI({
                                 target: jqueryMap.$blockTarget,
                                 boxed: true,
                                 message: '正在删除数据，请稍候...'
                             });
                            $.ajax({
                                url:configMap.path+configMap.delUrl,
                                type:"post",
                                data:{"ids":ids.toString()},
                                success:function (data) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    configMap.rwglGrid.ajax.reload();
                                    Messenger().post({
                                        message: data.info,
                                        type: 'success',
                                        id:"ordermessenger"
                                    });
                                },
                                error:function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    configMap.rwglGrid.ajax.reload();
                                    Messenger().post({
                                        message: '删除失败！',
                                        type: 'error',
                                        id:"ordermessenger"
                                    });
                                    return;
                                }
                            });
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }else {
            Messenger().post({
                message:"请选择删除数据",
                type: 'info',
                id:"ordermessenger"
            });
        }

    }
    return{
        inint:function (uuid) {
            setJqueryMap(uuid);
            initrwglGrid();
            jqueryMap.$content.find('#chaxun').off('click').on('click',function () {//触发查询
                chaxun();
            });
            jqueryMap.$content.find('#reset').off('click').on('click',function () {//触发重置
                $("input",jqueryMap.$content).val("");
            });
            jqueryMap.$content.find('#btn_daoru').off('click').on('click',function () {//导入
                daoru();
            });
            // jqueryMap.$content.find('#btn_daochu').off('click').on('click',function () {//导出
            //     daochuBtn();
            // });
            jqueryMap.$content.find('#shanchu').off('click').on('click',function () {//删除
                delBtn();
            });

            jqueryMap.$content.find('#tbjcx').off('click').on('click',function () {//同步检测项
                tbjcx();
            });
            jqueryMap.$content.find('#tbbdwt').off('click').on('click',function () {//将省抽数据同步到本地委托中
                tbbdwt();
            });

            $("#check1",jqueryMap.$content).on('click',function () {//多选反选
                if($("#check1",jqueryMap.$content).prop("checked")){
                    //选中
                    $("[name='ids']",jqueryMap.$content).prop("checked",true);
                }else{
                    $("[name='ids']",jqueryMap.$content).prop("checked",false);
                }
            });
            laydate.render({
                elem: "#rwgl_tartDate" //指定元素
            });
            laydate.render({
                elem: "#rwgl_endDate" //指定元素
            });
        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();
