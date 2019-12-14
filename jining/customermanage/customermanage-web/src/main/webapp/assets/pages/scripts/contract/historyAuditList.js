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
var contractAdd = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        id: '',
        type: '',
        uuid: '',
        dataUrl: '/customermanage/historyaudit/historyaudit',
        contractGrid: null,
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" ' +
            'data-toggle="tooltip" title="查看合同"><i class="fa fa-search"></i></a>'
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $content: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#historyaudit_data_list_' + uuid);
        jqueryMap.$datatable = $('#historyaudit_data', jqueryMap.$content);
    };


    /**
     * 分页获取当前选中的信息历史审批记录
     */
    var initcontractGrid = function () {
        var now = new Date();
        now = now.setDate(now.getDate() + 5);
        configMap.contractGrid = jqueryMap.$datatable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "lengthMenu": [10],
            "ajax": {
                "url": configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.id = configMap.id;
                    data.type = configMap.type;
                }
            },
            "columns": [
                {
                    className:'text-center',
                    "render":function (data, type, row) {
                        if(row.tjr!==null&&row.tjr!==''){
                            return row.tjrmc;
                        } else if(row.shry!==null&&row.shry!==''){
                            return row.shrmc;
                        }
                    }
                },
                {
                    className:'text-center',
                    "render":function (data, type, row){
                        if (row.shyj !== null&&row.shyj!=='') {
                            return '<label data-toggle="tooltip" data-placement="bottom" title="' + row.shyj
                                + '">' + row.shyj + '</label>';
                        } else if(row.bzxx !==null&&row.bzxx!==''){
                            return '<label data-toggle="tooltip" data-placement="bottom" title="' + row.bzxx
                                + '">' + row.bzxx + '</label>';
                        } else {
                            return '<label style="color: #cccccc">(无)</label>'
                        }
                    }
                },
                {
                    className:'text-center',
                    "data":"tjlx",
                    "render":function (data, type, row){
                        if(data==='001'){
                            return '提交审核'
                        } else {
                            return '审核（' + row.shzt + '）'
                        }
                    }
                },
                {
                    className:'text-center',
                    "data":"lrrq",
                    "render":function (data){
                        return moment(data).format('YYYY-MM-DD HH:mm:ss');
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
                $('[data-toggle="tooltip"]', jqueryMap.$content).tooltip();                                       //提示框
            }
        });
    };

    /**
     * 查看合同详细信息（客户详情中）
     * @param event
     */
    var contractShowData = function (event){
        event.preventDefault(); //组织默认事件
        var el = $(this);
        var rowIndex = configMap.contractGrid.cell(el.parent()).index().row;
        var htbm = configMap.contractGrid.row(rowIndex).data().htbm;
        openModal("查看合同信息——"+htbm, "/customermanage/contract/view.jsp?id=" + encodeURI(htbm));
    };

    /**
     * 模态框
     * @param title
     * @param url
     */
    var openModal = function (title, url) {
        var dialogButtons = {};
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$content = bootbox.dialog({
                className:'contractDBymdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    return {
        init: function (id, type,uuid) {
            configMap.id = id;                                                                                          //编号
            configMap.type = type;                                                                                      //类别
            configMap.uuid = uuid;                                                                                     //uuid编号
            setJqueryMap(uuid);
            jqueryMap.$content.closest(".modal-content").css("width", "920px");                             //设置模态框的宽度
            jqueryMap.$content.closest(".modal-dialog").css({"cssText":"width:920px !important"});       //设置模态框的宽度
            initcontractGrid();
        },

        /**
         * 设置路径
         * @param path
         */
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=edit.js