var ypqcl_query = function () {

    // 全局属性参数
    var configMap = {
        path: '',
        uuid: '',
        ypqclGrid: null,
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $ManageDataTable: null,
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#ypqcl_chankan' + uuid);
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = $('#ypqcl_chankan_table', jqueryMap.$container);
    };

    var initYpqclGrid = function () {
      //  configMap.ypqclGrid = jqueryMap.$ManageDataTable.DataTable({
            configMap.ypqclGrid = $("#ypqcl_chankan_table"+configMap.uuid).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "scrollX":true,//水平滚动
            "ajax": {
                "url": "customermanage/ypqcl/SGR_SampleChoiceQuery",
                "dataSrc": "aaData",
                "data": function (data) {
                },
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox" value="'+data+'" id="ypqclCK_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "data": "wtid",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypbm",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypmc",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "sb",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypsl",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
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
                $('[data-toggle="tooltip"]').tooltip();

                //模态框数据回显
                var updateContainer = $('#ypqcl_SampleSelection_btnQD');
                updateContainer.off('click').on('click',function () {
                    
                    var ids = [];
                    $('input[name="checkbox_checkbox"]:checked',jqueryMap.$container).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
                        ids.push($(this).attr('id').substring(8));//将选中的值添加到数组ids中
                    });

                    if (ids.length != 1){
                        Messenger().post({
                            message: "请选择一条样品信息！",
                            type: 'error',
                            id:"ordermessenger"
                        });
                        return ;
                    }
                    $.ajax({
                        url:"customermanage/ypqcl/ypqclAloneSampleChoic",
                        type:"POST",
                        contentType:'application/json; charset=UTF-8',
                        dataType:'JSON',
                        data:JSON.stringify(ids),
                        traditional: true,
                        success:function (data) {
                            console.log(data);
                            callBack(data);
                        }
                    })
                })
            }
        });
    };
    //数据回显
    var callBack = function (data) {
        var obj = eval(data);
        $("#ypqcl_ypid_xz").val(obj.ypid);
        $("#ypqcl_ypmc_xz").val(obj.ypmc);
        $("#ypqcl_ypbm_Xz").val(obj.ypbm);
        $("#ypqcl_wtid_xz").val(obj.wtid);
        $("#ypqcl_ypsl_Xz").val(obj.ypsl);
    }

    return {
        // 初始化
        init: function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap(uuid);

            //查询前置处理样品
            initYpqclGrid();
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
    };

}();
