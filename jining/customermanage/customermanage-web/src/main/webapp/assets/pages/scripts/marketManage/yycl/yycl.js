var yqyysyListyycl = function () {
    var configMap = {
        dataUrl: "customermanage/yycl/yycl",
        ypbm:"",
        nowData:"",
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$blockTarget = $('body');
    };
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
    function delnull(d){
        if(d==undefined){
            return '';
        }
        if(d=='null'){
            return '';
        }
        return d;
    }
    var initGridyycl = $('#list_datayycl').DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth":false,
        "ajax": {
            "url":configMap.dataUrl,
            "data":function (data) {
                data.htmc=$('#yyclhtmc').val();
                data.ypmc=$('#yyclypmc').val();
                data.xhyp=$('#xhyp').val();
                data.clfs=$('#yyclclfs').val();
                data.sfbz=$('#yyclsfbz').val();
                data.stardate=$('#yyclstardate').val();
                data.enddate=$('#yyclenddate').val();
            },
            "dataType":"json"
        },
        "columns": [
            {   class:"text-center",
                "data": "ypbm",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="che"  value=' + data + '>';
                }
            },
            {   class:"text-center",
                "data":"ypbm",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {   class:"text-center",
                "data": "ypbm",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {   class:"text-center",
                "data": "ypmc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {   class:"text-center",
                "data": "LRRQ",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {   class:"text-center",
                "data": "dwmc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {   class:"text-center",
                "data": "jssp",
                render:function(d,t,r){
                    if(d=='0'){
                        d='未审批'
                    }
                    if(d=='1'){
                        d='已审批'
                    }
                    if(d=='2'){
                        d='已退回'
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {   class:"text-center",
                "data": "jbrsp",
                render:function(d,t,r){
                    if(d=='0'){
                        d='未审批'
                    }
                    if(d=='1'){
                        d='已审批'
                    }
                    if(d=='2'){
                        d='已退回'
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {   class:"text-center",
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
            var findContainer = $("#yyclSearch");
            var desContainer = $("#yycldestory");
            var desTyContainer = $("#yyclTy");
            var yyclRequestContainer = $("#yyclRequest");
            var yycl_bcContainer = $("#yycl_bc");
            var yycl_xgbcContainer = $("#yycl_xgbc");
            var chakanContainer = $('[data-type="chakan"]');
            var tootipContainer = $('[data-toggle="tooltip"]');
            if (tootipContainer.length > 0) {
                tootipContainer.tooltip();
            };
            /*保存退样信息*/
            if(yycl_bcContainer.length > 0){
                yycl_bcContainer.off('click').on('click', yyclyycl_bc);
            }
            /*保存销毁申请*/
            if(yycl_xgbcContainer.length > 0){
                yycl_xgbcContainer.off('click').on('click', yyclyycl_xgbc);
            }
            if(yyclRequestContainer.length > 0){
                yyclRequestContainer.off('click').on('click', yyclRequest);
            }
            if(desTyContainer.length > 0){
                desTyContainer.off('click').on('click', desThYp);
            }
            if(desContainer.length > 0){
                desContainer.off('click').on('click', desYp);
            }
            if(findContainer.length > 0){
                findContainer.off('click').on('click', findBtn);
            }
            /*销毁报告*/
            if (chakanContainer.length>0){
                chakanContainer.off('click').on('click',function () {
                    var el = $(this);
                    var rowIndex =initGridyycl.cell(el.parent()).index().row;
                    var ypbm = initGridyycl.row(rowIndex).data().ypbm;
                    var zt = initGridyycl.row(rowIndex).data().jbrsp;
                    if (zt == '1') {
                        chakan(ypbm);
                    }else {
                        Messenger().post({
                            message:"审批未通过，不能查看申请单",
                            type: 'error'
                        });
                    }

                });
            }
        }
    });

    /*查看*/
    var chakan = function (ypbm) {
        $.ajax({
            url:"customermanage/bggl/ypbg?ypbm="+ypbm,
            type:"POST",
            success:function (data) {
                console.log(ypbm)
                POBrowser.openWindowModeless('customermanage/openword5?ypbm='+ypbm, 'width=1200px;height=800px;');
            }
        });

    }

    /*退样信息录入*/
    var yyclyycl_bc = function () {
        var data1= [{
            ypbm:configMap.ypbm,
            ajsr:$("#ajsr").val(),
            atel:$("#atel").val(),
            abz:$("#abz").val()
        }]
        var str_json = JSON.stringify(data1);
        console.log(str_json);
        $.ajax({
            type: "post",
            url: "customermanage/yycl/yycldestory",
            data:{"questionsList":str_json},
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    $("#myModalYycl").modal('hide');
                    initGridyycl.ajax.reload();
                    Messenger().post("保存成功!");
                } else {
                    Messenger().post({
                        message:result.message,
                        type: 'error'
                    });
                }
            },
            error: function() {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }
    /*保存销毁申请*/
    var yyclyycl_xgbc = function () {
        var data1= [{
            ypbm:configMap.ypbm,
            xhsj:$("#xhsj").val(),
            xhfs:$("#xhfs").val(),
            xhyy:$("#xhyy").val(),
            xhdd:$("#xhdd").val()
        }]
        var str_json = JSON.stringify(data1);
        console.log(str_json);
        $.ajax({
            type: "post",
            url: "customermanage/yycl/yyclXhsq",
            data:{"questionsList":str_json},
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    $("#myModalYycl123").modal('hide');
                    initGridyycl.ajax.reload();
                    Messenger().post("保存成功!");
                } else {
                    Messenger().post({
                        message:result.message,
                        type: 'error'
                    });
                }
            },
            error: function() {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }
    /*显示模态框*/
    var desThYp = function (){
        var dd = $("[name='che']:checked")[0];
        $("#myModalYycl").modal({show:true});
        configMap.ypbm = $(dd).val();
    }
    /*显示销毁申请模态框*/
    var yyclRequest = function(){
        var dd = $("[name='che']:checked")[0];
        $("#myModalYycl123").modal({show:true});
        configMap.ypbm = $(dd).val();
    }
    //全选
    $('.check-all-td').change(function () {
        checkAll($(this).is(':checked'), $(this).parentsUntil('table').attr("name"));
    });
    var checkAll = function (status, tableId) {
        $("table[name='yycl-tableyycl'] input[type=checkbox]").prop("checked", status);
    }
    /*条件查询*/
    var findBtn = function (){
        initGridyycl.ajax.reload();
    }
    /*销毁样品*/
    var desYp = function () {
        var dd = $("[name='che']:checked")[0];
        var sp = $(dd).parent().parent().children("td:eq(6)").text();
        console.log(sp);
        if(sp=='未审批'){
            Messenger().post("审批还未结束，无法销毁!");
            return
        }
        /*alert($("#yycl_form").serialize());*/
        var inputjson = $('[type="checkbox"]:checked');
        var temp = null;
        var cgsqjson = [];
        $(inputjson).each(function () {
            temp = {cgsq: $(this).attr("value")};
            cgsqjson.push(temp);
        });
        var data = {
            cgsq: cgsqjson
        }
        if (data.cgsq.length === 0) {
            Messenger().post({
                message: '请选择一个样品！',
                type: 'warning'
            });
        } else {
            bootbox.dialog({
                title: '提示',
                message: '确定要销毁此样品？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: $("#yycl-manager-container"),
                                boxed: true,
                                message: '已销毁'
                            });

                            $.ajax({
                                url: "/customermanage/yycl/destory",
                                type: 'POST',
                                data:$("#yycl_form").serialize(),
                                success: function (result) {
                                    App.unblockUI($("#yycl-manager-container"));
                                    if (result) {
                                        Messenger().post({
                                            message: '销毁成功！'
                                        });
                                    }
                                    initGridyycl.ajax.reload();
                                },
                                error: function () {
                                    App.unblockUI($("#yycl-manager-container"));
                                    Messenger().post({
                                        message: '销毁失败！',
                                        type: 'error'
                                    });
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
    }
}();
