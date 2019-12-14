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

/*global $, App, moment, jQuery, bootbox, UsersEdit */

var kqlist = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        addUrl: '/attendance/kqsz.jsp',
        dataUrl:'/attendance/kqsz',
        AttendanceGrid: null,
        deleteBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-toggle="tooltip" ' +
            'data-placement="bottom" name="attendanceDel" title="" data-original-title="删除考勤设置">' +
            '<i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        editBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-toggle="tooltip" ' +
            'data-placement="bottom" name="kqedit" title="" data-original-title="编辑考勤设置">' +
            '<i class="icon iconfont icon-bianji iconFontColor-10a0f7 iconFontSize"></i></a>',
        zt: 1
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $kqListDialog: null,
        $selectedRow: null,
        $kqListDataTable: null
    };


    var setJqueryMap = function () {
        jqueryMap.$container = $('#kq-list-con');
        jqueryMap.$blockTarget = jqueryMap.$container;
        jqueryMap.$kqListDataTable = $('#kqListTable', jqueryMap.$container);
    };


    var openModal = function (title, url, type, fun) {
        var dialogButtons = {};

        if (type === 'edit') {
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
        };

        $.get(url, function (html) {
            jqueryMap.$kqListDialog = bootbox.dialog({
                className: 'edit-users-info',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var initAttendanceGrid = function () {
        configMap.AttendanceGrid = jqueryMap.$kqListDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,                                                                                        //屏蔽排序
            "searching": false,                                                                                       //屏蔽datatales的查询框
            "processing": true,                                                                                       // 打开数据加载时的等待效果
            "serverSide": true,                                                                                       // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                }
            },
            "columns": [
                {
                    class: "text-left",
                    "data": "kqbh"
                },
                {
                    class:"text-center",
                    "data": "sbsj"
                },
                {
                    class:"text-center",
                    "data": "xbsj"
                },
                {
                    class:"text-center",
                    "data": "xxsjq",
                    "render":function(data, type, row){
                        return data + "—" + row.xxsjz;
                    }
                },
                {
                    class:"text-center",
                    "data": "jbkssj"
                },
                {
                    class:"text-center",
                    "data": "dkyxfw",
                    "render":function(data){
                        return data + "米";
                    }
                },
                {
                    class:"text-center",
                    "data": "bkqx",
                    "render":function(data){
                        return data + "天";
                    }
                },
                {
                    class:"text-center",
                    "render": function (data, type, row) {
                        return configMap.editBtn_html + configMap.deleteBtn_html;
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
            "drawCallback": function () {                                                                            // 数据加载完成后执行
                $('[data-toggle="tooltip"]', jqueryMap.$container).tooltip();
                var deleteContainer = jqueryMap.$container.find('[name="attendanceDel"]');
                var editContainer = jqueryMap.$container.find('[name="kqedit"]');
                if (deleteContainer.length > 0) {
                    deleteContainer.confirmation({
                        "title": '确定要删除考勤设置？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "btnOkClass": 'btn btn-sm btn-danger mr borderRadius4',
                        "btnCancelClass": 'btn btn-sm btn-default borderRadius4',
                        "placement": 'left',
                        "container": 'body',
                        "onConfirm": delAttendance
                    });
                }
                if(editContainer.length > 0){
                    editContainer.off('click').on('click', editkq);
                }
            }
        });
    };

    /**
     * 删除考勤设置
     * @param event
     * @param element
     */
    var delAttendance = function(event,element){
        var rowIndex = configMap.AttendanceGrid.cell(element.parent()).index().row;
        var kqbh = configMap.AttendanceGrid.row(rowIndex).data().kqbh;
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/' + kqbh,
            type: 'DELETE',
            success: function (result) {
                if (result.success) {
                    configMap.AttendanceGrid.ajax.reload();
                    Messenger().post({
                        message: "删除成功",
                        type: 'info',
                        id:"ordermessenger"
                    });
                }
                else {
                    Messenger().post({
                        message: result.message,
                        type: 'error',
                        id:"ordermessenger"
                    });
                }
            },
            error: function () {
                Messenger().post({
                    message: "删除失败！",
                    type: 'error',
                    id:"ordermessenger"
                });
            }
        });
    };

    /**
     * 修改考勤设置
     */
    var editkq = function(){
        var el = $(this);
        var rowIndex = configMap.AttendanceGrid.cell(el.parent()).index().row;
        var kqbh = configMap.AttendanceGrid.row(rowIndex).data().kqbh;
        openModal('编辑考勤',configMap.path+configMap.addUrl + '?kqbh=' + kqbh,'edit',function () {
            kqsz.saveKqSz(function (result) {
                Messenger().post({
                    message: "修改成功",
                    type: 'info',
                    id:"ordermessenger"
                });
                jqueryMap.$kqListDialog.modal('hide');
                configMap.AttendanceGrid.ajax.reload();
            });
        });
    };

    /**
     * 添加考勤设置
     */
    var addKqCon=function () {
        openModal('添加考勤',configMap.path+configMap.addUrl,'edit',function () {
            kqsz.saveKqSz(function (result) {
                Messenger().post({
                    message: "添加成功",
                    type: 'info',
                    id:"ordermessenger"
                });
                jqueryMap.$kqListDialog.modal('hide');
                configMap.AttendanceGrid.ajax.reload();
            });
        });
    };
    
    return {
        init: function () {
            setJqueryMap();
            var tabid = $('#kq-list-con').parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, kqlist);
            initAttendanceGrid();
            $("#addKqBtn", jqueryMap.$container).off('click').on('click',addKqCon);
        },
        setPath: function (path) {
            configMap.path = path;
        }
    }
}();

//@ sourceURL=users/users.js