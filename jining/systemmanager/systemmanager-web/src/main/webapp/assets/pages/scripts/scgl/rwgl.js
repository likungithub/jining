/**
 *
 */
var rwgllist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/rwgl/findAllRwgl',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        spflid: '/rwgl/spflid',
        jsonUrl:'/rwgl/jieshouJson',
        rwglGrid:null,
        ids:null,
        jiazai:'/rwgl/jiazai',
        cleanUrl:"/rwgl/cleanTempScJcxm",
        delUrl:"/rwgl/deleteRwglExcel"
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $manualdata:null,
        $ypManageDialog:null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#rwgl' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('#list_rwgl');
    };
    var initrwglGrid = function () {
        configMap.rwglGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "scrollX":true,//水平滚动
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method": "POST",
                "data": function (data) {
                      data.startDate = $('[name="cystartDate"]',jqueryMap.$content).val();
                      data.endDate = $('[name="cyendDate"]',jqueryMap.$content).val();
                      data.ypmc = $('[name="ypmc"]',jqueryMap.$content).val();
                      data.rwlx = $('[name="rwlx"]',jqueryMap.$content).val();
                  }
            },
            "columns": [
                {
                    "data": "cydbh",
                    "render": function (data,type,row) {
                        return '<input type="checkbox" name="ids" value="'+data+'"/>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydbh",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "scdrsj",
                    "render": function (data,type,row) {
                        if(data!='' && data!=null){
                            data = moment(data).format('YYYY-MM-DD');
                        }else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "rwlx",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cyhj",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydd",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "sfby",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "rwly",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cyr",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cyrlxdh",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cyrq",
                    render:function(data, type, row){
                        if(data!='' && data!=null){
                            data = moment(data).format('YYYY-MM-DD');
                        }else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "sfztc",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bcydwmc",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bcydwdz",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bcydwqygm",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ytlx",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "qylx",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bcydwyyzz",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bcydwfrdb",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "xkzlx",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "xkzh",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bcydwnxse",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bcydwlxr",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bcydwdh",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bcydwcz",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bcydwyb",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypmc",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "yply",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cyfs",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypsx",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "yplx",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "sb",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypph",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "rqxz",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "scrq",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bzq",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "zxbz",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ggxh",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "zldj",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "scxkzbh",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "dj",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "sfck",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cyjs",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cysl",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cysldw",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bysl",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "jhl",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "kcl",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bzfl",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypxt",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cysypdcctj",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cctjqt",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cctjwd",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cctjsd",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cyypbz",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypbzqt",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cygj",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "txm",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "jsypjzrq",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bssczmc",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bssczdz",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bssczlxr",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bssczlxdh",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydwmc",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydwjb",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydwdz",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydwlxr",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydwlxdh",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydwlxrdh",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydwlxremail",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydwcz",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "cydwyb",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bz",
                    "render": function (data,type,row) {
                        data=delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
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
            "drawCallback": function () { // 数据加载完成后执行
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
    };
    function delnull(data){//判断数据是否为空值
        if(data==undefined){
            return '';
        }
        if(data=='null'){
            return '';
        }
        return data;
    }
    var chaxun=function () {//查询
        configMap.rwglGrid.clear().draw();
        configMap.rwglGrid.ajax.reload();
    }
    //导入excel
    var  daoru=function () {
        openModal("模板导入","/systemmanager/scgl/importRwglExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                    configMap.rwglGrid.clear().draw();
                    configMap.rwglGrid.ajax.reload();
                }
            });
        });
    }
//打开模态框组件
    var openModal = function (title, url, type, func) {
        var dialogButtons = {};

        if (type === 'daoru') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
        }

        $.get(url, function (html) {
            jqueryMap.$ypManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    //导出excel
    var daochuBtn=function () {
        var ids=[];//定义一个数组
        $('input[name="ids"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为ids的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
       if(ids.length>0){
          /* $.ajax({  //清空temp_sc_jcxm表的信息
               url: configMap.path + configMap.cleanUrl,
               async:false,
               type: "post",
               success: function (data) {
                   console.log(data.info);
               }
           });

           $.ajax({//后台获得值食品分类id    循环插入数据
               url: configMap.path + configMap.spflid,
               async:false,
               type: "post",
               data: {"ids": ids.toString()},
               success: function (data) {
                   var spflids = data.spflids;
                   for (var i = 0; i < spflids.length; i++) {
                       getItemsByCategoryId(spflids[i]);
                   }
               }
           });
           sleep(1000);//睡眠*/
           window.location.href = "/systemmanager/rwgl/exportRwglExcel?ids="+ ids;
       }else {
            Messenger().post({
                message: "请选择导出数据",
                type: 'info',
                id:"ordermessenger"
            });
        }

    }
    //获得接口中的json字符串
    var getItemsByCategoryId =function (categoryId) {
        $.ajax({
            url:"http://124.128.39.242:8087/sample/command/dispatcher/com.inspur.transfer.SampleDataTrans/loadInspectItemByCateId",
            async:false,
            type:"post",
            data:{"categoryId":categoryId},
            dataType:"jsonp",
            success:function (data) {
                var info=JSON.stringify(data);
                $.ajax({
                    url:configMap.path+configMap.jsonUrl,
                    async:false,
                    type:"post",
                    data:{"info":info},
                    success:function (data){

                    },
                    error:function () {
                        Messenger().post({
                            message: "网络异常",
                            type: 'info',
                            id:"ordermessenger"
                        });
                        return;
                    }
                });
            },
            error:function (data) {
                Messenger().post({
                    message: "网络异常",
                    type: 'info',
                    id:"ordermessenger"
                });
                return;
            }
        });
    }
    //睡眠计时器
    var sleep= function(n) {
        var start = new Date().getTime();
        while (true) {
            if (new Date().getTime() - start > n) {
                break;
            }
        }
    }
    var delBtn=function () {//删除按钮
        var ids=[];//定义一个数组
        $('input[name="ids"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为ids的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if(ids.length>0){
            bootbox.dialog({
                title: '提示',
                message: '是否要删除？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                         callback: function () {
                             App.blockUI({
                                 target: jqueryMap.$blockTarget,
                                 boxed: true,
                                 message: '正在删除数据，请稍候...'
                             });
                            $.ajax({
                                url:configMap.path+configMap.delUrl,
                                type:"post",
                                data:{"ids":ids.toString()},
                                success:function (data) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    configMap.rwglGrid.ajax.reload();
                                    Messenger().post({
                                        message: data.info,
                                        type: 'success',
                                        id:"ordermessenger"
                                    });
                                },
                                error:function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    configMap.rwglGrid.ajax.reload();
                                    Messenger().post({
                                        message: '删除失败！',
                                        type: 'error',
                                        id:"ordermessenger"
                                    });
                                    return;
                                }
                            });
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }else {
            Messenger().post({
                message:"请选择删除数据",
                type: 'info',
                id:"ordermessenger"
            });
        }

    }
    return{
        inint:function (uuid) {
            setJqueryMap(uuid);
            initrwglGrid();
            jqueryMap.$content.find('#chaxun').off('click').on('click',function () {//触发查询
                chaxun();
            })
            jqueryMap.$content.find('#reset').off('click').on('click',function () {//触发重置
                $("input",jqueryMap.$content).val("");
                chaxun();
            })
            jqueryMap.$content.find('#btn_daoru').off('click').on('click',function () {//导入
                daoru();
            });
            jqueryMap.$content.find('#btn_daochu').off('click').on('click',function () {//导出
                daochuBtn();
            })
            jqueryMap.$content.find('#shanchu').off('click').on('click',function () {//删除
                delBtn();
            })
            $("#check1",jqueryMap.$content).on('click',function () {//多选反选
                if($("#check1",jqueryMap.$content).prop("checked")){
                    //选中
                    $("[name='ids']",jqueryMap.$content).prop("checked",true);
                }else{
                    $("[name='ids']",jqueryMap.$content).prop("checked",false);
                }
            });
            laydate.render({
                elem: "#rwgl_tartDate" //指定元素
            });
            laydate.render({
                elem: "#rwgl_endDate" //指定元素
            });
        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();
