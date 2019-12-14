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

/*global $, App, moment, jQuery, bootbox, OrgEdit */

var customerOrgs = function () {
	  'use strict';

	  // 全局属性参数
	  var configMap = {
	    path: '',
	    getDLOrgUrl: '/organization/organization/getDLOrg',
	    dataUrl: '/organization/organization/org',
	    dataTypeUrl: '/organization/organization/orgtype',
	    setAuthPageUrl: '/resource/resources/set-auth.jsp',
	    createUserPageUrl: '/user/users/edit.jsp',
	    currentSelectedNode: null,
	    optType: null,
	    orgTypes: [],
	    verifyName: '' //确定名称是否改变
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
	    jqueryMap.$container = $('#customerOrg-manager-content');
	    jqueryMap.$blockTarget = jqueryMap.$container;
	    jqueryMap.$orgFrom = $('#customerOrgForm', jqueryMap.$container);
	    jqueryMap.$orgTree = $('#customerOrg_manage_tree', jqueryMap.$container);
	  };

	  var clearFormInput = function () {
	    jqueryMap.$orgFrom.find('input[name=orgName]').val('');
	    jqueryMap.$orgFrom.find('input[name=orgRemark]').val('');
	  };

	  var addNewOrg = function () {
		  if (configMap.currentSelectedNode == null) {
		      Messenger().post({message: '请选择一个组织结构！', type: 'warning'});
		      return;
		  }
		  configMap.optType = 'add';
		  jqueryMap.$orgFrom.find('input, select, input, button').removeAttr('disabled');
		  clearFormInput();
	  };
	  
	  var addNewSonOrg = function () {
		  if (configMap.currentSelectedNode == null) {
		      Messenger().post({message: '请选择一个组织结构！', type: 'warning'});
		      return;
		  }
		  configMap.optType = 'addson';
		  jqueryMap.$orgFrom.find('input, select, input, button').removeAttr('disabled');
		  clearFormInput();
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
	                url: configMap.path + configMap.dataUrl + "/" + configMap.currentSelectedNode.id,
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
	                        jqueryMap.$orgFrom.find('input, select, input, button')
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
	          },
	          cancel: {
	            label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
	            className: 'btn-default'
	          }
	        }
	      });
	    }
	  };

	  var saveOrg = function () {

	    var data = {
	    	name: jqueryMap.$orgFrom.find('input[name=orgName]').val(),
	    	remark: jqueryMap.$orgFrom.find('input[name=orgRemark]').val()
	    };
	    var AppAlert = function(message){
	    	Messenger().post({message: message, type: 'error'});
        }
	    if(data.name == "" || data.name == null || data.name == "undefined"){
	    	Messenger().post({message: '部门名称不得为空！', type: 'error'});
			return false;
		}
//	    var thisOrgNameDom = document.getElementsByName('orgName')[0];
//        var textOrgNameErro = TextValidate(thisOrgNameDom,AppAlert);
//        if(!textOrgNameErro){
//        	App.unblockUI(blockTarget);
//        	return;
//        }
	    var url = configMap.path + configMap.dataUrl;
	    var requestType = 'POST';
	    if (configMap.optType === 'add') { //增加同级
	    	data.parent_code = configMap.currentSelectedNode.parent;
//	      if (configMap.currentSelectedNode != null && configMap.currentSelectedNode.parent != '#') {
//	        data.parentId = configMap.currentSelectedNode.parent;
//	      }
	    }
	    else if (configMap.optType === 'addson') { //增加下一级
	    	data.parent_code = configMap.currentSelectedNode.id;
	    }
	    else if (configMap.optType === 'edit') { //编辑
	    	data.parent_code = configMap.currentSelectedNode.parent;
	    	if (configMap.verifyName == data.name) { //名称未变
	    		url = url + "/" + configMap.currentSelectedNode.id + "/" + 0;
	    	} else { //部门名称改变，需检验名称是否重复
	    		url = url + "/" + configMap.currentSelectedNode.id + "/" + 1;
	    	}
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
	        	} else {
	        		jqueryMap.$orgTree.jstree(true).create_node(data.parent_code ? data.parent_code : '#', nodeData);
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
	  
	  var initOrganization = function () {
	    jqueryMap.$orgTree.jstree({
	      'core': {
	        "themes": {
	          "responsive": false
	        },
	        "check_callback": true,
	        'data': {
	          'url': configMap.path + configMap.getDLOrgUrl
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
	      'plugins': ["types"/*, "expand"*/],
//	      "expand": {
//	        level: 2
//	      }
	    });

	    jqueryMap.$orgTree.on('select_node.jstree', function (e, data) {
            $('#customerOrgFormDiv').show();
	    	jqueryMap.$orgFrom.find('input, select, input, button').removeAttr('disabled');
		    //clearFormInput();
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
		        	//jqueryMap.$orgFrom.find('input[name=orgCode]').val(result.code);
		        	configMap.verifyName = result.name; //选择时的名称
		        	jqueryMap.$orgFrom.find('input[name=orgName]').val(result.name);
		        	jqueryMap.$orgFrom.find('input[name=orgRemark]').val(result.remark);
		        },
		        error: function () {
		        	App.unblockUI(jqueryMap.$blockTarget);
			        Messenger().post({message: '获取数据失败！', type: 'error'});
		        }
		    });
		    
		    if (data.node.parent === '#') {
		    	$('#addNewOrg').attr('disabled','disabled');
		    	$('#delOrg').attr('disabled','disabled');
                $('#addNewSonOrg').removeAttr('disabled');
		    	$('#btnSaveOrg').attr('disabled','disabled');
		    	
		    } else {
		    	$('#addNewOrg').removeAttr('disabled');
		    	$('#delOrg').removeAttr('disabled');
                $('#addNewSonOrg').removeAttr('disabled');
		    	$('#btnSaveOrg').removeAttr('disabled');
		    }
	    });
	  };

	  return {
	    // 初始化
	    init: function (id) {
	      setJqueryMap();
	      $('#customerOrgFormDiv').hide();
            $('#addNewOrg').attr('disabled','disabled');
            $('#addNewSonOrg').attr('disabled','disabled');
            $('#delOrg').attr('disabled','disabled');
            $('#btnSaveOrg').attr('disabled','disabled');

	      var tabid=$('#customerOrg-manager-content').parents('.tab-pane').attr('id').slice(17);

	      tabMenu(tabid);
	      
	      Layout.addResizeContent(jqueryMap.$container);
	      setTimeout(function () {
	        var layout = jqueryMap.$container.layout({
	          center__onresize: App.initLayoutContentScrollbar,
	          west__onresize: App.initLayoutContentScrollbar,
	          west__size: 260
	          //west__size: 200
	        });

	        App.initLayoutContentScrollbar('west', layout.panes.west);
	        App.initLayoutContentScrollbar('center', layout.panes.center);
	      }, 10);
      
	      //新增同级
	      $('#addNewOrg', jqueryMap.$container).off().on('click', function () {
	    	  addNewOrg();
	      });

	      //新增下级
	      $('#addNewSonOrg', jqueryMap.$container).off().on('click', function () {
	    	  addNewSonOrg();
	      });

	      //删除
	      $('#delOrg', jqueryMap.$container).off().on('click', function () {
	        deleteOrg();
	      });

	      $('#btnSaveOrg', jqueryMap.$container).off().on('click', function () {
	        saveOrg();
	      });

	      initOrganization();
	    },
	    // 设置路径
	    setPath: function (path) {
	      configMap.path = '';
	    }
	  };
}();
//@ sourceURL=Orgs/Orgs.js