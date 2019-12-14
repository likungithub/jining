var chooseJcb = function () {
    var configMap = {
        initList:null,
        ypxx:'',
        uuid:"",
    }
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#ssss' + uuid);
        // jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data'+configMap.uuid);
    };
    var initTabel = function () {
        configMap.initList = $("#chooseJcb").DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            //"destroy": true,
            "autoWidth": false,
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "ajax": {
                "url": "customermanage/jcb/getJcbInfo",
                "dataSrc": "aaData",
                "cache":false,
                "data": function (data) {
                    data.jcbname = $("#jcbname"+configMap.uuid).val();
                }
            },
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "columns": [
                {
                    "data": "jcbid",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox" id="kh_' + data + '" value="' + data + '"/>';
                    }
                },
                // {
                //     "data": "jcbid",
                //     className:"text-center",
                //     "render": function (data, type, row) {
                //         data = delnull(data);
                //         return '<span style="color:#666"> </span>';
                //     }
                // },

                {
                    "data": "jcbname",
                    className:'text-center',
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="color:#666">' + data + '</span>';
                    }
                },
                {
                    "data": "jcbdl",
                    className:'text-center',
                    "render": function (data, type, row) {
                        if (data == null) {
                            return '0';
                        }else {
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    }
                },
                {
                    "data": "ZWMC_BM",
                    className:'text-center',
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="color:#666" data-toggle="tooltip" data-placement="top" title="'+ data+'">' + data + '</span>';
                    }
                },
                {
                    "data": "jcxsl",
                    className:'text-center',
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="color:#666">' + data + '</span>';
                    }
                }
            ],
            "drawCallback":function () {
                var tootipContainer = $('[data-toggle="tooltip"]');
                // console.log(tootipContainer)
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                };
            },
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                // jQuery("td:eq(1)", nRow).html(iDisplayIndex +1);
                // return nRow;
            }
        });
    }
        //获取选中的检测包id
    var chooseJcb = function () {
        var inputjson = $('[type="checkbox"]:checked',$("#ssss"));
        var temp = null;
        jcbjson = [];
        $(inputjson).each(function () {
            var el = $(this)
           temp = configMap.initList.cell(el.parent()).index().row;
            var jcbid = configMap.initList.row(temp).data().jcbid;
            jcbjson.push(jcbid);
        });
        $.ajax({
            url:"customermanage/jcb/insertJcx?ypxx="+configMap.ypxx+"&jcbid="+jcbjson,
            type:"post",
            success:function () {
                Messenger().post("添加成功");
            }
        });
    }
    //重置
    var chongzhi = function () {
        $("#reset"+configMap.uuid).click(function () {
            $("#jcbname"+configMap.uuid).val("");
            configMap.initList.ajax.reload();
        })
    }
    return{
    init:function (ypxx,uuid) {
        configMap.uuid=uuid;
        configMap.ypxx=ypxx;

        initTabel();

        //查询
        $("#jcbSearch",jqueryMap.$content).off('click').on('click',function (){
            configMap.initList.ajax.reload();
        })
        //重置
        chongzhi();
    },
        addjcxm:function () {
            chooseJcb()
        },
        reload: function () {
            configMap.ypjsGrid.ajax.reload();
        }
    };
}();