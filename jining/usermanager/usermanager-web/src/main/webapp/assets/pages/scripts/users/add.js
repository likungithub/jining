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

var userAdd = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/user/users/user',
        getOrgUrl: '/organization/organization/org',
        setOrgPageUrl: '/user/users/set-org.jsp',
        setOrgAuthUrl: '/user/users/set-orgAuth.jsp',
        addBmPageUrl : '/user/users/addNewOrg.jsp',
        id: '',
        orgId: '',
        validationRule: {},
        imgUrl:'/user/users/userinfoimage.jsp',
        dljgbm: '',
        zydm: ''
    };

    // 全局Dom
    var jqueryMap = {
        $addUserForm: null,
        $addSelectOrgDialog: null,
        $addSetimg: null
    };

    var setJqueryMap = function () {
        jqueryMap.$addUserForm = $('#addUser-form-datas');
    };

    var saveUser = function (callback) {
        var blockTarget = jqueryMap.$addUserForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var js = jqueryMap.$addUserForm.find('span.btnBlue');
        var jsdm = "";
        for (var i = 0; i < js.length; i++) {
            jsdm = jsdm + js[i].id + ",";
        }
//        if (jsdm == "") { //代表未授权任何角色
//        	App.unblockUI(blockTarget);
//        	Messenger().post({
//                message: '请选择员工所属角色！',
//                type: 'warning'
//              });
//        	return false;
//        	//默认给系统无角色
//        	jsdm = "6648c9bd-f3fc-4802-9d98-79ce32d74f3d";
//        }
        var bmqxdmVal = '0';
        var savebmqxdmVal = '0';
        if ($('#adduserBMAuthority').length === 1) { //有按钮权限
        	bmqxdmVal = jqueryMap.$addUserForm.find('input[name="addddtree"]').val();
        	savebmqxdmVal = jqueryMap.$addUserForm.find('input[name="addsavetree"]').val();
        }
        
        var data = {
        	zydm:configMap.zydm,
            name: jqueryMap.$addUserForm.find('input[name="addName"]').val(),
            userAccount: jqueryMap.$addUserForm.find('input[name="addUserAccount"]').val(),
            xbdm: jqueryMap.$addUserForm.find('input[name="addSex"]:checked').val(), //性别
            csrq: jqueryMap.$addUserForm.find('input[name="addBirthDay"]').val(), //出生日期
            qq: jqueryMap.$addUserForm.find('input[name="addQq"]').val(), //QQ
            tel: jqueryMap.$addUserForm.find('input[name="addTel"]').val(),//联系电话
            yddh: jqueryMap.$addUserForm.find('input[name="addPhone"]').val(),//手机
            email: jqueryMap.$addUserForm.find('input[name="addEmail"]').val(),
            lxdz: jqueryMap.$addUserForm.find('input[name="addLxdz"]').val(),
            remark: jqueryMap.$addUserForm.find('textarea[name="addRemark"]').val(),
            bmdm: jqueryMap.$addUserForm.find('input[name="addBmdm"]').val(), //部门代码，此处传值为org_id
            bmqxdm: bmqxdmVal, //部门权限代码，此处传值为code
            savebmqxdm: savebmqxdmVal, //部门权限代码，此处传值为code
            jsdm: jsdm, 
            //ygxl: jqueryMap.$addUserForm.find('#addEducation').val(),
            //sfzhm: jqueryMap.$addUserForm.find('#addIdCard').val(),
            //cyzz: jqueryMap.$addUserForm.find('#addQualifications').val(),
            cyrq: jqueryMap.$addUserForm.find('#addDateOfBusiness').val()
        };
        debugger
        var AppAlert = function (msg) {
            App.alert({
                container: jqueryMap.$addUserForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: msg,
                closeInSeconds:3,
                icon: 'fa fa-warning'
            });
        };

        function isUserAccount(data) {
            return /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,20}$/.test(data);
        }

        function isEmail(data) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(data);
        }

        function isPhone(data) {
            return /^1[3456789]\d{9}$/.test(data);
        }

        function isQQ(data) {
            return /^[1-9][0-9]{4,9}$/.test(data);
        }

        function isName(data) {
            return /^[·\u4E00-\u9FA5]{1,20}|[A-Za-z·]{1,20}$/.test(data);
        }

        function isLength(data) {
            return /^[\s\S]{0,500}$/.test(data); //长度500
        }

        //用户姓名不能为空
        if (!data.name) {
            App.unblockUI(blockTarget);
            AppAlert('用户姓名不能为空哟！');
            return;
        } else {
            var bol = isName(data.name);
            if (!bol) {
                App.unblockUI(blockTarget);
                AppAlert('用户姓名应为20位以内的中文或英文！');
                return;
            }
        }

        //  登录账号不能为空且格式合法
        if (!data.userAccount) {
            App.unblockUI(blockTarget);
            AppAlert('登录账号不能为空哟！');
            return;
        } else {
            var bol = isUserAccount(data.userAccount);
            if (!bol) {
                App.unblockUI(blockTarget);
                AppAlert('登录账号格式有误，请输入6-20位数字和字母组合!');
                return;
            }
        }

        //    验证email格式  是否正确
        if (data.email != '') {
            if (!isEmail(data.email)) {
                App.unblockUI(blockTarget);
                AppAlert('邮箱的格式不正确呦！');
                return;
            }
        }
        //手机号码格式正确且不能为空
        if (!data.yddh) {
            App.unblockUI(blockTarget);
            AppAlert('手机号码不能为空哟！');
            return;
        } else {
            var bol = isPhone(data.yddh);
            if (!bol) {
                App.unblockUI(blockTarget);
                AppAlert('手机号格式不合法,不是由11位有效数字组成！');
                return;
            }
        }
        //部门不能为空
        if (data.bmdm == "" || data.bmdm == null || data.bmdm == "undefined") {
            App.unblockUI(blockTarget);
            AppAlert('所属部门不能为空哟！');
            return;
        }
        
        //联系电话的验证
        if (data.tel != '') {
            var bol = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(data.tel);
            if (!bol) {
                App.unblockUI(blockTarget);
                AppAlert('联系电话的格式应为3到4位区号加-加7到14位固定号码！');
                return;
            }
        }
        //qq号码的验证
        if (data.qq != '') {
            if (!isQQ(data.qq)) {
                App.unblockUI(blockTarget);
                AppAlert('qq号码的格式应为5到10为数字！');
                return;
            }
        }
        if (!isLength(data.lxdz)) {
            App.unblockUI(blockTarget);
            AppAlert('联系地址内容长度不超过500哟！');
            return;
        }
        if (!isLength(data.remark)) {
            App.unblockUI(blockTarget);
            AppAlert('备注内容长度不超过500哟！');
            return;
        }
        if (data.jsdm == ""|| data.jsdm == null || data.jsdm == "undefined") { //代表未授权任何角色
        	App.unblockUI(blockTarget);
        	AppAlert('员工角色不能为空哟！');
        	return;
        }
        //部门不能为空
        if (data.bmqxdm == "" || data.bmqxdm == null || data.bmqxdm == "undefined") {
            App.unblockUI(blockTarget);
            AppAlert('权限部门不能为空哟！');
            return;
        }
        
        var url = configMap.path + configMap.dataUrl;
        var requestType = 'POST';
        debugger
        $.ajax({
            url: url,
            type: requestType,
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(blockTarget);
                if (result.success) {
                    debugger
                    callback(true);
                }
                else {
                    App.alert({
                        container: jqueryMap.$addUserForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: result.message,
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            },
            error: function (ex, e, ee) {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$addUserForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        });
    };

    var getOrder = function () {
        $.ajax({
            url: '/role/roles/role',
            dataType: 'JSON',
            /* data: ,*/
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    //生成span
                    var oSpan = "<span style='dispaly:block;float:left;margin:0 15px 15px 0;padding:5px 10px;border-radius:4px !important;cursor:pointer;border: 1px solid #F1F5B9;background:#F1F5B9;'id=" + result[i].id + ">" + result[i].name + "</span>";
                    $("#addRoleWrap").append(oSpan);
                }
                $("#addRoleWrap span").click(function () {
                	var selectedRole = 0;
                	$("#addRoleWrap span").each(function(){
                		if ($(this).hasClass("btnBlue colorfff")) {
                			$(this).removeClass("btnBlue colorfff");
                			return false; 
                		}
                	});
                	$(this).addClass("btnBlue colorfff");
//                    if ($(this).hasClass("btnBlue colorfff")) {
//                        $(this).removeClass("btnBlue colorfff");
//                    } else {
//                        $(this).addClass("btnBlue colorfff");
//                        
//                    }
                });

                if (configMap.id) {
                    getUser(configMap.id);
                    jqueryMap.$addUserForm.find('input[name=addUserAccount]').attr('readOnly', 'readOnly');
                } else {
                    if (configMap.orgId) {
                        jqueryMap.$addUserForm.find('[id=addBtnSelectOrg]').attr('disabled', 'disabled');
                        jqueryMap.$addUserForm.find('[id=addBtnSelectOrg] span').text(getOrgName(configMap.orgId));
                        $('#addBtnSelectOrg').off('click');
                    }
                    jqueryMap.$addUserForm.find('input[name="addSex"][value=1]').iCheck('check');
                }
            },
            error: function () {
                if (configMap.id) {
                    getUser(configMap.id);
                    jqueryMap.$addUserForm.find('input[name=addUserAccount]').attr('readOnly', 'readOnly');
                } else {
                    if (configMap.orgId) {
                        jqueryMap.$addUserForm.find('[id=addBtnSelectOrg]').attr('disabled', 'disabled');
                        jqueryMap.$addUserForm.find('[id=addBtnSelectOrg] span').text(getOrgName(configMap.orgId));
                        $('#addBtnSelectOrg').off('click');
                    }
                    jqueryMap.$addUserForm.find('input[name="addSex"][value=1]').iCheck('check');
                }
            }
        });
    };

    var getOrgName = function (orgId) {
        var orgName = '单击选择部门';
        $.ajax({
            url: configMap.path + configMap.getOrgUrl + '/' + orgId,
            dataType: 'JSON',
            type: 'GET',
            async: false,
            success: function (org) {
                if (org && org.name) {
                    orgName = org.name;
                }
            },
            error: function () {
            }
        });

        return orgName;
    };

    var userValidation = function () {
        jqueryMap.$addUserForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: configMap.validationRule,
            messages: { // 自定义显示消息
                rePwd: {
                    equalTo: '两次输入的密码不一致！'
                }
            },
            errorPlacement: function (error, element) { // 为每种input设置错误输出位置
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) {
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) {
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element) { // 高亮显示控件form-group和has-error都是样式类
                $(element)
                    .closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) { // 取消高亮显示
                $(element)
                    .closest('.form-group').removeClass('has-error');
            },
            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error');
                label.remove();
            }
        });
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function (result) {
                    setUserOrg.getSelectedOrg(function (result) {
                        if (result) {
                            jqueryMap.$addUserForm.find('input[name=addBmdm]').val(result.id);
                            jqueryMap.$addUserForm.find('[id=addBtnSelectOrg] span').text(result.text);
                            jqueryMap.$addSelectOrgDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };
        }
        
        if (type === 'add') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                	addNewOrg.saveOrg(function (result) {
        	            if (result) {
        	              jqueryMap.$addSelectOrgDialog.modal('hide');
        	            }
        	          });
                	return false;
                }
            };
        }
        
        if (type === 'auth') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function (result) {
                	setUserOrgAuth.getSelectedOrg(function (result) {
                        if (result.success) {
                            jqueryMap.$addUserForm.find('input[name=addddtree]').val(result.id); 
                            jqueryMap.$addUserForm.find('input[name=addsavetree]').val(result.savedid);
                            jqueryMap.$addUserForm.find('[id=addSelectOrgAuth] p').text(result.text);
                            jqueryMap.$addSelectOrgDialog.modal('hide');
                        } else {
                        	jqueryMap.$addUserForm.find('input[name=addddtree]').val("0");
                        	jqueryMap.$addUserForm.find('input[name=addsavetree]').val("0");
                            jqueryMap.$addUserForm.find('[id=addSelectOrgAuth] p').text("本人");
                            jqueryMap.$addSelectOrgDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };
        }
        
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭',
            className: 'btn btn-default  borderRadius4'
        };

        $.get(url, function (html) {
            jqueryMap.$addSelectOrgDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var selectOrg = function () {
        openModal('选择所属部门（请选择最后一级部门）',
            configMap.path + configMap.setOrgPageUrl + "?orgid=" + jqueryMap.$addUserForm.find(
                'input[name=org]').val(), 'edit');
    };
    
    var addSelectOrgAuth = function () {
        openModal('选择数据权限',
            configMap.path + configMap.setOrgAuthUrl + "?orgid=" + jqueryMap.$addUserForm.find(
                'input[name=addddtree]').val(), 'auth');
    };  

    var changecolor = function (e) {
        if ($(e).hasClass("btn-primary")) {
            $(e).removeClass("btn-primary");
        } else {
            $(e).addClass("btn-primary");
        }
    };

    var addImages = function () {
        jqueryMap.$addUserForm.find('[name^=addimage]').off('click').on('click', function () {
            var fjlx = $(this).attr('name').substr(8);
            var dialogButtons = {
                success: {
                    label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                    className: "btn btn-default btnBlue borderRadius4 colorfff",
                    callback: function () {
                        userInfoImage.getfile(function (result) {
                            if (result) {
                                jqueryMap.$addSetimg.modal('hide');
                            }
                        });
                        return false;
                    }
                }
            };

            $.get(configMap.path + configMap.imgUrl + "?id=" + configMap.id + "&dljgbm=" + configMap.dljgbm +
                "&zydm=" + configMap.zydm + "&status=insert" + "&fjlx=" + fjlx, function (html) {
                jqueryMap.$addSetimg = bootbox.dialog({
                    title: '添加附件',
                    message: html,
                    buttons: dialogButtons
                });
            });
        });
    };
    
    //新增部门
	var bmAddFun = function (){
		openModal('新增部门', configMap.path + configMap.addBmPageUrl , 'add');
	};

//	var imagesCount = function () {
//        $.ajax({
//            url: configMap.path + '/user/users/getImagesCount/' + configMap.zydm + "/" + configMap.dljgbm,
//            dataType: 'JSON',
//            type: 'GET',
//            success: function (data) {
//                jqueryMap.$addUserForm.find('#addEducationImage').html('附件 ('+ data.educationImage + ')');
//                jqueryMap.$addUserForm.find('#addQualificationsImage').html('附件 ('+ data.qualificationsImage + ')');
//                jqueryMap.$addUserForm.find('#addIdCardImage').html('附件 ('+ data.idCardImage + ')');
//            }
//        });
//    };

    return {
        // 初始化
        init: function (dljgbm, zydm) {
            configMap.dljgbm = dljgbm;
            configMap.zydm = zydm;
            setJqueryMap();
            //获得全部角色
            getOrder();
            addImages();

            if ($('#adduserBMAuthority').length === 1) { //有按钮权限
            	//初始个人数据权限为0
            	jqueryMap.$addUserForm.find('input[name=addddtree]').val("0"); //默认为0
            }
          //仅当添加时判断
    		$("input[name='addUserAccount']").blur(function(){
    	        var v=$("input[name='addUserAccount']").val();
    	        function isUserAccount(data) {
    	            return /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,20}$/.test(data);
    	        }
    	        var bol = isUserAccount(v);
    	        if(v==null||v==""||v=="undefined" || !bol){
    	            //为空无情况
    	        	Messenger().post({
                        message: '登录账号格式有误，请输入6-20位数字和字母。',
                        type: 'error'
                      });
    	        }else{
    	            //验证是否存在
    	            var data = {'zh':v};
    	            $.ajax({
    	                 url:'/customermanage/customerManage/hasExistByZh',
    	                 contentType: 'application/json; charset=utf-8',
    	                 async:false,
    	                 type:'POST',
    	                 data:JSON.stringify(data),
    	                 success:function(data){
    	                     if(data){
    	                         Messenger().post({
    	                              message: '该账号已注册！',
    	                              type: 'error'
    	                            });
    	                     }
    	                 },
    	                 error:function(){
    	                     Messenger().post({
    	                         message: '账号检测失败！',
    	                         type: 'error'
    	                       });
    	                 }
    	             });
    	        };

    	    });
            $("#addIdCard").on("input",function () {
                checknum(this)
            })
            $("#addIdCard").on("blur",function () {
                if(!whetherOrNotID($(this).val())){
                    AppAlert("身份证格式错误，请重新输入")
                }
            })
            // 校验身份证输入
            function checknum(obj){
                if(obj.value.match(/^[0-9Xx]{1,}$/)){
                    obj.value = obj.value;
                }else{
                    obj.value = obj.value.substring(0,obj.value.length-1);

                }
            };
            var AppAlert = function(message){
                App.alert({
                    container: $(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: message,
                    closeInSeconds:3,
                    icon: 'fa fa-warning'
                });
            }
            configMap.validationRule = {
                name: {
                    required: true
                },
                userAccount: {
                    minlength: 6,
                    required: true
                },
                phone: {
                    minlength: 11,
                    required: true
                },
                bmdm: {
                    required: true
                }
            };

            $('#addBtnSelectOrg', jqueryMap.$addUserForm).off('click').on('click', function () {
                selectOrg();
            });

            $('#addSelectOrgAuth', jqueryMap.$addUserForm).off('click').on('click', function () {
                addSelectOrgAuth();
            });

            jqueryMap.$addUserForm.find('.addBirthDay').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$addUserForm.find('.dateOfBusiness').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$addUserForm.find('[name=addBirthDay]').val(moment().format("YYYY-MM-DD"));
            // 控件验证
            // userValidation();

            //添加新的部门
		    $('#addBmAdd', jqueryMap.$addUserForm).off().on('click', function () {
		    	bmAddFun();
		    });

		    //赋值
		    //$('#addddtree').combotree('setValue',20);

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },
        // 保存雇员信息，参数为回掉函数
        saveUser: function (callback) {
            if (jqueryMap.$addUserForm.valid()) {
                saveUser(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=users/edit.js