/**
 *
 */
var contractlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/contract/mycontract',
        adpotUrl: '/contractaudit/contractauditadpot',
        treeUrl: '/organization/organization/orgAndUserAuth',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        statusUrl: '/contractaudit/status',
        contractauditGrid: null,
        viewPageUrl: '/contractcontinue/continue.jsp',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractview" title="查看合同信息"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改合同信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除合同信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        historyBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-toggle="tooltip" data-placement="bottom"  name="historyaudit"  title="历史审批记录"><i class="icon iconfont icon-lishirenwu iconFontColor-10a0f7 iconFontSize"></i></a>',
        changeBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-toggle="tooltip" data-placement="bottom"  name="changeContract"  title="变更合同"><i class="icon iconfont icon-hetongbiangeng- iconFontColor-10a0f7 iconFontSize"></i></a>',
        classType: '',
        currentSelectedNode: null,
        fwzt: '',
        other: '',
        statusredis: null,
        $days:30,
        ifSearch:'0'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $htTree:null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#mycontractlist_id_div_' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#mycontractlist_data');
        jqueryMap.$htTree = $('#ht_tree', jqueryMap.$content);
    };

    var initContractauditGrid = function () {
        configMap.contractauditGrid = jqueryMap.$manualdata.DataTable({
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
                    data.startD = $('[name="starDate"]',jqueryMap.$content).val();
                    data.endD = $('[name="endDate"]',jqueryMap.$content).val();
                    data.status = $('[name="txtorgName"]',jqueryMap.$content).val();
                    var text = $('[name="khmc"]',jqueryMap.$content).val();
                    if (text == null || text == '' || text == 'undefined') {
                        configMap.ifSearch = '0';
                    }
                    data.khmc = text;
                    data.classType = configMap.classType;
                    data.other = configMap.other;
                    data.fwzt = configMap.fwzt;
                    data.ifSearch = configMap.ifSearch;
                    configMap.ifSearch = '0';
                }
            },
            "columns": [
                {
                	class: "text-left",
                    "data": "yhmc",
                    "render": function (data){
                    	return '<label data-toggle="tooltip" data-placement="bottom" title="'+data+'">'+data+'</label>'
                    }
                },
                 
                {
                	class:"text-center",
                	"data": "htbm"
                },
                {
                	class:"text-center",
                    "data": "qyrq",
                    "render": function (data) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {
                	class:"text-center",
                    "data": "fwqxq",
                    "render": function (data, type, row) {
                        return '<label data-toggle="tooltip" data-placement="bottom" title="' +
                            moment(data).format('YYYY.MM') + '-' + moment(row.fwqxz).format('YYYY.MM') + '">' +
                            moment(data).format('YYYY.MM') + '-' + moment(row.fwqxz).format('YYYY.MM') + '</label>';
                    }
                },
                {
                	class:"text-center",
                	"data": "sfxm_mc"
                },
                // {
                // 	class:"text-center",
                // 	"data": "fkfs_mc",
                // 	"render":function(data, type, row){
                // 		return data + '/' + row.fkxh_mc;
                // 	}
                // },
                {
                    className:'text-right',
                    "data": "hjje",
                    "render":function (data){
                        return moneySplitByComma(data.toFixed(2));
                    }
                },
                // {
                // 	className:'text-right',
                //     "data": "zfy",
                //     "render": function (data) {
                //         return moneySplitByComma(data.toFixed(2));
                //     }
                // },
				{
					class:"text-center",
					"data": "lrrmc"
				},
				{
					class:"text-center",
					"data": "shzt_dm",
					"render":function (data, type, row){
					    var zt = '';
						if(data === "000"){
                            zt = "未审核";
						} else if(data === "001"){
                            zt = "同意";
						} else {
                            zt = "不同意";
						}
						if(row.scbz === 1){
						    zt = "<label style='color:red'>已删除</label>";
                        }
                        return zt;
					}
				},
                {
					class:"text-center",
                    "render": function (data, type, row) {
                    	var statusHtml = '';
                    	statusHtml += configMap.viewBtn_html;
                    	if(row.shzt_dm !== "001"){
                    		//修改按钮
                    		statusHtml += configMap.editBtn_html;
                    	}
                        statusHtml += configMap.historyBtn_html;
                        if(row.shzt_dm === '001'){
                    	    if(row.bgz === 0){
                                statusHtml += configMap.changeBtn_html;
                            }
                        }
                        //删除按钮
                        if ($('#htDel').length > 0) {
                            statusHtml += configMap.deleBtn_html;
                        }

                        if(row.scbz === 1){
                            statusHtml = configMap.viewBtn_html + configMap.historyBtn_html;
                        }
                        return statusHtml;
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
            "fnFooterCallback": function(row, data, start, end, display) {//总计
                var api = this.api(), data;
                // Remove the formatting to get integer data for summation .toString().match(/^\d+(?:\.\d{0,2})?/)
                var intVal = function ( i ) {
                    return Number(Number(i).toFixed(2))
                    // return typeof i === 'string' ?
                    //     i.replace(/^\d+(?:\.\d{0,2})?/, '')*1 :
                    //     typeof i === 'number' ?
                    //         i : 0;
                };
                function number(data){
                    if(data!=null){
                        return data.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
                    }else{
                        return ;
                    }
                }
                var total = api
                    .column( 5 )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
                $( api.column( 5 ).footer() ).html(
                    number(total)
                );//应收金额
            },
            "drawCallback": function () { // 数据加载完成后执行				
                var viewContainer = jqueryMap.$content.find('[name="contractview"]');// $('[data-type="view"]');
                var editContainer = jqueryMap.$content.find('[name="contractedit"]');
                var deleteContainer = jqueryMap.$content.find('[name="contractdelete"]');
                var historyContainer = $('[name="historyaudit"]',jqueryMap.$content);                              //历史审批记录
                var changeContainer = jqueryMap.$content.find('[name="changeContract"]');

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewContract);
                }

                $('[data-toggle="tooltip"]').tooltip();
                if (editContainer.length > 0){
                	editContainer.off('click').on('click', editContract);
                }
                //变更合同
                if(changeContainer.length>0){
                    changeContainer.off('click').on('click', changeContract);
                }


                if(deleteContainer.length > 0){
                	deleteContainer.off('click').on('click', deletecontract);
                }
                if(historyContainer.length>0){
                    historyContainer.off('click').on('click',function(){
                        var el = $(this);
                        var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
                        var id = configMap.contractauditGrid.row(rowIndex).data().id;
                        var dialogButtons = {
                        };
                        dialogButtons.cancel = {
                            label: '<i class="fa fa-times"></i>关&nbsp;闭',
                            className: "btn btn btn-default borderRadius4"
                        };
                        $.get('customermanage/contract/historyAuditList.jsp?id='+id+'&type=001', function (html) {
                            jqueryMap.$setimg = bootbox.dialog({
                                title: '历史审批记录',
                                message: html,
                                buttons: dialogButtons
                            });
                        });
                    });
                }
            }
        });
    };

    var deletecontract = function (){
        var titlehtml;
        var flag = '';
        var shzt = '';
        var yf = '';
        var el = this;
        var rowIndex = configMap.contractauditGrid.cell($(el).parent()).index().row;
        var htbm = configMap.contractauditGrid.row(rowIndex).data().htbm;
        var shztdm = configMap.contractauditGrid.row(rowIndex).data().shzt_dm;
        var strone = '';
        var strtwo = '';
        $.get(configMap.path + '/charge/chargeInfo/' + htbm,function(datas){
            if(shztdm==='000'){
                shzt = '未审核';
            } else if(shztdm === '001'){
                shzt = '同意';
            } else {
                shzt = '不同意';
            }
            titlehtml = '尊敬的用户您好，您确定要删除当前合同吗？删除后合同及台账信息将不可再恢复，请谨慎操作。<p>合同状态：' + shzt + '</p>';
            for(var i=0;i<datas.length;i++){
                if(datas[i].sfzt === '001'){
                    strone = '<p>到账状态：';
                    strtwo = '已收费</p>';
                    yf += flag + datas[i].sfnf + '年' + datas[i].sfyf + '月';
                    flag = '、';
                }
            }
            titlehtml += strone + yf + strtwo;
            bootbox.confirm({
                title: "提醒",
                message: titlehtml,
                buttons: {
                    confirm: {
                        label: '<i class="fa fa-times"></i> 否',
                        className: "btn btn-default borderRadius4 "
                    },
                    cancel: {
                        label: '<i class="fa fa-check"></i> 是',
                        className: "btn btnBlue borderRadius4 colorfff"
                    }
                },
                callback: function (result) {
                    if (!result){                                                                                           //确定
                        delContract(el)
                    }
                }
            });
        });
// class='fontcolor_999'
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
            				configMap.contractauditGrid.ajax.reload();
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
                            configMap.contractauditGrid.ajax.reload();
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

    //变更合同
    function changeContract(){
        var el = $(this);
        var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
        var htbm = configMap.contractauditGrid.row(rowIndex).data().htbm;
        openModal("变更合同信息", "/customermanage/contract/changeContract.jsp?htbm=" + encodeURI(htbm) + "&type=submit", 'change');
    }


    //查看合同信息
    var viewContract = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
        var id = configMap.contractauditGrid.row(rowIndex).data().htbm;
            openModal("查看合同信息", "/customermanage/contract/view.jsp?id=" + encodeURI(id), 'view');
    };
    
    //修改合同信息
    var editContract = function (){
    	stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
        var id = configMap.contractauditGrid.row(rowIndex).data().htbm;
        openModal("修改合同信息——"+id, "/customermanage/contractcontinue/continue.jsp?id=" + encodeURI(id) + "&type=edit", 'edit');
    };
    
    //删除合同
    var delContract = function (e){
    	var rowIndex = configMap.contractauditGrid.cell($(e).parent()).index().row;
        var id = configMap.contractauditGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + "/contract/contract/" + id,
            type: 'DELETE',
            success: function (result) {
                if (result.success) {
                	configMap.contractauditGrid.ajax.reload();
                	Messenger().post({
						message: "删除成功",
						type: 'info',
						id:"ordermessenger"
					});
                    upDateDSHNumber();
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

    var initOrganization = function () {
        var jstree = jqueryMap.$htTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.treeUrl
                },
                "state": {
                    "opened": true  //展示第一个层级下面的node
                    //该根节点不可点击
                }
            },
            "types": {
                "default": {
                    "icon": true
                }

            },

            'plugins': ["types", "expand", "search"],
            "expand": {
                level: 5
            }
        }).on("load_node.jstree", function (e, d) {
            $('#ht_tree').on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            getTreeNum();
            $("#ht_tree").bind("select_node.jstree", function (e, data) {

                if (data.node.id == 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        $('#ht_tree').jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });


        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#ht_tree li").length; i++) {
                var $temp = $("#ht_tree li").eq(i).attr("userimg");
                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                } else {
                    localStorage.setItem("step",i);
                }
            }
            $(".jstree-children li").each(function () {
                if($(this).attr("userImg")==0){
                    $(this).find("a").eq(0).find("i").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
                }

            })
        }

        jqueryMap.$htTree.on('select_node.jstree', function (e, data) {
            configMap.currentSelectedNode = data.node;
            if (data.node.parent === '#') { //点击的是所有客户
                configMap.classType = 1;
                configMap.fwzt = 1; //正在服务的
                if (data.node.id === 'stopCustomer') {//停止服务的
                    configMap.fwzt = 0;
                }
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出已经停止服务的客户列表信息
                configMap.contractauditGrid.clear().draw();
                configMap.contractauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            } else if (data.node.li_attr.BMBZ === "1") { //部门标志为true，代表为部门
                configMap.fwzt = 1; //正在服务的
                configMap.classType = 2; //代表部门
                configMap.other = data.node.li_attr.bmdm; //部门代码
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出该部门的客户列表信息
                configMap.contractauditGrid.clear().draw();
                configMap.contractauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            } else { //代表个人
                configMap.fwzt = 1; //正在服务的
                configMap.classType = 3;
                configMap.other = data.node.li_attr.zydm;
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                configMap.contractauditGrid.clear().draw();
                configMap.contractauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
        //jstree定时搜索功能
        //输入框输入定时自动搜索
        var to = false;
        $('#search_Htay').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_Htay').val());
            }, 250);
        });

    };
    
    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid = $('#mycontractlist_id_div_' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, contractlist);
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

            Layout.addResizeContent(jqueryMap.$content);
            setTimeout(function () {
                var layout = jqueryMap.$content.layout({
                    center__onresize: App.initLayoutContentScrollbar,
                    west__onresize: App.initLayoutContentScrollbar,
                    west__size: 200
                });
                App.initLayoutContentScrollbar('west', layout.panes.west);
                App.initLayoutContentScrollbar('center', layout.panes.center);
            }, 10);

            configMap.classType = 1;
            configMap.fwzt = 1; //正在服务的
            initOrganization();
            configMap.ifSearch = '0';
            //获取列表
            initContractauditGrid();
            $(".btnKhxxSearch",jqueryMap.$content).off('click').on('click',function (){
                configMap.ifSearch = '1';
            	configMap.contractauditGrid.ajax.reload();
            })
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=contractlist.js
	
	