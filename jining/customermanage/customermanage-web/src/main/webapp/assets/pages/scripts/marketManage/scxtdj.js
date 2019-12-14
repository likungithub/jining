var yoglListcydxxgl = function () {
    var configMap = {
        path:'',
        uuid:'',
        wx:'',
        dataUrl: "customermanage/scxtgl/selectdrrz",
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
    var initGridscxtdj = $('#scxtdjfeiqiu').DataTable({
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
                    return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contracteditSC" title="查看出样详情"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>'
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
            var selectscxtdjContainer = $("#selectscxtdj");//查询
            var resetscxtdjContainer = $("#resetscxtdj");//重置
            var daoruContainer=$("#btn_drscxtdj");//导入
            var updateContainer = $("#btn_daochuscbg");//导出
            var editContainer = $("#scxtdjfeiqiu").find('[name="contracteditSC"]');

            if(selectscxtdjContainer.length > 0){
                selectscxtdjContainer.off('click').on('click', findBtn);
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
            if(resetscxtdjContainer.length > 0){
                resetscxtdjContainer.off('click').on('click',resetscxtdj);
            };
        }
    });
    var selectAll = function(){
        //显示模态框（查看导入Excel信息）
        
        $("#myModal3").modal({show:true});
        var d = $(this);
        var Row = d.parents('tr')[0];
        var Data = $("#scxtdjfeiqiu").dataTable().fnGetData(Row);
        var logid = Data.id;
        $('#selectExcelSc', $('#myModal3')).DataTable({
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
                "url": "customermanage/scxtgl/selectExcelSc?logid="+logid,
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
        initGridscxtdj.ajax.reload();
    }
    /*重置*/
    var resetscxtdj = function (){
        $("input").val("")
    }
    /*导出*/
    var updatecyd = function () {
        var logid=[]//定义数组接收受控编号

        $("input[name='cydche']:checked").each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            logid.push($(this).val());//将选中的值添加到数组ids中
        });

        if(logid.length>0){
            window.location.href="/customermanage/cydxxgl/cydDc?logid="+logid;
            /*POBrowser.openWindowModeless('/customermanage/cydxxgl/cydDc?logid='+logid, 'width=1200px;height=800px;');*/
        }else{
            Messenger().post({
                message:'请选择一条导出数据！',
                type:'error'
            })
            return;
        }
    }
    //导入excel
    var daoru=function () {
        openModal("导入Execl表格","/customermanage/marketManage/importscxtdjExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                    initGridscxtdj.clear().draw();
                    initGridscxtdj.ajax.reload();
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