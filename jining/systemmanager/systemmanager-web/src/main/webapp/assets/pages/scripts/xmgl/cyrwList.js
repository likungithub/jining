var cyrwList = function() {
    'use strict';

    var prefix = 'jcgl';

    // 全局属性参数
    var configMap = {
        dataUrl: 'systemmanager/rwgl/getRwAll',
        del_dataUrl: '/'+prefix+'/delete',
        edit_Url:'/xmgl/edit.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        cyrwListGrid: null,
        uuid:'',
        lx:'',
        data:"",
        zydm:"",
        editPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="bianji" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        fenpeiBtn_html:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="btn btn-xs default" data-type="fenpei" data-toggle="tooltip" title="分配" name="fenpei"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html_disabled: '<a disabled="disabled" href="javascript:;" class="btn btn-xs default color666"  data-toggle="tooltip" title="删除"><i style="color:#666;" class="icon iconfont icon-shanchu3 color666  iconFontSize"></i></a>',
    };


    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $fenpei:null,
        $commonproblemDialog:null,
        $commonproblemDialog1:null
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
        jqueryMap.$blockTarget = $('body');
    };

    var strArr=[];

    function delnull(d){
        if(d==undefined){
            return '';
        }
        if(d=='null'){
            return '';
        }
       return d;
    }

    /**
     * 编辑抽样任务
     */
    var bianji = function () {
        var el = $(this);
        var rowIndex = configMap.cyrwListGrid.cell(el.parent()).index().row;
        var id = configMap.cyrwListGrid.row(rowIndex).data().id;
        openModal1("编辑抽样任务", configMap.path + configMap.edit_Url + "?id=" + encodeURI(id), 'bianji');
    }
    //加载样品制备页面
    var generateTab = function(_target, srcStr, menuName, id,icon) {
        //标签移除
        $("#tab-page-nav-" + id).remove();
        //内容移除
        $("#tab-page-content-" + id).remove();
        var _opt;
        var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
        if ($a_alarm.length > 0) {
            _opt = {
                title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                id: $a_alarm.data('addtab'),
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        } else {
            _opt = {
                title: '<i class="'+icon +'"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    }
    var initcyrwListGrid = function() {
        configMap.cyrwListGrid = $('#'+configMap.uuid+'ManagerList_m', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function(data) {
                    var ypmc = $("#ypmc").val();
                    var rwzt = $("#rwzt").val();
                    data.searchText1=ypmc;
                    data.rwzt = rwzt;
                    data.rwType=null;
                    data.wtType=null;
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox_cyrwList"  value="' + data+ '"/>';
                    }
                },
                {
                    class:"text-center",
                    "render": function (data, type, row) {
                        return configMap.editPageUrl;//+""+ configMap.fenpeiBtn_html;
                    }
                },
                {
                    class:"text-center",
                    "data": "wtdwmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "wtType",
                    render:function(d,t,r){
                        d=delnull(d);
                        if (d == "001") {
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >政府委托</span>';
                        } else {
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >企业委托</span>';
                        }
                    }
                },
                {
                    class:"text-center",
                    "data": "blzt",
                    render:function(d,t,r){
                        d=delnull(d);
                        if (d == "001") {
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >已完成</span>';
                        } else if(d == '002'){
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >未分配</span>';
                        }else{
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >已分配</span>';
                        }
                    }
                },
      /*          {
                    "data": "htmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" TITLE='+d+' >'+d+'</span>';
                    }
                },*/
                {
                    class:"text-center",
                    "data":"ggxh",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"ypdj",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
   /*             {
                    class:"text-center",
                    "data":"sczdz",
                    "render":function (d,t,r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },*/
               /* {
                    class:"text-center",
                    "data":"jclbdm",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },*/
                {
                    class:"text-center",
                    "data":"ypsl",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
               /* {
                    class:"text-center",
                    "data":"rq",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },*/
                {
                    class:"text-center",
                    "data":"ypbm",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"bzq",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
                // {
                //   class:"text-center",
                //     "data":"bz",
                //     "render":function (d,t,r) {
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                //     }
                // },
                {
                    class:"text-center",
                    "data":"ypzt",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"ypbctj",
                    "render":function (d,t,r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
               /* {
                    "data": "sfmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "csmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },*/

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
                var editContainer = $('[data-type="bianji"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(editContainer.length > 0){
                    editContainer.off('click').on('click',bianji);
                }
            }
        });
    };
    var openModal3 = function (title, url, type,id){
        var dialogButtons = {};
        if (type === 'edit2') { //选择人员
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    var strArr1=[],strArr2=[];
                    $('#alreadyPer li','#allotStaffList_m').each(function(){
                        strArr1.push($(this).attr('zydm'));
                    });
                    console.log(strArr1);
                    $.ajax({
                        data:{"wtid":id,"zxry":strArr1},
                        url: '/systemmanager/rwgl/gxrwwry',
                        type: 'POST',
                        traditional: "true",
                        success: function(result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            Messenger().post("分配成功!");
                            //分配成功后改变状
                            $.ajax({
                                url:"systemmanager/rwgl/updateblzt",
                                type:"post",
                                traditional: "true",
                                data:{"idlist":id,"blzt":"003"},
                                success:function () {
                                    strArr.length=0;
                                    configMap.cyrwListGrid.ajax.reload();
                                }
                            });
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
    }

    var openModal1 = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit2') { //选择人员
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    var strArr1=[],strArr2=[];
                    $('#alreadyPer li','#allotStaffList_m').each(function(){
                        strArr1.push($(this).attr('zydm'));
                    });
                    console.log(strArr1);
                    $.ajax({
                        data:{"wtid":strArr,"zxry":strArr1,},
                        url: '/systemmanager/rwgl/gxrwwry',
                        type: 'POST',
                        traditional: "true",
                        success: function(result) {
                           App.unblockUI(jqueryMap.$blockTarget);
                                Messenger().post("分配成功!");
                                //分配成功后改变状
                            $.ajax({
                                url:"systemmanager/rwgl/updateblzt",
                                type:"post",
                                traditional: "true",
                                data:{"idlist":strArr,"blzt":"003","if_jd":"002"},
                                success:function () {
                                    strArr.length=0;
                                    configMap.cyrwListGrid.ajax.reload();
                                }
                            });
                        },
                        error: function() {
                           App.unblockUI(jqueryMap.$blockTarget);
                        }
                    });
                }
            };
        }
        if (type === 'bianji') { //编辑任务
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    console.log($("#inlineCheckbox2").prop("checked"));
                    if($("#inlineCheckbox2").prop("checked")){
                        cyrwForm.saveCYRW(function (res) {
                            if (res) {
                                jqueryMap.$commonproblemDialog1.modal('hide');
                                configMap.cyrwListGrid.ajax.reload();
                            } else {
                               jqueryMap.$commonproblemDialog1.modal('hide');
                            }
                        });
                        var ids =[];
                        console.log($("#rwid").val())
                        ids.push($("#rwid").val());
                        console.log(ids)
                        openModal2('就地制样-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any','edit2',ids)
                    }else {
                        cyrwForm.saveCYRW(function (res) {
                            if (res) {
                                jqueryMap.$commonproblemDialog1.modal('hide');
                                configMap.cyrwListGrid.ajax.reload();
                            } else {
                                jqueryMap.$commonproblemDialog1.modal('hide');
                            }
                        });
                    }
                   return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog1 = bootbox.dialog({
                className:'allotTask_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    var openModal2 = function (title, url, type,strArr) {
        console.log(strArr)
        var dialogButtons = {};
        if (type === 'edit2') { //选择人员
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    var strArr1=[],strArr2=[];
                    $('#alreadyPer li','#allotStaffList_m').each(function(){
                        strArr1.push($(this).attr('zydm'));
                    });
                    console.log(strArr1);
                    var str2 = strArr1.join(',');
                    configMap.zydm=null;
                    configMap.zydm=str2;
                   /* alert(configMap.zydm);*/
                    //改变任务状态
                    $.ajax({
                        data:{"wtid":strArr,"zxry":strArr1},
                        url: '/systemmanager/rwgl/gxrwwry',
                        type: 'POST',
                        traditional: "true",
                        success: function(result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            Messenger().post("分配成功!");
                            //分配成功后改变状
                            $.ajax({
                                url:"systemmanager/rwgl/updateblzt",
                                type:"post",
                                traditional: "true",
                                data:{"idlist":strArr,"blzt":"003","if_jd":"001"},
                                success:function () {
                                    strArr.length=0;
                                    configMap.cyrwListGrid.ajax.reload();
                                }
                            });
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
    return {
        init: function(uuid) {
            configMap.uuid=uuid;
            setJqueryMap();
            initcyrwListGrid();
            $('#searchTerm-m' + uuid, jqueryMap.$container).on('click', function () {
                configMap.cyrwListGrid.ajax.reload();
            });

            $('[name=cyrw_checkbox]').on('click',function () {
                console.log("123")
                if($("[name=cyrw_checkbox]").prop("checked")){
                    //选中
                    $("[name=checkbox_checkbox_cyrwList]").prop("checked",true);
                }else{
                    $("[name=checkbox_checkbox_cyrwList]").prop("checked",false);
                }
            });

            $($('#'+uuid+'btn_jdzy')).off('click').on('click',function(){
                var inputjson = $('[type="checkbox"]:checked', jqueryMap.$container).not(jqueryMap.$container.find('[name="cyrw_checkbox"]'));
                strArr.length=0;
                $(inputjson).each(function () {
                    var el = $(this);
                    var rowIndex = configMap.cyrwListGrid.cell(el.parent()).index().row;
                    var id = configMap.cyrwListGrid.row(rowIndex).data().id;
                    strArr.push(id);
                });

                if (strArr.length == 0) {
                    Messenger().post({
                        message: "请选择至少一个抽样任务",
                        type: 'warning'
                    });
                } else {
                    //改变任务状态
                    openModal2('就地制样-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any','edit2',strArr);
                }
            });

            $('#'+uuid+'btn_rwfp').off('click').on('click',function(){
                var inputjson = $('[name="checkbox_checkbox_cyrwList"]:checked');
                strArr.length=0;
                $(inputjson).each(function () {
                    var el = $(this);
                    var rowIndex = configMap.cyrwListGrid.cell(el.parent()).index().row;
                    var id = configMap.cyrwListGrid.row(rowIndex).data().id;
                    var blzt = configMap.cyrwListGrid.row(rowIndex).data().blzt;
                    if(blzt == '002'){
                        strArr.push(id);
                    }
                    console.log(strArr)
                });

                if (strArr.length == 0) {
                    Messenger().post({
                        message: "请选择至少一个抽样任务",
                        type: 'warning'
                    });
                } else {
                    configMap.lx = '4';
                    openModal1('抽样任务-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any', 'edit2');
                }
            });

            $('#'+uuid+'btn_rwsc').off('click').on('click',function(){
                var rwzt = [];
                var idstrr = [];
                var index = 0;
                var index1 = 0;
                var inputjson = $('[type="checkbox"]:checked', jqueryMap.$container).not(jqueryMap.$container.find('[name="cyrw_checkbox"]'));

                $(inputjson).each(function () {
                    var el = $(this);
                    var rowIndex = configMap.cyrwListGrid.cell(el.parent()).index().row;
                    var zt = configMap.cyrwListGrid.row(rowIndex).data().blzt;
                    console.log(zt)
                    if (zt!='001'){
                        var id = configMap.cyrwListGrid.row(rowIndex).data().ypbm;
                        console.log(id);
                        rwzt.push(id);
                        idstrr.push(configMap.cyrwListGrid.row(rowIndex).data().id)
                        index1++;
                    }
                    index++;

                });
                console.log(rwzt)
                if (rwzt.length == 0) {
                    Messenger().post({
                        message: "请选择至少一个抽样任务",
                        type: 'warning'
                    });
                } else {
                    //撤回任务
                    $.ajax({
                        data:{"ypbm":rwzt},
                        url:"systemmanager/rwgl/deleteRw",
                        type:"post",
                        traditional: "true",
                        success:function () {
                            $.ajax({
                                url:"systemmanager/rwgl/updateblzt",
                                type:"post",
                                traditional: "true",
                                data:{"idlist":idstrr,"blzt":"002"},
                                success:function () {

                                    configMap.cyrwListGrid.ajax.reload();
                                }
                            });
                            Messenger().post("共选择"+index+"任务!成功撤回"+index1+"个!");
                        },
                        error:function () {
                        }
                    });
                }
            });

        },
        setPath: function(path) {
            configMap.path = path;
        },
        setZydm:function (zydm) {
            configMap.zydm=zydm;
        }
    };
}();