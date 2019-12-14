var bglqlist = function() {
    'use strict';
    var prefix = 'bglq';
    // 全局属性参数
    var configMap = {
        dataUrl: '/'+prefix+'/querylist',
        del_dataUrl: '/'+prefix+'/delete',
        query_ryUrl: '/'+prefix+'QueryRy',
        edit_Url:'/'+prefix+'/bgbz/edit.jsp',
        doc_url:'',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        uuid:'',
        lx:'',
        path:'',
        editPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="bianji" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html_disabled: '<a disabled="disabled" href="javascript:;" class="btn btn-xs default color666"  data-toggle="tooltip" title="删除"><i style="color:#666;" class="icon iconfont icon-shanchu3 color666  iconFontSize"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan" data-toggle="tooltip" title="查看报告"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewZxrBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan_zxr" data-toggle="tooltip" title="查看执行人"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewXzmbBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan_xzmb" data-toggle="tooltip" title="选择模板"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="查看报告"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        addwdsd_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="addwdsd" title="温度湿度"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',

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
                    data.ypbm=$('input[name="ypbm"]', jqueryMap.$container).val();
                    data.htmc=$("#htmc").val();
                    data.startDate=$('input[name="startDate"]', jqueryMap.$container).val();
                    data.endDate=$('input[name="endDate"]', jqueryMap.$container).val();
                    console.log($('input[name="startDate"]', jqueryMap.$container).val());
                    console.log($('input[name="endDate"]', jqueryMap.$container).val());
                }
            },
            "columns": [
                {
                    "data": "ID",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    className: "text-left",
                    "render": function (data, type, row) {
                        return  configMap.editBtn_html;
                           // + configMap.addwdsd_html;
                    }
                },
                /* {
                     "data": "HTMC",
                     render:function(d,t,r){
                         d=delnull(d);
                         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                     }
                 },*/
                {
                    "data": "YPBM",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "YPMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "JCXM",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                /* {
                     "data": "SJCJRQ",
                     render:function(d,t,r){
                         d=delnull(d);
                         if(d!='')
                         d= moment(d).format('YYYY-MM-DD');
                         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                     }
                 },*/
                {
                    "data": "DWMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "SFMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "CSMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "XJMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "BGBZZT",
                    render:function(d,t,r){
                        //000未分配，001已分配，002，检测通过，003检测未通过
                        if(d=='000'){
                            d = "未分配";
                        }
                        if(d=='001'){
                            d = "未提交";
                        }
                        if(d=='002'){
                            d = "已提交";
                        }
                        if(d=='003'){
                            d = "未通过";
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
            "drawCallback": function() { // 数据加载完成后执行
                var chakanContainer = jqueryMap.$container.find('[name="contractedit"]');
                var addwdsd = jqueryMap.$container.find('[name="addwdsd"]');
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var delContainer = $('[data-type="del"]', jqueryMap.$container);
                var editContainer = $('[data-type="bianji"]', jqueryMap.$container);
                // var chakanContainer = $('[data-type="chakan"]', jqueryMap.$container);
                var chakan_zxrContainer = $('[data-type="chakan_zxr"]', jqueryMap.$container);
                var chakan_xzmbContainer = $('[data-type="chakan_xzmb"]', jqueryMap.$container);
                var findContainer = $("#searchTerm1");

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if(addwdsd.length > 0) {
                    addwdsd.off('click').on('click', addWdsd);
                }

                if(chakanContainer.length > 0){
                    chakanContainer.off('click').on('click', editQywt);
                }

                if(chakan_zxrContainer.length > 0){
                    chakan_zxrContainer.off('click').on('click',chakan_zxr);
                }
                if(findContainer.length>0){
                    findContainer.off('click').on('click',findBtn);
                }

                if(chakan_xzmbContainer.length > 0){
                    chakan_xzmbContainer.off('click').on('click',chakan_xzmb);
                }

                if(editContainer.length > 0){
                    editContainer.off('click').on('click',bianji);
                }
                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": del,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }
            }
        });
    }

    var addWdsd = function () {
        stopContinueClick(this, 300);
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID;
        var xhs = id;
        $("#myModall").modal();
        finn(xhs);
    };
    var finn = function (xhs) {
        var id = xhs;
        $.ajax({
            url: "/customermanage/bggl/getwdsd/" + id,
            type: "POST",
            success: function (result) {
                if (result.success) {
                    var data = result.data;
                    $('input[name="wd"]', jqueryMap.$wdsdForm).val(data.wd);//委托单位名称
                    $('input[name="sd"]', jqueryMap.$wdsdForm).val(data.sd);//联系电话
                    $('input[name="wtid"]', jqueryMap.$wdsdForm).val(data.id);//联系电话
                } else {
                    Messenger().post({
                        message: "数据加载失败",
                        type: 'warning'
                    });
                }
            }
        });
    };

    var editQywt = function (){
        stopContinueClick(this, 300);
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID+",";
        var ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
        POBrowser.openWindowModeless('customermanage/openwordwtbg?id='+ypbm, 'width=1200px;height=800px;');
        // generateTab(this, configMap.path + configMap.addUrl + '?id=' + id, "修改企业委托", "qywt_info", 'fa fa-file-text-o iconMr');
    };

    //查询
    var findBtn=function () {
        configMap.listGrid.ajax.reload();
    }
    //编辑
    var bianji = function(){
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().zjdm;
        openModal("编辑", configMap.path + configMap.edit_Url + "?zjdm=" + encodeURI(id), 'bianji');
    }

    //查看执行人
    var chakan_zxr = function () {
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID;
        openModal("查看执行人", configMap.path + configMap.edit_Url + "?id=" + encodeURI(id), 'chakan');
    }



    //选择模板
    var chakan_xzmb = function () {
        $("#bgxzmb").modal({show:true});

        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID;

        $("#tjmbxz").off("click").on("click",function () {

            var mbid= document.getElementById("xzmb").value;
            $.ajax({
                url:"customermanage/xzmb/xzmbsc",
                data:{"mbid":mbid,"id":id},

                success: function(result) {
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (result.success) {
                        configMap.listGrid.ajax.reload();
                        $("#bgxzmb").modal('hide');
                        Messenger().post("操作成功!");
                    } else {
                        Messenger().post({
                            message:result.message,
                            type: 'error'
                        });
                    }
                },
                error: function() {
                    App.unblockUI(jqueryMap.$blockTarget);
                    $("#bgxzmb").modal('hide');
                }
            });
        });
    }




//  var a = {
//     alertA: function() {
//    	 alert("1111")
//     }
//  };
//  a.alertA();
    //创建模态框
    var openModal = function (title, url, type) {
        var dialogButtons = {
        };
        if (type == 'bianji'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    edit.save(function (data) {
                        if(data){
                            configMap.listGrid.ajax.reload();
                            jqueryMap.$Dialog.modal("hide");
                        }else{
                            return false;
                        }
                    })
                    return false;
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




    function savezt(zt){

        //报告审核
        configMap.lx='0';
        var data = {};
        data.lx = configMap.lx;
        data.zt = zt;

        if(zt=='006'){
            //生成报告
            var ypbm1 = "";
            var strArr = [];
            var flag = false;
            jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                var id = configMap.listGrid.row(rowIndex).data().ID;
                var shzt = configMap.listGrid.row(rowIndex).data().BGLJ;
                console.log(id);
                console.log(shzt);
                ypbm1 = configMap.listGrid.row(rowIndex).data().YPBM;
                if(shzt=='') { //没有报告
                    strArr.push(id);
                }
            });
            if(strArr.length<=0){
                Messenger().post("请选择记录 !");
                return;
            }
            data.id = strArr.join(',');
            var mb=document.getElementById("mbxz").value;
            data.mb=mb;
            $.ajax({
                data:data,
                url: configMap.path + '/'+prefix+'/updatezt?ypbm='+ypbm1,
                type: 'POST',
                success: function(result) {
                    $("#Modal2").modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (result.success) {
                        configMap.listGrid.ajax.reload();
                        $("[name=rwfp_checkbox]",jqueryMap.$container).prop("checked",false);
                        Messenger().post("保存成功!");
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
            return;
        }

        var strArr = [];
        var flag = false;
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            var shzt = configMap.listGrid.row(rowIndex).data().BGBZZT;
            if(shzt=='002'){
                flag = true;//直接退出
            }
            strArr.push(id);
        });
        if(flag){
            Messenger().post("不能重复审核!");
            return;
        }
        data.id = strArr.join(',');
        $.ajax({
            data:data,
            url: configMap.path + '/'+prefix+'/bgbz/updatezt',
            type: 'POST',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.listGrid.ajax.reload();
                    $("[name=rwfp_checkbox]",jqueryMap.$container).prop("checked",false);
                    Messenger().post("保存成功!");
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
    }



    var dayinWtbg = function (){
        //生成委托报告
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            $.ajax({
                url: configMap.path + "/bggl/dayinwtbg/" + id,
                type: 'POST',
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message:"保存成功",
                            type:"info"
                        });
                        qywtlist.reload();
                    } else {
                        Messenger().post({
                            message: result.message,
                            type: 'danger'
                        });
                    }

                },
                error: function (result) {
                    $('#saveKhxx').html("保存");
                    Messenger().post({
                        message: '保存失败！',
                        type: 'danger'
                    });
                }
                // success:function () {
                //     POBrowser.openWindowModeless('customermanage/openwordwtbg?id='+id, 'width=1200px;height=800px;');
                // }
            });
        });
    };



    function Run(strPath) {
        try {
            var objShell = new ActiveXObject("wscript.shell");
            objShell.Exec(strPath);
            objShell = null;
        }
        catch (e) {
            alert(e);
        }
    }

        function openFileIIs(qzpath){
        try{
            var objShell=new ActiveXObject("WScript.Shell");
            var aa = objShell.Run(qzpath);
            objShell = null;
        } catch(e)
        {
            alert('找不到文件"'+qzpath+'"(或它的组件之一)。请确定路径和文件名是否正确.');
            alert(e);
        }
    }

    var dakaiqz = function () {
        window.open("<%= request.getContextPath()%>/bggl/bglq/qianzidemo/index.html");
    }

    var kehuqz = function (){
         jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
             var el = $(this);
             var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
             var id = configMap.listGrid.row(rowIndex).data().ID;
             console.log(id)
            $.ajax({
                url: configMap.path + "/bglq/kehuqz?id="+id,
                type: 'POST',
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message:"打开签字板",
                            type:"info"
                        });
                        configMap.listGrid.ajax.reload();
                    } else {
                        Messenger().post({
                            message: result.message,
                            type: 'danger'
                        });
                    }
                },
                error: function (result) {
                    $('#saveKhxx').html("保存");
                    Messenger().post({
                        message: '保存失败！',
                        type: 'danger'
                    });
                }
            });
        });
    };

    function huoqulj(){
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        // 获取目录下所有文件，对于该浏览器缓存目录，仅能获取到一个文件
        var path = 'C:\\unipen\\sign';
        var fldr = fso.GetFolder(path);
        var ff = new Enumerator(fldr.Files);
        var s = '';
        var fileArray = new Array();
        var fileName = '';
        var count = 0;
        for(; !ff.atEnd(); ff.moveNext()){
            fileName = ff.item().Name + '';
            fileName = fileName.toLowerCase();
            if(fileName.indexOf('cookie') >= 0){
                fileName = fileName.substring(0,fileName.indexOf('.'));
                fileName = fileName.substring(fileName.lastIndexOf('@')+1);
                s += fileName + '\n';
            }
            s += fileName + '\n';
            count++;
        }
        alert(count + '\n' + s + '\n'+ '\n'+ fileName);
    }


    return {
        init: function(uuid) {
            configMap.uuid=uuid;
            setJqueryMap();
            initlistGrid();

            $('[name=rwfp_checkbox]',jqueryMap.$container).on('click',function () {
                if($("[name=rwfp_checkbox]",jqueryMap.$container).prop("checked")){
                    //选中
                    $("[name=checkbox_checkbox]",jqueryMap.$container).prop("checked",true);
                }else{
                    $("[name=checkbox_checkbox]",jqueryMap.$container).prop("checked",false);
                }
            });




            $('#dayinWtbg').off('click').on('click',function(){
                dayinWtbg();
            });

            $('#kehuqz').off('click').on('click',function(){
               // var qzpath = "‪C://qianzidemo/immortal.bat";
               // Run("C:\\qianzidemo\\immortal.bat");
                openFileIIs("C:\\qianzidemo\\immortal.bat");
               // ifExist("‪C:/qianzidemo","immortal.bat");
                kehuqz();
               // huoqulj();
                // dakaiqz();
            });


            $($('#'+uuid+'btn_sjjy_tg')).off('click').on('click',function(){
                //通过 002
                savezt('002');
            });

            $($('#'+uuid+'btn_sjjy_scbg')).off('click').on('click',function(){
                //通过 002
                savezt('006');
            });

            $($('#'+uuid+'btn_sjjy_btg')).off('click').on('click',function(){
                //不通过 003
                savezt('003');
            });


        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();