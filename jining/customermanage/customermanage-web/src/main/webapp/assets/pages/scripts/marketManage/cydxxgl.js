var yoglListcydxxgl = function () {
    var configMap = {
        path:'',
        uuid:'',
        wx:'',
        dataUrl: "customermanage/cydxxgl/selectcyd",
        nowData:"",
        $content: null
    };
    var jqueryMap ={
        $ypManageDialog:null,
        $container: null,
        $initGridseExcel: null
    }
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
        jqueryMap.$content = $('#zfwt' + uuid);
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
    var initGridcyxxgl = $('#cyxxglfeiqiu').DataTable({
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
                data.wtbm=$('#wtbm').val();
            },

        },
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="cydche"  value="' + data + '"/>';
                }
            },
            {
                "data": "wtid",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "filename",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "lrry",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "lrrq",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data":"id",
                "render":function (data,type,row) {
                    return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="查看出样详情"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>'
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
            var cyxxglSeatchContainer = $("#selectcyxxgl");//查询
            var resetcyxxglContainer = $("#resetcyxxgl");//重置
            var daoruContainer=$("#btn_dr");//导入
            var updateContainer = $("#btn_daochu");//导出
            var editContainer = $("#cyxxglfeiqiu").find('[name="contractedit"]');

            if(cyxxglSeatchContainer.length > 0){
                cyxxglSeatchContainer.off('click').on('click', findBtn);
            }
            if(daoruContainer.length>0){
                daoruContainer.off('click').on('click',daoru);//导入
            }
            if(updateContainer.length > 0){
                updateContainer.off('click').on('click',updatecyd);
            }
            if (editContainer.length > 0){//查看导入详情
                editContainer.off('click').on('click', selectAll);
            }
            if(resetcyxxglContainer.length > 0){
                resetcyxxglContainer.off('click').on('click',resetYqsb);
            };
        }
    });
    var selectAll = function(){
        //显示模态框（查看导入Excel信息）
        
        $("#myModal2").modal({show:true});
        var d = $(this);
        var Row = d.parents('tr')[0];
        var Data = $("#cyxxglfeiqiu").dataTable().fnGetData(Row);
        var logid = Data.id;
        $('#selectExcel', $('#myModal2')).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "destroy": true,//重新初始化
            "scrollX":true,//水平滚动
            "ajax": {
                "dataSrc": "aaData",
                "url": "customermanage/cydxxgl/selectExcel?logid="+logid,
                "method": "POST"
            },
            "columns": [
                { "data":"cydbh","sWidth":"3%"	},
                { "data":"rwly","sWidth":"4%"	},
                { "data":"rwlx","sWidth":"3%"	},
                { "data":"cyrq","sWidth":"4%"	},
                { "data":"cydd","sWidth":"3%"	},
                { "data":"ypmc","sWidth":"4%"	},
                { "data":"cpzl","sWidth":"4%"	},
                { "data":"yply","sWidth":"3%"	},
                { "data":"cyfs","sWidth":"3%"	},
                { "data":"ypsx","sWidth":"3%"	},
                { "data":"yplx","sWidth":"3%"	},
                { "data":"sb","sWidth":"3%"	},
                { "data":"ypph","sWidth":"3%"	},
                { "data":"scrq","sWidth":"3%"	},
                { "data":"bzq","sWidth":"3%"	},
                { "data":"zxbz","sWidth":"3%"	},
                { "data":"ggxh","sWidth":"3%"	},
                { "data":"zldj","sWidth":"3%"	},
                { "data":"scxkzbh","sWidth":"3%"	},
                { "data":"dj","sWidth":"3%"	},
                { "data":"sfck","sWidth":"3%"	},
                { "data":"cyjs","sWidth":"3%"	},
                { "data":"cysl","sWidth":"3%"	},
                { "data":"cysldw","sWidth":"3%"	},
                { "data":"bysl","sWidth":"3%"	},
                { "data":"bzfl","sWidth":"3%"	},
                { "data":"ypxt","sWidth":"3%"	},
                { "data":"cysypdcctj","sWidth":"3%"	},
                { "data":"cyypbz","sWidth":"3%"	},
                { "data":"jsydz","sWidth":"3%"	},
                { "data":"jsypjzrq","sWidth":"3%"	},
                { "data":"bcydwmc","sWidth":"3%"	},
                { "data":"qylx","sWidth":"3%"	},
                { "data":"bcydwdz","sWidth":"3%"	},
                { "data":"bcydwfrdb","sWidth":"3%"	},
                { "data":"bcydwnxse","sWidth":"3%"	},
                { "data":"bcydwyyzz","sWidth":"3%"	},
                { "data":"bcydwlxr"	,"sWidth":"3%"},
                { "data":"bcydwdh"	,"sWidth":"3%"},
                { "data":"bcydwcz"	,"sWidth":"3%"},
                { "data":"bcydwyb"	,"sWidth":"3%"},
                { "data":"bssczmc","sWidth":"3%"	},
                { "data":"bssczdz","sWidth":"3%"	},
                { "data":"bssczlxr","sWidth":"3%"	},
                { "data":"bssczlxdh","sWidth":"3%"	},
                { "data":"cydwmc"	,"sWidth":"3%"},
                { "data":"cydwdz","sWidth":"3%"	},
                { "data":"cydwlxr"	,"sWidth":"3%"},
                { "data":"cydwlxdh","sWidth":"3%"	},
                { "data":"cydwcz","sWidth":"3%"	},
                { "data":"cydwyb","sWidth":"3%"	},
                { "data":"cyr","sWidth":"3%"	},
                { "data":"bz","sWidth":"3%"	},
                { "data":"cyhj","sWidth":"3%"	},
                { "data":"bcydwqygm","sWidth":"3%"	},
                { "data":"bcydwssqy","sWidth":"3%"	},
                { "data":"cyfw","sWidth":"3%"	},
                { "data":"spflid","sWidth":"3%"	}
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            }
        })
    }
    /*全选*/
    $('input[name="cydck"]').off('click').on('click',function () {
        if(this.checked){
            $('input[name="cydche"]').attr("checked","checked");
        }else{
            $('input[name="cydche"]').attr("checked",null);
        }
    });
    /*条件查询*/
    var findBtn = function (){
        initGridcyxxgl.ajax.reload();
    }
    /*重置*/
    var resetYqsb = function (){
        $("input").val("")
    }
    /*导出*/
    var updatecyd = function () {
        var cydid=[]//定义数组接收受控编号
        $("input[name='cydche']:checked",jqueryMap.$container).each(function () {
            cydid.push($(this).val())
        })
        if(cydid.length>0){
            window.location.href="/customermanage/cydxxgl/cydDc?skbhs="+cydid;
        }else{
            Messenger().post({
                message:'请选择导出数据',
                type:'error'
            })
            return;
        }
    }
    //导入excel
    var daoru=function () {
        openModal("导入Execl表格","/customermanage/marketManage/importcydExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                    initGridcyxxgl.clear().draw();
                    initGridcyxxgl.ajax.reload();
                }else {
                    jqueryMap.$ypManageDialog.modal('hide');
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
                size:"large",
                buttons: dialogButtons
            });
        });
    };


    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
        },
        setPath:function (path) {
            configMap.path = path;
        },
    }
}();