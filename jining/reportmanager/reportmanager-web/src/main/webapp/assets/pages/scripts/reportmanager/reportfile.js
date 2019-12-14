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
var reportFile= function () {
    'use strict';

    var configMap = {
        path: '',
        sampleId:'',
        itemId:'',
        dataUrl: '/report/getfiles',
        fileGrid:null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json'
    };// 全局Dom
    var jqueryMap = {
        $blockTarget: null
    };

    var initGrid=function(){
        configMap.fileGrid = $('#tFiles').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            autoWidth:false,
            "columns": [
                {"data": "fileName"}
            ],
            "columnDefs":[{
                "targets": [0],
                "render": $.fn.dataTable.render.ellipsis()
            }],
            "language": {
                url: configMap.path + configMap.datatablesLanguageFile
            }
        });

        $('#tFiles tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );
    };

    var getDetail = function () {
        $.ajax({
            url: configMap.path + configMap.dataUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.fileGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.fileGrid.rows.add(datas).draw();
                }
            },
            error: function () {
            }
        });
    };

    var getFileName=function(){
        return $('#tFiles tr.selected td').get(0).innerText;
    };

    return {
        init: function (sampleId,itemId) {
            jqueryMap.$blockTarget = $('body');
            configMap.sampleId=sampleId;
            configMap.itemId=itemId;

            initGrid();
            getDetail();
        },
        setPath: function (path) {
            configMap.path = path;
        },
        getFileName:getFileName
    };
}();
//@ sourceURL=reportfile.js