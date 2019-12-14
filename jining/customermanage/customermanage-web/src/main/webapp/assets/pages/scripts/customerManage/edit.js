var customerManageedit = function () {
    'use strict';
    // 全局属性参数
    $('#customerManageEditForm').parents('.modal-dialog').css('width','900px');
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
        id: '',
        type: '',
        validationRule: {},
        szEditGrid: null,
        zydm: '',
        zgkj_dm: '', //主管会计代码
        zgkj_mc: '', //主管会计名称
        khjl_dm: '', //客户经理代码
        khjl_mc: '', //客户经理名称
        nsrsbh: '',
        gsmc: '',
        ifkt: '0', //是否已开通app 0否1是
        appId : '', //得到的app_khxx表中id
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-trash" style="font-size:15px;"></i></a>'
    };
    // 全局Dom
    var jqueryMap = {
        $customerManageEditForm: null,
        $setfile: null,
        $appZH: null,
        $khflAddDialog: null,
        $commonproblemDialog:null
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
    }

    //跟进人
    var getGjr = function () {
        $("#gjr", jqueryMap.$customerManageEditForm).empty();
        $.ajax({
            url: configMap.dateUrl + '/getAllYgList',
            dataType: 'JSON',
            type: 'GET',
            success: function (dataghs) {
                if (dataghs != "") {
                    for (var i = 0; i < dataghs.length; i++) {
                        $("#gjr", jqueryMap.$customerManageEditForm).append("<option value='" + dataghs[i].zydm + "_" + dataghs[i].name + "'>" + dataghs[i].name + "</option>");
                    }
                }
            	$('#gjr', jqueryMap.$customerManageEditForm).select2({
                    placeholder: '请选择主管会计',
                    width: '155px',
                    allowClear: false,
                    language: 'zh-CN'
                });
            	if ($('#editkhzydmChange',jqueryMap.$customerManageEditForm).length === 1) { //是否能够修改主管会计
                	//$('#gjr',jqueryMap.$customerManageEditForm).attr('disabled',false);
                	$("#gjr").prop("disabled", false);//可用
                } else{
                	$("#gjr").prop("disabled", true);//不可用
                }
            }
        });
    }

    //客户经理
    var getKhjl = function () {
        $("#khjl", jqueryMap.$customerManageEditForm).empty();
        $.ajax({
            url: configMap.dateUrl + '/getAllYgList',
            dataType: 'JSON',
            type: 'GET',
            success: function (dataghs) {
                if (dataghs != "") {
                    for (var i = 0; i < dataghs.length; i++) {
                        $("#khjl", jqueryMap.$customerManageEditForm).append("<option value='" + dataghs[i].zydm + "_" + dataghs[i].name + "'>" + dataghs[i].name + "</option>");
                    }
                }
                $('#khjl', jqueryMap.$customerManageEditForm).select2({
                    placeholder: '请选择客户经理',
                    width: '186px',
                    allowClear: false,
                    language: 'zh-CN'
                });
                //加载税种
                getSz();
            }
        });
    }

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

            Messenger().post({
                message: '请选择一个税种！',
                type: 'warning'
            });
            // App.alert({
            //     container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
            //     place: 'prepend',
            //     type: 'warning',
            //     message: '请选择一个税种！',
            //     icon: 'fa fa-warning'
            // });
            return false;

        } else if (sbzq == null || sbzq == "") {

            Messenger().post({
                message: '请选择申报周期！',
                type: 'warning'
            });
            // App.alert({
            //     container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
            //     place: 'prepend',
            //     type: 'warning',
            //     message: '请选择申报周期！',
            //     icon: 'fa fa-warning'
            // });
            return false;

        } else if (sbzq == '004') { //选择年报时
            if (bsy == null || bsy == "") {

                Messenger().post({
                    message: '请选择报税月份！',
                    type: 'warning'
                });
                // App.alert({
                //     container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                //     place: 'prepend',
                //     type: 'warning',
                //     message: '请选择报税月份！',
                //     icon: 'fa fa-warning'
                // });
                return false;

            }
        } else {
            bsy = null;
        }
        if (bsrq == null || bsrq == "") {

            Messenger().post({
                message: '请选择报税日期！',
                type: 'warning'
            });
            // App.alert({
            //     container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
            //     place: 'prepend',
            //     type: 'warning',
            //     message: '请选择报税日期！',
            //     icon: 'fa fa-warning'
            // });
            return false;

        } else {
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                //处理报税月份不存在的情况
                if (d.bsyf == "undefined" || d.bsyf == null || d.bsyf == "") {
                    d.bsyf = null;
                }
                if (d.zsxmDm === sz && d.sbzqDm === sbzq) {

                    Messenger().post({
                        message: '该税务提醒已存在！',
                        type: 'warning'
                    });
                    // App.alert({
                    //     container: jqueryMap.$customerManageEditForm.closest(".modal-body"),
                    //     place: 'prepend',
                    //     type: 'warning',
                    //     message: '该税务提醒已存在！',
                    //     icon: 'fa fa-warning'
                    // });
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
            configMap.szEditGrid.row.add(result).draw();

        }
    }

    //删除选中行
    var del = function (event, el) {

        var rowIndex = configMap.szEditGrid.cell(el.closest('td')).index().row;
        var sbzqDm = configMap.szEditGrid.row(rowIndex).data().sbzqDm;
        var zsxmDm = configMap.szEditGrid.row(rowIndex).data().zsxmDm;
        var data = {
            szdm: zsxmDm,
            rqdm: sbzqDm,
            khbm: configMap.khdm
        }

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
    }

    /**
     * 第一页检查
     */
    var checkOne = function () {
        var oswdjh = $('input[name="nsrsbh"]', jqueryMap.$customerManageEditForm).val();//纳税人识别号
        var ogsm = $('input[name="gsmc"]', jqueryMap.$customerManageEditForm).val();//公司名称
        var IDType=$('#IDType',jqueryMap.$customerManageEditForm).val();//证件类型
        var osfz = $('input[name="sfzh"]', jqueryMap.$customerManageEditForm).val();//身份证号
        var ozzjgdm = $('input[name="zzjgdm"]', jqueryMap.$customerManageEditForm).val(); //组织机构代码
        var ogjr = $('#gjr', jqueryMap.$customerManageEditForm).val(); //主管会计
        var khjl = $('#khjl', jqueryMap.$customerManageEditForm).val(); //客户经理
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
        var olxr = $('input[name="lxr"]', jqueryMap.$customerManageEditForm).val();
        var osjhm = $('input[name="sjhm"]', jqueryMap.$customerManageEditForm).val();
        var oqq = $('input[name="qq"]', jqueryMap.$customerManageEditForm).val();
        var omail = $('input[name="email"]', jqueryMap.$customerManageEditForm).val();
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
        $('.IncreaseInfoWrap', jqueryMap.$customerManageEditForm).each(function(){
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
        var fdsfzh = $('input[name="fdsfzh"]', jqueryMap.$customerManageEditForm).val();
        if (!(fdsfzh == "undefined" || fdsfzh == null || fdsfzh == "") && !whetherOrNotID(fdsfzh)) { //验证身份证号码
            Messenger().post({
                message: '房东身份证号码不合法！',
                type: 'warning'
            });
            return false;
        }
    }    

    var updatecustomer = function (callback) {
        var blockTarget = jqueryMap.$customerManageEditForm.closest(".modal-content");

        //股东信息
        var gdData2 = '[';
        $('.IncreaseInfoWrap', jqueryMap.$customerManageEditForm).each(function(){
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
        var olxr = $('input[name="lxr"]', jqueryMap.$customerManageEditForm).val();
        var ozzjgdm = $('input[name="zzjgdm"]', jqueryMap.$customerManageEditForm).val();
        var osjhm = $('input[name="sjhm"]', jqueryMap.$customerManageEditForm).val();
        var oqq = $('input[name="qq"]', jqueryMap.$customerManageEditForm).val();
        var omail = $('input[name="email"]', jqueryMap.$customerManageEditForm).val();
        var ogsm = $('input[name="gsmc"]', jqueryMap.$customerManageEditForm).val();
        var ogjr = $('#gjr', jqueryMap.$customerManageEditForm).val(); //跟进人
        var khjl = $('#khjl', jqueryMap.$customerManageEditForm).val(); //客户经理
        var IDType=$('#IDType',jqueryMap.$customerManageEditForm).val();//证件类型
        var clrq = $('input[name="createDate"]', jqueryMap.$customerManageEditForm).val(); //成立日期
        var ksdzrq = $('input[name="startDate"]', jqueryMap.$customerManageEditForm).val(); //开始代账日期
        var sl = $('input[name="sl"]', jqueryMap.$customerManageEditForm).val() == "" ? 0 : $('input[name="sl"]', jqueryMap.$customerManageEditForm).val(); //税率
        var o_zzsxz = $('#zzsxz', jqueryMap.$customerManageEditForm).val(); //增值税性质代码
        var o_zzsxzName = '';
        if (o_zzsxz == null || o_zzsxz == "undefined" || o_zzsxz == "null" || o_zzsxz == undefined) {
            o_zzsxz = "001";
            o_zzsxzName = "小规模纳税人";
        } else {
            o_zzsxzName = $('#zzsxz', jqueryMap.$customerManageEditForm).select2('data')[0].text; //增值税性质代码
        }

        //行业大类
        var hydl = $('#DL', jqueryMap.$customerManageEditForm).val();
        var hymc = '';
        if (hydl == null || hydl == "undefined" || hydl == "null" || hydl == undefined || hydl === ''){
            hymc = '';
        } else {
            hymc = $('#DL', jqueryMap.$customerManageEditForm).select2('data')[0].text;
        }

        var o_khfl = $('#customerStyle', jqueryMap.$customerManageEditForm).val(); //客户分类代码
        if (o_khfl == null || o_khfl == "undefined" || o_khfl == undefined) {
            o_khfl = $("#customerStyle", jqueryMap.$customerManageEditForm).find("option:first").val();
        }

        var sfdm = $('#loc_province', jqueryMap.$customerManageEditForm).val();//省份代码
        var csdm = $('#loc_city', jqueryMap.$customerManageEditForm).val(); //城市代码
        var csmc = '';
        if (csdm == null || csdm == "undefined" || csdm == "null" || csdm == undefined || csdm === ''){
            csmc = '';
        } else {
            csmc = $('#loc_city', jqueryMap.$customerManageEditForm).select2('data')[0].text;
        }

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
            sfdm = '0'; //省份代码
        }

        if (csdm == "undefined" || csdm == null || csdm == "") {
            csdm = '0'; //城市代码
        }
        if (configMap.ifkt === "1") { //已经开通了app（传回了app_khxx表的id，用于更新）
        	var datas = "{\"id\":" + configMap.appId + "," + //app_khxx表中的id
        	"\"yhmc\":\"" + $('input[name="gsjc"]').val() + "\"," + //客户名称
            "\"gsmc\":\"" + ogsm + "\"," + //公司名称
            "\"khflDm\":\"" + o_khfl + "\"," + //客户分类
            "\"hyml\":\"" + $('#ML', jqueryMap.$customerManageEditForm).val() + "\"," + //行业门类
            "\"hydl\":\"" + hydl + "\"," + //行业大类
            "\"hymc\":\"" + hymc + "\"," + //大类名称
            "\"sfdm\":\"" + sfdm + "\"," + //所在地区
            "\"csdm\":\"" + csdm + "\"," + //所在地区
            "\"csmc\":\"" + csmc + "\"," + //城市名称
            "\"frdb\":\"" + $('input[name="frdb"]').val() + "\"," + //法人代表
            "\"sfzhm\":\"" + $('input[name="sfzh"]').val() + "\"," + //身份证号
            "\"yyzz\":\"" + $('input[name="yyzz"]').val() + "\"," + //营业执照号
            "\"zzjgdm\":\"" + $('input[name="zzjgdm"]').val() + "\"," + //组织机构代码
            clrq + //成立日期
            ksdzrq + //开始代账日期
            "\"zczj\":\"" + $('input[name="zczj"]', jqueryMap.$customerManageEditForm).val() + "\"," + //注册资金
            "\"bygsmc\":\"" + $('input[name="bygsmc"]', jqueryMap.$customerManageEditForm).val() + "\"," + //备用公司名称
            "\"zcdz\":\"" + $('input[name="zcdz"]', jqueryMap.$customerManageEditForm).val() + "\"," + //注册地址
            "\"jyfw\":\"" + $('input[name="jyfw"]', jqueryMap.$customerManageEditForm).val() + "\"," + //经营范围
            "\"bzxx\":\"" + $('input[name="bzxx"]').val() + "\"," + //备注信息
            "\"hgdm\":\"" + $('input[name="hgdm"]').val() + "\"," + //海关代码
            "\"zydm\":\"" + $('#gjr').val() + "\"," + //主管会计
            "\"khjl_dm\":\"" + $('#khjl').val() + "\"," + //客户经理
            "\"zydm_before\":\"" + configMap.zgkj_dm + '_' + configMap.zgkj_mc + "\"," + //已保存的主管会计
            "\"khjl_before\":\"" + configMap.khjl_dm + '_' + configMap.khjl_mc + "\"," + //已保存的客户经理
            "\"tjrdm\":\"" + $('#tjrmcSl1').val() + "\"," + //推荐人代码
            "\"wbtjrmc\":\"" + $('#wbtjrmc').val() + "\"," + //外部推荐人
            "\"lxrmc\":\"" + $('input[name="lxr"]').val() + "\"," + //联系人
            "\"bgdh\":\"" + $('input[name="bgdh"]').val() + "\"," + //办公电话
            "\"sjhm\":\"" + $('input[name="sjhm"]').val() + "\"," + //手机号码
            "\"czhm\":\"" + $('input[name="czhm"]').val() + "\"," + //传真号码
            "\"qq\":\"" + $('input[name="qq"]').val() + "\"," + //qq
            "\"email\":\"" + $('input[name="email"]').val() + "\"," + //email
            "\"qtxx\":\"" + $('input[name="qt"]').val() + "\"," + //其他信息
            "\"xxdz\":\"" + $('input[name="xxdz"]').val() + "\"," + //详细地址
            "\"fdxm\":\"" + $('input[name="fdxm"]', jqueryMap.$customerManageEditForm).val() + "\"," + //房东姓名
            "\"fdsfzh\":\"" + $('input[name="fdsfzh"]', jqueryMap.$customerManageEditForm).val() + "\"," + //房东身份证号
            "\"zzsxzDm\":\"" + o_zzsxz + "\"," + //增值税性质
            "\"zzsxzMc\":\"" + o_zzsxzName + "\"," + //增值税性质名称
            "\"sl\":" + sl + "," + //税率
            "\"nsrsbh\":\"" + $('input[name="nsrsbh"]').val() + "\"," + //税务登记号
            "\"nsrbm\":\"" + $('input[name="nsrbm"]').val() + "\"," + //纳税人编号
            "\"zgswfj\":\"" + $('input[name="zgswfj"]').val() + "\"," + //主管税务分局
            "\"swzlbz\":\"" + $('input[name="swzlbz"]').val() + "\"," + //税务资料备注
            "\"taxtaxUserName\":\"" + $('#taxtaxUserName').val() + "\"," + //主管税务分局
            "\"taxtaxPassword\":\"" + $('#taxtaxPassword').val() + "\"," + //税务资料备注
            "\"qyztDm\":\"" + $('input[name="qyzt"]:checked').val() + "\"," + //签约状态
            "\"fwztDm\":\"" + $('input[name="fwzt"]:checked').val() + "\"," + //服务状态
            "\"ztztDm\":\"" + $('input[name="ztzt"]:checked').val() + "\"," + //账套创建
            "\"khdjDm\":\"" + $('input[name="khjb"]:checked').val() + "\"," + //客户级别
            "\"IDType\":\"" + IDType + "\"," + //客户级别
            "\"ptSwtxlist\":" + tableData + "," +
            "\"ptGdxxlist\":" + gdData2 + "}";
        } else { //未开通（传回了开通状态，用于判断是否更新app_khxx）
        	var datas = "{\"yhmc\":\"" + $('input[name="gsjc"]').val() + "\"," + //客户名称
            "\"gsmc\":\"" + ogsm + "\"," + //公司名称
            "\"khflDm\":\"" + o_khfl + "\"," + //客户分类
            "\"hyml\":\"" + $('#ML', jqueryMap.$customerManageEditForm).val() + "\"," + //行业门类
            "\"hydl\":\"" + hydl + "\"," + //行业大类
            "\"hymc\":\"" + hymc + "\"," + //大类名称
            "\"sfdm\":\"" + sfdm + "\"," + //所在地区
            "\"csdm\":\"" + csdm + "\"," + //所在地区
            "\"csmc\":\"" + csmc + "\"," + //城市名称
            "\"frdb\":\"" + $('input[name="frdb"]').val() + "\"," + //法人代表
            "\"sfzhm\":\"" + $('input[name="sfzh"]').val() + "\"," + //身份证号
            "\"yyzz\":\"" + $('input[name="yyzz"]').val() + "\"," + //营业执照号
            "\"zzjgdm\":\"" + $('input[name="zzjgdm"]').val() + "\"," + //组织机构代码
            clrq + //成立日期
            ksdzrq + //开始代账日期
            "\"zczj\":\"" + $('input[name="zczj"]', jqueryMap.$customerManageEditForm).val() + "\"," + //注册资金
            "\"bygsmc\":\"" + $('input[name="bygsmc"]', jqueryMap.$customerManageEditForm).val() + "\"," + //备用公司名称
            "\"zcdz\":\"" + $('input[name="zcdz"]', jqueryMap.$customerManageEditForm).val() + "\"," + //注册地址
            "\"jyfw\":\"" + $('input[name="jyfw"]', jqueryMap.$customerManageEditForm).val() + "\"," + //经营范围
            "\"bzxx\":\"" + $('input[name="bzxx"]').val() + "\"," + //备注信息
            "\"hgdm\":\"" + $('input[name="hgdm"]').val() + "\"," + //海关代码
            "\"zydm\":\"" + $('#gjr').val() + "\"," + //主管会计
            "\"khjl_dm\":\"" + $('#khjl').val() + "\"," + //客户经理
            "\"zydm_before\":\"" + configMap.zgkj_dm + '_' + configMap.zgkj_mc + "\"," + //已保存的主管会计
            "\"khjl_before\":\"" + configMap.khjl_dm + '_' + configMap.khjl_mc + "\"," + //已保存的客户经理
            "\"tjrdm\":\"" + $('#tjrmcSl1').val() + "\"," + //推荐人代码
            "\"wbtjrmc\":\"" + $('#wbtjrmc').val() + "\"," + //外部推荐人
            "\"lxrmc\":\"" + $('input[name="lxr"]').val() + "\"," + //联系人
            "\"bgdh\":\"" + $('input[name="bgdh"]').val() + "\"," + //办公电话
            "\"sjhm\":\"" + $('input[name="sjhm"]').val() + "\"," + //手机号码
            "\"czhm\":\"" + $('input[name="czhm"]').val() + "\"," + //传真号码
            "\"qq\":\"" + $('input[name="qq"]').val() + "\"," + //qq
            "\"email\":\"" + $('input[name="email"]').val() + "\"," + //email
            "\"qtxx\":\"" + $('input[name="qt"]').val() + "\"," + //其他信息
            "\"xxdz\":\"" + $('input[name="xxdz"]').val() + "\"," + //详细地址
            "\"fdxm\":\"" + $('input[name="fdxm"]', jqueryMap.$customerManageEditForm).val() + "\"," + //房东姓名
            "\"fdsfzh\":\"" + $('input[name="fdsfzh"]', jqueryMap.$customerManageEditForm).val() + "\"," + //房东身份证号
            "\"zzsxzDm\":\"" + o_zzsxz + "\"," + //增值税性质
            "\"zzsxzMc\":\"" + o_zzsxzName + "\"," + //增值税性质名称
            "\"sl\":" + sl + "," + //税率
            "\"nsrsbh\":\"" + $('input[name="nsrsbh"]').val() + "\"," + //税务登记号
            "\"nsrbm\":\"" + $('input[name="nsrbm"]').val() + "\"," + //纳税人编号
            "\"zgswfj\":\"" + $('input[name="zgswfj"]').val() + "\"," + //主管税务分局
            "\"swzlbz\":\"" + $('input[name="swzlbz"]').val() + "\"," + //税务资料备注
            "\"taxtaxUserName\":\"" + $('#taxtaxUserName').val() + "\"," + //主管税务分局
            "\"taxtaxPassword\":\"" + $('#taxtaxPassword').val() + "\"," + //税务资料备注
            "\"qyztDm\":\"" + $('input[name="qyzt"]:checked').val() + "\"," + //签约状态
            "\"fwztDm\":\"" + $('input[name="fwzt"]:checked').val() + "\"," + //服务状态
            "\"ztztDm\":\"" + $('input[name="ztzt"]:checked').val() + "\"," + //账套创建
            "\"khdjDm\":\"" + $('input[name="khjb"]:checked').val() + "\"," + //客户级别
            "\"khdjDm\":\"" + $('input[name="khjb"]:checked').val() + "\"," + //客户级别
            "\"ifktapp\":\"" + $('input[name="ktapp"]:checked').val() + "\"," + //是否开通
            "\"IDType\":\"" + IDType + "\"," + //客户级别
            "\"ptSwtxlist\":" + tableData + "," +
            "\"ptGdxxlist\":" + gdData2 + "}";
        }
        var url = "";
        if (ogsm == configMap.gsmc) {
            url = configMap.path + configMap.dataUrlUpdate + "/" + configMap.id + "/"
                + configMap.khdm + "/" + configMap.zydm + "/" + configMap.nsrsbh + "/0"; //未改变
        } else {
            url = configMap.path + configMap.dataUrlUpdate + "/" + configMap.id + "/"
                + configMap.khdm + "/" + configMap.zydm + "/" + configMap.nsrsbh + "/1"; //已改变
        }

        var requestType = 'POST';
        if (checkOne()===false){
            return
        } else if (checkTwo()===false){
            return
        } else {
            $('#editSaveKhxx').html("正在保存数据...");
            $.ajax({
                url: url,
                type: requestType,
                contentType: 'application/json; charset=utf-8',
                data: datas,
                success: function (result) {
                    $('#editSaveKhxx').html("保存");
                    if (result.success) { //客户列表打开的tab
                        if (configMap.type === 'khxx') {
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
                        } else { //意向客户打开的tab
                            //关闭当前选项卡
                            var  id = 'yxkhid';
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
                            appcustomerinfo.reload();
                        }
                    } else {
                        Messenger().post({
                            message: result.message,
                            type: 'danger'
                        });
                    }

                },
                error: function (result) {
                    Messenger().post({
                        message: '更新失败！',
                        type: 'danger'
                    });
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
            success: function (data) {
                var result = data.khxx;
                $('input[name="gsjc"]', jqueryMap.$customerManageEditForm).val(result.yhmc);
                $('input[name="nsrsbh"]', jqueryMap.$customerManageEditForm).val(result.nsrsbh); // 税务登记号
                $('input[name="gsmc"]', jqueryMap.$customerManageEditForm).val(result.gsmc); // 公司名称
                $('#customerStyle', jqueryMap.$customerManageEditForm).val(result.khflDm).trigger("change");// 客户分类
                $("#ML", jqueryMap.$customerManageEditForm).val(result.hyml).trigger('change');// 行业门类
                $("#loc_province", jqueryMap.$customerManageEditForm).val(result.sfdm).trigger('change');
                $('input[name="frdb"]', jqueryMap.$customerManageEditForm).val(result.frdb); // 法人代表
                $('input[name="sfzh"]', jqueryMap.$customerManageEditForm).val(result.sfzhm); // 身份证号
                $('input[name="yyzz"]', jqueryMap.$customerManageEditForm).val(result.yyzz); // 营业执照号
                $('input[name="zzjgdm"]', jqueryMap.$customerManageEditForm).val(result.zzjgdm);// 组织机构代码
                $('.createDate', jqueryMap.$customerManageEditForm).datepicker('update', moment(result.clrq).format('YYYY-MM-DD'));// 成立日期
                $('.startDate', jqueryMap.$customerManageEditForm).datepicker('update', moment(result.ksdzrq).format('YYYY-MM-DD'));// 开始代账日期
                $('input[name="bzxx"]', jqueryMap.$customerManageEditForm).val(result.bzxx); // 备注信息
                $('input[name="hgdm"]', jqueryMap.$customerManageEditForm).val(result.hgdm); // 海关代码
                $('input[name="zczj"]', jqueryMap.$customerManageEditForm).val(result.zczj); // 注册资金
                $('input[name="bygsmc"]', jqueryMap.$customerManageEditForm).val(result.bygsmc); // 备用公司名称
                $('input[name="zcdz"]', jqueryMap.$customerManageEditForm).val(result.zcdz); // 注册地址
                $('input[name="jyfw"]', jqueryMap.$customerManageEditForm).val(result.jyfw); // 经营范围
                $("#gjr", jqueryMap.$customerManageEditForm).val(result.zydm + "_" + result.zyxm).trigger("change"); // 跟进人
                configMap.zgkj_dm = result.zydm;
                configMap.zgkj_mc = result.zyxm;
                if (result.khjl_dm == null || result.khjl_dm == "" || result.khjl_dm == "null") {
                    configMap.khjl_dm = 'noResult';
                    configMap.khjl_mc = '';
                } else {
                    configMap.khjl_dm = result.khjl_dm;
                    configMap.khjl_mc = result.khjl_mc
                }
                $("#khjl", jqueryMap.$customerManageEditForm).val(result.khjl_dm + "_" + result.khjl_mc).trigger("change"); // 客户经理
                $('input[name="tjrmc"]', jqueryMap.$customerManageEditForm).val(result.tjrmc); // 推荐人名称
                $('input[name="tjrdm"]', jqueryMap.$customerManageEditForm).val(result.tjrdm); // 推荐人代码
                $('#wbtjrmc', jqueryMap.$customerManageEditForm).val(result.wbtjrmc); //外部推荐人
                $('input[name="fdxm"]', jqueryMap.$customerManageEditForm).val(result.fdxm); //房东姓名
                $('input[name="fdsfzh"]', jqueryMap.$customerManageEditForm).val(result.fdsfzh); //房东身份证号
                $('input[name="lxr"]', jqueryMap.$customerManageEditForm).val(result.lxrmc);// 联系人
                $('input[name="bgdh"]', jqueryMap.$customerManageEditForm).val(result.bgdh); // 办公电话
                $('input[name="sjhm"]', jqueryMap.$customerManageEditForm).val(result.sjhm);// 手机号码
                $('input[name="czhm"]', jqueryMap.$customerManageEditForm).val(result.czhm);// 传真号码
                $('input[name="qq"]', jqueryMap.$customerManageEditForm).val(result.qq);// qq
                $('#IDType',jqueryMap.$customerManageEditForm).val(result.idtype);
                $('input[name="email"]', jqueryMap.$customerManageEditForm).val(result.email); // email
                $('input[name="qt"]', jqueryMap.$customerManageEditForm).val(result.qtxx);// 其他信息
                $('input[name="xxdz"]', jqueryMap.$customerManageEditForm).val(result.xxdz); // 详细地址
                $('#zzsxz', jqueryMap.$customerManageEditForm).val(result.zzsxzDm).trigger("change"); // 增值税性质
                $('input[name="sl"]', jqueryMap.$customerManageEditForm).val(result.sl);// 税率
                $('input[name="nsrbm"]', jqueryMap.$customerManageEditForm).val(result.nsrbm);// 纳税人编码
                $('input[name="zgswfj"]', jqueryMap.$customerManageEditForm).val(result.zgswfj); // 主管税务分局
                $('input[name="swzlbz"]', jqueryMap.$customerManageEditForm).val(result.swzlbz); // 税务资料备注
                $('input[name="qyzt"][value=' + result.qyztDm + ']', jqueryMap.$customerManageEditForm).iCheck('check'); //签约状态
                $('input[name="fwzt"][value=' + result.fwztDm + ']', jqueryMap.$customerManageEditForm).iCheck('check'); //服务状态
                if (result.ztztDm != null) {
                    $('input[name="ztzt"][value=' + result.ztztDm + ']', jqueryMap.$customerManageEditForm).iCheck('check'); //账套状态
                } else {
                    $('input[name="ztzt"][value="false"]', jqueryMap.$customerManageEditForm).iCheck('check'); //账套状态
                }
                if (result.khdjDm != null) {
                    $('input[name="khjb"][value=' + result.khdjDm + ']', jqueryMap.$customerManageEditForm).iCheck('check'); //客户等级
                } else {
                    $('input[name="khjb"][value="A"]', jqueryMap.$customerManageEditForm).iCheck('check'); //客户等级
                }
                $('input[name=ktapp][value="false"]', jqueryMap.$customerManageEditForm).iCheck('check'); //开通app（默认未开通）
                if (result.ifktapp) { //开通app
                	configMap.ifkt = '1';
                	configMap.appId = result.id;
                	$('#hideBtn', jqueryMap.$customerManageEditForm).show(); //修改账号按钮
                    $('#lmfkhztxy',jqueryMap.$customerManageEditForm).css({'margin-bottom':100})

                } else { //未开通
                	$('#ifktapp', jqueryMap.$customerManageEditForm).show(); //开通选项展示出来  
                	$('#ifktappmm', jqueryMap.$customerManageEditForm).show(); //开通选项展示出来
                }
                configMap.zydm = result.zydm; //职员代码
                configMap.nsrsbh = result.nsrsbh; //纳税人识别号
                configMap.gsmc = result.gsmc; //纳税人识别号
                InitTableDate(khdm);
                getCity(result.csdm);
                getDL(result.hydl);

                var gdxx = data.gdxx; //股东信息，list
            //    1首先只有一条股东信息的时候,也就是没有克隆的
                if(gdxx.length>0){
                    var gdxx1 = gdxx[0];
                    $('#customerManageEditForm input[name="gdxm"]').val(gdxx1.gdxm);
                    $('#customerManageEditForm input[name="gdsfzh"]').val(gdxx1.gdsfzh);
                    $('#customerManageEditForm input[name="gddh"]').val(gdxx1.gddh);
                    $('#customerManageEditForm input[name="gdyx"]').val(gdxx1.gdyx);
                    $('#customerManageEditForm input[name="gdzgbl"]').val(gdxx1.gdzgbl);
                }
                if(gdxx.length>1){
                    var  gdxx2;
                    gdxx.shift();
                    gdxx2 = gdxx;
                    $('#customerManageEditForm .IncreaseInfoWrap:gt(1)').remove();
                    $.each(gdxx2,function(i,v){

                        $(' <div class="IncreaseInfoWrap">'+
                            '<div class="titleInfo row" style="margin-left:16px ">'+
                            '<div class="col-xs-12">'+
                            '<div class="h5 titleSty" style="display: inline-block">股东信息</div>'+
                            '<i class="IncreaseInfo glyphicon glyphicon-minus deleteGuDongInfo_M" title="删除该条股东信息" style="float: right;font-size: 20px;margin-top: 10px;cursor: pointer;color: #10A0F7;"></i>'+
                            '</div>'+
                            '</div>'+
                            '<div class="contentSty">'+
                            '<div class="row form-group">'+
                            '<div class="col-md-12">'+
                            '<div class="input-group col-md-12">'+
                            '<div class="col-md-6" style="padding: 0">'+
                            '<label class="labelCommon labelWidth-col-two labelBg color666" style="margin-left: 32px">'+
                            '股东姓名</label>'+
                            '<input type="text" value="'+v.gdxm+'" class="inputCommon inputWidth-col-two" name="gdxm">'+
                            '</div>'+
                            '<div class="col-md-6">'+
                            '<label class="labelCommon labelWidth-col-two labelBg color666">'+
                            '身份证</label>'+
                            '<input type="text" value="'+v.gdsfzh+'" class="inputCommon inputWidth-col-two" name="gdsfzh">'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '<div class="row form-group">'+
                            '<div class="col-md-12">'+
                            '<div class="input-group col-md-12">'+
                            '<div class="col-md-4" style="padding: 0">'+
                            '<label class="labelCommon  labelBg color666" style="width: 75px;margin-left: 31px">'+
                            '电话</label>'+
                            '<input type="text" value="'+v.gddh+'" class="inputCommon " name="gddh" style="width: 119px">'+
                            '</div>'+
                            '<div class="col-md-5" style="padding: 0">'+
                            '<label class="labelCommon  labelBg color666" style="width: 75px;margin-left: 32px">'+
                            '邮箱</label>'+
                            '<input type="text" value="'+v.gdyx+'" class="inputCommon " name="gdyx" style="width: 159px">'+
                            '</div>'+
                            '<div class="col-md-3">'+
                            '<label class="labelCommon  labelBg color666" style="width: 63px">'+
                            '占股比例</label>'+
                            '<input type="text" value="'+v.gdzgbl+'" class="inputCommon " name="gdzgbl" style="width:66px;">'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>').insertAfter($('#customerManageEditForm .IncreaseInfoWrap:eq(0)'));
                    })
                }
            },
            error: function () {
                Messenger().post({
                    message: '该客户已停止服务或信息加载失败！',
                    type: 'danger'
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
                allowClear: false,
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
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#loc_city', jqueryMap.$customerManageEditForm));
            }
            //$('#loc_city', jqueryMap.$customerManageEditForm).val(e);
            setTimeout($('#loc_city', jqueryMap.$customerManageEditForm).val(e).trigger("change"),1000);
            $('#loc_city', jqueryMap.$customerManageEditForm).select2({
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
                $('<option value="' + data[i].hydm + '">' + data[i].hymc + '</option>').appendTo($('#ML', jqueryMap.$customerManageEditForm));
            }
            $('#ML', jqueryMap.$customerManageEditForm).select2({
                placeholder: '选择门类',
                width: '186px',
                allowClear: false,
                language: 'zh-CN'
            });

            //根据所选数据的客户代码查询数据
            findCustomers(configMap.khdm);
        });
    }

    var getDL = function (e) {
        $('#DL', jqueryMap.$customerManageEditForm).empty();
        var v = $('#ML', jqueryMap.$customerManageEditForm).val();
        $.get(configMap.path + '/commonmanager/xzqy/DL?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].hydm + '">' + data[i].hymc + '</option>').appendTo($('#DL', jqueryMap.$customerManageEditForm));
            }
            //$('#DL', jqueryMap.$customerManageEditForm).val(e);
            setTimeout($('#DL', jqueryMap.$customerManageEditForm).val(e).trigger("change"),1000);
            $('#DL', jqueryMap.$customerManageEditForm).select2({
                placeholder: '选择大类',
                width: '186px',
                allowClear: false,
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
                for (var i = 0; i < data.length; i++) {
                    $('<option value="' + data[i].khfl_dm + '">' + data[i].khfl_mc + '</option>').appendTo($('#customerStyle', jqueryMap.$customerManageEditForm));
                }
                //客户分类
                $('#customerStyle', jqueryMap.$customerManageEditForm).select2({
                    data: custorStyleNum,
                    placeholder: '请选择',//默认文字提示
                    language: "zh-CN",//汉化
                    allowClear: false,//允许清空
                    width: '156px',
                });
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
            url: '/customermanage/customerManage/getParams/ZZSXZ',
            type: "get",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $('<option value="' + data[i].typecode + '">' + data[i].paramsname + '</option>').appendTo($('#zzsxz', jqueryMap.$customerManageEditForm));
                }

                // for (var j = 0; j < data.length; j++) {
                //     zzsxz.push(data[j].paramsname);
                // }
                //增值税性质
                $('#zzsxz', jqueryMap.$customerManageEditForm).select2({
                    data: zzsxz,
                    placeholder: '请选择',//默认文字提示
                    language: "zh-CN",//汉化
                    allowClear: false,//允许清空
                    width: '196px',
                });
                // for (var j = 0; j < data.length; j++) {
                //     $("#zzsxz option").eq(j).val(data[j].typecode);
                // }
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
                            for (var i = 0; i < data.length; i++) {
                                $('<option value="' + data[i].khfl_dm + '">' + data[i].khfl_mc + '</option>').appendTo($('#customerStyle', jqueryMap.$customerManageEditForm));
                            }
                            //客户分类
                            $('#customerStyle', jqueryMap.$customerManageEditForm).select2({
                                data: custorStyleNum,
                                placeholder: '请选择',//默认文字提示
                                language: "zh-CN",//汉化
                                allowClear: false,//允许清空
                                width: '156px',
                            });
                        }
                    });

                } else {
                    Messenger().post({
                        message: '客户分类增加失败！',
                        type: 'danger'
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
        if(type=='communication'){
            dialogButtons.success = {
                label: '提&nbsp;交',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {

                }
            }
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
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
            url: '/customermanage/ptkhxx/getFileSize/' + configMap.khdm,
            type: "get",
            dataType: "json",
            success: function (data) {
                $("#addfiles").html("添加附件（" + data.size + "）")
            },
            error: function (result) {
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
                    $('#tjrmcSl',jqueryMap.$customerManageEditForm).val($('#alreadyPer li','#allotStaffList_m').attr('user'));
                    $('#tjrmcSl1',jqueryMap.$customerManageEditForm).val( $('#alreadyPer li','#allotStaffList_m').attr('zydm'));
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
        init: function (khdm, id, type) {
            configMap.khdm = khdm;
            configMap.id = id;
            configMap.type = type;
            /**
             * select2及数据展示加载顺序为：
             * 1.加载跟进人
             * 2.加载税种
             * 3.客户分类
             * 4.增值税性质
             * 5.加载省
             * 6.加载门类
             * 7.加载数据
             * 8.加载市及大类
             */

            //加载跟进人
            getGjr();
            //客户经理
            getKhjl();
            setJqueryMap();
            tabMenu('khxx_info');
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
            
//			//税种设置
//			$('#selectSz', jqueryMap.$customerManageEditForm).select2({
//		        placeholder: '请选择税种',
//		        width: '100%',
//		        allowClear: true,
//		        language: 'zh-CN'
//		      });
            //申报周期
            $('#selectSbzq', jqueryMap.$customerManageEditForm).select2({
                placeholder: '请选择申报周期',
                width: '100%',
                allowClear: false,
                language: 'zh-CN'
            });
//			//次月报税日期
			$('#selectBsrq', jqueryMap.$customerManageEditForm).select2({
		        placeholder: '次月报税日期',
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
//			//市级
//			$('#loc_city',jqueryMap.$customerManageEditForm).select2({
//            	placeholder:'选择地级市/区',
//            	width:'186px',
//            	allowClear:true,
//            	language:'zh-CN'
//            });

            //添加
            $('#szAdd', jqueryMap.$customerManageEditForm).off().on('click', function () {
                szAdd();
            });

            //加载日期
            //getrq();
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

            //选择推荐人事件 用focus事件
            $('#tjrmcSl', jqueryMap.$customerManageEditForm).focus(function(){
                openModal1('选推荐人', '/systemmanager/businesscooperate/staffList.jsp?type=one','edit');
            });

            $('#editSaveKhxx').off().on('click',function () {
                updatecustomer();
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
            	/*var nsrsbh = $('input[name="nsrsbh"]', jqueryMap.$customerManageEditForm).val(); //纳税人识别号
            	if (nsrsbh == "" || nsrsbh == null) {
            		Messenger().post({
                        message: '请先填写税务登记号！',
                        type: 'warning'
                      });
            		return false;
            	} else {*/
            		var dialogButtons = {};
                    dialogButtons.success = {
                        label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                        className: "btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4",
                        callback: function () {
                        	AppSave.saveZh(function (result) {
                                if (result.success) {
                                	$('input[name="sjhm"]', jqueryMap.$customerManageEditForm).val(result.sjhm);
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
                    $.get(configMap.path + configMap.appUrl + "?khdm=" + encodeURI(configMap.khdm), function (html) {
                        jqueryMap.$appZH = bootbox.dialog({
                            title: 'App账户——手机验证码登录方式',
                            message: html,
                            buttons: dialogButtons
                        });
                    });
            	//}
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },
        validate1:checkOne ,
        validate2:checkTwo ,
        openModalOut:openModal,

        // 保存雇员信息，参数为回掉函数
        updatecustomer: function (callback) {

            updatecustomer(callback);
        }
    };
}();