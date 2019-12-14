/*global $, App, moment */

var agentview = function () {
    'use strict';

    var configMap = {
        path: '',
        getOrgUrl: '/organization/organization/org',
        dataUrl: '/customermanage/customerManage/customer',
        id: '',
        userId: '',
        imgUrl: '/customermanage/customer/showfile.jsp',
        dljgBm:''

    };

    var jqueryMap = {
        $container: null,
        $setimg: null
    };

    var getCustomer = function () {
        $.ajax({
            url: '/customermanage/customerManage/customer/' + configMap.id,
            dataType: 'JSON',
            type: 'GET',
            success: function (result) {
                $('#CustomerName', jqueryMap.$container).val(result.name == null ? "" : result.name);
                $('#CustomerNSRSBH', jqueryMap.$container).val(result.nsrsbh == null ? "" : result.nsrsbh);
                $('#CustomerPhone', jqueryMap.$container).val(result.sjhm == null ? "" : result.sjhm);
                $('#CustomerEmail', jqueryMap.$container).val(result.email == null ? "" : result.email);
                $('#CustomerSF', jqueryMap.$container).val(result.szsf == null ? "" : result.szsf);
                $('#CustomerCS', jqueryMap.$container).val(result.szcs == null ? "" : result.szcs);
                $('#CustomerXXDZ', jqueryMap.$container).val(result.xxdz == null ? "" : result.xxdz);
                //$('#Customerlogo', jqueryMap.$container).val(result.szcs == null ? "" : result.szcs);
                $('#CustomerYyzz', jqueryMap.$container).val(result.yyzz == null ? "" : result.yyzz);
                $('#CustomerGsjj', jqueryMap.$container).val(result.gsjj == null ? "" : result.gsjj);
                $('#CustomerQyzz', jqueryMap.$container).val(result.qyzz == null ? "" : result.qyzz);
                $('#CustomerQyyj', jqueryMap.$container).val(result.qyyj == null ? "" : result.qyyj);
                jqueryMap.$container.find('[name="shViewStartDate"]').val(moment(result.fwksrq == null ? new Date() : result.fwksrq).format("YYYY-MM-DD"));
                jqueryMap.$container.find('[name="shViewEndDate"]').val(moment(result.fwjsrq == null ? new Date() : result.fwjsrq).format("YYYY-MM-DD"));
                //$('#CustomerSHZT', jqueryMap.$container).val(result.is_enabled ? 1 : 0);
                $('#CustomerBZXX', jqueryMap.$container).val(result.shyj == null ? "" : result.shyj);
                $('#CustomerYyzzBTn', jqueryMap.$container).html("查看附件(" + result.yyzzNum + ")");
                $('#CustomerQyzzBTn', jqueryMap.$container).html("查看附件(" + result.qyzzNum + ")");
                $('#CustomerQyyjBTn', jqueryMap.$container).html("查看附件(" + result.qyyjNum + ")");
                $('#Customerlogosrc').attr("src", result.logo);
            },
            error: function () {
                Messenger().post({
                    message: '获取数据失败！',
                    type: 'error'
                });
            }
        });
    };

    var addImages = function () {
        jqueryMap.$container.find('[name^=image]').off('click').on('click', function () {
            var fjlx = $(this).attr('name').substr(5);
            var dialogButtons = {
                cancel: {
                    label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                    className: 'btn-default'
                }
            };

            $.get(configMap.imgUrl + "?id=" + encodeURI(configMap.id) + "&dljgBm=" + encodeURI(configMap.dljgBm) + "&fjlx=" + encodeURI(fjlx), function (html) {
                jqueryMap.$setimg = bootbox.dialog({
                    title: '查看附件',
                    message: html,
                    buttons: dialogButtons
                });
            });
        });
    };


    return {
        init: function (id, userId, dljgBm) {
            configMap.id = id;
            configMap.userId = userId;
            configMap.dljgBm = dljgBm;
            getCustomer();
            addImages();
            jqueryMap.$container.find('.shViewStartDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            jqueryMap.$container.find('.shViewEndDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            //添加营业执照审核
            // $('[data-type="shyyzz"]', jqueryMap.$container).off('click').on('click', function () {
            //     $.ajax({
            //         url: configMap.path + configMap.dataUrl + '/updateyyzzSh/' + configMap.id,
            //         dataType: 'JSON',
            //         contentType: 'application/json; charset=utf-8',
            //         type: 'PUT',
            //         success: function (datas) {
            //             if (datas.success) {
            //                 Messenger().post("审核成功!");
            //             } else {
            //                 Messenger().post({
            //                     message: datas.message,
            //                     type: 'error'
            //                 });
            //                 callback(false);
            //             }
            //         },
            //         error: function () {
            //             Messenger().post({
            //                 message: "审核失败！",
            //                 type: 'error'
            //             });
            //             callback(false);
            //         }
            //     });
            // });

        },
        setPath: function (path) {
            jqueryMap.$container = $('#customer-manager-view-data');
        },
    };
}();
//@ sourceURL=view.js