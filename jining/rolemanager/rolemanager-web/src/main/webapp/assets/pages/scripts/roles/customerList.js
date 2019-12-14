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

var customerRoles = function () {
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
    editPageUrl: '/role/roles/edit.jsp',
    addUrl: '/role/roles/addRole.jsp',
    editUrl: '/role/roles/edit.jsp',
    addMenuUrl: '/role/roles/addMenu.jsp',
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
    $roleDataTable: null,
    $customerManageDialog: null
  };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#customerRole-manager-content');
    jqueryMap.$blockTarget = jqueryMap.$container;
    //jqueryMap.$roleFrom = $('#roleForm', jqueryMap.$container);
    jqueryMap.$roleTree = $('#customerRole_manage_tree', jqueryMap.$container);
  };
    /*************************************/
        if(1){
            $.get('/role/roles/getAllMenu',function(data){
                var menuArr1 =[],menuArr2 =[],menuArr3 =[];
                $.each(data,function(i,v){
                    if(v.fldm==3){
                        menuArr3.push(v);
                    }
                    if(v.fldm==2){
                        menuArr2.push(v);
                    }
                    if(v.fldm==1){
                        menuArr1.push(v);
                    }
                })

                $.each(menuArr1,function(i,v1){
                    v1.nextM =[];
                    $.each(menuArr2,function(i,v2){
                        if(v1.dm==v2.sjdm){
                            v1.nextM.push(v2);
                        }
                        v2.nextM =[];
                        $.each(menuArr3,function(i,v3){
                            if(v2.dm==v3.sjdm){
                                v2.nextM.push(v3);
                            }
                        })

                    })
                })

                $.each(menuArr1,function(i,v1){
                    $('<div class="row" style="line-height: 30px;" data-idM="'+v1.uuid+'">' +
                        '<div class="col-sm-2">' +
                        '<input data-menuLevel="1" style="vertical-align: sub" type="checkbox" class="mr" value="'+v1.uuid+'">' +
                        v1.name+
                        '</div>' +
                        '<div class="col-sm-10 TTWrap">' +

                        '</div>'+
                        '</div>').appendTo($('#MenuWrap'));
                })

                $.each(menuArr1,function(i,v){
                    $(v.nextM).each(function (i,q){
                        $('<div class="row" data-sid="'+q.uuid+'" style="line-height: 30px"><div class="col-sm-3">' +
                            '<div style="font-size: 12px"> <input style="vertical-align: sub" data-menuLevel="2" type="checkbox" class="mr" value="'+q.uuid+'">'+q.name+'</div>' +
                            '</div><div class="col-sm-9 thirdMenu"></div></div>').appendTo($('#MenuWrap>'+'[data-idM="'+v.uuid+'"] '+'.TTWrap'));
                    })
                })

                $.each(menuArr2,function(i,v){
                    $(v.nextM).each(function (i,q){
                        $('<div class="pull-left ml">' +
                            '<span style="font-size: 12px"><input  data-menuLevel="3" style="vertical-align: sub" type="checkbox" class="mr" value="'+q.uuid+'">'+q.name +
                            '</span>' +
                            '</div>').appendTo($('#MenuWrap  '+'[data-sid="'+v.uuid+'"] '+'.thirdMenu'));
                    })
                })


            });
        }
        //一级菜单的选择
        $('#MenuWrap',$('#customerRole-manager-content')).on('click','input[data-menuLevel="1"]',function(){
            if($(this).prop('checked')){
                $(this).parents('[data-idm]').find('input[type="checkbox"]').prop('checked',true);
            }else{
                $(this).parents('[data-idm]').find('input[type="checkbox"]').prop('checked',false);
            }
        })
  //  二级菜单的选择
    $('#MenuWrap',$('#customerRole-manager-content')).on('click','input[data-menuLevel="2"]',function(){
        var  tag  = 0;
        $(this).parents('.TTWrap').find('input[data-menuLevel="2"]').each(function (i,v){
            if ($(v).is(':checked')){
                tag=1;
                return false;
            }
        })
        if(tag){
            $(this).parents('[data-idm]').find('input[type="checkbox"]').eq(0).prop('checked',true);
        }else{
            // $(this).parents('[data-idm]').find('input[type="checkbox"]').eq(0).prop('checked',false);
        }

        if($(this).prop('checked')){
            $(this).parents('[data-sid]').find('input[type="checkbox"]').prop('checked',true);
            var aa=$(this).parents('[data-sid]').attr('data-idm');
            //var bhtml=$(this).parents('[data-sid]').html();
            console.log("LOG："+aa);
        }else{
            $(this).parents('[data-sid]').find('input[type="checkbox"]').prop('checked',false);
        }
    })
  //三级菜单的选择
    $('#MenuWrap',$('#customerRole-manager-content')).on('click','input[data-menuLevel="3"]',function(){
        var  tag  = 0,tag1=0;
        $(this).parents('.thirdMenu').find('input[data-menuLevel="3"]').each(function (i,v){
            if ($(v).is(':checked')){
                tag=1;
                return false;
            }
        })
        $(this).parents('.TTWrap').find('input[data-menuLevel="3"]').each(function (i,v){
            if ($(v).is(':checked')){
                tag1=1;
                return false;
            }
        })
        if(tag1){
            $(this).parents('[data-idm]').find('input[type="checkbox"]').eq(0).prop('checked',true);
        }else{
            // $(this).parents('[data-idm]').find('input[type="checkbox"]').eq(0).prop('checked',false);
        }

        if(tag){
            $(this).parents('[data-sid]').find('input[data-menulevel="2"]').eq(0).prop('checked',true);
        }else{
            // $(this).parents('[data-sid]').find('input[data-menulevel="2"]').eq(0).prop('checked',false);
        }

    })


  /*************************************/


  var addMenuFun = function () {
      configMap.optType = 'add';
      openModal('新增菜单',configMap.addMenuUrl,'add',function(){
          addMenu.saveMenu(function (result) {
              if (result) {
                  jqueryMap.$rolesDialog.modal('hide');
              }
          });
      });
  };

  //新增角色
  var addNewRole = function () {
    configMap.optType = 'add';
    openModal('新增角色',configMap.addUrl,'edit',function(){
    	addRole.saveRole(function (result) {
            if (result) {
            	jqueryMap.$rolesDialog.modal('hide');
                var nodeData = {
                  id: result.jsdm,
                  text: result.name,
                  li_attr:{uuid:result.id}
                };
                //将全部的checkbox按钮清空
          	    $('#MenuWrap input[type="checkbox"]',jqueryMap.$container).prop("checked",false);
                //新增时默认几个选项被选中
                // $('#MenuWrap input[type="checkbox"][value="1759d70e-4b52-11e7-a919-92ebcb67fe33"]', jqueryMap.$container).prop("checked","checked"); //系统管理
                // $('#MenuWrap input[type="checkbox"][value="0984cd89-23ea-4bd0-9d6c-85221a251c9a"]', jqueryMap.$container).prop("checked","checked"); //新手入门
                //$('#xtjs-xtgl-81', jqueryMap.$container).prop("checked",true); //通讯录
                //$('#xtjs-xtgl-91', jqueryMap.$container).prop("checked",true); //消息提醒
                jqueryMap.$roleTree.jstree(true).create_node('xtjs', nodeData);
                jqueryMap.$roleTree.jstree(true).deselect_all();
                jqueryMap.$roleTree.jstree(true).select_node(result.jsdm);
            }
          });     
      });
  };
  
//编辑角色
  var editNewRole = function () { 
	  if (configMap.currentSelectedNode == null) {
	      Messenger().post({message: '请选择一个角色！', type: 'warning'});
	      return;
	    }
	  if (configMap.currentSelectedNode.parent === '#' || configMap.currentSelectedNode.text === '会计主管'
		  //|| configMap.currentSelectedNode.text === '客户主管' || configMap.currentSelectedNode.text === '报税员'
		  //|| configMap.currentSelectedNode.text === '会计' || configMap.currentSelectedNode.text === '业务员'
		  || configMap.currentSelectedNode.text === '外勤' || configMap.currentSelectedNode.text === '记账会计'
		  || configMap.currentSelectedNode.text === '销售经理') {
	      Messenger().post({message: '不能编辑！', type: 'warning'});
	      return;
	    }
    configMap.optType = 'edit';
    openModal('编辑角色',configMap.editUrl + "?id=" + configMap.currentSelectedNode.id,'edit',function(){
    	roleEdit.saveRole(function (result) {
            if (result) {
            	jqueryMap.$rolesDialog.modal('hide');
                var nodeData = {
                  id: result.jsdm,
                  text: result.name,
                  li_attr:{uuid:result.id}
                };
                configMap.currentSelectedNode.text = result.name;
                jqueryMap.$roleTree.jstree(true).rename_node(configMap.currentSelectedNode, result.name);
            }
          });
    		     
      });
  };
  
  //删除角色
  var deleteRole = function () {
    if (configMap.currentSelectedNode == null) {
      Messenger().post({message: '请选择一个角色！', type: 'warning'});
      return;
    }
    configMap.optType = 'del';
    if (configMap.currentSelectedNode.parent === '#' || configMap.currentSelectedNode.text === '会计主管'
		//|| configMap.currentSelectedNode.text === '客户主管' || configMap.currentSelectedNode.text === '报税员'
		//|| configMap.currentSelectedNode.text === '会计' || configMap.currentSelectedNode.text === '业务员'
		|| configMap.currentSelectedNode.text === '外勤' || configMap.currentSelectedNode.text === '记账会计'
		|| configMap.currentSelectedNode.text === '销售经理') {
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
  
  //设置角色权限保存
  var saveRole = function () {
	  var json=[];
	  var data = null;
	  var url = '';
	  $('#ywjs-qx',jqueryMap.$container).prop("checked",false);
	  if (configMap.currentSelectedNode == null || configMap.currentSelectedNode.parent === '#') {
	      Messenger().post({
	        message: '请选择一个角色！',
	        type: 'warning'
	      });
	  } else {
		  var all = $('#MenuWrap input[type="checkbox"]:checked');
		  for(var i = 0; i < all.length; i ++){ //所有选中的
			  var temp = {auth:all[i].value};
			  json.push(temp);
		  }
		  
		  //若只选中子节点，未选中界面节点时
		  // if($('#xtjs-kh-all input[type="checkbox"]:checked').length > 0){ //代表客户管理界面
			//   var temp = {auth:'c55572d0-3212-465f-b243-880aefcacb15'};
			//
			//   if($('#xtjs-kh-1 input[type="checkbox"]:checked').length > 0){ //代表客户列表界面
			// 	  var temp2 = {auth:'2327c868-34d2-4107-92f2-7fc5f94d8738'}; //客户列表
			// 	  json.push(temp2);
			//   }
			//   json.push(temp);
		  // }
		  // if($('#xtjs-sj-all input[type="checkbox"]:checked').length > 0){ //代表商机界面
			//   var temp = {auth:'2f53f2f4-5fbb-422f-834f-0a5da6c89b4b'};
			//   json.push(temp);
		  // }
		  // if($('#xtjs-ht-all input[type="checkbox"]:checked').length > 0){ //代表合同界面
			//   var temp = {auth:'29704421-86ff-4ccb-b261-0c89e34001bf'};
			//   json.push(temp);
		  // }
          // if($('#xtjs-bs-all input[type="checkbox"]:checked').length > 0){ //代表智能报税
           //    var temp = {auth:'4c5633a4-189f-4413-abe9-189145622865'};
           //    json.push(temp);
          // }
		  // if($('#xtjs-sf-all input[type="checkbox"]:checked').length > 0){ //代表收费界面
			//   var temp = {auth:'66420713-bc79-435d-bde2-7855b7c51177'};
			//   json.push(temp);
		  // }
		  // if($('#xtjs-rw-all input[type="checkbox"]:checked').length > 0){ //代表任务界面
			//   var temp = {auth:'de15042b-d5c1-445f-9b2a-bb2c73e5d641'};
			//   json.push(temp);
		  // }
		  // if($('#xtjs-yg-all input[type="checkbox"]:checked').length > 0){ //代表员工360界面
			//   var temp = {auth:'6d192b89-7750-4b2d-940a-bc6559a92c55'};
			//   json.push(temp);
		  // }
		  // if($('#xtjs-tjfx-all input[type="checkbox"]:checked').length > 0){ //代表统计分析主界面
			//   var temp = {auth:'435dcbff-bd27-4409-b7f3-c612aeff4d72'};
			//   json.push(temp);
		  // }
		  // if($('#xtjs-xtgl-all input[type="checkbox"]:checked').length > 0){ //代表系统管理主界面
			//   var temp = {auth:'1759d70e-4b52-11e7-a919-92ebcb67fe33'};
			//   json.push(temp);
		  // }
          // if($('#xtjs-rw-2 input[type="checkbox"]:checked').length > 0){ //代表任务列表
           //    var temp = {auth:'54cd63e4-589b-4cb4-ace0-987d7f637a09'};
           //    json.push(temp);
          // }
		  
		  data = {
			  auth:json
		  };
		  
		  url = '/role/roles/setCustomerXTAuth/' + configMap.currentSelectedNode.li_attr.uuid;
		  
		  $.ajax({
		      url: url,
		      type: 'post',
		      contentType: 'application/json; charset=utf-8',
		      dataType: 'JSON',
		      data: JSON.stringify(data),
		      success: function (result) {
		    	  Messenger().post({message: '保存成功！',type: 'success'});
		      },
		      error: function (ex, e, ee) {
		        App.unblockUI(jqueryMap.$blockTarget);
		        Messenger().post({message: '保存数据失败！', type: 'error'});
		      }
		    });
	  }
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
      'plugins': ["types", "expand"],
      "expand": {
        level: 2
      }

    });

    jqueryMap.$roleTree.on('select_node.jstree', function (e, data) {
    	configMap.currentSelectedNode = data.node;
    	if (data.node.parent === '#') { //父节点为根节点的时候，
    		//将全部的checkbox按钮清空
    		$('input[type="checkbox"]',jqueryMap.$container).prop("checked",false);
	        $('#btnSaveCustomerRole', jqueryMap.$container).hide(); //保存按钮隐藏
	      } else {
	    	//将全部的checkbox按钮清空
	    	$('input[type="checkbox"]',jqueryMap.$container).prop("checked",false);
	    	$('#btnSaveCustomerRole', jqueryMap.$container).show(); // 展示保存按钮
	      }
    	
//    	if((data.node.parent === '#' && data.node.id === 'xtjs') || data.node.parent === 'xtjs'){
//    		$('#ywjs', jqueryMap.$container).hide();
//    		$('#xtjs', jqueryMap.$container).show();
//    	}else{
//    		$('#ywjs', jqueryMap.$container).show();
//    		$('#xtjs', jqueryMap.$container).hide();
//    	}

	      //将全部的checkbox按钮清空
    	  //$('input[type="checkbox"]',jqueryMap.$container).prop("checked",false);
	    	if (configMap.optType == 'add') {
		    	configMap.optType = 'edit';
		    } else {
	    	  if (data.node.parent != '#') { //父节点不为根节点的时候
			      configMap.optType = 'edit';
		    	  $.ajax({
		  	        url: "/role/roles/getCustomerRoleAuth/" + configMap.currentSelectedNode.li_attr.uuid,
		  	        dataType: 'JSON',
		  	        type: 'GET',
		  	        success: function (result) {
		  	        	if(result.length > 0){
		  	        		//$('#ywjs-qx',jqueryMap.$container).prop("checked",true); //全选按钮选中
		  	        		for(var i = 0; i < result.length; i ++){
		  						$("input[type=checkbox][value=" + result[i] + "]").prop("checked",true);
		  					}
		  	        		
		  	        		  // if($('#xtjs-kh-all input[type="checkbox"]:checked').length > 0){ //代表客户360界面
		  	        			//   $('#xtjs-kh', jqueryMap.$container).prop("checked",true);
		  		      		 //  }
		  		      		 //  if($('#xtjs-yg-all input[type="checkbox"]:checked').length > 0){ //代表员工360界面
		  		      			//   $('#xtjs-yg', jqueryMap.$container).prop("checked",true);
		  		      		 //  }
		  		      		 //  if($('#xtjs-tjfx-all input[type="checkbox"]:checked').length > 0){ //代表派工统计主界面
		  		      			//   $('#xtjs-tj', jqueryMap.$container).prop("checked",true);
		  		      		 //  }
		  		      		 //  if($('#xtjs-cs-all input[type="checkbox"]:checked').length > 0){ //代表财税360主界面
		  		      			//   $('#xtjs-cs', jqueryMap.$container).prop("checked",true);
		  		      		 //  }
		  		      		 //  if($('#xtjs-xtgg-all input[type="checkbox"]:checked').length > 0){ //代表系统公告主界面
		  		      			//   $('#xtjs-xtgg', jqueryMap.$container).prop("checked",true);
		  		      		 //  }
		  		      		 //  if($('#xtjs-xtgl-all input[type="checkbox"]:checked').length > 0){ //代表系统管理主界面
		  		      			//   $('#xtjs-xtgl', jqueryMap.$container).prop("checked",true);
		  		      		 //  }
		  	        		
		  	        		
		  	        	}else{
		  	        		$("input[type=checkbox]").prop("checked",false);
		  	        	}
		  	        },
		  	        error: function () {
		  	          App.unblockUI(jqueryMap.$blockTarget);
		  	          Messenger().post({message: '获取数据失败！', type: 'error'});
		  	        }
		  	      });
		      }
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

      if (type === 'add') {
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
  
  //全选
  var selectAll = function () {
	  if($('#ywjs-qx', jqueryMap.$container).prop("checked")){
		  $('#xtjs input[type="checkbox"]', jqueryMap.$container).prop("checked",true);
	  }else{
		  $('#xtjs input[type="checkbox"]', jqueryMap.$container).prop("checked",false);
	  }
  }

  //系统客户全选
  // var selectAllKhXtjs = function () {
	//   if($('#xtjs-kh', jqueryMap.$container).prop("checked")){
	// 	  $('#xtjs-kh-all input[type="checkbox"]', jqueryMap.$container).prop("checked",true);
	//   }else{
	// 	  $('#xtjs-kh-all input[type="checkbox"]', jqueryMap.$container).prop("checked",false);
	//   }
  // }
  
  //商机管理全选
  // var selectAllSjXtjs = function () {
	//   if($('#xtjs-sj', jqueryMap.$container).prop("checked")){
	// 	  $('#xtjs-sj-all input[type="checkbox"]', jqueryMap.$container).prop("checked",true);
	//   }else{
	// 	  $('#xtjs-sj-all input[type="checkbox"]', jqueryMap.$container).prop("checked",false);
	//   }
  // }
  
  //系统员工全选
  // var selectAllYgXtjs = function () {
	//   if($('#xtjs-yg', jqueryMap.$container).prop("checked")){
	// 	  $('#xtjs-yg-all input[type="checkbox"]', jqueryMap.$container).prop("checked",true);
	//   }else{
	// 	  $('#xtjs-yg-all input[type="checkbox"]', jqueryMap.$container).prop("checked",false);
	//   }
  // }
  //系统统计全选
  // var selectAllTjXtjs = function () {
	//   if($('#xtjs-tj', jqueryMap.$container).prop("checked")){
	// 	  $('#xtjs-tjfx-all input[type="checkbox"]', jqueryMap.$container).prop("checked",true);
	//   }else{
	// 	  $('#xtjs-tjfx-all input[type="checkbox"]', jqueryMap.$container).prop("checked",false);
	//   }
  // }
  //系统合同全选
  // var selectAllHtXtjs = function () {
	//   if($('#xtjs-ht', jqueryMap.$container).prop("checked")){
	// 	  $('#xtjs-ht-all input[type="checkbox"]', jqueryMap.$container).prop("checked",true);
	//   }else{
	// 	  $('#xtjs-ht-all input[type="checkbox"]', jqueryMap.$container).prop("checked",false);
	//   }
  // }
    //智能报税全选
    // var selectAllBsXtjs = function () {
    //     if($('#xtjs-znbs', jqueryMap.$container).prop("checked")){
    //         $('#xtjs-bs-all input[type="checkbox"]', jqueryMap.$container).prop("checked",true);
    //     }else{
    //         $('#xtjs-bs-all input[type="checkbox"]', jqueryMap.$container).prop("checked",false);
    //     }
    // }
  //系统收费全选
  // var selectAllSfXtjs = function () {
	//   if($('#xtjs-sf', jqueryMap.$container).prop("checked")){
	// 	  $('#xtjs-sf-all input[type="checkbox"]', jqueryMap.$container).prop("checked",true);
	//   }else{
	// 	  $('#xtjs-sf-all input[type="checkbox"]', jqueryMap.$container).prop("checked",false);
	//   }
  // }
  //系统任务全选
  // var selectAllRwXtjs = function () {
	//   if($('#xtjs-rw', jqueryMap.$container).prop("checked")){
	// 	  $('#xtjs-rw-all input[type="checkbox"]', jqueryMap.$container).prop("checked",true);
	//   }else{
	// 	  $('#xtjs-rw-all input[type="checkbox"]', jqueryMap.$container).prop("checked",false);
	//   }
  // }
  //系统系统管理全选
  // var selectAllXtglXtjs = function () {
	//   if($('#xtjs-xtgl', jqueryMap.$container).prop("checked")){
	// 	  $('#xtjs-xtgl-all input[type="checkbox"]', jqueryMap.$container).prop("checked",true);
	//   }else{
	// 	  $('#xtjs-xtgl-all input[type="checkbox"]', jqueryMap.$container).prop("checked",false);
	//   }
  // }

    //新增菜单
    // var addCustomerRole = function () {
    //     configMap.optType = 'addRes';
    //     openModal('新增菜单',configMap.addUrl,'addRes',function(){
    //         addRole.saveRole(function (result) {
    //             if (result) {
    //                 jqueryMap.$rolesDialog.modal('hide');
    //                 var nodeData = {
    //                     id: result.jsdm,
    //                     text: result.name,
    //                     li_attr:{uuid:result.id}
    //                 };
    //                 //将全部的checkbox按钮清空
    //                 $('input[type="checkbox"]',jqueryMap.$container).prop("checked",false);
    //                 //新增时默认几个选项被选中
    //                 $('#xtjs-cs', jqueryMap.$container).prop("checked",true); //财税360
    //                 $('#xtjs-cs-11', jqueryMap.$container).prop("checked",true); //财税360查看
    //                 $('#xtjs-xtgg', jqueryMap.$container).prop("checked",true); //系统公告
    //                 $('#xtjs-xtgg-13', jqueryMap.$container).prop("checked",true); //系统公告查看
    //                 $('#xtjs-xtgl', jqueryMap.$container).prop("checked",true); //系统管理
    //                 $('#xtjs-xtgl-41', jqueryMap.$container).prop("checked",true); //新手入门
    //                 $('#xtjs-xtgl-81', jqueryMap.$container).prop("checked",true); //通讯录
    //                 $('#xtjs-xtgl-91', jqueryMap.$container).prop("checked",true); //消息提醒
    //                 jqueryMap.$roleTree.jstree(true).create_node('xtjs', nodeData);
    //                 jqueryMap.$roleTree.jstree(true).deselect_all();
    //                 jqueryMap.$roleTree.jstree(true).select_node(result.jsdm);
    //             }
    //         });
    //     });
    // };
  
  return {
    init: function () {
    	setJqueryMap();

    	var tabid=$('#customerRole-manager-content').parents('.tab-pane').attr('id').slice(17);

        tabMenu(tabid);
        
    	//全选
    	$('#ywjs-qx', jqueryMap.$container).change( function() {
    		selectAll();
    	});
    	//系统客户全选
    	// $('#xtjs-kh', jqueryMap.$container).change( function() {
    	// 	selectAllKhXtjs();
    	// });
    	//商机管理全选
    	// $('#xtjs-sj', jqueryMap.$container).change( function() {
    	// 	selectAllSjXtjs();
    	// });
    	//系统员工全选
    	// $('#xtjs-yg', jqueryMap.$container).change( function() {
    	// 	selectAllYgXtjs();
    	// });
    	//系统统计全选
    	// $('#xtjs-tj', jqueryMap.$container).change( function() {
    	// 	selectAllTjXtjs();
    	// });
    	//系统合同全选
    	// $('#xtjs-ht', jqueryMap.$container).change( function() {
    	// 	selectAllHtXtjs();
    	// });
        //智能报税全选
        // $('#xtjs-znbs', jqueryMap.$container).change( function() {
        //     selectAllBsXtjs();
        // });
        //系统收费全选
        // $('#xtjs-sf', jqueryMap.$container).change( function() {
    		// selectAllSfXtjs();
        // });
    	//系统任务全选
    	// $('#xtjs-rw', jqueryMap.$container).change( function() {
    	// 	selectAllRwXtjs();
    	// });
    	//系统管理全选
    	// $('#xtjs-xtgl', jqueryMap.$container).change( function() {
    	// 	selectAllXtglXtjs();
    	// });
    	
	    Layout.addResizeContent(jqueryMap.$container);
	    setTimeout(function () {
	      var layout = jqueryMap.$container.layout({
	        center__onresize: App.initLayoutContentScrollbar,
	        west__onresize: App.initLayoutContentScrollbar,
	        west__size: 200
	      });
	
	      App.initLayoutContentScrollbar('west', layout.panes.west);
	      App.initLayoutContentScrollbar('center', layout.panes.center);
	    }, 10);
	    
      $('#btnSaveCustomerRole').off().on('click', function () {
    	  saveRole();
      });
      $('#addNewRole', jqueryMap.$container).off().on('click', function () {
    	  addNewRole();
      });
      $('#editRole', jqueryMap.$container).off().on('click', function () {
    	  editNewRole();
      });
      $('#delRole', jqueryMap.$container).off().on('click', function () {
    	  deleteRole();
      });
      $('#btnAddCustomerRole', jqueryMap.$container).off().on('click', function () {
          addMenuFun();
      });


      initRolesData();
    }
  };
}();
//@ sourceURL=roles/roles.js