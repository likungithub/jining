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
var domainNameBasic = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        ifeidt:null,
        ifeidt1:null,
        ifeidt2:null,
        ifeidt3:null,
        path: '',
        dataUrl: '/domainNameBasic/showDomainNameBasic',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        employeeGrid: null,
       // editPageUrl: '/domainName/addNewDomainName.jsp',
        editPageUrl: '/domainName/addNewDomainName.jsp',
        viewPageUrl: '/domainName/addNewDomainName.jsp',
        footerPageUrl:'/domainName/footerPageSet.jsp',
        backgroundImgUrl:'/domainName/addBackground.jsp',
        viewBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看"><i class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize"></i></a>',
        editBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        loadingBg_html:'<a href="javascript:;" class="btn btn-xs default" data-type="loadBg" data-toggle="tooltip" title="登录背景"><i class="icon iconfont icon-beijingtupian-  iconFontColor-10a0f7 iconFontSize"></i></a>',
        footer_html:'<a href="javascript:;" class="btn btn-xs default" data-type="footer" data-toggle="tooltip" title="页脚"><i class="icon iconfont icon-yejiaoshezhi- iconFontColor-10a0f7 iconFontSize"></i></a>',
        delete_html:'<a href="javascript:;" class="btn btn-xs default" data-type="delete" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $employeeDialog: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$domainNameBasic=$('#domainNameManageByM');
    };

    var initEmployeeData = function () {
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
                configMap.employeeGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.employeeGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save iconMr"></i> 保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                if(!($('#addDomainNameInfo_M  #domainAddress').val())||!($('#addDomainNameInfo_M  #servicePhone').val())||!($('#addDomainNameInfo_M  #copyrightInfo').val())||!($('#addDomainNameInfo_M  #icpRecord').val())||!($('#addDomainNameInfo_M  #keyWord').val())||!($('#addDomainNameInfo_M  #title').val())||!($('#addDomainNameInfo_M  #descriptionInfo').val())){
                    Messenger().post({
                        message: '必填项不能为空',
                        type: 'warning'
                    })
                    return false;
                }

                    addDomainName.savaDomainName(function (result) {
                        if (result) {
                            configMap.employeeGrid.ajax.reload();
                            jqueryMap.$employeeDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        }
        if(type==='footer'){
           /* dialogButtons.success = {
                label: '<i class="fa fa-save iconMr"></i> 保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {

                    if(configMap.ifeidt!=null){
                        if(configMap.ifeidt){
                            footerPageSet.eidtfooter(function (result) {
                                if(result){
                                    configMap.employeeGrid.ajax.reload();
                                    jqueryMap.$employeeDialog.modal('hide');
                                }
                            })
                        }else{
                            footerPageSet.savefooter(function (result) {
                                if (result) {
                                    configMap.employeeGrid.ajax.reload();
                                    jqueryMap.$employeeDialog.modal('hide');
                                }
                            });
                        }
                    }else if(configMap.ifeidt1!=null){
                        if(configMap.ifeidt1){
                            footerPageSet.editCustomerService(function (result) {
                                if(result){
                                    configMap.employeeGrid.ajax.reload();
                                    jqueryMap.$employeeDialog.modal('hide');
                                }
                            })
                        }else{
                            footerPageSet.saveCustomerService(function (result) {
                                if (result) {
                                    configMap.employeeGrid.ajax.reload();
                                    jqueryMap.$employeeDialog.modal('hide');
                                }
                            });
                        }
                    }else if(configMap.ifeidt2!=null){
                        if(configMap.ifeidt2){
                            footerPageSet.editflsm(function (result) {
                                if(result){
                                    configMap.employeeGrid.ajax.reload();
                                    jqueryMap.$employeeDialog.modal('hide');
                                }
                            })
                        }else{
                            footerPageSet.saveflsm(function (result) {
                                if (result) {
                                    configMap.employeeGrid.ajax.reload();
                                    jqueryMap.$employeeDialog.modal('hide');
                                }
                            });
                        }
                    }else if(configMap.ifeidt3!=null){
                        if(configMap.ifeidt3){
                            footerPageSet.editYstk(function (result) {
                                if(result){
                                    configMap.employeeGrid.ajax.reload();
                                    jqueryMap.$employeeDialog.modal('hide');
                                }
                            })
                        }else{
                            footerPageSet.editYstk(function (result) {
                                if (result) {
                                    configMap.employeeGrid.ajax.reload();
                                    jqueryMap.$employeeDialog.modal('hide');
                                }
                            });
                        }
                    }
                    return false;
                }
            };*/
        }
        if(type==='loadBg'){
            /*dialogButtons.success = {
                label: '<i class="fa fa-save iconMr"></i> 保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {

                    addBackground.savaDomainName(function (result) {
                            if(result){
                                configMap.employeeGrid.ajax.reload();
                                jqueryMap.$employeeDialog.modal('hide');
                            }
                        })
                    return false;
                }
            };*/
        }
        dialogButtons.cancel= {
            label: '<i class="fa fa-times iconMr"></i> 关闭',
            className: 'btn btn btn-default borderRadius4 color666'
        }
        $.get(url, function (html) {
            jqueryMap.$employeeDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var viewEmployee = function () {
        var el = $(this);
        var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
        var id = configMap.employeeGrid.row(rowIndex).data().id;
        openModal("查看域名配置基本信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id)+'&ifview='+"1", 'eidt');
    };

    var addEmployee = function () {
        openModal('添加域名配置基本信息', configMap.path + configMap.editPageUrl, 'edit');
    };

    var editEmployee = function () {
        var el = $(this);
        var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
        var id = configMap.employeeGrid.row(rowIndex).data().id;
        openModal('编辑域名配置基本信息', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
       /* openModal('编辑域名配置基本信息', configMap.path + configMap.editPageUrl,'edit',encodeURI(id));*/
    };
    var eidtFooter=function () {
        var el = $(this);
        var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
        var id = configMap.employeeGrid.row(rowIndex).data().id;
        var agencyCode=configMap.employeeGrid.row(rowIndex).data().agencyCode;
       /* $.ajax({
            url:configMap.path+'/domainNameOther/showOther/'+agencyCode,
            type:'GET',
            success:function (result) {
                console.info(result);
               /!* if(result.length>0){
                    configMap.ifeidt=true;
                }else{
                    configMap.ifeidt=false;
                }*!/
               if(result[0]){
                   configMap.ifeidt=true;
               }else{
                   configMap.ifeidt=false;
               }
                if(result[1]){
                    configMap.ifeidt1=true;
                }else{
                    configMap.ifeidt1=false;
                }
                if(result[2]){
                    configMap.ifeidt2=true;
                }else{
                    configMap.ifeidt2=false;
                }
                if(result[3]){
                    configMap.ifeidt3=true;
                }else{
                    configMap.ifeidt3=false;
                }
            }
        });*/
        openModal('编辑域名配置其他信息', configMap.path + configMap.footerPageUrl + "?id=" + encodeURI(id)+'&agencyCode='+encodeURI(agencyCode), 'footer')
    }
    var addBackgroundImg=function () {
        var el = $(this);
        var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
        var id = configMap.employeeGrid.row(rowIndex).data().id;
        var agencyCode=configMap.employeeGrid.row(rowIndex).data().agencyCode;
        var companyName=configMap.employeeGrid.row(rowIndex).data().companyName;
        openModal('新增背景图', configMap.path + configMap.backgroundImgUrl +'?&agencyCode='+encodeURI(agencyCode)+'&companyName='+encodeURI(companyName), 'loadBg')
    }
    var delEmployee = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var rowIndex = configMap.employeeGrid.cell(element.parent()).index().row;
        var id = configMap.employeeGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + '/domainNameBasic/delete' + "/" + id,
            type: 'DELETE',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    configMap.employeeGrid.ajax.reload();
                    Messenger().post("删除成功!");
                }
                else {
                    Messenger().post({
                        message: "删除成功!",
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    var initDomainNameBasciGrid = function () {
        configMap.employeeGrid = $('#domainNameManageT', jqueryMap.$domainNameBasic).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "ajax":{
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    var searchTxt=$('#searchTxt',jqueryMap.$container).val();
                    data.searchTxt = searchTxt;
                }
            },
            "columns": [
                {"data": "companyName"},
                {"data": "agencyCode"},
                {"data": "domainAddress"},
                {   'className':'text-center',
                    "render": function (data, type, row) {
                        return configMap.viewBtn_html+configMap.editBtn_html+configMap.loadingBg_html+configMap.footer_html+configMap.delete_html;
                    }
                }
            ],
           /* "language": {
                "zeroRecords": "暂时没有客户",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有客户",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },*/
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]');
                var editContainer = $('[data-type="edit"]');
                var delContainer = $('[data-type="delete"]');
                var viewContainer = $('[data-type="view"]');
                var loadingContainer = $('[data-type="loadBg"]');
                var footerContainer = $('[data-type="footer"]');

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editEmployee);
                }
                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？注意：此删除会同时删除页脚信息与背景图',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delEmployee
                    });
                }
                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewEmployee);
                }
                if(loadingContainer.length>0){
                    loadingContainer.off('click').on('click',addBackgroundImg);
                }
                if(footerContainer.length>0){
                    footerContainer.off('click').on('click',eidtFooter);
                }
            }
        });
    };

    return {
        init: function () {
            $('#adddomainNameBasic',jqueryMap.$domainNameBasic).off('click').on('click', function () {
                addEmployee();
            });
            setJqueryMap();
            initDomainNameBasciGrid();
            $('#searchDomainName').off('click').on('click',function () {
                configMap.employeeGrid.ajax.reload();
            })
            /*initEmployeeData();*/
        },

        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=employee.js