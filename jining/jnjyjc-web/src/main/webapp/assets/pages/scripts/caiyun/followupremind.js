var messageremind = function () {
    'use strict';
    //全局属性参数
    var configMap = {
        viewPageUrl: '/caiyun/followupremindview.jsp',
        path: '',
        cxzt: '',
        messageRemindGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        /* editBtn_html : '<button class="btn btn-xs default" data-type="edit">完成</button>',*/
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="标记为已跟进"><i class="icon iconfont icon-bianji"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看详情"><i class="fa fa-search   iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu"></i></a>'
    }
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $messageRemindForm: null,
        $message_tree: null
    };
    var setJqueryMap = function () {
        jqueryMap.$container = $('#followupremind')
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$messageRemindForm = $('#searchByTime1')
        jqueryMap.$message_tree = $('#message_tree', jqueryMap.$container)
    };

    // 验证
    var messageRemindValidation = function () {
        jqueryMap.$messageRemindForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: {
                startDate: {
                    required: true
                },
                endDate: {
                    required: true
                }

            },
            messages: { // 自定义显示消息

                startDate: {
                    required: "请选择服务开始日期！"
                },
                endDate: {
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


    };
    /**
     * 设置datatable
     */
    var initmessageRemindGrid = function () {
        configMap.messageRemindGrid = $('#followupremind_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columns": [
                {
                    "data": "companyName",
                    className: 'text-center'
                },

                {
                    "data": "nextFollowUpTime",
                    className: 'text-center',
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
                    className: 'text-left'
                },
                {
                    "data": "linkMan",
                    className: 'text-center'
                },
                {
                    "data": "inputPeople",
                    className: 'text-center'
                },

                {
                    "data": "nextLinkMan",
                    className: 'text-center'
                },

                {
                    "data": "followUpCode",
                    className: 'text-center',
                    "render": function (data, type, row) {
                        if (data == 0) {
                            return "未跟进"
                        } else {
                            return "已跟进"
                        }
                    }
                },


                {
                    "data": "followUpCode",
                    className: 'text-center',
                    "render": function (data, type, row) {
                        if (data == 0) {//如果阅读标志是0有设置为点击跟进按钮，否则没有
                            return '' + configMap.editBtn_html
                                + configMap.deleteBtn_html + configMap.viewBtn_html;
                        } else {
                            return '' + configMap.deleteBtn_html + configMap.viewBtn_html;
                        }

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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var editContainer = $('[data-type="edit"]',
                    jqueryMap.$container);
                var viewContainer = $('[data-type="view"]', jqueryMap.$container);
                var delContainer = $('[data-type="del"]',
                    jqueryMap.$container);


                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if (editContainer.length > 0) {

                    editContainer.confirmation({
                        "title": '确定标记为已完成',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": editContract
                    })
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
                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewMessage);
                }
            }
        });

    };
    var openModal = function (title, url, type, fun) {
        var dialogButtons = {};

        if (type === 'view') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    fun();
                    return false;
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭',
            className: 'btn btn-default borderRadius4'
        }

        $.get(url, function (html) {
            jqueryMap.$usersDialog = bootbox.dialog({
                className: 'edit-users-info',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    var viewMessage = function () {
        var el = $(this);
        var rowIndex = configMap.messageRemindGrid.cell(el.closest('td')).index().row;
        var id = configMap.messageRemindGrid.row(rowIndex).data().id;
        openModal("跟进服务", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id),
            'messageview');
    };
    //初始化datatable
    var initmessageRemindData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });

        $.ajax({
            url: configMap.path + "/followupremind/findBydl",
            dataType: 'JSON',
            type: 'POST',
            success: function (datas) {
                configMap.messageRemindGrid.clear().draw(false);
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.messageRemindGrid.rows.add(datas).draw(false);
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    //删除
    var delContract = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var rowIndex = configMap.messageRemindGrid.cell(element.parent()).index().row;
        var id = configMap.messageRemindGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + "/followupremind/deleteById" + "/" + id,
            type: 'DELETE',
            success: function (data) {
                App.unblockUI(jqueryMap.$blockTarget);
                initmessageRemindData();

            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    //修改
    var editContract = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在设置，请稍候...'
        });
        var rowIndex = configMap.messageRemindGrid.cell(element.parent()).index().row;
        var id = configMap.messageRemindGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + "/followupremind/updateById" + "/" + id,
            type: 'POST',
            success: function (data) {
                App.unblockUI(jqueryMap.$blockTarget);
                initmessageRemindData();
                $.ajax({
                    url: configMap.path + '/followupremind/searchCount',
                    dataTpe: 'JSON',
                    type: 'post',
                    success: function (data) {
                        $('#dgjts').html(data.count)
                    }
                })
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        })
    }
    /**
     * 通过阅读状态查询
     */
    /*	var searchByTime=function(){
     var xlbz=$('#xlbz').val();
     $.ajax({
     url : configMap.path + "/messageremind/searchByType"+"/"+xlbz,
     dataType : 'JSON',
     type : 'POST',
     success : function(datas) {
     configMap.messageRemindGrid.clear().draw();
     App.unblockUI(jqueryMap.$blockTarget);
     if (datas.length > 0) {
     $('#cxzt').val(xlbz);
     configMap.cxzt=xlbz;
     return configMap.messageRemindGrid.rows.add(datas).draw();
     }
     },
     error : function() {
     return App.unblockUI(jqueryMap.$blockTarget);
     }

     });

     }*/

    /**
     * 通过时间查找
     */
    var findTime = function () {
        var seperator1 = "-";
        var seperator2 = ":";
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var begin = $('#starDate').val();
        var end = $('#endDate').val();
        $('#findByWeek').off('click').on('click', function () {
            var month = date.getMonth() + 1;
            var strDate = date.getDate();

            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }

            var now = new Date();
            var date1 = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
            var day = date1.getDate();
            begin = date1.getFullYear() + seperator1 + month + seperator1 + day;
            end = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            $('#starDate').val(begin);
            $('#endDate').val(end);
        })
        $('#findByMonth').off('click').on('click', function () {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date1 = new Date(year, month, 0);
            begin = year + '-' + month + '-' + '01';
            end = year + '-' + month + '-' + date1.getDate()
            $('#starDate').val(begin);
            $('#endDate').val(end);

        })
        $('#findByLastMonth').off('click').on('click', function () {
            var nowdays = new Date();
            var year = nowdays.getFullYear();
            var month = nowdays.getMonth();
            if (month == 0) {
                month = 12;
                year = year - 1;
            }
            if (month < 10) {
                month = "0" + month;
            }
            begin = year + "-" + month + "-" + "01";//上个月的第一天
            var myDate = new Date(year, month, 0);
            end = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天
            $('#starDate').val(begin);
            $('#endDate').val(end);
        })
        $('#findByYear').off('click').on('click', function () {
            var nowyear = new Date();
            var year = nowyear.getFullYear();
            begin = year + "-" + "01-01";
            end = year + "-" + "12-31";
            $('#starDate').val(begin);
            $('#endDate').val(end);
        })

        $('#findByZdy').off('click').on('click', function () {
            var cxzt = $('#gjbz').val();
            begin = $('#starDate').val();
            end = $('#endDate').val();
            $.ajax({
                url: configMap.path + "/followupremind/findByZdy" + "/" + cxzt + "/" + begin + "/" + end,
                dataType: 'JSON',
                type: 'post',
                success: function (datas) {
                    configMap.messageRemindGrid.clear().draw(false);
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (datas.length > 0) {
                        return configMap.messageRemindGrid.rows.add(datas).draw(false);
                    }
                },
                error: function () {
                    return App.unblockUI(jqueryMap.$blockTarget);
                }
            })
        })
    }

    /*var updateGjzt=function(){
     var id="";
     $.ajax({
     url:configMap.path+"/followupremind/updateGjzt"+id,
     dataType:'JSON',
     type:'post',
     success:function(){}

     });
     }*/
    var dateT = function () {
        jqueryMap.$contractauditstarDate.find('button.btn-default').off('click').on('click', function () {
            return jqueryMap.$contractauditstarDate.find('input#starDate').datepicker('show');
        });
        jqueryMap.$contractauditendDate.find('button.btn-default').off('click').on('click', function () {
            return jqueryMap.$contractauditendDate.find('input#endDate').datepicker('show');
        });
    };
    return {
        init: function () {
            setJqueryMap();


            jqueryMap.$container.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'

            });
            jqueryMap.$container.find('[name=starDate]').val(moment().format("YYYY-MM-DD"));

            jqueryMap.$container.find('.endTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'

            });
            jqueryMap.$container.find('[name=endDate]').val(moment().format("YYYY-MM-DD"));
            initmessageRemindGrid();
            initmessageRemindData();
            messageRemindValidation();
            findTime();
        },
        setPath: function (path) {
            configMap.path = path;
        },
    }

}();