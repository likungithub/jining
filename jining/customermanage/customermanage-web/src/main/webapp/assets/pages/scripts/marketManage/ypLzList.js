/**
 *
 */
var yplzlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/ypgl/getYpLzAll',
        addUrl:'/marketManage/yplz_jbxx.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        yplzGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="yplzedit" title="修改样品接收信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="yplzdelete" title="删除政府委托信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        returnBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="yplzreturn" title="样品退回"><i class="icon iconfont icon-daochu  iconFontColor-10a0f7 iconFontSize"></i></a>',
        classType: '',
        fwzt: '',
        other: '',
        dqjszt:''
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
        jqueryMap.$content = $('#yplz' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data');
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
                    data.HtstartTime = $('[name="htlrstarDate"]',jqueryMap.$content).val();
                    data.jszt = '201';
                    data.HtendTime = $('[name="htlrendDate"]',jqueryMap.$content).val();
                    data.htbh = $('[name="htbh"]',jqueryMap.$content).val();
                    data.htlx = $('[name="htlx"]',jqueryMap.$content).val();
                    data.htmc = $('[name="htmc"]',jqueryMap.$content).val();	
                    data.wtdwmc = $('[name="wtdwmc"]',jqueryMap.$content).val();
                    data.ywry = $('[name="ywry"]',jqueryMap.$content).val();
                    data.BgstartTime = $('[name="zwbgstarDate"]',jqueryMap.$content).val();
                    data.BgendTime = $('[name="zwbgendDate"]',jqueryMap.$content).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data) {
                        return '<div class="datagrid-cell-check"><input type="checkbox" name="ck"/></div>';
                    }
                },        
                {
                    class:"text-center",
                    "data": "ypbm",
                    "render": function (data) {
                        return configMap.editBtn_html+configMap.returnBtn_html;
                    }
                },
                {
                    class:"text-center",
                    "data": "htbm"
                },
               /* {
                	class:"text-center",
              	  "render": function (data) {
                        return '样品待发放';
                    }
                },*/
              /*  {
                	class:"text-center",
                	"data": "yslbh"
                },*/
                {
                    class:"text-center",
                    "data": "dwmc"
                },
                {
                    class:"text-center",
                    "data": "dwmc"
                },
               /* {
                    class:"text-center",
                    "data": "htlxsx"
                },*/
           /*     {
                    class:"text-center",
                    "data": "khly"
                },*/
               /* {
                    class:"text-center",
                    "render": function (data) {
                        return '检测类型XXXX';
                    }
                },
                {
                    class:"text-center",
                    "data": "lxrmc"
                },
                {
                    class:"text-center",
                    "data": "bgdh"
                },
                {
                    class:"text-center",
                    "data": "sjhm"
                },
                {
                	class:"text-center",
                	"data": "email"
                },
                {
                	class:"text-center",
                	"data": "cz"
                },
                {
                    class:"text-center",
                    "data": "fwlxdm"
                },
                {
                    class:"text-center",
                    "data": "yxrq"
                },
                {
                    class:"text-center",
                    "data": "zxqx"
                },
                {
                    class:"text-center",
                    "data": "zwbgsj"
                },*/
                {
                    class:"text-center",
                    "data": "sfmc"
                },
                {
                    class:"text-center",
                    "data": "csmc"
                },
                {
                    class:"text-center",
                    "data": "xjmc"
                },
                {
                    class:"text-center",
                    "data": "jdmc"
                },
               /* {
                	class:"text-center",
                	"data": "cykssj"
                },
                {
                	class:"text-center",
                	"data": "cyjssj"
                },
                {
                    class:"text-center",
                    "data": "zzlxdm"
                },
                {
                    class:"text-center",
                    "render": function (data) {
                        return "ifPd";
                    }
                },
                {
                    class:"text-center",
                    "data": "pdyj"
                },
                {
                    class:"text-center",
                    "data": "bglbdm"
                },
                {
                    class:"text-center",
                    "data": "ifTxscdw"
                },
                {
                    class:"text-center",
                    "data": "zddwmc"
                },
                {
                    class:"text-center",
                    "data": "zddwdz"
                },
                {
                    class:"text-center",
                    "data": "ifPicture"
                },
                {
                	class:"text-center",
                	"data": "qtyq"
                },
                {
                	class:"text-center",
                	"data": "qbgdm"
                },
                {
                    class:"text-center",
                    "data": "qbgdw"
                },
                {
                    class:"text-center",
                    "data": "sjr"
                },
                {
                    class:"text-center",
                    "data": "qbgdz"
                },
                {
                    class:"text-center",
                    "data": "qbgyb"
                },
                {
                    class:"text-center",
                    "data": "ywyxm"
                },
                {
                    class:"text-center",
                    "data": "qdrq"
                },
                {
                    class:"text-center",
                    "data": "fkdw"
                },
                {
                    class:"text-center",
                    "data": "fplxdm"
                },
                {
                    class:"text-center",
                    "data": "jjfy"
                },
                {
                    class:"text-center",
                    "data": "jcfy"
                },
                {
                	class:"text-center",
                	"data": "myfklxdm"
                },
                {
                	class:"text-center",
                	"data": "myf"
                },
                {
                    class:"text-center",
                    "data": "htje"
                },
                {
                    class:"text-center",
                    "data": "fkfsdm"
                },
                {
                    class:"text-center",
                    "data": "zwfkrq"
                },
                {
                    class:"text-center",
                    "data": "ypbcdm"
                },*/
                {
                    class:"text-center",
                    "data": "if_cy",
                    "render":function (data,type,row) {
                        if(data=="0"){
                            data="否";
                        }
                        if(data=="1"){
                            data="是";
                        }
                        if(data==null){
                            data="";
                        }
                        return  data;
                    }
                },
                {
                    class:"text-center",
                    "data": "bzxx"
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
                var editContainer = jqueryMap.$content.find('[name="yplzedit"]');
                var deleteContainer = jqueryMap.$content.find('[name="yplzdelete"]');
                var returnContainer=jqueryMap.$content.find('[name="yplzreturn"]');//退回
                //修改样品接收信息
                var edityplz = function (){
                	stopContinueClick(this, 300);
                    var el = $(this);
                    var rowIndex = configMap.yplzGrid.cell(el.parent()).index().row;
                    var id = configMap.yplzGrid.row(rowIndex).data().id;
                    
                    var wtid = configMap.yplzGrid.row(rowIndex).data().wtid;
                    generateTab(this, configMap.path + configMap.addUrl + '?id=' + id+'&wtid='+wtid, "编辑委托信息", "qywt_info", 'fa fa-file-text-o iconMr');
                };
                $('[data-toggle="tooltip"]').tooltip();
                if (editContainer.length > 0){
                	editContainer.off('click').on('click', edityplz);
                }

                if(deleteContainer.length > 0){
                	deleteContainer.off('click').on('click', delyplz);
                }
                if(returnContainer.length>0){
                    returnContainer.off('click').on('click',reBtn);
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

var reBtn=function () {
    var el = $(this);
    var rowIndex = configMap.yplzGrid.cell(el.parent()).index().row;
    var ypbm = configMap.yplzGrid.row(rowIndex).data().ypbm;
   bootbox.dialog({
        title: '提示',
        message: '是否要退回？',
        buttons: {
            success: {
                label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                className: "btn btn-danger borderRadius4",
                callback: function () {
                    $.ajax({
                        data: {"ypbm": ypbm},
                        url: configMap.path+"/ypgl/returnYpLz",
                        type: 'POST',
                        success: function () {
                            App.unblockUI(jqueryMap.$blockTarget);
                            configMap.yplzGrid.ajax.reload();
                            Messenger().post("退回成功!");
                        },
                        error: function () {
                            configMap.yplzGrid.ajax.reload();
                            Messenger().post("退回失败!");
                        }
                    });
                }
            },
            cancel: {
                label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                className: 'btn btn-default borderRadius4'
            }


        }
    });
}
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
    
   var openModal1 = function (title, url, type) {
    	
        var dialogButtons = {};
        if (type === 'edit2') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // $('#addZXR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    var strArr=[],strArr1=[],strArr2=[];
                    $('#alreadyPer li','#allotStaffList_m').each(function(){
                        strArr1.push($(this).attr('zydm'));
                    });
                    
                    
                    
                    console.log(strArr1);
                    var str2 = strArr1.join(',');
                    console.log(str2);

                    var data = {};
                    data.zydm=str2;
                    data.jszt='202';
                    data.dqjszt='201';
                    data.lx='2';
                    //获取选中的ID


                    jqueryMap.$content.find('[name=ck]:checked').each(function () {
                    	
                        var el = $(this);
                        var rowIndex = configMap.yplzGrid.cell(el.parent().parent()).index().row;
                        var id = configMap.yplzGrid.row(rowIndex).data().wtid;
                        strArr.push(id);
                    });
                    
                    var str1 = strArr.join(',');
                    data.id=str1;
                    $.ajax({
                        data:data,
                        url: configMap.path + '/ypgl/saveZxry',
                        type: 'POST',
                        success: function(result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (result.success) {
                                configMap.yplzGrid.ajax.reload();
                                Messenger().post("分配成功!");
                            } else {
                                Messenger().post({
                                    message:result.message,
                                    type: 'error'
                                });
                            }
                        },
                        error: function() {
                            App.unblockUI(jqueryMap.$blockTarget);
                        }
                    });

                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'allotTask_mdw',
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
        var wtid = configMap.yplzGrid.row(rowIndex).data().wtid;
        $.ajax({
           // url: configMap.path + "/yplz/delyplz/" + id,
        	   url: configMap.path + "/ypgl/delWtxx/"+wtid,
            type: 'POST',
            success: function (result) {
                if (result) {
                	configMap.yplzGrid.ajax.reload();
                	Messenger().post({
						message: "删除成功",
						type: 'info',
						id:"ordermessenger"
					});
                } else {
                    Messenger().post({
                    	message: "删除失败",
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
   /* var addyplz = function () {
        stopContinueClick("#addCustomerManage", 300);
        generateTab(this, configMap.path + configMap.addUrl, "创建政府委托", "yplz_info", 'fa fa-file-text-o iconMr');
    };*/

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
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid = $('#yplz' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, yplzlist);
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
            /*$("#addyplz",jqueryMap.$content).off('click').on('click',function (){
                addyplz();
            });*/
            $("#reset").click(function () {//重置
                $("input").val("");
            });
            //查询
            $("#yplzSearch",jqueryMap.$content).off('click').on('click',function (){
            	configMap.yplzGrid.ajax.reload();
            })
            //选择人员
            $($('#btn_ryxz'+uuid)).off('click').on('click',function(){
		        if($("input[type='checkbox']:checked",jqueryMap.$content).length == 0 ){
		        	//console.info($("input[type='checkbox']:checked",jqueryMap.$content).length);
		        	Messenger().post("请选择人员!");
		        	return;
		        }
                //选择人员
            	openModal1('样品流转-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any','edit2');
              });
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