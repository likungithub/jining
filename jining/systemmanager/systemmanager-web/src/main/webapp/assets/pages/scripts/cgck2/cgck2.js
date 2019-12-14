var yqcgglList = function () {
    var configMap = {
        dataUrl: "systemmanager/cgck2/queryList"
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null
    };
    //赋值
    var setJqueryMap = function() {
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

    var initGrid = $('#cgck2_ManagerList_m').DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth":false,
        "ajax": {
            "dataSrc": "aaData",
            "url":configMap.dataUrl,
            "method":"POST",
            "data":function (data) {
                data.hcmc=$("#hcmc").val();
                /*data.startDate=$("#cgck2_startDate").val();
                data.endDate=$("cgck2_#endDate").val();*/
            }
        },

        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="cgck2checkbox"  value="' + data + '"/>';
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
                "data": "gg",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "ph",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "cdjb",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "lb",
                render:function(d,t,r){
                    if(d=='1'){
                        d="一般耗材"
                    }
                    if(d=='2'){
                        d="化学品"
                    }
                    if(d=='3'){
                        d="易制毒"
                    }
                    if(d=='4'){
                        d="标准物质"
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "dw",
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
                "data": "sqsl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "spr",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },

            {
                "data": "sqrq",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "state",
                "render": function (data, type, row) {
                    if(data=='006'){
                        data="审批通过";
                    };
                    if(data=='007'){
                        data="审批通过";
                    };
                    if(data=='008'){
                        data="已出库";
                    }
                    return data;
                }
            },
            {
                "data": "bz",
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
            cxContainer = $("#cgck2_cx");//查询
            ckContainer = $("#cgck2_chuku");//出库
            tootipContainer = $('[data-toggle="tooltip"]');
            // ckContainer =$(".yqcggl_ck");//查看

            if( cxContainer.length > 0){
                cxContainer.off('click').on('click', cxBtn);
            };
            if (tootipContainer.length > 0) {
                tootipContainer.tooltip();
            };
            if( ckContainer.length > 0){
                ckContainer.off('click').on('click', ckBtn);
            };

            // if(ckContainer.length>0){//查看
            //     ckContainer.off('click').on('click',ckBtn);
            // }
        }
    });


    //查询按钮
    var cxBtn = function (){
        initGrid.ajax.reload();
    };

    // var zt = '008'



    //出库操作
    var ckBtn = function (){
        /*选中的多选框*/
        var dd = $("[name='cgck2checkbox']:checked")[0];
        console.log($(dd).val());
        var data = [
            {hcmc: $(dd).parent().parent().children("td:eq(1)").text().toString(),
                gg:$(dd).parent().parent().children("td:eq(2)").text().toString(),
                sl:$(dd).parent().parent().children("td:eq(8)").text().toString(),
                id:$(dd).val(),
                hclx:$(dd).parent().parent().children("td:eq(5)").text().toString()
            }
        ];
        var flag = false;
        var sqzt = $(dd).parent().parent().children("td:eq(11)").text();
        console.log(sqzt)
        if(sqzt!='审批通过'){ //通过
            flag = true;
        }
        if(flag){
            Messenger().post("不能重复提交出库!");
            return;
        }
        var str_json = JSON.stringify(data);
        console.log(str_json);
        $.ajax({
            url:"systemmanager/cgck2/chuku",
            type: 'POST',
            data :{"questionsList":str_json},
            success:function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                  //  configMap.listGrid.ajax.reload();
                    Messenger().post("出库成功!");
                } else {
                    Messenger().post({
                        message:result.message,
                        type: 'error'
                    });
                }
                initGrid.ajax.reload();
            },
            error:function () {
                App.unblockUI(jqueryMap.$blockTarget);
                initGrid.ajax.reload();
            }
        });


    };



    //多选框
    $('[name=rwfp_checkbox]',initGrid).on('click',function () {
        if($("[name=rwfp_checkbox]",initGrid).prop("checked")){
            //选中
            $("[name=checkbox_checkbox]",initGrid).prop("checked",true);
        }else{
            $("[name=checkbox_checkbox]",initGrid).prop("checked",false);
        }
    });





    <!-- 重置查询条件-->
    $("#cgck2_cz").click(function () {
        $("input").val("");
        initGrid.ajax.reload();
    });

    laydate.render({
        elem: "#cgck2_startDate" //指定元素
    });
    laydate.render({
        elem: "#cgck2_endDate" //指定元素
    });



    // return{
    // };


}();