var xydsqlist = function() {
    'use strict';

    // 全局属性参数
    var configMap = {
        dataUrl: '/xydsq/queryXydsq',
        del_dataUrl: '/xydsq/deleteXydsq',
        update_dataUrl: '/xydsq/queryXydsq',
        cssh_dataUrl: '/xydsq/xydsqCs',
        excel_dateUrl:'/xydsq/downDataExcel',
        cssh_Url: '/xydsq/sh_cs.jsp',
        chakan_Url: '/xydsq/chakan.jsp',
        edit_Url:'/xydsq/edit.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        editTitle:'编辑信用贷申请',
        editPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="bianji" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan" data-toggle="tooltip" title="查看"><i class="icon iconfont icon-xiangqing1  btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        cssh_html:'<a href="javascript:;" class="btn btn-xs default" data-type="cssh" data-toggle="tooltip" title="初审"><i class="icon iconfont icon-shenhe1  btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        cssh_html_disabled:'<a href="javascript:;" disabled="disabled"  class="btn btn-xs default"  data-toggle="tooltip" title="初审"><i class="icon iconfont icon-shenhe1  btnxystyle color666 iconFontSize"></i></a>',
        zssh_html:'<a href="javascript:;" class="btn btn-xs default" data-type="zssh" data-toggle="tooltip" title="终审"><i class="icon iconfont icon-zhongshen btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        zssh_html_disabled:'<a href="javascript:;" disabled="disabled"  class="btn btn-xs default color666"  data-toggle="tooltip" title="终审"><i class="icon iconfont icon-zhongshen  btnxystyle color666 iconFontSize"></i></a>',
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
        jqueryMap.$container = $('#xydsq-manager-container');
        jqueryMap.$blockTarget = $('body');
    };


    var initlistGrid = function() {
        configMap.listGrid = $('#xydsqManagerList_m', jqueryMap.$container).DataTable({
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
                    //    开始的时间
                    var sT = $('input[name="starDate"]', jqueryMap.$container).val();
                    //    结束的时间
                    var eT = $('input[name="endDate"]', jqueryMap.$container).val();

                    var jkrxm =  $('input[name="jkrxm"]', jqueryMap.$container).val();

                    var cszt =  $('select[name="cszt"]', jqueryMap.$container).val();

                    var zszt =  $('select[name="zszt"]', jqueryMap.$container).val();

                    var cssj_q =  $('input[name="cssj_q"]', jqueryMap.$container).val();

                    var cssj_z =  $('input[name="cssj_z"]', jqueryMap.$container).val();

                    var zssj_q =  $('input[name="zssj_q"]', jqueryMap.$container).val();

                    var zssj_z =  $('input[name="zssj_z"]', jqueryMap.$container).val();


                    if ($('#moreSearch').css('display') == 'none') {

                         zszt = "";

                         cssj_q =  "";

                         cssj_z =  "";

                         zssj_q = "";

                         zssj_z =  "";

                    }

                    data.startDate = sT;
                    data.endDate = eT;
                    data.jkrxm=jkrxm;
                    data.cszt=cszt;
                    data.zszt=zszt;
                    data.cssj_q = cssj_q;
                    data.cssj_z = cssj_z;
                    data.zssj_q = zssj_q;
                    data.zssj_z = zssj_z;

                }
            },
            "columns": [

                {
                    "data": "sqid",
                    render:function(d,t,r){
                        var tag='',tip='';
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                }, {
                    data: 'jkrxm',
                    render:function(data,type,row){
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+data +'" >'+data+'</span>';
                    }

                },
                {
                    "data": "jkrsjh",
                    render:function (data,type,row) {
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+data +'" >'+data+'</span>';
                    }


                }, {
                    "data": "sqdkje",
                    className:'text-right',
                    "render": function(data, type, row) {
                        if((data=='') ||('null'==data)||(data==null))return '';
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+data.toFixed(2) +'" >'+data.toFixed(2)+'</span>';

                    }
                }, {
                    className: 'text-center',
                    "data": "sqqx",
                    "render": function(data, type, row) {
                        data =  data+"月";
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+data +'" >'+data+'</span>';
                    }
                }, {
                    className: 'text-center',
                    data: 'lrrq',
                    "render": function(data, type, row) {
                        if(data==null)return "";
                        data =  moment(data).format('YYYY-MM-DD');
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+data +'" >'+data+'</span>';

                    }
                }
                , {
                    "data": "splxCs",
                    className:'text-center',
                    "render": function(data, type, row) {
                        if(data=='0'){
                            data = "未审核";
                        }else if(data=='1'){
                            data = "同意";
                        }else if(data=='2'){
                            data = "不同意";
                        }
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+data +'" >'+data+'</span>';

                    }
                }, {
                    className: 'text-center',
                    data: 'spsjZs',
                    "render": function(data, type, row) {
                        if(data==null)return "";
                        data =  moment(data).format('YYYY-MM-DD');
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+data +'" >'+data+'</span>';

                    }
                }, {
                    "data": "splxZs",
                    className:'text-center',
                    "render": function(data, type, row) {
                        if(data=='0'){
                            data = "未审核";
                        }else if(data=='1'){
                            data = "同意";
                        }else if(data=='2'){
                            data = "不同意";
                        }
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+data +'" >'+data+'</span>';

                    }
                },
                {

                    className: "text-center",
                    "render": function(data, type, row) {
                        var btn = "";
                        if(row.splxCs=='0'){
                            btn+=configMap.cssh_html;
                        }else{
                            btn+=configMap.cssh_html_disabled;
                        }

                        if(row.splxZs=='0'){
                            btn+=configMap.zssh_html;
                        }else{
                            btn+=configMap.zssh_html_disabled;
                        }

                        btn = btn + configMap.deleteBtn_html;

                        return configMap.viewPageUrl+configMap.editPageUrl+btn;
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
                var csshContainer = $('[data-type="cssh"]', jqueryMap.$container);
                var zsshContainer = $('[data-type="zssh"]', jqueryMap.$container);
                var chakanContainer = $('[data-type="chakan"]', jqueryMap.$container);
                var editContainer = $('[data-type="bianji"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(editContainer.length > 0){
                    editContainer.off('click').on('click',bianji);
                }
                if(chakanContainer.length > 0){
                    chakanContainer.off('click').on('click',chakan);
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
                if(csshContainer.length>0){
                    csshContainer.off('click').on('click',cssh);
                }

                if(zsshContainer.length>0){
                    zsshContainer.off('click').on('click',zssh);
                }
            }
        });
    }
    //查看
    var chakan = function(){
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().sqid;
        // openModal("查看", configMap.path + configMap.chakan_Url + "?sqid=" + encodeURI(id)+'&type=chakan', 'chakan');
        window.open(configMap.path + configMap.chakan_Url + "?sqid=" + encodeURI(id)+'&type=chakan','_blank');
    }
    //编辑
    var bianji = function(){
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().sqid;
        openModal("编辑", configMap.path + configMap.edit_Url + "?sqid=" + encodeURI(id), 'bianji');
    }




    //初审
    var cssh = function (){
        var el = $(this);
        var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().sqid;
        openModal("初审", configMap.path + configMap.cssh_Url + "?sh=1&sqid=" + encodeURI(id), 'cssh');
    };

    //终审
    var zssh = function (){
        var el = $(this);
        var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().sqid;
        openModal("终审", configMap.path + configMap.cssh_Url + "?sh=2&sqid=" + encodeURI(id), 'cssh');
    };



    //删除
    var del = function(event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var rowIndex = configMap.listGrid.cell(element.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().sqid;
        $.ajax({
            data:{"sqid":id},
            url: configMap.path + configMap.del_dataUrl,
            type: 'POST',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.listGrid.ajax.reload();
                    Messenger().post("删除成功!");
                } else {
                    Messenger().post({
                        message: "删除失败!",
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
        if (type === 'cssh') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    cssh_CS.saveUserInfo(function (result) {
                        if (result) {
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.listGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        if (type == 'bianji'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    var  arrAll=$('#xydForm_m').serialize();
                    arrAll=arrAll.split('&jkrqm')[0];
                    var a = $('#xydForm_m [name="jkrsfdm"] option:selected').text();
                    var b = $('#xydForm_m [name="jkrcsdm"] option:selected').text();
                    var c = $('#xydForm_m [name="jkrxqdm"] option:selected').text();
                    var d = $('#xydForm_m [name="qydjzclxdm"] option:selected').text();
                    var str = '&jkrsfmc='+ encodeURIComponent(a)+'&jkrcsmc='+ encodeURIComponent(b)+'&jkrxqmc='+encodeURIComponent(c)+'&qydjzclxmc='+encodeURIComponent(d);
                    arrAll+=str;
                    if($("#xydForm_m").valid()) {
                        $.ajax({
                            type: "POST",
                            url: "/systemmanager/xydsq/updateXydsq",
                            data: arrAll,
                            success: function (msg) {
                                if (msg.success) {
                                    Messenger().post({
                                        message: msg.message,
                                        type: 'success'
                                    });
                                } else {
                                    Messenger().post({
                                        message: msg.message,
                                        type: 'error'
                                    });
                                }


                            }
                        });

                    }else{
                        Messenger().post({message: '修改失败，请检查表单信息', type: 'error', id:'errorMessenger'});
                    }

                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn btn-default borderRadius4 color666'
        }
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };



    //导出
    var exportExcel = function () {
        stopContinueClick('#xydsq-manager-container [name="exportExcel"]', 300);
        //    开始的时间
        var sT = $('input[name="starDate"]', jqueryMap.$container).val();
        //    结束的时间
        var eT = $('input[name="endDate"]', jqueryMap.$container).val();

        var jkrxm =  $('input[name="jkrxm"]', jqueryMap.$container).val();

        var cszt =  $('select[name="cszt"]', jqueryMap.$container).val();

        var data = new Object();
        data.startDate = sT;
        data.endDate = eT;
        data.jkrxm = jkrxm;
        data.cszt = cszt;
        var param = "?";
        param+="startDate="+data.startDate+"&"+"endDate="+data.endDate+"&jkrxm="+encodeURIComponent(data.jkrxm)+"&cszt="+data.cszt;
        window.location.href = configMap.path+configMap.excel_dateUrl+param;

    }




    
    return {
        init: function() {
            setJqueryMap();
            initlistGrid();
            jqueryMap.$container.find('.beginTime_m').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            jqueryMap.$container.find('.endTime_m').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });


            //导出
            $('#xydsq-manager-container [name="exportExcel"]').off('click').on('click', function () {
                exportExcel();
            });


            $('#searchTerm-m', '#xydsq-manager-container').on('click', function () {
                configMap.listGrid.ajax.reload();
            });

        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();