var list = function() {
    'use strict';

    var prefix = 'zjgl';

    // 全局属性参数
    var configMap = {
        dataUrl: '/'+prefix+'/querylist',
        del_dataUrl: '/'+prefix+'/delete',
        edit_Url:'/'+prefix+'/edit.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        uuid:'',
        editPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="bianji" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html_disabled: '<a disabled="disabled" href="javascript:;" class="btn btn-xs default color666"  data-toggle="tooltip" title="删除"><i style="color:#666;" class="icon iconfont icon-shanchu3 color666  iconFontSize"></i></a>',
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
        jqueryMap.$blockTarget = $('body');
    };


    var initlistGrid = function() {
        configMap.listGrid = $('#'+configMap.uuid+'ManagerList_m', jqueryMap.$container).DataTable({
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
                    var zjmc =  $('input[name="zjmc"]', jqueryMap.$container).val();
                    data.zjmc=zjmc;
                }
            },
            "columns": [
                {
                    "data": "zjdm",
                    render:function(d,t,r){
                        var tag='',tip='';
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                },
                {
                    "data": "zjmc",
                    render:function(d,t,r){
                        var tag='',tip='';
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                },
                {
                    "data": "zjms",
                    render:function(d,t,r){
                        var tag='',tip='';
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                },
                {
                    className: "text-center",
                    "render": function(data, type, row) {
                        var btn = "";
                        btn = btn + configMap.deleteBtn_html;
                        return  configMap.editPageUrl+btn;
                    }

                }],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function() { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var delContainer = $('[data-type="del"]', jqueryMap.$container);
                var editContainer = $('[data-type="bianji"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(editContainer.length > 0){
                    editContainer.off('click').on('click',bianji);
                }
                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": del,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }
            }
        });
    }

    //编辑
    var bianji = function(){
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().zjdm;
        openModal("编辑", configMap.path + configMap.edit_Url + "?zjdm=" + encodeURI(id), 'bianji');
    }

    //删除
    var del = function(event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var rowIndex = configMap.listGrid.cell(element.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().zjdm;
        $.ajax({
            data:{"zjdm":id},
            url: configMap.path + configMap.del_dataUrl,
            type: 'POST',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.listGrid.ajax.reload();
                    Messenger().post("删除成功!");
                } else {
                    Messenger().post({
                        message:result.message,
                        type: 'error'
                    });
                }
            },
            error: function() {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };



    //创建模态框
    var openModal = function (title, url, type) {
        var dialogButtons = {
        };
        if (type == 'bianji'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    edit.save(function (data) {
                        if(data){
                            configMap.listGrid.ajax.reload();
                            jqueryMap.$Dialog.modal("hide");
                        }else{
                            return false;
                        }
                    })
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn btn-default borderRadius4 color666'
        }
        $.get(url, function (html) {
            jqueryMap.$Dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    
    return {
        init: function(uuid) {
            configMap.uuid=uuid;
            setJqueryMap();
            initlistGrid();
            $('#searchTerm-m', jqueryMap.$container).on('click', function () {
                configMap.listGrid.ajax.reload();
            });


            $('#'+configMap.uuid+'btnNew',jqueryMap.$container).on('click',function () {
                openModal("新增证件信息", configMap.path + configMap.edit_Url, 'bianji');
            });

        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();