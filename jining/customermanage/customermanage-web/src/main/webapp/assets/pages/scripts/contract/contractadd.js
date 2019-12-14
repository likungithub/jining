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
var contractAdd = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/contract/contract',
        updateUrl: '/contract/contractupdate',
        projectUrl: '/contract/project',
        paymentUrl: '/contract/payment',
        checkUrl: '/contract/checkcontract',
        checkDateUrl: '/contract/checkDate',
        id: '',
        contractGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" ' +
            'data-toggle="tooltip" title="编辑合同"><i class="icon iconfont icon-bianji"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" ' +
            'data-toggle="tooltip" title="查看合同"><i class="fa fa-search"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" ' +
            'data-toggle="tooltip" title="删除合同"><i class="icon iconfont icon-shanchu"></i></a>',
        continueBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="continue" ' +
            'data-toggle="tooltip" title="续签合同"><i class="fa fa-file-o"></i></a>',
        imgUrl: '/contract/addfile.jsp',
        SFXMUrl:'/contract/sfxm',
        htbm: ''
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractForm: null,
        $setimg: null,
        $datatableone: null,
        $datatableotwo: null,
        $contractDialog:null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#contractForm');
        jqueryMap.$datatableone = $('#contract_data_list');
        jqueryMap.$datatableotwo = $('#contract_data_listall');
    };

    /**
     * 获取当前代理机构的收费项目
     */
    var getSFXM = function (){
        $.ajax({
            url: configMap.path + configMap.SFXMUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                if (datas.length > 0) {
                    var datahtml="";
                    for(var i=0;i<datas.length;i++){
                        if(datas[i].serviceName.indexOf("垫付")===-1){                                                 //排除收费项目名称为垫付的收费项目
                            datahtml += '<li role="presentation" class="select" onclick="contractAdd.showproject(this);">';
                            datahtml += '<a role="menuitem" tabindex="-1" href="#" class="SFXM_'
                                + datas[i].serviceCode+'_' + datas[i].businessType+'">' + datas[i].serviceName + '</a>';
                            datahtml += '</li>';
                        }
                    }
                    $("#sfxm", jqueryMap.$contractForm).append(datahtml);
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    /**
     * 分页获取当前客户下的所有合同信息
     */
    var initcontractGrid = function () {
        var now = new Date();
        now = now.setDate(now.getDate() + 5);
        configMap.contractGrid = $('#contract_data', jqueryMap.$datatableone).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "lengthMenu": [5],
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.khbm = configMap.id;
                }
            },
            "columns": [
                {
                    className:'text-center',
                    "data": "htbm",
                    "render":function (data) {
                        if (configMap.type === 'customerLook') { //从客户详情页来的
                            return '<a class="customerLookData" style="border: none;z-index: 10;' +
                                'background: transparent;outline: none;padding-left: 0"><span>' +  data  +
                                '</span></a>';
                        } else {
                            return data;
                        }
                    }
                },
                {
                    className:'text-center',
                    "data": "qyrq",
                    "render":function (data){
                        if (data !== null) {
                            return moment(data).format('YYYY-MM-DD');
                        } else {
                            return "";
                        }

                    }
                },
                {
                    className:'text-center',
                    "data": "fwqxq",
                    "render":function (data, type, row){
                        return '<label title="' + moment(data).format('YYYY-MM-DD') + '至' +
                            moment(row.fwqxz).format('YYYY-MM-DD') + '">' + moment(data).format('YYYY-MM-DD') +
                            '至' + moment(row.fwqxz).format('YYYY-MM-DD') + '</label>'
                    }
                },
                {
                    className:'text-center',
                    "data": "sfxm_mc"
                },
                {
                    className:'text-center',
                    "data": "fkfs_mc",
                    "render": function (data, type, row){
                        return data + "/" + row.fkxh_mc;
                    }
                },
                {
                    className:'text-right',
                    "data": "hjje",
                    "render": function (data) {
                        return moneySplitByComma(data.toFixed(2));
                    }
                },
                {
                    className:'text-right',
                    "data": "zfy",
                    "render": function (data) {
                        return moneySplitByComma(data.toFixed(2));
                    }
                },
                {
                    className:'text-center',
                    "data": "lrrmc"
                },
                {
                    className:'text-center',
                    "data": "shzt_dm",
                    "render": function (data) {
                        var status = '';
                        if (data === "000") {
                            status = '<label style="color:#00B8EE">未审核</label>';
                        } else if (data === "001") {
                            status = '<label style="color:#A8E240">已通过</label>';
                        } else if (data === "002") {
                            status = '<label style="color:#FF2625">未通过</label>';
                        }
                        return status;
                    }
                },
                {
                    className:'text-center',
                    "render": function (data, type, row) {
                        var content = '';
                        if (row.shzt_dm !== "001") {                                                                   //审核状态不为已通过审核时：修改和删除
                            content += configMap.editBtn_html;
                            content += configMap.deleteBtn_html;
                        } else {                                                                                       //审核状态为已通过审核时：查看详情
                            content += configMap.viewBtn_html;
                            if(row.sfxm_dm === "001"){
                                if (row.xqzt === 0) {
                                    //判断日期
                                    if (now > row.fwqxz) {
                                        content += configMap.continueBtn_html;
                                    }
                                }
                            }
                        }
                        return content;
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
                $('[data-toggle="tooltip"]', jqueryMap.$contractForm).tooltip();
                var editContainer = $('[data-type="edit"]', jqueryMap.$datatableone);
                var delContainer = $('[data-type="del"]', jqueryMap.$datatableone);
                var continueContainer = $('[data-type="continue"]', jqueryMap.$datatableone);
                var customerData = $('.customerLookData',jqueryMap.$datatableone);
                var viewContainer = $('[data-type="view"]', jqueryMap.$datatableone);
                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', editParams);
                }
                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editParams);
                }
                if (continueContainer.length > 0) {
                    continueContainer.off('click').on('click', ContinueContract);
                }
                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delContract
                    });
                }
                if (customerData.length > 0) {
                    customerData.off('click').on('click', contractShowData);
                }

            }
        });
    };

    /**
     * 查看合同详细信息（客户详情中）
     * @param event
     */
    var contractShowData = function (event){
        event.preventDefault(); //组织默认事件
        var el = $(this);
        var rowIndex = configMap.contractGrid.cell(el.parent()).index().row;
        var htbm = configMap.contractGrid.row(rowIndex).data().htbm;
        openModal("查看合同信息——"+htbm, "/customermanage/contract/view.jsp?id=" + encodeURI(htbm));
    };

    /**
     * 分页查询当前职员所负责的客户下所有未审核合同
     */
    var initAllGrid = function () {
        configMap.contractGrid = $('#contract_data_all', jqueryMap.$datatableotwo).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "lengthMenu": [5],
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.khbm = configMap.id;
                }
            },
            "columns": [
                {
                    className:'text-left',
                    "data": "yhmc",
                    "render": function (data){
                        return '<label title="'+data+'">'+data+'</label>';
                    }
                },
                {
                    className: 'text-center',
                    "data": "htbm"
                },
                {
                    className: 'text-center',
                    "data": "qyrq",
                    "render": function (data) {
                        if (data !== null) {
                            return moment(data).format('YYYY-MM-DD');
                        } else {
                            return "";
                        }

                    }
                },
                {
                    className: 'text-center',
                    "data": "fwqxq",
                    "render": function (data, type, row){
                        return '<label title="'+moment(data).format('YYYY-MM-DD') + '至' +
                            moment(row.fwqxz).format('YYYY-MM-DD') + '">' + moment(data).format('YYYY-MM-DD') +
                            "至" + moment(row.fwqxz).format('YYYY-MM-DD') + '</label>';
                    }
                },
                {
                    className:'text-right',
                    "data": "zfy",
                    "render": function (data, type, row) {
                        var endTime = new Date(row.fwqxz);
                        var startTime = new Date(row.fwqxq);
                        var monthNumber = 12*(endTime.getFullYear() - startTime.getFullYear()) + endTime.getMonth()
                            - startTime.getMonth() + 1;
                        var money = monthNumber * data;
                        return moneySplitByComma(money.toFixed(2));
                    }
                },
                {
                    className:'text-right',
                    "data": "zfy",
                    "render": function (data) {
                        return moneySplitByComma(data.toFixed(2));
                    }
                },
                {
                    className: 'text-center',
                    "data": "lrrmc"
                },
                {
                    className: 'text-center',
                    "data": "shzt_dm",
                    "render": function (data) {
                        var status = '';
                        if (data === "000") {
                            status = '<label style="color:#00B8EE">未审核</label>';
                        } else if (data === "001") {
                            status = '<label style="color:#A8E240">已通过</label>';
                        } else if (data === "002") {
                            status = '<label style="color:#FF2625">未通过</label>';
                        }
                        return status;
                    }
                },
                {
                    className: 'text-center',
                    "render": function () {
                        return configMap.viewBtn_html;
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
                $('[data-toggle="tooltip"]', jqueryMap.$contractForm).tooltip();
                var editContainer = $('[data-type="view"]', jqueryMap.$datatableotwo);
                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editParams);
                }
            }
        });
    };

    /**
     * 清除form表单
     */
    var cleanform = function () {
        $('[name="sfxmms"]', jqueryMap.$contractForm).html("");
        $(':input', jqueryMap.$contractForm)
            .not(':button, :submit, :reset')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');
        $('[name="sfxm"]', jqueryMap.$contractForm).val("0.00");
        $('[name="zje"]', jqueryMap.$contractForm).val("0.00");
        $("#addfile", jqueryMap.$contractForm).html("添加附件");
        sessionStorage.removeItem("fileuuid");
        sessionStorage.removeItem("filesize");
        //初始
        $('[name="xqzt"]', jqueryMap.$contractForm).val("0");
        $('[name="fkfs"]', jqueryMap.$contractForm).val("001");
        $('[name="fkfst"]', jqueryMap.$contractForm).val("001");
        $('[name="sfxmdm"]', jqueryMap.$contractForm).val("001");
        $("#selectBtn", jqueryMap.$contractForm).html('代理记账<span class="caret"></span>');
        $("#selectBtn", jqueryMap.$contractForm).attr("data","001");
        $("#typeBtn", jqueryMap.$contractForm).html('按年<span class="caret"></span>');
        $("#fkfsBtn", jqueryMap.$contractForm).html('后付<span class="caret"></span>');
        if(configMap.id){
            $("#submitform", jqueryMap.$contractForm).removeAttr('disabled');
        }
        var nowDate = new Date();
        var nextDate;
        $('[name="qyrq"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM-DD'));
        $('[name="createDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
        nextDate = new Date(nowDate.setMonth(nowDate.getMonth() + 11, 1));
        $('[name="startDate"]', jqueryMap.$contractForm).val(moment(nextDate).format('YYYY-MM'));
    };

    /**
     * 校验输入信息
     * @returns {boolean}
     */
    var checkValue = function () {
        var blockTarget = jqueryMap.$contractForm.closest(".modal-body");
        if ($('[name="zje"]', jqueryMap.$contractForm).val() === "") {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请填写收费金额！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if (Number($('[name="zje"]', jqueryMap.$contractForm).val()) === 0){
            App.alert({
                container: jqueryMap.$contractForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "金额需大于0元！",
                icon: 'fa fa-warning'
            });
        } else if ($('input[name="createDate"]', jqueryMap.$contractForm).val() === null
            || $('input[name="createDate"]', jqueryMap.$contractForm).val() === "") {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请选择服务开始时间！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($('input[name="startDate"]', jqueryMap.$contractForm).val() === null
            || $('input[name="startDate"]', jqueryMap.$contractForm).val() === "") {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请选择服务截止时间！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($('input[name="createDate"]', jqueryMap.$contractForm).val()
            > $('input[name="startDate"]', jqueryMap.$contractForm).val()) {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "日期选择有误,服务截止时间必须晚于服务开始时间！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($.trim($("#typeBtn", jqueryMap.$contractForm).text().split("<")[0]) === "付款方式") {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请选择付款方式！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($('input[name="qyrq"]', jqueryMap.$contractForm).val() === null
            || $('input[name="qyrq"]', jqueryMap.$contractForm).val() === "") {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请选择签约日期！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($('[name="tbsx"]', jqueryMap.$contractForm).val().length >= 500) {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "特别事项字数应在500字以内！",
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    };

    /**
     * 校验日期，如果日期相同，判断已录入的合同中是否存在代理服务费或者常规收费
     * @returns {*}
     */
    var checkDate = function () {
        var blockTarget = jqueryMap.$contractForm.closest(".modal-body");
        var data = {
            fwqxq: $('input[name="createDate"]', jqueryMap.$contractForm).val(),
            fwqxz: $('input[name="startDate"]', jqueryMap.$contractForm).val(),
            htbm: $('[name="htbm"]', jqueryMap.$contractForm).val(),
            sfxm_dm: $('[name="sfxmdm"]', jqueryMap.$contractForm).val()
        };
        var result;
        $.ajax({
            url: configMap.path + configMap.checkDateUrl + "/" + configMap.id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            async: false,                                                                                             //ajax异步
            data: JSON.stringify(data),
            success: function (datas) {
                if (datas.success) {
                    result = true;
                } else {                                                                                               //当前合同填写了代理服务费
                    if ($('input[name="sfxmdm"]', jqueryMap.$contractForm).val().indexOf("001") !== -1) {
                        App.alert({
                            container: blockTarget,
                            place: 'prepend',
                            type: 'danger',
                            message: datas.message,
                            icon: 'fa fa-warning'
                        });
                        result = false;
                    } else {
                        result = true;
                    }
                }
            },
            error: function () {
                result = false;
            }
        });
        return result;
    };

    /**
     * 保存合同
     */
    var saveContract = function () {
        var uuid = "";
        if (sessionStorage.getItem("fileuuid") !== null && sessionStorage.getItem("fileuuid") !== undefined) {
            uuid = sessionStorage.getItem("fileuuid");
        }
        var blockTarget = jqueryMap.$contractForm.closest(".modal-body");
        App.unblockUI(blockTarget);
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var data = {
            qyrq: $('input[name="qyrq"]', jqueryMap.$contractForm).val(),
            fwqxq: $('input[name="createDate"]', jqueryMap.$contractForm).val(),
            fwqxz: $('input[name="startDate"]', jqueryMap.$contractForm).val(),
            sfxmdm: $('input[name="sfxmdm"]', jqueryMap.$contractForm).val(),
            sfxmmc: $.trim($("#selectBtn", jqueryMap.$contractForm).text().split("<")[0]),
            fkfs: $('input[name="fkfs"]', jqueryMap.$contractForm).val(),
            fkxhdm: $('input[name="fkfst"]', jqueryMap.$contractForm).val(),
            fkxhmc: $.trim($("#fkfsBtn", jqueryMap.$contractForm).text().split("<")[0]),
            sfje: $('input[name="sfxm"]', jqueryMap.$contractForm).val(),
            fkfsmc: $.trim($("#typeBtn", jqueryMap.$contractForm).text().split("<")[0]),
            tbsx: $('textarea[name="tbsx"]', jqueryMap.$contractForm).val(),
            uuid: uuid,
            zje: $('[name="zje"]', jqueryMap.$contractForm).val()
        };
        var url = configMap.path + configMap.dataUrl + "/" + configMap.id;
        var requestType = 'POST';
        var htbm = $('[name="htbm"]', jqueryMap.$contractForm).val();
        var xqzt = $('[name="xqzt"]', jqueryMap.$contractForm).val();
        if (htbm) {
            url = url + "/" + htbm + "/" + xqzt;
            requestType = 'PUT';
        }
        $.ajax({
            url: url,
            type: requestType,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(blockTarget);
                if (result.success) {
                    App.alert({
                        container: blockTarget,
                        place: 'prepend',
                        type: 'info',
                        message: "保存成功，请等待审核！",
                        icon: 'fa fa-info'
                    });
                    configMap.contractGrid.ajax.reload();
                    cleanform();                                                                                        //保存成功后，清空form表单
                    updateMessageNumber();                                                                              //更新首页消息提醒
                    upDateDSHNumber();
                } else {
                    App.alert({
                        container: blockTarget,
                        place: 'prepend',
                        type: 'danger',
                        message: result.message,
                        icon: 'fa fa-warning'
                    });
                }
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: blockTarget,
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
            }
        });
    };

    //删除
    var delContract = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var blockTarget = jqueryMap.$contractForm.closest(".modal-body");
        var rowIndex = configMap.contractGrid.cell(element.parent()).index().row;
        var id = configMap.contractGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/" + id,
            type: 'DELETE',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.contractGrid.ajax.reload();
                    App.alert({
                        container: blockTarget,
                        place: 'prepend',
                        type: 'info',
                        message: "删除成功！",
                        icon: 'fa fa-info'
                    });
                    //更新首页待审合同数量
                    upDateDSHNumber();
                }
                else {
                    App.alert({
                        container: blockTarget,
                        place: 'prepend',
                        type: 'info',
                        message: result.message,
                        icon: 'fa fa-warning'
                    });
                }
            },
            error: function () {
                App.alert({
                    container: blockTarget,
                    place: 'prepend',
                    type: 'info',
                    message: "删除失败！",
                    icon: 'fa fa-warning'
                });
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    /**
     * 获取合同信息（修改或者查看详情）
     */
    var editParams = function () {
        cleanform();                                                                                                    //获取前先清空表单
        var el = $(this);
        var rowIndex = configMap.contractGrid.cell(el.parent()).index().row;
        var htbm = configMap.contractGrid.row(rowIndex).data().htbm;
        var blockTarget = jqueryMap.$contractForm.closest(".modal-body");
        $.ajax({
            url: configMap.path + configMap.updateUrl + '/' + htbm,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                $("#selectBtn", jqueryMap.$contractForm).html(data.contract.sfxm_mc + '<span class="caret"></span>');
                $('[name="sfxmdm"]', jqueryMap.$contractForm).val(data.contract.sfxm_dm);
                $('[name="sfxmmc"]', jqueryMap.$contractForm).val(data.contract.sfxm_mc);
            	$('[name="sfxm"]', jqueryMap.$contractForm).val(data.contract.zfy.toFixed(2));
            	$('[name="zje"]', jqueryMap.$contractForm).val(data.contract.hjje.toFixed(2));
            	$("#typeBtn", jqueryMap.$contractForm).html(data.contract.fkfs_mc + '<span class="caret"></span>');
            	$('[name="fkfs"]', jqueryMap.$contractForm).val(data.contract.fkfs_dm);
            	$("#fkfsBtn", jqueryMap.$contractForm).html(data.contract.fkxh_mc + '<span class="caret"></span>');
            	$('[name="fkfst"]', jqueryMap.$contractForm).val(data.contract.fkxh_dm);
                $('[name="qyrq"]', jqueryMap.$contractForm).val(moment(data.contract.qyrq).format('YYYY-MM-DD'));
                $('[name="createDate"]', jqueryMap.$contractForm).val(moment(data.contract.fwqxq).format('YYYY-MM'));
                $('[name="startDate"]', jqueryMap.$contractForm).val(moment(data.contract.fwqxz).format('YYYY-MM'));
                $('[name="tbsx"]', jqueryMap.$contractForm).val(data.contract.tbsx);
                $('[name="htbm"]', jqueryMap.$contractForm).val(data.contract.htbm);
                $('[name="xqzt"]', jqueryMap.$contractForm).val("0");
                //特别事项字数限制
                surplusHowMany($("#tbsx"),$("#tbsxWords"),300);
                if (configMap.id) {
	                if (data.contract.shzt_dm === "001") {
	                	$('[name="submitform"]', jqueryMap.$contractForm).attr("disabled", "disabled");
	                } else {
	                    $('[name="submitform"]', jqueryMap.$contractForm).removeAttr("disabled");
	                }
                }
                if(data.contract.shzt_dm !== "000") {
                	$('.shyj', jqueryMap.$contractForm).css("display","block");
                	$('[name="shyj"]', jqueryMap.$contractForm).val(data.contract.shyj);
                } else {
                	$('.shyj', jqueryMap.$contractForm).css("display","none");
                }
                $("#addfile", jqueryMap.$contractForm).html("添加附件(" + data.size + ")");
            },
            error: function () {
                App.alert({
                    container: blockTarget,
                    place: 'prepend',
                    type: 'info',
                    message: "获取参数信息失败！",
                    icon: 'fa fa-warning'
                });
            }
        });
    };

    /**
     * 续签合同
     * @constructor
     */
    var ContinueContract = function () {
        cleanform();                                                                                                    //获取前先清空表单
        var el = $(this);
        var rowIndex = configMap.contractGrid.cell(el.parent()).index().row;
        var htbm = configMap.contractGrid.row(rowIndex).data().htbm;
        var blockTarget = jqueryMap.$contractForm.closest(".modal-body");
        $.ajax({
            url: configMap.path + configMap.updateUrl + '/' + htbm,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                $("#selectBtn", jqueryMap.$contractForm).html(data.contract.sfxm_mc + '<span class="caret"></span>');
                $('[name="sfxmdm"]', jqueryMap.$contractForm).val(data.contract.sfxm_dm);
                $('[name="sfxmmc"]', jqueryMap.$contractForm).val(data.contract.sfxm_mc);
            	$('[name="sfxm"]', jqueryMap.$contractForm).val(data.contract.zfy.toFixed(2));
                $('[name="zje"]', jqueryMap.$contractForm).val(data.contract.hjje.toFixed(2));
            	$("#typeBtn", jqueryMap.$contractForm).html(data.contract.fkfs_mc + '<span class="caret"></span>');
            	$('[name="fkfs"]', jqueryMap.$contractForm).val(data.contract.fkfs_dm);
            	$("#fkfsBtn", jqueryMap.$contractForm).html(data.contract.fkxh_mc + '<span class="caret"></span>');
            	$('[name="fkfst"]', jqueryMap.$contractForm).val(data.contract.fkxh_dm);
                $('[name="qyrq"]', jqueryMap.$contractForm).val(moment(data.contract.qyrq).format('YYYY-MM-DD'));
                var month = 12 * ((new Date(data.contract.fwqxz).getFullYear()) - (new Date(data.contract.fwqxq).getFullYear()))
                    + (new Date(data.contract.fwqxz).getMonth()) - (new Date(data.contract.fwqxq).getMonth()) + 1;
                var start = new Date(data.contract.fwqxz).setDate(35);
                var end = new Date(data.contract.fwqxz).setMonth((new Date(data.contract.fwqxz)).getMonth() + month, 1);
                $('[name="createDate"]', jqueryMap.$contractForm).val(moment(start).format('YYYY-MM'));
                $('[name="startDate"]', jqueryMap.$contractForm).val(moment(end).format('YYYY-MM'));
                $('[name="tbsx"]', jqueryMap.$contractForm).val(data.contract.tbsx);
                $('[name="htbm"]', jqueryMap.$contractForm).val(data.contract.htbm);
                $('[name="xqzt"]', jqueryMap.$contractForm).val("1");
                $('[name="submitform"]', jqueryMap.$contractForm).removeAttr("disabled");
                $("#addfile", jqueryMap.$contractForm).html("添加附件(" + data.size + ")");
            },
            error: function () {
                App.alert({
                    container: blockTarget,
                    place: 'prepend',
                    type: 'info',
                    message: "获取参数信息失败！",
                    icon: 'fa fa-warning'
                });
            }
        });
    };

    /**
     * 模态框
     * @param title
     * @param url
     */
    var openModal = function (title, url) {
        var dialogButtons = {};
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractDialog = bootbox.dialog({
                className:'contractDBymdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    /**
     * 计算每月收费金额
     * @param value
     *              输入的总金额
     * @param startTime
     *              服务开始时间
     * @param endTime
     *              服务结束时间
     */
    var sumMoney = function (value){
        var monthSize;
        var startTime = new Date($('[name="createDate"]', jqueryMap.$contractForm).val());
        var endTime = new Date($('[name="startDate"]', jqueryMap.$contractForm).val());
        if($('#selectBtn').attr("data") === "002"){                                                                 //如果选择的是一次性收费
            $('[name="sfxm"]',jqueryMap.$contractForm).val(value);
        } else {
            monthSize = 12*(endTime.getFullYear() - startTime.getFullYear()) + endTime.getMonth()
                - startTime.getMonth() + 1;                                                                             //计算出服务月份
            $('[name="sfxm"]',jqueryMap.$contractForm).val((value/monthSize).toFixed(2));
        }
    };

    return {
        init: function (id, type) {
            configMap.id = id;                                                                                          //客户编码
            configMap.type = type;                                                                                      //类别
            setJqueryMap();
            $('[data-toggle="tooltip"]', jqueryMap.$contractForm).tooltip();                                     //提示框
            jqueryMap.$contractForm.closest(".modal-content").css("width", "920px");                             //设置模态框的宽度
            jqueryMap.$contractForm.closest(".modal-dialog").css({"cssText":"width:920px !important"});       //设置模态框的宽度
            //初始化日历控件，以及日期修改自动改变服务期限
            var nowDate = new Date;
            var nextDate = null;
            $('.createDate', jqueryMap.$contractForm).datepicker({                                                //服务开始日期
                format: 'yyyy-mm',
                autoclose: true,
                startView: 1,
                minViewMode: 1,
                maxViewMode: 1,
                forceParse: false,
                language: 'zh-CN'
            }).on('changeDate',function (ev){
            	if($("#typeBtn", jqueryMap.$contractForm).html().indexOf("按年")>=0){
            		nextDate = new Date(ev.date.setMonth(ev.date.getMonth() + 11, 1));
            		$('[name="startDate"]', jqueryMap.$contractForm).val(moment(nextDate).format('YYYY-MM'));
            	} else if ($("#typeBtn", jqueryMap.$contractForm).html().indexOf("其他")>=0) {
            		$('[name="startDate"]', jqueryMap.$contractForm).val(moment(ev.date).format('YYYY-MM'));
            	}
                sumMoney(Number($('[name="zje"]', jqueryMap.$contractForm).val()));                                 //日期改变，重新计算每月费用
            });
            $('.startDate', jqueryMap.$contractForm).datepicker({                                                 //服务结束日期
                format: 'yyyy-mm',
                autoclose: true,
                startView: 1,
                minViewMode: 1,
                maxViewMode: 1,
                forceParse: false,
                language: 'zh-CN'
            }).on('changeDate',function (ev){
            	if($("#typeBtn", jqueryMap.$contractForm).html().indexOf("按年")>=0){
            		nextDate = new Date(ev.date.setMonth(ev.date.getMonth() - 11, 1));
            		$('[name="createDate"]', jqueryMap.$contractForm).val(moment(nextDate).format('YYYY-MM'));
            	} else if ($("#typeBtn", jqueryMap.$contractForm).html().indexOf("其他")>=0) {
            		$('[name="createDate"]', jqueryMap.$contractForm).val(moment(ev.date).format('YYYY-MM'));
            	}
                sumMoney(Number($('[name="zje"]', jqueryMap.$contractForm).val()));                                 //日期改变，重新计算每月费用
            });
            $('.qyrq', jqueryMap.$contractForm).datepicker({                                                       //签约日期
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
                initialDate: new Date(),
                todayBtn: 'linked',
                endDate: new Date(),
                todayHighlight: true
            });
            $('[name="qyrq"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM-DD'));
            $('[name="createDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
            nextDate = new Date(nowDate.setMonth(nowDate.getMonth() + 11, 1));
            $('[name="startDate"]', jqueryMap.$contractForm).val(moment(nextDate).format('YYYY-MM'));
            getSFXM();                                                                                                  //获取当前代理机构的所有收费项目
            if (configMap.id) {                                                                                         //查询所选客户的合同信息
                jqueryMap.$datatableone.css("display", "block");
                jqueryMap.$datatableotwo.css("display", "none");
                $('[name="submitform"]', jqueryMap.$contractForm).removeAttr("disabled");
                initcontractGrid();
            } else {                                                                                                    //查询代理机构全部合同信息
                jqueryMap.$datatableone.css("display", "none");
                jqueryMap.$datatableotwo.css("display", "block");
                $('[name="submitform"]', jqueryMap.$contractForm).attr("disabled", "disabled");
                initAllGrid();
            }
            jqueryMap.$contractForm.find('[name="chargeinfo"]').off('click').on('click', function(){           //点击查看当前代理机构的服务项目
                var dialogButtons = {};
                dialogButtons.cancel = {
                    label: '<i class="fa fa-times"></i>关&nbsp;闭',
                    className: "btn btn btn-default borderRadius4"
                };
                var fileurl = '/customermanage/contract/costlist.jsp';
                $.get(fileurl, function (html) {
                    jqueryMap.$setimg = bootbox.dialog({
                        title: '收费项目',
                        message: html,
                        buttons: dialogButtons
                    });
                });
            });
            jqueryMap.$contractForm.find('button#cleanform').off('click').on('click', function () {             //清空按钮
                cleanform();
            });
            jqueryMap.$contractForm.find('button#submitform').off('click').on('click', function () {            //保存按钮
                if (checkValue()) {					//校验输入信息
                    if($('#selectBtn', jqueryMap.$contractForm).attr("data") === "001"){                          //判断当前选择的是否为常规收费
                        if (checkDate()) {			                                                                    //判断当前客户在该服务期限内是否存在该服务合同
                            saveContract();
                        }
                    } else {                                                                                            //一次性收费直接保存
                        saveContract();
                    }
                }
            });
            jqueryMap.$contractForm.find('button#addfile').off('click').on('click', function () {               //合同附件
                var dialogButtons = {
                };
                if(configMap.id){
                	dialogButtons.success = {
                            label: '<i class="fa fa-save"></i>保&nbsp;存',
                            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                            callback: function () {
                                fileAdd.getfile(function (result) {
                                    if (result) {
                                        jqueryMap.$setimg.modal('hide');
                                        $("#addfile").html("添加附件(" + sessionStorage.getItem("filesize") + ")");
                                    }
                                });
                                return false;
                            }
                        };
                } else {
                	dialogButtons.cancel = {
                			label: '<i class="fa fa-times"></i>关&nbsp;闭',
                            className: "btn btn btn-default borderRadius4"
                	}
                }
                var htbm = $('[name="htbm"]').val();
                var fileurl;
                if(configMap.id){
                	fileurl = configMap.path + configMap.imgUrl + "?id=" + configMap.id + "&htbm=" + htbm + "&status=insert";
                } else {
                	fileurl = configMap.path + configMap.imgUrl + "?id=" + configMap.id + "&htbm=" + htbm + "&status=show";
                }
                $.get(fileurl, function (html) {
                    jqueryMap.$setimg = bootbox.dialog({
                        title: '添加附件',
                        message: html,
                        buttons: dialogButtons
                    });
                });
            });
            $(".close", jqueryMap.$contractForm.closest(".modal-content")).off().on('click', function () {      //当前模态框的关闭事件
                sessionStorage.removeItem("fileuuid");
                sessionStorage.removeItem("filesize");
            });

            //textarea输入字数限制
            checkHowMany($("#tbsx"),$("#tbsxWords"),300);
        },

        /**
         * 设置路径
         * @param path
         */
        setPath: function (path) {
            configMap.path = path;
        },

        /**
         * 收費項目下拉菜單選擇以及收費金額輸入
         */
        showproject: function (e) {
        	var nowDate = new Date();
        	var nextDate;
            $('[name="sfxm"]',jqueryMap.$contractForm).val("0.00");
            $('[name="zje"]',jqueryMap.$contractForm).val("0.00");
            //修改下拉菜单的按钮内容
            $("#selectBtn", jqueryMap.$contractForm).html($(e).find("a").html() + '<span class="caret"></span>');
            $("#selectBtn", jqueryMap.$contractForm).attr("data",$(e).find("a").attr("class").split("_")[2]);
            $('input[name="sfxmdm"]').val($(e).find("a").attr("class").split("_")[1]);
            if($(e).find("a").attr("class").split("_")[2] !== "001"){
            	$('#sfjelabel').html('<span class="colorRed"> * </span>收费金额');
            	$('#typeBtn').html('其他<span class="caret"></span>');
            	$('input[name="fkfs"]').val('005');
            	$('[name="createDate"]','#contractForm').val(moment(nowDate).format('YYYY-MM'));
            	$('[name="startDate"]',"#contractForm").val(moment(nowDate).format('YYYY-MM'));
            } else {
            	$('#sfjelabel').html('<span class="colorRed"> * </span>收费金额/月');
            	$('#typeBtn').html('按年<span class="caret"></span>');
            	$('input[name="fkfs"]').val('001');
            	$('[name="createDate"]','#contractForm').val(moment(nowDate).format('YYYY-MM'));
                nextDate = new Date(nowDate.setMonth(nowDate.getMonth() + 11, 1));
                $('[name="startDate"]',"#contractForm").val(moment(nextDate).format('YYYY-MM'));
            }
        },

        /**
         * 付款方式下拉菜单选择
         */
        showpayment: function (e) {
        	var nowDate = new Date();
        	var nextDate;
        	if($('#selectBtn').attr("data") === "001"){                                                             //判断所选择的是否为常规业务收费
        		//判断之前选择的月份是否规范
                $("#typeBtn").html($(e).find("a").html() + '<span class="caret"></span>');
                $('input[name="fkfs"]').val($(e).find("a").attr("name"));
                //修改服务期限
                if($(e).find("a").html() === "按年"){
                	$('[name="createDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
                    nextDate = new Date(nowDate.setMonth(nowDate.getMonth() + 11, 1));
                    $('[name="startDate"]', jqueryMap.$contractForm).val(moment(nextDate).format('YYYY-MM'));
                } else if ($(e).find("a").html() === "按半年") {
                	$('[name="createDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
                    nextDate = new Date(nowDate.setMonth(nowDate.getMonth() + 11, 1));
                    $('[name="startDate"]', jqueryMap.$contractForm).val(moment(nextDate).format('YYYY-MM'));
                } else if ($(e).find("a").html() === "其他") {
                	$('[name="createDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
                	$('[name="startDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
                }
        	} else {
        		App.alert({
                    container: jqueryMap.$contractForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'warning',
                    message: "一次性业务收费付款方式只能选择其他！",
                    icon: 'fa fa-warning'
                });
        		//判断之前选择的月份是否规范
                $("#typeBtn", jqueryMap.$contractForm).html('其他<span class="caret"></span>');
                $('input[name="fkfs"]', jqueryMap.$contractForm).val("005");
                //修改服务期限
            	$('[name="createDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
            	$('[name="startDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
        	}
            sumMoney(Number($('[name="zje"]', jqueryMap.$contractForm).val()));
        },
        
        /**
         * 修改付款方式先付后付
         */
        changefkfst:function (e){
        	$("#fkfsBtn", jqueryMap.$contractForm).html($(e).find("a").html() + '<span class="caret"></span>');
        	$('input[name="fkfst"]', jqueryMap.$contractForm).val($(e).find("a").attr("name"));
        },
        
        /**
         * 输入服务费用之后校验金额(总金额)
         */
        verificationMoney: function (e) {
            var value = $(e).val();
            if (!whetherOrNotMoney(value)) {
                $(e).val("0.00");
                App.alert({
                    container: jqueryMap.$contractForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: "请输入正确的金额，金额保留两位！",
                    icon: 'fa fa-warning'
                });
            } else {
                sumMoney(value);
            }
        }

    };
}();
//@ sourceURL=edit.js