var cyrwList = function() {
    'use strict';

    var prefix = 'jcgl';

    // 全局属性参数
    var configMap = {
        dataUrl: 'systemmanager/rwgl/getRwAll',
        del_dataUrl: '/'+prefix+'/delete',
        edit_Url:'/xmgl/edit1.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        cyrwListGrid: null,
        uuid:'',
        lx:'',
        editPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="bianji" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        fenpeiBtn_html:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="btn btn-xs default" data-type="fenpei" data-toggle="tooltip" title="分配" name="fenpei"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html_disabled: '<a disabled="disabled" href="javascript:;" class="btn btn-xs default color666"  data-toggle="tooltip" title="删除"><i style="color:#666;" class="icon iconfont icon-shanchu3 color666  iconFontSize"></i></a>',
    };


    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $fenpei:null
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
        jqueryMap.$blockTarget = $('body');
    };

    var strArr=[];

    function delnull(d){
        if(d==undefined){
            return '';
        }
        if(d=='null'){
            return '';
        }
       return d;
    }

    /**
     * 编辑抽样任务
     */
    var bianji = function () {
        var el = $(this);
        var rowIndex = configMap.cyrwListGrid.cell(el.parent()).index().row;
        var id = configMap.cyrwListGrid.row(rowIndex).data().id;
        openModal1("编辑抽样任务", configMap.path + configMap.edit_Url + "?id=" + encodeURI(id), 'bianji');
    }

    var initcyrwListGrid = function() {
        configMap.cyrwListGrid = $('#'+configMap.uuid+'ManagerList_m', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function(data) {
                    var ypmc = $("#ypmc").val();
                    data.searchText1=ypmc;
                    data.rwzt="004";
                    data.rwType=null;
                    data.wtType=null;
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data+ '"/>';
                    }
                },
                {
                    class:"text-center",
                    "render": function (data, type, row) {
                        return configMap.editPageUrl;//+""+ configMap.fenpeiBtn_html;
                    }
                },
                {
                    class:"text-center",
                    "data": "wtdwmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "wtType",
                    render:function(d,t,r){
                        d=delnull(d);
                        if (d == "001") {
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >政府委托</span>';
                        } else {
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >企业委托</span>';
                        }
                    }
                },
                {
                    class:"text-center",
                    "data": "blzt",
                    render:function(d,t,r){
                        d=delnull(d);
                        if (d == "001") {
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >已完成</span>';
                        } else if(d == '002'){
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >未分配</span>';
                        }else{
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >已分配</span>';
                        }
                    }
                },
          /*      {
                    "data": "htmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" TITLE='+d+' >'+d+'</span>';
                    }
                },*/
                {
                    class:"text-center",
                    "data":"ggxh",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"ypdj",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"sczdz",
                    "render":function (d,t,r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
   /*             {
                    class:"text-center",
                    "data":"jclbdm",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },*/
                {
                    class:"text-center",
                    "data":"ypsl",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
                // {
                //     class:"text-center",
                //     "data":"rq",
                //     "render":function (d,t,r) {
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                //     }
                // },
                {
                    class:"text-center",
                    "data":"ypbm",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"bzq",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
      /*          {
                  class:"text-center",
                    "data":"baoz",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },*/
                {
                    class:"text-center",
                    "data":"ypzt",
                    "render":function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"ypbctj",
                    "render":function (d,t,r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title='+d+'>'+d+'</span>';
                    }
                },
               /* {
                    "data": "sfmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "csmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },*/
                ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function() { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var editContainer = $('[data-type="bianji"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(editContainer.length > 0){
                    editContainer.off('click').on('click',bianji);
                }
            }
        });
    };

    var openModal1 = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit2') { //选择人员
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    var strArr1=[],strArr2=[];
                    $('#alreadyPer li','#allotStaffList_m').each(function(){
                        strArr1.push($(this).attr('zydm'));
                    });
                    console.log(strArr1);
                    var str2 = strArr1.join(',');
                    console.log(str2);

                    var data = {};
                    data.zydm=str2;
                    data.lx=configMap.lx;
                    //获取选中的ID

                    var str1 = strArr.join(',');
                    data.id=str1;

                    $.ajax({
                        data:data,
                        url: '/customermanage/'+prefix+'/saveZxry?type=cyrw',
                        type: 'POST',
                        success: function(result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (result.success) {
                                configMap.cyrwListGrid.ajax.reload();
                                Messenger().post("分配成功!");
                                //分配成功后改变状
                               /* alert(strArr)*/
                             $.ajax({
                                 url:"systemmanager/rwgl/updateblzt",
                                 type:"post",
                                 traditional: "true",
                                 data:{"idlist":strArr},
                                 success:function () {
                                    /* alert("状态已更改")*/
                                     strArr.length=0;
                                 }
                             });
                            } else {
                                Messenger().post({
                                    message:result.message,
                                    type: 'error'
                                });
                                strArr.length=0;
                            }
                        },
                        error: function() {
                            App.unblockUI(jqueryMap.$blockTarget);
                        }
                    });

                }
            };
        }
        if (type === 'bianji') { //编辑任务
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {

                    cyrwForm.saveCYRW(function (res) {
                        if (res) {
                            jqueryMap.$commonproblemDialog.modal('hide');
                            //configMap.listGrid.ajax.reload();
                        } else {
                            jqueryMap.$commonproblemDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };
            dialogButtons.success1 = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>提交',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    cyrwForm.TiJiao();
                    cyrwForm.saveCYRW(function (res) {
                        if (res) {
                            jqueryMap.$commonproblemDialog.modal('hide');
                            configMap.cyrwListGrid.ajax.reload();
                        } else {
                            jqueryMap.$commonproblemDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'allotTask_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    
    return {
        init: function(uuid) {
            configMap.uuid=uuid;
            setJqueryMap();
            initcyrwListGrid();
            $('#searchTerm-m' + uuid, jqueryMap.$container).on('click', function () {
                configMap.cyrwListGrid.ajax.reload();
            });

            $('[name=cyrw_checkbox]',jqueryMap.$container).on('click',function () {
                if($("[name=cyrw_checkbox]",jqueryMap.$container).prop("checked")){
                    //选中
                    $("[name=checkbox_checkbox]",jqueryMap.$container).prop("checked",true);
                }else{
                    $("[name=checkbox_checkbox]",jqueryMap.$container).prop("checked",false);
                }
            });
        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();