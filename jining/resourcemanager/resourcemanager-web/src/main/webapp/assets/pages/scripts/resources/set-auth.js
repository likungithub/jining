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

var setAuth = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    authDataUrl: '/resource/resources/resource',
    authSetOrgDataUrl: '/resource/resources/orgsetresource',
    userAuthUrl: '/user/users/userauth',
    roleAuthUrl: '/role/roles/roleauth',
    orgAuthUrl: '/organization/organization/orgauth',
    id: '',
    optType: ''
  };

  // 全局Dom
  var jqueryMap = {
    $container: null,
    $setAuthTree: null,
    $blockTarget: null
  };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#resource-manager-serauth');
    jqueryMap.$setAuthTree = jqueryMap.$container.find('#resource-tree');
    jqueryMap.$blockTarget = jqueryMap.$setAuthTree.closest(".modal-body");
  };

  var initAuth = function () {
    App.blockUI({
      target: jqueryMap.$blockTarget,
      boxed: true,
      message: '正在初始化数据，请稍候...'
    });

    var url = '';
    var allResource = configMap.path + configMap.authDataUrl;
    if (configMap.optType === 'user') {
      url = configMap.path + configMap.userAuthUrl;
    } else if (configMap.optType === 'role') {
      url = configMap.path + configMap.roleAuthUrl;
    } else if (configMap.optType === 'org') {
      url = configMap.path + configMap.orgAuthUrl;
      allResource = configMap.path + configMap.authSetOrgDataUrl + "/" + configMap.id;
    }

    var setedRole = [];
    $.ajax({
      url: url + "/" + configMap.id,
      type: 'GET',
      async: false,
      success: function (result) {
        setedRole = result;
      }
    });

    var treeData = [];
    $.ajax({
      url: allResource,
      type: 'GET',
      async: false,
      success: function (result) {
        treeData = result;
      }
    });

    jqueryMap.$setAuthTree.jstree({
      'plugins': ["checkbox", "types"],
      'core': {
        "themes": {
          "responsive": false
        },
        "data": treeData
      },
      "checkbox": {
        "three_state": false,
        "keep_selected_style": false
      },
      'types': {
        "default": {
          "icon": "fa fa-folder icon-state-warning icon-lg"
        },
        "file": {
          "icon": "fa fa-file icon-state-warning icon-lg"
        }
      }
    });

    jqueryMap.$setAuthTree.on('loaded.jstree', function () {
      jqueryMap.$setAuthTree.jstree(true).check_node(setedRole);
    });

    jqueryMap.$setAuthTree.on('activate_node.jstree', function (e, data) {
      if (jqueryMap.$setAuthTree.jstree(true).is_checked(data.node)) {
        jqueryMap.$setAuthTree.jstree(true).check_node(data.node.parents);
      }

      if (data.node.children.length > 0) {
        if (jqueryMap.$setAuthTree.jstree(true).is_checked(data.node)) {
          jqueryMap.$setAuthTree.jstree(true).check_node(data.node.children_d);
        } else {
          jqueryMap.$setAuthTree.jstree(true).uncheck_node(data.node.children_d)
        }
      }
    });

    App.unblockUI(jqueryMap.$blockTarget);
  };

  var exeHandler = null;
  var initScroll = function () {
    if (exeHandler != null) {
      clearTimeout(exeHandler);
    }

    if (jqueryMap.$container.closest(".modal-content").width() > 0) {
      App.initSlimScroll(jqueryMap.$container.closest('.bootbox-body'))
    }
    else {
      exeHandler = setTimeout(function () {
        initScroll();
      }, 10)
    }
  };

  return {
    // 初始化
    init: function (id, type) {
      configMap.id = id;
      configMap.optType = type;
      setJqueryMap();
      var checkall = $('input[name="checkall"]', jqueryMap.$container);
      checkall.uniform();
      checkall.change(function () {
        var checked = $(this).is(":checked");
        if (checked) {
          jqueryMap.$setAuthTree.jstree(true).check_all();
        }
        else {
          jqueryMap.$setAuthTree.jstree(true).uncheck_all();
        }
      });

      initAuth();
      initScroll();
    },
    // 保存功能权限，参数为回掉函数
    saveAuth: function (callback) {
      App.blockUI({
        target: jqueryMap.$blockTarget,
        boxed: true,
        message: '正在保存权限设置，请稍后...'
      });

      var selectedRole = jqueryMap.$setAuthTree.jstree(true).get_checked();

      var url = '';
      if (configMap.optType === 'user') {
        url = configMap.path + configMap.userAuthUrl;
      } else if (configMap.optType === 'role') {
        url = configMap.path + configMap.roleAuthUrl;
      } else if (configMap.optType === 'org') {
        url = configMap.path + configMap.orgAuthUrl;
      }

      $.ajax({
        url: url + "/" + configMap.id,
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(selectedRole),
        success: function () {
          App.unblockUI(jqueryMap.$blockTarget);
          callback(true);
        },
        error: function (ex, e, ee) {
          App.unblockUI(jqueryMap.$blockTarget);
          App.alert({
            container: jqueryMap.$setAuthTree.closest(".modal-body"),
            place: 'prepend',
            type: 'danger',
            message: '权限保存失败！',
            icon: 'fa fa-warning'
          });
          callback(false);
        }
      });
    }
  };
}();
//@ sourceURL=roles/set-auth.js