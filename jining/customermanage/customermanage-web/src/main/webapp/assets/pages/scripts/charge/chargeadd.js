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
var chargeAdd = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/charge/charge',
        updateUrl: '/charge/contractupdate',
        projectUrl: '/charge/project',
        paymentUrl: '/charge/payment',
        CFTXUrl: '/customermanage/ptcftx/getCftx',
        id: '',
        name: '',
        contractGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑合同"><i class="icon iconfont icon-bianji"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除合同"><i class="icon iconfont icon-shanchu"></i></a>',
        startDate: null,	//收费开始时间
        endDate: null,		//收费结束时间
        startYear: null,	//收费开始年
        endYear: null,	//结束年
        now: null,	//现在时间
        ysf: null,	//获取应收款
        sjsf: null,//实际收费
        fy: null,		//费用
        qtsf: null,		//其他收费
        contractDate: null,
        monthsize:0
    };
    var jsonMap = [];
    var chargeDate = [];
    var money = [];
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $chargeForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$chargeForm = $('#chargeForm');
    };

    //选择收费年份获取当前年的合同
    var getCharge = function () {
        //选择年份的时候清空数据
        cleanData();
        var blockTarget = jqueryMap.$chargeForm.closest(".modal-content");
        var sfxm = '';			//收费项目
        var sfje;				//收费金额
        var title;				//收费项目
        var splitflag;			//剪切标志
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在获取数据...'
        });
        var data = {
            nowyear: $('[name="sfnf"]').val(),		//当前所选收费年份
            id: configMap.id							//客户编码
        };
        //将String转成date
        var year = data.nowyear + "-01-01";
        configMap.now = new Date(Date.parse(year));
        //获取所选年中的所有合同
        $.ajax({
            url: configMap.path + configMap.dataUrl,
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (datas) {
                configMap.contractDate = datas;
                App.unblockUI(blockTarget);
                //显示右边的每月收费（合同列表）
                //获取收费金额
                sfxm += '<option value="">请选择合同</option>'
                //生成合同列表
                for (var y = 0; y < datas.list.length; y++) {
                    sfje = 0;
                    title = '';
                    splitflag = '';
                    for (var i = 0; i < datas.list[y].pay.length; i++) {
                        sfje = FloatAdd(datas.list[y].pay[i].sfje, sfje);
                        title += splitflag + datas.list[y].pay[i].sfxm_mc;
                        splitflag = "/";
                        if (i === (datas.list[y].pay.length - 1)) {
                            sfxm += '<option value="' + datas.list[y].contract.htbm + '"';
                            if(y==datas.list.length-1){
                            	sfxm += 'selected="selected"';
                            }
                            sfxm += '">' + datas.list[y].contract.htbm + "——" + sfje.toFixed(2) + '元/月(包含:' + title + ')(服务期限：' + moment(datas.list[y].contract.fwqxq).format("YYYY.MM") + '-' + moment(datas.list[y].contract.fwqxz).format("YYYY.MM") + ')</option>';
                        }
                    }
                }
                $('[name="mysf"]').html(sfxm);
                getHtxx();
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$chargeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '获取合同失败！',
                    icon: 'fa fa-warning'
                });
            }
        });
    };
    //下拉菜单选择合同后，将该合同信息放入json中
    var getHtxx = function () {
        var start;				//开始时间
        var end;				//结束时间
        var temp;				//json
        var month;				//开始时间与结束时间之间相差月份
        var tempmonth;
        var tempYear;
        var chargesh;
        var status;
        //重选合同和重选年的时候，清空原本的数据
        cleanData();
        //获取当前合同的收费信息
        var htbm = $('[name="mysf"]').val();
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/' + htbm,
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    for (var y = 0; y < result[i].sfyf.split(",").length; y++) {
                        chargeDate.push({
                            sfnf: result[i].sfnf,
                            sfyf: result[i].sfyf.split(",")[y],
                            shzt: result[i].shzt_dm
                        });
                    }
                }
                //循环之前获取到放在全局中的合同列表
                for(var y=0;y<configMap.contractDate.list.length;y++){
                	//如果当前选中的合同编码和其中的合同编码相同
                	if (configMap.contractDate.list[y].contract.htbm == htbm) {
                		//服务开始时间日期类型
                		start = new Date(parseInt(configMap.contractDate.list[y].contract.fwqxq));
                		//服务结束时间日期类型
                		end = new Date(parseInt(configMap.contractDate.list[y].contract.fwqxz));
                		//开始时间和结束时间中相差的月份
                		month = 12 * (end.getFullYear() - start.getFullYear()) + end.getMonth() - start.getMonth() + 1;
                		//能够选择的月份
                		var cancheckmonth = month;
                		//判断当前合同的审核状态
                		if (configMap.contractDate.list[y].contract.shzt_dm != "001") {
                			//合同审核状态不为已通过
                			for(var i = 0;i<month;i++){
                				tempYear = new Date(parseInt(configMap.contractDate.list[y].contract.fwqxq)).setMonth(start.getMonth() + i);
                				//获取遍历出来的月数属于那一年的哪一月
                    			tempmonth = new Date(tempYear).getMonth() + 1;
                    			//获取遍历出来的月数属于哪一年
                    			tempYear = new Date(tempYear).getFullYear();
                    			chargesh = "";
                    			status = "unable";
	                			temp = {
	                                  year: tempYear,
	                                  month: tempmonth,
	                                  money: configMap.contractDate.list[y].contract.zfy,
	                                  htbm: configMap.contractDate.list[y].contract.htbm,
	                                  chargesh: chargesh,
	                                  htsh: configMap.contractDate.list[y].contract.shzt_dm,
	                                  status: status
	                              };
	                              money.push(temp);
                			}
                		} else {
                			//合同已审核通过
                			//如果当前合同为按年收费,将月份都选中，金额自动输入
                    		if(configMap.contractDate.list[y].contract.fkfs_dm == "001"){
                    			configMap.monthsize = month;
                    			//循环月份
                    			for(var i = 0;i<month;i++){
                    				tempYear = new Date(parseInt(configMap.contractDate.list[y].contract.fwqxq)).setMonth(start.getMonth() + i);
                    				tempmonth = new Date(tempYear).getMonth() + 1;
                    				tempYear = new Date(tempYear).getFullYear();
                    				chargesh = "";
                    				status = "check";
                    				if (configMap.ysf == null || configMap.ysf == "") {
                    					configMap.ysf = 0;
                    				}
                    				//判断当前年费当前月份是否已经收费，如果已经收费，变成不能选中
                    				for (var z = 0; z < chargeDate.length; z++) {
                    					if (chargeDate[z].sfnf == tempYear && chargeDate[z].sfyf == tempmonth) {
                    						chargesh = chargeDate[z].shzt;
                    						status = "unable";
                    						cancheckmonth -= 1;
                    						configMap.monthsize -=1;
                    					}
                    				}
                    				temp = {
      	                                  year: tempYear,
      	                                  month: tempmonth,
      	                                  money: configMap.contractDate.list[y].contract.zfy,
      	                                  htbm: configMap.contractDate.list[y].contract.htbm,
      	                                  chargesh: chargesh,
      	                                  htsh: configMap.contractDate.list[y].contract.shzt_dm,
      	                                  status: status
      	                              };
      	                              money.push(temp);
                    			}
                    			//费用不变
                				configMap.fy = configMap.contractDate.list[y].contract.zfy;
                				configMap.ysf = (cancheckmonth*configMap.fy).toFixed(2);
                            	configMap.sjsf = (cancheckmonth*configMap.fy).toFixed(2);
                				$('[name="ysk"]').val(configMap.ysf);
                            	$('[name="sjsk"]').val(configMap.sjsf);
                    		} else {
                    			//当前合同不为按年收费
                    			for(var i = 0;i<month;i++){
                    				tempYear = new Date(parseInt(configMap.contractDate.list[y].contract.fwqxq)).setMonth(start.getMonth() + i);
                    				tempmonth = new Date(tempYear).getMonth() + 1;
                    				tempYear = new Date(tempYear).getFullYear();
                    				chargesh = "";
                    				status = "able";
                    				//判断当前年费当前月份是否已经收费
                    				for (var z = 0; z < chargeDate.length; z++) {
                    					if (chargeDate[z].sfnf == tempYear && chargeDate[z].sfyf == tempmonth) {
                    						chargesh = chargeDate[z].shzt;
                    						status = "unable";
                    					}
                    				}
                    				temp = {
      	                                  year: tempYear,
      	                                  month: tempmonth,
      	                                  money: configMap.contractDate.list[y].contract.zfy,
      	                                  htbm: configMap.contractDate.list[y].contract.htbm,
      	                                  chargesh: chargesh,
      	                                  htsh: configMap.contractDate.list[y].contract.shzt_dm,
      	                                  status: status
      	                              };
      	                              money.push(temp);
                    			}
                    		}
                		}
                	}
                }
                showCharge();
            }
        });
    };
    //在月份中展示
    var showCharge = function () {
        var sfnf = $("#sfnf").html().replace("年", "");		//收费年份
        var checksize = 0;
        //先清除原本的样式
        $('li[name="month"]', $("#menu")).removeClass("check");
        $('li[name="month"]', $("#menu")).removeClass("able");
        $('li[name="month"]', $("#menu")).addClass("unable");
        for (var i = 0; i < money.length; i++) {
            if (money[i].year == sfnf) {
                $("#month_" + money[i].month).removeClass("unable");
                $("#month_" + money[i].month).addClass(money[i].status);
            }
        }
        
        //月份的选择
        jqueryMap.$chargeForm.find('li[name="month"]').off('click').on('click', function () {
            if ($(this).attr("class") === "able") {
                $(this).removeClass("able");
                $(this).addClass("check");
                if (configMap.ysf == null || configMap.ysf == "") {
                    configMap.ysf = 0;
                }
                configMap.fy = money[0].money;
                configMap.ysf = FloatAdd(configMap.ysf, configMap.fy).toFixed(2);
                configMap.sjsf = FloatAdd(configMap.sjsf, configMap.fy).toFixed(2);
                configMap.monthsize+=1;
                $('[name="yhje"]').val("0.00");
                $('[name="qtsf"]').val("0.00");
                updatemoneytemp(sfnf, ($(this).attr("id")).split("_")[1], "check");
            } else if ($(this).attr("class") === "check") {
                $(this).removeClass("check");
                $(this).addClass("able");
                if (configMap.ysf == null || configMap.ysf == "") {
                    configMap.ysf = 0;
                }
                configMap.fy = money[0].money;
                configMap.ysf = FloatSub(configMap.ysf, configMap.fy).toFixed(2);
                configMap.sjsf = FloatSub(configMap.sjsf, configMap.fy).toFixed(2);
                if(configMap.sjsf<0){
                	configMap.sjsf=0;
                }
                $('[name="yhje"]').val("0.00");
                $('[name="qtsf"]').val("0.00");
                configMap.qtsf = "0.00";
                configMap.monthsize-=1;
                updatemoneytemp(sfnf, ($(this).attr("id")).split("_")[1], "able");
            } else if ($(this).attr("class") === "unable") {
                App.alert({
                    container: jqueryMap.$chargeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'info',
                    message: '当前月未录入合同！',
                    icon: 'fa fa-info'
                });
                //不能点的月份提示
                for (var i = 0; i < money.length; i++) {
                    if (money[i].year == sfnf && money[i].month == ($(this).attr("id")).split("_")[1]) {
                        if (money[i].htsh == "000") {	//合同是否审核通过
                            App.alert({
                                container: jqueryMap.$chargeForm.closest(".modal-body"),
                                place: 'prepend',
                                type: 'info',
                                message: '当前合同未审核！',
                                icon: 'fa fa-info'
                            });
                        } else if (money[i].htsh == "002") {
                            App.alert({
                                container: jqueryMap.$chargeForm.closest(".modal-body"),
                                place: 'prepend',
                                type: 'info',
                                message: '当前合同审核未通过！',
                                icon: 'fa fa-info'
                            });
                        } else if (money[i].chargesh == "000") {
                            App.alert({
                                container: jqueryMap.$chargeForm.closest(".modal-body"),
                                place: 'prepend',
                                type: 'info',
                                message: '当前月收费正在审核！',
                                icon: 'fa fa-info'
                            });
                        } else if (money[i].chargesh == "001") {
                            App.alert({
                                container: jqueryMap.$chargeForm.closest(".modal-body"),
                                place: 'prepend',
                                type: 'info',
                                message: '当前月已收费！',
                                icon: 'fa fa-info'
                            });
                        }
                    }
                }
            }
            $('[name="ysk"]').val(configMap.ysf);
            $('[name="sjsk"]').val(configMap.sjsf);
        });
    };

    //修改合同的选中状态
    var updatemoneytemp = function (sfnf, sfyf, status) {
        for (var i = 0; i < money.length; i++) {
            if (money[i].year == sfnf && money[i].month == sfyf) {
                money[i].status = status;
            }
        }
    };

    //清空数据
    var cleanData = function () {
        money = [];
        chargeDate = [];
        configMap.ysf = 0;
        configMap.fy = 0;
        configMap.sjsf = 0;
        configMap.qtsf = 0;
        $('[name="ysk"]').val("0.00");
        $('[name="sjsk"]').val("0.00");
        $('[name="qtsf"]').val("0.00");
        $('[name="yhje"]').val("0.00");
    }
    //加法运算
    var FloatAdd = function (arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    };
    //减法运算
    var FloatSub = function (arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m - arg2 * m) / m;
    }
    var saveCharge = function (callback) {
        var blockTarget = jqueryMap.$chargeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        jsonMap = [];
        var temp;
        if ($('[name="mysf"]').val() == "") {
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$chargeForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请选择合同！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($('textarea[name="sfsm"]').val() != "" && $('textarea[name="sfsm"]').val() != null && $('textarea[name="sfsm"]').val().length > 500) {
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$chargeForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '收费说明不能超过500字！',
                icon: 'fa fa-warning'
            });
            return false;
        }

        for (var i = 0; i < money.length; i++) {
            if (money[i].status == "check") {
                temp = {year: money[i].year, month: money[i].month}
                jsonMap.push(temp);
            }
        }
        var tsxx = 0;
        if ($("#chargeTsxx").is(':checked')) {
            tsxx = 1;
        }
        var data = {
            tsxx: tsxx,
            sfsj: $('input[name="sfsj"]').val(),
            ysk: $('input[name="ysk"]').val(),
            qtsf: $('input[name="qtsf"]').val(),
            sjsf: $('input[name="sjsk"]').val(),
            sfsm: $('textarea[name="sfsm"]').val(),
            sfnf: $('[name="sfnf"]').val(),
            htbm: money[0].htbm,
            sfxx: jsonMap,
            khmc: configMap.name
        };
        var url = configMap.path + configMap.dataUrl;
        var requestType = 'PUT';
        if (configMap.id) {
            url = url + "/" + configMap.id;
        }
        if (configMap.monthsize > 0) {
            $.ajax({
                url: url,
                type: requestType,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (result) {
                    if (result.success) {
                        App.unblockUI(blockTarget);
                        updateMessageNumber();
                        welcome.GetFourModelData();
                        // $.ajax({ //更新首页催费信息
                        //     url: configMap.CFTXUrl + '/003',
                        //     dataType: 'JSON',
                        //     type: 'GET',
                        //     success: function (result) {
                        //         $('#qfkhsl').text(result.khsl); //客户数量
                        //         $('#qfkhje').text(result.je); //客户金额
                        //     },
                        //     error: function () {
                        //         $('#qfkhsl').text(0); //客户数量
                        //         $('#qfkhje').text(0.00); //客户金额
                        //     }
                        // });
                        // $.ajax({ //更新首页欠费信息
                        //     url: configMap.CFTXUrl + '/001',
                        //     dataType: 'JSON',
                        //     type: 'GET',
                        //     success: function (result) {
                        //         $('#cfkhsl').text(result.khsl); //客户数量
                        //         $('#cfkhje').text(result.je); //客户金额
                        //     },
                        //     error: function () {
                        //         $('#cfkhsl').text(0); //客户数量
                        //         $('#cfkhje').text(0.00); //客户金额
                        //     }
                        // });
                        callback(true);
                    } else {
                        App.unblockUI(blockTarget);
                        Messenger().post({
                            message: result.message,
                            type: 'error'
                        });
                        callback(false);
                    }
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$chargeForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            });
        } else {
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$chargeForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请选择收费月份！',
                icon: 'fa fa-warning'
            });
            callback(false);
        }
    };
    return {
        // 初始化
        init: function (id, name) {
            configMap.id = id;
            configMap.name = name;
            setJqueryMap();
            $('.sfnf').datepicker({
                format: 'yyyy',
                autoclose: true,
                startView: 2,
                minViewMode: 2,
                maxViewMode: 2,
                forceParse: false,
                language: 'zh-CN'
            }).on('changeDate', function (ev) {
                //先移除所有li样式
                $('li[name="month"]', $("#menu")).removeClass("check");
                $('li[name="month"]', $("#menu")).removeClass("able");
                $('li[name="month"]', $("#menu")).addClass("unable");
//				//清空form表单
//				$('[name="ysk"]').val("0.00");
//				$('[name="sjsk"]').val("0.00");
//				$('[name="qtsf"]').val("0.00");
//				configMap.ysf = null;
//				configMap.sjsf = null;
//				configMap.qtsf = null;
                $('#sfnf').html(ev.date.getFullYear() + "年");
                getCharge();
            });
            $('.sfsj').datepicker({
                format: 'yyyy-mm-dd',
                todayBtn: true,
                autoclose: true,
                forceParse: false,
                language: 'zh-CN'
            });
            //获取已有的合同列表
            if (configMap.id) {
                getCharge();
            }
            $("#jian").off('click').on('click', function () {
                var nf = $('#sfnf').html().replace("年", "");
                $('#sfnf').html(parseInt(nf) - 1 + "年");
                showCharge();
            });
            $("#jia").off('click').on('click', function () {
                var nf = $('#sfnf').html().replace("年", "");
                $('#sfnf').html(parseInt(nf) + 1 + "年");
                showCharge();
            });
            $('[name="mysf"]').on('change', function () {
                getHtxx();
            });
//            jqueryMap.$chargeForm.find('[name="qtsf"]')
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        //保存收费
        saveCharge: function (callback) {
            if (jqueryMap.$chargeForm.valid()) {
                saveCharge(callback);
            }
            else {
                callback(false);
            }
        },
        //修改实际收费金额
        addysk: function (e) {
        	var je = $(e).val();
        	if (whetherOrNotMoney(je)) {
        		configMap.qtsf = je;
        	} else {
        		configMap.qtsf = "0.00";
        		$(e).val("0.00");
        	}
        	$('[name="yhje"]').val(FloatSub(FloatAdd(configMap.ysf, configMap.qtsf), $('[name="sjsk"]').val()).toFixed(2));
        },
        //校验输入的实际收费金额
        checksjsk: function (e) {
        	var je = $(e).val();
        	if (!whetherOrNotMoney(je)) {
        		je = "0.00";
        	}
        	var yh = FloatSub(FloatAdd(configMap.ysf, configMap.qtsf), je).toFixed(2);
        	if(yh>0){
        		$('[name="yhje"]').val(yh);
        	}else{
        		$('[name="yhje"]').val("0.00");
        	}
        }
    };
}();
//@ sourceURL=edit.js