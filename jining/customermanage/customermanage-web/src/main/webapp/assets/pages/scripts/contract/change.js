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
var contractChange = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/contract/contractupdate',
        chargeUrl:'/charge/chargeInfo',
        htbm: '',
        isPay:'<i class="fa fa-check-circle" style="font-size: 18px;margin-right: 5px;color:#9BC68E"></i>',
        type: '',
        bgid: ''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#checkConcatInfo_m');
    };

    var getContractInfo = function (){
        var contentHtml = '';
        var className = '';
        var payicon = '';
        $.get(configMap.path + configMap.dataUrl + '/' + configMap.htbm,function(result){
            $('.chargePro', jqueryMap.$contractForm).html(result.contract.sfxm_mc);
            $('.chargeMoney', jqueryMap.$contractForm).html(result.contract.zfy);
            $('.chargeTotalMoney', jqueryMap.$contractForm).html(result.contract.hjje);
            $('.serviceL', jqueryMap.$contractForm).html(moment(result.contract.fwqxq).format('YYYY-MM-DD') + '至' + moment(result.contract.fwqxz).format('YYYY-MM-DD'));
            $('.payMethods', jqueryMap.$contractForm).html(result.contract.fkfs_mc + '/' + result.contract.fkxh_mc);
            $('.specialMarks', jqueryMap.$contractForm).html(result.contract.tbsx);
            $('.contractDate', jqueryMap.$contractForm).html(moment(result.contract.qyrq).format('YYYY-MM-DD'));
            $.get(configMap.path + configMap.chargeUrl + '/' + configMap.htbm, function(chargeinfo){
                if(chargeinfo.length<=6){
                    contentHtml += '<tr>' +
                        '<td rowspan="3" class="tableMainTitle tableBr tableBb tableBt tableBl">' +
                        '<span style="display: inline-block;width: 20px;">往期收费情况</span>' +
                        '</td>' +
                        '<td class="tableBr tableBt"></td>';
                    for(var i=0;i<chargeinfo.length;i++){
                        if(i===chargeinfo.length - 1){
                            className = 'tableMonth tableBlWhite tableBr';
                        } else if(i>0 && i<chargeinfo.length - 1){
                            className = 'tableMonth tableBlWhite';
                        } else if(i===0){
                            className = 'tableMonth';
                        }
                        if((chargeinfo[i].shzt_dm==='000'||chargeinfo[i].shzt_dm==='002')&&chargeinfo[i].txcs === 0){
                            payicon = '';
                        } else {
                            payicon = configMap.isPay;
                        }
                        if(result.contract.ywlx === '002'){                                                            //一次性业务
                            if(i===0){
                                contentHtml += '<td  class="' + className + '">' + payicon + chargeinfo[i].sfnf + '-' + chargeinfo[i].sfyf + '</td>';
                            } else {
                                contentHtml += '<td  class="' + className + '">' + payicon + chargeinfo[i].sfnf + '-' + chargeinfo[i].sfyf + '(拆分)</td>';
                            }
                        } else {
                            contentHtml += '<td  class="' + className + '">' + payicon + chargeinfo[i].sfnf + '-' + chargeinfo[i].sfyf + '</td>';
                        }
                    }
                    contentHtml += '</tr>';
                    contentHtml += '<tr>';
                    contentHtml += '<td class="tableBr tableAlph6 text-center">原收</td>';
                    for(var i=0;i<chargeinfo.length;i++){
                        if(i<chargeinfo.length - 1){
                            className = 'tableAlph6';
                        } else if(i===chargeinfo.length - 1){
                            className = 'tableAlph6 tableBr';
                        }
                        contentHtml += '<td  class="' + className + '" name="">' + chargeinfo[i].ysk.toFixed(2) + '</td>';
                    }
                    contentHtml += '</tr>';
                    contentHtml += '<tr>';
                    contentHtml += '<td class="tableBr tableBb text-center">现收</td>';
                    for(var i=0;i<chargeinfo.length;i++){
                        if(i<chargeinfo.length - 1){
                            className = 'tableBb';
                        } else if(i===chargeinfo.length - 1){
                            className = 'tableBr tableBb';
                        }
                        if((chargeinfo[i].shzt_dm==='000'||chargeinfo[i].shzt_dm==='002')&&chargeinfo[i].txcs === 0){
                            contentHtml += '<td  class="' + className + ' canedit" name="' + chargeinfo[i].id + '"></td>';
                        } else {
                            contentHtml += '<td  class="' + className + '">' + chargeinfo[i].sjsk.toFixed(2) + '</td>';
                        }
                    }
                    contentHtml += '</tr>';
                    $(contentHtml).appendTo($('.chargeinfo', jqueryMap.$contractForm).find('tbody'));
                } else {
                    contentHtml += '<tr>' +
                        '<td rowspan="6" class="tableMainTitle tableBr tableBb tableBt tableBl">' +
                        '<span style="display: inline-block;width: 20px;">往期收费情况</span>' +
                        '</td>' +
                        '<td class="tableBr tableBt"></td>';
                    for(var i=0;i<6;i++){
                        if(i===0){
                            className = 'tableMonth';
                        } else if(i>0 && i<5){
                            className = 'tableMonth tableBlWhite';
                        } else if(i===5){
                            className = 'tableMonth tableBlWhite tableBr';
                        }
                        if((chargeinfo[i].shzt_dm==='000'||chargeinfo[i].shzt_dm==='002')&&chargeinfo[i].txcs === 0){
                            payicon = '';
                        } else {
                            payicon = configMap.isPay;
                        }
                        if(result.contract.ywlx === '002'){                                                            //一次性业务
                            if(i===0){
                                contentHtml += '<td  class="' + className + '">' + payicon + chargeinfo[i].sfnf + '-' + chargeinfo[i].sfyf + '</td>';
                            } else {
                                contentHtml += '<td  class="' + className + '">' + payicon + chargeinfo[i].sfnf + '-' + chargeinfo[i].sfyf + '(拆分)</td>';
                            }
                        } else {
                            contentHtml += '<td  class="' + className + '">' + payicon + chargeinfo[i].sfnf + '-' + chargeinfo[i].sfyf + '</td>';
                        }
                    }
                    contentHtml += '</tr>';
                    contentHtml += '<tr>';
                    contentHtml += '<td class="tableBr tableAlph6 text-center">原收</td>';
                    for(var i=0;i<6;i++){
                        if(i<5){
                            className = 'tableAlph6';
                        } else if(i===5){
                            className = 'tableAlph6 tableBr';
                        }
                        contentHtml += '<td  class="' + className + '">' + chargeinfo[i].ysk.toFixed(2) + '</td>';
                    }
                    contentHtml += '</tr>';
                    contentHtml += '<tr>';
                    contentHtml += '<td class="tableBr tableBb text-center">现收</td>';
                    for(var i=0;i<6;i++){
                        if(i<5){
                            className = 'tableBb';
                        } else if(i===5){
                            className = 'tableBr tableBb';
                        }
                        if((chargeinfo[i].shzt_dm==='000'||chargeinfo[i].shzt_dm==='002')&&chargeinfo[i].txcs === 0){
                            contentHtml += '<td  class="' + className + ' canedit" name="' + chargeinfo[i].id + '"></td>';
                        } else {
                            contentHtml += '<td  class="' + className + '">' + chargeinfo[i].sjsk.toFixed(2) + '</td>';
                        }
                    }
                    contentHtml += '</tr>';


                    contentHtml += '<tr>';
                    contentHtml += '<td class="tableBr"></td>';
                    for(var i=6;i<12;i++){
                        if(i===6){
                            className = 'tableMonth';
                        } else if(i>6 && i<11){
                            className = 'tableMonth tableBlWhite';
                        } else if(i===11){
                            className = 'tableMonth tableBr tableBlWhite';
                        }
                        if((chargeinfo[i].shzt_dm==='000'||chargeinfo[i].shzt_dm==='002')&&chargeinfo[i].txcs === 0){
                            payicon = '';
                        } else {
                            payicon = configMap.isPay;
                        }
                        if(i<chargeinfo.length){
                            if(result.contract.ywlx === '002'){                                                        //一次性业务
                                if(i<chargeinfo.length){
                                    contentHtml += '<td  class="' + className + '">' + payicon + chargeinfo[i].sfnf + '-' + chargeinfo[i].sfyf + '(拆分)</td>';
                                } else {
                                    contentHtml += '<td  class="' + className + '"></td>';
                                }
                            } else {
                                if(i<chargeinfo.length){
                                    contentHtml += '<td  class="' + className + '">' + payicon + chargeinfo[i].sfnf + '-' + chargeinfo[i].sfyf + '</td>';
                                } else {
                                    contentHtml += '<td  class="' + className + '"></td>';
                                }
                            }
                        }
                    }
                    contentHtml += '</tr>';
                    contentHtml += '<tr>';
                    contentHtml += '<td class="tableBr tableAlph6 text-center">原收</td>';
                    for(var i=6;i<12;i++){
                        if(i<11){
                            className = 'tableAlph6';
                        } else if(i===11){
                            className = 'tableAlph6 tableBr';
                        }
                        if(i<chargeinfo.length){
                            contentHtml += '<td  class="' + className + '">' + chargeinfo[i].ysk.toFixed(2) + '</td>';
                        } else {
                            contentHtml += '<td  class="' + className + '"></td>';
                        }
                    }
                    contentHtml += '</tr>';
                    contentHtml += '<tr>';
                    contentHtml += '<td class="tableBr tableBb text-center">现收</td>';
                    for(var i=6;i<12;i++){
                        if(i<11){
                            className = 'tableBb';
                        } else if(i===11){
                            className = 'tableBr tableBb';
                        }
                        if(i<chargeinfo.length){
                            if((chargeinfo[i].shzt_dm==='000'||chargeinfo[i].shzt_dm==='002')&&chargeinfo[i].txcs === 0){
                                contentHtml += '<td  class="' + className + ' canedit" name="' + chargeinfo[i].id + '"></td>';
                            } else {
                                contentHtml += '<td  class="' + className + '">' + chargeinfo[i].sjsk.toFixed(2) + '</td>';
                            }
                        } else {
                            contentHtml += '<td  class="' + className + '"></td>';
                        }
                    }
                    contentHtml += '</tr>';
                    $(contentHtml).appendTo($('.chargeinfo', jqueryMap.$contractForm).find('tbody'));
                }
                if($('.canedit', jqueryMap.$contractForm).length===0){
                    jqueryMap.$contractForm.parents('.modal-dialog').find('[data-bb-handler="success"]').addClass('display-hide');
                    $('[name="allmoney"]', jqueryMap.$contractForm).parent().parent().parent().addClass('display-hide');
                }
                if(configMap.type === 'view' || configMap.type === 'audit'){
                    $.get('/statisticalanalysis/contractchange/contractchange/' + configMap.bgid,function(result){
                        var caneditsize = $('.canedit', jqueryMap.$content).length;
                        $('[name="allmoney"]', jqueryMap.$content).val(result.zje.toFixed(2));
                        $('[name="monthmoney"]', jqueryMap.$content).val(result.myje.toFixed(2));
                        $('.canedit', jqueryMap.$content).html((result.zje / caneditsize).toFixed(2));
                        $('input[type="text"]', jqueryMap.$content).prop('readonly', true);
                        if(configMap.type === 'audit'){
                            $('.auditform', jqueryMap.$content).removeClass('display-hide');
                        } else {
                            if(result.shzt!=='000'){
                                $('.auditinfo', jqueryMap.$content).removeClass('display-hide');
                                $('.shrymc', jqueryMap.$content).html(result.shrmc);
                                $('.shyj', jqueryMap.$content).html(result.shyj);
                                $('.shrq', jqueryMap.$content).html(moment(result.shrq).format('YYYY-MM-DD'));
                            }
                        }
                    });
                }
            });
        });
    };

    /**
     * 检查输入信息
     * @returns {boolean}
     */
    var check = function(){
        if($('[name="allmoney"]', jqueryMap.$contractForm).val() === '0.00'){
            App.alert({
                container: jqueryMap.$contractForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请输入总金额或者每月金额！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($('[name="monthmoney"]', jqueryMap.$contractForm).val() === '0.00'){
            App.alert({
                container: jqueryMap.$contractForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请输入总金额或者每月金额！",
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    };

    var save = function(callback){
        var data = {
            htbm:configMap.htbm,
            zje:$('[name="allmoney"]', jqueryMap.$contractForm).val(),
            myje:$('[name="monthmoney"]', jqueryMap.$contractForm).val()
        };
        $.ajax({
            url: '/statisticalanalysis/contractchange/contractchange',
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

    var audit = function (callback){
        var data = {
            htbm:configMap.htbm,
            bgid:configMap.bgid,
            shzt:$('[name="radioI"]:checked', jqueryMap.$contractForm).val(),
            shyj:$('#auditOpinion', jqueryMap.$contractForm).val(),
            size:$('.canedit', jqueryMap.$contractForm).length
        };
        $.ajax({
            url: '/statisticalanalysis/contractchange/contractchange',
            type: 'PUT',
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
        init: function (htbm, type, bgid) {
            configMap.htbm = htbm;                                                                                     //客户编码
            configMap.type = type;
            configMap.bgid = bgid;
            setJqueryMap();
            checkHowMany('#auditOpinion','#manyWords',300);
            getContractInfo();
        },

        /**
         * 设置路径
         * @param path
         */
        setPath: function (path) {
            configMap.path = path;
        },

        checkmoney:function(e){
            var el = $(e);
            var money = el.val();
            var canEditSize = $('.canedit', jqueryMap.$contractForm).length;
            if(!whetherOrNotMoney(money)){
                App.alert({
                    container: jqueryMap.$contractForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: "请输入正确的金额！",
                    icon: 'fa fa-warning'
                });
                el.val('0.00')
            } else {
                if(el.attr('name')==='allmoney'){
                    $('[name="monthmoney"]', jqueryMap.$contractForm).val((money / canEditSize).toFixed(2));
                    $('.canedit', jqueryMap.$contractForm).html((money / canEditSize).toFixed(2));
                } else {
                    $('.canedit', jqueryMap.$contractForm).html(Number(money).toFixed(2));
                    $('[name="allmoney"]', jqueryMap.$contractForm).val((money * canEditSize).toFixed(2));
                }
            }
        },

        /**
         * 保存变更
         */
        saveChange:function(callback){
            if(check()){
                save(callback);
            } else {
                callback(false);
            }
        },

        /**
         * 审核变更
         * @param callback
         */
        audit:function(callback){
            audit(callback);
        }
    };
}();
//@ sourceURL=edit.js