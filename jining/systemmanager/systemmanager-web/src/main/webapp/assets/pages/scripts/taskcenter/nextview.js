

var stepHint = function () {
    var configMap = {
        path:null,
        getSfxmUrl:'/costprojectmanagement/findAllCostProject',
        getBzxxUrl:'/processManage/queryjbxx/',
        // step:0,
        bzid:null
    };

    var jqueryMap = {
        $stepForm: null,
        $setfile: null,
        $appZH: null,
        $khflAddDialog: null
    };

    var setJqueryMap = function () {
        jqueryMap.$stepForm = $('#stepForm');
        jqueryMap.$szDataTable = $('#szData', jqueryMap.$stepForm);
    };
    var step = 0;
    var getBzxx = function (data) {
        var id = localStorage.getItem("id")
        if(id !== null){
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: configMap.path + configMap.getBzxxUrl + id,
                dataType: 'JSON',
                type: 'get',
                data: {
                    lcid:data
                },
                success: function (result) {
                    if(result.listLcglbzxx[step] == undefined){
                        $("input.bjbzList").addClass("noMessage")
                    }else{
                        $("input[name='bzmc']").val(result.listLcglbzxx[step].bzmc);
                        $("textarea[name='bzsx']").val(result.listLcglbzxx[step].bzxx);
                        if(result.listLcglbzxx[0].cxbxbz==0){
                            // var status = "0";
                            // $(".link").each(function (index) {
                            //     if($(".link").eq(index).attr("data")==status){
                            //         $(".link").eq(index).prop("checked",true)
                            //     }
                            // })
                            $(".link").eq(1).prop("checked",true)
                            // next++;
                        }else{
                            // var status = "1";
                            // $(".link").each(function (index) {
                            //     if($(".link").eq(index).attr("data")==status){
                            //         $(".link").eq(index).prop("checked",true)
                            //     }
                            // })
                            $(".link").eq(0).prop("checked",true)
                            // next++;
                        }
                        localStorage.setItem("cxbzid"+ step,result.listLcglbzxx[0].id)
                        localStorage.setItem("cxbzid1"+ step,result.listLcglbzxx[0].bzid)
                        $("#addbzFile").attr("data",step)
                        step++;
                    }

                }
            })
        }

    }
    
    var stepNav = function () {
        var step = parseFloat(localStorage.getItem("addEducation"));
        var stepDom;
        if(step==1){
            stepDom = '<li step='+step+'><div title="点击编辑查看当前步骤" class="editColor"><span>'+step+'</span></div></li>';
            $(".stepHint").append(stepDom);
            return
        }
        for (var i =1;i<=step;i++){
            if(i==1){
                stepDom = '<li step='+i+'><div title="点击编辑查看当前步骤" class="editColor"><span>'+i+'</span></div><img src="'+configMap.path+'/assets/pages/img/nav_img.gif" alt="" /></li>';
                $(".stepHint").append(stepDom);
            }else if(i!==step){
                stepDom = '<li step='+i+'><div title="点击编辑查看当前步骤"><span>'+i+'</span></div><img src="'+configMap.path+'/assets/pages/img/nav_img.gif" alt="" /></li>';
                $(".stepHint").append(stepDom);
            }else{
                stepDom = '<li step='+i+'><div title="点击编辑查看当前步骤"><span>'+i+'</span></div></li>';
                $(".stepHint").append(stepDom);
            }

        }
    }

    //客户附件
    $('#addbzFile').on('click', function () {
        var dialogButtons = {
            /*cancel: {
             label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
             className: 'btn-default'
             }*/
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4",
            callback: function () {
                stepfiles.getfile(function (result) {
                    if (result) {
                        jqueryMap.$setfile.modal('hide');
                        $("#addfiles").html("添加附件(" + sessionStorage.getItem("filesize") + ")");
                    }
                });
                // return false;
            }
        };
//            	var htbm = $('[name="htbm"]').val();
        $.get("/systemmanager/taskcenter/processmanagement/stepfile.jsp", function (html) {
            jqueryMap.$setfile = bootbox.dialog({
                title: '添加附件',
                message: html,
                buttons: dialogButtons
            });
        });
    });

    return {
        init: function () {

            localStorage.setItem("next",0)
            if(localStorage.getItem("cxlcid")!==""){
                getBzxx(localStorage.getItem("cxlcid"));
            }else{
                getBzxx(localStorage.getItem("lcid"));
            }

            stepNav();
            localStorage.setItem('bzid',"");
            $(".stepHint li div").css("background","#0EA1F7")
            $(".stepHint li div")[0].style.background = '#79C002';
            //textarea输入字数限制
            var obj = $("#stepForm textarea");
            var num = 300;
            var numObj = $("#stepForm .wordNum span")
            checkHowMany(obj,numObj,num);
        },

        setPath: function (path) {
            configMap.path = path;
        }
    };
}();