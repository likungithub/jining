// <%--$.ajax({--%>
//     <%--url: "<%=request.getContextPath()%>"+"/processManage/queryjbxx/"+ localStorage.getItem("dqid"),--%>
// <%--contentType: 'application/json; charset=utf-8',--%>
// <%--dataType: 'JSON',--%>
// <%--type: 'GET',--%>
// <%--// contentType: 'application/json; charset=utf-8',--%>
// <%--success: function (result) {--%>
// <%--}--%>
// <%--})--%>

//    $(".nuclearNamemain").css("height","0")

//        $(".nuclearNamemain").css("display",'none');

var viewDetails = function () {

    var configMap = {
        path:null,
        dataUrl:"/processManage/queryjbxx/",
        // id : $("input[name='checkbox_checkbox']").val(),
        Grid:null
    }
    var jqueryMap = {
        $blockTarget: null,

    };
    // var getlcid = function () {
    //     // stopContinueClick(this, 300);
    //
    //     // var customerCompany = configMap.customerManageGrid.row(rowIndex).data().gsmc;
    //     // var url = configMap.path + configMap.accountingPageUrl + "?customerCode=" + encodeURI(customerCode) + "&customerCompany=" + encodeURI(customerCompany);
    //     openNewModal(customerCompany, url, 'account', customerCode);
    // };
    var viewDetailsData = function () {
        if(localStorage.getItem("id") !== null){
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: configMap.path + configMap.dataUrl +localStorage.getItem("id") ,
                dataType: 'JSON',
                type: 'get',
                data: {
                    lcid:localStorage.getItem("lcid")
                },
                success: function (datas) {

                    $(".modal-title").html(datas.lcmc)

                    if(datas.lcms==""&&$(datas.listLcgljbxxfj).length==0){
                        var lcxq = '<div class="viewDetailsWrap viewOne">'+
                            '<div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewSfxmc colorGery">收费项目</span><span class="viewDetailsMain sfxmName">'+datas.sfxmMc+'</span>'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewLcbz colorGery">流程步骤</span><span class="viewDetailsMain lcbzName">'+datas.lcbz+'</span>步'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewCjsj colorGery">创建时间</span><span class="viewDetailsMain cjsjName">'+moment(datas.lrrq).format("YYYY-MM-DD")+'</span>'+
                            '</div></div></div>'
                    }else if($(datas.listLcgljbxxfj).length==0){
                        var lcxq = '<div class="viewDetailsWrap viewOne">'+
                            '<div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewSfxmc colorGery">收费项目</span><span class="viewDetailsMain sfxmName">'+datas.sfxmMc+'</span>'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewLcbz colorGery">流程步骤</span><span class="viewDetailsMain lcbzName">'+datas.lcbz+'</span>步'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewCjsj colorGery">创建时间</span><span class="viewDetailsMain cjsjName">'+moment(datas.lrrq).format("YYYY-MM-DD")+'</span>'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewbzxx colorGery">流程描述</span><span  class="viewDetailsMain bzxxName" style="max-width:300px;word-break:break-all;margin-top: 7px;display: inline-block;vertical-align: top;">'+datas.lcms+'</span>'+
                            '</div></div></div>'
                    }else if(datas.lcms==""){
                        var lcxq = '<div class="viewDetailsWrap viewOne">'+
                            '<div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewSfxmc colorGery">收费项目</span><span class="viewDetailsMain sfxmName">'+datas.sfxmMc+'</span>'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewLcbz colorGery">流程步骤</span><span class="viewDetailsMain lcbzName">'+datas.lcbz+'</span>步'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewCjsj colorGery">创建时间</span><span class="viewDetailsMain cjsjName">'+moment(datas.lrrq).format("YYYY-MM-DD")+'</span>'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewLcmc colorGery" style="vertical-align: top;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;附件</span><div class="viewDetailsMain box"></div>'+
                            '</div></div></div>'
                    }else{
                        var lcxq = '<div class="viewDetailsWrap viewOne">'+
                            '<div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewSfxmc colorGery">收费项目</span><span class="viewDetailsMain sfxmName">'+datas.sfxmMc+'</span>'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewLcbz colorGery">流程步骤</span><span class="viewDetailsMain lcbzName">'+datas.lcbz+'</span>步'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewCjsj colorGery">创建时间</span><span class="viewDetailsMain cjsjName">'+moment(datas.lrrq).format("YYYY-MM-DD")+'</span>'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewbzxx colorGery">流程描述</span><span  class="viewDetailsMain bzxxName" style="max-width:300px;word-break:break-all;margin-top: 7px;display: inline-block;vertical-align: top;">'+datas.lcms+'</span>'+
                            '</div></div><div class="row"><div class="col-md-12">'+
                            '<span class="viewDetails viewLcmc colorGery" style="vertical-align: top;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;附件</span><div class="viewDetailsMain box"></div>'+
                            '</div></div></div>'
                    }


                    $("#viewDetails").append(lcxq)
                    $(datas.listLcgljbxxfj).each(function (index) {
                        var lcfj = '<div class="main"><a href="'+$(this)[0].fjcclj+'" download="'+$(this)[0].fjmc+'"><i class="iconfont icon-genjinguanli"></i>'+
                            '<p class="name">'+$(this)[0].fjmc+'</p></a></div>'

                        $(".viewOne .box").append(lcfj)
                    })
                    $(datas.listLcglbzxx).each(function (index) {
                        var thisIndex = parseInt(index);
                        var dqbz;

                        if($(datas.listLcglbzxx)[index].cxbxbz==0){
                            dqbz = "串行"
                        }else{
                            dqbz = "并行"
                        }
                        if($(this)[0].bzxx==""&&$(this)[0].listLcglbzfj.length==0){
                            var bzxq = '<div class="viewDetailsWrap nuclearName"><div class="row bgBlue"><div class="col-md-12 ">'+
                                '<i class="iconfont  icon-genjinguanli blue"></i><span class="viewDetails viewtitle colorGery">'+$(this)[0].bzmc+'</span>'+
                                '<a class="viewtitle_Right" href="javascript:void(0);"><span  class=" blue viewDetails drop-down" data=0>展开</span><img src="'+configMap.path+'/assets/pages/img/down.gif" alt=""></a>'+
                                '</div></div><div class="nuclearNamemain" style="overflow: hidden;display: none"><div class="row"><div class="col-md-12" style="margin-top: 10px">'+
                                '<span class="viewDetails viewLcmc colorGery">创建时间</span><span class="viewDetailsMain lcmcName">'+moment($(this)[0].lrrq).format("YYYY-MM-DD")+'</span>'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '<span class="viewDetails viewLcmc colorGery">与下环节</span><span class="viewDetailsMain lcmcName">'+dqbz+'</span>'+
                                '</div></div></div></div>'
                        }else if($(this)[0].bzxx==""){
                            var bzxq = '<div class="viewDetailsWrap nuclearName"><div class="row bgBlue"><div class="col-md-12 ">'+
                                '<i class="iconfont  icon-genjinguanli blue"></i><span class="viewDetails viewtitle colorGery">'+$(this)[0].bzmc+'</span>'+
                                '<a class="viewtitle_Right" href="javascript:void(0);"><span  class=" blue viewDetails drop-down" data=0>展开</span><img src="'+configMap.path+'/assets/pages/img/down.gif" alt=""></a>'+
                                '</div></div><div class="nuclearNamemain" style="overflow: hidden;display: none"><div class="row"><div class="col-md-12" style="margin-top: 10px">'+
                                '<span class="viewDetails viewLcmc colorGery">创建时间</span><span class="viewDetailsMain lcmcName">'+moment($(this)[0].lrrq).format("YYYY-MM-DD")+'</span>'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '<span class="viewDetails viewLcmc colorGery">与下环节</span><span class="viewDetailsMain lcmcName">'+dqbz+'</span>'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '<span class="viewDetails viewLcmc colorGery" style="vertical-align: top;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;附件</span><div class="viewDetailsMain box box'+index+'"></div>'+
                                '</div></div></div></div>'
                        }else if($(this)[0].listLcglbzfj.length==0){
                            var bzxq = '<div class="viewDetailsWrap nuclearName"><div class="row bgBlue"><div class="col-md-12 ">'+
                                '<i class="iconfont  icon-genjinguanli blue"></i><span class="viewDetails viewtitle colorGery">'+$(this)[0].bzmc+'</span>'+
                                '<a class="viewtitle_Right" href="javascript:void(0);"><span  class=" blue viewDetails drop-down" data=0>展开</span><img src="'+configMap.path+'/assets/pages/img/down.gif" alt=""></a>'+
                                '</div></div><div class="nuclearNamemain" style="overflow: hidden;display: none"><div class="row"><div class="col-md-12" style="margin-top: 10px">'+
                                '<span class="viewDetails viewLcmc colorGery">创建时间</span><span class="viewDetailsMain lcmcName">'+moment($(this)[0].lrrq).format("YYYY-MM-DD")+'</span>'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '<span class="viewDetails viewLcmc colorGery">与下环节</span><span class="viewDetailsMain lcmcName">'+dqbz+'</span>'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '<span style="vertical-align: top" class="viewDetails viewLcmc colorGery">备注事项</span><span style="display: inline-block;max-width:300px;word-break:break-all; margin-top: 7px;" class="viewDetailsMain lcmcName">'+$(this)[0].bzxx+'</span>'+
                                '</div></div></div></div>'
                        }else{
                            var bzxq = '<div class="viewDetailsWrap nuclearName"><div class="row bgBlue"><div class="col-md-12 ">'+
                                '<i class="iconfont  icon-genjinguanli blue"></i><span class="viewDetails viewtitle colorGery">'+$(this)[0].bzmc+'</span>'+
                                '<a class="viewtitle_Right" href="javascript:void(0);"><span  class=" blue viewDetails drop-down" data=0>展开</span><img src="'+configMap.path+'/assets/pages/img/down.gif" alt=""></a>'+
                                '</div></div><div class="nuclearNamemain" style="overflow: hidden;display: none"><div class="row"><div class="col-md-12" style="margin-top: 10px">'+
                                '<span class="viewDetails viewLcmc colorGery">创建时间</span><span class="viewDetailsMain lcmcName">'+moment($(this)[0].lrrq).format("YYYY-MM-DD")+'</span>'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '<span class="viewDetails viewLcmc colorGery">与下环节</span><span class="viewDetailsMain lcmcName">'+dqbz+'</span>'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '<span style="vertical-align: top" class="viewDetails viewLcmc colorGery">备注事项</span><span style="display: inline-block;max-width:300px;word-break:break-all; margin-top: 7px;" class="viewDetailsMain lcmcName">'+$(this)[0].bzxx+'</span>'+
                                '</div></div><div class="row"><div class="col-md-12">'+
                                '<span class="viewDetails viewLcmc colorGery" style="vertical-align: top;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;附件</span><div class="viewDetailsMain box box'+index+'"></div>'+
                                '</div></div></div></div>'
                        }


                        $("#viewDetails").append(bzxq)
                        if($(this)[0].listLcglbzfj.length==0){
                            return
                        }else{

                            $($(this)[0].listLcglbzfj).each(function (index) {
                                var bzfj = '<div class="main"><a href="'+$(this)[0].fjcclj+'" download="'+$(this)[0].fjmc+'"><i class="iconfont icon-genjinguanli"></i>'+
                                    '<p class="name">'+$(this)[0].fjmc+'</p></a></div>'

                                $(".nuclearName .box"+thisIndex+"").append(bzfj)
                            })
                        }

                    })
                    $("#viewDetails .viewtitle_Right").on("click",function () {
                        // var el = $(this);
                        if($(this).children("span").attr("data")==0){
                            $(this).children("span").text("收起")
                            $(this).children("img").css("transform","rotate(180deg)")
                            $(this).children("span").attr("data",1)
                            $(this).parent().parent().parent().find(".nuclearNamemain").toggle(500)

                        }else{
                            $(this).children("span").text("展开")
                            $(this).children("img").css("transform","rotate(360deg)")
                            $(this).children("span").attr("data",0)
                            $(this).parent().parent().parent().find(".nuclearNamemain").toggle(500)
                        }

                    })
                },
                error: function () {
                    return App.unblockUI(jqueryMap.$blockTarget);
                }
            });
        }

    };





    return {
        init: function () {
            viewDetailsData();
        },

        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
