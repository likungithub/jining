/**
 *
 */
var ypjsjcxm = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/ypgl/getTjcxmJbxx',
        addUrl:'/marketManage/ypjs_jcxm.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        ypjsGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="ypjsjbxxedit" title="修改样品信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="ypjsjbxxdelete" title="删除样品信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
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
        jqueryMap.$content = $('#ypjs_jcxm' + uuid);
        jqueryMap.$ypForm = $('#add_form', jqueryMap.$content);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#ypjsjcxmTable');
    };

    var initypjsGrid = function () {
    	
        configMap.ypjsGrid = jqueryMap.$manualdata.DataTable({
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
                    data.jszt = '200';
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
                    class:"text-center",
                    "render": function (data) {
                        return '<div class="datagrid-cell-check"><input type="checkbox" name="ck"/></div>';
                    }
                },
                {
                    class:"text-center",
                    "data":"jcfa"
                },
                {
                    class:"text-center",
                    "data":"zwmcBm"
                },
                {
                	class:"text-center",
                	"data": "xl"
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
                    "data": "pdyj"
                },
                {
                    class:"text-center",
                    "data": "jcyj"
                }],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var editContainer = jqueryMap.$content.find('[name="ypjsjbxxedit"]');
                var deleteContainer = jqueryMap.$content.find('[name="ypjsjbxxdelete"]');
                
                //修改样品接收信息
                var editYpjs = function (){
                	stopContinueClick(this, 300);
                    var el = $(this);
                    var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
                    var id = configMap.ypjsGrid.row(rowIndex).data().id;
                    var ypbm = configMap.ypjsGrid.row(rowIndex).data().ypbm;
                    generateTab(this, configMap.path + configMap.addUrl + '?id=' + id+'&ypbm='+ypbm, "修改样品信息", "qywt_info", 'fa fa-file-text-o iconMr');
                };
                $('[data-toggle="tooltip"]').tooltip();
                if (editContainer.length > 0){
                	editContainer.off('click').on('click', editYpjs);
                }

                if(deleteContainer.length > 0){
                	deleteContainer.off('click').on('click', delypjs);
                }
                

                //点击选择所有
               $('.check-all-td').change(function () {
                  selectAll($(this).is(':checked'), $(this).parentsUntil('table').attr("name"));
               });
               var selectAll = function (status, tableId) {
                   $("table[name='ypjs-table'] input[type=checkbox]").prop("checked", status);
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
            				configMap.ypjsGrid.ajax.reload();
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
                            configMap.ypjsGrid.ajax.reload();
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
    var editypjs = function (){
    	stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
        var id = configMap.ypjsGrid.row(rowIndex).data().id;
        generateTab(this, configMap.path + configMap.addUrl + '?id=' + id, "创建政府委托", "ypjs_info", 'fa fa-file-text-o iconMr');
    };
    
    //删除合同
    var delypjs = function (){
        var el = $(this);
        var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
        var id = configMap.ypjsGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + "/ypjs/delypjs/" + id,
            type: 'POST',
            success: function (result) {
                if (result.success) {
                	configMap.ypjsGrid.ajax.reload();
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

    //样品信息初始化
    var initYpxxData = function () {
        $.ajax({
            url: '/customermanage/ypgl/getYpxx?id=' + configMap.id,
            type: 'GET',
            success: function (result) {
                if(result.success) {
                	console.info(result);
                    var data = result.data;
                    console.info(data);
                    $('#contractName', jqueryMap.$ypForm).val(data.wtid + "_" + data.htbm + "_" + + data.ht_type );
                    configMap.wtid = data.wtid;
                    $('#contractType', jqueryMap.$ypForm).val(data.ht_type);
                    $('#contractNo', jqueryMap.$ypForm).val(data.htbm);
                    $('#productClass', jqueryMap.$ypForm).val(data.cpdldm);
                    $('[name="rwly"]', jqueryMap.$ypForm).val(data.rwly);
                    $('[name="rwlb"]', jqueryMap.$ypForm).val(data.rwlb);
                    $('[name="qylx"]', jqueryMap.$ypForm).val(data.qylx);//区域类型
                    $('[name="ycbgrq"]', jqueryMap.$ypForm).val(moment(data.ycbgrq).format('YYYY-MM-DD'));// 应出报告日期
                    $('select[name="jclbdm"]', jqueryMap.$ypForm).val(data.jclbdm); //检测类别
                    $('input[name="ypmc"]', jqueryMap.$ypForm).val(data.ypmc); //样品名称
                    $('select[name="ypxtdm"]', jqueryMap.$ypForm).val(data.ypxtdm); //样品形态
                    $('input[name="ypsl"]', jqueryMap.$ypForm).val(data.ypsl); //样品数量
                    $('input[name="cyjs"]', jqueryMap.$ypForm).val(data.ypsl); //抽样基数/批量
                    $('input[name="bysl"]', jqueryMap.$ypForm).val(data.bysl); //备样数量
                    $('input[name="ypdw"]', jqueryMap.$ypForm).val(data.ypdw); //样品单位
                    $('input[name="ggxh"]', jqueryMap.$ypForm).val(data.ggxh); //规格型号
                    $('input[name="ggxhdw"]', jqueryMap.$ypForm).val(data.ggxhdw); //规格型号单位
                    $('input[name="ypph"]', jqueryMap.$ypForm).val(data.ypph); //样品批号
                    $('input[name="bzq"]', jqueryMap.$ypForm).val(data.bzq); //保质期
                    $('input[name="zxbz"]', jqueryMap.$ypForm).val(data.zxbz); //执行标准/技术文件
                    $('input[name="zldj"]', jqueryMap.$ypForm).val(data.zldj); //质量等级
                    $('input[name="yply"]', jqueryMap.$ypForm).val(data.yply); //样品来源
                    $('select[name="ypsx"]', jqueryMap.$ypForm).val(data.ypsx); //样品属性
                    $('select[name="yplx"]', jqueryMap.$ypForm).val(data.yplx); //样品类型
                    $('input[name="sb"]', jqueryMap.$ypForm).val(data.sb); //商标
                    $('input[name="rqlxdm"]', jqueryMap.$ypForm).val(data.rqlxdm); //日期类型
                    $('input[name="rq"]', jqueryMap.$ypForm).val(moment(data.rq).format('YYYY-MM-DD'));// 日期
                    
                    $('input[name="dj"]', jqueryMap.$ypForm).val(data.dj); //单价
                    $('select[name="if_ck"]', jqueryMap.$ypForm).val(data.if_ck); //是否出口
                    $('select[name="zzlx"]', jqueryMap.$ypForm).val(data.zzlx); //资质类型
                    $('input[name="jhl"]', jqueryMap.$ypForm).val(data.jhl); //进货量（流通环节）
                    $('input[name="ccl"]', jqueryMap.$ypForm).val(data.ccl); //库存量（流通环节）
                    $('input[name="sczmc"]', jqueryMap.$ypForm).val(data.sczmc); //生产者名称
                    $('input[name="scxkzbh"]', jqueryMap.$ypForm).val(data.scxkzbh); //生产许可证编号
                    $('input[name="sfmc"]', jqueryMap.$ypForm).val(data.sfmc); //省份名称
                    $('input[name="csmc"]', jqueryMap.$ypForm).val(data.csmc); //城市名称
                    $('input[name="xjmc"]', jqueryMap.$ypForm).val(data.xjmc); //所属县名称
                    $('input[name="jdmc"]', jqueryMap.$ypForm).val(data.jdmc); //所属街道名称
                    $('input[name="lxr"]', jqueryMap.$ypForm).val(data.lxr); //联系人
                    $('input[name="dh"]', jqueryMap.$ypForm).val(data.dh); //电话
                    $('select[name="ypbctj"]', jqueryMap.$ypForm).val(data.ypbctj); //样品保存条件
                    $('input[name="jsypjzrq"]', jqueryMap.$ypForm).val( moment(data.jsypjzrq).format('YYYY-MM-DD'));// 寄、送样品截止日期
                    $('select[name="ypbcdz"]', jqueryMap.$ypForm).val(data.ypbcdz); //样品保存条件
                    $('input[name="jyf"]', jqueryMap.$ypForm).val(data.jyf); //检验费
                    $('input[name="jsypdz"]', jqueryMap.$ypForm).val(data.jsypdz); //寄送样品地址 
                    $('input[name="fbf"]', jqueryMap.$ypForm).val(data.fbf); //分包费
                    $('input[name="ccwd"]', jqueryMap.$ypForm).val(data.ccwd); //存储温度
                    $('input[name="jcfcry"]', jqueryMap.$ypForm).val(data.jcfcry);//检查封样人员
                    $('input[name="fyzt"]', jqueryMap.$ypForm).val(data.fyzt);//封样状态
                    $('input[name="bz"]', jqueryMap.$ypForm).val(data.bz);//补助
                    $('input[name="syr"]', jqueryMap.$ypForm).val(data.syr); //送样人
                    $('input[name="gyf"]', jqueryMap.$ypForm).val(data.gyf);//购样费
                    $('input[name="gzrq"]', jqueryMap.$ypForm).val(moment(data.gzrq).format('YYYY-MM-DD')); //购置日期
                    $('select[name="ytlx"]', jqueryMap.$ypForm).val(data.ytlx); //业态类型
                    $('input[name="sjcjrq"]', jqueryMap.$ypForm).val( moment(data.sjcjrq).format('YYYY-MM-DD'));// 数据出具日期
                    $('select[name="xkzlx"]', jqueryMap.$ypForm).val(data.xkzlx); //许可证类型
                    $('input[name="xkzh"]', jqueryMap.$ypForm).val(data.xkzh); //许可证
                    $('input[name="syrdz"]', jqueryMap.$ypForm).val(data.syrdz); //送样人地址
                    $('input[name="syryb"]', jqueryMap.$ypForm).val(data.syryb); //送样人邮编
                    $('input[name="syrdh"]', jqueryMap.$ypForm).val(data.syrdh); //送样人电话或传真
                    $('select[name="if_Jj"]', jqueryMap.$ypForm).val(data.if_Jj? "1":"0"); //是否加急
                    $('input[name="ypbm"]', jqueryMap.$ypForm).val(data.ypbm); //送样人电话或传真
                    $('input[name="jydd"]', jqueryMap.$ypForm).val(data.jydd); //接样地点
                /*    $('.dysj', jqueryMap.$ypForm).datepicker('update', moment(data.dysj).format('YYYY-MM-DD'));// 到样时间
                    $('#isSubpackagedSample', jqueryMap.$ypForm).val(data.if_fb? "1":"0"); //是否分包
                    $('input[name="fbxm"]', jqueryMap.$ypForm).val(data.fbxm); //分包项目
                    $('#saveFuSample', jqueryMap.$ypForm).val(data.if_blfy? "1":"0"); //保留副样
                    $('#sampleHandleWay', jqueryMap.$ypForm).val(data.if_fhcl? "1":"0"); //检后样品处理
                    $('input[name="bgfs"]', jqueryMap.$ypForm).val(data.bgfs); //报告份数
                    $('input[name="jcxm"]', jqueryMap.$ypForm).val(data.jcxm); //检测项目
                    $('input[name="jydd"]', jqueryMap.$ypForm).val(data.jydd); //接样地点
                    $('#isUrgent', jqueryMap.$ypForm).val(data.if_jj? "1":"0"); //是否加急
*/                    $('input[name="bzxx"]', jqueryMap.$ypForm).val(data.bzxx);
                } else {
                    Messenger().post({
                        message: "数据加载失败",
                        type: 'warning'
                    });
                }
            }
        });
    }
    
    //保存样品信息
    var saveYpxx = function () {
        
        var url = '/customermanage/ypgl/updateYpjsYpxx/' + configMap.id;
        var type = 'POST';
        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            data: jqueryMap.$ypForm.serialize(),
            success: function (result) {
                if (result.success) {
                    //关闭当前选项卡
                  /*  var  id = 'ypxx_info';
                    var el = $("#tab-page-nav-" + id);
                    var nextSelect = el.closest("li").prev('li:not(.dropdown)');
                    if (nextSelect.length === 0) {
                        nextSelect = el.closest("li").next('li:not(.dropdown)')
                    }
                    if (nextSelect.length === 0) {
                        nextSelect = el.closest("ul.close-tab-nav")
                            .children('li:not(.dropdown)')
                            .last();
                    }
                    //标签移除
                    el.remove();
                    //内容移除
                    $("#tab-page-content-" + id).remove();

                    $('li[role = "presentation"].active').removeClass('active');
                    $('div[role = "tabpanel"].active').removeClass('active');
                    if (nextSelect.length > 0) {
                        $(nextSelect).find('a').tab('show');
                    };*/
                	 Messenger().post({
                         message: '保存成功!',
                         type: 'info'
                     });
                	configMap.ypjsGrid.ajax.reload();
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'danger'
                    });
                }
            },
            error: function (result) {
                $('#saveKhxx').html("保存");
                Messenger().post({
                    message: '保存失败！',
                    type: 'danger'
                });
            }
        });
    };
    
    //增加政府委托
    var addypjs = function () {
        stopContinueClick("#addCustomerManage", 300);
        generateTab(this, configMap.path + configMap.addUrl, "创建政府委托", "ypjs_info", 'fa fa-file-text-o iconMr');
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
            configMap.id=id;
            
            var tabid = $('#ypjs_jcxm' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, ypjsjcxm);
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

            initypjsGrid();
            //样品信息初始化
            initYpxxData();
            
           /* $("#addypjs",jqueryMap.$content).off('click').on('click',function (){
                addypjs();
            });*/
            
            //保持
            $("#savejcxm",jqueryMap.$content).off('click').on('click',function (){
            	saveYpxx();
            })
            
            //查询
            $("#ypjsjbxxSearch",jqueryMap.$content).off('click').on('click',function (){
            	configMap.ypjsGrid.ajax.reload();
            })
        },
        setPath: function (path) {
            configMap.path = path;
        },
        reload: function () {
            configMap.ypjsGrid.ajax.reload();
        }
    };
}();


//@ sourceURL=contractlist.js