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
var employeeEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/leaveType/add',
        editUrl:'/leaveType/update',
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
			$employeeForm: null,
            contain:null
    };

    var setJqueryMap = function () {
        jqueryMap.$employeeForm = $('#leavetypeForm');
        jqueryMap.contain=$('#leaveTypeAdd');
    };

    var saveLeaveType = function (callback) {
       var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
      /*  var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });*/
        var datas=$('#leavetypeForm').serializeArray();
        console.info(datas,122);
        var data = {
            leaveTypeName:datas[0].value,
            hiddenLeaveTypeName:datas[1].value,
            ifvacation:datas[2].value,
            remarkInfo:datas[3].value,
        };
        console.info(data);

        var url = configMap.path + configMap.dataUrl;
        var requestType = 'POST';
        if (configMap.id) {
            url = configMap.path+configMap.editUrl + "/" + configMap.id;
            requestType = 'POST';
        }

		$.ajax({
            url: url,
            type: requestType,
            data: data,
            success: function (data) {
                if(data.success){
                    App.unblockUI(blockTarget);
                    callback(true);
                }else{
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$employeeForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: data.message,
                        icon: 'fa fa-warning'
                    });
                }
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        });
    };

    var getLeaveType = function (id) {
		$.ajax({
            url: configMap.path + '/leaveType/findById' + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                console.log($('#'))
                console.log(data);
                $('#leaveTypeNameByAdd',jqueryMap.contain).val(data.leaveName);
                $('#hiddenLeaveTypeName',jqueryMap.contain).val(data.leaveName);
               if(data.ifVacation=="0"){
                   $('input[name="ifVacationByAdd"][value="0"]', jqueryMap.contain).attr("checked",true);
               }else{
                   $('input[name="ifVacationByAdd"][value="1"]', jqueryMap.contain).attr("checked",true);
               }
               $('#leaveTypeRemarkInfo',jqueryMap.contain).val(data.remarkInfo);
            },
            error: function () {
                bootbox.alert('获取请假类型信息失败！');
            }
        });
    };



    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            if (configMap.id) {

              /*  $('#leaveTypeNameByAdd').attr("readonly",true);*/
                getLeaveType(configMap.id);

            };
            //textarea输入字数限制
            var obj = $("#leavetypeForm textarea");
            var num = 300;
            var numObj = $("#leavetypeForm .wordNum span")
            checkHowMany(obj,numObj,num);
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        // 保存雇员信息，参数为回掉函数
        saveLeaveType: function (callback) {
            if (jqueryMap.$employeeForm.valid()) {
                saveLeaveType(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js