/**
 *
 */
var continuelist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/contract/continuelist',
        adpotUrl: '/contractaudit/contractauditadpot',
        treeUrl: '/organization/organization/orgAndUserAuth',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        statusUrl: '/contractaudit/status',
        contractauditGrid: null,
        viewPageUrl: '/contractcontinue/continue.jsp',
        viewBtn_html: '<a data-toggle="tooltip" data-placement="bottom" type="button" name="htxy" ' +
            'title="合同续约"><i class="icon iconfont icon-xuyue btnxystyle iconFontColor-10a0f7' +
            ' iconFontSize"></i></a>',
        statusredis: null,
        classType: '',
        currentSelectedNode: null,
        fwzt: '',
        other: '',
        $days:'999999999'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $htxyTree:null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#contractcontinue_id_div' + '_' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#contractcontinue_data');
        jqueryMap.$htxyTree = $('#htxy_tree', jqueryMap.$content);
    };

    var initContractauditGrid = function () {
        configMap.contractauditGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.days=configMap.$days;
                    data.classType = configMap.classType;
                    data.other = configMap.other;
                    data.fwzt = configMap.fwzt;
                }
            },
            "columns": [
                {
                    "data": "yhmc",
                    className: "text-left"
                },
                {
                    "data": "zydm",
                    className: "text-left"
                },
                {
                    className: "text-center",
                    "data": "htbm"
                },
                {
                    className: "text-center",
                    "data": "qyrq",
                    "render": function (data) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {
                    className: "text-center",
                    "data": "fwqxq",
                    "render": function (data) {
                        return moment(data).format('YYYY-MM');
                    }
                },
                {
                    className: "text-center",
                    "data": "fwqxz",
                    "render": function (data) {
                        return moment(data).format('YYYY-MM');
                    }
                },
                {
                    className:'text-right',
                    "data": "hjje",
                    "render":function (data){
                        return moneySplitByComma(data.toFixed(2));
                    }
                },
                // {
                //     className:'text-right',
                //     "data": "zfy",
                //     "render": function (data) {
                //         return moneySplitByComma(data.toFixed(2));
                //     }
                // },
                // {
                //     className:'text-center',
                //     "data": "fkfs_mc"
                // },
                {
                    className:'text-center',
                    "render": function () {
                        return configMap.viewBtn_html;
                    }
                }
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "fnFooterCallback": function(row, data, start, end, display) {//总计
                var api = this.api(), data;
                // Remove the formatting to get integer data for summation
                var intVal = function ( i ) {
                    return Number(Number(i).toFixed(2))
                    // return typeof i === 'string' ?
                    //     i.replace(/^\d+(?:\.\d{0,2})?/, '')*1 :
                    //     typeof i === 'number' ?
                    //         i : 0;
                };
                function number(data){
                    if(data!=null){
                        return data.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
                    }else{
                        return ;
                    }
                }
                var total = api
                    .column( 6 )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
                $( api.column( 6 ).footer() ).html(
                    number(total)
                );//垫付金额

            },
            "drawCallback": function () { // 数据加载完成后执行				
                var viewContainer = jqueryMap.$content.find('[name="htxy"]');// $('[data-type="view"]');
                $('[data-toggle="tooltip"]').tooltip();
                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewContractaudit);
                }
            }
        });
    };

    var openModal = function (title, url) {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                contractcontinue.saveContract(function (result) {
                    if (result) {
                        Messenger().post("操作成功，请等待审核!");
                        jqueryMap.$contractauditDialog.modal('hide');
                        configMap.contractauditGrid.ajax.reload();
                    }
                });
                return false;
            }
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var viewContractaudit = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
        var id = configMap.contractauditGrid.row(rowIndex).data().htbm;
        openModal("续签合同", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
    };

    var initOrganization = function () {
        var jstree = jqueryMap.$htxyTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.treeUrl
                },
                "state": {
                    "opened": true,  //展示第一个层级下面的node
                    //该根节点不可点击
                }
            },
            "types": {
                "default": {
                    "icon": true
                }

            },

            'plugins': ["types", "expand", "search"],
            "expand": {
                level: 5
            }
        }).on("load_node.jstree", function (e, d) {
            $('#htxy_tree').on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            getTreeNum();
            $("#htxy_tree").bind("select_node.jstree", function (e, data) {

                if (data.node.id == 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        $('#htxy_tree').jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });


        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#htxy_tree li").length; i++) {
                var $temp = $("#htxy_tree li").eq(i).attr("userimg");
                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                } else {
                    localStorage.setItem("step",i);
                }
            }
            $(".jstree-children li").each(function () {
                if($(this).attr("userImg")==0){
                    $(this).find("a").eq(0).find("i").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
                }

            })
        }

        jqueryMap.$htxyTree.on('select_node.jstree', function (e, data) {
            configMap.currentSelectedNode = data.node;
            if (data.node.parent === '#') { //点击的是所有客户
                configMap.classType = 1;
                configMap.fwzt = 1; //正在服务的
                if (data.node.id === 'stopCustomer') {//停止服务的
                    configMap.fwzt = 0;
                }
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出已经停止服务的客户列表信息
                configMap.contractauditGrid.clear().draw();
                configMap.contractauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            } else if (data.node.li_attr.BMBZ === "1") { //部门标志为true，代表为部门
                configMap.fwzt = 1; //正在服务的
                configMap.classType = 2; //代表部门
                configMap.other = data.node.li_attr.bmdm; //部门代码
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出该部门的客户列表信息
                configMap.contractauditGrid.clear().draw();
                configMap.contractauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            } else { //代表个人
                configMap.fwzt = 1; //正在服务的
                configMap.classType = 3;
                configMap.other = data.node.li_attr.zydm;
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                configMap.contractauditGrid.clear().draw();
                configMap.contractauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
        //jstree定时搜索功能
        //输入框输入定时自动搜索
        var to = false;
        $('#search_Htxyay').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_Htxyay').val());
            }, 250);
        });

    };
    
    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid = $('#contractcontinue_id_div_' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, continuelist);
            Layout.addResizeContent(jqueryMap.$content);
            setTimeout(function () {
                var layout = jqueryMap.$content.layout({
                    center__onresize: App.initLayoutContentScrollbar,
                    west__onresize: App.initLayoutContentScrollbar,
                    west__size: 200
                });
                App.initLayoutContentScrollbar('west', layout.panes.west);
                App.initLayoutContentScrollbar('center', layout.panes.center);
            }, 10);

            configMap.classType = 1;
            configMap.fwzt = 1; //正在服务的
            initOrganization();
            
            //获取列表
            initContractauditGrid();
            //按钮颜色控制
            $(".htshbtn").bind("click",function () {
                $(this).addClass("btnBorderColor").siblings("button").removeClass("btnBorderColor");
                configMap.$days=$(this).attr("data-val");
                configMap.contractauditGrid.ajax.reload();
            })
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=log.js
	
	