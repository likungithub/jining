
var ypLqList2 = function () {
    'use strict';
    var configMap = {
        printBarcode:"/ypgl/ypbmdy",
        uuid:'',
        ypjslist:null,
        nowData: "",
        cgysGrid:null,
        zfwtGrid: null,
        path:'',
        ypid : '',
        addUrl:'/marketManage/ypJSList2.jsp',
        addUrl2:'/marketManage/YPLQList2.jsp',
        addUrl3:'/marketManage/YPLQList2CY.jsp',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改样品信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除样品信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        addJcxUrl:'/marketManage/jcxmlistcyd.jsp',
        yplqprintBqdy:'/zfwt/yplqdybq',
        printBqdy:'/customermanage/zfwt/qywtdybq'
    };
    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#ypjs' + configMap.uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data'+configMap.uuid);
        jqueryMap.$container = $('#configMap.uuid ');
    }
    var jqueryMap = {
        $manualdata:null,
        $blockTarget: null,
        $content: null,
        $container:null,

    };
    function delnull(d){
        if(d==undefined){
            return '';
        }
        if(d=='null'){
            return '';
        }
        return d;
    }
    //datatable
    var initYplqlist = function () {
        configMap.ypjslist = $("#list_data"+configMap.uuid).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": "customermanage/datatable/getypjs",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypmc= $("#ypmc"+configMap.uuid).val();
                    data.ypbm=$("#ypbm"+configMap.uuid).val();
                    data.dwmc = $("#dwmc"+configMap.uuid).val();
                    data.cyzt = $("#ifcy"+configMap.uuid).val();
                    data.cplb = $("#cplb"+configMap.uuid).val();
                }
            },
            "columns": [
                {
                    "data": "ID",
                    "render": function (data) {
                        return  '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '" id="jcxm_' + data + '"/>';
                    }
                },

                {
                    class:"text-center",
                    "render": function (data, type, row) {
                        return configMap.editBtn_html;
                    }
                },
                {
                    class:"text-center",
                    "data": "YPBM",
                    "render": function (data) {
                        return delnull(data)
                    }

                },
                {
                    class:"text-center",
                    "data": "YPMC",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    data:"DWMC",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data":"YPSL",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data":"YPDW",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
               /* {
                    class:"text-center",
                    "data": "JSZT",
                    "render": function (data) {
                        var d = delnull(data);
                        if (d=='001'){
                            return '<span style="color:#666">' + "未领取" + '</span>';
                        } else {
                            return '<span style="color:red">' + "已领取" + '</span>';
                        }
                    }
                },*/
                {
                    class:"text-center",
                    "data": "IF_CY",
                    "render": function (data) {
                        return data == 1?'抽样':'送样';
                    }
                },
                {
                    class:"text-center",
                    "data": "BZQ",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data": "SB",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    "data": "TYPE",
                    "render": function (data) {
                        return  '<input type="checkbox" name="wt_type"  value="' + data + '" id="wt_type' + data + '"/>';
                    }
                },
                {"data":"wtid","visible": false}
                // {
                //     class:"text-center",
                //     "data": "BZXX",
                //     "render": function (data) {
                //         return delnull(data)
                //     }
                // }

            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                console.log(1);
                var daoruContainer=$("#btn_daoru");//导入
                var daochuYplqContainer=$("#btn_daochuYplq");//导出
                var editContainer = jqueryMap.$content.find('[name="contractedit"]');
                if(editContainer.length > 0){
                    editContainer.off('click').on('click', editZfwt);
                }
                if(daoruContainer.length>0){
                    daoruContainer.off('click').on('click',daoru);//导入
                }
                if(daochuYplqContainer.length>0){
                    daochuYplqContainer.off('click').on('click',daochuYplq);
                }
            }
        });
    };

    //修改样品信息
    var editZfwt = function (){
        
        //wt.type = 001 企业委托登记   =003 政府委托抽样
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
        var id = configMap.ypjslist.row(rowIndex).data().ID;
        console.log(configMap.ypjslist.row(rowIndex).data().ID);

        var type = configMap.ypjslist.row(rowIndex).data().TYPE;
        if (type == "001") {
            generateTab(this, configMap.path + configMap.addUrl2 + '?id=' + id, "查看样品信息", "qywt_info", 'fa fa-file-text-o iconMr');
        }else if (type == "003"){
            generateTab(this, configMap.path + configMap.addUrl3 + '?id=' + id, "查看样品信息", "qywt_info", 'fa fa-file-text-o iconMr');
        }
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
    };

    //查询
    var chaxun = function () {
        $("#ypjsSearch"+configMap.uuid).click(function () {
            configMap.ypjslist.ajax.reload();
        })
    }
    //重置
    var chongzhi = function () {
        $("#reset"+configMap.uuid).click(function () {
            $("#ypmc"+configMap.uuid).val("");
            $("#ypbm"+configMap.uuid).val("");
            $("#dwmc"+configMap.uuid).val("");
            configMap.ypjslist.ajax.reload();
        })
    }
    //接收
    var jishou =function () {
        $("#btn_ryxz"+configMap.uuid).click(function () {
            var inputjson = $('[name="checkbox_checkbox"]:checked');
            var temp = null;
            var jcxmjson = [];
            var ypid = "";
            $(inputjson).each(function () {
                //去除已领取的
                var el = $(this);
                var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                var jszt = configMap.ypjslist.row(rowIndex).data().JSZT;
                if (jszt=='001'){
                    temp = {ypjsid: $(this).attr('id').substring(5)};
                    jcxmjson.push(temp);
                }

            });
            var data = {
                ypjsid:jcxmjson,
                lqsj:$("#lqsj").val()
            }
            if (jcxmjson.length<=0){
                Messenger().post({
                    message: "请至少选择一个样品（已领取的不可再次被领取）！",
                    type: 'error',
                    id:"ordermessenger"
                });
                return ;
            }
            $.ajax({
                url:"customermanage/datatable/ypjs",
                type:'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                data:JSON.stringify(data),
                success:function (data) {
                    if (data.info) {
                        configMap.ypjslist.ajax.reload();
                        Messenger().post({
                            message: "样品领取成功！",
                            type: 'info',
                            id:"ordermessenger"
                        })
                        jcxmjson.length=0;
                    }
                }
            });

        })
    }

    var openModalDyYpbm = function (title, url,jcxmjson) {
        var dialogButtons = {};
        var ypbm = "";
        var inputjson = $('[name="checkbox_checkbox"]:checked');
        $(inputjson).each(function () {
            var $el = $(this);
            var rowIndex = configMap.ypjslist.cell($el.parent()).index().row;
            ypbm = configMap.ypjslist.row(rowIndex).data().YPBM;

        });
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
/*                var y
                var s*/
                var tyzl = $("#fileName").val()
/*                var database = {
                    yptyid:jcxmjson,
                    tmsl:tyzl
                }*/
                $.post(configMap.path + configMap.yplqprintBqdy, {ypbm: ypbm,tyzl:tyzl}, function (data) {
                    if (data.success) {
                        Messenger().post({
                            message: '条码打印中,请稍后......',
                            type: 'success'
                        });
                    } else {
                        Messenger().post({
                            message: '打印失败',
                            type: 'error'
                        });
                    }
                }, "json");
/*                $.ajax({
                    url:configMap.path + configMap.printBarcode,
                    type:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'JSON',
                    data:JSON.stringify(database),

                    success:function (data) {

                        console.log(data)
                        if (data.success) {
                            configMap.ypjslist.ajax.reload();

                            Messenger().post({
                                message: "条码打印中,请稍后......",
                                type: 'success',
                                id:"ordermessenger"
                            })
                            jcxmjson.length=0;
                            var arr1=new Array();
                            arr1=data.list1;
                            var arr2=new Array();
                            arr2=data.list2;
                            for ( var i = 0; i <arr1.length; i++){
                                y=arr1[i];
                                s=arr2[i];
                                createQRcde1(data,y,s);
                            }

                        }else {
                            Messenger().post({
                                message: "打印失败！",
                                type: 'error',
                                id:"ordermessenger"
                            })
                        }
                        jcxmjson.length=0;
                    }
                });*/
            }
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size: "small"

            });
        });
    };

    //生成条码
    var createQRcde1 = function (data,y,s) {
        var TSCObj;
        TSCObj = new ActiveXObject("TSCActiveX.TSCLIB");
        TSCObj.ActiveXabout();
        TSCObj.ActiveXopenport ("TSC TTP-244 Pro");
        TSCObj.ActiveXdownloadpcx ("D://file/UL.PCX","UL.PCX");
        TSCObj.ActiveXsetup("60", "40", "5", "15", "0", "2", "0");
        TSCObj.ActiveXsendcommand ("SET TEAR ON");
        TSCObj.ActiveXclearbuffer();
        // TscLibDll.INSTANCE.sendcommand("PUTPCX 550,10,\"UL.PCX\"");// 图片位置
        // TscLibDll.INSTANCE.printerfont("100", "50", "TSS24.BF2", "0", "1", "1", "Technology");
        // TscLibDll.INSTANCE.barcode("70", "140", "128", "90", "0", "0", "2", "2", "A123456789");// 打印内容，参数是位置和字体
        // TscLibDll.INSTANCE.windowsfont(15, 15, 40, 0, 2, 1, "Arial", "网络科技公司");
        // TSCObj.ActiveXsendcommand ("PUTPCX 10,200,\"UL.PCX\"");
        TSCObj.ActiveXwindowsfont(20, 290, 10, 0, 2, 0, "Arial", "_________________________________________________________________________________________________________________");
        TSCObj.ActiveXwindowsfont(460, 280, 40, 180, 0, 0, "Arial", "样品编码: "+y);
        TSCObj.ActiveXwindowsfont(20, 217, 10, 0, 2, 0, "Arial", "_________________________________________________________________________________________________________________");
        TSCObj.ActiveXwindowsfont(460, 207, 40, 180, 0, 0,  "Arial", "待检   在检   已检   留样");
        TSCObj.ActiveXwindowsfont(20, 135, 10, 0, 2, 0, "Arial", "_________________________________________________________________________________________________________________");
        TSCObj.ActiveXwindowsfont(100, 227, 40, 90, 0, 0, "Arial", "________");
        TSCObj.ActiveXwindowsfont(220, 227, 40, 90, 0, 0, "Arial", "________");
        TSCObj.ActiveXwindowsfont(325, 227, 40, 90, 0, 0, "Arial", "________");
        TSCObj.ActiveXwindowsfont(20, 58, 10, 0, 2, 0, "Arial", "_________________________________________________________________________________________________________________");
//      TSCObj.ActiveXwindowsfont(465, 130, 25, 180, 0, 0, "Arial", ""+zbypbm);DYHKQ02010027001
//         TSCObj.ActiveXbarcode (430, 58, 35, 180, 0, 0, "Arial", "抽(送)检时间:"+s);// 打印内容，参数是位置和字体
        TSCObj.ActiveXwindowsfont(460, 58, 38, 180, 0, 0, "Arial", "抽(送)检时间: "+s);// 打印内容，参数是位置和字体
        TSCObj.ActiveXwindowsfont(20, 0, 10, 0, 2, 0, "Arial", "_________________________________________________________________________________________________________________");
        TSCObj.ActiveXwindowsfont(492, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TSCObj.ActiveXwindowsfont(40, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TSCObj.ActiveXprintlabel("1", data.sl);
        TSCObj.ActiveXcloseport();
}

    //样品登记簿导出
    var ypbdc = function () {
        $("#btn_ypbdc"+configMap.uuid).on("click",function () {
        var database = {
            cplb:$("#cplb"+configMap.uuid).val(),
            ifcy:$("#ifcy"+configMap.uuid).val(),
            s_time:"2018-11-27",
            e_time:"2018-11-27"
        }
        $.ajax({
            url:"customermanage/datatable/canExportYpdjb",
            type:'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data:JSON.stringify(database),
            success:function (data) {
                if (data.info){
                    window.location.href ="customermanage/datatable/importYPDJB?lx="+$("#ifcy"+configMap.uuid).val()+"&cplb="+$("#cplb"+configMap.uuid).val();
                }else {
                    Messenger().post({
                        message: "数据不存在，无法导出！",
                        type: 'error',
                        id:"ordermessenger"
                    })
                }
            }
        })


        })
    }
    //产品类别
    var cplbchange = function () {
        $("#cplb"+configMap.uuid).on("change",function () {
            configMap.ypjslist.ajax.reload();
        })
    }

    //删除
    var ypdel = function () {
        $("#scypjs"+configMap.uuid).on("click",function () {
            console.log(11);
            var ids =[];
            var Check = $("table input[type=checkbox]:checked");//在table中找input下类型为checkbox属性为选中状态的数据
            Check.each(function () {//遍历
                var id = $(this).attr('id').substring(5);
                ids.push(id);
            })
            console.log(ids);
            if (Check.length<=0){
                Messenger().post({
                    message: "请至少选择一个样品！",
                    type: 'error',
                    id:"ordermessenger"
                });
                return ;
            }
            $.ajax({
                url:"customermanage/datatable/ypsc",
                type:'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                data:JSON.stringify(ids),
                traditional: true,
                success:function (data) {
                    if (data.info) {
                        configMap.ypjslist.ajax.reload();
                        Messenger().post({
                            message: "样品删除成功！",
                            type: 'info',
                            id:"ordermessenger"
                        })
                    }
                }
            });
        })

    }

    //样品新增
    /*var ypxz = function () {
        $("#btn_add"+configMap.uuid).on("click",function () {
            console.log("新增");
           // stopContinueClick("#addCustomerManage", 300);
            generateTab(this, configMap.path + configMap.addUrl, "样品信息添加", "qywt_info", 'fa fa-file-text-o iconMr');
        })
    }*/

    //抽样改变刷新
    var cychange = function () {
        $("#ifcy"+configMap.uuid).on("change",function () {
            configMap.ypjslist.ajax.reload();
        })
    }

    //打印样品编码
    var dyypbm = function () {
        $("#btn_dyypbm"+configMap.uuid).on("click",function () {
            var ypbm = "";
            var inputjson = $('[name="checkbox_checkbox"]:checked');
            var dayins = [];
            var flag=null;
            var jszt =null;
            $(inputjson).each(function () {
                var $el = $(this);
                var rowIndex = configMap.ypjslist.cell($el.parent()).index().row;
                ypbm = configMap.ypjslist.row(rowIndex).data().YPBM;
                jszt = configMap.ypjslist.row(rowIndex).data().JSZT;
                dayins.push({"ypbm":ypbm});

            });
            if (dayins.length == 0) {
                Messenger().post({
                    message: '请选择条码打印数据!',
                    type: 'warning'
                });
                return;//直接退出
            };
        /*    if (jszt!='002'){
                Messenger().post({
                    message: '未领取!',
                    type: 'warning'
                });
                return;//直接退出
            }*/
        openModalDyYpbm("请输入打印数量","customermanage/ypgl/TiaoMasl.jsp",dayins)
     /*       var data = dayins;
            $.post(configMap.path + configMap.printBarcode, {dayins: dayins.join(",")}, function (data) {
                if(data.success){
                    Messenger().post({
                        message: '条码打印中,请稍后......',
                        type: 'success'
                    });
                }else {
                    Messenger().post({
                        message: '打印失败',
                        type: 'error'
                    });
                }
            }, "json");*/
        });
    }

    //添加检测项
    var savejcx = function () {
        stopContinueClick("#savejcx", 300);
        
        var ids=[];//定义一个数组
        $("input[name='checkbox_checkbox']:checked").each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });

        configMap.ypid = ids;
        if (ids.length === 0) {
            Messenger().post({
                message: '请选择一个样品！',
                type: 'warning'
            });
        } else {
            generateTab(this, configMap.path + configMap.addJcxUrl + '?type=edit&ypid=' + configMap.ypid +'&jclbdm=' +'001', '增加检测项', 'ypxx_info', 'fa fa-outdent iconMr');
        };
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
    };

    //导入excel
    var daoru=function () {
        openModal("导入Execl表格","/customermanage/marketManage/importypExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                }
            });
        });
    }
    //导出Excel
    var daochuYplq = function () {
        openModalDaochu("导入Execl表格","/customermanage/marketManage/importYplqExcel.jsp","daochu");
    }
    //打开模态框组件
    var openModalDaochu = function (title, url, type) {
        var dialogButtons = {};

        if (type === 'daochu') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 打&nbsp;印 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    var ksrq = $("#ksrq").val();
                    var jsrq = $("#jsrq").val();
                    var database = {
                        ksrq:ksrq,
                        jsrq:jsrq
                    }
                    POBrowser.openWindowModeless('customermanage/datatable/dyYplq?ksrq='+ksrq+'&jsrq='+jsrq, 'width=1200px;height=800px;');
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
                buttons: dialogButtons
            });
        });
    };
    //打开模态框组件
    var openModal = function (title, url, type, func) {
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
                buttons: dialogButtons
            });
        });
    };
    var dyypbq = function () {
        $("#btn_dyypbq"+configMap.uuid).on("click",function () {
            var ypbm = "";
            var inputjson = $('[name="checkbox_checkbox"]:checked');
            var dayins = [];
            var flag=null;
            var jszt =null;
            var wtid = "";
            $(inputjson).each(function () {
                var $el = $(this);
                var rowIndex = configMap.ypjslist.cell($el.parent()).index().row;
                ypbm = configMap.ypjslist.row(rowIndex).data().YPBM;
                jszt = configMap.ypjslist.row(rowIndex).data().JSZT;
                wtid = configMap.ypjslist.row(rowIndex).data().wtid;
                dayins.push({"ypbm":ypbm});
            });
            if (dayins.length != 1) {
                Messenger().post("请选择打印信息!");
                return;
            }else {
                $.post(configMap.printBqdy, {ids: wtid}, function (data) {
                    if (data.success) {
                        $(data.data).each(function (index, d) {
                            // console.log(d);
                            tcsPrint(d.yplx, d.ypbm, d.ypmc, d.lx, d.ypzxbz);
                        });
                        Messenger().post({
                            message: '条码打印中,请稍后...',
                            type: 'success'
                        });
                    } else {
                        Messenger().post({
                            message: '打印失败',
                            type: 'error'
                        });
                    }
                }, "json");
            }

        });
    };
    //打印
    var tcsPrint = function (yplx, ypbm, ypmc, lx, ypzxbz) {
        var TSCObj;
        TSCObj = new ActiveXObject("TSCActiveX.TSCLIB");

        TSCObj.ActiveXopenport("TSC TTP-244 Pro");
        TSCObj.ActiveXsetup("60", "40", "5", "12", "0", "2", "0");
        TSCObj.ActiveXsendcommand("SET TEAR ON");
        TSCObj.ActiveXclearbuffer();
        TSCObj.ActiveXwindowsfont(40, 15, 40, 0, 2, 0, "Arial", ypzxbz);
        TSCObj.ActiveXwindowsfont(40, 70, 32, 0, 2, 0, "Arial", "样品编码:");
        TSCObj.ActiveXwindowsfont(170, 70, 32, 0, 2, 0, "Arial", ypbm);
        TSCObj.ActiveXwindowsfont(40, 110, 32, 0, 2, 0, "Arial", "样品名称:");
        TSCObj.ActiveXwindowsfont(170, 110, 32, 0, 2, 0, "Arial", ypmc);
        TSCObj.ActiveXwindowsfont(40, 150, 32, 0, 2, 0, "Arial", lx+":");
        TSCObj.ActiveXwindowsfont(120, 150, 32, 0, 2, 0, "Arial", yplx);
        TSCObj.ActiveXbarcode("40", "190", "128", "90", "1", "0", "2", "2", ypbm);
        // TSCObj.ActiveXsendcommand("QRCODE 10,15,L,5,A,0,M2,S3,\"" + code + "\"");
        TSCObj.ActiveXprintlabel("1", "1");
        TSCObj.ActiveXcloseport();
    };
    return{
        init:function (uuid) {
            configMap.uuid=uuid;
            setJqueryMap();
            //初始化表格
            initYplqlist();
            //查询
            chaxun();
            //重置
            chongzhi();
            //接收
            jishou();
            //daoc
            ypbdc();
            //打印
            dyypbm();
            //打印标签
            dyypbq();
            //刷新
            cychange();
            //产品类别
            cplbchange();
            //删除
            ypdel();
            //新增
           //ypxz();
            //添加检测项
            $('#savejcx').off().on('click', function () {
                savejcx();
            });

        },
        setPath:function (path) {
            configMap.path=path;
        }
    }

}();