var Addqywt = function () {

    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        id: '',
        uuid: '',
        szGrid: null,
        ypUrl: '/customermanage/marketManage/ypList.jsp',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-trash" style="font-size:15px;"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $qywtJbxxDiv: null,
        $khflAddDialog: null,
        $commonproblemDialog: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$qywtJbxxDiv = $('#qywt_jbxx' + uuid);
        jqueryMap.$qywtForm = $('#add_form', jqueryMap.$qywtJbxxDiv);
    };

    var openModal = function (title, url, type, func) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 增&nbsp;加 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666'
        }

        $.get(url, function (html) {

            jqueryMap.$khflAddDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var initQywtData = function () {
        $.ajax({
            url: '/customermanage/zfwt/getyddcy?id=' + configMap.id,
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    var data = result.data;
                    $('input[name="cydbh"]', jqueryMap.$qywtForm).val(data.wtid);//抽样单编号
                    $('input[name="cydd"]', jqueryMap.$qywtForm).val(data.cydd);//抽样地点
                    $('input[name="cydwxxdz"]', jqueryMap.$qywtForm).val(data.cydwxxdz); //抽样单位详细地址
                    $('input[name="cydwlxr"]', jqueryMap.$qywtForm).val(data.cydwlxr);//抽样单位联系人
                    $('input[name="cydwlxdh"]', jqueryMap.$qywtForm).val(data.cydwlxdh);//抽样单位联系电话
                    $('input[name="cyfs"]', jqueryMap.$qywtForm).val(data.cyfs);//抽样方式
                    $('input[name="cyrq"]', jqueryMap.$qywtForm).val(data.cyrq);//抽样日期
                    $('input[name="sjdw"]', jqueryMap.$qywtForm).val(data.sjdw);//受检单位
                    $('[name="jylb"]', jqueryMap.$qywtForm).val(data.jylb);//检验类别
                    $('#chouyangleibie', jqueryMap.$qywtForm).val(data.cxzt);//抽样类别
                    $('input[name="bz"]', jqueryMap.$qywtForm).val(data.bz);//备注
                    $('input[name="cydbh"]', jqueryMap.$qywtForm).attr("readonly","readonly");
                    if ($('input[name="textField1"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField1"]', jqueryMap.$qywtForm).val(data.textField1);
                    }
                    if ($('input[name="textField2"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField2"]', jqueryMap.$qywtForm).val(data.textField2);
                    }
                    if ($('input[name="textField3"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField3"]', jqueryMap.$qywtForm).val(data.textField3);
                    }
                    if ($('input[name="textField4"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField4"]', jqueryMap.$qywtForm).val(data.textField4);
                    }
                    if ($('input[name="textField5"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField5"]', jqueryMap.$qywtForm).val(data.textField5);
                    }
                    if ($('input[name="textField6"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField6"]', jqueryMap.$qywtForm).val(data.textField6);
                    }
                    if ($('input[name="textField7"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField7"]', jqueryMap.$qywtForm).val(data.textField7);
                    }
                    if ($('input[name="textField8"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField8"]', jqueryMap.$qywtForm).val(data.textField8);
                    }
                    if ($('input[name="textField9"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField9"]', jqueryMap.$qywtForm).val(data.textField9);
                    }
                    if ($('input[name="textField10"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField10"]', jqueryMap.$qywtForm).val(data.textField10);
                    }
                    if ($('input[name="dateField1"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField1"]', jqueryMap.$qywtForm).val(data.dateField1);
                    }
                    if ($('input[name="dateField2"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField2"]', jqueryMap.$qywtForm).val(data.dateField2);
                    }
                    if ($('input[name="dateField3"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField3"]', jqueryMap.$qywtForm).val(data.dateField3);
                    }
                    if ($('input[name="dateField4"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField4"]', jqueryMap.$qywtForm).val(data.dateField4);
                    }
                    if ($('input[name="dateField5"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField5"]', jqueryMap.$qywtForm).val(data.dateField5);
                    }
                    if ($('input[name="dateField6"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField6"]', jqueryMap.$qywtForm).val(data.dateField6);
                    }
                    if ($('input[name="dateField7"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField7"]', jqueryMap.$qywtForm).val(data.dateField7);
                    }
                    if ($('input[name="dateField8"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField8"]', jqueryMap.$qywtForm).val(data.dateField8);
                    }
                    if ($('input[name="dateField9"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField9"]', jqueryMap.$qywtForm).val(data.dateField9);
                    }
                    if ($('input[name="dateField10"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField10"]', jqueryMap.$qywtForm).val(data.dateField10);
                    }
                    if ($('#selectField1', jqueryMap.$qywtForm)) {
                        $('#selectField1', jqueryMap.$qywtForm).val(data.selectField1);
                    }
                    if ($('#selectField2', jqueryMap.$qywtForm)) {
                        $('#selectField2', jqueryMap.$qywtForm).val(data.selectField2);
                    }
                    if ($('#selectField3', jqueryMap.$qywtForm)) {
                        $('#selectField3', jqueryMap.$qywtForm).val(data.selectField3);
                    }
                    if ($('#selectField4', jqueryMap.$qywtForm)) {
                        $('#selectField4', jqueryMap.$qywtForm).val(data.selectField4);
                    }
                    if ($('#selectField5', jqueryMap.$qywtForm)) {
                        $('#selectField5', jqueryMap.$qywtForm).val(data.selectField5);
                    }
                    if ($('#selectField6', jqueryMap.$qywtForm)) {
                        $('#selectField6', jqueryMap.$qywtForm).val(data.selectField6);
                    }
                    if ($('#selectField7', jqueryMap.$qywtForm)) {
                        $('#selectField7', jqueryMap.$qywtForm).val(data.selectField7);
                    }
                    if ($('#selectField8', jqueryMap.$qywtForm)) {
                        $('#selectField8', jqueryMap.$qywtForm).val(data.selectField8);
                    }
                    if ($('#selectField9', jqueryMap.$qywtForm)) {
                        $('#selectField9', jqueryMap.$qywtForm).val(data.selectField9);
                    }
                    if ($('#selectField10', jqueryMap.$qywtForm)) {
                        $('#selectField10', jqueryMap.$qywtForm).val(data.selectField10);
                    }
                } else {
                    Messenger().post({
                        message: "数据加载失败",
                        type: 'warning'
                    });
                }
            }
        });
    }

    var checkData = function () {
        var cydbh = $('input[name="cydbh"]', jqueryMap.$qywtForm).val(); //抽样单编号
        if (cydbh == "undefined" || cydbh == null || cydbh == "") {
            Messenger().post({
                message: "抽样单编号不得为空！",
                type: 'warning'
            });
            return false;
        }
        return true;
    }

    var saveQYWT = function () {
        var check = checkData();
        if (!check) {
            return false;
        }
        var datas = "{" +
            "\"wtid\":\"" + $('input[name="cydbh"]', jqueryMap.$qywtForm).val() + "\"," + //抽样单编号
            "\"cydd\":\"" + $('input[name="cydd"]', jqueryMap.$qywtForm).val() + "\"," + //抽样地点
            "\"cydwxxdz\":\"" + $('input[name="cydwxxdz"]', jqueryMap.$qywtForm).val() + "\"," + //抽样单位详细地址
            "\"cydwlxr\":\"" + $('input[name="cydwlxr"]', jqueryMap.$qywtForm).val() + "\"," + //抽样单位联系人
            "\"cydwlxdh\":\"" + $('input[name="cydwlxdh"]', jqueryMap.$qywtForm).val() + "\"," + //抽样单位联系电话
            "\"cyfs\":\"" + $('input[name="cyfs"]', jqueryMap.$qywtForm).val() + "\"," + //抽样方式
            "\"cyrq\":\"" + $('input[name="cyrq"]', jqueryMap.$qywtForm).val() + "\"," + //抽样日期
            "\"sjdw\":\"" + $('input[name="sjdw"]', jqueryMap.$qywtForm).val() + "\"," + //受检单位
            "\"jylb\":\"" + $('[name="jylb"]', jqueryMap.$qywtForm).val() + "\"," + //检验类别
            "\"cxzt\":\"" + $('#chouyangleibie', jqueryMap.$qywtForm).val() + "\"," + //查询状态
            "\"bz\":\"" + $('input[name="bz"]', jqueryMap.$qywtForm).val() + "\"" + //备注
            "}"; //备注
        var jsondata = JSON.parse( datas );
        if ($('input[name="textField1"]', jqueryMap.$qywtForm)) {
            jsondata.textField1 = $('input[name="textField1"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="textField2"]', jqueryMap.$qywtForm)) {
            jsondata.textField2 = $('input[name="textField2"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="textField3"]', jqueryMap.$qywtForm)) {
            jsondata.textField3 = $('input[name="textField3"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="textField4"]', jqueryMap.$qywtForm)) {
            jsondata.textField4 = $('input[name="textField4"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="textField5"]', jqueryMap.$qywtForm)) {
            jsondata.textField5 = $('input[name="textField5"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="textField6"]', jqueryMap.$qywtForm)) {
            jsondata.textField6 = $('input[name="textField6"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="textField7"]', jqueryMap.$qywtForm)) {
            jsondata.textField7 = $('input[name="textField7"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="textField8"]', jqueryMap.$qywtForm)) {
            jsondata.textField8 = $('input[name="textField8"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="textField9"]', jqueryMap.$qywtForm)) {
            jsondata.textField9 = $('input[name="textField9"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="textField10"]', jqueryMap.$qywtForm)) {
            jsondata.textField10 = $('input[name="textField10"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="dateField1"]', jqueryMap.$qywtForm)) {
            jsondata.dateField1 = $('input[name="dateField1"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="dateField2"]', jqueryMap.$qywtForm)) {
            jsondata.dateField2 = $('input[name="dateField2"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="dateField3"]', jqueryMap.$qywtForm)) {
            jsondata.dateField3 = $('input[name="dateField3"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="dateField4"]', jqueryMap.$qywtForm)) {
            jsondata.dateField4 = $('input[name="dateField4"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="dateField5"]', jqueryMap.$qywtForm)) {
            jsondata.dateField5 = $('input[name="dateField5"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="dateField6"]', jqueryMap.$qywtForm)) {
            jsondata.dateField6 = $('input[name="dateField6"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="dateField7"]', jqueryMap.$qywtForm)) {
            jsondata.dateField7 = $('input[name="dateField7"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="dateField8"]', jqueryMap.$qywtForm)) {
            jsondata.dateField8 = $('input[name="dateField8"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="dateField9"]', jqueryMap.$qywtForm)) {
            jsondata.dateField9 = $('input[name="dateField9"]', jqueryMap.$qywtForm).val();
        }
        if ($('input[name="dateField10"]', jqueryMap.$qywtForm)) {
            jsondata.dateField10 = $('input[name="dateField10"]', jqueryMap.$qywtForm).val();
        }
        if ($('#selectField1', jqueryMap.$qywtForm)) {
            console.log(JSON.stringify($('#selectField1', jqueryMap.$qywtForm).val()));
            jsondata.selectField1 = $('#selectField1', jqueryMap.$qywtForm).val();
        }
        if ($('#selectField2', jqueryMap.$qywtForm)) {
            jsondata.selectField2 = $('#selectField2', jqueryMap.$qywtForm).val();
        }
        if ($('#selectField3', jqueryMap.$qywtForm)) {
            jsondata.selectField3 = $('#electField3', jqueryMap.$qywtForm).val();
        }
        if ($('#selectField4', jqueryMap.$qywtForm)) {
            jsondata.selectField4 = $('#selectField4', jqueryMap.$qywtForm).val();
        }
        if ($('#selectField5', jqueryMap.$qywtForm)) {
            jsondata.selectField5 = $('#selectField5', jqueryMap.$qywtForm).val();
        }
        if ($('#selectField6', jqueryMap.$qywtForm)) {
            jsondata.selectField6 = $('#selectField6', jqueryMap.$qywtForm).val();
        }
        if ($('#selectField7', jqueryMap.$qywtForm)) {
            jsondata.selectField7 = $('#selectField7', jqueryMap.$qywtForm).val();
        }
        if ($('#selectField8', jqueryMap.$qywtForm)) {
            jsondata.selectField8 = $('#selectField8', jqueryMap.$qywtForm).val();
        }
        if ($('#selectField9', jqueryMap.$qywtForm)) {
            jsondata.selectField9 = $('#selectField9', jqueryMap.$qywtForm).val();
        }
        if ($('#selectField10', jqueryMap.$qywtForm)) {
            jsondata.selectField10 = $('#selectField10', jqueryMap.$qywtForm).val();
        }
        var url = '/customermanage/zfwt/saveyddcy';
        var type = 'POST';
        if (configMap.id !='') {
            url = '/customermanage/zfwt/updateyddcy/' + configMap.id;
            type = 'POST';
        }

        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(jsondata),
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message:"保存成功",
                        type:"info"
                    });
                    configMap.id = result.id;
                    yddcydList.reload();
                } else {
                     Messenger().post({
                         message:"保存失败!",
                         type: 'danger'
                    });
                 }

            },
            error: function (result) {
                $('#saveKhxx').html("保存");
                Messenger().post({
                    message: '保存失败！',
                    type: 'danger'
                });
            }
        });
    };
    var generateTab = function (_target, srcStr, menuName, id, icon) {
        //标签移除
        $("#tab-page-nav-" + id).remove();
        //内容移除
        $("#tab-page-content-" + id).remove();
        var _opt;
        var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
        if ($a_alarm.length > 0) {
            _opt = {
                title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                id: $a_alarm.data('addtab'),
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        } else {
            _opt = {
                title: '<i class="' + icon + '"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    }

    return {
        // 初始化
        init: function (id, uuid, szsf, szcs) {
            configMap.uuid = uuid;
            configMap.id = id;
            setJqueryMap(uuid);
            if(configMap.id != ""){
                initQywtData();
            }
            tabMenu('qywt_info');
            jqueryMap.$qywtJbxxDiv.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            //保存
            $('#saveQYWT').off().on('click', function () {
                saveQYWT();
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;

        }
    };

}();
