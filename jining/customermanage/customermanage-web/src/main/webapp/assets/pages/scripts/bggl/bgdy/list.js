var list = function() {
    'use strict';

    var prefix = 'bggl/bgdy';

    // 全局属性参数
    var configMap = {
        dataUrl: '/'+prefix+'/querylist',
        del_dataUrl: '/'+prefix+'/delete',
        edit_Url:'/'+prefix+'/edit.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        uuid:'',
        lx:'',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan" data-toggle="tooltip" title="查看样品流转单"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
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
                    //杨
                    data.wtdw = $('input[name="wtdw"]', jqueryMap.$container).val();

                    data.ypbm= $('input[name="ypbm"]', jqueryMap.$container).val();
                    data.ny = $('input[name="wtny"]', jqueryMap.$container).val();
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
                    className:"text-center",
                    "render": function(data, type, row) {
                        var btn = "";
                        btn = btn + configMap.viewBtn_html;
                        return  btn+""+
                            '<a href="javascript:;" class="btn btn-xs default" data-type="chakanlz" data-toggle="tooltip" title="打印报告"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>';
                          //  +'<a href="javascript:;" class="btn btn-xs default" data-type="chakanfm" data-toggle="tooltip" title="查看封面"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>';
                    }

                },
                {
                    className:"text-center",
                    "data": "YPBM",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    className:"text-center",
                    "data": "YPMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    className:"text-center",
                    "data": "JCXM",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
              /*  {
                    "data": "SJCJRQ",
                    render:function(d,t,r){
                        d=delnull(d);
                        if(d!='')
                        d =  moment(d).format('YYYY-MM-DD');
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },*/
                {
                    className:"text-center",
                    "data": "DWMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                }
                ,
                {
                    "data": "BGZJSPSJ",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                }
                // {
                //     "data": "CSMC",
                //     render:function(d,t,r){
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                //     }
                // },
                // {
                //     "data": "XJMC",
                //     render:function(d,t,r){
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                //     }
                // },
                // {
                //     "data": "BGDYZT",
                //     render:function(d,t,r){
                //         if(d=='000'){
                //             d = "未分配";
                //         }
                //         if(d=='001'){
                //             d = "已分配";
                //         }
                //         if(d=='002'){
                //             d = "通过";
                //         }
                //         if(d=='003'){
                //             d = "未通过";
                //         }
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                //     }
                // }
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
                var delContainer = $('[data-type="del"]', jqueryMap.$container);
                var editContainer = $('[data-type="bianji"]', jqueryMap.$container);
                var chakanContainer = $('[data-type="chakan"]', jqueryMap.$container);
                var chakanlzContainer = $('[data-type="chakanlz"]', jqueryMap.$container);
                var chakanlzContainerfm = $('[data-type="chakanfm"]', jqueryMap.$container);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(editContainer.length > 0){
                    editContainer.off('click').on('click',bianji);
                }

                if(chakanContainer.length > 0){
                    chakanContainer.off('click').on('click',chakan);
                }
                if(chakanlzContainerfm.length>0){
                    chakanlzContainerfm.off('click').on('click',function () {
                        var el = $(this);
                        var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                        var ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
                        var id= configMap.listGrid.row(rowIndex).data().ID;
                        // console.log(ypbm)
                        // console.log(id)
                        chakanfm(ypbm,id);
                    })
                }
                chakanlzContainer.off('click').on('click',function () {
                    var el = $(this);
                    var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                    var ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
                    var id= configMap.listGrid.row(rowIndex).data().ID;
                    /*console.log(ypbm)
                    console.log(id)*/
                        chakan1(ypbm,id)
                    });

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

    var chakan = function () {
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
            POBrowser.openWindowModeless('customermanage/bggl/dylzd?wtid='+id+'&ypbm='+ypbm+'&cd=1&ifdy=1', 'width=1200px;height=800px;');
        }
        /*console.log(id)*/
/*        $.ajax({
            url:"customermanage/lzd/createLZD?ypbm="+ypbm+"&ypid="+id,
            type:"POST",
            success:function (data) {
                POBrowser.openWindowModeless('customermanage/openword1?ypbm='+ypbm+"&id="+id, 'width=1200px;height=800px;');
            },
            error:function (data) {
                console.log(12312313)
            }
        });*/

    }
    var chakanfm = function (ypbm,id) {
        POBrowser.openWindowModeless('/customermanage/openword10?ypbm='+ypbm, 'width=1200px;height=800px;');
    }
    var chakan1 = function (ypbm,id) {
        POBrowser.openWindowModeless('customermanage/bggl/pldywtpdfbg?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=1', 'width=1200px;height=800px;');
        // openModalDy("请选择打印内容","customermanage/marketManage/bgdyRadio.jsp",id,ypbm)
        /*POBrowser.openWindowModeless('customermanage/bggl/dywtbg?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=1&ifbgdy=1', 'width=1200px;height=800px;');*/
        /*POBrowser.openWindowModeless('customermanage/openwordwtbg?id='+ypbm, 'width=1200px;height=800px;');*/
    }
    var openModalDy = function (title, url,id,ypbm) {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 打&nbsp;印 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var radio = $("input:radio:checked").val();
                POBrowser.openWindowModeless('customermanage/bggl/dywtbg?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=1&radio='+radio, 'width=1200px;height=800px;');
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
    var printReport = function (type) {
        var strArr = [];
        var ypbm;
        var id;
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
            id = configMap.listGrid.row(rowIndex).data().ID;
            strArr.push(id);
        });
        if (strArr.length != 1) {
            Messenger().post("请选择一个报告记录!");
        } else {
            POBrowser.openWindowModeless('customermanage/bggl/dywtbg?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=1&radio='+type, 'width=1200px;height=800px;');
        }
    };
    var printReports = function () {
        var strArr = [];
        var ypbm;
        var id;
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
            id = configMap.listGrid.row(rowIndex).data().ID;
            strArr.push(ypbm);
        });
        if (strArr.length < 1) {
            Messenger().post("请选择报告记录!");
        } else {
            var ypbms = strArr.join(',');
            //选择样品是否都存在报告
            $.ajax({
                data: {ypbm: ypbms},
                url: 'customermanage/bggl/checkbglj',
                type: 'POST',
                async: false,
                success: function (result) {
                    if (result.success) {
                        POBrowser.openWindowModeless('customermanage/bggl/pldywtpdfbg?wtid='+id+'&ypbm='+ypbms+'&cd=0&ifdy=1', 'width=1200px;height=800px;');
                    } else {
                        Messenger().post({
                            message: '选择报告中存在尚未生成报告文件的记录！',
                            type: 'error'
                        });
                    }

                },
                error: function () {
                    Messenger().post({
                        message: '网络通信异常，请稍后重试！',
                        type: 'error'
                    });
                }
            });
        }
    };

    function savezt(zt){
        //报告审核
        configMap.lx='3';
        var data = {};
        data.lx = configMap.lx;
        data.zt = zt;
        var strArr = [];
        var flag = false;
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            var shzt = configMap.listGrid.row(rowIndex).data().BGDYZT;
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
    };
    //交接单打印
    var jjddy = function () {
        var ypmc =  $('input[name="ypmc"]', jqueryMap.$container).val();
        var wtdw =  $('input[name="wtdw"]', jqueryMap.$container).val();
        var ypbm= $('input[name="ypbm"]', jqueryMap.$container).val();
        var ny = $('input[name="wtny"]', jqueryMap.$container).val();
        if(ny==null ||ny=="" || ny.length==0)
        {
            Messenger().post({
                message: '请指定要打印交接单的年月！',
                type: 'error'
            });
            return;
        }
        POBrowser.openWindowModeless('customermanage/bggl/bgdyjjd/jjdlist?ypbm='+ypbm+'&ypmc='+ypmc+'&ny='+ny, 'width=1200px;height=800px;');

    }

    //不合格报告打印
    var bhgbg = function () {
        var ypmc =  $('input[name="ypmc"]', jqueryMap.$container).val();
        var wtdw =  $('input[name="wtdw"]', jqueryMap.$container).val();
        var ypbm= $('input[name="ypbm"]', jqueryMap.$container).val();
        var ny = $('input[name="wtny"]', jqueryMap.$container).val();
        if(ny==null ||ny=="" || ny.length==0)
        {
            Messenger().post({
                    message: '请指定要打印不合格报告的年月！',
                type: 'error'
            });
            return;
        }
        POBrowser.openWindowModeless('customermanage/bggl/bgdybhg/bhgbglist?ypbm='+ypbm+'&ypmc='+ypmc+'&ny='+ny, 'width=1200px;height=800px;');

    }
    
    return {
        init: function(uuid) {
            configMap.uuid=uuid;
            setJqueryMap();
            initlistGrid();
            $('#searchTerm-m', jqueryMap.$container).on('click', function () {
                configMap.listGrid.ajax.reload();
            });
            $('#dy-jiaojiedan', jqueryMap.$container).on('click', function () {
                jjddy();
            });

            $('#dy-bhgbg', jqueryMap.$container).on('click', function () {
                bhgbg();
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

            jqueryMap.$container.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm',
                autoclose: true,
                language: 'zh-CN',
                startView: 'months', //开始视图层，为月视图层
                maxViewMode:'years', //最大视图层，为年视图层
                minViewMode:'months' //最小视图层，为月视图层
            });

            //退回 删除人员
            $($('#'+uuid+'btn_sjjy_th')).off('click').on('click',function(){
                //通过 002
                savezt('004');
            });

            $($('#'+uuid+'btn_sjjy_tg')).off('click').on('click',function(){
                //通过 002
                savezt('002');
            });

            $($('#'+uuid+'btn_sjjy_btg')).off('click').on('click',function(){
                //不通过 003
                savezt('003');
            });
            $('#'+uuid+'dy-fengpi', jqueryMap.$container).off('click').on('click',function(){
                printReport('1');
            });
            $('#'+uuid+'dy-neirong', jqueryMap.$container).off('click').on('click',function(){
                printReport('2');
            });
            $('#'+uuid+'dy-baogao', jqueryMap.$container).off('click').on('click',function(){
                // printReport('3');
                printReports();
            });
        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();