var yqyysyListwjsc = function () {
    var configMap = {
        pathid:'',//预览的id
        wx:'',
        dataUrl: "/systemmanager/dzbgl/wjscxix",
        nowData:"",
        uuid:'',
        path:'',
        yulanBtn_html: '<a href="javascript:;" class="fcwj_yulan" >预览</a>',
        sid:[]
    };
    var jqueryMap ={
        $container:null,
        $blockTarget:null
    }
    var setJqueryMap = function () {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
        jqueryMap.$blockTarget = $('body');
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

    var initGridwjsc = $("#wjscwjsc").DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth":false,
        "ajax": {
            "dataSrc": "aaData",
            "url":configMap.dataUrl,
            "data":function (data) {
                data.name=$("#wjselectname").val();
                data.lx=$("#wjselect").val();
            },

        },
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="wjscche"  value="' + data + '"/>';
                }
            },
            {
                "data": "name",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "lx",
                render:function(d,t,r){
                    if(d=='1'){
                        d="组织风采"
                    }
                    if(d=='2'){
                        d="学习园地"
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                class:"text-left",
                "data": "id",
                render:function(data, type, row){
                    return configMap.yulanBtn_html;
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
        "drawCallback":function () {//加载完数据之后执行
            var tootipContainer = $('[data-toggle="tooltip"]');
            var yulanContainer = $(".fcwj_yulan");//预览

            if(yulanContainer.length>0){
                // yulanContainer.off('click').on('click',yulanBtn);
                yulanContainer.off('click').on('click',yulanbth);
            }
            if (tootipContainer.length > 0) {
                tootipContainer.tooltip();
            };
        }
    });
    //预览
    var yulanbth=function () {
        var $el = $(this);
        var rowIndex = initGridwjsc.cell($el.parent()).index().row;
        var id = initGridwjsc.row(rowIndex).data().id;
        configMap.pathid=id;
        console.log(id+"123123");
        $.ajax({
            url: "systemmanager/dzbgl/wjzxyl",
            type: "POST",
            data: {"id": id},
            success: function (data) {
                checkfile(data.wjlj);
            },
            error: function (data) {
                Messenger().post({
                    message: "网络出现异常！",
                    type: 'error',
                    id:"ordermessenger"
                });
            }
        })

    };
    //检查预览的文件
    var checkfile=function (fileDir) {
        var suffix = fileDir.substr(fileDir.lastIndexOf("."));
        if (".doc" == suffix||".docx" == suffix) {
            POBrowser.openWindowModeless('/systemmanager/fcwjyl/fcwjopenword?pathid='+configMap.pathid ,'width=1200px;height=800px;');
        }else {
            Messenger().post({
                message: "对不起，系统只支持Word预览！",
                type: 'error',
                id:"ordermessenger"
            });
        }
    }
    /*文件上传*/
    var fczzwjsc = function () {
        openModal("文件管理", "systemmanager/rjlfhzhgl/bgwpgl/dzbgl/wjscmodal.jsp", 'wjsc');
    }
    //创建模态框
    var openModal = function (title, url, type) {  //这是文件管理
        console.log('文件上传模态框')
        var dialogButtons = {
        };
        if (type == 'wjsc'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    yqyysyListwjscmodal.submit();
                    initGridwjsc.ajax.reload();
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
    //文件下载
    var fcwjdownload = function () {
        var d = []
        var d1 = []
        var flag = false;
        jqueryMap.$container.find('[name=wjscche]:checked').each(function () {
            var el = $(this);
            var id = $(el).val();
            var lx = $(el).parent().parent().children("td:eq(2)").text();
            d.push(lx);
            d1.push(id);
        })
        console.log(d.length)
        console.log(d[0])
        console.log(d1[0])
        if(d.length!=1){
            Messenger().post({
                message:'请选择一条数据',
                type: 'error'
            })
            return
        }else{
            if(d[0]=="学习园地"){
                var data = {};
                var str3 = d1.join(',')
                data.wjid = str3;

                $.ajax({
                    url:'/systemmanager/dzbgl/Ryxzqx',
                    data:{"wjid":data.wjid},
                    async: false,
                    type:'POST',
                    success:function (data) {
                        if(data.success){
                            flag=false
                        }else{
                            flag=true;
                        }
                    },
                    error:function () {
                        flag=true;
                    }
                })
            }
            if(flag){
                Messenger().post({
                    message:"无下载权限",
                    type:'error'
                })
                return
            }
            window.location.href="/systemmanager/dzbgl/fcwjdownload?id="+d1[0];
        }
    }
    //文件下载记录
    var wjxzjl = function () {
        openModal1("文件下载记录","systemmanager/rjlfhzhgl/bgwpgl/dzbgl/wjxzjl.jsp","wjxz")
    }
    //创建模态框
    var openModal1 = function (title, url, type) {
        console.log('下载记录模态框')
        var dialogButtons = {
        };
        if (type == 'wjxz'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {

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
    }
    //创建模态框
    var openModal1 = function (title, url, type) {
        debugger;
        var dialogButtons = {};
        if (type === 'edit2') {
            dialogButtons.success = {
                label: '<i class="' + 'fa fa-save  iconMr' + '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // $('#addZXR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    var strArr = [], strArr1 = [], strArr2 = [];
                    $('#alreadyPer li', '#allotStaffList_m').each(function () {
                        strArr1.push($(this).attr('zydm'));
                    });


                    console.log(strArr1);
                    var str2 = strArr1.join(',');
                    console.log(str2);

                    var data = {};
                    //职员代码
                    data.zydm = str2;
                    //文件id
                    var d1 = [];
                    jqueryMap.$container.find('[name=wjscche]:checked').each(function () {
                        var el = $(this);
                        var id = $(el).val();
                        d1.push(id);
                    })
                    var str3 = d1.join(',')
                    data.wjid = str3;
                    console.log(str3)
                    $.ajax({
                        data: {"zydm":data.zydm,"wjid":data.wjid},
                        url: "/systemmanager/dzbgl/saveZxry",
                        type: 'POST',
                        success: function (result) {
                            if (result.success) {
                                Messenger().post({
                                    message:"分配成功!",
                                    type:'info'
                                });
                                initGridwjsc.ajax.reload();
                            } else {
                                Messenger().post({
                                    message: result.message,
                                    type: 'error'
                                });
                            }
                        },
                        error: function () {
                            App.unblockUI(jqueryMap.$blockTarget);
                        }
                    });

                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className: 'allotTask_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    //指定人员
    var wjglczzdry = function () {
        var d = []
        jqueryMap.$container.find('[name=wjscche]:checked').each(function () {
            var el = $(this);
            var mc = $(el).parent().parent().children("td:eq(2)").text();
            d.push(mc);
        })
        if(d.length==0){
            Messenger().post({
                message:'请选择数据',
                type: 'error'
            })
            return
        }
        for(var i = 0;i<d.length;i++){
            if(d[i]=="组织风采"){
                Messenger().post({
                    message:'请选择学习园地文件分配权限',
                    type: 'error'
                })
                return
            }
        }
        $.ajax({
            url:'/systemmanager/dzbgl/wjzdrywt',
            type:'POST',
            async: false,
            success:function (data) {
                if(data.success){
                    openModal1('学习园地文件权限', '/systemmanager/businesscooperate/staffList.jsp?type=any', 'edit2');
                }else{
                    Messenger().post({
                        message:'无指定人员权限',
                        type:'error'
                    })
                }
            },
            error:function () {
                Messenger().post({
                    message:'error',
                    type:'error'
                })
            }
        })
    }
    //条件查询
    var wjglczselect = function () {
        initGridwjsc.ajax.reload();
    }
    //重置
    var wjglczreset = function () {
        $("#wjselect").val("");
        $("input").val("");
        initGridwjsc.ajax.reload();
    }
    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            console.log(configMap.uuid)
            setJqueryMap();
            //文件上传
            $("#"+configMap.uuid+"wjsc",jqueryMap.$container).off('click').on('click',function () {
                fczzwjsc();
            });
            //文件下载
            $("#"+configMap.uuid+"wjxz",jqueryMap.$container).off('click').on('click',function () {
                fcwjdownload();
            });
            //下载记录
            $("#"+configMap.uuid+"xzjl",jqueryMap.$container).off('click').on('click',function () {
                wjxzjl();
            });
            //指定人员
            $("#"+configMap.uuid+"zdry",jqueryMap.$container).off('click').on('click',function () {
                wjglczzdry();
            });
            //条件查询
            $("#"+configMap.uuid+"seatch",jqueryMap.$container).off('click').on('click',function () {
                wjglczselect();
            });
            //重置条件
            $("#"+configMap.uuid+"reset",jqueryMap.$container).off('click').on('click',function () {
                wjglczreset();
            });
        },
        setPath:function (path) {
            configMap.path = path;
            console.log(configMap.path)
        }
    }
}();