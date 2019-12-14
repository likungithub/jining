var yqyysyList = function () {
// 全局属性参数
    var configMap = {
        dataUrl:'systemmanager/yqyysy/findAllJcxm',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改企业委托信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除企业委托信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
    };
    // 全局Dom
    var jqueryMap = {
        $usersDialog: null
    };

    var yqyysyGrid = $("#yqyysy_ManagerList_m").DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth": false,
        "ajax": {
            "url":configMap.dataUrl,
            "dataSrc": "aaData",
            "data": function (data) {
                data.jcxmc = $("#yqyysy_jcxmc").val();
              /*  data.if_yqfp=$("#yqyysy_if_yqfp").val();*/
            }
        },
        "columns": [
            {
                class:"text-left",
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="id" value="'+data+'"/>';
                }
            },
            {
                class:"text-left",
                "data": "zwmc_bm",
                "render": function (data, type, row) {
                    if (data==null||data=="") {
                        data="";
                    }
                    return data;
                }

            },
            {
                class:"text-left",
                "data":"xl",
                "render": function (data, type, row) {
                    if (data==null||data=="") {
                        data="";
                    }
                    return data;
                }
            },
            {
                class:"text-left",
                "data": "cyl",
                "render": function (data, type, row) {
                    if (data==null||data=="") {
                        data="";
                    }
                    return data;
                }
            },
            {
                class:"text-left",
                "data": "yl",
                "render": function (data, type, row) {
                    if (data==null||data=="") {
                        data="";
                    }
                    return data;
                }
            },
            {
                class:"text-left",
                "data": "pdyj",
                "render": function (data, type, row) {
                    if (data==null||data=="") {
                        data="";
                    }
                    return data;
                }
            },
            {
                class:"text-left",
                "data": "jcyj",
                "render": function (data, type, row) {
                    if (data==null||data=="") {
                        data="";
                    }
                    return data;
                }
            },
            {
                class:"text-left",
                "data": "if_yqfp",
                "render": function (data, type, row) {
                    if(data=="001"||data==null||data==""){
                        data="未分配";
                    }
                    if(data=="002"){
                        data="已分配";
                    }
                    return data;
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
            var chaxunContainer=$("#yqyysy_chaxun");
            var zjyqContainer=$("#yqyysy_zjyq");//增加仪器

            if(chaxunContainer.length>0){
                chaxunContainer.off('click').on('click',chaxunBtn);
            }
            if(zjyqContainer.length>0){
                zjyqContainer.off('click').on('click',zjyqBtn);
            }

        }
    });
    var chaxunBtn=function () {//查询
        yqyysyGrid.ajax.reload();
    }
    var zjyqBtn=function () {
        var ids=[];//定义一个数组
        $('input[name="id"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if(ids.length==0){
            Messenger().post("检测项不能为空!");
            return;
        }
        $.ajax({
            url:"systemmanager/yqyysy/addJcxIds",
            data:$("#yqyysy_form_choose").serialize(),
            type:"POST"
        });
        openModal("添加仪器","systemmanager/rjlfhzhgl/yqsbgl/yqyysy/addYq.jsp","addYq");
    }


//打开模态框组件
    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if (type ==="addYq") {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    var yqids=[];//定义一个数组
                    $('input[name="yqids"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
                        yqids.push($(this).val());//将选中的值添加到数组ids中
                    });
                    if(yqids.length==0){
                        Messenger().post("仪器不能为空!");
                        return;
                    }
                    $.ajax({
                        url:"systemmanager/yqyysy/addYq",
                        data:$("#addYp_form_choose").serialize(),
                        type:"POST",
                        success:function (data) {
                            yqyysyGrid.ajax.reload();
                            Messenger().post("添加仪器成功!");
                        },
                        error:function (data) {
                            yqyysyGrid.ajax.reload();
                            Messenger().post("添加仪器失败!");
                        }
                    });
                    jqueryMap.$usersDialog.modal('hide');

                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭',
            className: 'btn btn-default borderRadius4'
        }

        $.get(url, function (html) {
            jqueryMap.$usersDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

}();


