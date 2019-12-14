/**
 * 
 */
var chargeorderauditlist = function () {
	'use strict';
    /**
	 * 全局属性参数
     * @type {{path: string, dataUrl: string, submitPageUrl: string, SFXMUrl: string, nowShzt: null, nowddbh: null,
     *          nowSfzt: null, auditBtn_html: string,receiptBtn_html: string, revokeBtn_html: string}}
     */
	var configMap = {
		path: '',
		dataUrl: '/chargeaudit/charge',
        treeUrl: '/organization/organization/orgAndUserAuth',
		submitPageUrl: '/chargeaudit/audit.jsp',
		SFXMUrl: '/contract/sfxm',
		nowShzt: null,
		nowddbh: null,
		nowSfzt: null,
        chargeauditGrid: null,
		auditBtn_html: '<button type="button" name="auditCharge" data-placement="bottom"' +
			' class="icon iconfont icon-shenhe1 btnxystyle iconFontColor-10a0f7 iconFontSize"' +
			' data-toggle="tooltip" data-original-title="单笔收费审核" title="单笔收费审核"></button>',
		receiptBtn_html: '<button type="button" name="chargefile" data-placement="bottom"' +
			' class="icon iconfont icon-fujian btnxystyle iconFontColor-10a0f7 iconFontSize"' +
			' data-toggle="tooltip" data-original-title="收费附件" title="收费附件"></button>',
		revokeBtn_html: '<button type="button" data-type="revoke" data-placement="bottom"' +
			' class="icon iconfont icon-chexiao btnxystyle iconFontColor-10a0f7 iconFontSize"' +
			' data-toggle="tooltip" data-original-title="撤销收费审核状态" title="撤销收费审核状态"></button>',
        historyBtn_html:'<button type="button" name="historyaudit" data-placement="bottom"' +
            ' class="icon iconfont icon-lishirenwu btnxystyle iconFontColor-10a0f7 iconFontSize" ' +
            ' data-original-title="历史审批记录" data-toggle="tooltip" title="历史审批记录"></button>',
        showBtn_html: '<a href="javascript:;" class="btn btn-xs default" name="viewinfo"' +
            ' style="margin: 0px;padding: 0px;"><i style="font-size: 12px !important;"' +
            ' class="icon iconfont icon-zhankai- btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        classType: '',
        currentSelectedNode: null,
        fwzt: '',
        other: '',
        ifSearch:'0'
	};

    /**
	 * 全局Dom
     * @type {{$blockTarget: null, $chargeauditDialog: null, $content: null}}
     */
	var jqueryMap = {
		$blockTarget: null,
		$content: null,
        $manualdata: null,
        $chargeauditDialog: null,
        $chargeAuditTree:null
	};

    /**
     * 全局参数赋值
     * @param uuid
     */
    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#chargeaudit_id_div_'+uuid);
        jqueryMap.$manualdata=jqueryMap.$content.find('table#chargeaudit_data');
        jqueryMap.$chargeAuditTree = $('#chargeaudit_tree', jqueryMap.$content);
    };

    /**
	 * 模态框
     * @param title
	 * 				标题
     * @param url
	 * 				内容路径
     * @param type
	 * 				类型
     */
    var openModal = function (title, url, type, cursor) {
        var dialogButtons = {
        };
        if (type === 'submit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    orderaudit.saveUserInfo(function (result) {
                        if (result) {
                            jqueryMap.$chargeauditDialog.modal('hide');
                            configMap.nowShzt = null;
                            configMap.nowddbh = null;
                            configMap.nowSfzt = null;
                            getData(cursor);
                        }
                    });
                    return false;
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$chargeauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    /**
     * 获取当前代理机构的所有收费项目
     */
    var getSFXM = function (){
        $.ajax({
            url: "/customermanage" + configMap.SFXMUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                if (datas.length > 0) {
                    var datahtml='';
                    for(var i=0;i<datas.length;i++){
                        if(datas[i].serviceName.indexOf("垫付") === -1){
                            datahtml += '<option value="' + datas[i].serviceCode + '" data="' + datas[i].businessType + '">'
                                + datas[i].serviceName + '</option>';
                        }
                    }
                    $('[name="chargeType"] option', jqueryMap.$content).after(datahtml);
                }
            }
        });
    };

    /**
     * 获取当前代理机构的支付渠道
     */
    var getPAYCHANNEL = function (){
        $.ajax({
            url: "/customermanage/charge/editchargeALL",
            type: "GET",
            async: false,
            success: function (datas) {
                if(datas.length > 0){
                    var selecthtml = '';
                    for(var i=0;i<datas.length;i++){
                        selecthtml += '<option value="'+datas[i].zfdm+'">'+datas[i].zfmc+'</option>';
                    }
                    $('[name="paychannel"] option', jqueryMap.$content).after(selecthtml);
                }
            }
        })
    };

    /**
     * 获取当前代理机构的所有职员
     */
    var getZY = function (){
        $.ajax({
            url: "/customermanage/charge/getZyws",
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                if (datas.length > 0) {
                    var datahtml='';
                    for(var i=0;i<datas.length;i++){
                        datahtml += '<option value="' + datas[i].zydm + '">'
                            + datas[i].name + '</option>';
                    }
                    $('[name="chargezy"] option',jqueryMap.$content).after(datahtml);
                    $('[name="chargezg"] option', jqueryMap.$content).after(datahtml);
                }
            }
        });
    };

    /**
	 * 初始化收费审核表格
     */
	var initchargeauditGrid = function () {
		configMap.chargeauditGrid = jqueryMap.$manualdata.DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, 																						//屏蔽排序
            "searching": false,																						//屏蔽datatales的查询框
            "processing": true, 																						//打开数据加载时的等待效果
            "serverSide": true, 																						//打开后台分页
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    var text = $('[name="searchtxt"]',jqueryMap.$content).val();
                    if (text == null || text == '' || text == 'undefined') {
                        configMap.ifSearch = '0';
                    }
                	var searchtxt = $('[name="searchtxt"]',jqueryMap.$content).val();
                	var more = $('[name="showflag"]',jqueryMap.$content).val();
                	var auditStatic = $('[name="auditStatic"]',jqueryMap.$content).val();
                	var chargeStatic = $('[name="chargeStatic"]',jqueryMap.$content).val();
                	var chargeType = $('[name="chargeType"]',jqueryMap.$content).val();
                	var chargeModel = $('[name="chargeModel"]',jqueryMap.$content).val();
                	var chargeMode = $('[name="chargeMode"]',jqueryMap.$content).val();
                    //var fwzt = $('[name="fwzt"]',jqueryMap.$content).val();
                    var sfqd = $('[name="paychannel"]', jqueryMap.$content).val();
                    var sfr = $('[name="chargezy"]', jqueryMap.$content).val();
                    var khzg = $('[name="chargezg"]', jqueryMap.$content).val();
                	data.searchtxt = searchtxt;
                	data.more = more;
                	data.auditStatic = auditStatic;
                	data.chargeStatic = chargeStatic;
                	data.chargeType = chargeType;
                	data.chargeModel = chargeModel;
                	data.chargeMode = chargeMode;
                    data.classType = configMap.classType;
                    data.other = configMap.other;
                    data.fwzt = configMap.fwzt;
                    data.sfqd = sfqd;
                    data.sfr = sfr;
                    data.khzg = khzg;
                    data.ifSearch = configMap.ifSearch;
                    configMap.ifSearch = '0';
                }
            },
			"columns": [	
	            {
					className:'text-center',
					"data": "id",
					"render": function () {
						return '<i class="fa fa-plus open mainrow" name="OpenAndClose"></i>';
					}
				},
	            {
	             	className:'text-center',
	             	"data": "htbm",
                    "render":function (data){
                        return '<label title="' + data + '" data-placement="bottom" data-toggle="tooltip"' +
                            ' data-original-title="' + data + '">' + data + '</label>';
                    }
	            },
	            {
	            	"data": "khmc"
	            },
	            {
	            	className:'text-left',
	            	"data": "ht_fwq",
	            	"render": function (data, type, row){
	            		return '<label title="' + moment(data).format('YYYY-MM-DD') + "至"
							+ moment(row.ht_fwz).format('YYYY-MM-DD') + '" data-placement="bottom"'
                            + ' data-toggle="tooltip">' + moment(data).format('YYYY-MM-DD')
							+ "至" + moment(row.ht_fwz).format('YYYY-MM-DD') + '<label>';
	            	}
	            },
	            {
	            	className:'text-center',
	            	"data": "sfxm_mc",
                    "render": function (data, type ,row){
                        return '<label data="' + row.sfxm_dm + '" name="sfxmdm">' + data + '</label>';
                    }
	            },
	            {
	            	className:'text-center',
	            	"data": "sffs_mc",
	            	"render": function (data, type, row){
	            		return data + '/' + row.sfms_mc;
	            	}
	            },
	            {
	            	className:'text-right',
	            	"data": "ysk",
	            	"render": function (data){
	            		return moneySplitByComma(data.toFixed(2));
	            	}
	            },
	            {
	            	className:'text-right',
	            	"data": "sjsk",
	            	"render": function (data){
	            		return '<label name="sjsk">' + moneySplitByComma(data.toFixed(2)) + '</label>';
	            	}
	            }
			],
			"language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
			},
            "fnFooterCallback": function(row, data, start, end, display) {//总计
                var api = this.api(), data;
                // Remove the formatting to get integer data for summation
                var intVal = function ( i ) {
                    return Number(Number(i).toFixed(2))
                    // return typeof i === 'string' ?
                    //     i.replace(/^\d+(?:\.\d{0,2})?/, '')*1 :
                    //     typeof i === 'number' ?
                    //         i : 0;
                };
                function number(data){
                    if(data!=null){
                        return data.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
                    }else{
                        return ;
                    }
                }
                var total = api
                    .column( 6 )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
                $( api.column( 6 ).footer() ).html(
                    number(total)
                );//应收金额
                var pageTotal = api
                    .column( 7, { page: 'current'} )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
                $( api.column( 7 ).footer() ).html(
                    number(pageTotal)
                );//实收金额
            },
			"drawCallback": function (result) {                                                                     // 数据加载完成后执行
                $('[data-toggle="tooltip"]', jqueryMap.$content).tooltip();
				var openContainer = $('[name="OpenAndClose"]',jqueryMap.$content);
                var trContainer = $('tbody tr', jqueryMap.$content);
				if(openContainer.length>0){
					openContainer.off('click').on('click',function(){
                        var index = $('[name="OpenAndClose"]', jqueryMap.$content).index(this);
						getOrderList(index);
					});
				}
                if(trContainer.length>0){
                    trContainer.off('click').on('click', function(e){
                        if(e.target.tagName !== 'I') {                                                                 //判断当前所点击的是否为td标签
                            var index = $('tbody tr[role="row"]', jqueryMap.$manualdata).index(this);
                            getOrderList(index)
                        }
                    });
                }
			}
		});
	};

    /**
	 * 获取详细收费订单
     * @param index
	 * 			当前元素下标
     */
	var getOrderList = function (index){
        var el = $('[name="OpenAndClose"]:eq('+index+')', jqueryMap.$content);
        var oldtotal = configMap.chargeauditGrid.row(index).data().sjsk;												//原本的总金额
		if(el.hasClass('open')){
			getData(index);
            var otherIco = $('.display',jqueryMap.$content).not(el);                                 //点击展开当前时，关闭其他展开
            $(otherIco,jqueryMap.$content).each(function(){
                $(this).parents('tr').find('td').removeClass('activeTop activeLeft activeRight');				//移除tr的class样式
                $(this).parents('tr').removeClass('activeClick');													//移除主行的class样式
                $(this).removeClass("fa-minus");
                $(this).removeClass("display");
                $(this).addClass("fa-plus");
                $(this).addClass("open");
                var thisIndex = configMap.chargeauditGrid.cell($(this).parent()).index().row;
                var oldsjsk = configMap.chargeauditGrid.row(thisIndex).data().sjsk;									//获取当前台账的实际收款
                $(this).parents("tr").find('[name="sjsk"]').html(moneySplitByComma(oldsjsk.toFixed(2)));				//修改实际收款金额为原本的金额
            });
		} else {																										//折叠详细数据
            el.parents('tr').removeClass('activeClick');
            el.parents('tr').find('td').removeClass('activeTop activeLeft activeRight');
			el.removeClass("fa-minus");
			el.removeClass("display");
			el.addClass("fa-plus");
			el.addClass("open");
			$("tr", jqueryMap.$content).remove('.childrow');															//取消展示
            el.parents("tr").find('[name="sjsk"]').html(moneySplitByComma(oldtotal.toFixed(2)));						//还原实际收款金额
		}
	};

    /**
	 * 获取收费台账详细信息
     */
    var getData = function(index){
        var bgz = configMap.chargeauditGrid.row(index).data().fsbz;                                                  //判断当前合同是否在变更中
        var el = $('[name="OpenAndClose"]:eq('+index+')', jqueryMap.$content);                                   //设置当前为展开
        $("tr",jqueryMap.$content).remove('.childrow');                                                             //移除子行
        el.parents('tr').addClass('activeClick');
        el.parents('td').addClass('activeTop activeLeft');
        el.parents('td').siblings('td').addClass('activeTop');
        $('td:last-child',el.parents('tr')).addClass('activeRight');											    //为当前行的最后一列添加样式
        el.removeClass("fa-plus");
        el.removeClass("open");
        el.addClass("fa-minus");
        el.addClass("display");
        var total = $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html().replace(/,/g,'');			//修改的总金额

        //ajax获取数据
        var htbm = configMap.chargeauditGrid.row(index).data().htbm;
        var audit = $('[name="auditStatic"]',jqueryMap.$content).val();
        var more = $('[name="showflag"]',jqueryMap.$content).val();
        var charges = $('[name="chargeStatic"]',jqueryMap.$content).val();
        var sfqd = $('[name="paychannel"]', jqueryMap.$content).val();
        var sfr = $('[name="chargezy"]', jqueryMap.$content).val();
        if(more === "0"){
            charges = "999";
        }
        $.ajax({
            url: "/customermanage/charge/chargelist/" + htbm + "/" + audit + "/" + charges + "/" + sfqd + "/" + sfr,
            type: "GET",
            success: function (datas) {
                if(datas.length === 0){
                    configMap.chargeauditGrid.ajax.reload();
                }
                var afterHtml = '';
                var nowdate = new Date();
                var bzxx = '';
                var activebutton="";
                ///////////////////////////////////////////////////////////////拼接页面开始
                if(datas.length>0){
                    afterHtml += '<tr class="childrow"><td colspan="8" class="tableBorder">';
                    for(var i = 0;i<datas.length;i++){
                        activebutton="";
                        afterHtml += '<table class="childtable" border="1"><tbody>';
                        //复选框
                        afterHtml += '<tr><td rowspan="4" class="text-center cancheck" style="width:15px;">';
                        if(datas[i].shzt_dm==="001"){										                            //判断当前审核状态，已通过审核的没有操作
                            afterHtml += '<input type="checkbox" name="checkbox_checkbox" id="' + datas[i].id
                                + '_' + datas[i].shzt_dm + '_' + datas[i].sfzt + '_' + datas[i].ddbh + '" disabled="disabled"/>';
                        } else if(datas[i].sfzt==='005' || datas[i].sfzt==='004'){                                   //判断当前收费状态，收费状态为坏账或者已到账的没有操作
                            afterHtml += '<input type="checkbox" name="checkbox_checkbox" id="' + datas[i].id
                                + '_' + datas[i].shzt_dm + '_' + datas[i].sfzt + '_' + datas[i].ddbh + '" disabled="disabled"/>';
                        } else {
                            afterHtml += '<input type="checkbox" name="checkbox_checkbox" id="' + datas[i].id
                                + '_' + datas[i].shzt_dm + '_' + datas[i].sfzt + '_' + datas[i].ddbh + '"/>';
                        }
                        afterHtml += '</td>';
                        //收费月份
                        afterHtml += '<td colspan="6">';
                        afterHtml += '<div class="childdivlist" style="padding: 0px;">' + configMap.showBtn_html + '</div>';
                        afterHtml += '<div class="childdivlist">';
                        if((datas[i].sfzt === '001' || datas[i].sfzt === '004') &&                                    //判断实收预收
                            nowdate < new Date(datas[i].sfnf, datas[i].sfyf - 1, 1)){
                            afterHtml += '<i class="icon iconfont icon-yushou- iconFontColor-10a0f7"' +
                                ' data-original-title="注：预计收费是在服务期限内未服务但已收费的订单，即提前收取的费用的订单"' +
                                ' title="注：预计收费是在服务期限内未服务但已收费的订单，即提前收取的费用的订单"' +
                                ' data-placement="right" data-toggle="tooltip" ></i>&nbsp;'
                                + '<span style="font-size: 24px;color: #50ccfb;padding:0 5px 0 0;">'
                                + datas[i].sfyf + '</span>月-' + datas[i].sfnf;
                        }else if((datas[i].sfzt === '001' || datas[i].sfzt === '004') &&
                            nowdate > new Date(datas[i].sfnf, datas[i].sfyf - 1, 1)){
                            afterHtml += '<i class="icon iconfont icon-shishou- iconFontColor-10a0f7"' +
                                ' data-original-title="注：实际收费是服务期限内已收费的费用订单"' +
                                ' title="注：实际收费是服务期限内已收费的费用订单"' +
                                ' data-placement="right" data-toggle="tooltip" ></i>&nbsp;'
                                + '<span style="font-size: 24px;color: #50ccfb;padding:0 5px 0 0;">'
                                + datas[i].sfyf + '</span>月-' + datas[i].sfnf;
                        } else if(datas[i].sfzt === '005') {
                            afterHtml += '<i class="icon iconfont icon-huai- iconFontColor-10a0f7"></i>&nbsp;'
                                + '<span style="font-size: 24px;color: #50ccfb;padding:0 5px 0 0;">'
                                + datas[i].sfyf + '</span>月-' + datas[i].sfnf;
                        } else{
                            afterHtml += + '<span style="font-size: 24px;color: #50ccfb;padding:0 5px 0 0;">'
                                + datas[i].sfyf + '</span>月-' + datas[i].sfnf;
                        }
                        afterHtml += '</div>';
                        //应收时间
                        afterHtml += '<div class="childdivlist">应收：' + moment(datas[i].yssj).format('YYYY-MM-DD') + '</div>';
                        //收费时间
                        if(datas[i].sfsj === null||datas[i].sfsj === ""){
                            afterHtml += '<div class="childdivlist hiddendiv"></div>';
                        } else {
                            afterHtml += '<div class="childdivlist">收费：' + moment(datas[i].sfsj).format('YYYY-MM-DD') + '</div>';
                        }
                        // //订单编号
                        // if(datas[i].sfzt === "001" || datas[i].sfzt === "004"){
                        //     afterHtml += '<div class="childdivlist">订单编号：<a name="ddbh" href="/customermanage/charge/receipt.jsp?ddbh='
                        //         + datas[i].ddbh + '" target="_blank">' + datas[i].ddbh + '</a></div>';
                        // } else {
                        //     afterHtml += '<div class="childdivlist">订单编号：<label name="ddbh">' + datas[i].ddbh + '</label></div>';
                        // }
                        //应收金额
                        afterHtml += '<div class="childdivlist">应收：<label name="ysk">' + moneySplitByComma(datas[i].ysk.toFixed(2)) + '</label></div>';
                        //实收
                        afterHtml += '<div class="childdivlist">实收：<label class="sjskje">' + moneySplitByComma(datas[i].sjsk.toFixed(2)) + '</label></div>';
                        //优惠金额
                        afterHtml += '<div class="childdivlist">优惠：<label class="yhje">' + moneySplitByComma(datas[i].qtsf.toFixed(2)) + '</label></div>';
                        //支付渠道
                        afterHtml += '<div class="childdivlist">' + datas[i].zffs_mc + '</div>';
                        //操作按钮
                        afterHtml += '<div class="childdivlist" name="activebutton">';
                        /**
                         * 审核按钮：审核状态为待审核时出现审核按钮
                         * 撤销按钮：审核状态为已审核通过或者未通过时出现撤销按钮
                         * 附件按钮：一直会出现附件按钮
                         */
                        if(datas[i].shzt_dm === "003"){
                            activebutton += configMap.auditBtn_html;
                        } else if(datas[i].shzt_dm === "001" || datas[i].shzt_dm === "002"){
                            activebutton += configMap.revokeBtn_html;
                        }
                        activebutton += configMap.receiptBtn_html;
                        activebutton += configMap.historyBtn_html;
                        if(datas[i].sfzt === "005"){
                            activebutton  = "";
                        }
                        afterHtml += activebutton + '</div></td></tr>';
                        afterHtml += '<tr class="hidetr display-hide">';
                        //审核状态
                        afterHtml += '<td colspan="2">审核状态：';
                        if(datas[i].shzt_dm === "000"){
                            afterHtml += '未审核';
                        } else if (datas[i].shzt_dm === "001"){
                            afterHtml += '已通过';
                        } else if (datas[i].shzt_dm === "002"){
                            afterHtml += '未通过';
                        } else if (datas[i].shzt_dm === "003"){
                            afterHtml += '待审核';
                        }
                        afterHtml += '</td>';
                        //收费人
                        afterHtml += '<td colspan="2">收费人：';
                        if(datas[i].lrrmc !== null && datas[i].lrrmc !== ""){
                            afterHtml += datas[i].lrrmc;
                        } else {
                            afterHtml += '暂无'
                        }
                        afterHtml += '</td>';
                        //订单编号
                        afterHtml += '<td colspan="2">订单编号：';
                        if(datas[i].ddbh!==''&&datas[i].ddbh!==null){
                            if(datas[i].sfzt === "001" || datas[i].sfzt === "004"){
                                afterHtml += '<a name="ddbh" href="/customermanage/charge/receipt.jsp?ddbh='
                                    + datas[i].ddbh + '" target="_blank">' + datas[i].ddbh + '</a>';
                            } else {
                                afterHtml += '<label name="ddbh">' + datas[i].ddbh + '</label>';
                            }
                        } else {
                            afterHtml += '暂无';
                        }
                        afterHtml += '</td>';
                        afterHtml += '</tr>';
                        afterHtml += '<tr class="hidetr display-hide">';
                        //收费状态
                        afterHtml += '<td colspan="2">收费状态：';
                        if(datas[i].sfzt === "000"){
                            afterHtml += '未收费';
                        } else if(datas[i].sfzt === "001"){
                            afterHtml += '已收费';
                        } else if(datas[i].sfzt === "002"){
                            afterHtml += '欠费中';
                        } else if(datas[i].sfzt === "003"){
                            afterHtml += '催费中';
                        } else if(datas[i].sfzt === "004"){
                            afterHtml += '已收费';
                        } else if (datas[i].sfzt === "005"){
                            afterHtml += '坏账';
                        }
                        afterHtml += '</td>';
                        //收费说明
                        if(datas[i].bzxx !== null&&datas[i].bzxx !== ""){
                            bzxx = datas[i].bzxx;
                        } else {
                            bzxx = "暂无";
                        }
                        afterHtml += '<td colspan="4">收费说明：' + bzxx + '</td></tr>';
                        afterHtml += '<tr class="hidetr display-hide">';
                        //到账状态
                        afterHtml += '<td colspan="2">到账状态：';
                        if(datas[i].shzt_dm === "001"){
                            afterHtml += '已到账';
                        } else {
                            afterHtml += '未到账';
                        }
                        afterHtml += '</td>';
                        //审核意见
                        if(datas[i].shyj !== null && datas[i].shyj !== ""){
                            bzxx = datas[i].shyj;
                        } else {
                            bzxx = "暂无";
                        }
                        afterHtml += '</td><td colspan="4">审核意见：' + bzxx + '</td></tr>';
                        afterHtml += '</tbody></table>';
                    }
                    afterHtml += '</td></tr>';
                    el.parent().parent().after(afterHtml);
                }
                ///////////////////////////////////////////////////////////////拼接页面完成
                if(bgz === 1){
                    $('.childrow input[name="checkbox_checkbox"]', jqueryMap.$content).prop('disabled', true);
                    $('.childrow input[type="text"]', jqueryMap.$content).prop('readonly', true);
                    $('[name="activebutton"]', jqueryMap.$content).html('<label style="color: red">当前合同变更中！</label>');
                }
                $('[data-toggle="tooltip"]', jqueryMap.$content).tooltip();
                var FileContainer = $('[name="chargefile"]',jqueryMap.$content);
                var auditContainer = $('[name="auditCharge"]',jqueryMap.$content);
                var revokeContainer = $('[data-type="revoke"]',jqueryMap.$content);
                var historyContainer = $('[name="historyaudit"]',jqueryMap.$content);                              //历史审批记录
                var viewContainer = $('[name="viewinfo"]', jqueryMap.$content);                                    //查看收费详情
                if(viewContainer.length>0){
                    viewContainer.off('click').on('click', function(){
                        var ele = $(this);
                        var parentele = ele.parents('.childtable');
                        if(ele.find('.icon-zhankai-').hasClass('rotate')){
                            ele.find('.icon-zhankai-').removeClass('rotate');
                            parentele.find('.hidetr').addClass('display-hide');
                        } else {
                            ele.find('.icon-zhankai-').addClass('rotate');
                            parentele.find('.hidetr').removeClass('display-hide');
                        }
                    });
                }
                if(auditContainer.length>0){
                    auditContainer.off('click').on('click',function (){
                        var id = $(this).parents('.childtable').find('[name="checkbox_checkbox"]')
                            .attr("id").split("_")[0];
                        var cursor = $('tbody tr[role="row"]', jqueryMap.$content).index($('.activeClick', jqueryMap.$content));     //获取当前收费台账的主行下标
                        sendOrderAudit(id, cursor);
                    });
                }
                if(revokeContainer.length>0){
                    revokeContainer.confirmation({
                        "title": '确定撤销审核？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "btnOkClass": 'btn btn-sm btn-danger mr borderRadius4',
                        "btnCancelClass": 'btn btn-sm btn-default borderRadius4',
                        "placement": 'left',
                        "container": 'body',
                        "onConfirm": getid
                    });
                }
                if(FileContainer.length>0){
                    FileContainer.off('click').on('click',function(){
                        var ddbh = $(this).parents('.childtable').find('[name="ddbh"]').html();
                        var dialogButtons = {
                        };
                        dialogButtons.cancel = {
                            label: '<i class="fa fa-times"></i>关&nbsp;闭',
                            className: "btn btn btn-default borderRadius4"
                        };
                        $.get("/customermanage/charge/addfile.jsp?id=" + ddbh + "&type=view", function (html) {
                            jqueryMap.$setimg = bootbox.dialog({
                                title: '查看附件',
                                message: html,
                                buttons: dialogButtons
                            });
                        });
                    })
                }
                if(historyContainer.length>0){
                    historyContainer.off('click').on('click',function(){
                        var ele = $(this);
                        var parentele = ele.parents('.childtable');
                        var id = parentele.find('[name="checkbox_checkbox"]').attr("id").split("_")[0];
                        var dialogButtons = {
                        };
                        dialogButtons.cancel = {
                            label: '<i class="fa fa-times"></i>关&nbsp;闭',
                            className: "btn btn btn-default borderRadius4"
                        };
                        $.get('customermanage/contract/historyAuditList.jsp?id='+id+'&type=002', function (html) {
                            jqueryMap.$setimg = bootbox.dialog({
                                title: '历史审批记录',
                                message: html,
                                buttons: dialogButtons
                            });
                        });
                    });
                }
                configMap.nowShzt = null;
                configMap.nowddbh = null;
                configMap.nowSfzt = null;
                $('.cancheck', jqueryMap.$content).off('click').on('click',function(e){
                    if(e.target.tagName === 'TD'){                                                                     //判断当前所点击的是否为td标签
                        if($(this).find('[name="checkbox_checkbox"]').prop('checked')){                          //判断当前checkbox的选中状态是否为被选中
                            $(this).find('[name="checkbox_checkbox"]').prop('checked', false);
                        } else {
                            if($(this).find('[name="checkbox_checkbox"]').prop('disabled')){
                            } else {
                                $(this).find('[name="checkbox_checkbox"]').prop('checked', true);
                            }
                        }
                        var ele = $(this);
                        var parentele = ele.parents('.childtable');
                        var id = parentele.find('[name="checkbox_checkbox"]').attr("id").split("_")[0];
                        var shzt = parentele.find('[name="checkbox_checkbox"]').attr("id").split("_")[1];
                        var sfzt = parentele.find('[name="checkbox_checkbox"]').attr("id").split("_")[2];
                        var ddbh = parentele.find('[name="checkbox_checkbox"]').attr("id").split("_")[3];
                        if (configMap.nowShzt !== null && shzt !== configMap.nowShzt) {                                  //如果当前选择的审核状态与原本选中的审核状态不相同
                            Messenger().post({
                                message: "请选择同一个合同下，相同状态、相同单号的收费订单！",
                                type: 'error',
                                id:"ordermessenger"
                            });
                            parentele.find('[name="checkbox_checkbox"]').prop('checked',false);
                        } else if (configMap.nowddbh !== null && ddbh !== configMap.nowddbh) {                          //如果当前选择的订单编号与原本选中的订单编号不相同
                            Messenger().post({
                                message: "请选择同一个合同下，相同状态、相同单号的收费订单！",
                                type: 'error',
                                id:"ordermessenger"
                            });
                            parentele.find('[name="checkbox_checkbox"]').prop('checked',false);
                        } else if (configMap.nowSfzt !== null && sfzt !== configMap.nowSfzt) {                          //如果当前选择的收费状态与原本选中的收费状态不相同
                            Messenger().post({
                                message: "请选择同一个合同下，相同状态、相同单号的收费订单！",
                                type: 'error',
                                id:"ordermessenger"
                            });
                            parentele.find('[name="checkbox_checkbox"]').prop('checked',false);
                        } else {
                            var n = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content).length;
                            if(parentele.find('[name="checkbox_checkbox"]').is(":checked")){
                                if(n === 1){
                                    configMap.nowShzt = shzt;
                                    configMap.nowddbh = ddbh;
                                    configMap.nowSfzt = sfzt;
                                    // total = FloatAdd(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                    $('[name="checkbox_checkbox"]:not(:disabled)',jqueryMap.$content).each(function(){
                                        if($(this).attr("id").split("_")[1] === configMap.nowShzt &&
                                            $(this).attr("id").split("_")[2] === configMap.nowSfzt &&
                                            $(this).attr("id").split("_")[3]===configMap.nowddbh){
                                            $(this).prop("checked", true);
                                            total = FloatAdd(total,$(this).parents('.childtable').find('.sjskje').html().replace(/,/g,''));
                                        }
                                    });
                                    $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));
                                } else {                                                                                    //手动选择checkbox时计算实收金额
                                    total = FloatAdd(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                    $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));
                                }
                            } else {
                                total = FloatSub(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));
                                if(n === 0){
                                    configMap.nowShzt = null;
                                    configMap.nowddbh = null;
                                    configMap.nowSfzt = null;
                                }
                            }
                        }
                    }
                });
                jqueryMap.$content.find('[name="checkbox_checkbox"]').change(function (){						//点击复选框
                    var ele = $(this);																					//当前被点击的checkbox
                    var parentele = ele.parents('.childtable');
                    var id = ele.attr("id").split("_")[0];
                    var shzt = ele.attr("id").split("_")[1];
                    var sfzt = ele.attr("id").split("_")[2];
                    var ddbh = ele.attr("id").split("_")[3];
                    if (configMap.nowShzt !== null && shzt !== configMap.nowShzt) {
                        Messenger().post({
                            message: "请选择同一个合同下，相同状态、相同单号的收费订单！",
                            type: 'error',
                            id:"ordermessenger"
                        });
                        ele.prop('checked',false);
                    } else if (configMap.nowddbh !== null && ddbh !== configMap.nowddbh) {
                        Messenger().post({
                            message: "请选择同一个合同下，相同状态、相同单号的收费订单！",
                            type: 'error',
                            id:"ordermessenger"
                        });
                        ele.prop('checked',false);
                    } else if (configMap.nowSfzt !== null && sfzt !== configMap.nowSfzt) {
                        Messenger().post({
                            message: "请选择同一个合同下，相同状态、相同单号的收费订单！",
                            type: 'error',
                            id:"ordermessenger"
                        });
                        ele.prop('checked',false);
                    } else {
                        var n = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content).length;
                        if(ele.is(":checked")){
                            if(n === 1){
                                configMap.nowShzt = shzt;
                                configMap.nowddbh = ddbh;
                                configMap.nowSfzt = sfzt;
                                // total = FloatAdd(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                $('[name="checkbox_checkbox"]:not(:disabled)',jqueryMap.$content).each(function(){
                                    if($(this).attr("id").split("_")[1] === configMap.nowShzt &&
                                        $(this).attr("id").split("_")[2] === configMap.nowSfzt &&
                                        $(this).attr("id").split("_")[3]===configMap.nowddbh){
                                        $(this).prop("checked", true);
                                        total = FloatAdd(total,$(this).parents('.childtable').find('.sjskje').html().replace(/,/g,''));
                                    }
                                });
                                $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));
                            } else {                                                                                    //手动选择checkbox时计算实收金额
                                total = FloatAdd(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));
                            }
                        } else {
                            total = FloatSub(total,parentele.find('.sjskje').html().replace(/,/g,''));
                            $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));
                            if(n === 0){
                                configMap.nowShzt = null;
                                configMap.nowddbh = null;
                                configMap.nowSfzt = null;
                            }
                        }
                    }
                });
            }
        });
	};

    /**
	 * 撤销收费审核，获取id
     * @param event
     * @param element
     */
	var getid = function (event,element){
		var id = $(element).parents('.childtable').find('[name="checkbox_checkbox"]').attr("id").split("_")[0];
        var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));//获取当前收费台账的主行下标
		revokeOrder(id, cursor);
	};

    /**
	 * 撤销审核
     */
	var revokeOrder = function (id, cursor){
		$.ajax({
            url: configMap.path + '/chargeaudit/revoke/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                if(datas.success){
                	Messenger().post({
						message: "撤销成功",
						type: 'info',
						id:"ordermessenger"
					});
                	getData(cursor);
                } else {
                	Messenger().post({
						message: datas.message,
						type: 'error',
						id:"ordermessenger"
					});
                }
            }
        });
	};

    /**
     * 收费审核
     * @param id
     *          收费台账编号
     * @param cursor
     *          主行下标
     */
	var sendOrderAudit = function (id, cursor){
		openModal("收费审核", configMap.path + configMap.submitPageUrl + "?id=" + encodeURI(id), 'submit', cursor);
	};

    var initOrganization = function () {
        var jstree = jqueryMap.$chargeAuditTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.treeUrl
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
            $('#chargeaudit_tree').on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            getTreeNum();
            $("#chargeaudit_tree").bind("select_node.jstree", function (e, data) {

                if (data.node.id == 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        $('#chargeaudit_tree').jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });


        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#chargeaudit_tree li").length; i++) {
                var $temp = $("#chargeaudit_tree li").eq(i).attr("userimg");
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

        jqueryMap.$chargeAuditTree.on('select_node.jstree', function (e, data) {
            configMap.currentSelectedNode = data.node;
            if (data.node.parent === '#') { //点击的是所有客户
                configMap.classType = 1;
                configMap.fwzt = 1; //正在服务的
                if (data.node.id === 'stopCustomer') {//停止服务的
                    configMap.fwzt = 0;
                }
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出已经停止服务的客户列表信息
                configMap.chargeauditGrid.clear().draw();
                configMap.chargeauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
                if (configMap.fwzt === 1) { //正在服务的
                    jqueryMap.$content.find(".adoptAll").prop('disabled', false);
                } else { //停止的
                    jqueryMap.$content.find(".adoptAll").prop('disabled', true);
                }
            } else if (data.node.li_attr.BMBZ === "1") { //部门标志为true，代表为部门
                configMap.fwzt = 1; //正在服务的
                configMap.classType = 2; //代表部门
                configMap.other = data.node.li_attr.bmdm; //部门代码
                jqueryMap.$content.find(".adoptAll").prop('disabled', false);
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出该部门的客户列表信息
                configMap.chargeauditGrid.clear().draw();
                configMap.chargeauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            } else { //代表个人
                configMap.fwzt = 1; //正在服务的
                configMap.classType = 3;
                configMap.other = data.node.li_attr.zydm;
                jqueryMap.$content.find(".adoptAll").prop('disabled', false);
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                configMap.chargeauditGrid.clear().draw();
                configMap.chargeauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
        //jstree定时搜索功能
        //输入框输入定时自动搜索
        var to = false;
        $('#search_Chargeay').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_Chargeay').val());
            }, 250);
        });

    };

	return {
		init: function (uuid) {
			setJqueryMap(uuid);
			var tabid=$('#chargeaudit_id_div_'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid,chargeorderauditlist);
            getSFXM();																									//获取当前代理机构的收费项目
            getPAYCHANNEL();                                                                                            //获取当前代理机构的线下支付渠道
            getZY();                                                                                                    //获取当前代理机构的所有职员

            Layout.addResizeContent(jqueryMap.$content);
            setTimeout(function () {
                var layout = jqueryMap.$content.layout({
                    center__onresize: App.initLayoutContentScrollbar,
                    west__onresize: App.initLayoutContentScrollbar,
                    west__size: 200
                });
                App.initLayoutContentScrollbar('west', layout.panes.west);
                App.initLayoutContentScrollbar('center', layout.panes.center);
            }, 10);

            configMap.classType = 1;
            configMap.fwzt = 1; //正在服务的
            configMap.ifSearch = '0';
            initOrganization();
            initchargeauditGrid();																						//初始化收费审核表格
			jqueryMap.$content.find('#MoreSearch_btn').off('click').on('click',function (){						//更多查询条件按钮
				var showflag = $('[name="showflag"]',jqueryMap.$content).val();
				if(showflag === "0"){
                    $("#MoreSearch_btn", jqueryMap.$content).next().removeClass("rotate1");
					$("#moreSearchDiv",jqueryMap.$content).show(500);
					$('[name="showflag"]',jqueryMap.$content).val('1');
					$('#MoreSearch_btn',jqueryMap.$content).find('i').removeClass('glyphicon-chevron-down');
					$('#MoreSearch_btn',jqueryMap.$content).find('i').addClass('glyphicon-chevron-up');
				} else {
                    $("#MoreSearch_btn", jqueryMap.$content).next().addClass("rotate1");
					$("#moreSearchDiv",jqueryMap.$content).hide(500);
					$('[name="showflag"]',jqueryMap.$content).val('0');
					$('#MoreSearch_btn',jqueryMap.$content).find('i').removeClass('glyphicon-chevron-up');
					$('#MoreSearch_btn',jqueryMap.$content).find('i').addClass('glyphicon-chevron-down');
				}
			});

			jqueryMap.$content.find('.Search-btn').off('click').on('click', function () {						//点击查询
                configMap.ifSearch = '1';
				configMap.chargeauditGrid.ajax.reload();
			});

			jqueryMap.$content.find(".adoptAll").off('click').on('click', function (){							//审核全部
                var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));             //获取当前所选的收费台账的主行下标
                var id = "";
				var idStr = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content);
				var flag = "";
				var type = false;
				$(idStr).each(function (){
                    id += flag + $(this).attr("id").split("_")[0];
					flag = ",";
					if($(this).attr("id").split("_")[1] !== "003" && $(this).attr("id").split("_")[1] !== "002"){  //如果审核状态不为待审核或者未通过
						type=true;
					}
				});
				if(type){
					Messenger().post({
						message: "请选择待审核的收费订单！",
						type: 'error',
						id: 'orderauditmessenger'
					});
				}else if(id.length < 1){
					Messenger().post({
						message: "！请选择收费订单",
						type: 'error',
						id: 'orderauditmessenger'
					});
				} else {
					sendOrderAudit(id, cursor);
				}
			});

			 $('[name="searchtxt"]',jqueryMap.$content).keydown(function() {										//给输入框绑定按键事件
		        if(event.keyCode == "13") {																			//判断如果按下的是回车键则执行下面的代码
		        	$(".Search-btn",jqueryMap.$content).click();
		        }
		    });
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=chargeorderauditlist.js
	
	