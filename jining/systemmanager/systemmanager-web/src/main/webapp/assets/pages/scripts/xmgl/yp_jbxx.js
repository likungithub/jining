var Addyp = function () {

    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        dateUrl: '/customermanage/ypJbxx',
        fileUrl: '/customermanage/ypJbxx/customerFile.jsp',
        appUrl: '/customermanage/ypJbxx/app.jsp',
        tableUrl:'/customermanage/jcxm/findJcxmByYpid',
        id: '',
        type: '',
        uuid: '',
        wtid: '',
        szGrid: null,
        tableType:'0', //是初始化的还是加载的
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-trash" style="font-size:15px;"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $ypJbxxDiv: null,
        $ypJcxmListDiv: null,
        $khflAddDialog: null,
        $commonproblemDialog: null,
        $jcxmTable: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$ypJbxxDiv = $('#yp_jbxx'+ uuid);
        jqueryMap.$ypJcxmListDiv = $('#jcxmDiv'+ uuid);
        jqueryMap.$ypForm = $('#addYp_form', jqueryMap.$ypJbxxDiv);
        jqueryMap.$jcxmTable = $('#jcxmTable', jqueryMap.$ypJcxmListDiv);
    };

    var openModal1 = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    $('#addFQR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    $('#tjrmcSl',jqueryMap.$ypJbxxDiv).val($('#alreadyPer li','#allotStaffList_m').attr('user'));
                    $('#tjrmcSl1',jqueryMap.$ypJbxxDiv).val( $('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'addappcustomerinfo_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    
    var getAllContract = function () {
        $.get('/customermanage/zfwt/findAllWt', function (res) {
            if (res.success) {
                var data = res.data;
                $('#contractName', jqueryMap.$ypForm).empty();
                for (var i = 0; i < data.length; i++) {
                    $('<option value="' + data[i].wtid + "_" + data[i].htbm + "_" + data[i].type + '">' + data[i].htmc + '</option>').appendTo($('#contractName', jqueryMap.$ypForm));
                }
                //选中后的其他框加载
                initContractData();
            }
            if (configMap.id != "") { //有值
                initYpxxData();
            }
        });
    };

    var initContractData = function () { //选中后的其他框加载
        var data = $('#contractName', jqueryMap.$ypForm).val();//合同信息
        var arr = data.split("_");
        configMap.wtid = arr[0];
        $('#contractNo', jqueryMap.$ypForm).val(arr[1]);
        $('#contractType', jqueryMap.$ypForm).val(arr[2] == '001'?'政府': '企业');

    }

    var initYpxxData = function () {
        $.ajax({
            url: '/customermanage/ypgl/getYpxx?id=' + configMap.id,
            type: 'GET',
            success: function (result) {
                if(result.success) {
                    var data = result.data;
                    $('#contractName', jqueryMap.$ypForm).val(data.wtid + "_" + data.htbm + "_" + data.ht_type);
                    configMap.wtid = data.wtid;
                    $('#contractType', jqueryMap.$ypForm).val(data.ht_type);
                    $('#contractNo', jqueryMap.$ypForm).val(data.htbm);
                    $('#productClass', jqueryMap.$ypForm).val(data.cpdldm); //产品大类
                    $('#detectionCategory', jqueryMap.$ypForm).val(data.jclbdm); //检测类别
                    $('.ycbgrq', jqueryMap.$ypForm).datepicker('update', moment(data.ycbgrq).format('YYYY-MM-DD'));// 应出报告日期
                    $('input[name="ypmc"]', jqueryMap.$ypForm).val(data.ypmc); //样品名称
                    $('#sampleCharacter', jqueryMap.$ypForm).val(data.ypxtdm); //样品形态
                    $('input[name="ypsl"]', jqueryMap.$ypForm).val(data.ypsl); //样品数量
                    $('input[name="bysl"]', jqueryMap.$ypForm).val(data.bysl); //备样数量
                    $('input[name="ypdw"]', jqueryMap.$ypForm).val(data.ypdw); //样品单位
                    $('input[name="ggxh"]', jqueryMap.$ypForm).val(data.ggxh); //规格型号
                    $('input[name="ggxhdw"]', jqueryMap.$ypForm).val(data.ggxhdw); //规格型号单位
                    $('input[name="ypph"]', jqueryMap.$ypForm).val(data.ypph); //样品批号
                    $('input[name="bzq"]', jqueryMap.$ypForm).val(data.bzq); //保质期
                    $('input[name="zxbz"]', jqueryMap.$ypForm).val(data.zxbz); //执行标准/技术文件
                    $('input[name="zldj"]', jqueryMap.$ypForm).val(data.zldj); //质量等级
                    $('input[name="sb"]', jqueryMap.$ypForm).val(data.sb); //商标
                    $('#dateType', jqueryMap.$ypForm).val(data.rqlxdm); //日期类型
                    $('.rq', jqueryMap.$ypForm).datepicker('update', moment(data.rq).format('YYYY-MM-DD'));// 日期
                    $('input[name="sczmc"]', jqueryMap.$ypForm).val(data.sczmc); //生产者名称
                    $('input[name="sczdz"]', jqueryMap.$ypForm).val(data.sczdz); //生产者地址
                    $('#preservationCondition', jqueryMap.$ypForm).val(data.ypbctj); //样品保存条件
                    $('input[name="jyf"]', jqueryMap.$ypForm).val(data.jyf); //检验费
                    $('input[name="fbf"]', jqueryMap.$ypForm).val(data.fbf); //分包费
                    $('input[name="syr"]', jqueryMap.$ypForm).val(data.syr); //送样人
                    $('.sjcjrq', jqueryMap.$ypForm).datepicker('update', moment(data.sjcjrq).format('YYYY-MM-DD'));// 数据出具日期
                    $('.dysj', jqueryMap.$ypForm).datepicker('update', moment(data.dysj).format('YYYY-MM-DD'));// 到样时间
                    $('#isSubpackagedSample', jqueryMap.$ypForm).val(data.if_fb? "1":"0"); //是否分包
                    $('input[name="fbxm"]', jqueryMap.$ypForm).val(data.fbxm); //分包项目
                    $('#saveFuSample', jqueryMap.$ypForm).val(data.if_blfy? "1":"0"); //保留副样
                    $('#sampleHandleWay', jqueryMap.$ypForm).val(data.if_fhcl? "1":"0"); //检后样品处理
                    $('input[name="bgfs"]', jqueryMap.$ypForm).val(data.bgfs); //报告份数
                    $('input[name="jcxm"]', jqueryMap.$ypForm).val(data.jcxm); //检测项目
                    $('input[name="jydd"]', jqueryMap.$ypForm).val(data.jydd); //接样地点
                    $('#isUrgent', jqueryMap.$ypForm).val(data.if_jj? "1":"0"); //是否加急
                    $('input[name="bzxx"]', jqueryMap.$ypForm).val(data.bzxx);
                } else {
                    Messenger().post({
                        message: "数据加载失败",
                        type: 'warning'
                    });
                }
            }
        });
    }
    
    var saveYpxx = function () {
        var cpdldm = $('#productClass', jqueryMap.$ypForm).val(); //产品大类代码
        var cpdlmc = ''; //产品大类名称
        if (cpdldm == "undefined" || cpdldm == null || cpdldm == "") {
            cpdldm = 0 //产品大类代码
        } else {
            cpdlmc = $('#productClass option:selected', jqueryMap.$ypForm).text();//产品大类名称
        }
        var htxx = $('#contractName', jqueryMap.$ypForm).val(); //合同信息
        var htmc = ''; //合同名称
        var ht_type = ''; //合同类型
        var htbm = ''; //合同编码
        if (htxx == "undefined" || htxx == null || htxx == "") {
            configMap.wtid = ''; //产品大类代码
        } else {
            htmc = $('#contractName option:selected', jqueryMap.$ypForm).text();//合同名称
            ht_type = $('#contractType', jqueryMap.$ypForm).val();
            htbm = $('#contractNo', jqueryMap.$ypForm).val();
        }
        
        var ycbgrq = $('input[name="ycbgrq"]', jqueryMap.$ypForm).val(); //应出报告日期
        if (ycbgrq == "undefined" || ycbgrq == null || ycbgrq == "") {
            ycbgrq = "\"ycbgrq\":" + null + ","
        } else {
            ycbgrq = "\"ycbgrq\":\"" + ycbgrq + "\","
        }
        
        var rq = $('input[name="rq"]', jqueryMap.$ypForm).val(); //日期
        if (rq == "undefined" || rq == null || rq == "") {
            rq = "\"rq\":" + null + ","//日期
        } else {
            rq = "\"rq\":\"" + rq + "\","//日期
        }

        var sjcjrq = $('input[name="sjcjrq"]', jqueryMap.$ypForm).val(); //数据出具日期
        if (sjcjrq == "undefined" || sjcjrq == null || sjcjrq == "") {
            sjcjrq = "\"sjcjrq\":" + null + ","//成立日期
        } else {
            sjcjrq = "\"sjcjrq\":\"" + sjcjrq + "\","//成立日期
        }

        var dysj = $('input[name="dysj"]', jqueryMap.$ypForm).val(); //到样时间
        if (dysj == "undefined" || dysj == null || dysj == "") {
            dysj = "\"dysj\":" + null + ","//成立日期
        } else {
            dysj = "\"dysj\":\"" + dysj + "\","//成立日期
        }

        var ypsl = $('input[name="ypsl"]', jqueryMap.$ypForm).val() == "" ? 0 : $('input[name="ypsl"]', jqueryMap.$ypForm).val(); //样品数量
        var bysl = $('input[name="bysl"]', jqueryMap.$ypForm).val() == "" ? 0 : $('input[name="bysl"]', jqueryMap.$ypForm).val(); //备样数量
        var jyf = $('input[name="jyf"]', jqueryMap.$ypForm).val() == "" ? 0 : $('input[name="jyf"]', jqueryMap.$ypForm).val(); //检验费
        var fbf = $('input[name="fbf"]', jqueryMap.$ypForm).val() == "" ? 0 : $('input[name="fbf"]', jqueryMap.$ypForm).val(); //分包费
        var bgfs = $('input[name="bgfs"]', jqueryMap.$ypForm).val() == "" ? 0 : $('input[name="bgfs"]', jqueryMap.$ypForm).val(); //报告份数

        var datas = "{\"ypmc\":\"" + $('input[name="ypmc"]', jqueryMap.$ypForm).val() + "\"," + //样品名称
            "\"cpdldm\":\"" + cpdldm + "\"," + //产品大类代码
            "\"cpdlmc\":\"" + cpdlmc + "\"," + //产品大类名称
            "\"jclbdm\":\"" + $('#detectionCategory', jqueryMap.$ypForm).val() + "\"," + //检测类别代码
            "\"wtid\":\"" + configMap.wtid + "\"," + //委托id
            "\"htmc\":\"" + htmc + "\"," + //合同名称
            "\"htbm\":\"" + htbm + "\"," + //合同编码
            "\"ht_type\":\"" + ht_type + "\"," + //合同类型
            ycbgrq + //应出报告日期
            "\"ypxtdm\":\"" + $('#sampleCharacter', jqueryMap.$ypForm).val() + "\"," + //样品形态
            "\"ypsl\":" + ypsl + "," + //样品数量
            "\"bysl\":" + bysl + "," + //备样数量
            "\"ypdw\":\"" + $('input[name="ypdw"]', jqueryMap.$ypForm).val() + "\"," + //样品单位
            "\"ggxh\":\"" + $('input[name="ggxh"]', jqueryMap.$ypForm).val() + "\"," + //规格型号
            "\"ggxhdw\":\"" + $('input[name="ggxhdw"]', jqueryMap.$ypForm).val() + "\"," + //规格型号单位
            "\"ypph\":\"" + $('input[name="ypph"]', jqueryMap.$ypForm).val() + "\"," + //样品批号
            "\"bzq\":\"" + $('input[name="bzq"]', jqueryMap.$ypForm).val() + "\"," + //保质期
            "\"zxbz\":\"" + $('input[name="zxbz"]', jqueryMap.$ypForm).val() + "\"," + //执行标准/技术文件
            "\"zldj\":\"" + $('input[name="zldj"]', jqueryMap.$ypForm).val() + "\"," + //质量等级
            "\"sb\":\"" + $('input[name="sb"]', jqueryMap.$ypForm).val() + "\"," + //商标
            "\"rqlxdm\":\"" + $('#dateType', jqueryMap.$ypForm).val() + "\"," + //日期类型
            rq + //日期
            "\"sczmc\":\"" + $('input[name="sczmc"]', jqueryMap.$ypForm).val() + "\"," + //生产者名称
            "\"sczdz\":\"" + $('input[name="sczdz"]', jqueryMap.$ypForm).val() + "\"," + //生产者地址
            "\"ypbctj\":\"" + $('#preservationCondition', jqueryMap.$ypForm).val() + "\"," + //样品保存条件
            "\"jyf\":" + jyf + "," + //检验费
            "\"fbf\":" + fbf + "," + //分包费
            "\"syr\":\"" + $('input[name="syr"]', jqueryMap.$ypForm).val() + "\"," + //送样人
            sjcjrq + //数据出具日期
            dysj + // 到样日期
            "\"if_fb\":\"" + $('#isSubpackagedSample', jqueryMap.$ypForm).val() + "\"," + //是否分包
            "\"fbxm\":\"" + $('input[name="fbxm"]', jqueryMap.$ypForm).val() + "\"," + //分包项目
            "\"if_blfy\":\"" + $('#saveFuSample', jqueryMap.$ypForm).val() + "\"," + //是否保留副样
            "\"if_fhcl\":\"" + $('#sampleHandleWay', jqueryMap.$ypForm).val() + "\"," + //检后样品处理(是否返还)
            "\"bgfs\":" + bgfs + "," + //报告份数
            "\"jcxm\":\"" + $('input[name="jcxm"]', jqueryMap.$ypForm).val() + "\"," + //检测项目
            "\"jydd\":\"" + $('input[name="jydd"]', jqueryMap.$ypForm).val() + "\"," + //接样地点
            "\"if_jj\":\"" + $('#isUrgent', jqueryMap.$ypForm).val() + "\"," + //是否加急
            "\"bzxx\":\"" + $('input[name="bzxx"]', jqueryMap.$ypForm).val() + "\""
            + "}"; //备注

        var url = '/customermanage/ypgl/saveYpxx/' + configMap.uuid;
        var type = 'POST';
        if (configMap.id != '') {
            url = '/customermanage/ypgl/updateYpxx/' + configMap.id;
            type = 'POST';
        }

        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: datas,
            success: function (result) {
                if (result.success) {
                    //关闭当前选项卡
                    var  id = 'ypxx_info';
                    var el = $("#tab-page-nav-" + id);
                    var nextSelect = el.closest("li").prev('li:not(.dropdown)');
                    if (nextSelect.length === 0) {
                        nextSelect = el.closest("li").next('li:not(.dropdown)')
                    }
                    if (nextSelect.length === 0) {
                        nextSelect = el.closest("ul.close-tab-nav")
                            .children('li:not(.dropdown)')
                            .last();
                    }
                    //标签移除
                    el.remove();
                    //内容移除
                    $("#tab-page-content-" + id).remove();

                    $('li[role = "presentation"].active').removeClass('active');
                    $('div[role = "tabpanel"].active').removeClass('active');
                    if (nextSelect.length > 0) {
                        $(nextSelect).find('a').tab('show');
                    };
                    ypTable_data.reload();
                } else {
                    Messenger().post({
                        message: result.message,
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
    
    var initDTdata = function () {
        configMap.szGrid = jqueryMap.$jcxmTable.DataTable({
            "dom": 'rt<"row"><"clear">',
            "ordering": false,
            "autoWidth": false,
            "pageLength": 50,
            "lengthMenu": [10, 20, 50, 100],
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "ajax": {
                "url": configMap.tableUrl,
                "dataSrc": "aaData",
                "cache":false,
                "data": function (data) {
                    if(configMap.type === 'add') { //如果是新增
                        data.ypid = configMap.uuid;
                    } else {
                        data.ypid = configMap.id;
                    }
                    //data.type = configMap.tableType; //判断加载顺序
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
                    "data": "zwmcBm",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="color:#666">' + data + '</span>';
                    }
                },

                {
                    "data": "jcx",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="color:#666">' + data + '</span>';
                    }

                },
                {
                    "data": "xlz",
                    className:'text-center',
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="color:#666">' + data + '</span>';
                    }
                },
                {
                    "data": "xlzmrz",
                    className:'text-center',
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="color:#666">' + data + '</span>';
                    }
                },
                {
                    "data": "jldw",
                    className:'text-center',
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="color:#666">' + data + '</span>';
                    }
                }

            ],
        });

        $('tbody', jqueryMap.$jcxmTable).on('click', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.szGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.szGrid.row('.success');
            }
        });
    };
    
    var chooseJcxm = function () {
        if(configMap.type === 'add') { //如果是新增
            generateTab(this, configMap.path + '/marketManage/jcxmlist.jsp?ypid=' + configMap.uuid, "检测项目列表", "jcxmList_info", 'fa fa-file-text-o iconMr');
        } else {
            generateTab(this, configMap.path + '/marketManage/jcxmlist.jsp?ypid=' + configMap.id, "检测项目列表", "jcxmList_info", 'fa fa-file-text-o iconMr');
        }
    }

    var generateTab = function(_target, srcStr, menuName, id,icon) {
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
                title: '<i class="'+icon +'"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    };

    var reload = function () {
        configMap.szGrid.ajax.reload();
    }

    return {
        // 初始化
        init: function (id, uuid, type) {
            configMap.uuid = uuid;
            configMap.id = id;
            configMap.type = type;
            setJqueryMap(uuid);
            tabMenu('yp_info');
            jqueryMap.$ypJbxxDiv.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            
            //加载合同名称
            getAllContract();

            if (id != "") { //代表编辑
                $('#saveYpxx', jqueryMap.$ypJbxxDiv).html('<i class="fa fa-plus iconMr"></i>保存');
                //configMap.tableType = '1';
                //样品信息
                initYpxxData();
            }
            //加载所有检测项目
            initDTdata();

            //保存
            $('#saveYpxx', jqueryMap.$ypJbxxDiv).off().on('click',function () {
                saveYpxx();
            });

            //下拉框改变
            $('#contractName', jqueryMap.$ypForm).off().on('change',function () {
                initContractData();
            });

            //选择检测项目
            $('#chooseJcxm', jqueryMap.$ypJbxxDiv).off().on('click',function () {
                chooseJcxm();
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;

        },
        saceYp: function (callback) {
            saveYp(callback);
        },
        initDataTable:function () {
            reload();
        }
    };
}();
