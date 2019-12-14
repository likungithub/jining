var customerManage = function () {

    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/customermanage/ptkhxx/addCustomer',
        systempath: '/systemmanager',
        dateUrl: '/customermanage/customerManage',
        fileUrl: '/customermanage/customerManage/customerFile.jsp',
        appUrl: '/customermanage/customerManage/app.jsp',
        addkhflPageUrl: '/customermanage/customerManage/khflAdd.jsp',
        id: '',
        uuid: '',
        validationRule: {},
        szGrid: null,
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-trash" style="font-size:15px;"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $customerManageForm: null,
        $setfile: null,
        $appZH: null,
        $khflAddDialog: null,
        $commonproblemDialog: null,
        szsf:'',//所在省份
        szcs:''//所在城市
    };

    var setJqueryMap = function () {
        jqueryMap.$customerManageForm = $('#customerManageForm');
        jqueryMap.$szDataTable = $('#szData', jqueryMap.$customerManageForm);
    };

    var addcustomer = function (callback) {

        //股东信息
        var gdData2 = '[';
        $('.IncreaseInfoWrap', jqueryMap.$customerManageForm).each(function(){
            var target = $(this);
            var gdxm = target.find('input[name="gdxm"]').val();
            if ( gdxm != "undefined" && gdxm != null && gdxm != "") {
                var dd = {
                    "gdxm" : gdxm,
                    "gdsfzh" : target.find('input[name="gdsfzh"]').val(),
                    "gddh" : target.find('input[name="gddh"]').val(),
                    "gdyx" : target.find('input[name="gdyx"]').val(),
                    "gdzgbl" : target.find('input[name="gdzgbl"]').val()
                };
                dd = JSON.stringify(dd); //对象转字符串
                gdData2 = gdData2 + dd + ',';
            }
        });
        if (gdData2 === '[') {
            gdData2 = gdData2 + ']';
        } else {
            gdData2 = gdData2.substring(0, gdData2.length - 1);
            gdData2 = gdData2 + ']';
        }

        //报税提醒
        var tableData = '[';
        for (var i = 0; i <= 100; i++) {
            var d = configMap.szGrid.row(i).data(); //获取每行数据的对象
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
        }
        var o_khfl = $("#customerStyle", jqueryMap.$customerManageForm).val();
        if (o_khfl == null || o_khfl == "undefined" || o_khfl == undefined) {
            o_khfl = $("#customerStyle", jqueryMap.$customerManageForm).find("option:first").val();
        }
        // var oswdjh = $('input[name="nsrsbh"]', jqueryMap.$customerManageForm).val();
        // var osfz = $('input[name="sfzh"]', jqueryMap.$customerManageForm).val();
        // var ofrdb = $('input[name="frdb"]', jqueryMap.$customerManageForm).val();
        //var ozzjgdm = $('input[name="zzjgdm"]', jqueryMap.$customerManageForm).val();
        // var osjhm = $('input[name="sjhm"]', jqueryMap.$customerManageForm).val();
        // var oqq = $('input[name="qq"]', jqueryMap.$customerManageForm).val();
        // var omail = $('input[name="email"]', jqueryMap.$customerManageForm).val();
        // var ogsm = $('input[name="gsmc"]', jqueryMap.$customerManageForm).val();
        var clrq = $('input[name="createDate"]', jqueryMap.$customerManageForm).val(); //成立日期
        var ksdzrq = $('input[name="startDate"]', jqueryMap.$customerManageForm).val(); //开始代账日期
        var sl = $('input[name="sl"]', jqueryMap.$customerManageForm).val() == "" ? 0 : $('input[name="sl"]', jqueryMap.$customerManageForm).val(); //税率
        var o_zzsxz = $('#zzsxz', jqueryMap.$customerManageForm).val(); //增值税性质代码
        //var o_zzsxzName = $('#zzsxz', jqueryMap.$customerManageForm)[0].selectedOptions[0].innerHTML; //增值税性质代码
        var o_zzsxzName = $('#zzsxz', jqueryMap.$customerManageForm).select2('data')[0].text;

        if (o_zzsxz == null || o_zzsxz == "undefined" || o_zzsxz == "null" || o_zzsxz == undefined) {
            o_zzsxz = "001";
            o_zzsxzName = "小规模纳税人";
        }

        //行业大类
        var hydl = $('#DL', jqueryMap.$customerManageForm).val();
        var hymc = '';
        if (hydl == null || hydl == "undefined" || hydl == "null" || hydl == undefined || hydl === ''){
            hymc = '';
        } else {
            hymc = $('#DL', jqueryMap.$customerManageForm).select2('data')[0].text;
        }

        var sfdm = $('#loc_province', jqueryMap.$customerManageForm).val();//省份代码
        var csdm = $('#loc_city', jqueryMap.$customerManageForm).val();
        var csmc = '';
        if (csdm == null || csdm == "undefined" || csdm == "null" || csdm == undefined || csdm === ''){
            csmc = '';
        } else {
            csmc = $('#loc_city', jqueryMap.$customerManageForm).select2('data')[0].text;
        }


        if (clrq == "undefined" || clrq == null || clrq == "") {

            //callback(false);
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
        var datas = "{\"yhmc\":\"" + $('input[name="gsjc"]', jqueryMap.$customerManageForm).val() + "\"," + //公司简称
            "\"gsmc\":\"" + $('input[name="gsmc"]', jqueryMap.$customerManageForm).val() + "\"," + //公司名称
            "\"khflDm\":\"" + o_khfl + "\"," + //客户分类
            "\"hyml\":\"" + $('#ML', jqueryMap.$customerManageForm).val() + "\"," + //门类
            "\"hydl\":\"" + hydl + "\"," + //大类
            "\"hymc\":\"" + hymc + "\"," + //大类名称
            "\"sfdm\":\"" + sfdm + "\"," + //所在地区
            "\"csdm\":\"" + csdm + "\"," + //所在地区
            "\"csmc\":\"" + csmc + "\"," + //城市名称
            "\"frdb\":\"" + $('input[name="frdb"]', jqueryMap.$customerManageForm).val() + "\"," + //法人代表
            "\"sfzhm\":\"" + $('input[name="sfzh"]', jqueryMap.$customerManageForm).val() + "\"," + //身份证号
            "\"yyzz\":\"" + $('input[name="yyzz"]', jqueryMap.$customerManageForm).val() + "\"," + //营业执照号
            "\"zzjgdm\":\"" + $('input[name="zzjgdm"]', jqueryMap.$customerManageForm).val() + "\"," + //组织机构代码
            clrq + //成立日期
            ksdzrq + //开始代账日期
            "\"zczj\":\"" + $('input[name="zczj"]', jqueryMap.$customerManageForm).val() + "\"," + //注册资金
            "\"bygsmc\":\"" + $('input[name="bygsmc"]', jqueryMap.$customerManageForm).val() + "\"," + //备用公司名称
            "\"zcdz\":\"" + $('input[name="zcdz"]', jqueryMap.$customerManageForm).val() + "\"," + //注册地址
            "\"jyfw\":\"" + $('input[name="jyfw"]', jqueryMap.$customerManageForm).val() + "\"," + //经营范围
            "\"bzxx\":\"" + $('input[name="bzxx"]', jqueryMap.$customerManageForm).val() + "\"," + //备注信息
            "\"zydm\":\"" + $('#gjr', jqueryMap.$customerManageForm).val() + "\"," + //跟进人
            "\"khjl_dm\":\"" + $('#khjl', jqueryMap.$customerManageForm).val() + "\"," + //客户经理
            "\"tjrdm\":\"" + $('#tjrmcSl1', jqueryMap.$customerManageForm).val() + "\"," + //推荐人代码
            "\"wbtjrmc\":\"" + $('#wbtjrmc', jqueryMap.$customerManageForm).val() + "\"," + //外部推荐人
            "\"hgdm\":\"" + $('input[name="hgdm"]', jqueryMap.$customerManageForm).val() + "\"," + //海关代码
            "\"lxrmc\":\"" + $('input[name="lxr"]', jqueryMap.$customerManageForm).val() + "\"," + //联系人
            "\"bgdh\":\"" + $('input[name="bgdh"]', jqueryMap.$customerManageForm).val() + "\"," + //办公电话
            "\"sjhm\":\"" + $('input[name="sjhm"]', jqueryMap.$customerManageForm).val() + "\"," + //手机号码
            "\"czhm\":\"" + $('input[name="czhm"]', jqueryMap.$customerManageForm).val() + "\"," + //传真号码
            "\"qq\":\"" + $('input[name="qq"]', jqueryMap.$customerManageForm).val() + "\"," + //qq
            "\"email\":\"" + $('input[name="email"]', jqueryMap.$customerManageForm).val() + "\"," + //email
            "\"qtxx\":\"" + $('input[name="qt"]', jqueryMap.$customerManageForm).val() + "\"," + //其他信息
            "\"xxdz\":\"" + $('input[name="xxdz"]', jqueryMap.$customerManageForm).val() + "\"," + //详细地址
            "\"fdxm\":\"" + $('input[name="fdxm"]', jqueryMap.$customerManageForm).val() + "\"," + //房东姓名
            "\"fdsfzh\":\"" + $('input[name="fdsfzh"]', jqueryMap.$customerManageForm).val() + "\"," + //房东身份证号
            "\"zzsxzDm\":\"" + o_zzsxz + "\"," + //增值税性质
            "\"zzsxzMc\":\"" + o_zzsxzName + "\"," + //增值税性质名称
            "\"sl\":" + sl + "," + //税率
            "\"nsrsbh\":\"" + $('input[name="nsrsbh"]', jqueryMap.$customerManageForm).val() + "\"," + //税务登记号
            "\"nsrbm\":\"" + $('input[name="nsrbm"]', jqueryMap.$customerManageForm).val() + "\"," + //纳税人编号
            "\"zgswfj\":\"" + $('input[name="zgswfj"]', jqueryMap.$customerManageForm).val() + "\"," + //主管税务分局
            "\"swzlbz\":\"" + $('input[name="swzlbz"]', jqueryMap.$customerManageForm).val() + "\"," + //税务资料备注
            //"\"qyztDm\":\"" + $('input[name="qyzt"]:checked').val() + "\"," + //签约状态
            "\"fwztDm\":\"" + $('input[name="fwzt"]:checked', jqueryMap.$customerManageForm).val() + "\"," + //服务状态
            "\"ztztDm\":\"" + $('input[name="ztzt"]:checked', jqueryMap.$customerManageForm).val() + "\"," + //账套创建
            "\"taxtaxUserName\":\"" + $('#taxtaxUserName', jqueryMap.$customerManageForm).val() + "\"," + //税税通账号
            "\"taxtaxPassword\":\"" + $('#taxtaxPassword', jqueryMap.$customerManageForm).val() + "\"," + //税税通密码
            "\"IDType\":\"" + $('#IDType', jqueryMap.$customerManageForm).val() + "\"," + //税税通密码
            "\"khdjDm\":\"" + $('input[name="khjb"]:checked', jqueryMap.$customerManageForm).val() + "\"," + //客户级别
            "\"ifktapp\":\"" + $('input[name="ktapp"]:checked', jqueryMap.$customerManageForm).val() + "\"," + //是否开通app
            "\"ptSwtxlist\":" + tableData + "," +
            "\"ptGdxxlist\":" + gdData2 + "}";
        addCustomerValidate(datas, callback);

    };

    /**
     * 第一页检查
     */
    var checkOne = function () {
        var oswdjh = $('input[name="nsrsbh"]', jqueryMap.$customerManageForm).val();//纳税人识别号
        var ogsm = $('input[name="gsmc"]', jqueryMap.$customerManageForm).val();//公司名称
        var IDType=$('#IDType',jqueryMap.$customerManageForm).val();//证件类型
        var osfz = $('input[name="sfzh"]', jqueryMap.$customerManageForm).val();//身份证号
        var ozzjgdm = $('input[name="zzjgdm"]', jqueryMap.$customerManageForm).val(); //组织机构代码
        var ogjr = $('#gjr', jqueryMap.$customerManageForm).val(); //主管会计
        var khjl = $('#khjl', jqueryMap.$customerManageForm).val(); //客户经理
        if (oswdjh == "undefined" || oswdjh == null || oswdjh == "") {
            Messenger().post({
                message: '税务登记号不能为空！',
                type: 'warning'
            });
            return false;
        }else if (!whetherOrNotNsrbh(oswdjh)) {
            Messenger().post({
                message: '税务登记号请输入15-18位数字，字母或数字与字母组合！',
                type: 'warning'
            });
            return false;
        } else if (ogsm == "undefined" || ogsm == null || ogsm == "") { //验证公司名称
            Messenger().post({
                message: '公司名不能为空！',
                type: 'warning'
            });
            return false;
        }
        // else if(IDType == null || IDType === '000'){
        //     Messenger().post({
        //         message: '请选择证件类型！',
        //         type: 'warning'
        //     });
        //     return false;
        // } else if (osfz == "undefined" || osfz == null || osfz == "") {
        //     Messenger().post({
        //         message: '证件号码不能为空！',
        //         type: 'warning'
        //     });
        //     return false;
        // } else
        if ((osfz != null && osfz != "undefined" &&  osfz != "")&&(IDType === '001' && !whetherOrNotID(osfz))) { //验证身份证号码
            Messenger().post({
                message: '身份证号码不合法！',
                type: 'warning'
            });
            return false;
        } else if (!(ozzjgdm == "undefined" || ozzjgdm == null || ozzjgdm == "") && !whetherOrNotZZJGDM(ozzjgdm)) { //组织机构代码
            Messenger().post({
                message: '组织机构代码为8位或9位，大写字母与数字组合！',
                type: 'warning'
            });
            return false;
        } else if (ogjr == "undefined" || ogjr == null || ogjr == "") { //主管会计
            Messenger().post({
                message: '主管会计不能为空！',
                type: 'warning'
            });
            return false;
        } else if (khjl == "undefined" || khjl == null || khjl == "") { //客户经理
            Messenger().post({
                message: '客户经理不能为空！',
                type: 'warning'
            });
            return false;
        }
    };

    /**
     * 第二页检查
     */
    var checkTwo = function () {
        var olxr = $('input[name="lxr"]', jqueryMap.$customerManageForm).val();
        var osjhm = $('input[name="sjhm"]', jqueryMap.$customerManageForm).val();
        var oqq = $('input[name="qq"]', jqueryMap.$customerManageForm).val();
        var omail = $('input[name="email"]', jqueryMap.$customerManageForm).val();
        if (olxr == "undefined" || olxr == null || olxr == "") { //验证联系人
            Messenger().post({
                message: '联系人不能为空！',
                type: 'warning'
            });
            return false;

        } else if (osjhm == "undefined" || osjhm == null || osjhm == "") {
            Messenger().post({
                message: '手机号码不能为空！',
                type: 'warning'
            });
            return false;
        } else if (!whetherOrNotMobil(osjhm)) {
            Messenger().post({
                message: '手机号码应为11位数字！',
                type: 'warning'
            });
            return false;
        } else if (!(oqq == "undefined" || oqq == null || oqq == "") && !whetherOrNotQQ(oqq)) {
            Messenger().post({
                message: 'qq号码为至少5位数字！',
                type: 'warning'
            });
            return false;
        } else if (!(omail == "undefined" || omail == null || omail == "") && !whetherOrNotEmail(omail)) {
            Messenger().post({
                message: '邮箱格式错误！',
                type: 'warning'
            });
            return false;
        }

        /**
         * 所有的股东信息
         */
        var ii = 1;
        var boo = true;
        $('.IncreaseInfoWrap', jqueryMap.$customerManageForm).each(function(){
            var target = $(this);
            var gdsfzh = target.find('input[name="gdsfzh"]').val();
            var gddh = target.find('input[name="gddh"]').val();
            var gdyx = target.find('input[name="gdyx"]').val();
            if (!(gdsfzh == "undefined" || gdsfzh == null || gdsfzh == "") && !whetherOrNotID(gdsfzh)) { //验证身份证号码
                Messenger().post({
                    message: '第'+ ii +'位股东身份证号码不合法！',
                    type: 'warning'
                });
                boo = false;
                return false;
            } else if (!(gddh == "undefined" || gddh == null || gddh == "") && !whetherOrNotMobil(gddh)) {
                Messenger().post({
                    message: '第'+ ii +'位股东手机号码应为11位数字！',
                    type: 'warning'
                });
                boo = false;
                return false;
            } else if (!(gdyx == "undefined" || gdyx == null || gdyx == "") && !whetherOrNotEmail(gdyx)) {
                Messenger().post({
                    message: '第'+ ii +'位股东邮箱格式错误！',
                    type: 'warning'
                });
                boo = false;
                return false;
            }
            ii = parseInt(ii) + 1;
        });

        if (!boo) {
            return false;
        }
        /**
         * 房东
         */
        var fdsfzh = $('input[name="fdsfzh"]', jqueryMap.$customerManageForm).val();
        if (!(fdsfzh == "undefined" || fdsfzh == null || fdsfzh == "") && !whetherOrNotID(fdsfzh)) { //验证身份证号码
            Messenger().post({
                message: '房东身份证号码不合法！',
                type: 'warning'
            });
            return false;
        }
    }


    var addCustomerValidate = function (datas, callback) {
        var url = configMap.path + configMap.dataUrl + "/" + configMap.uuid;
        var requestType = 'POST';

        if (checkOne()===false){
            return
        } else if (checkTwo()===false){
            return
        } else {
            $('#saveKhxx').html("正在保存数据...");
            $.ajax({
                url: url,
                type: requestType,
                contentType: 'application/json; charset=utf-8',
                data: datas,
                success: function (result) {
                    //App.unblockUI(jqueryMap.$customerManageForm.closest(".modal-content"));
                    $('#saveKhxx').html("保存");
                    if (result.success) {
                        //callback(true);
                        //关闭当前选项卡
                        var  id = 'khxx_info';
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
                        orgAndUser_data.reload();
                        orgAndUser_dataBusiness.reload();
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
        }
    }
    //加载税种
    var getSz = function () {
        $("#selectSz", jqueryMap.$customerManageForm).empty();
        $.ajax({
            url: configMap.systempath + '/tax/getTax',
            dataType: 'JSON',
            type: 'GET',
            success: function (dataghs) {
                if (dataghs != "") {
                    $("#selectSz", jqueryMap.$customerManageForm).append("<option></option>")
                    for (var i = 0; i < dataghs.length; i++) {
                        $("#selectSz", jqueryMap.$customerManageForm).append("<option value='" + dataghs[i].taxcode + "'>" + dataghs[i].taxName + "</option>");
                    }
                }
                $('#selectSz', jqueryMap.$customerManageForm).select2({
                    placeholder: '请选择税种',
                    width: '100%',
                    allowClear: false,
                    language: 'zh-CN'
                });
            }
        });
    }

    //跟进人
    var getGjr = function () {
        $("#gjr", jqueryMap.$customerManageForm).empty();
        $.ajax({
            url: configMap.dateUrl + '/getAllYgList',
            dataType: 'JSON',
            type: 'GET',
            success: function (dataghs) {
                if (dataghs != "") {
                    $("#gjr", jqueryMap.$customerManageForm).append("<option value='" + dataghs[dataghs.length - 1].zydm + "_" + dataghs[dataghs.length - 1].name + "'>" + dataghs[dataghs.length - 1].name + "</option>")
                    for (var i = 0; i < dataghs.length - 1; i++) {
                        $("#gjr", jqueryMap.$customerManageForm).append("<option value='" + dataghs[i].zydm + "_" + dataghs[i].name + "'>" + dataghs[i].name + "</option>");
                    }
                }
                	$('#gjr', jqueryMap.$customerManageForm).select2({
                        placeholder: '请选择主管会计',
                        width: '155px',
                        allowClear: false,
                        language: 'zh-CN'
                    });
                if ($('#khzydmChange', jqueryMap.$customerManageForm).length > 0) {
                	$("#gjr", jqueryMap.$customerManageForm).prop('disabled',false);
                } else {
                	$("#gjr", jqueryMap.$customerManageForm).prop('disabled',true);
                }
            }
        });
    }

    //客户经理
    var getKhjl = function () {
        $("#khjl", jqueryMap.$customerManageForm).empty();
        $.ajax({
            url: configMap.dateUrl + '/getAllYgList',
            dataType: 'JSON',
            type: 'GET',
            success: function (dataghs) {
                if (dataghs != "") {
                    $("#khjl", jqueryMap.$customerManageForm).append("<option value='" + dataghs[dataghs.length - 1].zydm + "_" + dataghs[dataghs.length - 1].name + "'>" + dataghs[dataghs.length - 1].name + "</option>")
                    for (var i = 0; i < dataghs.length - 1; i++) {
                        $("#khjl", jqueryMap.$customerManageForm).append("<option value='" + dataghs[i].zydm + "_" + dataghs[i].name + "'>" + dataghs[i].name + "</option>");
                    }
                }
                $('#khjl', jqueryMap.$customerManageForm).select2({
                    placeholder: '请选择客户经理',
                    width: '186px',
                    allowClear: false,
                    language: 'zh-CN'
                });
            }
        });
    }


    //加载日期
//    var getrq = function () {
//        $("#selectBsrq", jqueryMap.$customerManageForm).empty();
//        $.ajax({
//            url: configMap.path + configMap.dateUrl + '/getDays',
//            dataType: 'TEXT',
//            type: 'GET',
//            success: function (dataghs) {
//                if (dataghs != "") {
//                    var days = dataghs.split(',');
//                    $("#selectBsrq", jqueryMap.$customerManageForm).append("<option></option>")
//                    for (var i = 0; i < days.length; i++) {
//                        $("#selectBsrq", jqueryMap.$customerManageForm).append("<option value='" + days[i] + "'>" + days[i] + "</option>");
//                    }
//                }
//                $('#selectBsrq', jqueryMap.$customerManageForm).select2({
//                    placeholder: '次月报税日期',
//                    width: '100%',
//                    allowClear: false,
//                    language: 'zh-CN'
//                });
//            }
//        });
//    }


    //在div中添加选择的内容
    var szAdd = function () {
        var sz = $('#selectSz', jqueryMap.$customerManageForm).val(); //税种
        var szmc = $('#selectSz', jqueryMap.$customerManageForm).find("option:selected").text(); //税种名称
        var sbzq = $('#selectSbzq', jqueryMap.$customerManageForm).val(); //申报周期代码
        var sbzqmc = $('#selectSbzq', jqueryMap.$customerManageForm).find("option:selected").text(); //申报周期代码
        var bsrq = $('#selectBsrq', jqueryMap.$customerManageForm).val(); //报税日期
        var bsy = $('#selectBsy', jqueryMap.$customerManageForm).val(); //报税月

        var data = configMap.szGrid.data(); //获得表中全部数据

        if (sz == null || sz == "") {

            App.alert({
                container: jqueryMap.$customerManageForm.closest(".modal-body"),
                place: 'prepend',
                type: 'warning',
                message: '请选择一个税种！',
                icon: 'fa fa-warning'
            });
            return false;

        } else if (sbzq == null || sbzq == "") {

            App.alert({
                container: jqueryMap.$customerManageForm.closest(".modal-body"),
                place: 'prepend',
                type: 'warning',
                message: '请选择申报周期！',
                icon: 'fa fa-warning'
            });
            return false;

        } else if (sbzq == '004') { //选择年报时
            if (bsy == null || bsy == "") {

                App.alert({
                    container: jqueryMap.$customerManageForm.closest(".modal-body"),
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
                container: jqueryMap.$customerManageForm.closest(".modal-body"),
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
                        container: jqueryMap.$customerManageForm.closest(".modal-body"),
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
            if (sbzq == '004') { //选择年报时
                bsrq = bsy + '-' + bsrq;
            }
            result.bsrq = bsrq;
            configMap.szGrid.row.add(result).draw();

        }
    }

    //删除选中行
    var del = function () {
        var el = $(this);
        var rowIndex = configMap.szGrid.cell(el.parent()).index().row;
        var id = configMap.szGrid.row(rowIndex).data().id;
        configMap.szGrid.row(rowIndex).remove().draw(false);
    }

    // var customerManageValidation = function () {
    //     jqueryMap.$customerManageForm.validate({
    //         errorElement: 'span',
    //         errorClass: 'help-block help-block-error',
    //         focusInvalid: false,
    //         ignore: "",
    //         rules: configMap.validationRule,
    //         messages: { // 自定义显示消息
    //         },
    //         errorPlacement: function (error, element) { // 为每种input设置错误输出位置
    //             if (element.parent(".input-group").size() > 0) {
    //                 error.insertAfter(element.parent(".input-group"));
    //             } else if (element.attr("data-error-container")) {
    //                 error.appendTo(element.attr("data-error-container"));
    //             } else if (element.parents('.checkbox-list').size() > 0) {
    //                 error.appendTo(element.parents('.checkbox-list').attr(
    //                     "data-error-container"));
    //             } else if (element.parents('.radio-list').size() > 0) {
    //                 error.appendTo(element.parents('.radio-list').attr(
    //                     "data-error-container"));
    //             } else {
    //                 error.insertAfter(element);
    //             }
    //         },
    //         highlight: function (element) { // 高亮显示控件form-group和has-error都是样式类
    //             $(element).closest('.form-group').addClass('has-error');
    //         },
    //         unhighlight: function (element) { // 取消高亮显示
    //             $(element).closest('.form-group').removeClass('has-error');
    //         },
    //         success: function (label) {
    //             label.closest('.form-group').removeClass('has-error');
    //         }
    //     });
    // };

    //获取省
    var getProvince = function () {
        $.get(configMap.path + '/commonmanager/xzqy/sj', function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].sjdm + '">' + data[i].xzqhMc + '</option>').appendTo($('#loc_province', jqueryMap.$customerManageForm));
            }
            $('#loc_province', jqueryMap.$customerManageForm).val(configMap.szsf);
            $('#loc_province', jqueryMap.$customerManageForm).select2({
                placeholder: '选择省份',
                width: '186px',
                allowClear: false,
                language: 'zh-CN'
            });
            getCity(configMap.szcs);
        });
    }

    var getCity = function (e) {
        $('#loc_city', jqueryMap.$customerManageForm).empty();
        var v = $('#loc_province', jqueryMap.$customerManageForm).val();
        $.get(configMap.path + '/commonmanager/xzqy/xjXzqy?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#loc_city', jqueryMap.$customerManageForm));
            }
            $('#loc_city', jqueryMap.$customerManageForm).val(e);
            $('#loc_city', jqueryMap.$customerManageForm).select2({
                placeholder: '选择地级市/区',
                width: '186px',
                allowClear: false,
                language: 'zh-CN'
            });
        });
    }

    //获得门类
    var getML = function () {
        $.get(configMap.path + '/commonmanager/xzqy/ML', function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].hydm + '">' + data[i].hymc + '</option>').appendTo($('#ML', jqueryMap.$customerManageForm));
            }
            $('#ML', jqueryMap.$customerManageForm).select2({
                placeholder: '选择门类',
                width: '186px',
                allowClear: false,
                language: 'zh-CN'
            });
        });
    }

    var getDL = function () {
        $('#DL', jqueryMap.$customerManageForm).empty();
        var v = $('#ML', jqueryMap.$customerManageForm).val();
        $.get(configMap.path + '/commonmanager/xzqy/DL?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].hydm + '">' + data[i].hymc + '</option>').appendTo($('#DL', jqueryMap.$customerManageForm));
            }
            $('#DL', jqueryMap.$customerManageForm).select2({
                placeholder: '选择大类',
                width: '186px',
                allowClear: false,
                language: 'zh-CN'
            });
        });
    }

    var getZZSXZ = function () {
        var zzsxz = [];
        $.ajax({
            url: 'customermanage/customerManage/getParams/ZZSXZ',
            type: "get",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $('<option value="' + data[i].typecode + '">' + data[i].paramsname + '</option>').appendTo($('#zzsxz', jqueryMap.$customerManageForm));
                }

                //增值税性质
                $('#zzsxz', jqueryMap.$customerManageForm).select2({
                    data: zzsxz,
                    placeholder: '请选择',//默认文字提示
                    language: "zh-CN",//汉化
                    allowClear: false,//允许清空
                    width: '186px',
                });
            },
            error: function (result) {
            }
        });
    }

    //客户分类
    var getCustomerStyle = function () {
        $('#customerStyle', jqueryMap.$customerManageForm).empty();
        var custorStyleNum = [];
        $.ajax({
            url: 'systemmanager/customertype/customertype',
            type: "get",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $('<option value="' + data[i].khfl_dm + '">' + data[i].khfl_mc + '</option>').appendTo($('#customerStyle', jqueryMap.$customerManageForm));
                }
                //客户分类
                $('#customerStyle', jqueryMap.$customerManageForm).select2({
                    data: custorStyleNum,
                    placeholder: '请选择',//默认文字提示
                    language: "zh-CN",//汉化
                    allowClear: false,//允许清空
                    width: '156px',
                });
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
                    getCustomerStyle();
                } else {
                    App.alert({
                        container: jqueryMap.$customerManageForm.closest(".modal-body"),
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


    var initszGrid = function () {
        configMap.szGrid = jqueryMap.$szDataTable.DataTable({
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
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$szDataTable);
                var delContainer = $('[data-type="del"]', jqueryMap.$szDataTable);

                if (delContainer.length > 0) {
                    delContainer.off('click')
                        .on('click', del);
                }
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
            }
        });
    };

    var openModal1 = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    $('#addFQR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    $('#tjrmcSl',jqueryMap.$customerManageForm).val($('#alreadyPer li','#allotStaffList_m').attr('user'));
                    $('#tjrmcSl1',jqueryMap.$customerManageForm).val( $('#alreadyPer li','#allotStaffList_m').attr('zydm'));
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

    return {
        // 初始化
        init: function (id, uuid, szsf, szcs) {
            configMap.uuid = uuid;
            configMap.id = id;
            configMap.szsf = szsf;
            configMap.szcs = szcs;
            setJqueryMap();
            tabMenu('khxx_info');
            $('.createDate', jqueryMap.$customerManageForm).datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $('.startDate', jqueryMap.$customerManageForm).datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            //税种设置
            // $('#selectSz', jqueryMap.$customerManageForm).select2({
            //     placeholder: '请选择税种',
            //     width: '100%',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
            //申报周期
            $('#selectSbzq', jqueryMap.$customerManageForm).select2({
                placeholder: '请选择申报周期',
                width: '100%',
                allowClear: false,
                language: 'zh-CN'
            });
            //次月报税日期
            $('#selectBsrq', jqueryMap.$customerManageForm).select2({
                placeholder: '次月报税日期',
                width: '100%',
                allowClear: false,
                language: 'zh-CN'
            });
            //月份
            $('#selectBsy', jqueryMap.$customerManageForm).select2({
                placeholder: '请选择月份',
                width: '100%',
                allowClear: false,
                language: 'zh-CN'
            });
            // //跟进人
            // $('#gjr', jqueryMap.$customerManageForm).select2({
            //     placeholder: '请选择跟进人',
            //     width: '186px',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
            //市级
            $('#loc_city', jqueryMap.$customerManageForm).select2({
                placeholder: '选择地级市/区',
                width: '186px',
                allowClear: false,
                language: 'zh-CN'
            });
            //大类
            $('#DL', jqueryMap.$customerManageForm).select2({
                placeholder: '选择大类',
                width: '186px',
                allowClear: false,
                language: 'zh-CN'
            });

            $('#IDType', jqueryMap.$customerManageForm).val('001');

            //添加
            $('#szAdd', jqueryMap.$customerManageForm).off().on('click', function () {
                szAdd();
            });

            //添加新的客户分类
            $('#khflAdd', jqueryMap.$customerManageForm).off().on('click', function () {

                khflAddFun();
            });

            initszGrid();
            //获得省
            getProvince();
            //加载税种
            getSz();
            //加载日期
            //getrq();
            //加载跟进人
            getGjr();
            //加载客户经理
            getKhjl();
            //增值税性质
            getZZSXZ();
            //khflAdd();
            //客户分类
            getCustomerStyle();
            //获得门类
            getML();

            //获得市
            $('#loc_province', jqueryMap.$customerManageForm).off().on('change', function () {
                getCity();
            });

            //获得大类
            $('#ML', jqueryMap.$customerManageForm).off().on('change', function () {
                getDL();
            });

            //选择推荐人事件 用focus事件
            $('#tjrmcSl', jqueryMap.$customerManageForm).focus(function(){
                openModal1('选推荐人', '/systemmanager/businesscooperate/staffList.jsp?type=one','edit');
            });

            //设置初始默认值
            $('input[name=qyzt][value="false"]', jqueryMap.$customerManageForm).iCheck('check'); //签约状态
            $('input[name=fwzt][value="true"]', jqueryMap.$customerManageForm).iCheck('check'); //服务状态
            $('input[name=ztzt][value="false"]', jqueryMap.$customerManageForm).iCheck('check'); //账套创建
            $('input[name=khjb][value="A"]', jqueryMap.$customerManageForm).iCheck('check'); //客户等级
            $('input[name=ktapp][value="false"]', jqueryMap.$customerManageForm).iCheck('check'); //开通app

            jqueryMap.$customerManageForm.find('input[name=sl]').keyup(function (event) {
                checkMoney($(this), event);
            });

            $('#nsrsbhInput').blur(function(){ //失去焦点，检验纳税人识别号
                var v=$("input[name='nsrsbh']", jqueryMap.$customerManageForm).val();
                if(v==null||v==""){
                	App.alert({
                        container: jqueryMap.$customerManageForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'warning',
                        message: '请填写税务登记号！',
                        icon: 'fa fa-warning'
                    });
                }else{ //检查纳税人识别号在本代理中是否已存在
                    $.ajax({
                         url:'/customermanage/ptkhxx/checkNSRIfexist/' + v,
                         type:'GET',
                         success:function(data){
                             if(!data.success){//为false,存在
                            	 App.alert({
                                     container: jqueryMap.$customerManageForm.closest(".modal-body"),
                                     place: 'prepend',
                                     type: 'warning',
                                     message:data.message,
                                     icon: 'fa fa-warning'
                                 });
                             }
                         }
                     });
                }
            });
            
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

            // 控件验证
            //customerManageValidation();
//			//若id不为空，展示已有数据
//			if (configMap.id) {
//				getcustomer(configMap.id);
//			}else{
//				$('input[name=state][value="true"]').iCheck('check');
//			}
            //客户附件
            jqueryMap.$customerManageForm.find('button#addfiles').off('click').on('click', function () {
                var dialogButtons = {
                    /*cancel: {
                     label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                     className: 'btn-default'
                     }*/
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
//            	var htbm = $('[name="htbm"]').val();
                $.get(configMap.path + configMap.fileUrl + "?uuid=" + configMap.uuid, function (html) {
                    jqueryMap.$setfile = bootbox.dialog({
                        title: '添加附件',
                        message: html,
                        buttons: dialogButtons
                    });
                });
            });
            //APP账户修改
            jqueryMap.$customerManageForm.find('button#changApp').off('click').on('click', function () {
            	var nsrsbh = $('input[name="nsrsbh"]', jqueryMap.$customerManageForm).val(); //纳税人识别号
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
                                if (result.success) {
                                	$('input[name="sjhm"]', jqueryMap.$customerManageForm).val(result.sjhm);
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
                            title: 'App账户——手机验证码登录方式',
                            message: html,
                            buttons: dialogButtons
                        });
                    });
            	}
            });

            $('.o-m .ul-o li').click(function () {

                var linum = $(this).index();
                if(linum==1||linum==2||linum==3){
                    if (checkOne()===false){
                        return
                    }
                }
                if(linum==2||linum==3){
                    if (checkOne()===false){
                        return
                    }
                    if (checkTwo()===false){
                        return
                    }
                }
                $('.ul-o .arrow').hide();

                $('#customerManageForm .nextStep').attr('data-index',linum);
                $('#customerManageForm .nextStep').show();
                $('#saveKhxx').addClass('hide');
                if(linum == 3){ //最后一个
                    $('#saveKhxx').removeClass('hide');
                    $('#customerManageForm .nextStep').hide();

                }
                $('.o-m .ul-t li').eq(linum).stop().show().siblings('li').hide();
                $('.ul-o .arrow').eq(linum).show();
                $(this).children("p").addClass("active1").parents("li").siblings("li").children("p").removeClass();
            });

            $('#customerManageForm .nextStep').click(function(){
                $('.ul-o .arrow').hide();

                //1.当前的序号
                var Snum = $(this).attr('data-index');
                if (Snum == 0){
                   if (checkOne()===false){
                       return
                   }
                }
                if (Snum==1){
                    if (checkTwo()===false){
                        return
                    }
                }
                Snum++;


                if(Snum>=3){
                    Snum = 3;
                    $('#saveKhxx').removeClass('hide');
                    $('#customerManageForm .nextStep').hide();
                }else{
                    $('#saveKhxx').addClass('hide');
                    $('#customerManageForm .nextStep').show();
                }
                $('.ul-o .arrow').eq(Snum).show();
                $('.ul-o .arrow').eq(Snum).parents('p').addClass('active1').end().parents('li').siblings('li').find('p').removeClass('active1');
                $(this).attr('data-index',Snum);
                $('.o-m .ul-t li').eq(Snum).stop().show().siblings('li').hide();

            });

            $('#saveKhxx').off().on('click',function () {
                addcustomer();
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';

        },
        // 保存雇员信息，参数为回掉函数
        addcustomer: function (callback) {
//			if (jqueryMap.$customerForm.valid()) {
//				addcustomer(callback);
//			} else {
//				callback(false);
//			}
            addcustomer(callback);
        }
    };
}();
