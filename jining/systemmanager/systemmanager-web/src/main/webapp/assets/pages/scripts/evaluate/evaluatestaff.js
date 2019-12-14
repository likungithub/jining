/**
 * 客户给员工评价js
 */
var orgAndUserStaff_data = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/organization/organization/orgAndUser',//取组织
    EvaluateUrl: '/systemmanager/evaluateuserstaff/evaluateuserstaff',//评价信息
    EvaluateByBmUrl: '/systemmanager/evaluateuserstaff/evaluateuserstaffByBm',//评价信息
    EvaluateByStaffPaging: '/systemmanager/evaluateuserstaff/getEvaluateUserStaffByPaging',//分页
    SumGradeUrl: '/systemmanager/evaluateuserstaff/sumgradestaff',//评价总分
    NumPeopleUrl: '/systemmanager/evaluateuserstaff/numpeoplestaff',//参与评价人数
    viewPageUrl:'/systemmanager/evaluate/viewevaluatestaff.jsp',//显示详情
    createUserPageUrl: '/user/users/edit.jsp',
    addUrl: '/customermanage/customerManage/add.jsp',
    addSelectedNodeId: null,
    currentSelectedNode: null,
    evaluatestaffGrid:null,
    viewBtn_html:'<a href="javascript:;" class="details" data-type="view" data-toggle="tooltip" data-placement="top"  title="详情"><i class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize"</i></a>'
  };

  // 全局Dom
  var jqueryMap = {
    $container: null,
    $customerManageFrom: null,
    $blockTarget: null,
    $customerManageTree: null,
    $customerManageDialog: null,
    $selectedRow: null,
    $EvaluateStaffDataTable: null
  };

  var openModal = function (title, url, type, func) {
    var dialogButtons = {
      cancel: {
        label: '<i class="fa fa-times iconMr"></i> 关&nbsp;闭 ',
        className: 'btn btn-default borderRadius4'
      }
    };

    /*if (type === 'edit') {
      dialogButtons.success = {
        label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
        className: "btn-primary",
        callback: function () {
          func();
          return false;
        }
      };
    }
    if (type === 'add') {
        dialogButtons.success = {
          label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
          className: "btn-primary",
          callback: function () {
            func();
            return false;
          }
        };
      }*/

    $.get(url, function (html) {
      jqueryMap.$customerManageDialog = bootbox.dialog({
        title: title,
        message: html,
        buttons: dialogButtons,
        className:"eavaluatestaffview-m"
      });
    });
  };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#evaluatestaff-manager-content');
    jqueryMap.$blockTarget = jqueryMap.$container;
    jqueryMap.$customerManageTree = $('#orgAndUserStaff_manage_tree', jqueryMap.$container);
    jqueryMap.$EvaluateStaffDataTable = $('#orgAndUserStaff_data', jqueryMap.$container);
  };

	
  //点击树中的用户返回该用户的评价信息
  var initOrganization = function () {
      jqueryMap.$customerManageTree.jstree({
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
        },
        "people": {
          "icon": "fa fa-user icon-state-warning icon-lg"
        }
      },
      'plugins': ["types", "expand","wholerow"],
      "expand": {
        level: 2
      }
    }).on('load_node.jstree',function(e,data){
        $("#orgAndUserStaff_manage_tree").on("open_node.jstree", function (e, data) {
            getTreeNum();
        });

        var staffId=sessionStorage.getItem("node");
        var inst = data.instance;
       var obj = inst.get_node("#"+staffId);
       inst.select_node(obj);

        $("#orgAndUserStaff_manage_tree").bind("select_node.jstree", function (e, data) {
            data.instance.toggle_node(data.node);
            // clearTreeNum();
            getTreeNum();
        });
        getTreeNum();
        setTimeout(function () {
            $(".jstree-container-ul").removeClass("jstree-no-dots");
        },50)
    });

      var getTreeNum = function(){

          // for(var i = 0;i < $("#orgAndUserStaff_manage_tree li").length;i++){
          //     var $temp = $("#orgAndUserStaff_manage_tree li").eq(i).attr("userimg");
          //     var $text = $("#orgAndUserStaff_manage_tree li").eq(i).attr("usertext");
          //     if(typeof($temp)=="undefined" || typeof($temp)=="object"){
          //         //alert("不含有该属性");
          //     }else{
          //         //alert($("#orgAndUser_manage_tree li").eq(i).attr("userimg"));
          //         $("#orgAndUserStaff_manage_tree li").eq(i).find("i").eq(1).remove();
          //         $("#orgAndUserStaff_manage_tree li").eq(i).find("a").eq(0).append("<img src=" + $temp + " style='width:30px;border-radius:50% !important;height:30px;border:1px solid #e5e5e5;float:left;margin-right:11px;margin-top:5px;margin-left:7px;'><span>"+$text+"</span>");
          //     }
          // }

          for (var i = 0; i < $("#orgAndUserStaff_manage_tree li").length; i++) {
              var $temp = $("#orgAndUserStaff_manage_tree li").eq(i).attr("userimg");

              if (typeof($temp) == "undefined" || typeof($temp) == "object") {
              } else {
                  localStorage.setItem("step",i);
                  localStorage.setItem("userImg",$temp);
              }
          }
          $(".jstree-children li").each(function () {
              if($(this).attr("userImg")==0){
                  $(this).find("a").eq(0).find("i").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
              }

          })
      }



      //点击事件
    jqueryMap.$customerManageTree.on('select_node.jstree', function (e, data) {
      if (data.node.parent === '#'||data.node.parent==='workCustomer') {
    	  configMap.addSelectedNodeId = null; //点击树父节点初始化变量
      } else {
    	  configMap.addSelectedNodeId = data.node; //点击树中的子节点再取员工ID
      }

      configMap.currentSelectedNode = data.node;
        sessionStorage.setItem("node1",configMap.currentSelectedNode.id);

//      configMap.optType = 'edit';
        $('#startimeEvaluateStaff').val('');
		$('#endtimeEvaluateStaff').val('');
      //点击员工查询该员工的评价信息		
      if(configMap.addSelectedNodeId==null){//点击部门
//    	  $.ajax({
//  		    url: configMap.path + configMap.EvaluateByBmUrl + "/" + configMap.currentSelectedNode.id,
//  		    dataType: 'JSON',
//  		    type: 'GET',
//  		    success: function (result) {
//  		      App.unblockUI(jqueryMap.$blockTarget);
//  		      configMap.evaluatestaffGrid.clear().draw();
//  		      configMap.evaluatestaffGrid.rows.add(result).draw();
//  		    },
//  		    error: function () {
//  		      App.unblockUI(jqueryMap.$blockTarget);
//  		      Messenger().post({message: '获取数据失败！', type: 'error'});
//  		    }
//  	  });
      }else{
//    	  $.ajax({
//  		    url: configMap.path + configMap.EvaluateUrl + "/" + configMap.currentSelectedNode.id,
//  		    dataType: 'JSON',
//  		    type: 'GET',
//  		    success: function (result) {
//  		      App.unblockUI(jqueryMap.$blockTarget);
////  		      configMap.evaluatestaffGrid.ajax.reload();
//  		      configMap.evaluatestaffGrid.clear().draw();
//  		      configMap.evaluatestaffGrid.rows.add(result).draw();
//  		    },
//  		    error: function () {
//  		      App.unblockUI(jqueryMap.$blockTarget);
//  		      Messenger().post({message: '获取数据失败！', type: 'error'});
//  		    }
//  	  });
    	  configMap.evaluatestaffGrid.ajax.reload();
      
	  
	  
	  //点击员工查询员工总平分
	  $.ajax({
		  url: configMap.path + configMap.SumGradeUrl + "/" + configMap.currentSelectedNode.id,
		  dataType:'JSON',
		  type:'GET',
		  success:function(result){
			  if(result[0]!=null){
				  var sumGrade =parseInt(result[0].fwtd)+parseInt(result[0].zysz)+parseInt(result[0].jsx);
				  $("#gradestaff").text(sumGrade);
			  }else{
				  $("#gradestaff").text('0');
			  }
		  }
	  });
	  
	  //点击员工查询参与该员工评价的人数
	  $.ajax({
		  url: configMap.path + configMap.NumPeopleUrl + "/" + configMap.currentSelectedNode.id,
		  dataType:'JSON',
		  type:'GET',
		  success:function(result){
			  if(result[0]!=null){
				  $("#numpeoplestaff").text("参与评分"+result[0].plxx+"次");
			  }
		  }
	  });
      } 
    });
  };


  //初始化表单
  var initOrgAndUserData = function () {
	  App.blockUI({
	        target: jqueryMap.$blockTarget,
	        boxed: true,
	        message: '正在获取数据，请稍候...'
	      });
	  $.ajax({
		  url: configMap.path + configMap.EvaluateUrl,
		  dataType:'JSON',
		  type:'GET',
		  success:function(result){
			  App.unblockUI(jqueryMap.$blockTarget); 
			  configMap.evaluatestaffGrid.rows.add(result).draw();
		  }
	  });
  }
  //获取参与评价人数
  var initNumPeople = function () {
	  App.blockUI({
	        target: jqueryMap.$blockTarget,
	        boxed: true,
	        message: '正在获取数据，请稍候...'
	      });
	  $.ajax({
		  url: configMap.path + configMap.NumPeopleUrl,
		  dataType:'JSON',
		  type:'GET',
		  success:function(result){
			  App.unblockUI(jqueryMap.$blockTarget); 
			  if(result[0]!=null){
				  $("#numpeoplestaff").text("参与评分"+result[0].plxx+"次");
			  }
		  }
	  });
  }
  //获取总分
  var initSumGrade = function () {
	  App.blockUI({
	        target: jqueryMap.$blockTarget,
	        boxed: true,
	        message: '正在获取数据，请稍候...'
	      });
	  $.ajax({
		  url: configMap.path + configMap.SumGradeUrl,
		  dataType:'JSON',
		  type:'GET',
		  success:function(result){
			  App.unblockUI(jqueryMap.$blockTarget); 
			  if(result[0]!=null){
				  var sumGrade =parseInt(result[0].fwtd)+parseInt(result[0].zysz)+parseInt(result[0].jsx);
				  $("#gradestaff").text(sumGrade);
			  }
		  }
	  });
  }
  
  	//查看详情
	var viewEvaluate = function () {
		var el = $(this);
		var rowIndex = configMap.evaluatestaffGrid.cell(el.parent()).index().row;
		var id = configMap.evaluatestaffGrid.row(rowIndex).data().id;
		openModal("查看详情", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};
	
  var initOrgAndUserGrid = function () {
	    configMap.evaluatestaffGrid =
	      jqueryMap.$EvaluateStaffDataTable.DataTable({
	        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
	        "ordering": true,
	        "order": [[ 0, "desc" ]],
	        "destroy": true,
	        "lengthMenu": [10, 20, 50, 100],
	        "autoWidth": false,
	        "columnDefs": [
	            { targets: 1,"searchable": false }
	                   ],
	        "columns": [
	          {"data": "khpjsj",
                  'className':'text-center',
	        	  "render":function(data,type,row){
	        		  return moment(data).format('YYYY-MM-DD');
	        	  }
	          },
	          {"data": "khmc",
                'className':'text-center',
              },
	          {"data": "plxx",
              'className':'text-left'
              },
	          {"data": "fwtd",
                  'className':'text-center',
                  "render":function(d,t,r){
					return '<span class="futd-m">'+d+'</span>'
                  }},
	          {"data": "zysz",
                  'className':'text-center',
                  "render":function(d,t,r){
                      return '<span class="zysz-m">'+d+'</span>'
	          	}
			  },
	          {"data": "jsx",
                  'className':'text-center',
                  "render":function(d,t,r){
                      return '<span class="jsx-m">'+d+'</span>'
                  }

			  },
	          {     'className':'text-center',
					"render": function (data, type, row) {
		                return ''
		                  +configMap.viewBtn_html;
		              }
				}
	        ],
	        "drawCallback": function () { // 数据加载完成后执行

	          var viewContainer = $('[data-type="view"]', jqueryMap.$container);
	          if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewEvaluate);
	          }
                percent();
	        }
	      });

	  };
	  var iniEvaluateStaffPaging = function () {
	    configMap.evaluatestaffGrid =
		      jqueryMap.$EvaluateStaffDataTable.DataTable({
			        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			        "ordering":false,
			        "order": [[ 0, "desc" ]],
			        "destroy": true,
			        "lengthMenu": [10, 20, 50, 100],
			        "autoWidth": false,
			        "columnDefs": [
			            { targets: 1,"searchable": false }
			                   ],
	               "searching": false,//屏蔽datatales的查询框
	                "processing": true, // 打开数据加载时的等待效果
	                "serverSide": true, // 打开后台分页
	                "ajax": {
	                    "url": configMap.path + configMap.EvaluateByStaffPaging,
	                    "dataSrc": "aaData",
	                    "data": function (data) {
	//						                            var text = jqueryMap.$commonProblemType.find('#searchCommonProblemType').val();
	                        data.searchText = "";
	                        if(configMap.currentSelectedNode !=null){
                            	data.ygid=configMap.currentSelectedNode.id;
                            }else{
                            	data.ygid="";
                            }
                            var starttime = $('#startimeEvaluateStaff').val();
                    		var endtime = $('#endtimeEvaluateStaff').val();
                    		starttime = starttime +" 00:00:00";
    						endtime =endtime +" 23:59:59";
                    		data.starttime=starttime;
                    		data.endtime=endtime;
	                    }
	                },
			        "columns": [
			          {"data": "khpjsj",
		                  'className':'text-center',
			        	  "render":function(data,type,row){
			        		  return moment(data).format('YYYY-MM-DD');
			        	  }
			          },
			          {"data": "khmc",
		                'className':'text-center',
		              },
			          {"data": "plxx",
		              'className':'text-left'
		              },
			          {"data": "fwtd",
		                  'className':'text-center',
		                  "render":function(d,t,r){
							return '<span class="futd-m">'+d+'</span>'
		                  }},
			          {"data": "zysz",
		                  'className':'text-center',
		                  "render":function(d,t,r){
		                      return '<span class="zysz-m">'+d+'</span>'
			          	}
					  },
			          {"data": "jsx",
		                  'className':'text-center',
		                  "render":function(d,t,r){
		                      return '<span class="jsx-m">'+d+'</span>'
		                  }

					  },
			          {     'className':'text-center',
							"render": function (data, type, row) {
				                return ''
				                  +configMap.viewBtn_html;
				              }
						}
			        ],
			        "drawCallback": function () { // 数据加载完成后执行
                        $('[data-toggle="tooltip"]').tooltip();
			          var viewContainer = $('[data-type="view"]', jqueryMap.$container);
			          if (viewContainer.length > 0) {
							viewContainer.off('click').on('click', viewEvaluate);
			          }
		                percent();
			        }
			      });
		  };

  	var  percent=function(){
        var arr=[],arr1=[],arr2=[],av,av1,av2;
        $('#orgAndUserStaff_data .futd-m').each(function(){
            arr.push(parseInt($(this).html()));
        });
        $('#orgAndUserStaff_data .zysz-m').each(function(){
            arr1.push(parseInt($(this).html()));
        });
        $('#orgAndUserStaff_data .jsx-m').each(function(){
            arr2.push(parseInt($(this).html()));
        });

        function sum(obj){
            var s=0;
            for(var i=0;i<obj.length;i++)
            {
                s+=obj[i];
            }
            return s;
        }
        av=((sum(arr)/arr.length)*10).toFixed(2);

		$('#staff-loyal')[0].style.width=av+'%';
        $('#staff-loyal')[0].style.transition="width 1s linear";
		$('#staff-loyal-score').html(av+"%");
        if(isNaN(av)){
            $('#staff-loyal')[0].style.width=0+'%';
            $('#staff-loyal-score').html(0+"%");
        }

        av1=((sum(arr1)/arr1.length)*10).toFixed(2);

        $('#staff-major')[0].style.width=av1+'%';
        $('#staff-major')[0].style.transition="width 1s linear";
        $('#staff-major-score').html(av1+"%");
        if(isNaN(av1)){
            $('#staff-major')[0].style.width=0+'%';
            $('#staff-major-score').html(0+"%");
        }
        av2=((sum(arr2)/arr2.length)*10).toFixed(2);

        $('#staff-years')[0].style.width=av2+'%';
        $('#staff-years')[0].style.transition="width 1s linear";
        $('#staff-years-score').html(av2+"%");
        if(isNaN(av2)){
            $('#staff-years')[0].style.width=0+'%';
            $('#staff-years-score').html(0+"%");
        }
	}

  	var findByTime = function () {
		var starttime = $('#startimeEvaluateStaff').val();
		var endtime = $('#endtimeEvaluateStaff').val();
		starttime = starttime +" 00:00:00";
		endtime =endtime +" 23:59:59";
		if(configMap.addSelectedNodeId==null){
//			$.ajax({
//	  		    url: configMap.path + configMap.EvaluateUrl + "/"+starttime+"/"+endtime,
//	  		    dataType: 'JSON',
//	  		    type: 'GET',
//	  		    success: function (result) {
//	  		      App.unblockUI(jqueryMap.$blockTarget);
//	  		      configMap.evaluatestaffGrid.clear().draw();
//	  		      configMap.evaluatestaffGrid.rows.add(result).draw();
//	  		    },
//	  		    error: function () {
//	  		      App.unblockUI(jqueryMap.$blockTarget);
//	  		      Messenger().post({message: '获取数据失败！', type: 'error'});
//	  		    }
//	  	  });
		  configMap.evaluatestaffGrid.ajax.reload();
		  $.ajax({
			  url: configMap.path + configMap.SumGradeUrl + "/"+starttime+"/"+endtime,
			  dataType:'JSON',
			  type:'GET',
			  success:function(result){
				  if(result[0]!=null){
					  var sumGrade =parseInt(result[0].fwtd)+parseInt(result[0].zysz)+parseInt(result[0].jsx);
					  $("#gradestaff").text(sumGrade);
				  }else{
					  $("#gradestaff").text('0');
				  }
			  }
		  });
		  
		  $.ajax({
			  url: configMap.path + configMap.NumPeopleUrl + "/" +starttime+"/"+endtime,
			  dataType:'JSON',
			  type:'GET',
			  success:function(result){
				  if(result[0]!=null){
					  $("#numpeoplestaff").text("参与评分"+result[0].plxx+"次");
				  }
			  }
		  });
		}else{
//			$.ajax({
//	  		    url: configMap.path + configMap.EvaluateUrl + "/" + configMap.currentSelectedNode.id+"/"+starttime+"/"+endtime,
//	  		    dataType: 'JSON',
//	  		    type: 'GET',
//	  		    success: function (result) {
//	  		      App.unblockUI(jqueryMap.$blockTarget);
//	  		      configMap.evaluatestaffGrid.clear().draw();
//	  		      configMap.evaluatestaffGrid.rows.add(result).draw();
//	  		    },
//	  		    error: function () {
//	  		      App.unblockUI(jqueryMap.$blockTarget);
//	  		      Messenger().post({message: '获取数据失败！', type: 'error'});
//	  		    }
//	  	  });
			configMap.evaluatestaffGrid.ajax.reload();
		  $.ajax({
			  url: configMap.path + configMap.SumGradeUrl + "/" + configMap.currentSelectedNode.id+"/"+starttime+"/"+endtime,
			  dataType:'JSON',
			  type:'GET',
			  success:function(result){
				  if(result[0]!=null){
					  var sumGrade =parseInt(result[0].fwtd)+parseInt(result[0].zysz)+parseInt(result[0].jsx);
					  $("#gradestaff").text(sumGrade);
				  }else{
					  $("#gradestaff").text('0');
				  }
			  }
		  });
		  $.ajax({
			  url: configMap.path + configMap.NumPeopleUrl + "/" + configMap.currentSelectedNode.id+"/"+starttime+"/"+endtime,
			  dataType:'JSON',
			  type:'GET',
			  success:function(result){
				  if(result[0]!=null){
					  $("#numpeoplestaff").text("参与评分"+result[0].plxx+"次");
				  }
			  }
		  });
		}
      }
	  
	  
	    

  return {
    // 初始化
    init: function (id) {
        setJqueryMap();
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


        $('#startimeEvaluateStaffWrap').datepicker({
            clearBtn: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN',
            defaultDate: new Date()
        });
        $('#endtimeEvaluateStaffWrap').datepicker({
            clearBtn: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN',
            defaultDate: new Date()
        });
        $('#findByTimeEvaluatestaff').off('click').on('click',function(){
//			var starttime = $('#startimeEvaluateStaff').val();
//			  var endtime = $('#endtimeEvaluateStaff').val();
			  /*if(starttime==''||endtime==''){
				  Messenger().post({message: '查询日期不能为空！', type: 'error'});
			  }else{
				  findByTime();
			  }*/
			  findByTime();
        });
        /*//自定义搜索
        $.fn.dataTable.ext.search.pop();
        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
                var start = $('#startimeEvaluateStaff').val().format('YYYY-MM-DD');//开始时间
                var end = $('#endtimeEvaluateStaff').val().format('YYYY-MM-DD');//结束时间
                var age = data[0]; // 要匹配的日期列，下标0开始
                if (start == "" || end == "") {
                    return true; //显示
                } else if (start <= age && end >= age) {
                    return true;
                }
                return false;//不显示
            }
        );
        //日期改变刷新表单
        $('#startimeEvaluateStaff,#endtimeEvaluateStaff').change(function () {
            configMap.evaluatestaffGrid.draw();
        });*/
        initOrganization();
//        initOrgAndUserGrid();
//        initOrgAndUserData();
        iniEvaluateStaffPaging();
        initSumGrade();
        initNumPeople();
    } ,
    // 设置路径
    setPath: function (path) {
      configMap.path = '';
    }
  };
}();
//@ sourceURL=org/org.js