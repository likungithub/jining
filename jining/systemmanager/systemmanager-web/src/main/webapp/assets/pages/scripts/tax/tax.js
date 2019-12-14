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

/*global $, App, moment, jQuery, bootbox, taxEdit */

var tax = function() {
	'use strict';

	// 全局属性参数
	var configMap = {
		id : '',
		path : '',
		dataUrl : '/tax/findFile',
		datatablesLanguageFile : '/assets/global/plugins/datatables/chinese.json',
		taxGrid : null,
		editcgsPageUrl : '/tax/editcgs.jsp',
		editPageUrl : '/tax/edit.jsp',
		viewPageUrl : '/tax/view.jsp',
		editcgsBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="editcgs" data-toggle="tooltip" title="编辑雇员信息"><i class="fa fa-edit"></i></a>',
		deleteBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除雇员"><i class="fa fa-times"></i></a>',
		viewBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看雇员信息"><i class="fa fa-search"></i></a>'
	};
	// 全局Dom
	var jqueryMap = {
		$taxPage:null,	
		$blockTarget : null,
		$taxDialog : null
	};
	var data = {
		sousuo : $('[name=sousuo]').val(),
	}
	var setJqueryMap = function() {
		jqueryMap.$taxPage=$('#taxoption-set');
		jqueryMap.$blockTarget = $('body');
	};
	/**
	 * 通过ajax查到后台数据，把数据拼接成一个li标签 成功之后返回鼠标移上事件
	 */
	var gettax = function() {
		$.ajax({
			url : configMap.path + "/tax/findtax",
			dataType : 'JSON',
			type : 'GET',
			success : function(data) {
				if(data.message){
					for (var i = 0; i < data.message.length; i++) {
						$(".tax-tag").append('<li id=' + data.message[i].id+ '><input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip" value="'+ data.message[i].id + '">' + data.message[i].taxName+'<i class="icon iconfont icon-shanchu1 delete-m" >'+ '</li>');
					}
					lichange();
				}else if(data.messager){
					Messenger().post({message: '请添加税项！', type: 'warning',id:'taxDelete1'});
				}
				  onmouseoverfunction();
			},
			error : function() {
				bootbox.alert('获取税项设置内容失败！');
			}
		});
		
	};
	/**
	 * li标签点击事件
	 */
    var lichange=function(){
    	$('#findtax li').click(function(){
    		if($(this).children('[type="checkbox"]').is(':checked')){
                $(this).children('[type="checkbox"]').prop('checked',false);
                $(this).removeClass('select-ws');

    		}else{
    			$(this).addClass('select-ws');
                $(this).children('[type="checkbox"]').prop('checked',true);
    		}
			if($('#findtax li').filter('.select-ws').length==$('#findtax li').length){
    			$('#allCheckbb').prop('checked',true);
			}else {
                $('#allCheckbb').prop('checked',false);
			}
    	})
    }
	/**
	 * 删除li标签事件
	 */
	var deleteLi = function() {
		$("nav a").on(
				"click",
				function(e) {
					$(this).addClass("nav-active").siblings("a").removeClass(
							"nav-active");
				});
	}
	var deleteTax=function(){
		var id = '';
		var ids=new Array();
		$('[data-type="check"]:checked').each(function(){
			ids.push($(this).val())
		})
		if(ids.length>1){
			id=ids.join(',');
		}else{
			id=ids.join('');
		}
		if(id==''){
			Messenger().post({message: '请选择要删除的数据！', type: 'error',id:'taxDelete2'});
		}else{
			$.ajax({
				url:configMap.path+'/tax/deltaxation/'+id,
				type:'post', 
				datatype:'json',
				success:function(data){
					var ids=[];
					Messenger().post({message: '删除成功！', type: 'success'});
					$('[data-type="check"]:checked').each(function(){
					ids.push($(this).val());
					})
					for(var i=0;i<ids.length;i++){
						$('#'+ids[i]).remove();
					}
				}
			})
		}
	}
	
	/**
	 * 鼠标移上事件
	 */
	  var onmouseoverfunction = function(){ 
	  $(".tax-tag li").on("mouseenter",function() {
		//   $(this).children().remove();
		//   if ($(this).children('.delete-m').length == 0) {
		//   $(this).append('<i class="icon iconfont icon-shanchu1" >');
	  // }
	   var id=$(this).attr("id");
          $(this).children('.delete-m').unbind();
	 $(this).children('.delete-m').css('cursor',"pointer").bind("click", function() {
	  		bootbox.confirm({ title: "警告", message: "是否确认删除？", buttons: { confirm: {
	  		label: '<i class="fa fa-times"></i> 取消', 
	  		className: "btn btn-default borderRadius4 ", }, 
	  		cancel: { label: '<i class="fa fa-check"></i> 确认',
	  		className: "btn btnBlue borderRadius4 colorfff", 
	  	}
	   },
	    callback: function (result) { 
	    	if (!result){ 
	    		$.ajax({ url: configMap.path +"/tax/deltaxation/"+id,
    				 type:'post', 
    				 datatype:'json',
    				 success:function(data){
    				 // bootbox.confirm({ title: "提示", message: "已成功删除",
    				 // buttons: { confirm: { label: '<i class="fa fa-check"></i> 确认',
    				 // className: "btn btnBlue borderRadius4 colorfff", },
    				 // cancel: { label: '<i class="fa fa-check"></i> 取消', className: "hideB", } },
    				 // callback:function(result) {
	                  //        }
                     //
	                  // });
                         Messenger().post({message: '删除成功！', type: 'warning',id:'taxDelete3'});

    				 $("#"+id).remove();
	  }, 
	  error:function(){ bootbox.alert("失败"); 
	  } 
	  }); 
	    		} 
	    	}
	  }); }); })
		//   .on("mouseleave", function(e) {
	  // $(this).children("i.icon.iconfont.icon-shanchu1").remove();
	  // });
	  }
	 

	/**
	 * 通过ajax获取到redis中的list，对list进行遍历并拼接成option
	 * 
	 */
	var likef = function() {
		var oneReq = [];
		$.ajax({
			url : configMap.path + "/tax/taxation",
			type : 'post',
			datatype : 'json',
			async : false,
			success : function(data) {
				for (var j = 0; j < data.length; j++) {
					oneReq.push(data[j].taxationCode + '、'+ data[j].taxationName);
				}
				$('#add_tax_list').select2({
					data : oneReq,
					placeholder : '请选择',// 默认文字提示
					language : "zh-CN",// 汉化
					allowClear : true,// 允许清空
					width : '300px',
				});
			}
		});
	};
	/**
	 * 把文本框中的值通过ajax传到后台增加数据库记录
	 */
	var sub = function() {
		$('#subbutton').click(function() {
			var subtext = $('#add_tax_list').val();
			var data = {
					subtext:subtext
			}
			$.ajax({
				url : configMap.path + "/tax/inserttax/"+subtext,
				type : 'post',
				datatype : 'json',
				/*contentType: "application/json",*/
				/*data : JSON.stringify(data),*/
				success : function(data) {
					if (data.success) {
						$('#findtax').find("li").remove();
						gettax();
					} else {
						Messenger().post({
							message : data.message,
							type : 'error'
						});
					}
				}
			});

		});
	};

	return {
		init : function() {
			var tabid=$('#taxoption-set').parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
			// configMap.id = id;
			setJqueryMap();
			// 控件验证
			gettax();
			deleteLi();
			likef();
			sub();
			$('#scsxbtn').off('click').on('click',function(){
				deleteTax();
				
			})
			jqueryMap.$taxPage.find('#allCheckbb').off('click').on('click', function () {
		          if (this.checked) {
		              jqueryMap.$taxPage.find($('[data-type="check"]')).prop("checked", true);
		              jqueryMap.$taxPage.find($('[data-type="check"]').parent()).addClass('select-ws')
		              
		          } else {
		              jqueryMap.$taxPage.find($('[data-type="check"]')).prop("checked", false);
		              jqueryMap.$taxPage.find($('[data-type="check"]').parent()).removeClass('select-ws');
		          }
	        });
			
		},
		setPath : function(path) {
			configMap.path = path;
		},
		reload : function() {
			inittaxData();
		},
	};

}();
// @ sourceURL=tax.js
