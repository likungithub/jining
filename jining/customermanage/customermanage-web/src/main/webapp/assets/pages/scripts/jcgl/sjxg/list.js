var list = function() {
    'use strict';

    var prefix = 'jcgl/sjxg';

    // 全局属性参数
    var configMap = {
        dataUrl: '/'+prefix+'/querylist',
        del_dataUrl: '/'+prefix+'/delete',
        edit_Url:'/'+prefix+'/edit.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        uuid:'',
        lx:'',
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
                    var ypmc =  $('input[name="ypmc"]', jqueryMap.$container).val();
                    data.ypmc=ypmc;
                }
            },
            "columns": [
                {
                    "data": "ID",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    "data": "HTMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "YPBM",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "YPMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "JCXM",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "SJCJRQ",
                    render:function(d,t,r){
                        d=delnull(d);
                        if(d!='')
                        d =  moment(d).format('YYYY-MM-DD');
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "DWMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "SFMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "CSMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "XJMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                }/**,
                {
                    "data": "SJXGZT",
                    render:function(d,t,r){
                        if(d=='000'){
                            d = "未修改";
                        }
                        if(d=='001'){
                            d = "已分配";
                        }
                        if(d=='002'){
                            d = "通过";
                        }
                        if(d=='003'){
                            d = "未通过";
                        }
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                }
                /*,
                {
                    className: "text-center",
                    "render": function(data, type, row) {
                        var btn = "";
                        btn = btn + configMap.deleteBtn_html;
                        return  configMap.editPageUrl+btn;
                    }

                }*/],
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
    var bianji111= function(){
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID;
        openModal("编辑", configMap.path + configMap.edit_Url + "?id=" + encodeURI(id), 'bianji');
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

    var openModal1 = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit2') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // $('#addZXR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    var strArr=[],strArr1=[],strArr2=[];
                    $('#alreadyPer li','#allotStaffList_m').each(function(){
                        strArr1.push($(this).attr('zydm'));
                    });
                    console.log(strArr1);
                    var str2 = strArr1.join(',');
                    console.log(str2);

                    var data = {};
                    data.zydm=str2;
                    data.lx=configMap.lx;
                    //获取选中的ID


                    jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                        var el = $(this);
                        var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                        var id = configMap.listGrid.row(rowIndex).data().ID;
                        strArr.push(id);
                    });

                    var str1 = strArr.join(',');
                    data.id=str1;

                    $.ajax({
                        data:data,
                        url: configMap.path + '/'+prefix+'/saveZxry',
                        type: 'POST',
                        success: function(result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (result.success) {
                                configMap.listGrid.ajax.reload();
                                Messenger().post("分配成功!");
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

                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'allotTask_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    //编辑
    var bianji = function(){
        var strArr = [];
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            strArr.push(id);
        });
        if(strArr.length==1){
            var $el = $(this);
            var id = strArr[0];
            openModal("编辑", configMap.path + configMap.edit_Url + "?id=" + encodeURI(id), 'bianji');
        }else{
            Messenger().post("请选择一条记录!");
        }


    }

    function savezt(zt){
        
        //数据校验 2
        configMap.lx='4';
        var data = {};
        data.lx = configMap.lx;
        data.zt = zt;
        var strArr = [];
        var flag = false;
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            var shzt = configMap.listGrid.row(rowIndex).data().SJXGZT;
            if(shzt!='001'){ //通过
                flag = true;//直接退出
            }
            strArr.push(id);
        });
        if(flag){
            Messenger().post("不能重复审核!");
            return;
        }
        data.id = strArr.join(',');
        $.ajax({
            data:data,
            url: configMap.path + '/'+prefix+'/updatezt',
            type: 'POST',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.listGrid.ajax.reload();
                    $("[name=rwfp_checkbox]",jqueryMap.$container).prop("checked",false);
                    Messenger().post("保存成功!");
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
    }
    
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


            $('[name=rwfp_checkbox]',jqueryMap.$container).on('click',function () {
                if($("[name=rwfp_checkbox]",jqueryMap.$container).prop("checked")){
                    //选中
                    $("[name=checkbox_checkbox]",jqueryMap.$container).prop("checked",true);
                }else{
                    $("[name=checkbox_checkbox]",jqueryMap.$container).prop("checked",false);
                }
            });

            $($('#'+uuid+'btn_sjxg_tg')).off('click').on('click',function(){
                //通过 002
                //savezt('002');
                bianji();
            });

            $($('#'+uuid+'btn_sjxg_btg')).off('click').on('click',function(){
                //不通过 003
                savezt('003');
            });
        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();