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
var contractcontinue = function () {
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
        SFXMUrl:'/contract/sfxm',
        id: '',
        contractGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑合同"><i class="icon iconfont icon-bianji"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除合同"><i class="icon iconfont icon-shanchu"></i></a>',
        continueBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="continue" data-toggle="tooltip" title="续签合同"><i class="icon iconfont icon-bianji"></i></a>',
        imgUrl: '/contract/addfile.jsp',
        htbm: '',
        khbm: '',
        type: ''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractForm: null,
        $setimg: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#contractForm');
    };

    //保存
    var saveContract = function (callback) {
        var uuid = "";
        if (sessionStorage.getItem("uuid") !== null && sessionStorage.getItem("uuid") !== undefined) {
            uuid = sessionStorage.getItem("uuid");
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
        var url = configMap.path + configMap.dataUrl + "/" + configMap.khbm;
        var htbm = $('[name="htbm"]', jqueryMap.$contractForm).val();
        var xqzt = $('[name="xqzt"]', jqueryMap.$contractForm).val();
        url = url + "/" + htbm + "/" + xqzt;
        var requestType = 'PUT';
        $.ajax({
            url: url,
            type: requestType,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.success) {
                    App.unblockUI(blockTarget);
                    callback(true);
                    updateMessageNumber();
                    //更新首页待审合同数量
                    upDateDSHNumber();
                } else {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: blockTarget,
                        place: 'prepend',
                        type: 'danger',
                        message: result.message,
                        icon: 'fa fa-warning'
                    });
                    callback(false);
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
                callback(false);
            }
        });
    };

    /**
     * 校验日期，如果日期相同，判断以录入的合同中是否存在代理服务费
     * @returns {*}
     */
    var checkDate = function () {
        var blockTarget = jqueryMap.$contractForm.closest(".modal-body");
        var htbm = "";
        if(configMap.type === 'edit'){
            htbm = $('[name="htbm"]', jqueryMap.$contractForm).val();
        }
        var data = {
            fwqxq: $('input[name="createDate"]', jqueryMap.$contractForm).val(),
            fwqxz: $('input[name="startDate"]', jqueryMap.$contractForm).val(),
            htbm: htbm,
            sfxm_dm: $('[name="sfxmdm"]', jqueryMap.$contractForm).val()
        };
        var result;
        $.ajax({
            url: configMap.path + configMap.checkDateUrl + "/" + configMap.khbm,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            async: false,//ajax异步
            data: JSON.stringify(data),
            success: function (datas) {
                if (datas.success) {
                    result = true;
                } else {
                    //当前合同填写了代理服务费
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
     * 续签合同或者修改合同
     * @constructor
     */
    var ContinueContract = function () {
        var blockTarget = jqueryMap.$contractForm.closest(".modal-body");
        $.ajax({
            url: configMap.path + configMap.updateUrl + '/' + configMap.id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
            	if(configMap.type === "edit"){
            		$('[name="qyrq"]',jqueryMap.$contractForm).val(moment(data.contract.qyrq).format('YYYY-MM-DD'));
            		$('[name="createDate"]',jqueryMap.$contractForm).val(moment(data.contract.fwqxq).format('YYYY-MM'));
            		$('[name="startDate"]',jqueryMap.$contractForm).val(moment(data.contract.fwqxz).format('YYYY-MM'));
            		$('[name="xqzt"]',jqueryMap.$contractForm).val("0");
            	} else {
            		$('[name="qyrq"]',jqueryMap.$contractForm).val(moment(new Date()).format('YYYY-MM-DD'));
            		var month = 12 * ((new Date(data.contract.fwqxz).getFullYear()) - (new Date(data.contract.fwqxq).getFullYear())) + (new Date(data.contract.fwqxz).getMonth()) - (new Date(data.contract.fwqxq).getMonth()) + 1;
                    var start = new Date(data.contract.fwqxz).setMonth(new Date(data.contract.fwqxz).getMonth() + 1, 1);
                    var end = new Date(data.contract.fwqxz).setMonth(new Date(data.contract.fwqxz).getMonth() + month, 1);
            		$('[name="createDate"]',jqueryMap.$contractForm).val(moment(start).format('YYYY-MM'));
            		$('[name="startDate"]',jqueryMap.$contractForm).val(moment(end).format('YYYY-MM'));
            		$('[name="xqzt"]',jqueryMap.$contractForm).val("1");
            	}
                $('[name="tbsx"]',jqueryMap.$contractForm).val(data.contract.tbsx);
                $('[name="htbm"]',jqueryMap.$contractForm).val(data.contract.htbm);
                $('[name="fkfs"]',jqueryMap.$contractForm).val(data.contract.fkfs_dm);
                $("#typeBtn",jqueryMap.$contractForm).html(data.contract.fkfs_mc + '<span class="caret"></span>');
                $('input[name="sfxmdm"]',jqueryMap.$contractForm).val(data.contract.sfxm_dm);
        		$("#selectBtn",jqueryMap.$contractForm).html(data.contract.sfxm_mc + '<span class="caret"></span>');
                $('[name="fkfst"]', jqueryMap.$contractForm).val(data.contract.fkxh_dm);
                $("#fkfsBtn",jqueryMap.$contractForm).html(data.contract.fkxh_mc + '<span class="caret"></span>');
                $('#SFXM_001',jqueryMap.$contractForm).val(data.contract.zfy);
                $('[name="zje"]', jqueryMap.$contractForm).val(data.contract.hjje);
                if($('input[name="sfxmdm"]', jqueryMap.$contractForm).val() !== "001"){
                	$('#sfjelabel',jqueryMap.$contractForm).html('<span class="colorRed"> * </span>收费金额');
                }
                $('[name="addfile"]').html("添加附件（"+data.size+"）");
                configMap.khbm = data.contract.khbm;
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
                		if(datas[i].serviceName.indexOf("垫付") === -1){
                			datahtml += '<li role="presentation" class="select" onclick="contractcontinue.showproject(this);">';
                			datahtml += '<a role="menuitem" tabindex="-1" href="#" class="SFXM_'+datas[i].serviceCode+'_'+datas[i].businessType+'">'+datas[i].serviceName+'</a>';
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
        if($('#selectBtn', jqueryMap.$contractForm).attr("data") === "002"){                                      //如果选择的是一次性收费
            $('[name="sfxm"]',jqueryMap.$contractForm).val(value);
        } else {
            monthSize = 12*(endTime.getFullYear() - startTime.getFullYear()) + endTime.getMonth()
                - startTime.getMonth() + 1;                                                                             //计算出服务月份
            $('[name="sfxm"]',jqueryMap.$contractForm).val((value/monthSize).toFixed(2));
        }
    };
    
    return {
        // 初始化
        init: function (id,type) {
            $('[data-toggle="tooltip"]', jqueryMap.$contractForm).tooltip();
            //合同编码
            configMap.id = id;
            //当前类型，edit为修改合同信息，空字符串为续签合同
            configMap.type = type;
            setJqueryMap();
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
            if(configMap.type !== "edit"){
                $('.addfilediv', jqueryMap.$contractForm).css("display","none");
            }
            var nowDate = new Date;
            var nextDate = null;
            $('.createDate',jqueryMap.$contractForm).datepicker({
                format: 'yyyy-mm',
                autoclose: true,
                startView: 1,
                minViewMode: 1,
                maxViewMode: 1,
                forceParse: false,
                language: 'zh-CN'
            }).on('changeDate',function (ev){
            	if($("#typeBtn",jqueryMap.$contractForm).html().indexOf("按年")>=0){
            		nextDate = new Date(ev.date.setMonth(ev.date.getMonth() + 11, 1));
            		$('[name="startDate"]',jqueryMap.$contractForm).val(moment(nextDate).format('YYYY-MM'));
            	}
            	else if ($("#typeBtn",jqueryMap.$contractForm).html().indexOf("其他")>=0) {
            		$('[name="startDate"]',jqueryMap.$contractForm).val(moment(ev.date).format('YYYY-MM'));
            	}
            });
            $('.startDate',jqueryMap.$contractForm).datepicker({
                format: 'yyyy-mm',
                autoclose: true,
                startView: 1,
                minViewMode: 1,
                maxViewMode: 1,
                forceParse: false,
                language: 'zh-CN'
            }).on('changeDate',function (ev){
            	if($("#typeBtn",jqueryMap.$contractForm).html().indexOf("按年")>=0){
            		nextDate = new Date(ev.date.setMonth(ev.date.getMonth() - 11, 1));
            		$('[name="createDate"]',jqueryMap.$contractForm).val(moment(nextDate).format('YYYY-MM'));
            	}
            	else if ($("#typeBtn",jqueryMap.$contractForm).html().indexOf("其他")>=0) {
            		$('[name="createDate"]',jqueryMap.$contractForm).val(moment(ev.date).format('YYYY-MM'));
            	}
            });
            $('.qyrq',jqueryMap.$contractForm).datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
                initialDate: new Date(),
                todayBtn: 'linked',
                endDate: new Date(),
                todayHighlight: true
            });
            $('[name="qyrq"]',jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM-DD'));
            //获取选中合同的信息放入页面中
            getSFXM();
            ContinueContract();
            $('[name="addfile"]',jqueryMap.$contractForm).off('click').on('click',function(){
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
                                    $('[name="addfile"]').html("添加附件(" + sessionStorage.getItem("filesize") + ")");
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
                var htbm = $('[name="htbm"]',jqueryMap.$contractForm).val();
                var fileurl;
                fileurl = configMap.path + configMap.imgUrl + "?id=" + configMap.id + "&htbm=" + htbm + "&status=insert";
                $.get(fileurl, function (html) {
                    jqueryMap.$setimg = bootbox.dialog({
                        title: '添加附件',
                        message: html,
                        buttons: dialogButtons
                    });
                });
            });

            //textarea输入字数限制
            var obj = $("#contractForm textarea");
            var num = 300;
            var numObj = $("#contractForm .wordNum span")
            checkHowMany(obj,numObj,num);
        },
        //保存
        saveContract: function (callback) {
            if (checkValue()) {					//校验输入信息
                if($('#selectBtn', jqueryMap.$contractForm).attr("data") === "001"){                              //判断当前选择的是否为常规收费
                    if (checkDate()) {			                                                                        //判断当前客户在该服务期限内是否存在该服务合同
                        saveContract(callback);
                    }
                } else {                                                                                                //一次性收费直接保存
                    saveContract(callback);
                }
            } else {
                callback(false);
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },

        /**
         * 收費項目下拉菜單選擇以及收費金額輸入
         */
        showproject: function (e) {
        	var nowDate = new Date();
        	var nextDate;
            //修改下拉菜单的按钮内容
            $("#selectBtn", jqueryMap.$contractForm).html($(e).find("a").html() + '<span class="caret"></span>');
            $("#selectBtn", jqueryMap.$contractForm).attr("data",$(e).find("a").attr("class").split("_")[2]);
            $('input[name="sfxmdm"]', jqueryMap.$contractForm).val($(e).find("a").attr("class").split("_")[1]);
            if($(e).find("a").attr("class").split("_")[2] !== "001"){
            	$('#sfjelabel', jqueryMap.$contractForm).html('<span class="colorRed"> * </span>收费金额');
            	$('#typeBtn', jqueryMap.$contractForm).html('其他<span class="caret"></span>');
            	$('input[name="fkfs"]', jqueryMap.$contractForm).val('005');
            	$('[name="createDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
            	$('[name="startDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
            } else {
            	$('#sfjelabel', jqueryMap.$contractForm).html('<span class="colorRed"> * </span>收费金额/月');
            	$('#typeBtn', jqueryMap.$contractForm).html('按年<span class="caret"></span>');
            	$('input[name="fkfs"]', jqueryMap.$contractForm).val('001');
            	$('[name="createDate"]', jqueryMap.$contractForm).val(moment(nowDate).format('YYYY-MM'));
                nextDate = new Date(nowDate.setMonth(nowDate.getMonth() + 11, 1));
                $('[name="startDate"]', jqueryMap.$contractForm).val(moment(nextDate).format('YYYY-MM'));
            }
            sumMoney(Number($('[name="zje"]', jqueryMap.$contractForm).val()));
        },

        /**
         * 付款方式下拉菜单选择
         */
        showpayment: function (e) {
        	var nowDate = new Date();
        	var nextDate;
        	//判断收费项目是否是代理服务费
            if($('#selectBtn', jqueryMap.$contractForm).attr("data") === "001"){
        		//判断之前选择的月份是否规范
                $("#typeBtn", jqueryMap.$contractForm).html($(e).find("a").html() + '<span class="caret"></span>');
                $('input[name="fkfs"]', jqueryMap.$contractForm).val($(e).find("a").attr("name"));
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
        },

        /**
         * 修改付款方式先付后付
         */
        changefkfst:function (e){
        	$("#fkfsBtn", jqueryMap.$contractForm).html($(e).find("a").html() + '<span class="caret"></span>');
        	$('input[name="fkfst"]', jqueryMap.$contractForm).val($(e).find("a").attr("name"));
        },
        
        /**
         * 输入服务费用之后校验金额
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