var agentkhlist = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',//
		dataUrl: '/agentstatistics/agent',//Controller类中的 @RequestMapping路径/方法名上方的@RequestMapping(value = "????", method = RequestMethod.GET)
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		agentGrid: null,
		dljgbm: null,
		viewPageUrl: '/agentstatistics/edit.jsp',
		// viewBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="viewagent"><i class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize" style="padding-right:3px;position:relative;top:2px;"></i></button>',
		viewBtn_html:'<button style="background: none;outline: none" class="btn btn-xs default" data-type="viewagent" data-toggle="tooltip" title="" data-original-title="查看详情"><i class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize" style="padding-right:3px;position:relative;top:2px;"></i></button>'
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,
		$blockTarget: null,
		$datatable:null,
	};
	//赋值
	var setJqueryMap = function (uuid) {
		jqueryMap.$container = $('#agentstatistics_kh_id_div_'+uuid);
		jqueryMap.$datatable=jqueryMap.$container.find('table#agentstatistics_kh_data');
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
    
	var initAgentGridByPage = function (){
		configMap.agentGrid = jqueryMap.$datatable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl + "/" + configMap.dljgbm,
                "dataSrc": "aaData",
                "data": function (data) {
                }
            },
            "columns": [	
				{
			    	className:'text-left',
			    	"data": "gsmc"
			    },
				{
                    className:'text-center',
			    	"data": "dlzh"
			    },
			    {
			    	className:'text-center',
			    	"data": "clrq",
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
			    	"data": "qyztDm",
			    	"render": function (data, type, row) {
                        if (data) {
                            return "<font color='green'>已签约</font>";
                        } else {
                            return "<font color='red'>未签约</font>";
                        }
                    }
				},
				{
			    	className:'text-center',
			    	"data": "fwztDm",
			    	"render": function (data, type, row) {
			    		if(data) {
			    			return "<font color='green'>正在服务</font>"
			    		} else {
			    			return "<font color='red'>停止服务</font>";
			    		}
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
				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewcustomer);
				}
			}
 		});
	};
	
	var getnumber=function (){
		$.ajax({
            url: configMap.path + configMap.dataUrl + "number",
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
            	$(".allnumber",jqueryMap.$container).html(datas.all);
            	$(".todaynumber",jqueryMap.$container).html(datas.today);
            },
            error: function () {
            }
        });
	};
	
	var viewcustomer = function (){
        var el = $(this);
        var rowIndex = configMap.agentGrid.cell(el.parent()).index().row;
        var userId = configMap.agentGrid.row(rowIndex).data().id;
        var khbm = configMap.agentGrid.row(rowIndex).data().khbm;
        openModal("查看信息", configMap.path + configMap.viewPageUrl + "?khdm="+ encodeURI(khbm)+"&id="+encodeURI(userId));
	};
	
	return {
		init: function (uuid,dljgbm) {
			setJqueryMap(uuid);
			configMap.dljgbm = dljgbm;
			var tabid=$('#agentstatistics_kh_id_div_' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);
            initAgentGridByPage();
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
