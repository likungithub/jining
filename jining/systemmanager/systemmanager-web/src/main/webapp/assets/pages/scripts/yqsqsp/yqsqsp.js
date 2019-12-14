var yqyysyList1yqsbcgsp = function () {
    var configMap = {
        uuid:'',
        path:'',
        dataUrl: "systemmanager/yqsbcg/yqcgspSeach",
        nowData:"",
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $ypManageDialog: null,
        $ypManageDataTable: null,
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

    var setJqueryMap = function () {
        jqueryMap.$container = $('#yqsbcgsp-manager-container');
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
    var initGridyqsbcgsp = $('#ManagerList_yqsbcgsp').DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth":false,
        "ajax": {
            "url":configMap.dataUrl,
            "dataSrc": "aaData",
            "data":function (data) {
                data.cgmc=$('#cgmc').val();
            }
        },
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="yqsbcgspche"  value="' + data + '"/>';
                }
            },
            {
                "data":"cgmc",
                "render":function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },

            {
                "data": "pp",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "bj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "zl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "xh",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sqr",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sqbm",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sqrq",
                render:function(d,t,r){
                    d=delnull(new Date(d).Format("yyyy-MM-dd"));
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "sqzt",
                render:function(d,t,r){
                    if(d=='0'){
                        d='审批中'
                    }
                    if(d=='1'){
                        d='主管审批'
                    }
                    if(d=='3'){
                        d='分管审批'
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "yt",
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
            var seatchContainer = $("#seatchyqcgsp");//查询
            var resetyqContainer = $("#resetyqcgsp");//重置
            var spyqsq123Container = $("#spyqsp123");//审批
            var thyqsq123Container = $("#thyqsp123");//退回
            var tootip1Container = $('[data-toggle="tooltip"]');

            if (tootip1Container.length > 0) {
                tootip1Container.tooltip();
            }
            if(seatchContainer.length>0){
                seatchContainer.off("click").on("click",seatch);
            }
            if(resetyqContainer.length>0){
                resetyqContainer.off("click").on("click",reaset);
            }
            if(spyqsq123Container.length>0){
                spyqsq123Container.off("click").on("click",submityq);
            }
            if(thyqsq123Container.length>0){
                thyqsq123Container.off("click").on("click",bfsubyq);
            }
        }
    });
    /*条件查询*/
    var seatch = function () {
        initGridyqsbcgsp.ajax.reload();
    }
    /*重置条件*/
    var reaset = function () {
        $("input").val("");
    }
    /*审批操作*/
    var submityq = function () {
        $.ajax({
            url:"systemmanager/yqsbcg/spyqcgsq",
            type: 'POST',
            data:$("#yqsbcgsp_form12").serialize(),
            success:function () {
                Messenger().post({
                    message: '审批成功！'
                });
                initGridyqsbcgsp.ajax.reload();
            },
            error:function () {
                Messenger().post({
                    message: '审批失败！'
                });
            }
        });
    }
    /*退回操作*/
    var bfsubyq = function () {
        $.ajax({
            url:"systemmanager/yqsbcg/yqspth",
            type: 'POST',
            data:$("#yqsbcgsp_form12").serialize(),
            success:function () {
                Messenger().post({
                    message: '退回成功！'
                });
                initGridyqsbcgsp.ajax.reload();
            },
            error:function () {
                Messenger().post({
                    message: '退回失败！'
                });
            }
        });
    }
}();