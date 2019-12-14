/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment, jQuery, bootbox, _ */

var cfList_data = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/organization/organization/orgAndUser',
        CQFCustomerUrl: '/customermanage/ptkhxx/getCQFCustomerFromTree',
        createUserPageUrl: '/user/users/edit.jsp',
        addUrl: '/customermanage/customerManage/add.jsp',
        editUrl: '/customermanage/customerManage/edit.jsp',
        addcontractPageUrl: '/customermanage/contract/addContract.jsp',
        updateUrl: '/customermanage/ptkhxx/updateCustomer',
        importUrl: '/customermanage/customerManage/importExcel.jsp',
        currentSelectedNode: null,
        reportTaxPageUrl: '/customermanage/reporttax/reporttax.jsp',
        followupPageUrl: '/customermanage/followup/followup.jsp',
        accountingPageUrl: '/customermanage/financialinformation/financialinformation.jsp',
        addchargePageUrl: '/customermanage/charge/addCharge.jsp',
        viewchargePageUrl: '/customermanage/charge/viewCharge.jsp',
        dispatchPageUrl: '/customermanage/dispatch/dispatch.jsp',
        cfListGrid: null,
        optType: null,
        orgTypes: [],
        fwzt: "CFTX", //催费提醒
        type: 1, //区分全部，部门，个人
        other: "all", //传入部门编码或职员代码
        now: "1", //本人时为1，他人时为0
        verifyType: '',
        accountingBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="accounting" ><i class="icon iconfont icon-pingjiaguanli" style="padding-right:3px;position:relative;top:2px;"></i>记账</button>',
        addcontractBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="addcontract" ><i class="icon iconfont icon-hetong" style="padding-right:3px;position:relative;top:2px;"></i>合同</button>',
        addchargeBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="addcharge" ><i class="icon iconfont icon-caiwushuiwu" style="padding-right:3px;position:relative;top:2px;"></i>收费</button>',
        viewchargeBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" style="background: transparent !important;border: none !important;color: #666 !important;" data-type="viewcharge" data-toggle="tooltip" title="查看收费历史"><i class="icon iconfont icon-shijian" style="color:#10a0f7;padding-right:3px;position:relative;top:1px;"></i></button>',
    	
        accountingStopBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" disabled data-type="accounting" ><i class="icon iconfont icon-pingjiaguanli" style="padding-right:3px;position:relative;top:2px;"></i>记账</button>',
        addcontractStopBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" disabled data-type="addcontract" ><i class="icon iconfont icon-hetong" style="padding-right:3px;position:relative;top:2px;"></i>合同</button>',
        addchargeBStoptn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" disabled data-type="addcharge" ><i class="icon iconfont icon-caiwushuiwu" style="padding-right:3px;position:relative;top:2px;"></i>收费</button>',
        
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $cfListFrom: null,
        $blockTarget: null,
        $cfListTree: null,
        $cfListDialog: null,
        $selectedRow: null,
        $cfListDataTable: null
    };

    var setJqueryMap = function () {
        jqueryMap.$container = $('#cfList-manager-content');
        jqueryMap.$blockTarget = jqueryMap.$container;
        jqueryMap.$cfListTree = $('#cfList_manage_tree', jqueryMap.$container);
        jqueryMap.$cfListDataTable = $('#cfList_data', jqueryMap.$container);
    };

    var khxxjson = [];

    var openNewModal = function (title, url, type, id) {
        if (type === 'account') {
            var _optadd = {
                id: id,
                title: title,
                tabMonitor: $('#main-tab'),
                url: url,
                close: true
            };
            addTabs.add(_optadd);
        }
    };

    var openModal = function (title, url, type, func) {
        var dialogButtons = {};

        if (type === 'edit') {
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
            className: 'btn borderRadius4 color666',
            callback: function () {
                sessionStorage.removeItem("uuid");
                sessionStorage.removeItem("filesize");
            }
        }
        if (type === 'addCustomer') {
            dialogButtons.success = {
                label: '<i class="icon iconfont icon-xiayibu iconFontSize" style="color: #fff;"></i> 下一步 ',
                className: "btn btn-default btnBlue btnBorderColor colorfff next",
                callback: function () {
                    func();
                    return false;
                }
            };
        }
        if (type === 'charge') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue btnBorderColor colorfff borderRadius4",
                callback: function () {
                    func();
                    return false;
                }
            };
        }
        if (type === 'Dispatch') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue btnBorderColor colorfff borderRadius4",
                callback: function () {
                    func();
                    return false;
                }
            };
        }
        $.get(url, function (html) {

            jqueryMap.$cfListDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });

            if (type === 'addCustomer') {
                //对第一个页面按钮的改正
                $('div.modal-footer').empty();
                $('div.modal-footer').append('<button type="button" id="next" class="btn btn btn-default btnBlue borderRadius4 colorfff"><i class="fa fa-save"></i> 下&nbsp;一&nbsp;步 </button>');
                //第一个页面下一步操作
                $('#next').click(function () {
                    var e = $('p.active').parent();
                    var linum = e.index() + 1;
                    $('.o-m .ul-o li').eq(linum).click();
                });
            }
        });
    };

    var accounting = function () {
        var el = $(this);
        var rowIndex = configMap.cfListGrid.cell(el.parent()).index().row;
        var customerCode = configMap.cfListGrid.row(rowIndex).data().khbm;
        var customerCompany = configMap.cfListGrid.row(rowIndex).data().gsmc;
        var url = configMap.path + configMap.accountingPageUrl + "?customerCode=" + encodeURI(customerCode) + "&customerCompany=" + encodeURI(customerCompany);
        openNewModal('记账', url, 'account', customerCode);
    };

    var addContract = function () {
        var el = $(this);
        var rowIndex = configMap.cfListGrid.cell(el.parent()).index().row;
        var id = configMap.cfListGrid.row(rowIndex).data().khbm;
        var name = configMap.cfListGrid.row(rowIndex).data().gsmc;
        openModal('代理记账服务合同', configMap.path + configMap.addcontractPageUrl + "?id=" + encodeURI(id) + "&name=" + encodeURI(name), 'add', function () {
        });
    };
    var addcharge = function () {
        var el = $(this);
        var rowIndex = configMap.cfListGrid.cell(el.parent()).index().row;
        var id = configMap.cfListGrid.row(rowIndex).data().khbm;
        var name = configMap.cfListGrid.row(rowIndex).data().gsmc;
        openModal('代理记账服务收费', configMap.path + configMap.addchargePageUrl + "?id=" + encodeURI(id) + "&name=" + encodeURI(name), 'charge', function () {
            chargeAdd.saveCharge(function (result) {
                if (result) {
                    configMap.cfListGrid.clear().draw();
                    initcfListData();
                    jqueryMap.$cfListDialog.modal('hide');
                    Messenger().post("保存成功!");
                }
            });
        });
    }
    var viewcharge = function () {
        var el = $(this);
        var rowIndex = configMap.cfListGrid.cell(el.parent()).index().row;
        var id = configMap.cfListGrid.row(rowIndex).data().khbm;
        var name = configMap.cfListGrid.row(rowIndex).data().gsmc;
        openModal('代理记账服务收费历史记录_' + name, configMap.path + configMap.viewchargePageUrl + "?id=" + encodeURI(id), 'view');
    }
    var table = function (e) {
        var el = $(e);
        var rowIndex = configMap.cfListGrid.cell(el.parent()).index().row;
        var id = configMap.cfListGrid.row(rowIndex).data().khbm;
        var name = configMap.cfListGrid.row(rowIndex).data().gsmc;
        openModal('跟进服务', configMap.path + configMap.followupPageUrl + '?khbm=' + encodeURI(id) + '&name=' + encodeURI(name), 'followup');
    };
    var tanle = function (e) {
        var el = $(e);
        var rowIndex = configMap.cfListGrid.cell(el.parent()).index().row;
        var id = configMap.cfListGrid.row(rowIndex).data().khbm;
        var name = configMap.cfListGrid.row(rowIndex).data().gsmc;
        openModal('税务申报', configMap.path + configMap.reportTaxPageUrl + '?khbm=' + encodeURI(id) + '&name=' + encodeURI(name), 'reporttax');
    }
    //停止或恢复服务
    var stopCFList = function (e) {
        if (e === 0) {
            stopContinueClick("#stopCFList", 300);
        } else {
            stopContinueClick("#restartCFList", 300);
        }
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$cfListDataTable).not(jqueryMap.$container.find('[name="selectcfListr"]'));
        var temp = null;
        khxxjson = [];
        $(inputjson).each(function () {
            temp = {khxx: $(this).attr('id').substring(3)};
            khxxjson.push(temp);
        });
        var data = {
            khxx: khxxjson
        }
        if (data.khxx.length === 0) {
            Messenger().post({
                message: '请选择一个用户！',
                type: 'warning'
            });
        } else {
            //var id = jqueryMap.$selectedRow.data().id;//已选数据的id
            $.ajax({
                url: configMap.path + configMap.updateUrl + "/" + e,
                dataType: 'JSON',
                contentType: 'application/json; charset=utf-8',
                type: 'PUT',
                data: JSON.stringify(data),
                success: function () {
                    if (e === 0) {
                        Messenger().post({
                            message: '客户停止服务成功！',
                            type: 'success'
                        });
                    } else {
                        Messenger().post({
                            message: '客户恢复服务成功！',
                            type: 'success'
                        });
                    }
                    configMap.cfListGrid.clear().draw();
                    initcfListData();
                },
                error: function () {
                    if (e === 0) {
                        Messenger().post({
                            message: '客户停止服务成功！',
                            type: 'success'
                        });
                    } else {
                        Messenger().post({
                            message: '客户恢复服务成功！',
                            type: 'success'
                        });
                    }
                    configMap.cfListGrid.clear().draw();
                    initcfListData();
                }
            });
        }
    }
    var dispatchedCFList = function () {
        stopContinueClick("#dispatchedQFList", 300);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$cfListDataTable).not(jqueryMap.$container.find('[name="selectcfListr"]'));
        var temp = null;
        khxxjson = [];
        $(inputjson).each(function () {
            temp = {khxx: $(this).attr("value")};
            khxxjson.push(temp);
        });
        if (khxxjson.length == 0) {
            Messenger().post({
                message: '请选择一个用户！',
                type: 'warning',
                id: "1213"
            });
        } else {
            var khxxdata = JSON.stringify(khxxjson);
            sessionStorage.setItem("khxx", khxxdata);
            openModal('派工管理', configMap.path + configMap.dispatchPageUrl, 'Dispatch', function () {
                dispatch.saveDispatch(function (result) {
                    if (result) {
                        Messenger().post("保存成功!");
                    }
                });
            });
        }
    }
    var initOrganization = function () {
        jqueryMap.$cfListTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.path + configMap.dataUrl
                },
                "state": {
                    "opened": false,  //展示第一个层级下面的node
                    //该根节点不可点击
                }
            },
            "types": {
                "default": {
                    "icon": false
                }
            },
            'plugins': ["types", "expand", "search"],
            "expand": {
                level: 2
            }
        }).on("load_node.jstree", function (e, d) {
            $("#cfList_manage_tree").bind("select_node.jstree", function (e, data) {
                data.instance.toggle_node(data.node);
                clearTreeNum();
                getTreeNum();
            });
            getTreeNum();
        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#cfList_manage_tree li").length; i++) {
                var $temp = $("#cfList_manage_tree li").eq(i).attr("userimg");
                var $text = $("#cfList_manage_tree li").eq(i).attr("usertext");
                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                    //alert("不含有该属性");
                } else {
                    //alert($("#cfList_manage_tree li").eq(i).attr("userimg"));
                    $("#cfList_manage_tree li").eq(i).find("i").eq(1).remove();
                    $("#cfList_manage_tree li").eq(i).find("a").eq(0).append("<img src=" + $temp + " style='width:30px;border-radius:50% !important;height:30px;border:1px solid #e5e5e5;float:left;margin-right:11px;margin-top:5px;margin-left:7px;'><span>" + $text + "</span>");
                }
            }
        }
        var clearTreeNum = function () {
            for (var i = 0; i < $("#cfList_manage_tree li").length; i++) {
                var $temp = $("#cfList_manage_tree li").eq(i).attr("userimg");
                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                    //alert("不含有该属性");
                } else {
                    //alert($("#cfList_manage_tree li").eq(i).attr("userimg"));
                    $("#cfList_manage_tree li").eq(i).find("i").eq(1).remove();
                    $("#cfList_manage_tree li").eq(i).find("a").eq(0).find("img").remove();
                    $("#cfList_manage_tree li").eq(i).find("a").eq(0).find("span").remove();
                }
            }
        }
        //jstree定时搜索功能
        //输入框输入定时自动搜索
        var to = false;
        $('#search_ay').keyup(function () {
            if (to) {
                clearTimeout(to);
            }

            to = setTimeout(function () {
                $("#cfList_manage_tree").jstree(true).search($('#search_ay').val());

            }, 250);
        });


        jqueryMap.$cfListTree.on('select_node.jstree', function (e, data) {
            configMap.currentSelectedNode = data.node;
            if (data.node.parent === '#') { //点击的是所有客户
                var url = '';
                configMap.type = 1; //全部
                configMap.now = "0"; //非个人
                if (data.node.id === 'stopCustomer') {
                    return false; //停止服务的
                }
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出已经停止服务的客户列表信息
                $.ajax({
                    url: configMap.path + configMap.CQFCustomerUrl + '/' + configMap.type + '/' + configMap.fwzt + "/" + configMap.other + '/' + configMap.now,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (result) {
                        $('#restartCFList').hide();
                        $('#stopCFList').show();
                        App.unblockUI(jqueryMap.$blockTarget);
                        configMap.cfListGrid.clear().draw();
                        configMap.cfListGrid.rows.add(result).draw();
                    }
                });
            } else if (data.node.parent === 'workCustomer') { //若子节点有值，代表为部门
                configMap.type = 2; //部门
                configMap.now = "0"; //非个人
                configMap.other = data.node.id; //部门代码
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出该部门的客户列表信息
                $.ajax({
                    url: configMap.path + configMap.CQFCustomerUrl + '/' + configMap.type + '/' + configMap.fwzt + "/" + configMap.other + '/' + configMap.now,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (result) {
                        $('#restartCFList').hide();
                        $('#stopCFList').show();
                        App.unblockUI(jqueryMap.$blockTarget);
                        configMap.cfListGrid.clear().draw();
                        configMap.cfListGrid.rows.add(result).draw();
                    }
                });
            } else { //代表个人
                configMap.type = 3; //个人
                configMap.now = "0"; //个人
                configMap.other = data.node.li_attr.zydm; //职员代码
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出该部门的客户列表信息
                $.ajax({
                    url: configMap.path + configMap.CQFCustomerUrl + '/' + configMap.type + '/' + configMap.fwzt + "/" + configMap.other + '/' + configMap.now,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (result) {
                        $('#restartCFList').hide();
                        $('#stopCFList').show();
                        App.unblockUI(jqueryMap.$blockTarget);
                        configMap.cfListGrid.clear().draw();
                        configMap.cfListGrid.rows.add(result).draw();
                    }
                });
            }

            configMap.currentSelectedNode = data.node;
            configMap.optType = 'edit';
        });
    };

    //增加代理记账公司客户
    var addcfList = function () {
        openModal('创建用户',
            configMap.path + configMap.addUrl,
            'addCustomer', function () {
                cfList.addcustomer(function (result) {
                    if (result) {
                        jqueryMap.$cfListDialog.modal('hide');
                        configMap.cfListGrid.clear().draw();
                        initcfListData();
                    }
                });
            });
    }
    var editcfList = function (e) {
        var el = $(e);
        var rowIndex = configMap.cfListGrid.cell(el.parent()).index().row;
        var khdm = configMap.cfListGrid.row(rowIndex).data().khbm;
        var id = configMap.cfListGrid.row(rowIndex).data().id;
        openModal('修改用户',
            configMap.path + configMap.editUrl + "?khdm=" + khdm + "&id=" + id,
            'addCustomer', function () {
                cfListedit.updatecustomer(function (result) {
                    if (result) {
                        jqueryMap.$cfListDialog.modal('hide');
                        configMap.cfListGrid.clear().draw();
                        initcfListData();
                    }
                });
            });
    }

    var initcfListData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在获取数据，请稍候...'
        });
        var a = $('#dispatchedCFList').length; //验证派工按钮是否存在
        var url = '';
        if (a === 1) {//查询所有人
            configMap.type = 1; //全部
            configMap.now = "0"; //非个人
        } else {
            configMap.type = 3; //个人
            configMap.now = "1"; //个人
        }
        $.ajax({
            url: configMap.path + configMap.CQFCustomerUrl + '/' + configMap.type + '/' + configMap.fwzt + "/" + configMap.other + '/' + configMap.now,
            dataType: 'JSON',
            type: 'GET',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                configMap.cfListGrid.rows.add(result).draw();
            }
        });
    };

    //导出
    var exportCFExcel = function () {
        stopContinueClick("#exportCFExcel", 300);
        window.location.href = "/customermanage/ptkhxx/cqfDownDataExcel?now=" + encodeURI(configMap.now) +
            "&type=" + encodeURI(configMap.type) + "&fwzt=" + encodeURI(configMap.fwzt) + "&other=" + encodeURI(configMap.other);
    }

    var selectAll = function (status) {
        $('[type="checkbox"]', jqueryMap.$cfListDataTable).prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$cfListDataTable).not(jqueryMap.$container.find('[name="selectcfListr"]'));
        var temp = null;
        khxxjson = [];
        $(inputjson).each(function () {
            temp = {dljg: $(this).attr('id').substring(3)};
            khxxjson.push(temp);
        });
    };

    var initcfListGrid = function () {
        configMap.cfListGrid =
            jqueryMap.$cfListDataTable.DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false,
                "destroy": true,
                "lengthMenu": [10, 20, 50, 100],
                "autoWidth": false,
                "language": {
                    "zeroRecords": "暂时没有数据",
                    "infoEmpty": "无记录",
                    "sEmptyTable": "暂时没有数据",
                    "sInfoThousands":",",
                    "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                },
                "columnDefs": [
                    {"targets": 0, "searchable": false},
                    {"targets": 2, "searchable": false},
                    {
                        "targets": [3],
                        "visible": false,
                        "searchable": false
                    },
                    {"targets": 4, "searchable": false}
                ],
                "columns": [
                    {
                        "data": "id",
                        "render": function (data, type, row) {
                            return '<input type="checkbox" name="checkbox_checkbox" id="cf_' + data + '" value="' + row.khbm + '"/>';
                        }
                    },
                    {
                        "data": "gsmc",
                        className: 'text-left',
                        "render": function (data, type, row) {

                            return "<a style='color:#666' href='javascript:;' class='aa'>" + data + "</a>";
                        }
                    },
                    {
                        "data": "id",
                        className: 'text-left',
                        "render": function (data, type, row) {
                            var jsonLength = 0;
                            var month = 1;
                            var html = "";
                            var jsonArray = row.jsonArray;
                            for (var item in jsonArray) {

                                var j = jsonArray[jsonLength].state;
                                if (j == 'A') {
                                    html = html + "<span  class='monthcolor1 pad'>" + month + "</span>";
                                } else if (j == 'B') {
                                    html = html + "<span  class='monthcolor2 pad'>" + month + "</span>";
                                } else if (j == 'C') {
                                    html = html + "<span  class='monthcolor3 pad'>" + month + "</span>";
                                } else if (j == 'D') {
                                    html = html + "<span  class='monthcolor4 pad'>" + month + "</span>";
                                } else if (j == 'E') {
                                    html = html + "<span  class='monthcolor5 pad'>" + month + "</span>";
                                }

                                jsonLength++;
                                month++;

                            }
                            return html + configMap.viewchargeBtn_html;
//		        		return "<span  class='monthcolor1 pad'>"  + 1 +"</span>" + "<span  class='monthcolor2 pad'>"  + 2 +"</span>" + "<span  class='monthcolor3 pad'>"  + 3 +"</span>" + "<span  class='monthcolor4 pad'>"  + 4 +"</span>" + "<span  class='monthcolor4 pad'>"  + 5 +"</span>" +
//		        		"<span  class='monthcolor3 pad'>"  + 6 +"</span>" + "<span  class='monthcolor1 pad'>"  + 7 +"</span>" + "<span  class='monthcolor2 pad'>"  + 8 +"</span>" + "<span  class='monthcolor2 pad'>"  + 9 +"</span>" + "<span  class='monthcolor1 pad'>"  + 10 +"</span>" + "<span  class='monthcolor3 pad'>"  + 11 +"</span>"+
//		        		"<span  class='monthcolor2 pad'>"  + 12 +"</span>" + configMap.viewchargeBtn_html;
                        }

                    },
                    {
                        "data": "bzxx"
                    },
                    {
                        "data": "khbm",
                        className: 'text-left',
                        "render": function (data, type, row) {
                            var btn = "";
                            if ($('#cfkhhtan').length === 1) { //合同
                                btn = btn + configMap.addcontractBtn_html;
                            }
                            if ($('#cfkhsfan').length === 1) { //收费
                                btn = btn + configMap.addchargeBtn_html;
                            }
                            if ($('#cfkhgjan').length === 1) { //跟进
                                btn = btn + "<button class='ta btn btn-xs btnBlue btnBorderColor colorfff borderRadius4' type='button' ><i class='icon iconfont icon-zaizhiyuangong' style='padding-right:3px;position:relative;top:2px;'></i>跟进</button>";
                            }
                            if ($('#cfkhjzan').length === 1) { //记账
                                btn = btn + configMap.accountingBtn_html;
                            }
                            if ($('#cfkhsban').length === 1) { //纳税
                                btn = btn + "<button class='tb btn btn-xs btnBlue btnBorderColor colorfff borderRadius4' type='button' ><i class='fa fa-file-o' style='position: relative;top: 0px;padding-right: 3px;'></i>纳税</button>";
                            }
                            if (btn === "") {
                                return configMap.addcontractStopBtn_html + configMap.addchargeBStoptn_html 
                                + "<button class='ta btn btn-xs btnBlue btnBorderColor colorfff borderRadius4' disabled type='button' ><i class='icon iconfont icon-zaizhiyuangong' style='padding-right:3px;position:relative;top:2px;'></i>跟进</button>" 
                                + configMap.accountingStopBtn_html
                                + "<button class='tb btn btn-xs btnBlue btnBorderColor colorfff borderRadius4' disabled type='button' ><i class='fa fa-file-o' style='position: relative;top: 0px;padding-right: 3px;'></i>纳税</button>";
                            } else {
                                return btn;
                            }
                        }
                    }

                ],
                "drawCallback": function () { // 数据加载完成后执行
                    var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$cfListDataTable);
                    var accountingContainer = $('[data-type="accounting"]', jqueryMap.$cfListDataTable);
                    var addcontractContainer = $('[data-type="addcontract"]', jqueryMap.$cfListDataTable);
                    var addchargeContainer = $('[data-type="addcharge"]', jqueryMap.$cfListDataTable);
                    var viewchargeContainer = $('[data-type="viewcharge"]', jqueryMap.$cfListDataTable);
                    $('.aa').off().on('click', function () {
                        editcfList(this);
                    });
                    $(".ta", jqueryMap.$container).off().on('click', function () {
                        table(this);
                    });
                    $(".tb", jqueryMap.$container).off().on('click', function () {
                        tanle(this);
                    })

                    if (accountingContainer.length > 0) {
                        accountingContainer.off('click').on('click', accounting);
                    }

                    if (addcontractContainer.length > 0) {
                        addcontractContainer.off('click')
                            .on('click', addContract);
                    }
                    if (addchargeContainer.length > 0) {
                        addchargeContainer.off('click').on('click', addcharge);
                    }
                    if (viewchargeContainer.length > 0) {
                        viewchargeContainer.off('click').on('click', viewcharge);
                    }

                    if (tootipContainer.length > 0) {
                        tootipContainer.tooltip();
                    }
                }
            });

        $('tbody', jqueryMap.$cfListDataTable).on('click', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.cfListGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.cfListGrid.row('.success');
            }
        });
    };

    return {
        // 初始化
        init: function (type) {
            setJqueryMap();
            var tabid = $('#cfList-manager-content').parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
            configMap.type = type;
            $('#restartCFList').hide();
            Layout.addResizeContent(jqueryMap.$container);
            setTimeout(function () {
                var layout = jqueryMap.$container.layout({
                    center__onresize: App.initLayoutContentScrollbar,
                    west__onresize: App.initLayoutContentScrollbar,
                    west__size: 200
                });
                App.initLayoutContentScrollbar('west', layout.panes.west);
                App.initLayoutContentScrollbar('center', layout.panes.center);
            }, 10);

            $('#addCFListManage', jqueryMap.$container).off().on('click', function () {
                addcfList();
            });
            $('#dispatchedCFList', jqueryMap.$container).off().on('click', function () {
                dispatchedCFList();
            })
            //停止服务
            $('#stopCFList', jqueryMap.$container).off().on('click', function () {
                stopCFList(0);
            });

            //恢复服务
            $('#restartCFList', jqueryMap.$container).off().on('click', function () {
                stopCFList(1);
            });

            //导出
            $('#exportCFExcel', jqueryMap.$container).off().on('click', function () {
                exportCFExcel();
            });

            $('#searchKhmc', jqueryMap.$container).on('keyup', function () {
                configMap.cfListGrid.search(this.value).draw();
            });

            //点击选择所有
            jqueryMap.$container.find('[name="selectcfListr"]').change(function () {
                var el = $(this);
                selectAll(el.is(':checked'));
            });

            initOrganization();

            initcfListGrid();
            initcfListData();
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        }
    };
}();
//@ sourceURL=org/org.js

