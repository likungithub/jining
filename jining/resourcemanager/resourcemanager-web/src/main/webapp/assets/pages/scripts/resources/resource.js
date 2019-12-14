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

var resources = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/resource/resources/resource',
    dragUrl: '/resource/resources/move',
    currentSelectedNode: null,
    optType: null,
    sourceurl: null
  };

  // 全局Dom
  var jqueryMap = {
    $blockTarget: null,
    $resourceFrom: null,
    $resourceTree: null,
    $container: null
  };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#resource-manager-content');
    jqueryMap.$blockTarget = jqueryMap.$container;
    jqueryMap.$resourceFrom = $('#resourceForm', jqueryMap.$container);
    jqueryMap.$resourceTree = $('#res_manage_tree', jqueryMap.$container);
  };

  var clearFormInput = function () {
    $('#uuid_uuid',jqueryMap.$container).hide();
    jqueryMap.$resourceFrom.find('input[name=resourceName]').val('');
    jqueryMap.$resourceFrom.find('input[name=resourceEnabled][value=true]').iCheck('check');
    jqueryMap.$resourceFrom.find('[name="resourceType"]').val('menu').trigger('change');
    jqueryMap.$resourceFrom.find('input[name=resourceUrl]').val('');
    jqueryMap.$resourceFrom.find('input[name=resourceIdentifier]').val('');
    jqueryMap.$resourceFrom.find('input[name=resourceIcon]').val('');
    jqueryMap.$resourceFrom.find('textarea[name=resourceRemark]').val('');
  };

  var addNewResource = function () {
    configMap.optType = 'add';
    jqueryMap.$resourceFrom.find('input, select, textarea, button').removeAttr('disabled');
    clearFormInput();
  };

  var addNewNextResource = function () {
    if (configMap.currentSelectedNode == null) {
      Messenger().post({
        message: '请选择一个菜单！',
        type: 'warning'
      });
      return;
    }

    if ('item' === configMap.currentSelectedNode.li_attr.type) {
      Messenger().post({
        message: '菜单类型为操作项，不能添加下级菜单！',
        type: 'warning'
      });
      return;
    }

    jqueryMap.$resourceFrom.find('input, select, textarea, button').removeAttr('disabled');
    clearFormInput();
    configMap.optType = 'addNext';
  };

  var deleteResource = function () {
    if (configMap.currentSelectedNode == null) {
      Messenger().post({
        message: '请选择一个菜单！',
        type: 'warning'
      });
      return;
    }

    clearFormInput();
    configMap.optType = 'del';
    if (configMap.currentSelectedNode.children.length > 0) {
      Messenger().post({
        message: '包含下级菜单，不能删除！',
        type: 'warning'
      });
    }
    else {
      bootbox.dialog({
        title: '提示',
        message: '确定要删除该菜单？',
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
                message: '正在删除菜单，请稍候...'
              });

              $.ajax({
                url: configMap.path + configMap.dataUrl + "/" + configMap.currentSelectedNode.id,
                type: 'DELETE',
                success: function (result) {
                  App.unblockUI(jqueryMap.$blockTarget);
                  if (result) {
                    if (configMap.currentSelectedNode != null) {
                      jqueryMap.$resourceTree.jstree(true)
                        .delete_node(configMap.currentSelectedNode);
                      if (configMap.currentSelectedNode.parent != '#') {
                        jqueryMap.$resourceTree.jstree(true)
                          .select_node(configMap.currentSelectedNode.parent);
                      }
                      else {
                        configMap.currentSelectedNode = null;
                        jqueryMap.$resourceFrom.find('input, select, textarea, button')
                          .attr('disabled', 'disabled');
                      }
                    }
                    Messenger().post({
                      message: '删除成功！'
                    });
                  }
                  else {
                    Messenger().post({
                      message: '删除失败！',
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
        }
      });
    }
  };

  var saveResource = function () {
    configMap.sourceurl = jqueryMap.$resourceFrom.find('input[name=resourceUrl]').val();
    var data = {
      name: jqueryMap.$resourceFrom.find('input[name=resourceName]').val(),
      enabled: jqueryMap.$resourceFrom.find('input[name=resourceEnabled]:checked').val(),
      category: jqueryMap.$resourceFrom.find('[name="resourceType"]').val(),
      description: jqueryMap.$resourceFrom.find('textarea[name=resourceRemark]').val(),
      identifier: jqueryMap.$resourceFrom.find('input[name=resourceIdentifier]').val(),
      menuIcon: jqueryMap.$resourceFrom.find('input[name=resourceIcon]').val(),
      url: '',
      parentId: ''
    };

    var  validateTishi = function(msg){
        Messenger().post({
            message:msg,
            type: 'error'
        });
    };

    if(!data.name){
        validateTishi('名称不能为空');
        return;
    }else if(data.category === 'menu' && !data.menuIcon){
        validateTishi('菜单图标不能为空');
        return;
    }


    var nodeParentId;
    if (data.category === 'menu') {
      data.url = jqueryMap.$resourceFrom.find('input[name=resourceUrl]').val();
    }

    var url = configMap.path + configMap.dataUrl;
    var requestType = 'POST';
    if (configMap.optType === 'add') {
      if (configMap.currentSelectedNode != null && configMap.currentSelectedNode.parent != '#') {
        var parentNode = jqueryMap.$resourceTree.jstree(true)
          .get_node(configMap.currentSelectedNode.parent);
        data.parentId = parentNode.li_attr.funcId;
        nodeParentId = configMap.currentSelectedNode.parent;
      }
    }
    else if (configMap.optType === 'addNext') {
      data.parentId = configMap.currentSelectedNode.li_attr.funcId;
      nodeParentId = configMap.currentSelectedNode.id;
    }
    else if (configMap.optType === 'edit') {
      url = url + "/" + configMap.currentSelectedNode.id;
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
        if(result.errmsg){
          Messenger().post({
            message: '菜单名称不能重复！',
            type: 'error'
          });

          return;
        }

        if (configMap.optType === 'edit') {
          configMap.currentSelectedNode.text = data.name;
          configMap.currentSelectedNode.li_attr.type = data.category;
          jqueryMap.$resourceTree.jstree(true)
            .rename_node(configMap.currentSelectedNode, data.name);
        }
        else {
          jqueryMap.$resourceTree.jstree(true).create_node(nodeParentId ? nodeParentId : '#', {
            id: result.id,
            text: data.name,
            li_attr: {
              type: data.category,
              funcId: result.id
            }
          });
          jqueryMap.$resourceTree.jstree(true).deselect_all();
          jqueryMap.$resourceTree.jstree(true).select_node(result.id);
        }

        Messenger().post('保存数据成功！');
      },
      error: function (ex, e, ee) {
        App.unblockUI(jqueryMap.$blockTarget);
        Messenger().post({
          message: '保存数据失败！',
          type: 'error'
        });
      }
    });
  };

  var initResource = function () {
    jqueryMap.$resourceTree.jstree({
      'core': {
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
      'plugins': ["contextmenu", "dnd", "types", "expand"],
      "expand": {
        level: 2
      },
      "contextmenu": {
        items: function (o, cb) {
          var actions = {};
          actions.create = {
            "separator_before": false,
            "separator_after": false,
            "_disabled": false,
            "icon": 'fa fa-plus',
            "label": "新增菜单",
            "action": function (data) {
              addNewResource();
            }
          };
          actions.createNext = {
            "separator_before": false,
            "separator_after": false,
            "_disabled": false,
            "icon": 'fa fa-plus',
            "label": "新增下级菜单",
            "action": function (data) {
              addNewNextResource();
            }
          };
          actions.delete = {
            "separator_before": false,
            "separator_after": false,
            "_disabled": false,
            "icon": 'fa fa-trash-o',
            "label": "删除菜单",
            "action": function (data) {
              deleteResource();
            }
          };
          return actions;//返回右键菜单项
        }
      }
    });

    jqueryMap.$resourceTree.on('move_node.jstree', function (e, data) {
      if (data.parent === '#') {
        data.parent = '%23';
      }

      $.ajax({
        url: configMap.path + configMap.dragUrl + "/" + data.node.id + "/" + data.parent + "/"
        + data.position,
        type: 'PUT',
        success: function (result) {

        },
        error: function (result) {

        }
      });
      return false;
    });

    jqueryMap.$resourceTree.on('select_node.jstree', function (e, data) {
      jqueryMap.$resourceFrom.find('input, select, textarea, button').removeAttr('disabled');
      clearFormInput();
      configMap.currentSelectedNode = data.node;
      configMap.optType = 'edit';
      App.blockUI({
        target: jqueryMap.$blockTarget,
        boxed: true,
        message: '正在获取数据，请稍候...'
      });

      $.ajax({
        url: configMap.path + configMap.dataUrl + "/" + configMap.currentSelectedNode.id,
        dataType: 'JSON',
        type: 'GET',
        success: function (result) {
          App.unblockUI(jqueryMap.$blockTarget);
          $('#uuid_uuid',jqueryMap.$container).show();
          jqueryMap.$resourceFrom.find('input[name=resourceName]').val(result.name);
            jqueryMap.$resourceFrom.find('input[name=uuid]').val(result.id);
          jqueryMap.$resourceFrom.find('input[name=resourceEnabled][value=' + result.enabled + ']')
            .iCheck('check');
          jqueryMap.$resourceFrom.find('[name="resourceType"]').val(result.category)
            .trigger('change');
          jqueryMap.$resourceFrom.find('input[name=resourceUrl]').val(result.url);
          jqueryMap.$resourceFrom.find('input[name=resourceIdentifier]').val(result.identifier);
          jqueryMap.$resourceFrom.find('input[name=resourceIcon]').val(result.menuIcon);
          jqueryMap.$resourceFrom.find('textarea[name=resourceRemark]').val(result.description);
        },
        error: function () {
          App.unblockUI(jqueryMap.$blockTarget);
          Messenger().post({
            message: '获取数据失败！',
            type: 'error'
          });
        }
      });
    });
  };

  var resourceValidation = function () {
    jqueryMap.$resourceFrom.validate({
      errorElement: 'span',
      errorClass: 'help-block help-block-error',
      focusInvalid: false,
      ignore: "",
      rules: { // rules 中的属性name、code、sex等为Input的name属性值
        resourceName: {
          minlength: 2,
          required: true
        }
      },
      messages: {
        resourceName: {
          required: '名称为必填项！'
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

      var tabid=$('#resource-manager-content').parents('.tab-pane').attr('id').slice(17);

	  tabMenu(tabid);

	  $('#uuid_uuid',jqueryMap.$container).hide();
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

      $('input[name="resourceEnabled"]', jqueryMap.$resourceFrom).iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%' // optional
      });

      jqueryMap.$resourceFrom.find('input, select, textarea, button').attr('disabled', 'disabled');

      $('#resourceType', jqueryMap.$resourceFrom).select2({
        placeholder: '选择类型',
        width: '100%'
      });

      $('#menu-url').show();
      $('#resourceType', jqueryMap.$resourceFrom).change(function () {
        var type = $('#resourceType').val();
        if (type === 'menu') {
          $('#menu-url').show();
          $('#menu-img').show();
        } else if (type === 'item') {
          $('#menu-url').hide();
          $('#menu-img').hide();
        }
      });

      $('#btnNewResource', jqueryMap.$container).off().on('click', function () {
        addNewResource();
      });

      $('#btnNewNextResource', jqueryMap.$container).off().on('click', function () {
        addNewNextResource();
      });

      $('#btnDelResource', jqueryMap.$container).off().on('click', function () {
        deleteResource();
      });

      $('#btnSaveResource', jqueryMap.$container).off().on('click', function () {
        saveResource();
      });

      initResource();

      // 控件验证
      //  resourceValidation();
    }
  };
}();
//@ sourceURL=resources/resource.js