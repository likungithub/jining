var bgmodel = function () {
    var congfig={
        bgDataTable:null,
        uuid:""
    };
    var jqueryMap = {
        $contractauditDialog:null
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
    var intitTable = function () {
        congfig.bgDataTable = $("#"+congfig.uuid+"ManagerList_m").DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": "customermanage/bgmodel/getAll",
                "dataSrc": "aaData",
                "method":"POST",
                "data": function(data) {
                    data.BGNAME= $("#mdname"+congfig.uuid).val();
                }
            },
            "columns": [

                {
                    "data": "ID",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '" id="jcxm_' + data + '"/>';
                    }
                },
                {
                    "data":"BGNAME",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';

                }
                },
                {
                    "data": "BBH",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "NAME",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "SCRQ",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "CCDZ",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "ID",
                    render:function(d,t,r){
                        d=delnull(d);
                        return  '<a href="javascript:;" class="btn btn-xs default" data-type="chakan" data-toggle="tooltip" title="查看样品流转单"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>'
                    }
                },
          /*      {
                    "data": "ID",
                    render:function(d,t,r){
                        d=delnull(d);
                        return  '<a href="javascript:;" class="btn btn-xs default" data-type="chakan1" data-toggle="tooltip" title="查看样品流转单"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>'
                    }
                }*/],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function() { // 数据加载完成后执行
                var chakanContainer = $('[data-type="chakan"]', jqueryMap.$container);
                console.log(chakanContainer.length)
                if(chakanContainer.length > 0){
                    chakanContainer.off('click').on('click',function () {
                        var el = $(this);
                        console.log(congfig.bgDataTable)
                        var rowIndex = congfig.bgDataTable.cell(el.parent()).index().row;
                        var ID = congfig.bgDataTable.row(rowIndex).data().ID;
                        chank(ID);
                    });
                }
            }
        });
    }
    //查看模板
    var chank = function (ID) {
        POBrowser.openWindowModeless('customermanage/openBgmodel/openbgmpdel?ID='+ID, 'width=1200px;height=800px;');
    }
    //新增模板
    var addBgModel = function () {
        $("#addbgmodel"+congfig.uuid).click(function () {
            openModal("新增报告模板","customermanage/bggl/bgmbdz/importBgmodel.jsp");
        })
    }
    //查询
    var chaxunBgmodel = function () {
        $("#chaxun"+congfig.uuid).click(function () {
            congfig.bgDataTable.ajax.reload();
        })

    }
    //删除模板
    var deleteBgModel = function () {
        $("#scbgmodel"+congfig.uuid).click(function () {
            var inputjson = $('[name="checkbox_checkbox"]:checked');
            var temp = null;
            var jcxmjson = [];
            $(inputjson).each(function () {
                temp = {jcxmId: $(this).attr('id').substring(5)};
                jcxmjson.push(temp);
            });
            var data = {
                jcxmId:jcxmjson
            }
            if (jcxmjson.length<=0){
                Messenger().post({
                    message: "请至少选择一个模板！",
                    type: 'error',
                    id:"ordermessenger"
                });
                return ;
            }
            $.ajax({
                url:"customermanage/bgmodel/scbgfmodel",
                type:'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                data:JSON.stringify(data),
                success:function (res) {
                    congfig.bgDataTable.ajax.reload();
                }
            });

        })
    }
    var openModal = function (title, url) {
        var dialogButtons = {};

        dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    importBgmodel.submit();
                    congfig.bgDataTable.ajax.reload();
                    return false;
                }
            };
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
    return {
        init:function (uuid) {
            congfig.uuid=uuid;
            //初始化页面数据
            intitTable();
            //新增模板
            addBgModel();
            //删除模板
            deleteBgModel();
            //查询
            chaxunBgmodel();
        },
        yincang:function () {
            jqueryMap.$contractauditDialog.modal('hide');
        }
    }
}();