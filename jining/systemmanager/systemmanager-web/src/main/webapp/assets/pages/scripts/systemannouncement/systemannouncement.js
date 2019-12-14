/**
 * Created by huxinquan on 2017/6/23.
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

/*global $, App, moment, jQuery, bootbox, systemannouncementEdit */
var systemannouncement = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UniqueID: '',
        dataUrl: '/systemAnnouncement',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        systemannouncementGrid: null,
        searchSystemAnnouncement: '',
        editPageUrl: '/systemannouncement/systemannouncementedit.jsp',
        viewPageUrl: '/systemannouncement/systemannouncementview.jsp',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="xtgg_edit" data-toggle="tooltip" title="编辑系统公告"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除系统公告"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        editAuthority_html: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default" data-toggle="tooltip" title="编辑系统公告"><i class="icon iconfont icon-bianji1 iconFontSize colorccc"></i></a>',
        deleteAuthority_html: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default" data-toggle="tooltip" title="删除系统公告"><i class="icon iconfont icon-shanchu3  iconFontSize colorccc"></i></a>',
        checkbox_html: '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip" />'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $systemannouncementDialog: null,
        $systemAnnouncement: null
    };
    //判断发布公告按钮是否存在,不存在
    var whetherExistence = true;
    if($('#addNewGGbtn').length){
         whetherExistence = false;
    }else{
        whetherExistence = true;
    }

    if (whetherExistence){
        $('#jieshoufangleixingM').addClass('hide')
        $('#jieshoufangleixingMT').css({width:0})
            .html('');
    }else{
        $('#jieshoufangleixingM').removeClass('hide');
        $('#jieshoufangleixingMT').css({width:'auto'})
            .html('接收方类型');
    }



    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$systemAnnouncement = $('#systemAnnouncement_' + configMap.UniqueID);
    };

    // var initSystemAnnouncementData = function () {
    //     App.blockUI({
    //         target: jqueryMap.$blockTarget,
    //         boxed: true,
    //         message: '正在加载数据，请稍候...'
    //     });
    //     $.ajax({
    //         url: configMap.path + configMap.dataUrl + '/getAllSystemAnnouncementRead',
    //         dataType: 'JSON',
    //         type: 'GET',
    //         success: function (datas) {
    //             configMap.systemannouncementGrid.clear().draw();
    //             App.unblockUI(jqueryMap.$blockTarget);
    //             if (datas.length > 0) {
    //                 return configMap.systemannouncementGrid.rows.add(datas).draw();
    //             }
    //         },
    //         error: function () {
    //             return App.unblockUI(jqueryMap.$blockTarget);
    //         }
    //     });
    // };

    var openModal = function (title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save iconMr"></i> 保存 ',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    systemannouncementEdit.saveSystemAnnouncement(function (result) {
                        if (result) {
                            //initSystemAnnouncementData();
                            configMap.systemannouncementGrid.ajax.reload(null, false);
                            jqueryMap.$systemannouncementDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times iconMr"></i> 关闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };

        $.get(url, function (html) {
            jqueryMap.$systemannouncementDialog = bootbox.dialog({
                className: 'system-announce-dialog',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var viewSystemAnnouncement = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.systemannouncementGrid.cell(el.parent()).index().row;
        var readId = configMap.systemannouncementGrid.row(rowIndex).data().id;
        var systemAnnouncementId = configMap.systemannouncementGrid.row(rowIndex).data().TZTGID;
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/readSystemAnnouncement?id=" + readId,
            type: 'PUT',
            success: function (result) {
                //initSystemAnnouncementData();
                configMap.systemannouncementGrid.ajax.reload(null, false);
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    var id = configMap.systemannouncementGrid.row(rowIndex).data().id;
                    openModal("查看系统公告", configMap.path + configMap.viewPageUrl + "?systemAnnouncementId=" + encodeURI(systemAnnouncementId), 'view');
                }
                else {
                    Messenger().post({
                        message: "出错啦!",
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var addSystemAnnouncement = function () {
        stopContinueClick("#addNewGGbtn", 300);
        openModal('添加系统公告<span id="announcementtittle_m" style="color: red;font-size: 12px;font-weight: 400">（公告类型请到系统管理下的公告类型管理去设置）</span>', configMap.path + configMap.editPageUrl, 'edit');
    };

    var editSystemAnnouncement = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.systemannouncementGrid.cell(el.parent()).index().row;
        var systemAnnouncementId = configMap.systemannouncementGrid.row(rowIndex).data().TZTGID;
        openModal('编辑系统公告', configMap.path + configMap.editPageUrl + "?systemAnnouncementId=" + encodeURI(systemAnnouncementId), 'edit');
    };

    function tipWin(mes) {
        bootbox.dialog({
            title: '温馨提示',
            message: '<p>' + mes + '</p>',
        });
    }


    var readCheckedSystemAnnouncement = function () {
        var ids = '';
        jqueryMap.$systemAnnouncement.find('#btnIsRead').off('click').on('click', function () {
            if (jqueryMap.$systemAnnouncement.find(':checked[data-type="check"]').length == '0') {
                Messenger().post({
                    message: '请选择需要标记阅读的公告！',
                    type: 'warning',
                    id: 'listTip-m',
                });
                //tipWin('请选择需要标记已读的公告');
            } else {
                jqueryMap.$systemAnnouncement.find(':checked[data-type="check"]').each(function () {
                    var el = $(this);
                    var rowIndex = configMap.systemannouncementGrid.cell(el.parent()).index().row;
                    var id = configMap.systemannouncementGrid.row(rowIndex).data().ggid;
                    ids += id + ',';
                });
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/readCheckedSystemAnnouncement?ids=" + ids,
                    type: 'PUT',
                    success: function (result) {
                        ids = '';
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (result) {
                            jqueryMap.$systemAnnouncement.find('#allCheck').prop("checked", false);
                            //initSystemAnnouncementData();
                            configMap.systemannouncementGrid.ajax.reload(null, false);
                            Messenger().post("阅读成功!");
                            $.ajax({
                                url: configMap.path + configMap.dataUrl + '/getAllSystemAnnouncementUnread',
                                type: 'GET',
                                success: function (result) {
                                    if (result.length > 0) {
                                        $('#announcementInfoWarning').html(result.length);
                                        $('.top-remind-m').addClass('bellSwing');
                                    } else {
                                        $('#announcementInfoWarning').css({display: 'none'});
                                        $('.top-remind-m').removeClass('bellSwing');
                                    }
                                }
                            });
                        }
                        else {
                            Messenger().post({
                                message: "阅读成功!",
                                type: 'error'
                            });
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            }
        });
    };

    var delCheckedSystemAnnouncement = function () {
        var systemAnnouncementIds = '';
        jqueryMap.$systemAnnouncement.find('#btnDelAll').off('click').on('click', function () {
            if (jqueryMap.$systemAnnouncement.find(':checked[data-type="check"]').length == '0') {
                Messenger().post({
                    message: '请选择要删除的公告！',
                    type: 'warning',
                    id: 'listTip-m',
                });
                //tipWin('请选择要删除的公告');
            } else {
                jqueryMap.$systemAnnouncement.find(':checked[data-type="check"]').each(function () {
                    var el = $(this);
                    var rowIndex = configMap.systemannouncementGrid.cell(el.parent()).index().row;
                    var systemAnnouncementId = configMap.systemannouncementGrid.row(rowIndex).data().TZTGID;
                    systemAnnouncementIds += systemAnnouncementId + ',';
                });
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/delCheckedSystemAnnouncement?systemAnnouncementIds=" + systemAnnouncementIds,
                    type: 'PUT',
                    success: function (result) {
                        systemAnnouncementIds = '';
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (result) {
                            jqueryMap.$systemAnnouncement.find('#allCheck').prop("checked", false);
                            //initSystemAnnouncementData();
                            configMap.systemannouncementGrid.ajax.reload(null, false);
                            Messenger().post("删除成功!");
                            $.ajax({
                                url: configMap.path + configMap.dataUrl + '/getAllSystemAnnouncementUnread',
                                type: 'GET',
                                success: function (result) {
                                    if (result.length > 0) {
                                        $('#announcementInfoWarning').html(result.length);
                                        $('.top-remind-m').addClass('bellSwing');
                                    } else {
                                        $('#announcementInfoWarning').css({display: 'none'});
                                        $('.top-remind-m').removeClass('bellSwing');
                                    }
                                }
                            });
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
        });
    };

    var delSystemAnnouncement = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });

        var rowIndex = configMap.systemannouncementGrid.cell(element.parent()).index().row;
        var systemAnnouncementId = configMap.systemannouncementGrid.row(rowIndex).data().TZTGID;
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/delSystemAnnouncement?systemAnnouncementId=" + systemAnnouncementId,
            type: 'PUT',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    //initSystemAnnouncementData();
                    configMap.systemannouncementGrid.ajax.reload(null, false);
                    Messenger().post("删除成功!");
                    $.ajax({
                        url: configMap.path + configMap.dataUrl + '/getAllSystemAnnouncementUnread',
                        type: 'GET',
                        success: function (result) {
                            if (result.length > 0) {
                                $('#announcementInfoWarning').html(result.length);
                                $('.top-remind-m').addClass('bellSwing');
                            } else {
                                $('#announcementInfoWarning').css({display: 'none'});
                                $('.top-remind-m').removeClass('bellSwing');
                            }
                        }
                    });
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

    // var initSystemAnnouncementGrid = function () {
    //     configMap.systemannouncementGrid = jqueryMap.$systemAnnouncement.find('#systemannouncement_data').DataTable({
    //         "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
    //         "ordering": false,
    //         "destroy": true,
    //         "lengthMenu": [10, 20, 50, 100],
    //         "autoWidth": false,
    //         "columnDefs": [
    //             {
    //                 "targets": [0],
    //                 "searchable": false
    //             },
    //             {
    //                 "targets": [3],
    //                 "searchable": false
    //             },
    //             {
    //                 "targets": [4],
    //                 "searchable": false
    //             }
    //         ],
    //         "columns": [
    //             {
    //                 "className": 'text-center',
    //                 "render": function (data, type, row) {
    //                     return configMap.checkbox_html;
    //                 }
    //             },
    //             {
    //                 "className": 'text-left',
    //                 "data": "announcementTypeName",
    //                 "render": function (data, type, row) {
    //                     if (row.isRead == '1') {
    //                         return data;
    //                     } else {
    //                         return '<B>' + data + '</B>';
    //                     }
    //                 }
    //             },
    //             {
    //                 "data": "announcementName",
    //                 "render": function (data, type, row) {
    //                     if (row.isRead == '1') {
    //                         if (row.isTop == '1') {
    //                             return '<span>[置顶]</span>' + data;
    //                         } else {
    //                             return data;
    //                         }
    //                     } else {
    //                         var bv = '<B>' + data + '</B>';
    //                         if (row.isTop == '1') {
    //                             return '<span>[置顶]</span>' + bv;
    //                         } else {
    //                             return bv;
    //                         }
    //                     }
    //                 }
    //             },
    //
    //             {
    //                 "data": "publishDate",
    //                 "render": function (data, type, row) {
    //                     if (row.isRead == '1') {
    //                         return moment(data).format('YYYY-MM-DD');
    //                     } else {
    //                         return '<B>' + moment(data).format('YYYY-MM-DD') + '</B>';
    //                     }
    //                 }
    //             },
    //             {
    //                 "render": function (data, type, row) {
    //                     var btn = '';
    //
    //                     if (jqueryMap.$systemAnnouncement.find('#editSystemAnnouncementBtnPermissions').length === 1) {
    //                         $('#announcementInfoWarning').css({display: 'none'});
    //                         $('.top-remind-m').removeClass('bellSwing');
    //                         btn += configMap.editBtn_html;
    //                     } else {
    //                         btn += configMap.editAuthority_html;
    //                     }
    //                     if (jqueryMap.$systemAnnouncement.find('#deleteSystemAnnouncementBtnPermissions').length === 1) {
    //                         btn += configMap.deleteBtn_html;
    //                     } else {
    //                         btn += configMap.deleteAuthority_html;
    //                     }
    //                     return btn + configMap.viewBtn_html;
    //                 }
    //             }
    //         ],
    //         "language": {
    //             "zeroRecords": "暂时没有数据",
    //             "infoEmpty": "无记录",
    //             "sEmptyTable": "暂时没有数据",
    //             "sInfoThousands":",",
    //             "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
    //         },
    //         "drawCallback": function () { // 数据加载完成后执行
    //             var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$systemAnnouncement);
    //             var editContainer = $('[data-type="edit"]', jqueryMap.$systemAnnouncement);
    //             var delContainer = $('[data-type="del"]', jqueryMap.$systemAnnouncement);
    //             var viewContainer = $('[data-type="view"]', jqueryMap.$systemAnnouncement);
    //
    //             if (tootipContainer.length > 0) {
    //                 tootipContainer.tooltip();
    //             }
    //
    //             if (editContainer.length > 0) {
    //                 editContainer.off('click').on('click', editSystemAnnouncement);
    //             }
    //
    //             if (delContainer.length > 0) {
    //                 delContainer.confirmation({
    //                     "title": '确定要删除？',
    //                     "btnOkLabel": '是',
    //                     "btnCancelLabel": '否',
    //                     "placement": 'left',
    //                     "onConfirm": delSystemAnnouncement,
    //                     "btnOkClass": 'btn btn-danger borderRadius4',
    //                     "btnCancelClass": "btn btn-default borderRadius4"
    //                 });
    //             }
    //
    //             if (viewContainer.length > 0) {
    //                 viewContainer.off('click').on('click', viewSystemAnnouncement);
    //             }
    //         }
    //     });
    // };

    // var searchSystemAnnouncementByText = function () {
    //     configMap.searchSystemAnnouncement = jqueryMap.$systemAnnouncement.find('#searchSystemAnnouncement');
    //     configMap.searchSystemAnnouncement.on('blur', function () {
    //         var searchText = encodeURIComponent(configMap.searchSystemAnnouncement.val());
    //         if (searchText !== '') {
    //             $.ajax({
    //                 url: configMap.path + configMap.dataUrl + "/searchSystemAnnouncementReadByText?searchText=" + searchText,
    //                 dataType: 'JSON',
    //                 type: 'GET',
    //                 success: function (datas) {
    //                     configMap.systemannouncementGrid.clear().draw();
    //                     App.unblockUI(jqueryMap.$blockTarget);
    //                     if (datas.length > 0) {
    //                         return configMap.systemannouncementGrid.rows.add(datas).draw();
    //                     }
    //                 },
    //                 error: function () {
    //                     App.unblockUI(jqueryMap.$blockTarget);
    //                 }
    //             });
    //         } else {
    //             //initSystemAnnouncementData();
    //             configMap.systemannouncementGrid.ajax.reload();
    //         }
    //     });
    // };

    var initSystemAnnouncementByPaging = function () {
        configMap.systemannouncementGrid = jqueryMap.$systemAnnouncement.find('#systemannouncement_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl + "/getSystemAnnouncementByPaging",
                "dataSrc": "aaData",
                "data": function (data) {
                    var text = jqueryMap.$systemAnnouncement.find('#searchSystemAnnouncement').val();
                    var beginTime = jqueryMap.$systemAnnouncement.find('input[name=beginTime]').val();
                    var endTime = jqueryMap.$systemAnnouncement.find('input[name=endTime]').val();
                    var jsflx = jqueryMap.$systemAnnouncement.find('#cx_id_jsflx').val();

                    data.jsflx = jsflx;
                    data.searchText = text;
                    data.beginTime = beginTime;
                    data.endTime = endTime;
                }
            },
            "columns": [
                {
                    className: 'text-center',
                    "render": function (data, type, row) {
                        return configMap.checkbox_html;
                    }
                },
                {
                    "data": "TZTGLX_MC",
                    "className": "text-left",
                    "render": function (data, type, row) {
                        if (row.isRead == '1') {
                            return data;
                        } else {
                            return '<B>' + data + '</B>';
                        }
                    }
                },
                {
                    "data": "TZTGBT",
                    "render": function (data, type, row) {
                        if (row.isRead == '1') {
                            if (row.isTop == '1') {
                                return '<button data-type="xtgg_view" style="border: none;z-index: 10;background: transparent;outline: none;;padding-left: 0px;">' +
                                    '<span>[置顶]</span>' + '<a class="color333">' + data + '</a>' + '</button>';
                            } else {
                                return '<button data-type="xtgg_view" style="border: none;z-index: 10;background: transparent;outline: none;;padding-left: 0px;">' +
                                    '<a class="color333">' + data + '</a>' + '</button>';
                            }
                        } else {
                            var bv = '<button data-type="xtgg_view" style="border: none;z-index: 10;background: transparent;outline: none;;padding-left: 0px;">' +
                                '<a class="title-thick color333">' + data + '</a>' + '</button>';
                            if (row.isTop == '1') {
                                return '<button data-type="xtgg_view" style="border: none;z-index: 10;background: transparent;outline: none;padding-left: 0px;">' +
                                    '<span>[置顶]</span>' + bv + '</button>';
                            } else {
                                return bv;
                            }
                        }
                    }
                },
                {
                    "data": "JSFFL",
                    "className": "text-left",
                    "render": function (data, type, row) {
                        if (row.isRead == '1') {
                            return data;
                        } else {
                            return '<B>' + data + '</B>';
                        }
                    }
                },
                {data:"TZTGLY",
                className:'text-left'
                },
                {
                    className: 'text-center',
                    "data": "LRRQ",
                    "render": function (data, type, row) {
                        if (row.isRead == '1') {
                            return moment(data).format('YYYY-MM-DD');
                        } else {
                            return '<B>' + moment(data).format('YYYY-MM-DD') + '</B>';
                        }
                    }
                },
                {
                    className: 'text-center',
                    "render": function (data, type, row) {
                        var btn='';
                          if (jqueryMap.$systemAnnouncement.find('#editSystemAnnouncementBtnPermissions').length === 1) {
                              $('#announcementInfoWarning').css({display: 'none'});
                              $('.top-remind-m').removeClass('bellSwing');
                            btn += configMap.editBtn_html ;
                        } else {
                            btn += configMap.editAuthority_html;
                        }
                        if (jqueryMap.$systemAnnouncement.find('#deleteSystemAnnouncementBtnPermissions').length === 1) {
                            btn += configMap.deleteBtn_html;
                        } else {
                            btn += configMap.deleteAuthority_html;
                        }

                       /* var btn = '<button data-type="xtgg_edit" style="border: none;z-index: 10;background: transparent;outline: none;">';
                        if (jqueryMap.$systemAnnouncement.find('#editSystemAnnouncementBtnPermissions').length === 1) {
                            btn += configMap.editBtn_html + '</button>';
                        } else {
                            btn += configMap.editAuthority_html + '</button>';
                        }
                        if (jqueryMap.$systemAnnouncement.find('#deleteSystemAnnouncementBtnPermissions').length === 1) {
                            btn += configMap.deleteBtn_html + '</button>';
                        } else {
                            btn += configMap.deleteAuthority_html + '</button>';
                        }*/
                        return btn;
                    }
                },
                {
                    "data": "ggid",
                    "visible": false,
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$systemAnnouncement);
                var editContainer = $('[data-type="xtgg_edit"]', jqueryMap.$systemAnnouncement);
                var delContainer = $('[data-type="del"]', jqueryMap.$systemAnnouncement);
                var viewContainer = $('[data-type="xtgg_view"]', jqueryMap.$systemAnnouncement);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editSystemAnnouncement);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delSystemAnnouncement,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewSystemAnnouncement);
                }
            }
        });
    };

    var searchByCondition = function () {
        jqueryMap.$systemAnnouncement.find('#btnSearch').off('click').on('click', function () {
            var beginTime = jqueryMap.$systemAnnouncement.find('input[name=beginTime]').val();
            var endTime = jqueryMap.$systemAnnouncement.find('input[name=endTime]').val();
            if (new Date(beginTime.replace(/\-/g, "\/")) > new Date(endTime.replace(/\-/g, "\/"))) {
                Messenger().post({
                    message: "时间格式输入错误!",
                    type: 'error',
                    id: 'timeFormatError'
                });
            } else {
                configMap.systemannouncementGrid.ajax.reload();
            }
        });
    };

    var resetSearchCondition = function () {
        jqueryMap.$systemAnnouncement.find('#btnReset').off('click').on('click', function () {
            jqueryMap.$systemAnnouncement.find('#searchSystemAnnouncement').val('')
            jqueryMap.$systemAnnouncement.find('[name=beginTime]').val('');
            jqueryMap.$systemAnnouncement.find('[name=endTime]').val('');
            configMap.systemannouncementGrid.ajax.reload();
        });
    };

    return {
        init: function (UniqueID, firstpage) {
            configMap.UniqueID = UniqueID;
            setJqueryMap();

            var tabid = $('#systemAnnouncement_' + configMap.UniqueID).parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);

            //initSystemAnnouncementGrid();
            //initSystemAnnouncementData();
            initSystemAnnouncementByPaging();
            delCheckedSystemAnnouncement();
            readCheckedSystemAnnouncement();
            //searchSystemAnnouncementByText();
            searchByCondition();
            resetSearchCondition();
            /*jqueryMap.$systemAnnouncement.find('#searchSystemAnnouncement').on('keyup', function () {
             configMap.systemannouncementGrid.search(this.value).draw();
             });*/
            jqueryMap.$systemAnnouncement.find('.beginTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                clearBtn: true,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$systemAnnouncement.find('.endTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                clearBtn: true,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$systemAnnouncement.find('#addNewGGbtn').off('click').on('click', function () {
                addSystemAnnouncement();
            });
            jqueryMap.$systemAnnouncement.find('#allCheck').off('click').on('click', function () {
                if (this.checked) {
                    jqueryMap.$systemAnnouncement.find($('[data-type="check"]')).prop("checked", true);
                } else {
                    jqueryMap.$systemAnnouncement.find($('[data-type="check"]')).prop("checked", false);
                }
            });
            if (firstpage === '1') {
                addSystemAnnouncement();
            }
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=announcementtype.js