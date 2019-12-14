/**
 * Created by huxinquan on 2017/7/31.
 */
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

/*global $, App, moment, jQuery, bootbox, appsysteminformationEdit */
var appsysteminformation = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UniqueID: '',
        dataUrl: '/appSystemInformation',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        appsysteminformationGrid: null,
        searchAppSystemInformation: '',
        editPageUrl: '/appsysteminformation/appsysteminformationedit.jsp',
        viewPageUrl: '/appsysteminformation/appsysteminformationview.jsp',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑系统通知"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除系统通知"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看系统通知"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        checkbox_html: '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip" />',
        jiGuang: 'https://www.jiguang.cn/accounts/login/form'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $appsysteminformationDialog: null,
        $appSystemInformation: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$appSystemInformation = $('#appSystemInformation_' + configMap.UniqueID);
    };

    var initAppSystemInformationData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getAllAppSystemInformation',
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.appsysteminformationGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.appsysteminformationGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    appsysteminformationEdit.saveAppSystemInformation(function (result) {
                        if (result) {
                            configMap.appsysteminformationGrid.ajax.reload();
                            /*initAppSystemInformationData();*/
                            jqueryMap.$appsysteminformationDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label:  '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };
        $.get(url, function (html) {
            jqueryMap.$appsysteminformationDialog = bootbox.dialog({
                className:'appSystermInformation-m',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var viewAppSystemInformation = function () {
        var el = $(this);
        var rowIndex = configMap.appsysteminformationGrid.cell(el.parent()).index().row;
        var id = configMap.appsysteminformationGrid.row(rowIndex).data().id;
        openModal("查看升级通知", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
    };

    var addAppSystemInformation = function () {
        openModal('添加升级通知', configMap.path + configMap.editPageUrl, 'edit');
    };

    var editAppSystemInformation = function () {
        var el = $(this);
        var rowIndex = configMap.appsysteminformationGrid.cell(el.parent()).index().row;
        var id = configMap.appsysteminformationGrid.row(rowIndex).data().id;
        openModal('编辑升级通知', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
    };

    var delAppSystemInformation = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });

        var rowIndex = configMap.appsysteminformationGrid.cell(element.parent()).index().row;
        var id = configMap.appsysteminformationGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/deleteAppSystemInformation?id=" + id,
            type: 'PUT',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    configMap.appsysteminformationGrid.ajax.reload();
                    /*initAppSystemInformationData();*/
                    Messenger().post("删除成功!");
                }
                else {
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
    };

    var delCheckedAppSystemInformation = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var ids = '';
            if (jqueryMap.$appSystemInformation.find(':checked[data-type="check"]').length == '0') {
                tipWin('请选择要删除的通知信息');
                App.unblockUI(jqueryMap.$blockTarget);
            } else {
                jqueryMap.$appSystemInformation.find(':checked[data-type="check"]').each(function () {
                    var el = $(this);
                    var rowIndex = configMap.appsysteminformationGrid.cell(el.parent()).index().row;
                    var id = configMap.appsysteminformationGrid.row(rowIndex).data().id;
                    ids += id + ',';
                });
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/delCheckedAppSystemInformation?ids=" + ids,
                    type: 'PUT',
                    success: function (result) {
                        ids = '';
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (result) {
                            jqueryMap.$appSystemInformation.find('#allCheck').prop("checked", false);
                            configMap.appsysteminformationGrid.ajax.reload();
                            /*initAppSystemInformationData();*/
                            Messenger().post("删除成功!");
                        }
                        else {
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
    };

    function tipWin(mes){
        bootbox.dialog({
            title: '温馨提示',
            message:'<p>'+mes+'</p>',
        });
    }

    var initAppSystemInformationGrid = function () {
        configMap.appsysteminformationGrid = jqueryMap.$appSystemInformation.find('#appsysteminformation_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax":{
                "url":configMap.path + configMap.dataUrl + '/getAllAppSystemInformation',
                "dataSrc":"aaData",
                "data":function(data){
                    var begin = jqueryMap.$appSystemInformation.find('input[name=beginTime]').val();
                    var end = jqueryMap.$appSystemInformation.find('input[name=endTime]').val();
                    data.begin=begin;
                    data.end=end;
                }
            },
            "columns": [
                {
                    "render": function (data, type, row) {
                        return configMap.checkbox_html;
                    }
                },
                {"data": "clientType",
                    "render": function (data, type, row) {
                        switch (data) {
                            case '0':
                                return '代理APP';
                            case '1':
                                return '客户APP';
                            case '2':
                                return '财云管家';
                        }
                    }},
                {"data": "informationTypeName"},
                {
                    "data": "phoneType",
                    "render": function (data, type, row) {
                        switch (data) {
                            case '0':
                                return 'ios';
                            case '1':
                                return 'android';
                            case '2':
                                return '所有移动端';
                            case '3':
                                return 'PC端';
                        }
                    }
                },
                {
                    "data": "messageJj",
                    className:'text-left'
                },
                {
                    "data": "sjsj",
                    "render": function (data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {
                    "render": function (data, type, row) {
                        var btn = configMap.viewBtn_html;
                        if ($('#editNoticeBtn', jqueryMap.$appSystemInformation).length > 0 ) {
                            btn = btn + configMap.editBtn_html;
                        }
                        if ($('#btnDelAll', jqueryMap.$appSystemInformation).length > 0) {
                            btn = btn + configMap.deleteBtn_html;
                        }
                        return btn;
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$appSystemInformation);
                var editContainer = $('[data-type="edit"]', jqueryMap.$appSystemInformation);
                var delContainer = $('[data-type="del"]', jqueryMap.$appSystemInformation);
                var viewContainer = $('[data-type="view"]', jqueryMap.$appSystemInformation);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editAppSystemInformation);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delAppSystemInformation,
                        "btnOkClass":'btn btn-danger borderRadius4',
                        "btnCancelClass":"btn btn-default borderRadius4"
                    });
                }

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewAppSystemInformation);
                }
            }
        });
    };

    var searchAppSystemInformationByText = function () {
        configMap.searchAppSystemInformation = jqueryMap.$appSystemInformation.find("#searchAppSystemInformation");
        configMap.searchAppSystemInformation.on('blur', function () {
            var searchText = encodeURIComponent(configMap.searchAppSystemInformation.val());
            if (searchText !== '') {
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/searchAppSystemInformationByText?searchText=" + searchText,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (datas) {
                        configMap.appsysteminformationGrid.clear().draw();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.appsysteminformationGrid.rows.add(datas).draw();
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            } else {
                configMap.appsysteminformationGrid.ajax.reload();
                /*initAppSystemInformationData();*/
            }
        });
    };

    var searchByDate = function () {
        jqueryMap.$appSystemInformation.find('#searchByDate').off('click').on('click', function () {
            var beginTime = jqueryMap.$appSystemInformation.find('input[name=beginTime]').val();
            var endTime = jqueryMap.$appSystemInformation.find('input[name=endTime]').val();
            if (beginTime === '' && endTime === '') {
                /*initAppSystemInformationData();*/
                configMap.appsysteminformationGrid.ajax.reload();
            }else if (beginTime === '' || endTime === '') {
                alert('查询条件输入不完整！');
            } else if (new Date(beginTime + '-01'.replace(/\-/g, "\/")) > new Date(endTime + '-01'.replace(/\-/g, "\/"))) {
                alert('时间格式输入错误！');
            } else {
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/getAppSystemInformationByDate",
                    dataType: 'JSON',
                    data: {
                        'beginTime': beginTime,
                        'endTime': endTime
                    },
                    type: 'GET',
                    success: function (datas) {
                        configMap.appsysteminformationGrid.clear().draw();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.appsysteminformationGrid.rows.add(datas).draw();
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            }
        });
    };

    var resetSearchTime = function () {
        jqueryMap.$appSystemInformation.find('#btnReset').off('click').on('click', function () {
            jqueryMap.$appSystemInformation.find('[name=beginTime]').val('');
            jqueryMap.$appSystemInformation.find('[name=endTime]').val('');
            configMap.appsysteminformationGrid.ajax.reload();
            /*initAppSystemInformationData();*/
        });
    };

    return {
        init: function (UniqueID) {
            configMap.UniqueID = UniqueID;
            setJqueryMap();
            initAppSystemInformationGrid();
            /*initAppSystemInformationData();*/
            /*searchAppSystemInformationByText();
            searchByDate();*/
            resetSearchTime();
            
            $('#searchByDate').off('click').on('click',function () {
                configMap.appsysteminformationGrid.ajax.reload();
            })
            jqueryMap.$appSystemInformation.find('#btnDelAll').off('click').on('click', function () {
            	delCheckedAppSystemInformation();
            });
            jqueryMap.$appSystemInformation.find('#btnNew').off('click').on('click', function () {
                addAppSystemInformation();
            });
            jqueryMap.$appSystemInformation.find('#jiGuang').off('click').on('click', function () {
                window.open(configMap.jiGuang);
            });
            jqueryMap.$appSystemInformation.find('#allCheck').off('click').on('click', function () {
                if (this.checked) {
                    jqueryMap.$appSystemInformation.find($('[data-type="check"]')).prop("checked", true);
                } else {
                    jqueryMap.$appSystemInformation.find($('[data-type="check"]')).prop("checked", false);
                }
            });
            jqueryMap.$appSystemInformation.find('.beginTime').datepicker({
                format: 'yyyy-mm',
                autoclose: true,
                startView: 1,
                minViewMode: 1,
                maxViewMode: 1,
                forceParse: false,
                language: 'zh-CN'
            });

            jqueryMap.$appSystemInformation.find('.endTime').datepicker({
                format: 'yyyy-mm',
                autoclose: true,
                startView: 1,
                minViewMode: 1,
                maxViewMode: 1,
                forceParse: false,
                language: 'zh-CN'
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=appsysteminformation.js