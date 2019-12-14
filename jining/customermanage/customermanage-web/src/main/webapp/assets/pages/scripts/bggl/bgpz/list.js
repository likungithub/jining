var list = function() {
    'use strict';

    var prefix = 'bggl/bgpz';

    // 全局属性参数
    var configMap = {
        dataUrl: '/'+prefix+'/querylist',
        del_dataUrl: '/'+prefix+'/delete',
        edit_Url:'/'+prefix+'/edit.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        uuid:'',
        lx:'',
        id:'',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="查看报告"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',

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
                    data.ypbm= $('input[name="ypbm"]', jqueryMap.$container).val();
                    data.htmc=$("#bgpz_htmc").val();
                    data.startDate=$("#bgpz_startDate").val();
                    data.endDate=$("#bgpz_endDate").val();
                    data.ypzt= $('select[name="ypzt"]', jqueryMap.$container).val();
                }
            },
            "columns": [
                {
                    "data": "ID",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                // {
                //     "data": "HTMC",
                //     render:function(d,t,r){
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                //     }
                // },
                {
                    "data": "wtid",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
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
                /*{
                    "data": "SJCJRQ",
                    render:function(d,t,r){
                        d=delnull(d);
                        if(d!='')
                        d =  moment(d).format('YYYY-MM-DD');
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },*/
                {
                    "data": "scdw",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "scdwlxdh",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "scdz",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
               /* {
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
                },*/
                {
                    "data": "BGPZZT",
                    render:function(d,t,r){
                        if(d=='000'){
                            d = "未分配";
                        }
                        if(d=='001'){
                            d = "待批准";
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
                ,
                {
                    className: "text-center",
                    "render": function (data, type, row) {
                        return  configMap.editBtn_html;
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
                var chakanContainer = jqueryMap.$container.find('[name="contractedit"]');

                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var delContainer = $('[data-type="del"]', jqueryMap.$container);
                var editContainer = $('[data-type="bianji"]', jqueryMap.$container);
                // var chakanContainer = $('[data-type="chakan"]', jqueryMap.$container);
                var findContainer = $("#bgpz_searchTerm");

                if(findContainer.length > 0){
                    findContainer.off('click').on('click',findBtn);
                }
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(editContainer.length > 0){
                    editContainer.off('click').on('click',bianji);
                }

                if(chakanContainer.length > 0){
                    chakanContainer.off('click').on('click', editQywt);
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

    var editQywt = function (){
        var strArr = [];
        var el = $(this);
        var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
        var ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
        var id = configMap.listGrid.row(rowIndex).data().ID;
        strArr.push(id);
        if (strArr.length==0||strArr.length>1){
            Messenger().post({
                message: '请选择一个样品！',
                type: 'warning'
            });
        }else {
            // POBrowser.openWindowModeless('customermanage/bggl/dywtbg?wtid='+id+'&ypbm='+ypbm+'&cd=1&ifdy=0', 'width=1200px;height=800px;');
            POBrowser.openWindowModeless('customermanage/bggl/pldywtpdfbg?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=1', 'width=1200px;height=800px;');
        }
    };

    var findBtn = function () {
        configMap.listGrid.ajax.reload();
    }
    var chakan = function (ypbm,id,type) {
        POBrowser.openWindowModeless('/customermanage/openword?ypbm='+ypbm+"&id="+id +"&type="+type, 'width=1200px;height=800px;')
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

    function savezt(zt){
        //报告审核
        configMap.lx='2';
        var data = {};
        data.lx = configMap.lx;
        data.zt = zt;
        var strArr = [];
        var flag = false;
        var ypbms = [];
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            configMap.id = id;
            var shzt = configMap.listGrid.row(rowIndex).data().BGPZZT;
            ypbms.push(configMap.listGrid.row(rowIndex).data().YPBM);
            if(shzt!='001'){ //通过
                flag = true;//直接退出
            }
            strArr.push(id);
        });
        // if(flag){
            //     Messenger().post("不能重复审核!");
        //     return;
        // }
        if (strArr.length < 1) {
            Messenger().post("请选择审核信息!");
            return;
        }
        data.id = strArr.join(',');
        $.ajax({
            data:data,
            url: configMap.path + '/'+prefix+'/updatezt?ypbm='+ypbms,
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

        //退回增加原因
        if(zt=='004') {

            //var thyy= document.getElementById("shth").value;//退回说明
            //$("#pztjthyy").off("click").on("click",function () {
                var ids = configMap.id;
                var lx = '2';
                var thyy= document.getElementById("pzth").value;
                $.ajax({
                    url:"customermanage/bggl/thyy?ypbm="+ypbms,
                    data:{"thyy":thyy,"id":ids,'lx':lx},
                    success: function(result) {
                        App.unblockUI(jqueryMap.$blockTarget);
                      //  if (result.success) {
                            configMap.listGrid.ajax.reload();
                            $("#pzthyy").modal('hide');
                            $("#pzth").val('');
                            configMap.id="";
                      //      Messenger().post("操作成功!");
                      //  } else {
                           /* Messenger().post({
                                message:result.message,
                                type: 'error'*/
                       //     });
                      //  }
                    },
                    error: function() {
                        App.unblockUI(jqueryMap.$blockTarget);
                        $("#pzthyy").modal('hide');
                    }
                });
            //});
        }

    }

    function btn_Printing(zt) {
        var strArr = [];
        var id = "";
        var ypbm = "";
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            id = configMap.listGrid.row(rowIndex).data().ID;
            ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
            configMap.id = id;
            strArr.push(id);
        });
        if (strArr.length != 1) {
            Messenger().post("请选择打印信息!");
            return;
        }
        if(zt=='001') {
            /*alert("流转单打印逻辑")*/
            if (strArr.length==0||strArr.length>1){
                Messenger().post({
                    message: '请选择一个样品！',
                    type: 'warning'
                });
            }else {
                POBrowser.openWindowModeless('customermanage/bggl/dylzd?wtid='+id+'&ypbm='+ypbm+'&cd=1&ifdy=1', 'width=1200px;height=800px;');
            }
        }
        if(zt=='002') {
            /*alert("存档报告打印打印逻辑")*/
            if (strArr.length==0||strArr.length>1){
                Messenger().post({
                    message: '请选择一个样品！',
                    type: 'warning'
                });
            }else {
                // openModalDy("请选择打印内容","customermanage/marketManage/bgdyRadio.jsp",id,ypbm)
                POBrowser.openWindowModeless('customermanage/bggl/pldywtpdfbg?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=1', 'width=1200px;height=800px;');
            }
        }
    }
    var openModalDy = function (title, url,id,ypbm) {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 打&nbsp;印 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var radio = $("input:radio:checked").val();
                // POBrowser.openWindowModeless('customermanage/bggl/dywtbg?wtid='+id+'&ypbm='+ypbm+'&cd=1&ifdy=1&radio='+radio, 'width=1200px;height=800px;');
                POBrowser.openWindowModeless('customermanage/bggl/pldywtpdfbg?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=1', 'width=1200px;height=800px;');
            }
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size: "small"
            });
        });
    }
    function th() {
        $("#pztjthyy").off("click").on("click",function () {
            savezt('004');
        });
    }
    return {
        init: function(uuid) {
            configMap.uuid=uuid;
            setJqueryMap();
            initlistGrid();
           /* $('#searchTerm-m', jqueryMap.$container).on('click', function () {
                configMap.listGrid.ajax.reload();
            });*/


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



            //退回 删除人员
            $($('#'+uuid+'btn_sjjy_th')).off('click').on('click',function(){
                //通过 002
                //savezt('004');
                $("#pzthyy").modal({show: true});
            });
            th();
            $($('#'+uuid+'btn_sjjy_tg')).off('click').on('click',function(){
                //通过 002
                savezt('002');
            });

            $($('#'+uuid+'btn_sjjy_btg')).off('click').on('click',function(){
                //不通过 003
                savezt('003');
            });

            $('#'+configMap.uuid+'lzdPrinting',jqueryMap.$container).on('click',function () {
                btn_Printing('001');
            });
            $('#'+configMap.uuid+'cdbgPrinting',jqueryMap.$container).on('click',function () {
                btn_Printing('002');
            });
        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();