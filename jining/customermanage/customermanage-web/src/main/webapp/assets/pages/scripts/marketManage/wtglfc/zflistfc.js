/**
 *
 */
var zfwtlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/zfwt/getZfwtAll',//控制层映射
        // addUrl:'/marketManage/zfwt_jbxx.jsp',//添加政府委托信息的路径
        addUrl:'/zfwt/tozfwt',
        addJcxmUrl: '/marketManage/ckcyyplist.jsp',
        addJcxUrl:'/marketManage/jcxmlistcy.jsp',
        importUrl:'/marketManage/importExcel.jsp',//引入表格的路径
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        zfwtGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改抽样单信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除抽样单信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        classType: '',
        fwzt: '',
        other: '',
        qywt : '',
        printBqdy:'/zfwt/zfwtdybq',
        dzcydPath:""
    };

    // 全局Dom
    var jqueryMap = {
        $ManageDialog:null,
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $container:null,
        $wtManageDataTable:null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#zfwt' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data');
        jqueryMap.$container = $('#zfwt' + uuid);
        jqueryMap.$wtManageDataTable = $('#list_data', jqueryMap.$container);
    };

    var initZfwtGrid = function () {
        configMap.zfwtGrid = jqueryMap.$manualdata.DataTable({
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
                    data.searchText1 = $('[name="cydbh"]',jqueryMap.$content).val();
                    data.searchText2 = $('[name="ypmc"]',jqueryMap.$content).val();
                    data.ny = $('[name="wtny"]',jqueryMap.$content).val();
                    data.cydh = "";
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox" value="'+data+'" id="zfwt_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "render": function (data, type, row) {
                        return configMap.editBtn_html + configMap.deleBtn_html;
                    }
                },
                {
                	class:"text-center",
                	"data": "cydbm"
                },
                {
                    class:"text-center",
                    "data": "sjdw"
                },
                {
                    class:"text-center",
                    "data": "sjdwlxdh"
                },
                {
                    class:"text-center",
                    "data": "scdw"
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
                {
                    class:"text-center",
                    "data":  "if_sl",
                    render:function(d,t,r){
                        if(d == "1"){
                            d="<span style=\"color:skyblue\">已提交</span>";
                        }else {
                            d="未提交";
                        }
                        return  d;
                    }
                }
                // {
                //     class:"text-center",
                //     "data":  "cxzt",
                //     render:function(d,t,r){
                //         if(d == "002"){
                //             d="食品安全监督";
                //         }else if (d ==  "004") {
                //             d="畜产品质检";
                //         }else if (d == "005") {
                //             d="农产品质监";
                //         }
                //         return  d;
                //     }
                // }
                // {
                // 	class:"text-center",
                //     "data": "fwqxq",
                //     "render": function (data, type, row) {
                //         return '<label data-toggle="tooltip" data-placement="bottom" title="' +
                //             moment(data).format('YYYY.MM') + '-' + moment(row.fwqxz).format('YYYY.MM') + '">' +
                //             moment(data).format('YYYY.MM') + '-' + moment(row.fwqxz).format('YYYY.MM') + '</label>';
                //     }
                // },
                //
                // {
                //     className:'text-right',
                //     "data": "hjje",
                //     "render":function (data){
                //         return moneySplitByComma(data.toFixed(2));
                //     }
                // },
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

                $('[data-toggle="tooltip"]').tooltip();
                if (editContainer.length > 0){
                	editContainer.off('click').on('click', editZfwt);
                }

                if(deleteContainer.length > 0){
                	deleteContainer.off('click').on('click', delZfwt);
                }
            }
        });
    };

    var openPrintLab = function () {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 打&nbsp;印 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                printSave();
                return false;
            }
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(configMap.path + '/marketManage/wtlabelprint.jsp', function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: '标签打印',
                size: 'small',
                message: html,
                buttons: dialogButtons
            });
        });
    };
    var openModal = function (title, url, type, func) {
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
            				configMap.zfwtGrid.ajax.reload();
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
                            configMap.zfwtGrid.ajax.reload();
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
    var openModal2 = function (title, url, type, func, size) {//打开导入一对一基本信息
        var dialogButtons = {};
        if (type === 'import') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
        }

        $.get(url, function (html) {
            jqueryMap.$ManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size: size
            });
        });
    };
    //修改委托信息
    var editZfwt = function (){
    	stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.zfwtGrid.cell(el.parent()).index().row;
        var id = configMap.zfwtGrid.row(rowIndex).data().id;
        generateTab(this, configMap.path + configMap.addUrl + '?id=' + id, "修改抽样信息", "zfwt_info", 'fa fa-file-text-o iconMr');
    };
    
    //删除合同
    var delZfwt = function (){
        var el = $(this);
        var rowIndex = configMap.zfwtGrid.cell(el.parent()).index().row;
        var id = configMap.zfwtGrid.row(rowIndex).data().id;
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url: configMap.path + "/zfwt/delZfwt/" + id,
                            type: 'POST',
                            success: function (result) {
                                if (result.success) {
                                    configMap.zfwtGrid.ajax.reload();
                                    Messenger().post({
                                        message: "删除成功",
                                        type: 'info',
                                        id:"ordermessenger"
                                    });
                                } else {
                                    Messenger().post({
                                        message: result.message,
                                        type: 'error',
                                        id:"ordermessenger"
                                    });
                                }
                            },
                            error: function () {
                                Messenger().post({
                                    message: "删除失败！",
                                    type: 'error',
                                    id:"ordermessenger"
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

    //增加政府委托
    var addSPCY = function () {
        stopContinueClick("#addCustomerManage", 300);
        generateTab(this, configMap.path + configMap.addUrl, "新增抽样信息", "zfwt_info", 'fa fa-file-text-o iconMr');
    };

    //添加检测项
    var savejcx = function () {
        stopContinueClick("#savejcx", 300);
        var ids=[];//定义一个数组
        $('input[name="checkbox_checkbox"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
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

    //导入

    var importExcel = function () {
        console.log(1111111111111116666666);
        stopContinueClick("#importZFWT", 300);
        openModal('模板导入', configMap.path + configMap.importUrl + '?type=zf', 'import', function () {
            console.log(111111111111111111);
            setInExcel.subimtBtn(function (result) {
                console.log(111222);
                if (result) {
                    jqueryMap.$contractauditDialog.modal('hide');
                    configMap.zfwtGrid.clear().draw();
                    configMap.zfwtGrid.ajax.reload();
                }
            });
        });
    };
    /**
     * 一对一委托信息导入
     */
    var ydydr = function () {
        openModal2("抽样信息导入", '/customermanage/marketManage/ydywtxx/importYdyxxdrExcel.jsp', "import", function () {
            setInydywtExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ManageDialog.modal('hide');
                    configMap.zfwtGrid.clear().draw();
                    configMap.zfwtGrid.ajax.reload();
                    Messenger().post({
                        message: "导入成功",
                        type: 'success'
                    });
                }
            });
        }, null);
    };
    var qywtjson = [];
    var ypxxjson = [];
    //导入检测包
    var addJcb = function () {
        stopContinueClick("#addJcb1"+configMap.uuid, 300);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$ypManageDataTable).not(jqueryMap.$container.find('[name="selectspcylist"]'));
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

    //保存并打印
    var printSave = function () {
        var cydbm = $('input[name="cydbm"]', $('#wtlbaelprint-form-datas')).val(); //抽样单编号
        console.log('cydbm:'+cydbm);
        var datas = "{" +
            //基本信息
            "\"cydbm\":\"" + $('input[name="cydbm"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样单编号
            "\"rwlx\":\"" + $('#renwuleixing', jqueryMap.$zfwtForm).val() + "\"" + //任务类型
            "}"; //备注

        var url = '/customermanage/zfwt/saveZfwt';
        var type = 'POST';

        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: datas,
            success: function (result) {
                if (result.success) {
                    //关闭当前选项卡
                    zfwtlist.reload();
                    //保存成功后
                    //调用打印机
                    $.ajax({
                        url: configMap.path + '/zfwt/wtdybq',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: datas,
                        success: function (result) {
                            if (result.success) {
                                $(result.data).each(function (index, d) {
                                    // console.log(d);
                                    tcsPrint(d.yplx, d.ypbm, d.ypmc, d.lx, d.ypzxbz,d.cydbm);
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

                        },
                        error: function (result) {
                            Messenger().post({
                                message: '打印失败',
                                type: 'error'
                            });
                        }
                    });
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


    };
    //打印标签
    var zfwtDyBq = function () {
        stopContinueClick("#btn_zfwtdybq", 300);
        var ids = [];//定义一个数组
        $('input[name="checkbox_checkbox"]:checked', jqueryMap.$content).each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if (ids.length === 0 ) {
            Messenger().post({
                message: '请选择需要打印的委托！',
                type: 'warning'
            });
        } else {
            $.post(configMap.path + configMap.printBqdy, {ids: ids.join(",")}, function (data) {
                if (data.success) {
                    $(data.data).each(function (index, d) {
                        // console.log(d);
                        tcsPrint(d.yplx, d.ypbm, d.ypmc, d.lx, d.ypzxbz,d.cydbm);
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
    //打印
    var tcsPrint = function (yplx, ypbm, ypmc, lx, ypzxbz,cydbm) {
        var TSCObj;
        TSCObj = new ActiveXObject("TSCActiveX.TSCLIB");

        TSCObj.ActiveXopenport("TSC TTP-244 Pro");
        TSCObj.ActiveXsetup("60", "40", "5", "12", "0", "2", "0");
        TSCObj.ActiveXsendcommand("SET TEAR ON");
        TSCObj.ActiveXclearbuffer();
        if(yplx=="备样"){
            ypzxbz ="";
        }
        TSCObj.ActiveXwindowsfont(40, 15, 40, 0, 2, 0, "Arial", ypzxbz+"("+yplx+")");
        TSCObj.ActiveXwindowsfont(40, 70, 32, 0, 2, 0, "Arial", "抽样单号:");
        TSCObj.ActiveXwindowsfont(170, 70, 32, 0, 2, 0, "Arial", cydbm);
        TSCObj.ActiveXwindowsfont(40, 110, 32, 0, 2, 0, "Arial", "样品编号:");
        TSCObj.ActiveXwindowsfont(170, 110, 32, 0, 2, 0, "Arial", ypbm);
        TSCObj.ActiveXwindowsfont(40, 150, 32, 0, 2, 0, "Arial", "样品名称:");
        TSCObj.ActiveXwindowsfont(170, 150, 32, 0, 2, 0, "Arial", ypmc);
        TSCObj.ActiveXbarcode("40", "190", "128", "90", "1", "0", "2", "2", ypbm);


        // TSCObj.ActiveXsendcommand("QRCODE 10,15,L,5,A,0,M2,S3,\"" + code + "\"");
        TSCObj.ActiveXprintlabel("1", "1");
        TSCObj.ActiveXcloseport();
    };
    //委托单提交，readOnly = 1
    var zf_tjReadonly = function () {
        debugger;
        stopContinueClick("#zf_tjQYWT", 300);
        var ids=[];//定义一个数组
        $('input[name="checkbox_checkbox"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
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
                        configMap.zfwtGrid.ajax.reload();
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
    //下载电子抽样单
    var showdzcyd = function () {
        stopContinueClick("#showdzcyd", 300);
        var inputjson = $('[name="checkbox_checkbox"]:checked');
        var wtid = "";
        var ypxxjson = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.zfwtGrid.cell(el.parent()).index().row;
            wtid = configMap.zfwtGrid.row(rowIndex).data().ypbm;
            ypxxjson.push(wtid);
        });

        if (ypxxjson.length != 1) {
            Messenger().post({
                message: '请选择一个样品！',
                type: 'warning'
            });
            return;
        } else {
            window.open(configMap.dzcydPath+"/app/sample/export/"+wtid,"_blank");
        }

    };
    var gotoAddJcxm = function () {
        stopContinueClick("#savejcxZfwt", 300);
        var inputjson = $('[name="checkbox_checkbox"]:checked');
        var wtid = "";
        var ypxxjson = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.zfwtGrid.cell(el.parent()).index().row;
            wtid = configMap.zfwtGrid.row(rowIndex).data().ypbm;
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
    //全选
    var selectAllWt = function (status) {
        $('[type="checkbox"]', jqueryMap.$wtManageDataTable).prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$wtManageDataTable).not(jqueryMap.$container.find('[name="selectspcylist"]'));
        var temp = null;
        qywtjson = [];
        $(inputjson).each(function () {
            temp = {qywt: $(this).attr('id').substring(3)};
            qywtjson.push(temp);
        });
    };

    //抽检汇总表
    var daochu = function (dylx) {
        stopContinueClick("#daochu",300);
        var inputjson = $('[name="checkbox_checkbox"]:checked');
        var ypxxjson = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.zfwtGrid.cell(el.parent()).index().row;
            var ids = configMap.zfwtGrid.row(rowIndex).data().id;
            ypxxjson.push(ids);
        });
        if(ypxxjson.length === 0){
            Messenger().post({
                message:'请至少选择一个样品！',
                type:'warning'
            });
            return
        }else {
            var ypids = ypxxjson.join(",");
            POBrowser.openWindowModeless('customermanage/bgglFc/zfwt/daoChuBiao?ypids='+ypids, 'width=1200px;height=800px;');
        }
    }    //对接省抽导出
    var djscdc = function (dylx) {
        stopContinueClick("#daochu",300);
        var inputjson = $('[name="checkbox_checkbox"]:checked');
        var ypxxjson = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.zfwtGrid.cell(el.parent()).index().row;
            var ids = configMap.zfwtGrid.row(rowIndex).data().id;
            ypxxjson.push(ids);
        });
        if(ypxxjson.length === 0){
            Messenger().post({
                message:'请至少选择一个样品！',
                type:'warning'
            });
            return
        }else {
            var ypids = ypxxjson.join(",");
            POBrowser.openWindowModeless('customermanage/bgglFc/zfwt/daoChuSc?ypids='+ypids, 'width=1200px;height=800px;');
        }
    }

    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid = $('#zfwt' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, zfwtlist);
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
            initZfwtGrid();
            $("#addSPCY",jqueryMap.$content).off('click').on('click',function (){
                addSPCY();
            });
            $("#ydydaoru",jqueryMap.$content).off('click').on('click',function (){
                ydydr();
            });
            //查询
            $("#spcySearch",jqueryMap.$content).off('click').on('click',function (){
            	configMap.zfwtGrid.ajax.reload();
            });

            //添加检测项
            $('#savejcxZfwt').off().on('click', function () {
                gotoAddJcxm();
            });

            //电子抽样单
            $('#showdzcyd').off().on('click', function () {
                showdzcyd();
            });

            //导入
            $("#importZFWT",jqueryMap.$content).off('click').on('click',function (){
                console.log("ggggggggggggggg");
                importExcel();
            });

            //重置
            $("#reset",jqueryMap.$content).off('click').on('click',function (){
                console.log("1111");
                $('[name="cydbh"]',jqueryMap.$content).val('');
                $('[name="ypmc"]',jqueryMap.$content).val('');
                configMap.zfwtGrid.ajax.reload();
            });
            //导入检测包
            $('#addJcb1'+uuid).on('click',function () {
                // console.log("添加检测包");
                addJcb();
            });
            //打印标签
            $('#btn_zfwtdybq').off().on('click', function () {
                zfwtDyBq();
            });
            $('#btn_wtbqdy').off().on('click', function () {
                openPrintLab();
            });


            //点击选择所有(委托)
            jqueryMap.$container.find('[name="selectspcylist"]').change(function () {
                var el = $(this);
                selectAllWt(el.is(':checked'));
            });
            //提交
            $('#zf_tjReadonly').off().on('click', function () {
                zf_tjReadonly();
            });
            //导出excel
            $('#daochu').off().on('click', function () {
                daochu();
            });
            //导出excel
            $('#djscdc').off().on('click', function () {
                djscdc();
            });

        },
        setPath: function (path) {
            configMap.path = path;
        },
        setDzcydPath: function (dzcydPath) {
            configMap.dzcydPath = dzcydPath;
        },
        reload: function () {
            configMap.zfwtGrid.ajax.reload();
        }
    };
}();
//@ sourceURL=contractlist.js
	
	