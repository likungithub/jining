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

var ypTable_data = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        ypDataUrl: '/ypgl/getYpxxList',  //user节点的id为UUID，org节点的id也为UUID
        jcxmDataUrl:'',
        createUserPageUrl: '/user/users/edit.jsp',
        addYpUrl: '/jcxmbao/jcxmlist.jsp',
        editUrl: '/customermanage/customerManage/edit.jsp',
        updateUrl: '/customermanage/ptkhxx/updateCustomer',
        importUrl: '/customermanage/customerManage/importExcel.jsp',
        ypManageGrid: null,
        jcxmManageGrid: null,
        optType: null,
        orgTypes: [],
        fwzt: true,
        type: 1,
        other: "all",
        now: "1", //初始加载时为1，其他时为0
        verifyType: '',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="ypedit" title="增加检测项"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="ypdelete" title="删除样品信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        updateBtn_html:'<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="updateName" title="修改检测包名称"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        khbmString:''	,
        ifSearch:'0',
        yxkhId:"",
        yxkhName:"",
        uuid:'',
        ypid:'',
        tableUrl:'/customermanage/jcxm/findJcxmByYpid',
        jcbid:'',
        index:1
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $ypManageFrom: null,
        $blockTarget: null,
        $ypManageDialog: null,
        $ypManageDataTable: null,
        $jcxmManageFrom: null,
        $jcxmManageDataTable:null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#ypList-manager-content');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ypManageFrom = $('ypList' + uuid);
        jqueryMap.$jcxmManageFrom = $('jcxmList' + uuid);
        jqueryMap.$ypManageDataTable = $('#ypTable_data1', jqueryMap.$container);
        jqueryMap.$jcxmManageDataTable = $('#jcxmTable_data1', jqueryMap.$container);
    };

    var ypxxjson = [];
    var jcxmjson = [];

    var openModal = function (title, url, type, func) {
        var dialogButtons = {};

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
                label: '<i class="icon iconfont icon-xiayibu iconFontSize" style="color: #fff;></i> 下一步 ',
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
            className: 'btn btn-default borderRadius4 color666',
            callback: function () {
                sessionStorage.removeItem("uuid");
                sessionStorage.removeItem("filesize");
            }
        }

        $.get(url, function (html) {

            jqueryMap.$ypManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    /**
     * 编辑
     */
    var editYpxxFun = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.ypManageGrid.cell(el.parent()).index().row;
        var id = configMap.ypManageGrid.row(rowIndex).data().jcbid;
        /* alert(id)*/
        generateTab(this,configMap.path + configMap.addYpUrl + '?type=edit&jcbid=' + id,'增加检测项','ypxx_info','fa fa-outdent iconMr');
    }

    /**
     * 修改名称
     */
    var updateNameFun = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.ypManageGrid.cell(el.parent()).index().row;
        var id = configMap.ypManageGrid.row(rowIndex).data().jcbid;
        var jcbname = configMap.ypManageGrid.row(rowIndex).data().jcbname;
        var jcbdl = configMap.ypManageGrid.row(rowIndex).data().jcbdl;
        /* alert(id)*/
        // console.log("jcbname="+jcbname+"||||jcbdl="+jcbdl);
        openModa3("修改检测项目包名称","customermanage/jcxmbao/renameBao.jsp?jcbname="+jcbname+"&jcbdl="+jcbdl,"update",id);
    }

    /**
     * 删除
     */
    var delYpxxFun = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.ypManageGrid.cell(el.parent()).index().row;
        var id = configMap.ypManageGrid.row(rowIndex).data().id;
        var temp = {ypxx: id};
        ypxxjson.push(temp);
        var data = {
            ypxx: ypxxjson
        }
        $.ajax({
            url: "/customermanage/ypgl/delYpList",
            type: 'PUT',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    Messenger().post({
                        message: '删除成功！'
                    });
                }
                configMap.ypManageGrid.ajax.reload();
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: '删除失败！',
                    type: 'error'
                });
                configMap.ypManageGrid.ajax.reload();
            }
        });
    }

    /**
     * 增加样品
     */
    var addYp = function () {
        stopContinueClick(this, 300);
        generateTab(this,configMap.path + configMap.addYpUrl + '?type=add','增加样品','ypxx_info','fa fa-outdent iconMr');
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
    }


    // //导入
    // var importExcel = function () {
    //     stopContinueClick("#importExcel", 300);
    //     openModal('模板导入', configMap.path + configMap.importUrl, 'edit', function () {
    //         setIncel.subimtBtn(function (result) {
    //             if (result) {
    //                 jqueryMap.$ypManageDialog.modal('hide');
    //                 configMap.ypManageGrid.clear().draw();
    //                 configMap.ypManageGrid.ajax.reload();
    //             }
    //         });
    //     });
    // };
    //
    // //导出
    // var exportExcel = function () {
    //     stopContinueClick("#exportExcel", 300);
    //     var text = jqueryMap.$container.find('#searchKhmc').val();
    //     window.location.href = "/customermanage/ptkhxx/downDataExcel?now=" + encodeURI(configMap.now) +
    //         "&type=" + encodeURI(configMap.type) + "&fwzt=" + encodeURI(configMap.fwzt) + "&other=" + encodeURI(configMap.other) + "&searchText=" + encodeURI(text);
    // }

    //点击查询
    var btnKhxxSearch = function () {
        configMap.now = "0";
        configMap.ifSearch = '1';
        configMap.ypManageGrid.ajax.reload();
    }

    var initYpManageGrid;
    initYpManageGrid = function () {
        configMap.ypManageGrid =
            jqueryMap.$ypManageDataTable.DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false,
                //"destroy": true,
                "pageLength": 50,
                "lengthMenu": [10, 20, 50, 100],
                "autoWidth": false,
                "processing": true, // 打开数据加载时的等待效果
                "serverSide": true, // 打开后台分页
                "ajax": {
                    "url": "customermanage/jcb/getAllJcb",
                    "dataSrc": "aaData",
                    "cache":false,
                    "data": function (data) {
                        /*var searchType = jqueryMap.$container.find('#selectType1').val();*/
                        var searchText = jqueryMap.$container.find('#ypSearch').val();
                        /*data.type = searchType;*/
                        data.jcbname = searchText;
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
                        "data": "jcbid",
                        "render": function (data, type, row) {
                            return '<input type="checkbox" name="checkbox_checkbox" id="kh_' + data + '" value="' + data + '"/>';
                        }
                    },
                    {
                        "data":"jcbid",
                        className:"text-right",
                        "render": function (data, type, row) {
                            var btn = "";
                            btn = configMap.editBtn_html + configMap.updateBtn_html;
                            // + configMap.deleBtn_html
                            return btn;
                        }
                    },
                    // {
                    //     "data": "htmc",
                    //     "render": function (data, type, row) {
                    //         data = delnull(data);
                    //         return '<span style="color:#666">' + data + '</span>';
                    //     }
                    // },
                    {
                        "data": "jcbid",
                        "render": function (data, type, row) {
                            data = delnull(data);
                            return '<span style="color:#666"> </span>';
                        }
                    },
                    // {
                    //     "data": "ycbgrq",
                    //     className:'text-center',
                    //     "render": function (data, type, row) {
                    //         if(data==null||data==""){
                    //             return "";
                    //         } else {
                    //             return moment(data).format("YYYY-MM-DD")
                    //         }
                    //     }
                    // },
                    {
                        "data": "jcbname",
                        className:'text-center',
                        "render": function (data, type, row) {
                            data = delnull(data);
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    },
                    {
                        "data": "jcbdl",
                        className:'text-center',
                        "render": function (data, type, row) {
                            if (data == null) {
                                return '0';
                            }else {
                                return '<span style="color:#666">' + data + '</span>';
                            }
                        }
                    },
                    {
                        "data": "jcxsl",
                        className:'text-center',
                        "render": function (data, type, row) {
                            data = delnull(data);
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    },

                    // {
                    // 	"data": "zydm",
                    // 	"visible": false,
                    // },
                    // {
                    //     "data": "sjhm",
                    //     "visible": false,
                    // }

                ],
                "drawCallback": function () { // 数据加载完成后执行
                    configMap.index=1;
                    var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$ypManageDataTable);
                    var editYpxx = jqueryMap.$ypManageDataTable.find('[name="ypedit"]');
                    var updateName = jqueryMap.$ypManageDataTable.find('[name="updateName"]');
                    var delYpxx = jqueryMap.$ypManageDataTable.find('[name="ypdelete"]');
                    var daoruContainer=$("#btn_drjcb");//导入
                    var daochuContainer = $("#btn_dcjcb");//导出

                    if(daochuContainer.length > 0){
                        daochuContainer.off('click').on('click',daochuGqyp);
                    }

                    if(daoruContainer.length>0){
                        daoruContainer.off('click').on('click',daoru);//导入
                    }

                    if (editYpxx.length > 0) {
                        editYpxx.off('click').on('click', editYpxxFun);
                    }

                    if (updateName.length > 0) {
                        updateName.off('click').on('click', updateNameFun);
                    }

                    if (delYpxx.length > 0) {
                        delYpxx.off('click').on('click', delYpxxFun);
                    }

                    if (tootipContainer.length > 0) {
                        tootipContainer.tooltip();
                    }
                    /**
                     * 将展示没有客户居中
                     */
                    $('.dataTables_empty').attr("style", "text-align:center");
                },
                fnRowCallback : function(nRow, aData, iDisplayIndex){
                    jQuery("td:eq(2)", nRow).html(iDisplayIndex +1);
                    return nRow;
                },

            });

        $('tbody', jqueryMap.$ypManageDataTable).on('click', 'tr', function () {
            var el = $(this);
            var id = configMap.ypManageGrid.row(el).data().jcbid;
            configMap.jcbid = id;
            configMap.jcxmManageGrid.ajax.reload();

            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.ypManageGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.ypManageGrid.row('.success');
            }
        });
    };

    //导入excel
    var daoru=function () {
        openModaljcxm("导入Execl表格","/customermanage/jcxmbao/importjcxmExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                    configMap.ypManageGrid.clear().draw();
                    configMap.ypManageGrid.ajax.reload();
                    configMap.jcxmManageGrid.clear().draw();
                    configMap.jcxmManageGrid.ajax.reload();
                } else {
                    jqueryMap.$ypManageDialog.modal('hide');
                }
            });

        });
    }

    //打开模态框组件
    var openModaljcxm = function (title, url, type, func) {
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
                size:"large",
                buttons: dialogButtons,
                onEscape: true,
                backdrop: true
            });
        });
    };
    //导出Excel
    var daochuGqyp = function () {
        var jcbid=[]//定义数组接收受控编号
        $("input[name='checkbox_checkbox']:checked",jqueryMap.$container).each(function () {
            jcbid.push($(this).val())
        })
        if(jcbid.length>0){
            window.location.href="/customermanage/jcb/jcbDc?jcbid="+jcbid;
        }else{
            Messenger().post({
                message:'请选择导出数据',
                type:'error'
            })
            return;
        }
    }

    var initJcxmManageGrid;
    initJcxmManageGrid = function () {
        configMap.jcxmManageGrid =
            jqueryMap.$jcxmManageDataTable.DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false,
                //"destroy": true,
                "pageLength": 50,
                "lengthMenu": [10, 20, 50, 100],
                "autoWidth": false,
                "processing": true, // 打开数据加载时的等待效果
                "serverSide": true, // 打开后台分页
                "ajax": {
                    "url": "customermanage/jcb/getAllJcx",
                    "dataSrc": "aaData",
                    "cache":false,
                    "data": function (data) {
                        // var searchType = jqueryMap.$container.find('#selectType2').val();
                           var jcxmMc = jqueryMap.$container.find('#jcxmSearch').val();
                        // /*data.type = searchType;
                        data.jcxmMc = jcxmMc;
                        data.jcbid = configMap.jcbid;
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
                        "data": "ID",
                        "render": function (data, type, row) {
                            return '<input type="checkbox" name="checkbox_checkbox" id="kh_' + data + '" value="' + data + '"/>';
                        }
                    },
                    {
                        "data": "ZWMC_BM",
                        class:"text-center",
                        "render": function (data, type, row) {
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    },

                    {
                        "data": "XL",
                        class:"text-center",
                        "render": function (data, type, row) {
                            return '<span style="color:#666">' + data + '</span>';
                        }

                    },
                    {
                        "data": "XLZ",
                        className:'text-center',
                        "render": function (data, type, row) {
                            if (data == null) {
                                return '';
                            }else {
                                return '<span style="color:#666">' + data + '</span>';
                            }
                        }
                    },
                    {
                        "data": "JLDW",
                        className:'text-center',
                        "render": function (data, type, row) {
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    },
                    {
                        "data": "PDYJ",
                        className:'text-center',
                        "render": function (data, type, row) {
                            if (data == null) {
                                return '';
                            }else {
                                return '<span style="color:#666">' + data + '</span>';
                            }
                        }
                    },

                    {
                        "data": "JCFA",
                        className:'text-center',
                        "render": function (data, type, row) {
                            if (data == null) {
                                return '';
                            }else {
                                return '<span style="display: inline-block;cursor: pointer;color:#666"  data-toggle="tooltip" data-placement="bottom"  title="' + data + '">' + data + '</span>';
                            }
                        }
                    },
                    {
                        "data": "JCYJ",
                        className:'text-center',
                        "render": function (data, type, row) {
                            if (data == null) {
                                return '';
                            }else {
                                return '<span style="color:#666">' + data + '</span>';
                            }
                        }
                    },
                ]
            });

        $('tbody', jqueryMap.$ypManageDataTable).on('click', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.ypManageGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.ypManageGrid.row('.success');
            }
        });
    };

    //左侧栏的全选
    var selectAllYp = function (status) {
        $('[type="checkbox"]', jqueryMap.$ypManageDataTable).prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$ypManageDataTable).not(jqueryMap.$container.find('[name="selectyplist"]'));
        var temp = null;
        ypxxjson = [];
        $(inputjson).each(function () {
            temp = {ypxx: $(this).attr('id').substring(3)};
            ypxxjson.push(temp);
        });
    };

    //删除检测包
    var delypList = function () {
        stopContinueClick("#delJcb", 300);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$ypManageDataTable).not(jqueryMap.$container.find('[name="selectyplist"]'));
        var temp = null;
        ypxxjson = [];
        $(inputjson).each(function () {
            temp = {jcbid: $(this).attr("value")};
            ypxxjson.push(temp);
        });
        var data = {
            jcb: ypxxjson
        }
        console.log("打印ypxxjson==");
        console.log(ypxxjson);
        if (data.jcb.length === 0) {
            Messenger().post({
                message: '请选择一个检测包！',
                type: 'warning'
            });
        } else {
            bootbox.dialog({
                title: '提示',
                message: '确定要删除检测包吗？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在删除检测包，请稍候...'
                            });

                            $.ajax({
                                url: "/customermanage/jcb/deleteJcb",
                                type: 'PUT',
                                dataType: 'JSON',
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify(data),
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result) {
                                        Messenger().post({
                                            message: '删除成功！'
                                        });
                                    }
                                    configMap.ypManageGrid.ajax.reload();
                                },
                                error: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    Messenger().post({
                                        message: '删除失败！',
                                        type: 'error'
                                    });
                                    configMap.ypManageGrid.ajax.reload();
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
        }
    }

    //模态框
    var openModa3 = function (title, url, type,jcbid) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    var jcxmbname = $("#jcxmbname").val();
                    var jcxmbdl = $("#jcxmbdl").val();
                    if(checkData(jcxmbname)||checkData(jcxmbdl)){
                        return false;
                    }
                    $.ajax({
                        url:"customermanage/jcb/addjcb?jcxmbname="+jcxmbname+"&jcxmbdl="+jcxmbdl,
                        type:"post",
                        success:function () {
                            Messenger().post("添加成功!");
                            configMap.jcxmManageGrid.ajax.reload();
                            configMap.ypManageGrid.ajax.reload();

                        },
                        error:function () {
                            Messenger(

                            );
                        }
                    });
                }
            };
        }else if(type === 'update'){

            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    var jcxmNewName = $("#jcxmNewName").val();
                    var jcxmNewDl = $("#jcxmNewDl").val();
                    if(checkData(jcxmNewName)||checkData(jcxmNewDl)){
                        // Messenger().post({
                        //     message: "名称不得为空！",
                        //     type: 'warning'
                        // });
                        return false;
                    }else {
                        $.ajax({
                            url:"customermanage/jcb/updatejcbNameNew?jcbmc="+jcxmNewName+"&jcxmNewDl="+jcxmNewDl+"&jcbid="+jcbid,
                            type:"post",
                            success:function () {
                                Messenger().post("修改成功!");
                                configMap.jcxmManageGrid.ajax.reload();
                                configMap.ypManageGrid.ajax.reload();

                            },
                            error:function () {
                                Messenger().post("修改失败");
                            }
                        });
                    }
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭',
            className: 'btn btn-default borderRadius4'
        }

        $.get(url, function (html) {
            jqueryMap.$usersDialog3 = bootbox.dialog({
                className: 'edit-users-info',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    //右侧栏的全选
    var selectAllJcxm = function (status) {
        $('[type="checkbox"]', jqueryMap.$jcxmManageDataTable).prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$jcxmManageDataTable).not(jqueryMap.$container.find('[name="selectjcxmlist"]'));
        var temp = null;
        jcxmjson = [];
        $(inputjson).each(function () {
            temp = {jcxm: $(this).attr('id').substring(3)};
            jcxmjson.push(temp);
        });
    };

    //右侧删除
    var deJcxmlList = function () {
        stopContinueClick("#deJcxmlList", 300);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$jcxmManageDataTable).not(jqueryMap.$container.find('[name="selectjcxmlist"]'));
        var temp = null;
        jcxmjson = [];
        $(inputjson).each(function () {
            temp = {jcxm: $(this).attr("value")};
            jcxmjson.push(temp);
        });
        var data = {
            jcxm: jcxmjson,
            jcbid: configMap.jcbid
        }
        if (data.jcxm.length === 0) {
            Messenger().post({
                message: '请选择一个检测项目！',
                type: 'warning'
            });
        } else {
            bootbox.dialog({
                title: '提示',
                message: '确定要删除检测项目？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在删除检测项目，请稍候...'
                            });

                            $.ajax({
                                url: "/customermanage/jcb/deleteJcx",
                                type: 'PUT',
                                dataType: 'JSON',
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify(data),
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result) {
                                        Messenger().post({
                                            message: '删除成功！'
                                        });
                                    }
                                    configMap.jcxmManageGrid.ajax.reload();
                                },
                                error: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    Messenger().post({
                                        message: '删除失败！',
                                        type: 'error'
                                    });
                                    configMap.jcxmManageGrid.ajax.reload();
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
        }
    }

    //校验不为空
    var checkData= function (data) {
        if (data == "undefined" || data == null || data.trim().length == 0) {
            Messenger().post({
                    message: "名称不得为空！",
                    type: 'warning'
                });
            return true;
        }else{
            return false;
        }
    }

    return {
        // 初始化
        init: function (id,name, uuid) {
            setJqueryMap(uuid);

            var tabid = $('#ypList-manager-content').parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);
            Layout.addResizeContent(jqueryMap.$container);
            setTimeout(function () {
                var layout = jqueryMap.$container.layout({
                    center__onresize: App.initLayoutContentScrollbar,
                    west__onresize: App.initLayoutContentScrollbar,
                    west__size: 500
                });
                App.initLayoutContentScrollbar('west', layout.panes.west);
                App.initLayoutContentScrollbar('center', layout.panes.center);
            }, 10);

            // //输入框绑定回车事件
            // $('[name="searchKhmc"]',jqueryMap.$container).keydown(function(event) {//给输入框绑定按键事件
            //    if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            //    	$("#btnKhxxSearch",jqueryMap.$container).click();
            //    }
            // });

            initYpManageGrid();
            initJcxmManageGrid();

            //点击选择所有(样品)
            jqueryMap.$container.find('[name="selectyplist"]').change(function () {
                var el = $(this);
                selectAllYp(el.is(':checked'));
            });

            //点击选择所有(检测项目)
            jqueryMap.$container.find('[name="selectjcxmlist"]').change(function () {
                var el = $(this);
                selectAllJcxm(el.is(':checked'));
            });

            //新增检测包
            $('#addJcb', jqueryMap.$container).on('click',function () {
                openModa3("增加检测项目包","customermanage/jcxmbao/addJcxmbao.jsp","edit","");
                /* addYp();*/
            });

            //删除 检测包
            $('#delJcb', jqueryMap.$container).on('click',function () {
                delypList();
            });


            //右侧删除
            $('#deJcxmlList', jqueryMap.$container).on('click',function () {
                deJcxmlList();
            });

            //左侧查询
            $('#btnypSearch', jqueryMap.$container).on('click',function () {
                configMap.index=1;
                configMap.ypManageGrid.ajax.reload();
            });

            //右侧查询
            $('#btnjcxmSearch', jqueryMap.$container).on('click',function () {
                configMap.jcxmManageGrid.ajax.reload();
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        reload:function () {
            configMap.ypManageGrid.ajax.reload();
        }
    };
}();
//@ sourceURL=org/org.js

