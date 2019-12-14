var list = function() {
    'use strict';

    var prefix = 'jcgl/sjsc';

    // 全局属性参数
    var configMap = {
        dataUrl: '/'+prefix+'/querylist',
        tuihui_jsp:'/'+prefix+'/tuihui.jsp',
        edit_Url:'/'+prefix+'/edit.jsp',
        tuihui_Url:'/jcgl/backReason',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        uuid:'',
        jclbdm:'',
        lx:'',
        backBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="back" data-toggle="tooltip" title="退回"><i class="icon iconfont icon-tuichu1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan" data-toggle="tooltip" title="查看检测详细"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $ypManageDialog:null
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
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

                    //    yuanao  0714
                    var ypbm =  $('input[name="ypbm"]', jqueryMap.$container).val();
                    data.ypbm=ypbm;
                    data.jclbdm =configMap.jclbdm;

                }
            },
            "columns": [
                {
                    class: "text-left",
                    "data": "ID",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "render": function(data, type, row) {
                        var btn = "";
                        btn = btn + configMap.viewBtn_html+configMap.backBtn_html;
                        return btn;
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
                    "data": "YPMC",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                // {
                //     class: "text-center",
                //     "data": "IF_SSG",
                //     render:function(d,t,r){
                //         if(d=="1"){
                //             d="是";
                //         }
                //         if(d=="0"){
                //             d="否";
                //         }
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                //     }
                // },
                {
                    class: "text-center",
                    "data": "JCXM",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                // {
                //     class: "text-center",
                //     "data": "DWMC",
                //     render:function(d,t,r){
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                //     }
                // },
                // {
                //     class: "text-center",
                //     "data": "SFMC",
                //     render:function(d,t,r){
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                //     }
                // },
                // {
                //     class: "text-center",
                //     "data": "CSMC",
                //     render:function(d,t,r){
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                //     }
                // },
                // {
                //     class: "text-center",
                //     "data": "XJMC",
                //     render:function(d,t,r){
                //         d=delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                //     }
                // },
                {
                    class: "text-center",
                    "data": "SJSCZT",
                    render:function(d,t,r){
                        if(d=='000'){
                            d = "未分配";
                        }
                        if(d=='001'){
                            d = "待复核";
                        }
                        if(d=='002'){
                            d = "复核通过";
                        }
                        if(d=='003'){
                            d = "复核未通过";
                        }
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                }],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function() { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var chakanContainer = $('[data-type="chakan"]', jqueryMap.$container);//查看
                var backContainer = $('[data-type="back"]', jqueryMap.$container);//退回

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(chakanContainer.length > 0){//查看
                    chakanContainer.off('click').on('click',chakan);
                }
                if(backContainer.length>0){
                    backContainer.off('click').on('click',backBtn);
                }
            }
        });
    }

    //查看检测详细
    var chakan = function () {
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID;
        //alert(id);
        openModal("查看检测详细", configMap.path + configMap.edit_Url + "?id=" + encodeURI(id), 'chakan',null,"large");
    }

    //创建模态框
    var openModal = function (title, url, type, func,size) {//打开退还原因模态框
        var dialogButtons = {};
        if (type === 'tuihui') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    jqueryMap.$ypManageDialog.modal('hide');
                    func();
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
                buttons: dialogButtons,
                size:size
            });
        });
    };

    function savezt(zt){
        //数据复合3
        configMap.lx='3';
        var data = {};
        data.lx = configMap.lx;
        data.zt = zt;
        var strArr = [];
        var flag = false;
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            var shzt = configMap.listGrid.row(rowIndex).data().SJSCZT;
            if(shzt!='001'){ //通过
                flag = true;//直接退出
                return;
            }
            strArr.push(id);
        });
        if(flag){
            Messenger().post({
                message:"不能重复审核!",
                type:"warning"
            });
            return;
        }
        if(strArr.length==0){
            Messenger().post({
                message:"请选择通过数据!",
                type:"warning"
            });
            return;
        }
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在保存数据，请稍候...'
        });
        data.id = strArr.join(',');
        $.ajax({
            data:data,
            url: configMap.path + '/'+prefix+'/updatezt',
            type: 'POST',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.listGrid.ajax.reload();
                    //之前没实现多选功能的代码prop为false    0717
                    $("[name=rwfp_checkbox]",jqueryMap.$container).prop("checked",true);
                    Messenger().post({
                        message:"保存成功",
                        type:"success"
                    });
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
    function saveBackZt(zt,id){
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在保存数据，请稍候...'
        });
        //数据校验 2
        configMap.lx='3';
        var data = {};
        data.lx = configMap.lx;
        data.zt = zt;
        var strArr = [];
        strArr.push(id);
        data.id = strArr.join(',');
        $.ajax({
            data:data,
            url: configMap.path + '/'+prefix+'/updatezt',
            type: 'POST',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.listGrid.ajax.reload();
                    Messenger().post({
                        message:"保存成功",
                        type:"success"
                    });
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
    //退回按钮
    var backBtn=function () {
        var el = $(this);
        var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID;
        var shzt = configMap.listGrid.row(rowIndex).data().SJSCZT;
        var ypmc = configMap.listGrid.row(rowIndex).data().YPMC;
        if(shzt!='001'){
            Messenger().post({
                message:"不能重复审核!",
                type:"warning"
            });
            return;
        }
        openModal('退回说明',configMap.path+configMap.tuihui_jsp+'?uuid='+configMap.uuid,'tuihui',function () {
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            var thsm=$('#'+configMap.uuid+'thsm').val();
            var data={};
            data.ypid=id;
            data.thyy=thsm;
            data.thwz='数据复核';
            data.ypmc=ypmc;
            $.ajax({
                data:data,
                url: configMap.path + configMap.tuihui_Url,
                type: 'POST',
                success: function (data) {
                    if (data.info) {
                        saveBackZt("003",id);
                        App.unblockUI(jqueryMap.$blockTarget);
                    } else {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                },
                error: function() {
                    App.unblockUI(jqueryMap.$blockTarget);
                }
            });
        },null)
    }
    
    return {
        init: function(uuid,jclbdm) {
            configMap.uuid=uuid;
            configMap.jclbdm= jclbdm;
            console.log(configMap.jclbdm);
            setJqueryMap();
            initlistGrid();
            $('#searchTerm-sjsh', jqueryMap.$container).on('click', function () {//查询
                configMap.listGrid.ajax.reload();
            });
            //yunaao，重置   0714
            $("#cz",jqueryMap.$container).off('click').on('click',function (){//重置
                $('input',jqueryMap.$content).val('');
                configMap.listGrid.ajax.reload();
            });

            $('[name=rwfp_checkbox]',jqueryMap.$container).on('click',function () {
                if($("[name=rwfp_checkbox]",jqueryMap.$container).prop("checked")){
                    //选中
                    $("[name=checkbox_checkbox]",jqueryMap.$container).prop("checked",true);
                }else{
                    $("[name=checkbox_checkbox]",jqueryMap.$container).prop("checked",false);
                }
            });

            $($('#'+uuid+'btn_sjfh_tg')).off('click').on('click',function(){//通过按钮
                //通过 002
                savezt('002');
            });
        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();