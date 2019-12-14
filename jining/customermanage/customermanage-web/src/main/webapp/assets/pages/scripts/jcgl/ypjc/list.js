var list = function () {
    'use strict';

    var prefix = 'jcgl/ypjc';
    // 全局属性参数
    var configMap = {
        dataUrl: '/' + prefix + '/querylist',
        edit_Url: '/jcgl/ypjc/edit.jsp',
        getZjrUrl: '/' + prefix + '/getZJR',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan" data-toggle="tooltip" title="录入检测值"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        listGrid: null,
        uuid: '',
        lx: '',
        jclbdm:"",
        flag: false
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null
    };
    //赋值
    var setJqueryMap = function () {
        jqueryMap.$container = $('#' + configMap.uuid + '-manager-container');
        jqueryMap.$blockTarget = $('body');
    };


    function delnull(d) {
        if (d == undefined) {
            return '';
        }
        if (d == 'null') {
            return '';
        }
        return d;
    }

    var initlistGrid = function () {
        configMap.listGrid = $('#ManagerList_ypjc', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method": "POST",
                "data": function (data) {
                    var ypmc = $('input[name="ypmc"]', jqueryMap.$container).val();
                    data.ypmc = ypmc;
                    data.jcxmc = $('input[name="jcxmc"]', jqueryMap.$container).val();
                    data.jclbdm = configMap.jclbdm;
                    data.ypbm = $('input[name="ypbm"]', jqueryMap.$container).val();
                    data.ypjczt = $('select[name="ypjczt"]', jqueryMap.$container).val();
                }
            },
            "columns": [
                {
                    class: "text-left",
                    "data": "id",
                    "render": function (data, type, row) {
                        if (checkjcx(data)) {
                            configMap.flag = true;
                        } else {
                            configMap.flag = false;
                        }
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';

                    }
                },
                {
                    class: "text-center",
                    render: function (d, t, r) {
                        return configMap.viewBtn_html;
                    }
                },
                {
                    class: "text-center",
                    "data": "ypmc",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypbm",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcxm",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "cydbm",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypdj",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                // {
                //     class: "text-center",
                //     "data": "YPPHHBH",
                //     render: function (d, t, r) {
                //         d = delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                //     }
                // },
                {
                    class: "text-center",
                    "data": "GGXH",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypzxbz",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "lqsj",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
           /*     {
                    class: "text-center",
                    "data": "if_ssg",
                    render: function (d, t, r) {
                        if (d == "1") {
                            d = "是";
                        }
                        if (d == "0") {
                            d = "否";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },*/

             /*   {
                    class: "text-center",
                    "data": "lqry",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "lqsj",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },*/
                // {
                //     class: "text-center",
                //     "data": "lx",
                //     render: function (d, t, r) {
                //         if (d == '1') {
                //             d = "正样";
                //         }
                //         if (d == '2') {
                //             d = "副样";
                //         }
                //         if (d == '3') {
                //             d = "备样";
                //         }
                //         d = delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                //     }
                // },
                {
                    class: "text-center",
                    "data": "ypjczt",
                    render: function (d, t, r) {
                        //000未分配，001已分配，002，检测通过，003检测未通过
                        if (d == '000') {
                            d = "退回";
                        }
                        if (d == '001') {
                            d = "检测中";
                        }
                        if (d == '002') {
                            d = "检测完成";
                        }
                        if (d == '003') {
                            d = "检测未完成";
                        }
                        d = delnull(d);
                        if (configMap.flag) {
                            return '<span  style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                        } else {
                            return '<span style="color: #00c800; display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                        }

                    }
                }
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var viewContainer = $('[data-type="chakan"]', jqueryMap.$container);//查看详细信息

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', bianji);//查看详情
                }
            }
        });
    }
    //创建模态框
    var openModal = function (title, url, type) {  //这是检测值录入的模态框
        var dialogButtons = {};
        if (type == 'bianji') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    jcxxlr.save(function (data) {
                        if (data) {
                            configMap.listGrid.ajax.reload();
                            jqueryMap.$Dialog.modal("hide");
                        } else {
                            //jqueryMap.$Dialog.modal("hide");
                        }
                    });
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$Dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                onEscape: true,
                size:"large"
            });
        });


    };

    var bianji = function () {//J检测信息录入
        var el = $(this);
        var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().id;
        var ypjczt = configMap.listGrid.row(rowIndex).data().ypjczt;
        var ypbm = configMap.listGrid.row(rowIndex).data().ypbm;
        var ypmc = configMap.listGrid.row(rowIndex).data().ypmc;
        if(ypjczt=="002")
        {
            Messenger().post({
                message:"检测完成的任务不能录入检测值!",
                type:"warning"
            });
            return;
        }

        openModal("检测信息录入 "+ypbm+" "+ypmc, configMap.path + configMap.edit_Url + "?id=" + encodeURI(id), 'bianji');

    };

    var saveJcz = function () {
        var strArr = [];
        var wczt=false;
        var ypbm;
        var ypmc;
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().id;
            var ypjczt = configMap.listGrid.row(rowIndex).data().ypjczt;
            ypbm = configMap.listGrid.row(rowIndex).data().ypbm;
            ypmc = configMap.listGrid.row(rowIndex).data().ypmc;
            console.log(ypbm+ypmc);
            strArr.push(id);
            if(ypjczt=="002")
            {
                wczt=true;
                return;
            }
        });

        if(wczt)
        {
            Messenger().post({
                message:"检测完成的任务不能录入检测值!",
                type:"warning"
            });
            return;
        }
        if(strArr.length != 1){
            Messenger().post({
                message:"请选择一条检测数据!",
                type:"warning"
            });
            return;
        }
        openModal("检测信息录入"+" "+ypbm+" "+ypmc, configMap.path + configMap.edit_Url + "?id=" + encodeURI(strArr[0]), 'bianji');
    };

    function savezt(zt) {//修改样品的状态
        //样品检测 1
        configMap.lx = '1';
        var data = {};
        data.lx = configMap.lx;
        data.zt = zt;
        var strArr = [];
        var flag = false;//是否重复审核
        var flag1 = false;//是否剩余检测项未检测
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().id;
            var shzt = configMap.listGrid.row(rowIndex).data().ypjczt;
            if (shzt != '001') { //可提交状态
                flag = true;//直接退出
                return;
            }
            //if (checkjcx(id)) {//这里对比的是bzzt   s所以如果满足true  就说明有的检测项没有提交
            //    flag1 = true;
            //    return;
            //}
            strArr.push(id);
        });
        if (flag) {
            Messenger().post({
                message:"当前状态不能提交。退回、检测未完成时请先录入检测值。",
                type:"warning"
            });
            return;
        }
        if (flag1) {
            Messenger().post({
                message:"剩余检测项未提交!",
                type:"warning"
            });
            return;
        }
        if(strArr.length==0){
            Messenger().post({
                message:"请选择提交数据!",
                type:"warning"
            });
            return;
        }
        data.id = strArr.join(',');
        $.ajax({
            data: data,
            url: configMap.path + '/' + prefix + '/updatezt',
            type: 'POST',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.listGrid.ajax.reload();
                    Messenger().post({
                        message:"保存成功",
                        type:"success"
                    });
                    for (var i = 0; i < strArr.length; i++) {
                        getZJR(strArr[i]);//判断增加主检人
                    }
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
        });
    }

    var checkjcx = function (ypid) {//检测是否有未检测的项目
        var flag = false;
        $.ajax({
            data: {ypid: ypid},
            url: configMap.path + '/' + prefix + '/findTjztByYpid',
            type: 'POST',
            async: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].bzzt == '001') {
                        flag = true;
                        return;
                    }
                }
            },
            error: function () {
                flag = false;
            }
        });
        return flag;
    }
    var getZJR = function (ypid) {//判断主键人
        $.post(configMap.path + configMap.getZjrUrl,{ypid: ypid});
    }
    //打印原始记录模板
    var dyysjl = function () {
        var ypbm = "";
        var ypid= "";
        var ids = [];
        var ypids=[];
        var inputjson = jqueryMap.$container.find('[name=checkbox_checkbox]:checked');
        $(inputjson).each(function () {
            var $el = $(this);
            var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
            ypbm = configMap.listGrid.row(rowIndex).data().ypbm;
            ypid = configMap.listGrid.row(rowIndex).data().id;
            ids.push(ypbm)
            //ypids.push(ypid);
            return;
        });
        console.log("ypbm="+ypbm+"---ypid"+ypid);
        if (ids.length==0){
            Messenger().post({
                message: '请选择一条数据!',
                type: 'warning'
            });
        }else {
            openModalDyYsjl("请选择日期","customermanage/marketManage/ypjcDyysjl.jsp",ypbm,ypid)
        }
    }
    var openModalDyYsjl = function (title, url,ypbm,ypid) {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 打&nbsp;印 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var fhrq = $("#fhrq").val();
                var jyrq = $("#jyrq").val();
                POBrowser.openWindowModeless('customermanage/bggl/dyysjl?fhrq='+fhrq+'&jyrq='+jyrq+'&ypbm='+ypbm+'&ypid='+ypid, 'width=1200px;height=800px;');
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
    return {
        init: function (uuid,jclbdm) {
            configMap.uuid = uuid;
            configMap.jclbdm = jclbdm;
            setJqueryMap();
            initlistGrid();
            $('#searchTerm-m', jqueryMap.$container).on('click', function () {//查询按钮
                configMap.listGrid.ajax.reload();
            });

            $("[name='rwfp_checkbox']", jqueryMap.$container).on('click', function () {//多选反选
                if ($("[name='rwfp_checkbox']", jqueryMap.$container).prop("checked")) {
                    //选中
                    $("[name='checkbox_checkbox']", jqueryMap.$container).prop("checked", true);
                } else {
                    $("[name='checkbox_checkbox']", jqueryMap.$container).prop("checked", false);
                }
            });

            $('#' + uuid + 'btn_ypjc_tg', jqueryMap.$container).off('click').on('click', function () {//提交
                //通过 002
                savezt('002');
            });
            $('#' + uuid + 'dyysjl', jqueryMap.$container).off('click').on('click', function () {//打印原始记录模板
                dyysjl();
            });
            $('#' + uuid + 'btn_ypjc_lrjcz', jqueryMap.$container).off('click').on('click', function () {
                saveJcz();
            });

            $("#searchTerm-reset", jqueryMap.$container).click(function () {//重置
                $("input", jqueryMap.$container).val("");
                configMap.listGrid.ajax.reload();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();