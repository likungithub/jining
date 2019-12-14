var customerList = function () {
    'use strict';

// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/customerManage/customer',
        dlshUrl: '/customer/dlsh.jsp',
        zzshUrl: '/customer/zzsh.jsp',
        importUrl: '/customermanage/customer/importExcel.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        customerGrid: null,
        data:null,
        viewPageUrl: '/customer/view.jsp',
        cxshPageUrl: '/customer/cxsh.jsp',
        shcustomerBtn_html: '<a href="javascript:;" class="btn btn-xs" data-type="shcharge" data-toggle="tooltip" title="初审"><i class="icon iconfont icon-shenhe1  iconFontColor-10a0f7 iconFontSize"></i></a>',
        zscustomerBtn_html: '<a href="javascript:;" class="btn btn-xs" data-type="zscharge" data-toggle="tooltip" title="终审"><i class="icon iconfont icon-zhongshen  iconFontColor-10a0f7 iconFontSize"></i></a>',
        delcustomerBtn_html: '<a href="javascript:;" class="btn btn-xs" data-type="delshcharge" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3  iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewcustomerBtn_html: '<a href="javascript:;" class="btn btn-xs " data-type="viewcharge" data-toggle="tooltip" title="详情"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        cxshcustomerBtn_html: '<a href="javascript:;" class="btn btn-xs" data-type="cxshcharge" data-toggle="tooltip" title="撤回"><i class="icon iconfont icon-chexiao   iconFontColor-10a0f7 iconFontSize"></i></a>'
        /*viewcustomerBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="viewcharge"><i class="icon iconfont icon-shenhe" style="padding-right:3px;position:relative;top:2px;"></i>详情</button>',
        shcustomerBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="shcharge"><i class="icon iconfont icon-hetong" style="padding-right:3px;position:relative;top:2px;"></i>审核</button>',
        cxshcustomerBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="cxshcharge"><i class="icon iconfont icon-shenhe" style="padding-right:3px;position:relative;top:2px;"></i>撤回</button>',
        delcustomerBtn_html: '<button class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="delshcharge"><i class="fa fa-times" style="padding-right:3px;position:relative;top:2px;"></i>删除</button>'*/
    };
    var dljgjson = [];

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $customerdialog: null,
        $selectedRow: null,
        $customerDataTable: null
    };

    var setJqueryMap = function () {
        jqueryMap.$container = $('#dlsh-manager-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$customerDataTable = $('#customer_data', jqueryMap.$container);
    };

    var initcustomerData = function () {
        var starDate = $('[name="starDate"]', jqueryMap.$content).val();
        var endDate = $('[name="endDate"]', jqueryMap.$content).val();
        var jd = $('#JDSelect', jqueryMap.$content).val();
        var data = {
            'starDate': starDate,
            'endDate': endDate,
            'jd': jd
        };
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/searchData",
            dataType: 'JSON',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (datas) {
                configMap.customerGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.customerGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var viewcustomer = function () {
        var el = $(this);
        var rowIndex = configMap.customerGrid.cell(el.parent()).index().row;
        var id = configMap.customerGrid.row(rowIndex).data().yhid;
        var userId = configMap.customerGrid.row(rowIndex).data().id;
        var dljgBm = configMap.customerGrid.row(rowIndex).data().code;
        var yhzh = configMap.customerGrid.row(rowIndex).data().yhzh;
        openModal("查看信息（" + yhzh + "）", configMap.path + configMap.viewPageUrl + "?id="
            + encodeURI(id) + "&dljgBm=" + encodeURI(dljgBm) + "&userId=" + encodeURI(userId));
    };

    var openModal = function (title, url) {
        var dialogButtons = {};

        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存',
            className: "btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                customerView.saveView(function (result) {
                    jqueryMap.$customerdialog.modal('hide');
                });
                return false;
            }
        };

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

    /**
     * 审核通过
     */
    var shtg = function () {
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$customerDataTable).not(jqueryMap.$container.find('[name="selectCustomer"]'));
        var temp = "";
        var customerTemp = "";
        dljgjson = [];
        $(inputjson).each(function () {
        	var el = $(this);
            temp += el.attr('id') + ",";
            var rowIndex = configMap.customerGrid.cell(el.parent()).index().row;
            var customerId = configMap.customerGrid.row(rowIndex).data().yhid;
            customerTemp += customerId + ",";
        });
        temp = temp.substring(0, temp.length - 1);
        if (temp.length === 0) {
            Messenger().post({
                message: '请选择一家代理机构！',
                type: 'warning'
            });
        } else {
            customerTemp = customerTemp.substring(0, customerTemp.length - 1);
            var dialogButtons = {};
            var url = configMap.path + configMap.dlshUrl + "?id=" + encodeURI(temp) + "&customerId=" + encodeURI(customerTemp);

            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    dlshView.addShAdvise(function (result) {
                        jqueryMap.$customerdialog.modal('hide');
                        if (result) {
                            initcustomerData();
                        }
                    });
                    return false;
                }
            };

            dialogButtons.cancel = {
                label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                className: 'btn borderRadius4 color666'
            }

            $.get(url, function (html) {
                jqueryMap.$customerdialog = bootbox.dialog({
                    title: "代理审核",
                    message: html,
                    buttons: dialogButtons
                });
            });
        }
    };

    /**
     * 单个撤销
     */
    var cxshcustomer = function () {
        var el = $(this);
        var rowIndex = configMap.customerGrid.cell(el.parent()).index().row;
        var customerId = configMap.customerGrid.row(rowIndex).data().yhid;
        var userId = configMap.customerGrid.row(rowIndex).data().id;
        var useridjson = [];
        var customerIdjson = [];
        var usertemp = null;
        var customertemp = null;
        usertemp = {userid: userId};
        customertemp = {customerId: customerId};
        customerIdjson.push(customertemp);
        useridjson.push(usertemp);
    	var dialogButtons = {};
        var url = configMap.path + configMap.cxshPageUrl;

        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 确&nbsp;定 ',
            className: "btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
            	cxshView.cxShOperation(function (result) {
            		jqueryMap.$customerdialog.modal('hide');
                    var data = {
                    	customerId: customerIdjson,
                    	userid:useridjson,
                    	choosedcode:result
                    }
                    
                    $.ajax({
                      url: configMap.path + configMap.dataUrl + '/sh/0',
                      dataType: 'JSON',
                      contentType: 'application/json; charset=utf-8',
                      type: 'PUT',
                      data: JSON.stringify(data),
                      success: function (datas) {
                          if (datas.success) {
                              initcustomerData();
                              Messenger().post({
                                  message: "撤销成功！",type: 'success'});
                          } else {
                              Messenger().post({
                                  message: datas.message,
                                  type: 'error'
                              });
                          }
                      },
                      error: function () {
                          Messenger().post({
                              message: "撤销失败！",
                              type: 'error'
                          });
                      }
                  });
              });
              return false;
            }
        };

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666'
        }

        $.get(url, function (html) {
            jqueryMap.$customerdialog = bootbox.dialog({
                title: "撤回审核",
                message: html,
                buttons: dialogButtons
            });
        });
    }
    

    /**
     * 单个审核
     */
    var shcustomer = function () {
        var el = $(this);
        var rowIndex = configMap.customerGrid.cell(el.parent()).index().row;
        var id = configMap.customerGrid.row(rowIndex).data().id;
        var yhid = configMap.customerGrid.row(rowIndex).data().yhid;
        var dialogButtons = {};
        var url = configMap.path + configMap.dlshUrl + "?id=" + encodeURI(id) + "&customerId=" + encodeURI(yhid);

        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                dlshView.addShAdvise(function (result) {
                    jqueryMap.$customerdialog.modal('hide');
                    if (result) {
                        initcustomerData();
                    }
                });
                return false;
            }
        };

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666'
        }

        $.get(url, function (html) {
            jqueryMap.$customerdialog = bootbox.dialog({
                title: "代理审核",
                message: html,
                buttons: dialogButtons
            });
        });
    }
    
    /**
     * 终审
     */
    var zscustomer = function () {
        var el = $(this);
        var rowIndex = configMap.customerGrid.cell(el.parent()).index().row;
        var dljgbm = configMap.customerGrid.row(rowIndex).data().code;
        var dialogButtons = {};
        var url = configMap.path + configMap.zzshUrl + "?dljgbm=" + encodeURI(dljgbm);

        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
            	zzshView.zzShAdvise(function (result) {
                    jqueryMap.$customerdialog.modal('hide');
                    if (result) {
                        initcustomerData();
                    }
                });
                return false;
            }
        };

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666'
        }

        $.get(url, function (html) {
            jqueryMap.$customerdialog = bootbox.dialog({
                title: "营业执照审核",
                message: html,
                buttons: dialogButtons
            });
        });
    }


    var delshcustomer = function () {
        var el = $(this);
        var rowIndex = configMap.customerGrid.cell(el.parent()).index().row;
    	bootbox.dialog({
            title: '提示',
            message: '确定要删除该代理机构？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                    	App.blockUI({
                            target: jqueryMap.$blockTarget,
                            boxed: true,
                            message: '正在删除数据，请稍候...'
                        });
                        var Customerid = configMap.customerGrid.row(rowIndex).data().customerId;
                        var userid = configMap.customerGrid.row(rowIndex).data().id;
                        $.ajax({
                            url: configMap.path + configMap.dataUrl + "/" + Customerid + "/" + userid,
                            type: 'DELETE',
                            success: function (result) {
                                App.unblockUI(jqueryMap.$blockTarget);
                                if (result) {
                                    initcustomerData();
                                    Messenger().post("删除成功!");
                                } else {
                                    Messenger().post({
                                        message: "删除成功!",
                                        type: 'error'
                                    });
                                }
                            },
                            error: function () {
                                App.unblockUI(jqueryMap.$blockTarget);
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
    };

    /**
     * 导出
     */
    var DCbtn = function () {
        stopContinueClick("#DCbtn", 300);
        var starDate = $('[name="starDate"]', jqueryMap.$content).val();
        var endDate = $('[name="endDate"]', jqueryMap.$content).val();
        var jd = $('#JDSelect', jqueryMap.$content).val();
        window.location.href = "/customermanage/customerManage/downDataExcel?starDate=" + starDate +
            "&endDate=" + endDate + "&jd=" + jd;
    }
    
    /**
     * 导入
     */
    var DRbtn =function (){
    	var dialogButtons = {};
        var url = configMap.importUrl;

        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
            	setDLIncel.subimtBtn(function (result) {
                    if (result) {
                    	jqueryMap.$customerdialog.modal('hide');
                    	$('#JDSelect', jqueryMap.$content).val(2);
                    	initcustomerData();
                    }
                });
                return false;
            }
        };

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666'
        }

        $.get(url, function (html) {
            jqueryMap.$customerdialog = bootbox.dialog({
                title: "模板导入",
                message: html,
                buttons: dialogButtons
            });
        });
    }

    var selectAll = function (status) {
        $('[type="checkbox"]', jqueryMap.$customerDataTable).not(":disabled").prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$customerDataTable).not(jqueryMap.$container.find('[name="selectCustomer"]'));
        var temp = null;
        dljgjson = [];
        $(inputjson).each(function () {
            temp = {dljg: $(this).attr('id')};
            dljgjson.push(temp);
        });
    };

    $("#dlsh-manager-container .clickMore").on("click",function () {
        if($(this).attr("data")==0){
            $(this).attr("data",1);
            // $("#dlsh-manager-container .moreTop>span").show();
            $("#dlsh-manager-container .rotate1").removeClass("rotate1")
        }else{
            $(this).attr("data",0);
            // $("#dlsh-manager-container .moreTop>span").hide()
            $("#dlsh-manager-container .clickMore").next().addClass("rotate1")
        }
        $(".showMore").toggle(500);
    })
    
    var initcustomerGrid = function () {
        configMap.customerGrid = $('#customer_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "autoWidth": false,
            "lengthMenu": [10, 20, 50, 100],
            "columns": [
                {
                    className: "text-center",
                    "data": "id",
                    "render": function (data, type, row) {
                        var content = '';
                        if (row.state) {
                            content += '<input type="checkbox" name="customer_checkbox" id="' + data + '" disabled="disabled"/>';
                        } else {
                            content += '<input type="checkbox" name="customer_checkbox" id="' + data + '"/>';
                        }
                        return content;
                    }
                },
                {

                    "data": "name",
                    className: 'text-left'

                },
                {

                    "data": "nsrsbh",
                    className: 'text-center'

                },
                {

                    "data": "create_date",
                    className: 'text-center',
                    "render": function (data, type, row) {
                        if (data != null) {
                            return moment(data).format('YYYY-MM-DD');
                        } else {
                            return "";
                        }
                    }

                },
                {
                    "data": "sjhm",
                    className: 'text-center'

                },
                {
                    "data": "state",
                    className: 'text-center',
                    "render": function (data, type, row) {
                        if (data) {
                            return "<font color='green'>已审核</font>";
                        } else {
                            return "<font color='red'>未审核</font>";
                        }
                    }

                },
                {

                    "data": "sh_date",
                    className: 'text-center',
                    "render": function (data, type, row) {
                        if (data != null) {
                            return moment(data).format('YYYY-MM-DD');
                        } else {
                            return "";
                        }
                    }

                },
                {
                    "data": "zszt",
                    className: 'text-center',
                    "render": function (data, type, row) {
                        if (data == '1') {
                            return "<font color='green'>同意</font>";
                        } else if (row.zssj != null) {
                            return "<font color='red'>不同意</font>";
                        } else {
                        	return "<font color='red'>未审核</font>";
                        }
                    }

                },
                {
                    "data": "zssj",
                    className: 'text-center',
                    "render": function (data, type, row) {
                        if (data != null) {
                            return moment(data).format('YYYY-MM-DD');
                        } else {
                            return "";
                        }
                    }

                },
                {
                    "data": "yhid",
                    className: 'text-center',
                    "render": function (data, type, row) {
                        if (!row.state) {
                            return configMap.viewcustomerBtn_html + configMap.shcustomerBtn_html;
                        } else {
                            return   configMap.viewcustomerBtn_html + configMap.zscustomerBtn_html + configMap.cxshcustomerBtn_html  + configMap.delcustomerBtn_html;
                        }

                    }
                },{

                    "data": "yhzh",
                    className: 'text-left',
                    "visible": false,
                    "searchable": false

                },{

                    "data": "code",
                    className: 'text-left',
                    "visible": false,
                    "searchable": false
                },{

                    "data": "customerId",
                    className: 'text-left',
                    "visible": false,
                    "searchable": false
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$customerDataTable);
                var viewcustomerContainer = $('[data-type="viewcharge"]', jqueryMap.$customerDataTable);
                var shcustomerContainer = $('[data-type="shcharge"]', jqueryMap.$customerDataTable);
                var cxshcustomerContainer = $('[data-type="cxshcharge"]', jqueryMap.$customerDataTable);
                var delshcustomerContainer = $('[data-type="delshcharge"]', jqueryMap.$customerDataTable);
                var zsshcustomerContainer = $('[data-type="zscharge"]', jqueryMap.$customerDataTable); //终审

                if (viewcustomerContainer.length > 0) {
                    viewcustomerContainer.off('click').on('click', viewcustomer);
                }

                if (shcustomerContainer.length > 0) {
                    shcustomerContainer.off('click').on('click', shcustomer);
                }

                if (cxshcustomerContainer.length > 0) {
                    cxshcustomerContainer.off('click').on('click', cxshcustomer);
                }

                if (delshcustomerContainer.length > 0) {
                    delshcustomerContainer.off('click').on('click', delshcustomer);
                }
                
                if (zsshcustomerContainer.length > 0) {
                	zsshcustomerContainer.off('click').on('click', zscustomer);
                }

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                //单个checkbox点击
                jqueryMap.$container.find('[name="customer_checkbox"]').change(function () {
                    //当前被点击的checkbox
                    var el = $(this);
                    //获取当前被点击的checkbox数量
                    var n = $('[name="customer_checkbox"]:checked').length;
                    //获取所有可以被点击的checkbox数量
                    var all = $('[name="customer_checkbox"]').not(":disabled").length;
                    //如果两个数量一样，设置选择所有的checkbox属性为被点击，否则为不被点击
                    if (n == all) {
                        jqueryMap.$container.find('[name="selectCustomer"]').prop("checked", true);
                    } else {
                        jqueryMap.$container.find('[name="selectCustomer"]').prop("checked", false);
                    }
                });
            }
        });
        $('tbody', jqueryMap.$customerDataTable).on('move', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            } else {
                configMap.customerGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.customerGrid.row('.success');
            }
        });
    };


    return {
        init: function () {
            setJqueryMap();

            var tabid = $('#dlsh-manager-container').parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);

            $('#JDSelect', jqueryMap.$container).val("0");

            //新增
            $('#sh').off('click').on('click', function () {
                shtg();
            });

            //导出
            $('#DCbtn').off('click').on('click', function () {
                DCbtn();
            });
            
            //导入
            $('#DRbtn').off().on('click',function(){
            	DRbtn();
            });

            $('#customerSearch', jqueryMap.$container).on('keyup', function () {
                configMap.customerGrid.search(this.value).draw();
            });

            jqueryMap.$container.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            //jqueryMap.$container.find('[name="starDate"]').val(moment().format("YYYY-MM-DD"));

            jqueryMap.$container.find('.endTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            //jqueryMap.$container.find('[name="endDate"]').val(moment().format("YYYY-MM-DD"));

            //搜索按钮数据加载
            jqueryMap.$container.find('#JDSearch-btn').off('click').on('click', function () {
                initcustomerData();
            });

            initcustomerGrid();
            initcustomerData();
            //点击选择所有
            jqueryMap.$container.find('[name="selectCustomer"]').change(function () {
                var el = $(this);
                selectAll(el.is(':checked'));
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();