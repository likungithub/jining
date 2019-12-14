/**
 *
 */
var jcxmlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/jcxm/getJcxmList',
        addUrl:'/marketManage/jcxm_jbxx.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        jcxmGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改企业委托信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除检测项目"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        fwzt: '',
        other: '',
        uuid: '',
        ypid: '',
        wtid:'',
        importUrl:'/marketManage/importJcxmExcel.jsp'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#jcxm' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#jcxmlist_data');
        jqueryMap.$wtkhForm = $('#addwtkuxl', jqueryMap.$content);

    };

    var jcxmjson = [];

    var initJcxmGrid = function () {
        configMap.jcxmGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "scrollX":true,//水平滚动
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypid = configMap.ypid;
                    data.jcxm = $('input[name="jcxmmc"]',jqueryMap.$content).val();
                    data.yl = $('input[name="ylmc"]',jqueryMap.$content).val();
                    data.xl = $('input[name="xlmc"]',jqueryMap.$content).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox" value="'+data+'" id="jcxm_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "render": function (data, type, row) {
                        return configMap.editBtn_html + configMap.deleBtn_html;
                    }
                },
                {
                    class:"text-center",
                    "data": "zwmc_bm",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcx",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "xlz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jldw",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    "data":"cpdlmc",
                    class:"text-center",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "yl",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cyl",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "xl",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "jcfa",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cpdldm",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jclbdm",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "pdyj",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "pdyjmc",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zm",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bl",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_pd",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bjf",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "pdnh",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "xlzmrz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcyj",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcyjmc",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_cma",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_cmaf",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_cnas",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_catl",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bzffjcxdw",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bzzxyxx",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bzzxyxxdw",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bzzdyxx",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bzzdyxxdw",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "wswnz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "wswmz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "wswcz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_xtpd",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jg",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "if_bzff",
                    "render": function (data, type, row) {
                        if(data=="1"){
                            data="是";
                        } else if(data=="0"){
                            data="否";
                        } else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbzl",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbzldw",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "yyckjz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "bz",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
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
                var editContainer = jqueryMap.$content.find('[name="contractedit"]');
                var deleteContainer = jqueryMap.$content.find('[name="contractdelete"]');

                $('[data-toggle="tooltip"]').tooltip();
                if (editContainer.length > 0){
                    editContainer.off('click').on('click', editJcxm);
                }

                if(deleteContainer.length > 0){
                    deleteContainer.off('click').on('click',shanchu);
                }
            }
        });
    };


    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if(type === "edit"){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractcontinue.saveContract(function (result){
                        if(result){
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.jcxmGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        if(type === "import"){//导入excel表
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    setInJcxmExcel.subimtBtn(function (result) {
                        if (result) {
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.jcxmGrid.clear().draw();
                            configMap.jcxmGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        if(type === "change"){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractChange.saveChange(function (result){
                        if(result){
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.jcxmGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    //修改委托信息
    var editJcxm = function (){
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.jcxmGrid.cell(el.parent()).index().row;
        var id = configMap.jcxmGrid.row(rowIndex).data().id;
        generateTab(this, configMap.path + configMap.addUrl + '?id=' + id, "修改检测项目", "jcxm_info", 'fa fa-file-text-o iconMr');
    };
    var shanchu =function () {
        var el = $(this);
        var rowIndex = configMap.jcxmGrid.cell(el.parent()).index().row;
        var id = configMap.jcxmGrid.row(rowIndex).data().id;
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        delJcxm(id);
                    }
                },
                cancel: {
                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                    className: 'btn btn-default borderRadius4'
                }


            }
        });
    }
    //删除合同
    var delJcxm = function (id){
        $.ajax({
            url: configMap.path + "/jcxm/delJxcm/" + id,
            type: 'POST',
            success: function (result) {
                if (result.success) {
                    configMap.jcxmGrid.ajax.reload();
                    Messenger().post({
                        message: "删除成功",
                        type: 'info',
                        id:"ordermessenger"
                    });
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'error',
                        id:"ordermessenger"
                    });
                }
            },
            error: function () {
                Messenger().post({
                    message: "删除失败！",
                    type: 'error',
                    id:"ordermessenger"
                });
            }
        });
    };

    //增加企业委托
    var addQYWT = function () {
        stopContinueClick("#addCustomerManage", 300);
        generateTab(this, configMap.path + configMap.addUrl, "创建企业委托", "jcxm_info", 'fa fa-file-text-o iconMr');
    };

    //获取产品大类名称
    //001产品大类 002亚类 003次亚类 004细类
    var getCpmc = function (type) {
        $.get(configMap.path + '/jcxm/getCpmc/' + type , function (res) {
            if (res.success) {
                var data = res.data;
                if (type == '001') {
                    $('#cpdl' + configMap.uuid, jqueryMap.$content).empty();
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] == null) {
                            continue;
                        } else {
                            $('<option value="' + data[i].CPDLMC + '">' + data[i].CPDLMC + '</option>').appendTo($('#cpdl' + configMap.uuid, jqueryMap.$content));
                        }
                    }
                }
                if (type == '002') {
                    $('#yl' + configMap.uuid, jqueryMap.$content).empty();
                    for (var i = 0; i < data.length; i++) {
                        $('<option value="' + data[i].YL + '">' + data[i].YL + '</option>').appendTo($('#yl' + configMap.uuid, jqueryMap.$content));
                    }
                }
                if (type == '003') {
                    $('#cyl' + configMap.uuid, jqueryMap.$content).empty();
                    for (var i = 0; i < data.length; i++) {
                        $('<option value="' + data[i].CYL + '">' + data[i].CYL + '</option>').appendTo($('#cyl' + configMap.uuid, jqueryMap.$content));
                    }
                }
                if (type == '004') {
                    $('#xl' + configMap.uuid, jqueryMap.$content).empty();
                    for (var i = 0; i < data.length; i++) {
                        $('<option value="' + data[i].XL + '">' + data[i].XL + '</option>').appendTo($('#xl' + configMap.uuid, jqueryMap.$content));
                    }
                }
            }
        });
    };

    var selectAll = function (status) {
        $('[type="checkbox"]', jqueryMap.$manualdata).prop("checked", status);
    };

    var saveYpJcxm = function () {
      /*  var ids=[];//定义一个数组
        $('input[name="checkbox_checkbox"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });*/
         var inputjson = $('[type="checkbox"]:checked', jqueryMap.$manualdata).not(jqueryMap.$content.find('[name="selectjcxmlist"]'));
         var temp = null;
         $(inputjson).each(function () {
             temp = {jcxmId: $(this).attr('id').substring(5)};
             jcxmjson.push(temp);
         });
        var data = {
            jcxmId:jcxmjson,
            wtid:configMap.wtid
        };
        $.ajax({
            url:configMap.path + '/jcxm/saveYpJcxmcy',
            type:'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data:JSON.stringify(data),
            success:function (res) {
                if (res.success) {
                    Messenger().post({
                        message:"保存成功",
                        type:"info"
                    });
                } else {
                    Messenger().post({
                        message: res.message,
                        type: 'danger'
                    });
                }
            },
            error: function (res) {
                Messenger().post({
                    message: '保存失败！',
                    type: 'danger'
                });
            }
        });
    };

    //刷新事件
    $('#jcxmlist_data').on('page.dt',function() {
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$manualdata).not(jqueryMap.$content.find('[name="selectjcxmlist"]'));
        var temp = null;
        $(inputjson).each(function () {
            temp = {jcxmId: $(this).attr('id').substring(5)};
            jcxmjson.push(temp);
        });
    });

    var importExcel = function () {//导入excel模板
        stopContinueClick("#btn_daoru",jqueryMap.$content,300);
        openModal('模板导入', configMap.path + configMap.importUrl, 'import');
    };

    var jcxmSearch = function () {
        configMap.jcxmGrid.ajax.reload();
    }

    return {
        init: function (uuid,wtid) {
            configMap.uuid = uuid;
            configMap.wtid = wtid;
            setJqueryMap(uuid);
            var tabid = $('#jcxm' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, jcxmlist);

            initJcxmGrid();
            $("#addQYWT",jqueryMap.$content).off('click').on('click',function (){
                addQYWT();
            });

            //查询
            $("#jcxmSearch",jqueryMap.$content).off('click').on('click',function (){
                jcxmSearch();
            });
            //导入
            jqueryMap.$content.find("#btn_daoru").off('click').on('click',function () {
                importExcel();
            })
            //重置
            $("#reset",jqueryMap.$content).off('click').on('click',function (){
                $('input',jqueryMap.$content).val('');
                $('select',jqueryMap.$content).val('');
                jcxmSearch();
            });

            $('input[name="selectjcxmlist"]',jqueryMap.$content).change(function () {
                var el = $(this);
                selectAll(el.is(':checked'));
            });


            //获取产品大类名称
            getCpmc("001");

            //获取亚类名称
            getCpmc("002");

            //获取次亚类名称
            getCpmc("003");

            //获取细类名称
            getCpmc("004");

            $('#saveYpJcxm',jqueryMap.$content).off('click').on('click',function (){
                saveYpJcxm();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        },
        reload: function () {
            jcxmSearch();
        }
    };
}();
//@ sourceURL=contractlist.js
	
	