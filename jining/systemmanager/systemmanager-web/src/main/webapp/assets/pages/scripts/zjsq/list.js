var list = function() {
    'use strict';
    var prefix = 'zjgl/zjsq';
    var dir = "zjsq";
    // 全局属性参数
    var configMap = {
        dataUrl: '/'+prefix+'/querylist',
        del_dataUrl: '/'+prefix+'/delete',
        edit_Url:'/'+dir+'/edit.jsp',
        print_Url:'/'+dir+'/info.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        uuid:'',
        khbm:'',
        sqPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="sq" data-toggle="tooltip" title="收取"><i class="icon iconfont icon-shouqu- btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        ghPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="gh" data-toggle="tooltip" title="归还"><i class="icon iconfont icon-guihuan- btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
        jqueryMap.$blockTarget = $('body');
    };
    var  a =null,b = null, c = null;

    var initlistGrid = function() {
        configMap.listGrid = $('#'+configMap.uuid+'ManagerList_m', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method":"POST",
                "data": function(data) {
                    var khbm =  configMap.khbm;
                    data.khbm=khbm;
                   /* data.zjmc = $('.manager-container-sl input[name="zjmc"]').val();
                    data.jjsj_q=$('.manager-container-sl input[name="jjsj_q"]').val();
                    data.jjsj_z=$('.manager-container-sl input[name="jjsj_z"]').val();
*/
                    data.zjmc = a;

                    data.jjsj_q=b;

                    data.jjsj_z=c;

                }
            },
            "columns": [
                {
                    className:'text-center',
                    "data": "zjsqid",
                    "render": function (data, type, row) {
                        var content = '<i data-flag="0" class="fa fa-plus open mainrow" name="OpenAndClose"></i>'
                        if(!row.jjcs){
                            content = '';
                        }


                        return content;
                    }
                },
                {
                    "data": "zjdm",
                    render:function(d,t,r){
                        var content = '';
                        content += '<input type="checkbox" name="checkbox_checkbox" id="'+d+'"/>';
                        return content;
                    }
                },
                {
                    "data": "xh",
                    render:function(d,t,r){
                        var tag='',tip='';
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                },
                {
                    "data": "jjzt",
                    render:function(d,t,r){
                        var tag='',tip='';
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                },
                {
                    "data": "zjmc",
                    render:function(d,t,r){
                        var tag='',tip='';
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                },
                {
                    "data": "jjcs",
                    'className':'text-center',
                    render:function(d,t,r){
                        var tag='',tip='';
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                },
                {
                    "data": "sqr",
                    'className':'text-center'
                },
                {
                    "data": "lrsj",
                    'className':'text-center',
                    render:function(d,t,r){
                        return d.split(' ')[0]
                    }
                },
                {
                    "data": "bzxx",
                    render:function(d,t,r){
                        var tag='',tip='';
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                },
                {
                    "data": "xtsj",
                    'className':'text-center',
                    render:function(d,t,r){
                        return d.split(' ')[0]
                    }
                },
               /* {
                    "data": "jjxx",
                    render:function(d,t,r){
                        var tag='',tip='';
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                },*/
                {
                    className: "text-center",
                    "render": function(data, type, row) {
                        var btn = "";
                        btn =  configMap.sqPageUrl;
                        return  btn+configMap.ghPageUrl;
                    }

                }],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function() { // 数据加载完成后执行
                $('input[name="checkbox_checkbox"]').each(function (i,v) {
                   if( !($(v).is(':checked'))){
                       $('[name="selectAll"]').prop('checked',false);
                       return  false;
                   }
                })
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var sqContainer = $('[data-type="sq"]', jqueryMap.$container);
                var ghContainer = $('[data-type="gh"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(sqContainer.length > 0){
                    sqContainer.off('click').on('click',sqgh);
                }

                if(sqContainer.length > 0){
                    ghContainer.off('click').on('click',sqgh);
                }


                var openContainer = $('[name="OpenAndClose"]',jqueryMap.$container);
                if(openContainer.length>0){
                    openContainer.off('click').on('click',function(){
                        var $el = $(this);
                        $el.parents('tr').toggleClass('mainH');

                       var a = $el.attr('data-flag');
                       a++;
                        $el.attr('data-flag',a);
                        $el.parents('tr').next('.newInsertTr').remove();
                        if($el.attr('data-flag')%2==0){
                            $el.removeClass().addClass('fa fa-plus');
                            return false;
                        }else {
                            $el.removeClass().addClass('fa fa-minus');
                        }
                        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
                        var id = configMap.listGrid.row(rowIndex).data().zjsqid;
                        $.post( configMap.path+'/zjgl/zjsq/queryjllist?zjsqid='+id,function (data) {
                            var  waitingStrH = '<tr style="background: #fff" class="newInsertTr mainB" data-zjsqid="'+id+'"><td colspan="11"><div class="container-fluid"><div class="h4" style="font-size: 12px;font-weight: 600;">收取归还历史</div>';
                            var  waitingStrT = '</div></td></tr>';
                            var str = '';
                            var color1 = '#34AF1C';
                            $.each(data.data,function (i,v) {
                                if(v.jjzt=='归还'){
                                    var color1 = '#34AF1C';
                                }else{
                                    color1 = '#FE6D03';
                                }
                                str+='<div style="height: 36px;line-height: 36px;border-bottom: 1px dashed #dedede">'+'<input data-id="'+v.ID+'" type="checkbox" style="vertical-align: sub">' +'<span style="float: right;color: #999">[<span>系统时间：</span>'+v.xtsj+']</span>'+'<span style="padding-right: 15px ">'+ v.lrsj.split(' ')[0]+'</span>'+'<span style="display: inline-block;width: 100px">'+ v.sqr+'</span>'+'<span style="padding: 15px;color: '+color1+';">'+v.jjzt+'</span>'+'<span>备注：</span>'+'<span data-placement="right" data-toggle="tooltip" title="'+v.bzxx+'" style="display: inline-block;width: 260px;vertical-align: top;overflow: hidden;margin-right: 15px;cursor: pointer">'+ v.bzxx+'</span>'+'<a  class="chexiao" href="javascript:void(0)">撤销</a>'+'</div>'
                            })

                            var strAll =waitingStrH+str+waitingStrT;
                            $(strAll).insertAfter($el.parents('tr'));
                            $('[data-toggle="tooltip"]').tooltip();
                        })
                    });
                }

            }
        });
    }
    //点击单条撤销
    $('.manager-container-sl table').on('click','a.chexiao',function () {
        var id = $(this).siblings('input').attr('data-id');
        var zjsqid = $(this).parents('tr').attr('data-zjsqid');
        var $parent = $(this).parents('tr');
        $.post( configMap.path+'/zjgl/cx_zjsqjl?id='+id+'&zjsqid='+zjsqid,function (data) {
            if (data.success){
                var  waitingStrH = '<td colspan="11"><div class="container-fluid"><div class="h4">收取归还历史</div>';
                var  waitingStrT = '</div></td>';
                var str = '';
                var color1 = '#34AF1C';
                $.each(data.data,function (i,v) {
                    if(v.jjzt=='归还'){
                        var color1 = '#34AF1C';
                    }else{
                        color1 = '#FE6D03';
                    }
                    str+='<div style="height: 36px;line-height: 36px;border-bottom: 1px dashed #dedede">'+'<input data-id="'+v.ID+'" type="checkbox" style="vertical-align: sub">' +'<span style="float: right;color: #999">[<span>系统时间：</span>'+v.xtsj+']</span>'+'<span style="padding-right: 15px ">'+ v.lrsj.split(' ')[0]+'</span>'+'<span style="display: inline-block;width: 100px">'+ v.sqr+'</span>'+'<span style="padding: 15px;color: '+color1+';">'+v.jjzt+'</span>'+'<span>备注：</span>'+'<span  data-placement="right" data-toggle="tooltip" title="'+ v.bzxx+'" style="display: inline-block;width: 260px;vertical-align: top;overflow: hidden;margin-right: 15px;cursor: pointer;">'+ v.bzxx+'</span>'+'<a  class="chexiao" href="javascript:void(0)">撤销</a>'+'</div>'
                })
                var strAll =waitingStrH+str+waitingStrT;
                $parent.html(strAll);
                Messenger().post({
                    message: data.message,
                    type: 'success'
                });
                configMap.listGrid.ajax.reload();


            }

        })
    })
    //撤销多条记录
    //点击复选框的时候就把id塞进去,点击收缩的时候就清空数组
    $('.manager-container-sl').on('click','input[data-id]',function () {
        var initZjsqid = $(this).parents('tr').attr('data-zjsqid');
        $('.manager-container-sl input[type="checkbox"]').not('input[data-id]').prop('checked',false);
       $('tr[data-zjsqid="'+initZjsqid+'"]').siblings('tr.newInsertTr').find('input[data-id]').prop('checked',false);

    })
    $('.manager-container-sl .piliangchexiao').click(function(){
    //    取得已选中的input
        var id1 =[];
        $('.manager-container-sl input[data-id]:checked').each(function (i,v) {
            id1.push($(v).attr('data-id'));
        })

        if( id1.length<=0){
            Messenger().post({
                message: "请选择记录!",
                type: 'error'
            });
            return false;
        }
        var id = id1.join(',');
        var zjsqid =  $('.manager-container-sl input[data-id]:checked').parents('tr').attr('data-zjsqid');
        var $parent = $('.manager-container-sl input[data-id]:checked').parents('tr');
        $.post( configMap.path+'/zjgl/cx_zjsqjl?id='+id+'&zjsqid='+zjsqid,function (data) {
            if (data.success){
                var  waitingStrH = '<td colspan="11"><div class="container-fluid"><div class="h4" style="font-size: 12px;font-weight: 600;">收取归还历史</div>';
                var  waitingStrT = '</div></td>';
                var str = '';
                var color1 = '#34AF1C';

                $.each(data.data,function (i,v) {
                    if(v.jjzt=='归还'){
                        var color1 = '#34AF1C';
                    }else{
                        color1 = '#FE6D03';
                    }
                    str+='<div style="height: 36px;line-height: 36px;border-bottom: 1px solid #dedede">'+'<input data-id="'+v.ID+'" type="checkbox" style="vertical-align: sub">' +'<span style="float: right;color: #999">[<span>系统时间：</span>'+v.xtsj+']</span>'+'<span style="padding-right: 15px ">'+ v.lrsj.split(' ')[0]+'</span>'+'<span style="display: inline-block;width: 100px">'+ v.sqr+'</span>'+'<span style="padding: 15px;color: '+color1+';">'+v.jjzt+'</span>'+'<span>备注：</span>'+'<span data-toggle="tooltip" data-placement="right" title="'+v.bzxx+'" style="display: inline-block;width: 260px;vertical-align: top;overflow: hidden;margin-right: 15px;cursor: pointer;">'+ v.bzxx+'</span>'+'<a  class="chexiao" href="javascript:void(0)">撤销</a>'+'</div>'
                })
                var strAll =waitingStrH+str+waitingStrT;
                $parent.html(strAll);
                $('[data-toggle="tooltip"]').tooltip();
                Messenger().post({
                    message: data.message,
                    type: 'success'
                });
            }

        })
    });
    function sqghFun(){
        var $inpS1 = $('.ManagerListzhengjian_m tbody>tr>td:nth-child(2)>input:checked');
        var id1 = [];
        var zjsqid1 = [];
        var jjcs1 =[];
        $inpS1.each(function (i,v) {
            var rowIndex = configMap.listGrid.cell($(v).parent()).index().row;
            var zjdm = configMap.listGrid.row(rowIndex).data().zjdm;
            id1.push(zjdm);
            if(!configMap.listGrid.row(rowIndex).data().zjsqid){
                zjsqid1.push(0);
            }else {
                zjsqid1.push(configMap.listGrid.row(rowIndex).data().zjsqid);
            }
            jjcs1.push(configMap.listGrid.row(rowIndex).data().jjcs);
        })

        if( id1.length<=0){
            Messenger().post({
                message: "请选择证件!",
                type: 'error'
            });
            return false;
        }


        var id = id1.join(',');
        var zjsqid = zjsqid1.join(',');
        var jjcs = jjcs1.join(',');
        var khbm = configMap.khbm;
        openModal("证件收取及归还", configMap.path + configMap.edit_Url + "?zjdm=" + encodeURI(id)+'&khbm='+khbm+'&zjsqid='+zjsqid+"&jjcs="+jjcs, 'bianji');
    }
    //批量证件收取
    $('.shouquzhengjian_sl').click(function () {
        localStorage.setItem('sqghBZ','sq');
        sqghFun();
    });
    //批量归还证件
    $('.guihuanzhengjian_sl').click(function () {
        localStorage.setItem('sqghBZ','gh');
        sqghFun();
    });
    //添加打印功能证件
    //增加一个数组用于存储证件名称
    var zjNameArr = [];
    var  Myflag = 0;
    $('.dayinjiaojiedan_sl').click(function(){
        zjNameArr = [];
    //   取到表格中中所有备选到的
  var $inpS = $('.ManagerListzhengjian_m tbody>tr>td:nth-child(2)>input:checked');
        $inpS.each(function (i,v){
            var rowIndex = configMap.listGrid.cell($(v).parent()).index().row;
            var mc = configMap.listGrid.row(rowIndex).data().zjmc;
            if(!configMap.listGrid.row(rowIndex).data().jjcs){
                Myflag=1;
                return false;
            }else {
                Myflag=0;
            }
            localStorage.setItem('dljgmc_sl',configMap.listGrid.row(rowIndex).data().dljgmc);
            localStorage.setItem('khmc_sl',configMap.listGrid.row(rowIndex).data().khmc);
            zjNameArr.push(mc);
        });
        if(  Myflag){
            Messenger().post({
                message: "不允许打印交接次数为0的信息",
                type: 'error'
            });
            return false;
        }
        if( zjNameArr.length<=0){
            Messenger().post({
                message: "请选择证件!",
                type: 'error'
            });
            return false;
        }
    localStorage.setItem('printInfoArr',zjNameArr);
    openModal('证件打印',configMap.path + configMap.print_Url,'print');

    });
    //编辑
    var sqgh = function(){
        var $el = $(this);
        if($el.attr('data-type')=='sq'){
        localStorage.setItem('sqghBZ','sq');
        }else{
            localStorage.setItem('sqghBZ','gh');
        }
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().zjdm;
        var khbm = configMap.khbm;
        var jjcs = configMap.listGrid.row(rowIndex).data().jjcs;
        var zjsqid = configMap.listGrid.row(rowIndex).data().zjsqid;
        openModal("证件收取及归还", configMap.path + configMap.edit_Url + "?zjdm=" + encodeURI(id)+'&khbm='+khbm+'&zjsqid='+zjsqid+"&jjcs="+jjcs, 'bianji');
    }

    //删除
    var del = function(event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var rowIndex = configMap.listGrid.cell(element.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().zjdm;
        $.ajax({
            data:{"zjdm":id},
            url: configMap.path + configMap.del_dataUrl,
            type: 'POST',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.listGrid.ajax.reload();
                    Messenger().post("删除成功!");
                } else {
                    Messenger().post({
                        message: "删除失败!",
                        type: 'error'
                    });
                }
            },
            error: function() {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    //创建模态框
    var openModal = function (title, url, type) {
        var dialogButtons = {
        };

        if(type == 'print'){
            dialogButtons.success = {
                label: '打&nbsp;印',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    //        取得所有td标签
                    var  inforCon = [];
                    $('td',$('#printInfo_sl')).each(function(i,v){
                        inforCon.push($(v).children().val());
                    });
                localStorage.setItem('needPrintInfo',inforCon);

                window.open(configMap.path +'/zjsq/needPrintPage.jsp','_blank');

                }
            };
        }

        if (type == 'bianji'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    edit.save(function (data) {
                        if(data){
                            configMap.listGrid.ajax.reload();
                            jqueryMap.$Dialog.modal("hide");
                        }else{
                            return false;
                        }
                    })
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn btn-default borderRadius4 color666'
        }
        $.get(url, function (html) {
            jqueryMap.$Dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };


    //全选
    var selectAll = function (status){
        $('[type="checkbox"]',jqueryMap.$container).not(":disabled").prop("checked",status);
        var inputjson = $('[type="checkbox"]:checked',jqueryMap.$container).not(jqueryMap.$container.find('[name="selectAll"]'));
    };
    
    return {
        init: function(uuid,khbm) {


            configMap.uuid=uuid;
            configMap.khbm=khbm;

            setJqueryMap();
            initlistGrid();

            jqueryMap.$container.find('.beginTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true,
            });
            jqueryMap.$container.find('.endTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true,
            });
            $('#searchTerm-m', jqueryMap.$container).on('click', function () {
                b =$('.manager-container-sl input[name="jjsj_q"]').val();
                c =$('.manager-container-sl input[name="jjsj_z"]').val();
                a=$('.manager-container-sl input[name="zjmc"]').val();
                //将字符串转换为日期
                var begin=new Date(b.replace(/-/g,"/"));
                var end=new Date(c.replace(/-/g,"/"));
                //js判断日期
                if (begin-end>0) {
                    Messenger().post({
                        message: "录入日期起始日期应当小于结束日期!",
                        type: 'warning'
                    });
                    return;
                }
                configMap.listGrid.ajax.reload();
                b =null;
                c =null;
                a=null;
            });


            $('#'+configMap.uuid+'btnNew',jqueryMap.$container).on('click',function () {
                openModal("新增", configMap.path + configMap.edit_Url, 'bianji');
            });


            //点击选择所有
            jqueryMap.$container.find('[name="selectAll"]').change(function (){
                var el = $(this);
                selectAll(el.is(':checked'));
            });

        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();