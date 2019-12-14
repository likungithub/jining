var customerView = function () {
    'use strict';

    var configMap = {
        path: '',
        dataUrl: '/customer/customer'
    };

    var getcustomer = function (id) {
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                $('#code_id').text(data.code);
                $('#name_id').text(data.name);
                $('#createDate_id').text(data.createDate);
                $('#state_id').text(data.state);
                $('#extAtrr_id').text(data.extAtrr);
                $('#dljgBm_id').text(data.dljgBm);
                $('#yhzh_id').text(data.yhzh);
                $('#yhmm_id').text(data.yhmm);
                $('#qylxDm_id').text(data.qylxDm);
                $('#sjhm_id').text(data.sjhm);
                $('#nsrmc_id').text(data.nsrmc);
                $('#nsrsbh_id').text(data.nsrsbh);
                $('#zydm_id').text(data.zydm);
                $('#szsf_id').text(data.szsf);
                $('#szcs_id').text(data.szcs);
                $('#email_id').text(data.email);
                $('#bzxx_id').text(data.bzxx);
                $('#yhztDm_id').text(data.yhztDm);
                $('#logo_id').text(data.logo);
                $('#scbz_id').text(data.scbz);
                $('#lrry_id').text(data.lrry);
                $('#gxry_id').text(data.gxry);
                $('#scry_id').text(data.scry);
                $('#zcrq_id').text(data.zcrq);
                $('#gxrq_id').text(data.gxrq);
                $('#scrq_id').text(data.scrq);
            },
            error: function () {
            }
        });
    };

    return {
        init: function (id) {
            getcustomer(id);
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();