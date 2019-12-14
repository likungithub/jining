var zbkszb = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        jcxmids: [],
        ckeds:[],
        ids: [],
        id: '',
        path: '',
        uuid: '',
        initGridypjcedit: null,
        xlz: null,
        m_bzwz :'',
        zbzs:'0',
        ypids: "",
        zbksid:'',
        wtids:'',
        ypmcs:''
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
            "ajax": {
                "dataSrc": "aaData",
                "url":  "customermanage/ypglZbxx/getKsList?ypids="+configMap.id,
                "method": "POST",
                "data": function (data) {
                }
            },
            "columns": [
                {
                    class: "text-center",
                    "data": "zbks_dm",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        configMap.zbksid = data;
                        return '<input type="hidden" name="zbks_dm"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbzs",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        if((data*1)>0)
                        {
                            configMap.zbzs =data;
                        }
                        return '<input type="hidden" name="zbzs"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbks_mc",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbzl",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        if(configMap.zbksid=='999')//说明是总数量
                        {
                            data = configMap.zbzs;
                        }
                        return '<input type="text" name="zbsl"  data-type="zbsl" id="zbslid"  style="width: 50px;" value=' + data + '>';
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
            }
        });
    };



    var checkRate = function (nubmer) {
        var re = /^[0-9]+[0-9]*]*$/;    // /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/

        if (!re.test(nubmer)) {
            alert("请输入数字");
            return false;
        }
        return true;
    };


    var save = function (callback) { //检测值录入保存操作
        var strArr = [];
        var sumsl = 0;//制备数量累计值，用于 判断是否没填
        var zslbz=false;
        var szbz=false;
        /////这里加  录入内容如果有文本，结论没选择 必须强制选择结论
        $('input[name="zbks_dm"]', jqueryMap.$container).each(function () {//遍历每一个名字为ypjcche的复选框，其中选中的执行函数
            var dd = $(this);
            var rowIndex    = configMap.initGridypjcedit.cell(dd.parent()).index().row;
            var zbks_dm     = $(dd).parent().parent().children("td:eq(0)").children().val();// 制备科室 代码
            var zbzl  = $(dd).parent().parent().children("td:eq(3)").children().val();//    制备质量 数据量
            if (!checkRate(zbzl)) {
                szbz=true;
                return;
            }
            if(zbks_dm=='999')
            {
                $("#lrzsl").val(zbzl);
            }
            //判断检测 结论是否为空
            if(zbks_dm!=null && zbks_dm!='999')
            {
                sumsl = (sumsl*1)+(zbzl*1);
            }else if(zbks_dm=='999' && (zbzl=="0" || zbzl==""))
            {
                zslbz=true;
                return;
            }
        });

        if(szbz)
        {
            Messenger().post({
                message: "样品数量只能是数字！",
                type: "warning"
            });
            return  false;
        }
        if(sumsl==0)
        {
            Messenger().post({
                message: "至少要为一个检测科室拆分样品数量！",
                type: "warning"
            });
            return  false;
        }
        if(zslbz)
        {
            Messenger().post({
                message: "总数量必须要填写！",
                type: "warning"
            });
            return  false;
        }
//////////////////////////////////////////////

        jqueryMap.$Dialogts = bootbox.dialog({
            title: '提示',
            message: '确定要提交拆分信息？',
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

                        $.ajax({
                            url: "customermanage/ypglZbxx/addYpzbList",//
                            type: 'POST',
                            data: $('#zbksform').serialize(),
                            async: false,
                            success: function (data) {
                                jqueryMap.$Dialogts.modal("hide");
                                if (data.success) {
                                    jcflag1 = true;
                                    Messenger().post({
                                        message: "拆分完成",
                                        type: "success"
                                    });
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    callback(true);
                                } else {
                                    jcflag1 = false;
                                    Messenger().post({
                                        message: "拆分失败!",
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
                    }
                },
                cancel: {
                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                    className: 'btn btn-default borderRadius4'
                }
            }
        });
        return false;
    };

    return {
        // 初始化
        init: function (id, uuid) {
            configMap.id = id;
            configMap.uuid = uuid;
            setJqueryMap();
            initlistGrid();

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
        },
        setData:function(ypids,wtids,ypmcs){
            configMap.ypids =ypids;
            configMap.wtids =wtids;
            configMap.ypmcs =ypmcs;
        }
    };
}();
