var jcxxlrList = function () {
    'use strict';
    var prefix = 'jcgl/jcxxlr';
    // 全局属性参数
    var configMap = {
        dataUrl: '/' + prefix + '/queryJcxxlrList',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        saveYpjcUrl: '/ypjc/updateJcxxlr',
        addyqUrl: '/ypjc/addYq',
        addyqJsp: '/jcgl/ypjc/addYq.jsp',
        sendMessage:"/ypjc/sendMessage",
        startUrl:"/jcxxlr/start",
        endUrl:"/jcxxlr/end",
        countWsd:"/jcxxlr/countWsd",
        jcxxlrListGrid: null,
        path: '',
        uuid: '',
        xlz: '',
        jclbdm:''
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $manualdata: null,
        $Dialog: null
    };
    //赋值
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#' + uuid + '-ypjcJcxxlr-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$manualdata = jqueryMap.$container.find('#jcxxlr_List');
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
        configMap.jcxxlrListGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            /*  "scrollX": true,//水平滚动*/
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method": "POST",
                "data": function (data) {
                    data.jcxmc = $('[name="jcxmc"]', jqueryMap.$container).val();
                    data.ypmc = $('[name="ypmc"]', jqueryMap.$container).val();
                    data.ypbm = $('[name="ypbm"]', jqueryMap.$container).val();
                    data.tjzt = $('[name="tjzt"]', jqueryMap.$container).val();
                    data.jclbdm = configMap.jclbdm;
                }
            },
            "columns": [
                {
                    class: "text-left",
                    "data": "jcxmid",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="jcxxlr_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypid",
                    "render": function (data, type, row) {
                        return '<input style="display: none" type="text" name="ypid"  value=' + data + '>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypbm",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "ypmc",
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
                    "data": "jcxmc",
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
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "xlz",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        /*  configMap.xlz=data;*/
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcz",
                    "render": function (data, type, row) {
                        /*  if (data != null) {
                              return '<input type="number" name="jcz"  value=' + data + '>';
                          } else {
                              return '<input type="number" name="jcz" value='+configMap.xlz+'>';
                          }*/
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                      class: "text-center",
                      "data": "wd",
                      "render": function (data, type, row) {
                         if (data != null && data != undefined && data != "") {
                              var arr = [];
                              arr = data.split("-");
                              var data1 = arr[0];
                              var data2 = arr[1];
                              return '<input type="number" style="width: 40px" id="wd1_id" name="wd1"  value=' + data1 + '> - <input type="number" style="width: 40px" id="wd2_id" name="wd2"  value=' + data2 + '>';
                          } else {
                              return '<input type="number"  style="width: 40px" id="wd1_id" name="wd1" Value=18> - <input type="number" style="width: 40px" id="wd2_id" name="wd2" Value=22>';
                          }
                       /*   data = delnull(data);
                          return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';*/
                      }
                  },

                  {
                      class: "text-center",
                      "data": "sd",
                      "render": function (data, type, row) {
                          if (data != null) {
                              var arr = [];
                              arr = data.split("-");
                              var data1 = arr[0];
                              var data2 = arr[1];
                              return '<input type="number" style="width: 40px" id ="sd1_id" name="sd1"  value=' + data1 + '> - <input type="number" style="width: 40px" id ="sd2_id" name="sd2"  value=' + data2 + '>';
                          } else {
                              return '<input type="number" style="width: 40px" id ="sd1_id" name="sd2" Value=45> - <input type="number" style="width: 40px" id ="sd2_id" name="sd2" Value=55>';
                          }
                       /*   data = delnull(data);
                          return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';*/
                      }
                  },
                /*  {
                      class: "text-center",
                      "data": "jcff",
                      "render": function (data, type, row) {
                          if (data != null) {
                              return '<input type="text" name="jcff"  value=' + data + '>';
                          } else {
                              return '<input type="text" name="jcff"  placeholder="请输入检测方法" >';
                          }
                      }
                  },*/
                // {
                //     class: "text-center",
                //     "data": "s_date",
                //     "render": function (data, type, row) {
                //         /* if (data != null) {
                //              data = moment(data).format('YYYY-MM-DD');
                //              return '<input type="date" name="lrrq" value="' + data + '">';
                //          } else {
                //              return '<input type="date" name="lrrq"  placeholder="请输入检测日期">';
                //          }*/
                //         data = delnull(data);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                //     }
                //
                // },
                // {
                //     class: "text-center",
                //     "data": "e_date",
                //     "render": function (data, type, row) {
                //         /*  if (data != null) {
                //               data = moment(data).format('YYYY-MM-DD');
                //               return '<input type="date" name="lrrq" value="' + data + '">';
                //           } else {
                //               return '<input type="date" name="lrrq"  placeholder="请输入检测日期">';
                //           }*/
                //         data = delnull(data);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                //     }
                //
                // },
                {
                    class: "text-center",
                    "data": "tjzt",
                    "render": function (data, type, row) {
                        if (data == '0') {
                            data = "未递交";
                            return '<span style="display: inline-block;color:red;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                        } else if (data == '1') {
                            data = "已递交";
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                        } else {
                            data = "";
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                        }

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
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

            }
        });
    }

    /*若参考值不为数字，那可输入任何值*/
    function checkNumber(biaozhun) {
        var reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(biaozhun)) {
            return true;
        }
        return false;
    }

    //检测值录入保存操作
    var save = function () {
        var strArr = [];
        var flag = false;//立一个flag
        var if_tjzt = false;//提交状态
        var messages=[];//消息的集合
        jqueryMap.$container.find('[name="jcxxlr_checkbox"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.jcxxlrListGrid.cell(el.parent()).index().row;
            var jcxmid = configMap.jcxxlrListGrid.row(rowIndex).data().jcxmid;
            var tjzt = configMap.jcxxlrListGrid.row(rowIndex).data().tjzt;
            strArr.push(jcxmid);
            if(tjzt!='0'){
                if_tjzt=true;
                return;
            }

        });
        if (strArr.length == 0) {
            Messenger().post({
                message: "请选择提交数据!",
                type: "warning"
            });
            return;
        }
        else if (if_tjzt){
            Messenger().post({
                message: "检测项已提交!",
                type: "warning"
            });
            return;
        }
        else {
            bootbox.dialog({
                title: '提示',
                message: '确定要提交检测项目？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-success borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在保存数据...'
                            });
                            var lrflag1 = false;//录入成功提示
                            $('input[name="jcxxlr_checkbox"]:checked', jqueryMap.$container).each(function () {//遍历每一个名字为ypjcche的复选框，其中选中的执行函数
                                var dd = $(this);
                                var rowIndex = configMap.jcxxlrListGrid.cell(dd.parent()).index().row;
                                var ypbm = configMap.jcxxlrListGrid.row(rowIndex).data().ypbm;//样品编码
                                var ypmc = configMap.jcxxlrListGrid.row(rowIndex).data().ypmc;//样品名称
                                var jcxmc= configMap.jcxxlrListGrid.row(rowIndex).data().jcxmc;//检测项名称
                                var message=ypbm+"-"+ypmc+"-"+jcxmc;
                                messages.push(message);//放入消息集合中
                                var wd1 =$(dd).parent().parent().children("td:eq(9)").children("input:eq(0)").val();
                                var wd2 =$(dd).parent().parent().children("td:eq(9)").children("input:eq(1)").val();
                                // console.log(wd1);
                                wd1.trim();
                                wd2.trim();
                                var sd1 =$(dd).parent().parent().children("td:eq(10)").children("input:eq(0)").val();
                                var sd2 =$(dd).parent().parent().children("td:eq(10)").children("input:eq(1)").val();
                                sd1.trim();
                                sd2.trim();
                                var wd = wd1+'-'+wd2;
                                var sd = sd1+'-'+sd2;
                                var data = [
                                    {
                                        /* jcz: $(dd).parent().parent().children("td:eq(7)").children().val(),//检测值*/
                                         wd: wd,//温度
                                         sd: sd,//湿度
                                        //jcff: $(dd).parent().parent().children("td:eq(8)").children().val(),//检测方法
                                        /*s_date: $(dd).parent().parent().children("td:eq(8)").children().val(),//检测开始日期
                                        e_date: $(dd).parent().parent().children("td:eq(9)").children().val(),//检测结束日期*/
                                        tjzt:"1",//提交状态   1  已提交
                                        ypid: $(dd).parent().parent().children("td:eq(1)").children().val(),//样品id
                                        jcxmid: $(dd).val()//检测项id
                                    }
                                ];
                                var str_json = JSON.stringify(data);
                                $.ajax({
                                    url: configMap.path + configMap.saveYpjcUrl,
                                    type: 'POST',
                                    data: {"questionsList": str_json},
                                    async: false,
                                    success: function (d) {
                                        if (d.success) {
                                            Messenger().post({
                                                message: "保存成功",
                                                type: "success"
                                            });
                                            configMap.jcxxlrListGrid.ajax.reload();
                                            App.unblockUI(jqueryMap.$blockTarget);
                                            $.post(configMap.path+configMap.sendMessage,{messages:messages.join(",")},function (data) {
                                                if(data.success){
                                                    console.log("发送消息成功");
                                                }else {
                                                    console.log("发送消息失败");
                                                }
                                            });
                                        } else {
                                            Messenger().post({
                                                message: "保存失败!",
                                                type: "error"
                                            });
                                            App.unblockUI(jqueryMap.$blockTarget);
                                        }

                                    },
                                    error: function () {
                                        Messenger().post({
                                            message: "保存失败!",
                                            type: "error"
                                        });
                                        App.unblockUI(jqueryMap.$blockTarget);
                                    }
                                });
                            });


                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }
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
                buttons: dialogButtons,
                size: size
            });
        });
    };
    //添加仪器
    var addYq = function () {
        var strArr = [];
        jqueryMap.$container.find('[name="jcxxlr_checkbox"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.jcxxlrListGrid.cell(el.parent()).index().row;
            var jcxmid = configMap.jcxxlrListGrid.row(rowIndex).data().jcxmid;
            strArr.push(jcxmid);
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
                jqueryMap.$container.find('[name="jcxxlr_checkbox"]:checked').each(function () {
                    var el = $(this);
                    var rowIndex = configMap.jcxxlrListGrid.cell(el.parent()).index().row;
                    data.jcxmid = configMap.jcxxlrListGrid.row(rowIndex).data().jcxmid;
                    data.ypid = configMap.jcxxlrListGrid.row(rowIndex).data().ypid;
                    $.ajax({
                        url: configMap.path + configMap.addyqUrl,
                        data: data,
                        type: "POST",
                        async: false,
                        success: function (data) {
                            flag = data.success;
                        },
                        error: function (data) {
                            configMap.jcxxlrListGrid.ajax.reload();
                            flag = false;
                        }
                    });
                });
                if (flag) {
                    configMap.jcxxlrListGrid.ajax.reload();
                    jqueryMap.$Dialog.modal('hide');
                    Messenger().post({
                        message: "添加设备成功",
                        type: "success"
                    });
                } else {
                    configMap.jcxxlrListGrid.ajax.reload();
                    Messenger().post({
                        message: "添加设备失败!",
                        type: "error"
                    });
                }
            }, "large");
        }
    }
    var start = function () {//开始检测
        var data = {};
        var strArr=[];
        jqueryMap.$container.find('[name="jcxxlr_checkbox"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.jcxxlrListGrid.cell(el.parent()).index().row;
            var jcxmid = configMap.jcxxlrListGrid.row(rowIndex).data().jcxmid;
            strArr.push(jcxmid);
        });
        if(strArr.length==0){
            Messenger().post({
                message: "请选择检测项目!",
                type: "warning"
            });
            return;
        }
        Messenger().post({
            message: "开始检测中......",
            type: "success"
        });
        $.ajax({
            url: configMap.path + configMap.countWsd,
            type: "POST",
            async:false,
            success: function (data) {

            }
        });
        jqueryMap.$container.find('[name="jcxxlr_checkbox"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.jcxxlrListGrid.cell(el.parent()).index().row;
            data.jcxmid = configMap.jcxxlrListGrid.row(rowIndex).data().jcxmid;
            data.ypid = configMap.jcxxlrListGrid.row(rowIndex).data().ypid;
            $.ajax({
                url: configMap.path + configMap.startUrl,
                data: data,
                type: "POST",
                success: function (data) {

                }
            });
        });

    }
    var end = function () {//结束检测
        $.ajax({
            url: configMap.path + configMap.endUrl,
            type: "POST",
            success: function (data) {
                if(data.success){
                    Messenger().post({
                        message: "保存成功",
                        type: "success"
                    });
                }else {
                    Messenger().post({
                        message: "保存失败!",
                        type: "error"
                    });
                }
                configMap.jcxxlrListGrid.ajax.reload();
            },
            error: function (data) {
                Messenger().post({
                    message: "保存失败!",
                    type: "error"
                });
                configMap.jcxxlrListGrid.ajax.reload();
            }
        });
    }
    return {
        init: function (uuid,jclbdm) {
            configMap.uuid = uuid;
            configMap.jclbdm = jclbdm;
            setJqueryMap(uuid);
            initlistGrid();
            $('[name="ck"]', jqueryMap.$container).on('click', function () {
                if ($('[name="ck"]', jqueryMap.$container).prop("checked")) {
                    //选中
                    $('[name="jcxxlr_checkbox"]', jqueryMap.$container).prop("checked", true);
                } else {
                    $('[name="jcxxlr_checkbox"]', jqueryMap.$container).prop("checked", false);
                }
            });
            jqueryMap.$container.find("#jcxxlrSeach").on("click", function () {//查询
                configMap.jcxxlrListGrid.ajax.reload();
            });
            jqueryMap.$container.find("#jcxxlrReast").on("click", function () {//重置
                $('[name="jcxmc"]', jqueryMap.$container).val("");
                $('[name="ypmc"]', jqueryMap.$container).val("");
                $('[name="tjzt"]', jqueryMap.$container).val("");
                configMap.jcxxlrListGrid.ajax.reload();
            });
            jqueryMap.$container.find("[name='tjzt']").on("change", function () {//下拉触发事件
                configMap.jcxxlrListGrid.ajax.reload();
            });
            jqueryMap.$container.find("#jcxxlrSave").on("click", function () {//提交
                save();
            });
            jqueryMap.$container.find("#jcxxlrAddYq").on("click", function () {//添加仪器
                addYq();
            });
            jqueryMap.$container.find("#jcxxlrStart").on("click", function () {//开始检测
                start();
            });
            jqueryMap.$container.find("#jcxxlrEnd").on("click", function () {//结束检测
                end();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    }
}();