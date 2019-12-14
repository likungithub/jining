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

/*global $, App, moment, jQuery, bootbox, advanceinfoEdit */
var list = function() {
	'use strict';

	// 全局属性参数
	var configMap = {
        from:'',
        yxkhbm:'',
		khbm:'',
		path : '',
		dataUrl : '/advanceinfo/',
		datatablesLanguageFile : '/assets/global/plugins/datatables/chinese.json',
		advanceinfoGrid : null,
		editPageUrl : '/advanceinfo/edit.jsp',
		editcgsBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="editcgs" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
		deleteBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
		checkbox_html: '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip" />'
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,	
		$blockTarget : null,
		$advanceinfomanagerDialog : null
	};

	var setJqueryMap = function() {
		jqueryMap.$container = $('#advanceinfo-manager-content');
		jqueryMap.$blockTarget = $('body');
	};

	/**
	 * 初始化initadvanceinfomanagerData
	 */
	var initadvanceinfomanagerData = function() {
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在加载数据，请稍候...'
		});
		$.ajax({
			url : configMap.path + "/advanceinfo/getAllAdvanceInfo",
			dataType : 'JSON',
			type : 'GET',
			success : function(datas) {
				configMap.advanceinfoGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.advanceinfoGrid.rows.add(datas).draw();
				}
			},
			error : function() {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};


    // 垫付按钮
    var advanceCommon = function () {
        var dfxmdm = $('#rwgl_fyxm').val();
        var dfxmmc = $("#rwgl_fyxm").find("option:selected").text()
        var dfje = $('input[name="dfje"]', '#editvanceForm').val();
        var dfsj = $('input[name="dfsj"]', '#editvanceForm').val();
        var gsname = $('input[name="gsname"]', '#editvanceForm').val();
        var userAccount = $('input[name="userAccount"]', '#editvanceForm').val();
        var name = $('input[name="name"]', '#editvanceForm').val();
        var number = $('input[name="number"]', '#editvanceForm').val();
        var bzxx = $('textarea[name="bzxx"]', '#editvanceForm').val();
        var id = $('input[name="id"]', '#editvanceForm').val();

        if (dfje == "") {
            AppAlert("请输入垫付金额");
            return false;
        } else if (whetherOrNotMoney(dfje) == false) {
            AppAlert("请输入正确的垫付金额");
            return false;
        }
        if (dfsj == "") {
            AppAlert("请输入垫付时间");
            return false;
        }
        if (gsname == "") {
            AppAlert("请输入收费单位");
            return false;
        }

        if(dfxmdm==""){
            AppAlert("请选择费用项目");
            return false;
		}
        var data = {
        	id:id,
            bzxx: bzxx,
            qymc: gsname,
            sfsj: dfsj,
            je: dfje,
            lxrxm: name,
            lxrdh: number,
            qysh: userAccount,
            fyxmdm:dfxmdm,
            fyxmmc:dfxmmc
        }
        $.ajax({
            url: '/systemmanager/advanceinfo/updateAdvanceInfo/'+id,
            type:'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify(data),
            success: function (result) {
                console.log(result);
                if(result.success){
                    Messenger().post("修改成功!");
                    configMap.advanceinfoGrid.ajax.reload();
				}else{
                    Messenger().post("修改失败!");
				}

            }
        })

        return true;

    }

	/**
	 * 打开模态框代码
	 */
	var openModal = function(title, url, type) {
		var dialogButtons = {};
		if(type === 'edit'){
			dialogButtons.success = {
					label :'<i class="fa fa-save iconMr"></i> 保存 ',
					className : "btn btn-success btnBlue borderRadius4 colorfff",
					callback : function() {
                        if (!advanceCommon()) {
                            return false;
                        }
					}
				};
		}
		dialogButtons.cancel = {
            label :'<i class="fa fa-times iconMr"></i> 关闭 ',
            className : 'btn btn-default borderRadius4 color666'
        };

		$.get(url, function(html) {
			jqueryMap.$advanceinfomanagerDialog = bootbox.dialog({
				className:"advanceViewM",
				title : title,
				message : html,
				buttons : dialogButtons
			});
		});
	};

    /**
	 * 编辑
     */
    var editadvanceinfomanager = function() {
		var el = $(this);
		var rowIndex = configMap.advanceinfoGrid.cell(el.parent())
				.index().row;
		var id = configMap.advanceinfoGrid.row(rowIndex).data().id;
		openModal('编辑垫付信息', configMap.path + configMap.editPageUrl + "?id="
				+ encodeURI(id) , 'edit');
	};

	/**
	 * 删除
	 */
	var deladvanceinfo = function(event, element) {
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在删除数据，请稍候...'
		});

		var rowIndex = configMap.advanceinfoGrid.cell(
				element.parent()).index().row;
		var id = configMap.advanceinfoGrid.row(rowIndex).data().id;
		$.ajax({
			url : configMap.path + "/advanceinfo/deleteAdvanceInfoById/"+id,
			type : 'DELETE',
			success : function(result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result.success) {
					configMap.advanceinfoGrid.ajax.reload();
					Messenger().post("删除成功!");
				} else {
					Messenger().post({
						message : "删除失败!",
						type : 'error'
					});
				}
			},
			error : function() {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};

	//批量删除
	var deleteBatchAdvance = function () {
		var id = '';
		jqueryMap.$container.find('input.advanceInput').each(function () {
            if ($(this).is(':checked')) {
                var el = $(this);
                var rowIndex = configMap.advanceinfoGrid.cell(el.parent()).index().row;
                var ids = configMap.advanceinfoGrid.row(rowIndex).data().id;
                id += ids + ',';
            }

		});
		if(id==''){
			Messenger().post({message: '请选择要删除的数据！', type: 'error'});
		}else{
			$.ajax({
				url : configMap.path + "/advanceinfo/deleteAdvanceInfoById/"+id,
				type : 'DELETE',
				success : function(result) {
					App.unblockUI(jqueryMap.$blockTarget);
					if (result.success) {
						configMap.advanceinfoGrid.ajax.reload();
						Messenger().post("删除成功!");
					} else {
						Messenger().post({
							message : "删除失败!",
							type : 'error'
						});
					}
				},
				error : function() {
					App.unblockUI(jqueryMap.$blockTarget);
				}
			});
            $('#advance_all_s',jqueryMap.$container).removeProp('checked');

		}
	};

	/**
	 * 初始化datatable
	 */
	var initadvanceinfoGrid = function() {
		console.log("开始加载数据");
		configMap.advanceinfoGrid = $('#advanceinfomanager_data')
				.DataTable(
						{
							"dom" : 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                            "ordering": false, //屏蔽排序
                            "searching": false,//屏蔽datatales的查询框
                            "processing": true, // 打开数据加载时的等待效果
                            "serverSide": true, // 打开后台分页
                            "autoWidth": false,
                            "ajax": {
                                "url" : configMap.path + "/advanceinfo/getAllAdvanceInfo",
                                "dataSrc": "aaData",
                                "data": function (data) {
                                    //    开始的时间
                                    var sT = $('input[name="starDate"]', '#advanceinfo-manager-content').val();
                                    //    结束的时间
                                    var eT = $('input[name="endDate"]', '#advanceinfo-manager-content').val();
									var qymc=$('input[name="qymc"]','#advanceinfo-manager-content').val();
                                    var lxrxm=$('input[name="lxrxm"]','#advanceinfo-manager-content').val();
                                    var fyxmdm = $("#cx_rwgl_fyxm").val();
								if ($('#moreSearch11').css('display')=='none'){
                                    sT='';
                                    eT ='';
                                    lxrxm = '';
                                    fyxmdm='';
								}

                                    data.kssj = sT;
                                    data.jssj = eT;
                                    data.lxrxm=lxrxm;
                                    data.qymc = qymc;
                                    data.fyxmdm=fyxmdm;
                                    data.from=configMap.from;
                                    data.yxkhbm=configMap.yxkhbm;
                                    data.khbm=configMap.khbm;
                                }
                            },
                            "columns" : [
                                {
                                    "data": "id",
                                    render: function (data, type, row) {
                                        console.log(row);
                                        return '<input class="advanceInput" type="checkbox">';
                                    }
                                },
                                {
                                    "data" : "rwmc"
                                },
									{
										"data" : "htbh"
									},
									{
										"data" : "khmc"
									},
									{
										"data" : "qymc",
                                        className:'text-center'
									},
									{
										"data" : "sfxmmc",
										className:"text-center"
									},
									{
										"data" : "fyxmmc"
									},
									{
										"data" : "je",
                                        className:'text-right',
										"render":function (data,type,row) {
											return moneySplitByComma(Number(data).toFixed(2));
                                        }
									},
									{"data": "sfsj",
                                        className:'text-center',
										"render":function(data,type,row){
											if((""+data)!='') {
                                                return moment(data).format('YYYY-MM-DD');
                                            }else{
												return "";
											}
										}
									},
                                {
                                    "data" : "dfymc",
                                    className:'text-center'
                                },
									{	className:'text-center',
										"render" : function(data, type, row) {
											return configMap.editcgsBtn_html+configMap.deleteBtn_html;
										}
									} ],
							"language" : {
                                "zeroRecords": "暂时没有数据",
                                "infoEmpty": "无记录",
                                "sEmptyTable": "暂时没有数据",
                                "sInfoThousands":",",
                                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
							},
                            "fnFooterCallback": function(row, data, start, end, display) {//总计
                                var api = this.api(), data;
                                // Remove the formatting to get integer data for summation
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
                                    .column( 7 )
                                    .data()
                                    .reduce( function (a, b) {
                                        return intVal(a) + intVal(b);
                                    }, 0 );
                                $( api.column( 7 ).footer() ).html(
                                    number(total)
                                );//垫付金额

                            },
							"drawCallback" : function() { // 数据加载完成后执行
								var tootipContainer = $('[data-toggle="tooltip"]',jqueryMap.$container);
								var editcgsContainer = $('[data-type="editcgs"]',jqueryMap.$container);
                                var delContainer = $('[data-type="del"]', jqueryMap.$container);

                                if (tootipContainer.length > 0) {
									tootipContainer.tooltip();
								}

								if (editcgsContainer.length > 0) {
									editcgsContainer.off('click').on('click',
											editadvanceinfomanager);
								}

                                if (delContainer.length > 0) {
                                    delContainer.confirmation({
                                        "title": '确定要删除？',
                                        "btnOkLabel": '是',
                                        "btnCancelLabel": '否',
                                        "placement": 'left',
                                        "onConfirm": deladvanceinfo,
                                        "btnOkClass": 'btn btn-danger borderRadius4',
                                        "btnCancelClass": "btn btn-default borderRadius4"
                                    });
                                }

                            }
						});
	};

    $('#searchTerm-m',$( '#advanceinfo-manager-content')).on('click', function () {
		configMap.advanceinfoGrid.ajax.reload();
    });

    // $('#delBatch11', '#advanceinfo-manager-content').on('click', 'button', function () {
    //    deleteBatchAdvance();
    // });



    return {
		init : function(from,yxkhbm,khbm) {
			configMap.from = from;
			configMap.yxkhbm=yxkhbm;
			configMap.khbm=khbm;

			setJqueryMap();
			initadvanceinfoGrid();

            $('#advance_all_s', jqueryMap.$container).off('click').click(function () {
                if ($(this).is(':checked')) {
                    jqueryMap.$container.find('input.advanceInput').each(function () {
                        $(this).prop('checked', 'checked');
                    });
                } else {
                    jqueryMap.$container.find('input.advanceInput').each(function () {
                        $(this).removeProp('checked');
                    })
                }
            });
			//initadvanceinfomanagerData();
            jqueryMap.$container.find('.beginTime_m').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            jqueryMap.$container.find('.endTime_m').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });




            $.ajax({
                url: "/systemmanager/rwgljbxx/getfyxm",
                async: false,
                success: function (d) {
                    d = d.data;
                    $('<option value="' + '000' + '">' + '全部' + '</option>').appendTo($('#cx_rwgl_fyxm'));

                    for (var i = 0; i < d.length; i++) {
                        $('<option value="' + d[i].dm + '">' + d[i].mc + '</option>').appendTo($('#cx_rwgl_fyxm'));
                    }
                }
            });

        },
		setPath : function(path) {
			configMap.path = path;
		}
	};
}();