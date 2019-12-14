var yqyysyListyycl12 = function () {
    var configMap = {
        dataUrl: "customermanage/yycl/spLc",
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
    var initGridyycl1 = $('#list_datayycl12').DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth":false,
        "ajax": {
            "url":configMap.dataUrl,
            "method":"post",
            "data":function (data) {
                data.htmc=$('#yyclhtmc').val();
                data.ypmc=$('#yyclypmc').val();
                data.clfs=$('#yyclclfs1').val();
                data.sfbz=$('#yyclsfbz1').val();
                // data.stardate=$('#yyclstardate').val();
                // data.enddate=$('#yyclenddate').val();
            }
        },
        "columns": [
            {   class:"text-center",
                "data": "ypbm",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="che"  value=' + data + '>';
                }
            },
            {   class:"text-center",
                "data": "ypbm",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }

            },
            {   class:"text-center",
                "data": "ypmc",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }

            },
            {   class:"text-center",
                "data": "dysj",
                "render": function (data) {
                    if (data != null) {
                        return new Date(data).Format("yyyy-MM-dd");
                    } else {
                        return '';
                    }
                }
            },
            {   class:"text-center",
                "data": "dwmc",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }

            },
            {   class:"text-center",
                "data": "yplx",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
                    }
                }
            },
            {   class:"text-center",
                "data": "bzxx",
                "render": function (data) {
                    if (data != null) {
                        return data;
                    } else {
                        return '';
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
            var findContainer = $("#yyclSearch");
            var desTyContainer = $("#yyclTy1");
            var tuihuiContainer = $("#yyclthcl1");

            if(tuihuiContainer.length > 0){
                tuihuiContainer.off('click').on('click', thclYpsp);
            }
            if(desTyContainer.length > 0){
                desTyContainer.off('click').on('click', desYpsp);
            }
            if(findContainer.length > 0){
                findContainer.off('click').on('click', findBtn);
            }
        }
    });

    //全选
    $('.check-all-td').change(function () {
        checkAll($(this).is(':checked'), $(this).parentsUntil('table').attr("name"));
    });
    var checkAll = function (status, tableId) {
        $("table[name='yycl-tableyycl'] input[type=checkbox]").prop("checked", status);
    }
    /*条件查询*/
    var findBtn = function (){
        initGridyycl1.ajax.reload();
    }
    /*审批操作*/
    var desYpsp = function () {
        var dd = $("[name='che']:checked")[0];
        var data = {
            ypbm:$(dd).val()
        }
        var str_json = JSON.stringify(data);
        // alert(str_json);
        console.log(str_json)
        $.ajax({
            url: "/customermanage/yycl/spJssp",
            type: 'POST',
            data:{"stry":str_json},
            success: function (result) {
                initGridyycl1.ajax.reload();
            },
            error: function () {
                initGridyycl1.ajax.reload();
            }
        });
    }
    /*退回操作*/
    var thclYpsp = function () {
        var dd = $("[name='che']:checked")[0];
        var data = {
            ypbm:$(dd).val()
        }
        var str_json1 = JSON.stringify(data);
        // alert(str_json);
        console.log(str_json1)
        $.ajax({
            url: "/customermanage/yycl/spJsthcl",
            type: 'POST',
            data:{"stary":str_json1},
            success: function (result) {
                initGridyycl1.ajax.reload();
            },
            error: function () {
                initGridyycl1.ajax.reload();
            }
        });
    }
}();
