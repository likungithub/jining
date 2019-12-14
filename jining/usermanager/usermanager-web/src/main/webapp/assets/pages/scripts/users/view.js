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

/*global $, App, moment */

var userView = function () {
    'use strict';

    var configMap = {
        path: '',
        getOrgUrl: '/organization/organization/org',
        dataUrl: '/user/users/user/',
        id: '',
        dljgbm: '',
        zydm: '',
        imgUrl:'/user/users/userinfoimage.jsp'
    };

    var jqueryMap = {
        $container: null,
        $setimg: null
    };

    var getUser = function (id) {
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {

                $('#name', jqueryMap.$container).text(data.name);
                $('#userAccount', jqueryMap.$container).text(data.userAccount);
                $('#sex', jqueryMap.$container).text(data.xbdm == 0 ? '男' : '女');
                if (data.csrq != null && data.csrq != '') {
                	$('#birth', jqueryMap.$container).text(moment(data.csrq).format('YYYY-MM-DD'));
                }
                $('#email', jqueryMap.$container).text(data.email);
                $('#phone', jqueryMap.$container).text(data.yddh); //手机
                $('#tel', jqueryMap.$container).text(data.tel); //联系电话
                $('#qq', jqueryMap.$container).text(data.qq); //QQ
                $('#bmdm', jqueryMap.$container).text(data.bmmc);
                $('#remark', jqueryMap.$container).text(data.remark == null ? "" : data.remark);
                $('#lxdz', jqueryMap.$container).text(data.lxdz);
                var education = '';
                switch (data.ygxl) {
                    case '001':
                        education = '小学';
                        break;
                    case '002':
                        education = '初中';
                        break;
                    case '003':
                        education = '高中';
                        break;
                    case '004':
                        education = '大专';
                        break;
                    case '005':
                        education = '本科';
                        break;
                    case '006':
                        education = '研究生';
                        break;
                    case '007':
                        education = '博士';
                        break;
                    case '008':
                        education = '其他';
                        break;
                    default:
                        education = '';
                        break;
                }
                $('#education', jqueryMap.$container).text(education);
                if (data.cyrq != null && data.csrq != '') {
                	$('#dateOfBusiness', jqueryMap.$container).text(moment(data.cyrq).format('YYYY-MM-DD'));
                }
                if(data.cyzz==""||data.cyzz==null){
                	$('#qualifications', jqueryMap.$container).text(" ");
                }else{
                	$('#qualifications', jqueryMap.$container).text(data.cyzz);
                };
                $('#idCard', jqueryMap.$container).text(data.sfzhm);
                if (data.jsdm != "" && data.jsdm != null) {
                    var js = data.jsdm.split(',');
                    for (var i = 0; i < js.length; i++) {
                        jqueryMap.$container.find('span[id=' + js[i] + ']').addClass("btnBlue colorfff");
                    }
                }
            },
            error: function () {
                Messenger().post({
                    message: '获取数据失败！',
                    type: 'error'
                });
            }
        });
    };

    var getOrder = function () {
        $.ajax({
            url: '/role/roles/role',
            dataType: 'JSON',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    //生成span
                    var oSpan = "<span style='dispaly:block;float:left;margin-right:15px;margin-bottom:15px;padding:5px 10px;border-radius:4px !important;cursor:pointer;background:#F1F5B9;'id=" + result[i].id + ">" + result[i].name + "</span>";
                    $("#js").append(oSpan);
                }

                getUser(configMap.id);
            },
            error: function () {
                getUser(configMap.id);
            }
        });
    };

    var viewImages = function () {
        jqueryMap.$container.find('[name^=image]').off('click').on('click', function () {
            var fjlx = $(this).attr('name').substr(5);
            var dialogButtons = {
                cancel: {
                    label:'<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
                    className: 'btn btn-default borderRadius4'
                }
            }

            $.get(configMap.path + configMap.imgUrl + "?id=" + configMap.id + "&dljgbm=" + configMap.dljgbm +
                "&zydm=" + configMap.zydm + "&status=show" +"&fjlx=" + fjlx, function (html) {
                jqueryMap.$setimg = bootbox.dialog({
                    title: '查看附件',
                    message: html,
                    buttons: dialogButtons
                });
            });
        });
    };

    var imagesCount = function () {
        $.ajax({
            url: '/user/users/getImagesCount/' + configMap.zydm + "/" + configMap.dljgbm,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                $('#educationImage').html('查看附件 (' + data.educationImage + ')');
                $('#qualificationsImage').html('查看附件 (' + data.qualificationsImage + ')');
                $('#idCardImage').html('查看附件 (' + data.idCardImage + ')');
            }
        });
    };


    return {
        init: function (id, dljgbm, zydm) {
            configMap.id = id;
            configMap.dljgbm = dljgbm;
            configMap.zydm = zydm;
            getOrder();
            viewImages();
            imagesCount();
        },
        setPath: function (path) {
            jqueryMap.$container = $('#user-manager-view-data');
        }
    };
}();
//@ sourceURL=view.js