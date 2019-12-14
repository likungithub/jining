var thjlList = function() {
    'use strict';
    var prefix = 'jcgl/ypjc';
    // 全局属性参数
    var configMap = {
        dataUrl: '/'+prefix+'/queryThjlList',
        delUrl:'/'+prefix+'/delThjlByIds',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        thjlListGrid: null,
        path:'',
        uuid:'',
        jclbdm:''
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $manualdata:null
};
    //赋值
    var setJqueryMap = function(uuid) {
        jqueryMap.$container = $('#'+uuid+'-ypjcThjl-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$manualdata=jqueryMap.$container.find('#thjl_List');
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

    var initlistGrid = function() {
        configMap.thjlListGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method":"POST",
                "data": function(data) {
                    data.ypmc=$('[name="ypmc"]',jqueryMap.$container).val();
                    data.jclbdm = configMap.jclbdm;
                }
            },
            "columns": [
                {
                    class: "text-left",
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },

                {
                    class: "text-center",
                    "data": "ypmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "thyy",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "thwz",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },

                {
                    class: "text-center",
                    "data": "zxr",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "thrq",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
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
            "drawCallback": function() { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

            }
        });
    }
    var remove=function (ids) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        $.ajax({
            data:{"ids":ids.join(",")},
            url:configMap.path+configMap.delUrl,
            type: 'POST',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.thjlListGrid.ajax.reload();
                    Messenger().post({
                        message:"删除成功",
                        type:"success"
                    });
                } else {
                    Messenger().post({
                        message:"删除失败!",
                        type: 'error'
                    });
                }
            },
            error: function() {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }
    var removeBtn=function () {
        var ids=[];
        jqueryMap.$container.find('[name="checkbox_checkbox"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.thjlListGrid.cell(el.parent()).index().row;
            var id = configMap.thjlListGrid.row(rowIndex).data().id;
            ids.push(id)
        });
        if(ids.length==0){
            Messenger().post("请选择需要删除的数据!");
            return;
        }
        bootbox.dialog({
            title: '提示',
            message: '是否确定要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        remove(ids);
                    }
                },
                cancel: {
                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                    className: 'btn btn-default borderRadius4'
                }
            }
        });
    }
    return {
        init: function(uuid,jclbdm) {
            configMap.uuid=uuid;
            configMap.jclbdm  = jclbdm;
            setJqueryMap(uuid);
            initlistGrid();
            $('[name="ck"]',jqueryMap.$container).on('click',function () {
                if($('[name="ck"]',jqueryMap.$container).prop("checked")){
                    //选中
                    $('[name="checkbox_checkbox"]',jqueryMap.$container).prop("checked",true);
                }else{
                    $('[name="checkbox_checkbox"]',jqueryMap.$container).prop("checked",false);
                }
            });
            jqueryMap.$container.find("#thjlSeach").on("click",function () {//查询
                configMap.thjlListGrid.ajax.reload();
            });
            jqueryMap.$container.find("#thjlReast").on("click",function () {//重置
                $("input").val("");
                configMap.thjlListGrid.ajax.reload();
            });
            jqueryMap.$container.find("#thjlRemove").on("click",function () {//删除
                 removeBtn();
            });

        },
        setPath:function(path) {
            configMap.path = path;
        }
    }
}();