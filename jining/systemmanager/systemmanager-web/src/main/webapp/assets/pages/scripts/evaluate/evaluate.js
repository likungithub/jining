/**
 * 公司给员工
 */
var orgEvaluate_data = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/organization/organization/orgAndUser',//取组织
    EvaluateUrl: '/systemmanager/evaluateuser/evaluateuser',//评价信息
    EvaluateByBmUrl: '/systemmanager/evaluateuser/evaluateuserByBm',//评价信息
    EvaluateByPaging: '/systemmanager/evaluateuser/getEvaluateByPaging',//分页
    SumGradeUrl: '/systemmanager/evaluateuser/sumgrade',//评价总分
    NumPeopleUrl: '/systemmanager/evaluateuser/numpeople',//参与评价人数
    viewPageUrl:'/systemmanager/evaluate/viewevaluate.jsp',//显示详情
    addPageUrl:'/systemmanager/evaluate/addevaluate.jsp',//新增评论
    currentSelectedNode: null,
    addSelectedNodeId: null,//新增评论获取选择ID
    evaluateGrid:null,
    viewBtn_html:'<a href="javascript:void(0);" class="details" data-type="view" data-toggle="tooltip" data-placement="top" title="详情"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize" ></i></a>'
  };

  // 全局Dom
  var jqueryMap = {
    $container: null,
    $customerManageFrom: null,
    $blockTarget: null,
    $customerManageTree: null,
    $evaluateDialog: null,
    $selectedRow: null,
    $EvaluateDataTable: null
  };

	var openModaladd = function (title, url, type) {
		var dialogButtons = {};
		dialogButtons.success = {
			label: '<i class="'+ 'fa fa-save iconMr'+ '"></i>保存',
			className: "btn btn-default borderRadius4 btnBlue colorfff",
			callback: function () {
				addEvaluate.saveEvaluate(function (result) {
					if (result) {
						var starttime = $('#startimeEvaluate').val();
						var endtime = $('#endtimeEvaluate').val();
						starttime = starttime +" 00:00:00";
						endtime =endtime +" 23:59:59";
						configMap.evaluateGrid.ajax.reload();
			    		//点击员工查询员工总平分
			    		  $.ajax({
			    			  url: configMap.path + configMap.SumGradeUrl + "/" + configMap.addSelectedNodeId.id+ "/" +starttime+"/"+endtime,
			    			  dataType:'JSON',
			    			  type:'GET',
			    			  success:function(result){
			    				  if(result[0]!=null){
			    					  var sumGrade =parseInt(result[0].zcd)+parseInt(result[0].zysp)+parseInt(result[0].yggl)+parseInt(result[0].ywnl);
			    					  $("#grade").text(sumGrade);
			    				  }else{
			    					  $("#grade").text('0');
			    				  }
			    			  }
			    		  });
			    		  
			    		  //点击员工查询参与该员工评价的人数
			    		  $.ajax({
			    			  url: configMap.path + configMap.NumPeopleUrl + "/" + configMap.addSelectedNodeId.id+ "/" +starttime+"/"+endtime,
			    			  dataType:'JSON',
			    			  type:'GET',
			    			  success:function(result){
			    				  if(result[0]!=null){
			    					  $("#numpeople").text("参与评分"+result[0].gspy+"次");
			    				  }
			    			  }
			    		  });
						jqueryMap.$evaluateDialog.modal('hide');
					}
				});

				return false;
			}
		};
        dialogButtons.cancel={
            label:'<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
            className: 'btn btn-default borderRadius4'
        }

		$.get(url, function (html) {
			jqueryMap.$evaluateDialog = bootbox.dialog({
				className:"companyEvaluate-m",
				title: title,
				message: html,
				buttons: dialogButtons
			});
		});
	};
  
  var openModal = function (title, url, type, func) {
	  var dialogButtons = {
			  cancel: {
				  label: '<i class="fa fa-times "></i> 关&nbsp;闭 ',
				  className: 'btn btn-default borderRadius4'
			  }
	  };
	  $.get(url, function (html) {
		  jqueryMap.$evaluateDialog = bootbox.dialog({
              className:'evaluate-dialog-com',
			  title: title,
			  message: html,
			  buttons: dialogButtons
		  });
	  });
  };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#evaluate-manager-content');
    jqueryMap.$blockTarget = jqueryMap.$container;
    jqueryMap.$customerManageTree = $('#orgAndUser_manage_tree_evaluate', jqueryMap.$container);
    jqueryMap.$EvaluateDataTable = $('#orgEvaluate_data', jqueryMap.$container);
  };

  //点击树中的用户返回该用户的评价信息
  var initOrganization = function () {
    var jstree = jqueryMap.$customerManageTree.jstree({
        'core': {
            "themes": {
                "responsive": false
            },
            "check_callback": true,
            'data': {
                'url': configMap.path + configMap.dataUrl
            },
            "state": {
                "opened": true,  //展示第一个层级下面的node
                //该根节点不可点击
            }
        },
        "types": {
            "default": {
                "icon": true
            }

        },

        'plugins': ["types", "expand","search"],
        "expand": {
            level: 5
        }
    }).on('load_node.jstree',function(e,data){
        $("#orgAndUser_manage_tree_evaluate").on("open_node.jstree", function (e, data) {
            getTreeNum();
        });
        var staffId=sessionStorage.getItem("node1");
        var inst = data.instance;
        var obj = inst.get_node("#"+staffId);
        inst.select_node(obj);
        $("#orgAndUser_manage_tree_evaluate").bind("select_node.jstree", function (e, data) {
            data.instance.toggle_node(data.node);
            // clearTreeNum();
            getTreeNum();
        });
        getTreeNum();
    });

      var getTreeNum = function(){
          for (var i = 0; i < $("#orgAndUser_manage_tree_evaluate li").length; i++) {
              var $temp = $("#orgAndUser_manage_tree_evaluate li").eq(i).attr("userimg");

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
//        $('#btnNewOrg', jqueryMap.$container).off();
//        $('#btnNewOrg', jqueryMap.$container).parent('li').addClass('disabled');
        configMap.addSelectedNodeId = null; //点击树父节点初始化变量
      } else {
//        $('#btnNewOrg', jqueryMap.$container).off().on('click', function () {
//        });
//        $('#btnNewOrg', jqueryMap.$container).parent('li').removeClass('disabled');
        configMap.addSelectedNodeId = data.node; //点击树中的子节点再取员工ID
      }
      configMap.currentSelectedNode = data.node;
        sessionStorage.setItem("node",configMap.currentSelectedNode.id);
        $('#startimeEvaluate').val('');
		$('#endtimeEvaluate').val('');

        //点击员工查询该员工的评价信息
      if(configMap.addSelectedNodeId==null){//点击部门
      }else{
    	  configMap.evaluateGrid.ajax.reload();
	  
	  
	  //点击员工查询员工总平分
	  $.ajax({
		  url: configMap.path + configMap.SumGradeUrl + "/" + configMap.currentSelectedNode.id,
		  dataType:'JSON',
		  type:'GET',
		  success:function(result){
			  if(result[0]!=null){
				  var sumGrade =parseInt(result[0].zcd)+parseInt(result[0].zysp)+parseInt(result[0].yggl)+parseInt(result[0].ywnl);
				  $("#grade").text(sumGrade);
			  }else{
				  $("#grade").text('0');
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
				  $("#numpeople").text("参与评分"+result[0].gspy+"次");
			  }
		  }
	  });
      }   
    });
      //输入框输入定时自动搜索
      var to = false;
      $('#search_xx').keyup(function () {
          if (to) {
              clearTimeout(to);
          }
          to = setTimeout(function () {
              jstree.jstree(true).search($('#search_xx').val());
          }, 250);

      });
  };
  
  var findByTime = function () {
		var starttime = $('#startimeEvaluate').val();
		var endtime = $('#endtimeEvaluate').val();
		starttime = starttime +" 00:00:00";
		endtime =endtime +" 23:59:59";
		if(configMap.addSelectedNodeId==null){//没有选中员工，按时间查询全部信息
//			$.ajax({
//			    url: configMap.path + configMap.EvaluateUrl + "/"+starttime+"/"+endtime,
//			    dataType: 'JSON',
//			    type: 'GET',
//			    success: function (result) {
//				    configMap.evaluateGrid.clear().draw();
//				    configMap.evaluateGrid.rows.add(result).draw();
//			    },
//			    error: function () {
//			      App.unblockUI(jqueryMap.$blockTarget);
//			      Messenger().post({message: '获取数据失败！', type: 'error'});
//			    }
//		  });
			configMap.evaluateGrid.ajax.reload();
			//点击员工查询员工总平分
			  $.ajax({
				  url: configMap.path + configMap.SumGradeUrl + "/" +starttime+"/"+endtime,
				  dataType:'JSON',
				  type:'GET',
				  success:function(result){
					  if(result[0]!=null){
						  var sumGrade =parseInt(result[0].zcd)+parseInt(result[0].zysp)+parseInt(result[0].yggl)+parseInt(result[0].ywnl);
						  $("#grade").text(sumGrade);
					  }else{
						  $("#grade").text('0');
					  }
				  }
			  });
			  
			  //点击员工查询参与该员工评价的人数
			  $.ajax({
				  url: configMap.path + configMap.NumPeopleUrl + "/" +starttime+"/"+endtime,
				  dataType:'JSON',
				  type:'GET',
				  success:function(result){
					  if(result[0]!=null){
						  $("#numpeople").text("参与评分"+result[0].gspy+"次");
					  }
				  }
			  });
		}else{//根据员工ID，时间查询信息
//			$.ajax({
//			    url: configMap.path + configMap.EvaluateUrl + "/" + configMap.addSelectedNodeId.id+"/"+starttime+"/"+endtime,
//			    dataType: 'JSON',
//			    type: 'GET',
//			    success: function (result) {
//				    configMap.evaluateGrid.clear().draw();
//				    configMap.evaluateGrid.rows.add(result).draw();
//			    },
//			    error: function () {
//			      App.unblockUI(jqueryMap.$blockTarget);
//			      Messenger().post({message: '获取数据失败！', type: 'error'});
//			    }
//		  });
			configMap.evaluateGrid.ajax.reload();
			//点击员工查询员工总平分
			  $.ajax({
				  url: configMap.path + configMap.SumGradeUrl + "/" + configMap.addSelectedNodeId.id+"/"+starttime+"/"+endtime,
				  dataType:'JSON',
				  type:'GET',
				  success:function(result){
					  if(result[0]!=null){
						  var sumGrade =parseInt(result[0].zcd)+parseInt(result[0].zysp)+parseInt(result[0].yggl)+parseInt(result[0].ywnl);
						  $("#grade").text(sumGrade);
					  }else{
						  $("#grade").text('0');
					  }
				  }
			  });
			  
			  //点击员工查询参与该员工评价的人数
			  $.ajax({
				  url: configMap.path + configMap.NumPeopleUrl + "/" + configMap.addSelectedNodeId.id+"/"+starttime+"/"+endtime,
				  dataType:'JSON',
				  type:'GET',
				  success:function(result){
					  if(result[0]!=null){
						  $("#numpeople").text("参与评分"+result[0].gspy+"次");
					  }
				  }
			  });
		}
		
	
	}

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
			  configMap.evaluateGrid.rows.add(result).draw();
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
				  $("#numpeople").text("参与评分"+result[0].gspy+"次");
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
				  var sumGrade =parseInt(result[0].zcd)+parseInt(result[0].zysp)+parseInt(result[0].yggl)+parseInt(result[0].ywnl);
				  $("#grade").text(sumGrade);
			  }
		  }
	  });
  }
  
  	//查看详情
	var viewEvaluate = function () {
		var el = $(this);
		var rowIndex = configMap.evaluateGrid.cell(el.parent()).index().row;
		var id = configMap.evaluateGrid.row(rowIndex).data().id;
		openModal("查看详情", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};
	//新增公司评论
	var insertEvaluate = function () {
		if(configMap.addSelectedNodeId==null){
			Messenger().post({message: '请选择员工！', type: 'error'});
		}else{
			var id =configMap.addSelectedNodeId.id;
			var ygxm=configMap.addSelectedNodeId.li_attr.userText;
			openModaladd("员工评价", configMap.path + configMap.addPageUrl + "?id=" + encodeURI(id)+"&ygxm="+encodeURI(ygxm), 'edit');
		}
	};
	
  var initOrgAndUserGrid = function () {
	    configMap.evaluateGrid =
	      jqueryMap.$EvaluateDataTable.DataTable({
	        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
	        "ordering": false,// 是否启用排序功能
	        "order": [[ 0, "desc" ]],
	        "destroy": true,
	        "lengthMenu": [10, 20, 50, 100],
	        "autoWidth": false,
	        "columnDefs": [
//	            { "orderable": false, "targets": 0 },//第一列不允许排序，下标0开始
	            { targets: 1,"searchable": false }
	                   ],
	        "columns": [
	          {"data": "gspjsj",
                  'className':'text-center',
	        	  "render":function(data,type,row){
	        		  return moment(data).format('YYYY-MM-DD');
	        	  }
	          },
	          {"data": "gspjryxm",
              'className':'text-center',},
	          {"data": "gspy",
              'className':'text-left'
              },
	          {"data": "zcd",
                  'className':'text-center',
			  'render':function(d){
                  return '<span class="zcd-m">'+d+'</span>'
			  }
			  },
	          {"data": "zysp",
                  'className':'text-center',
                  'render':function(d){
                      return '<span class="zysp-m">'+d+'</span>'
                  }
			  },
	          {"data": "yggl",
                  'className':'text-center',
                  'render':function(d){
                      return '<span class="yggl-m">'+d+'</span>'
                  }
              },
	          {"data": "ywnl",
                  'className':'text-center',
                  'render':function(d){
                      return '<span class="ywnl-m">'+d+'</span>'
                  }
			  },
	          {
                  'className':'text-center',
					"render": function (data, type, row) {
		                return ''
		                  +configMap.viewBtn_html;
		              }
				}
	        ],
              "language": {
                  "zeroRecords": "暂时没有数据",
                  "infoEmpty": "无记录",
                  "sEmptyTable": "暂时没有数据",
                  "sInfoThousands":",",
                  "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
              },
	        "drawCallback": function () {
                $('[data-toggle="tooltip"]').tooltip();
                console.info(1111);
	        	// 数据加载完成后执行
	          var viewContainer = $('[data-type="view"]', jqueryMap.$container);
	          if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewEvaluate);
	          }
                percent1();
	        }
	      });
	  };
	  
	  var iniEvaluateUserPaging = function () {
		    configMap.evaluateGrid =
			      jqueryMap.$EvaluateDataTable.DataTable({
			        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			        "ordering": false,// 是否启用排序功能
			        "order": [[ 0, "desc" ]],
			        "destroy": true,
			        "lengthMenu": [10, 20, 50, 100],
			        "autoWidth": false,
			        "columnDefs": [
//			            { "orderable": false, "targets": 0 },//第一列不允许排序，下标0开始
			            { targets: 1,"searchable": false }
			                   ],
                   "searching": false,//屏蔽datatales的查询框
                    "processing": true, // 打开数据加载时的等待效果
                    "serverSide": true, // 打开后台分页
                    "ajax": {
                        "url": configMap.path + configMap.EvaluateByPaging,
                        "dataSrc": "aaData",
                        "data": function (data) {
//			                            var text = jqueryMap.$commonProblemType.find('#searchCommonProblemType').val();
                            data.searchText = "";
                            if(configMap.currentSelectedNode !=null){
                            	data.ygid=configMap.currentSelectedNode.id;
                            }else{
                            	data.ygid="";
                            }
                            var starttime = $('#startimeEvaluate').val();
                    		var endtime = $('#endtimeEvaluate').val();
                    		starttime = starttime +" 00:00:00";
    						endtime =endtime +" 23:59:59";
                    		data.starttime=starttime;
                    		data.endtime=endtime;
                        }
                    },
			        "columns": [
			          {"data": "gspjsj",
		                  'className':'text-center',
			        	  "render":function(data,type,row){
			        		  return moment(data).format('YYYY-MM-DD');
			        	  }
			          },
			          {"data": "gspjryxm",
		              'className':'text-center',},
			          {"data": "gspy",
		              'className':'text-left'
		              },
			          {"data": "zcd",
		                  'className':'text-center',
					  'render':function(d){
		                  return '<span class="zcd-m">'+d+'</span>'
					  }
					  },
			          {"data": "zysp",
		                  'className':'text-center',
		                  'render':function(d){
		                      return '<span class="zysp-m">'+d+'</span>'
		                  }
					  },
			          {"data": "yggl",
		                  'className':'text-center',
		                  'render':function(d){
		                      return '<span class="yggl-m">'+d+'</span>'
		                  }
		              },
			          {"data": "ywnl",
		                  'className':'text-center',
		                  'render':function(d){
		                      return '<span class="ywnl-m">'+d+'</span>'
		                  }
					  },
			          {
		                  'className':'text-center',
							"render": function (data, type, row) {
				                return ''
				                  +configMap.viewBtn_html;
				              }
						}
			        ],
                      "language": {
                          "zeroRecords": "暂时没有客户",
                          "infoEmpty": "无记录",
                          "sEmptyTable": "暂时没有客户",
                          "sInfoThousands":",",
                          "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                      },
			        "drawCallback": function () { // 数据加载完成后执行
                        $('[data-toggle="tooltip"]').tooltip();
			          var viewContainer = $('[data-type="view"]', jqueryMap.$container);
			          if (viewContainer.length > 0) {
							viewContainer.off('click').on('click', viewEvaluate);
			          }
		                percent1();
			        }
			      });
			  };

    var  percent1=function(){
        var arr=[],arr1=[],arr2=[],arr3=[],av,av1,av2,av3;
        $('#orgEvaluate_data .zcd-m').each(function(){
            arr.push(parseInt($(this).html()));
        });
        $('#orgEvaluate_data .zysp-m').each(function(){
            arr1.push(parseInt($(this).html()));
        });
        $('#orgEvaluate_data .yggl-m').each(function(){
            arr2.push(parseInt($(this).html()));
        });
        $('#orgEvaluate_data .ywnl-m').each(function(){
            arr3.push(parseInt($(this).html()));
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

        $('#company-loyal')[0].style.width=av+'%';
        $('#company-loyal-score').html(av+"%");
        if(isNaN(av)){
            $('#company-loyal')[0].style.width=0+'%';
            $('#company-loyal')[0].style.transition="width 1s linear";
            $('#company-loyal-score').html(0+"%");
        }

        av1=((sum(arr1)/arr1.length)*10).toFixed(2);

        $('#company-major')[0].style.width=av1+'%';
        $('#company-major-score').html(av1+"%");
        if(isNaN(av1)){
            $('#company-major')[0].style.width=0+'%';
            $('#company-major')[0].style.transition="width 1s linear";
            $('#company-major-score').html(0+"%");
        }
        av2=((sum(arr2)/arr2.length)*10).toFixed(2);

        $('#company-years')[0].style.width=av2+'%';
        $('#company-years')[0].style.transition="width 1s linear";
        $('#company-years-score').html(av2+"%");
        if(isNaN(av2)){
            $('#company-years')[0].style.width=0+'%';
            $('#company-years-score').html(0+"%");
        }
        av3=((sum(arr3)/arr3.length)*10).toFixed(2);

        $('#company-ability')[0].style.width=av3+'%';
        $('#company-ability')[0].style.transition="width 1s linear";
        $('#company-ability-score').html(av3+"%");
        if(isNaN(av3)){
            $('#company-ability')[0].style.width=0+'%';
            $('#company-ability-score').html(0+"%");
        }
    }
    
   

  return {
    // 初始化
    init: function (id) {
      setJqueryMap();
      var tabid=$('#evaluate-manager-content').parents('.tab-pane').attr('id').slice(17);

      tabMenu(tabid);
        $('.set-start-date').datepicker({
            clearBtn : true,
            format : 'yyyy-mm-dd',
            autoclose : true,
            language : 'zh-CN',
            defaultDate: new Date()

        });
        $('.set-end-date').datepicker({
            clearBtn : true,
            format : 'yyyy-mm-dd',
            autoclose : true,
            language : 'zh-CN',
            defaultDate: new Date()

        });
      $("#addEvaluate").on("click", function(e) {
    	  if(configMap.addSelectedNodeId == null){
    		  Messenger().post({message: '请选择员工！', type: 'error'});
    	  }else{
    		  insertEvaluate();
    	  }
		});
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
      
      
      $('#startimeEvaluateWrap').datepicker({
          clearBtn: true,
          format: 'yyyy-mm-dd',
          autoclose: true,
          language: 'zh-CN',
      	defaultDate : new Date()
      });
      $('#endtimeEvaluateWrap').datepicker({
          clearBtn: true,
          format: 'yyyy-mm-dd',
          autoclose: true,
          language: 'zh-CN',
      	defaultDate : new Date()
      });
      $('#findByTimeEvaluate').off('click').on('click',function(){
//    	  var starttime = $('#startimeEvaluate').val();
//		  var endtime = $('#endtimeEvaluate').val();
//		  if(starttime==''||endtime==''){
//			  Messenger().post({message: '查询日期不能为空！', type: 'error'});
//		  }else{
//			  findByTime();
//		  }
		  findByTime();
	  });
	  //自定义搜索   
     /* $.fn.dataTable.ext.search.pop();
	  $.fn.dataTable.ext.search.push(
		      function( settings, data, dataIndex ) {
		    	  var start = $('#startimeEvaluate').val().format('YYYY-MM-DD');//开始时间
		    	  var end = $('#endtimeEvaluate').val().format('YYYY-MM-DD');//结束时间
		    	  var age = data[0]; // 要匹配的日期列，下标0开始
		          if(start==""||end==""){
		        	 return true; //显示
		          }else if(start<=age&&end>=age){
		        	  return true; 
		          }
		          return false;//不显示
		      }
		    );
	  //日期改变刷新表单
		$('#startimeEvaluate,#endtimeEvaluate').change( function() {
			configMap.evaluateGrid.draw();
	  } );*/

      initOrganization();
//      initOrgAndUserGrid();
//      initOrgAndUserData();
      iniEvaluateUserPaging();
      initSumGrade();
      initNumPeople();
    },
    // 设置路径
    setPath: function (path) {
      configMap.path = '';
    }
  };
}();
//@ sourceURL=org/org.js