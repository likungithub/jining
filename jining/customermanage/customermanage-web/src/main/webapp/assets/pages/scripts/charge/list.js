/**
 *
 */
var chargeorderlist = function () {
    'use strict';

    /**
     * 全局属性参数
     * @type {{path: string, dataUrl: string, reminderUrl: string, submitPageUrl: string, splitURL: string,
     *          nowShzt: null, nowddbh: null, nowSfzt: null, auditBtn_html: string, receiptBtn_html: string,
     *          ReminderBtn_html: string, SplitBtn_html: string, deleteBtn_html: string, SFXMUrl: string,
     *          khbm: string, type: string}}
     */
    var configMap = {
        path: '',
        dataUrl: '/charge/chargelist',
        treeUrl: '/organization/organization/orgAndUserAuth',
        reminderUrl:'/charge/reminder',
        deleteCharge: '/charge/delete',
        submitPageUrl: '/charge/submit.jsp',
        splitURL: '/charge/splitcharge',
        badebtsUrl: '/charge/badebts',
        nowShzt:null,
        nowddbh:null,
        nowSfzt:null,
        chargeauditGrid:null,
        auditBtn_html: '<a type="button" name="submit" data-placement="bottom" data-toggle="tooltip"' +
            ' class="icon iconfont icon-tijiaoshenhe btnxystyle iconFontColor-10a0f7 iconFontSize" ' +
            ' title="单个提交审核" style="margin-right: 10px;"></a>',
        receiptBtn_html: '<a type="button" name="chargefile" data-placement="bottom" data-toggle="tooltip"' +
            ' class="icon iconfont icon-fujian btnxystyle iconFontColor-10a0f7 iconFontSize" ' +
            'title="收费附件" style="margin-right: 10px;">' +
            '</a>',
        ReminderBtn_html: '<a type="button" name="remind" data-placement="bottom" data-toggle="tooltip"' +
            ' class="icon iconfont icon-jiaofeitixing btnxystyle iconFontColor-10a0f7 iconFontSize" ' +
            ' title="App支付（注：向App发送支付提醒，提醒后，将无法修改实收金额）" style="margin-right: 10px;"></a>',
        SplitBtn_html: '<a type="button" name="splitcharge" data-placement="bottom" data-toggle="tooltip"' +
            ' class="icon iconfont icon-chaifen btnxystyle iconFontColor-10a0f7 iconFontSize" ' +
            ' title="拆分收费台账" style="margin-right: 10px;"></a>',
        deleteBtn_html: '<a type="button" name="chargedelete" data-placement="bottom" data-toggle="tooltip"' +
            ' class="icon iconfont icon-shanchu3 btnxystyle iconFontColor-10a0f7 iconFontSize"' +
            ' title="删除收费台账" style="margin-right: 10px;"></a>',
        shareBtn_html: '<a type="button" name="shareCharge" data-placement="bottom" data-toggle="tooltip"' +
            ' class="icon iconfont icon-lianjie btnxystyle iconFontColor-10a0f7 iconFontSize"' +
            ' title="分享收费链接" style="margin-right: 10px;"></a>',
        SFXMUrl:'/contract/sfxm',
        historyBtn_html:'<a type="button" name="historyaudit" data-placement="bottom" data-toggle="tooltip"' +
            ' class="icon iconfont icon-lishirenwu btnxystyle iconFontColor-10a0f7 iconFontSize" ' +
            ' title="历史审批记录"></a>',
        showBtn_html: '<a href="javascript:;" class="btn btn-xs default" name="viewinfo"' +
            ' style="margin: 0px;padding: 0px;"><i style="font-size: 12px !important;"' +
            ' class="icon iconfont icon-zhankai- btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        khbm:'',
        type: '',
        classType: '',
        currentSelectedNode: null,
        fwzt: '',
        other: '',
        ifSearch:'0',
        uuid:''
    };

    /**
     * 全局参数
     * @type {{$blockTarget: null, $chargeauditDialog: null, $content: null}}
     */
    var jqueryMap = {
        $blockTarget: null,
        $content:null,
        $manualdata: null,
        $chargeauditDialog: null,
        $setimg:null,
        $chargeTree:null
    };

    /**
     * 全局参数赋值
     * @param uuid
     */
    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#chargeorder_id_div_'+uuid);
        jqueryMap.$manualdata=jqueryMap.$content.find('table#chargeorder_data');
        jqueryMap.$chargeTree = $('#charge_tree'+ uuid, jqueryMap.$content);
    };

    /**
     * 模态框
     * @param title
     *              标题
     * @param url
     *              内容路径
     * @param type
     *              类型
     * @param cursor
     *              点击的游标
     */
    var openModal = function (title, url, type, cursor, reloadtype) {
        var dialogButtons = {
        };
        if (type === 'submit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    submitChargeAudit.saveUserInfo(function (result) {
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
     * 获取当前代理机构的全部收费项目
     */
    var getSFXM = function (){
        $.ajax({
            url: configMap.path + configMap.SFXMUrl,
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
                    $('[name="chargeType"] option',jqueryMap.$content).after(datahtml);
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
                    $('[name="chargezy"] option', jqueryMap.$content).after(datahtml);
                    $('[name="chargezg"] option', jqueryMap.$content).after(datahtml);
                }
            }
        });
    };
    /**
     * 初始化收费台账
     */
    var initchargeauditGrid = function () {
        configMap.chargeauditGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, 																						//屏蔽排序
            "searching": false,																						//屏蔽datatales的查询框
            "processing": true, 																						// 打开数据加载时的等待效果
            "serverSide": true, 																						// 打开后台分页
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
                    var searchtxt = text;
                    var more = $('[name="showflag"]',jqueryMap.$content).val();
                    var auditStatic = $('[name="auditStatic"]',jqueryMap.$content).val();
                    var chargeStatic = $('[name="chargeStatic"]',jqueryMap.$content).val();
                    var chargeType = $('[name="chargeType"]',jqueryMap.$content).val();
                    var chargeModel = $('[name="chargeModel"]',jqueryMap.$content).val();
                    var chargeMode = $('[name="chargeMode"]',jqueryMap.$content).val();
                    //var fwzt = $('[name="fwzt"]',jqueryMap.$content).val();
                    var khbm = configMap.khbm;
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
                    data.khbm = khbm;
                    data.type = configMap.type;
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
                        return '<label title="' + data + '" data-placement="bottom" data-toggle="tooltip" ' +
                            'data-original-title="' + data + '">' + data + '</label>';
                    }
                },
                {
                    "data": "khmc",
                    "render":function (data) {
                        if (configMap.type === 'customerLook') {
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
            "drawCallback": function () { 																			// 数据加载完成后执行
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
     * 获取详细收费订单列表
     * @param index
     * 				当前元素的下标
     */
    var getOrderList = function (index){
        var el = $('[name="OpenAndClose"]:eq('+index+')', jqueryMap.$content);
        var oldtotal = configMap.chargeauditGrid.row(index).data().sjsk;												//原本的总金额
        if(el.hasClass('open')){																						//判断当前操作是打开还是折叠
            getData(index);																								//获取台账详细数据
            var otherIco = $('.display',jqueryMap.$content).not(el);									                //点击展开当前时，关闭其他展开
            $(otherIco,jqueryMap.$content).each(function(){
                $(this).parents('tr').find('td').removeClass('activeTop activeLeft activeRight');				//移除主行tr中td的class样式
                $(this).parents('tr').removeClass('activeClick');													//移除主行tr的class样式
                $(this).removeClass("fa-minus");
                $(this).addClass("fa-plus");                                                                          //修改展开的图标为折叠
                $(this).removeClass("display");
                $(this).addClass("open");                                                                             //设置展开的样式为折叠
                var thisIndex = configMap.chargeauditGrid.cell($(this).parent()).index().row;
                var oldsjsk = configMap.chargeauditGrid.row(thisIndex).data().sjsk;									//获取当前台账的实际收款
                $(this).parents("tr").find('[name="sjsk"]').html(moneySplitByComma(oldsjsk.toFixed(2)));				//还原金额
            });
        } else {																										//折叠详细数据
            el.parents('tr').removeClass('activeClick');																//去掉主行的背景颜色class
            el.parents('tr').find('td').removeClass('activeTop activeLeft activeRight');							//去掉当前行的border样式
            el.removeClass("fa-minus");
            el.removeClass("display");
            el.addClass("fa-plus");
            el.addClass("open");
            $("tr", jqueryMap.$content).remove('.childrow');															//取消展示
            el.parents("tr").find('[name="sjsk"]').html(moneySplitByComma(oldtotal.toFixed(2)));						//还原实际收款金额
        }
    };

    /**
     * 获取收费台账详细数据
     * @param index
     * 				所选元素下标
     */
    var getData = function (index){
        var bgz = configMap.chargeauditGrid.row(index).data().fsbz;                                                  //判断当前合同是否在变更中
        var el = $('[name="OpenAndClose"]:eq('+index+')', jqueryMap.$content);
        // el.parents('tr').find('[name="sjsk"]').html("0.00");
        $("tr", jqueryMap.$content).remove('.childrow');
        el.parents('tr').addClass('activeClick');
        el.parents('td').addClass('activeTop activeLeft');
        el.parents('td').siblings('td').addClass('activeTop');
        $('td:last-child',el.parents('tr')).addClass('activeRight');											    //为当前行的最后一列添加样式
        el.removeClass("fa-plus");
        el.addClass("fa-minus");
        el.removeClass("open");
        el.addClass("display");
        var total = $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html().replace(/,/g,'');			//修改的总金额

        //ajax获取数据
        var htbm = configMap.chargeauditGrid.row(index).data().htbm;                                                 //当前台账的合同编码
        var audit = $('[name="auditStatic"]',jqueryMap.$content).val();                                            //审核状态
        var more = $('[name="showflag"]',jqueryMap.$content).val();                                                //是否展示更多
        var charges = $('[name="chargeStatic"]',jqueryMap.$content).val();                                        //收费状态
        var sfqd = $('[name="paychannel"]', jqueryMap.$content).val();                                             //支付渠道
        var sfr = $('[name="chargezy"]', jqueryMap.$content).val();                                                //收费职员
        if(more === "0"){
            charges = "999";
        }
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/" + htbm + "/" + audit + "/" + charges + "/" + sfqd + "/" + sfr,
            type: "GET",
            success: function (datas) {
                if(datas.length === 0){                                                                                 //判断是否获取到了数据，没有数据则刷新表格
                    configMap.chargeauditGrid.ajax.reload();
                }
                var afterHtml = '';
                var nowdate = new Date();
                var bzxx = '';
                var activebutton = '';
                ///////////////////////////////////////////////////////////////拼接页面开始
                if(datas.length > 0) {
                    afterHtml = '<tr class="childrow"><td colspan="8" class="tableBorder">';
                    for(var i = 0; i<datas.length; i++){
                        activebutton = '';
                        afterHtml += '<table class="childtable" border="1"><tbody>';
                        //复选框
                        afterHtml += '<tr><td rowspan="4" class="text-center cancheck" style="width:15px;">';
                        if (configMap.type === 'customerLook') {
                            afterHtml += '<input type="checkbox" name="checkbox_checkbox" id="' + datas[i].id
                                + '_' + datas[i].shzt_dm + '_' + datas[i].sfzt + '_' + datas[i].ddbh + '" disabled="disabled"/>';
                        } else {
                            if(datas[i].shzt_dm==="003" || datas[i].shzt_dm==="001"){										//判断当前审核状态，已通过审核的或者待审核的收费台账没有操作
                                afterHtml += '<input type="checkbox" name="checkbox_checkbox" id="' + datas[i].id
                                    + '_' + datas[i].shzt_dm + '_' + datas[i].sfzt + '_' + datas[i].ddbh + '" disabled="disabled"/>';
                            } else if(datas[i].sfzt==='005' || datas[i].sfzt==='004'){                                   //判断当前收费状态，收费状态为坏账或者已到账的没有操作
                                afterHtml += '<input type="checkbox" name="checkbox_checkbox" id="' + datas[i].id
                                    + '_' + datas[i].shzt_dm + '_' + datas[i].sfzt + '_' + datas[i].ddbh + '" disabled="disabled"/>';
                            } else {
                                afterHtml += '<input type="checkbox" name="checkbox_checkbox" id="' + datas[i].id
                                    + '_' + datas[i].shzt_dm + '_' + datas[i].sfzt + '_' + datas[i].ddbh + '"/>';
                            }
                        }
                        afterHtml += '</td>';
                        //台账月份
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
                        afterHtml +='<div class="childdivlist">应收：<label name="ysk">' + moneySplitByComma(datas[i].ysk.toFixed(2)) + '</label></div>';
                        //实收
                        afterHtml += '<div class="childdivlist">实收：';
                        if(datas[i].sfzt !== "001" && datas[i].shzt_dm === "000"
                            && (datas[i].ddbh === null || datas[i].ddbh === '')){			                            //未审核并且收费状态不为已收费的台账可以修改金额并且未生成订单编号（向手机端发起了收费提醒）
                            afterHtml += '<input name="' + datas[i].id + '" value="' + datas[i].sjsk.toFixed(2) + '"' +
                                ' type="text" class="sjskje" onchange="chargeorderlist.savemoney(event)">';
                        } else if(datas[i].shzt_dm === "002"){                                                        //审核状态为未通过的台账可以修改金额
                            afterHtml += '<input name="' + datas[i].id + '" value="' + datas[i].sjsk.toFixed(2) + '"' +
                                ' type="text" class="sjskje" onchange="chargeorderlist.savemoney(event)">';
                        } else {                                                                                       //其他状态都不可修改
                            afterHtml += '<label class="sjskje">' + moneySplitByComma(datas[i].sjsk.toFixed(2)) + '</label>';
                        }
                        if($('[name="chargeType"]', jqueryMap.$content).find('option[value="'+datas[i].sfxm_dm+'"]').attr('data') !== "001") {//先判断收费项目是否为一次性业务
                            if (i === datas.length - 1) {																//为最后条收费台账添加按钮（审核状态为未审核或者未通过，并且收费项目不为代理记账的合同）
                                if(FloatSub(datas[i].ysk, FloatAdd(datas[i].sjsk, datas[i].qtsf))>0){
                                    afterHtml += '&nbsp;<a href="javascript:;" class="splitchargeA" name="splitcharge">拆</a>';
                                }
                            }
                        }
                        afterHtml += '</div>';
                        afterHtml += '<div class="childdivlist">优惠：';
                        if(datas[i].sfzt !== "001" && datas[i].shzt_dm === "000"
                            && (datas[i].ddbh === null || datas[i].ddbh === '')){
                            afterHtml += '<input name="' + datas[i].id + '" value="' + datas[i].qtsf.toFixed(2) + '"' +
                                ' type="text" class="yhje" onchange="chargeorderlist.saveyhmoney(event)">';
                        } else if (datas[i].shzt_dm === "002") {
                            afterHtml += '<input name="' + datas[i].id + '" value="' + datas[i].qtsf.toFixed(2) + '"' +
                                ' type="text" class="yhje" onchange="chargeorderlist.saveyhmoney(event)">';
                        } else {
                            afterHtml += '<label class="yhje">' + moneySplitByComma(datas[i].qtsf.toFixed(2)) + '</label>';
                        }
                        afterHtml += '</div>';
                        //支付渠道
                        if(datas[i].zffs_mc !== null && datas[i].zffs_mc !== ""){
                            afterHtml += '<div class="childdivlist">' + datas[i].zffs_mc + '</div>';
                        } else {
                            afterHtml += '<div class="childdivlist hiddendiv"></div>';
                        }
                        //操作按钮
                        afterHtml += '<div class="childdivlist" name="activebutton">';
                        /**
                         * 审核按钮：审核状态为未审核或者不通过时出现审核按钮
                         * 提醒按钮：审核状态为未审核，收费状态为未收费状态时出现提醒按钮（因为未收费不可能出现已到账状态，所以不需要判断收费状态是否为已到账）
                         * 拆分按钮：收费项目为一次性收费的最后一条收费信息出现拆分按钮
                         * 删除按钮：出现了拆分按钮就会出现删除按钮
                         * 附件按钮：订单编号不为空时出现附件按钮（收了费准备提交或者已经提交）
                         */
                        if(datas[i].shzt_dm === "000"){
                            activebutton += configMap.auditBtn_html;
                            // if(datas[i].sfzt !== "001"){
                            //     activebutton += configMap.ReminderBtn_html;
                            // }
                        } else if (datas[i].shzt_dm === "002") {
                            activebutton += configMap.auditBtn_html;
                        }
                        if($('[name="chargeType"]', jqueryMap.$content).find('option[value="'+datas[i].sfxm_dm+'"]').attr('data') !== "001") {//先判断收费项目是否为一次性业务
                            if (i === datas.length - 1) {																//为最后条收费台账添加按钮（审核状态为未审核或者未通过，并且收费项目不为代理记账的合同）
                                if(FloatSub(datas[i].ysk, FloatAdd(datas[i].sjsk, datas[i].qtsf))>0){
                                    activebutton += configMap.SplitBtn_html;
                                }
                            }
                            if (i > 0 && i === datas.length - 1) {														//为拆分出的收费台账添加删除按钮
                                if(datas[i].sfzt !== '001' && datas[i].sfzt !== '004'){
                                    activebutton += configMap.deleteBtn_html;
                                }
                            }
                        }
                        if(datas[i].ddbh !== null&&datas[i].ddbh !== ""){                                             //收费附件和生成收费链接
                            activebutton += configMap.receiptBtn_html;
                            if(datas[i].sfzt != "001" && datas[i].sfzt != "004"){ //不是已收费
                                activebutton += configMap.shareBtn_html;
                            }
                        }
                        activebutton += configMap.historyBtn_html;
                        if(datas[i].sfzt === '005'){                                                                   //收费状态为坏账时无操作
                            activebutton = '';
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
                        //订单编号
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
                        //优惠金额
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
                if(bgz === 1){
                    $('.childrow input[name="checkbox_checkbox"]', jqueryMap.$content).prop('disabled', true);
                    $('.childrow input[type="text"]', jqueryMap.$content).prop('readonly', true);
                    $('[name="activebutton"]', jqueryMap.$content).html('<label style="color: red">当前合同变更中！</label>');
                }
                ///////////////////////////////////////////////////////////////拼接页面完成
                $('[data-toggle="tooltip"]', jqueryMap.$content).tooltip();                                       //提示框
                var submitContainer = $('[name="submit"]',jqueryMap.$content);                                      //提交收费审核
                var remindContainer = $('[name="remind"]',jqueryMap.$content);                                      //发送收费提醒
                var FileContainer = $('[name="chargefile"]',jqueryMap.$content);                                   //收费附件
                var splitContainer = $('[name="splitcharge"]',jqueryMap.$content);                                 //拆分收费台账
                var deleteContainer = $('[name="chargedelete"]',jqueryMap.$content);                               //删除拆分台账
                var shareContainer = $('[name="shareCharge"]',jqueryMap.$content);                                 //生成收费链接
                var historyContainer = $('[name="historyaudit"]',jqueryMap.$content);                              //历史审批记录
                var viewContainer = $('[name="viewinfo"]', jqueryMap.$content);                                    //查看收费详情
                if(submitContainer.length > 0){                                                                        //提交收费审核
                    submitContainer.off('click').on('click',function(){
                        stopContinueClick(this, 300);
                        var id = $(this).parents('.childtable').find('[name="checkbox_checkbox"]')
                            .attr("id").split("_")[0];
                        var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));     //获取当前收费台账的主行下标
                        sendOrderAudit(id, cursor);
                    })
                }
                if(remindContainer.length>0){                                                                          //发送收费提醒
                    remindContainer.confirmation({
                        "title": '确定发送App支付提醒？',
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
                        stopContinueClick(this, 300);
                        var ddbh = $(this).parents('.childtable').find('[name="ddbh"]').html();
                        var dialogButtons = {
                        };
                        dialogButtons.cancel = {
                            label: '<i class="fa fa-times"></i>关&nbsp;闭',
                            className: "btn btn btn-default borderRadius4"
                        };
                        $.get(configMap.path+"/charge/addfile.jsp?id=" + ddbh, function (html) {
                            jqueryMap.$setimg = bootbox.dialog({
                                title: '添加附件',
                                message: html,
                                buttons: dialogButtons
                            });
                        });
                    })
                }
                if(splitContainer.length>0){
                    splitContainer.off('click').on('click',function () {
                        stopContinueClick(this, 300);
                        var a = $(this);
                        splitCharge(a);
                    });
                }
                if(deleteContainer.length>0){
                    deleteContainer.confirmation({
                        "title": '确定删除台账？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "btnOkClass": 'btn btn-sm btn-danger mr borderRadius4',
                        "btnCancelClass": 'btn btn-sm btn-default borderRadius4',
                        "placement": 'left',
                        "container": 'body',
                        "onConfirm": deletecharge
                    });
                }
                //生成收费链接
                if(shareContainer.length>0){
                    shareContainer.off('click').on('click',function(){
                        stopContinueClick(this, 300);
                        var ddbh = $(this).parents('.childtable').find('[name="ddbh"]').html();
                        var dialogButtons = {
                        };

                        dialogButtons.cancel = {
                            label: '<i class="fa fa-times"></i>关&nbsp;闭',
                            className: "btn btn btn-default borderRadius4"
                        };
                        $.get(configMap.path+"/charge/shareLink.jsp?id=" + ddbh, function (html) {
                            jqueryMap.$setimg = bootbox.dialog({
                                title: '账单链接',
                                message: html,
                                buttons: dialogButtons
                            });
                        });
                    })
                }
                if(historyContainer.length>0){
                    historyContainer.off('click').on('click',function(){
                        stopContinueClick(this, 300);
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
                configMap.nowShzt = null;
                configMap.nowddbh = null;
                configMap.nowSfzt = null;
                $('.cancheck', jqueryMap.$content).off('click').on('click',function(e){
                    // total = $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html().replace(/,/g,'');
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
                            var n = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content).length;			    //获取当前被选中的元素数量
                            if(parentele.find('[name="checkbox_checkbox"]').is(":checked")){
                                if(n === 1){
                                    configMap.nowShzt = shzt;
                                    configMap.nowddbh = ddbh;
                                    configMap.nowSfzt = sfzt;

                                    // if(parentele.find('.sjskje').val() !== undefined&&parentele.find('.sjskje').val() !== ""){
                                    //     total = FloatAdd(total,parentele.find('.sjskje').val().replace(/,/g,''));
                                    // } else {
                                    //     total = FloatAdd(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                    // }
                                    $('[name="checkbox_checkbox"]:not(:disabled)',jqueryMap.$content).each(function(){
                                        if($(this).attr("id").split("_")[1] === configMap.nowShzt &&
                                            $(this).attr("id").split("_")[2] === configMap.nowSfzt &&
                                            $(this).attr("id").split("_")[3]===configMap.nowddbh){
                                            $(this).prop("checked", true);
                                            if($(this).parents('.childtable').find('.sjskje').val() !== undefined &&
                                                $(this).parents('.childtable').find('.sjskje').val() !== ""){
                                                total = FloatAdd(total,$(this).parents('.childtable').find('.sjskje').val().replace(/,/g,''));
                                            } else {
                                                total = FloatAdd(total,$(this).parents('.childtable').find('.sjskje').html().replace(/,/g,''));
                                            }
                                        }
                                    });
                                    $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));

                                    // if(parentele.find('.sjskje').val() !== undefined&&parentele.find('.sjskje').val() !== ""){
                                    //     total = FloatAdd(total,parentele.find('.sjskje').val().replace(/,/g,''));
                                    // } else {
                                    //     total = FloatAdd(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                    // }
                                    // $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));
                                } else {
                                    if(parentele.find('.sjskje').val() !== undefined&&parentele.find('.sjskje').val() !== ""){
                                        total = FloatAdd(total,parentele.find('.sjskje').val().replace(/,/g,''));
                                    } else {
                                        total = FloatAdd(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                    }
                                    $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));
                                }
                            } else {
                                if(parentele.find('.sjskje').val() !== undefined&&parentele.find('.sjskje').val() !== ""){
                                    total = FloatSub(total,parentele.find('.sjskje').val().replace(/,/g,''));
                                } else {
                                    total = FloatSub(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                }
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
                jqueryMap.$content.find('[name="checkbox_checkbox"]').change(function (){
                    // total = $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html().replace(/,/g,'');
                    var ele = $(this);
                    var parentele = ele.parents('.childtable');
                    var id = ele.attr("id").split("_")[0];
                    var shzt = ele.attr("id").split("_")[1];
                    var sfzt = ele.attr("id").split("_")[2];
                    var ddbh = ele.attr("id").split("_")[3];
                    if (configMap.nowShzt !== null && shzt !== configMap.nowShzt) {                                  //如果当前选择的审核状态与原本选中的审核状态不相同
                        Messenger().post({
                            message: "请选择同一个合同下，相同状态、相同单号的收费订单！",
                            type: 'error',
                            id:"ordermessenger"
                        });
                        ele.prop('checked',false);
                    } else if (configMap.nowddbh !== null && ddbh !== configMap.nowddbh) {                          //如果当前选择的订单编号与原本选中的订单编号不相同
                        Messenger().post({
                            message: "请选择同一个合同下，相同状态、相同单号的收费订单！",
                            type: 'error',
                            id:"ordermessenger"
                        });
                        ele.prop('checked',false);
                    } else if (configMap.nowSfzt !== null && sfzt !== configMap.nowSfzt) {                          //如果当前选择的收费状态与原本选中的收费状态不相同
                        Messenger().post({
                            message: "请选择同一个合同下，相同状态、相同单号的收费订单！",
                            type: 'error',
                            id:"ordermessenger"
                        });
                        ele.prop('checked',false);
                    } else {
                        var n = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content).length;			    //获取当前被选中的元素数量
                        if(ele.is(":checked")){
                            if(n === 1){
                                configMap.nowShzt = shzt;
                                configMap.nowddbh = ddbh;
                                configMap.nowSfzt = sfzt;
                                // if(parentele.find('.sjskje').val() !== undefined&&parentele.find('.sjskje').val() !== ""){
                                //     total = FloatAdd(total,parentele.find('.sjskje').val().replace(/,/g,''));
                                // } else {
                                //     total = FloatAdd(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                // }

                                $('[name="checkbox_checkbox"]:not(:disabled)',jqueryMap.$content).each(function(){
                                    if($(this).attr("id").split("_")[1] === configMap.nowShzt &&
                                        $(this).attr("id").split("_")[2] === configMap.nowSfzt &&
                                        $(this).attr("id").split("_")[3]===configMap.nowddbh){
                                        $(this).prop("checked", true);
                                        if($(this).parents('.childtable').find('.sjskje').val() !== undefined &&
                                            $(this).parents('.childtable').find('.sjskje').val() !== ""){
                                            total = FloatAdd(total,$(this).parents('.childtable').find('.sjskje').val().replace(/,/g,''));
                                        } else {
                                            total = FloatAdd(total,$(this).parents('.childtable').find('.sjskje').html().replace(/,/g,''));
                                        }
                                    }
                                });
                                $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));
                            } else {
                                if(parentele.find('.sjskje').val() !== undefined&&parentele.find('.sjskje').val() !== ""){
                                    total = FloatAdd(total,parentele.find('.sjskje').val().replace(/,/g,''));
                                } else {
                                    total = FloatAdd(total,parentele.find('.sjskje').html().replace(/,/g,''));
                                }
                                $('.activeClick', jqueryMap.$content).find('[name="sjsk"]').html(moneySplitByComma(total.toFixed(2)));
                            }
                        } else {
                            if(parentele.find('.sjskje').val() !== undefined&&parentele.find('.sjskje').val() !== ""){
                                total = FloatSub(total,parentele.find('.sjskje').val().replace(/,/g,''));
                            } else {
                                total = FloatSub(total,parentele.find('.sjskje').html().replace(/,/g,''));
                            }
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
     * 提交审核
     * @param id
     * @param cursor
     */
    var sendOrderAudit = function (id, cursor){
        openModal("提交审核", configMap.path + configMap.submitPageUrl + "?id=" + encodeURI(id) + "&type=send", 'submit', cursor);
    };

    /**
     * 修改为坏账
     */
    var badebts = function (){
        var idEvent = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content);
        var idStr = '';
        var flag = "";
        $(idEvent).each(function () {
            idStr += flag + $(this).attr('id').split('_')[0];
            flag = ',';
        });
        var data = {
            idstr:idStr
        };
        $.ajax({
            url: configMap.path+configMap.badebtsUrl,
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                if(result.success){
                    Messenger().post({
                        message: "修改成功",
                        type: 'info',
                        id:"ordermessenger"
                    });
                    configMap.chargeauditGrid.ajax.reload();
                }else{
                    Messenger().post({
                        message: result.message,
                        type: 'error',
                        id:"ordermessenger"
                    });
                }
            }
        });
    };

    /**
     * 单个收费订单发送收费提醒，获取订单的id
     * @param event
     * @param element
     */
    var getid = function (event,element){
        var id = $(element).parents('.childtable').find('[name="checkbox_checkbox"]').attr("id").split("_")[0];
        var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));
        remindercharge(id, cursor);
    };

    /**
     * 多条收费订单发送收费提醒，获取订单id
     */
    var getAllid = function (){
        var idEvent = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content);
        var idStr = '';
        var flag = "";
        $(idEvent).each(function (){
            idStr += flag + $(this).attr("id").split("_")[0];
            flag = ",";
        });
        var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));                     //获取当前所选的收费台账的主行下标
        remindercharge(idStr, cursor);
    };

    /**
     * 提醒缴费
     * @param id
     *              收费台账id
     * @param cursor
     *              主行游标
     */
    var remindercharge = function (id, cursor){
        var data = {
            id:id
        };
        var blockTarget = jqueryMap.$content.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在发送提醒...'
        });
        $.ajax({
            url: configMap.path + configMap.reminderUrl,
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (datas) {
                App.unblockUI(blockTarget);
                if(datas.success){
                    Messenger().post({
                        message: "发送提醒成功！",
                        type: 'info',
                        id:"ordermessenger"
                    });
                    insertMessage(data);                                                                                //发送极光推送
                }else{
                    Messenger().post({
                        message: datas.message,
                        type: 'error',
                        id:"ordermessenger"
                    });
                }
                getData(cursor);
            }
        });
    };

    /**
     * 发送极光推送
     * @param data
     */
    var insertMessage = function (data){
        $.ajax({
            url: configMap.path + '/charge/insertMessage',
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (datas) {
            }
        });
    };

    /**
     * 拆分收费台账
     * @param e
     *              点击元素
     */
    var splitCharge = function (e){
        var el = e;
        $('.splitchargeA').addClass('display-hide');
        var parentel = el.parents('.childtable');                                                                    //父级元素
        var id = parentel.find('[name="checkbox_checkbox"]').attr("id").split("_")[0];
        var oldMoney = parentel.find('[name="ysk"]').html().replace(/,/g, "");							            //获取要拆分的收费信息的应收金额（常量，不会再改动，用于计算）
        var yskhtml = parentel.find('[name="ysk"]');                                                                 //应收款的html（用于修改后获取应收金额）
        var oldSSJE;									                                                                //获取要拆分的收费信息的实际收费金额
        if(parentel.find('.sjskje').val()===undefined||parentel.find('.sjskje').val()===""){
            oldSSJE = parentel.find('.sjskje').html().replace(/,/g, "");
        } else {
            oldSSJE = parentel.find('.sjskje').val().replace(/,/g, "");
        }
        var yhje;                                                                                                       //获取优惠金额
        if(parentel.find('.yhje').val()===undefined||parentel.find('.yhje').val()===""){
            yhje = parentel.find('.yhje').html().replace(/,/g, "");
        } else {
            yhje = parentel.find('.yhje').val().replace(/,/g, "");
        }
        var splitMoney = 0;                                                                                             //拆分出来的金额
        if(FloatSub(oldMoney, FloatAdd(oldSSJE,yhje))>0){                                                               //计算拆分金额（如果应收大于实收，用应收减实收，否则为0）
            splitMoney = FloatSub(oldMoney, FloatAdd(oldSSJE,yhje));
        }
        if(Number(oldMoney)>=Number(oldSSJE)){
            parentel.find('[name="ysk"]').html(moneySplitByComma(FloatAdd(oldSSJE,yhje).toFixed(2)));		            //设置原本的应收金额为实收金额
        }
        var trHtml = '<table class="childtable" border="1">' + parentel.html() + '</table>';
        $('.childrow button').css('display','none');                                                               //将所有按钮隐藏
        el.parents('.childrow').find('.tableBorder').append(trHtml);												//复制数据
        var buttonHtml = '<button class="ta btn btn-xs btnBlue btnBorderColor colorfff borderRadius4 savesplit"' +
            ' data-placement="left" type="button" data-toggle="tooltip" data-original-title="保存" ' +
            'title="保存"><i class="fa fa-save iconFontColor-10a0f7 fontSize-16"></i></button>';
        var cancelHtml = '<button class="ta btn btn-xs btnBlue btnBorderColor colorfff borderRadius4 cancelsplit"' +
            ' data-placement="left" type="button" data-toggle="tooltip" data-original-title="取消" ' +
            'title="取消"><i class="fa fa-times iconFontColor-10a0f7 fontSize-16"></i></button>';
        var yshtml = '应收：<label name="splitysje" class="splitysje">' + splitMoney.toFixed(2) + '</label>';
        var sshtml = '实收：<input type="text" class="splitss" value="' + splitMoney.toFixed(2) + '" name="splitssje">';
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(0)').find('td:eq(1)').find('div:eq(2)').addClass('hiddendiv');
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(0)').find('td:eq(1)').find('div:eq(3)').addClass('hiddendiv');
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(0)').find('td:eq(1)').find('div:eq(4)').html(yshtml);
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(0)').find('td:eq(1)').find('div:eq(5)').html(sshtml);
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(0)').find('td:eq(1)').find('div:eq(7)').addClass('hiddendiv');
        //////////////////////////////////////////////////////////////初始化数值开始
        // $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(0)').find('td:eq(1)').find('div:eq(0)').find('i').remove();
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(1)').find('td:eq(0)').html('审核状态：未审核');
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(1)').find('td:eq(1)').html('收费人：暂无');
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(1)').find('td:eq(2)').html('支付渠道：暂无');
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(2)').find('td:eq(0)').html('收费状态：未收费');
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(2)').find('td:eq(1)').html('收费说明：暂无');
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(3)').find('td:eq(0)').html('到账状态：未到账');
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('tr:eq(3)').find('td:eq(1)').html('审核意见：暂无');
        //////////////////////////////////////////////////////////////初始化数值结束
        $('.childrow', jqueryMap.$content).find('.childtable:last').find('[name="activebutton"]')		        //将新增行的最后一列的按钮换成保存按钮和删除按钮
            .html(buttonHtml + cancelHtml);
        $('[data-toggle="tooltip"]', jqueryMap.$content).tooltip();                                              //title提示
        $('.cancelsplit', jqueryMap.$content).off('click').on('click',function () {                              //取消拆分
            var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));                 //获取当前收费台账的主行下标
            getData(cursor);
        });
        $('[name="viewinfo"]', jqueryMap.$content).off('click').on('click', function(){
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
        $('[name="splitysje"]', jqueryMap.$content).on('change', function(){                                     //修改应收金额同时修改要拆分的收费信息的应收金额
            if (!whetherOrNotMoney($(this).val())) {	                                                                //检验输入是否为正确的金额
                Messenger().post({
                    message: "请输入正确的金额",
                    type: 'error',
                    id:"ordermessenger"
                });
                $(this).val(FloatSub(oldMoney, yskhtml.html().replace(/,/g, "")).toFixed(2));
                $('[name="splitssje"]').val(FloatSub(oldMoney, yskhtml.html().replace(/,/g, "")).toFixed(2));
            } else {
                if(Number($(this).val())>FloatSub(oldMoney,yhje)){				                                        //如果输入金额大于原本的金额
                    $(this).val(FloatSub(oldMoney, yskhtml.html().replace(/,/g, "")).toFixed(2));
                    $('[name="splitssje"]', jqueryMap.$content).val(FloatSub(oldMoney, yskhtml.html().replace(/,/g, "")).toFixed(2));
                } else {															                                    //输入金额小于原本的金额
                    parentel.find('[name="ysk"]').html(FloatSub(oldMoney,$(this).val()).toFixed(2));
                    parentel.find('.sjskje').val(FloatSub(yskhtml.html().replace(/,/g, ""), yhje).toFixed(2));
                    $('[name="splitssje"]', jqueryMap.$content).val(Number($(this).val()).toFixed(2));
                }
            }
        });
        $('[name="splitssje"]', jqueryMap.$content).on('change', function(){                                     //修改实收金额
            if (!whetherOrNotMoney($(this).val())) {
                Messenger().post({
                    message: "请输入正确的金额",
                    type: 'error',
                    id:"ordermessenger"
                });
                $(this).val($('[name="splitysje"]', jqueryMap.$content).val());
            }
        });
        $('.savesplit',jqueryMap.$content).off('click').on('click',function(){                                   //保存拆分
            var oldss = parentel.find('.sjskje').val();
            if(oldss===undefined || oldss===""){
                oldss = parentel.find('.sjskje').html().replace(/,/g, "");
            }
            var data = {
                id: id,
                oldys: yskhtml.html().replace(/,/g, ""),
                oldss: oldss,
                splitys: $('[name="splitysje"]', jqueryMap.$content).html().replace(/,/g, ""),
                splitss: $('[name="splitssje"]', jqueryMap.$content).val()
            };
            $.ajax({
                url: configMap.path + configMap.splitURL,
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (datas) {
                    if(datas.success){
                        Messenger().post({
                            message: "拆分成功！",
                            type: 'info',
                            id:"ordermessenger"
                        });
                    }else{
                        Messenger().post({
                            message: datas.message,
                            type: 'error',
                            id:"ordermessenger"
                        });
                    }
                    var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));         //获取当前收费台账的主行下标
                    getData(cursor);                                                                                    //重新获取子行数据
                }
            });
        });
    };

    /**
     * 删除收费台账（只针对于拆分台账）
     * @param event
     * @param element
     */
    var deletecharge = function (event,element){
        var parentel = $(element).parents(".childtable");
        var thisid = parentel.find('[name="checkbox_checkbox"]').attr("id").split("_")[0];
        var lastid = parentel.prev().find('[name="checkbox_checkbox"]').attr("id").split("_")[0];                 //返回拆分前的收费台账id（原收费台账的id），一般情况是当前选择的台账的上一条
        var data = {
            thisid:thisid,
            lastid:lastid
        };
        $.ajax({
            url: configMap.path + configMap.deleteCharge,
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (datas) {
                if(datas.success){
                    Messenger().post({
                        message: "操作成功！",
                        type: 'info',
                        id:"ordermessenger"
                    });
                }else{
                    Messenger().post({
                        message: datas.message,
                        type: 'error',
                        id:"ordermessenger"
                    });
                }
                var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));             //获取当前收费台账的主行下标
                getData(cursor);                                                                                        //添加新的子行数据
            },
            error: function () {
            }
        });
    };

    /**
     * 修改实收金额
     * @param money
     * @param yhmoney
     * @param id
     */
    var updateMoney = function (money, yhmoney, id, ysmoney){
        var data = {
            money: money,
            yhmoney: yhmoney,
            id:id,
            ysmoney: ysmoney
        };
        $.ajax({
            url: configMap.path+configMap.dataUrl,
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            async: false,                                                                                             //ajax异步
            data: JSON.stringify(data),
            success: function (result) {
                if(result.success){
                    Messenger().post({
                        message: "修改成功",
                        type: 'info',
                        id:"ordermessenger"
                    });
                }else{
                    Messenger().post({
                        message: result.message,
                        type: 'error',
                        id:"ordermessenger"
                    });
                }
            }
        });
    };

    var hideDialog = function () {
        if (jqueryMap.$setimg != null) {
            jqueryMap.$setimg.modal('hide');
        }
    };

    var initOrganization = function () {
        var jstree = jqueryMap.$chargeTree.jstree({
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
            $('#charge_tree' + configMap.uuid).on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            getTreeNum();
            $("#charge_tree" + configMap.uuid).bind("select_node.jstree", function (e, data) {

                if (data.node.id == 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        $('#charge_tree' + configMap.uuid).jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });


        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#charge_tree" + configMap.uuid + " li").length; i++) {
                var $temp = $("#charge_tree" + configMap.uuid + " li").eq(i).attr("userimg");
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

        jqueryMap.$chargeTree.on('select_node.jstree', function (e, data) {
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
                    jqueryMap.$content.find(".reminder").prop('disabled', false);
                    jqueryMap.$content.find(".baddebts").prop('disabled', false);
                } else { //停止的
                    jqueryMap.$content.find(".adoptAll").prop('disabled', true);
                    jqueryMap.$content.find(".reminder").prop('disabled', true);
                    jqueryMap.$content.find(".baddebts").prop('disabled', true);
                }
            } else if (data.node.li_attr.BMBZ === "1") { //部门标志为true，代表为部门
                configMap.fwzt = 1; //正在服务的
                configMap.classType = 2; //代表部门
                configMap.other = data.node.li_attr.bmdm; //部门代码
                jqueryMap.$content.find(".adoptAll").prop('disabled', false);
                jqueryMap.$content.find(".reminder").prop('disabled', false);
                jqueryMap.$content.find(".baddebts").prop('disabled', false);
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
                jqueryMap.$content.find(".reminder").prop('disabled', false);
                jqueryMap.$content.find(".baddebts").prop('disabled', false);
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
        $('#search_Chargeay'+ configMap.uuid).keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_Chargeay'+ configMap.uuid).val());
            }, 250);
        });

    };

    return {
        init: function (uuid, type, khbm) {
            setJqueryMap(uuid);
            configMap.uuid = uuid;
            if (type !== 'customerLook') { 																			//客户列表
                var tabid=$('#chargeorder_id_div_'+uuid).parents('.tab-pane').attr('id').slice(17);
                tabMenu(tabid,chargeorderlist);
            }
            configMap.khbm = khbm;																						//客户编码，从客户列表点进该页面时，根据客户编码查询数据，否则查询全部数据
            configMap.type = type;																						//判断当前页面将展示什么类型的数据
            if (type === 'CFTX') { 																					//点击催费提醒进入收费台账页面
                $('[name="auditStatic"]',jqueryMap.$content).val("999"); 											//审核状态，全部
                $('[name="chargeStatic"]',jqueryMap.$content).val("003"); 										//催费状态
            }
            if (type === 'QFTX') { 																					//点击欠费提醒进入收费台账页面
                $('[name="auditStatic"]',jqueryMap.$content).val("999"); 											//审核状态，全部
                $('[name="chargeStatic"]',jqueryMap.$content).val("002"); 										//催费状态
            }
            if (type === 'customerLook') { 																			//从客户列表中客户信息中进入收费台账页面
                $('[name="auditStatic"]',jqueryMap.$content).val("999"); 											//审核状态，全部
            }
            getSFXM();																									//获取当前代理机构的收费项目
            getPAYCHANNEL();                                                                                            //获取当前代理机构的所有支付渠道
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

            jqueryMap.$content.find('#MoreSearch_btn').off('click').on('click',function (){                     //展示更多查询条件按钮
                var showflag = $('[name="showflag"]',jqueryMap.$content).val();
                if(showflag === "0"){
                    $("#MoreSearch_btn",jqueryMap.$content).next().removeClass("rotate1");
                    $("#moreSearchDiv",jqueryMap.$content).show(500);
                    $('[name="showflag"]',jqueryMap.$content).val('1');
                    $('#MoreSearch_btn',jqueryMap.$content).find('i').removeClass('glyphicon-chevron-down');
                    $('#MoreSearch_btn',jqueryMap.$content).find('i').addClass('glyphicon-chevron-up');
                } else {
                    $("#MoreSearch_btn",jqueryMap.$content).next().addClass("rotate1");
                    $("#moreSearchDiv",jqueryMap.$content).hide(500);
                    $('[name="showflag"]',jqueryMap.$content).val('0');
                    $('#MoreSearch_btn',jqueryMap.$content).find('i').removeClass('glyphicon-chevron-up');
                    $('#MoreSearch_btn',jqueryMap.$content).find('i').addClass('glyphicon-chevron-down');
                }
            });
            initchargeauditGrid();																						//初始化收费台账表格
            jqueryMap.$content.find('.Search-btn').off('click').on('click', function () {                        //点击查询
                configMap.ifSearch = '1';
                configMap.chargeauditGrid.ajax.reload();
            });
            jqueryMap.$content.find(".adoptAll").off('click').on('click', function (){                           //批量提交审核
                var idSize = $('[name="checkbox_checkbox"]:checked', jqueryMap.$content).length;
                if(idSize === 0){
                    Messenger().post({
                        message: "请选择收费订单！",
                        type: 'error',
                        id:"ordermessenger"
                    });
                } else {
                    stopContinueClick(this, 300);
                    var idEvent = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content);
                    var idStr = '';
                    var flag = "";
                    var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));
                    $(idEvent).each(function (){
                        idStr += flag + $(this).attr("id").split("_")[0];
                        flag = ",";
                    });
                    sendOrderAudit(idStr, cursor);
                }
            });
            jqueryMap.$content.find(".reminder").off('click').on('click',function (){                            //提醒缴费
                var idSize = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content).length;
                if(idSize === 0){
                    Messenger().post({
                        message: "请选择收费订单！",
                        type: 'error',
                        id:"ordermessenger"
                    });
                } else {
                    var idEvent = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content);
                    var type = false;
                    $(idEvent).each(function (){
                        if($(this).attr("id").split("_")[1] !== "000"){                                              //如果审核状态不为未审核
                            type=true;
                        }
                    });
                    if(type){
                        Messenger().post({
                            message: "请选择未审核,未收费的收费订单！",
                            type: 'error',
                            id:"ordermessenger"
                        });
                    } else {
                        jqueryMap.$content.find(".hiddenadoptAll").trigger('click');
                    }
                }
            });
            jqueryMap.$content.find(".hiddenadoptAll").confirmation({
                "title": '确定发送App支付提醒？',
                "btnOkLabel": '是',
                "btnCancelLabel": '否',
                "btnOkClass": 'btn btn-sm btn-danger mr borderRadius4',
                "btnCancelClass": 'btn btn-sm btn-default borderRadius4',
                "placement": 'bottom',
                "container": 'body',
                "onConfirm": getAllid
            });
            jqueryMap.$content.find('.baddebts').off('click').on('click',function(){                             //坏账按钮
                var checknum = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content).length;
                if(checknum===0){
                    Messenger().post({
                        message: "请选择收费台账！",
                        type: 'error',
                        id:"ordermessenger"
                    });
                } else {
                    jqueryMap.$content.find(".hiddenbadebts").trigger('click');
                }
            });
            jqueryMap.$content.find('.hiddenbadebts').confirmation({
                "title": '确定修改为坏账？',
                "btnOkLabel": '是',
                "btnCancelLabel": '否',
                "btnOkClass": 'btn btn-sm btn-danger mr borderRadius4',
                "btnCancelClass": 'btn btn-sm btn-default borderRadius4',
                "placement": 'bottom',
                "container": 'body',
                "onConfirm": badebts
            });

            $(".question", jqueryMap.$content).hover(function () {                                                  //操作流程
                $(".procedure", jqueryMap.$content).show();
            },function () {
                $(".procedure", jqueryMap.$content).hide();
            });

            $('[name="searchtxt"]',jqueryMap.$content).keydown(function() {										//输入框绑定回车事件
                if(event.keyCode == "13") {																			//判断如果按下的是回车键
                    $(".Search-btn",jqueryMap.$content).click();
                }
            });
        },

        setPath: function (path) {
            configMap.path = path;
        },

        /**
         * 修改实际收费金额
         */
        savemoney:function(e){
            var el = $(e.target);
            var money = el.val();                                                                                       //输入的金额
            var parentel = el.parents('.childtable');                                                                 //当前修改的父级表格
            var id = el.attr("name");                                                                                  //获取当前选择的收费台账的id
            var ysk = parentel.find('[name="ysk"]').html().replace(/,/g,"");                                         //获取当前收费台账的应收款,去掉千位符
            var sfxmdm = $('.activeClick', jqueryMap.$content).find('[name="sfxmdm"]').attr("data");             //获取当前修改的收费项目代码
            var sflxdm = $('[name="chargeType"]', jqueryMap.$content).find('option[value="'+sfxmdm+'"]').attr('data');  //获取当前修改的收费项目的业务类型是一次性收费还是常规服务收费
            var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));                 //获取当前所选的收费台账的主行下标
            var yhmoney = 0;
            if (!whetherOrNotMoney(money)) {                                                                            //校验输入金额
                Messenger().post({
                    message: "请输入正确的金额",
                    type: 'error',
                    id:"ordermessenger"
                });
                el.val(ysk);
            } else {																									//更新实际收费金额
                yhmoney = FloatSub(ysk, money);
                if(yhmoney<=0){
                    yhmoney = 0;
                }
                if(sflxdm==="001"){                                                                                    //常规收费
                    updateMoney(money, yhmoney, id, -1);
                    getData(cursor);
                } else {
                    if(Number(money)>Number(ysk)){                                                                     //提示用户是否将金额同步到合同，是：直接保存收费金额数据，然后同步合同，否：直接保存金额
                        bootbox.confirm({
                            title: "提醒",
                            message: "当前订单实际金额大于应收金额，请确认是否同步到合同？<p class='fontcolor_999'>备注信息：当实收金额小于应收金额时需要确认是否属于优惠金额，如果是优惠金额，则将优惠的金额自动填充到优惠输入框中；如果是非优惠金额则该订单将会产生拆分项。</p>",
                            buttons: {
                                confirm: {
                                    label: '<i class="fa fa-times"></i> 否',
                                    className: "btn btn-default borderRadius4 "
                                },
                                cancel: {
                                    label: '<i class="fa fa-check"></i> 是',
                                    className: "btn btnBlue borderRadius4 colorfff"
                                }
                            },
                            callback: function (result) {
                                if (!result){                                                                           //确定
                                    updateMoney(money, yhmoney, id, money);
                                    configMap.chargeauditGrid.ajax.reload(null, false);                            //刷新页面表格
                                } else {
                                    updateMoney(money, yhmoney, id, -1);
                                    getData(cursor);
                                }
                            }
                        });
                    } else if(Number(money)<Number(ysk)) {                                                             //提示用户是否拆分收费台账，是：拆分收费台账，否：保存收费金额，剩余的计算为优惠金额
                        bootbox.confirm({
                            title: "提醒",
                            message: "当前订单实收金额小于应收金额，请确认是否有优惠？<p class='fontcolor_999'>备注信息：当实收金额小于应收金额时需要确认是否属于优惠金额，如果是优惠金额，则将优惠的金额自动填充到优惠输入框中；如果是非优惠金额则该订单将会产生拆分项。</p>",
                            buttons: {
                                confirm: {
                                    label: '<i class="fa fa-times"></i> 否',
                                    className: "btn btn-default borderRadius4 "
                                },
                                cancel: {
                                    label: '<i class="fa fa-check"></i> 是',
                                    className: "btn btnBlue borderRadius4 colorfff"
                                }
                            },
                            callback: function (result) {
                                if (!result){                                                                           //确定
                                    updateMoney(money, yhmoney, id, -1);
                                    getData(cursor);
                                } else {
                                    updateMoney(money, 0, id, -1);
                                    getData(cursor);
                                }
                            }
                        });
                    } else {
                        updateMoney(money, yhmoney, id, -1);
                        getData(cursor);
                    }
                }
            }
        },

        /**
         * 修改优惠金额
         * @param e
         */
        saveyhmoney: function (e){
            var cursor = $('tbody tr[role="row"]',jqueryMap.$content).index($('.activeClick', jqueryMap.$content));
            var el = $(e.target);
            var money = el.val();
            var id = el.attr("name");                                                                                  //获取当前选择的收费台账的id
            var parentel = el.parents('.childtable');
            var sfxmdm = $('.activeClick', jqueryMap.$content).find('[name="sfxmdm"]').attr("data");             //获取当前修改的收费项目代码
            var sflxdm = $('[name="chargeType"]', jqueryMap.$content).find('option[value="'+sfxmdm+'"]').attr('data');  //获取当前修改的收费项目的业务类型是一次性收费还是常规服务收费
            if (!whetherOrNotMoney(money)) {                                                                            //校验输入金额
                Messenger().post({
                    message: "请输入正确的金额",
                    type: 'error',
                    id:"ordermessenger"
                });
                el.val('0.00');
            } else {
                if(Number(money)> parentel.find('[name="ysk"]').html().replace(/,/g, "")){
                    Messenger().post({
                        message: "优惠金额不能大于应收减实收",
                        type: 'error',
                        id:"ordermessenger"
                    });
                    // parentel.find('.sjskje').val(parentel.find('[name="ysk"]').html().replace(/,/g, ""));
                    // el.val('0.00');
                    // return false;
                    getData(cursor);
                } else {
                    if(sflxdm==="001"){                                                                                //常规收费
                        parentel.find('.sjskje').val(FloatSub($('[name="ysk"]',parentel).html(), money));           //计算出实际收款
                    }
                    var data = {
                        money: money,
                        ssmoney: FloatSub($('[name="ysk"]',parentel).html(), money),
                        id:id
                    };
                    $.ajax({
                        url: configMap.path + '/charge/updateyh',
                        type: 'PUT',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(data),
                        success: function (result) {
                            if(result.success){
                                // el.val(Number(money).toFixed(2));                                                  //修改成功后，将金额保留两位小数，放入页面
                                Messenger().post({
                                    message: "修改成功",
                                    type: 'info',
                                    id:"ordermessenger"
                                });
                                getData(cursor);
                            }else{
                                Messenger().post({
                                    message: result.message,
                                    type: 'error',
                                    id:"ordermessenger"
                                });
                            }
                        }
                    });
                }
            }
        },

        hideDialog: function () {
            hideDialog();
        }
    };
}();
//@ sourceURL=chargeorderlist.js
	
	