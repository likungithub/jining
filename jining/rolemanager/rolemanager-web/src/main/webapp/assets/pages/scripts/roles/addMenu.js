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

/*global $, App, moment, jQuery, bootbox, _ */

var addMenu = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/role/roles/role',
		id: ''
	};

	// 全局Dom
	var jqueryMap = {
		$addMenuForm: null
	};

	var setJqueryMap = function () {
		jqueryMap.$addMenuForm = $('#addMenuForm');
	};

	var saveMenu = function (callback) {

        var fldm = $('#menuClass',jqueryMap.$addMenuForm).val();
        var sjdm = '';
        if (fldm === '2') { //选择菜单，只展示模块选择框
            sjdm = $('#modelMenu',jqueryMap.$addMenuForm).val()
        } else if (fldm === '3') { //选择按钮，展示模块和菜单选择框
            sjdm = $('#parentMenu',jqueryMap.$addMenuForm).val()
		}

		var data = {
	        name: jqueryMap.$addMenuForm.find('input[name=menuName]').val(),
		    fldm: fldm,
            sjdm: sjdm,
            uuid: jqueryMap.$addMenuForm.find('input[name=uuid]').val()
	    };

		
		if(data.name == "" || data.name == null || data.name == "undefined"){
            Messenger().post({message: '菜单名称不得为空！', type: 'error'});
			return false;
		} else if (data.fldm == "" || data.fldm == null || data.fldm == "undefined") {
            Messenger().post({message: '菜单分类不得为空！', type: 'error'});
            return false;
		} else if (data.uuid == "" || data.uuid == null || data.uuid == "undefined") {
            Messenger().post({message: 'UUID不得为空！', type: 'error'});
            return false;
        } else if (data.fldm === "1") {
			data.sjdm='0';
		} else if (data.fldm != "1" && (data.sjdm == "" || data.sjdm == null || data.sjdm == "undefined")) {
            Messenger().post({message: '上级菜单不得为空！', type: 'error'});
            return false;
		}
		
		var blockTarget = jqueryMap.$addMenuForm.closest(".modal-body");
		App.blockUI({
			target: blockTarget,
			boxed: true,
			message: '正在保存数据...'
		});
		$.ajax({
			url: '/role/roles/insertMenu',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			dataType: 'JSON',
			data: JSON.stringify(data),
			success: function (result) {
				if (result.success) {
					App.unblockUI(blockTarget);
					callback(result);
				} else {
					App.unblockUI(blockTarget);
                    Messenger().post({message: '保存失败！', type: 'error'});
					callback(false);
				}
			},
			error: function () {
				App.unblockUI(blockTarget);
                Messenger().post({message: '保存失败！', type: 'error'});
				callback(false);
			}
		});
	};
	
	var menuClass = function(){
		var val = $('#menuClass',jqueryMap.$addMenuForm).val();
		if (val === '2') { //选择菜单，只展示模块选择框
            $('#modelMenuDiv',jqueryMap.$addMenuForm).show();
            $('#parentMenuDiv',jqueryMap.$addMenuForm).hide();
            $.ajax({
				url:'/role/roles/getPMenu/0',
				type:'GET',
				dateType:'JSON',
				success:function (data) {
					if (data.success) {
						var list = data.data;
                        $('#modelMenu', jqueryMap.$addMenuForm).empty();
                        for (var i = 0; i < list.length; i++) {
                            $('<option value="' + list[i].dm + '">' + list[i].name + '</option>').appendTo($('#modelMenu', jqueryMap.$addMenuForm));
                        }
					}
                }
			});
		} else if (val === '3') { //选择按钮，展示模块和菜单选择框
            $('#modelMenuDiv',jqueryMap.$addMenuForm).show();
            $('#parentMenuDiv',jqueryMap.$addMenuForm).show();
            $.ajax({
                url:'/role/roles/getPMenu/0',
                type:'GET',
                dateType:'JSON',
                success:function (data) {
                    if (data.success) {
                        var list = data.data;
                        $('#modelMenu', jqueryMap.$addMenuForm).empty();
                        for (var i = 0; i < list.length; i++) {
                            $('<option value="' + list[i].dm + '">' + list[i].name + '</option>').appendTo($('#modelMenu', jqueryMap.$addMenuForm));
                        }
                    }
                }
            });
		} else {
            $('#parentMenuDiv',jqueryMap.$addMenuForm).hide();
            $('#modelMenuDiv',jqueryMap.$addMenuForm).hide();
		}
	};

    /**
	 * 根据模块选菜单
     */
    var modelClass = function(){
        var val = $('#modelMenu',jqueryMap.$addMenuForm).val();
        $.ajax({
            url:'/role/roles/getPMenu/' + val,
            type:'GET',
            dateType:'JSON',
            success:function (data) {
                if (data.success) {
                    var list = data.data;
                    $('#parentMenu', jqueryMap.$addMenuForm).empty();
                    for (var i = 0; i < list.length; i++) {
                        $('<option value="' + list[i].dm + '">' + list[i].name + '</option>').appendTo($('#parentMenu', jqueryMap.$addMenuForm));
                    }
                }
            }
        });
    }

	return {
		// 初始化
		init: function () {
			setJqueryMap();
			$('#parentMenuDiv',jqueryMap.$addMenuForm).hide();
            $('#modelMenuDiv',jqueryMap.$addMenuForm).hide();
			$('#menuClass',jqueryMap.$addMenuForm).off().on('change',function () {
				menuClass();
            });
            $('#modelMenuDiv',jqueryMap.$addMenuForm).off().on('change',function () {
                modelClass();
            });

		},
		// 保存雇员信息，参数为回掉函数
		saveMenu: function (callback) {
            saveMenu(callback);
		}
	};
}();
//@ sourceURL=roles/edit.js