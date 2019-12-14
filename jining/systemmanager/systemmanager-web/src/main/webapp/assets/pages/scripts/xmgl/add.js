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
var addYpForm = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/contract/contract',
        updateUrl: '/contract/contractupdate',
        id: '',
        yplistGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        uuid: '',
        wtid: ''
    };

    var strArr=[];

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $addYpForm: null,
        $setimg: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$addYpForm = $('#addYpForm'+ uuid);
    };

    //保存
    var addCYYP = function (callback) {
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$addYpForm).not(jqueryMap.$addYpForm.find('[name="yplist_checkbox"]'));
        var temp = null;
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.yplistGrid.cell(el.parent()).index().row;
            var id = configMap.yplistGrid.row(rowIndex).data().id;
            temp = {id: id};
            strArr.push(temp);
        });
        if (strArr.length == 0) {
            Messenger().post({
                message: "请选择至少一个抽样样品！",
                type: 'warning'
            });
        } else {
            var data = {
                ids: strArr
            }
            $.ajax({
                url: "/customermanage/ypgl/updateCyyp",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (result) {
                    if (result) {
                        Messenger().post({
                            message: '保存成功！'
                        });
                        callback(true);
                    } else {
                        callback(false);
                    }
                },
                error: function () {
                    Messenger().post({
                        message: '保存失败！',
                        type: 'error'
                    });
                    callback(false);
                }
            });
        }
    }

    var initYpList2 = function () {
        configMap.yplistGrid = $('#'+configMap.uuid+'YpList', jqueryMap.$addYpForm).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": '/customermanage/ypgl/getYpxxListByWt',
                "dataSrc": "aaData",
                "data": function(data) {
                    data.wtid=configMap.id;
                    data.type = 'add';
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    "data": "ypbm",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "ypmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "ypdw",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "ggxh",
                    render:function(d,t,r){
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
            }
        });
    }
    
    return {
        // 初始化
        init: function (id,uuid) {
            configMap.id = id;
            //当前类型，edit为修改合同信息，空字符串为续签合同
            configMap.uuid = uuid;
            setJqueryMap(uuid);
            initYpList2();

            $('[name=yplist_checkbox]',jqueryMap.$addYpForm).on('click',function () {
                if($("[name=yplist_checkbox]",jqueryMap.$addYpForm).prop("checked")){
                    //选中
                    $("[name=checkbox_checkbox]",jqueryMap.$addYpForm).prop("checked",true);
                }else{
                    $("[name=checkbox_checkbox]",jqueryMap.$addYpForm).prop("checked",false);
                }
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        //保存
        addCYYP: function (callback) {
            addCYYP(callback);
        }
    };
}();
//@ sourceURL=edit.js