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

var setUserRole = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    roleDataUrl: '/role/roles/role',
    userRoleUrl: '/user/users/userrole',
    userId: ''
  };

  // 全局Dom
  var jqueryMap = {
    $setRoleTree: null,
    $blockTarget: null
  };

  var setJqueryMap = function () {
    jqueryMap.$setRoleTree = $('#user-manager-roletreedata');
    jqueryMap.$blockTarget = jqueryMap.$setRoleTree.closest(".modal-content");
  };

  var initRole = function () {
//    App.blockUI({
//      target: jqueryMap.$blockTarget,
//      boxed: true,
//      message: '正在初始化数据，请稍候...'
//    });
//
//    var setedRole = [];
//    $.ajax({
//      url: configMap.path + configMap.userRoleUrl + "/" + configMap.userId,
//      type: 'GET',
//      async: false,
//      success: function (result) {
//        setedRole = result;
//      }
//    });
//
    var treeData = [];
    $.ajax({
      url: configMap.path + configMap.roleDataUrl,
      type: 'GET',
      async: false,
      success: function (result) {
        _.forEach(result, function (value) {
          treeData.push({
            'id': value.id,
            'text': value.name
//            'state': {
//              'selected': _.indexOf(setedRole, value.id) > -1
//            }
          });
        });
      }
    });

    jqueryMap.$setRoleTree.jstree({
      'plugins': ["wholerow", "checkbox", "types"],
      'core': {
    	  "multiple": false, //单选
    	  "themes": {
    		  "responsive": false
    	  },
    	  "data": treeData
      },
      "checkbox": {
    	  "keep_selected_style": true,
    	  "three_state": false //父子级不关联选中
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
  };

  return {
    // 初始化
    init: function (userId) {
      configMap.userId = userId;
      setJqueryMap();
      initRole();
    },
    // 设置路径
    setPath: function (path) {
      configMap.path = '';
    },
    // 保存用户角色，参数为回掉函数
    saveUserRole: function (callback) {
      App.blockUI({
        target: jqueryMap.$blockTarget,
        boxed: true,
        message: '正在保存设置，请稍后...'
      });

      var selectedRole = jqueryMap.$setRoleTree.jstree(true).get_checked();
      if(selectedRole.length === 0){
    	  App.unblockUI(jqueryMap.$blockTarget);
    	  Messenger().post({
              message: '员工角色不能为空哟！',
              type: 'error'
          });
      }else{
    	  callback(selectedRole);
      }
//      $.ajax({
//        url: configMap.path + configMap.userRoleUrl + "/" + configMap.userId,
//        type: 'PUT',
//        contentType: 'application/json; charset=utf-8',
//        data: JSON.stringify(selectedRole),
//        success: function () {
//          App.unblockUI(jqueryMap.$blockTarget);
//          callback(true);
//        },
//        error: function (ex, e, ee) {
//          App.unblockUI(jqueryMap.$blockTarget);
//          App.alert({
//            container: jqueryMap.$setRoleTree.closest(".modal-body"),
//            place: 'prepend',
//            type: 'danger',
//            message: '保存设置失败！',
//            icon: 'fa fa-warning'
//          });
//          callback(false);
//        }
//      });
    }
  };
}();
//@ sourceURL=users/set-roles.js