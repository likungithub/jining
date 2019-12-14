/**
 * 企业委托登记模块 弹出框中显示 委托客户信息管理
 **/
var  CustomerInformation_chakanlist = function () {
    //全局属性参数
    var configMap = {
        path: "",
        htcxGrid: null,
        id: '',
        uuid:'',
        puuid:''
    };
    //全局Dom
    var jqueryMap = {
        $container: null,
        $ManageDataTable: null,
        $blockTarget: null,
        $ManageDialog: null,
        $qywtJbxxDiv: null
    };
    var setJqueryMap = function (uuid) {
        console.log('puuid:'+configMap.puuid);
        jqueryMap.$qywtJbxxDiv = $('#qywt_jbxx' + configMap.puuid);
        jqueryMap.$qywtForm = $('#add_form', jqueryMap.$qywtJbxxDiv);
        jqueryMap.$container = $('#CustomerInformation_chankan' + uuid);
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = jqueryMap.$container.find('table#CustomerInformation_chakan_table');
    };

    var initGrid = function () {
        configMap.htcxGrid =jqueryMap.$ManageDataTable.dataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "ajax":{
                "url": '/customermanage/zfwt/queryAllCustomerInformation',
                "dataSrc": "aaData",
                "data": function (data) {
                    data.searchText = $('[name="khmc"]',jqueryMap.$container).val();
                },
            },
            "columns": [
                {
                    "data": "id",
                    "sWidth": "20px",
                    "render": function (data) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '" id="jcxm_' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "khmc",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "lxdh",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "sfmc",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    data: "csmc",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    data: "xxdz",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    data: "lxr",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container).tooltip();

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                console.log("数据加载完成后执行");
                console.log(jqueryMap);
                /*模态框数据回显*/
                var PreservationCustomerInformation = $('#CustomerInformation_bc');
                PreservationCustomerInformation.off('click').on('click',function () {
                    var ids =[];
                    var Check = $("table input[type=checkbox]:checked");//在table中找input下类型为checkbox属性为选中状态的数据
                    console.log(Check);

                    if (Check.length != 1){
                        Messenger().post({
                            message: "请选择一条客户信息！",
                            type: 'error',
                            id: "ordermessenger"
                        });
                        return ;
                    } else {
                        Check.each(function () {
                            console.log($(this).attr('id'));
                            var id = $(this).attr('id').substring(5);
                            ids.push(id);
                        });
                        $.ajax({
                            url:"customermanage/zfwt/queryCustomerInformation",
                            type:"POST",
                            contentType: 'application/json; charset=UTF-8',
                            dataType: 'JSON',
                            data:JSON.stringify(ids),
                            success:function (result) {
                                
                                console.log(result.success);
                                if (result.success) {
                                    var data = result.data;
                                    console.log(data);
                                    $("#customerName").val(data.KHMC); //客户名称
                                    $("#customerPhone").val(data.LXDH);//联系方式
                                    $("#postalCode").val(data.YZBM);//邮政编码
                                    $("#customerProvince").val(data.SFDM);//所属省
                                    getCity(data.SFDM,data.CSDM,data.XJDM);
                                    $("#customerStreet").val(data.XXDZ);//详细地址
                                    $("#beizhu").val(data.BZ);//备注
                                } else {
                                    Messenger().post({
                                        message: "数据加载失败",
                                        type: 'warning'
                                    });
                                }
                            }
                        });
                    }
                });

            }
        })
    }
    //获取省
    var getProvince = function () {
        $.get(configMap.path + '/commonmanager/xzqy/sj', function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].sjdm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerProvince', jqueryMap.$qywtJbxxDiv));
            }
        });
    }

    var getCity = function (SFDM,CSDM,XJDM) {
        console.log(jqueryMap.$qywtJbxxDiv)
        $('#customerZone', jqueryMap.$qywtJbxxDiv).empty();
        var v=SFDM;//('#customerProvince',jqueryMap.$qywtJbxxDiv).val();
        $.get('/commonmanager/xzqy/xjXzqy?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerZone', jqueryMap.$qywtJbxxDiv));
            }
            $('#customerZone', jqueryMap.$qywtJbxxDiv).val(CSDM);
            getCounty(CSDM,XJDM);
        });
    }

    var getCounty = function (CSDM,XJDM) {
        $('#customerCity', jqueryMap.$qywtJbxxDiv).empty();
        var v = CSDM;//$('#customerZone', jqueryMap.$qywtJbxxDiv).val();
        $.get('/commonmanager/xzqy/xjXzqy?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerCity', jqueryMap.$qywtJbxxDiv));
            }
            $('#customerCity', jqueryMap.$qywtJbxxDiv).val(XJDM);
        });
    }
    return {
        init:function (id,uuid,puuid) {

            configMap.uuid = uuid;
            configMap.id = id;
            configMap.puuid = puuid;
            setJqueryMap(uuid);

            jqueryMap.$container.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            initGrid();

            //获得省
            // getProvince();
            //获得市
            $('#customerProvince', jqueryMap.$qywtJbxxDiv).off().on('change', function () {
                getCity();
            });
            //获得县
            $('#customerZone', jqueryMap.$qywtJbxxDiv).off().on('change', function () {
                getCounty();
            });
        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
    //End
}();