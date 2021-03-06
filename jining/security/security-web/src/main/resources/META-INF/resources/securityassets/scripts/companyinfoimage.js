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
var companyInfoImage = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/customerManage/companyImage',
        checkUrl: '/customerManage/checkcontract',
        id: '',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除附件"><i class="icon iconfont icon-shanchu"></i></a>',
        get:null,
        schedule : '/customerManage/schedule',
        filesize:'',
        status: '',
        fileUrl:'/customerManage/getImageUrl',
        fjlx: ''
    };

    // 全局Dom
    var jqueryMap = {
		$blockTarget: null,
		companyInfoForm: null,
		$setimg: null
    };

    var setJqueryMap = function () {
    	jqueryMap.$blockTarget = $('body');
        jqueryMap.companyInfoForm = $('#companyInfoImage');
    };

    var getSchedule = function (){
    	$.ajax({
			url : configMap.path + configMap.schedule,
			dataType : 'JSON',
			type : 'GET',
			success : function(result) {
				$(".progress-bar").css("width",result.schedule);
		        $(".progress-value").html(result.schedule);
			}
		});
    };

    //隐藏进度条
    var hiddenSchedule = function (){
    	$("#schedule").css("display","none");
    	$(".progress-bar",jqueryMap.companyInfoForm).css("width","0%");
        $(".progress-value",jqueryMap.companyInfoForm).html("0%");
    };

    var savefile = function (){
    	var blockTarget = jqueryMap.companyInfoForm.closest(".modal-content");
    	var AppAlert = function(msg){
            App.alert({
                container: jqueryMap.companyInfoForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: msg,
                closeInSeconds:3,
                icon: 'fa fa-warning'
            });
        };

    	//上传文件大小
    	if($("input[name='file']", jqueryMap.companyInfoForm)[0].files[0] == null || $("input[name='file']", jqueryMap.companyInfoForm)[0].files[0] == undefined) {
    		App.unblockUI(blockTarget);
            AppAlert('请选择要上传的文件！');
            return;
    	}

    	if($("input[name='file']",jqueryMap.companyInfoForm)[0].files[0].size >= 5242880){
        	App.unblockUI(blockTarget);
            AppAlert('请上传指定大小以内的文件(文件5M以内，图片3M以内)！');
            return;
        }

        var url = '/customermanage' + configMap.dataUrl + '/' + configMap.fjlx;
        var inputform = {
    		url: url,
            type: "POST",
            dataType: 'JSON',
            headers: {"ClientCallMode": "ajax"}, //添加请求头部
            beforeSend:function(){
            	$("#righttwo").remove();
	    		$("#rightone").css("display","block");
            	$("#schedule").css("display","block");
				configMap.get = window.setInterval(getSchedule, "500");
			},
			complete:function(){
				clearInterval(configMap.get);
				$(".progress-bar",jqueryMap.companyInfoForm).css("width","100%");
		        $(".progress-value",jqueryMap.companyInfoForm).html("100%");
				sessionStorage.removeItem("status");
				setTimeout(hiddenSchedule, "1000");
			},
            success: function (data) {
                App.unblockUI(blockTarget);
                if(data.success){
                	$("input[name='file']",jqueryMap.companyInfoForm).val("");
                	getFileList();
                } else {
                	Messenger().post({
						message : data.message,
						type : 'error'
					});
                }
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.companyInfoForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
            }
        };
        $("#companyInfoImageForm").ajaxSubmit(inputform);
    };

    var getFileList = function (){
    	var url = '/customermanage' + configMap.dataUrl + '/' + configMap.fjlx;
    	$.ajax({
			url : url,
			dataType : 'JSON',
			type : 'GET',
			success : function(result) {
				$(".list-group",jqueryMap.companyInfoForm).html("");
				var content = '';
				for(var i=0;i<result.length;i++){
					content += '<li class="list-group-item"><span class="opera" id="'+result[i].id+'">';
					if (configMap.status=="insert"){
						content += configMap.deleteBtn_html;
					}
					content += '</span><label class="fonthidden">'+result[i].fjmc+'</label></li>';
				}
				$(".list-group",jqueryMap.companyInfoForm).append(content);
				//文件数量
				configMap.filesize=result.length;
				jqueryMap.companyInfoForm.find('li').off('click').on('click',function (){
					$("li").not(this).removeClass("checked");
					$(this).addClass("checked");
		    		var indexsize = $(this).index();
		    		$("#righttwo").remove();
		    		$("#rightone").css("display","none");
		    		var rightcontent = '';
		    		var filesize = '';
		    		rightcontent += '<div class="col-md-7" style="height: 350px;display: block;padding:100px 60px 100px 60px;" id="righttwo">';
		    		rightcontent += '<div class="row"><div class="col-md-12"><b style="font-size:20px;word-wrap: break-word;word-break: break-all;">'+result[indexsize].fjmc+'</b></div>';
		    		rightcontent += '<div class="col-md-12"><span><label>文件类型：</label><label style="color:">'+result[indexsize].fjmc.split(".")[(result[indexsize].fjmc.split(".").length)-1]+'</span></div>';
		    		if(result[indexsize].wjdx<1048576){
		    			filesize = (result[indexsize].wjdx/1024).toFixed(1);
		    			filesize += "KB";
		    		} else if(result[indexsize].wjdx>=1048576){
		    			filesize = (result[indexsize].wjdx/1048576).toFixed(1);
		    			filesize += "MB";
		    		}
		    		rightcontent += '<div class="col-md-12"><span><label>文件大小：</label>'+filesize+'</span></div>';
		    		rightcontent += '<div class="col-md-12"><span><label>上传时间：</label>'+moment(result[indexsize].scsj).format('YYYY-MM-DD')+'</span></div>';
		    		rightcontent += '<div class="col-md-12"><span><a onclick="companyInfoImage.getURL('+'\''+result[indexsize].fjmc+'\','+'\''+result[indexsize].id+'\''+')" name="downloadfile" href="'+result[indexsize].fjcclj+'" download="">下载</a></span></div>';
		    		rightcontent += '</div></div></div>';
		    		$("#companyInfoImage").append(rightcontent);
		    	});
				var delContainer = $('[data-type="del"]', jqueryMap.companyInfoForm);
				if (delContainer.length > 0) {
					delContainer.confirmation({
						"title": '确定要删除？',
						"btnOkLabel": '是',
						"btnCancelLabel": '否',
						"placement": 'left',
						"onConfirm": delCompanyImage
					});
				}
				
				if(configMap.fjlx=="001"){
            		$('#businessLicenseImage').html("查看附件("+configMap.filesize+")");
            	} else if (configMap.fjlx=="002"){
            		$('#qualificationImage').html("查看附件("+configMap.filesize+")");
            	} else {
            		$('#enterprisePerformanceImage').html("查看附件("+configMap.filesize+")");
            	}
			}
		});
    };

    var delCompanyImage = function (event, element){
    	var id = element.parent().parent().index();
    	var fileid = $(".list-group-item").eq(id).find('span').attr("id");
    	App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在删除数据，请稍候...'
		});
    	$.ajax({
			url: '/customermanage' + configMap.dataUrl + "/" + fileid,
			type: 'DELETE',
			success: function (result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result.success) {
					getFileList();
					$("#righttwo").remove();
					Messenger().post("删除成功!");
				}
				else {
					Messenger().post({
						message: result.message,
						type: 'error'
					});
				}
			},
			error: function () {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
    };

    return {
        // 初始化
        init: function (id,status,fjlx) {
            configMap.id = id;
            configMap.status = status;
            configMap.fjlx = fjlx;
            //获取附件
            getFileList();
            setJqueryMap();
            jqueryMap.companyInfoForm.closest(".modal-content").css("width","900px");
            jqueryMap.companyInfoForm.closest(".modal-dialog").css({"cssText":"width:900px !important"});
            jqueryMap.companyInfoForm.closest(".modal-dialog").css("margin-top","100px");
            jqueryMap.companyInfoForm.find('[name="submitImageButton"]').off("click").on("click",function (){
                stopContinueClick('[name="submitImageButton"]',300);
            	savefile();
            });
//            $(".close",jqueryMap.companyInfoForm.closest(".modal-content")).off().on('click',function(){
//            	sessionStorage.setItem("filesize", configMap.filesize);
//            });
        },
        getURL:function (filename,id){
        	var data = {
                id:id
        	};
        	$.ajax({
    			url : '/customermanage' + configMap.fileUrl,
    			type : 'POST',
    			contentType: 'application/json; charset=utf-8',
	            data: JSON.stringify(data),
    			success : function(result) {

    			}
    		});
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        getfile: function (callback){
        	sessionStorage.setItem("filesize", configMap.filesize);
        	callback(true);
        }
    };
}();
//@ sourceURL=edit.js