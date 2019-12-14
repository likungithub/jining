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

/*global $, App, moment, jQuery, bootbox, _ */
var reporttax = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        rowindex: '',
        path: '',
        id: '',
        khbm: '',
        contractGrid: null,
        checkbox_html: '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip" />',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑内容"><i class="icon iconfont icon-bianji"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu"></i></a>',
        jsonMap: null
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#reportTax');
        jqueryMap.$reporttax = $('.reporttax');
    };

    var saveContract = function () {
        var blockTarget = jqueryMap.$contractForm.closest(".modal-content");
        /*
         * if ($('input[name="qyrq"]').val() == null ||
         * $('input[name="qyrq"]').val() == "" ||
         * $('input[name="createDate"]').val() == null ||
         * $('input[name="createDate"]').val() == "" ||
         * $('input[name="startDate"]').val() == null ||
         * $('input[name="startDate"]').val() == "" ||
         * $.trim($("#typeBtn").text().split("<")[0]) == "付款方式" ||
         * jsonMap.payService.length == 0) { App.alert({ container :
         * jqueryMap.$contractForm.closest(".modal-body"), place : 'prepend',
         * type : 'danger', message : '请完整填写！', icon : 'fa fa-warning' }); }
         * else { App.unblockUI(blockTarget); App.blockUI({ target :
         * blockTarget, boxed : true, message : '正在保存数据...' });
         */
        var data = {
            fwrq: $('#fwrq').val(),
            linkman: $('#linkman').val(),
            QQ: $('#QQ').val(),
            fwnr: $('#fwnr').val(),
            xcfwrq: $('#xcfwrq').val(),
            xcgjr: $('#xcgjr').val(),
            xcgjsx: $('#xcgjsx').val()

        };
        var url = configMap.path + "/followup/insertFollowup" + "/"
            + configMap.khbm;
        var requestType = 'POST';
        var khbm = $('[name="khbm"]').val();
        if (khbm) {
            url = url + "/" + khbm;
            requestType = 'PUT';
        }
        if ($('#ccid').val()) {
            var id = $('#ccid').val();
            $.ajax({
                url: configMap.path + "/followup/updateFollowUp/" + id,
                type: 'post',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function () {
                    App.unblockUI(blockTarget);
                    initcontractData();
                    cleanform();
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$contractForm
                            .closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                }
            });

        } else {
            $.ajax({
                url: url,
                type: 'post',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function () {
                    App.unblockUI(blockTarget);
                    initcontractData();
                    cleanform();
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$contractForm
                            .closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                }
            });

        }
    }
    // };
    // 删除
    var delContract = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var rowIndex = configMap.contractGrid.cell(element.parent()).index().row;
        var id = configMap.contractGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + "/followup/deleteByCustomer" + "/" + id,
            type: 'DELETE',
            success: function (data) {
                App.unblockUI(jqueryMap.$blockTarget);
                initcontractData();

            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    var newform = function () {
        $('#newfollowup').click(function () {

        })

    }
    var editParams = function () {
        var el = $(this);
        var rowIndex = configMap.contractGrid.cell(el.parent()).index().row;
        var id = configMap.contractGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + "/followup/findfuByid" + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                $('#fwrq').val(moment(data.followUpTime).format('YYYY-MM-DD'));
                $('#linkman').val(data.linkMan);
                $('#QQ').val(data.qq);
                $('#fwnr').val(data.followUpcontent);
                $('#xcfwrq').val(
                    moment(data.nextFollowUpTime).format('YYYY-MM-DD'));
                $('#xcgjr').val(data.nextLinkMan);
                $('#xcgjsx').val(data.nextFollowUpContent);
                $('#ccid').val(data.id);

            },
            error: function () {
                bootbox.alert('获取参数信息失败！');
            }
        });
    }

    // 验证
    var contractValidation = function () {
        jqueryMap.$contractForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: {
                qyrq: {
                    required: true
                },
                createDate: {
                    required: true
                },
                startDate: {
                    required: true
                }
            },
            messages: { // 自定义显示消息
                qyrq: {
                    required: "请选择签约日期！"
                },
                createDate: {
                    required: "请选择服务开始日期！"
                },
                startDate: {
                    required: "请选择服务结束日期！"
                }
            },
            errorPlacement: function (error, element) { // 为每种input设置错误输出位置
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) {
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr(
                        "data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) {
                    error.appendTo(element.parents('.radio-list').attr(
                        "data-error-container"));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element) { // 高亮显示控件form-group和has-error都是样式类
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) { // 取消高亮显示
                $(element).closest('.form-group').removeClass('has-error');
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
            }
        });

        // // 当下拉列表值发生变化时重新验证
        // $('.nationality', jqueryMap.$paramsForm).change(function () {
        // jqueryMap.$paramsForm.validate().element($(this));
        // });
        //
        // 日期发生变化时重新验证
        // $('input[name="qyrq"]').change(function () {
        // jqueryMap.$contractForm.validate().element($(this));
        // });
    };
    // 初始化表格
    var initcontractGrid = function () {
        configMap.contractGrid = $('#contract_data').DataTable(
            {
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false,
                "destroy": true,
                "lengthMenu": [10, 20, 50, 100],
                "autoWidth": false,
                "columns": [
                    /*{	'className':'text-center',
                     "render": function (data, type, row) {
                     if(row.sendFlag=='0'&&row.taxStat=='已申报'){
                     return configMap.checkbox_html;
                     }else{
                     return '<input type="checkbox" disabled="disabled"/>'
                     }
                     }
                     },          */

                    {
                        "data": "companyName",
                        'className': 'text-left',
                    },
                    {
                        "data": "taxName",
                        'className': 'text-center',
                    },

                    {
                        "data": "reportCycleName",
                        'className': 'text-center',
                    },

                    {
                        "data": "taxPeriop",
                        'className': 'text-center',

                    },
                    {
                        "data": "taxDay",
                        'className': 'text-center',
                        "render": function (data, type, row) {
                            if (data != null) {
                                return moment(data).format(
                                    'YYYY-MM-DD');
                            } else {
                                return "";
                            }

                        }

                    },

                    /*{
                     "data" : "taxRate",
                     "render":function(data,type,row){
                     if(row.taxStat == "已申报"){
                     return row.taxRate.toFixed(2)+"%"
                     }else{
                     return "<input type='text' value=" + row.taxRate.toFixed(2)+" id='shuilv' style='width:50px;'>%"
                     }

                     }
                     },*/

                    {
                        "data": "taxAmount",
                        'className': 'text-right',
                        "render": function (data, type, row) {
                            if (row.taxStat == "已申报") {
                                return "" + row.taxAmount.toFixed(2);
                            } else {
                                return "<input type='text'style='text-align: right;' value=" + row.taxAmount.toFixed(2) + " id='shuikuan" + row.id + "' style='width:100px;'>";
                            }

                        }
                    },

                    {
                        "data": "taxStat",
                        'className': 'text-center',
                    },

                    {
                        "data": "taxStat",
                        'className': 'text-center',
                        "render": function (data, type, row) {
                            var btn = '';

                            if (row.remindFlag === '未发送提醒' && data === '未申报') {
                                btn = '<span class="tws btn btn-sm btnBlue btnBorderColor colorfff borderRadius4">发送提醒</span>';
                            } else if (data === "已申报") {
                                btn = '<span class="tc btn btn-sm btnBlue btnBorderColor colorfff borderRadius4">撤销</span>';

                            } else if (data === '未申报' && row.remindFlag === '已发送提醒') {
                                btn = '<span class="tc btn btn-sm btnBlue btnBorderColor colorfff borderRadius4">标记申报</span>';
                            } else {
                                btn = btn;
                            }
                            return btn;

                        }

                    },

                ],
                "language": {
                    "zeroRecords": "暂时没有数据",
                    "infoEmpty": "无记录",
                    "sEmptyTable": "暂时没有数据",
                    "sInfoThousands":",",
                    "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                },
                "drawCallback": function () { // 数据加载完成后执行
                    var editContainer = $('[data-type="edit"]',
                        jqueryMap.$container);
                    var delContainer = $('[data-type="del"]',
                        jqueryMap.$container);

                    if (editContainer.length > 0) {
                        editContainer.off('click').on('click',
                            editParams);
                    }

                    if (delContainer.length > 0) {
                        delContainer.confirmation({
                            "title": '确定要删除？',
                            "btnOkLabel": '是',
                            "btnCancelLabel": '否',
                            "placement": 'left',
                            "onConfirm": delContract
                        });
                    }
                    $('.tws', jqueryMap.$container).off('click').on('click', function () {
                        var rowIndex = configMap.contractGrid.cell($(this).parent()).index().row;
                        var id = configMap.contractGrid.row(rowIndex).data().id;
                        var shuikuan = $('#shuikuan' + id).val();
                        var that = $(this);
                        var rowIndex = configMap.contractGrid.cell(that.parent()).index().row;
                        if (that.html() == "发送提醒") {
                            var blockTarget = jqueryMap.$reporttax.closest(".modal-body");
                            $.ajax({
                                url: configMap.path + "/reporttax/sendRemind" + "/" + id + '/' + configMap.khbm + '/' + shuikuan,
                                contentType: 'application/json; charset=utf-8',
                                type: 'post',
                                success: function (result) {
                                    if (result.success) {
                                        initcontractData();
                                        that.html("标记申报");
                                        initcontractData();
                                        App.alert({
                                            container: blockTarget,
                                            place: 'prepend',
                                            message: "提醒发送成功！",
                                            icon: 'fa fa-success'
                                        });
                                    } else {
                                        App.alert({
                                            container: blockTarget,
                                            place: 'prepend',
                                            type: 'danger',
                                            message: '保存失败',
                                            icon: 'fa fa-warning'
                                        });
                                    }

                                }
                            });
                        } else {

                            $.ajax({
                                url: configMap.path + "/reporttax/updatereporttax1" + "/" + id,
                                dataType: 'json',
                                type: 'post',
                                success: function (data) {
                                    that.html("标记申报");
                                    initcontractData();
                                }
                            })
                        }

                    })


                    $('.tc', jqueryMap.$container).off('click').on('click', function () {
                        var rowIndex = configMap.contractGrid
                            .cell(
                                $(this)
                                    .parent())
                            .index().row;
                        var id = configMap.contractGrid
                            .row(rowIndex)
                            .data().id;
                        var that = $(this);
                        var rowIndex = configMap.contractGrid.cell(that.parent()).index().row;
                        var sl = configMap.contractGrid.row(rowIndex).data().taxRate;
                        var data = {
                            shuikuan: $('#shuikuan' + id + '').val(),
                            shuilv: sl
                        };
                        if (data.shuilv == null || data.shuilv == "") {
                            App.alert({
                                container: blockTarget,
                                place: 'prepend',
                                type: 'danger',
                                message: "税率不得为空！",
                                icon: 'fa fa-warning'
                            });
                        }

                        if (that.html() == "标记申报") {
                            var blockTarget = jqueryMap.$reporttax.closest(".modal-body");
                            $.ajax({
                                url: configMap.path + "/reporttax/updatereporttax" + "/" + id + '/' + configMap.khbm,
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify(data),
                                type: 'post',
                                success: function (result) {
                                    if (result.success) {
                                        initcontractData();
                                        that.html("撤销");
                                        initcontractData();
                                        App.alert({
                                            container: blockTarget,
                                            place: 'prepend',
                                            message: "标记申报成功！",
                                            icon: 'fa fa-success'
                                        });
                                    } else {
                                        App.alert({
                                            container: blockTarget,
                                            place: 'prepend',
                                            type: 'danger',
                                            message: result.message,
                                            icon: 'fa fa-warning'
                                        });
                                    }

                                }
                            });
                        } else {

                            $.ajax({
                                url: configMap.path + "/reporttax/updatereporttax1" + "/" + id,
                                dataType: 'json',
                                type: 'post',
                                success: function (data) {
                                    that.html("标记申报");
                                    initcontractData();
                                }
                            })
                        }

                    })

                }
            });
    };

    var sendAllMessages = function () {
        var blockTarget = jqueryMap.$reporttax.closest(".modal-body")
        var id = '';
        jqueryMap.$reporttax.find(':checked[data-toggle="tooltip"]').each(function () {
            var el = $(this);
            var rowIndex = configMap.contractGrid.cell($(this).parent()).index().row;
            var ids = configMap.contractGrid.row(rowIndex).data().id;
            id += ids + ',';
        });
        if (id == '') {
            Messenger().post({message: '请选择要阅读的信息！', type: 'error'});
        } else {

            $.ajax({
                url: configMap.path + '/reporttax/sendAllMessage/' + id + '/' + configMap.khbm,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        App.alert({
                            container: blockTarget,
                            place: 'prepend',
                            message: "发送成功！",
                            icon: 'fa fa-success'
                        })
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            App.alert({
                                container: blockTarget,
                                place: 'prepend',
                                message: data[i].message,
                                icon: 'fa fa-success'
                            })
                        }

                    }
                    initcontractData();
                }

            })
        }
    }

    // 初始化表格
    var initcontractData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + "/reporttax/findreporttax" + "/"
            + configMap.khbm,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.contractGrid.clear().draw(false);
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.contractGrid.rows.add(datas).draw(false);
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    var cleanform = function () {
        $(':input', '#contractForm').not(':button, :submit, :reset').val('')
            .removeAttr('checked').removeAttr('selected');
    }
    /**
     * 通过下拉框获取到值把值传到后台查到的数据放在datatable
     */
    var initSearchByType = function () {
        var data = {
            selectcal: $('#selectval1').val(),
            selectval: $('#selectval2').val()
        }
        App.blockUI({
            target: jqueryMap.$blockTarget,
            box: true,
            message: '正在加载数据，请稍后...'
        }), $.ajax({
            url: configMap.path + "/reporttax/searchBytype" + "/"
            + configMap.khbm,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (data) {
                configMap.contractGrid.clear().draw(false);
                App.unblockUI(jqueryMap.$blockTarget);
                if (data.length > 0) {
                    return configMap.contractGrid.rows.add(data).draw(false);
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });

    };
    return {
        // 初始化
        init: function (khbm) {
            configMap.khbm = khbm;
            setJqueryMap();
            $('.createDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $('.startDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $('.qyrq').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
                defaultDate: new Date()
            });
            jqueryMap.$reporttax.find('#checkAllMessages').off('click').on('click', function () {
                if (this.checked) {
                    jqueryMap.$reporttax.find($('[data-type="check"]')).prop("checked", true);
                } else {
                    jqueryMap.$reporttax.find($('[data-type="check"]')).prop("checked", false);
                }
            });
            // 控件验证
            contractValidation();
            // 初始化页面中的表格
            initcontractGrid();
            //
            newform();

            // updatestate();

            // 获取已有的合同列表
            if (configMap.khbm) {
                initcontractData();

            }
            jqueryMap.$contractForm.find('button#newfollowup').off('click').on(
                'click', function () {
                    cleanform();
                });
            jqueryMap.$contractForm.find('button#insertFollowup').off('click')
                .on('click', function () {
                    saveContract();
                });
            jqueryMap.$reporttax.find('button#searchByTime').off('click').on(
                'click', function () {
                    initSearchByType();
                });
            jqueryMap.$reporttax.find('#sendAllMessage').off('click').on(
                'click', function () {
                    sendAllMessages();
                });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        showproject: function (e) {
            // 修改下拉菜单的按钮内容
            $("#selectBtn").html(
                $(e).find("a").html() + '<span class="caret"></span>');
            // 显示当前输入框，隐藏其他
            var key = $(e).find("a").attr("class");
            var obj = $('input[id="' + key + '"]');
            obj.css("display", "block").siblings().css("display", "none");
        },
        showpayment: function (e) {
            // 修改下拉菜单的按钮内容
            $("#typeBtn").html(
                $(e).find("a").html() + '<span class="caret"></span>');
            $('input[name="fkfs"]').val($(e).find("a").attr("name"));
        },

        /*
         * setjson:function(e){ var key = $(e).attr("id"); var value = $(e).val();
         * var temp = {key:key,value:value}; for(var i=0;i<jsonMap.payService.length;i++){
         * if(jsonMap.payService[i].key==key){ jsonMap.payService[i].value=value;
         * jsonMap.payService.splice(i, 1); } } jsonMap.payService.push(temp); }
         */
    };
}();
// @ sourceURL=edit.js
