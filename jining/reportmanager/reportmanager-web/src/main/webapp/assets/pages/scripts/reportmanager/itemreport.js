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

/*global $, App, moment */
var itemReportSetter= function () {
    'use strict';

    var configMap = {
        path: '',
        dataUrl: '/report/items/',
        reportFilePageUrl:'/reportmanager/item-report-setting.jsp',
        saveSettingsUrl:'/report/setItemReport',
        parseUrl:'/parsereport/parse/',
        viewPageUrl: '/reportmanager/report-view.jsp',
        settingGrid:null,
        sampleId:'',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        setBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="set" data-toggle="tooltip" title="设置">设置</a>',
        parseBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="parse" data-toggle="tooltip" title="读取报告信息">读取报告信息</a>'
    };// 全局Dom
    var jqueryMap = {
        $blockTarget: null
    };

    var initGrid=function(){
        configMap.settingGrid = $('#itemToReport').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            autoWidth:false,
            "columns": [
                {"data": "name"},
                {"data": "fileName"},
                {
                    "render": function (data, type, row) {
                        return configMap.setBtn_html  + configMap.parseBtn_html;
                    }
                }
            ],
            "columnDefs":[{
                "targets": [0,1],
                "render": $.fn.dataTable.render.ellipsis()
            }],
            "language": {
                url: configMap.path + configMap.datatablesLanguageFile
            },
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]');
                var setContainer = $('[data-type="set"]');
                var parseContainer = $('[data-type="parse"]');

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (setContainer.length > 0) {
                    setContainer.off('click').on('click', setItemReport);
                }

                if (parseContainer.length > 0) {
                    parseContainer.off('click').on('click', parseReport);
                }
            }
        });
    };

    var getDetail = function () {
        $.ajax({
            url: configMap.path + configMap.dataUrl + configMap.sampleId,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.settingGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.settingGrid.rows.add(datas).draw();
                }
            },
            error: function () {
            }
        });
    };

    var setItemReport=function(){
        var el = $(this);
        var rowIndex = configMap.settingGrid.cell(el.parent()).index().row;
        var itemId = configMap.settingGrid.row(rowIndex).data().id;
        var dialogButtons = {
            cancel: {
                label: '关闭',
                className: 'btn-default'
            },
            success:{
                label: "关联",
                className: "btn-success",
                callback: function () {
                    var fileName=reportFile.getFileName();
                    saveSettings(configMap.sampleId,itemId,fileName);
                    return false;
                }
            }
        };

        var url=configMap.path + configMap.reportFilePageUrl+"?sampleId="+configMap.sampleId+"&itemId="+itemId;
        $.get(url, function (html) {
            jqueryMap.$reportDialog = bootbox.dialog({
                title: "选择对应的质检报告",
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var saveSettings=function(sampleId,itemId,fileName){
        $.ajax({
            url: configMap.path + configMap.saveSettingsUrl,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify({sampleId:parseInt(sampleId),id:parseInt(itemId),fileName:fileName}),
            success: function (datas) {
                jqueryMap.$reportDialog.modal('hide');
                getDetail();
            },
            error: function (ex) {
                console.log(ex);
            }
        });
    };

    var parseReport=function(){
        var dialogButtons = {
            cancel: {
                label: '关闭',
                className: 'btn-default'
            },
            success:{
                label: "查阅",
                className: "btn-success",
                callback: function () {
                    jqueryMap.$reportDialog.modal('hide');
                    viewReport();
                    return false;
                }
            }
        };

        var el = $(this);
        var rowIndex = configMap.settingGrid.cell(el.parent()).index().row;
        var itemId = configMap.settingGrid.row(rowIndex).data().id;
        var fileName=configMap.settingGrid.row(rowIndex).data().fileName;
        var url=configMap.path + configMap.parseUrl+fileName+"/"+configMap.sampleId+"/"+itemId;
        $.ajax({
            url: url,
            type: 'GET',
            success: function (message) {
                jqueryMap.$reportDialog = bootbox.dialog({
                    title: "读取报告信息",
                    message: message.message,
                    buttons: dialogButtons
                });
            },
            error: function () {
            }
        });
    };

    var viewReport = function () {
        var itemId = configMap.settingGrid.row(configMap.currentRowIndex).data().id;
        var url=configMap.path + configMap.viewPageUrl + "?sampleId=" + encodeURI(configMap.sampleId)+"&itemId="+itemId;
        $.get(url, function (html) {
            jqueryMap.$reportDialog = bootbox.dialog({
                title: "报告信息",
                size:"large",
                message: html,
                buttons: {
                    cancel: {
                        label: '关闭',
                        className: 'btn-default'
                    }
                }
            });
        });
    };

    return {
        init: function (sampleId) {
            configMap.sampleId=sampleId;
            jqueryMap.$blockTarget = $('body');

            initGrid();
            getDetail();
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=itemreport.js