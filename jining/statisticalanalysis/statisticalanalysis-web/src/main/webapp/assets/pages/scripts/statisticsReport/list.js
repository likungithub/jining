var statisticsReportFun = function() {
    'use strict';
    // 全局属性参数
    var configMap = {
        listGrid:null,
        path:'',
        dataUrl:"/statisticReport/findInfo",
        bmdm:null,
        zydm:null,
        bmdm1:null,
        zydm1:null,
        searchDate:null,
        searchDate1:null
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$containerv=$('#statisticReportByM');
    };

    $('#statisticReportByMtable').parents('.tableWrap').scroll(function(e){
        var  a = $(this).scrollLeft();
        $('#staffReportByMtable').parents('.tableWrap1').scrollLeft(a);
    });
    $('#staffReportByMtable').parents('.tableWrap1').scroll(function(e){
        var  a = $(this).scrollLeft();
        $('#statisticReportByMtable').parents('.tableWrap').scrollLeft(a);
    });

    var date = new Date();
    var  dateF =  moment(date.getTime()-1000*60*60*24).format ('YYYY-MM-DD');
    $('input.oTime',$('#statisticReportByM')).val(dateF);
    configMap.searchDate = dateF;

    var initlistGrid = function() {
        configMap.listGrid = $('#statisticReportByMtable').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "pageLength": 10,
            "lengthMenu": [10, 20, 50, 100],
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method":"GET",
                "data": function(data) {
                    data.type = 1;
                    data.bmdm = configMap.bmdm;
                    data.zydm = configMap.zydm;
                    data.date = configMap.searchDate;
                }
            },
            "columns": [
                // {
                // "data": "bmmc",
                // render:function(d,t,r){
                //    console.log(d,t,r);
                // }
                // },
                {data:'bmmc',

                render:function(data,type,row){
                    if (row.bmdm.length === 6) {
                        return data;
                    } else {
                        return '<a data-bmdm="'+row.bmdm+'" href="javascript:void(0)"  data-toggle="tooltip" title="'+data+'">'+data+'</a>'
                    }
                }
                },
                {data:'edition',
                render:function(data,type,row){
                    var a = data.slice(0,4)+'-'+data.slice(4,6)+'-'+data.slice(6);
                    return '<div>'+a+'</div>';
                }

                },
                {data:'xzkh'},
                {data:'dskh'},
                {data:'zhsj'},
                {data:'gjsj'},
                //客户数据
                {data:'xzkh'},
                {data:'dskh'},
                {data:'fwzkh'},
                //合同数据
                {
                data:'xzht'
                },{
                data:'xzje'
                },{
                data:'xyht'
                },{
                data:'xyje'
                },
               // 收费数据
                {
                    data:'ysje'
                },{
                    data:'cqje'
                },{
                    data:'qfje'
                },{
                    data:'hzje'
                },{
                    data:'dfje'
                },
               // 记账数据
                {
                    data:'yjz'
                },{
                    data:'wjz'
                },
               // 报税数据
                {
                    data:'ybs'
                },{
                    data:'wbs'
                },
               // 任务数据
                {
                    data:'ywc'
                },{
                    data:'wwc'
                }
               ],
            "language": {
                "zeroRecords": "暂时没有信息",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有信息",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function() { // 数据加载完成后执行
                $('[data-toggle="tooltip"]').tooltip();
                var $bmContainer = $('a[data-bmdm]');
                if ($bmContainer.length>0){
                    $bmContainer.click(function () {
                        var $el = $(this);
                        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
                        var bmdm = configMap.listGrid.row(rowIndex).data().bmdm;
                        $.ajax({
                            type: "GET",
                            async:false,
                            url: '/statisticalanalysis/statisticReport/findBMByDm?bmdm='+bmdm,
                            success: function(d){
                                $.each(d,function(i,v){
                                    v.id = v.code;
                                    v.text = v.name;
                                })
                                $('#branch1',jqueryMap.$container).empty();
                                $('#branch1',jqueryMap.$container).select2({
                                    data: d,
                                    placeholder: '请选择部门',//默认文字提示
                                    language: "zh-CN",//汉化
                                    allowClear: true,//允许清空
                                    width: '156px',
                                })
                            }
                        });
                        $.ajax({
                            type: "GET",
                            async:false,
                            url:'/statisticalanalysis/statisticReport/findYGByDm?bmdm='+bmdm,
                            success: function(d){
                                $.each(d,function(i,v){
                                    v.id = v.zydm;
                                    v.text = v.name;
                                })
                                $('#staff1',jqueryMap.$container).empty();
                                $('#staff1',jqueryMap.$container).html('<option></option>')
                                $('#staff1',jqueryMap.$container).select2({
                                    data: d,
                                    placeholder: '请选择员工',//默认文字提示
                                    language: "zh-CN",//汉化
                                    allowClear: true,//允许清空
                                    width: '156px',
                                })
                            }
                        });
                    if ($('#branch1').val()){
                        configMap.bmdm1 = $('#branch1').val();
                        configMap.zydm1 = '';
                    }
                        $('#oTime1').val($('#oTime').val());
                        configMap.searchDate1=$('#oTime1').val();
                        configMap.listGrid1.ajax.reload();
                    // if ($('#staff1').val()){
                    //         configMap.zydm1 = $('#branch1').val();
                    //     }
                    //     if($('#oTime1').val()){
                    //         configMap.searchDate1 = $('#oTime1').val();
                    //     }
                    // if ($('#branch1').val()||$('#staff1').val()||$('#oTime1').val()){
                    //     configMap.listGrid1.ajax.reload();
                    // }

                    $('#yugongtiaojian_m,#yugongtiaojianb_m').removeClass('hide');

                    });
                }

            }
        });
    }
  function initlist1Grid() {
        configMap.listGrid1 = $('#staffReportByMtable').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "pageLength": 10,
            "lengthMenu": [10, 20, 50, 100],
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method":"GET",
                "data": function(data) {
                    data.type = 2;
                    data.bmdm = configMap.bmdm1;
                    data.zydm = configMap.zydm1
                    data.date = configMap.searchDate1
                }
            },
            "columns": [
                {data:'bmmc',

                    render:function(data,type,row){
                        return '<span  href="javascript:void(0)"  data-toggle="tooltip" title="'+data+'">'+data+'</span>'
                    }
                },
                {data:'zymc'},
                {data:'edition',
                    render:function(data,type,row){
                        var a = data.slice(0,4)+'-'+data.slice(4,6)+'-'+data.slice(6)
                        return '<div>'+a+'</div>'
                    }

                },
                {data:'xzkh'},
                {data:'dskh'},
                {data:'zhsj'},
                {data:'gjsj'},
                //客户数据
                {data:'xzkh'},
                {data:'dskh'},
                {data:'fwzkh'},
                //合同数据
                {
                    data:'xzht'
                },{
                    data:'xzje'
                },{
                    data:'xyht'
                },{
                    data:'xyje'
                },
                // 收费数据
                {
                    data:'ysje'
                },{
                    data:'cqje'
                },{
                    data:'qfje'
                },{
                    data:'hzje'
                },{
                    data:'dfje'
                },
                // 记账数据
                {
                    data:'yjz'
                },{
                    data:'wjz'
                },
                // 报税数据
                {
                    data:'ybs'
                },{
                    data:'wbs'
                },
                // 任务数据
                {
                    data:'ywc'
                },{
                    data:'wwc'
                }
            ],
            "language": {
                "zeroRecords": "暂时没有信息",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有信息",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function() { // 数据加载完成后执行
                $('[data-toggle="tooltip"]').tooltip();


            }
        });
    }


    return {
        init: function() {
            setJqueryMap();
            initlistGrid();
             initlist1Grid();
        //    初始化select
            $.get('/statisticalanalysis/statisticReport/findBM',function(data){
                // console.log(data);
                $.each(data,function(i,v){
                    v.text = v.name;
                    v.id = v.code;
                });
                $('#branch',jqueryMap.$container).select2({
                    data: data,
                    placeholder: '请选择部门',//默认文字提示
                    language: "zh-CN",//汉化
                    allowClear: true,//允许清空
                    width: '156px',
                })
            })

        //    按照员工进行查询
            $.get('/statisticalanalysis/statisticReport/findYG',function(data){
                // console.log(data);
                $.each(data,function(i,v){
                    v.text = v.name;
                    v.id = v.zydm;
                });
                $('#staff',jqueryMap.$container).select2({
                    data: data,
                    placeholder: '请选择员工',//默认文字提示
                    language: "zh-CN",//汉化
                    allowClear: true,//允许清空
                    width: '156px',
                })
            })

        //    为查询条件添加change事件事件
            $('#branch',jqueryMap.$container).change(function(){
                configMap.bmdm = $(this).val();
                configMap.listGrid.ajax.reload();
            });
            $('#staff',jqueryMap.$container).change(function(){
                configMap.zydm = $(this).val();
                configMap.listGrid.ajax.reload();
            });
            $('.orderTime',jqueryMap.$container).datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            $('#oTime',jqueryMap.$container).change(function () {
                configMap.searchDate= $(this).val();
                configMap.listGrid.ajax.reload();
            });
        //    为员工查询条件添加change事件
            $('#branch1',jqueryMap.$container).change(function(){
                configMap.bmdm1 = $('#branch1',jqueryMap.$container).val();
                configMap.zydm1 = $('#staff1',jqueryMap.$container).val();
                configMap.searchDate1 = $('#oTime1',jqueryMap.$container).val();
                configMap.listGrid1.ajax.reload();
            });
            $('#staff1',jqueryMap.$container).change(function(){
                configMap.bmdm1 = $('#branch1',jqueryMap.$container).val();
                configMap.zydm1 = $('#staff1',jqueryMap.$container).val();
                configMap.searchDate1 = $('#oTime1',jqueryMap.$container).val();
                configMap.listGrid1.ajax.reload();
            });
            $('#oTime1',jqueryMap.$container).change(function () {
                configMap.bmdm1 = $('#branch1',jqueryMap.$container).val();
                configMap.zydm1 = $('#staff1',jqueryMap.$container).val();
                configMap.searchDate1 = $('#oTime1',jqueryMap.$container).val();
                // console.log(configMap.bmdm1,configMap.zydm1,configMap.searchDate1)
                configMap.listGrid1.ajax.reload( );
            });

        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();