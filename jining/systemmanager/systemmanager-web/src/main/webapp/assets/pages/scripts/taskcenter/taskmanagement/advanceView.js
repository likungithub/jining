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
var advanceView = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		queryMessage:'/advancecompanymanagement/findAllAdvanceMes',
		removeMessage:'/advancecompanymanagement//deleteById/',
        addMessage:'/advancecompanymanagement/insertAdvanceMes',
        editMessage:'/advancecompanymanagement/updateAdvanceMes/',
        searchMessage:'/advancecompanymanagement/findByZdy',
        advanceCommon:'/rwgljbxx/jbxx/sfjl'
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
		jqueryMap.$container = $('#task-manager-container');
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
              /*  $(".removeMessage").off("click").on("click", function() {
                    var delContainer = $(".removeMessage ");
                    if (delContainer.length > 0) {
                        delContainer.confirmation({
                            "title": '确定要删除？',
                            "btnOkLabel": '是',
                            "btnCancelLabel": '否',
                            "placement": 'left',
                            "onConfirm": removeMessage,
                            "btnOkClass": 'btn btn-danger borderRadius4',
                            "btnCancelClass": "btn btn-default borderRadius4"
                        });
                    }
                    // removeMessage(clickThis)

                })*/
                var delContainer = $(".removeMessage ");
                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": removeMessage,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }

                $(".edit").on("click", function() {
                    var clickThis = $(this)
                    editMessage(clickThis)

                });
                $(".odd").on("dblclick",function () {
                    clickCheck(1,$(this))
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
		var removeMessage =function (event, element) {
			var id =element[0].attributes[0].nodeValue;
            $.ajax({
                url: configMap.path + configMap.removeMessage+ id,
                type: 'POST',
                success: function (result) {
					if(result == true){
					    var child = element[0].parentNode.parentNode
                        child.parentNode.removeChild(child);
					}

                },
                error:function () {
                    AppAlert("删除失败");
                }
            })


        }

// 添加
	var apendMessage = function (data) {
        var nsrsbh = data.parent().parent().children().children("input[type='text']")[0].value;
        var gsmc = data.parent().parent().children().children("input[type='text']")[1].value;
        var xm = data.parent().parent().children().children("input[type='text']")[2].value;
        var lxdh = data.parent().parent().children().children("input[type='text']")[3].value;
        if(gsmc == "") {
            AppAlert("请输入收费单位名称");
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
                            $(".removeMessage").off("click").on("click", function() {
                                var delContainer = $(".removeMessage ");
                                if (delContainer.length > 0) {
                                    delContainer.confirmation({
                                        "title": '确定要删除？',
                                        "btnOkLabel": '是',
                                        "btnCancelLabel": '否',
                                        "placement": 'left',
                                        "onConfirm": removeMessage,
                                        "btnOkClass": 'btn btn-danger borderRadius4',
                                        "btnCancelClass": "btn btn-default borderRadius4"
                                    });
                                }

                            })
                            $(".edit").on("click", function() {
                                var clickThis = $(this)
                                editMessage(clickThis)

                            })
                            $(".odd").on("dblclick",function () {
                                clickCheck(1,$(this))
                            })

                        }
                    })
                    $("tbody .enter input").val("")
                    $(".removeMessage").off("click").on("click", function() {
                        var delContainer = $(".removeMessage ");
                        if (delContainer.length > 0) {
                            delContainer.confirmation({
                                "title": '确定要删除？',
                                "btnOkLabel": '是',
                                "btnCancelLabel": '否',
                                "placement": 'left',
                                "onConfirm": removeMessage,
                                "btnOkClass": 'btn btn-danger borderRadius4',
                                "btnCancelClass": "btn btn-default borderRadius4"
                            });
                        }

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
                AppAlert("请输入收费单位名称");
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

                $(".removeMessage").off("click").on("click", function() {
                    var delContainer = $(".removeMessage ");
                    if (delContainer.length > 0) {
                        delContainer.confirmation({
                            "title": '确定要删除？',
                            "btnOkLabel": '是',
                            "btnCancelLabel": '否',
                            "placement": 'left',
                            "onConfirm": removeMessage,
                            "btnOkClass": 'btn btn-danger borderRadius4',
                            "btnCancelClass": "btn btn-default borderRadius4"
                        });
                    }

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



	return {
		init: function () {
            $('#advanceViewForm').find('.advanceime_m').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            $('#advanceViewForm').find('.advanceime_m1').click(function(e){
                $('#advanceViewForm').find('.advanceime_m').trigger('focus');
                e.preventDefault();
            });

            var obj = $("#advanceViewForm textarea");
            var num = 300;
            var numObj = $("#advanceViewForm .wordNum span")
            checkHowMany(obj,numObj,num);

            $('input').on("click", function (e) {

                if ($(this).attr("readonly")) {
                    clickInput($(this))

                }
                e.preventDefault();
            })
            // $("")
            $(".addMessage", '#advanceViewForm').off('click').on("click", function () {
                var clickThis = $(this)
                apendMessage(clickThis)
            })

            $(".close").on("click", function () {


                $(this).parent().parent().css("display", "none")
            })

            $(".cancelEnter").on("click", function () {


                $("tbody .enter input").val("")
            })

            $(".edit").on("click", function () {

                $(this).parent().parent().children().attr("readonly", false)
            })

            $(".clickTrue ").off().on("click", function () {


                clickCheck(0)
            })


            // $(".clickTrue ").off().on("click",function () {
            //     clickCheck()
            // })
            $(".search").on("input", function () {

                var data = $(this);
                search(data);
            })


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
        },
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=product.js