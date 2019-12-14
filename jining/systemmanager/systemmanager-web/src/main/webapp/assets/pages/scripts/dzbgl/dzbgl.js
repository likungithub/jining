var yqyysyListdzbgl = function () {
    var configMap = {
        wx:'',
        edit_Url:'/rjlfhzhgl/bgwpgl/dzbgl/wjsc.jsp',
        dataUrl: "/systemmanager/dzbgl/dzbdatabase",
        nowData:"",
        uuid:'',
        path:'',
        zl:'',
        add_dyxxJsp: "/rjlfhzhgl/bgwpgl/dzbgl/dzb/add_dyxx.jsp",
    };
    var jqueryMap ={
        $container:null,
        $blockTarget: null,
        $ManageDataTable:null,
        $ManageDialog: null
    }
    var setJqueryMap = function () {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = $('#dzbgldzbgl', jqueryMap.$container);
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
    /*时间格式转换*/
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    var initGriddzbgl = $("#dzbgldzbgl").DataTable({
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
                data.name=$("input[name='name']").val();
            },

        },
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="dzbglche"  value="' + data + '"/>';
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
                "data": "sex",
                render:function(d,t,r){
                    if(d=='0'){
                        d="女"
                    }
                    if(d=='1'){
                        d="男"
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "csrq",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "mz",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "gzsj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },

            {
                "data": "rdsj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "dnzw",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "dnzw1",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "jg",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "whcd",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "bzxx",
                render:function(d,t,r){
                    d=delnull(d);
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
        "drawCallback":function () {//加载完数据之后执行
            var tootipContainer = $('[data-toggle="tooltip"]');

            if (tootipContainer.length > 0) {
                tootipContainer.tooltip();
            };
        }
    });

    /*条件查询*/
    var findBtndzbgl = function (){
        initGriddzbgl.ajax.reload();
    }
    /*重置*/
    var resetdzbgl = function (){
        $("input").val("")
    }
    /*新增党员信息*/
    var adddzbgl = function () {
        $("#"+configMap.uuid+"myModaldzbgl").modal({show:true})
        $("#dzbglsubmit").on("click",function () {
            $.ajax({
                url: "/systemmanager/dzbgl/adddzbgl",
                data:$("#"+configMap.uuid+"dzbgl_from").serialize(),
                type:"POST",
                success:function () {
                    Messenger().post({
                        message:'添加成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModaldzbgl").modal('hide')
                    initGriddzbgl.ajax.reload()
                },
                error:function () {
                    Messenger().post({
                        message:'添加失败',
                        type: 'error'
                    })
                }
            })
        })
    }//创建模态框
    var openModal2 = function (title, url, type, func, size) {//打开退还原因模态框
        var dialogButtons = {};
        if (type === 'add') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
        }

        $.get(url, function (html) {
            jqueryMap.$ManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size: size
            });
        });
    };
    var adddzbgl1 = function () {
        openModal2('新增党员信息', configMap.path + configMap.add_dyxxJsp , "add", function () {
            var data = add_dyxxList.getData();
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            $.ajax({
                url: '/systemmanager/dzbgl/adddzbgl1',
                type: 'POST',
                data: data,
                dataType: "json",
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message: '添加成功',
                            type: "success"
                        });
                    } else {
                        Messenger().post({
                            message: '添加失败!',
                            type: "error"
                        });
                    }
                    initGriddzbgl.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);
                },
                error: function () {
                    Messenger().post({
                        message: '添加失败',
                        type: "error"
                    });
                    initGriddzbgl.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);

                }
            });
        }, "large")
    }
    /*删除党员信息*/
    var deletedzbgl = function () {
        var d = []
        jqueryMap.$container.find('[name=dzbglche]:checked').each(function () {
            var el = $(this);
            var sqzt = $(el).parent().parent().children("td:eq(1)").text();
            d.push(sqzt);
        })
        if(d.length==0){
            Messenger().post({
                message:'请选择要删除的信息',
                type: 'error'
            })
            return
        }else{
            bootbox.dialog({
                title: '提示',
                message: '是否删除党员信息？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            $.ajax({
                                url:'/systemmanager/dzbgl/deleteDzbgl',
                                data:$("#"+configMap.uuid+"dzbxx").serialize(),
                                type:"POST",
                                success:function () {
                                    Messenger().post({
                                        message:'删除成功',
                                        type: 'info'
                                    })
                                    initGriddzbgl.ajax.reload()
                                },
                                error:function () {
                                    Messenger().post({
                                        message:'删除失败',
                                        type: 'info'
                                    })
                                }
                            })
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
    /*修改党员信息*/
    var updatedzbgl = function () {
        var d = []
        jqueryMap.$container.find('[name=dzbglche]:checked').each(function () {
            var el = $(this);
            var sqzt = $(el).parent().parent().children("td:eq(1)").text();
            d.push(sqzt);
        })
        if(d.length==0){
            Messenger().post({
                message:'请选择要修改的信息',
                type: 'error'
            })
            return
        }
        $("#"+configMap.uuid+"myModaldzbglupdate").modal({show:true})
        var dd = $("[name='dzbglche']:checked")[0];
        var id = $(dd).val();
        var name = $(dd).parent().parent().children("td:eq(1)").text();
        var sex = $(dd).parent().parent().children("td:eq(2)").text();
        var csrq = $(dd).parent().parent().children("td:eq(3)").text();
        var mz = $(dd).parent().parent().children("td:eq(4)").text();
        var gzsj = $(dd).parent().parent().children("td:eq(5)").text();
        var rdsj = $(dd).parent().parent().children("td:eq(6)").text();
        var dnzw = $(dd).parent().parent().children("td:eq(7)").text();
        var dnzw1 = $(dd).parent().parent().children("td:eq(8)").text();
        var jg = $(dd).parent().parent().children("td:eq(9)").text();
        var whcd = $(dd).parent().parent().children("td:eq(10)").text();
        var bzxx = $(dd).parent().parent().children("td:eq(11)").text();
        $("#updatedzbgl1").val(name)
        if(sex=='男'){
            sex = '1'
        }
        if(sex=='女'){
            sex = '0'
        }
        $("#updatedzbgl2").val(sex)
        $("#updatedzbgl3").val(csrq)
        $("#updatedzbgl4").val(mz)
        $("#updatedzbgl5").val(gzsj)
        $("#updatedzbgl6").val(rdsj)
        $("#updatedzbgl7").val(dnzw)
        $("#updatedzbgl8").val(id)
        $("#updatedzbgl9").val(dnzw1)
        $("#updatedzbgl10").val(jg)
        $("#updatedzbgl11").val(whcd)
        $("#updatedzbgl12").val(bzxx)
        $("#dzbglupsubmit").on("click",function () {
            console.log($("#"+configMap.uuid+"dzbglupdate_from").serialize())
            $.ajax({
                url:'/systemmanager/dzbgl/updateDzbgl',
                data:$("#"+configMap.uuid+"dzbglupdate_from").serialize(),
                type:"POST",
                success:function () {
                    Messenger().post({
                        message:'修改成功',
                        type: 'info'
                    })
                    initGriddzbgl.ajax.reload();
                    $("#"+configMap.uuid+"myModaldzbglupdate").modal('hide')
                },
                error:function () {
                    Messenger().post({
                        message:'修改失败',
                        type: 'error'
                    })
                }
            })
        })
    }
    /*风采组织文件上传与下载*/
    var fczz = function () {
        console.log("123445")
        openModal("文件管理", "systemmanager/rjlfhzhgl/bgwpgl/dzbgl/wjsc.jsp", 'wjsc');
    }
    //创建模态框
    var openModal = function (title, url, type) {  //这是文件管理
        console.log('模态框')
        var dialogButtons = {
        };
        if (type == 'wjsc'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                 callback: function () {
          /*           jcxxlr.save(function (data) {
                         if(data){
                             initGriddzbgl.ajax.reload();
                             jqueryMap.$Dialog.modal("hide");
                         }else{
                             return false;
                             jqueryMap.$Dialog.modal("hide");
                         }
                     })*/
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

    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            console.log(configMap.uuid)
            setJqueryMap();
            //条件查询
            $("#"+configMap.uuid+"dzbglSeatch",jqueryMap.$container).off('click').on('click',function () {
                findBtndzbgl();
            });
            //重置操作
            $("#"+configMap.uuid+"resetdzbgl",jqueryMap.$container).off('click').on('click',function () {
                resetdzbgl();
            });
            //新增党员信息
            $("#"+configMap.uuid+"adddzbgl",jqueryMap.$container).off('click').on('click',function () {
                adddzbgl();
            });
            //新增党员信息
            $("#"+configMap.uuid+"adddzbgl2",jqueryMap.$container).off('click').on('click',function () {
                adddzbgl1();
            });
            //删除党员信息
            $("#"+configMap.uuid+"deletedzbgl",jqueryMap.$container).off('click').on('click',function () {
                deletedzbgl();
            });
            //修改党员细信息
            $("#"+configMap.uuid+"updatedzbgl",jqueryMap.$container).off('click').on('click',function () {
                updatedzbgl();
            });
            //文件管理
            $("#"+configMap.uuid+"fczzdzbgl",jqueryMap.$container).off('click').on('click',function () {
                fczz();
            });

        },
        setPath:function (path) {
            configMap.path = path;
            console.log(configMap.path)
        }
    }
}();