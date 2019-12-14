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

var changeHistory = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/changeHistory/getChangeHistoryData'
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $changeHistoryDataTable: null
    };
    var setJqueryMap = function () {
        jqueryMap.$container = $('#changeHistory-manager-content');
        jqueryMap.$changeHistoryDataTable = $('#changeHistory_data', jqueryMap.$container);
    };

    var initchangeHistoryGrid;
    initchangeHistoryGrid = function () {
        configMap.changeHistoryGrid =
            jqueryMap.$changeHistoryDataTable.DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false,
                //"destroy": true,
                "pageLength": 50,
                "lengthMenu": [10, 20, 50, 100],
                "autoWidth": false,
                "processing": true, // 打开数据加载时的等待效果
                "serverSide": true, // 打开后台分页
                "ajax": {
                    "url": configMap.path + configMap.dataUrl,
                    "dataSrc": "aaData",
                    "cache":false,
                    "data": function (data) {
                        var text = jqueryMap.$container.find('#searchchangeHistory').val();
                        var startTime = $('[name="editStarDate"]',jqueryMap.$container).val();
                        var endTime = $('[name="editEndDate"]',jqueryMap.$container).val();
                        data.khmc = text;
                        data.startTime = startTime;
                        data.endTime = endTime;
                    }
                },
                "language": {
                    "zeroRecords": "暂时没有数据",
                    "infoEmpty": "无记录",
                    "sEmptyTable": "暂时没有数据",
                    "sInfoThousands":",",
                    "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                },
                "columns": [
                    {
                        data: "khmc"
                    },
                    {
                        className:'text-center',
                        data: "zymc_bef"
                    },
                    {
                        className:'text-center',
                        data: "zymc_cha"
                    },

                    {
                        className:'text-center',
                        data: "jlmc_bef",
                        "render": function (data, type, row) {
                            if (data == null || data == "null") {
                                return '';
                            } else {
                                return data;
                            }
                        }
                    },
                    {
                        className:'text-center',
                        data: "jlmc_cha"
                    },
                    {
                        className:'text-center',
                    	data: "lrmc"
                    },
                    {
                        className:'text-center',
                        data: "lrrq",
                        "render":function (data, type, row) {
                            return moment(data).format('YYYY-MM-DD');
                        }
                    }

                ],
            });

        $('tbody', jqueryMap.$changeHistoryDataTable).on('click', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.changeHistoryGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.changeHistoryGrid.row('.success');
            }
        });
    };

    return {
        // 初始化
        init: function (firstpage) {

            //初始化时间
            var date = (new Date()).getTime();
            //开始时间
            var dateS = moment(date-60*60*24*7*1000).format('YYYY-MM-DD');
            //结束时间
            var dateE = moment(date).format('YYYY-MM-DD');
            $('[name="editStarDate"]',jqueryMap.$container).val(dateS);
             $('[name="editEndDate"]',jqueryMap.$container).val(dateE);


            setJqueryMap();
            var tabid = $('#changeHistory-manager-content').parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);


            //搜索
            $('#btnchangeHistorySearch', jqueryMap.$container).off().on('click', function () {
                configMap.changeHistoryGrid.ajax.reload();
            });

            jqueryMap.$container.find('.editStarDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            jqueryMap.$container.find('.editEndDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });

            //输入框绑定回车事件
			 $('[name="searchchangeHistory"]',jqueryMap.$container).keydown(function(event) {//给输入框绑定按键事件
		        if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
		        	$("#btnchangeHistorySearch",jqueryMap.$container).click();
		        }
		    });
            initchangeHistoryGrid();
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
