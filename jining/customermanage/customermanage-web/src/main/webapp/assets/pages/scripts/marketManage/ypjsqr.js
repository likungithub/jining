/**
 *
 */
var ypjsqrlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/ypjsqr/findAllYpjsqr',
        jieshouUrl:'/ypjsqr/updateYpjszt',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        other: '',
        ypjsqrGrid:null
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
        jqueryMap.$content = $('#ypjsqr' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('#ypjsqr_table');
    };
    var initYpjsqrGrid = function () {
        configMap.ypjsqrGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
               "data": function (data) {
                      data.ypmc= $('[name="ypmc"]',jqueryMap.$content).val();
                      data.jszt = $('[name="jszt"]',jqueryMap.$content).val();
                  }
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
                    "data": "ypmc",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "jszt",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        if(data=='0'){
                            data='未接收';
                        }
                        if(data=='1'){
                            data='已接收';
                            }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
             {
                    class:"text-center",
                    "data": "ypbm",
                 "render": function (data,type,row) {
                     data=delnull(data);
                     return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                 }
                },
                {
                    class:"text-center",
                    "data": "ypsl",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypsldw",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypjssj",
                    render:function(data, type, row){
                        if(data!=''&&data!=null){
                            data = moment(data).format('YYYY-MM-DD');
                        }else {
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
                $('[data-toggle="tooltip"]').tooltip();
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
        configMap.ypjsqrGrid.clear().draw();
        configMap.ypjsqrGrid.ajax.reload();
    }
    //接收确认
    var jieshou=function () {
        var ids=[];//定义一个数组
        $('input[name="ids"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if(ids.length>0){
            $.ajax({
                url:configMap.path+configMap.jieshouUrl,
                data:{"ids":ids.toString()},
                type: 'POST',
                success:function () {
                    Messenger().post({
                        message: '确认接收成功',
                        type: 'success'
                    });
                },
                error:function () {
                    Messenger().post({
                        message: '确认接收失败',
                        type: 'error'
                    });
                }
            });
        }else {
            Messenger().post({
                message: "请选择接收样品",
                type: 'info',
                id:"ordermessenger"
            });
        }
    }
    return{
        inint:function (uuid) {
            setJqueryMap(uuid);
            initYpjsqrGrid();
            jqueryMap.$content.find('#ypjsqr_chaxun').off('click').on('click',function () {//触发查询
                chaxun();
            })
            jqueryMap.$content.find('#ypjsqr_reset').off('click').on('click',function () {//触发重置
                $("input").val("");
                $("select").val("");
                chaxun();
            })
            jqueryMap.$content.find("#ypjsqr_jieshou").off('click').on('click',function () {
                jieshou();
            })
            //多选反选
            $('[name=check1]',jqueryMap.$content).on('click',function () {
                if($("[name=check1]",jqueryMap.$content).prop("checked")){
                    //选中
                    $("[name=ids]",jqueryMap.$content).prop("checked",true);
                }else{
                    $("[name=ids]",jqueryMap.$content).prop("checked",false);
                }
            });

        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();
