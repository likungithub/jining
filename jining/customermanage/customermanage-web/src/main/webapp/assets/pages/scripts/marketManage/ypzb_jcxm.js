/**
 *
 */
var yplzjcxm = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/ypgl/getTjcxmJbxx',
        addUrl:'/marketManage/ypzb_jcxm.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        yplzGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="yplzjbxxedit" title="修改样品信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="yplzjbxxdelete" title="删除样品信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        classType: '',
        fwzt: '',
        other: '',
        ypbm:''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#yplz_jcxm' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#yplzjcxmTable');
    };

    var inityplzGrid = function () {
    	
        configMap.yplzGrid = jqueryMap.$manualdata.DataTable({
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
                    data.ypbm = configMap.ypbm;
                    data.jszt = '203';
                    data.zwmcBm = $('[name="zwmcBm"]',jqueryMap.$content).val();
                    data.jcfa = $('[name="jcfa"]',jqueryMap.$content).val();
                   /* data.HtendTime = $('[name="htlrendDate"]',jqueryMap.$content).val();
                    data.htbh = $('[name="htbh"]',jqueryMap.$content).val();
                    data.htlx = $('[name="htlx"]',jqueryMap.$content).val();
                    data.htmc = $('[name="htmc"]',jqueryMap.$content).val();	
                    data.wtdwmc = $('[name="wtdwmc"]',jqueryMap.$content).val();
                    data.ywry = $('[name="ywry"]',jqueryMap.$content).val();
                    data.BgstartTime = $('[name="zwbgstarDate"]',jqueryMap.$content).val();
                    data.BgendTime = $('[name="zwbgendDate"]',jqueryMap.$content).val();*/
                }
            },
            "columns": [
                {
                    "render": function (data) {
                        return '<div class="datagrid-cell-check"><input type="checkbox" name="ck"/></div>';
                    }
                },
                {
                    class:"text-center",
                    "data":"zwmcBm"
                },
                {
                    class:"text-center",
                    "data":"jcyjmc"
                },
                {
                	class:"text-center",
                	"data": "jcx"
                },
                {
                    class:"text-center",
                    "data": "xlz"
                },
                
                {
                    class:"text-center",
                    "data": "xlzmrz"
                },
                {
                    class:"text-center",
                    "data": "jldw"
                },
                {
                    class:"text-center",
                    "data": "jcyj"
                },
                {
                    class:"text-center",
                    "data": "jcfa"
                }],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var editContainer = jqueryMap.$content.find('[name="yplzjbxxedit"]');
                var deleteContainer = jqueryMap.$content.find('[name="yplzjbxxdelete"]');
                
                //修改样品接收信息
                var edityplz = function (){
                	stopContinueClick(this, 300);
                    var el = $(this);
                    var rowIndex = configMap.yplzGrid.cell(el.parent()).index().row;
                    var id = configMap.yplzGrid.row(rowIndex).data().id;
                    var ypbm = configMap.yplzGrid.row(rowIndex).data().ypbm;
                    generateTab(this, configMap.path + configMap.addUrl + '?id=' + id+'&ypbm='+ypbm, "修改样品信息", "qywt_info", 'fa fa-file-text-o iconMr');
                };
                $('[data-toggle="tooltip"]').tooltip();
                if (editContainer.length > 0){
                	editContainer.off('click').on('click', edityplz);
                }

                if(deleteContainer.length > 0){
                	deleteContainer.off('click').on('click', delyplz);
                }
                

                //点击选择所有
               $('.check-all-td').change(function () {
                  selectAll($(this).is(':checked'), $(this).parentsUntil('table').attr("name"));
               });
               var selectAll = function (status, tableId) {
                   $("table[name='yplz-table'] input[type=checkbox]").prop("checked", status);
               };
               
               
             
               var generateTab = function(_target, srcStr, menuName, id,icon) {
                   //标签移除
                   $("#tab-page-nav-" + id).remove();
                   //内容移除
                   $("#tab-page-content-" + id).remove();
                   var _opt;
                   var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
                   if ($a_alarm.length > 0) {
                       _opt = {
                           title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                           id: $a_alarm.data('addtab'),
                           tabMonitor: $('#main-tab'),
                           url: srcStr
                       };
                   } else {
                       _opt = {
                           title: '<i class="'+icon +'"></i>' + menuName,
                           id: id,
                           tabMonitor: $('#main-tab'),
                           url: srcStr
                       };
                   }
                   $(_target).addTabs(_opt);
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
            				configMap.yplzGrid.ajax.reload();
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
                            configMap.yplzGrid.ajax.reload();
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
    var edityplz = function (){
    	stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.yplzGrid.cell(el.parent()).index().row;
        var id = configMap.yplzGrid.row(rowIndex).data().id;
        generateTab(this, configMap.path + configMap.addUrl + '?id=' + id, "创建政府委托", "yplz_info", 'fa fa-file-text-o iconMr');
    };
    
    //删除合同
    var delyplz = function (){
        var el = $(this);
        var rowIndex = configMap.yplzGrid.cell(el.parent()).index().row;
        var id = configMap.yplzGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + "/yplz/delyplz/" + id,
            type: 'POST',
            success: function (result) {
                if (result.success) {
                	configMap.yplzGrid.ajax.reload();
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

    //增加政府委托
    var addyplz = function () {
        stopContinueClick("#addCustomerManage", 300);
        generateTab(this, configMap.path + configMap.addUrl, "创建政府委托", "yplz_info", 'fa fa-file-text-o iconMr');
    };

    var generateTab = function(_target, srcStr, menuName, id,icon) {
        //标签移除
        $("#tab-page-nav-" + id).remove();
        //内容移除
        $("#tab-page-content-" + id).remove();
        var _opt;
        var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
        if ($a_alarm.length > 0) {
            _opt = {
                title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                id: $a_alarm.data('addtab'),
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        } else {
            _opt = {
                title: '<i class="'+icon +'"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    }
    
    return {
        init: function (id,uuid,ypbm) {
            setJqueryMap(uuid);
            configMap.ypbm=ypbm;
            
            var tabid = $('#yplz_jcxm' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, yplzjcxm);
            jqueryMap.$content.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            jqueryMap.$content.find('.endTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            inityplzGrid();
           /* $("#addyplz",jqueryMap.$content).off('click').on('click',function (){
                addyplz();
            });*/

            //查询
            $("#yplzjbxxSearch",jqueryMap.$content).off('click').on('click',function (){
            	configMap.yplzGrid.ajax.reload();
            })
        },
        setPath: function (path) {
            configMap.path = path;
        },
        reload: function () {
            configMap.yplzGrid.ajax.reload();
        }
    };
}();


//@ sourceURL=contractlist.js