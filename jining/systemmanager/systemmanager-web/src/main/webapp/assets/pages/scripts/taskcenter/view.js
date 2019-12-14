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
var processmanagementView = function () {
    var configMap = {
        path:null,
        getSfxmUrl:'/costprojectmanagement/findAllCostProjectz',
        getLcxxUrl:'/processManage/queryjbxx/'
    };

    var jqueryMap = {
        $processForm: null,
        $setfile: null,
        $appZH: null,
        $khflAddDialog: null
    };

    var setJqueryMap = function () {
        jqueryMap.$processForm = $('#processForm');
        jqueryMap.$szDataTable = $('#szData', jqueryMap.$processForm);
    };

    var getLcxx = function (data,id) {
        var id = id;
        if(id !== undefined){
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: configMap.path + configMap.getLcxxUrl + id,
                dataType: 'JSON',
                type: 'get',
                data: {
                    lcid:data
                },
                success: function (result) {
                    $("input[name='lcmc']").val(result.lcmc)
                    $("input[name='addDate']").val(moment(result.lrrq).format("YYYY-MM-DD"))
                    $("textarea[name='msxx']").val(result.lcms)

                    $("#addCharge option").each(function (index) {
                        if($("#addCharge option")[index].getAttribute("value")==result.sfxmDm){
                            $("#addCharge option")[index].setAttribute("selected","selected")
                        }
                    })
                    $("#addEducation option").each(function (index) {
                        if($("#addEducation option")[index].innerText==result.lcbz){
                            $("#addEducation option")[index].setAttribute("selected","selected")
                            $("#addEducation").attr("disabled",true)
                        }
                    })
                    // $(".input[name='lcmc']").val(result.lcmc)
                }
            })
        }
    }


            //客户附件
    $('#addLcFile').on('click', function () {
        var dialogButtons = {
            /*cancel: {
             label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
             className: 'btn-default'
             }*/
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-save"></i> 关&nbsp;闭 ',
            className: "btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4",
            callback: function () {
                processfiles.getfile(function (result) {
                    if (result) {
                        jqueryMap.$setfile.modal('hide');
                        $("#addfiles").html("添加附件(" + sessionStorage.getItem("filesize") + ")");
                    }
                });
                return false;
            }
        };
//            	var htbm = $('[name="htbm"]').val();
        $.get("/systemmanager/taskcenter/processmanagement/processmanagementfile.jsp", function (html) {
            jqueryMap.$setfile = bootbox.dialog({
                title: '添加附件',
                message: html,
                buttons: dialogButtons,
                className:'addFile'
            });
        });
    });
    $("#addCharge").on('change',function () {
        $("input[name='lcmc']").val($('#addCharge').find("option:selected").text()+'流程')
    })
    var getSfxm = function () {
          
        $.ajax({
            url: configMap.path + configMap.getSfxmUrl ,
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            success: function (result) {
                $(result).each(function () {
                    var sfxmOption = '<option value="'+$(this)[0].serviceCode+'">'+$(this)[0].serviceName+'</option>'
                    $("#addCharge").append(sfxmOption)
                })
                if(localStorage.getItem("cxlcid")!==null){
                    getLcxx(localStorage.getItem("cxlcid"),localStorage.getItem("id"));
                }else{
                    getLcxx(localStorage.getItem("lcid"));
                }

            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }

    return {
        init: function () {
            setJqueryMap();
            // if(localStorage.getItem("cxlcid")){
            //
            // }
            $(".addTime").datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });

            localStorage.setItem('lcid',"");
            getSfxm();
            var obj = $("#processForm textarea");
            var num = 300;
            var numObj = $("#processForm .wordNum span")
            checkHowMany(obj,numObj,num);
        },

        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=edit.js