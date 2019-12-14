/**
 *
 */
var qywtlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/zfwt/getQywtAll',
        addUrl:'/marketManage/qywt_jbxx.jsp',
        addUrl2:'/zfwt/toqywt',
        addJcxmUrl: '/marketManage/ckcyyplist.jsp',
        addJcxUrl:'/marketManage/jcxmlist.jsp',
        importUrl:'/marketManage/importExcel.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        qywtGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改企业委托信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除企业委托信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        chakanBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="chakan" title="查看样品信息"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        qywt : '',
        wttype:'',
        printBqdy:'/zfwt/qywtdybq',
        yplqprintBqdy:'/zfwt/yplqdybq',
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $container:null,
        $wtManageDataTable: null,
    };


    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#wtList-manager-content');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#qywt' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#qylist_data');
        jqueryMap.$wtManageDataTable = $('#qylist_data', jqueryMap.$container);
    };

    var qywtjson = [];
    var ypxxjson = [];


    var initQywtGrid = function () {
        configMap.qywtGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.searchText = $('[name="wtdwmc"]',jqueryMap.$content).val();
                    data.searchText1 = $('[name="ypmc"]',jqueryMap.$content).val();
                    data.type = configMap.wttype;
                    data.ypbm = $('[name="ypbm"]',jqueryMap.$content).val();
                    data.ny = $('[name="wtny"]',jqueryMap.$content).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkboxss" value="'+data+'" id="qywt_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "render": function (data, type, row) {
                        return  configMap.editBtn_html + configMap.deleBtn_html;
                    }
                },
                {
                    class:"text-center",
                    "data": "cydbm"
                },
                {
                    class:"text-center",
                    "data":"wtdw"
                },
                {
                    class:"text-center",
                    "data": "wtdwdh"
                },
                {
                    class:"text-center",
                    "data": "ypbm"
                },
                {
                    class:"text-center",
                    "data": "ypmc"
                },
                {
                    class:"text-center",
                    "data": "ypsl"
                },
                // {
                //     class:"text-center",
                //     "data": "ypdw"
                // },
                // {
                //     class:"text-center",
                //     "data":  "if_sl",
                //     render:function(d,t,r){
                //         if(d == "1"){
                //             d="已受理";
                //         }else {
                //             d="未受理";
                //         }
                //         return  d;
                //     }
                //
                // },
                {
                    class:"text-center",
                    "data":  "readonly",
                    render:function(d,t,r){
                        if(d == "1"){
                            d="<span style=\"color:skyblue\">已提交</span>";
                        }else {
                            d="未提交";
                        }
                        return  d;
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
                var editContainer = jqueryMap.$content.find('[name="contractedit"]');
                var deleteContainer = jqueryMap.$content.find('[name="contractdelete"]');
                var chakanContainer=jqueryMap.$content.find('[name="contractfind"]');

                $('[data-toggle="tooltip"]').tooltip();
                if (editContainer.length > 0){
                    editContainer.off('click').on('click', editQywt);
                }

                if(deleteContainer.length > 0){
                    deleteContainer.off('click').on('click', delQywt);
                }
                if (chakanContainer.length>0){
                    chakanContainer.off('click').on('click', chakanBtn);
                }
            }
        });
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if(type === "edit"){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractcontinue.saveContract(function (result){
                        if(result){
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.qywtGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        if(type === "change"){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractChange.saveChange(function (result){
                        if(result){
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.qywtGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        if (type === 'import') {
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
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    //修改委托信息
    var editQywt = function (){
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.qywtGrid.cell(el.parent()).index().row;
        var id = configMap.qywtGrid.row(rowIndex).data().id;
        generateTab(this, configMap.path + configMap.addUrl2 + '?id=' + id + '&type='+configMap.wttype, "修改企业委托", "qywt_info", 'fa fa-file-text-o iconMr');
    };

    //添加检测项
    var savejcx = function () {
        stopContinueClick("#saveqyjcx", 300);
        var ids=[];//定义一个数组
        $('input[name="checkbox_checkboxss"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        configMap.qywt = ids;
        if (ids.length === 0) {
            Messenger().post({
                message: '请选择一个委托！',
                type: 'warning'
            });
        } else {
            generateTab(this, configMap.path + configMap.addJcxUrl + '?type=edit&wtid=' + configMap.qywt, '增加检测项', 'ypxx_info', 'fa fa-outdent iconMr');
        };
    };

    //删除合同
    var delQywt = function () {
        var el = $(this);
        var rowIndex = configMap.qywtGrid.cell(el.parent()).index().row;
        var id = configMap.qywtGrid.row(rowIndex).data().id;
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url: configMap.path + "/zfwt/delQywt/" + id,
                            type: 'POST',
                            success: function (result) {
                                if (result.success) {
                                    configMap.qywtGrid.ajax.reload();
                                    Messenger().post({
                                        message: "删除成功",
                                        type: 'info',
                                        id: "ordermessenger"
                                    });
                                } else {
                                    Messenger().post({
                                        message: result.message,
                                        type: 'error',
                                        id: "ordermessenger"
                                    });
                                }
                            },
                            error: function () {
                                Messenger().post({
                                    message: "删除失败！",
                                    type: 'error',
                                    id: "ordermessenger"
                                });
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
    };

    //受理企业委托
    var slQYWT = function () { // □ ☑
        stopContinueClick("#slQYWT", 300);
        var ids=[];//定义一个数组
        $('input[name="checkbox_checkboxss"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if (ids.length === 0) {
            Messenger().post({
                message: '请选择一个委托！',
                type: 'warning'
            });
        } else {
            var data = {
                wtid:ids
            };
            $.ajax({
                url: configMap.path + "/zfwt/slQywt",
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                data:JSON.stringify(data),
                success:function (res) {
                    console.log(res.success);
                    if (res.success) {
                        Messenger().post({
                            message:"保存成功",
                            type:"info"
                        });
                        configMap.qywtGrid.ajax.reload();
                    } else {
                        Messenger().post({
                            message: res.message,
                            type: 'danger'
                        });
                    }
                },
                error: function (res) {
                    Messenger().post({
                        message: '保存失败！',
                        type: 'danger'
                    });
                }
            });
        };
    };

    var scQYWT = function (){
        //生成委托单
        stopContinueClick("#dayinQYWT", 300);
        var ids=[];//定义一个数组
        $('input[name="checkbox_checkboxss"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if (ids.length === 0 || ids.length >1) {
            Messenger().post({
                message: '请选择一个委托！',
                type: 'warning'
            });
        } else {
            POBrowser.openWindowModeless('customermanage/zfwt/qywtbg?wtid='+ids, 'width=1200px;height=800px;');
        };
    };
    //增加企业委托
    var addQYWT = function () {
        stopContinueClick("#addCustomerManage", 300);
        generateTab(this, configMap.path + configMap.addUrl2 + '?&type='+configMap.wttype, "创建委托", "qywt_info", 'fa fa-file-text-o iconMr');
    };


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
    };

    //全选
    var selectAllWt = function (status) {
        $('[type="checkbox"]', jqueryMap.$wtManageDataTable).prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$wtManageDataTable).not(jqueryMap.$container.find('[name="selectqywtlist"]'));
        var temp = null;
        qywtjson = [];
        $(inputjson).each(function () {
            temp = {qywt: $(this).attr('id').substring(3)};
            qywtjson.push(temp);
        });
    };

    //导入

    var importExcel = function () {
        stopContinueClick("#importQYWT", 300);
        openModal('模板导入', configMap.path + configMap.importUrl + '?type=qy', 'edit', function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$contractauditDialog.modal('hide');
                    configMap.qywtGrid.clear().draw();
                    configMap.qywtGrid.ajax.reload();
                }
            });
        });
    };
    //检测包选择

    var openModa2 = function (title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    chooseJcb.addjcxm();
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
            callback: function () {
                sessionStorage.removeItem("uuid");
                sessionStorage.removeItem("filesize");
            }
        }

        $.get(url, function (html) {

            jqueryMap.$ypManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    //导入检测包
    var addJcb = function () {
        stopContinueClick("#addJcb1", 300);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$ypManageDataTable).not(jqueryMap.$container.find('[name="selectqywtlist"]'));
        var temp = null;
        ypxxjson = [];
        $(inputjson).each(function () {
            temp = {ypxx: $(this).attr("value")};
            ypxxjson.push(temp);
        });
        var data = {
            ypxx: ypxxjson
        }
        var list = [];
        if (data.ypxx.length === 0){
            Messenger().post({
                message: '请选择一个样品！',
                type: 'warning'
            });
        }else {
            openModa2("选择检测项目包","customermanage/jcxmbao/chooseJcb.jsp?ypxx="+JSON.stringify(data),'edit')
        }
    }

    function openFileIIs(qzpath){
        try{
            var objShell=new ActiveXObject("WScript.Shell");
            var aa = objShell.Run(qzpath);
            objShell = null;
        } catch(e)
        {
            alert('找不到文件"'+qzpath+'"(或它的组件之一)。请确定路径和文件名是否正确.');
            alert(e);
        }
    }

    var wtqz = function (){
        jqueryMap.$content.find('[name=checkbox_checkboxss]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.qywtGrid.cell(el.parent()).index().row;
            var id = configMap.qywtGrid.row(rowIndex).data().id;
            // console.log(id)
            $.ajax({
                url: configMap.path + "/bglq/kehuqz?id="+id,
                type: 'POST',
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message:"打开签字板",
                            type:"info"
                        });
                        //    configMap.qywtGrid.ajax.reload();
                    } else {
                        Messenger().post({
                            message: result.message,
                            type: 'danger'
                        });
                    }

                },
                error: function (result) {
                    $('#saveKhxx').html("保存");
                    Messenger().post({
                        message: '保存失败！',
                        type: 'danger'
                    });
                }
            });

        });
    };

    //打印标签
    var qywtDyBq = function () {
        stopContinueClick("#btn_qywtdybq", 300);
        var ids=[];//定义一个数组
        $('input[name="checkbox_checkboxss"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if (ids.length === 0 || ids.length >1) {
            Messenger().post({
                message: '请选择一个委托！',
                type: 'warning'
            });
        } else {
            $.post(configMap.path + configMap.printBqdy, {ids: ids.join(",")}, function (data) {
                if (data.success) {
                    // console.log(data.data);
                    $(data.data).each(function (index, d) {
                        // console.log(d);
                        tcsPrint(d.yplx, d.ypbm, d.ypmc, d.lx, d.ypzxbz);
                    });

                    Messenger().post({
                        message: '条码打印中,请稍后...',
                        type: 'success'
                    });
                } else {
                    Messenger().post({
                        message: '打印失败',
                        type: 'error'
                    });
                }
            }, "json");
        };
    };
    //打印样品标签2 ----7月27日做成弹窗输出打印数量
    var qywtDyBq2 = function () {
        var ypbm = "";
        var inputjson = $('[name="checkbox_checkboxss"]:checked');
        var dayins = [];
        var flag=null;
        var jszt =null;
        var ids=[];//定义一个数组
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.qywtGrid.cell(el.parent()).index().row;
            ypbm = configMap.qywtGrid.row(rowIndex).data().YPBM;
            dayins.push({"ypbm":ypbm});
            console.log(rowIndex+" "+JSON.stringify(dayins));
        });
        if (dayins.length == 0) {
            Messenger().post({
                message: '请选择标签打印数据!',
                type: 'warning'
            });
            return;//直接退出
        };
            openModalDyYpbm("请输入打印数量", "customermanage/ypgl/TiaoMasl.jsp", dayins);
    }
    var openModalDyYpbm = function (title, url,jcxmjson) {
        var dialogButtons = {};
        var ypbm = "";
        var inputjson = $('[name="checkbox_checkboxss"]:checked');
        $(inputjson).each(function () {
            var $el = $(this);
            var rowIndex = configMap.qywtGrid.cell($el.parent()).index().row;
            ypbm = configMap.qywtGrid.row(rowIndex).data().YPBM;
        });
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var tyzl = $("#fileName").val();
                $.post(configMap.path + configMap.yplqprintBqdy, {ypbm: ypbm,tyzl:tyzl}, function (data) {
                    if (data.success) {
                        // console.log(2222222);
                        $(data.data).each(function (index, d) {
                            // console.log(d+'!!!!');
                            tcsPrint(d.yplx, d.ypbm, d.ypmc, d.lx, d.ypzxbz);
                        });
                        Messenger().post({
                            message: '条码打印中,请稍后...',
                            type: 'success'
                        });
                    } else {
                        Messenger().post({
                            message: '打印失败',
                            type: 'error'
                        });
                    }
                }, "json");
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
    };
    //打印
    var tcsPrint = function (yplx, ypbm, ypmc, lx, ypzxbz) {
        console.log(yplx+'/'+ypbm+'/'+ypmc+'/'+lx+'/'+ypzxbz);
        var TSCObj;
        TSCObj = new ActiveXObject("TSCActiveX.TSCLIB");

        TSCObj.ActiveXopenport("TSC TTP-244 Pro");
        TSCObj.ActiveXsetup("60", "40", "5", "12", "0", "2", "0");
        TSCObj.ActiveXsendcommand("SET TEAR ON");
        TSCObj.ActiveXclearbuffer();
        TSCObj.ActiveXwindowsfont(40, 30, 32, 0, 2, 0, "Arial", "抽样单号:"+ypzxbz);
        TSCObj.ActiveXwindowsfont(40, 70, 32, 0, 2, 0, "Arial", "样品编码:");
        TSCObj.ActiveXwindowsfont(170, 70, 32, 0, 2, 0, "Arial", ypbm);
        TSCObj.ActiveXwindowsfont(40, 110, 32, 0, 2, 0, "Arial", "样品名称:");
        TSCObj.ActiveXwindowsfont(170, 110, 32, 0, 2, 0, "Arial", ypmc);
        TSCObj.ActiveXwindowsfont(40, 150, 32, 0, 2, 0, "Arial", lx+":");
        TSCObj.ActiveXwindowsfont(120, 150, 32, 0, 2, 0, "Arial", yplx);
        TSCObj.ActiveXbarcode("40", "190", "128", "90", "1", "0", "2", "2", ypbm);
        // TSCObj.ActiveXsendcommand("QRCODE 10,15,L,5,A,0,M2,S3,\"" + code + "\"");
        TSCObj.ActiveXprintlabel("1", "1");
        TSCObj.ActiveXcloseport();
    };
    //打印
    var tcsPrint2 = function (yplx, ypbm, ypmc, lx, ypzxbz) {
        var TSCObj;
        TSCObj = new ActiveXObject("TSCActiveX.TSCLIB");

        TSCObj.ActiveXopenport("TSC TTP-244 Pro");
        TSCObj.ActiveXsetup("60", "40", "5", "12", "0", "2", "0");
        TSCObj.ActiveXsendcommand("SET TEAR ON");
        TSCObj.ActiveXclearbuffer();
        TSCObj.ActiveXwindowsfont(40, 15, 40, 0, 2, 0, "Arial", ypzxbz+"(检样)");
        TSCObj.ActiveXwindowsfont(40, 70, 32, 0, 2, 0, "Arial", "样品编码:");
        TSCObj.ActiveXwindowsfont(170, 70, 32, 0, 2, 0, "Arial", ypbm);
        TSCObj.ActiveXwindowsfont(40, 110, 32, 0, 2, 0, "Arial", "样品名称:");
        TSCObj.ActiveXwindowsfont(170, 110, 32, 0, 2, 0, "Arial", ypmc);
        // TSCObj.ActiveXwindowsfont(40, 150, 32, 0, 2, 0, "Arial", lx+":");
        // TSCObj.ActiveXwindowsfont(120, 150, 32, 0, 2, 0, "Arial", yplx);
        TSCObj.ActiveXbarcode("40", "190", "128", "90", "1", "0", "2", "2", ypbm);
        // TSCObj.ActiveXsendcommand("QRCODE 10,15,L,5,A,0,M2,S3,\"" + code + "\"");
        TSCObj.ActiveXprintlabel("1", "1");
        TSCObj.ActiveXcloseport();
    };


    //委托单提交，readOnly = 1
    var tjReadonly = function () {
        debugger;
        stopContinueClick("#tjQYWT", 300);
        var ids=[];//定义一个数组
        $('input[name="checkbox_checkboxss"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if (ids.length === 0) {
            Messenger().post({
                message: '请选择一个委托！',
                type: 'warning'
            });
        } else {
            var data = {
                wtid:ids
            };
            $.ajax({
                url: configMap.path + "/zfwt/tjReadonlyController",
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                data:JSON.stringify(data),
                success:function (res) {
                    console.log(res.success);
                    if (res.success) {
                        Messenger().post({
                            message:"提交成功",
                            type:"info"
                        });
                        configMap.qywtGrid.ajax.reload();
                    } else {
                        Messenger().post({
                            message: res.message,
                            type: 'danger'
                        });
                    }
                },
                error: function (res) {
                    Messenger().post({
                        message: '提交失败！',
                        type: 'danger'
                    });
                }
            });
        };
    };
    var gotoAddJcxm = function () {
        stopContinueClick("#saveqyjcx", 300);
        var inputjson = $('[name="checkbox_checkboxss"]:checked');
        var wtid = "";
        var ypxxjson = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.qywtGrid.cell(el.parent()).index().row;
            wtid = configMap.qywtGrid.row(rowIndex).data().ypbm;
            ypxxjson.push(wtid);
        });

        if (ypxxjson.length != 1) {
            Messenger().post({
                message: '请选择一个样品！',
                type: 'warning'
            });
            return;
        } else {
            viewJcxmTab(this, configMap.path + configMap.addJcxmUrl + '?wtid=' + encodeURI(wtid), "检测项目信息", "jcxmxx", '');
        }

    };

    var viewJcxmTab = function (_target, srcStr, menuName, id, icon) {
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
                title: '<i class="' + icon + '"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    };
    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid = $('#qywt' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, qywtlist);
            jqueryMap.$content.find('.beginTime').datepicker({
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
            });
            jqueryMap.$content.find('.nianyue').datepicker({
                clearBtn: true,
                format: 'yyyy-mm',
                autoclose: true,
                language: 'zh-CN',
                startView: 'months', //开始视图层，为月视图层
                maxViewMode:'years', //最大视图层，为年视图层
                minViewMode:'months' //最小视图层，为月视图层
            });

            initQywtGrid();
            $("#addQYWT",jqueryMap.$content).off('click').on('click',function (){
                addQYWT();
            });

            //查询
            $("#qywtSearch",jqueryMap.$content).off('click').on('click',function (){
                configMap.qywtGrid.ajax.reload();
            });

            //点击选择所有(委托)
            jqueryMap.$container.find('[name="selectqywtlist"]').change(function () {
                var el = $(this);
                selectAllWt(el.is(':checked'));
            });

            $("#dayinQYWT",jqueryMap.$content).off('click').on('click',function(){
                scQYWT();
            });

            //添加检测项
            $('#saveqyjcx').off().on('click', function () {
                // savejcx();
                gotoAddJcxm();
            });

            //委托签字
            $('#wtqz').off().on('click', function () {
                openFileIIs("C:\\qianzidemo\\immortal.bat");
                wtqz();
            });

            //受理企业委托
            $('#slQYWT').off().on('click', function () {
                slQYWT();
            });

            //提交
            $('#tjReadonly').off().on('click', function () {
                tjReadonly();
            });

            //导入
            $("#importQYWT",jqueryMap.$content).off('click').on('click',function (){
                importExcel();
            });

            //打印标签
            $('#btn_qywtdybq').off().on('click', function () {
                qywtDyBq2();
            });

            $("#reset",jqueryMap.$content).off('click').on('click',function (){
                $('[name="ypbm"]',jqueryMap.$content).val('');
                $('[name="ypmc"]',jqueryMap.$content).val('');
                $('[name="wtdwmc"]',jqueryMap.$content).val('');
                $('[name="wtny"]',jqueryMap.$content).val('');
                // $('[name="zwbgendDate"]',jqueryMap.$content).val('');
                configMap.qywtGrid.ajax.reload();
            });
            //导入检测包
            $('#addJcb1', jqueryMap.$container).on('click',function () {
                addJcb();
            });

        },
        setPath: function (path) {
            configMap.path = path;
        },
        setType: function (type) {
            configMap.wttype = type;
        },
        reload: function () {
            configMap.qywtGrid.ajax.reload();
        }
    };
}();
//@ sourceURL=contractlist.js
	
	