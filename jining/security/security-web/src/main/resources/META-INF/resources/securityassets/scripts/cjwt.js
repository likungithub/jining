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

/*global $, App, moment, jQuery, bootbox, commonproblemEdit */
var cjwt = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        UniqueID: '',
        path: '',
        dataUrl: '/systemmanager/commonProblem',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        commonproblemGrid: null,
        searchCommonProblem: '',
        viewPageUrl: '/cjwtview.jsp',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看常见问题"><i class="fa fa-search iconFontColor-10a0f7 iconFontSize"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $commonproblemDialog: null,
        $commonProblem: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$commonProblem = $('#cjwt_' + configMap.UniqueID);
    };

    var initCommonProblemData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getAllCommonProblem',
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.commonproblemGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.commonproblemGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {};

        dialogButtons.cancel = {
            label: '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };
        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'common-pro-modal',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var viewCommonProblem = function () {
        var el = $(this);
        var rowIndex = configMap.commonproblemGrid.cell(el.parent()).index().row;
        var id = configMap.commonproblemGrid.row(rowIndex).data().id;
        openModal("查看常见问题", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
    };

    var initCommonProblemGrid = function () {
        configMap.commonproblemGrid = jqueryMap.$commonProblem.find('#commonproblem_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columnDefs":[
                {
                    "targets": [0],
                    "searchable": false
                },
                {
                    "targets": [3],
                    "searchable": false
                },
                {
                    "targets": [4],
                    "searchable": false
                }
            ],
            "columns": [
                {"data": "id"},
                {"data": "problemCategoryName"},
                {"data": "problemName"},
                {
                    "data": "enterDate",
                    "render": function (data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {
                    "render": function (data, type, row) {
                        return configMap.viewBtn_html;
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$commonProblem);
                var viewContainer = $('[data-type="view"]', jqueryMap.$commonProblem);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewCommonProblem);
                }
            }
        });
    };

    var searchCommonProblemByText = function () {
        configMap.searchCommonProblem = jqueryMap.$commonProblem.find("#searchCommonProblem");
        configMap.searchCommonProblem.on('blur', function () {
            var searchText = encodeURIComponent(configMap.searchCommonProblem.val());
            if (searchText !== '') {
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/searchCommonProblemByText?searchText=" + searchText,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (datas) {
                        configMap.commonproblemGrid.clear().draw();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.commonproblemGrid.rows.add(datas).draw();
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            } else {
                initCommonProblemData();
            }
        });
    };

    return {
        init: function (UniqueID) {
            configMap.UniqueID = UniqueID;
            setJqueryMap();
            initCommonProblemGrid();
            initCommonProblemData();
            //searchCommonProblemByText();
            jqueryMap.$commonProblem.find('#searchCommonProblem').on('keyup', function () {
                configMap.commonproblemGrid.search(this.value).draw();
            });
            /*jqueryMap.$commonProblem.find('#backToIndex').off('click').on('click', function () {
                window.location.href = configMap.path + "/index.jsp";
            });*/
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=cjwt.js