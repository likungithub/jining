/*global $, App, moment, jQuery, bootbox, _ */

var summaryStatistics_data = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        aesUrl:'/customermanage/customerManage/aes',
        dataUrl: '/summaryStatistic/getDepaatment',  //user节点的id为UUID，org节点的id也为UUID
        CustomerUrl: '/customermanage/ptkhxx/getCustomer',
        createUserPageUrl: '/user/users/edit.jsp',
        addUrl: '/customermanage/customerManage/add.jsp',
        editUrl: '/customermanage/customerManage/edit.jsp',
        addcontractPageUrl: '/customermanage/contract/addContract.jsp',
        updateUrl: '/customermanage/ptkhxx/updateCustomer',
        importUrl: '/customermanage/customerManage/importExcel.jsp',
        currentSelectedNode: '',
        reportTaxPageUrl: '/customermanage/reporttax/reporttax.jsp',
        followupPageUrl: '/customermanage/followup/followup.jsp',
        accountingPageUrl: '/customermanage/financialinformation/financialinformation.jsp',
        addchargePageUrl: '/customermanage/charge/addCharge.jsp',
        viewchargePageUrl: '/customermanage/charge/viewCharge.jsp',
        dispatchPageUrl: '/customermanage/dispatch/dispatch.jsp',
        summaryStatisticsGrid: null,
        optType: null,
        startTime:null,
        endTime:null,
        orgTypes: [],
        fwzt: true,
        type: 1,
        other: "all",
        bmdm:'',
        now: "1", //初始加载时为1，其他时为0
        verifyType: '',
        accountingBtn_html: '<button class="khlistBtn" data-type="accounting" title="记账"><i class="icon iconfont icon-pingjiaguanli" style="position:relative;top:2px;font-weight: 400;font-size: 18px;"></i></button>',
        addcontractBtn_html: '<button class="khlistBtn" data-type="addcontract" title="合同"><i class="icon iconfont icon-hetong" style="position:relative;top:2px;font-weight: 400;font-size: 18px;"></i></button>',
        addchargeBtn_html: '<button class="khlistBtn" data-toggle="tooltip" data-placement="top"  data-type="chargeContent" title="收费详情"><i class="icon iconfont icon-caiwushuiwu" style="position:relative;top:2px;font-weight: 400;font-size: 18px;" name="chargeContenet"></i></button>',
        //btn btn-xs btnBlue btnBorderColor colorfff borderRadius4                                                                        padding-right:3px;position:relative;top:2px;
        accountingStopBtn_html: '<button class="khlistBtn" disabled data-type="accounting" title="记账"><i class="icon iconfont icon-pingjiaguanli" style="position:relative;top:2px;color: #666;font-size: 18px;"></i></button>',
        addcontractStopBtn_html: '<button class="khlistBtn" disabled data-type="addcontract" title="合同"><i class="icon iconfont icon-hetong" style="position:relative;top:2px;color: #666;font-size: 18px;"></i></button>',
        addchargeBStoptn_html: '<button class="khlistBtn" disabled data-type="addcharge" title="收费"><i class="icon iconfont icon-caiwushuiwu" style="position:relative;top:2px;color: #666;font-size: 18px;"></i></button>',
        panduan:'',
        viewchargeBtn_html: '<button class="khlistBtn" data-toggle="tooltip" title="查看收费历史" style="background: transparent !important;border: none !important;color: #666 !important;" data-type="viewcharge"><i class="icon iconfont icon-shijian historyColor"></i></button>'
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $customerManageFrom: null,
        $blockTarget: null,
        $customerManageTree: null,
        $customerManageDialog: null,
        $selectedRow: null,
        $summaryStatisticsDataTable: null
    };
    var setJqueryMap = function () {
        jqueryMap.$container = $('#summaryStatistics');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$customerManageTree = $('#summaryStatistics_manage_tree', jqueryMap.$container);
        jqueryMap.$summaryStatisticsDataTable = $('#summaryStatistics_data', jqueryMap.$container);
    };

    var khxxjson = [];


 var openListView = function () {
     var el = $(this);
     var rowIndex = configMap.summaryStatisticsGrid.cell(el.parent().parent()).index().row;
     var khbm = configMap.summaryStatisticsGrid.row(rowIndex).data().KHBM;
     var dialogButtons ={};
    /* var title="青岛xx公司"*/
     dialogButtons.success = {
         label: '<i style="font: normal normal normal 16px/1 FontAwesome!important;margin-right: 5px;" class="' + 'fa fa-times  iconMr' + '"></i>关闭',
         className: "btn btn btn btn-default borderRadius4"
     };
     $.get('/statisticalanalysis/summaryStatistics/listView.jsp?khbm='+khbm+'&&startTime='+$('#startTime',jqueryMap.$content).val()+'&&endTime='+$('#endTime',jqueryMap.$content).val()+'', function (html) {
         bootbox.dialog({
             title: "收费详情",
             message: html,
             buttons: dialogButtons,
             className:'summaryStatistics-dialog'
         });
     })
 };

    var initOrganization = function () {
        var jstree = jqueryMap.$customerManageTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': '/statisticalanalysis/summaryStatistic/getDepaatment'
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
            $('#summaryStatistics_manage_tree').on("open_node.jstree", function (e, data) {
                // clearTreeNum();
                getTreeNum();
            });
            // clearTreeNum();
            getTreeNum();
            $("#summaryStatistics_manage_tree").bind("select_node.jstree", function (e, data) {

                if (data.node.id == 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        $('#summaryStatistics_manage_tree').jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });


        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#summaryStatistics_manage_tree li").length; i++) {
                var $temp = $("#summaryStatistics_manage_tree li").eq(i).attr("userimg");
                // var $text = $("#summaryStatistics_manage_tree li").eq(i).attr("usertext");

                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                } else {
                    localStorage.setItem("step",i);
                    localStorage.setItem("userImg",$temp);
                    $("#summaryStatistics_manage_tree li ").eq(i).find("a").eq(0).find("i").css("background","url("+$temp+")").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
                }
            }
        }


        jqueryMap.$customerManageTree.on('select_node.jstree', function (e, data) {
            configMap.currentSelectedNode = data.node;
            configMap.optType = 'edit';
            if (data.node.parent === '#') { //点击的是所有客户
                configMap.panduan='1';
                var bmmc = data.node.text;
                $(".ygMain").hide();
                $('#daochuexlsByws001').hide();
                $('#zyTableaaa').hide();
                $('#daochuexlsByws003').hide();
                $(".bmTable").show();
                $('#daochuexlsByws002').show();
                $('#zyTable_tbodyByws tr').remove();
                $('#wsandweikeName').text(bmmc);
            } else if (data.node.li_attr.BMBZ === "1") { //部门标志为true，代表为部门
                configMap.panduan='2';
                var BMDM = data.node.li_attr.bmdm; //部门代码
                var bmmc = data.node.text;
                // $(".ygMain").show();
                // $(".bmTable").hide();
                // configMap.fwzt = true; //正在服务的
                // configMap.type = 2; //代表部门
                // configMap.other = data.node.li_attr.bmdm; //部门代码
                // configMap.dataUrl='';
                // //configMap.now = "0";
                // getDepartment();
                // $('#wsandweikeName').text(data.node.text);
                // $('#restartCustomer').hide();
                // $('#stopCustomerBtn').show();
                // $('#addCustomerManage', jqueryMap.$container).prop('disabled', false);
                // $('#dispatchedStaff', jqueryMap.$container).prop('disabled', false);
                // $('#importExcel', jqueryMap.$container).prop('disabled', false);
                // App.blockUI({
                //     target: jqueryMap.$blockTarget,
                //     boxed: true,
                //     message: '正在获取数据，请稍候...'
                // });
                // configMap.summaryStatisticsGrid.ajax.reload();
                // App.unblockUI(jqueryMap.$blockTarget);
                // $('#restartCustomer').hide();
                // $('#stopCustomerBtn').show();
                $('#zyTable_tbodyByws tr').remove();
                localStorage.setItem("data1",1);
                $('.ygMain').hide();
                $('#daochuexlsByws001').hide();
                $('#bmTableaaa').hide();
                $('#daochuexlsByws002').hide();
                $('#zyTableaaa').show();
                $('#daochuexlsByws003').show();
                var bmName = bmmc
                var bmdm=BMDM;
                localStorage.setItem("bmdm",bmdm);
                $('#wsandweikeName').text(bmName);
                $('#search_summaryStatistics').val(bmName);
                $('#search_summaryStatistics').trigger('input');
                var data={
                    startTime:$('#startTime',jqueryMap.$content).val(),
                    endTime: $('#endTime',jqueryMap.$content).val()
                };
                $.ajax({
                    url:'statisticalanalysis/summaryStatistic/getAllEmployeeByBmdm/'+bmdm,
                    contentType: 'application/json;charset=utf-8',
                    data:data,
                    type:'get',
                    success:function (datas) {
                        var zyMain = "";
                        for(var i=0;i<datas.length;i++){
                            zyMain+= '<tr>'+
                                '<td class=" text-left">'+datas[i].lrrmc+'</td>' +
                                '<td class= "text-right">'+datas[i].ysk.toFixed(2)+'</td>' +
                                '<td class= "text-right">'+datas[i].sjsk.toFixed(2)+'</td>' +
                                '<input type="hidden" value="'+datas[i].zydm+'"/>'+
                                '<td class= "text-center"><a  data="'+datas[i].zydm+'" style="font-size: 18px;" class="icon iconfont icon-caiwushuiwu iconFontColor-10a0f7 openJstree"></a></td>'+
                                '</tr>';
                        }
                        $('#zyTable_tbodyByws').append(zyMain);
                        $(".openJstree").on("click",function () {
                            localStorage.setItem("data1",1);
                            configMap.panduan='3';
                            configMap.other=$(this).attr("data");
                            configMap.type="3";
                            $(".bmTable").hide();
                            $('#zyTableaaa').hide();
                            var zyName = $(this).parent().parent().children()[0].innerText;
                            $('#wsandweikeName').text(zyName);
                            $('#search_summaryStatistics').val(zyName)
                            $('#search_summaryStatistics').trigger('input');
                        });
                    }
                })

            } else { //代表个人
                configMap.panduan='3';
                $(".ygMain").show();
                $('#daochuexlsByws001').show();
                $(".bmTable").hide();
                $('#daochuexlsByws002').hide();
                $('#zyTableaaa').hide();
                $('#daochuexlsByws003').hide();
                configMap.fwzt = true; //正在服务的
                configMap.type = 3;
                configMap.other = data.node.li_attr.zydm;
                //configMap.now = "0";
                getDepartment();
                $('#wsandweikeName').text(data.node.text);
                $('#restartCustomer').hide();
                $('#stopCustomerBtn').show();
                $('#addCustomerManage', jqueryMap.$container).prop('disabled', false);
                $('#dispatchedStaff', jqueryMap.$container).prop('disabled', false);
                $('#importExcel', jqueryMap.$container).prop('disabled', false);
                configMap.summaryStatisticsGrid.clear().draw();
                configMap.summaryStatisticsGrid.ajax.reload();
                //App.unblockUI(jqueryMap.$blockTarget);
                $('#restartCustomer').hide();
                $('#stopCustomerBtn').show();
            }
        });
        //jstree定时搜索功能
        //输入框输入定时自动搜索
        var to = false;
        $('#search_summaryStatistics').on("input",function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                if(localStorage.getItem("data1")==0){
                    jstree.jstree(true).search($('#search_summaryStatistics').val());
                    localStorage.setItem("data1",0)
                }else {
                    jstree.jstree(true).search($('#search_summaryStatistics').val());
                    $(".jstree-container-ul a").each(function () {
                        if($(this).hasClass("jstree-search")){
                            var thisBMBM ;
                            if($(this).parent().attr("bmdm") != undefined){
                                thisBMBM = $(this).parent().attr("bmdm");
                                configMap.other = thisBMBM;
                                configMap.summaryStatisticsGrid.ajax.reload();
                                // localStorage.setItem("data1",1)
                                $(".ygMain").hide();
                                $('#daochuexlsByws001').hide();
                                $(".bmTableaaa").hide();
                                $('#daochuexlsByws002').hide();
                                $('#zyTableaaa').show();
                                $('#daochuexlsByws003').show();
                                getDepartment();
                            }else{
                                thisBMBM = $(this).parent().attr("zydm");
                                configMap.other = thisBMBM;
                                configMap.summaryStatisticsGrid.ajax.reload();
                                // localStorage.setItem("data1",1)
                                $(".ygMain").show();
                                $('#daochuexlsByws001').show();
                                $(".bmTableaaa").hide();
                                $('#daochuexlsByws002').hide();
                                $('#zyTableaaa').hide();
                                $('#daochuexlsByws003').hide();
                                getDepartment();
                            }

                        }
                    })
                }

            }, 250);

        });


    };

    var getDepartmentContent = function () {
        /*$('#zyTable_tbodyByws').html("");
        $('#bmTable_tbodyByws').html("");*/

        $('#bmTable_tbodyByws tr').remove();
        $('#zyTable_tbodyByws tr').remove();
        var data={
            startTime:$('#startTime',jqueryMap.$content).val(),
            endTime: $('#endTime',jqueryMap.$content).val()
        };
        $.ajax({
            url:configMap.path+'statisticalanalysis/summaryStatistic/getDepartmentsCharge/',
            contentType: 'application/json;charset=utf-8',
            data:data,
            type:'get',
            success:function (results) {
               var bmMain;
               for(var i=0;i<results.length;i++){
                   if(results[i].ysk==null){
                       results[i].ysk=0;
                   }
                   bmMain += '<tr>'+
                       '<td class=" text-left">'+results[i].orgName+'</td>' +
                       '<td class= "text-right">'+results[i].ysk.toFixed(2)+'</td>' +
                       '<td class= "text-right">'+results[i].sjsk.toFixed(2)+'</td>' +
                       '<input type="hidden" value="'+results[i].bmdm+'"/>'+
                       '<td class= "text-center"><a  data="'+results[i].bmdm+'" style="font-size: 18px;" class="icon iconfont icon-caiwushuiwu iconFontColor-10a0f7 openEmployee"></a></td>'+
                       '</tr>';

               }
                $('#bmTable_tbodyByws').append(bmMain);
                $(".openEmployee").on("click",function () {
                    localStorage.setItem("data1",1);
                    configMap.panduan="2";
                    $('#zyTableaaa tbody tr').remove();
                    $('.ygMain').hide();
                    $('#bmTableaaa').hide();
                    $('#zyTableaaa').show();
                   var bmName = $(this).parent().parent().children()[0].innerText;
                   var bmdm=$(this).parent().parent().children()[3].value;
                    localStorage.setItem("bmdm",bmdm);
                    $('#wsandweikeName').text(bmName);
                    $('#search_summaryStatistics').val(bmName);
                    $('#search_summaryStatistics').trigger('input');
                    var data={
                        startTime:$('#startTime',jqueryMap.$content).val(),
                        endTime: $('#endTime',jqueryMap.$content).val()
                    };
                    $.ajax({
                        url:'statisticalanalysis/summaryStatistic/getAllEmployeeByBmdm/'+bmdm,
                        contentType: 'application/json;charset=utf-8',
                        data:data,
                        type:'get',
                        success:function (datas) {
                            var zyMain = "";
                            for(var i=0;i<datas.length;i++){
                                zyMain+= '<tr>'+
                                    '<td class=" text-left">'+datas[i].lrrmc+'</td>' +
                                    '<td class= "text-right">'+datas[i].ysk.toFixed(2)+'</td>' +
                                    '<td class= "text-right">'+datas[i].sjsk.toFixed(2)+'</td>' +
                                    '<input type="hidden" value="'+datas[i].zydm+'"/>'+
                                    '<td class= "text-center"><a  data="'+datas[i].zydm+'" style="font-size: 18px;" class="icon iconfont icon-caiwushuiwu iconFontColor-10a0f7 openJstree"></a></td>'+
                                    '</tr>';
                            }
                            $('#zyTable_tbodyByws').append(zyMain);
                            $(".openJstree").on("click",function () {
                                configMap.panduan="3";
                                configMap.type="3";
                                 localStorage.setItem("data1",1);
                                 configMap.other=$(this).attr("data");
                                 var zyName = $(this).parent().parent().children()[0].innerText;
                                $('#wsandweikeName').text(zyName);
                                 $('#search_summaryStatistics').val(zyName)
                                 $('#search_summaryStatistics').trigger('input');
                            });
                        }
                    })
                })
            }
        })
    }

    var getDepartment=function () {
        var data={
          startTime:$('#startTime',jqueryMap.$content).val(),
          endTime: $('#endTime',jqueryMap.$content).val()
        };
        $.ajax({
            url:configMap.path+'statisticalanalysis/summaryStatistic/getAllByEmployee/'+configMap.other,
            type:'get',
            contentType: 'application/json;charset=utf-8',
            data:data,
            success:function (results) {
                var sjsk="";
                var ysk="";
                if(null==results.ac){
                    sjsk=0;
                }else {
                    sjsk=results.ac.sjsk;
                }
                $('#wsandweikeSjsk').text(sjsk.toFixed(2));
                if(null==results.ag){
                    ysk=0;
                }else{
                    ysk=results.ag.ysk;
                }
                $('#wsandweikeYsk').text(ysk.toFixed(2));
            }
        })
    }

    var initOrgAndUserGrid = function () {
        configMap.summaryStatisticsGrid =
            jqueryMap.$summaryStatisticsDataTable.DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false,
                //"destroy": true,
                "pageLength": 50,
                "lengthMenu": [10, 20, 50, 100],
                "autoWidth": false,
                "processing": true, // 打开数据加载时的等待效果
                "serverSide": true, // 打开后台分页
                "ajax": {
                        "url": configMap.path + 'statisticalanalysis/summaryStatistic/getAll',
                        "dataSrc": "aaData",
                        "data": function (data) {
                            data.type = configMap.type;
                            data.fwzt = configMap.fwzt;
                            data.other = configMap.other;
                            data.startTime=$('#startTime',jqueryMap.$content).val();
                            data.endTime=$('#endTime',jqueryMap.$content).val();
                        }
                },
                "language": {
                    "zeroRecords": "暂时没有数据",
                    "infoEmpty": "无记录",
                    "sEmptyTable": "暂时没有数据",
                    "sInfoThousands":",",
                    "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                },
                "fnFooterCallback": function(row, data, start, end, display) {//总计
                    var api = this.api(), data;
                    // Remove the formatting to get integer data for summation
                    var intVal = function ( i ) {
                        return Number(Number(i).toFixed(2))
                        // return typeof i === 'string' ?
                        //     i.replace(/^\d+(?:\.\d{0,2})?/, '')*1 :
                        //     typeof i === 'number' ?
                        //         i : 0;
                    };
                    function number(data){
                        if(data!=null){
                            return data.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
                        }else{
                            return ;
                        }
                    }
                    var total = api
                        .column( 1 )
                        .data()
                        .reduce( function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0 );
                    $( api.column( 1 ).footer() ).html(
                        number(total)
                    );//应收金额
                    var pageTotal = api
                        .column( 2, { page: 'current'} )
                        .data()
                        .reduce( function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0 );
                    $( api.column( 2 ).footer() ).html(
                        number(pageTotal)
                    );//实收金额
                },
                "columns": [
                    {
                        "data": "khmc",
                        "className":"text-left"
                    },
                    {
                        "data": "ysk",
                        "className":"text-right",
                        "render": function (data, type, row) {
                            if(data==null){
                                return "0.00";
                            }else {
                                return data.toFixed(2);
                            }
                        }
                    },
                    {
                        "data": "sjsk",
                        "className":"text-right",
                        "render": function (data, type, row) {
                            if(data==null){
                                return "0.00";
                            }else {
                                return data.toFixed(2);
                            }
                        }
                    },
                    {
                        "data": "KHBM",
                        "className":"text-center",
                        "render":function (data,type,row) {
                            return configMap.addchargeBtn_html;
                        }
                    }
                ],
                "drawCallback": function (data) { // 数据加载完成后执行
                    $('[data-toggle="tooltip"]').tooltip();
                    localStorage.setItem("data1",0)
                    var viewContainer = jqueryMap.$container.find('[name="chargeContenet"]');// $('[data-type="view"]');
                    if (viewContainer.length > 0) {
                        viewContainer.off('click').on('click', openListView);
                    }
                }
            });

        $('tbody', jqueryMap.$summaryStatisticsDataTable).on('click', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.summaryStatisticsGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.summaryStatisticsGrid.row('.success');
            }
        });
    };
     var exclByZy=function () {
         var type=configMap.type;
         var fwzt=configMap.fwzt;
         var other=configMap.other;
         window.location.href ='statisticalanalysis/summaryStatistic/downDataExcelCustomer?type='+type+'&&fwzt='+fwzt+'&&other='+other+'&&startTime='+$('#startTime',jqueryMap.$content).val()+'&&endTime='+$('#endTime',jqueryMap.$content).val();
     }
     var exclByBm=function () {
         var other=configMap.other;
         window.location.href='statisticalanalysis/summaryStatistic/downDataExcelEmployee/'+other+'/?startTime='+$('#startTime',jqueryMap.$content).val()+'&&endTime='+$('#endTime',jqueryMap.$content).val();
     }
     var exclByCustoemr=function () {
         window.location.href='statisticalanalysis/summaryStatistic/downDataExcelDepartment/?startTime='+$('#startTime',jqueryMap.$content).val()+'&&endTime='+$('#endTime',jqueryMap.$content).val();
     }

    return {
        // 初始化
        init: function (firstpage) {
            setJqueryMap();
            initOrganization();
            initOrgAndUserGrid();
            getDepartment();
            configMap.startTime=$('#startTime',jqueryMap.$content).val();
            if(configMap.startTime==null||configMap.startTime==""){
                configMap.startTime='2016-01-01';
            }
            configMap.endTime=$('#endTime',jqueryMap.$content).val();
            if(configMap.endTime==null||configMap.endTime==""){
                configMap.endTime='3016-01-01';
            }
            var tabid = $('#summaryStatistics').parents('.tab-pane').attr('id').slice(17);
            getDepartmentContent();
            tabMenu(tabid);
            //年份
            $('#searchAllByTimeByws',jqueryMap.$content).off('click').on('click',function () {
                stopContinueClick("#searchAllByTimeByws", 300);
                $('#bmTable_tbodyByws tr').remove();
                $('#zyTable_tbodyByws tr').remove();
                // $('#zyTableaaa').html("");
                // $('#bmTableaaa').html("");
                configMap.startTime=$('#startTime',jqueryMap.$content).val();
                if(configMap.startTime==null||configMap.startTime==""){
                    configMap.startTime='2016-01-01';
                }
                configMap.endTime=$('#endTime',jqueryMap.$content).val();
                if(configMap.endTime==null||configMap.endTime==""){
                    configMap.endTime='3016-01-01';
                }
                configMap.summaryStatisticsGrid.ajax.reload();
                getDepartment();
                getDepartmentContent();
                var bmdm= localStorage.getItem("bmdm")
                var data={
                    startTime:$('#startTime',jqueryMap.$content).val(),
                    endTime: $('#endTime',jqueryMap.$content).val()
                };
                $.ajax({
                    url:'statisticalanalysis/summaryStatistic/getAllEmployeeByBmdm/'+bmdm,
                    contentType: 'application/json;charset=utf-8',
                    data:data,
                    type:'get',
                    success:function (datas) {
                        var zyMain = "";
                        for(var i=0;i<datas.length;i++){
                            zyMain+= '<tr>'+
                                '<td class=" text-left">'+datas[i].lrrmc+'</td>' +
                                '<td class= "text-right">'+datas[i].ysk.toFixed(2)+'</td>' +
                                '<td class= "text-right">'+datas[i].sjsk.toFixed(2)+'</td>' +
                                '<input type="hidden" value="'+datas[i].zydm+'"/>'+
                                '<td class= "text-center"><a  data="'+datas[i].zydm+'" style="font-size: 18px;" class="icon iconfont icon-caiwushuiwu iconFontColor-10a0f7 openJstree"></a></td>'+
                                '</tr>';
                        }
                        $('#zyTable_tbodyByws').append(zyMain);
                        $(".openJstree").on("click",function () {
                            configMap.panduan='3'
                            localStorage.setItem("data1",1);
                            var zyName = $(this).parent().parent().children()[0].innerText;
                            configMap.type="3";
                            configMap.other=$(this).attr("data");
                            $('#wsandweikeName').text(zyName);
                            $('#search_summaryStatistics').val(zyName)
                            $('#search_summaryStatistics').trigger('input');
                        });
                    }
                })
                $("#zyTableaaa").hide();//部门*/
                $("#bmTableaaa").hide();//员工*/
                $("#ygMain").hide();//员工*/
                if(configMap.panduan=='1'){
                    $("#bmTableaaa").show();//员工*/
                    $("#zyTableaaa").hide();//部门*/
                    $("#ygMain").hide();//员工*/
                }else if(configMap.panduan=='2'){
                    $("#zyTableaaa").show();//部门*/
                    $("#bmTableaaa").hide();//员工*/
                    $("#ygMain").hide();//员工*/
                }else{
                    $("#ygMain").show();//员工*/
                    $("#bmTableaaa").hide();//员工*/
                    $("#zyTableaaa").hide();//部门*/
                    // $('#summaryStatistics_data').hide();
                }

            })
            $('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            $('.endTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            var date=new Date;
            var year=date.getFullYear();
            $('#searchNF').val(year);//默认值
            configMap.type = 1;
            $('#restartCustomer').hide();
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

            $('#daochuexlsByws001').off('click').on('click',function () {
                configMap.startTime=$('#startTime',jqueryMap.$content).val();
                if(configMap.startTime==null||configMap.startTime==""){
                    configMap.startTime='2016-01-01';
                }
                configMap.endTime=$('#endTime',jqueryMap.$content).val();
                if(configMap.endTime==null||configMap.endTime==""){
                    configMap.endTime='3016-01-01';
                }
                exclByZy();
            });
            $('#daochuexlsByws002').off('click').on('click',function () {
                configMap.startTime=$('#startTime',jqueryMap.$content).val();
                if(configMap.startTime==null||configMap.startTime==""){
                    configMap.startTime='2016-01-01';
                }
                configMap.endTime=$('#endTime',jqueryMap.$content).val();
                if(configMap.endTime==null||configMap.endTime==""){
                    configMap.endTime='3016-01-01';
                }
                exclByCustoemr();
            });
            $('#daochuexlsByws003').off('click').on('click',function () {
                configMap.startTime=$('#startTime',jqueryMap.$content).val();
                if(configMap.startTime==null||configMap.startTime==""){
                    $('#startTime',jqueryMap.$content).val('2016-01-01');
                }
                configMap.endTime=$('#endTime',jqueryMap.$content).val();
                if(configMap.endTime==null||configMap.endTime==""){
                    $('#startTime',jqueryMap.$content).val('3016-01-01');
                }
                exclByBm();
            })
            //输入框绑定回车事件
			 $('[name="searchKhmc"]',jqueryMap.$container).keydown(function() {//给输入框绑定按键事件
		        if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
		        	$("#btnKhxxSearch",jqueryMap.$container).click();
		        }
		    });


            if (firstpage === '1') {
                addCustomerManage();
            }
            //点击选择所有
            jqueryMap.$container.find('[name="summaryStatisticsManager"]').change(function () {
                var el = $(this);
                selectAll(el.is(':checked'));
            });


        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        }
    };
}();
//@ sourceURL=org/org.js

