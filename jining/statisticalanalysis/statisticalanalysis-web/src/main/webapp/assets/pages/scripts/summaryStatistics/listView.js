/**
 *
 */
var summaryStatistics_viewlist = function () {
	'use strict';
// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/charge/chargelistBywsByaa',
        chargeauditGrid:null,
		khbm:'',
		htbm:'',
        startTime:'',
        endTime:'',
        showBtn_html: '<a href="javascript:;" class="btn btn-xs default" name="viewinfo"' +
        ' style="margin: 0px;padding: 0px;"><i style="font-size: 12px !important;"' +
        ' class="icon iconfont icon-zhankai- btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>'
	};
	// 全局Dom
	var jqueryMap = {
		$blockTarget: null,
		$content:null,
        $manualdata: null
	};

	var setJqueryMap = function () {
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$content = $('#summaryStatistics_view_id_div');
		jqueryMap.$manualdata=$('#summaryStatistics_view_data');
	};

	//初始化页面表格
	var initchargeauditGrid = function () {
		configMap.chargeauditGrid = jqueryMap.$manualdata.DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "ajax": {
                "url": 'customermanage' + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    var khbm=configMap.khbm;
                    var startTime=configMap.startTime;
                    var endTime=configMap.endTime;
                    data.khbm=khbm;
                    data.startTime=startTime;
                    data.endTime=endTime;
                }
            },
			"columns": [
				{
					className:'text-center',
					"data": "id",
					"render": function (data, type, row) {
						var content = '';
						content += '<i class="fa fa-plus open mainrow" name="OpenAndClose"></i>';
						return content;
					}
				},
	            {
	             	className:'text-center',
	             	"data": "htbm"
	            },
	            {
	            	className:'text-left',
	            	"data": "ht_fwq",
	            	"render": function (data, type, row){
	            		return '<label title="'+moment(data).format('YYYY-MM-DD')+"至"+moment(row.ht_fwz).format('YYYY-MM-DD')+'">'+moment(data).format('YYYY-MM-DD')+"至"+moment(row.ht_fwz).format('YYYY-MM-DD')+'<label>';
	            	}
	            },
	            {
	            	className:'text-center',
	            	"data": "sfxm_mc"
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
	            	"render": function (data, type, row){
	            		return moneySplitByComma(data.toFixed(2));
	            	}
	            },
	            {
	            	className:'text-right',
	            	"data": "sjsk",
	            	"render": function (data, type, row){
	            		return moneySplitByComma(data.toFixed(2));
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
			"drawCallback": function (result) { // 数据加载完成后执行
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
        if(el.hasClass('open')){
            getData(index);
            var otherIco = $('[name="OpenAndClose"]',jqueryMap.$content).not(el);                                 //点击展开当前时，关闭其他展开
            $(otherIco,jqueryMap.$content).each(function(){
                $(this).parents('tr').find('td').removeClass('activeTop activeLeft activeRight');				//移除tr的class样式
                $(this).parents('tr').removeClass('activeClick');													//移除主行的class样式
                $(this).removeClass("fa-minus");
                $(this).removeClass("display");
                $(this).addClass("fa-plus");
                $(this).addClass("open");
            });
        } else {																										//折叠详细数据
            el.parents('tr').removeClass('activeClick');
            el.parents('tr').find('td').removeClass('activeTop activeLeft activeRight');
            el.removeClass("fa-minus");
            el.removeClass("display");
            el.addClass("fa-plus");
            el.addClass("open");
            $("tr", jqueryMap.$content).remove('.childrow');															//取消展示
        }
    };

    /**
     * 获取收费台账详细信息
     */
    var getData = function(index){
        var el = $('[name="OpenAndClose"]:eq('+index+')', jqueryMap.$content);
        $("tr",jqueryMap.$content).remove('.childrow');                                                             //移除子行
        el.parents('tr').addClass('activeClick');
        el.parents('td').addClass('activeTop activeLeft');
        el.parents('td').siblings('td').addClass('activeTop');
        $('td:last-child',el.parents('tr')).addClass('activeRight');											    //为当前行的最后一列添加样式
        el.removeClass("fa-plus");
        el.removeClass("open");
        el.addClass("fa-minus");
        el.addClass("display");

        //ajax获取数据
        var rowIndex = configMap.chargeauditGrid.cell(el.parent()).index().row;
        var htbm = configMap.chargeauditGrid.row(rowIndex).data().htbm;
        var audit = $('[name="auditStatic"]',jqueryMap.$content).val();
        var more = $('[name="showflag"]',jqueryMap.$content).val();
        var charges = $('[name="chargeStatic"]',jqueryMap.$content).val();
        if(more=="0"){
            charges = "999";
        }
        $.ajax({
            url: configMap.path + '/summaryStatistic/getContract/'+configMap.khbm+'/'+htbm+'?startTime='+configMap.startTime+'&&endTime='+configMap.endTime,
            type: "GET",
            success: function (datas) {
                var afterHtml = '';
                var nowdate = new Date();
                var bzxx = '';
                var activebutton="";
                ///////////////////////////////////////////////////////////////拼接页面开始
                if(datas.length>0){
                    afterHtml += '<tr class="childrow"><td colspan="7" class="tableBorder">';
                    for(var i = 0;i<datas.length;i++){
                        activebutton="";
                        afterHtml += '<table class="childtable" border="1"><tbody>';
                        //复选框
                        afterHtml += '<tr><td rowspan="4" class="text-center hiddendiv"></td>';
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
                            afterHtml += '<span style="font-size: 24px;color: #50ccfb;padding:0 5px 0 0;">'
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
                        //应收金额
                        afterHtml += '<div class="childdivlist">应收：<label name="ysk">' + moneySplitByComma(datas[i].ysk.toFixed(2)) + '</label></div>';
                        //实收
                        afterHtml += '<div class="childdivlist">实收：<label class="sjskje">' + moneySplitByComma(datas[i].sjsk.toFixed(2)) + '</label></div>';
                        //优惠金额
                        afterHtml += '<div class="childdivlist">优惠：<label class="yhje">' + moneySplitByComma(datas[i].qtsf.toFixed(2)) + '</label></div>';
                        //支付渠道
                        if(datas[i].zffs_mc !== null && datas[i].zffs_mc !== ""){
                            afterHtml += '<div class="childdivlist">' + datas[i].zffs_mc + '</div>';
                        } else {
                            afterHtml += '<div class="childdivlist hiddendiv"></div>';
                        }
                        //操作按钮
                        afterHtml += '<div name="activebutton" class="hiddendiv"></div></td></tr>';
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
                        afterHtml += '<td colspan="4" style="white-space: normal;word-wrap: break-word;word-break: normal;">收费说明：' + bzxx + '</td></tr>';
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
                        afterHtml += '</td><td colspan="4" style="white-space: normal;word-wrap: break-word;word-break: normal;">审核意见：' + bzxx + '</td></tr>';
                        afterHtml += '</tbody></table>';
                    }
                    afterHtml += '</td></tr>';
                    el.parent().parent().after(afterHtml);
                }
                ///////////////////////////////////////////////////////////////拼接页面结束
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
            }
        });
    };

    /**
	 * 导出excle
     */
	var exclDc=function () {
		var khbm=configMap.khbm;
		window.location.href='customermanage/charge/downDataExcelWsAa?khbm='+khbm;
    };
	return {
		init: function (khbm,startTime,endTime) {
			setJqueryMap();
            configMap.khbm = khbm;
            configMap.startTime=startTime;
            configMap.endTime=endTime;
			initchargeauditGrid();
            $('#daoctaizhang001').off('click').on('click',function () {
                exclDc();
            });
		},
		setPath: function (path) {
			configMap.path = path;
		}

	};
}();
//@ sourceURL=log.js

