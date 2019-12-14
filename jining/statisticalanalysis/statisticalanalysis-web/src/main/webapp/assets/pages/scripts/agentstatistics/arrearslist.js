var arrearslist = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',//
		dataUrl: '/agentstatistics/arrears',//Controller类中的 @RequestMapping路径/方法名上方的@RequestMapping(value = "????", method = RequestMethod.GET)
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		agentGrid: null,
		dljgbm:'',
		viewPageUrl: '/agentstatistics/agentview.jsp',
		remindPageUrl: '/agentstatistics/remind.jsp',
		viewBtn_html: '<button style="background: none;outline: none" class="btn btn-xs default"  data-type="viewarrears" data-toggle="tooltip" title="查看详情"><i class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize" style="padding-right:3px;position:relative;top:2px;"></i></button>',
		remindBtn_html: '<button style="background: none;outline: none" class="btn btn-xs default"  data-type="remindarrears" data-toggle="tooltip" title="垫付"><i class="icon iconfont icon-jiaofeitixing  iconFontColor-10a0f7 iconFontSize" style="padding-right:3px;position:relative;top:2px;"></i></button>'
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,
		$blockTarget: null,
		$datatable:null,
		$customerdialog:null
	};
	//赋值
	var setJqueryMap = function (uuid) {
		jqueryMap.$container = $('#arrearsstatistics_id_div_'+uuid);
		jqueryMap.$datatable=jqueryMap.$container.find('table#arrearsstatistics_data');
		jqueryMap.$blockTarget = $('body');
	};

	var openModal = function (title, url, type) {
        var dialogButtons = {};
        if(type=="edit"){
        	dialogButtons.success = {
    				label: "保存",
    				className: "btn btn-default btnBlue borderRadius4 colorfff",
    				callback: function () {
    					//保存成功之后重新按照选择的用户查询派工信息
    					remindagent.saveremind(function (result) {
    						if (result) {
    							jqueryMap.$customerdialog.modal('hide');
    							$('#allCheck').attr("checked", false);
    						}
    					});
    					return false;
    				}
    			};
        }
        dialogButtons.cancel = {
                label: '关闭 ',
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
            		var khbm=$('[name="khbm"]',jqueryMap.$content).val();
                    data.shstarDate = shstarDate;
                    data.shendDate = shendDate;
                    data.khbm = khbm;
                }
            },
            "columns": [	
                {
                	className:'text-center',
                	"data":"code",
                	"render":function (data, type, row){
                		return '<input type="checkbox" class="arrearscheckbox" name="checkbox_checkbox" id="code_'+data+'"/>';
                	}
                },
 			    {	
 			    	className:'text-left',
					"data": "yhzh",
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
			    	"data": "fwksrq",
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
			    	"data": "fwjsrq",
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
			    	"data": "shyj",
			    	"render": function (data, type, row) {
                        return "<a name='khlista' style='text-decoration:underline'>"+data+"</a>";
                    }
				},
				{	
					className:'text-center',
					"render": function (data, type, row) {
						return configMap.viewBtn_html + configMap.remindBtn_html;
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
				var viewContainer = jqueryMap.$container.find('[data-type="viewarrears"]');// $('[data-type="view"]');
				var remindContainer = jqueryMap.$container.find('[data-type="remindarrears"]');
				var khview = jqueryMap.$container.find('[name="khlista"]');
                var tootipContainer = $('[data-toggle="tooltip"]');

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewcustomer);
				}
				if(remindContainer.length > 0){
					remindContainer.off('click').on('click',remind);
				}
				if(khview.length > 0){
					khview.off('click').on('click',KHLB);
				}
				//单个checkbox点击
				jqueryMap.$container.find('[name="checkbox_checkbox"]').change(function (){
					//当前被点击的checkbox
					var el = $(this);
					//获取当前被点击的checkbox数量
					var n = $('[name="checkbox_checkbox"]:checked',jqueryMap.$container).length;
					//获取所有可以被点击的checkbox数量
					var all = $('[name="checkbox_checkbox"]',jqueryMap.$container).length;
					//如果两个数量一样，设置选择所有的checkbox属性为被点击，否则为不被点击
					if(n==all){
						jqueryMap.$container.find('[name="selectAll"]').prop("checked",true);
					}else{
						jqueryMap.$container.find('[name="selectAll"]').prop("checked",false);
					}
				})
			}
 		});
	};
	
	var KHLB = function (){
		var el = $(this);
		var rowIndex = configMap.agentGrid.cell(el.parent()).index().row;
		var dljgbm = configMap.agentGrid.row(rowIndex).data().code;
		var dljgmc = configMap.agentGrid.row(rowIndex).data().name;
		generateTab(this,"/statisticalanalysis/agentstatistics/khlist.jsp?dljgbm=" + encodeURI(dljgbm),dljgmc,"2c713032-4afd-4b76-aa50-429cc9d21382");
	};
	
	var remind = function (){
		var el = $(this);
		var rowIndex = configMap.agentGrid.cell(el.parent()).index().row;
		var dljgbm = configMap.agentGrid.row(rowIndex).data().code;
		openModal("催费提醒", configMap.path + configMap.remindPageUrl + "?dljgbm=" + encodeURI(dljgbm),"edit");
	};
	
	var viewcustomer = function (){
        var el = $(this);
        var rowIndex = configMap.agentGrid.cell(el.parent()).index().row;
        var id = configMap.agentGrid.row(rowIndex).data().customerId;
        var userId = configMap.agentGrid.row(rowIndex).data().id;
        var nsrsbh = configMap.agentGrid.row(rowIndex).data().nsrsbh;
        openModal("查看信息", configMap.path + configMap.viewPageUrl + "?id="
            + encodeURI(id) + "&nsrsbh=" + encodeURI(nsrsbh) + "&userId=" + encodeURI(userId));
	};
	
	var selectAll = function (status){
		$('[type="checkbox"]',jqueryMap.$container).prop("checked",status);
	};
	
	var remindAll = function (){
		var inputjson = $('[type="checkbox"]:checked',jqueryMap.$container).not(jqueryMap.$container.find('[name="selectAll"]'));
		configMap.dljgbm="";
		$(inputjson).each(function(){
			configMap.dljgbm+=$(this).attr("id").split("_")[1]+",";
		});
		if(configMap.dljgbm==""){
			Messenger().post({
				message: "请选择客户！",
				id:"dispatchmessage",
				type: 'error'
			});
			return false;
		} else {
			openModal("催费提醒", configMap.path + configMap.remindPageUrl + "?dljgbm=" + encodeURI(configMap.dljgbm),"edit");
		}
	};
    $(".QFclickMore").on("click",function () {
    	 
        if($(this).attr("data")==0){
            // $(".search-body").children("span").show();
            $(this).next().removeClass("rotate1")
            $(this).attr("data",1)

        }else{
            // $(".search-body").children("span").hide();
            $(this).next().addClass("rotate1")
            $(this).attr("data",0);
        }
        $(".QFshowMore").toggle(500);
    })
	return {
		init: function (uuid) {
			setJqueryMap(uuid);
			var tabid=$('#arrearsstatistics_id_div_' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);
            initAgentGridByPage();
            jqueryMap.$container.find('.beginTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true,
            });
            jqueryMap.$container.find('.endTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true,
            });
            $('[name="Search-btn"]',jqueryMap.$container).off('click').on('click', function () {
				configMap.agentGrid.ajax.reload();
			});
            jqueryMap.$container.find('[name="selectAll"]').change(function (){
				var el = $(this);
				selectAll(el.is(':checked'));
			});
            jqueryMap.$container.find('[name="remind-btn"]').off('click').on('click',function (){
            	remindAll();
            });
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
