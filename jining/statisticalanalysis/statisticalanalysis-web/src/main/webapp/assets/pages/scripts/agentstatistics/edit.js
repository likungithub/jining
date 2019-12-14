var customerManageedit = function () {
    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/customermanage/ptkhxx/findCustomer',
        tableDataUrl: '/customermanage/ptkhxx/getTableData',
        dataUrlUpdate: '/customermanage/ptkhxx/updateCustomer',
        dateUrl: '/customermanage/customerManage',
        appUrl: '/customermanage/customerManage/app.jsp',
        systempath: '/systemmanager',
        fileUrl: '/customermanage/customerManage/customerFile.jsp',
        addkhflPageUrl: '/customermanage/customerManage/khflAdd.jsp',
        khdm: '',
        validationRule: {},
        szEditGrid: null,
        zydm: '',
        nsrsbh: '',
        gsmc: '',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-trash" style="font-size:15px;"></i></a>'
    };
    // 全局Dom
    var jqueryMap = {
        $customerManageEditForm: null,
        $setfile: null,
        $appZH: null,
        $khflAddDialog: null
    };

    var setJqueryMap = function () {
        jqueryMap.$customerManageEditForm = $('#customerManageEditForm');
        jqueryMap.$szEditDataTable = $('#szEditData', jqueryMap.$customerManageEditForm);
    };

    //加载税种
    var getSz = function () {
        $("#selectSz", jqueryMap.$customerManageEditForm).empty();
        $.ajax({
            url: configMap.systempath + '/tax/getTax',
            dataType: 'JSON',
            type: 'GET',
            success: function (dataghs) {
                if (dataghs != "") {
                    $("#selectSz", jqueryMap.$customerManageEditForm).append("<option></option>")
                    for (var i = 0; i < dataghs.length; i++) {
                        $("#selectSz", jqueryMap.$customerManageEditForm).append("<option value='" + dataghs[i].taxcode + "'>" + dataghs[i].taxName + "</option>");
                    }
                }
                $('#selectSz', jqueryMap.$customerManageEditForm).select2({
                    placeholder: '请选择税种',
                    width: '100%',
                    allowClear: false,
                    language: 'zh-CN'
                });

                getCustomerStyle();

            }
        });
    };

    //主管会计
    var getKhzg = function (khdm) {
        $("#khzg", jqueryMap.$customerManageEditForm).empty();
        $.ajax({
            url: configMap.dateUrl + '/getAllYgList',
            dataType: 'JSON',
            type: 'GET',
            success: function (dataghs) {
                if (dataghs != "") {
                    for (var i = 0; i < dataghs.length; i++) {
                        $("#khzg", jqueryMap.$customerManageEditForm).append("<option value='" + dataghs[i].zydm + "_" + dataghs[i].name + "'>" + dataghs[i].name + "</option>");
                    }
                }
                $('#khzg', jqueryMap.$customerManageEditForm).select2({
                    placeholder: '请选择主管会计',
                    width: '186px',
                    allowClear: false,
                    language: 'zh-CN'
                });

                //加载税种
                getSz();
            }
        });
    };

    //加载日期
    var getrq = function () {
        $("#selectBsrq").empty();
        $.ajax({
            url: configMap.path + configMap.dateUrl + '/getDays',
            dataType: 'TEXT',
            type: 'GET',
            success: function (dataghs) {
                if (dataghs != "") {
                    var days = dataghs.split(',');
                    $("#selectBsrq").append("<option></option>")
                    for (var i = 0; i < days.length; i++) {
                        $("#selectBsrq").append("<option value='" + days[i] + "'>" + days[i] + "</option>");
                    }
                }
                $('#selectBsrq').select2({
                    placeholder: '次月报税日期',
                    width: '100%',
                    allowClear: false,
                    language: 'zh-CN'
                });
            }
        });
    };

    //在div中添加选择的内容
    var szAdd = function () {
        var sz = $('#selectSz').val(); //税种
        var szmc = $('#selectSz').find("option:selected").text(); //税种名称
        var sbzq = $('#selectSbzq').val(); //申报周期代码
        var sbzqmc = $('#selectSbzq').find("option:selected").text(); //申报周期代码
        var bsrq = $('#selectBsrq').val(); //报税日期
        var bsy = $('#selectBsy').val(); //报税月

        var data = configMap.szEditGrid.data(); //获得表中全部数据

        if (sz == null || sz == "") {

            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'warning',
                message: '请选择一个税种！',
                icon: 'fa fa-warning'
            });
            return false;

        } else if (sbzq == null || sbzq == "") {

            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'warning',
                message: '请选择申报周期！',
                icon: 'fa fa-warning'
            });
            return false;

        } else if (sbzq == 004) { //选择年报时
            if (bsy == null || bsy == "") {

                App.alert({
                    container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'warning',
                    message: '请选择报税月份！',
                    icon: 'fa fa-warning'
                });
                return false;

            }
        } else {
            bsy = null;
        }
        if (bsrq == null || bsrq == "") {

            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'warning',
                message: '请选择报税日期！',
                icon: 'fa fa-warning'
            });
            return false;

        } else {
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                //处理报税月份不存在的情况
                if (d.bsyf == "undefined" || d.bsyf == null || d.bsyf == "") {
                    d.bsyf = null;
                }
                if (d.zsxmDm === sz && d.sbzqDm === sbzq) {

                    App.alert({
                        container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'warning',
                        message: '该税务提醒已存在！',
                        icon: 'fa fa-warning'
                    });
                    return false;

                }
            }

            var result = new Object();
            result.zsxmDm = sz;
            result.zsxmMc = szmc;
            result.sbzqDm = sbzq;
            result.sbzqMc = sbzqmc;
            if (sbzq == 004) { //选择年报时
                bsrq = bsy + '-' + bsrq;
            }
            result.bsrq = bsrq;
            configMap.szEditGrid.row.add(result).draw();

        }
    };

    //删除选中行
    var del = function (event, el) {

        var rowIndex = configMap.szEditGrid.cell(el.closest('td')).index().row;
        var sbzqDm = configMap.szEditGrid.row(rowIndex).data().sbzqDm;
        var zsxmDm = configMap.szEditGrid.row(rowIndex).data().zsxmDm;
        var data = {
            szdm: zsxmDm,
            rqdm: sbzqDm,
            khbm: configMap.khdm
        };

        $.ajax({
            url: "/customermanage/ptkhxx/deleteSwtx",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                configMap.szEditGrid.row(rowIndex).remove().draw(false);
            },
            error: function () {
                Messenger().post({
                    message: '删除失败！',
                    type: 'error'
                });
            }
        });

//        bootbox.dialog({
//            title: '提示',
//            message: '<p>确定删除？</p>',
//            className:'mdawei',
//            buttons: {
//                success: {
//                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
//                    className: "btn btn-danger borderRadius4",
//                    callback: function () {
//                        $.ajax({
//                            url: "/customermanage/ptkhxx/deleteSwtx",
//                            type: 'POST',
//                            dataType: 'JSON',
//          		          	contentType: 'application/json; charset=utf-8',
//          		          	data: JSON.stringify(data),
//                            success: function (result) {
//                            	configMap.szEditGrid.row(rowIndex).remove().draw(false);
//                            },
//                            error: function () {
//                                Messenger().post({
//                                    message: '删除失败！',
//                                    type: 'error'
//                                });
//                            }
//                        });
//                    }
//                },
//                cancel: {
//                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
//                    className: 'btn btn-default borderRadius4'
//                }
//            }
//        });		
    };

    var updatecustomer = function (callback) {
        var blockTarget = jqueryMap.$customerManageEditForm.closest(".modal-content");
        var tableData = '[';
        for (var i = 0; i <= 100; i++) {
            var d = configMap.szEditGrid.row(i).data(); //获取每行数据的对象
            if (typeof(d) == "undefined") {//数据为空，不存在的时候为[]
                if (i == 0) {//若第一行为undefined，代表数据未填写，弹出提醒
                    tableData = tableData + ']';
                } else {//不为第一行undefined,代表合计行数据，正常保存
                    tableData = tableData.substring(0, tableData.length - 1);
                    tableData = tableData + ']';
                    break;
                }
            } else {
                var dataStr = JSON.stringify(d); //对象转字符串
                tableData = tableData + dataStr + ',';
            }
            ;
        }

        var oswdjh = $('input[name="nsrsbh"]', jqueryMap.$customerManageEditForm).val();
        var osfz = $('input[name="sfzh"]', jqueryMap.$customerManageEditForm).val();
        var ofrdb = $('input[name="frdb"]', jqueryMap.$customerManageEditForm).val();
        var ozzjgdm = $('input[name="zzjgdm"]', jqueryMap.$customerManageEditForm).val();
        var osjhm = $('input[name="sjhm"]', jqueryMap.$customerManageEditForm).val();
        var oqq = $('input[name="qq"]', jqueryMap.$customerManageEditForm).val();
        var omail = $('input[name="email"]', jqueryMap.$customerManageEditForm).val();
        var ogsm = $('input[name="gsmc"]', jqueryMap.$customerManageEditForm).val();
        var okhzg = $('#khzg', jqueryMap.$customerManageEditForm).val(); //主管会计
        var clrq = $('input[name="createDate"]', jqueryMap.$customerManageEditForm).val(); //成立日期
        var ksdzrq = $('input[name="startDate"]', jqueryMap.$customerManageEditForm).val(); //开始代账日期
        var sl = $('input[name="sl"]', jqueryMap.$customerManageEditForm).val() == "" ? 0 : $('input[name="sl"]', jqueryMap.$customerManageEditForm).val(); //税率
        var o_zzsxz = $('#zzsxz', jqueryMap.$customerManageEditForm).val(); //增值税性质代码
        if (o_zzsxz == null || o_zzsxz == "undefined" || o_zzsxz == undefined) {
            o_zzsxz = "001";
        }

        var o_khfl = $('#customerStyle', jqueryMap.$customerManageEditForm).val(); //客户分类代码
        if (o_khfl == null || o_khfl == "undefined" || o_khfl == undefined) {
            o_khfl = "001";
        }

        var sfdm = $('#loc_province', jqueryMap.$customerManageEditForm).val();//省份代码
        var csdm = $('#loc_city', jqueryMap.$customerManageEditForm).val();

        if (clrq == "undefined" || clrq == null || clrq == "") {
            clrq = "\"clrq\":" + null + ","//成立日期
        } else {
            clrq = "\"clrq\":\"" + clrq + "\","//成立日期
        }

        if (ksdzrq == "undefined" || ksdzrq == null || ksdzrq == "") {
            ksdzrq = "\"ksdzrq\":" + null + ","//开始代账日期
        } else {
            ksdzrq = "\"ksdzrq\":\"" + ksdzrq + "\","//开始代账日期
        }

        if (sfdm == "undefined" || sfdm == null || sfdm == "") {
            sfdm = 0 //省份代码
        }

        if (csdm == "undefined" || csdm == null || csdm == "") {
            csdm = 0 //城市代码
        }

        var datas = "{\"yhmc\":\"" + $('input[name="gsjc"]').val() + "\"," + //客户名称
            "\"gsmc\":\"" + $('input[name="gsmc"]').val() + "\"," + //公司名称
            "\"khflDm\":\"" + o_khfl + "\"," + //客户分类
            "\"hyml\":\"" + $('#ML').val() + "\"," + //行业门类
            "\"hydl\":\"" + $('#DL').val() + "\"," + //行业大类
            "\"sfdm\":\"" + sfdm + "\"," + //所在地区
            "\"csdm\":\"" + csdm + "\"," + //所在地区
            "\"frdb\":\"" + $('input[name="frdb"]').val() + "\"," + //法人代表
            "\"sfzhm\":\"" + $('input[name="sfzh"]').val() + "\"," + //身份证号
            "\"yyzz\":\"" + $('input[name="yyzz"]').val() + "\"," + //营业执照号
            "\"zzjgdm\":\"" + $('input[name="zzjgdm"]').val() + "\"," + //组织机构代码
            clrq + //成立日期
            ksdzrq + //开始代账日期
            "\"bzxx\":\"" + $('input[name="bzxx"]').val() + "\"," + //备注信息
            "\"hgdm\":\"" + $('input[name="hgdm"]').val() + "\"," + //海关代码
            "\"zydm\":\"" + $('#khzg').val() + "\"," + //主管会计
            "\"lxrmc\":\"" + $('input[name="lxr"]').val() + "\"," + //联系人
            "\"bgdh\":\"" + $('input[name="bgdh"]').val() + "\"," + //办公电话
            "\"sjhm\":\"" + $('input[name="sjhm"]').val() + "\"," + //手机号码
            "\"czhm\":\"" + $('input[name="czhm"]').val() + "\"," + //传真号码
            "\"qq\":\"" + $('input[name="qq"]').val() + "\"," + //qq
            "\"email\":\"" + $('input[name="email"]').val() + "\"," + //email
            "\"qtxx\":\"" + $('input[name="qt"]').val() + "\"," + //其他信息
            "\"xxdz\":\"" + $('input[name="xxdz"]').val() + "\"," + //详细地址
            "\"zzsxzDm\":\"" + o_zzsxz + "\"," + //增值税性质
            "\"sl\":" + sl + "," + //税率
            "\"nsrsbh\":\"" + $('input[name="nsrsbh"]').val() + "\"," + //税务登记号
            "\"nsrbm\":\"" + $('input[name="nsrbm"]').val() + "\"," + //纳税人编号
            "\"zgswfj\":\"" + $('input[name="zgswfj"]').val() + "\"," + //主管税务分局
            "\"swzlbz\":\"" + $('input[name="swzlbz"]').val() + "\"," + //税务资料备注
            "\"qyztDm\":\"" + $('input[name="qyzt"]:checked').val() + "\"," + //签约状态
            "\"fwztDm\":\"" + $('input[name="fwzt"]:checked').val() + "\"," + //服务状态
            "\"ztztDm\":\"" + $('input[name="ztzt"]:checked').val() + "\"," + //账套创建
            "\"khdjDm\":\"" + $('input[name="khjb"]:checked').val() + "\"," + //客户级别
            "\"ptSwtxlist\":" + tableData + "}";
        var url = configMap.path + configMap.dataUrlUpdate + "/" + configMap.id + "/"
            + configMap.khdm + "/" + configMap.zydm + "/" + configMap.nsrsbh + "/" + configMap.gsmc;
        var requestType = 'POST';
        if (oswdjh == "undefined" || oswdjh == null || oswdjh == "") {
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '税务登记号不能为空！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (!whetherOrNotNsrbh(oswdjh)) {
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '税务登记号请输入15-18位数字，字母或数字与字母组合！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (ogsm == "undefined" || ogsm == null || ogsm == "") { //验证公司名称
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '公司名不能为空！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (ofrdb == "undefined" || ofrdb == null || ofrdb == "") { //验证法人代表
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '法人代表不能为空！',
                icon: 'fa fa-warning'
            });
            return false;

        } else if (osfz == "undefined" || osfz == null || osfz == "") {
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '身份证号码不能为空！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (!whetherOrNotID(osfz)) { //验证身份证号码
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '身份证号码不合法！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (!(ozzjgdm == "undefined" || ozzjgdm == null || ozzjgdm == "") && !whetherOrNotZZJGDM(ozzjgdm)) { //组织机构代码
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '组织机构代码为8位或9位，大写字母与数字组合！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (okhzg == "undefined" || okhzg == null || okhzg == "") { //组织机构代码
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '主管会计不能为空！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (osjhm == "undefined" || osjhm == null || osjhm == "") {
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '手机号码不能为空！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (!whetherOrNotMobil(osjhm)) {
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '手机号码应为11位数字！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (!(oqq == "undefined" || oqq == null || oqq == "") && !whetherOrNotQQ(oqq)) {
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: 'qq号码为至少5位数字！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if (!(omail == "undefined" || omail == null || omail == "") && !whetherOrNotEmail(omail)) {
            App.alert({
                container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '邮箱输入错误！',
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            App.blockUI({
                target: blockTarget,
                boxed: true,
                message: '正在保存数据...'
            });
            $.ajax({
                url: url,
                type: requestType,
                contentType: 'application/json; charset=utf-8',
                data: datas,
                success: function (result) {
                    App.unblockUI(blockTarget);
                    if (result.success) {
                        callback(true);
                    } else {
                        App.alert({
                            container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: result.message,
                            icon: 'fa fa-warning'
                        });
                        callback(false);
                    }

                },
                error: function (result) {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '更新失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            });
        }
    };

    var findCustomers = function (khdm) {
        var url = configMap.path + configMap.dataUrl + "/" + khdm;
        var requestType = 'POST';
        $.ajax({
            url: url,
            type: requestType,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                $('input[name="gsjc"]', jqueryMap.$customerManageEditForm).val(result.khxx.yhmc);
                $('input[name="nsrsbh"]', jqueryMap.$customerManageEditForm).val(result.khxx.nsrsbh); // 税务登记号
                $('input[name="gsmc"]', jqueryMap.$customerManageEditForm).val(result.khxx.gsmc); // 公司名称
                $('#customerStyle', jqueryMap.$customerManageEditForm).val(result.khxx.khflDm).trigger("change");// 客户分类
                $("#ML", jqueryMap.$customerManageEditForm).val(result.khxx.hyml).trigger('change');// 行业门类
                $("#loc_province", jqueryMap.$customerManageEditForm).val(result.khxx.sfdm).trigger('change');
                $('input[name="frdb"]', jqueryMap.$customerManageEditForm).val(result.khxx.frdb); // 法人代表
                $('input[name="sfzh"]', jqueryMap.$customerManageEditForm).val(result.khxx.sfzhm); // 身份证号
                $('input[name="yyzz"]', jqueryMap.$customerManageEditForm).val(result.khxx.yyzz); // 营业执照号
                $('input[name="zzjgdm"]', jqueryMap.$customerManageEditForm).val(result.khxx.zzjgdm);// 组织机构代码
                $('.createDate', jqueryMap.$customerManageEditForm).datepicker('update', moment(result.khxx.clrq).format('YYYY-MM-DD'));// 成立日期
                $('.startDate', jqueryMap.$customerManageEditForm).datepicker('update', moment(result.khxx.ksdzrq).format('YYYY-MM-DD'));// 开始代账日期
                $('input[name="bzxx"]', jqueryMap.$customerManageEditForm).val(result.khxx.bzxx); // 备注信息
                $('input[name="hgdm"]', jqueryMap.$customerManageEditForm).val(result.khxx.hgdm); // 海关代码
                $("#khzg", jqueryMap.$customerManageEditForm).val(result.khxx.zydm + "_" + result.khxx.zyxm).trigger("change"); // 主管会计
                $('input[name="lxr"]', jqueryMap.$customerManageEditForm).val(result.khxx.lxrmc);// 联系人
                $('input[name="bgdh"]', jqueryMap.$customerManageEditForm).val(result.khxx.bgdh); // 办公电话
                $('input[name="sjhm"]', jqueryMap.$customerManageEditForm).val(result.khxx.sjhm);// 手机号码
                $('input[name="czhm"]', jqueryMap.$customerManageEditForm).val(result.khxx.czhm);// 传真号码
                $('input[name="qq"]', jqueryMap.$customerManageEditForm).val(result.khxx.qq);// qq
                $('input[name="email"]', jqueryMap.$customerManageEditForm).val(result.khxx.email); // email
                $('input[name="qt"]', jqueryMap.$customerManageEditForm).val(result.khxx.qtxx);// 其他信息
                $('input[name="xxdz"]', jqueryMap.$customerManageEditForm).val(result.khxx.xxdz); // 详细地址
                $('#zzsxz', jqueryMap.$customerManageEditForm).val(result.khxx.zzsxzDm).trigger("change"); // 增值税性质
                $('input[name="sl"]', jqueryMap.$customerManageEditForm).val(result.khxx.sl);// 税率
                $('input[name="nsrbm"]', jqueryMap.$customerManageEditForm).val(result.khxx.nsrbm);// 纳税人编码
                $('input[name="zgswfj"]', jqueryMap.$customerManageEditForm).val(result.khxx.zgswfj); // 主管税务分局
                $('input[name="swzlbz"]', jqueryMap.$customerManageEditForm).val(result.khxx.swzlbz); // 税务资料备注
                $('input[name="qyzt"][value=' + result.khxx.qyztDm + ']', jqueryMap.$customerManageEditForm).iCheck('check'); //签约状态
                $('input[name="fwzt"][value=' + result.khxx.fwztDm + ']', jqueryMap.$customerManageEditForm).iCheck('check'); //服务状态
                $('input[name="ztzt"][value=' + result.khxx.ztztDm + ']', jqueryMap.$customerManageEditForm).iCheck('check'); //账套状态
                $('input[name="khjb"][value=' + result.khxx.khdjDm + ']', jqueryMap.$customerManageEditForm).iCheck('check'); //客户等级
                configMap.zydm = result.khxx.zydm; //职员代码
                configMap.nsrsbh = result.khxx.nsrsbh; //纳税人识别号
                configMap.gsmc = result.khxx.gsmc; //纳税人识别号
                InitTableDate(khdm);
                getCity(result.khxx.csdm);
                getDL(result.khxx.hydl);
            },
            error: function () {
                App.alert({
                    container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: "该客户已停止服务或信息加载失败！",
                    icon: 'fa fa-warning'
                });
            }

        });
    }

    //加载表中数据
    var InitTableDate = function (khdm) {
        $.ajax({
            url: configMap.path + configMap.tableDataUrl + "?khdm=" + khdm,
            dataType: 'JSON',
            type: 'GET',
            success: function (result) {
                configMap.szEditGrid.clear().draw();
                configMap.szEditGrid.rows.add(result).draw();
            }
        });
    }

    var customerManageEditValidation = function () {
        jqueryMap.$customerManageEditForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: configMap.validationRule,
            messages: { // 自定义显示消息
            },
            errorPlacement: function (error, element) { // 为每种input设置错误输出位置
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) {
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr(
                        "data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) {
                    error.appendTo(element.parents('.radio-list').attr(
                        "data-error-container"));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element) { // 高亮显示控件form-group和has-error都是样式类
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) { // 取消高亮显示
                $(element).closest('.form-group').removeClass('has-error');
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
            }
        });
    };

    //获取省
    var getProvince = function () {
        $.get(configMap.path + '/commonmanager/xzqy/sj', function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].sjdm + '">' + data[i].xzqhMc + '</option>').appendTo($('#loc_province', jqueryMap.$customerManageEditForm));
            }
            $('#loc_province', jqueryMap.$customerManageEditForm).select2({
                placeholder: '选择省份',
                width: '186px',
                allowClear: true,
                language: 'zh-CN'
            });
            //获得门类
            getML();
        });
    }


    var getCity = function (e) {
        $('#loc_city', jqueryMap.$customerManageEditForm).empty();
        var v = $('#loc_province', jqueryMap.$customerManageEditForm).val();
        $.get(configMap.path + '/commonmanager/xzqy/xjXzqy?sjdm=' + v, function (data) {
            for (i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#loc_city', jqueryMap.$customerManageEditForm));
            }
            $('#loc_city', jqueryMap.$customerManageEditForm).val(e);
            $('#loc_city', jqueryMap.$customerManageEditForm).select2({
                placeholder: '选择地级市/区',
                width: '186px',
                allowClear: true,
                language: 'zh-CN'
            });
        });
    }

    //获得门类
    var getML = function () {
        $.get(configMap.path + '/commonmanager/xzqy/ML', function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].hydm + '">' + data[i].hymc + '</option>').appendTo($('#ML', jqueryMap.$customerManageEditForm));
            }
            $('#ML', jqueryMap.$customerManageEditForm).select2({
                placeholder: '选择门类',
                width: '186px',
                allowClear: true,
                language: 'zh-CN'
            });

            //根据所选数据的客户代码查询数据
            findCustomers(configMap.khdm);
        });
    };

    var getDL = function (e) {
        $('#DL', jqueryMap.$customerManageEditForm).empty();
        var v = $('#ML', jqueryMap.$customerManageEditForm).val();
        $.get(configMap.path + '/commonmanager/xzqy/DL?sjdm=' + v, function (data) {
            for (i = 0; i < data.length; i++) {
                $('<option value="' + data[i].hydm + '">' + data[i].hymc + '</option>').appendTo($('#DL', jqueryMap.$customerManageEditForm));
            }
            $('#DL', jqueryMap.$customerManageEditForm).val(e);
            $('#DL', jqueryMap.$customerManageEditForm).select2({
                placeholder: '选择大类',
                width: '186px',
                allowClear: true,
                language: 'zh-CN'
            });
        });
    }


    var getCustomerStyle = function () {
        $('#customerStyle', jqueryMap.$customerManageEditForm).empty();
        var custorStyleNum = [];
        $.ajax({
            url: 'systemmanager/customertype/customertype',
            type: "get",
            dataType: "json",
            success: function (data) {
                for (var j = 0; j < data.length; j++) {
                    custorStyleNum.push(data[j].khfl_mc);
                }
                //客户分类
                $('#customerStyle', jqueryMap.$customerManageEditForm).select2({
                    data: custorStyleNum,
                    placeholder: '请选择',//默认文字提示
                    language: "zh-CN",//汉化
                    allowClear: false,//允许清空
                    width: '156px',
                });
                for (var j = 0; j < data.length; j++) {
                    $("#customerStyle option").eq(j).val(data[j].khfl_dm);
                }
                ;

                //增值税性质
                getZZSXZ();
            },
            error: function (result) {
            }
        });
    }

    var getZZSXZ = function () {
        var zzsxz = [];
        $.ajax({
            url: 'customermanage/customerManage/getParams/ZZSXZ',
            type: "get",
            dataType: "json",
            success: function (data) {
                for (var j = 0; j < data.length; j++) {
                    zzsxz.push(data[j].paramsname);
                }
                //增值税性质
                $('#zzsxz', jqueryMap.$customerManageEditForm).select2({
                    data: zzsxz,
                    placeholder: '请选择',//默认文字提示
                    language: "zh-CN",//汉化
                    allowClear: true,//允许清空
                    width: '196px',
                });
                for (var j = 0; j < data.length; j++) {
                    $("#zzsxz option").eq(j).val(data[j].typecode);
                }
                ;
                //获得省
                getProvince();
            },
            error: function (result) {

            }
        });
    }

    //新增客户分类
    var khflAddFun = function () {
        openModal('新增客户分类', configMap.path + configMap.addkhflPageUrl, 'edit', function () {
            khflAdd.saveKhfl(function (result) {
                if (result) {
                    jqueryMap.$khflAddDialog.modal('hide');

                    //重新加载客户分类
                    $('#customerStyle', jqueryMap.$customerManageEditForm).empty();
                    var custorStyleNum = [];
                    $.ajax({
                        url: 'systemmanager/customertype/customertype',
                        type: "get",
                        dataType: "json",
                        success: function (data) {
                            for (var j = 0; j < data.length; j++) {
                                custorStyleNum.push(data[j].khfl_mc);
                            }
                            //客户分类
                            $('#customerStyle', jqueryMap.$customerManageEditForm).select2({
                                data: custorStyleNum,
                                placeholder: '请选择',//默认文字提示
                                language: "zh-CN",//汉化
                                allowClear: false,//允许清空
                                width: '156px',
                            });
                            for (var j = 0; j < data.length; j++) {
                                $("#customerStyle option").eq(j).val(data[j].id);
                            }
                            ;
                        }
                    });

                } else {
                    App.alert({
                        container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '客户分类增加失败',
                        icon: 'fa fa-warning'
                    });
                    jqueryMap.$khflAddDialog.modal('hide');
                }
            });
        });
    }

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

    var initszEditGrid = function () {
        configMap.szEditGrid = jqueryMap.$szEditDataTable.DataTable({
            "dom": 'rt<"row"><"clear">',
            "ordering": false,
            "destroy": true,
            "autoWidth": false,
            "columns": [
                {"data": "zsxmDm"},
                {"data": "zsxmMc"},
                {"data": "sbzqDm"},
                {"data": "sbzqMc"},
                {
                    "data": "bsrq",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            return 1;
                        } else {
                            return data;
                        }
                    }
                },
                {
                    "render": function (data, type, row) {
                        return configMap.deleteBtn_html;
                    }
                }
            ],
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [2],
                    "visible": false,
                    "searchable": false
                }
            ],
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$szEditDataTable);
                var delContainer = $('[data-type="del"]', jqueryMap.$szEditDataTable);

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": del,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
            }
        });
    }

    var getFilesize = function () {
        $.ajax({
            url: 'customermanage/ptkhxx/getFileSize/' + configMap.khdm,
            type: "get",
            dataType: "json",
            success: function (data) {
                $("#addfiles").html("添加附件（" + data.size + "）")
            },
            error: function (result) {
            }
        });
    };

    return {
        // 初始化
        init: function (khdm, id) {
            configMap.khdm = khdm;
            configMap.id = id;
            /**
             * select2及数据展示加载顺序为：
             * 1.加载主管会计
             * 2.加载税种
             * 3.客户分类
             * 4.增值税性质
             * 5.加载省
             * 6.加载门类
             * 7.加载数据
             * 8.加载市及大类
             */
            //加载主管会计
            getKhzg();
            setJqueryMap();
            initszEditGrid();
            $('.createDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $('.startDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            //申报周期
            $('#selectSbzq', jqueryMap.$customerManageEditForm).select2({
                placeholder: '请选择申报周期',
                width: '100%',
                allowClear: false,
                language: 'zh-CN'
            });
            //月份
            $('#selectBsy', jqueryMap.$customerManageEditForm).select2({
                placeholder: '请选择月份',
                width: '100%',
                allowClear: false,
                language: 'zh-CN'
            });

            //添加
            $('#szAdd', jqueryMap.$customerManageEditForm).off().on('click', function () {
                szAdd();
            });

            //加载日期
            getrq();
            //获得市
            $('#loc_province', jqueryMap.$customerManageEditForm).off().on('change', function () {
                getCity();
            });
            //获得大类
            $('#ML', jqueryMap.$customerManageEditForm).off().on('change', function () {
                getDL();
            });

            //添加新的客户分类
            $('#khflAdd', jqueryMap.$customerManageEditForm).off().on('click', function () {
                khflAddFun();
            });

            jqueryMap.$customerManageEditForm.find('input[name=sl]').keyup(function (event) {
                checkMoney($(this), event);
            });
            //控件验证
            customerManageEditValidation();
            configMap.validationRule = {
                name: {
                    required: true
                },
                nsrsbh: {
                    required: true
                },
                gsmc: {
                    required: true
                },
                frdb: { //法人代表
                    required: true
                },
                sfzh: { //身份证号
                    minlength: 15,
                    required: true
                },
                szdq: { //所在地区
                    digits: true
                },
                startDate: {
                    required: true
                },
                phone: {
                    minlength: 11,
                    required: true
                },
                email: {
                    email: true
                },
                sl: {
                    number: true
                }
            };
            //获取附件数量
            getFilesize();
            //客户附件
            jqueryMap.$customerManageEditForm.find('button#addfiles').off('click').on('click', function () {
                var dialogButtons = {
                };
                dialogButtons.success = {
                    label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                    className: "btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4",
                    callback: function () {
                        Customerfiles.getfile(function (result) {
                            if (result) {
                                jqueryMap.$setfile.modal('hide');
                                $("#addfiles").html("添加附件(" + sessionStorage.getItem("filesize") + ")");
                            }
                        });
                        return false;
                    }
                };
                $.get(configMap.path + configMap.fileUrl + "?uuid=" + configMap.khdm, function (html) {
                    jqueryMap.$setfile = bootbox.dialog({
                        title: '添加附件',
                        message: html,
                        buttons: dialogButtons
                    });
                });
            });
          //APP账户修改
            jqueryMap.$customerManageEditForm.find('button#changApp').off('click').on('click', function () {
            	var nsrsbh = $('input[name="nsrsbh"]', jqueryMap.$customerManageEditForm).val(); //纳税人识别号
            	if (nsrsbh == "" || nsrsbh == null) {
            		Messenger().post({
                        message: '请先填写税务登记号！',
                        type: 'warning'
                      });
            		return false;
            	} else {
            		var dialogButtons = {};
                    dialogButtons.success = {
                        label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                        className: "btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4",
                        callback: function () {
                        	AppSave.saveZh(function (result) {
                                if (result) {
                                    jqueryMap.$appZH.modal('hide');
                                }
                            });
                            return false;
                        }
                    };
                    dialogButtons.cancel = {
                            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                            className: 'btn borderRadius4 color666'
                        }
                    $.get(configMap.path + configMap.appUrl + "?nsrsbh=" + encodeURI(nsrsbh), function (html) {
                        jqueryMap.$appZH = bootbox.dialog({
                            title: 'App账户',
                            message: html,
                            buttons: dialogButtons
                        });
                    });
            	}
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },
        // 保存雇员信息，参数为回掉函数
        updatecustomer: function (callback) {

            updatecustomer(callback);
        }
    };
}();