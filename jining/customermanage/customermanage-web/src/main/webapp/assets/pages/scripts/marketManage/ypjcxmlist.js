/**
 *
 */
var jcxmlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/jcxm/getJcxmList',
        addUrl:'/marketManage/jcxm_jbxx.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        jcxmGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改企业委托信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除企业委托信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        fwzt: '',
        other: '',
        uuid: '',
        ypid: ''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#jcxm' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#jcxmlist_data');
    };

    var jcxmjson = [];

    var initJcxmGrid = function () {
        configMap.jcxmGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypid = configMap.ypid;
                    data.jcxm = $('input[name="jcxmmc"]',jqueryMap.$content).val();
                    data.dl = $('#cpdl' + configMap.uuid, jqueryMap.$content).val();
                    data.yl = $('#yl' + configMap.uuid, jqueryMap.$content).val();
                    data.cyl = $('#cyl' + configMap.uuid, jqueryMap.$content).val();
                    data.xl = $('#xl' + configMap.uuid, jqueryMap.$content).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox" id="jcxm_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "render": function (data, type, row) {
                        return configMap.editBtn_html + configMap.deleBtn_html;
                    }
                },
                {
                	class:"text-center",
                	"data": "zwmcBm"
                },
                {
                    "data":"cpdlmc",
                	class:"text-center"
                },
                {
                    class:"text-center",
                    "data": "yl"
                },
                {
                    class:"text-center",
                    "data": "cyl"
                },
                {
                    class:"text-center",
                    "data": "xl"
                },
                {
                    class:"text-center",
                    "data": "jcfa"
                }

            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var editContainer = jqueryMap.$content.find('[name="contractedit"]');
                var deleteContainer = jqueryMap.$content.find('[name="contractdelete"]');

                $('[data-toggle="tooltip"]').tooltip();
                if (editContainer.length > 0){
                	editContainer.off('click').on('click', editJcxm);
                }

                if(deleteContainer.length > 0){
                	deleteContainer.off('click').on('click', delJcxm);
                }
            }
        });
    };


    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if(type === "edit"){
        	dialogButtons.success = {
        		label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            	className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            	callback: function () {
            		contractcontinue.saveContract(function (result){
            			if(result){
            				Messenger().post("操作成功，请等待审核!");
            				jqueryMap.$contractauditDialog.modal('hide');
            				configMap.jcxmGrid.ajax.reload();
            			}
            		});
            		return false;
            	}
        	};
        }
        if(type === "change"){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractChange.saveChange(function (result){
                        if(result){
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.jcxmGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    
    //修改委托信息
    var editJcxm = function (){
    	stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.jcxmGrid.cell(el.parent()).index().row;
        var id = configMap.jcxmGrid.row(rowIndex).data().id;
        generateTab(this, configMap.path + configMap.addUrl + '?id=' + id, "创建企业委托", "jcxm_info", 'fa fa-file-text-o iconMr');
    };
    
    //删除合同
    var delJcxm = function (){
        var el = $(this);
        var rowIndex = configMap.jcxmGrid.cell(el.parent()).index().row;
        var id = configMap.jcxmGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + "/zfwt/delJcxm/" + id,
            type: 'POST',
            success: function (result) {
                if (result.success) {
                	configMap.jcxmGrid.ajax.reload();
                	Messenger().post({
						message: "删除成功",
						type: 'info',
						id:"ordermessenger"
					});
                } else {
                    Messenger().post({
						message: result.message,
						type: 'error',
						id:"ordermessenger"
					});
                }
            },
            error: function () {
            	Messenger().post({
					message: "删除失败！",
					type: 'error',
					id:"ordermessenger"
				});
            }
        });
    };

    //增加企业委托
    var addQYWT = function () {
        stopContinueClick("#addCustomerManage", 300);
        generateTab(this, configMap.path + configMap.addUrl, "创建企业委托", "jcxm_info", 'fa fa-file-text-o iconMr');
    };

    //获取产品大类名称
    //001产品大类 002亚类 003次亚类 004细类
    var getCpmc = function (type) {
        $.get(configMap.path + '/jcxm/getCpmc/' + type , function (res) {
            if (res.success) {
                var data = res.data;
                if (type == '001') {
                    $('#cpdl' + configMap.uuid, jqueryMap.$content).empty();
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] == null) {
                            continue;
                        } else {
                            $('<option value="' + data[i].CPDLMC + '">' + data[i].CPDLMC + '</option>').appendTo($('#cpdl' + configMap.uuid, jqueryMap.$content));
                        }
                    }
                }
                if (type == '002') {
                    $('#yl' + configMap.uuid, jqueryMap.$content).empty();
                    for (var i = 0; i < data.length; i++) {
                        $('<option value="' + data[i].YL + '">' + data[i].YL + '</option>').appendTo($('#yl' + configMap.uuid, jqueryMap.$content));
                    }
                }
                if (type == '003') {
                    $('#cyl' + configMap.uuid, jqueryMap.$content).empty();
                    for (var i = 0; i < data.length; i++) {
                        $('<option value="' + data[i].CYL + '">' + data[i].CYL + '</option>').appendTo($('#cyl' + configMap.uuid, jqueryMap.$content));
                    }
                }
                if (type == '004') {
                    $('#xl' + configMap.uuid, jqueryMap.$content).empty();
                    for (var i = 0; i < data.length; i++) {
                        $('<option value="' + data[i].XL + '">' + data[i].XL + '</option>').appendTo($('#xl' + configMap.uuid, jqueryMap.$content));
                    }
                }
            }
        });
    };

    var selectAll = function (status) {
        $('[type="checkbox"]', jqueryMap.$manualdata).prop("checked", status);
    };
    
    var saveYpJcxm = function () {
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$manualdata).not(jqueryMap.$content.find('[name="selectjcxmlist"]'));
        var temp = null;
        jcxmjson = [];
        $(inputjson).each(function () {
            temp = {jcxmId: $(this).attr('id').substring(5)};
            jcxmjson.push(temp);
        });
        var data = {
            jcxmId:jcxmjson,
            ypid:configMap.ypid
        };
        $.ajax({
            url:configMap.path + '/jcxm/saveYpypJcxm',
            type:'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data:JSON.stringify(data),
            success:function (res) {
                //先关闭当前页，再刷新之前页面的dataTable
                //关闭当前选项卡
                // var  id = 'jcxmList_info';
                // var el = $("#tab-page-nav-" + id);
                // var nextSelect = el.closest("li").prev('li:not(.dropdown)');
                // if (nextSelect.length === 0) {
                //     nextSelect = el.closest("li").next('li:not(.dropdown)')
                // }
                // if (nextSelect.length === 0) {
                //     nextSelect = el.closest("ul.close-tab-nav")
                //         .children('li:not(.dropdown)')
                //         .last();
                // }
                // //标签移除
                // el.remove();
                // //内容移除
                // $("#tab-page-content-" + id).remove();
                //
                // $('li[role = "presentation"].active').removeClass('active');
                // $('div[role = "tabpanel"].active').removeClass('active');
                // if (nextSelect.length > 0) {
                //     $(nextSelect).find('a').tab('show');
                // };
                // Addyp.initDataTable();
            }
        });
    };

    var jcxmSearch = function () {
        configMap.jcxmGrid.ajax.reload();
    }
    
    return {
        init: function (uuid,ypid) {
            configMap.uuid = uuid;
            configMap.ypid = ypid;
            setJqueryMap(uuid);
            var tabid = $('#jcxm' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, jcxmlist);

            initJcxmGrid();
            $("#addQYWT",jqueryMap.$content).off('click').on('click',function (){
                addQYWT();
            });
            
            //查询
            $("#jcxmSearch",jqueryMap.$content).off('click').on('click',function (){
                jcxmSearch();
            });

            //重置
            $("#reset",jqueryMap.$content).off('click').on('click',function (){
                $('input[name="jcxmmc"]',jqueryMap.$content).val('');
                $('#cpdl' + configMap.uuid, jqueryMap.$content).val('');
                $('#yl' + configMap.uuid, jqueryMap.$content).val('');
                $('#cyl' + configMap.uuid, jqueryMap.$content).val('');
                $('#xl' + configMap.uuid, jqueryMap.$content).val('');
                jcxmSearch();
            });
            
            $('input[name="selectjcxmlist"]',jqueryMap.$content).change(function () {
                var el = $(this);
                selectAll(el.is(':checked'));
            });


            //获取产品大类名称
            getCpmc("001");

            //获取亚类名称
            getCpmc("002");

            //获取次亚类名称
            getCpmc("003");

            //获取细类名称
            getCpmc("004");
            
            $('#saveYpJcxm',jqueryMap.$content).off('click').on('click',function (){
                saveYpJcxm();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        },
        reload: function () {
            jcxmSearch();
        }
    };
}();
//@ sourceURL=contractlist.js
	
	