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
var followup = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        fsxx: '',
        gsmc: '',
        rowindex: '',
        path: '',
        dataUrl: '/contract/contract',
        updateUrl: '/contract/contractupdate',
        projectUrl: '/contract/project',
        paymentUrl: '/contract/payment',
        id: '',
        khbm: '',
        contractGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑内容"><i class="icon iconfont icon-bianji"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del001" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu"></i></a>',
        jsonMap: null
    };
    var jsonMap = {
        payService: []
    };
    // 全局Dom
    var jqueryMap = {
        $containers: null,
        $blockTarget: null,
        $contractForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#contractForm');
        jqueryMap.$containers = $('#gjfwbxxxx')
    };

    var saveContract = function () {
        var blockTarget = jqueryMap.$contractForm.closest(".modal-body");

        /*if ($('input[name="qyrq"]').val() == null
         || $('input[name="qyrq"]').val() == ""
         || $('input[name="createDate"]').val() == null
         || $('input[name="createDate"]').val() == ""
         || $('input[name="startDate"]').val() == null
         || $('input[name="startDate"]').val() == ""
         || $.trim($("#typeBtn").text().split("<")[0]) == "付款方式"
         || jsonMap.payService.length == 0) {
         App.alert({
         container : jqueryMap.$contractForm.closest(".modal-body"),
         place : 'prepend',
         type : 'danger',
         message : '请完整填写！',
         icon : 'fa fa-warning'
         });
         } else {
         App.unblockUI(blockTarget);
         App.blockUI({
         target : blockTarget,
         boxed : true,
         message : '正在保存数据...'
         });*/
        if ($("input[type='checkbox']", jqueryMap.$containers).is(':checked')) {
            configMap.fsxx = '1';
        } else {
            configMap.fsxx = '';
        }
        var data = {
            fwrq: $('#fwrq').val(),
            linkman: $('#linkman').val(),
            QQ: $('#QQ').val(),
            fwnr: $('#fwnr').val(),
            xcfwrq: $('#xcfwrq').val(),
            xcgjr: $('#xcgjr').val(),
            xcgjsx: $('#xcgjsx').val(),
            gsmc: configMap.gsmc,
            fsxx: configMap.fsxx

        };
        if (data.linkman == null || data.linkman == "") {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请请填写联系人！",
                icon: 'fa fa-warning'
            });
            return;
        }
        if (data.fwrq == null || data.fwrq == "") {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请选择本次跟进服务时间！",
                icon: 'fa fa-warning'
            });
            return;
        }
        if (data.xcfwrq == null || data.xcfwrq == "") {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请选择下跟进时间！",
                icon: 'fa fa-warning'
            });
            return;
        }
        if (data.QQ != null && data.QQ != "" && !whetherOrNotQQ(data.QQ)) {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请填写正确的qq号码！",
                icon: 'fa fa-warning'
            });
            return;
        }
        if (data.linkman.length > 20 || data.linkman.length == 0) {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请填写正确的姓名（长度不得超过20字符）！",
                icon: 'fa fa-warning'
            });
            return;
        }
        if (data.fwrq > data.xcgjrq) {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "本次跟进时间不得超过下次跟进时间",
                icon: 'fa fa-warning'
            });
            return;
        }


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
                url: configMap.path + "/followup/updateFollowUp/" + id + "/" + configMap.khbm,
                type: 'post',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (result) {

                    if (result.success) {
                        App.unblockUI(blockTarget);
                        initcontractData();
                        cleanform();
                        App.alert({
                            container: $("#contractForm").closest(".modal-body"),
                            place: 'prepend',
                            message: result.message,
                            icon: 'fa fa-success'
                        });
                    } else {
                        App.alert({
                            container: $("#contractForm").closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: result.message,
                            icon: 'fa fa-warning'
                        });
                    }
                    $.ajax({
                        url: '/followupremind/searchCount',
                        dataTpe: 'JSON',
                        type: 'post',
                        success: function (data) {
                            $('#dgjts').html(data.count)
                        }
                    });

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
                success: function (result) {

                    if (result.success) {
                        App.unblockUI(blockTarget);
                        initcontractData();
                        cleanform();
                        App.alert({
                            container: $("#contractForm").closest(".modal-body"),
                            place: 'prepend',
                            message: '提交成功',
                            icon: 'fa fa-success'
                        });
                    } else {
                        App.alert({
                            container: $("#contractForm").closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: result.message,
                            icon: 'fa fa-warning'
                        });
                    }
                    $.ajax({
                        url: '/followupremind/searchCount',
                        dataTpe: 'JSON',
                        type: 'post',
                        success: function (data) {
                            $('#dgjts').html(data.count)
                        }
                    });

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
//	};
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
                $('#xcfwrq').val(moment(data.nextFollowUpTime).format('YYYY-MM-DD'));
                /* $('#123ws"'+data.nextLinkManCode+'"').attr("selected",true);*/

                $('#xcgjr').val(data.nextLinkManCode);
                $('#xcgjsx').val(data.nextFollowUpContent);
                $('#ccid').val(data.id);

            },
            error: function () {
                bootbox.alert('获取参数信息失败！');
            }
        });
    }
    var getLinkMess = function () {
        $.ajax({
            url: '/customermanage/ptkhxx/findCustomer/' + configMap.khbm,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                $('#linkman').val(data.lxrmc);
                $('#QQ').val(data.qq);
            }
        })

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
        configMap.contractGrid = $('#contract_data')
            .DataTable(
                {
                    "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                    "ordering": false,
                    "destroy": true,
                    "lengthMenu": [5],
                    "autoWidth": false,
                    "columns": [
                        /*  {
                         "data" : "companyName"
                         },*/
                        {
                            "data": "inputTime",
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

                        {
                            "data": "followUpcontent",
                            'className': 'text-center',
                        },
                        {
                            "data": "linkMan",
                            'className': 'text-center',
                        },
                        {
                            "data": "inputPeople",
                            'className': 'text-center',
                        },

                        {
                            "data": "nextLinkMan",
                            'className': 'text-center',
                        },

                        {
                            "render": function (data, type, row) {
                                return '' + configMap.editBtn_html
                                    + configMap.deleteBtn_html;
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
                        var editContainer = $('[data-type="edit"]',
                            jqueryMap.$containers);
                        var delContainer = $('[data-type="del001"]',
                            jqueryMap.$containers);

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
                    }
                });
    };
    // 初始化表格
    var initcontractData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + "/followup/findByCustomer" + "/"
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
    // 获取收费项目
    var getproject = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $
            .ajax({
                url: configMap.path + configMap.projectUrl,
                dataType: 'JSON',
                type: 'GET',
                success: function (datas) {
                    var content = '';
                    var input = '<input type="text" class="form-control" name="sfje" readonly>';
                    for (var i = 0; i < datas.length; i++) {
                        content += '<li role="presentation" class="select" onclick="contractAdd.showproject(this);"><a role="menuitem" tabindex="-1" href="#" class="SFXM_'
                            + datas[i].typecode
                            + '">'
                            + datas[i].paramsname + '</a></li>';
                        input += '<input type="Number" class="form-control" id="SFXM_'
                            + datas[i].typecode
                            + '" style="display:none;" name="sfxm" onchange="contractAdd.setjson(this);">';
                    }

                    $("#sfxm").html(content);
                    $("#sfjeinput").html(input);
                    App.unblockUI(jqueryMap.$blockTarget);
                },
                error: function () {
                    return App.unblockUI(jqueryMap.$blockTarget);
                }
            });
    };
    // 获取付款方式
    var getpayment = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + "/followup/findUsers",
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                for (var i = 0; i < datas.length; i++) {
                    $('#xcgjr').append(
                        '<option value="' + datas[i].zydm + '" id="123ws' + datas[i].zydm + '">'
                        + datas[i].name + '</option>')
                }
                App.unblockUI(jqueryMap.$blockTarget);
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });

    }
    var cleanform = function () {
        $(':input', '#contractForm').not(':button, :submit, :reset').val('')
            .removeAttr('checked').removeAttr('selected');
    }
    return {
        // 初始化
        init: function (khbm, name) {
            configMap.gsmc = name;
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
            getLinkMess();
            // 控件验证
            contractValidation();
            // 初始化页面中的表格
            initcontractGrid();
            // 获取收费项目
            getproject();
            // 获取付款方式
            getpayment();
            newform();
            // 获取已有的合同列表
            if (configMap.khbm) {
                initcontractData();

            }
            jqueryMap.$contractForm.find('button#newfollowup').off('click').on(
                'click', function () {
                    cleanform();
                });
            jqueryMap.$contractForm.find('button#insertFollowup').off('click').on(
                'click', function () {
                    saveContract();
                })
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
//		// 保存雇员信息，参数为回掉函数
//		saveContract : function(callback) {
//			if (jqueryMap.$contractForm.valid()) {
//				saveContract(callback);
//			} else {
//				callback(false);
//			}
//		},
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
