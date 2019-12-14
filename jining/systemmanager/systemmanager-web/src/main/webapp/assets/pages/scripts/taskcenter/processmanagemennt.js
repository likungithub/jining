var processmanagement = function () {

    var configMap = {
        path: '',
        dataUrl: '/processManage/queryProcessAll',
        stepaddUrl:'/processManage/addBzxx',
        stepeditUrl:'/processManage/updatebzxx',
        getBzxxUrl:'/processManage/queryjbxx/',
        addUrl:'/processManage/addProcess',
        getAllBzxx : '/processManage/querybzxx_lcid/',
        delUrl: '/processManage/deljbxx/',
        editUrl:'/processManage/updatejbxx/',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        statusUrl: '/contractaudit/status',
        porcessmanagementGrid: null,
        statusredis: null,
        fsbz: 0,
        lcid:null,
        step:0,
        viewGrid:null
    };
    var htbmjson = [];

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $contractauditstarDate: null,
        $contractauditendDate: null,
        $content: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#processmanagement');
        jqueryMap.$manualdata = $('table#processmanagement_data', jqueryMap.$content);
        // jqueryMap.$contractauditstarDate=jqueryMap.$content.find('div#starDate_div');
        // jqueryMap.$contractauditendDate=jqueryMap.$content.find('div#endDate_Div');
    };

// 点击查看详情
    var viewDetails = function (el) {
        var el = el
        var rowIndex = configMap.porcessmanagementGrid.cell(el.parent()).index().row;
        var lcid = configMap.porcessmanagementGrid.row(rowIndex).data().lcid;
        var id = configMap.porcessmanagementGrid.row(rowIndex).data().id;
        localStorage.setItem("lcid",lcid)
        localStorage.setItem("id",id)
        var dialogButtons3 = {};

        var dqid = $("#processmanagement_data .customerManageraa")[0].children[0].innerHTML;
        localStorage.setItem("dqid",dqid)
        dialogButtons3.cancel = {
            label: '<i class="fa fa-times  iconMr"></i>关闭',
            className: "btn btn btn-default borderRadius4",
        };
        $.get('/systemmanager/taskcenter/processmanagement/viewDetails.jsp', function (html) {
            bootbox.dialog({
                title: '工商登记——详细',
                message: html,
                buttons: dialogButtons3
                // className:'commonProblemType-dialog'
            });

        })
    }

    //点击添加流程 点击编辑流程 点击下一步按钮弹出添加步骤
    var nextClick = function (data) {
        var title;
        if(data.attr("data")=="add"){


            title = "添加流程";
            var dialogButtons1 = {};
            var dialogButtons2 = {};

            dialogButtons1.success = {
                label: '<i style="font: normal normal normal 16px/1 FontAwesome!important;margin-right: 5px;" class="' + 'fa fa-save' + '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff next",
                callback: function () {
                    configMap.lcid = localStorage.getItem("lcid");
                    var lcmc ;
                    var sfxmmc;
                    var sfxmCode;
                    var lcbz;
                    var cjsj;
                    var msxx;
                    if ($("input[name='lcmc']").val() == "") {
                        AppAlert("流程名称不能为空！");
                        return false
                    }else if($('#addCharge').find("option:selected").text()=="请选择"){
                        AppAlert("服务项目不能为空！");
                        return false
                    }else if($("#addEducation").find("option:selected").text()=="请选择"){
                        AppAlert("流程步数不能为空！");
                        return false
                    }else if($("input[name='addDate']").val() == "") {
                        AppAlert("创建时间不能为空！");
                        return false
                    }else{
                        lcmc = $("input[name='lcmc']").val();
                        sfxmmc = $("#addCharge").text();
                        sfxmCode = $("#addCharge").val();
                        lcbz = $("#addEducation").val();
                        cjsj = $("input[name='addDate']").val();
                        msxx = $("textarea[name='msxx']").val();
                        var data = {
                            lcid:configMap.lcid,
                            lcmc:lcmc,
                            sfxmDm:sfxmCode,
                            lcbz:lcbz,
                            lrrq:cjsj,
                            lcms:msxx
                        };
                        $.ajax({
                            url: configMap.path + configMap.addUrl ,
                            type: 'post',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'JSON',
                            async: false ,
                            data: JSON.stringify(data),
                            success: function (result) {

                                App.unblockUI(jqueryMap.$blockTarget);
                                if (result.success) {
                                    localStorage.setItem("lcid",result.lcid)
                                    // localStorage.setItem("id",result.lcid)

                                   configMap.porcessmanagementGrid.ajax.reload();

                                    $("[data-bb-handler]").each(function () {
                                        if($(this).attr("data-bb-handler")=='success'){
                                            // $(this).hide()
                                            $(this).attr("data-bb-handler")
                                            $("botton[data-bb-handler='success']").attr("status",true)
                                        }
                                    })

                                    Messenger().post({
                                        message: "创建流程成功",
                                        type: 'success'
                                    });


                                    var savaliStep = 0;
                                    var nextliStep = 1;
                                    var step = 1;


                                    var addEducation = $('#addEducation ').val();
                                    // $('.cjbznext').attr("disabled", "disabled");
                                    if (addEducation != 0) {
                                        localStorage.setItem("addEducation", addEducation)
                                    }
                                    dialogButtons2.cancle = {
                                        label: '<i class="' + 'iconfont  icon-tuichu1' + '"></i>上一步',
                                        className: 'btn btn btn-success btnBlue borderRadius4 colorfff cjbznext',
                                        callback:function () {
                                            savaliStep--;
                                            nextliStep--;
                                            var previous = savaliStep;
                                            localStorage.setItem("bzid","")
                                            if(savaliStep>0){
                                                $('button[data-bb-handler="cancle"]').show()
                                            }else{
                                                $('button[data-bb-handler="cancle"]').hide()
                                            }
                                            $("[data-bb-handler]").each(function () {
                                                if($(this).attr("data-bb-handler")=='success'){
                                                    $(".stepHint li div").each(function (index) {
                                                        if(index==previous&&previous>=0){
                                                            $(this).css("background","#79C002")
                                                            $(this).parent().next().children("div").css("background","#0EA1F7")
                                                        }
                                                    })
                                                }
                                            })

                                            var lcid = localStorage.getItem("lcid")
                                            $.ajax({
                                                // headers: {
                                                //     'Accept': 'application/json',
                                                //     'Content-Type': 'application/json'
                                                // },
                                                url: configMap.path + configMap.getAllBzxx + lcid,
                                                dataType: 'JSON',
                                                type: 'get',
                                                success: function (result) {
                                                    localStorage.setItem("dqbzId",result[savaliStep].bzid)
                                                    localStorage.setItem("bzid",result[savaliStep].bzid)
                                                    $("input[name='bzmc']").val(result[savaliStep].bzmc)

                                                    $("textarea[name='bzsx']").val(result[savaliStep].bzxx)

                                                    if(result[savaliStep].cxbxbz==1){
                                                        $(".link").eq(0).prop("checked",true)
                                                        // next++;
                                                    }else{
                                                        $(".link").eq(1).prop("checked",true)
                                                        // next++;
                                                    }

                                                    // $('button[data-bb-handler="ok"]').show()
                                                    $('button[data-bb-handler="success"]').html("<i class='icon iconfont icon-xiayibu iconFontSize' style='color: #fff;'></i>下一步")
                                                    $('button[data-bb-handler="success"]').attr('class','btn btn btn btn-success btnBlue borderRadius4 colorfff')

                                                    // $('button[data-bb-handler="success"]').hide()

                                                    $("input[name='bzmc']").addClass("hasMessage")
                                                    $("textarea[name='bzsx']").addClass("hasMessage")
                                                    var checkRadio = $("input[name='rl$tt']:checked").attr("data")
                                                    // $('button[data-bb-handler="success"]').hide()
                                                    // $('button[data-bb-handler="ok"]').show()
                                                    // $(".hasMessage").on("change",function () {
                                                    //     if($("input[name='type1']:checked").attr("data")!==checkRadio){
                                                    //         $('button[data-bb-handler="success"]').show()
                                                    //         $('button[data-bb-handler="ok"]').hide()
                                                    //     }
                                                    // })

                                                }
                                            })
                                            // if(savaliStep==localStorage.getItem("addEducation")-1){
                                            //     $("[data-bb-handler]").each(function () {
                                            //         if($(this).attr("data-bb-handler")=='ok'){
                                            //             $(this).text("关闭")
                                            //         }
                                            //     })
                                            // }

                                            // if(savaliStep<localStorage.getItem("addEducation")){
                                            //     return false;
                                            // }

                                            return false;
                                        }
                                    };
                                    dialogButtons2.success = {
                                        label: '<i style="font: normal normal normal 16px/1 FontAwesome!important;margin-right: 5px;" class="icon iconfont icon-xiayibu iconFontSize" style="color: #fff;"></i>下一步',
                                        className: "btn btn-success btnBlue borderRadius4 colorfff cjbzBtn",
                                        callback: function () {

                                            if($('input').hasClass("hasMessage")){
                                                var bzmc;
                                                var yxhj;
                                                var bzsx;
                                                var dqbz;
                                                if(savaliStep+1>localStorage.getItem("addEducation")){
                                                    return
                                                }else if ($("input[name='bzmc']").val() == "") {
                                                    AppAlert("步骤名称不能为空！");
                                                }else if ($(".link")[0].checked == false && $(".link")[1].checked == false) {
                                                    AppAlert("与下环节不能为空！");
                                                }else{
                                                    bzmc = $("input[name='bzmc']").val();
                                                    $(".link").each(function (index) {
                                                        if($(".link").eq(index).prop("checked")==true){
                                                            yxhj = $(".link").eq(index).attr("data");
                                                        }
                                                    })
                                                    // dqbz =configMap.step
                                                    bzsx = $("textarea[name='bzsx']").val();
                                                    var data = {
                                                        bzid:localStorage.getItem("dqbzId"),
                                                        bzmc:bzmc,
                                                        cxbxbz:yxhj,
                                                        bzxx:bzsx,
                                                        dqbz:savaliStep+1
                                                    };

                                                    $.ajax({
                                                        url: configMap.path + configMap.stepeditUrl ,
                                                        type: 'post',
                                                        // headers: {
                                                        //     'Accept': 'application/json',
                                                        //     'Content-Type': 'application/json'
                                                        // },
                                                        // contentType: 'application/json; charset=utf-8',
                                                        dataType: 'JSON',
                                                        data: data,
                                                        success: function (result) {
                                                            App.unblockUI(jqueryMap.$blockTarget);
                                                            if (result.success) {
                                                                $(".stepHint li div").css("background","#0EA1F7")
                                                                // localStorage.setItem("bzid",result.bzid)
                                                                // initPorcessmanagementData();
                                                                //
                                                                // $("[data-bb-handler]").each(function () {
                                                                //     if($(this).attr("data-bb-handler")=='success'){
                                                                //         $(".stepHint li div").each(function (index) {
                                                                //             if(index==savaliStep){
                                                                //                 $(this).css("background","#0EA1F7")
                                                                //             }
                                                                //         })
                                                                //     }
                                                                // })
                                                                //
                                                                savaliStep++;
                                                                nextliStep++;
                                                                // $('.cjbznext').attr("disabled", false);
                                                                Messenger().post({
                                                                    message: "当前步骤修改成功",
                                                                    type: 'success'
                                                                });
                                                                // $('button[data-bb-handler="success"]').hide()
                                                                // $('button[data-bb-handler="ok"]').show()
                                                                if(savaliStep>1){
                                                                    $('button[data-bb-handler="cancle"]').show()
                                                                }else{
                                                                    $('button[data-bb-handler="cancle"]').hide()
                                                                }



                                                                if($("input").hasClass("hasMessage")){
                                                                    $("input").removeClass("hasMessage");
                                                                    $("textarea").removeClass("hasMessage");
                                                                }

                                                                var lcid = localStorage.getItem("lcid")
                                                                $.ajax({
                                                                    // headers: {
                                                                    //     'Accept': 'application/json',
                                                                    //     'Content-Type': 'application/json'
                                                                    // },
                                                                    url: configMap.path + configMap.getAllBzxx + lcid,
                                                                    dataType: 'JSON',
                                                                    type: 'get',
                                                                    success: function (result) {

                                                                        if(!result[savaliStep]){
                                                                            if(savaliStep==localStorage.getItem("addEducation")){
                                                                                $("[data-bb-handler]").each(function () {
                                                                                    if($(this).attr("data-bb-handler")=='success'){
                                                                                        $(".stepHint li div").css("background","#0EA1F7")
                                                                                        $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                                                                        $(this).attr('class','btn btn btn btn-default borderRadius4')
                                                                                        return;
                                                                                    }
                                                                                })
                                                                            }else{
                                                                                localStorage.setItem("bzid","")
                                                                                $('button[data-bb-handler="cancle"]').show()
                                                                                $("[data-bb-handler]").each(function () {
                                                                                    if($(this).attr("data-bb-handler")=='success'){
                                                                                        $(".stepHint li div").each(function (index) {
                                                                                            if(index==savaliStep){
                                                                                                $(this).css("background","#79C002");
                                                                                                $(this).parent().prev().children("div").css("background","#0EA1F7");
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                                // $('button[data-bb-handler="ok"]').hide()
                                                                                // $('button[data-bb-handler="success"]').show()
                                                                                // $('button[data-bb-handler="cancle"]').hide()
                                                                                // savaliStep++;
                                                                                // nextliStep++;
                                                                                $("#stepForm input").val("");
                                                                                $("#stepForm textarea").val("");
                                                                            }




                                                                        }else{
                                                                            if(savaliStep==localStorage.getItem("addEducation")){
                                                                                $("[data-bb-handler]").each(function () {
                                                                                    if($(this).attr("data-bb-handler")=='success'){
                                                                                        $(".stepHint li div").css("background","#0EA1F7")
                                                                                        $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                                                                        $(this).attr('class','btn btn btn btn-default borderRadius4')
                                                                                        return;
                                                                                    }
                                                                                })
                                                                            }else{
                                                                                localStorage.setItem("dqbzId",result[savaliStep].bzid)
                                                                                localStorage.setItem("bzid",result[savaliStep].bzid)
                                                                                $('button[data-bb-handler="cancle"]').show()
                                                                                $("input[name='bzmc']").val(result[savaliStep].bzmc)
                                                                                $("textarea[name='bzsx']").val(result[savaliStep].bzxx)
                                                                                if(result[savaliStep].cxbxbz==0){
                                                                                    $(".link").eq(1).prop("checked",true)
                                                                                    // next++;
                                                                                }else{
                                                                                    $(".link").eq(0).prop("checked",true)
                                                                                    // next++;
                                                                                }
                                                                                $("[data-bb-handler]").each(function () {
                                                                                    if($(this).attr("data-bb-handler")=='success'){
                                                                                        $(".stepHint li div").each(function (index) {
                                                                                            if(index==savaliStep){
                                                                                                // $(".stepHint li div").css("background","#0EA1F7")
                                                                                                $(this).css("background","#79C002");
                                                                                                $(this).parent().prev().children("div").css("background","#0EA1F7");
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                                // savaliStep++;
                                                                                //
                                                                                //
                                                                                // nextliStep++;
                                                                                $("input[name='bzmc']").addClass("hasMessage")
                                                                                $("textarea[name='bzsx']").addClass("hasMessage")
                                                                                var checkRadio = $("input[name='rl$tt']:checked").attr("data")
                                                                                // $('button[data-bb-handler="success"]').hide()
                                                                                // $('button[data-bb-handler="ok"]').show()

                                                                                // $(".hasMessage").on("change",function () {
                                                                                //     if($("input[name='type1']:checked").attr("data")!==checkRadio){
                                                                                //         $('button[data-bb-handler="success"]').show()
                                                                                //         $('button[data-bb-handler="ok"]').hide()
                                                                                //     }
                                                                                // })
                                                                            }

                                                                        }
                                                                    }
                                                                })

                                                            }
                                                            else {
                                                                Messenger().post({
                                                                    message: result.message,
                                                                    type: 'error'
                                                                });
                                                            }
                                                        },
                                                        error: function () {
                                                            App.unblockUI(jqueryMap.$blockTarget);
                                                        }
                                                    });
                                                    if(savaliStep<=localStorage.getItem("addEducation")){
                                                        return false;
                                                    }
                                                }
                                            }else{
                                                var bzmc;
                                                var yxhj;
                                                var bzsx;
                                                var dqbz;
                                                if(savaliStep+1>localStorage.getItem("addEducation")){
                                                    return
                                                }else if ($("input[name='bzmc']").val() == "") {
                                                    AppAlert("步骤名称不能为空！");
                                                }else if ($(".link")[0].checked == false && $(".link")[1].checked == false) {
                                                    AppAlert("与下环节不能为空！");
                                                }else{
                                                    bzmc = $("input[name='bzmc']").val();
                                                    $(".link").each(function (index) {
                                                        if($(".link").eq(index).prop("checked")==true){
                                                            yxhj = $(".link").eq(index).attr("data");
                                                        }
                                                    })
                                                    // dqbz =configMap.step
                                                    bzsx = $("textarea[name='bzsx']").val();
                                                    var data = {
                                                        // id:"",
                                                        lcid:localStorage.getItem("lcid"),
                                                        bzid:localStorage.getItem("bzid"),
                                                        bzmc:bzmc,
                                                        cxbxbz:yxhj,
                                                        bzxx:bzsx,
                                                        dqbz:step
                                                    };

                                                    $.ajax({
                                                        url: configMap.path + configMap.stepaddUrl ,
                                                        type: 'post',
                                                        // headers: {
                                                        //     'Accept': 'application/json',
                                                        //     'Content-Type': 'application/json'
                                                        // },
                                                        // contentType: 'application/json; charset=utf-8',
                                                        data:data,
                                                        success: function (result) {

                                                            App.unblockUI(jqueryMap.$blockTarget);
                                                            if (result.success) {
                                                                localStorage.setItem("dqbzId",result.bzid)
                                                                step++;
                                                                // $('button[data-bb-handler="success"]').hide()
                                                                // $('button[data-bb-handler="ok"]').show()
                                                                localStorage.setItem("bzid",result.bzid)
                                                                configMap.porcessmanagementGrid.ajax.reload();
                                                                $("[data-bb-handler]").each(function () {
                                                                    if($(this).attr("data-bb-handler")=='success'){
                                                                        // $(".stepHint li div").css("background","blue")
                                                                        $(".stepHint li div").each(function (index) {
                                                                            if(index==savaliStep){
                                                                                $(this).css("background","#0EA1F7")
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                                $("input[name='bzmc']").addClass("hasMessage")
                                                                $("textarea[name='bzsx']").addClass("hasMessage")
                                                                var checkRadio = $("input[name='rl$tt']:checked").attr("data")
                                                                // $('button[data-bb-handler="success"]').hide()
                                                                // $('button[data-bb-handler="ok"]').show()
                                                                if(savaliStep>1){
                                                                    $('button[data-bb-handler="cancle"]').show()
                                                                }else{
                                                                    $('button[data-bb-handler="cancle"]').hide()
                                                                }
                                                                // $(".hasMessage").on("change",function () {
                                                                //     if($("input[name='type1']:checked").attr("data")!==checkRadio){
                                                                //         $('button[data-bb-handler="success"]').show()
                                                                //         $('button[data-bb-handler="ok"]').hide()
                                                                //     }
                                                                // })
                                                                savaliStep++;

                                                                Messenger().post({
                                                                    message: "当前步骤创建成功",
                                                                    type: 'success'
                                                                });

                                                                if($("input").hasClass("hasMessage")){
                                                                    $("input").removeClass("hasMessage");
                                                                    $("textarea").removeClass("hasMessage");
                                                                }

                                                                var lcid = localStorage.getItem("lcid")
                                                                $.ajax({
                                                                    // headers: {
                                                                    //     'Accept': 'application/json',
                                                                    //     'Content-Type': 'application/json'
                                                                    // },
                                                                    url: configMap.path + configMap.getAllBzxx + lcid,
                                                                    dataType: 'JSON',
                                                                    type: 'get',
                                                                    success: function (result) {

                                                                        if(!result[nextliStep]){
                                                                            if(savaliStep==localStorage.getItem("addEducation")){
                                                                                $("[data-bb-handler]").each(function () {
                                                                                    if($(this).attr("data-bb-handler")=='success'){
                                                                                        $(".stepHint li div").css("background","#0EA1F7")
                                                                                        $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                                                                        $(this).attr('class','btn btn btn btn-default borderRadius4')
                                                                                        return;
                                                                                    }
                                                                                })
                                                                            }else{
                                                                                localStorage.setItem("bzid","")
                                                                                $('button[data-bb-handler="cancle"]').show()
                                                                                $("[data-bb-handler]").each(function () {
                                                                                    if($(this).attr("data-bb-handler")=='success'){
                                                                                        $(".stepHint li div").each(function (index) {
                                                                                            if(index==nextliStep){
                                                                                                $(this).css("background","#79C002");
                                                                                                $(this).parent().prev().children("div").css("background","#0EA1F7");
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                                // $('button[data-bb-handler="ok"]').hide()
                                                                                // $('button[data-bb-handler="success"]').show()
                                                                                // $('button[data-bb-handler="cancle"]').hide()
                                                                                nextliStep++;
                                                                                $("#stepForm input").val("");
                                                                                $("#stepForm textarea").val("");
                                                                                // if(savaliStep==localStorage.getItem("addEducation")){
                                                                                //     $("[data-bb-handler]").each(function () {
                                                                                //         if($(this).attr("data-bb-handler")=='success'){
                                                                                //             $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                                                                //             $(this).attr('class','btn btn btn btn-default borderRadius4')
                                                                                //         }
                                                                                //     })
                                                                                // }
                                                                            }



                                                                        }else{
                                                                            if(savaliStep==localStorage.getItem("addEducation")){
                                                                                $("[data-bb-handler]").each(function () {
                                                                                    if($(this).attr("data-bb-handler")=='success'){
                                                                                        $(".stepHint li div").css("background","#0EA1F7")
                                                                                        $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                                                                        $(this).attr('class','btn btn btn btn-default borderRadius4')
                                                                                        return;
                                                                                    }
                                                                                })
                                                                            }else{
                                                                                localStorage.setItem("dqbzId",result[nextliStep].bzid)
                                                                                localStorage.setItem("bzid",result[nextliStep].bzid)
                                                                                $('button[data-bb-handler="cancle"]').show()
                                                                                $("input[name='bzmc']").val(result[nextliStep].bzmc)
                                                                                $("textarea[name='bzsx']").val(result[nextliStep].bzxx)
                                                                                if(result[nextliStep].cxbxbz==0){
                                                                                    $(".link").eq(1).prop("checked",true)
                                                                                    // next++;
                                                                                }else{
                                                                                    $(".link").eq(0).prop("checked",true)
                                                                                    // next++;
                                                                                }
                                                                                $("[data-bb-handler]").each(function () {
                                                                                    if($(this).attr("data-bb-handler")=='success'){
                                                                                        $(".stepHint li div").each(function (index) {
                                                                                            if(index==nextliStep){
                                                                                                $(this).parent().prev().children("div").css("background","#0EA1F7")
                                                                                                $(this).css("background","#79C002")

                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                                savaliStep++;

                                                                                // if(savaliStep==localStorage.getItem("addEducation")){
                                                                                //     $("[data-bb-handler]").each(function () {
                                                                                //         if($(this).attr("data-bb-handler")=='success'){
                                                                                //             $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                                                                //             $(this).attr('class','btn btn btn btn-default borderRadius4')
                                                                                //             savaliStep = localStorage.getItem("addEducation");
                                                                                //         }
                                                                                //     })
                                                                                // }
                                                                                nextliStep++;
                                                                                $("input[name='bzmc']").addClass("hasMessage")
                                                                                $("textarea[name='bzsx']").addClass("hasMessage")
                                                                                var checkRadio = $("input[name='rl$tt']:checked").attr("data")
                                                                                // $('button[data-bb-handler="success"]').hide()
                                                                                // $('button[data-bb-handler="ok"]').show()

                                                                                // $(".hasMessage").on("change",function () {
                                                                                //     if($("input[name='type1']:checked").attr("data")!==checkRadio){
                                                                                //         $('button[data-bb-handler="success"]').show()
                                                                                //         $('button[data-bb-handler="ok"]').hide()
                                                                                //     }
                                                                                // })
                                                                            }

                                                                        }
                                                                    }
                                                                })

                                                            }
                                                            else {
                                                                Messenger().post({
                                                                    message: result.message,
                                                                    type: 'error'
                                                                });
                                                            }
                                                        },
                                                        error: function () {
                                                            App.unblockUI(jqueryMap.$blockTarget);
                                                        }
                                                    });
                                                    // alert('成功')
                                                    // $(".next").attr("disabled", false);
                                                }

                                            }

                                            if(savaliStep<localStorage.getItem("addEducation")){
                                                return false;
                                            }
                                        }
                                    };

                                    // dialogButtons2.ok = {
                                    //     label: '<i class="' + 'iconfont  icon-tuichu1' + '"></i>下一步',
                                    //     className: 'btn btn btn-success btnBlue borderRadius4 colorfff cjbznext',
                                    //     callback:function () {
                                    //         if($("input").hasClass("hasMessage")){
                                    //             $("input").removeClass("hasMessage");
                                    //             $("textarea").removeClass("hasMessage");
                                    //         }
                                    //
                                    //         var lcid = localStorage.getItem("lcid")
                                    //         $.ajax({
                                    //             // headers: {
                                    //             //     'Accept': 'application/json',
                                    //             //     'Content-Type': 'application/json'
                                    //             // },
                                    //             url: configMap.path + configMap.getAllBzxx + lcid,
                                    //             dataType: 'JSON',
                                    //             type: 'get',
                                    //             success: function (result) {
                                    //
                                    //                 if(!result[nextliStep]){
                                    //
                                    //                     localStorage.setItem("bzid","")
                                    //                     $('button[data-bb-handler="cancle"]').show()
                                    //                     $("[data-bb-handler]").each(function () {
                                    //                         if($(this).attr("data-bb-handler")=='ok'){
                                    //                             $(".stepHint li div").each(function (index) {
                                    //                                 if(index==nextliStep){
                                    //                                     $(this).css("background","#79C002");
                                    //                                     $(this).parent().prev().children("div").css("background","#0EA1F7");
                                    //                                 }
                                    //                             })
                                    //                         }
                                    //                     })
                                    //                     $('button[data-bb-handler="ok"]').hide()
                                    //                     $('button[data-bb-handler="success"]').show()
                                    //                     $('button[data-bb-handler="cancle"]').hide()
                                    //                     nextliStep++;
                                    //                     $("#stepForm input").val("");
                                    //                     $("#stepForm textarea").val("");
                                    //                     if(savaliStep==localStorage.getItem("addEducation")-1){
                                    //                         $("[data-bb-handler]").each(function () {
                                    //                             if($(this).attr("data-bb-handler")=='ok'){
                                    //                                 $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                    //                                 $(this).attr('class','btn btn btn btn-default borderRadius4')
                                    //                             }
                                    //                         })
                                    //                     }
                                    //
                                    //
                                    //                 }else{
                                    //                     localStorage.setItem("dqbzId",result[nextliStep].bzid)
                                    //                     localStorage.setItem("bzid",result[nextliStep].bzid)
                                    //                     $('button[data-bb-handler="cancle"]').show()
                                    //                     $("input[name='bzmc']").val(result[nextliStep].bzmc)
                                    //                     $("textarea[name='bzsx']").val(result[nextliStep].bzxx)
                                    //                     if(result[nextliStep].cxbxbz==0){
                                    //                         $(".link").eq(1).prop("checked",true)
                                    //                         // next++;
                                    //                     }else{
                                    //                         $(".link").eq(0).prop("checked",true)
                                    //                         // next++;
                                    //                     }
                                    //                     $("[data-bb-handler]").each(function () {
                                    //                         if($(this).attr("data-bb-handler")=='ok'){
                                    //                             $(".stepHint li div").each(function (index) {
                                    //                                 if(index==nextliStep){
                                    //                                     $(this).parent().prev().children("div").css("background","#0EA1F7")
                                    //                                     $(this).css("background","#79C002")
                                    //
                                    //                                 }
                                    //                             })
                                    //                         }
                                    //                     })
                                    //                     savaliStep++;
                                    //
                                    //                     if(savaliStep==localStorage.getItem("addEducation")){
                                    //                         $("[data-bb-handler]").each(function () {
                                    //                             if($(this).attr("data-bb-handler")=='ok'){
                                    //                                 $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                    //                                 $(this).attr('class','btn btn btn btn-default borderRadius4')
                                    //                                 savaliStep = localStorage.getItem("addEducation");
                                    //                             }
                                    //                         })
                                    //                     }
                                    //                     nextliStep++;
                                    //                     $("input[name='bzmc']").addClass("hasMessage")
                                    //                     $("textarea[name='bzsx']").addClass("hasMessage")
                                    //                     var checkRadio = $("input[name='rl$tt']:checked").attr("data")
                                    //                     $('button[data-bb-handler="success"]').hide()
                                    //                     $('button[data-bb-handler="ok"]').show()
                                    //
                                    //                     $(".hasMessage").on("change",function () {
                                    //                         if($("input[name='type1']:checked").attr("data")!==checkRadio){
                                    //                             $('button[data-bb-handler="success"]').show()
                                    //                             $('button[data-bb-handler="ok"]').hide()
                                    //                         }
                                    //                     })
                                    //                 }
                                    //             }
                                    //         })
                                    //         if(savaliStep<localStorage.getItem("addEducation")){
                                    //             return false;
                                    //         }
                                    //
                                    //     }
                                    // };



                                    $.get("/systemmanager/taskcenter/processmanagement/viewnext.jsp", function (html) {
                                        bootbox.dialog({
                                            title: '创建步骤',
                                            message: html,
                                            buttons: dialogButtons2
                                        })

                                        $(".clickTrue").hide()
                                        if(savaliStep==0){
                                            $('button[data-bb-handler="cancle"]').hide()
                                        }
                                        $('button[data-bb-handler="ok"]').hide()


                                    })

                                }
                                else {
                                    Messenger().post({
                                        message: result.message,
                                        type: 'error'
                                    });
                                }
                            },
                            error: function () {
                                App.unblockUI(jqueryMap.$blockTarget);
                                return false;
                            }
                        });
                    }
                    // if($("botton[data-bb-handler='success']").attr("status")==true){
                    //     setTimeout(function () {
                    //         alert("关闭")
                    //
                    //     },3000)
                    // }

                }
            };

            // dialogButtons1.ok = {
            //     label: '<i class="' + 'iconfont  icon-tuichu1' + '"></i>创建步骤',
            //     className: 'btn btn btn-success btnBlue borderRadius4 colorfff next'
            // };

            $.get('/systemmanager/taskcenter/processmanagement/view.jsp', function (html) {
                bootbox.dialog({
                    title: title,
                    message: html,
                    buttons: dialogButtons1
                    // className:'commonProblemType-dialog'
                });
                // $('button[data-bb-handler="ok"]').hide()




                // $('.next').on("click", function () {
                //     if ($('.next').attr("disabled") !== "disabled") {
                //
                //     }
                //
                // })

                // var checkRadio = $("input[name='rl$tt']:checked").attr("data")
                // $('button[data-bb-handler="success"]').hide()
                // $('button[data-bb-handler="ok"]').show()
                // $('.bjbzList').on("change",function () {
                //     if($("input[name='type1']:checked").attr("data")!==checkRadio){
                //         $('button[data-bb-handler="success"]').show()
                //         $('button[data-bb-handler="ok"]').hide()
                //     }
                //
                // })
            });
        }else{


            title = '编辑流程';
            var dialogButtons1 = {};
            var dialogButtons2 = {};
            var rowIndex = configMap.porcessmanagementGrid.cell(data.parent()).index().row;
            var cxlcid = configMap.porcessmanagementGrid.row(rowIndex).data().lcid;
            var cxid = configMap.porcessmanagementGrid.row(rowIndex).data().id;
            localStorage.setItem("cxlcid",cxlcid)
            localStorage.setItem("id",cxid)

            dialogButtons1.success = {
                label: '<i style="font: normal normal normal 16px/1 FontAwesome!important;margin-right: 5px;" class="' + 'fa fa-save' + '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // configMap.lcid = localStorage.getItem("lcid");
                    var lcmc ;
                    var sfxmmc;
                    var sfxmCode;
                    var lcbz;
                    var cjsj;
                    var msxx;
                    if ($("input[name='lcmc']").val() == "") {
                        AppAlert("流程名称不能为空！");
                    }else if($('#addCharge').find("option:selected").text()=="请选择"){
                        AppAlert("服务项目不能为空！");
                    }else if($("#addEducation").find("option:selected").text()=="请选择"){
                        AppAlert("流程步数不能为空！");
                    }else if($("input[name='addDate']").val() == "") {
                        AppAlert("创建时间不能为空！");
                    }else{
                        lcmc = $("input[name='lcmc']").val();
                        sfxmmc = $("#addCharge").text();
                        sfxmCode = $("#addCharge").val();
                        lcbz = $("#addEducation").val();
                        cjsj = $("input[name='addDate']").val();
                        msxx = $("textarea[name='msxx']").val();
                        var data = {
                            id:cxid,
                            lcmc:lcmc,
                            sfxmDm:sfxmCode,
                            lcbz:lcbz,
                            lrrq:cjsj,
                            lcms:msxx
                        };
                        $.ajax({
                            url: configMap.path + configMap.editUrl ,
                            type: 'PUT',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'JSON',
                            data: JSON.stringify(data),
                            success: function (result) {
                                App.unblockUI(jqueryMap.$blockTarget);
                                if (result.success) {
                                    // localStorage.setItem("lcid",result.lcid)
                                    configMap.porcessmanagementGrid.ajax.reload();

                                    $("[data-bb-handler]").each(function () {
                                        if($(this).attr("data-bb-handler")=='success'){
                                            // $(this).attr("disabled","disabled")
                                        }
                                    })
                                    Messenger().post({
                                        message: "流程修改成功",
                                        type: 'success'
                                    });
                                    $('button[data-bb-handler="success"]').hide()
                                    $('button[data-bb-handler="ok"]').show()
                                }
                                else {
                                    Messenger().post({
                                        message: result.message,
                                        type: 'error'
                                    });
                                }
                            },
                            error: function () {
                                App.unblockUI(jqueryMap.$blockTarget);
                            }
                        });
                        // $(".next").attr("disabled", false);
                    }

                    return false;
                }
            };

            dialogButtons1.ok = {
                label: '<i class="' + 'iconfont  icon-tuichu1' + '"></i>查看步骤',
                className: 'btn btn btn-success btnBlue borderRadius4 colorfff next'
            };

            $.get('/systemmanager/taskcenter/processmanagement/view.jsp', function (html) {
                bootbox.dialog({
                    title: title,
                    message: html,
                    buttons: dialogButtons1
                    // className:'commonProblemType-dialog'
                });
                // $('.next').attr("disabled", "disabled");
                var savaliStep = 0;
                var next = 0;
                var nextliStep = 1;
                var step = 1;
                var step1 = 1;
                var step0 = 0;
                var eidtstep = 1;



                $('button[data-bb-handler="success"]').hide()
                $('.viewlist').on("change",function () {
                    $('button[data-bb-handler="success"]').show()
                    $('button[data-bb-handler="ok"]').hide()
                })
                // $("input").each(function () {
                //     $(this).on("change",function () {
                //         $('button[data-bb-handler="success"]').show()
                //     })
                // })

                $('.next').on("click", function () {

                    if ($('.next').attr("disabled") !== "disabled") {
                        var addEducation = $('#addEducation ').val();
                        // $('.cjbznext').attr("disabled", "disabled");
                        if (addEducation != 0) {
                            localStorage.setItem("addEducation", addEducation)
                        }

                        dialogButtons2.success = {
                            label: '<i style="font: normal normal normal 16px/1 FontAwesome!important;margin-right: 5px;" class="' + 'fa fa-save' + '"></i>保存',
                            className: "btn btn-success btnBlue borderRadius4 colorfff cjbzBtn",
                            callback: function () {
                                if(!$("input.link").hasClass("noMessage")){
                                    var bzmc;
                                    var yxhj;
                                    var bzsx;
                                    var dqbz;
                                    if ($("input[name='bzmc']").val() == "") {
                                        AppAlert("步骤名称不能为空！");
                                    }else if ($(".link")[0].checked == false && $(".link")[1].checked == false) {
                                        AppAlert("与下环节不能为空！");
                                    }else{
                                        bzmc = $("input[name='bzmc']").val();
                                        $(".link").each(function (index) {
                                            if($(".link").eq(index).prop("checked")==true){
                                                yxhj = $(".link").eq(index).attr("data");
                                            }
                                        })
                                        bzsx = $("textarea[name='bzsx']").val();
                                        var data = {
                                            bzid:localStorage.getItem("cxbzid1"+step0),
                                            bzmc:bzmc,
                                            cxbxbz:yxhj,
                                            bzxx:bzsx,
                                            dqbz:step
                                        };

                                        $.ajax({
                                            url: configMap.path + configMap.stepeditUrl ,
                                            type: 'post',
                                            // contentType: 'application/json; charset=utf-8',
                                            dataType: 'JSON',
                                            data: data,
                                            success: function (result) {
                                                App.unblockUI(jqueryMap.$blockTarget);
                                                if (result.success) {


                                                    // localStorage.setItem("bzid",result.bzid)
                                                    configMap.porcessmanagementGrid.ajax.reload();

                                                    $("[data-bb-handler]").each(function () {
                                                        if($(this).attr("data-bb-handler")=='success'){
                                                            $(".stepHint li div").each(function (index) {
                                                                if(index==savaliStep){
                                                                    $(this).css("background","#0EA1F7")
                                                                }
                                                            })
                                                        }
                                                    })

                                                    savaliStep++;

                                                    // $('.cjbznext').attr("disabled", false);
                                                    Messenger().post({
                                                        message: "当前步骤修改成功",
                                                        type: 'success'
                                                    });
                                                    $('button[data-bb-handler="success"]').hide()
                                                    $('button[data-bb-handler="ok"]').show()
                                                }
                                                else {
                                                    Messenger().post({
                                                        message: result.message,
                                                        type: 'error'
                                                    });
                                                }
                                            },
                                            error: function () {
                                                App.unblockUI(jqueryMap.$blockTarget);
                                            }
                                        });
                                        // }

                                        // alert('成功')
                                        // $(".next").attr("disabled", false);
                                    }
                                    return false;
                                }else{
                                    var bzmc;
                                    var yxhj;
                                    var bzsx;
                                    var dqbz;
                                    if ($("input[name='bzmc']").val() == "") {
                                        AppAlert("步骤名称不能为空！");
                                    }else if ($(".link")[0].checked == false && $(".link")[1].checked == false) {
                                        AppAlert("与下环节不能为空！");
                                    }else{
                                        bzmc = $("input[name='bzmc']").val();
                                        $(".link").each(function (index) {
                                            if($(".link").eq(index).prop("checked")==true){
                                                yxhj = $(".link").eq(index).attr("data");
                                            }
                                        })
                                        // dqbz =configMap.step
                                        bzsx = $("textarea[name='bzsx']").val();
                                        // if(localStorage.getItem("cxbzid1"+step) == null){
                                        //     var bzmc;
                                        //     var yxhj;
                                        //     var bzsx;
                                        //     var dqbz;
                                        //     if ($("input[name='bzmc']").val() == "") {
                                        //         AppAlert("步骤名称不能为空！");
                                        //     }else{
                                        //         bzmc = $("input[name='bzmc']").val();
                                        //         $(".link").each(function (index) {
                                        //             if($(".link").eq(index).prop("checked")==true){
                                        //                 yxhj = $(".link").eq(index).attr("data");
                                        //             }
                                        //         })
                                        //         // dqbz =configMap.step
                                        //         bzsx = $("textarea[name='bzsx']").val();
                                        //         var data = {
                                        //             // id:"",
                                        //             lcid:localStorage.getItem("cxlcid"),
                                        //             bzid:localStorage.getItem("bzid"),
                                        //             bzmc:bzmc,
                                        //             cxbxbz:yxhj,
                                        //             bzxx:bzsx,
                                        //             dqbz:step
                                        //         };
                                        //
                                        //         $.ajax({
                                        //             url: configMap.path + configMap.stepaddUrl ,
                                        //             type: 'post',
                                        //             // headers: {
                                        //             //     'Accept': 'application/json',
                                        //             //     'Content-Type': 'application/json'
                                        //             // },
                                        //             // contentType: 'application/json; charset=utf-8',
                                        //             data:data,
                                        //             success: function (result) {
                                        //
                                        //                 App.unblockUI(jqueryMap.$blockTarget);
                                        //                 if (result.success) {
                                        //                     $('button[data-bb-handler="success"]').hide()
                                        //                     $('button[data-bb-handler="ok"]').show()
                                        //                     Messenger().post({
                                        //                         message: "当前步骤创建成功",
                                        //                         type: 'success'
                                        //                     });
                                        //                 }
                                        //                 else {
                                        //                     Messenger().post({
                                        //                         message: result.message,
                                        //                         type: 'error'
                                        //                     });
                                        //                 }
                                        //             },
                                        //             error: function () {
                                        //                 App.unblockUI(jqueryMap.$blockTarget);
                                        //             }
                                        //         });
                                        //         // alert('成功')
                                        //         // $(".next").attr("disabled", false);
                                        //     }
                                        // }else{
                                        var data = {
                                            lcid:localStorage.getItem("cxlcid"),
                                            bzid:localStorage.getItem("cxbzid1"+step0),
                                            bzmc:bzmc,
                                            cxbxbz:yxhj,
                                            bzxx:bzsx,
                                            dqbz:step
                                        };

                                        $.ajax({
                                            url: configMap.path + configMap.stepaddUrl ,
                                            type: 'post',
                                            // contentType: 'application/json; charset=utf-8',
                                            dataType: 'JSON',
                                            data: data,
                                            success: function (result) {
                                                App.unblockUI(jqueryMap.$blockTarget);
                                                if (result.success) {


                                                    localStorage.setItem("bzid",result.bzid)
                                                    configMap.porcessmanagementGrid.ajax.reload();

                                                    $("[data-bb-handler]").each(function () {
                                                        if($(this).attr("data-bb-handler")=='success'){
                                                            $(".stepHint li div").each(function (index) {
                                                                if(index==savaliStep){
                                                                    $(this).css("background","#0EA1F7")
                                                                }
                                                            })
                                                        }
                                                    })

                                                    savaliStep++;

                                                    // $('.cjbznext').attr("disabled", false);
                                                    Messenger().post({
                                                        message: "当前步骤修改成功",
                                                        type: 'success'
                                                    });
                                                    $("input.link").removeClass("noMessage")
                                                    $('button[data-bb-handler="success"]').hide()
                                                    $('button[data-bb-handler="ok"]').show()
                                                }
                                                else {
                                                    Messenger().post({
                                                        message: result.message,
                                                        type: 'error'
                                                    });
                                                }
                                            },
                                            error: function () {
                                                App.unblockUI(jqueryMap.$blockTarget);
                                            }
                                        });
                                        // }

                                        // alert('成功')
                                        // $(".next").attr("disabled", false);
                                    }
                                    return false;
                                }
                            }
                        };

                        dialogButtons2.ok = {
                            label: '<i class="icon iconfont icon-xiayibu iconFontSize" style="color: #fff;"></i>下一步',
                            className: 'btn btn btn-success btnBlue borderRadius4 colorfff cjbznext',
                            callback:function () {
                                if($("input.link").hasClass("noMessage")){
                                    AppAlert("请按步添加步骤！");
                                    return false;
                                }else{
                                    next = parseInt(localStorage.getItem("next"))
                                    step++;
                                    eidtstep++
                                    step0++;
                                    if(next==localStorage.getItem("addEducation")-2){

                                        $("[data-bb-handler]").each(function () {
                                            if($(this).attr("data-bb-handler")=='ok'){
                                                $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                                $(this).attr('class','btn btn btn btn-default borderRadius4')
                                            }
                                        })
                                    }
                                    if(localStorage.getItem("addEducation")>1){
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
                                                    lcid:localStorage.getItem("cxlcid")
                                                },
                                                success: function (result) {
                                                    if(result.listLcglbzxx[eidtstep-1]==undefined){
                                                        $("input[name='bzmc']").val("");
                                                        $("textarea[name='bzsx']").val("");
                                                        $("input.link").addClass("noMessage")
                                                    }else{
                                                        $("input[name='bzmc']").val(result.listLcglbzxx[eidtstep-1].bzmc);
                                                        $("textarea[name='bzsx']").val(result.listLcglbzxx[eidtstep-1].bzxx);
                                                        if(result.listLcglbzxx[eidtstep-1].cxbxbz==0){
                                                            // var status = "0";
                                                            // $(".link").each(function (index) {
                                                            //     if($(".link").eq(index).attr("data")==status){
                                                            //         $(".link").eq(index).prop("checked",true)
                                                            //     }
                                                            // })
                                                            $(".link").eq(1).prop("checked",true)
                                                            next++;
                                                            localStorage.setItem("next",next)
                                                        }else{
                                                            // var status = "1";
                                                            // $(".link").each(function (index) {
                                                            //     if($(".link").eq(index).attr("data")==status){
                                                            //         $(".link").eq(index).prop("checked",true)
                                                            //     }
                                                            // })
                                                            $(".link").eq(0).prop("checked",true)
                                                            next++;
                                                            localStorage.setItem("next",next)
                                                        }
                                                        localStorage.setItem("cxbzid"+ step1,result.listLcglbzxx[step1].id)
                                                        localStorage.setItem("cxbzid1"+ step1,result.listLcglbzxx[step1].bzid)
                                                        $("#addbzFile").attr("data",step1)
                                                        step1++;
                                                    }

                                                }
                                            })
                                        }

                                        localStorage.setItem("bzid","")
                                        $("[data-bb-handler]").each(function () {
                                            if($(this).attr("data-bb-handler")=='success'){
                                                // $(this).attr("disabled",false)

                                            }
                                        })
                                        $("[data-bb-handler]").each(function () {
                                            if($(this).attr("data-bb-handler")=='ok'){
                                                // $(this).attr("disabled","disabled")
                                                $(".stepHint li div").each(function (index) {
                                                    if(nextliStep==1){
                                                        $(".stepHint li div")[0].style.background = "#0EA1F7";
                                                        $(".stepHint li div")[1].style.background = "#79C002";
                                                    }else{
                                                        if(index==nextliStep){
                                                            $(this).css("background","#79C002")
                                                            $(".stepHint li div")[index-1].style.background = "#0EA1F7";
                                                        }
                                                    }

                                                })
                                            }
                                        })
                                        nextliStep++;
                                        // savaliStep++;
                                        // $("#stepForm input").val("");

                                        // if(savaliStep==0){
                                        //     $("[data-bb-handler]").each(function () {
                                        //         if($(this).attr("data-bb-handler")=='ok'){
                                        //             $(this).text("关闭")
                                        //         }
                                        //     })
                                        // }
                                        if(nextliStep<=localStorage.getItem("addEducation")){
                                            return false;
                                        }
                                    }
                                }


                            }
                        };


                        $.get("/systemmanager/taskcenter/processmanagement/viewnext.jsp", function (html) {
                            bootbox.dialog({
                                title: '编辑步骤',
                                message: html,
                                buttons: dialogButtons2
                            })

                            if(localStorage.getItem("addEducation")==1){
                                $("[data-bb-handler]").each(function () {
                                    if($(this).attr("data-bb-handler")=='ok'){
                                        $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                        $(this).attr('class','btn btn btn btn-default borderRadius4')
                                    }
                                })
                            }

                            $(".clickTrue").show()
                            $(".stepHint li").hover(function () {
                                $(this).css("cursor","pointer")
                            })
                            $(".stepHint li div").each(function () {
                                $(this).on("click",function () {
                                    if($("input.link").hasClass("noMessage")){
                                        AppAlert("请按步添加步骤！");
                                    }else{
                                        $(".stepHint li div").css("background","#0EA1F7")
                                        $(this).css("background","#79C002")
                                        savaliStep = $(this).children().html()-1;
                                        next = $(this).children().html()-1;
                                        localStorage.setItem("next",next)
                                        nextliStep = $(this).children().html();
                                        step = $(this).children().html();
                                        step1 =$(this).children().html();
                                        step0 = $(this).children().html()-1;
                                        eidtstep = $(this).children().html();
                                        var id = localStorage.getItem("id")
                                        if(next==localStorage.getItem("addEducation")-1){

                                            $("[data-bb-handler]").each(function () {
                                                if($(this).attr("data-bb-handler")=='ok'){
                                                    $(this).html("<i class='fa fa-times  iconMr'></i>关闭")
                                                    $(this).attr('class','btn btn btn btn-default borderRadius4')
                                                }
                                            })
                                        }else{
                                            $("[data-bb-handler]").each(function () {
                                                if($(this).attr("data-bb-handler")=='ok'){
                                                    $('button[data-bb-handler="ok"]').html("<i class='icon iconfont icon-xiayibu iconFontSize' style='color: #fff;'></i>下一步")
                                                    $('button[data-bb-handler="ok"]').attr('class','btn btn btn btn-success btnBlue borderRadius4 colorfff')

                                                }
                                            })
                                        }
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
                                                    lcid:localStorage.getItem("cxlcid")
                                                },
                                                success: function (result) {
                                                    if(result.listLcglbzxx[eidtstep-1] == undefined){
                                                        $("input[name='bzmc']").val("")
                                                        $("textarea[name='bzsx']").val("")
                                                        $("input.link").addClass("noMessage")
                                                    }else{
                                                        $("input[name='bzmc']").val(result.listLcglbzxx[step0].bzmc);
                                                        $("textarea[name='bzsx']").val(result.listLcglbzxx[step0].bzxx);
                                                        if(result.listLcglbzxx[step0].cxbxbz==0){

                                                            $(".link").eq(1).prop("checked",true)

                                                        }else{

                                                            $(".link").eq(0).prop("checked",true)
                                                        }
                                                        localStorage.setItem("cxbzid"+ step0,result.listLcglbzxx[step0].id)
                                                        localStorage.setItem("cxbzid1"+ step0,result.listLcglbzxx[step0].bzid)
                                                        $("#addbzFile").attr("data",step1)
                                                    }
                                                }
                                            })
                                        }

                                    }

                                })
                            })
                            $(".stepHint li div").each(function () {
                                if(!$(this).hasClass("editColor")){
                                    $(this).css("background","#0EA1F7")
                                }
                            })
                            var checkRadio = $("input[name='rl$tt']:checked").attr("data")
                            $('button[data-bb-handler="success"]').hide()
                            $('button[data-bb-handler="ok"]').show()
                            $('.bjbzList').on("change",function () {
                                if($("input[name='type1']:checked").attr("data")!==checkRadio){
                                    $('button[data-bb-handler="success"]').show()
                                    $('button[data-bb-handler="ok"]').hide()
                                }

                            })
                        })
                    }

                })
            });
        }


    }



    var AppAlert = function(msg){
        App.alert({
            container: $("#processForm,#stepForm").closest(".modal-body"),
            place: 'prepend',
            type: 'danger',
            message: msg,
            closeInSeconds:3,
            icon: 'fa fa-warning'
        });
    };

    $("#technologicalProcess").on("click", function () {
        var data = $(this);
        localStorage.clear();
        nextClick(data);
    })


    var initPorcessmanagementGrid = function () {
        // var data = initPorcessmanagementData();
        configMap.porcessmanagementGrid = jqueryMap.$manualdata.DataTable({
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
                    //    开始的时间
                    var sT = $('input[name="starDate"]', '#processmanagement').val();
                    //    结束的时间
                    var eT = $('input[name="endDate"]', '#processmanagement').val();
                    // //    部门代码
                    // var bmdm = $('#workorderstatus', '#task-manager-container').val();
                    // //    类型代码
                    // var type = $('[name="type"]', jqueryMap.$container).val();
                    // var rwmc = $('[name="rwmc"]', jqueryMap.$container).val();
                    // var jjcd = $('#cx_jjcd_id', jqueryMap.$container).val();
                    data.startDate = sT;
                    data.endDate = eT;
                    data.lcmc = $(".query").val();
                    // data.bmdm = bmdm;
                    // data.type = type;
                    // data.rwmc = rwmc;
                    // data.khbm = configMap.khbm;
                    // data.jjcd = jjcd;
                }
            },
            "columns": [
                // {
                //     'class':'text-center',
                //     "data": "id",
                //     "render": function (data, type, row) {
                //         return '<input type="checkbox" name="checkbox_checkbox" id="kh_' + data + '" value="' + data + '"/>';
                //     }
                // },
                {
                    "data": "lcid",
                    "render": function (data, type, row) {

                        return '<span name="lcid"'+data.id+' class="customerManageraa" style="border: none;z-index: 10;background: transparent;outline: none;padding-left: 0">' +
                            '<span style="color:#666">' + data + '</span>' + '</>';
                    }
                },
                {
                    "data": "lcmc"
                },
                {
                    "data": "lcbz"
                },
                {
                    'class':'text-left',
                    "data": "lcms"
                },
                {
                    'class':'text-center',
                    "data": "lrryMc"
                },
                {
                    "data": "lrrq",
                    "render": function (data, type, row) {
                        return moment(data)
                            .format('YYYY-MM-DD');
                    }
                },
                {
                    'class':'text-center',
                    "data": "icbz",
                    "render": function (data, type, row) {

                        var btn ='<a href="javascript:;" class="lcxq btn btn-xs default" data-type="detail" data-toggle="tooltip" title="详情"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>'+
                            '<a href="javascript:;" class="lcbj btn btn-xs default" data-type="detail" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>'+
                            '<a href="javascript:;" class="lcsc btn btn-xs default" data-type="detail" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>'
                        //     // '<button class="lcxq btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="addcontract"><i class="icon iconfont icon-xiangqing" style="padding-right:3px;position:relative;top:2px;"></i>详情</button>'+
                        //             '<button data="edit" class="lcbj btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="addcontract"><i class="icon iconfont icon-bianji" style="padding-right:3px;position:relative;top:2px;"></i>编辑</button>'+
                        // '<button class="lcsc btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="addcontract"><i class="icon iconfont icon-hetong" style="padding-right:3px;position:relative;top:2px;"></i>删除</button>';

                        if (btn === "") {
                            return "000";
                        } else {
                            return btn;
                        }
//		              return configMap.accountingBtn_html
//						+ configMap.addcontractBtn_html
//		                + configMap.addchargeBtn_html
//		                +"<button class='ta btn btn-xs btnBlue btnBorderColor colorfff borderRadius4' type='button' ><i class='icon iconfont icon-zaizhiyuangong' style='padding-right:3px;position:relative;top:2px;'></i>跟进</button>"+"<button class='tb btn btn-xs btnBlue btnBorderColor colorfff borderRadius4' type='button' ><i class='icon iconfont icon-shenhe' style='position:relative;top:2px;'></i>申报</button>";
                    }
                },

            ],
            "language": {
                // url: configMap.path + configMap.datatablesLanguageFile,
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                if ($(".lcsc")) {
                    $(".lcsc").tooltip();
                    $(".lcsc").confirmation({
                        "title": '是否确定要删除该流程？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": del,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }
                if($(".lcxq")){
                    $(".lcxq").tooltip()
                    $(".lcxq").on("click",function () {

                        viewDetails($(this));
                    })
                }
                if($(".lcbj")){
                    $(".lcbj").tooltip()
                    $(".lcbj").on("click",function () {
                        localStorage.clear()
                        var data = $(this);
                        nextClick(data);
                    })
                }
            }
        });
    };

//进入页面查询列表
    var initPorcessmanagementData = function () {

        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: configMap.path + configMap.dataUrl,
            dataType: 'JSON',
            type: 'get',
            // data: JSON.stringify(data),
            success: function (datas) {
                configMap.porcessmanagementGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    configMap.porcessmanagementGrid.rows.add(datas).draw();
                    // return datas;
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
//单个删除
    var del = function (event, el) {
        var rowIndex = configMap.porcessmanagementGrid.cell(el.closest('td')).index().row;
        var id = configMap.porcessmanagementGrid.row(rowIndex).data().lcid;

        // porcessmanagementjson=[];
        // var temp = {user:id};
        // porcessmanagementjson.push(temp);
        // var data = {
        //     user:porcessmanagementjson
        // };
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除流程，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.delUrl + id,
            type: 'DELETE',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            // data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.porcessmanagementGrid.ajax.reload();
                    Messenger().post({
                        message: '删除成功！'
                    });
                }
                else {
                    Messenger().post({
                        message: result.message,
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: '删除失败！',
                    type: 'error'
                });
            }
        });
    }
    //点击按钮查询列表
    var btnPorcessmanagementData = function () {
        configMap.porcessmanagementGrid.ajax.reload();
        return
        var data = {
            startDate: $("input[name='starDate']").val(),
            endDate: $("input[name='endDate']").val(),
            lcmc: $(".query").val()
        };
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: configMap.path + configMap.dataUrl,
            dataType: 'JSON',
            type: 'get',
            data: data,
            success: function (datas) {
                configMap.porcessmanagementGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    configMap.porcessmanagementGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });

    };






    return {
        init: function () {
            localStorage.clear();
            setJqueryMap();
            $(".beginTime").datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            // $('input[name="starDate"]').val(moment().format("YYYY-MM-DD"));
            $(".endTime").datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            // $('input[name="endDate"]').val(moment().format("YYYY-MM-DD"));
            // $('.beginTime').val(moment().format("YYYY-MM-DD"));
            //搜索
            $('#lccx-btn', jqueryMap.$container).off().on('click', function () {
                btnPorcessmanagementData();

            });

            initPorcessmanagementGrid();
            // initPorcessmanagementData();



            // $("#processmanagement_data .icxq").on("click",function () {
            //     viewDetails();
            // })
        },

        setPath: function (path) {
            configMap.path = path;
        }
    };
}();