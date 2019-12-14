var wtkhxxgl = function () {

    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        id: '',
        uuid: '',
        wtkhGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改委托客户信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除委托客户信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
    };

    // 全局Dom
    var jqueryMap = {
        $wtkhJbxxDiv: null,
        $khflAddDialog: null,
        $commonproblemDialog: null,
        $container:null,
        $wtkhManageDataTable: null,
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$wtkhJbxxDiv = $('#wtkh' + uuid);
        jqueryMap.$wtkhForm = $('#addwtkuxl', jqueryMap.$wtkhJbxxDiv);
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$manualdata = jqueryMap.$wtkhJbxxDiv.find('table#wtkhlist_data');
        jqueryMap.$container = $('#wtkhList-manager-content');
        jqueryMap.$wtkhManageDataTable = $('#wtkhlist_data', jqueryMap.$container);
    };

    var initWtkhGrid = function () {
        configMap.wtkhGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "ajax": {
                "url": configMap.path + '/khgl/getWtkhAll',
                "dataSrc": "aaData",
                "data": function (data) {
                    data.searchText = $('[name="ckhmc"]',jqueryMap.$wtkhJbxxDiv).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox" id="wtkh_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "render": function (data, type, row) {
                        return  configMap.editBtn_html + configMap.deleBtn_html;
                    }
                },
                {
                    class:"text-center",
                    "data": "khmc"
                },
                {
                    class:"text-center",
                    "data":"lxdh"
                },
                {
                    class:"text-center",
                    "data": "sfmc"
                },
                {
                    class:"text-center",
                    "data": "csmc"
                },
                {
                    class:"text-center",
                    "data": "xjmc"
                },
                {
                    class:"text-center",
                    "data": "xxdz"
                },
                {
                    class:"text-center",
                    "data": "yzbm"
                },
                {
                    class:"text-center",
                    "data": "yx"
                },
                {
                    class:"text-center",
                    "data": "lxr"
                },
                {
                    class:"text-center",
                    "data": "bz"
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
                var editContainer = jqueryMap.$wtkhJbxxDiv.find('[name="contractedit"]');
                var deleteContainer = jqueryMap.$wtkhJbxxDiv.find('[name="contractdelete"]');

                var daoRuwtkhxxContainer=$("#btn_daoruwtkhxx");//导入

                $('[data-toggle="tooltip"]').tooltip();

                if (editContainer.length > 0){
                    editContainer.off('click').on('click', editQywt);
                }

                if(deleteContainer.length > 0){
                    deleteContainer.off('click').on('click', delQywt);
                }

                if(daoRuwtkhxxContainer.length>0){//导入
                    daoRuwtkhxxContainer.off('click').on('click',daoRuWtkhxx);
                }
            }
        });
    };
    //导入委托客户信息
    var daoRuWtkhxx = function () {
        openModalWtrkxx("导入Execl表格","/customermanage/marketManage/importWtkhxxExcel.jsp","daoru",function () {
            setInExcelWtkhxx.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                    configMap.wtkhGrid.clear().draw();
                    configMap.wtkhGrid.ajax.reload();
                }else {
                    jqueryMap.$ypManageDialog.modal('hide');
                }
            });
        });
    }

    //打开模态框组件
    var openModalWtrkxx = function (title, url, type, func) {
        var dialogButtons = {};
        if (type === 'daoru') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
        }

        $.get(url, function (html) {

            jqueryMap.$ypManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    var delQywt = function () {
        var el = $(this);
        var rowIndex = configMap.wtkhGrid.cell(el.parent()).index().row;
        var id = configMap.wtkhGrid.row(rowIndex).data().id;
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url: configMap.path + "/khgl/delkhxx/" + id,
                            type: 'POST',
                            success: function (result) {
                                if (result.success) {
                                    configMap.wtkhGrid.ajax.reload();
                                    Messenger().post({
                                        message: "删除成功",
                                        type: 'info',
                                        id: "ordermessenger"
                                    });
                                } else {
                                    Messenger().post({
                                        message: result.message,
                                        type: 'error',
                                        id: "ordermessenger"
                                    });
                                }
                            },
                            error: function () {
                                Messenger().post({
                                    message: "删除失败！",
                                    type: 'error',
                                    id: "ordermessenger"
                                });
                            }
                        });
                    }
                },
                cancel: {
                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                    className: 'btn btn-default borderRadius4'
                }


            }
        });
    };

    var editQywt = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.wtkhGrid.cell(el.parent()).index().row;
        var id = configMap.wtkhGrid.row(rowIndex).data().id;
        var xhs = id;
        $("#myModal").modal();
        finn(xhs);
    };
    var finn = function (xhs) {
        var id = xhs;
        $.ajax({
            url: "/customermanage/khgl/getKhxx/" + id,
            type: "POST",
            success: function (result) {
                if (result.success) {
                    var data = result.data;
                    $('input[name="khmc"]', jqueryMap.$wtkhForm).val(data.khmc);//委托单位名称
                    $('input[name="lxdh"]', jqueryMap.$wtkhForm).val(data.lxdh);//联系电话
                    $('#customerProvince', jqueryMap.$wtkhForm).val(data.sfdm);//省份代码
                    getCity(data.csdm, data.xjdm);
                    $('input[name="xxdz"]', jqueryMap.$wtkhForm).val(data.xxdz); //所属街道
                    $('input[name="yzbm"]', jqueryMap.$wtkhForm).val(data.yzbm);//邮政编码
                    $('input[name="yx"]', jqueryMap.$wtkhForm).val(data.yx);//邮箱
                    $('input[name="lxr"]', jqueryMap.$wtkhForm).val(data.lxr);//联系人
                    $('input[name="bz"]', jqueryMap.$wtkhForm).val(data.bz);//备注
                    $('input[name="khid"]', jqueryMap.$wtkhForm).val(data.id);//备注
                } else {
                    Messenger().post({
                        message: "数据加载失败",
                        type: 'warning'
                    });
                }
            }
        });
    };
    // $.ajax({
    //     url: '/customermanage/khgl/getKhxx?id=' + configMap.id,
    //     type: 'POST',
    //     success: function (result) {
    //         if (result.success) {
    //             var data = result.data;
    //             $('input[name="khmc"]', jqueryMap.$wtkhForm).val(data.khmc);//委托单位名称
    //             $('input[name="lxdh"]', jqueryMap.$wtkhForm).val(data.lxdh);//联系电话
    //             $('#customerProvince', jqueryMap.$wtkhForm).val(data.sfdm);//省份代码
    //             getCity(data.csdm, data.xjdm);
    //             $('input[name="xxdz"]', jqueryMap.$wtkhForm).val(data.xxdz); //所属街道
    //             $('input[name="yzbm"]', jqueryMap.$wtkhForm).val(data.yzbm);//邮政编码
    //             $('input[name="yx"]', jqueryMap.$wtkhForm).val(data.yx);//邮箱
    //             $('input[name="lxr"]', jqueryMap.$wtkhForm).val(data.lxr);//联系人
    //             $('input[name="bz"]', jqueryMap.$wtkhForm).val(data.bz);//备注
    //         } else {
    //             Messenger().post({
    //                 message: "数据加载失败",
    //                 type: 'warning'
    //             });
    //         }
    //     }
    // });

//获取省
    var getProvince = function () {
        $.get('/commonmanager/xzqy/sj', function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].sjdm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerProvince', jqueryMap.$wtkhJbxxDiv));
            }
            if (configMap.id != "") { //有值
                initWtkhData();
            }
            //$('#customerProvince', jqueryMap.$wtkhJbxxDiv).val(configMap.szsf);
            // $('#customerProvince', jqueryMap.$wtkhJbxxDiv).select2({
            //     placeholder: '选择省份',
            //     width: '186px',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
            //getCity(configMap.szcs);
        });
    }

    var getCity = function (e, f) {
        $('#customerZone', jqueryMap.$wtkhJbxxDiv).empty();
        var v = $('#customerProvince', jqueryMap.$wtkhJbxxDiv).val();
        $.get('/commonmanager/xzqy/xjXzqy?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerZone', jqueryMap.$wtkhJbxxDiv));
            }
            $('#customerZone', jqueryMap.$wtkhJbxxDiv).val(e);
            getCounty(f);
            // $('#customerZone', jqueryMap.$wtkhJbxxDiv).select2({
            //     placeholder: '选择地级市/区',
            //     width: '186px',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
        });
    }

    var getCounty = function (e) {
        $('#customerCity', jqueryMap.$wtkhJbxxDiv).empty();
        var v = $('#customerZone', jqueryMap.$wtkhJbxxDiv).val();
        $.get('/commonmanager/xzqy/xjXzqy?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerCity', jqueryMap.$wtkhJbxxDiv));
            }
            $('#customerCity', jqueryMap.$wtkhJbxxDiv).val(e);
            // $('#customerZone', jqueryMap.$wtkhJbxxDiv).select2({
            //     placeholder: '选择地级市/区',
            //     width: '186px',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
        });
    }

    // var initWtkhData = function () {
    //     $.ajax({
    //         url: '/customermanage/khgl/getKhxx?id=' + configMap.id,
    //         type: 'POST',
    //         success: function (result) {
    //             if (result.success) {
    //                 var data = result.data;
    //                 $('input[name="khmc"]', jqueryMap.$wtkhForm).val(data.khmc);//委托单位名称
    //                 $('input[name="lxdh"]', jqueryMap.$wtkhForm).val(data.lxdh);//联系电话
    //                 $('#customerProvince', jqueryMap.$wtkhForm).val(data.sfdm);//省份代码
    //                 getCity(data.csdm, data.xjdm);
    //                 $('input[name="xxdz"]', jqueryMap.$wtkhForm).val(data.xxdz); //所属街道
    //                 $('input[name="yzbm"]', jqueryMap.$wtkhForm).val(data.yzbm);//邮政编码
    //                 $('input[name="yx"]', jqueryMap.$wtkhForm).val(data.yx);//邮箱
    //                 $('input[name="lxr"]', jqueryMap.$wtkhForm).val(data.lxr);//联系人
    //                 $('input[name="bz"]', jqueryMap.$wtkhForm).val(data.bz);//备注
    //             } else {
    //                 Messenger().post({
    //                     message: "数据加载失败",
    //                     type: 'warning'
    //                 });
    //             }
    //         }
    //     });
    // }

    var checkData = function () {
        var khmc = $('input[name="khmc"]', jqueryMap.$wtkhForm).val(); //客户名称

        if (khmc == "undefined" || khmc == null || khmc == "") {
            Messenger().post({
                message: "客户名称不得为空！",
                type: 'warning'
            });
            return false;
        }
        return true;
    }

    var addkhxx = function () {
        var check = checkData();
        if (!check) {
            return false;
        }
        var sfdm = $('#customerProvince', jqueryMap.$wtkhForm).val();//省份代码
        var csdm = $('#customerZone', jqueryMap.$wtkhForm).val();
        var xjdm = $('#customerCity', jqueryMap.$wtkhForm).val();
        var sfmc = '';
        var csmc = '';
        var xjmc = '';
        if (sfdm == "undefined" || sfdm == null || sfdm == "") {
            sfdm = 0 //省份代码
        } else {
            sfmc = $('#customerProvince option:selected', jqueryMap.$wtkhForm).text();//省份代码
        }
        if (csdm == "undefined" || csdm == null || csdm == "") {
            csdm = 0 //城市代码
        } else {
            csmc = $('#customerZone option:selected', jqueryMap.$wtkhForm).text();//城市代码
        }
        if (xjdm == "undefined" || xjdm == null || xjdm == "") {
            xjdm = 0 //县级代码
        } else {
            xjmc = $('#customerCity option:selected', jqueryMap.$wtkhForm).text();//县级代码
        }

        var datas = "{" +
            "\"khmc\":\"" + $('input[name="khmc"]', jqueryMap.$wtkhForm).val() + "\"," + //客户名称
            "\"lxdh\":\"" + $('input[name="lxdh"]', jqueryMap.$wtkhForm).val() + "\"," + //联系电话
            "\"sfdm\":\"" + sfdm + "\"," + //所在地区
            "\"csdm\":\"" + csdm + "\"," + //所在地区
            "\"xjdm\":\"" + xjdm + "\"," + //所在地区
            "\"sfmc\":\"" + sfmc + "\"," + //城市名称
            "\"csmc\":\"" + csmc + "\"," + //城市名称
            "\"xjmc\":\"" + xjmc + "\"," + //城市名称
            "\"xxdz\":\"" + $('input[name="xxdz"]', jqueryMap.$wtkhForm).val() + "\"," + //详细地址
            "\"yzbm\":\"" + $('input[name="yzbm"]', jqueryMap.$wtkhForm).val() + "\"," + //邮政编码
            "\"yx\":\"" + $('input[name="yx"]', jqueryMap.$wtkhForm).val() + "\"," + //邮箱
            "\"lxr\":\"" + $('input[name="lxr"]', jqueryMap.$wtkhForm).val() + "\"," + //联系人
            "\"bz\":\"" + $('input[name="bz"]', jqueryMap.$wtkhForm).val() + "\"," + //备注
            "}"; //备注
        var id = $('input[name="khid"]', jqueryMap.$wtkhForm).val();

        if (id != '') {
            url = '/customermanage/khgl/updateKhxx/' + id;
            type = 'POST';
        }else {
            var url = '/customermanage/khgl/addkhxx';
            var type = 'POST';
        }

        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: datas,
            success: function (result) {
                if (result.success) {
                    configMap.wtkhGrid.ajax.reload();
                    Messenger().post({
                        message: "保存成功",
                        type: 'info',
                        id: "ordermessenger"
                    });
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'error',
                        id: "ordermessenger"
                    });
                }
            },
            error: function () {
                Messenger().post({
                    message: "保存失败！",
                    type: 'error',
                    id: "ordermessenger"
                });
            }
        });
    };

    //全选
    var selectAllWtkh = function (status) {
        $('[type="checkbox"]', jqueryMap.$wtkhManageDataTable).prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$wtkhManageDataTable).not(jqueryMap.$container.find('[name="selectwtkhlist"]'));
        var temp = null;
        wtkhjson = [];
        $(inputjson).each(function () {
            temp = {wtkh: $(this).attr('id').substring(3)};
            wtkhjson.push(temp);
        });
    };

    return {
        // 初始化
        init: function (id, uuid, szsf, szcs) {
            configMap.uuid = uuid;
            configMap.id = id;
            setJqueryMap(uuid);
            var tabid = $('#wtkh' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid,wtkhxxgl );
            jqueryMap.$wtkhJbxxDiv.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            //获得省
            getProvince();
            //获得市
            $('#customerProvince', jqueryMap.$wtkhJbxxDiv).off().on('change', function () {
                getCity();
            });
            //获得县
            $('#customerZone', jqueryMap.$wtkhJbxxDiv).off().on('change', function () {
                getCounty();
            });

            initWtkhGrid();
            //保存
            $('#addkhxx').off().on('click', function () {
                addkhxx();
            });

            //查询
            $("#wtkhSearch",jqueryMap.$wtkhJbxxDiv).off('click').on('click',function (){
                configMap.wtkhGrid.ajax.reload();
            });

            //点击选择所有(委托客户)
            jqueryMap.$container.find('[name="selectwtkhlist"]').change(function () {
                var el = $(this);
                selectAllWtkh(el.is(':checked'));
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;

        }
    };

}();
