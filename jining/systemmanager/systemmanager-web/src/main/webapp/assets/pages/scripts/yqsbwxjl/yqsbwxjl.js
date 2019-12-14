var yqyysyListyqsbtzwxjl = function () {
    var configMap = {
        path:'',
        uuid:'',
        wx:'',
        dataUrl: "systemmanager/yqsbwxbf/yqsbwxbfWxSeatch",
        nowData:"",
    };
    var jqueryMap ={
        $ypManageDialog:null,
        $container: null,
    }
    var setJqueryMap = function () {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
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
    var initGridyqsbwxbfWx = $('#YqsbtzWxjl').DataTable({
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
                data.sbmc=$('#sbmc').val();
                data.skbh=$('#skbh').val();
            },

        },
        "columns": [
            {
                "data": "skbh",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="yqtzwxbfWx"  value="' + data + '"/>';
                }
            },
            {
                "data": "sbmc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "ggxh",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sccs",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sbyz",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sbzk",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "wxyy",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "sqzt",
                render:function(d,t,r){
                    if(d=='0'){
                        d="设备完好"
                    }
                    if(d=='1'){
                        d="申请维修"
                    }
                    if(d=='2'){
                        d="申请报废"
                    }
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
    var findBtnwb = function (){
        initGridyqsbwxbfWx.ajax.reload();
    }
    /*重置*/
    var resetYqsbwb = function (){
        $("input").val("")
    }
    /*维修记录*/
    var updateYqsbWx = function () {
        var d = []
        jqueryMap.$container.find('[name=yqtzwxbfWx]:checked').each(function () {
            var el = $(this);
            var sqzt = $(el).parent().parent().children("td:eq(7)").text();
            d.push(sqzt);
        })
        if(d.length==0){
            Messenger().post({
                message:'请选择数据',
                type:'error'
            })
            return
        }else {
            $.ajax({
                url: '/systemmanager/yqsbwxbf/yqsbBfwxjl',
                type: 'POST',
                data:$("#"+configMap.uuid+"yqsbtzform_delete").serialize(),
                success:function () {
                    Messenger().post({
                        message:'维修已记录',
                        type:'info'
                    })
                    initGridyqsbwxbfWx.ajax.reload();
                },
                error:function () {
                    Messenger().post({
                        message:'维修未记录',
                        type:'error'
                    })
                }
            })
        }
    }
    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            $("#"+configMap.uuid+"yqsbtzSeatch",jqueryMap.$container).off('click').on('click',function () {//新增
                findBtnwb();
            });
            $("#"+configMap.uuid+"resetYqsbtz",jqueryMap.$container).off('click').on('click',function () {//新增
                resetYqsbwb();
            });
            $("#"+configMap.uuid+"yqsbtzWxjl",jqueryMap.$container).off('click').on('click',function () {//新增
                updateYqsbWx();
            });
        },
        setPath:function (path) {
            configMap.path = path;
        },
    }
}();