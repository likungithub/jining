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

var userEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/user/users/user',
        getOrgUrl: '/organization/organization/org',
        setOrgPageUrl: '/user/users/set-org.jsp',
        setOrgAuthUrl: '/user/users/set-orgAuth.jsp',
        addBmPageUrl : '/user/users/addNewOrg.jsp',
        changeZhUrl : '/user/users/updateZh.jsp',
        id: '',
        orgId: '',
        validationRule: {},
        imgUrl:'/user/users/userinfoimage.jsp',
        dljgbm: '',
        zydm: '',
        bmqxdmVal: '',
        savebmqxdmVal: '',
        jsdm:'',
        name:''
    };

    // 全局Dom
    var jqueryMap = {
        $userForm: null,
        $selectOrgDialog: null,
        $setimg: null
    };

    var setJqueryMap = function () {
        jqueryMap.$userForm = $('#user-form-datas');
    };

    var saveUser = function (callback) {
        var blockTarget = jqueryMap.$userForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var js = jqueryMap.$userForm.find('span.btnBlue');
        var jsdm = jqueryMap.$userForm.find('span.btnBlue')[0].id;
        var jsname = jqueryMap.$userForm.find('span.btnBlue').html();
        var name = jqueryMap.$userForm.find('input[name="name"]').val();
        var ifChangJsdm = '0'; //未改变
        var ifChangName = '0'; //未改变
        if (jsdm != configMap.jsdm) {
        	ifChangJsdm = '1'; //改变了
        }
        if (name != configMap.name) {
        	ifChangName = '1'; //改变了
        }
//        for (var i = 0; i < js.length; i++) {
//            jsdm = jsdm + js[i].id + ",";
//        }
        if ($('#userBMAuthority').length === 1) { //有按钮权限
        	configMap.bmqxdmVal = jqueryMap.$userForm.find('input[name="ddtree"]').val();
        	configMap.savebmqxdmVal = jqueryMap.$userForm.find('input[name="savetree"]').val();
        }
        
        var data = {
        	zydm:configMap.zydm,
            name: name,
            userAccount: jqueryMap.$userForm.find('input[name="userAccount"]').val(),
            xbdm: jqueryMap.$userForm.find('input[name="sex"]:checked').val(), //性别
            csrq: jqueryMap.$userForm.find('input[name="birthDay"]').val(), //出生日期
            qq: jqueryMap.$userForm.find('input[name="qq"]').val(), //QQ
            tel: jqueryMap.$userForm.find('input[name="tel"]').val(),//联系电话
            yddh: jqueryMap.$userForm.find('input[name="phone"]').val(),//手机
            email: jqueryMap.$userForm.find('input[name="email"]').val(),
            lxdz: jqueryMap.$userForm.find('input[name="lxdz"]').val(),
            remark: jqueryMap.$userForm.find('textarea[name="remark"]').val(),
            bmdm: jqueryMap.$userForm.find('input[name="bmdm"]').val(), //部门代码，此处传值为org_id
            bmqxdm: configMap.bmqxdmVal, //部门权限代码，此处传值为code
            savebmqxdm: configMap.savebmqxdmVal, //部门权限代码，此处传值为code
            jsdm: jsdm,
            jsname: jsname,
            //ygxl: jqueryMap.$userForm.find('#education').val(),
            //sfzhm: jqueryMap.$userForm.find('#idCard').val(),
            //cyzz: jqueryMap.$userForm.find('#qualifications').val(),
            cyrq: jqueryMap.$userForm.find('#dateOfBusiness').val(),
            ifChangeJsdm:ifChangJsdm,
            ifChangName:ifChangName
        };

        var AppAlert = function (msg) {
            App.alert({
                container: jqueryMap.$userForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: msg,
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
                AppAlert('登录账号格式有误，请输入6-20位数字和字母!');
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

//        var url = configMap.path + configMap.dataUrl;
//        var requestType = 'POST';
//        if (configMap.id) {
//            url = configMap.path + configMap.dataUrl + "/user/" + configMap.id;
//        }
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/user/" + configMap.id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(blockTarget);
                if (result.success) {
                    callback(true);
                }
                else {
                    App.alert({
                        container: jqueryMap.$userForm.closest(".modal-body"),
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
                    container: jqueryMap.$userForm.closest(".modal-body"),
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
                    $("#roleWrap").append(oSpan);
                }
                $("#roleWrap span").click(function () {
                	var selectedRole = 0;
                	$("#roleWrap span").each(function(){
                		if ($(this).hasClass("btnBlue colorfff")) {
                			$(this).removeClass("btnBlue colorfff");
                			return false; 
                		}
                	});
                	$(this).addClass("btnBlue colorfff");
                    
                });

                if (configMap.id) {
                    getUser(configMap.id);
                    jqueryMap.$userForm.find('input[name=userAccount]').attr('readOnly', 'readOnly');
                } else {
                    if (configMap.orgId) {
                        jqueryMap.$userForm.find('[id=btnSelectOrg]').attr('disabled', 'disabled');
                        jqueryMap.$userForm.find('[id=btnSelectOrg] span').text(getOrgName(configMap.orgId));
                        $('#btnSelectOrg').off('click');
                    }
                    jqueryMap.$userForm.find('input[name="sex"][value=1]').iCheck('check');
                }
            },
            error: function () {
                if (configMap.id) {
                    getUser(configMap.id);
                    jqueryMap.$userForm.find('input[name=userAccount]').attr('readOnly', 'readOnly');
                } else {
                    if (configMap.orgId) {
                        jqueryMap.$userForm.find('[id=btnSelectOrg]').attr('disabled', 'disabled');
                        jqueryMap.$userForm.find('[id=btnSelectOrg] span').text(getOrgName(configMap.orgId));
                        $('#btnSelectOrg').off('click');
                    }
                    jqueryMap.$userForm.find('input[name="sex"][value=1]').iCheck('check');
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

    var getUser = function (id) {
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                jqueryMap.$userForm.find('input[name="name"]').val(data.name);
                jqueryMap.$userForm.find('input[name="userAccount"]').val(data.userAccount);
                jqueryMap.$userForm.find('input[name="sex"][value=' + data.xbdm + ']').iCheck('check');
                jqueryMap.$userForm.find('[name=birthDay]').val(moment(data.csrq).format("YYYY-MM-DD"));
                jqueryMap.$userForm.find('input[name="phone"]').val(data.yddh);
                jqueryMap.$userForm.find('input[name="tel"]').val(data.tel);
                jqueryMap.$userForm.find('input[name="qq"]').val(data.qq);
                jqueryMap.$userForm.find('input[name="email"]').val(data.email);
                jqueryMap.$userForm.find('input[name="lxdz"]').val(data.lxdz);
                jqueryMap.$userForm.find('input[name="remark"]').val(data.remark);
                jqueryMap.$userForm.find('input[name="bmdm"]').val(data.bmdm);
                if ($('#userBMAuthority').length === 1) { //有按钮权限
                	jqueryMap.$userForm.find('input[name="ddtree"]').val(data.bmqxdm);
                    jqueryMap.$userForm.find('input[name="savetree"]').val(data.savebmqxdm);
                    jqueryMap.$userForm.find('[id=SelectOrgAuth] p').text(data.bmqxmc);
                }
                configMap.bmqxdmVal = data.bmqxdm;
                configMap.savebmqxdmVal = data.savebmqxdm;
                jqueryMap.$userForm.find('[id=btnSelectOrg] span').text(data.bmmc);
                //jqueryMap.$userForm.find('#education').val(data.ygxl).trigger('change');
                //jqueryMap.$userForm.find('#idCard').val(data.sfzhm);
                //jqueryMap.$userForm.find('#qualifications').val(data.cyzz);
                jqueryMap.$userForm.find('#dateOfBusiness').val(moment(data.cyrq).format("YYYY-MM-DD"));
                jqueryMap.$userForm.find('span[id=' + data.jsdm + ']').addClass("btnBlue colorfff");
                configMap.name = data.name;
                configMap.jsdm = data.jsdm;
                //textarea输入字数限制
                surplusHowMany($("#qualifications"),$("#qualificationsWords"),300);
                surplusHowMany($("#remark"),$("#remarkWords"),300);
//                if (data.jsdm != "" && data.jsdm != null) {
//                    var js = data.jsdm.split(',');
//                    for (var i = 0; i < js.length; i++) {
//                        jqueryMap.$userForm.find('span[id=' + js[i] + ']').addClass("btnBlue colorfff");
//                    }
//                }

            },
            error: function () {
                Messenger().post({
                    message: '获取组织结构数据失败！',
                    type: 'error'
                });
            }
        });
    };

    var userValidation = function () {
        jqueryMap.$userForm.validate({
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
                            jqueryMap.$userForm.find('input[name=bmdm]').val(result.id);
                            jqueryMap.$userForm.find('[id=btnSelectOrg] span').text(result.text);
                            jqueryMap.$selectOrgDialog.modal('hide');
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
        	              jqueryMap.$selectOrgDialog.modal('hide');
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
                            jqueryMap.$userForm.find('input[name=ddtree]').val(result.id);
                            jqueryMap.$userForm.find('input[name=savetree]').val(result.savedid);
                            jqueryMap.$userForm.find('[id=SelectOrgAuth] p').text(result.text);
                            jqueryMap.$selectOrgDialog.modal('hide');
                        } else {
                        	jqueryMap.$userForm.find('input[name=ddtree]').val("0");
                        	jqueryMap.$userForm.find('input[name=savetree]').val("0");
                            jqueryMap.$userForm.find('[id=SelectOrgAuth] p').text("本人");
                            jqueryMap.$selectOrgDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };
        }

        if (type === 'changZh') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function (result) {
                    setZh.saveZh(function (result) {
                        if (result.success) {
                            jqueryMap.$userForm.find('input[name=userAccount]').val(result.zh);
                            jqueryMap.$selectOrgDialog.modal('hide');
                            users.reloadData();
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
            jqueryMap.$selectOrgDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var selectOrg = function () {
        openModal('选择所属部门（请选择最后一级部门）',
            configMap.path + configMap.setOrgPageUrl + "?orgid=" + jqueryMap.$userForm.find(
                'input[name=bmdm]').val(), 'edit');
    };
    
    var SelectOrgAuth = function () {
        openModal('选择数据权限',
            configMap.path + configMap.setOrgAuthUrl + "?orgid=" + jqueryMap.$userForm.find(
                'input[name=ddtree]').val(), 'auth');
    };  

    var changecolor = function (e) {
        if ($(e).hasClass("btn-primary")) {
            $(e).removeClass("btn-primary");
        } else {
            $(e).addClass("btn-primary");
        }
    };

    var addImages = function () {
        jqueryMap.$userForm.find('[name^=image]').off('click').on('click', function () {
            var fjlx = $(this).attr('name').substr(5);
            var dialogButtons = {
                success: {
                    label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                    className: "btn btn-default btnBlue borderRadius4 colorfff",
                    callback: function () {
                        userInfoImage.getfile(function (result) {
                            if (result) {
                                jqueryMap.$setimg.modal('hide');
                            }
                        });
                        return false;
                    }
                }
            };

            $.get(configMap.path + configMap.imgUrl + "?id=" + configMap.id + "&dljgbm=" + configMap.dljgbm +
                "&zydm=" + configMap.zydm + "&status=insert" + "&fjlx=" + fjlx, function (html) {
                jqueryMap.$setimg = bootbox.dialog({
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

	var imagesCount = function () {
        $.ajax({
            url: configMap.path + '/user/users/getImagesCount/' + configMap.zydm + "/" + configMap.dljgbm,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                jqueryMap.$userForm.find('#educationImage').html('附件 ('+ data.educationImage + ')');
                jqueryMap.$userForm.find('#qualificationsImage').html('附件 ('+ data.qualificationsImage + ')');
                jqueryMap.$userForm.find('#idCardImage').html('附件 ('+ data.idCardImage + ')');
            }
        });
    };

    /**
     * 修改账号
     */
	var changZH = function () {
        openModal('修改账号', configMap.path + configMap.changeZhUrl + '?zh=' + jqueryMap.$userForm.find('input[name="userAccount"]').val() , 'changZh');
    }

    return {
        // 初始化
        init: function (id, orgId, dljgbm, zydm) {
            configMap.id = id;
            configMap.orgId = orgId;
            configMap.dljgbm = dljgbm;
            configMap.zydm = zydm;
            setJqueryMap();
            //获得全部角色
            getOrder();
            addImages();
            imagesCount(); //计算数量
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

            $('#btnSelectOrg', jqueryMap.$userForm).off('click').on('click', function () {
                selectOrg();
            });
            
            $('#SelectOrgAuth', jqueryMap.$userForm).off('click').on('click', function () {
            	SelectOrgAuth();
            });

            $('#changZH', jqueryMap.$userForm).off('click').on('click', function () {
                changZH();
            });
            jqueryMap.$userForm.find('.birthDay').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$userForm.find('.dateOfBusiness').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$userForm.find('[name=birthDay]').val(moment().format("YYYY-MM-DD"));
            // 控件验证
            // userValidation();
            
            //添加新的部门
		    $('#bmAdd', jqueryMap.$userForm).off().on('click', function () {
		    	bmAddFun();
		    });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },
        // 保存雇员信息，参数为回掉函数
        saveUser: function (callback) {
            if (jqueryMap.$userForm.valid()) {
                saveUser(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=users/edit.js