
var  htcx_chakanlist = function () {
// 全局属性参数
    var configMap = {
        wtid: '',
        path:"",
        htcxGrid:null,
        ypcbGrid: null,
        chakanUrl:"/htcx/findYp",
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $ManageDataTable: null,
        $ManageDialog: null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#htcx_chankan' + uuid);
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = $('#htcx_chakan_table', jqueryMap.$container);
    };
    var initGrid=function(){
        configMap.htcxGrid= jqueryMap.$ManageDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "ajax": {
                "url": "customermanage/zfwt/PTywtAll",
                "dataSrc": "aaData",
                "data": function (data) {
                   // data.wtid = $("#wtbhcx"+configMap.uuid).val();
                },
            },
            "columns": [
                {
                    "data": "ID",
                    "sWidth": "20px",
                    "render": function (data) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '" id="jcxm_' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "WTID",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "DWMC",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "SYRY",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    data: "SYRQ",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container).tooltip();

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                /*模态框数据回显*/
                /*分包保存按钮*/
                var updateContainer = $('#ypcb_bc');
                updateContainer.off('click').on('click', function () {
                    
                        var ids =[];
                        var Check = $("table input[type=checkbox]:checked");//在table中找input下类型为checkbox属性为选中状态的数据
                        Check.each(function () {//遍历
                            var id = $(this).attr('id').substring(5);
                            ids.push(id);
                        })
                        console.log(ids);
                        if (Check.length != 1){
                            Messenger().post({
                                message: "请选择一条委托单！",
                                type: 'error',
                                id:"ordermessenger"
                            });
                            return ;
                        }
                        $.ajax({
                            url:"customermanage/zfwt/wtRepeatDisplay",
                            type:"POST",
                            contentType: 'application/json; charset=UTF-8',
                            dataType: 'JSON',
                            data:JSON.stringify(ids),
                            traditional: true,
                            success:function (data) {
                                console.log(data);
                                callBack(data);
                            }
                        })
                        $("#htcx_chankan"+configMap.uuid).modal('hide');
                        //configMap.ypcbGrid.ajax.reload();
                    })
            }
        });
    }
    //数据回显
      var callBack = function (data) {
          var obj = eval(data);

          $("#weituoid").val(obj.wtid);
          $("#songjiandanwei").val(obj.dwmc);
          $("#customerPhone").val(obj.lxdh);
          $("#postalCode").val(obj.yzbm);

          $("#customerProvince").val(obj.sfmc);
          $("#customerZone").val(obj.csmc);
          $("#customerCity").val(obj.xjmc);

          $("#customerStreet").val(obj.xxdz);
          $("#weituodanwei").val(obj.wtdw);
          $("#jianyanleibie").val(obj.jylb);

          $("#chanpinleibie").val(obj.cplb);
          $("#inspectionSubcontract").val(obj.jyfb);
          $("#beizhu").val(obj.bz);

          $("#baogaojiaofufangshi").val(obj.bgjffs);
          $("#songyangrenyuan").val(obj.syry);
          $("#songyangriqi").val(obj.syrq);
      }

    return {
        init:function (uuid) {
            setJqueryMap(uuid);
            configMap.wtid=null;
            initGrid();
        },
        setPath:function (path) {
            configMap.path=path;
        }

    }
}();

