var appcustomerinfoView = function () {
    'use strict';

    var configMap = {
        path: '',
        dataUrl: '/appcustomerinfo/findById/'
    };

    var getAppcustomerinfo = function (id) {
        $.ajax({
            url: configMap.path + configMap.dataUrl + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                 
                if (data.yhmc != null) {
//					$('#grtx_appcustomerinfo').text(data.grtx);
                    $("#yhmc_appcustomerinfo",$('#appcustomerinfoview-mByWs')).text(data.yhmc);
                }

                if (data.dlzh != null) {
                    $('#sjhm_appcustomerinfo',$('#appcustomerinfoview-mByWs')).text(data.dlzh);
                }

                if (data.nsrsbh != null) {
                    $('#nsrsbh_appcustomerinfo',$('#appcustomerinfoview-mByWs')).text(data.nsrsbh);
                }

                if (data.bzxx != null) {
                    $('#bzxx_appcustomerinfo',$('#appcustomerinfoview-mByWs')).text(data.bzxx);
                }

                if (data.gsmc != null) {
                    $('#gsmc_appcustomerinfo',$('#appcustomerinfoview-mByWs')).text(data.gsmc);
                }
                if (data.tjrdm != null) {
                    $('#tjrdm_appcustomerinfo',$('#appcustomerinfoview-mByWs')).text(data.tjrdm);
                }

                if (data.wbtjrmc != null) {
                    $('#wbtjrmc_appcustomerinfo',$('#appcustomerinfoview-mByWs')).text(data.wbtjrmc);
                }

                if (data.khjlmc != null) {
                    $('#khjlmc_appcustomerinfo',$('#appcustomerinfoview-mByWs')).text(data.khjlmc);
                }



            },
            error: function () {
            }
        });
    };

    return {
        init: function (id) {
            getAppcustomerinfo(id);
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
