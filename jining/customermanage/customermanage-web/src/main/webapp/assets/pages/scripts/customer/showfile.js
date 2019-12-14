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
var showFile = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/customerManage/companyImage',
        id: '',
        customerGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除附件"><i class="icon iconfont icon-shanchu"></i></a>',
        jsonMap: null,
        get: null,
        schedule: '/customer/schedule',
        filesize: '',
        fjlx: '',
        dljgBm: '',
        fileUrl: '/customerManage/getImageUrl'
    };
    var jsonMap = {
        payService: []
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $customerFileForm: null,
        $setimg: null,
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$customerFileForm = $('#customerFileAdd');
    };
    var getSchedule = function () {
        $.ajax({
            url: configMap.path + configMap.schedule,
            dataType: 'JSON',
            type: 'GET',
            success: function (result) {
                $(".progress-bar", jqueryMap.$productForm).css("width", result.schedule);
                $(".progress-value", jqueryMap.$productForm).html(result.schedule);
            },
        });
    };
    //隐藏进度条
    var hiddenSchedule = function () {
        $("#schedule", jqueryMap.$productForm).css("display", "none");
        $(".progress-bar", jqueryMap.$customerFileForm).css("width", "0%");
        $(".progress-value", jqueryMap.$customerFileForm).html("0%");
    };

    var getFileList = function () {
        var url = '/customermanage' + configMap.dataUrl + '/' + configMap.fjlx + '/' + configMap.dljgBm;
        $.ajax({
            url: url,
            dataType: 'JSON',
            type: 'GET',
            success: function (result) {
                $(".list-group", jqueryMap.$customerFileForm).html("");
                var content = '';
                for (var i = 0; i < result.length; i++) {
                    content += '<li class="list-group-item"><span class="opera" id="' + result[i].id + '">';
                    content += '</span>' + result[i].fjmc + '</li>';
                }
                $(".list-group", jqueryMap.$customerFileForm).append(content);
                //文件数量
                configMap.filesize = result.length;
                jqueryMap.$customerFileForm.find('li').off('click').on('click', function () {
                    $("li").not(this).removeClass("checked");
                    $(this).addClass("checked");
                    var indexsize = $(this).index();
                    $("#righttwo").remove();
                    $("#rightone").css("display", "none");
                    var rightcontent = '';
                    var filesize = '';
                    rightcontent += '<div class="col-md-7" style="height: 350px;display: block;padding:100px 60px 100px 60px;" id="righttwo">';
                    rightcontent += '<div class="row"><div class="col-md-12"><b style="font-size:20px;">' + result[indexsize].fjmc + '</b></div>';
                    rightcontent += '<div class="col-md-12"><span><label>文件类型：</label><label style="color:">' + result[indexsize].fjmc.split(".")[(result[indexsize].fjmc.split(".").length) - 1] + '</span></div>';
                    if (result[indexsize].wjdx < 1048576) {
                        filesize = (result[indexsize].wjdx / 1024).toFixed(1);
                        filesize += "KB";
                    } else if (result[indexsize].wjdx >= 1048576) {
                        filesize = (result[indexsize].wjdx / 1048576).toFixed(1);
                        filesize += "MB";
                    }
                    rightcontent += '<div class="col-md-12"><span><label>文件大小：</label>' + filesize + '</span></div>';
                    rightcontent += '<div class="col-md-12"><span><label>上传时间：</label>' + moment(result[indexsize].scsj).format('YYYY-MM-DD') + '</span></div>';
                    rightcontent += '<div class="col-md-12"><span><a onclick="showFile.getURL(' + '\'' + result[indexsize].fjmc + '\',' + '\'' + result[indexsize].id + '\'' + ')" name="downloadfile" href="' + result[indexsize].fjcclj + '" download="">下载</a></span></div>';
                    rightcontent += '</div></div></div>';
                    $("#customerFileAdd").append(rightcontent);
                });
            }
        });
    };
    return {
        // 初始化
        init: function (id, dljgBm, fjlx) {
            configMap.id = id;
            configMap.dljgBm = dljgBm;
            configMap.fjlx = fjlx;
            //获取附件
            getFileList();
            setJqueryMap();
            jqueryMap.$customerFileForm.closest(".modal-content").css({"cssText":"width:900px !important"});
            jqueryMap.$customerFileForm.closest(".modal-dialog").css({"cssText":"width:900px !important"});
            jqueryMap.$customerFileForm.closest(".modal-dialog").css("margin-top", "100px");
            $(".close", jqueryMap.$customerFileForm.closest(".modal-content")).off().on('click', function () {
                sessionStorage.setItem("filesize", configMap.filesize);
            });
        },
        getURL: function (plate, filename, id) {
            var data = {
                plate: plate,
                id: id
            }
            $.ajax({
                url: configMap.path + configMap.fileUrl,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (result) {
//    				window.open(result.url);
//    				$('[name="downloadfile"]').attr("href",result.url);
                    var name = filename.replace("." + filename.split(".")[filename.split(".").length - 1], "");
                    var a = $("<a></a>").attr("href", result.url).attr("download", name).attr("target", "_blank").appendTo("body");
                    a[0].click();
                    a.remove();
                },
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        getfile: function (callback) {
            sessionStorage.setItem("filesize", configMap.filesize);
            callback(true);
        }
    };
}();
//@ sourceURL=edit.js