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

var organization = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/organization/organization/org',
    dataTypeUrl: '/organization/organization/orgtype',
    setAuthPageUrl: '/resource/resources/set-auth.jsp',
    createUserPageUrl: '/user/users/edit.jsp',
    currentSelectedNode: null,
    optType: null,
    orgTypes: [],
    verifyType: '',
    name:''
  };

  // 全局Dom
  var jqueryMap = {
    $container: null,
    $orgFrom: null,
    $blockTarget: null,
    $orgTree: null
  };

  var openModal = function (title, url, type, func) {
    var dialogButtons = {
      cancel: {
        label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
        className: 'btn-default'
      }
    };

    if (type === 'edit') {
      dialogButtons.success = {
        label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
        className: "btn-primary",
        callback: function () {
          func();
          return false;
        }
      };
    }

    $.get(url, function (html) {
      jqueryMap.$orgDialog = bootbox.dialog({
        title: title,
        message: html,
        buttons: dialogButtons
      });
    });
  };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#org-manager-content');
    jqueryMap.$blockTarget = jqueryMap.$container;
    jqueryMap.$orgFrom = $('#orgForm', jqueryMap.$container);
    jqueryMap.$orgTree = $('#org_manage_tree', jqueryMap.$container);
  };

  var clearFormInput = function () {
    //jqueryMap.$orgFrom.find('input[name=orgCode]').val('');
    //jqueryMap.$orgFrom.find('input[name=independentOrg][value="true"]').iCheck('check');
    //jqueryMap.$orgFrom.find('[name="orgType"]').val('').trigger('change');
    jqueryMap.$orgFrom.find('input[name=orgName]').val('');
    jqueryMap.$orgFrom.find('textarea[name=orgRemark]').val('');
  };

  var addNewOrg = function () {
	  if (configMap.currentSelectedNode == null) {
	      Messenger().post({message: '请选择一个组织结构！', type: 'warning'});
	      return;
	    }
	  configMap.optType = 'add';
	  jqueryMap.$orgFrom.find('input, select, textarea, button').removeAttr('disabled');
	  clearFormInput();
  };

  var addNewNextOrg = function () {
    if (configMap.currentSelectedNode == null) {
      Messenger().post({message: '请选择一个组织结构！', type: 'warning'});
      return;
    }

    jqueryMap.$orgFrom.find('input, select, textarea, button').removeAttr('disabled');
    clearFormInput();
    configMap.optType = 'addNext';
  };

  var deleteOrg = function () {
    if (configMap.currentSelectedNode == null) {
      Messenger().post({message: '请选择一个组织结构！', type: 'warning'});
      return;
    }

    clearFormInput();
    configMap.optType = 'del';
    if (configMap.currentSelectedNode.children.length > 0) {
      Messenger().post({message: '包含下级组织结构，不能删除！', type: 'warning'});
    }
    else {
      bootbox.dialog({
        title: '提示',
        message: '确定要删除该组织结构？',
        buttons: {
          cancel: {
            label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
            className: 'btn-default'
          },
          success: {
            label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
            className: "btn-danger",
            callback: function () {
              App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在删除组织结构，请稍候...'
              });

              $.ajax({
                url: configMap.path + "/organization/organization/PTorg/" + configMap.currentSelectedNode.id,
                type: 'DELETE',
                success: function (result) {
                  App.unblockUI(jqueryMap.$blockTarget);
                  if (!result.msg) {
                    if (configMap.currentSelectedNode != null) {
                      jqueryMap.$orgTree.jstree(true).delete_node(configMap.currentSelectedNode);
                      if (configMap.currentSelectedNode.parent != '#') {
                        jqueryMap.$orgTree.jstree(true)
                          .select_node(configMap.currentSelectedNode.parent);
                      }
                      else {
                        configMap.currentSelectedNode = null;
                        jqueryMap.$orgFrom.find('input, select, textarea, button')
                          .attr('disabled', 'disabled');
                      }
                    }

                    Messenger().post({message: "删除成功!", type: 'success'});
                  }
                  else {
                    Messenger().post({message: result.msg, type: 'error'});
                  }
                },
                error: function () {
                  App.unblockUI(jqueryMap.$blockTarget);
                  Messenger().post({message: '删除失败！', type: 'error'});
                }
              });
            }
          }
        }
      });
    }
  };

  var saveOrg = function () {
//    if (!jqueryMap.$orgFrom.valid()) {
//      return;
//    }

    var data = {
      name: jqueryMap.$orgFrom.find('input[name=orgName]').val(),
      remark: jqueryMap.$orgFrom.find('textarea[name=orgRemark]').val(),
      parentId: null
    };
    
    if(data.name == "" || data.name == null || data.name == "undefined"){
	    Messenger().post({message: '部门名称不得为空！', type: 'error'});
		return ;
	}

    var url = '/organization/organization/PTorg';
    var requestType = 'POST';
    if (configMap.optType === 'add') {
      if (configMap.currentSelectedNode != null && configMap.currentSelectedNode.parent != '#') {
    	  data.parentId = configMap.currentSelectedNode.parent;
      } else {
    	  data.parentId = '#';
      }
    }
    else if (configMap.optType === 'addNext') {
    	data.parentId = configMap.currentSelectedNode.id;
    }
    else if (configMap.optType === 'edit') {
    	if (configMap.name != data.name) { // 名称改变
    		url = url + "/" + configMap.currentSelectedNode.id + "/1";
    	} else {
    		url = url + "/" + configMap.currentSelectedNode.id + "/0";
    	}
    	data.parentId = configMap.currentSelectedNode.parent === '#' ?
                      '' : configMap.currentSelectedNode.parent;
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
        if (result.errmsg) {
          Messenger().post({message: result.errmsg, type: 'error'});
        }
        else {
          var nodeData = {
            id: result.id,
            text: data.name
          };
          if (configMap.optType === 'edit') {
            configMap.currentSelectedNode.text = data.name;
            jqueryMap.$orgTree.jstree(true).rename_node(configMap.currentSelectedNode, data.name);
          }
          else {
            jqueryMap.$orgTree.jstree(true)
              .create_node(data.parentId ? data.parentId : '#', nodeData);
            jqueryMap.$orgTree.jstree(true).deselect_all();
            jqueryMap.$orgTree.jstree(true).select_node(result.id);
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

//  var setOrgAuth = function () {
//    if (!configMap.currentSelectedNode.li_attr.independent ||
//      configMap.currentSelectedNode.li_attr.independent === 'false') {
//      Messenger().post({message: '非独立应用组织，不能设置功能权限！', type: 'warning'});
//      return;
//    }
//
//    openModal('设置用户功能权限', configMap.path + configMap.setAuthPageUrl + "?id=" + encodeURI(
//        configMap.currentSelectedNode.id) + '&type=org', 'edit',
//      function () {
//        setAuth.saveAuth(function (result) {
//          if (result) {
//            jqueryMap.$orgDialog.modal('hide');
//          }
//        });
//      });
//  };

//  var createOrgUser = function () {
//    openModal('创建用户',
//      configMap.path + configMap.createUserPageUrl + '?orgid=' + configMap.currentSelectedNode.id,
//      'edit', function () {
//        userEdit.saveUser(function (result) {
//          if (result) {
//            jqueryMap.$orgDialog.modal('hide');
//          }
//        });
//      });
//  };

  var initOrganization = function () {
    jqueryMap.$orgTree.jstree({
      'core': {
        "themes": {
          "responsive": false
        },
        "check_callback": true,
        'data': {
          'url': configMap.path + configMap.dataUrl
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
              //"_disabled": o.parent === '#', 当目录为根节点时，不能再增加
              "_disabled": false,
              "icon": 'fa fa-plus',
              "label": "新增组织结构",
              "action": function (data) {
                addNewOrg();
              }
            };
            actions.createNext = {
              "separator_before": false,
              "separator_after": false,
              "_disabled": false,
              "icon": 'fa fa-plus',
              "label": "新增下级组织结构",
              "action": function (data) {
                addNewNextOrg();
              }
            };
            actions.del = {
              "separator_before": false,
              "separator_after": false,
              "_disabled": false,
              "icon": 'fa fa-trash-o',
              "label": "删除组织结构",
              "action": function (data) {
                deleteOrg();
              }
            };
//            actions.createUser = {
//              "separator_before": false,
//              "separator_after": false,
//              "_disabled": false,
//              "icon": 'fa fa-user',
//              "label": "创建用户",
//              "action": function (data) {
//                createOrgUser();
//              }
//            };
          }
//          actions.setAuth = {
//            "separator_before": true,
//            "separator_after": false,
//            "_disabled": false,
//            "icon": 'fa fa-wrench',
//            "label": "设置组织结构权限范围",
//            "action": function (data) {
//              setOrgAuth();
//            }
//          };
          return actions;//返回右键菜单项
        }
      }
    });

    jqueryMap.$orgTree.on('select_node.jstree', function (e, data) {

      jqueryMap.$orgFrom.find('input, select, textarea, button').removeAttr('disabled');
      clearFormInput();
      configMap.currentSelectedNode = data.node;
      configMap.optType = 'edit';
      App.blockUI({
        target: jqueryMap.$blockTarget,
        boxed: true,
        message: '正在获取数据，请稍候...'
      });

      $.ajax({
        url: configMap.path + "/organization/organization/PTorg/" + configMap.currentSelectedNode.id,
        dataType: 'JSON',
        type: 'GET',
        success: function (result) {
          App.unblockUI(jqueryMap.$blockTarget);
          //jqueryMap.$orgFrom.find('input[name=orgCode]').val(result.code);
          jqueryMap.$orgFrom.find('input[name=orgName]').val(result.name);
          jqueryMap.$orgFrom.find('textarea[name=orgRemark]').val(result.remark);
          configMap.name = result.name;
//          if (configMap.verifyType === 'ad') {
//            jqueryMap.$orgFrom.find('input[name=orgName]').attr('disabled', 'disabled');
//            jqueryMap.$orgFrom.find('textarea[name=orgRemark]').attr('disabled', 'disabled');
//          }
        },
        error: function () {
          App.unblockUI(jqueryMap.$blockTarget);
          Messenger().post({message: '获取数据失败！', type: 'error'});
        }
      });
    });
  };

  var orgValidation = function () {
    jqueryMap.$orgFrom.validate({
      errorElement: 'span',
      errorClass: 'help-block help-block-error',
      focusInvalid: false,
      ignore: "",
      rules: { // rules 中的属性name、code、sex等为Input的name属性值
        orgCode: {
          minlength: 2,
          required: true
        },
        orgName: {
          minlength: 2,
          required: true
        }
      },
      messages: {
        orgCode: {
          required: '部门编码为必填项！'
        },
        orgName: {
          required: '部门名称编码为必填项！'
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

  return {
    // 初始化
    init: function (id) {
      setJqueryMap();

      var tabid=$('#org-manager-content').parents('.tab-pane').attr('id').slice(17);

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

//      $.get(configMap.path + '/getsysinfo', null, function (result) {
//        if (result && result.verifytype.toLowerCase() === 'ad') {
//          configMap.verifyType = result.verifytype.toLowerCase();
//        }
//      });

//      $.ajax({
//        url: configMap.dataTypeUrl,
//        dataType: 'JSON',
//        async: false,
//        type: 'GET',
//        success: function (result) {
//          _.forEach(result, function (val, key) {
//            configMap.orgTypes.push({
//              id: val.code,
//              text: val.name
//            });
//          });
//        }
//      });

//      $('input[name="independentOrg"]', jqueryMap.$orgFrom).iCheck({
//        checkboxClass: 'icheckbox_minimal',
//        radioClass: 'iradio_minimal',
//        increaseArea: '20%' // optional
//      });
      jqueryMap.$orgFrom.find('input, select, textarea, button').attr('disabled', 'disabled');

//      $('#orgType', jqueryMap.$orgFrom).select2({
//        placeholder: '选择类型',
//        width: '100%',
//        language: 'zh-CN',
//        allowClear: true,
//        data: configMap.orgTypes
//      });

      //$('#btnNewOrg', jqueryMap.$container).parent('li').addClass('disabled');
      
      $('#btnNewOrg', jqueryMap.$container).off().on('click', function () {
    	  addNewOrg();
      });

      $('#btnNewNextOrg', jqueryMap.$container).off().on('click', function () {
        addNewNextOrg();
      });

      $('#btnDelOrg', jqueryMap.$container).off().on('click', function () {
        deleteOrg();
      });

      $('#btnSaveOrg', jqueryMap.$container).off().on('click', function () {
        saveOrg();
      });

      initOrganization();
      orgValidation();
    },
    // 设置路径
    setPath: function (path) {
      configMap.path = '';
    }
  };
}();
//@ sourceURL=org/org.js