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
var contractView = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/customermanage/contract/contract',
        updateUrl: '/customermanage/contract/contractupdate',
        projectUrl:'/customermanage/contract/project',
        paymentUrl:'/customermanage/contract/payment',
        imgUrl:'/customermanage/contract/addfile.jsp',
        id: '',
        contractGrid:null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑合同"><i class="icon iconfont icon-bianji"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除合同"><i class="icon iconfont icon-shanchu"></i></a>',
        jsonMap:null
    };
    var jsonMap = {payService:[
    ]};
    // 全局Dom
    var jqueryMap = {
    		$blockTarget: null,
			$contractForm: null,
			$setimg:null
    };

    var setJqueryMap = function () {
    	jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#contractForm');
    };

	//获取合同信息
	var editParams = function (){
		$.ajax({
			url: configMap.updateUrl + '/' + configMap.id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				$('[name="yhmc"]').val(data.contract.yhmc);
				$('[name="qyrq"]').val(moment(data.contract.qyrq).format('YYYY-MM-DD'));
				$('[name="createDate"]').val(moment(data.contract.fwqxq).format('YYYY-MM'));
				$('[name="startDate"]').val(moment(data.contract.fwqxz).format('YYYY-MM'));
				$('[name="tbsx"]').val(data.contract.tbsx);
				$('[name="shyj"]').val(data.contract.shyj);
				$('[name="lrr"]').val(data.contract.lrrmc);
				$('[name="shr"]').val(data.contract.shrmc);
				$('[name="sfxm"]').val(data.contract.zfy);
				$(".viewfilelist").html("附件数量（"+data.size+"）");
				if(data.contract.sfxm_mc!=null&&data.contract.sfxm_mc!=""){
					$("#selectBtn").html(data.contract.sfxm_mc+'<span class="caret"></span>');
				} else {
					$("#selectBtn").html(data.pay[0].sfxm_mc+'<span class="caret"></span>');
				}
				$("#typeBtn").html(data.contract.fkfs_mc+'<span class="caret"></span>');
				if(data.contract.fkxh_mc!=null&&data.contract.fkxh_mc!=""){
					$("#fkxhBtn").html(data.contract.fkxh_mc+'<span class="caret"></span>');
				} else {
					$("#fkxhBtn").html('后付<span class="caret"></span>');
				}
				if(data.contract.shrq!=null&&data.contract.shrq!=""){
					$('[name="shDate"]').val(moment(data.contract.shrq).format('YYYY-MM-DD HH:mm'));
				} else {
					$('[name="shDate"]').val();
				}
				jqueryMap.$contractForm.find('.viewfilelist').off('click').on('click',function (){
	            	var dialogButtons = {
	            			cancel: {
	            				label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
	                            className: 'btn btn btn-default borderRadius4 color666'
	                        }
	            	};
	                $.get(configMap.imgUrl+"?id="+configMap.id+"&htbm="+data.contract.htbm+"&status=show", function (html) {
	                    jqueryMap.$setimg = bootbox.dialog({
	                        title: '查看附件',
	                        message: html,
	                        buttons: dialogButtons
	                    });
	                });
	            });
			},
			error: function () {
				bootbox.alert('获取参数信息失败！');
			}
		});
    }

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            //获取已有的合同列表
            editParams();
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
    };
}();
//@ sourceURL=edit.js