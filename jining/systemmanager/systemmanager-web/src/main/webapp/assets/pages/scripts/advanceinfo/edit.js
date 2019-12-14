/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment, jQuery, bootbox, employeeEdit */
var editvance = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        queryAdvanceinfo: '/advanceinfo/getAdvanceInfoById',
        queryMessage:'/advancecompanymanagement/findAllAdvanceMes',
        removeMessage:'/advancecompanymanagement/deleteById/',
        addMessage:'/advancecompanymanagement/insertAdvanceMes',
        editMessage:'/advancecompanymanagement/updateAdvanceMes/',
        searchMessage:'/advancecompanymanagement/findByZdy'
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $taskmanagementDialog: null,
        fileUrl: '/rwgljbxx/getfileurl'
    };

    //赋值
    var setJqueryMap = function () {
        jqueryMap.$container = $('#editvanceForm');
        jqueryMap.$blockTarget = $('body');
    };

    var AppAlert = function(msg){
        App.alert({
            container: $(".modal-body"),
            place: 'prepend',
            type: 'danger',
            message: msg,
            closeInSeconds:3,
            icon: 'fa fa-warning'
        });
    };

    // 点击input请求
    var clickInput = function (data) {
        $(".enter input").val("")
        $.ajax({
            url: configMap.path + configMap.queryMessage,
            type: 'get',
            success: function (result) {
                console.log(result)
                $(".companyMessage tbody tr:not('.enter')").remove()
                $(result).each(function (index) {
                    var queryMessage = '<tr role="row" class="odd">' +
                        '<td class=" text-center"><input name="check" class="checkBox" type="radio"/></td>' +
                        '<td class=" text-center"><input class="xsnsrsbh" type="text" value="' + $(this)[0].businessTax + '" readonly/></td>' +
                        '<td class=" text-center"><input class="xsgsmc" type="text" value="' + $(this)[0].companyName + '" readonly/></td>' +
                        '<td><input class="xsxm" type="text" value="' + $(this)[0].linkManName + '" readonly/></td>' +
                        '<td class=" text-center"><input class="xslxdh" type="text" value="' + $(this)[0].linkManPhoneNum + '" readonly/></td>' +
                        '<td class=" text-center">' +
                        '<a sfid = "'+$(this)[0].id+'" data=1 href="javascript:;" class="edit btn btn-xs default" data-type="detail" data-toggle="tooltip" title=""><i class=""></i>编辑</a>' +
                        '<a sfid = "'+$(this)[0].id+'" href="javascript:;" class="removeMessage btn btn-xs default" data-type="receive" data-toggle="tooltip" title=""><i class=""></i>删除</a></td></tr>'

                    $(data).parent().parent().children('.companyMessage').children('table').children('tbody').append(queryMessage)
                })
                $(".odd").on("dblclick",function () {
                    clickCheck(1,$(this))
                })
                $(".removeMessage").on("click", function() {
                    var clickThis = $(this)
                    removeMessage(clickThis)

                })
                $(".edit").on("click", function() {
                    var clickThis = $(this)
                    editMessage(clickThis)

                })
                $(".companyMessage").css("display",'none')
                data.parent().parent().parent().css("position","relative")
                data.parent().parent().children('.companyMessage').css("display",'block')

            },
            error:function () {
                AppAlert("加载失败");
            }
        })
    }


    // 删除
    var removeMessage =function (data) {
        var id = data.attr("sfid")
        $.ajax({
            url: configMap.path + configMap.removeMessage+ id,
            type: 'POST',
            success: function (result) {
                console.log(result)
                if(result == true){
                    data.parent().parent().remove()
                }

            },
            error:function () {
                AppAlert("删除失败");
            }
        })
    }

    // 添加
    var apendMessage = function (data) {
        console.log(data.parent().parent().children().children("input[type='text']"))
        var nsrsbh = data.parent().parent().children().children("input[type='text']")[0].value;
        var gsmc = data.parent().parent().children().children("input[type='text']")[1].value;
        var xm = data.parent().parent().children().children("input[type='text']")[2].value;
        var lxdh = data.parent().parent().children().children("input[type='text']")[3].value;
        if(gsmc == "") {
            AppAlert("请输入公司名称");
            return;
        }
        var data1 = {
            companyName:gsmc,
            linkManName:xm,
            linkManPhoneNum:lxdh,
            companyTaxNum:nsrsbh
        };
        $.ajax({
            url: configMap.path + configMap.addMessage,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data:JSON.stringify(data1),
            success: function (result) {
                console.log(result)
                if(result.success == true){
                    $.ajax({
                        url: configMap.path + configMap.queryMessage,
                        type: 'get',
                        success: function (result) {
                            $(".companyMessage tbody tr:not('.enter')").remove()
                            $(result).each(function (index) {
                                var queryMessage = '<tr role="row" class="odd">' +
                                    '<td class=" text-center"><input name="check" class="checkBox" type="radio"/></td>' +
                                    '<td class=" text-center"><input class="xsnsrsbh" type="text" value="' + $(this)[0].businessTax + '" readonly/></td>' +
                                    '<td class=" text-center"><input class="xsgsmc" type="text" value="' + $(this)[0].companyName + '" readonly/></td>' +
                                    '<td><input class="xsxm" type="text" value="' + $(this)[0].linkManName + '" readonly/></td>' +
                                    '<td class=" text-center"><input class="xslxdh" type="text" value="' + $(this)[0].linkManPhoneNum + '" readonly/></td>' +
                                    '<td class=" text-center">' +
                                    '<a sfid = "'+$(this)[0].id+'" data=1 href="javascript:;" class="edit btn btn-xs default" data-type="detail" data-toggle="tooltip" title=""><i class=""></i>编辑</a>' +
                                    '<a sfid = "'+$(this)[0].id+'" href="javascript:;" class="removeMessage btn btn-xs default" data-type="receive" data-toggle="tooltip" title=""><i class=""></i>删除</a></td></tr>'

                                $(data).parent().parent().parent().append(queryMessage)
                            })
                            $(".odd").on("dblclick",function () {
                                clickCheck(1,$(this))
                            })
                            $(".removeMessage").on("click", function() {
                                var clickThis = $(this)
                                removeMessage(clickThis)

                            })
                            $(".edit").on("click", function() {
                                var clickThis = $(this)
                                editMessage(clickThis)

                            })

                        }
                    })
                    $("tbody .enter input").val("")
                    $(".removeMessage").on("click", function() {
                        var clickThis = $(this)
                        removeMessage(clickThis)

                    })
                    $(".edit").on("click", function() {
                        var clickThis = $(this)
                        editMessage(clickThis)

                    })
                }

            },
            error:function () {
                AppAlert("添加失败");
            }
        })



    }

    // 编辑
    var editMessage = function (data) {
        if(data.attr("data") == 1) {
            data.parent().parent().children().children().attr("readonly", false)
            data.parent().parent().children().children('input').addClass("editStatue")
            data.text("确定");
            data.attr("data", 2)

        } else {
            var id = data.attr("sfid")
            var nsrsbh = data.parent().parent().children().children("input[type='text']")[0].value;
            var gsmc = data.parent().parent().children().children("input[type='text']")[1].value;
            var xm = data.parent().parent().children().children("input[type='text']")[2].value;
            var lxdh = data.parent().parent().children().children("input[type='text']")[3].value;
            if(gsmc == "") {
                AppAlert("请输入公司名称");
                return;
            }
            var data1 = {
                companyName:gsmc,
                linkManName:xm,
                linkManPhoneNum:lxdh,
                companyTaxNum:nsrsbh
            };
            $.ajax({
                url: configMap.path + configMap.editMessage+id,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                data: JSON.stringify(data1),
                success: function (result) {
                    console.log(result)
                    if(result.success){
                        data.text("编辑");
                        data.parent().parent().children().children().attr("readonly", true)
                        data.parent().parent().children().children('input').removeClass("editStatue")
                        data.attr("data", 1)
                    }

                },
                error:function () {
                    AppAlert("编辑失败");
                }
            })
            // alert('保存成功')

        }
    }


    // 点击确定按钮
    var clickCheck = function (data,clickThis) {
        if(data==0){
            $(".companyMessage input[type='radio']").each(function () {
                if($(this).prop("checked")==true){
                    $(this).parent().parent().children().children("input[type='text']").each(function () {
                        if($(this).hasClass("xsnsrsbh")){
                            $("input[name='userAccount']").val($(this).val())
                        }
                        if($(this).hasClass("xsgsmc")){
                            $("input[name='gsname']").val($(this).val())
                        }
                        if($(this).hasClass("xsxm")){
                            $("input[name='name']").val($(this).val())
                        }
                        if($(this).hasClass("xslxdh")){
                            $("input[name='number']").val($(this).val())
                        }

                    })
                    $(".companyMessage").css("display","none")
                }
            })
        }else{
            $(clickThis.children().children()).each(function () {
                if($(this).hasClass("xsnsrsbh")){
                    $("input[name='userAccount']").val($(this).val())
                }
                if($(this).hasClass("xsgsmc")){
                    $("input[name='gsname']").val($(this).val())
                }
                if($(this).hasClass("xsxm")){
                    $("input[name='name']").val($(this).val())
                }
                if($(this).hasClass("xslxdh")){
                    $("input[name='number']").val($(this).val())
                }
            })
            $(".companyMessage").css("display","none")
        }

    }

    // 查询
    var search = function (data) {
        var name = data.val();
        name = name.trim();
        var url='';
        if(name){
            url=configMap.path + configMap.searchMessage+'/'+name;
        }else{
            url=configMap.path+'/advancecompanymanagement/findAllAdvanceMes'
        }
        $.ajax({
            url: url,
            type: 'get',
            success: function (result) {
                $(".companyMessage tbody tr:not('.enter')").remove()
                $(result).each(function (index) {
                    var queryMessage = '<tr role="row" class="odd">' +
                        '<td class=" text-center"><input name="check" class="checkBox" type="radio"/></td>' +
                        '<td class=" text-center"><input class="xsnsrsbh" type="text" value="' + $(this)[0].businessTax + '" readonly/></td>' +
                        '<td class=" text-center"><input class="xsgsmc" type="text" value="' + $(this)[0].companyName + '" readonly/></td>' +
                        '<td><input class="xsxm" type="text" value="' + $(this)[0].linkManName + '" readonly/></td>' +
                        '<td class=" text-center"><input class="xslxdh" type="text" value="' + $(this)[0].linkManPhoneNum + '" readonly/></td>' +
                        '<td class=" text-center">' +
                        '<a sfid = "'+$(this)[0].id+'" data=1 href="javascript:;" class="edit btn btn-xs default" data-type="detail" data-toggle="tooltip" title=""><i class=""></i>编辑</a>' +
                        '<a sfid = "'+$(this)[0].id+'" href="javascript:;" class="removeMessage btn btn-xs default" data-type="receive" data-toggle="tooltip" title=""><i class=""></i>删除</a></td></tr>'

                    $(data).parent().parent().children("table").children("tbody").append(queryMessage)
                })

                $(".removeMessage").on("click", function() {
                    var clickThis = $(this)
                    removeMessage(clickThis)

                })
                $(".edit").on("click", function() {
                    var clickThis = $(this)
                    editMessage(clickThis)

                })
            },
            error:function () {
                AppAlert("查询失败");
            }
        })
    }

    //根据ID获取对应的垫付信息
    var getAdvanceInfo = function (id) {
        if (configMap.id) {
            $.ajax({
                url: '/systemmanager/advanceinfo/getAdvanceInfoById/' + id,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    console.info(data);
                    $('input[name="dfje"]', '#editvanceForm').val(data.je);
                    $('input[name="dfsj"]', '#editvanceForm').val(moment(data.sfsj).format("YYYY-MM-DD"));
                    $('input[name="gsname"]', '#editvanceForm').val(data.qymc);
                    $('input[name="userAccount"]', '#editvanceForm').val(data.qysh);
                    $('input[name="name"]', '#editvanceForm').val(data.lxrxm);
                    $('input[name="number"]', '#editvanceForm').val(data.lxrdh);
                    $('textarea[name="bzxx"]', '#editvanceForm').val(data.bzxx);
                    $('input[name="id"]', '#editvanceForm').val(data.id);
                    $('#rwgl_fyxm').val(data.fyxmdm);
                    surplusHowMany($("#editvanceForm textarea"),$("#editvanceForm .wordNum span"),300);
                },
                error: function () {
                    bootbox.alert('获取垫付信息失败！');
                }
            });
        }
    };

    return {
        init: function (id) {
            configMap.id = id;
            console.log("id:::::::"+id);
            $.ajax({
                url: "/systemmanager/rwgljbxx/getfyxm",
                async: false,
                success: function (d) {
                    d = d.data;
                    for (var i = 0; i < d.length; i++) {
                        $('<option value="' + d[i].dm + '">' + d[i].mc + '</option>').appendTo($('#rwgl_fyxm'));
                    }
                }
            });

            getAdvanceInfo(id);

            //垫付时间
            $('#editvanceForm').find('.beginTime_m').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });


            $('input').on("click",function (e) {
                if($(this).attr("readonly")){
                    clickInput($(this))
                }
                e.preventDefault();
            })
            $(".addMessage",'#editvanceForm').off('click').on("click", function() {
                var clickThis = $(this)
                apendMessage(clickThis)
            })

            $(".close").on("click", function() {


                $(this).parent().parent().css("display", "none")
            })

            $(".cancelEnter").on("click", function() {


                $("tbody .enter input").val("")
            })

            $(".edit").on("click", function() {

                alert(222)
                $(this).parent().parent().children().attr("readonly", false)
            })

            $(".clickTrue ").off().on("click",function () {


                clickCheck(0)
            })
            // $(".clickTrue ").off().on("click",function () {
            //     clickCheck()
            // })
            $(".search").on("input",function () {

                var data = $(this);
                search(data);
            });
            //textarea输入字数限制
            var obj = $("#editvanceForm textarea");
            var num = 300;
            var numObj = $("#editvanceForm .wordNum span")
            checkHowMany(obj,numObj,num);

        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=product.js