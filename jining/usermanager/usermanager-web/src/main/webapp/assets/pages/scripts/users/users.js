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

/*global $, App, moment, jQuery, bootbox, UsersEdit */

var users = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/users/user',
        resetUrl: '/users/resetUser',
        pwdUrl: '/users/pwd',
        updateOrg: '/users/setorg',
        getUserOrg: '/users/getorg',
        userRoleUrl: '/users/userrole',
        setUserStatusUrl: '/users/status',
        usersGrid: null,
        addPageUrl: '/users/add.jsp',
        editPageUrl: '/users/edit.jsp',
        setRolePageUrl: '/users/set-role.jsp',
        setOrgPageUrl: '/users/set-org.jsp',
        setAuthPageUrl: '/resource/resources/set-auth.jsp',
        checkKhUrl:'/customermanage/ptkhxx/getKhNum',
        checkBmUrl:'/customermanage/ptkhxx/getBmNum',
        viewPageUrl: '/users/view.jsp',
        verifyType: '',
        zt:1,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs" data-type="user_edit" data-toggle="tooltip" title="编辑员工信息"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs" data-type="user_del" data-toggle="tooltip" title="员工离职"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs " data-type="user_view" data-toggle="tooltip" title="查看员工信息"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        editAuthority_html: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default" data-toggle="tooltip" title="编辑员工信息"><i style="color: #666 !important;" class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteAuthority_html: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default" data-toggle="tooltip" title="员工离职"><i style="color: #666 !important;" class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $usersDialog: null,
        $selectedRow: null,
        $userDataTable: null
    };
    
    var userjson=[];

    var setJqueryMap = function () {
        jqueryMap.$container = $('#user-manager-container');
        jqueryMap.$blockTarget = jqueryMap.$container;
        jqueryMap.$userDataTable = $('#users_data', jqueryMap.$container);
    };

    var initUsersData = function () {
        jqueryMap.$selectedRow = null;
        App.blockUI({
//            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                App.unblockUI($('body'));
                configMap.usersGrid.clear().draw();
                if (datas.length > 0) {
                    return configMap.usersGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI($('body'));
            }
        });
    };
    
    //下拉框数据改变
    var resetData = function(){
    	var zt = $('#ygzt', jqueryMap.$container).val();
    	configMap.zt = zt;
    	App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.resetUrl + '/' + zt,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (configMap.zt == 0) {
                	$('#btnNewUser', jqueryMap.$container).prop('disabled',true);
                    $('#btnSetRole', jqueryMap.$container).prop('disabled',true);
                    $('#btnSetOrg', jqueryMap.$container).prop('disabled',true);
                    $('#btnResetPwd', jqueryMap.$container).prop('disabled',true);
                    $('#btnSetUserAuth', jqueryMap.$container).prop('disabled',true);
                    $('#btnDelUser', jqueryMap.$container).hide();
                    $('#btnReUser', jqueryMap.$container).show();
                } else {
                	$('#btnNewUser', jqueryMap.$container).prop('disabled',false);
                    $('#btnSetRole', jqueryMap.$container).prop('disabled',false);
                    $('#btnSetOrg', jqueryMap.$container).prop('disabled',false);
                    $('#btnResetPwd', jqueryMap.$container).prop('disabled',false);
                    $('#btnSetUserAuth', jqueryMap.$container).prop('disabled',false);
                    $('#btnDelUser', jqueryMap.$container).show();
                    $('#btnReUser', jqueryMap.$container).hide();
                }
                configMap.usersGrid.clear().draw();
                if (datas.length > 0) {
                    return configMap.usersGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }

    var openModal = function (title, url, type, fun) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    fun();
                    return false;
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭',
            className: 'btn btn-default borderRadius4'
        }

        $.get(url, function (html) {
            jqueryMap.$usersDialog = bootbox.dialog({
                className: 'edit-users-info',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var setUserStatus = function (event, el) {
        var rowIndex = configMap.usersGrid.cell(el.closest('td')).index().row;
        var id = configMap.usersGrid.row(rowIndex).data().id;
        var currentStatus = el.attr('user-status');
        var title = '';

        var excStatus = 0;
        var disHtml = '';
        if (currentStatus === '1') {
            disHtml = '<i class="icon iconfont icon-suo  iconFontColor-10a0f7 iconFontSize"></i>';
            title = '停用';
            excStatus = 0;
        } else if (currentStatus === '0') {
            disHtml = '<i class="icon iconfont icon-kaisuo  iconFontColor-10a0f7 iconFontSize"></i>';
            title = '启用';
            excStatus = 1;
        }

        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在' + title + '员工，请稍候...'
        });

        $.ajax({
            url: configMap.path + configMap.setUserStatusUrl
            + "/" + id + "/" + excStatus,
            type: 'PUT',
            success: function (datas) {
                App.unblockUI(jqueryMap.$blockTarget);
                el.html(disHtml);
                el.attr('data-original-title', '已' + title);
                el.attr('user-status', excStatus);

                Messenger().post({
                    message: '成功' + title + '员工！'
                });
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: title + '员工失败！',
                    type: 'error'
                });
            }
        });
    };

    var viewUsers = function () {
    	stopContinueClick(this,300);
        var el = $(this);
        var rowIndex = configMap.usersGrid.cell(el.closest('td')).index().row;
        var id = configMap.usersGrid.row(rowIndex).data().id;
        var dljgbm = configMap.usersGrid.row(rowIndex).data().dljgBm;
        var zydm = configMap.usersGrid.row(rowIndex).data().zydm;
        openModal("查看员工信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id) + "&dljgbm=" +
            encodeURI(dljgbm) + "&zydm=" + encodeURI(zydm), 'view');
    };

    var addUsers = function () {
    	stopContinueClick("addUsers",300);
        openModal('添加员工（初始密码：000000）', configMap.path + configMap.addPageUrl, 'edit',
            function () {
        		userAdd.saveUser(function (result) {
                    if (result) {
                        initUsersData();
                        jqueryMap.$usersDialog.modal('hide');
                    }
                });
            });
    };

    //设置员工角色
    var setRoles = function () {
    	var data = getData();
    	
		if (data.user.length === 0) {
            Messenger().post({
                message: '请选择至少一个员工！',
                type: 'warning',
                id:'qxzygyh0'
            });
        } else {
        	stopContinueClick("btnSetRole",300);
            openModal('设置员工角色',
                configMap.path + configMap.setRolePageUrl,'edit', function () {
                    setUserRole.saveUserRole(function (result) {
                          $.ajax({
	                          url: configMap.path + configMap.userRoleUrl + "/" + result,
	                          type: 'PUT',
	                          dataType: 'JSON',
            		          contentType: 'application/json; charset=utf-8',
            		          data: JSON.stringify(data),
	                          success: function () {
	                        	  jqueryMap.$usersDialog.modal('hide');
	                        	  userSearch();
	                          },
	                          error: function (ex, e, ee) {
                                  Messenger().post({
                                      message: '设置角色失败！',
                                      type: 'error'
                                  });
                              }
                        });
                });
            });
        }
    };

    //重新选择部门
    var setOrg = function () {
    	var data = getData();
    	
		if (data.user.length === 0) {
            Messenger().post({
                message: '请选择至少一个员工！',
                type: 'warning',
                id:'qxzygyh1'
            });
        } else {
        	stopContinueClick("btnSetOrg",300);
            var userOrg = null;
            openModal('设置所属部门（请选择最后一级部门）', configMap.path + configMap.setOrgPageUrl + '?orgid=' + userOrg,
                'edit', function () {
                    setUserOrg.getSelectedOrg(function (result) {
                        if (result) {
                            $.ajax({
                                url: configMap.path + configMap.updateOrg + '/' + result.id,
                                async: false,
                                type: 'PUT',
                                dataType: 'JSON',
              		          	contentType: 'application/json; charset=utf-8',
              		          	data: JSON.stringify(data),
                                success: function () {
                                    Messenger().post({
                                        message: '成功修改部门！',
                                        type: 'success'
                                    });
                                    userSearch();
                                },
                                error: function () {
                                    Messenger().post({
                                        message: '修改部门失败！',
                                        type: 'error'
                                    });
                                }
                            });
                            jqueryMap.$usersDialog.modal('hide');
                        }
                    });
                });
        }
    };

    var setUserAuth = function () {
        if (jqueryMap.$selectedRow === null) {
            Messenger().post({
                message: '请选择至少一个员工！',
                type: 'warning',
                id:'qxzygyh2'
            });
        } else {
        	stopContinueClick("btnSetRole",300);
            var id = jqueryMap.$selectedRow.data().id;
            openModal('设置员工功能权限', configMap.setAuthPageUrl + "?id=" + encodeURI(id)
                + '&type=user', 'edit',
                function () {
                    setAuth.saveAuth(function (result) {
                        if (result) {
                            jqueryMap.$usersDialog.modal('hide');
                        }
                    });
                });
        }
    };
    
    var getData = function(){
    	var inputjson = $('[type="checkbox"]:checked',jqueryMap.$userDataTable).not(jqueryMap.$container.find('input[id="selectUser"]'));
		var temp = null;
		userjson=[];
		$(inputjson).each(function(){
				temp = {user:$(this).attr('id').substring(5)};
				userjson.push(temp);
		});
		var data = {
			user:userjson
		};
		return data;
    }

    var delUser = function (e) {
    	var data = getData();
		if (data.user.length === 0) {
            Messenger().post({
                message: '请选择至少一个员工！',
                type: 'warning',
                id:'qxzygyh3'

            });
        } else if (e === 1) {
        	stopContinueClick("btnDelUser",300);
        	//检测该员工在派工管理中是否还有记录（未删除的）
        	$.ajax({
                url: configMap.checkKhUrl,
                type: 'POST',
                dataType: 'JSON',
		          	contentType: 'application/json; charset=utf-8',
		          	data: JSON.stringify(data),
                success: function (datas) {
                	if (!datas.success) {
                		Messenger().post({
                            message: datas.message,
                            type: 'warning'
                        });
                		return false;
                	} else {
                		bootbox.dialog({
                            title: '提示',
                            message: '确定要删除员工？',
                            buttons: {
                                success: {
                                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                                    className: "btn btn-danger borderRadius4",
                                    callback: function () {
                                        App.blockUI({
                                            target: jqueryMap.$blockTarget,
                                            boxed: true,
                                            message: '正在删除员工，请稍候...'
                                        });

                                        $.ajax({
                                            url: configMap.path + configMap.dataUrl + "/deleteUser/" + e,
                                            type: 'PUT',
                                            dataType: 'JSON',
                          		          	contentType: 'application/json; charset=utf-8',
                          		          	data: JSON.stringify(data),
                                            success: function (result) {
                                                App.unblockUI(jqueryMap.$blockTarget);
                                                if (result.success) {
                                                	userSearch();
                                                    Messenger().post({
                                                        message: '删除成功！'
                                                    });
                                                }
                                                else {
                                                    Messenger().post({
                                                        message: result.message,
                                                        type: 'error'
                                                    });
                                                }
                                            },
                                            error: function () {
                                                App.unblockUI(jqueryMap.$blockTarget);
                                                Messenger().post({
                                                    message: '删除失败！',
                                                    type: 'error'
                                                });
                                            }
                                        });
                                    }
                                },
                                cancel: {
                                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                                    className: 'btn btn-default borderRadius4'
                                }
                            }
                        });
                	}
                },
                error: function () {
                    Messenger().post({
                        message: '员工任务检查失败！',
                        type: 'error'
                    });
                    return false;
                }
            });
        } else {
        	stopContinueClick("btnReUser",300);
        	//检测员工所在部门编码是否为最后一级
        	$.ajax({
                url: configMap.checkBmUrl,
                type: 'POST',
                dataType: 'JSON',
		        contentType: 'application/json; charset=utf-8',
		        data: JSON.stringify(data),
                success: function (datas) {
                	if (!datas.success) {
                		Messenger().post({
                            message: datas.message,
                            type: 'warning'
                        });
                		return false;
                	} else {
                		bootbox.dialog({
                            title: '提示',
                            message: '确定要恢复员工？',
                            buttons: {
                                success: {
                                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                                    className: "btn btn-danger borderRadius4",
                                    callback: function () {
                                        App.blockUI({
                                            target: jqueryMap.$blockTarget,
                                            boxed: true,
                                            message: '正在恢复员工，请稍候...'
                                        });
                                        $.ajax({
                                            url: configMap.path + configMap.dataUrl + "/deleteUser/" + e,
                                            type: 'PUT',
                                            dataType: 'JSON',
                          		          	contentType: 'application/json; charset=utf-8',
                          		          	data: JSON.stringify(data),
                                            success: function (result) {
                                                App.unblockUI(jqueryMap.$blockTarget);
                                                if (result.success) {
                                                	userSearch();
                                                    Messenger().post({
                                                        message: '恢复成功！'
                                                    });
                                                }
                                                else {
                                                    Messenger().post({
                                                        message: result.message,
                                                        type: 'error'
                                                    });
                                                }
                                            },
                                            error: function () {
                                                App.unblockUI(jqueryMap.$blockTarget);
                                                Messenger().post({
                                                    message: '恢复失败！',
                                                    type: 'error'
                                                });
                                            }
                                        });
                                    }
                                },
                                cancel: {
                                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                                    className: 'btn btn-default borderRadius4'
                                }
                            }
                        });
                	}
                }
        	});
        }
    }
    
    //单个删除
    var del = function(event, el){
    	var rowIndex = configMap.usersGrid.cell(el.closest('td')).index().row;
        var id = configMap.usersGrid.row(rowIndex).data().id;
		
		userjson=[];
		var temp = {user:id};
		userjson.push(temp);
		var data = {
			user:userjson
		};
		
		//先检测员工是否存在派工信息等
		$.ajax({
            url: configMap.checkKhUrl,
            type: 'POST',
            dataType: 'JSON',
	        contentType: 'application/json; charset=utf-8',
	        data: JSON.stringify(data),
            success: function (datas) {
            	if (!datas.success) {
            		Messenger().post({
                        message: datas.message,
                        type: 'warning'
                    });
            		return false;
            	} else {
            		App.blockUI({
                        target: jqueryMap.$blockTarget,
                        boxed: true,
                        message: '正在删除员工，请稍候...'
                    });
                    $.ajax({
                        url: configMap.path + configMap.dataUrl + "/deleteUser/1",
                        type: 'PUT',
                        dataType: 'JSON',
            	          	contentType: 'application/json; charset=utf-8',
            	          	data: JSON.stringify(data),
                        success: function (result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (result.success) {
                            	userSearch();
                                Messenger().post({
                                    message: '删除成功！'
                                });
                            }
                            else {
                                Messenger().post({
                                    message: result.message,
                                    type: 'error'
                                });
                            }
                        },
                        error: function () {
                            App.unblockUI(jqueryMap.$blockTarget);
                            Messenger().post({
                                message: '删除失败！',
                                type: 'error'
                            });
                        }
                    });
            	}
            }
		});
    }

    var resetPwd = function () {
    	var data = getData();
		if (data.user.length === 0) {
            Messenger().post({
                message: '请选择至少一个员工！',
                type: 'warning',
                id:'qxzygyh4',
            });
        } else {
        	stopContinueClick("btnResetPwd",300);
            bootbox.dialog({
                title: '提示',
                message: '确定要重置密码？（默认密码为：000000）',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在重置密码，请稍候...'
                            });
                            $.ajax({
                                url: configMap.path + configMap.pwdUrl,
                                type: 'PUT',
                                dataType: 'JSON',
              		          	contentType: 'application/json; charset=utf-8',
              		          	data: JSON.stringify(data),
                                success: function (datas) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    Messenger().post({
                                        message: '密码重置成功！'
                                    });
                                },
                                error: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    Messenger().post({
                                        message: '密码重置失败！',
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }
    };
    
    /**
     * 根据文本框内容查询
     */
    var userSearch = function (){
    	var searchText = $('#searchFilter', jqueryMap.$container).val();
    	var zt = $('#ygzt', jqueryMap.$container).val();
    	var ygssbm = $('#ygssbm', jqueryMap.$container).val();
    	var ygssjs = $('#ygssjs', jqueryMap.$container).val();
    	var createTime = $('#userCreateDate', jqueryMap.$container).val();
    	configMap.zt = zt;
    	App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
    	var data = {
    		searchText : searchText,
    		zt : zt,
    		ygssbm : ygssbm,
    		ygssjs : ygssjs,
    		createTime : createTime
    	}
        $.ajax({
            url: configMap.path + configMap.resetUrl,
            dataType: 'JSON',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
	        data: JSON.stringify(data),
            success: function (datas) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (configMap.zt == 0) {
                	$('#btnNewUser', jqueryMap.$container).prop('disabled',true);
                    $('#btnSetRole', jqueryMap.$container).prop('disabled',true);
                    $('#btnSetOrg', jqueryMap.$container).prop('disabled',true);
                    $('#btnResetPwd', jqueryMap.$container).prop('disabled',true);
                    $('#btnSetUserAuth', jqueryMap.$container).prop('disabled',true);
                    $('#btnDelUser', jqueryMap.$container).hide();
                    $('#btnReUser', jqueryMap.$container).show();
                } else {
                	$('#btnNewUser', jqueryMap.$container).prop('disabled',false);
                    $('#btnSetRole', jqueryMap.$container).prop('disabled',false);
                    $('#btnSetOrg', jqueryMap.$container).prop('disabled',false);
                    $('#btnResetPwd', jqueryMap.$container).prop('disabled',false);
                    $('#btnSetUserAuth', jqueryMap.$container).prop('disabled',false);
                    $('#btnDelUser', jqueryMap.$container).show();
                    $('#btnReUser', jqueryMap.$container).hide();
                }
                configMap.usersGrid.clear().draw();
                if (datas.length > 0) {
                    return configMap.usersGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }

    var editUsers = function () {
    	stopContinueClick(this,300);
        var el = $(this);
        var rowIndex = configMap.usersGrid.cell(el.closest('td')).index().row;
        var id = configMap.usersGrid.row(rowIndex).data().id;
        var dljgbm = configMap.usersGrid.row(rowIndex).data().dljgBm;
        var zydm = configMap.usersGrid.row(rowIndex).data().zydm;
        openModal('编辑员工信息', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id) + "&dljgbm=" + encodeURI(dljgbm) + "&zydm=" + encodeURI(zydm), 'edit',
            function () {
                userEdit.saveUser(function (result) {
                    if (result) {
                    	userSearch();
                        jqueryMap.$usersDialog.modal('hide');
                    }
                });
            });
    };

    var initUsersGrid = function () {
        configMap.usersGrid =
            jqueryMap.$userDataTable.cDataTable({
                "destroy": true,
                "autoWidth": false,
                "ordering":false,
                "pageLength": 50,
                "columnDefs": [
                    {
                        "targets": 1,
                        "render": $.fn.dataTable.render.ellipsis()
                    },
                    {
                        "targets": [5],
                        "orderable": false
                    },
                    {
                        "searchable": false,
                        "targets": [5, 6]
                    }
                ],
                "language": {
                    "zeroRecords": "暂时没有数据",
                    "infoEmpty": "无记录",
                    "sEmptyTable": "暂时没有数据",
                    "sInfoThousands":",",
                    "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                },
                "columns": [
                     { className:'text-center',
					   "data": "id",
					   "render": function (data, type, row) {
                         if (row.ifManager == true) { //是管理员
                             return '<input type="checkbox" disabled="disabled" name="user_checkbox" id="user_manager"/>';
                         } else {
                             return '<input type="checkbox" name="user_checkbox" id="user_'+data+'"/>';
                         }
						}
					},
                    {className:'text-left',
                        "data": "name",
                        render:function(d){
                        return '<span style="cursor: default;"  data-toggle="tooltip" data-placement="top" title="'+ d+'">'+ d+'</span>'
                        }
                    },
                    {"data": "userAccount"},
                    {"data": "orgName",
                        class:'text-left'
                    },
                    {"data": "jsdm"},
                    {
                        "data": "createDate",
                        "render": function (data, type, row) {
                            return moment(data)
                                .format('YYYY-MM-DD');
                        },
                        class:'text-center'

                    },
                    {"data": "email",className:"text-left"},
                    {
                    	"data": "ifManager",
                        "align": 'center',
                        "render": function (data, type, row) {
                            if (configMap.verifyType === 'ad') {
                                return configMap.viewBtn_html;
                            }
                            else {
                                /*var statusHtml = '';
                                if (row.enabled === true) {
                                    statusHtml =
                                        '<a href="javascript:;" class="btn btn-xs " data-type="staus" data-toggle="tooltip" user-status="1" title="已启用" data-title="确定要停用员工？"><i class="icon iconfont icon-kaisuo  iconFontColor-10a0f7 iconFontSize"></i></a>';
                                }
                                else {
                                    statusHtml =
                                        '<a href="javascript:;" class="btn btn-xs " data-type="staus" data-toggle="tooltip" user-status="0" title="已停用" data-title="确定要启用员工？"><i class="icon iconfont icon-suo   iconFontColor-10a0f7 iconFontSize"></i></a>';
                                }*/
                                var btn = '';
                                btn +=   configMap.viewBtn_html;
                                
                                if (data == true) {
                                	btn +=  configMap.editAuthority_html  + configMap.deleteAuthority_html;
                                } else {
                                	if (jqueryMap.$container.find('#editUserManagerBtn').length === 1) {
                                        /*if (configMap.zt == 1) { //若为正常状态
                                        	btn += '<button data-type="user_edit" style="border: none;z-index: 10;background: transparent;outline: none;">' + configMap.editBtn_html + '</button>';;
                                        } else { //若为删除状态
                                        	btn += configMap.editAuthority_html;
                                        }*/
                                    	btn +=   configMap.editBtn_html ;
                                    } else {
                                        btn += configMap.editAuthority_html;
                                    }
                                    if (jqueryMap.$container.find('#deleteUserManagerBtn').length === 1) {
                                        if (configMap.zt == 1) {//在职
                                            btn += configMap.deleteBtn_html                                         } else {
                                            btn += configMap.deleteAuthority_html;
                                        }
                                    } else {
                                        btn += configMap.deleteAuthority_html;
                                    }
                                }
                                return btn;
                            }
                        }
                    }
                ],
                "drawCallback": function () { // 数据加载完成后执行
                    var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$userDataTable);
                    var editContainer = $('[data-type="user_edit"]', jqueryMap.$userDataTable);
                    var viewContainer = $('[data-type="user_view"]', jqueryMap.$userDataTable);
                    //var userStatusContainer = $('[data-type="staus"]', jqueryMap.$userDataTable);
                    var delContainer = $('[data-type="user_del"]', jqueryMap.$userDataTable);

                    if (editContainer.length > 0) {
                        editContainer.off('click')
                            .on('click', editUsers);
                    }

                    if (viewContainer.length > 0) {
                        viewContainer.off('click')
                            .on('click', viewUsers);
                    }

                    if (tootipContainer.length > 0) {
                        tootipContainer.tooltip();
                    }

//                    if (userStatusContainer.length > 0) {
//                        userStatusContainer.confirmation({
//                            "title": '是否确定要启停员工？',
//                            "btnOkLabel": '是',
//                            "btnCancelLabel": '否',
//                            "placement": 'left',
//                            "onConfirm": setUserStatus,
//                            "btnOkClass":'btn btn-danger borderRadius4',
//                            "btnCancelClass":"btn btn-default borderRadius4"
//                        });
//                    }
                    
                    if (delContainer.length > 0) {
                    	delContainer.confirmation({
                            "title": '是否确定要删除员工？',
                            "btnOkLabel": '是',
                            "btnCancelLabel": '否',
                            "placement": 'left',
                            "onConfirm": del,
                            "btnOkClass":'btn btn-danger borderRadius4',
                            "btnCancelClass":"btn btn-default borderRadius4"
                        });
                    }
                }
            });

        $('tbody', jqueryMap.$userDataTable).on('click', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.usersGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.usersGrid.row('.success');
            }
        });
    };

//    var syncAd = function () {
//        App.blockUI({
//            target: jqueryMap.$blockTarget,
//            boxed: true,
//            message: '正在同步数据，请稍候...'
//        });
//
//        $.ajax({
//            url: configMap.path + "/syncad",
//            type: 'GET',
//            success: function (result) {
//                App.unblockUI(jqueryMap.$blockTarget);
//                if (result.success) {
//                    initUsersData();
//                    Messenger().post({
//                        message: '同步数据成功！'
//                    });
//                }
//                else {
//                    Messenger().post({
//                        message: result.message,
//                        type: 'error'
//                    });
//                }
//            },
//            error: function () {
//                App.unblockUI(jqueryMap.$blockTarget);
//                Messenger().post({
//                    message: '同步数据失败！',
//                    type: 'error'
//                });
//            }
//        });
//    };
    
    var checkAll = function (status){
		$('[type="checkbox"]',jqueryMap.$userDataTable).prop("checked",status);
		var inputjson = $('[type="checkbox"]:checked',jqueryMap.$userDataTable).not(jqueryMap.$container.find('[name="selectUser"]'));
		var temp = null;
		userjson=[];
		$(inputjson).each(function(){
				temp = {user:$(this).attr('id').substring(5)};
                if(temp.user == "manager") {
                    $(this).prop("checked",false);
                }
				userjson.push(temp);
		});
	};
	
	var initOrg = function () {
		$.ajax({
            url: configMap.path + '/users/getAllZydmBm',
            type: 'GET',
            success: function (dataghs) {
            	if (dataghs != "") {
                    //$("#ygssbm", jqueryMap.$container).append("<option></option>")
                    for (var i = 0; i < dataghs.length; i++) {
                        $("#ygssbm", jqueryMap.$container).append("<option value='" + dataghs[i].bmdm + "'>" + dataghs[i].bmmc + "</option>");
                    }
                }
            }
        });
	}
	
	var initRole = function () {
		$.ajax({
            url: configMap.path + '/users/getAllZydmJs',
            type: 'GET',
            success: function (dataghs) {
            	if (dataghs != "") {
                    //$("#ygssjs", jqueryMap.$container).append("<option></option>")
                    for (var i = 0; i < dataghs.length; i++) {
                        $("#ygssjs", jqueryMap.$container).append("<option value='" + dataghs[i].jsdm + "'>" + dataghs[i].jsname + "</option>");
                    }
                }
            }
        });
	}

    return {
        init: function (firstpage) {
        	setJqueryMap();
        	
        	$('#btnReUser', jqueryMap.$container).hide(); //恢复按钮隐藏
        	
        	var tabid=$('#user-manager-container').parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid,users);

            jqueryMap.$container.find('.userCreateDate').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                clearBtn: true,
                language: 'zh-CN'
            });
//            $.get(configMap.path + '/getsysinfo', null, function (result) {
//                if (result && result.verifytype.toLowerCase() === 'ad') {
//                    $('#btnNewUser', jqueryMap.$container).hide();
//                    $('#btnResetPwd', jqueryMap.$container).hide();
//                    $('#btnSetOrg', jqueryMap.$container).hide();
//                    $('#btnSyncAd', jqueryMap.$container).show();
//                    configMap.verifyType = result.verifytype.toLowerCase();
//                    $('#btnSyncAd', jqueryMap.$container).off().on('click', function () {
//                        syncAd();
//                    });
//                }
//            });

            $('#btnNewUser', jqueryMap.$container).off().on('click', function () {
                addUsers();
            });
            $('#btnSetRole', jqueryMap.$container).off().on('click', function () {
                setRoles();
            });
            $('#btnSetOrg', jqueryMap.$container).off().on('click', function () {
                setOrg();
            });
            $('#btnResetPwd', jqueryMap.$container).off().on('click', function () {
                resetPwd();
            });
            $('#btnSetUserAuth', jqueryMap.$container).off().on('click', function () {
                setUserAuth();
            });
            //删除员工
            $('#btnDelUser', jqueryMap.$container).off().on('click', function () {
                delUser(1);
            });
            
            //恢复员工
            $('#btnReUser', jqueryMap.$container).off().on('click', function () {
            	delUser(0);
            });
            
            //员工查询按钮
            $('#userSearchBtn', jqueryMap.$container).off().on('click', function () {
            	userSearch();
            });
            
            //输入框绑定回车事件
			 $('[name="searchFilter"]',jqueryMap.$container).keydown(function() {//给输入框绑定按键事件
		        if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
		        	$("#userSearchBtn",jqueryMap.$container).click();
		        }
		    });

//            $('#searchFilter', jqueryMap.$container).on('keyup', function () {
//                configMap.usersGrid.search(this.value).draw();
//            });
            
            //点击选择所有
            $('#selectUser').change(function (){
    			var el = $(this);
    			checkAll(el.is(':checked'));
    		});

            //下拉框
//            $('#ygzt', jqueryMap.$container).off().on('change', function () {
//                resetData();
//            });
            initUsersGrid();
            initUsersData();
            
            //加载下拉框部门
            initOrg();
            //加载下拉框角色
            initRole();
            
            if (firstpage === '1') {
            	addUsers();
            }
        },
        setPath: function (path) {
            configMap.path = path;
        },
        reloadData:function () {
            initUsersData();
        }
    };
}();
//@ sourceURL=users/users.js