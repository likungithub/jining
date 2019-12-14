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

/*global $, App, moment, jQuery, bootbox, roleEdit */

var roles = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/role/roles/role',
    TreeUrl: '/role/roles/roleTree',
    rolesGrid: null,
    currentSelectedNode: null,
    optType: null,
    verifyType: '',
    roleName : '',
    editPageUrl: '/role/roles/edit.jsp',
    setAuthPageUrl: '/resource/resources/set-auth.jsp',
    setRoleUser: '/role/roles/setuser.jsp',
    editBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="edit" data-toggle="tooltip" title="编辑角色信息"><i class="fa fa-edit"></i></a>',
    deleteBtn_html: '<a href="javascript:;" class="btn btn-xs btn-default" data-type="del" data-toggle="tooltip" title="删除角色"><i class="fa fa-times"></i></a>'
  };

  // 全局Dom
  var jqueryMap = {
    $container: null,
    $roleFrom: null,
    $blockTarget: null,
    $roleTree: null,
    $rolesDialog: null,
    $selectedRow: null,
    $roleDataTable: null
  };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#role-manager-content');
    jqueryMap.$blockTarget = jqueryMap.$container;
    jqueryMap.$roleFrom = $('#roleForm', jqueryMap.$container);
    jqueryMap.$roleTree = $('#role_manage_tree', jqueryMap.$container);
  };
  
  var clearFormInput = function () {
    jqueryMap.$roleFrom.find('input[name=roleName]').val('');
    jqueryMap.$roleFrom.find('textarea[name=roleRemark]').val('');
  };
  
  //新增角色
  var addNewRole = function () {
	$('#btnSaveRole', jqueryMap.$container).show(); // 展示保存按钮
    configMap.optType = 'add';
    jqueryMap.$roleFrom.find('input, select, textarea, button').removeAttr('disabled');
    clearFormInput();
  };
  
  //删除角色
  var deleteRole = function () {
    if (configMap.currentSelectedNode == null) {
      Messenger().post({message: '请选择一个角色！', type: 'warning'});
      return;
    }

    clearFormInput();
    configMap.optType = 'del';
    if (configMap.currentSelectedNode.parent === '#') {
      Messenger().post({message: '不能删除！', type: 'warning'});
    }
    else {
      bootbox.dialog({
        title: '提示',
        message: '确定要删除该角色？',
        buttons: {
          success: {
            label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
            className: "btn-danger",
            callback: function () {
              App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在删除角色，请稍候...'
              });

              $.ajax({
                url: configMap.path + configMap.dataUrl + "/" + configMap.currentSelectedNode.id,
                type: 'DELETE',
                success: function (result) {
                  App.unblockUI(jqueryMap.$blockTarget);
                  if (result.success) {
                    if (configMap.currentSelectedNode != null) {
                      jqueryMap.$roleTree.jstree(true).delete_node(configMap.currentSelectedNode);
                      jqueryMap.$roleTree.jstree(true).select_node(configMap.currentSelectedNode.parent);
                    }
                    Messenger().post({message: "删除成功!", type: 'success'});
                  }
                  else {
                    Messenger().post({message: result.message, type: 'error'});
                  }
                },
                error: function () {
                  App.unblockUI(jqueryMap.$blockTarget);
                  Messenger().post({message: '删除失败！', type: 'error'});
                }
              });
            }
          },
          cancel: {
	          label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
	          className: 'btn-default'
	      }
        }
      });
    }
  };
  
  //新增角色保存
  var saveRole = function () {
    if (!jqueryMap.$roleFrom.valid()) {
      return;
    }

    var rolename = jqueryMap.$roleFrom.find('input[name=roleName]').val();
    var data = {
      name: rolename,
      remark: jqueryMap.$roleFrom.find('textarea[name=roleRemark]').val(),
      jsbz: null
    };
    
    var url = configMap.path + configMap.dataUrl;
    var requestType = 'POST';
    if (configMap.optType === 'add') { //新增
      if (configMap.currentSelectedNode !== null && configMap.currentSelectedNode.id === 'xtjs' ) { // 若新增的是系统角色
    	  data.jsbz = '001';
      } else if(configMap.currentSelectedNode.id === 'ywjs') { //新增为业务角色
    	  data.jsbz = '002';
      } else {
    	  Messenger().post({message: '选择为空！', type: 'warning'});
    	  return;
      }
    } else if (configMap.optType === 'edit') { //对已有的进行编辑
    	var ifFirst = true;
    	if (configMap.roleName != rolename) { //名字不变
    		ifFirst = false;
    	}
    	url = "/role/roles/updateRoleByJsdm?jsdm=" + configMap.currentSelectedNode.id + '&ifFirst=' + ifFirst;
    	data.jsbz = configMap.currentSelectedNode.parent;
    	requestType = 'PUT';
    }

    App.blockUI({
      target: jqueryMap.$blockTarget,
      boxed: true,
      message: '正在保存数据，请稍候...'
    });
    $.ajax({
      url: url,
      type: requestType,
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      data: JSON.stringify(data),
      success: function (result) {
        App.unblockUI(jqueryMap.$blockTarget);
        if (!result.success) {
          Messenger().post({message: result.message, type: 'error'});
        }
        else {
          var nodeData = {
            id: result.jsdm,
            text: data.name
          };
          if (configMap.optType === 'edit') {
            configMap.currentSelectedNode.text = data.name;
            jqueryMap.$roleTree.jstree(true).rename_node(configMap.currentSelectedNode, data.name);
          }
          else {
            jqueryMap.$roleTree.jstree(true)
              .create_node(data.jsbz === '001' ? 'xtjs' : 'ywjs', nodeData);
            jqueryMap.$roleTree.jstree(true).deselect_all();
            jqueryMap.$roleTree.jstree(true).select_node(result.jsdm);
          }

          Messenger().post({message: '保存数据成功！', type: 'success'});
        }
      },
      error: function (ex, e, ee) {
        App.unblockUI(jqueryMap.$blockTarget);
        Messenger().post({message: '保存数据失败！', type: 'error'});
      }
    });
  };
  
  var initRolesData = function () {
    jqueryMap.$roleTree.jstree({
      'core': {
        "themes": {
          "responsive": false
        },
        "check_callback": true,
        'data': {
          'url': configMap.path + configMap.TreeUrl
        }
      },
      "types": {
        "default": {
          "icon": "fa fa-folder icon-state-warning icon-lg"
        },
        "file": {
          "icon": "fa fa-file icon-state-warning icon-lg"
        }
      },
      'plugins': ["contextmenu", "types", "expand"],
      "expand": {
        level: 2
      },
      "contextmenu": {
        items: function (o, cb) {
          var actions = {};
          if (configMap.verifyType !== 'ad') {
            actions.create = {
              "separator_before": false,
              "separator_after": false,
              "_disabled": o.parent !== '#', //当目录父节点不为根节点时，不能再增加
              "icon": 'fa fa-plus',
              "label": "新增下级角色",
              "action": function (data) {
                addNewRole();
              }
            };
            actions.del = {
              "separator_before": false,
              "separator_after": false,
              "_disabled": o.parent === '#', //当目录父节点为根节点时，不能删除
              "icon": 'fa fa-trash-o',
              "label": "删除角色",
              "action": function (data) {
                deleteRole();
              }
            };
          }
          return actions;//返回右键菜单项
        }
      }
    });

    jqueryMap.$roleTree.on('select_node.jstree', function (e, data) {
      if (data.node.parent === '#') { //父节点为根节点的时候，
        $('#btnSaveRole', jqueryMap.$container).hide(); //保存按钮隐藏
      } else {
    	$('#btnSaveRole', jqueryMap.$container).show(); // 展示保存按钮
      }
      
      jqueryMap.$roleFrom.find('input, select, textarea, button').removeAttr('disabled');
      clearFormInput();
      configMap.currentSelectedNode = data.node;
      configMap.optType = 'edit';
      App.blockUI({
        target: jqueryMap.$blockTarget,
        boxed: true,
        message: '正在获取数据，请稍候...'
      });
      
      $.ajax({
        url: "/role/roles/getRoleByJsdm?jsdm=" + configMap.currentSelectedNode.id,
        dataType: 'JSON',
        type: 'GET',
        success: function (result) {
          configMap.roleName = result.name;
          App.unblockUI(jqueryMap.$blockTarget);
          jqueryMap.$roleFrom.find('input[name=roleName]').val(result.name);
          jqueryMap.$roleFrom.find('textarea[name=roleRemark]').val(result.remark);
          if (data.node.parent === '#') {
            jqueryMap.$roleFrom.find('input[name=roleName]').attr('disabled', 'disabled');
            jqueryMap.$roleFrom.find('textarea[name=roleRemark]').attr('disabled', 'disabled');
          }
        },
        error: function () {
          App.unblockUI(jqueryMap.$blockTarget);
          Messenger().post({message: '获取数据失败！', type: 'error'});
        }
      });
    });
  };
  
  var roleValidation = function () {
    jqueryMap.$roleFrom.validate({
      errorElement: 'span',
      errorClass: 'help-block help-block-error',
      focusInvalid: false,
      ignore: "",
      rules: { // rules 中的属性name为Input的name属性值
        roleName: {
          minlength: 2,
          required: true
        }
      },
      messages: {
        roleName: {
          required: '角色名称为必填项！'
        }
      },
      errorPlacement: function (error, element) { // 为每种input设置错误输出位置
        if (element.parent(".input-group").size() > 0) {
          error.insertAfter(element.parent(".input-group"));
        } else if (element.attr("data-error-container")) {
          error.appendTo(element.attr("data-error-container"));
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
  

  var openModal = function (title, url, type, func) {
    var dialogButtons = {};

    if (type === 'edit') {
      dialogButtons.success = {
        label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
        className: "btn btn-default btnBlue borderRadius4 colorfff",
        callback: function () {
          func();
          return false;
        }
      };
    }
      dialogButtons.cancel= {
          label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
              className: 'btn btn-default borderRadius4'
      }

    $.get(url, function (html) {
      jqueryMap.$rolesDialog = bootbox.dialog({
        title: title,
        message: html,
        buttons: dialogButtons
      });
    });
  };
  
  var setUser = function () {
	if (configMap.currentSelectedNode == null || configMap.currentSelectedNode.parent === '#') {
      Messenger().post({
        message: '请选择一个角色！',
        type: 'warning'
      });
    } else {
    	var id = configMap.currentSelectedNode.li_attr.uuid;
      openModal('设置角色用户',
        configMap.path + configMap.setRoleUser + "?id=" + encodeURI(id),
        'edit',
        function () {
          SetRoleUser.saveRoleUser(function (result) {
            if (result) {
              jqueryMap.$rolesDialog.modal('hide');
            }
          });
        });
    }
  };

  var setRolAuth = function () {
    if (configMap.currentSelectedNode === null || configMap.currentSelectedNode.parent === '#') {
      Messenger().post({
        message: '请选择一个角色！',
        type: 'warning'
      });
    } else {
      var id = configMap.currentSelectedNode.li_attr.uuid;
      openModal('设置功能权限', configMap.path + configMap.setAuthPageUrl + "?id=" + encodeURI(id)
        + '&type=role', 'edit',
        function () {
          setAuth.saveAuth(function (result) {
            if (result) {
              jqueryMap.$rolesDialog.modal('hide');
            }
          });
        });
    }
  };

  return {
    init: function () {
    	setJqueryMap();
    	
    	var tabid=$('#role-manager-content').parents('.tab-pane').attr('id').slice(17);

        tabMenu(tabid);
    	
	    Layout.addResizeContent(jqueryMap.$container);
	    setTimeout(function () {
	      var layout = jqueryMap.$container.layout({
	        center__onresize: App.initLayoutContentScrollbar,
	        west__onresize: App.initLayoutContentScrollbar,
	        west__size: 300
	      });
	
	      App.initLayoutContentScrollbar('west', layout.panes.west);
	      App.initLayoutContentScrollbar('center', layout.panes.center);
	    }, 10);
	    
      $('#btnSaveRole', jqueryMap.$roleFrom).off().on('click', function () {
    	  saveRole();
      });
      $('#btnSetRoleAuth', jqueryMap.$container).off().on('click', function () {
        setRolAuth();
      });
      $('#btnSetUser', jqueryMap.$container).off().on('click', function () {
        setUser();
      });

      
      initRolesData();
    }
  };
}();
//@ sourceURL=roles/roles.js