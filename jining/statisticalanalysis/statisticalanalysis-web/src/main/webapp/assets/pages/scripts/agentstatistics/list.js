var agentlist = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',//
		dataUrl: '/agentstatistics/agent',//Controller类中的 @RequestMapping路径/方法名上方的@RequestMapping(value = "????", method = RequestMethod.GET)
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		agentGrid: null,
		viewPageUrl: '/agentstatistics/agentview.jsp',
		viewBtn_html: '<button style="background: none;outline: none" class="btn btn-xs default" data-type="viewagent"  data-toggle="tooltip" title="查看详情"><i class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize" style="padding-right:3px;position:relative;top:2px;"></i></button>',
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,
		$blockTarget: null,
		$datatable:null,
	};
	//赋值
	var setJqueryMap = function (uuid) {
		jqueryMap.$container = $('#agentstatistics_id_div_'+uuid);
		jqueryMap.$datatable=jqueryMap.$container.find('table#agentstatistics_data');
		jqueryMap.$blockTarget = $('body');
	};

	var openModal = function (title, url) {
        var dialogButtons = {};
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666'
        }

        $.get(url, function (html) {
            jqueryMap.$customerdialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
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
    };
	
	var initAgentGridByPage = function (){
		configMap.agentGrid = jqueryMap.$datatable.DataTable({
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
                	var shstarDate=$('[name="shstarDate"]',jqueryMap.$content).val();
            		var shendDate=$('[name="shendDate"]',jqueryMap.$content).val();
            		var zcstarDate=$('[name="zcstarDate"]',jqueryMap.$content).val();
            		var zcendDate=$('[name="zcendDate"]',jqueryMap.$content).val();
            		var khbm=$('[name="khbm"]',jqueryMap.$content).val();
                    data.shstarDate = shstarDate;
                    data.shendDate = shendDate;
                    data.zcstarDate = zcstarDate;
                    data.zcendDate = zcendDate;
                    data.khbm = khbm;
                }
            },
            "columns": [	
 			    {	
 			    	className:'text-center',
					"data": "yhzh"
			    },
				{
			    	className:'text-left',
			    	"data": "name"
			    },
				{
                    className:'text-center',
			    	"data": "nsrsbh"
			    },
                {
                    className:'text-center',
                    "data": "create_date",
                    "render": function (data, type, row) {
                        if(data!=""&&data!=null){
                            return moment(data).format('YYYY-MM-DD');
                        }else {
                            return "";
                        }
                    }
                },
			    {
			    	className:'text-center',
			    	"data": "sh_date",
			    	"render": function (data, type, row) {
			    		if(data!=""&&data!=null){
			    			return moment(data).format('YYYY-MM-DD'); 
			    		}else {
			    			return "";
			    		}
					}
				},
				{
			    	className:'text-center',
			    	"data": "is_enabled",
			    	"render": function (data, type, row) {
                        if (data) {
                            return "<font color='green'>已审核</font>";
                        } else {
                            return "<font color='red'>未审核</font>";
                        }
                    }
				},
				{
			    	className:'text-center',
			    	"data": "shyj",
			    	"render": function (data, type, row) {
                        return "<a name='khlistl' style='text-decoration:underline'>"+data+"</a>";
                    }
				},
                {
                    className:'text-center',
                    "data": "bzxx",
                    "render": function (data, type, row) {
                        return "<a name='dllist' style='text-decoration:underline'>"+data+"</a>";
                    }
                },
				{	
					className:'text-center',
					"render": function (data, type, row) {
						return configMap.viewBtn_html;
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
			"drawCallback": function () { // 数据加载完成后执行				
				var viewContainer = jqueryMap.$container.find('[data-type="viewagent"]');// $('[data-type="view"]');
				var khview = jqueryMap.$container.find('[name="khlistl"]');
                var dlview = jqueryMap.$container.find('[name="dllist"]');
                var tootipContainer = $('button[data-toggle="tooltip"]');

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewcustomer);
				}
				if(khview.length > 0){
					khview.off('click').on('click',KHLB);
				}
				if(dlview.length > 0){
                    dlview.off('click').on('click',DLLB);
                }
			}
 		});
	};

	var DLLB = function (){
        var el = $(this);
        var rowIndex = configMap.agentGrid.cell(el.parent()).index().row;
        var dljgbm = configMap.agentGrid.row(rowIndex).data().code;
        var dljgmc = configMap.agentGrid.row(rowIndex).data().name;
        openModal("登录信息——"+dljgmc, configMap.path + "/agentstatistics/loginlist.jsp?dljgbm=" + encodeURI(dljgbm));
    }

	var KHLB = function (){
		var el = $(this);
		var rowIndex = configMap.agentGrid.cell(el.parent()).index().row;
		var dljgbm = configMap.agentGrid.row(rowIndex).data().code;
		var dljgmc = configMap.agentGrid.row(rowIndex).data().name;
		generateTab(this,"/statisticalanalysis/agentstatistics/khlist.jsp?dljgbm="+dljgbm,dljgmc,"2c713032-4afd-4b76-aa50-429cc9d21382");
	};
	
	var getnumber=function (){
		$.ajax({
            url: configMap.path + configMap.dataUrl + "number",
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
            	$(".allnumber",jqueryMap.$container).html(datas.all);
            	$(".yjfnumber",jqueryMap.$container).html(datas.yjf);
            	$(".tryoutnumber",jqueryMap.$container).html(datas.tryout);
            	$(".wshnumber",jqueryMap.$container).html(datas.wsh);
            },
            error: function () {
            }
        });
	};
	
	var viewcustomer = function (){
        var el = $(this);
        var rowIndex = configMap.agentGrid.cell(el.parent()).index().row;
        var id = configMap.agentGrid.row(rowIndex).data().yhid;
        var userId = configMap.agentGrid.row(rowIndex).data().id;
        var dljgbm = configMap.agentGrid.row(rowIndex).data().code;
        openModal("查看信息", configMap.path + configMap.viewPageUrl + "?id="
            + encodeURI(id) + "&dljgbm=" + encodeURI(dljgbm) + "&userId=" + encodeURI(userId));
	};
	
	return {
		init: function (uuid) {
			setJqueryMap(uuid);
			var tabid=$('#agentstatistics_id_div_' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);
//			initarrearsGrid();
//			initarrearsData();
            initAgentGridByPage();
            getnumber();

            $(".moreChoice").on("click",function () {
                $(this).prev().toggleClass("rotate1")
				$(".search-body").toggle(100);
            })
            jqueryMap.$container.find('.beginTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true,
            });
//            jqueryMap.$content.find('[name=starDate]').val(moment().format("YYYY-MM-DD"));

            jqueryMap.$container.find('.endTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true,
            });
//            jqueryMap.$content.find('[name=endDate]').val(moment().format("YYYY-MM-DD"));
            $('[name="Search-btn"]',jqueryMap.$container).off('click').on('click', function () {
				configMap.agentGrid.ajax.reload();
			});
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
