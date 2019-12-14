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
var reportView = function () {
    'use strict';

    var configMap = {
        path: '',
        dataUrl: '/report/view/',
        reportGrid:null,
        sampleId:'',
        itemId:'',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        pdfBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="pdf" data-toggle="tooltip" title="详情">详情</a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="delete" data-toggle="tooltip" title="删除">删除</a>'
    };// 全局Dom
    var jqueryMap = {
        $blockTarget: null
    };

    var initGrid=function(){
        configMap.reportGrid = $('#report_details').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            autoWidth:false,
            scrollX:true,
            "columns": [
                {"data": "itemName"},
                {"data": "labName"},
                {"data": "instrument"},
                {"data": "user"},
                {"data": "batch"},
                {"data": "fileName"},
                {"data": "sampleType"},
                {"data": "vialPosition"},
                {"data": "acquisitionDate",
                    render: function (data) {
                        if (data) {
                            return moment(data).format('YYYY-MM-DD');
                        }
                    }
                },
                {"data": "injectionVolume"},
                {"data": "compoundName"},
                {"data": "totalArea"},
                {"data": "retentionTime"},
                {"data": "calculatedAmount"},
                {"data": "units"},
                {"data": "uploadedBy"},
                {"data": "uploadedAt"},
                {
                    "render": function (data, type, row) {
                        return configMap.pdfBtn_html  + configMap.deleteBtn_html;
                    }
                }
            ],
            "columnDefs":[{
                "targets": [0,1,2,3,4],
                "render": $.fn.dataTable.render.ellipsis()
            }],
            "language": {
                url: configMap.path + configMap.datatablesLanguageFile
            },
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]');
                var pdfContainer = $('[data-type="pdf"]');
                var deleteContainer = $('[data-type="delete"]');

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (pdfContainer.length > 0) {
                    pdfContainer.off('click').on('click', openPdf);
                }

                if (deleteContainer.length > 0) {
                    deleteContainer.off('click').on('click', deleteReport);
                }
            }
        });
    };

    var getDetail = function () {
        $.ajax({
            url: configMap.path + configMap.dataUrl + configMap.sampleId+"/"+configMap.itemId,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.reportGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.reportGrid.rows.add(datas).draw();
                }
            },
            error: function (ex) {
                console.log(ex);
            }
        });
    };

    var testData=function(){
        var datas=[{
            itemName:"温度",
            labName:"Default Laboratory",
            instrument:"Thermo Scientific Instrument ",
            user:"Quantum",
            batch:"LMS_0623 ",
            fileName:"1PPB",
            sampleType:"CalStd",
            vialPosition:"BB1",
            acquisitionDate:"2016-06-23 11:56:00",
            injectionVolume:"10",
            compoundName:"LMS",
            totalArea:"6393",
            retentionTime:"4.87",
            calculatedAmount:"0.99",
            units:"",
            uploadedBy:"",
            uploadedAt:""
        }];
        configMap.reportGrid.clear().draw();
        configMap.reportGrid.rows.add(datas).draw();
    };

    var openPdf=function(){
        var el = $(this);
        var rowIndex = configMap.reportGrid.cell(el.parent()).index().row;
        var sampleId=configMap.sampleId;
        var itemId=configMap.reportGrid.row(rowIndex).data().itemId;
        var url=configMap.path+'/report/getSampleItem/'+sampleId+'/'+itemId;
        $.ajax({
            url:url,
            type:"GET",
            async:false,
            success:function(item){
                if (item != null&&item!=undefined&&item.fileName!="") {
                    var signer=item.updatedBy;
                    var fileName=item.fileName;
                    var features = "Resizable=yes, toolbar=0, scrollbars=yes, status=no, location=no, width=" + window.screen.width + ", height=" + window.screen.height + ", left=0, top=0";
                    try{
                        window.open(configMap.path+'/reportmanager/pdf-viewer.jsp?name=' + escape(fileName)+"&signer="+escape(signer), '文件预览', features);
                    }catch(ex){
                        console.log(ex.responseText);
                    }
                }
                else {
                    Messenger().post("查看详情失败!");
                }
            },
            error:function(ex){
                console.log(ex.responseText);
            }
        });
    };

    var deleteReport=function(){
        var el = $(this);
        var rowIndex = configMap.reportGrid.cell(el.parent()).index().row;
        var id = configMap.reportGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + "/report/delete/" + id,
            type: 'DELETE',
            success: function (result) {
                getDetail();
                Messenger().post("删除成功!");
            },
            error: function () {
                Messenger().post({
                    message: "删除失败!",
                    type: 'error'
                });
            }
        });
    };

    return {
        init: function (sampleId,itemId) {
            configMap.sampleId=sampleId;
            configMap.itemId=itemId;
            jqueryMap.$blockTarget = $('body');

            initGrid();
            getDetail();
            //testData();
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=reportview.js