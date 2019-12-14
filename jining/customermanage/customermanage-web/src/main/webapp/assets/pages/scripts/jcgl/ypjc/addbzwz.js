var addbzwzList = function () {
// 全局属性参数
    var configMap = {
        dataUrl: "/systemmanager/kcgl/kcglSeach",
        // dataUrl:'customermanage/ypjc/findAllYq',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        addbzwzGrid: null,
        uuid:''
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $ypManageDialog:null,
    };
    //赋值
    var setJqueryMap = function(uuid) {
        jqueryMap.$container = $('#'+uuid+'-manager-container');
        jqueryMap.$blockTarget = $('body');
    };
    var bzwzJson={
        id:'',
        data:[]
    } 
    var initlistGrid = function() {
       configMap.addbzwzGrid = $("#addbzwz_ManagerList",jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url":configMap.dataUrl,
                "dataSrc": "aaData",
                 "method": "POST",
                "data": function (data) {
                    data.hcmc =  $("#hcmc",jqueryMap.$container).val();
                    data.startDate = '',
                    data.endDate = '';
                    data.hclx ='';
                }
            },
            "columns": [  
                    {
                        "data": "id",
                        render: function (d, t, r) {
                            return '<input type="checkbox" name="bzwzids" value="' + d + '"/>';
                        }
    
                    },
                   
                    {
                        "data": "hcmc",
                        render: function (d, t, r) {
                            d = delnull(d);
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                        }
    
                    },
                    {
                        "data": "gg",
                        render: function (d, t, r) {
                            d = delnull(d);
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                        }
    
                    },
                    {
                        "data": "jb",
                        render: function (d, t, r) {
                            d = delnull(d);
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                        }
                    },
                   
                    {
                        "data": "hclx",
                        render: function (d, t, r) {
                            if (d == '1') {
                                d = "一般耗材";
                            }
                            if (d == '2') {
                                d = "化学品";
                            }
                            if (d == '3') {
                                d = "易制毒";
                            }
                            if (d == '4') {
                                d = "易制爆";
                            }
                            if (d == '5') {
                                d = "标准物质";
                            }
                            d = delnull(d);
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                bzwzJson.data.forEach(function(item){
                    $('input[value="'+item.id+'"]',jqueryMap.$container).prop('checked',true)
                })
                $('input[name="bzwzids"]',jqueryMap.$container).off('change').on('change',function(){
                    var el = $(this);
                    console.log(el)
                    var rowIndex = configMap.addbzwzGrid.cell(el.parent()).index().row;
                    var id = configMap.addbzwzGrid.row(rowIndex).data().id;
                    var namestr = configMap.addbzwzGrid.row(rowIndex).data().hcmc
                    if (el.prop("checked")) {
                        //选中
                        el.prop("checked", true);
                       addJson(id,namestr)
                    }else{
                        el.prop("checked", false); 
                        removeJson(id,namestr)
                    }
                    $('#add_bzwz',jqueryMap.$container).text(_.map(bzwzJson.data,'name').join(','))
                });
            }
        });
    }
    function addJson(id, name){
        var index  = _.findIndex(bzwzJson.data,function(item){
            return item.id == id
        })
        if(index<0){
            bzwzJson.data.push({
                id:id,
                name:name
            })
        }
    }
    function removeJson(id,name){
        var index  = _.findIndex(bzwzJson.data,function(item){
            return item.id == id
        })
        if(index>=0){
            _.remove(bzwzJson.data,function(item){
                return item.id == id
            })
        }
    }
    return{
        init:function (id,uuid,bzwzlist) {
            if(bzwzlist === "" || typeof(bzwzlist)==undefined ||bzwzlist==null){
                bzwzJson ={
                    id: id,
                    data:[]
                } 
            }else{
                bzwzJson = {
                    id: id,
                    data:JSON.parse(bzwzlist)
                }
                $('#add_bzwz',jqueryMap.$container).text(_.map(bzwzJson.data,'name').join(','))
            }

            setJqueryMap(uuid);
            initlistGrid();
          
            jqueryMap.$container.find("#bzwzSeach").on("click",function () {//查询
                configMap.addbzwzGrid.ajax.reload();
            });
          
        },
        getbzwzData:function () {//让外部获得仪器的id
            return bzwzJson
        }
    }
}();


