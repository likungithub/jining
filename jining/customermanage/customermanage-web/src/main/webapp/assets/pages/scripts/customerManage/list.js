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

var orgAndUser_data = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        aesUrl:'/customermanage/customerManage/aes',
        dataUrl: '/organization/organization/orgAndUserAuth',  //user节点的id为UUID，org节点的id也为UUID
        CustomerUrl: '/customermanage/ptkhxx/getCustomer',
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
        customerManageGrid: null,
        optType: null,
        orgTypes: [],
        fwzt: true,
        type: 1,
        other: "all",
        now: "1", //初始加载时为1，其他时为0
        verifyType: '',
        accountingBtn_html: '<a class="btn btn-xs khlistBtn colorBlue-10a0f7"  data-toggle="tooltip" data-placement="top"  data-type="accounting" title="记账"><i class="icon iconfont icon-pingjiaguanli iconFontSize" ></i></a>',
        addcontractBtn_html: '<a class="btn btn-xs khlistBtn colorBlue-10a0f7" data-toggle="tooltip" data-placement="top"  data-type="addcontract" title="合同"><i class="icon iconfont icon-hetong- iconFontSize" ></i></a>',
        addchargeBtn_html: '<a class="btn btn-xs khlistBtn colorBlue-10a0f7" data-toggle="tooltip" data-placement="top"  data-type="addcharge" title="收费"><i class="icon iconfont icon-caiwushuiwu iconFontSize"></i></a>',
        //btn btn-xs btnBlue btnBorderColor colorfff borderRadius4                                                                        padding-right:3px;position:relative;top:2px;
        accountingStopBtn_html: '<a class="btn btn-xs khlistBtn" data-toggle="tooltip" data-placement="top"  disabled data-type="accounting" title="记账"><i class="icon iconfont icon-pingjiaguanli iconFontSize" style="color: #666;"></i></a>',
        addcontractStopBtn_html: '<a class="btn btn-xs khlistBtn" data-toggle="tooltip" data-placement="top"  disabled data-type="addcontract" title="合同"><i class="icon iconfont icon-hetong- iconFontSize" style="color: #666;;"></i></a>',
        addchargeBStoptn_html: '<a class="btn btn-xs khlistBtn" data-toggle="tooltip" data-placement="top"  disabled data-type="addcharge" title="收费"><i class="icon iconfont icon-caiwushuiwu iconFontSize" style="color: #666;"></i></a>',
        viewchargeBtn_html: '<a class="btn btn-xs khlistBtn colorBlue-10a0f7 iconFontSize" data-toggle="tooltip" data-placement="top"  data-toggle="tooltip" title="查看收费历史" style="background: transparent !important;border: none !important;color: #666 !important;" data-type="viewcharge"><i class="icon iconfont icon-shijian historyColor"></i></a>',
        khbmString:''	,
        ifSearch:'0',
        yxkhId:"",
        yxkhName:"",
        uuid:''
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $customerManageFrom: null,
        $blockTarget: null,
        $customerManageTree: null,
        $customerManageDialog: null,
        $selectedRow: null,
        $customerManageDataTable: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#customerManage-manager-content');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$customerManageTree = $('#orgAndUser_manage_tree'+ uuid, jqueryMap.$container);
        jqueryMap.$customerManageDataTable = $('#orgAndUser_data', jqueryMap.$container);
    };
    //点击更多按钮的时候发生的动作
    $('.moreInfo ul>li',jqueryMap.$container).click(function(){
        $('.moreInfo',jqueryMap.$container).find('ul').addClass('hide');
    });
$('.moreInfo',jqueryMap.$container).hover(function(){
    $(this).find('ul').removeClass('hide');
    if($(this).find('ul').hasClass('hide')){
        $(this).find('i:eq(1)').removeClass().addClass('glyphicon glyphicon-menu-down');
    }else{
        $(this).find('i:eq(1)').removeClass().addClass('glyphicon glyphicon-menu-up');
    }
},function(){
    $(this).find('ul').addClass('hide');
    if($(this).find('ul').hasClass('hide')){
        $(this).find('i:eq(1)').removeClass().addClass('glyphicon glyphicon-menu-down');
    }else{
        $(this).find('i:eq(1)').removeClass().addClass('glyphicon glyphicon-menu-up');
    }

});

    var khxxjson = [];

    //记账和报税的模态框

    var operateModal = function(title,content,type,data){
        var dialogButtons = {};
        if (type === 'account') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 确 定',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                	var date1 = $('#customerBelongTime1 input').val();
                	if (date1 == null || date1 == '' || date1 == 'undefined') {
                		Messenger().post({
                            message: '请填写日期！',
                            type: 'warning'
                        });
                		return false;
                	}
                    var d1 = new Date(date1.replace(/\-/g, "\/")); //所选月份
                	var d2 = new Date(); //当前时间
                    d2.setDate(1); //当月第一天
                    if (d1 > d2) { //所选月份在后面
                        Messenger().post({
                            message: '记账日期不得晚于当前月份！',
                            type: 'warning'
                        });
                        return false;
                    }
                    date1 = date1.split("-")[0] + date1.split("-")[1];
                	var jzbz = $('#accountingLabel input[name="1"]:checked').val();
                    var tbbs = $('#accountingLabel input[name="3"]:checked').val(); //同步报税
                    $.ajax({ //插入数据
                        url: '/customermanage/ptkhxx/saveAccountList/1/' + date1 + '/' + jzbz + '/' + tbbs,
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'JSON',
                        type: 'POST',
                        data: configMap.khbmString,
                        success: function (data) {
                        	Messenger().post({
                                message: "保存成功！",
                                type: 'success'
                            });
                        },
                        error: function () {
                            Messenger().post({
                                message: "保存失败！",
                                type: 'error'
                            });
                            return false;
                        }
                    });
                }
            };
        }
        if (type === 'tax') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 确 定',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                	var date1 = $('#customerBelongTime2 input').val();
                	if (date1 == null || date1 == '' || date1 == 'undefined') {
                		Messenger().post({
                            message: '请填写日期！',
                            type: 'warning'
                        });
                		return false;
                	}
                    var d1 = new Date(date1.replace(/\-/g, "\/")); //所选月份
                    var d2 = new Date(); //当前时间
                    d2.setDate(1); //当月第一天
                    if (d1 > d2) { //所选月份在后面
                        Messenger().post({
                            message: '报税日期不得晚于当前月份！',
                            type: 'warning'
                        });
                        return false;
                    }
                    if(configMap.khbmString==''){
                        configMap.khbmString=JSON.stringify(data)
                    }
                    if (data != undefined) { //处理快捷申报界面的报税操作
                        configMap.khbmString=JSON.stringify(data)
                    }
                	date1 = ""+date1.split("-")[0] + date1.split("-")[1];
                	var bsbz = $('#taxLabel input[name="2"]:checked').val();
                    var tbbs = '0';
                	$.ajax({ //插入数据
                        url: '/customermanage/ptkhxx/saveAccountList/2/' + date1 + '/' + bsbz + '/' + tbbs,
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'JSON',
                        type: 'POST',
                        data: configMap.khbmString,
                        success: function (data) {
                        	Messenger().post({
                                message: "保存成功！",
                                type: 'success'
                            });
                        },
                        error: function () {
                            Messenger().post({
                                message: "保存失败！",
                                type: 'error'
                            });
                            return false;
                        }
                    });
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 取 消',
            className: 'btn btn-default borderRadius4 color666',
            callback: function () {

            }
        }

        var dialog = bootbox.dialog({
            title:title,
            message:content ,
            buttons:dialogButtons
        });
    }
    //打开记账的模态框
    function account_M() {
        var str = '' +
            '<div class="input-group" style="margin-bottom: 15px">'+
            '<div style="width: 120px;height: 33px;line-height: 33px;float: left;background: #f6f6f6;border: 1px solid #dadada!important;border-right: none!important;text-align: center;border-radius: 4px 0 0 4px!important;margin-left: 50px;">所属日期</div>'+
            '<div class="date pull-left" id="customerBelongTime1">'+
            '<input type="text" readonly="" class="appsysinfo-m inputCommon text-center" name="starDate" style="border-radius: 0 !important; width: 142px">'+
            '<span>'+
            '<button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">'+
            '<i class="fa fa-calendar"></i>'+
            '</button>'+
            '</span>'+
            '</div>'+
            ' </div>'+
            '<div class="input-group" style="margin-bottom: 15px">'+
            '<div style="width: 120px;height: 33px;line-height: 33px;float: left;background: #f6f6f6;border: 1px solid #dadada!important;border-right: none!important;text-align: center;border-radius: 4px 0 0 4px!important;margin-left: 50px;">记账状态</div>'+
            '<div id="accountingLabel" style="padding-top: 5px;float: left;border: 1px solid #dadada;height: 33px;line-height: 0;width: 180px;text-align: center;border-radius: 0 4px 4px 0!important;">'+
            '<input type="radio" name="1" id="customerspan1" value="1" checked>'+
            '<label for="customerspan1" style="padding: 5px;cursor: pointer;vertical-align:text-top">已记账</label>'+
            '<input type="radio" name="1" id="customerspan2" value="0">'+
            '<label for="customerspan2" style="padding: 5px;cursor: pointer;vertical-align:text-top">未记账</label>'+
            '</div>'+
            '</div>'+
            '<div class="input-group">'+
            '<div style="width: 120px;height: 33px;line-height: 33px;float: left;background: #f6f6f6;border: 1px solid #dadada!important;border-right: none!important;text-align:center;border-radius: 4px 0 0 4px!important;margin-left: 50px;">同步报税</div>'+
            '<div id="accountingLabel" style="padding-top: 5px;float: left;border: 1px solid #dadada;height: 33px;line-height: 0;width: 180px;text-align: center;border-radius: 0 4px 4px 0!important;">'+
            '<input type="radio" name="3" id="bsYes" value="1" checked>'+
            '<label for="bsYes" style="padding: 5px;cursor: pointer;vertical-align:text-top">是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
            '<input type="radio" name="3" id="bsNo" value="0">'+
            '<label for="bsNo" style="padding: 5px;cursor: pointer;vertical-align:text-top">否&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
            '</div>'+
            '</div>'+
            '<script>' +
                '$(":radio",$("#accountingLabel")).click(function(){'+
                'if($("#customerspan2").is(":checked")){'+
                   " $('#bsYes').prop({checked:true,"+
                                        "disabled:true"+
                   '});'+
                   " $('#bsNo').prop({'checked':true,"+
                       " 'disabled':true"+
                    '});'+
                '}else{'+
                    "$('#bsYes').prop({'checked':true,"+
                        "'disabled':false"+
                    '});'+
                    "$('#bsNo').prop({'checked':true,"+
                       " 'disabled':false"+
                    '});'+
                '}'+

                '});'+

            '$("#customerBelongTime1").datepicker({'+
            'startView: 1,'+
            'minViewMode: 1,'+
            'maxViewMode: 1,'+
            'clearBtn: true,'+
            "format: 'yyyy-mm',"+
            "autoclose: true,"+
            " language: 'zh-CN',"+
            'defaultDate : new Date()'+
            '});'+

                '$("#accountingLabel").parents(".modal-dialog").css("width",440)'+

            '</script>';
        operateModal('登记记账状态',str,'account');
    }
    //打开报税的模态框
    function tax_M(data){
        var str = '' +
            '<div class="input-group" style="margin-bottom: 15px">'+
            '<div style="margin-left: 50px;width: 120px;height: 33px;line-height: 33px;float: left;background: #f6f6f6;border: 1px solid #dadada!important;border-right: none!important;text-align: center;border-radius: 4px 0 0 4px!important;">所属日期</div>'+
            '<div class="date pull-left" id="customerBelongTime2">'+
            '<input type="text" readonly="" class="appsysinfo-m inputCommon text-center" name="starDate" style="border-radius: 0 !important; width: 142px">'+
            '<span>'+
            '<button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">'+
            '<i class="fa fa-calendar"></i>'+
            '</button>'+
            '</span>'+
            '</div>'+
            ' </div>'+
            '<div class="input-group">'+
            '<div style="margin-left: 50px;width: 120px;height: 33px;line-height: 33px;float: left;background: #f6f6f6;border: 1px solid #dadada!important;border-right: none!important;text-align: center;border-radius: 4px 0 0 4px!important;">报税状态</div>'+
            '<div id="taxLabel" style="padding-top: 5px;float: left;border: 1px solid #dadada;height: 33px;line-height: 0;width: 180px;text-align: center;border-radius: 0 4px 4px 0!important;">'+
            '<input type="radio" name="2" id="customerspan1" value="1" checked>'+
            '<label for="customerspan1" style="padding: 5px;cursor: pointer;vertical-align: text-top">已报税</label>'+
            '<input type="radio" name="2"  id="customerspan2" value="0">'+
            '<label for="customerspan2" style="padding: 5px;cursor: pointer;vertical-align: text-top">未报税</label>'+
            '</div>'+
            '</div>'+
            '<script>' +
            '$("#customerBelongTime2").datepicker({'+
            'startView: 1,'+
            'minViewMode: 1,'+
            'maxViewMode: 1,'+
            ' clearBtn: true,'+
            "format: 'yyyy-mm',"+
            "autoclose: true,"+
            " language: 'zh-CN',"+
            'defaultDate : new Date()'+
            '});'+
            '$("#taxLabel").parents(".modal-dialog").css("width",440)'+
            '</script>';
        operateModal('登记报税状态',str,'tax',data);
    }

    $('#customerAccounting-M').click(function(){
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$customerManageDataTable).not(jqueryMap.$container.find('[name="selectCustomerManager"]'));
        var temp = null;
        khxxjson = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
            var khbm = configMap.customerManageGrid.row(rowIndex).data().khbm;
            var gsmc = configMap.customerManageGrid.row(rowIndex).data().gsmc;
            var nsrsbh = configMap.customerManageGrid.row(rowIndex).data().nsrsbh;
            var zydm = configMap.customerManageGrid.row(rowIndex).data().zydm;
            temp = {khbm: khbm,
            		gsmc: gsmc,
            		nsrsbh: nsrsbh,
            		zydm: zydm};
            khxxjson.push(temp);
        });
        var data = {
            khxx: khxxjson
        }
        if (data.khxx.length === 0) {
            Messenger().post({
                message: '请选择一个用户！',
                type: 'warning',
                id: 'listTip-m',
            });
        } else {
        	configMap.khbmString = JSON.stringify(data);
            account_M();
        }
    });

    $('#customerReportTax-M').click(function(){
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$customerManageDataTable).not(jqueryMap.$container.find('[name="selectCustomerManager"]'));
        var temp = null;
        khxxjson = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
            var khbm = configMap.customerManageGrid.row(rowIndex).data().khbm;
            var gsmc = configMap.customerManageGrid.row(rowIndex).data().gsmc;
            var nsrsbh = configMap.customerManageGrid.row(rowIndex).data().nsrsbh;
            var zydm = configMap.customerManageGrid.row(rowIndex).data().zydm;
            temp = {khbm: khbm,
            		gsmc: gsmc,
            		nsrsbh: nsrsbh,
            		zydm: zydm};
            khxxjson.push(temp);
        });
        var data = {
            khxx: khxxjson
        }
        if (data.khxx.length === 0) {
            Messenger().post({
                message: '请选择一个用户！',
                type: 'warning',
                id: 'listTip-m',
            });
        } else {
        	configMap.khbmString = JSON.stringify(data);
        	tax_M();
        }
    });

    var tableaccount = function () {
        var el = $(this);
        var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
        var khbm = configMap.customerManageGrid.row(rowIndex).data().khbm;
        var gsmc = configMap.customerManageGrid.row(rowIndex).data().gsmc;
        var nsrsbh = configMap.customerManageGrid.row(rowIndex).data().nsrsbh;
        var zydm = configMap.customerManageGrid.row(rowIndex).data().zydm;
        var temp = null;
        khxxjson = [];
        temp = {khbm: khbm,
        		gsmc: gsmc,
        		nsrsbh: nsrsbh,
        		zydm: zydm};
        khxxjson.push(temp);
        var data = {
        		khxx: khxxjson
        }
        configMap.khbmString = JSON.stringify(data);
        account_M();

    }

    var tabletax = function (e) {
        var el = $(e);
        var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
        var khbm = configMap.customerManageGrid.row(rowIndex).data().khbm;
        var gsmc = configMap.customerManageGrid.row(rowIndex).data().gsmc;
        var nsrsbh = configMap.customerManageGrid.row(rowIndex).data().nsrsbh;
        var zydm = configMap.customerManageGrid.row(rowIndex).data().zydm;
        var temp = null;
        khxxjson = [];
        temp = {khbm: khbm,
        		gsmc: gsmc,
        		nsrsbh: nsrsbh,
        		zydm: zydm
        		};
        khxxjson.push(temp);
        var data = {
        		khxx: khxxjson
        }
        configMap.khbmString = JSON.stringify(data);
        tax_M();
    }
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


//    dialogButtons.cancel= {
//        label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
//        className: 'btn borderRadius4 color666'
//      }


        if (type === 'addCustomer') {
            dialogButtons.success = {
                label: '<i class="icon iconfont icon-xiayibu iconFontSize" style="color: #fff;></i> 下一步 ',
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
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
            /*dialogButtons.cancel= {
             label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
             className: 'btn btn btn-default borderRadius4'
             }*/
        }
        if (type === 'Dispatch') {
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
            className: 'btn btn-default borderRadius4 color666',
            callback: function () {
                sessionStorage.removeItem("uuid");
                sessionStorage.removeItem("filesize");
            }
        }

        $.get(url, function (html) {

            jqueryMap.$customerManageDialog = bootbox.dialog({
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
//        	  var oswdjh = $('input[name="nsrsbh"]').val();
//        	  var ogsm = $('input[name="gsmc"]').val();
//        	  var ofrdb = $('input[name="frdb"]').val();
//        	  var osfz = $('input[name="sfzh"]').val();
//        	  var ozzjgdm = $('input[name="zzjgdm"]').val();
//        	  if(oswdjh == "undefined" || oswdjh == null || oswdjh == ""){
//      			App.alert({
//      				container :  $('#customerManageForm').closest(".modal-body"),
//      				place : 'prepend',
//      				type : 'danger',
//      				message : '税务登记号不能为空！',
//      				icon : 'fa fa-warning'
//      			});
//      			return false;
//      		}else if(!whetherOrNotNsrbh(oswdjh)){
//    			App.alert({
//    				container : $('#customerManageForm').closest(".modal-body"),
//    				place : 'prepend',
//    				type : 'danger',
//    				message : '税务登记号请输入15-18位数字，字母或数字与字母组合！',
//    				icon : 'fa fa-warning'
//    			});
//    			return false;
//    		}else if(ogsm == "undefined" || ogsm == null || ogsm == ""){ //验证公司名称
//    			App.alert({
//    				container : $('#customerManageForm').closest(".modal-body"),
//    				place : 'prepend',
//    				type : 'danger',
//    				message : '公司名不能为空！',
//    				icon : 'fa fa-warning'
//    			});
//    			return false;
//    		}else if(ofrdb == "undefined" || ofrdb == null || ofrdb == ""){ //验证法人代表
//    			App.alert({
//    				container : $('#customerManageForm').closest(".modal-body"),
//    				place : 'prepend',
//    				type : 'danger',
//    				message : '法人代表不能为空！',
//    				icon : 'fa fa-warning'
//    			});
//    			return false;
//
//    		}else if(osfz == "undefined" || osfz == null || osfz == ""){
//    			App.alert({
//    				container : $('#customerManageForm').closest(".modal-body"),
//    				place : 'prepend',
//    				type : 'danger',
//    				message : '身份证号码不能为空！',
//    				icon : 'fa fa-warning'
//    			});
//    			return false;
//    		}else if(!whetherOrNotID(osfz)){ //验证身份证号码
//    			App.alert({
//    				container : $('#customerManageForm').closest(".modal-body"),
//    				place : 'prepend',
//    				type : 'danger',
//    				message : '身份证号码不合法！',
//    				icon : 'fa fa-warning'
//    			});
//    			return false;
//    		}else if(ozzjgdm == "undefined" || ozzjgdm == null || ozzjgdm == ""){ //组织机构代码
//    			App.alert({
//    				container : $('#customerManageForm').closest(".modal-body"),
//    				place : 'prepend',
//    				type : 'danger',
//    				message : '组织机构代码不能为空！',
//    				icon : 'fa fa-warning'
//    			});
//    			return false;
//    		}else if(!whetherOrNotZZJGDM(ozzjgdm)){ //组织机构代码
//    			App.alert({
//    				container : $('#customerManageForm').closest(".modal-body"),
//    				place : 'prepend',
//    				type : 'danger',
//    				message : '组织机构代码为8位，大写字母与数字组合！',
//    				icon : 'fa fa-warning'
//    			});
//    			return false;
//    		}
                    var e = $('p.active1').parent();
                    var linum = e.index() + 1;
                    $('.o-m .ul-o li').eq(linum).click();
                });
            }
        });
    };

//  var createOrgUser = function () {
//    openModal('创建用户',
//      configMap.path + configMap.createUserPageUrl + '?orgid=' + configMap.currentSelectedNode.id,
//      'edit', function () {
//        userEdit.saveUser(function (result) {
//          if (result) {
//            jqueryMap.$customerManageDialog.modal('hide');
//          }
//        });
//      });
//  };

    var accounting = function () {
            stopContinueClick(this, 300);
            var tb = $("#jztb").text();//0 不同步 1同步
            if('1'==tb){
                var el = $(this);
                var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
                var sjhm = configMap.customerManageGrid.row(rowIndex).data().sjhm;
                var khbm = configMap.customerManageGrid.row(rowIndex).data().khbm;

                url = "http://120.27.232.180:88/yh.php?ac=single_login";
                var data = {
                    //mobile: "13708978170",
                    khbm: khbm,
                }
                $.ajax({
                    url: configMap.path + configMap.aesUrl,
                    dataType: 'JSON',
                    type: 'POST',
                    data: data,
                    success: function (data) {
                        data.mobile = encodeURIComponent(data.mobile);
                        url = data.php_url;
                        url = url + "&mobile=" + data.mobile;
                        window.open(url);
                        return;
                    },
                    error: function () {
                        Messenger().post({
                            message: "请求失败！",
                            type: 'error'
                        });
                        callback(false);
                    }
                });
            }else{
                return;
                var el = $(this);
                var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
                var customerCode = configMap.customerManageGrid.row(rowIndex).data().khbm;
                var customerCompany = configMap.customerManageGrid.row(rowIndex).data().gsmc;
                var url = configMap.path + configMap.accountingPageUrl + "?customerCode=" + encodeURI(customerCode) + "&customerCompany=" + encodeURI(customerCompany);
                openNewModal(customerCompany, url, 'account', customerCode);
            }
    };

    var addContract = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
        var id = configMap.customerManageGrid.row(rowIndex).data().khbm;
        var name = configMap.customerManageGrid.row(rowIndex).data().gsmc;
        openModal('代理记账服务合同——' + name, configMap.path + configMap.addcontractPageUrl + "?id=" + encodeURI(id) + "&name=" + encodeURI(name), 'add', function () {
//	        userEdit.saveUser(function (result) {
//	            if (result) {
//	              jqueryMap.$customerManageDialog.modal('hide');
//	            }
//	          });
        });
    };
    var addContractYxkh = function () {
        var id = configMap.yxkhId;
        var name = configMap.yxkhName;
        openModal('代理记账服务合同——' + name, configMap.path + configMap.addcontractPageUrl + "?id=" + encodeURI(id) + "&name=" + encodeURI(name), 'add', function () {
//	        userEdit.saveUser(function (result) {
//	            if (result) {
//	              jqueryMap.$customerManageDialog.modal('hide');
//	            }
//	          });
        });
    };
    var addcharge = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
        var id = configMap.customerManageGrid.row(rowIndex).data().khbm;
//        openModal('代理记账服务收费——' + name, configMap.path + configMap.addchargePageUrl + "?id=" + encodeURI(id) + "&name=" + encodeURI(name), 'charge', function () {
//            chargeAdd.saveCharge(function (result) {
//                if (result) {
//                    configMap.customerManageGrid.ajax.reload();
//                    jqueryMap.$customerManageDialog.modal('hide');
//                    Messenger().post("保存成功!");
//                }
//            });
//        });
        generateTab(this,"/customermanage/charge/list.jsp?khbm="+id,"收费台账","2ce27699-5ae3-4ecd-87d6-5701a1196498",'fa fa-file-text-o iconMr');
    }
    var viewcharge = function () {
        $('[data-toggle="tooltip"]').tooltip("hide");
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
        var id = configMap.customerManageGrid.row(rowIndex).data().khbm;
        var name = configMap.customerManageGrid.row(rowIndex).data().gsmc;
        openModal('代理记账服务收费历史记录——' + name, configMap.path + configMap.viewchargePageUrl + "?id=" + encodeURI(id), 'view');
    }

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
    //update slg
    var table = function (e) {
        stopContinueClick(e, 300);
        var el = $(e);
        clearRWlocalstore();
        var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
        var id = configMap.customerManageGrid.row(rowIndex).data().khbm;
        var name = configMap.customerManageGrid.row(rowIndex).data().gsmc;
        var dlzh = configMap.customerManageGrid.row(rowIndex).data().sjhm;
        var tab_id = "54cd63e4-589b-4cb4-ace0-987d7f637a09";
        closeTAB(tab_id)
        tabMenu(tab_id);
        //openModal('跟进服务——' + name, configMap.path + configMap.followupPageUrl + '?khbm=' + encodeURI(id) + '&name=' + encodeURI(name), 'followup');
        generateTab(this,"/systemmanager/taskcenter/taskmanagement/list.jsp?sjhm="+dlzh+"&khbm="+id+"&khmc="+encodeURI(name)+"&canadd=true&sjly=3",name,tab_id,'fa fa-outdent iconMr');

    };

    //税税通
    var tanle = function (e) {
        stopContinueClick(e, 300);
        //window.open("/customermanage/customerManage/ssttest");
       // return;
        $.get('/customermanage/customerManage/ssttest',function(data){
            if(data.flag){
                var theResponse = window.prompt("请在此输入验证码。","");
                window.open("/customermanage/customerManage/ssttestlogin?yzm="+theResponse+"&cookie="+data.cookie+"&sstCookie="+data.sstCookie);
                return;
                /* Cookies.set("a",data.cookie,{expires: 1});
                 Cookies.set("cookie",data.cookie,{domain:"sst.qd-n-tax.gov.cn",expires: 1});
                 Cookies.set("sstCookie",data.sstCookie,{domain:"sst.qd-n-tax.gov.cn",expires: 1});
                 var url ="https://sst.qd-n-tax.gov.cn/dzswj/initQxJsMenu.do";
                 window.open(url);
                 return;*/
            }
        });

    }



    var openModalSST = function (title, html) {
        var dialogButtons = {};
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666',
            callback: function () {

            }
        }
        jqueryMap.$customerManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
        });
    };


    var tanle11= function (e) {
        stopContinueClick(e, 300);
        var el = $(e);
        var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
        var id = configMap.customerManageGrid.row(rowIndex).data().khbm;
        var name = configMap.customerManageGrid.row(rowIndex).data().gsmc;
        openModal('税务申报', configMap.path + configMap.reportTaxPageUrl + '?khbm=' + encodeURI(id) + '&name=' + encodeURI(name), 'reporttax');
    }
    //停止或恢复服务
    var stopCustomer = function (e) {
        if (e === 0) {
            stopContinueClick("#stopCustomerBtn", 300);
        } else {
            stopContinueClick("#restartCustomer", 300);
        }
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$customerManageDataTable).not(jqueryMap.$container.find('[name="selectCustomerManager"]'));
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
                type: 'warning',
                id: 'listTip-m',
            });
        } else {
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
                    btnKhxxSearch();
                },
                error: function () {
                    if (e === 0) {
                        Messenger().post({
                            message: '客户停止服务失败！',
                            type: 'error'
                        });
                    } else {
                        Messenger().post({
                            message: '客户恢复服务失败！',
                            type: 'error'
                        });
                    }
                    btnKhxxSearch();
                }
            });
        }
    }

    //删除客户
    var delCustomerBtn = function () {
        stopContinueClick("#delCustomerBtn", 300);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$customerManageDataTable).not(jqueryMap.$container.find('[name="selectCustomerManager"]'));
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
                message: '请选择一个客户！',
                type: 'warning',
                id: 'listTip-m',
            });
        } else {
            bootbox.dialog({
            title: '提示',
            message: '确定要删除客户？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        App.blockUI({
                            target: jqueryMap.$blockTarget,
                            boxed: true,
                            message: '正在删除客户，请稍候...'
                        });

                        $.ajax({
                            url: configMap.path + "/customermanage/ptkhxx/delCustomer",
                            type: 'PUT',
                            dataType: 'JSON',
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify(data),
                            success: function (result) {
                                App.unblockUI(jqueryMap.$blockTarget);
                                if (result) {
                                    Messenger().post({
                                        message: '删除成功！'
                                    });
                                }
                                btnKhxxSearch();
                            },
                            error: function () {
                                App.unblockUI(jqueryMap.$blockTarget);
                                Messenger().post({
                                    message: '删除失败！',
                                    type: 'error'
                                });
                                btnKhxxSearch();
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
        }
    }

    //根据当前节点选中的条件查询最新结果
    var getSelectedData = function () {
        if (configMap.currentSelectedNode === null || configMap.currentSelectedNode.parent === '#') { //点击的是所有客户
            var states = true;
            if (configMap.currentSelectedNode === null || configMap.currentSelectedNode.id === 'workCustomer') {
                states = true; //正在服务的
            } else if (configMap.currentSelectedNode.id === 'stopCustomer') {
                states = false; //停止服务的
            }
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在获取数据，请稍候...'
            });
            //展示出已经停止服务的客户列表信息
            $.ajax({
                url: configMap.path + configMap.CustomerUrl + "/1/" + states,
                dataType: 'JSON',
                type: 'GET',
                success: function (result) {
                    if (configMap.currentSelectedNode === null || configMap.currentSelectedNode.id === 'workCustomer') {
                        $('#restartCustomer').hide();
                        $('#stopCustomerBtn').show();
                    } else if (configMap.currentSelectedNode.id === 'stopCustomer') {
                        $('#restartCustomer').show();
                        $('#stopCustomerBtn').hide();
                    }
                    configMap.fwzt = false;
                    App.unblockUI(jqueryMap.$blockTarget);
                    configMap.customerManageGrid.clear().draw();
                    configMap.customerManageGrid.rows.add(result).draw();
                },
                error: function () {
                    App.unblockUI(jqueryMap.$blockTarget);
                    configMap.customerManageGrid.clear().draw();
                }
            });
        } else if (configMap.currentSelectedNode.children.length > 0) { //若子节点有值，代表为部门
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在获取数据，请稍候...'
            });
            //展示出该部门的客户列表信息
            $.ajax({
                url: configMap.path + configMap.CustomerUrl + "/2/" + configMap.currentSelectedNode.id,
                dataType: 'JSON',
                type: 'GET',
                success: function (result) {
                    $('#restartCustomer').hide();
                    $('#stopCustomerBtn').show();
                    configMap.fwzt = false;
                    App.unblockUI(jqueryMap.$blockTarget);
                    configMap.customerManageGrid.clear().draw();
                    configMap.customerManageGrid.rows.add(result).draw();
                },
                error: function () {
                    App.unblockUI(jqueryMap.$blockTarget);
                    configMap.customerManageGrid.clear().draw();
                }
            });
        } else { //代表个人
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在获取数据，请稍候...'
            });
            //展示出该部门的客户列表信息
            $.ajax({
                url: configMap.path + configMap.CustomerUrl + "/3/" + configMap.currentSelectedNode.li_attr.zydm,
                dataType: 'JSON',
                type: 'GET',
                success: function (result) {
                    $('#restartCustomer').hide();
                    $('#stopCustomerBtn').show();
                    configMap.fwzt = false;
                    App.unblockUI(jqueryMap.$blockTarget);
                    configMap.customerManageGrid.clear().draw();
                    configMap.customerManageGrid.rows.add(result).draw();
                },
                error: function () {
                    App.unblockUI(jqueryMap.$blockTarget);
                    configMap.customerManageGrid.clear().draw();
                }
            });
        }
    }

    var dispatchedStaff = function () {
        stopContinueClick("#dispatchedStaff", 300);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$customerManageDataTable).not(jqueryMap.$container.find('[name="selectCustomerManager"]'));
        var temp = null;
        khxxjson = [];
        $(inputjson).each(function () {
            temp = {khxx: $(this).attr("value")};
            khxxjson.push(temp);
        });
        if (khxxjson.length == 0) {
            Messenger().post({
                message: '请选择一个客户！',
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
        var jstree = jqueryMap.$customerManageTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.path + configMap.dataUrl
                },
                "state": {
                    "opened": true,  //展示第一个层级下面的node
                    //该根节点不可点击
                }
            },
            "types": {
                "default": {
                    "icon": true
                }

            },

            'plugins': ["types", "expand", "search"],
            "expand": {
                level: 5
            }
        }).on("load_node.jstree", function (e, d) {
            $('#orgAndUser_manage_tree'+ configMap.uuid).on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            getTreeNum();
            $("#orgAndUser_manage_tree"+ configMap.uuid).bind("select_node.jstree", function (e, data) {

                if (data.node.id == 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        $('#orgAndUser_manage_tree'+ configMap.uuid).jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });


        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#orgAndUser_manage_tree"+ configMap.uuid +" li").length; i++) {
                var $temp = $("#orgAndUser_manage_tree"+ configMap.uuid +" li").eq(i).attr("userimg");
                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                } else {
                    localStorage.setItem("step",i);
                }
            }
            $(".jstree-children li").each(function () {
                if($(this).attr("userImg")==0){
                    $(this).find("a").eq(0).find("i").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
                }

            })
        }
        var clearTreeNum = function () {
            for (var i = 0; i < $("#orgAndUser_manage_tree"+ configMap.uuid +"  li").length; i++) {
                var $temp = $("#orgAndUser_manage_tree"+ configMap.uuid +"  li").eq(i).attr("userimg");

                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                } else {
                    $("#orgAndUser_manage_tree"+ configMap.uuid +" li").eq(i).find("a").remove();
                }
            }
        }


        jqueryMap.$customerManageTree.on('select_node.jstree', function (e, data) {
            configMap.currentSelectedNode = data.node;
            configMap.optType = 'edit';
            if (data.node.parent === '#') { //点击的是所有客户
                configMap.type = 1;
                //configMap.now = "0";
                configMap.fwzt = true; //正在服务的
                if (data.node.id === 'stopCustomer') {//停止服务的
                    configMap.fwzt = false;

                }
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出已经停止服务的客户列表信息
//    	  $.ajax({
//    		  url: configMap.path + configMap.CustomerUrl + "/" + configMap.type + "/" + configMap.fwzt + "/all",
//    		  dataType:'JSON',
//    		  type:'GET',
//    		  data: {searchText:jqueryMap.$container.find('#searchKhmc').val()},
//    		  success:function(result){
//    			  if (data.node.id === 'workCustomer') {
//    				  $('#restartCustomer').hide();
//        			  $('#stopCustomer').show();
//    	          } else if (data.node.id === 'stopCustomer') {
//    	        	  $('#restartCustomer').show();
//        			  $('#stopCustomer').hide();
//    	          }
//    			  configMap.fwzt = false;
//    			  App.unblockUI(jqueryMap.$blockTarget);
//    			  //configMap.customerManageGrid.clear().draw();
//    			  configMap.customerManageGrid.ajax.reload();
//    		  },
//    		  error:function(){
//    			  App.unblockUI(jqueryMap.$blockTarget);
//    			  configMap.customerManageGrid.clear().draw();
//    		  }
//    	  });

                configMap.customerManageGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
                if (configMap.fwzt) { //正在服务的
                    $('#restartCustomer').hide();
                    $('#stopCustomerBtn').show();
                    $('#delCustomerBtn', jqueryMap.$container).hide();
                    $('#addCustomerManage', jqueryMap.$container).prop('disabled', false);
                    $('#dispatchedStaff', jqueryMap.$container).prop('disabled', false);
                    $('#importExcel', jqueryMap.$container).prop('disabled', false);
                    $('#customerAccounting-M', jqueryMap.$container).prop('disabled', false);
                    $('#customerReportTax-M', jqueryMap.$container).prop('disabled', false);
                } else { //停止的
                    $('#restartCustomer').show();
                    $('#stopCustomerBtn').hide();
                    $('#delCustomerBtn', jqueryMap.$container).show();
                    $('#addCustomerManage', jqueryMap.$container).prop('disabled', true);
                    $('#dispatchedStaff', jqueryMap.$container).prop('disabled', true);
                    $('#importExcel', jqueryMap.$container).prop('disabled', true);
                    $('#customerAccounting-M', jqueryMap.$container).prop('disabled', true);
                    $('#customerReportTax-M', jqueryMap.$container).prop('disabled', true);
                }
            } else if (data.node.li_attr.BMBZ === "1") { //部门标志为true，代表为部门
                configMap.fwzt = true; //正在服务的
                configMap.type = 2; //代表部门
                configMap.other = data.node.li_attr.bmdm; //部门代码
                //configMap.now = "0";
                $('#restartCustomer').hide();
                $('#stopCustomerBtn').show();
                $('#delCustomerBtn', jqueryMap.$container).hide();
                $('#addCustomerManage', jqueryMap.$container).prop('disabled', false);
                $('#dispatchedStaff', jqueryMap.$container).prop('disabled', false);
                $('#importExcel', jqueryMap.$container).prop('disabled', false);
                $('#customerAccounting-M', jqueryMap.$container).prop('disabled', false);
                $('#customerReportTax-M', jqueryMap.$container).prop('disabled', false);
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出该部门的客户列表信息
//    	  $.ajax({
//    		  url: configMap.path + configMap.CustomerUrl + "/" + configMap.type + "/" + configMap.fwzt + "/" + configMap.other,
//    		  dataType:'JSON',
//    		  type:'GET',
//    		  data: {searchText:jqueryMap.$container.find('#searchKhmc').val()},
//    		  success:function(result){
//
//    			  $('#restartCustomer').hide();
//    			  $('#stopCustomer').show();
//    			  configMap.fwzt = false;
//    			  App.unblockUI(jqueryMap.$blockTarget);
//    			  configMap.customerManageGrid.ajax.url(result.aaData).load();
//    			  //configMap.customerManageGrid.rows.add(result).draw();
//    		  },
//    		  error:function(){
//    			  App.unblockUI(jqueryMap.$blockTarget);
//    			  configMap.customerManageGrid.clear().draw();
//    		  }
//    	  });

                configMap.customerManageGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
                $('#restartCustomer').hide();
                $('#stopCustomerBtn').show();
            } else { //代表个人
                configMap.fwzt = true; //正在服务的
                configMap.type = 3;
                configMap.other = data.node.li_attr.zydm;
                //configMap.now = "0";
                $('#restartCustomer').hide();
                $('#stopCustomerBtn').show();
                $('#delCustomerBtn', jqueryMap.$container).hide();
                $('#addCustomerManage', jqueryMap.$container).prop('disabled', false);
                $('#dispatchedStaff', jqueryMap.$container).prop('disabled', false);
                $('#importExcel', jqueryMap.$container).prop('disabled', false);
                $('#customerAccounting-M', jqueryMap.$container).prop('disabled', false);
                $('#customerReportTax-M', jqueryMap.$container).prop('disabled', false);
//    	  App.blockUI({
//	          target: jqueryMap.$blockTarget,
//	          boxed: true,
//	          message: '正在获取数据，请稍候...'
//	      });
                //展示出该部门的客户列表信息
//    	  $.ajax({
//    		  url: configMap.path + configMap.CustomerUrl + "/" + configMap.type + "/" + configMap.fwzt + "/" + configMap.other,
//    		  dataType:'JSON',
//    		  type:'GET',
//    		  data: {searchText:jqueryMap.$container.find('#searchKhmc').val()},
//    		  success:function(result){
//    			  $('#restartCustomer').hide();
//    			  $('#stopCustomer').show();
//    			  configMap.fwzt = false;
//    			  App.unblockUI(jqueryMap.$blockTarget);
//    			  //configMap.customerManageGrid.clear().draw();
//    			  configMap.customerManageGrid.ajax.url(result).load();
//    		  },
//    		  error:function(){
//    			  App.unblockUI(jqueryMap.$blockTarget);
//    			  configMap.customerManageGrid.clear().draw();
//    		  }
//    	  });
                configMap.customerManageGrid.clear().draw();
                configMap.customerManageGrid.ajax.reload();
                //App.unblockUI(jqueryMap.$blockTarget);
                $('#restartCustomer').hide();
                $('#stopCustomerBtn').show();
            }
        });
        //jstree定时搜索功能
        //输入框输入定时自动搜索
        var to = false;
        $('#search_ay'+ configMap.uuid).keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_ay'+ configMap.uuid).val());
                // $("#orgAndUser_manage_tree").jstree(true).refresh();
            }, 250);

        });

    };

    //增加代理记账公司客户
    var addCustomerManage = function () {
        stopContinueClick("#addCustomerManage", 300);
        generateTab(this,configMap.path + configMap.addUrl,"创建客户","khxx_info",'fa fa-file-text-o iconMr');

        // openModal('创建客户', configMap.path + configMap.addUrl, 'addCustomer', function () {
        //     customerManage.addcustomer(function (result) {
        //         if (result) {
        //             jqueryMap.$customerManageDialog.modal('hide');
        //             configMap.customerManageGrid.clear().draw();
        //             configMap.customerManageGrid.ajax.reload();
        //             //welcome.SWTXTableData();
        //         }
        //     });
        // });
    }

    var editCustomerManage = function (e) {
        stopContinueClick(e, 300);
        var el = $(e);
        var rowIndex = configMap.customerManageGrid.cell(el.parent()).index().row;
        var khdm = configMap.customerManageGrid.row(rowIndex).data().khbm;
        var gsmc = configMap.customerManageGrid.row(rowIndex).data().gsmc;
        var id = configMap.customerManageGrid.row(rowIndex).data().id;

        var hfxm = configMap.customerManageGrid.row(rowIndex).data().zyxm;
        var hfzydm = configMap.customerManageGrid.row(rowIndex).data().zydm;
        sessionStorage.setItem('customerkhdm',khdm);
        localStorage.setItem('mdw_hfxm',hfxm);
        localStorage.setItem('mdw_khmc',gsmc);
        localStorage.setItem('mdw_hfzydm',hfzydm);
        generateTab(this,configMap.path + configMap.editUrl + "?khdm=" + khdm + "&id=" + id, gsmc,"khxx_info",'fa fa-file-text-o iconMr');
        // openModal(gsmc+'信息', configMap.path + configMap.editUrl + "?khdm=" + khdm + "&id=" + id, 'addCustomer', function () {
        //     customerManageedit.updatecustomer(function (result) {
        //         if (result) {
        //             jqueryMap.$customerManageDialog.modal('hide');
        //             configMap.customerManageGrid.clear().draw();
        //             configMap.customerManageGrid.ajax.reload();
        //             //welcome.SWTXTableData();
        //         }
        //     });
        // });
    }

    //导入

    var importExcel = function () {
        stopContinueClick("#importExcel", 300);
        openModal('模板导入', configMap.path + configMap.importUrl, 'edit', function () {
            setIncel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$customerManageDialog.modal('hide');
                    configMap.customerManageGrid.clear().draw();
                    configMap.customerManageGrid.ajax.reload();
                }
            });
        });
    };

    //导出
    var exportExcel = function () {
        stopContinueClick("#exportExcel", 300);
        var text = jqueryMap.$container.find('#searchKhmc').val();
        window.location.href = "/customermanage/ptkhxx/downDataExcel?now=" + encodeURI(configMap.now) +
            "&type=" + encodeURI(configMap.type) + "&fwzt=" + encodeURI(configMap.fwzt) + "&other=" + encodeURI(configMap.other) + "&searchText=" + encodeURI(text);
    }

    //点击查询
    var btnKhxxSearch = function () {
        configMap.now = "0";
        configMap.ifSearch = '1';
        configMap.customerManageGrid.ajax.reload();
    }

    //点击重置
    var btnKhxxReset = function () {
        configMap.now = "0";
        jqueryMap.$container.find('#searchKhmc').val('');
        configMap.customerManageGrid.ajax.reload();
    }

    var selectAll = function (status) {
        $('[type="checkbox"]', jqueryMap.$customerManageDataTable).prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$customerManageDataTable).not(jqueryMap.$container.find('[name="selectCustomerManager"]'));
        var temp = null;
        khxxjson = [];
        $(inputjson).each(function () {
            temp = {dljg: $(this).attr('id').substring(3)};
            khxxjson.push(temp);
        });
    };

    var initKhflSearch = function () {
        $.ajax({
            url: 'systemmanager/customertype/customertype',
            type: 'GET',
            success: function (dataghs) {
                if (dataghs != "") {
                    for (var i = 0; i < dataghs.length; i++) {
                        $("#khflSearch", jqueryMap.$container).append("<option value='" + dataghs[i].khfl_dm + "'>" + dataghs[i].khfl_mc + "</option>");
                    }
                }
            }
        });
    };

    var initOrgAndUserGrid;
    initOrgAndUserGrid = function () {
        configMap.customerManageGrid =
            jqueryMap.$customerManageDataTable.DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false,
                //"destroy": true,
                "pageLength": 50,
                "lengthMenu": [10, 20, 50, 100],
                "autoWidth": false,
                "processing": true, // 打开数据加载时的等待效果
                "serverSide": true, // 打开后台分页
                "ajax": {
                    "url": configMap.path + configMap.CustomerUrl,
                    "dataSrc": "aaData",
                    "cache":false,
                    "data": function (data) {
                        var text = jqueryMap.$container.find('#searchKhmc').val();
                        var khflDm = jqueryMap.$container.find('#khflSearch').val();
                        var sfyear = jqueryMap.$container.find('#searchNF').val();
                        if (sfyear == null || sfyear == '' || sfyear == 'undefined') { //无值时默认当前年
                            var date = new Date;
                            var sfyear = date.getFullYear();
                        }
                        var startTime = $('[name="addStarDate"]',jqueryMap.$container).val();
                        var endTime = $('[name="addEndDate"]',jqueryMap.$container).val();
                        jqueryMap.$container.find('#dlfyname').html("(" + sfyear + "年代理服务费收费情况)");
                        data.searchText = text;
                        if (text == null || text == '' || text == 'undefined') {
                            configMap.ifSearch = '0';
                        }
                        data.now = configMap.now;
                        data.type = configMap.type;
                        data.fwzt = configMap.fwzt;
                        data.other = configMap.other;
                        data.sfnf = sfyear;
                        data.khflDm = khflDm;
                        data.startTime = startTime;
                        data.endTime = endTime;
                        data.ifSearch = configMap.ifSearch;
                        configMap.ifSearch = '0';
                    }
                },
                "language": {
                    "zeroRecords": "暂时没有数据",
                    "infoEmpty": "无记录",
                    "sEmptyTable": "暂时没有数据",
                    "sInfoThousands":",",
                    "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                },
                "columns": [
                    {
                        "data": "id",
                        "render": function (data, type, row) {
                            return '<input type="checkbox" name="checkbox_checkbox" id="kh_' + data + '" value="' + row.khbm + '"/>';
                        }
                    },
                    {
                        "data": "gsmc",
                        "render": function (data, type, row) {

                            return '<button class="customerManageraa" style="border: none;z-index: 10;background: transparent;outline: none;padding-left: 0">' +
                                '<a style="color:#666">' + data + '</a>' + '</button>';
                        }
                    },
                    {
                        "data": "zyxm",
                        "render": function (data, type, row) {
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    },

                    {
                        "data": "nsrsbh",
                        "render": function (data, type, row) {
                            var html = "";
                            var jsonArray = row.monthList;
                            for (var i = 0; i < jsonArray.length; i++) {
                                var j = jsonArray[i];
                                if (j == 'A') {
                                    html = html + "<span  class='monthcolor1 pad'>" + parseInt(i + 1) + "</span>";
                                } else if (j == 'B') {
                                    html = html + "<span  class='monthcolor2 pad'>" + parseInt(i + 1) + "</span>";
                                } else if (j == 'C' || j == '0') {
                                    html = html + "<span  class='monthcolor3 pad'>" + parseInt(i + 1) + "</span>";
                                } else if (j == 'D') {
                                    html = html + "<span  class='monthcolor4 pad'>" + parseInt(i + 1) + "</span>";
                                } else if (j == 'E') {
                                    html = html + "<span  class='monthcolor5 pad'>" + parseInt(i + 1) + "</span>";
                                }

                            }
                            /*var jsonLength = 0;
                             var month = 1;
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

                             }*/
                            return html;
                            //return html + configMap.viewchargeBtn_html;
                        }

                    },
                    {
                        "data": "khbm",
                        className:'text-center',
                        "render": function (data, type, row) {
                            var btn = "";
                            /**
                             * 1.判断是否有两个按钮的权限，来判断按钮初始的显示（合同和任务）
                             * 2.判断该客户合同是否存在，来展示收费按钮（且判断权限）
                             * 3.判断合同中存在代理服务吗，来判断其他按钮是否展示
                             */

                            if (!configMap.fwzt) {

                                btn = btn + configMap.addcontractStopBtn_html + configMap.addchargeBStoptn_html + "<button class='ta khlistBtn'  data-toggle='tooltip' data-placement='top'  disabled type='button' title='任务'><i class='icon iconfont icon-zaizhiyuangong' style='position:relative;top:2px;color: #999;font-size: 18px;'></i></button>" +
                                    configMap.accountingStopBtn_html + "<button class='tb khlistBtn' data-toggle='tooltip' data-placement='top'  disabled type='button' title='报税'><i class='icon iconfont icon-baoshui iconFontSize' style='position: relative;top: 3px;padding-right: 3px;color: #999;'></i></button>";

                            } else {

                                if ($('#khhtan').length === 1) { //合同
                                    btn = btn + configMap.addcontractBtn_html;
                                } else {
                                    btn = btn + configMap.addcontractStopBtn_html;
                                }

                                // if (row.ifhasHt === '1') { //代表存在已审核通过的合同
                                // } else {
                                // 	btn = btn + configMap.addchargeBStoptn_html;
                                // }
                                if ($('#khsfan').length === 1) { //收费
                                    btn = btn + configMap.addchargeBtn_html;
                                } else {
                                    btn = btn + configMap.addchargeBStoptn_html;
                                }

                                if ($('#khgjan').length === 1) { //任 务
                                    btn = btn + "<a class='btn btn-xs ta khlistBtn colorBlue-10a0f7'  data-toggle='tooltip' data-placement='top'  type='button' title='任务'><i class='icon iconfont icon-zaizhiyuangong' ></i></a>";
                                } else {
                                    btn = btn + "<a class='btn btn-xs ta khlistBtn'  data-toggle='tooltip' data-placement='top'  disabled type='button' title='任务'><i class='icon iconfont icon-zaizhiyuangong' style='color: #999;></i></a>";
                                }

                                if ($('#khjzan').length === 1) { //记账
                                    btn = btn + configMap.accountingBtn_html;
                                } else {
                                    btn = btn + configMap.accountingStopBtn_html;
                                }

                                if ($('#khsban').length === 1) { //报税
                                    btn = btn + "<a class='btn btn-xs tb khlistBtn colorBlue-10a0f7'  data-toggle='tooltip' data-placement='top'  type='button' title='报税'><i class='icon iconfont icon-baoshui iconFontSize'></i></a>";
                                } else {
                                    btn = btn + "<a class='btn btn-xs tb khlistBtn' data-toggle='tooltip' data-placement='top'  disabled type='button' title='报税'><i class='icon iconfont icon-baoshui iconFontSize' style='color: #999;'></i></a>";
                                }
                            }

                            /*if (row.ifhasDLFW === '1') { //合同中有代理服务费的收费项目


                             if ($('#khsban').length === 1) { //报税
                             btn = btn + "<button class='tb khlistBtn' type='button' title='报税，此功能将跳转至青岛国税-税税通'><i class='fa fa-file-o' style='position: relative;top: 0px;padding-right: 3px;font-weight: 400;font-size: 18px;'></i></button>";
                             } else {
                             btn = btn + "<button class='tb khlistBtn' disabled type='button' title='报税'><i class='fa fa-file-o' style='position: relative;top: 0px;padding-right: 3px;color: #999;font-size: 18px;'></i></button>";
                             }
                             } else {*/
                            //btn = btn + configMap.accountingBtn_html + "<button class='tb khlistBtn' type='button' title='报税'><i class='fa fa-file-o' style='position: relative;top: 0px;padding-right: 3px;color: #999;font-size: 18px;'></i></button>";
                            //}
                            //btn = btn + configMap.accountingBtn_html + "<button class='tb khlistBtn colorBlue-10a0f7' type='button' title='报税'><i class='fa fa-file-o' style='position: relative;top: 0px;padding-right: 3px;font-size: 18px;'></i></button>";

                            return btn;

//                            if (btn === "") {
//                                return configMap.addcontractStopBtn_html + configMap.addchargeBStoptn_html
//                                + "<button class='ta khlistBtn' disabled type='button' title='任务'><i class='icon iconfont icon-zaizhiyuangong' style='position:relative;top:2px;'></i></button>"
//                                + configMap.accountingStopBtn_html
//                                + "<button class='tb khlistBtn' disabled type='button' title='报税'><i class='fa fa-file-o' style='position: relative;top: 0px;padding-right: 3px;'></i></button>";
//                            } else {
//                                return btn;
//                            }
//		              return configMap.accountingBtn_html
//						+ configMap.addcontractBtn_html
//		                + configMap.addchargeBtn_html
//		                +"<button class='ta btn btn-xs btnBlue btnBorderColor colorfff borderRadius4' type='button' ><i class='icon iconfont icon-zaizhiyuangong' style='padding-right:3px;position:relative;top:2px;'></i>跟进</button>"+"<button class='tb btn btn-xs btnBlue btnBorderColor colorfff borderRadius4' type='button' ><i class='icon iconfont icon-shenhe' style='position:relative;top:2px;'></i>申报</button>";
                        }
                    },
                    {
                    	"data": "zydm",
                    	"visible": false,
                    },
                    {
                        "data": "sjhm",
                        "visible": false,
                    }

                ],
                "drawCallback": function () { // 数据加载完成后执行
                    var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$customerManageDataTable);
                    var accountingContainer = $('[data-type="accounting"]', jqueryMap.$customerManageDataTable);
                    var addcontractContainer = $('[data-type="addcontract"]', jqueryMap.$customerManageDataTable);
                    var addchargeContainer = $('[data-type="addcharge"]', jqueryMap.$customerManageDataTable);
                    var viewchargeContainer = $('[data-type="viewcharge"]', jqueryMap.$customerManageDataTable);
                    $('.customerManageraa').off().on('click', function () {
                        editCustomerManage(this);
                    });
                    $(".ta", jqueryMap.$container).off().on('click', function () { //任务
                        table(this);
                    });
                    //报税
                    $(".tb", jqueryMap.$container).off().on('click', function () {
                        //tanle(this);
                        tabletax(this);
                    })

                    if (accountingContainer.length > 0) {
                        var tb = $("#jztb").text();//0 不同步 1同步
                        if('1'==tb){
                            //记账
                            accountingContainer.off('click').on('click', accounting);
                        }else{
                            accountingContainer.off('click').on('click', tableaccount);
                        }

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
                    /**
                     * 将展示没有客户居中
                     */
                    $('.dataTables_empty').attr("style", "text-align:center");
                }
            });

        $('tbody', jqueryMap.$customerManageDataTable).on('click', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.customerManageGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.customerManageGrid.row('.success');
            }
        });
    };

    return {
        // 初始化
        init: function (firstpage,id,name, uuid) {
            setJqueryMap(uuid);
            configMap.yxkhId = id;
            configMap.yxkhName = name;
            configMap.uuid = uuid;
            //判断页面是从商机管理意向客户过来的
            if(configMap.yxkhId!="null"){
                addContractYxkh()
            }
            $('#delCustomerBtn', jqueryMap.$container).hide();
            var tabid = $('#customerManage-manager-content').parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
            //年份
            var date=new Date;
            var year=date.getFullYear(); 
            $('#searchNF').val(year)
                .datepicker({
                    // clearBtn: true,
                    format: 'yyyy',
                    autoclose: true,
                    startView: 2,
                    minViewMode: 2,
                    maxViewMode: 2,
                    language: 'zh-CN',
                });//默认值

            configMap.type = 1;

            configMap.ifSearch = '0';
//            if ($('#dispatchedStaff').length === 1) { //派工按钮存在（可以看到全部数据）
//                configMap.type = 1;
//            } else {
//                configMap.type = 3; //没有则只能看到本人数据
//            }
            $('#restartCustomer').hide();
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

            $('#addCustomerManage', jqueryMap.$container).off().on('click', function () {
                addCustomerManage();
            });
            $('#dispatchedStaff', jqueryMap.$container).off().on('click', function () {
                dispatchedStaff();
            })
            //停止服务
            $('#stopCustomerBtn', jqueryMap.$container).off().on('click', function () {
                stopCustomer(0);
            });

            //恢复服务
            $('#restartCustomer', jqueryMap.$container).off().on('click', function () {
                stopCustomer(1);
            });

            //删除客户
            $('#delCustomerBtn', jqueryMap.$container).off().on('click', function () {
                delCustomerBtn();
            });

            //导入
            $('#importExcel', jqueryMap.$container).off().on('click', function () {
                importExcel();
            });

            //导出
            $('#exportExcel', jqueryMap.$container).off().on('click', function () {
                exportExcel();
            });

            //搜索
            $('#btnKhxxSearch', jqueryMap.$container).off().on('click', function () {
                btnKhxxSearch();
            });

            //重置
            // $('#btnKhxxReset', jqueryMap.$container).off().on('click', function () {
            //     btnKhxxReset();
            // });

            jqueryMap.$container.find('.addStarDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            jqueryMap.$container.find('.addEndDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });

            //输入框绑定回车事件
			 $('[name="searchKhmc"]',jqueryMap.$container).keydown(function(event) {//给输入框绑定按键事件
		        if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
		        	$("#btnKhxxSearch",jqueryMap.$container).click();
		        }
		    });
			 
            //回车事件
//            document.onkeydown = function (e) {
//                var ev = document.all ? window.event : e;
//                if (ev.keyCode == 13) {
//                    btnKhxxSearch();
//                }
//            };


            if (firstpage === '1') {
                addCustomerManage();
            }

            //点击选择所有
            jqueryMap.$container.find('[name="selectCustomerManager"]').change(function () {
                var el = $(this);
                selectAll(el.is(':checked'));
            });

            initOrganization();
            jqueryMap.$container.find('#khflSearch').val('0');
            initOrgAndUserGrid();
            initKhflSearch();
            //initOrgAndUserData();
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },
        reload:function () {
            configMap.customerManageGrid.ajax.reload();
        },
        bsBtn:function (data) {
            tax_M(data);
        }
    };
}();
//@ sourceURL=org/org.js

