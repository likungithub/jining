/**
 * Created by Administrator on 2017/10/30 0030.
 */
var staffSelect_m = function(){
    var configMap = {
        path:'',
        dataUrl:'/organization/organization/orgAndUser',
        type:''
    };
    var jqueryMap = {
        $staffListTree:null
    }
    var setJqueryMap = function () {
        jqueryMap.$staffListTree = $('#staffTree_m','#allotStaffList_m');

    }

$('#allotStaffList_m').parents('.modal-dialog').css('width',720);

    if($('#addZXR').attr('zxry_dm')){
        //console.log(1211,$('#addZXR').attr('zxry_dm').search(/,/));
        if($('#addZXR').attr('zxry_dm').search(/,/)== (-1))
        {
            $('<li' + ' user="' + $('#addZXR').html() + '"' + 'zydm="' + $('#addZXR').attr('zxry_dm') + '">' + '<img style="margin-right: 15px;height: 22px;width: 22px;border-radius: 50%!important" src="' + $('#addZXR').attr('rtx') + '">' + $('#addZXR').html()  + '<a class="pull-right glyphicon glyphicon-trash" style="color: #898989;"></a>' + '</li>').appendTo($('#alreadyPer', '#allotStaffList_m'));
        }else{
            var arr1=$('#addZXR').attr('zxry_dm').split(',');
            $('#addZXR i').remove();
            var  arr2=$('#addZXR').html().split(',');
            var arr3 = $('#addZXR').attr('rtx').split(',');
            $('#alreadyPer', '#allotStaffList_m').empty();
            for (var i = 0;i<arr1.length;i++){
                $('<li' + ' user="' + arr2[i]+ '"' + 'zydm="' + arr1[i] + '">' + '<img style="margin-right: 15px;height: 22px;width: 22px;border-radius: 50%!important" src="' + arr3[i] + '">' + arr2[i]  + '<a class="pull-right glyphicon glyphicon-trash" style="color: #898989;"></a>' + '</li>').appendTo($('#alreadyPer', '#allotStaffList_m'));
            }
        }
    }
    //任务列表负责人的回填
    if(sessionStorage.getItem('deltag')==1){
        if($('#fzrmc_sl').attr('fzrmc')){
            // console.log(1211,$('#fzrmc_sl').attr('zxry_dm').search(/,/));
            if($('#fzrmc_sl').attr('fzrmc').search(/,/)== (-1))
            {
                $('<li' + ' user="' + $('#fzrmc_sl').html() + '"' + 'zydm="' + $('#fzrmc_sl').attr('fzrmc') + '">' + '<img style="margin-right: 15px;height: 22px;width: 22px;border-radius: 50%!important" src="' + $('#fzrmc_sl').attr('rtx') + '">' + $('#fzrmc_sl').html()  + '<a class="pull-right glyphicon glyphicon-trash" style="color: #898989;"></a>' + '</li>').appendTo($('#alreadyPer', '#allotStaffList_m'));
            }else{
                var arr1=$('#fzrmc_sl').attr('fzrmc').split(',');
                var  arr2=$('#fzrmc_sl').html().split(',');
                var arr3 = $('#fzrmc_sl').attr('rtx').split(',');
                $('#alreadyPer', '#allotStaffList_m').empty();
                for (var i = 0;i<arr1.length;i++){
                    $('<li' + ' user="' + arr2[i]+ '"' + 'zydm="' + arr1[i] + '">' + '<img style="margin-right: 15px;height: 22px;width: 22px;border-radius: 50%!important" src="' + arr3[i] + '">' + arr2[i]  + '<a class="pull-right glyphicon glyphicon-trash" style="color: #898989;"></a>' + '</li>').appendTo($('#alreadyPer', '#allotStaffList_m'));
                }
            }
        }

    }

    var initOrganization = function () {
        var jstree = jqueryMap.$staffListTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.dataUrl,
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

            'plugins': ["types", "expand","search"],
            "expand": {
                level: 5
            }
        }).on("load_node.jstree", function (e, d) {
            $("#staffTree_m").on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            $("#staffTree_m").bind("select_node.jstree", function (e, data) {
                data.instance.toggle_node(data.node);
                // clearTreeNum();
                getTreeNum();
            });
            getTreeNum();
        });

        var getTreeNum = function () {
            for (var i = 0; i < $("#staffTree_m li").length; i++) {
                var $temp = $("#staffTree_m li").eq(i).attr("userimg");
                // var $text = $("#orgAndUser_manage_tree li").eq(i).attr("usertext");

                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                } else {
                    localStorage.setItem("step",i);
                    localStorage.setItem("userImg",$temp);
                    $("#staffTree_m li").eq(i).find("a").eq(0).find("i").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
                }
            }
        }

        //输入框输入定时自动搜索
        var to = false;
        $('#search_yg').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_yg').val());
                // $("#orgAndUser_manage_tree").jstree(true).refresh();
            }, 250);

        });

        jqueryMap.$staffListTree.on('select_node.jstree', function (e, data) {
            //console.log(e,'mdw',data);
            //console.log( configMap.type,3333);
            if(configMap.type=='one'){
                if ( $('#alreadyPer li').length==1)
                {
                    App.alert({
                        container:$('#allotStaffList_m').closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '对不起,您只能选择一个人员！',
                        icon: 'fa fa-warning'
                    });
                    return;
                }

                if(data.node.li_attr.zydm) {
                    $('<li' + ' user="' + data.node.li_attr.userText + '"' + 'zydm="' + data.node.li_attr.zydm + '">' + '<img style="margin-right: 15px;height: 22px;width: 22px;border-radius: 50%!important" src="' + data.node.icon+ '">' + data.node.li_attr.userText + '<a class="pull-right glyphicon glyphicon-trash" style="color: #898989;"></a>' + '</li>').appendTo($('#alreadyPer', '#allotStaffList_m'));
                }

                return false;
            }
            if(configMap.type=='any'){
                //防止一人重复添加的
                var tag=0;
                $('#alreadyPer li').each(function (){
                    if($(this).attr('zydm')==data.node.li_attr.zydm){
                        tag=1;
                    }
                });
                if(tag==1){  return false;}
                if(data.node.li_attr.zydm) {
                    $('<li' + ' user="' + data.node.li_attr.userText + '"' + 'zydm="' + data.node.li_attr.zydm + '">' + '<img style="margin-right: 15px;height: 22px;width: 22px;border-radius: 50%!important" src="' + data.node.icon + '">' + data.node.li_attr.userText + '<a class="pull-right glyphicon glyphicon-trash" style="color: #898989;"></a>' + '</li>').appendTo($('#alreadyPer', '#allotStaffList_m'));
                }
                if (data.node.li_attr.bmbz) { // 选择的是部门
                    var allnodes = data.node.children_d;
                    for (var i = 0; i < allnodes.length; i++) {
                        //设置下方的被选中
                        jqueryMap.$staffListTree.jstree(true).select_node(allnodes[i]);
                        //var node = $('#staffTree_m','#allotStaffList_m').jstree("get_node", allnodes[i]);
                    }
                }
            }
        });

    }

        $('#alreadyPer','#allotStaffList_m').on('click','a',function (e) {
                $(this).parent('li').remove();

            });

    return {
        init:function(type){
            configMap.type = type;
            setJqueryMap();
            initOrganization();
            if(configMap.type=='one'){
                $('#alreadyPer').empty();
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;

        }

    }

}();