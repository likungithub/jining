var list = function() {
    'use strict';
    var prefix = 'bggl';
    // 全局属性参数
    var configMap = {
        dataUrl: '/'+prefix+'/querylist',
        del_dataUrl: '/'+prefix+'/delete',
        query_ryUrl: '/'+prefix+'QueryRy',
        edit_Url:'/'+prefix+'/bgbz/edit.jsp',
        doc_url:'',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        edit_Urls: '/jcgl/ypjc/editbgbz.jsp',
        listGrid: null,
        uuid:'',
        lx:'',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="查看报告"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',

    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $wdsdJbxxDiv: null,
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$wdsdJbxxDiv = $('#wdsd');
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$wdsdForm = $('#addwdsd', jqueryMap.$wdsdJbxxDiv);
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

    var initlistGrid = function() {
        configMap.listGrid = $('#'+configMap.uuid+'ManagerList_m', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method":"POST",
                "data": function(data) {
                    var ypmc =  $('input[name="ypmc"]', jqueryMap.$container).val();
                    data.ypmc=ypmc;
                    data.ypbm= $('input[name="ypbm"]', jqueryMap.$container).val();
                    data.wtdw= $('input[name="wtdw"]', jqueryMap.$container).val();
                    console.log($("#bgzt", jqueryMap.$content).val());
                    data.bgzt= $("#bgzt", jqueryMap.$content).val();
                    data.htmc=$("#htmc").val();
                    data.startDate=$('input[name="startDate"]', jqueryMap.$container).val();
                    data.endDate=$('input[name="endDate"]', jqueryMap.$container).val();
                    console.log($('input[name="startDate"]', jqueryMap.$container).val());
                    console.log($('input[name="endDate"]', jqueryMap.$container).val());
                }
            },
            "columns": [
                {
                    class: "text-center",
                    "data": "ID",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    className: "text-center",
                    "render": function (data, type, row) {
                        return  configMap.editBtn_html;
                    }
                },
                {
                    class: "text-center",
                    "sWidth": "0px",
                    "data": "ypid",
                    //"visible":false,
                    "render": function (data, type, row) {
                        return '<input type="hidden" name="ypid"  value="' + data + '"/>';
                    }
                },

                {
                    class: "text-center",
                    "data": "YPBM",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "cydbm",
                    render: function (d,t,r) {
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "YPMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                // {
                //     class: "text-center",
                //     "data": "JCXM",
                //     render:function(d,t,r){
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                //     }
                // },

                {
                    class: "text-center",
                    "data": "wtdw",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "readonly",
                    render:function(d,t,r){

                        if(d=='1'){
                            d = "已提交";
                        } else {
                            d = "未提交";
                        }
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "BGLJ",
                    render:function(d,t,r){
                        if(d && d != undefined && d.length > 0){
                            d = "已生成";
                        } else {
                            d = "未生成";
                        }
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "BGBZZT",
                    render:function(d,t,r){
                        d=delnull(d);
                        //000未分配，001已分配，002，检测通过，003检测未通过
                        if(d=='000'){
                            d = "未分配";
                            return '<span style="display: inline-block;cursor: pointer;color: black" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }
                        if(d=='001'){
                            d = "未提交";
                            return '<span style="display: inline-block;cursor: pointer;color: #b94a48" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }
                        if(d=='002'){
                            d = "已提交";
                            return '<span style="display: inline-block;cursor: pointer;color: blue" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }
                        if(d=='003'){
                            d = "未通过";
                            return '<span style="display: inline-block;cursor: pointer;color: red" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }
                        if(d=='004'){
                            d = "已退回";
                            return '<span style="display: inline-block;cursor: pointer;color: brown" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }

                        return '<span style="display: inline-block;cursor: pointer;color: black" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data":"ypid","visible": false
                }
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function() { // 数据加载完成后执行
                var chakanContainer = jqueryMap.$container.find('[name="contractedit"]');
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var findContainer = $("#searchTerm1");

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if(chakanContainer.length > 0){
                    chakanContainer.off('click').on('click', bgchakan);
                }

                if(findContainer.length>0){
                    findContainer.off('click').on('click',findBtn);
                }
            }
        });
    }

    var bgchakan  = function (){
        stopContinueClick(this, 300);
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID;
        var ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
        var readonly = configMap.listGrid.row(rowIndex).data().readonly;
        var BGLJ = configMap.listGrid.row(rowIndex).data().BGLJ;
        if(BGLJ==null ||BGLJ=="" || BGLJ=="null" || BGLJ.length==0)
        {
            Messenger().post({
                message: '报告尚未生成,请先生成报告！',
                type: 'warning'
            });
            return;
        }
        if (readonly != '1') {
            Messenger().post({
                message: '委托信息尚未提交，不能生成报告！',
                type: 'warning'
            });
        } else {
            // POBrowser.openWindowModeless('customermanage/bggl/bgbzScbg?wtid=' + id + '&ypbm=' + ypbm + '&cd=0&ifdy=0&ifzb=1', 'width=1200px;height=800px;');
            POBrowser.openWindowModeless('customermanage/bggl/pldywtpdfbg?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=1', 'width=1200px;height=800px;');
            return;
        }
    };

    //查询
    var findBtn=function () {
        configMap.listGrid.ajax.reload();
    }

    ////////////////////////////////////提交要打开模板页功能
    var openModalTj = function (title, url, type, func) {
        var dialogButtons = {
        };
        if (type == 'fp'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn btn-default borderRadius4 color666'
        }
        $.get(url, function (html) {
            jqueryMap.$Dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    //报告编制 提交 固定传入 zt=ss002
    function bgbztj(zt){
        configMap.lx='0';
        var data = {};
        data.lx = configMap.lx;
        data.zt = zt;

        var strArr = [];
        var flag = false;
        var ypbms = [];
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            var bgpzzt = configMap.listGrid.row(rowIndex).data().BGPZZT;
            ypbms.push(configMap.listGrid.row(rowIndex).data().YPBM);
            if(bgpzzt=='002'){
                flag = true;//直接退出
                return;
            }
            strArr.push(id);
        });

        if(flag)
        {
            Messenger().post({
                message: "报告已批准,不可提交!",
                type: "warning"
            });
            return;
        }
        if (ypbms.length == 0) {
            Messenger().post({
                message: "请选则要提交的数据!",
                type: "warning"
            });
            return;
        }

//////////////// 复制过来的分配功能 要改
        openModalTj("报告编制提交", configMap.path + "/bggl/bgbz/bgbztj.jsp?sj="+new Date().getTime(), "fp", function () {
            var bzry = bgbz_tjfp.getBzr();
            var shry = bgbz_tjfp.getShr();
            var spry = bgbz_tjfp.getSpry();
            console.log("bz"+bzry+"sh"+shry+"sp"+spry);
            if (bzry == null || bzry == "") {
                Messenger().post({
                    message: "请选择主检人员",
                    type: "warning"
                });
                return;
            }

            if (shry == null || shry == "") {
                Messenger().post({
                    message: "请选择审核人员",
                    type: "warning"
                });
                return;
            }

            if (spry == null || spry == "") {
                Messenger().post({
                    message: "请选择审批人员",
                    type: "warning"
                });
                return;
            }
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            console.log("11112222")
            $.ajax({
                data:data,
                url: configMap.path + '/'+prefix+'/bgbz/updatezt?ypbm='+ypbms+"&bzry="+bzry+"&shry="+shry+"&spry="+spry,
                type: 'POST',
                success: function(result) {
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (result.success) {
                        configMap.listGrid.ajax.reload();
                        $("[name=rwfp_checkbox]",jqueryMap.$container).prop("checked",false);
                        Messenger().post("提交成功!");
                    } else {
                        Messenger().post({
                            message:result.message,
                            type: 'error'
                        });
                    }
                },
                error: function() {
                    App.unblockUI(jqueryMap.$blockTarget);
                }
            });

        });
    }


    ///////////////////////////////////提交打开模板页功能结束
    //新生成 报告
    var dayinWtbg = function (){
        //生成委托报告
        var ids=[];

        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            var ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
            var readonly = configMap.listGrid.row(rowIndex).data().readonly;
            var bgpzzt = configMap.listGrid.row(rowIndex).data().BGPZZT;
            // if(bgpzzt=='002'){
            //     Messenger().post({
            //         message: "报告已批准,不能生成!",
            //         type: "warning"
            //     });
            //     return;
            // }
            ids.push(ypbm);
            if (ids.length==0||ids.length>1){
                Messenger().post({
                    message: '请选择一个样品！',
                    type: 'warning'
                });
                return;
            }else {
                if (readonly != '1') {
                    Messenger().post({
                        message: '委托信息尚未提交，不能生成报告！',
                        type: 'warning'
                    });
                } else {
                    POBrowser.openWindowModeless('customermanage/bggl/bgbzScbg?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=0&ifzb=1', 'width=1200px;height=800px;');

                }
            }
        });
    };

    //编辑已生成的报告，也就是 生成后做了在线编辑并保存，可以在这里继续编辑，不会还原成初始状态
    var bjWtbg = function (){
        var ids=[];
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            var ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
            var BGLJ = configMap.listGrid.row(rowIndex).data().BGLJ;
            var readonly = configMap.listGrid.row(rowIndex).data().readonly;
            var bgpzzt = configMap.listGrid.row(rowIndex).data().BGPZZT;
            // if(bgpzzt=='002'){
            //     Messenger().post({
            //         message: "报告已批准,不能编辑!",
            //         type: "warning"
            //     });
            //     return;
            // }
            ids.push(ypbm);
                if(BGLJ==null || BGLJ=="" || BGLJ=="null" || BGLJ.length==0)
                {
                    Messenger().post({
                        message: '报告尚未生成，不能编辑!',
                        type: 'warning'
                    });
                    return;
                }
                if (ids.length==0||ids.length>1){
                    Messenger().post({
                        message: '请选择一个样品！',
                        type: 'warning'
                    });
                    return;
                }else {
                    if (readonly != '1') {
                        Messenger().post({
                            message: '委托信息尚未提交，不能编辑报告！',
                            type: 'warning'
                        });
                        return;
                    } else {
                        POBrowser.openWindowModeless('customermanage/bggl/bjWtbg?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=0&ifzb=1', 'width=1200px;height=800px;');
                    }
                }
            return;
        });
    };

    //报告编制 退回 选择 退回地点
    var openModalTh = function (title, url,id,ypid,wtdbm) {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 退&nbsp;回 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var radio = $("input:radio:checked").val();
                //退回的Ajax请求
                $.ajax({
                    url: configMap.path + '/' + prefix + '/bgbz/thbg?wtid=' + id+'&ypid=' + ypid+'&wtdbm=' +wtdbm+'&thbz='+radio,
                    type: 'POST',
                    success: function (result) {
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (result.success) {
                            configMap.listGrid.ajax.reload();
                            Messenger().post("退回成功!");
                        } else {
                            Messenger().post({
                                message: result.message,
                                type: 'error'
                            });
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });;
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
                buttons: dialogButtons,
                size: "small"
            });
        });
    }

    var thbg = function () {
        var ids = [];
        var ypids=[];
        var wtdbm;
        var pzbz=false;
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            var ypid = configMap.listGrid.row(rowIndex).data().ypid;
            //wtdbm = configMap.listGrid.row(rowIndex).data().wtdbm;
            var bgpzzt = configMap.listGrid.row(rowIndex).data().BGPZZT;
            if(bgpzzt=="002")
            {
                pzbz=true;
                return;
            }
            ids.push(id);
            ypids.push(ypid);
        });
        console.log(ids.length);
        // if(pzbz){
        //     Messenger().post({
        //         message: "报告已批准,不能退回!",
        //         type: "warning"
        //     });
        //     return;
        // }
            if (ypids.length==0){
                Messenger().post({
                    message: '请选择一条记录！',
                    type: 'danger'
                });
                return ;
            } else {
                openModalTh("请选择退回环节",configMap.path +"/bggl/bgbz/bgbzThRadio.jsp",ids.join(","),ypids.join(","),wtdbm);
            }
    }

    //报告打印、流转单打印
    function btn_Printing(zt) {
        var strArr = [];
        var id = "";
        var ypbm = "";
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            id = configMap.listGrid.row(rowIndex).data().ID;
            ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
            configMap.id = id;
            strArr.push(id);
        });
        if (strArr.length != 1) {
            Messenger().post("请选择打印信息!");
            return;
        }
        if(zt=='001') {
            /*alert("流转单打印逻辑")*/
            if (strArr.length==0||strArr.length>1){
                Messenger().post({
                    message: '请选择一个样品！',
                    type: 'warning'
                });
            }else {
                POBrowser.openWindowModeless('customermanage/bggl/dylzd?wtid='+id+'&ypbm='+ypbm+'&cd=0&ifdy=1', 'width=1200px;height=800px;');
            }
        }
    }

    return {
        init: function(uuid) {
            configMap.uuid=uuid;
            setJqueryMap();
            initlistGrid();
            $('#'+configMap.uuid+'btnNew',jqueryMap.$container).on('click',function () {
                openModal("新增证件信息", configMap.path + configMap.edit_Url, 'bianji');
            });
            $('[name=rwfp_checkbox]',jqueryMap.$container).on('click',function () {
                if($("[name=rwfp_checkbox]",jqueryMap.$container).prop("checked")){
                    //选中
                    $("[name=checkbox_checkbox]",jqueryMap.$container).prop("checked",true);
                }else{
                    $("[name=checkbox_checkbox]",jqueryMap.$container).prop("checked",false);
                }
            });
            //生成报告
            $('#dayinWtbg').off('click').on('click',function(){
                dayinWtbg();
            });
            //选择主检人
            $('#bgzjr').off('click').on('click',function(){
                bgzjr();
            });

            // 编辑已有报告
            $('#bjWtbg').off('click').on('click',function(){
                bjWtbg();
            });

            $('#btn_thbg').off('click').on('click',function(){
                thbg();
            });

            $('#'+configMap.uuid+'lzdPrinting',jqueryMap.$container).on('click',function () {
                btn_Printing('001');
            });

            //报告编制 提交 按钮 功能
            $($('#'+uuid+'btn_sjjy_tg')).off('click').on('click',function(){
                //通过 002
                bgbztj('002');
            });


        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();