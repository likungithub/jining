var yqyysyListyqsb = function () {
    var configMap = {
        wx:'',
        dataUrl: "systemmanager/yqsb/findByNaTy",
        nowData:"",
    };
    var jqueryMap ={
        $ypManageDialog:null
    }
    function delnull(d){
        if(d==undefined){
            return '';
        }
        if(d=='null'){
            return '';
        }
        return d;
    }
    var initGridyqsb = $('#ManagerList_m_yqsb').DataTable({
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
                data.name=$('#na').val();
                // data.type=$('#selectType2').val();
                data.stardate=$('#date1').val();
                data.enddate=$('#date2').val();
            },

        },
        "columns": [
            {
                "data": "sbbh",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="che"  value="' + data + '"/>';
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
                "data": "type",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "number",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "wx",
                render:function(d,t,r){
                    configMap.wx=d;
                    if(d<10){
                        d='需检修'
                        d=delnull(d);
                        return '<span style="display: inline-block;color:red;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }else{
                        d='设备完好'
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }

                }

            },
            {
                "data": "gzrq",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "wxzq",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+"天"+'</span>';
                }

            },
            {
                "data": "sccj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sbbh",
                render:function(d,t,r){
                    d=delnull(d);
                    if(configMap.wx<10){
                        return '<span style="display: inline-block;color: red;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }else{
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
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
            var findContainer = $("#cn");
            var deleteContainer = $("#sc");
            var updateContainer = $("#xg");
            var daoruContainer=$("#insertYq");
            var tootipContainer = $('[data-toggle="tooltip"]');

            if(findContainer.length > 0){
                findContainer.off('click').on('click', findBtn);
            }
            if(deleteContainer.length > 0){
                deleteContainer.off('click').on('click',deleteYqsb);
            }
            if(updateContainer.length > 0){
                updateContainer.off('click').on('click',updateYqsb);
            }
            if(daoruContainer.length>0){
                daoruContainer.off('click').on('click',daoru);//导入
            }
            if (tootipContainer.length > 0) {
                tootipContainer.tooltip();
            };
        }
    });
    /*全选*/
    $('input[name="ck"]').off('click').on('click',function () {
        if(this.checked){
            $('input[name="che"]').attr("checked","checked");
        }else{
            $('input[name="che"]').attr("checked",null);
        }
    });
    /*条件查询*/
    var findBtn = function (){
        initGridyqsb.ajax.reload();
    }
    /*批量删除*/
    var deleteYqsb = function (){
        bootbox.dialog({
            title: '提示',
            message: '确定要删除设备？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url:"systemmanager/yqsb/deleteYqsbtz",
                            type: 'POST',
                            data:$("#form_delete").serialize(),
                            success: function (d) {
                                Messenger().post("删除成功");
                                initGridyqsb.ajax.reload();
                            },
                            error: function () {
                                Messenger().post("删除失败");
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
    /*修改*/
    var updateYqsb = function () {
        //显示模态框
        $("#myModalxgtznlls").modal({show:true});
        findone($("#form_delete").serialize())
        $("#but1").off('click').on('click',function () {
            $.ajax({
                url:"systemmanager/yqsb/updateYqsbtz",
                type: 'POST',
                data:$("#update_form1").serialize(),
                dataType:"json",
                success:function () {
                    Messenger().post({
                        message: '提交成功！'
                    });
                    initGridyqsb.ajax.reload();
                    $("#myModalxgtznlls").modal('hide');
                },
                error:function () {
                    Messenger().post({
                        message: '提交失败！'
                    });
                }
            });
        });
    }
//查询一个
    var findone = function (data) {
        // alert("设备编号查询");
        $.ajax({
            url:"systemmanager/yqsb/findById",
            data:data,
            type:"POST",
            dataType:"json",
            success:function (data) {
                callBack(data)
            }
        });
    }
//数据回显
    var callBack = function (data) {
        console.log(data)
        $("#ins1").val(data.sbbh);
        $("#ins2").val(data.wxzq);
        $("#ins3").val(data.sbwhsj)
    }

    //导入excel
    var  daoru=function () {
        openModal("模板导入","/systemmanager/rjlfhzhgl/yqsbgl/yqsbtz/importYqsbtzExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                    initGridyqsb.clear().draw();
                    initGridyqsb.ajax.reload();
                }
            });
        });
    }
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
                buttons: dialogButtons
            });
        });
    };


}();