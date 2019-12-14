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

/*global $, App, moment, jQuery, bootbox, employeeEdit */
var report = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/report/samples',
        parseUrl:'/parsereport/parse/',
        setReportUrl:'/reportmanager/item-report.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        reportGrid: null,
        viewPageUrl: '/reportmanager/report-view.jsp',
        currentRowIndex:0,
        fetchBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="fetch" data-toggle="tooltip" title="读取报告信息"><i class="fa fa-edit"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查阅报告信息"><i class="fa fa-search"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $reportDialog: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
    };

    var initReportGrid = function () {
        configMap.reportGrid = $('#report_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columns": [
                {"data": "ypbm"},
                {"data": "ypmc"},
                {"data": "wtid"},
                {"data": "dwmc"},
                {"data": "sfmc"},
                {"data": "csmc"},
                {"data": "xjmc"},
                {"data": "lxdh"},

                {
                    "render": function (data, type, row) {
                        return configMap.fetchBtn_html  + configMap.viewBtn_html;
                    }
                }
            ],
            "language": {
                url: configMap.path + configMap.datatablesLanguageFile
            },
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]');
                var fetchContainer = $('[data-type="fetch"]');
                var viewContainer = $('[data-type="view"]');

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (fetchContainer.length > 0) {
                    fetchContainer.off('click').on('click', fetchPdf);
                }

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewReport);
                }
            }
        });
    };

    var initReportData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.reportGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.reportGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var fetchPdf = function () {
        var el = $(this);
        configMap.currentRowIndex = configMap.reportGrid.cell(el.parent()).index().row;
        var sampleId=configMap.reportGrid.row(configMap.currentRowIndex).data().id;
        openModal('提示信息', configMap.path + configMap.setReportUrl+'?sampleId='+sampleId, 'fetch');
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {
            cancel: {
                label: '关闭',
                className: 'btn-default'
            }
        };

        $.get(url, function (html) {
            jqueryMap.$reportDialog = bootbox.dialog({
                title: title,
                size:"large",
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var viewReport = function () {
        var el = $(this);
        var rowIndex = configMap.reportGrid.cell(el.parent()).index().row;
        var sampleId = configMap.reportGrid.row(rowIndex).data().id;
        openModal("报告信息", configMap.path + configMap.viewPageUrl + "?sampleId=" + encodeURI(sampleId), 'view');
    };

    var viewReport2 = function () {
        var sampleId = configMap.reportGrid.row(configMap.currentRowIndex).data().id;
        openModal("报告信息", configMap.path + configMap.viewPageUrl + "?sampleId=" + encodeURI(sampleId), 'view');
    };

    var doSearch=function (ele,colIndex) {
        configMap.reportGrid.columns(colIndex).search( ele.value ).draw();
    };

    return {
        init: function () {
            $('#btnQuery').off('click').on('click', function () {
                initReportData();
            });

            $( '#keyContactName' ).on( 'keyup change', function () {
                doSearch(this,2);
            } );
            $( '#keySampleName' ).on( 'keyup change', function () {
                doSearch(this,1);
            } );

            setJqueryMap();
            initReportGrid();
            initReportData();
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=report.js