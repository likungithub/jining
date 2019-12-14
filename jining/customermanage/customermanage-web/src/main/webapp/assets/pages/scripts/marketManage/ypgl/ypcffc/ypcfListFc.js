/**
 *
 */
var ypjslist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        printBarcode: "/ypgl/ypzbdy",
        nowData: "",
        cgysGrid: null,
        path: '',
        addJcxmUrl: '/marketManage/ckcyyplist.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        ypjsGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="ypjsedit" title="拆分详情"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        editBtn_html2: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="ckjcxm" title="检测项目详情"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        classType: '',
        fwzt: '',
        other: '',
        jszt:'',
        ypzbListGrid:null,
        ypbm:"",
        count:null,
        ypmc:"",
        zt:"",
        ypxgList:null,
        uuid:"",
        ypid : '',
        addJcxUrl:'/marketManage/jcxmlistcyd.jsp',
        yplqprintBqdy:'/zfwt/yplqdybq',
        dzcydPath:""
    };
    var ypbms = [];

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#ypjs' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data'+configMap.uuid);
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

    var initypjsGrid = function () {
        configMap.ypjsGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "scrollY":"390px",//锁定行
            "ajax": {
                // "url": "customermanage/datatable/getYpzbList",
                "url": "customermanage/datatable/getYpzbListNew",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypbm = $("#ypbm"+configMap.uuid).val();
                    data.ypmc = $("#ypmc"+configMap.uuid).val();
                    data.dwmc = $("#dwmc"+configMap.uuid).val();
                    data.YPZBZT=$("#rwzt").val();
                    data.ifcy = $("#ifcy"+configMap.uuid).val();
                    data.cplb='';//$("#cplb"+configMap.uuid).val();
                    data.jylb='';//$("#jylb"+configMap.uuid).val();
                    data.btime = $("#btime").val();
                    data.etime = $("#etime").val();
                    data.xzks = $("#xzks"+configMap.uuid).val();
                }
            },
            "columns": [
                {
                    "data": "ID",
                    "render": function (data) {
                        return  '<input type="checkbox" name="ck"  value="' + data + '" id="jcxm_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "render": function (data) {
                        var btn = '';//configMap.editBtn_html;
                        btn = btn + configMap.editBtn_html2+"    "+configMap.editBtn_html;
                        return btn;
                    }
                },
                {
                    class:"text-center",
                    "data":"YPZBZT",
                    "render":function (data) {
                        if (delnull(data)=='001'){
                            return '未拆分';
                        }else if (delnull(data)=='002'){
                            return '<span style="color:skyblue">' + "已拆分" + '</span>';
                        } else if (delnull(data)=='003'){
                            return '<span style="color:red">' + "已提交" + '</span>';
                        }

                    }
                },
                {
                    class:"text-center",
                    "data": "YPBM",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer;" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPMC",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "jcxm",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ZBKS_MC",
                    "render":function (data) {
                        var d = delnull(data);
                        console.log(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPSL",
                    "render":function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BYSL",
                    "render":function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ZBRQ",
                    "render":function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPZXBZ",
                    "render":function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYRQ",
                    "render":function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
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
                var editContainer = jqueryMap.$content.find('[name="ypjsedit"]');
                if (editContainer.length>0){
                    editContainer.off('click').on('click', function () {
                        var el = $(this);
                        var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
                        var ypid = configMap.ypjsGrid.row(rowIndex).data().ID;
                        var ypmc = configMap.ypjsGrid.row(rowIndex).data().YPMC;
                        chakan(ypid,ypmc);
                    });
                }
                //ckjcxm 查看检测项目
                var ckJcxmContainer = jqueryMap.$content.find('[name="ckjcxm"]');
                if (ckJcxmContainer.length>0){
                    ckJcxmContainer.off('click').on('click', function () {
                        var el = $(this);
                        var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
                        var ypid = configMap.ypjsGrid.row(rowIndex).data().ID;
                        chakanJcxm(ypid);
                    });
                }
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                $('[name="ck"]', jqueryMap.$container).on('change',function(e){

                    var inputjson = $('[name="ck"]:checked');

                    $(inputjson).each(function (idx,dom) {
                        //下面三行是2019.06.29 22.00屏蔽
                        //if(dom !== e.currentTarget){
                        //    dom.checked =false
                        // }
                        //     var el = $(this);
                        //     var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
                        //     ypid = configMap.ypjsGrid.row(rowIndex).data().ID;
                    });
                    if(e.currentTarget.checked){
                        var el = $(e.currentTarget);
                        var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
                        var ypid = configMap.ypjsGrid.row(rowIndex).data().ID;
                        configMap.ypid = ypid;
                    }else{
                        configMap.ypid = '';
                    }

                })
            }
        });
    };
    var chakanJcxm = function (ypid) {
        openModalCkJcxm("查看检测项目信息","customermanage/marketManage/ypzbCkJcxm.jsp?ypid=" +ypid);
    }

    var openModalCkJcxm = function (title, url) {
        var dialogButtons = {};
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size:"large"
            });
        });
    };
    var chakan = function (ypid,ypmc) {
        var bmurl = encodeURI("customermanage/marketManage/ypgl/ypzb/showYpzb.jsp?bqmc=拆分样品&ypids="+ypid+"&ypmcs="+ypmc);
        openModal("样品拆分信息",bmurl,"change");
    }
    //产品类别
    var cplbchange = function () {
        $("#cplb"+configMap.uuid).on("change",function () {
            configMap.ypjsGrid.ajax.reload();
        });
    }
    //检验类别
    var  jylbchange =function () {
        $("#jylb"+configMap.uuid).on("change",function () {
            configMap.ypjsGrid.ajax.reload();
        });
    }
    //抽样类别
    var cychange = function () {
        $("#ifcy"+configMap.uuid).on("change",function () {
            configMap.ypjsGrid.ajax.reload();
        })
    }
    //制备状态
    var zbchange = function () {
        $("#rwzt").on("change",function () {
            configMap.ypjsGrid.ajax.reload();
        });
    }
    //开始时间插件改变
    var  btimechange = function () {
        $("#btime").on("change",function () {
            $("#etime").remove();
            $("#jssja").after('<input type="text" class="inputCommon appsysinfo-m" id="etime" value="'+$("#btime").val()+'"style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important; "/>')
            $("#etime").datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
                startDate:$("#btime").val()
            });
        })
    }


    //提交制备样品
    var Tijiao = function () {
        $("#btn_ryxz"+configMap.uuid).click(function () {
            var inputjson = $('[name="ck"]:checked');
            var temp = null;
            var jcxmjson = [];
            $(inputjson).each(function () {
                var el = $(this);
                var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
                var ypzbzt = configMap.ypjsGrid.row(rowIndex).data().YPZBZT;
                if (ypzbzt=='002'){
                    temp = {ypjsid: $(this).attr('id').substring(5)};
                    jcxmjson.push(temp);
                }
            });
            var data = {
                ypjsid:jcxmjson
            };
            if (jcxmjson.length<=0){
                Messenger().post({
                    message: "请选择一个样品（样品必须为已拆分完成的样品）！",
                    type: 'error',
                    id:"ordermessenger"
                });
                return ;
            }
            $.ajax({
                url:"customermanage/datatable/zbytj",
                type:'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                data:JSON.stringify(data),
                success:function (data) {
                    if (data.info) {
                        Messenger().post({
                            message: "样品提交成功！",
                            type: 'info',
                            id:"ordermessenger"
                        });
                        jcxmjson.length=0;
                        configMap.ypjsGrid.ajax.reload();
                    } else {
                        Messenger().post({
                            message: data.message,
                            type: 'error',
                            id:"ordermessenger"
                        });
                    }
                    jcxmjson.length=0;

                }
            });
        })
    }

    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if(type === "edit"){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    Messenger().post("操作成功!");
                    ypzbinfo.save();
                    jqueryMap.$contractauditDialog.modal('hide');
                    configMap.ypjsGrid.ajax.reload();
                    return false;
                }
            };
        }
        if(type === "change"){
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size:"large"
            });
        });
    };

    //打印 制备样品编码
    var dayin = function () {
        var y = "";
        var c = "";
        $("#dayin"+configMap.uuid).click(function () {
            var ypbm = "";
            var inputjson = $('[name="ck"]:checked');
            var dayins = [];
            var flag=null;
            $(inputjson).each(function () {
                var el = $(this);
                var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
                ypbm = configMap.ypjsGrid.row(rowIndex).data().YPBM;
                var ypzbzt = configMap.ypjsGrid.row(rowIndex).data().YPZBZT;
                dayins.push(ypbm);
                if (ypzbzt=='001'){
                    flag = true;
                    return;//直接退出
                }
            });
            if (dayins.length == 0) {
                Messenger().post({
                    message: '请选择拆分信息!',
                    type: 'warning'
                });
                return;//直接退出
            };
            if (flag) {
                Messenger().post({
                    message: '未拆分，不能打印拆分编码!',
                    type: 'warning'
                });
                return;//直接退出
            };
            $.post(configMap.path + configMap.printBarcode, {dayins: dayins.join(",")}, function (data) {
                if (data && data != null) {
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

                for (var i = 0; i < data.length; i++) {
                    createQRcde(data.zbypbm, data.SYRQ);
                }
            }, "json");
        });
        var createQRcde = function (y,c) {
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
            TSCObj.ActiveXwindowsfont(40, 290, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
            TSCObj.ActiveXwindowsfont(430, 280, 32, 180, 0, 0, "Arial", "制备编码: "+y);
            TSCObj.ActiveXwindowsfont(40, 217, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
            TSCObj.ActiveXwindowsfont(430, 207, 40, 180, 0, 0,  "Arial", "待检   在检   已检   留样");
            TSCObj.ActiveXwindowsfont(40, 135, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
            TSCObj.ActiveXwindowsfont(95, 227, 40, 90, 0, 0, "Arial", "________");
            TSCObj.ActiveXwindowsfont(205, 227, 40, 90, 0, 0, "Arial", "________");
            TSCObj.ActiveXwindowsfont(310, 227, 40, 90, 0, 0, "Arial", "________");
            TSCObj.ActiveXwindowsfont(40, 58, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
//      TSCObj.ActiveXwindowsfont(465, 130, 25, 180, 0, 0, "Arial", ""+zbypbm);DYHKQ02010027001
//         TSCObj.ActiveXbarcode (430, 58, 35, 180, 0, 0, "Arial", "抽(送)检时间:"+s);// 打印内容，参数是位置和字体
            TSCObj.ActiveXwindowsfont(430, 58, 35, 180, 0, 0, "Arial", "抽(送)检时间: "+c);// 打印内容，参数是位置和字体
            TSCObj.ActiveXwindowsfont(40, 0, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
            TSCObj.ActiveXwindowsfont(460, 10, 20, 270, 2, 0, "Arial", "_____________________________");
            TSCObj.ActiveXwindowsfont(60, 10, 20, 270, 2, 0, "Arial", "_____________________________");
            TSCObj.ActiveXprintlabel("1", "1");
            TSCObj.ActiveXcloseport();

        }
    }

    var addJcb = function () {
        stopContinueClick("#addJcb"+configMap.uuid, 300);
        var inputjson = $('[name="ck"]:checked');
        var ypid = "";
        var ypxxjson = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
            ypid = configMap.ypjsGrid.row(rowIndex).data().ID;
            ypxxjson.push(ypid);
        });
        var data = {
            ypxx: ypxxjson
        }
        if (data.ypxx.length === 0) {
            Messenger().post({
                message: '请选择一个样品！',
                type: 'warning'
            });
        } else {
            openModaJcb("选择检测项目包","customermanage/jcxmbao/chooseJcb.jsp?ypxx="+JSON.stringify(data),'edit')
        };
    }
    //检测包选择

    var openModaJcb = function (title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    chooseJcb.addjcxm();
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
    //打印样品编码
    var dyypbm = function () {
        var ypbm = "";
        var inputjson = $('[name="ck"]:checked');
        var dayins = [];
        var flag=null;
        var jszt =null;
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
            ypbm = configMap.ypjsGrid.row(rowIndex).data().YPBM;
            dayins.push({"ypbm":ypbm});
        });
        if (dayins.length == 0) {
            Messenger().post({
                message: '请选择条码打印数据!',
                type: 'warning'
            });
            return;//直接退出
        };
        openModalDyYpbm("请输入打印数量","customermanage/ypgl/TiaoMasl.jsp",dayins)
    }

    var openModalDyYpbm = function (title, url,jcxmjson) {
        var dialogButtons = {};
        var ypbm = "";
        var inputjson = $('[name="ck"]:checked');
        $(inputjson).each(function () {
            var $el = $(this);
            var rowIndex = configMap.ypjsGrid.cell($el.parent()).index().row;
            ypbm = configMap.ypjsGrid.row(rowIndex).data().YPBM;
        });
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var tyzl = $("#fileName").val();
                $.post(configMap.path + configMap.yplqprintBqdy, {ypbm: ypbm,tyzl:tyzl}, function (data) {
                    if (data.success) {
                        $(data.data).each(function (index, d) {
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

    //添加备样
    var chaifenbeiyang = function () {
        var ypids= "";
        var ypbms =  "";
        var ypmcs =  "";
        var ypsls="";
        var inputjson = $('[name="ck"]:checked');
        var zbzz=false;
        var arr = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
            ypids = configMap.ypjsGrid.row(rowIndex).data().ID;
            ypbms = configMap.ypjsGrid.row(rowIndex).data().YPBM;
            ypmcs = configMap.ypjsGrid.row(rowIndex).data().YPMC;
            var ypsl = configMap.ypjsGrid.row(rowIndex).data().YPSL;
            arr.push(ypids);
        });
        if(arr.length!=1){
            Messenger().post({
                message: '请选择一个样品!',
                type: 'warning'
            });
            return;//直接退出
        }
        var bmurl = encodeURI(configMap.path + "/ypgl/bygl/addByxx.jsp?id="+ypids+"&wtid="+ypbms+"&ypmc="+ypmcs);
        openModalAddBy("添加备样信息", bmurl, 'edit',ypids,ypmcs,ypbms);
        // 添加备样判断
        // if (zbzz){
        //     Messenger().post({
        //         message: "已提交的样品不能进行拆分！",
        //         type: 'error',
        //         id:"ordermessenger"
        //     });
        //     return ;
        // }
        // var plzbbz=false;
        // if(ypids.indexOf(",")!=-1)
        // {
        //     bootbox.confirm({
        //         buttons: {
        //             confirm: {
        //                 label: '确认',
        //                 className: 'btn-myStyle'
        //             },
        //             cancel: {
        //                 label: '取消',
        //                 className: 'btn-default'
        //             }
        //         },
        //         message: '您选择多个样品进行拆分，拆分样品科室信息会统一设置，确定要这样做吗？',
        //         callback: function(result) {
        //             if(result) {
        //                 var bmurl = encodeURI(configMap.path + "/marketManage/ypgl/ypcffc/cfksEditzb.jsp?id="+ypids+"&wtid="+ypbms+"&ypmc="+ypmcs+"&ypsl="+ypsls);
        //                 openModalZbks("样品拆分", bmurl, 'edit');
        //             }
        //         },
        //         title: "批量拆分提示",
        //     });
        // }
        // else {
        //     var bmurl = encodeURI(configMap.path + "/marketManage/ypgl/ypcffc/cfksEditzb.jsp?id="+ypids+"&wtid="+ypbms+"&ypmc="+ypmcs+"&ypsl="+ypsls);
        //     openModalZbks("样品拆分", bmurl, 'edit');
        // }
    };
    //列表制备保存
    var zbsave = function () {
        var ypids= "";
        var ypbms =  "";
        var ypmcs =  "";
        var ypsls="";
        var inputjson = $('[name="ck"]:checked');
        var zbzz=false;
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
            var ypid = configMap.ypjsGrid.row(rowIndex).data().ID;
            var ypbm = configMap.ypjsGrid.row(rowIndex).data().YPBM;
            var ypmc = configMap.ypjsGrid.row(rowIndex).data().YPMC;
            var ypsl = configMap.ypjsGrid.row(rowIndex).data().YPSL;

            ypids =ypids+","+ypid;
            ypbms =ypbms+","+ypbm;
            ypmcs =ypmcs+","+ypmc;
            ypsls =ypsls+","+ypsl;
        });
        if(ypids!="" && ypids.length>2)
        {
            ypids= ypids.substr(1);
            ypbms= ypbms.substr(1);
            ypmcs= ypmcs.substr(1);
            ypsls= ypsls.substr(1);
        }
        //制备前置判断
        if (zbzz){
            Messenger().post({
                message: "已提交的样品不能进行拆分！",
                type: 'error',
                id:"ordermessenger"
            });
            return ;
        }
        var plzbbz=false;
        if(ypids.indexOf(",")!=-1)
        {
            bootbox.confirm({
                buttons: {
                    confirm: {
                        label: '确认',
                        className: 'btn-myStyle'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn-default'
                    }
                },
                message: '您选择多个样品进行拆分，拆分样品科室信息会统一设置，确定要这样做吗？',
                callback: function(result) {
                    if(result) {
                        var bmurl = encodeURI(configMap.path + "/marketManage/ypgl/ypcffc/cfksEdit.jsp?id="+ypids+"&wtid="+ypbms+"&ypmc="+ypmcs+"&ypsl="+ypsls);
                        openModalZbks("样品拆分", bmurl, 'edit');
                    }
                },
                title: "批量拆分提示",
            });
        }
        else {
            var bmurl = encodeURI(configMap.path + "/marketManage/ypgl/ypcffc/cfksEdit.jsp?id="+ypids+"&wtid="+ypbms+"&ypmc="+ypmcs+"&ypsl="+ypsls);
            openModalZbks("样品拆分", bmurl, 'edit');
        }
    };

    //创建模态框
    var openModalZbks = function (title, url, type) {  //制备 页面的 打开 制备科室的 窗口
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                zbkszb.save(function (data) {
                    if (data) {
                        //configMap.ypjsGrid.ajax.reload();
                        ypjslist.reload();
                        jqueryMap.$Dialog.modal("hide");
                    } else {
                        //jqueryMap.$Dialog.modal("hide");
                    }
                });
                return false;
            }
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$Dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                onEscape: true,
                size:"large"
            });
        });
    };


    var checkRate = function (nubmer) {
        var re = /^[0-9]+[0-9]*]*$/;    // /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/

        if (!re.test(nubmer)) {
            alert("请输入数字");
            return false;
        }
        return true;
    };
    //获取当前时间，格式YYYY-MM-DD
    var getNowFormatDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    };
    //打印
    var tcsPrint = function (yplx, ypbm, ypmc, lx, ypzxbz) {
        var TSCObj;
        TSCObj = new ActiveXObject("TSCActiveX.TSCLIB");

        TSCObj.ActiveXopenport("TSC TTP-244 Pro");
        TSCObj.ActiveXsetup("60", "40", "5", "12", "0", "2", "0");
        TSCObj.ActiveXsendcommand("SET TEAR ON");
        TSCObj.ActiveXclearbuffer();
        TSCObj.ActiveXwindowsfont(40, 30, 32, 0, 2, 0, "Arial", "抽样单号:"+ypzxbz);
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
    var gotoAddJcxm = function () {
        stopContinueClick("#addjcxm", 300);
        var inputjson = $('[name="ck"]:checked');
        var wtid = "";
        var ypxxjson = [];
        var sftj=false;
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
            wtid = configMap.ypjsGrid.row(rowIndex).data().YPBM;
            var tjzt = configMap.ypjsGrid.row(rowIndex).data().YPZBZT;
            if(tjzt=="003")
            {
                sftj=true;
            }
            ypxxjson.push(wtid);
        });
        if(sftj)
        {
            Messenger().post({
                message: '已经提交的样品不能修改检测项！',
                type: 'warning'
            });
            return;
        }

        if (ypxxjson.length < 1) {
            Messenger().post({
                message: '请选择一个拆分样品！',
                type: 'warning'
            });
            return;
        } else {
            wtid = ypxxjson.join(',');
            viewJcxmTab(this, configMap.path + configMap.addJcxmUrl + '?wtid=' + encodeURI(wtid), "检测项目信息", "jcxmxx", '');
        }
    };

    var viewJcxmTab = function (_target, srcStr, menuName, id, icon) {
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
    };
    //20190906添加打印任务单
    var dyrwd = function (dylx) {
        stopContinueClick("#dyrwd",300);
        var inputjson = $('[name="ck"]:checked');
        var ypxxjson = [];
        var ks = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
            var ids = configMap.ypjsGrid.row(rowIndex).data().ID;
            ypxxjson.push(ids);
        });
        if(ypxxjson.length === 0){
            Messenger().post({
                message:'请至少选择一个样品！',
                type:'warning'
            });
            return
        }else {
            var ypids = ypxxjson.join(",");

            console.log(ypids);
            openModalTh("请选择打印科室",configMap.path +"/ypgl/ypzbfp/dyrwdKsRadio.jsp",ypids);


        }
    }

    //报告编制 退回 选择 退回地点
    var openModalTh = function (title, url,ypids) {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 确&nbsp;定',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var lx =$("input:radio:checked").val();
                console.log(lx);
                POBrowser.openWindowModeless('customermanage/ypgl/printRwd?ypids='+ypids+'&lx='+lx, 'width=1200px;height=800px;');
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
    }
    //下载电子抽样单
    var showdzcyd = function () {
        stopContinueClick("#showdzcyd", 300);
        var inputjson = $('[name="ck"]:checked');
        var wtid = "";
        var ypxxjson = [];
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.ypjsGrid.cell(el.parent()).index().row;
            wtid = configMap.ypjsGrid.row(rowIndex).data().YPBM;
            ypxxjson.push(wtid);
        });

        if (ypxxjson.length != 1) {
            Messenger().post({
                message: '请选择一个样品！',
                type: 'warning'
            });
            return;
        } else {
            window.open(configMap.dzcydPath+"/app/sample/export/"+wtid,"_blank");
        }

    };
    //20190911添加制备科室
    var initKsxz = function()
    {
        // console.log("任务类型输出==="+configMap.uuid);
        $.ajax({
            url:"/customermanage/ypgl/getKsByDmList",
            type: 'POST',
            async:false,
            success: function (data) {
                $("#xzks"+configMap.uuid,jqueryMap.$content).empty();
                $("#xzks"+configMap.uuid,jqueryMap.$content).append($("<option value=''>请选择科室</option>"));
                for (var i = 0; i < data.length; i++) {
                    var $val = $("<option value="+ data[i].ZBKS_DM+">" + data[i].ZBKS_MC + "</option>");
                    $("#xzks"+configMap.uuid,jqueryMap.$content).append($val);
                }
            }
        });
    }
    //制备科室下拉
    var kschange = function () {
        $("#xzks"+configMap.uuid).on("change",function () {
            configMap.ypjsGrid.ajax.reload();
        });
    }

    var openModalAddBy = function (title, url,size,ypid,ypmcs,ypbms) {
        var dialogButtons = {};
        var check = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 确&nbsp;定',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var data = {};
                data.id = ypid;
                // data.ypmc = $("input[name='ypmc']").val();
                data.ypmc = ypmcs;
                data.ypbm = ypbms;
                data.bysl = $("#bysl").val();
                if(!check.test(data.bysl)){
                    Messenger().post({
                        message: '备样数量必须为不为零的正数！',
                        type: 'error',
                    });
                    return false;
                }
                data.bysldw = $("#bysldw").val();
                data.bzxx = $("#bzxx").val();
                console.log(JSON.stringify(data));
                $.ajax({
                    url:"customermanage/ypgl/addByxx",
                    type:'POST',
                    data:data,
                    success:function (data) {
                        if (data.success) {
                            Messenger().post({
                                message: "样品保存成功！",
                                type: 'info',
                            });
                            configMap.ypjsGrid.ajax.reload();
                        } else {
                            Messenger().post({
                                message: data.message,
                                type: 'error',
                            });
                        }
                    }
                });
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
                size:size
            });
        });
    };

    return {
        init: function (uuid) {
            configMap.uuid=uuid;
            setJqueryMap(uuid);
            var tabid = $('#ypjs' + uuid).parents('.tab-pane').attr('id').slice(17);
            //初始化数据
            initypjsGrid();
            //查询
            $("#ypjsSearch",jqueryMap.$content).off('click').on('click',function (){
                configMap.ypjsGrid.ajax.reload();
            })


            //提交制备样品
            Tijiao();

            //打印
            dayin();
            //产品类别
            cplbchange();
            //检验类别
            jylbchange();
            //抽样类别
            cychange();
            //制备类别
            zbchange();
            //开始时间改变
            btimechange();
            //科室选择
            initKsxz();
            kschange();
            //添加检测项
            $("#addjcxm"+configMap.uuid).off().on('click', function () {
                gotoAddJcxm();
            });
            $("#addJcb"+configMap.uuid).off().on('click', function () {
                addJcb();
            });
            //打印样品编码
            $("#btn_dyypbm"+configMap.uuid).off().on('click', function () {
                dyypbm();
            });

            //列表制备保存
            $("#zbSave"+configMap.uuid).off().on('click', function () {
                zbsave();
            });
            //制备拆分
            $("#chaifenbeiyang"+configMap.uuid).off().on('click', function () {
                chaifenbeiyang();
            });
            //重置
            $("#reset"+configMap.uuid).off().on('click', function () {
                $("#ypmc"+configMap.uuid).val("");
                $("#ypbm"+configMap.uuid).val("");
                $("#dwmc"+configMap.uuid).val("");
                configMap.ypjsGrid.ajax.reload();
            });
            //打印任务单
            $('#dyrwd'+configMap.uuid).off().on('click', function () {
                dyrwd();
            });
            //电子抽样单
            $('#showdzcyd'+configMap.uuid).off().on('click', function () {
                showdzcyd();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        },
        setDzcydPath: function (dzcydPath) {
            configMap.dzcydPath = dzcydPath;
        },
        reload: function () {
            configMap.ypjsGrid.ajax.reload();
        }
    };


}();


//@ sourceURL=contractlist.js