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

var reelectdispatch = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
//    dataUrl: '/customermanage/dispatchmanager/orgAndUser',
        dataUrl: '/organization/organization/orgAndUser',
        roleDataUrl: '/role/roles/role',
        userRoleUrl: '/user/users/userrole',
        userId: '',
        currentSelectedNode: null
    };

    // 全局Dom
    var jqueryMap = {
        $setRoleTree: null,
        $blockTarget: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$setRoleTree = $('#orgAndUser_manage_tree_' + uuid);
        jqueryMap.$blockTarget = jqueryMap.$setRoleTree.closest(".modal-content");
    };

    var initRole = function () {
//		jqueryMap.$setRoleTree.jstree({
//			'core': {
//				"themes": {
//					"responsive": false
//				},
//				"check_callback": true,
//				'data': {
//					'url': configMap.path + configMap.dataUrl
//				}
//			},
//			"types": {
//				"default": {
//					"icon": "fa fa-folder icon-state-warning icon-lg"
//				},
//				"file": {
//					"icon": "fa fa-file icon-state-warning icon-lg"
//				},
//				"people": {
//					"icon": "fa fa-user icon-state-warning icon-lg"
//				}
//			},
//			'plugins': ["types", "expand"],
//			"expand": {
//				level: 2
//			}
//		});
        jqueryMap.$setRoleTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.path + configMap.dataUrl,
                }
            },
            "types": {
                "default": {
                    "icon": false
                }
            },
            'plugins': ["types", "expand", "search"],
            "expand": {
                level: 2
            }
        }).on("load_node.jstree", function (e, d) {
            $(".orgAndUser_manage_reelect_tree_").bind("select_node.jstree", function (e, data) {
                data.instance.toggle_node(data.node);
                clearTreeNum();
                getTreeNum();
            });
            getTreeNum();
        });
        var getTreeNum = function () {
            for (var i = 0; i < $(".orgAndUser_manage_reelect_tree_ li").length; i++) {
                var $temp = $(".orgAndUser_manage_reelect_tree_ li").eq(i).attr("userimg");
                var $text = $(".orgAndUser_manage_reelect_tree_ li").eq(i).attr("usertext");
                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                    //alert("不含有该属性");
                } else {
                    //alert($("#orgAndUser_manage_tree li").eq(i).attr("userimg"));
                    $(".orgAndUser_manage_reelect_tree_ li").eq(i).find("i").eq(1).remove();
                    $(".orgAndUser_manage_reelect_tree_ li").eq(i).find("a").eq(0).append("<img src=" + $temp + " style='width:30px;border-radius:50% !important;height:30px;border:1px solid #e5e5e5;float:left;margin-right:11px;margin-top:5px;margin-left:7px;'><span>" + $text + "</span>");
                }
            }
        }
        var clearTreeNum = function () {
            for (var i = 0; i < $(".orgAndUser_manage_reelect_tree_ li").length; i++) {
                var $temp = $(".orgAndUser_manage_reelect_tree_ li").eq(i).attr("userimg");

                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                    //alert("不含有该属性");
                } else {
                    //alert($("#orgAndUser_manage_tree li").eq(i).attr("userimg"));
                    $(".orgAndUser_manage_reelect_tree_ li").eq(i).find("i").eq(1).remove();
                    $(".orgAndUser_manage_reelect_tree_ li").eq(i).find("a").eq(0).find("img").remove();
                    $(".orgAndUser_manage_reelect_tree_ li").eq(i).find("a").eq(0).find("span").remove();
                }
            }
        };
        jqueryMap.$setRoleTree.on('select_node.jstree', function (e, data) {
            if (data.node.parent === '#') {
                $('#btnNewOrg', jqueryMap.$container).off();
                $('#btnNewOrg', jqueryMap.$container).parent('li').addClass('disabled');
            } else {
                $('#btnNewOrg', jqueryMap.$container).off().on('click', function () {
                    addNewOrg();
                });
                $('#btnNewOrg', jqueryMap.$container).parent('li').removeClass('disabled');
            }
            configMap.currentSelectedNode = data.node;
        });
    };

    return {
        // 初始化
        init: function (uuid) {
            setJqueryMap(uuid);
            initRole();
            jqueryMap.$blockTarget.closest(".modal-dialog").css("width", "300px");
            jqueryMap.$blockTarget.closest(".modal-dialog").css("margin-top", "100px");
            jqueryMap.$blockTarget.css("width", "300px");
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },
        // 保存用户角色，参数为回掉函数
        saveUserRole: function (callback) {
            if (configMap.currentSelectedNode == null || configMap.currentSelectedNode.original.type == undefined || configMap.currentSelectedNode.original.type != "people") {
                Messenger().post({
                    message: "请选择职员",
                    id: "dispatchone",
                    type: 'error'
                });
                callback(false);
            } else {
                callback(configMap.currentSelectedNode);
            }
        }
    };
}();
//@ sourceURL=users/set-roles.js