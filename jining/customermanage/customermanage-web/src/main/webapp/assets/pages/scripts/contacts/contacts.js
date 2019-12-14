var contacts = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',//
        dataUrl: '/contacts/contacts',//Controller类中的 @RequestMapping路径/方法名上方的@RequestMapping(value = "????", method = RequestMethod.GET)
        cylxrUrl:"/maillist/getAllMailList/",
        addlxrUrl:"/maillist/addMailList/",
        delUrl:"/maillist/delMailList/",
        dqlxrUrl:"/maillist/getMailListById/",
        changeUrl:"/maillist/editMailList/",
        queryUrl:"/maillist/getMailListByKeyWord",
        delAll:"/maillist/delMailLists/",
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        contactsGrid: null,
        cylxrGrid:null,
        idList:""
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null
    };
    //赋值
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#contacts-manager-container' + '_' + uuid);
        jqueryMap.$blockTarget = $('body');
    };
    //员工信息
    //初始化表
    var initcontactsData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.contactsGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.contactsGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    //初始化表，放入数据
    var initcontactsGrid = function () {
        configMap.contactsGrid = $('#contacts_data', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columns": [
                {"data": "name"},//table 列对应的字段名称
                {"data": "tel"},
                {"data": "yddh"},
                {"data": "email"},
                {"data": "qq"}
//				{
//					"render": function (data, type, row) {
//		                return ''
//		                  + configMap.editBtn_html
//		                  + configMap.deleteBtn_html
//		                  + configMap.viewBtn_html;
//		              }
//				}
            ],
			"language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
			},
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

            }
        });
    };

    //常用联系人
    //初始化表
    var initCylxrData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.cylxrUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.cylxrGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.cylxrGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    //初始化表，放入数据
    var initCylxrGrid = function () {
        configMap.cylxrGrid = $('#cylxr_data', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy":true,
            //"destroy": true,
            "pageLength": 50,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "ajax": {
                "url":configMap.path+configMap.cylxrUrl  ,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.searchText = $('.lxrQuery').val();
                }
            },
            "columns": [
                {
                    "data": "id"   ,
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox" id="ygCheck" value="' + row.id + '"/>';
                    }
                },//table 列对应的字段名称
                {
                    "data": "lxrhdw",
                    "className":"text-left",
                },
                {
                    "data": "sjhm",
                    "className":"text-center",
                },
                {
                    "data": "bgdh",
                    "className":"text-center",

                },
                {
                    "data": "qq",
                    "className":"text-center",
                },
                // {"data": "dzyx"},
                {
                    "data": "lxdz",
                    "className":"text-left",
                },
                {
                    "data": "bzxx",
                    "className":"text-left",
                },
                {
                    "data": "dljg_bm",
                    "className":"text-center",
                    "render": function (data, type, row) {
                        return '<button data-type="pgtj_edit" style="border: none;z-index: 10;background: transparent;outline: none;"><a href="javascript:;" class="bjcylxr btn btn-xs default" data-type="edit" data-toggle="tooltip" title="" data-original-title="编辑"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a></button><a href="javascript:;" class="sccylxr btn btn-xs default" data-type="del" data-toggle="tooltip" title="" data-original-title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>';
                    }
                }
            ],
            "language": {
                "zeroRecords": "暂时没有客户",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有客户",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                if ($(".sccylxr")) {
                    // $(".sccylxr").tooltip();
                    $(".sccylxr").confirmation({
                        "title": '是否确定要删除当前联系人？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delCylcr,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                $(".bjcylxr").off("click").on("click",function () {
                    localStorage.setItem("viewData",1)
                    var thisDom = $(this)
                    addcylxr(thisDom);
                })
                //全选
                //点击选择所有
                $('#selectAll').change(function (){
                    var el = $(this);
                    selectAll(el.is(':checked'));
                });
                //单个checkbox点击
                jqueryMap.$container.find('[name="checkbox_checkbox"]').change(function (){

                    //当前被点击的checkbox
                    var el = $(this);
                    //获取当前被点击的checkbox数量
                    var n = $('[name="checkbox_checkbox"]:checked',jqueryMap.$container).length;
                    //获取所有可以被点击的checkbox数量
                    var all = $('[name="checkbox_checkbox"]',jqueryMap.$container).not(":disabled").length;
                    //如果两个数量一样，设置选择所有的checkbox属性为被点击，否则为不被点击
                    if(n==all){
                        jqueryMap.$container.find('[name="selectAll"]').prop("checked",true);
                    }else{
                        jqueryMap.$container.find('[name="selectAll"]').prop("checked",false);
                    }
                    var temp = null;
                    var key = $(this).attr('value');
                    // 如果当前checkbox被点击
                    // 如果为被选中，则将客户编码放如json数组中
                    if($(this).is(":checked")){
                        configMap.idList += key+",";

                    }else{
                        //如果取消选择，将此项移除
                        if(configMap.idList.indexOf(key)!=-1){
                            configMap.idList = configMap.idList.replace(key+",", "");
                        }
                    }
                    console.log(configMap.idList)
                });
            }
        });
    };


    //全选
    var selectAll = function (status){
        $('[type="checkbox"]').not(":disabled").prop("checked",status);
        var inputjson = $('[type="checkbox"]:checked').not(jqueryMap.$container.find('[name="selectAll"]'));
        var temp = null;
        configMap.idList="";
        $(inputjson).each(function(index){
            configMap.idList += $(this).attr('value') + ",";

        });
        console.log(configMap.idList)
    };

    var addcylxr = function (data) {
        var thisBtn = data;
        var dialogButtons = {};
        // dialogButtons.success = {
        //     label: '保存',
        //     className: "btn btn-success btnBlue borderRadius4 colorfff cjbzBtn",
        //     callback: function () {
        //         var phoneNum = whetherOrNotMobil($("input[name='phoneNum']").val());
        //         if($("input[name='lxr']").val()==""){
        //             AppAlert("联系人或单位不能为空！");
        //             return false;
        //         }else if(phoneNum==false){
        //             AppAlert("请输入正确的手机号码！");
        //             return false;
        //         }else{
        //             console.log(32132143242);
        //             var data = {
        //                 "lxrhdw":$("input[name='lxr']").val() ,
        //                 "lxdz":$("input[name='address']").val() ,
        //                 "bgdh":$("input[name='telNum']").val(),
        //                 "sjhm":$("input[name='phoneNum']").val(),
        //                 "dzyx":$("input[name='EmailNum']").val(),
        //                 "qq":$("input[name='QQNum']").val(),
        //                 "bzxx":$("textarea[name='bzxx']").val()
        //             }
        //             console.log(21321321,addLxr(data));
        //             return addLxr(data);
        //             // return false;
        //         }
        //         return false;
        //     }
        // };
        // dialogButtons.cancle = {
        //     label: '取消',
        //     className: 'btn btn btn btn-default borderRadius4',
        //     callback: function () {
        //         // alert("取消")
        //     }
        // };
        if(localStorage.getItem("viewData")==0){
            dialogButtons.success = {
                label: '保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff cjbzBtn",
                callback: function () {

                    if($('input[name="QQNum"]',$('#addlxrForm')).val().trim()){
                        var tag = whetherOrNotQQ($('input[name="QQNum"]',$('#addlxrForm')).val());
                        if (!tag){
                            AppAlert("您输入的QQ号码格式不正确");
                            return false;
                        }
                    }
                    if($('input[name="EmailNum"]',$('#addlxrForm')).val().trim()){
                        var tag = whetherOrNotEmail($('input[name="EmailNum"]',$('#addlxrForm')).val());
                        if (!tag){
                            AppAlert("您输入的Email格式不正确");
                            return false;
                        }
                    }

                    var phoneNum = whetherOrNotMobil($("input[name='phoneNum']").val())
                    if($("input[name='lxr']").val()==""){
                        AppAlert("联系人或单位不能为空！");
                        return false;
                    }else if(phoneNum==false){
                        AppAlert("请输入正确的手机号码！");
                        return false;
                    }else{
                        var data = {
                            "lxrhdw":$("input[name='lxr']").val() ,
                            "lxdz":$("input[name='address']").val() ,
                            "bgdh":$("input[name='telNum']").val(),
                            "sjhm":$("input[name='phoneNum']").val(),
                            "dzyx":$("input[name='EmailNum']").val(),
                            "qq":$("input[name='QQNum']").val(),
                            "bzxx":$("textarea[name='bzxx']").val()
                        }
                        return addLxr(data);
                    }
                    // return false;
                }
            };
            dialogButtons.cancle = {
                label: '取消',
                className: 'btn btn btn btn-default borderRadius4',
                callback: function () {
                    // alert("取消")
                }
            };
            $.get("/customermanage/contacts/cylxrView.jsp", function (html) {
                bootbox.dialog({
                    title: '添加常用联系方式',
                    message: html,
                    buttons: dialogButtons
                })

            })
        }else{
            dialogButtons.success = {
                label: '保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff cjbzBtn",
                callback: function () {

                    if($('input[name="QQNum"]',$('#addlxrForm')).val().trim()){
                        var tag = whetherOrNotQQ($('input[name="QQNum"]',$('#addlxrForm')).val());
                        if (!tag){
                            AppAlert("您输入的QQ号码格式不正确");
                            return false;
                        }
                    }
                    if($('input[name="EmailNum"]',$('#addlxrForm')).val().trim()){
                        var tag = whetherOrNotEmail($('input[name="EmailNum"]',$('#addlxrForm')).val());
                        if (!tag){
                            AppAlert("您输入的Email格式不正确");
                            return false;
                        }
                    }

                    var phoneNum = whetherOrNotMobil($("input[name='phoneNum']").val());
                    if($("input[name='lxr']").val()==""){
                        AppAlert("联系人或单位不能为空！");
                        return false;
                    }else if(phoneNum==false){
                        AppAlert("请输入正确的手机号码！");
                        return false;
                    }else{
                        var data = {
                            "lxrhdw":$("input[name='lxr']").val() ,
                            "lxdz":$("input[name='address']").val() ,
                            "bgdh":$("input[name='telNum']").val(),
                            "sjhm":$("input[name='phoneNum']").val(),
                            "dzyx":$("input[name='EmailNum']").val(),
                            "qq":$("input[name='QQNum']").val(),
                            "bzxx":$("textarea[name='bzxx']").val()
                        }
                        console.log(changeLxr(thisBtn,data),'mdw2132131321');
                        return changeLxr(thisBtn,data);
                        // return false;
                    }
                     // return false;
                }
            };
            dialogButtons.cancle = {
                label: '取消',
                className: 'btn btn btn btn-default borderRadius4',
                callback: function () {
                    // alert("取消")
                }
            };

            $.get("/customermanage/contacts/cylxrView.jsp", function (html) {
                bootbox.dialog({
                    title: '编辑常用联系方式',
                    message: html,
                    buttons: dialogButtons
                })

                xglxr(thisBtn);

            })
        }

    }
    //编辑当前联系人
    var xglxr = function (el) {
        var rowIndex = configMap.cylxrGrid.cell(el.closest('td')).index().row;
        var id = configMap.cylxrGrid.row(rowIndex).data().id;

        $.ajax({
            url: configMap.path + configMap.dqlxrUrl + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                console.log(datas)
                $("input[name='lxr']").val(datas.lxrhdw) ,
                $("input[name='address']").val(datas.lxdz) ,
                $("input[name='telNum']").val(datas.bgdh),
                $("input[name='phoneNum']").val(datas.sjhm),
                $("input[name='EmailNum']").val(datas.dzyx),
                $("input[name='QQNum']").val(datas.qq),
                $("textarea[name='bzxx']").val(datas.bzxx)
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }

    //添加联系人
    var addLxr = function (data) {
        var tag = 0;
        $.ajax({
            url: configMap.path + configMap.addlxrUrl,
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            async:false,
            type: 'post',
            data:JSON.stringify(data),
            success: function (datas) {
                if(!datas.success){
                    tag = 1;
                    AppAlert(datas.message);
                    return false;
                }
                Messenger().post({
                    message: "添加常用联系人成功！",
                    type: 'success'
                });
               /* $.ajax({
                    url: configMap.path + configMap.cylxrUrl,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (datas) {
                        console.log(datas)
                        configMap.cylxrGrid.clear().draw();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.cylxrGrid.rows.add(datas).draw();
                        }
                    },
                    error: function () {
                        return App.unblockUI(jqueryMap.$blockTarget);
                    }
                });*/
               configMap.cylxrGrid.ajax.reload();
            },
            error: function () {
                Messenger().post({
                    message: "保存失败！",
                    type: 'error'
                });
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
      if(tag){
          console.log('mdw');
          return false;
      }

    }
    //编辑联系人
    var changeLxr = function (el,data) {
        var tag1 = 0;
        var rowIndex = configMap.cylxrGrid.cell(el.closest('td')).index().row;
        var id = configMap.cylxrGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.changeUrl + id,
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            async:false,
            type: 'post',
            data:JSON.stringify(data),
            success: function (datas) {
                console.log(datas);
                if(!datas.success){
                    tag1 = 1;
                    AppAlert(datas.message);
                    return false;
                }

                Messenger().post({
                    message: "修改常用联系人成功！",
                    type: 'success',
                    id:'23123sweqew'
                });
               /* $.ajax({
                 url: configMap.path + configMap.cylxrUrl,
                 dataType: 'JSON',
                 type: 'GET',
                 success: function (datas) {
                 console.log(datas)
                 configMap.cylxrGrid.clear().draw();
                 App.unblockUI(jqueryMap.$blockTarget);
                 if (datas.length > 0) {
                 return configMap.cylxrGrid.rows.add(datas).draw();
                 }
                 },
                 error: function () {
                 return App.unblockUI(jqueryMap.$blockTarget);
                 }
                 });*/
               configMap.cylxrGrid.ajax.reload();
            },
            error: function () {
                Messenger().post({
                    message: "保存失败！",
                    type: 'error'
                });
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });

        if(tag1){
            return false;
        }
    }
    var AppAlert = function(msg){
        App.alert({
            container: $("#addlxrForm").closest(".modal-body"),
            place: 'prepend',
            type: 'danger',
            closeInSeconds:3,
            message: msg,
            icon: 'fa fa-warning'
        });
    };


    //删除常用联系人
    var delCylcr = function (event,el) {
        var rowIndex = configMap.cylxrGrid.cell(el.closest('td')).index().row;
        var id = configMap.cylxrGrid.row(rowIndex).data().id;
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除用户，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.delUrl + id,
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            // data:,
            success: function (datas) {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: '删除成功！'
                });
                configMap.cylxrGrid.ajax.reload();
               /* $.ajax({
                    url: configMap.path + configMap.cylxrUrl,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (datas) {
                        configMap.cylxrGrid.ajax.reload();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.cylxrGrid.rows.add(datas).draw();
                        }
                    },
                    error: function () {
                        return App.unblockUI(jqueryMap.$blockTarget);
                    }
                });*/
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }

    //查询员工
    var searchLxr = function () {
        var cxName = $(".lxrQuery").val();
        $.ajax({
            url: configMap.path + "/maillist/getMailListByKeyWord?lxrhdw=" + cxName,
            dataType: 'JSON',
            type: 'post',
            success: function (datas) {
                configMap.cylxrGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.cylxrGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }

    //批量删除
    var delAll = function () {
        if(configMap.idList == ""){
            Messenger().post({
                message: "请选择联系人！",
                type: 'error'
            });
        }else{
            var data = {"id":configMap.idList};
            console.log(JSON.stringify(data))
            // var data = {"id":JSON.stringify(configMap.idList) };
            $.ajax({
                url: configMap.path + configMap.delAll ,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: 'JSON',
                type: 'post',
                data:JSON.stringify(data),
                success: function (datas) {
                    Messenger().post({
                        message: "删除成功！",
                        type: 'success'
                    });
                    configMap.cylxrGrid.ajax.reload();
                    $('#selectAll').prop("checked",false)
                    configMap.idList = "";
                 /*   $.ajax({
                        url: configMap.path + configMap.cylxrUrl,
                        dataType: 'JSON',
                        type: 'GET',
                        success: function (datas) {
                            configMap.cylxrGrid.clear().draw();
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (datas.length > 0) {
                                return configMap.cylxrGrid.rows.add(datas).draw();
                            }
                        },
                        error: function () {
                            return App.unblockUI(jqueryMap.$blockTarget);
                        }
                    });*/
                },
                error: function () {
                    return App.unblockUI(jqueryMap.$blockTarget);
                }
            });
        }
    }
    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid = $('#contacts-manager-container_' + uuid).parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
            initcontactsGrid();
            initcontactsData();

            $('#searchFilter', jqueryMap.$container).on('keyup', function () {
                configMap.contactsGrid.search(this.value).draw();
            });

            //搜索员工
            $("#ygcx-btn").on("click",function () {
                searchLxr();
            })

            //tab切换
            $(".ygTabNav ul li").on("click",function () {
                if($(this).hasClass("cylxr")){
                    $(".ygTabNav ul li").removeClass("colorBlue")
                    $(this).addClass("colorBlue");
                    initCylxrGrid();
                    /*initCylxrData();*/
                    $(".ygxx").hide();
                    $(".cylxrBox").show();
                }else{
                    $(".ygTabNav ul li").removeClass("colorBlue")
                    $(this).addClass("colorBlue");
                    initcontactsGrid();
                    initcontactsData();
                    $(".ygxx").show();
                    $(".cylxrBox").hide();
                }
            })
            //批量删除
            $("#xzlxrDelAll").on("click",function () {
                delAll();
            })

            //新增
            $("#xzlxr").on("click",function () {
                localStorage.setItem("viewData",0)
                addcylxr()
            })
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
