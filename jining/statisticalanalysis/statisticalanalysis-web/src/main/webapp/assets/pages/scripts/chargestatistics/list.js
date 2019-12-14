/**
 * 
 */
var chargestatisticslist = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
		path: '',
        sflx:'',
        chargeauditGrid: null,
        showBtn_html: '<a href="javascript:;" class="btn btn-xs default" name="viewinfo"' +
        ' style="margin: 0px;padding: 0px;"><i style="font-size: 12px !important;"' +
        ' class="icon iconfont icon-zhankai- btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget: null,
		$content:null,
        $manualdata: null,
        $chargeauditDialog: null
	};
	
	var setJqueryMap = function (uuid) {
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$content = $('#chargeorder_id_div_'+uuid);
		jqueryMap.$manualdata=jqueryMap.$content.find('table#chargeorder_data');
	};

    /**
     * 获取当前代理机构的支付渠道
     */
    var getAllChargeAccount=function () {
        $.ajax({
            url:'customermanage/charge/editchargeALL',
            type:'GET',
            success:function (results) {
                var op='<option value="999">全部</option>';
                for(var i=0;i<results.length;i++){
                    op+='<option value="'+results[i].zfdm+'">'+results[i].zfmc+'</option>>'
                }
                $('#chargeAccount',jqueryMap.$content).append(op);
            }
        });
    };

    /**
     * 获取当前代理机构的所有职员
     */
    var getZY = function () {
        $.ajax({
            url: "/customermanage/charge/getZyws",
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                var op='';
                if(datas.length>0){
                    for(var i=0;i<datas.length;i++){
                        op+='<option value="'+datas[i].zydm +'">'+datas[i].name+'</option>'
                    }
                    $('#inputPeople option',jqueryMap.$content).after(op);
                    $('#employee option',jqueryMap.$content).after(op);
                    $('#customerMaster option',jqueryMap.$content).after(op);
                }
            }
        });
    };

    /**
     * 获取当前代理机构的所有收费项目
     */
    var getcostpro=function(){
        var str='<option value="100">全部</option>';
        $.ajax({
            url: '/customermanage/contract/sfxm',
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                if (datas.length > 0) {
                    var datahtml='<option value="100" selected="selected">全部</option>';
                    for(var i=0;i<datas.length;i++){
                        if(datas[i].serviceName.indexOf("垫付") === -1){
                            datahtml += '<option value="' + datas[i].serviceCode + '" data="' + datas[i].businessType + '">'
                                + datas[i].serviceName + '</option>';
                        }
                    }
                    $('[name="chargeType"]', jqueryMap.$content).append(datahtml);
                }
            }
        });
    };

    $('#chargeDepartmentDel', jqueryMap.$content).click(function(){
        $('#department', jqueryMap.$content).val('全 部').attr('data-code','100');
        $('#chargeTreecontainer ,#searchDepartment,#chargeDepartmentDel', jqueryMap.$content).css('display','none');
    });

    //发起人部门的树
    var initOrganization = function () {
        $('#chargeTreecontainer', jqueryMap.$content).jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url':'/organization/organization/getDLOrg'
                }
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            'plugins': ["types","search"]
        });
        var to = false;
        $('#searchDepartment', jqueryMap.$content).keyup(function () {
            if(to) { clearTimeout(to); }
            to = setTimeout(function () {
                var v = $('#searchDepartment', jqueryMap.$content).val();
                $('#chargeTreecontainer', jqueryMap.$content).jstree(true).search(v);
            }, 250);
        });
        $('#chargeTreecontainer', jqueryMap.$content).bind("activate_node.jstree", function(obj, e) {
            $('#department', jqueryMap.$content)
                .val(e.node.text)
                .attr('data-code',e.node.id);
            $('#chargeTreecontainer ,#searchDepartment,#chargeDepartmentDel',jqueryMap.$content).css('display','none');
        });
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
                "url": '/customermanage/' + 'charge/chargelistByws',
                "dataSrc": "aaData",
                "cache":false,
                "data": function (data) {
                	var searchtxt = $('[name="searchtxt"]',jqueryMap.$content).val();
                	var more = $('[name="showflag"]',jqueryMap.$content).val();
//                	var starDate = $('[name="starDate"]',jqueryMap.$content).val();
                	var auditStatic = $('[name="auditStatic"]',jqueryMap.$content).val();
                	var chargeStatic = $('[name="chargeStatic"]',jqueryMap.$content).val();
                	var chargeType = $('[name="chargeType"]',jqueryMap.$content).val();
                	var chargeModel = $('[name="chargeModel"]',jqueryMap.$content).val();
                	var chargeMode = $('[name="chargeMode"]',jqueryMap.$content).val();
                	var department=$('#department',jqueryMap.$content).attr("data-code");
                	var employee=$('#employee',jqueryMap.$content).val();
                	var sflx=$('#chargews',jqueryMap.$content).val();
                	var fwqq=$('#startTime',jqueryMap.$content).val();
                	var fwqz=$('#endTime',jqueryMap.$content).val();
                	var fwzt=$('#fwzt',jqueryMap.$content).val();
                	var customerMaster=$('#customerMaster',jqueryMap.$content).val();
                    if(sflx=='001'){
                        $('[name="chargeStatic"]',jqueryMap.$content).val('004')
                        chargeStatic= $('[name="chargeStatic"]',jqueryMap.$content).val();
                    }else if(sflx=='002'){
                        $('[name="chargeStatic"]',jqueryMap.$content).val('004')
                        chargeStatic= $('[name="chargeStatic"]',jqueryMap.$content).val();
                    }else if(sflx=='003'){
                        $('[name="chargeStatic"]',jqueryMap.$content).val('100')
                        chargeStatic= $('[name="chargeStatic"]',jqueryMap.$content).val();
                    }
                    var chargePeople=$('#inputPeople',jqueryMap.$content).val();
                    var chargeAccount=$('#chargeAccount',jqueryMap.$content).val();
                    var chargeStartTime=$('#chargeStartTime',jqueryMap.$content).val();
                    var chargeEndTime=$('#chargeEndTime',jqueryMap.$content).val();
                	data.searchtxt = searchtxt;
                	data.more = more;
                	data.auditStatic = auditStatic;
                	data.chargeStatic = chargeStatic;
                	data.chargeType = chargeType;
                	data.chargeModel = chargeModel;
                	data.chargeMode = chargeMode;
					data.department=department;
                	data.employee=employee;
                	data.sflx=sflx;
                    data.fwqq=fwqq;
                    data.fwqz=fwqz;
                    data.fwzt=fwzt;
                    data.chargeAccount=chargeAccount;
                    data.chargePeople=chargePeople;
                    data.chargeStartTime=chargeStartTime;
                    data.chargeEndTime=chargeEndTime;
                    data.customerMaster=customerMaster;
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
                    "data": "khmc",
                    "render":function (data,type,row) {
                        if (configMap.type == 'customerLook') {
                            return "";
                        } else {
                            return data;
                        }
                    }
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
        var chargespro=$('[name="chargeType"]',jqueryMap.$content).val();
        var chargeTy=$('[name="chargeMode"]',jqueryMap.$content).val();
        var chargeMod=$('[name="chargeModel"]',jqueryMap.$content).val();
        var department=$('#department',jqueryMap.$content).attr("data-code");
        var employee=$('#employee',jqueryMap.$content).val();
        var startTime=$('#startTime',jqueryMap.$content).val();
        var endTime =$('#endTime',jqueryMap.$content).val();
        var chargews=$('#chargews',jqueryMap.$content).val();
        var fwzt=$('#fwzt',jqueryMap.$content).val();
        var chargePeople=$('#inputPeople',jqueryMap.$content).val();
        var chargeAccount=$('#chargeAccount',jqueryMap.$content).val();
        var chargeStartTime=$('#chargeStartTime',jqueryMap.$content).val();
        var chargeEndTime=$('#chargeEndTime',jqueryMap.$content).val();

        if(chargews==='001'){
            $('[name="chargeStatic"]',jqueryMap.$content).val('004');
            charges= $('[name="chargeStatic"]',jqueryMap.$content).val();
        }else if(chargews==='002'){
            $('[name="chargeStatic"]',jqueryMap.$content).val('004');
            charges= $('[name="chargeStatic"]',jqueryMap.$content).val();
        }else if(chargews==='003'){
            $('[name="chargeStatic"]',jqueryMap.$content).val('100');
            charges= $('[name="chargeStatic"]',jqueryMap.$content).val();
        }
        if(more==='0'){
            charges = '100';
        }
        $.ajax({
            url: '/customermanage/charge/chargelistaaByws',
            type: "POST",
            data: JSON.stringify({
                "htbm": htbm,
                "audit": audit,
                "more": more,
                "charges": charges,
                "chargespro": chargespro,
                "chargeTy": chargeTy,
                "chargeMod": chargeMod,
                "department": department,
                "employee": employee,
                "startTime": startTime,
                "endTime": endTime,
                "chargews": chargews,
                "fwzt": fwzt,
                "chargeAccount": chargeAccount,
                "chargePeople": chargePeople,
                "chargeStartTime": chargeStartTime,
                "chargeEndTime": chargeEndTime
            }),
            contentType: 'application/json;UTF-8',
            dataType:"json",
            success: function (datas) {
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
                        afterHtml += '<div name="activebutton" class="childdivlist hiddendiv"></div></td></tr>';
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
     * 导出
     */
    var exportExcel = function () {
        stopContinueClick('#task-manager-container [name="exportExcel"]', 300);
        var searchtxt = $('[name="searchtxt"]',jqueryMap.$content).val();
        var more = $('[name="showflag"]',jqueryMap.$content).val();
        var auditStatic = $('[name="auditStatic"]',jqueryMap.$content).val();
        var chargeStatic = $('[name="chargeStatic"]',jqueryMap.$content).val();
        var chargeType = $('[name="chargeType"]',jqueryMap.$content).val();
        var chargeModel = $('[name="chargeModel"]',jqueryMap.$content).val();
        var chargeMode = $('[name="chargeMode"]',jqueryMap.$content).val();
        var department=$('#department',jqueryMap.$content).attr("data-code");
        var employee=$('#employee',jqueryMap.$content).val();
        var sflx=$('#chargews',jqueryMap.$content).val();
        var fwqq=$('#startTime',jqueryMap.$content).val();
        var fwqz=$('#endTime',jqueryMap.$content).val();
        var fwzt=$('#fwzt',jqueryMap.$content).val();
        var chargePeople=$('#inputPeople',jqueryMap.$content).val();
        var chargeAccount=$('#chargeAccount',jqueryMap.$content).val();
        var chargeStartTime=$('#chargeStartTime',jqueryMap.$content).val();
        var chargeEndTime=$('#chargeEndTime',jqueryMap.$content).val();
        if(sflx==='001'){
            $('[name="chargeStatic"]',jqueryMap.$content).val('004');
            chargeStatic= $('[name="chargeStatic"]',jqueryMap.$content).val();
        }else if(sflx==='002'){
            $('[name="chargeStatic"]',jqueryMap.$content).val('004');
            chargeStatic= $('[name="chargeStatic"]',jqueryMap.$content).val();
        }else if(sflx==='003'){
            $('[name="chargeStatic"]',jqueryMap.$content).val('100');
            chargeStatic= $('[name="chargeStatic"]',jqueryMap.$content).val();
        }
        window.location.href = 'customermanage/'+ "charge/downDataExcelWs?searchtxt=" + searchtxt + "&more=" + more + "&auditStatic=" + auditStatic
            + "&chargeStatic=" + chargeStatic + "&chargeType=" + chargeType + "&chargeModel=" + chargeModel + "&chargeMode=" + chargeMode + "&department=" +
            department +"&employee=" + employee + "&sflx=" + sflx +"&fwqq=" + fwqq + "&fwqz=" + fwqz+"&fwzt="+fwzt+"&chargeAccount="+chargeAccount+"&chargePeople="+chargePeople+'&chargeStartTime='+chargeStartTime+'&chargeEndTime='+chargeEndTime;
    };
	return {
		init: function (uuid,type) {
			setJqueryMap(uuid);
			var tabid=$('#chargeorder_id_div_'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid,chargestatisticslist);
            getAllChargeAccount();
            getZY();
            getcostpro();
            initOrganization();
			//获取审核状态
			$('.beginTime', jqueryMap.$content).datepicker({
				clearBtn: true,
				format: 'yyyy-mm-dd',
				autoclose: true,
				language: 'zh-CN'
			}).on('changeDate',function(e){
                var startTime = e.date;
                $('.endTime', jqueryMap.$content).datepicker('setStartDate',startTime);
            });
			$('.endTime', jqueryMap.$content).datepicker({
				clearBtn: true,
				format: 'yyyy-mm-dd',
				autoclose: true,
				language: 'zh-CN'
			}).on('changeDate',function(e){
                var endTime = e.date;
                $('.beginTime', jqueryMap.$content).datepicker('setEndDate',endTime);
            });
            $('.beginTime1', jqueryMap.$content).datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            }).on('changeDate',function(e){
                var startTime = e.date;
                $('.endTime1', jqueryMap.$content).datepicker('setStartDate',startTime);
            });
            $('.endTime1', jqueryMap.$content).datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            }).on('changeDate',function(e){
                var endTime = e.date;
                $('.beginTime1', jqueryMap.$content).datepicker('setEndDate',endTime);
            });
            /*getBM();*/
            $('#department',jqueryMap.$content).focus(function(){
                $('#chargeTreecontainer ,#searchDepartment,#chargeDepartmentDel', jqueryMap.$content).css('display','block');
            });
            $('#daochuexlsws').off('click').on('click',function () {
                exportExcel();
            });
            $('#sjsfBtnByws').off('click').on('click',function () {
                configMap.sflx=1;//实际收费
            });
            $('#yjsfBtnByws').off('click').on('click',function () {
                configMap.sflx=2;//预计收费
            });
            $('#ysfByws').off('click').on('click',function () {
                configMap.sflx=3;//应收费用
            });
            $('#allByws').off('click').on('click',function () {
                configMap.sflx=4;//全部
            });

            if (type === 'CFTX') { //催费提醒
            	$('[name="auditStatic"]',jqueryMap.$content).val("001"); //审核状态（同意）
            	$('[name="chargeStatic"]',jqueryMap.$content).val("003"); //催费状态
            }
            if (type === 'QFTX') { //欠费提醒
            	$('[name="auditStatic"]',jqueryMap.$content).val("001"); //审核状态（同意）
            	$('[name="chargeStatic"]',jqueryMap.$content).val("002"); //催费状态
            } 
			initchargeauditGrid();
			//更多查询条件按钮
			jqueryMap.$content.find('#MoreSearch_btn').off('click').on('click',function (){
				var showflag = $('[name="showflag"]',jqueryMap.$content).val();
				if(showflag === "0"){
					$(this).next().removeClass("rotate1");
					$("#moreSearchDiv",jqueryMap.$content).show(500);
					$('[name="showflag"]',jqueryMap.$content).val('1');
					$('#MoreSearch_btn',jqueryMap.$content).find('i').removeClass('glyphicon-chevron-down');
					$('#MoreSearch_btn',jqueryMap.$content).find('i').addClass('glyphicon-chevron-up');
				} else {
                    $(this).next().addClass("rotate1");
					$("#moreSearchDiv",jqueryMap.$content).hide(500);
					$('[name="showflag"]',jqueryMap.$content).val('0');
					$('#MoreSearch_btn',jqueryMap.$content).find('i').removeClass('glyphicon-chevron-up');
					$('#MoreSearch_btn',jqueryMap.$content).find('i').addClass('glyphicon-chevron-down');
				}
			});
			//点击查询
			jqueryMap.$content.find(".clickSearch").off('click').on('click',function (){
				configMap.chargeauditGrid.ajax.reload();
			});
			//点击查询
			jqueryMap.$content.find('.Search-btn').off('click').on('click', function () {
				configMap.chargeauditGrid.ajax.reload();
			});
			//输入框绑定回车事件
			 $('[name="searchtxt"]',jqueryMap.$content).keydown(function() {//给输入框绑定按键事件
		        if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
		        	$(".Search-btn",jqueryMap.$content).click();
		        }
			 });
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=log.js
	
	