
var singleChargeForAudit= function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        type: '',
        fileBtn_html: '<a href="javascript:;" name="chargefile" data-toggle="tooltip" data-placement="bottom"' +
        ' class="btn btn-xs default" title="收费附件"><i  class="icon iconfont icon-fujian iconFontColor-10a0f7 iconFontSize"></i>' +
        '</a>',
        historyBtn_html:'<a href="javascript:;" name="historyaudit" data-toggle="tooltip" data-placement="bottom"' +
        ' class="btn btn-xs default" title="历史审批记录"><i class="icon iconfont icon-lishirenwu iconFontColor-10a0f7 iconFontSize"></i>' +
        '</a>',
        showBtn_html: '<a href="javascript:;" class="btn btn-xs default" name="viewinfo"' +
        ' style="margin: 0px;padding: 0px;"><i style="font-size: 12px !important;"' +
        ' class="icon iconfont icon-zhankai- btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
    };

    // 全局Dom
    var jqueryMap = {
        $container: null
    };
    var setJqueryMap = function () {
        jqueryMap.$container = $('#singleChargeForAudit_M');
    };
    //兼容修改火狐样式
    // $(".modal-dialog").css("width","1126");
    // $(".modal-dialog").css("padding","0");
    // var setJqueryMap = function () {
    //     jqueryMap.$workorderForm = $('#singleChargeForAudit_M');
    //     jqueryMap.$workorderForm.parents('.modal-dialog').css("width","1126")
    //         .end()
    //         .parents('.modal-body')
    //         .css({padding:0});
    // };

    function initTable (glbm){
        $.get(configMap.path +'/customermanage/charge/chargeMessage/'+glbm,function(d){
            var anumber = 0;
            $.each(d.child,function(i,v){
                if(v.shzt_dm === '003'){
                    anumber += 1;
                }
            });
            if(anumber === 0){
                $('.shxx', jqueryMap.$container).addClass('display-hide');
                jqueryMap.$container.parents('.modal-dialog').find('.modal-footer').find('[data-bb-handler="success"]').addClass('display-hide');
            }
            $('<td>'+
                '<i class="fa fa-plus zhankai" data-openstation="0" style="cursor: pointer"></i>'+
                '</td>'+
                '<td>'+ d.main.htbm +'</td>'+
                '<td>'+ d.main.khmc +'</td>'+
                '<td>'+ moment(d.main.ht_fwq).format('YYYY-MM-DD')+'至'+ moment(d.main.ht_fwz).format('YYYY-MM-DD') +'</td>'+
                '<td>'+ d.main.sfxm_mc+'</td>'+
                '<td>'+ d.main.sffs_mc+'/'+ d.main.sfms_mc+'</td>'+
                '<td>'+ d.main.ysk.toFixed(2)+'</td>'+
                '<td>'+ d.main.sjsk.toFixed(2)+'</td>').appendTo($('#mainData', jqueryMap.$container));
            $('#mainData', jqueryMap.$container).on('click','i.zhankai',function(){
                if(d.child.length>0){
                    if ($('i.zhankai',jqueryMap.$container).attr('data-openstation')==='0'){
                        $('#mainData',jqueryMap.$container).addClass('borderL borderT borderR');
                        $('#childDataP',jqueryMap.$container).addClass('borderL borderB borderR');
                        $('i.zhankai',jqueryMap.$container).attr('data-openstation',1).removeClass().addClass('fa fa-minus zhankai');
                        $('#childData1', $('#singleChargeForAudit_M')).empty();
                        var checkboxHtml = '<div style="padding: 5px 0px 5px 0px;">' +
                            '<input type="checkbox" id="chargemessagecheckall" style="vertical-align: text-bottom;"/>' +
                            '<label for="chargemessagecheckall" style="margin-left: 5px">全选</label>' +
                            '</div>';
                        $(checkboxHtml).appendTo($('#childData1',jqueryMap.$container));
                        var htmlContent = '';
                        var shzt = '';
                        var sfzt = '';
                        var dzzt = '';
                        var sfsm = '暂无';
                        var shyj = '暂无';
                        $.each(d.child,function(i,v){
                            if(v.shzt_dm === '000'){
                                shzt = '未审核';
                            } else if(v.shzt_dm === '001'){
                                shzt = '已通过';
                            } else if(v.shzt_dm === '002'){
                                shzt = '未通过';
                            } else {
                                shzt = '待审核';
                            }
                            if(v.sfzt === '000'){
                                sfzt = '未收费';
                            } else if(v.shzt_dm === '001'){
                                sfzt = '已收费';
                            } else if(v.shzt_dm === '002'){
                                sfzt = '欠费中';
                            } else if(v.shzt_dm === '003'){
                                sfzt = '催费中';
                            } else if(v.shzt_dm === '004'){
                                sfzt = '已到账';
                            } else if(v.shzt_dm === '005'){
                                sfzt = '坏账';
                            }
                            if(v.shzt_dm === "001"){
                                dzzt = '已到账';
                            } else {
                                dzzt = '未到账';
                            }
                            if(v.bzxx !== null && v.bzxx !== ''){
                                sfsm = v.bzxx;
                            }
                            if(v.shyj !== null && v.shyj !== ''){
                                shyj = v.shyj;
                            }
                            htmlContent = '';
                            htmlContent += '<table style="margin: 5px 0px 5px 0px;width: 100%" class="childtable">';
                            htmlContent += '<tbody>';
                            htmlContent += '<tr>';
                            if(configMap.type==='view'){
                                htmlContent += '<td rowspan="4" class="text-center cancheck display-hide" style="width:45px;">';
                                htmlContent += '<input type="checkbox" class="auditcheck" name="' + v.id + '">';
                                htmlContent += '</td>';
                            } else {
                                htmlContent += '<td rowspan="4" class="text-center cancheck" style="width:45px;">';
                                if(v.shzt_dm === '003'){
                                    htmlContent += '<input type="checkbox" class="auditcheck" name="' + v.id + '">';
                                } else {
                                    htmlContent += '<input type="checkbox" class="auditcheck" name="' + v.id + '" disabled>';
                                }
                                htmlContent += '</td>';
                            }
                            htmlContent += '<td colspan="6">';
                            htmlContent += '<div class="childdivlist">' + configMap.showBtn_html + '</div>';
                            htmlContent += '<div class="childdivlist"><span style="font-size: 24px;color: #50ccfb;padding:0 5px 0 0;">'
                                + v.sfyf + '</span>月-' + v.sfnf + '</div>';
                            htmlContent += '<div class="childdivlist">应收：' + moment(v.yssj).format('YYYY-MM-DD') + '</div>';
                            // htmlContent += '<div class="childdivlist display-hide">订单编号：<label name="ddbh">' + v.ddbh + '</label></div>';
                            htmlContent += '<div class="childdivlist">应收：' + moneySplitByComma(v.ysk.toFixed(2)) + '</div>';
                            htmlContent += '<div class="childdivlist">实收：' + moneySplitByComma(v.sjsk.toFixed(2)) + '</div>';
                            htmlContent += '<div class="childdivlist">优惠：' + moneySplitByComma(v.qtsf.toFixed(2)) + '</div>';
                            htmlContent += '<div class="childdivlist">支付渠道：' + v.zffs_mc + '</div>';
                            htmlContent += '<div class="childdivlist" name="activebutton">';
                            if(d.size>0){
                                htmlContent += configMap.fileBtn_html;
                            }
                            htmlContent += configMap.historyBtn_html + '</div>';
                            // '<button type="button" name="submit" data-placement="bottom" data-toggle="tooltip" class="icon iconfont icon-tijiaoshenhe btnxystyle iconFontColor-10a0f7 iconFontSize" title="" data-original-title="单个提交审核"></button><button type="button" name="remind" data-placement="bottom" data-toggle="tooltip" class="icon iconfont icon-jiaofeitixing btnxystyle iconFontColor-10a0f7 iconFontSize" title="" data-original-title="单个收费提醒（注：提醒后，将无法修改实收金额）"></button><button type="button" name="historyaudit" data-placement="bottom" data-toggle="tooltip" class="icon iconfont icon-lishirenwu btnxystyle iconFontColor-10a0f7 iconFontSize" title="" data-original-title="历史审批记录"></button></div>'
                            htmlContent += '</td>';
                            htmlContent += '</tr>';
                            htmlContent += '<tr class="hidetr display-hide">';
                            // htmlContent += '<td width="15%">应收：' + moneySplitByComma(v.ysk.toFixed(2)) + '</td>';
                            htmlContent += '<td colspan="2"><p style="width: 110px">审核状态： <span>' + shzt + '</span></p></td>';
                            htmlContent += '<td colspan="2">收费人：' + v.lrrmc + '</td>';
                            // htmlContent += '<td colspan="2">支付渠道：' + v.zffs_mc + '</td>';
                            htmlContent += '<td colspan="2">订单编号：' + v.ddbh + '</td>';
                            htmlContent += '</tr>';
                            htmlContent += '<tr class="hidetr display-hide">';
                            // htmlContent += '<td>实收：' + moneySplitByComma(v.sjsk.toFixed(2)) + '</td>';
                            htmlContent += '<td colspan="2">收费状态：' + sfzt + '</td>';
                            htmlContent += '<td colspan="4" style="white-space: normal;word-wrap: break-word;word-break: normal;">收费说明：<p style="white-space: normal;word-wrap: break-word;word-break: normal;width: 740px;margin:0;">' + sfsm + '</p></td>';
                            htmlContent += '</tr>';
                            htmlContent += '<tr class="hidetr display-hide">';
                            // htmlContent += '<td>优惠：' + moneySplitByComma(v.qtsf.toFixed(2)) + '</td>';
                            htmlContent += '<td colspan="2">到账状态：' + dzzt + '</td>';
                            htmlContent += '<td colspan="4" style="white-space: normal;word-wrap: break-word;word-break: normal;">审核意见：<p style="white-space: normal;word-wrap: break-word;word-break: normal;width: 740px;margin:0;">' + shyj + '</p></td>';
                            htmlContent += '</tr>';
                            htmlContent += '</tbody>';
                            htmlContent += '</table>';
                            $(htmlContent).appendTo($('#childData1',jqueryMap.$container));
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
                        if($('.auditcheck:not(:disabled)', jqueryMap.$container).length === 0){
                            $('#chargemessagecheckall',jqueryMap.$container).parent().addClass('display-hide');
                        }
                        $('.cancheck', jqueryMap.$container).off('click').on('click',function(e){
                            if(e.target.tagName === 'TD'){                                                             //判断当前所点击的是否为td标签
                                if($(this).find('.auditcheck').prop('checked')){                                    //判断当前checkbox的选中状态是否为被选中
                                    $(this).find('.auditcheck').prop('checked', false);
                                } else {
                                    if($(this).find('.auditcheck').prop('disabled')){
                                    } else {
                                        $(this).find('.auditcheck').prop('checked', true);
                                    }
                                }
                            }
                        });
                        $('#chargemessagecheckall', jqueryMap.$container).off('click').on('click', function(){ //全选checkbox
                           if($(this).prop('checked')){
                               $('.auditcheck:not(:disabled)', jqueryMap.$container).prop('checked', true);
                           } else {
                               $('.auditcheck:not(:disabled)', jqueryMap.$container).prop('checked', false);
                           }
                        });
                        $('.auditcheck', jqueryMap.$container).off('click').on('click', function(){                                      //单选全选，设置全选checkbox被选中
                            var canchecksize = $('.auditcheck', jqueryMap.$container).not(':disabled').length;
                            var checkedsize = $('.auditcheck:checked', jqueryMap.$container).length;
                            if(canchecksize === checkedsize){
                                $('#chargemessagecheckall', jqueryMap.$container).prop('checked', true);
                            } else {
                                $('#chargemessagecheckall', jqueryMap.$container).prop('checked', false);
                            }
                        });
                        $('[name="chargefile"]', jqueryMap.$container).off('click').on('click',function () {
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
                        });
                        $('[name="historyaudit"]', jqueryMap.$container).off('click').on('click',function(){
                            var ele = $(this);
                            var parentele = ele.parents('.childtable');
                            var id = parentele.find('.auditcheck').attr("name");
                            console.info(ele);
                            console.info(id);
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
                    }else{
                        $('i.zhankai',jqueryMap.$container).attr('data-openstation',0).removeClass().addClass('fa fa-plus zhankai');
                        $('#childData1', $('#singleChargeForAudit_M')).empty();
                        $('#mainData',jqueryMap.$container).removeClass('borderL borderT borderR');
                        $('#childDataP',jqueryMap.$container).removeClass('borderL borderB borderR');
                    }
                }
            })
        })
    };

    /**
     * 校验
     * @returns {boolean}
     */
    var check = function (){
        if($('.auditcheck:checked', jqueryMap.$container).length===0){
            App.alert({
                container: jqueryMap.$container.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请选中收费台账！",
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    };

    /**
     * 保存审核
     * @param callback
     */
    var save = function (callback){
        var checkcontent = $('.auditcheck:checked', jqueryMap.$container);
        var idStr = '';
        var flag = '';
        $(checkcontent).each(function () {
            idStr += flag + $(this).attr('name');
            flag = ',';
        });
        var data = {
            id:idStr,
            shzt:$('[name="radioII"]', jqueryMap.$container).val(),
            sfzt:$('[name="radioI"]', jqueryMap.$container).val(),
            shyj:$('#auditOpinion', jqueryMap.$container).val()
        };
        $.ajax({
            url: '/statisticalanalysis/chargeaudit/charge',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (datas) {
                if(datas.success){
                    callback(true);
                } else {
                    App.alert({
                        container: jqueryMap.$contractForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: datas.message,
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
                updateMessageNumber();                                                                                  //增加首页消息提醒数量
            },
            error: function () {
                App.alert({
                    container: jqueryMap.$contractForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: "保存失败！",
                    icon: 'fa fa-warning'
                });
            }
        });
    };

    return {
        // 初始化
        init: function (glbm, type) {
            checkHowMany('#auditOpinion','#manyWords',300);
            setJqueryMap();
            jqueryMap.$container.parents('.modal-dialog').css('width',950);
            configMap.type=type;
            initTable(glbm);
            if(configMap.type === 'view'){
                $('.shxx', jqueryMap.$container).addClass('display-hide');
                jqueryMap.$container.parents('.modal-dialog').find('.modal-footer').find('[data-bb-handler="success"]').addClass('display-hide');
            }
            $('[type="radio"][name="radioI"]', jqueryMap.$container).on('click', function () {
                if($('#aaa', jqueryMap.$container).prop('checked')){
                    $('#ccc', jqueryMap.$container).prop('checked', true);
                }
                if($('#bbb', jqueryMap.$container).prop('checked')){
                    $('#ddd', jqueryMap.$container).prop('checked', true);
                }
            });
            $('[type="radio"][name="radioII"]', jqueryMap.$container).on('click', function () {
                if($('#ccc', jqueryMap.$container).prop('checked')){
                    $('#aaa', jqueryMap.$container).prop('checked', true);
                }
                if($('#ddd', jqueryMap.$container).prop('checked')){
                    $('#bbb', jqueryMap.$container).prop('checked', true);
                }
            })
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },
        save: function (callback){
            if(check()){
                save(callback);
            }
        }
    };
}();
//@ sourceURL=org/org.js

