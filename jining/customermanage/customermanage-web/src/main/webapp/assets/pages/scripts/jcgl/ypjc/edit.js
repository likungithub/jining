var jcxxlr = function () {
    'use strict';

    var prefix = 'jcgl/sjxg';

    // 全局属性参数
    var configMap = {
        jcx: "0",
        jcxmids: [],
        ckeds:[],
        ids: [],
        id: '',
        path: '',
        uuid: '',
        addyqUrl: '/ypjc/addYq',
        addyqJsp: '/jcgl/ypjc/addYq.jsp',
        addbzwzJsp:'/jcgl/ypjc/addbzwz.jsp',
        dataUrl: '/' + prefix + '/QueryOne',
        updateUrl: '/' + prefix + '/updateData',
        addUrl: '/' + prefix + '/add',
        initGridypjcedit: null,
        xlz: null,
        m_bzwz :''
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $container: null,
        $editForm: null,
        $Dialogts:null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$container = $('#' + configMap.uuid + '-ypjcEdit-container');
        jqueryMap.$editForm = $('#' + configMap.uuid + 'editForm');
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
        configMap.initGridypjcedit = $('#ManagerList_ypjcedit', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "scrollX":true,//水平滚,
            "responsive": false,
            "ajax": {
                "dataSrc": "aaData",
                "url": "customermanage/ypjc/ypjcEdit",
                "method": "POST",
                "data": function (data) {
                    data.jcxmc = $("#jcxmc", jqueryMap.$container).val();
                    data.ypid1 = configMap.id;
                    data.tjzt=$("[name='tjzt']",jqueryMap.$container).val()
                    data.bzzt=$("[name='bzzt']",jqueryMap.$container).val()
                }
            },
            "columns": [
                {
                    class: "text-center",
                    "data": "jcxmid",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="ypjcche"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zongshu",//jcjg pd
                    "render": function (data, type, row) {
                        return '<input type="hidden" name="ypjcche"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zwmc",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "yqnames",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "jcx",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        configMap.jcx = data;
                        return '<input type="text" name="jcx" data-type="jczpdtype" id="jcx" style="width: 50px;" value=' + data + '>';
                    }

                },
                {
                    class: "text-center",
                    "data": "BZFFJCXDW",
                    "render": function (data, type, row) {

                        data = delnull(data);
                        console.log("xlzdw="+data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "BJF",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        // console.log("!"+data+"!");
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "xlz",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<textarea name="xlz" data-type="jczpdtype" onFocus="xfjianpan(this)" id="xlz" rows="2" cols="20">' + data + '</textarea>';
                    }

                },

                {
                    class: "text-center",
                    "data": "jcz",
                    "render": function (data, type, row) {
                        if (data != null) {
                            return '<textarea  name="che" data-type="jczpdtype" onFocus="xfjianpan(this)" id="jczpd" rows="2" cols="20">' + data + '</textarea>';
                        } else {
                            if (configMap.jcx == '') {
                                return '<textarea  name="che" data-type="jczpdtype" id="jczpd"  rows="2" cols="20"  >0</textarea>';
                            } else {
                                return '<textarea  name="che" data-type="jczpdtype" id="jczpd"  rows="2" cols="20" >0</textarea>';//' + configMap.jcx + ' 注释掉2019.06.30
                            }

                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "jldw",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        // console.log("JLDW="+data);
                        return '<input type="text" name="jldw" data-type="jczpdtype" id="jldw" style="width: 50px;" value=' + data + '>';
                    }
                },
                {
                    class: "text-center",
                    "data": "WD",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        console.log("WD="+data);
                        return '<input type="text" name="wd" data-type="jczpdtype" id="wd" style="width: 50px;" value=' + data + '>';
                    }

                },
                {
                    class: "text-center",
                    "data": "SD",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        console.log("JLDW="+data);
                        return '<input type="text" name="sd" data-type="jczpdtype" id="sd" style="width: 50px;" value=' + data + '>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcfa",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" style="width: 300px;" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "pdyj",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        console.log("pdyj"+data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" style="width: 80px;" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "jcxmjl",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        //1 合格  0 不合格  2 不判定
                        var hg =  '';
                        var bhg =  '';
                        var bpd =  '';
                        if(data=="0")
                        {
                            bhg=  'selected="selected"';
                        }else if(data=="1")
                        {
                            hg =  'selected="selected"';
                        }else if(data=="2")
                        {
                            bpd =  'selected="selected"';
                        }

                            return '<select id="jcxmjl" name="jcxmjl" style="width: 70px;height: 23px;">\n' +
                                '                        <option value=""></option>\n' +
                                '                        <option value="1" '+hg+' >yes</option>\n' +
                                '                        <option value="0" '+bhg+' >no</option>\n' +
                                '                        <option value="2" '+bpd+' >不判定</option>\n' +
                                '                    </select>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcxmbz",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<input type="text" name="jcxmbz" data-type="jczpdtype" id="jcxmbz" style="width: 50px;" value=' + data + '>';
                    }

                },
                {
                    class: "text-center",
                    "data": "bzwz",
                    "render": function (data, type, row) {
                        /*if (data != null) {
                            data = moment(data).format('YYYY-MM-DD');
                            return '<input type="date" name="lrrq" value="'+data+'">';
                        } else {
                            return '<input type="date" name="lrrq">';
                        }*/
                        data = delnull(data);
                        if(data.length ===0){
                            return '<a href="javascript:;" class="btn btn-xs default" data-type="bjbzwz" data-toggle="tooltip" title="录入标准物质" data-value=""><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>'
                        }else{
                            var datajson =JSON.parse(data);
                            var ds = _.map(datajson,'name').join(',')

                            return '<a href="javascript:;" class="btn btn-xs default" data-type="bjbzwz" data-toggle="tooltip" title="'+ds+'" data-value =\''+data+'\'><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i><span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >' + ds + '</span></a>';
                        }
                    }

                },
                {
                    class: "text-center",
                    "data": "bzzt",
                    "render": function (data, type, row) {
                        if (data == '001') {
                            data = "未检测";
                            data = delnull(data);
                            return '<span style="display: inline-block;color:red;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                        }
                        if (data == '002') {
                            data = "已检测";
                            data = delnull(data);
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                        }

                    }
                },
                {
                    class: "text-center",
                    "data": "tjzt",
                    "render": function (data, type, row) {
                        if (data == '1') {
                            data = "已提交";
                        } else {
                            data = "未提交";
                        }
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcr",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
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
            "drawCallback": function () {//加载完数据之后执行
                var tootip1Container = $('[data-toggle="tooltip"]', jqueryMap.$container);

                if (tootip1Container.length > 0) {
                    tootip1Container.tooltip();
                }

                var view1Container = $('[data-type="bjbzwz"]', jqueryMap.$container);//查看详细信息


                if (view1Container.length > 0) {
                    view1Container.off('click').on('click', bjbzwz);//标准物质编辑查看
                }

                // var view2Container = $('[data-type="jczpdtype"]', jqueryMap.$container);//检测结果实时判断
                // view2Container.off('blur').on('blur', jianCeZhiBJ);
                reloadSetCheckbox();    //查询完成将上次勾选的再加上勾选状态
            }
        });
    };

    var reloadSetCheckbox = function () {
        if (configMap.ckeds.length > 0) {
            jqueryMap.$container.find('[name="ypjcche"]').each(function (i, v) {
                var el = $(this);
                var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
                var jcxmid = configMap.initGridypjcedit.row(rowIndex).data().jcxmid;
                if (configMap.ckeds.indexOf(jcxmid) > -1) {
                    v.checked = true;
                }
            });
            configMap.ckeds = [];
        }
    };

    /*检测项名称查询*/
    var jcxSeach = function () {
        configMap.initGridypjcedit.ajax.reload();
    }
    /*重置查询项*/
    var jcxReast = function () {
        $("#jcxmc", jqueryMap.$container).val("");
        $("[name='tjzt']",jqueryMap.$container).val("")
        $("[name='bzzt']",jqueryMap.$container).val("")
        configMap.initGridypjcedit.ajax.reload();
    }

    /*若参考值不为数字，那可输入任何值*/
    function checkNumber(biaozhun) {
        var reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(biaozhun)) {
            return true;
        }
        return false;
    }


    var save = function (callback) { //检测值录入保存操作
        var strArr = [];
        var if_tjzt = false;//判断检测项是否检测
        var jlcj=false;
        /////这里加  录入内容如果有文本，结论没选择 必须强制选择结论
        $('input[name="ypjcche"]:checked', jqueryMap.$container).each(function () {//遍历每一个名字为ypjcche的复选框，其中选中的执行函数
            var dd = $(this);
            configMap.jcxmids.push($(this).val());//将选中的值添加到数组ids中
            var rowIndex    = configMap.initGridypjcedit.cell(dd.parent()).index().row;
            //eq开始
            var jczTemp     = $(dd).parent().parent().children("td:eq(8)").children().val();//检测值
            var jcxmjlTemp  = $(dd).parent().parent().children("td:eq(14)").children().val();//结论
            var xlzTemp     = $(dd).parent().parent().children("td:eq(7)").children().val();//限量值
            var jcxTemp     = $(dd).parent().parent().children("td:eq(4)").children().val();//检测限
            var jcxmbz     = $(dd).parent().parent().children("td:eq(15)").children().val();//检测项目备注

            //console.log("jcxmjlTemp="+jcxmjlTemp);
            //判断检测 结论是否为空 ，如果是  则 需要 判断 检测值、限量值 是不是中文
            if(jcxmjlTemp==null || jcxmjlTemp=="")
            {
                // //判断字符串是否为数字  正则表达式
                // var re = /^[0-9]+.?[0-9]*$/;
                // if (!re.test(xlzTemp)) {
                //     jlcj=true;
                //     return false;
                // }
                //
                // if (!re.test(jczTemp)) {
                //     jlcj=true;
                //     return false;
                // }
                //20190919添加自动计算校验
                jlcj=true;
                return false;
            }
        });
        //alert(333);
        if(jlcj)
        {
            // Messenger().post({
            //     message: "限量值或检测值非数字必须要选择结论！",
            //     type: "warning"
            // });
            //20190919添加自动计算校验提示
            Messenger().post({
                message: "检测结论必须要进行选择，可以使用自动计算按钮！",
                type: "warning"
            });
            return  false;
        }
        jqueryMap.$container.find('[name=ypjcche]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
            var jcxmid = configMap.initGridypjcedit.row(rowIndex).data().jcxmid;
            var tjzt = configMap.initGridypjcedit.row(rowIndex).data().tjzt;
            strArr.push(jcxmid);
            if (tjzt == "1") {
                if_tjzt = true;
                return;
            }
        });

        if (strArr.length == 0) {
            Messenger().post({
                message: "请选择提交数据!",
                type: "warning"
            });
            return false;
        }
        else {
           jqueryMap.$Dialogts = bootbox.dialog({
                title: '提示',
                message: '确定要提交检测项目？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-success"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在保存数据...'
                            });
                            var jcflag1 = false;//最后的弹窗提示
                            var data=[];
                            // debugger;
                            $('input[name="ypjcche"]:checked', jqueryMap.$container).each(function () {//遍历每一个名字为ypjcche的复选框，其中选中的执行函数
                                var dd = $(this);
                                configMap.jcxmids.push($(this).val());//将选中的值添加到数组ids中
                                var rowIndex = configMap.initGridypjcedit.cell(dd.parent()).index().row;
                                // var wd = '18-22';
                                // var sd = '45-55';
                                var datarow =  {
                                        jcz: $(dd).parent().parent().children("td:eq(8)").children().val(),//检测值
                                        wd: $(dd).parent().parent().children("td:eq(10)").children().val(),//温度
                                        sd: $(dd).parent().parent().children("td:eq(11)").children().val(),//湿度
                                        jcxmjl: $(dd).parent().parent().children("td:eq(14)").children().val(),//结论
                                        jcxmbz: $(dd).parent().parent().children("td:eq(15)").children().val(),//检测项目备注
                                        bzwz:$(dd).parent().parent().children("td:eq(16)").children().attr('data-value'),
                                        bzzt: "002",//业务室单个提交检测项目的保存状态
                                        ypid: configMap.id,
                                        jcxmid: $(dd).val(),
                                        jcx_bjf:  configMap.initGridypjcedit.row(rowIndex).data().BJF,//检出项的比较符号
                                        xlz: $(dd).parent().parent().children("td:eq(7)").children().val(),//限量值
                                        jldw: $(dd).parent().parent().children("td:eq(9)").children().val(),//计量单位
                                        // xlzdw: $(dd).parent().parent().children("td:eq(6)").children().val(),//计量单位
                                        jcx: $(dd).parent().parent().children("td:eq(4)").children().val(),//检测限
                                    };
                                data.push(datarow);
                            });
                            ///循环结束

                            var str_json = JSON.stringify(data);
                            $.ajax({
                                url: "customermanage/ypjc/updateYpjc",//
                                type: 'POST',
                                data: {"questionsList": str_json},
                                async: false,
                                success: function (data) {
                                    jqueryMap.$Dialogts.modal("hide");
                                    if (data.success) {
                                        jcflag1 = true;
                                        Messenger().post({
                                            message: "保存成功",
                                            type: "success"
                                        });

                                        App.unblockUI(jqueryMap.$blockTarget);
                                        callback(true);
                                    } else {
                                        jcflag1 = false;
                                        Messenger().post({
                                            message: "保存失败!",
                                            type: "error"
                                        });
                                        App.unblockUI(jqueryMap.$blockTarget);
                                        callback(false);
                                    }

                                },
                                error: function () {
                                    jcflag1 = false;
                                }
                            });
                            //////循环结束
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }
       return false;
    };
    //创建模态框
    var openModal = function (title, url, type, func, size) {
        var dialogButtons = {};
        if (type == 'addYq') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            }
        }
        if(type == 'bjbzwz'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            }
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn btn-default borderRadius4 color666'
        }
        $.get(url, function (html) {
            jqueryMap.$Dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size: size
            });
        });
    };
    //编辑标准物质
    var bjbzwz = function () {//标准物质信息录入

        var el = $(this);
        var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
        var jcxmid = configMap.initGridypjcedit.row(rowIndex).data().jcxmid;
        var bzwzlist = configMap.initGridypjcedit.row(rowIndex).data().bzwz;
        configMap.m_bzwz = bzwzlist;
        openModal("标准物质录入",
            configMap.path + configMap.addbzwzJsp + "?jcxmid=" + encodeURI(jcxmid)+"&sjs="+new Date().getTime(),
            'bjbzwz',
            function(){
                var bzwzdata = addbzwzList.getbzwzData();
                // console.log('----',bzwzdata)
                var rowIndex = configMap.initGridypjcedit.cell($('[value="'+bzwzdata.id+'"]').parent()).index().row;
                configMap.initGridypjcedit.row(rowIndex).data(_.assign(configMap.initGridypjcedit.row(rowIndex).data(),{'bzwz':bzwzdata.data.length == 0 ? '' : JSON.stringify(bzwzdata.data)}))
                var view1Container = $('[data-type="bjbzwz"]', jqueryMap.$container);//查看详细信息

                if (view1Container.length > 0) {
                    view1Container.off('click').on('click', bjbzwz);//标准物质编辑查看
                }


                //console.log(configMap.initGridypjcedit.row(rowIndex).data())
            },'large');

    }

    //添加仪器
    var addYq = function () {
        var strArr = [];
        jqueryMap.$container.find('[name="ypjcche"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
            var jcxmid = configMap.initGridypjcedit.row(rowIndex).data().jcxmid;
            strArr.push(jcxmid);
            configMap.ckeds.push(jcxmid);
        });
        if (strArr.length == 0) {//如果长度为0   那就说明没有选择数据
            Messenger().post({
                message: "请选择检测项目!",
                type: "warning"
            });
            return;
        } else {
            openModal("添加设备", configMap.path + configMap.addyqJsp, "addYq", function () {
                var data = {};//创建json数组
                var yqdata = addYqjcList.getYqData();//获得仪器的数据
                var yqids = yqdata.yqids;//获得仪器的id
                if (yqids.length == 0) {
                    Messenger().post({
                        message: "请选择设备数据!",
                        type: "warning"
                    });
                    return;
                }
                data.yqids = yqids.join(",");//获得仪器的id
                data.yqnames = yqdata.sbmcs.join(",");//获得仪器的名称
                var flag = false;
                jqueryMap.$container.find('[name="ypjcche"]:checked').each(function () {
                    var el = $(this);
                    var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
                    data.jcxmid = configMap.initGridypjcedit.row(rowIndex).data().jcxmid;
                    data.ypid = configMap.id;
                    var tbcel = $(el).parent().parent().children("td:eq(3)");
                    $.ajax({
                        url: configMap.path + configMap.addyqUrl,
                        data: data,
                        type: "POST",
                        async: false,
                        success: function (data) {
                            flag = data.success;
                            configMap.initGridypjcedit.cell(tbcel).data(yqdata.sbmcs);
                        },
                        error: function (data) {
                            configMap.initGridypjcedit.ajax.reload();
                            flag = false;
                        }
                    });
                });
                if (flag) {
                    jqueryMap.$Dialog.modal('hide');
                    Messenger().post({
                        message: "添加设备成功",
                        type: "success"
                    });
                } else {
                    Messenger().post({
                        message: "添加设备失败!",
                        type: "error"
                    });
                }
            }, "large");
        }
    }

    //单 检测值比较 是否合格
    var jianCeZhiBJ = function () {

        var jcx;
        var jcz;
        var if_tjzt = true;//判断检测项是否检测
        var el = $(this);
        var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
        var jcx = configMap.initGridypjcedit.row(rowIndex).data().jcx;
        // var jcz = configMap.initGridypjcedit.row(rowIndex).data().jcz;
        var jcz =  $(el).parent().parent().children("td:eq(8)").children().val();//检测值
        var zongshu = configMap.initGridypjcedit.row(rowIndex).data().zongshu;
        jcx = jcx;
        jcz = jcz;

        if (zongshu > 1) {
            if_tjzt = false;
            return;
        }
        if (if_tjzt) {
            if (jcx >= jcz){
                Messenger().post({
                    message: "检测项合格!",
                    type: "warning"
                });
            }else{
                Messenger().post({
                    message: "检测项不合格!",
                    type: "warning"
                });
            }
        }
    }
    //20190917添加单 检测值比较 是否合格
    var jcjgZdjs = function () {

        var count=0;
        var zsl = $('input[name="ypjcche"]:checked', jqueryMap.$container).length;
        //遍历每一个名字为ypjcche的复选框，其中选中的执行计算函数
        $('input[name="ypjcche"]:checked', jqueryMap.$container).each(function () {
            var dd = $(this);
            var rowIndex    = configMap.initGridypjcedit.cell(dd.parent()).index().row;
            var jcxTemp     = $(dd).parent().parent().children("td:eq(4)").children().val();//检出限
            var jcx_bjf     = configMap.initGridypjcedit.row(rowIndex).data().BJF;//检测项目比较符
            var xlzTemp     = $(dd).parent().parent().children("td:eq(7)").children().val();//限量值
            var jczTemp     = $(dd).parent().parent().children("td:eq(8)").children().val();//检测值
            var jcxmjlTemp  = $(dd).parent().parent().children("td:eq(14)").children().val();//结论
            //检测结论不为空 则 进行计算，为空说明已经人为进行选择，不进行计算
            var jsJcjl="";
            //if(jcxmjlTemp==null || jcxmjlTemp=="")
            {
                console.log("jcx_bjf="+jcx_bjf+"==");
                //比较符号 如果空,则不能计算结论 跳过 这个选项。比较符是空  需要人工选择
                if(jcx_bjf!=null && jcx_bjf!="" && jcx_bjf.length!=0)
                {
                    //判断字符串是否为数字  正则表达式
                    var re = /^[0-9]+.?[0-9]*$/;
                    //判断限量值和检测值必须都是数字类型才能进行计算
                    if (re.test(xlzTemp) && re.test(jczTemp)) {
                        //进入这里说明符合以下几个条件
                        //1、检测结论 是空
                        //2、有比较符号
                        //3、限量值和检测值不是空并且是数字 可以计算
                        // console.log("jcx_bjf="+jcx_bjf);
                        //小于等于判定
                        if(jcx_bjf=="≤")
                        {
                            jsJcjl = (jczTemp*1<=xlzTemp*1)?"1":"0"; //1合格 0  不合格
                        }else if(jcx_bjf=="≥")
                        {
                            jsJcjl = (jczTemp*1>=xlzTemp*1)?"1":"0"; //1合格 0  不合格
                        }else if(jcx_bjf=="<")
                        {
                            jsJcjl = (jczTemp*1<xlzTemp*1)?"1":"0"; //1合格 0  不合格
                        }else if(jcx_bjf==">")
                        {
                            jsJcjl = (jczTemp*1>xlzTemp*1)?"1":"0"; //1合格 0  不合格
                        }
                        // console.log("自动计算结论="+jsJcjl);
                        // console.log("第"+count+"个结束");
                        count++;
                        var jlSelect = $(dd).parent().parent().children("td:eq(14)").children();
                        $(jlSelect).find("option[value = '"+jsJcjl+"']").prop("selected",true)
                    }
                }
            }
        });
        console.log("zsl="+zsl+"===count="+count);
        if(zsl!=count)
        {
            Messenger().post({
                message: "部分样品没有比较符或限量值、检测值非数字需要手动选择检测结论!",
                type: "error"
            });
        }
    }
    return {
        // 初始化
        init: function (id, uuid) {
            configMap.id = id;
            configMap.uuid = uuid;
            setJqueryMap();
            initlistGrid();
            $("#jcxSeach", jqueryMap.$container).off('click').on('click', function () {//查询
                jcxSeach();
            });
            $("#jcxReast", jqueryMap.$container).off('click').on('click', function () {//重置
                jcxReast();
            });
            $("#jcxYq", jqueryMap.$container).off('click').on('click', function () {//增加仪器
                addYq();
            });
            $("[name='tjzt']", jqueryMap.$container).off('change').on('change', function () {//下拉触发事件
                configMap.initGridypjcedit.ajax.reload();
            });
            $("[name='bzzt']", jqueryMap.$container).off('change').on('change', function () {//下拉触发事件
                configMap.initGridypjcedit.ajax.reload();
            });
            $("[name='ck']", jqueryMap.$container).on('click', function () {//多选反选
                if ($("[name='ck']", jqueryMap.$container).prop("checked")) {
                    //选中
                    $("[name='ypjcche']", jqueryMap.$container).prop("checked", true);
                } else {
                    $("[name='ypjcche']", jqueryMap.$container).prop("checked", false);
                }
            });
            //20190917添加自动计算
            $("#zdjsBut", jqueryMap.$container).off('click').on('click', function () {//自动计算检测结果
                jcjgZdjs();
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        save: function (callback) {
            save(callback);
        },
        getBzwz:function(){
            return configMap.m_bzwz;
        }

    };
}();
