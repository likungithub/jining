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

var swsblist_data = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        aesUrl:'/customermanage/customerManage/aes',
        dataUrl: '/organization/organization/orgAndUserAuth',  //user节点的id为UUID，org节点的id也为UUID
        swsbCusromersUrl: '/customermanage/ptswsb/sbkhlist',
        swsbszUrl:'/customermanage/ptswsb/setTaxdeclaration',
        createUserPageUrl: '/user/users/edit.jsp',
        addUrl: '/customermanage/customerManage/add.jsp',
        editUrl: '/customermanage/customerManage/edit.jsp',
        addcontractPageUrl: '/customermanage/contract/addContract.jsp',
        updateUrl: '/customermanage/ptkhxx/updateCustomer',
        importUrl: '/customermanage/customerManage/importExcel.jsp',
        currentSelectedNode: null,
        reportTaxPageUrl: '/customermanage/reporttax/reporttax.jsp',
        followupPageUrl: '/customermanage/followup/followup.jsp',
        accountingPageUrl: '/customermanage/financialinformation/financialinformation.jsp',
        addchargePageUrl: '/customermanage/charge/addCharge.jsp',
        viewchargePageUrl: '/customermanage/charge/viewCharge.jsp',
        dispatchPageUrl: '/customermanage/dispatch/dispatch.jsp',
        susbListGrid: null,
        optType: null,
        orgTypes: [],
        fwzt: true,
        type: 1,
        other: "all",
        now: "1", //初始加载时为1，其他时为0
        verifyType: '',
        declareBtn_html: '<a class="btn btn-xs  colorBlue-10a0f7"  data-toggle="tooltip" data-placement="top"  data-type="declare" title="网上办税厅"><i class="icon iconfont icon-shenbao- iconFontColor-10a0f7" style="position:relative;top:2px;font-weight: 400;font-size: 16px;"></i></a>',
        swsbszBtn_html: '<a class="btn btn-xs  colorBlue-10a0f7" data-toggle="tooltip" data-placement="top"  data-type="swsbsz" title="设置"><i class="icon iconfont icon-shezhi- iconFontColor-10a0f7" style="position:relative;top:2px;font-weight: 400;font-size: 16px;"></i></a>',
        viewCustomerBtn_html: '<a class="btn btn-xs  colorBlue-10a0f7" data-toggle="tooltip" data-placement="top"  data-toggle="tooltip" title="查看企业详情" style="background: transparent !important;border: none !important;color: #666 !important;margin-right: 0px;" data-type="view"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7" style="font-size: 16px;margin-top: 4px;"></i></a>',
        viewBsBtn : '<a class="tb  colorBlue-10a0f7" data-toggle="tooltip" data-placement="top" type="button" title="" data-original-title="报税" data-type="BSSZ"><i class="icon iconfont icon-baoshui" style="position: relative;top: 3px;padding-right: 3px;font-weight: 400;font-size: 16px;"></i></a>',
        khbmString:'',
        swType:""
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $customerManageFrom: null,
        $blockTarget: null,
        $swsbDepListTree: null,
        $swsbCustomerDialog: null,
        $selectedRow: null,
        $swsbListDataTable: null
    };
    var setJqueryMap = function () {
        jqueryMap.$container = $('#swsb-list-content');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$swsbDepListTree = $('#swsb_bm_tree', jqueryMap.$container);
        jqueryMap.$swsbListDataTable=$("#swsb-list-table",jqueryMap.$container);
    };




    var operateModal = function(title,content,type){
        var dialogButtons = {};
        if (type === 'account') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 确 定',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    var date1 = $('#customerBelongTime1 input').val();
                    if (date1 == null || date1 == '' || date1 == 'undefined') {
                        Messenger().post({
                            message: '请填写日期！',
                            type: 'warning'
                        });
                        return false;
                    }
                    var d1 = new Date(date1.replace(/\-/g, "\/")); //所选月份
                    var d2 = new Date(); //当前时间
                    d2.setDate(1); //当月第一天
                    if (d1 > d2) { //所选月份在后面
                        Messenger().post({
                            message: '记账日期不得晚于当前月份！',
                            type: 'warning'
                        });
                        return false;
                    }
                    date1 = date1.split("-")[0] + date1.split("-")[1];
                    var jzbz = $('#accountingLabel input[name="1"]:checked').val();
                    var tbbs = $('#accountingLabel input[name="3"]:checked').val(); //同步报税
                    $.ajax({ //插入数据
                        url: '/customermanage/ptkhxx/saveAccountList/1/' + date1 + '/' + jzbz + '/' + tbbs,
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'JSON',
                        type: 'POST',
                        data: configMap.khbmString,
                        success: function (data) {
                            Messenger().post({
                                message: "保存成功！",
                                type: 'success'
                            });
                        },
                        error: function () {
                            Messenger().post({
                                message: "保存失败！",
                                type: 'error'
                            });
                            return false;
                        }
                    });
                }
            };
        }
        if (type === 'tax') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 确 定',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    var date1 = $('#customerBelongTime2 input').val();
                    if (date1 == null || date1 == '' || date1 == 'undefined') {
                        Messenger().post({
                            message: '请填写日期！',
                            type: 'warning'
                        });
                        return false;
                    }
                    var d1 = new Date(date1.replace(/\-/g, "\/")); //所选月份
                    var d2 = new Date(); //当前时间
                    d2.setDate(1); //当月第一天
                    if (d1 > d2) { //所选月份在后面
                        Messenger().post({
                            message: '报税日期不得晚于当前月份！',
                            type: 'warning'
                        });
                        return false;
                    }
                    date1 = date1.split("-")[0] + date1.split("-")[1];
                    var bsbz = $('#taxLabel input[name="2"]:checked').val();
                    var tbbs = '0';
                    $.ajax({ //插入数据
                        url: '/customermanage/ptkhxx/saveAccountList/2/' + date1 + '/' + bsbz + '/' + tbbs,
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'JSON',
                        type: 'POST',
                        data: configMap.khbmString,
                        success: function (data) {
                            Messenger().post({
                                message: "保存成功！",
                                type: 'success'
                            });
                        },
                        error: function () {
                            Messenger().post({
                                message: "保存失败！",
                                type: 'error'
                            });
                            return false;
                        }
                    });
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 取 消',
            className: 'btn borderRadius4 color666',
            callback: function () {

            }
        }

        var dialog = bootbox.dialog({
            title:title,
            message:content ,
            buttons:dialogButtons
        });
    }


    var openModal = function (title, url, type, func) {
        var dialogButtons = {};

        if(type==='swsbsz'){
            dialogButtons.success ={
                label:'<i class="fa fa-save" ></i>&nbsp;提&nbsp;交',
                className:"btn btn btn-default btnBlue borderRadius4 colorfff",
                callback:function () {
                   var flag=func();
                   if(!flag){
                       return false;
                   }

                }
            }
        }

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        if (type === 'addCustomer') {
            dialogButtons.success = {
                label: '<i class="icon iconfont icon-xiayibu iconFontSize" style="color: #fff;"></i>'+' 下一步 ',
                className: "btn btn-default btnBlue btnBorderColor colorfff next",
                callback: function () {
                    func();

                    return false;
                }
            };
        }
        if (type === 'charge') {

            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }
        if (type === 'Dispatch') {
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
            className: 'btn borderRadius4 color666',
            callback: function () {
                sessionStorage.removeItem("uuid");
                sessionStorage.removeItem("filesize");
            }
        }

        $.get(url, function (html) {

            jqueryMap.$swsbCustomerDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });

            if (type === 'addCustomer') {
                //对第一个页面按钮的改正
                $('div.modal-footer').empty();
                $('div.modal-footer').append('<button type="button" id="next" class="btn btn btn-default btnBlue borderRadius4 colorfff"><i class="fa fa-save"></i> 下&nbsp;一&nbsp;步 </button>');
                //第一个页面下一步操作
                $('#next').click(function () {
                    var e = $('p.active1').parent();
                    var linum = e.index() + 1;
                    $('.o-m .ul-o li').eq(linum).click();
                });
            }
        });
    };




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
    }


    var initOrganization = function () {
        var jstree = jqueryMap.$swsbDepListTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.path + configMap.dataUrl
                },
                "state": {
                    "opened": true,  //展示第一个层级下面的node
                    //该根节点不可点击
                }
            },
            "types": {
                "default": {
                    "icon": true
                }

            },

            'plugins': ["types", "expand", "search"],
            "expand": {
                level: 5
            }
        }).on("load_node.jstree", function (e, d) {
           $("#swsb_bm_tree").on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            getTreeNum();
            $("#swsb_bm_tree").bind("select_node.jstree", function (e, data) {

                if (data.node.id == 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        $("#swsb_bm_tree").jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });


        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#swsb_bm_tree li").length; i++) {
                var $temp = $("#swsb_bm_tree li").eq(i).attr("userimg");
                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                } else {
                    localStorage.setItem("step",i);
                }
            }
            $(".jstree-children li").each(function () {
                if($(this).attr("userImg")==0){
                    $(this).find("a").eq(0).find("i").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
                }

            })
        }
        var clearTreeNum = function () {
            for (var i = 0; i < $("#swsb_bm_tree  li").length; i++) {
                var $temp = $("#swsb_bm_tree  li").eq(i).attr("userimg");

                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                } else {
                    $("#swsb_bm_tree li").eq(i).find("a").remove();
                }
            }
        };


       jqueryMap.$swsbDepListTree.on('select_node.jstree', function (e, data) {
            configMap.currentSelectedNode = data.node;
            configMap.optType = 'edit';
           if (data.node.parent === '#'){
               configMap.type = 1;
               //configMap.now = "0";
               configMap.fwzt = true; //正在服务的
               if (data.node.id === 'stopCustomer') {//停止服务的
                   configMap.fwzt = false;
               }
           }else if(data.node.li_attr.BMBZ === "1") { //点击的部门
               configMap.fwzt = true; //正在服务的
               configMap.type = 2; //代表部门
               configMap.other = data.node.li_attr.bmdm; //部门代码
           }else{ //点击的个人
               configMap.fwzt = true; //正在服务的
               configMap.type = 3;
               configMap.other = data.node.li_attr.zydm;
           }
           App.blockUI({
               target: jqueryMap.$blockTarget,
               boxed: true,
               message: '正在获取数据，请稍候...'
           });
           configMap.susbListGrid.ajax.reload();
           App.unblockUI(jqueryMap.$blockTarget);

        });
        var to = false;
        $('#search_BS').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_BS').val());
                // $("#orgAndUser_manage_tree").jstree(true).refresh();
            }, 250);

        });
    };
    var editCustomerManage = function (e) {
        stopContinueClick(e, 300);
        var el = $(e);
        var rowIndex = configMap.susbListGrid.cell(el.parent()).index().row;
        var khdm = configMap.susbListGrid.row(rowIndex).data().khbm;
        var gsmc = configMap.susbListGrid.row(rowIndex).data().gsmc;
        var id = configMap.susbListGrid.row(rowIndex).data().id;
        sessionStorage.setItem('customerkhdm',khdm);
        generateTab(this,configMap.path + configMap.editUrl + "?khdm=" + khdm + "&id=" + id, gsmc,"khxx_info",'fa fa-file-text-o iconMr');
        // openModal(gsmc+'信息', configMap.path + configMap.editUrl + "?khdm=" + khdm + "&id=" + id, 'addCustomer', function () {
        //     customerManageedit.updatecustomer(function (result) {
        //         if (result) {
        //             jqueryMap.$swsbCustomerDialog.modal('hide');
        //             configMap.susbListGrid.clear().draw();
        //             configMap.susbListGrid.ajax.reload();
        //             //welcome.SWTXTableData();
        //         }
        //     });
        // });
    };
    var viewSwsb=function () {
        var el = $(this);
        var rowIndex = configMap.susbListGrid.cell(el.parent()).index().row;
        var khdm = configMap.susbListGrid.row(rowIndex).data().khbm;
        var gsmc = configMap.susbListGrid.row(rowIndex).data().gsmc;
        var id = configMap.susbListGrid.row(rowIndex).data().id;
        sessionStorage.setItem('customerkhdm',khdm);
        generateTab(this,configMap.path + configMap.editUrl + "?khdm=" + khdm + "&id=" + id, gsmc,"khxx_info",'fa fa-file-text-o iconMr');
        // openModal(gsmc+'信息', configMap.path + configMap.editUrl + "?khdm=" + khdm + "&id=" + id, 'addCustomer', function () {
        //     customerManageedit.updatecustomer(function (result) {
        //         if (result) {
        //             jqueryMap.$swsbCustomerDialog.modal('hide');
        //             configMap.susbListGrid.clear().draw();
        //             configMap.susbListGrid.ajax.reload();
        //             //welcome.SWTXTableData();
        //         }
        //     });
        // });
    };
    var declare=function () {
        var el = $(this);
        var rowIndex = configMap.susbListGrid.cell(el.parent()).index().row;
        localStorage.setItem("index",rowIndex);

        var khdm = configMap.susbListGrid.row(rowIndex).data().khbm;
        openModal("网上办税厅",configMap.path+"/customermanage/taxDeclaration/onekeylogon.jsp?khbm="+khdm,"onekeylogin",null);
    };
    var swsbsz=function (index) {
        var el = $(this);
        if(typeof (index) == "string"){
            var rowIndex = localStorage.getItem("index");
        }else{
            var rowIndex = configMap.susbListGrid.cell(el.parent()).index().row;
        }
        var khdm = configMap.susbListGrid.row(rowIndex).data().khbm;
        var gsmc = configMap.susbListGrid.row(rowIndex).data().gsmc;
        openModal("登录设置——"+gsmc,configMap.path+"/customermanage/taxDeclaration/declarationSetting.jsp?khbm="+encodeURI(khdm),"swsbsz",function () {
          var flag =false;
           var swjlxDm = $("#bssz ul li:nth-child(1)").val();
           var bsyzjlxDm = $('#bssz-bsyzjlx').val();
           var bsyzjhm = $('#bssz-bsyzjhm').val();
           var sfdm =$('#bssz-province').val();
           var csdm = $('#bssz-city').val();
           var bsyfwmm=$('#bssz-bsyfwmm').val();
            var qydlmm = $('#bssz-qydlmm').val();
           if (bsyzjlxDm=="201"){
               if(!whetherOrNotID(bsyzjhm)){
                   AppAlert("请输入正确身份证号码！");
                   return false;
               }
           }
            if(sfdm=="001"||sfdm==""||sfdm==null){
                AppAlert("请选择省份！");
               return false;
            }
            if(csdm=="001"||csdm==""||csdm==null){
                AppAlert("请选择城市！");
               return false;
            }
            if(swjlxDm==""||swjlxDm==null){
                AppAlert("请选择税务局类型！");
               return false;
            }
            if(bsyzjhm==""||bsyzjhm==null){
                AppAlert( "请输入办税员证件号码！");
               return false;
            }
            if(bsyfwmm==""||bsyfwmm==null){
                AppAlert("请输入办税员服务密码！")
               return false;
            }
            if(qydlmm==""||qydlmm==null){
                AppAlert("请输入企业登录密码！");
                return false;
            }
           var sbsz={
                bsyfwmm:bsyfwmm,
                bsyzjhm:bsyzjhm,
                bsyzjlxDm:bsyzjlxDm,
                csdm:csdm,
                csmc:$('#bssz-city option:selected').text(),
                sfdm:sfdm,
                sfmc:$('#bssz-province option:selected').text(),
                gsmc:$('#bssz-gsmc').val(),
                khbm:khdm,
                qydlmm:qydlmm,
                qynsrsbh:$('#bssz-qynsrsbh').val(),
                swjlxDm:swjlxDm,
                id:$('#bssz-id').val()
            };

            $.ajax({
                url:configMap.path+configMap.swsbszUrl,
                type :'POST',
                contentType : 'application/json; charset=utf-8',
                dataType : 'json',
                data : JSON.stringify(sbsz),
                async:false,//同步   如不同步 返回flag值只有false
                success:function (result) {
                    if (result.success){
                        Messenger().post({
                            message: result.message,
                            type: 'success'
                        });

                       flag=true;

                    }else {
                        AppAlert(result.message);
                    }
                }
            });
            return flag;
        });

    };
    //模态框消息提示
    var AppAlert = function(message){
        App.alert({
            container: $('#bssz'),
            place: 'prepend',
            type: 'danger',
            message: message,
            closeInSeconds:3,
            icon: 'fa fa-warning'
        });
    }

    var swsbxzmb=function () {
        var khfldm = jqueryMap.$container.find('#swsbkhflSearch').val();
        var khmc = jqueryMap.$container.find('#searchBSKhmc').val();
        var startTime = jqueryMap.$container.find("#BSManageMoreSearch input[name='addBSStarDate']").val();
        var endTime = jqueryMap.$container.find("#BSManageMoreSearch input[name='addBSEndDate']").val();
        openModal("税务申报下载模板",configMap.path+"/customermanage/taxDeclaration/swsbDownModal.jsp?type="+configMap.type+"&fwzt="+configMap.fwzt+"&other="+configMap.other+"&khfldm="+khfldm+"&khmc"+khmc+"&startTime="+startTime+"&endTime="+endTime,"down",null);
    };
    var swsbExportFun=function () {
       openModal("税务申报批量导入",configMap.path+"/customermanage/taxDeclaration/swsbExport.jsp?type="+configMap.type+"&fwzt="+configMap.fwzt+"&other="+configMap.other,"edit",function () {
           exportSwsbExport.save(function (res) {
               if(res) {
                   jqueryMap.$swsbCustomerDialog.modal('hide');
                   Messenger().post({
                       message: '导入成功！'
                   });
               }else{
                   Messenger().post({
                       message: '导入失败！'
                   });
               }
           });
       });
    };
    var initKhflSearch = function () {
        $.ajax({
            url: 'systemmanager/customertype/customertype',
            type: 'GET',
            success: function (dataghs) {
                if (dataghs != "") {
                    for (var i = 0; i < dataghs.length; i++) {
                        $("#swsbkhflSearch", jqueryMap.$container).append("<option value='" + dataghs[i].khfl_dm + "'>" + dataghs[i].khfl_mc + "</option>");
                    }
                }
            }
        });
    };
    var initSwsbListGrid = function () {
        configMap.susbListGrid =
            jqueryMap.$swsbListDataTable.DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false,
                //"destroy": true,
                "pageLength": 50,
                "lengthMenu": [10, 20, 50, 100],
                "autoWidth": false,
                "processing": true, // 打开数据加载时的等待效果
                "serverSide": true, // 打开后台分页
                "cache":false,
                "ajax": {
                    "url": configMap.path + configMap.swsbCusromersUrl,
                    "dataSrc": "aaData",
                    "data": function (data) {
                        data.type = configMap.type;
                        data.fwzt = configMap.fwzt;
                        data.other = configMap.other;
                        data.khfldm=jqueryMap.$container.find('#swsbkhflSearch').val(),
                        data.khmc=jqueryMap.$container.find('#searchBSKhmc').val(),
                        data.startTime=jqueryMap.$container.find("#BSManageMoreSearch input[name='addBSStarDate']").val(),
                        data.endTime=jqueryMap.$container.find("#BSManageMoreSearch input[name='addBSEndDate']").val()
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
                        "data": "gsmc",
                        "render": function (data, type, row) {
                            return '<button class="swsbCustomer" style="border: none;z-index: 10;background: transparent;outline: none;padding-left: 0">' +
                                '<a style="color:#666">' + data + '</a>' + '</button>';
                        }
                    },
                    {
                        "data": "zyxm" ,
                        'class':'text-center',
                    },
                    {
                        "data": "khjl_mc",
                        'class':'text-center',
                        "render": function (data, type, row) {
                            if(data!=null)
                            {
                                return data;
                            }else{
                                return "暂无";
                            }
                        }
                    },

                    {
                        "data": "lxrmc",
                        'class':'text-center',
                        "render": function (data, type, row) {
                            if(data!=null|| data!='')
                            {
                                return data;
                            }else{
                                return "暂无";
                            }
                        }
                    },
                    {
                        "data": "sjhm",
                        'class':'text-center',
                        "render": function (data, type, row) {
                            if(data!=null)
                            {
                                return data;
                            }else{
                                return "没有手机号码信息";
                            }
                        }
                    },
                    {
                        "data": "id",
                        'class':'text-center',
                        "render": function (data, type, row) {
                           return configMap.viewCustomerBtn_html+configMap.declareBtn_html+ configMap.viewBsBtn+configMap.swsbszBtn_html;
                        }
                    }

                ],
                "drawCallback": function () { // 数据加载完成后执行
                    var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$swsbListDataTable);
                    var declareContainer = $('[data-type="declare"]',  jqueryMap.$swsbListDataTable);
                    var swsbszContainer = $('[data-type="swsbsz"]', jqueryMap.$swsbListDataTable);
                    var viewContainer = $('[data-type="view"]', jqueryMap.$swsbListDataTable);
                    var viewList = $('[data-type="BSSZ"]', jqueryMap.$swsbListDataTable);
                    $('.swsbCustomer').off().on('click', function () {
                        editCustomerManage(this);
                    });
                    if (declareContainer.length > 0) {

                        declareContainer.off('click').on('click',declare);
                    }
                    if (swsbszContainer.length > 0) {
                        swsbszContainer.off('click')
                            .on('click', swsbsz);
                    }
                    if (viewContainer.length > 0) {
                        viewContainer.off('click').on('click', viewSwsb);
                    }

                    if (tootipContainer.length > 0) {
                        tootipContainer.tooltip();
                    }
                    if (viewList.length > 0) {
                        viewList.off('click').on('click', function () {
                            var el=$(this);
                            var rowIndex = configMap.susbListGrid.cell(el.parent()).index().row;
                            var khbm = configMap.susbListGrid.row(rowIndex).data().khbm;
                            var gsmc = configMap.susbListGrid.row(rowIndex).data().gsmc;
                            var nsrsbh = configMap.susbListGrid.row(rowIndex).data().nsrsbh;
                            var zydm = configMap.susbListGrid.row(rowIndex).data().zydm;
                            var  khxxjson = [];
                            var khxx={
                                khbm:khbm,
                                gsmc:gsmc,
                                nsrsbh:nsrsbh,
                                zydm:zydm
                            }
                            khxxjson.push(khxx);
                            var data={
                                khxx:khxxjson
                            }
                            orgAndUser_data.bsBtn(data);
                        });
                    }

                    /**
                     * 将展示没有客户居中
                     */
                    $('.dataTables_empty').attr("style", "text-align:center");
                 }
            });

        $('tbody', jqueryMap.$swsbListDataTable).on('click', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.susbListGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.susbListGrid.row('.success');
            }
        });
    };

    return {
        // 初始化
        init: function () {
            setJqueryMap();
            initOrganization();
            initKhflSearch();
            initSwsbListGrid();
            $("#swsbExport").off('click').on('click',swsbExportFun);
            $("#swsbxzmb").off('click').on('click',swsbxzmb);
            $('#btnBSKhxxSearch').off('click').on('click',function () {
                configMap.susbListGrid.ajax.reload();
            })
            Layout.addResizeContent(jqueryMap.$container);
            setTimeout(function () {
                var layout = jqueryMap.$container.layout({
                    center__onresize: App.initLayoutContentScrollbar,
                    west__onresize: App.initLayoutContentScrollbar,
                    west__size: 200
                });
                App.initLayoutContentScrollbar('west', layout.panes.west);
                App.initLayoutContentScrollbar('center', layout.panes.center);
            }, 10);

            jqueryMap.$container.find('.addBSStarDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            jqueryMap.$container.find('.addBSEndDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
        },

        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },
        setFun:function (index) {
            swsbsz(index)
        }
    };
}();
//@ sourceURL=org/org.js
