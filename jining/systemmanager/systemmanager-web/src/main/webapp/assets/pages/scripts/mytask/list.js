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

/*global $, App, moment, jQuery, bootbox, employeeEdit */
var mytasklist = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/mytask/tasklist',
        editPageUrl: '/expensemanagement/expenseadd.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        setStatusUrl: '/params/statusparams',
        paramsGrid: null,
        addPageUrl: '/params/addparams.jsp',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看任务详情">详情</a>',
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $paramsDialog: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#mytask-container_' + uuid);
        jqueryMap.$blockTarget = $('body');
    };

    //初始步骤数目
	var initstepnum = 2;
	var allstep = 1;
	var bzid = null;
	var rwid = null;
	//模态框
	var openModal = function (title, url, type) {
		var dialogButtons = {};

		if (type === 'view') {
		}

        dialogButtons.cancel={
            label:'<i class="icon iconfont icon-xiayibu iconFontSize" style="color: #fff;"></i>下一步',
                className: 'btn btn-default borderRadius4',
				callback:function () {
                    var idR = url.split('?id=')[1];
                    fullCurrentStep(initstepnum);

                    initstepnum++;
                    if(initstepnum>2){
                        //上传文件的点击事件
                        $('#tsakupLoadM','#detailStepView_m').click(function(){
                            openModal1('上传附件',configMap.path+'/taskcenter/taskmanagement/addTaskFileM.jsp?rwid='+encodeURI(rwid)+'&bzid='+encodeURI(bzid)+'&jlid='+$("#jlid_id").val(),'edit');
                        });
                        $('.area0','#detailStepView_m').hide();
                        $('.area1','#detailStepView_m').show();
                        var b=initstepnum-2;
                        $('button[data-bb-handler="cancel"]','.task_step_list_m ').prop('disabled','disabled');
                    var requestbf= function(i,j){
                            $.get('/systemmanager/rwgljbxx/getbzxx/'+i+'/'+j,function (d){
                            	bzid = d.lcbzxx.lcbzjbxx.bzid;
                                $('#detailStepView_m .area1 >.row0>.discontent').append('<span>'+ d.lcbzxx.lcbzjbxx.bzxx+'</span>');
                                for(var i=0;i<d.lcbzxx.lcbzfj.length;i++){

                                    $('#detailStepView_m .area1 >.row0>.discontent').append( "<a href='" + d.lcbzxx.lcbzfj[i].fjcclj + "' download='" + d.lcbzxx.lcbzfj[i].fjmc + "' target='_blank'>" + d.lcbzxx.lcbzfj[i].fjmc + "</a>");
                                }
                            });
						}
						switch (b){
							case 1:requestbf(idR,b);break;
                            case 2:requestbf(idR,b);break;
                            case 3:requestbf(idR,b);break;
                            case 4:requestbf(idR,b);break;
                            case 5:requestbf(idR,b);break;
                            case 6:requestbf(idR,b);break;
                            case 7:requestbf(idR,b);break;
                            case 8:requestbf(idR,b);break;
                            case 9:requestbf(idR,b);break;
							default:case 1:requestbf(idR,b);
						}

                    }

                   $.get('/systemmanager/rwgljbxx/jbxx/rwjbxx/'+idR,function(d) {


                    });



                    if(initstepnum == allstep+2){
                        $('button[data-bb-handler="cancel"]','.task_step_list_m ').html('<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭');
                    }

								if(initstepnum != allstep+3)
								{ return false;}
								else{
									initstepnum=2;

								}





                }
        }

		$.get(url, function (html) {
			jqueryMap.$productDialog = bootbox.dialog({
				className:"task_step_list_m",
				title: title,
				message: html,
				buttons: dialogButtons
			});
		});
	};

    var initexpenseGrid = function () {
        configMap.paramsGrid = $('#mytask_data', jqueryMap.$container).DataTable({
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
                	var starDate=$('[name="starDate"]',jqueryMap.$container).val();
            		var endDate=$('[name="endDate"]',jqueryMap.$container).val();
            		var type = $('[name="type"]',jqueryMap.$container).val();
            		var rwmc=$('[name="rwmc"]',jqueryMap.$container).val();
                    data.starDate = starDate;
                    data.endDate = endDate;
                    data.type = type;
                    data.rwmc = rwmc;
                }
            },
            "columns": [
                {
                	className:"text-center",
                	"data": "rwid"
                },
                {
                	className:"text-center",
                	"data": "rwmc",
                },
                {
                	className:"text-center",
                	"data":"cjsj",
                	"render":function (data,type,row){
                		if(data==null||data==""){
                			return "";
                		} else {
                			return moment(data).format("YYYY-MM-DD")
                		}
                	}
                },
                {
                	className:"text-center",
                	"data": "kssj",
                	"render":function (data, type, row) {
                		if(data==null||data==""){
                			return "";
                		} else {
                			return moment(data).format("YYYY-MM-DD")
                		}
                	}
                },
                {
                	className:"text-center",
                	"data": "jssj",
                	"render":function (data, type, row) {
                		if(data==null||data==""){
                			return "";
                		} else {
                			return moment(data).format("YYYY-MM-DD")
                		}
                	}
                },
                {
                	className:"text-center",
                	"data":"fzrMc",
                },
                {
                	className:"text-center",
                	"data":"fqrMc",
                },
                {   
                	className:"text-center",
                    "render": function (data, type, row) {
                        return ''
                            + configMap.editBtn_html
                            + configMap.deleteBtn_html
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
                var viewContainer = $('[data-type="view"]', jqueryMap.$container);
                if (viewContainer.length > 0) {
                	viewContainer.off('click').on('click', viewTask);
                }
            }
        });
    };

    //打开详情的模态框
	var viewTask = function(){
		var el = $(this);
		var rowIndex = configMap.paramsGrid.cell(el.parent()).index().row;
		var id = configMap.paramsGrid.row(rowIndex).data().rwid;
        initstepnum=2;
        bzid = null;
        rwid = id;
        $.get('/systemmanager/rwgljbxx/jbxx/rwjbxx/'+id,function(d) {
            allstep=d.data.rwjbxx.lcbz;
        });
		openModal('任务详情',configMap.path+'/taskcenter/taskmanagement/taskDtail.jsp?id='+ encodeURI(id),'edit');
	}
	
    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid=$('#mytask-container_'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid,mytasklist);
            initexpenseGrid();
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
				configMap.paramsGrid.ajax.reload();
			});
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=employee.js