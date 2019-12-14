<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
    String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    #viewDetails .viewDetails{
        font-size: 14px!important;
        line-height: 32px!important;
        margin-left: 11px!important;
        display: inline-block;
        /*vertical-align: top;*/
    }
    .colorGery{
        color:#999;
    }
    #viewDetails .viewDetailsWrap{
        margin:20px!important;
        padding: 20px 15px;
        border-bottom: 1px #dbdbdb solid;
        padding-top: 0!important;
    }
    #viewDetails  .viewDetailsMain{
        margin-left: 20px!important;
        font-size: 14px!important;
    }
    #viewDetails  .bgBlue{
        background: #e8edf1;

    }
    #viewDetails  .viewtitle_Right{
        float: right;
    }
    #viewDetails  .viewtitle_Right img{
        display: inline-block;
    }
    .up{
        transform: rotate(180deg);
    }
    .blue{
        color: #698cac;
    }
    #viewDetails  .drop-down{
        font-size: 12px!important;
        margin-right: 3px;
    }
    .nuclearName{
        margin-left: 0px!important;

    }
    .box{
        display: inline-block;
        margin-top: 8px;
        width: 310px;
    }
    .main{
        width: 60px;
        text-align: center;
        float: left;
        margin-right: 20px;
        height: 100px;
        margin-bottom: 10px;
        overflow: hidden;
    }
    .main i{
        font-size: 18px;
    }
    .main p{
        margin: 0;
        word-break: break-all;
        font-size: 12px;
    }

    #viewDetails .clear{
        clear: both;
    }
</style>
<div id="viewDetails">
    <%--<div class="viewDetailsWrap viewOne">--%>
        <%--<div class="row">--%>
            <%--<div class="col-md-12">--%>
                <%--<span class="viewDetails viewLcmc colorGery">流程名称</span><span class="viewDetailsMain lcmcName">流程1</span>--%>
            <%--</div>--%>
        <%--</div>--%>
        <%--<div class="row">--%>
            <%--<div class="col-md-12">--%>
                <%--<span class="viewDetails viewSfxmc colorGery">收费项目</span><span class="viewDetailsMain sfxmName">服务服用</span>--%>
            <%--</div>--%>
        <%--</div>--%>
        <%--<div class="row">--%>
            <%--<div class="col-md-12">--%>
                <%--<span class="viewDetails viewLcbz colorGery">流程步骤</span><span class="viewDetailsMain lcbzName">3</span>步--%>
            <%--</div>--%>
        <%--</div>--%>
        <%--<div class="row">--%>
            <%--<div class="col-md-12">--%>
                <%--<span class="viewDetails viewCjsj colorGery">创建时间</span><span class="viewDetailsMain cjsjName">2017-12-14</span>--%>
            <%--</div>--%>
        <%--</div>--%>
        <%--<div class="row">--%>
            <%--<div class="col-md-12">--%>
                <%--<span class="viewDetails viewbzxx colorGery">备注信息</span><span  class="viewDetailsMain bzxxName" style="max-width:300px;word-break:break-all;margin-top: 7px;">daasdsadsdadsads</span>--%>
            <%--</div>--%>
        <%--</div>--%>
        <%--<div class="row">--%>
            <%--<div class="col-md-12">--%>
                <%--<span class="viewDetails viewLcmc colorGery">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;附件</span><div class="viewDetailsMain box"></div>--%>
            <%--</div>--%>
        <%--</div>--%>
    <%--</div>--%>
    <%--<div class="viewDetailsWrap nuclearName">--%>
        <%--<div class="row bgBlue">--%>
            <%--<div class="col-md-12 ">--%>
                <%--<i class="iconfont  icon-genjinguanli blue"></i><span class="viewDetails viewtitle colorGery">核名</span>--%>
                <%--<a class="viewtitle_Right" href="javascript:void(0);"><span  class=" blue viewDetails drop-down" data=0>下拉</span><img src="<%=request.getContextPath()%>/assets/pages/img/down.gif" alt=""></a>--%>
            <%--</div>--%>
        <%--</div>--%>
        <%--<div class="nuclearNamemain" style="overflow: hidden;display: none">--%>
            <%--<div class="row">--%>
                <%--<div class="col-md-12">--%>
                    <%--<span class="viewDetails viewLcmc colorGery">创建时间</span><span class="viewDetailsMain lcmcName">2017-12-14</span>--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<div class="row">--%>
                <%--<div class="col-md-12">--%>
                    <%--<span class="viewDetails viewLcmc colorGery">&nbsp;&nbsp;&nbsp;末环节</span><span class="viewDetailsMain lcmcName">否</span>--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<div class="row">--%>
                <%--<div class="col-md-12">--%>
                    <%--<span class="viewDetails viewLcmc colorGery">与下环节</span><span class="viewDetailsMain lcmcName">串行</span>--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<div class="row">--%>
                <%--<div class="col-md-12">--%>
                    <%--<span style="vertical-align: top" class="viewDetails viewLcmc colorGery">备注信息</span><span style="display: inline-block;max-width:300px;word-break:break-all; margin-top: 7px;" class="viewDetailsMain lcmcName">sdsaijdajdasjdsjdakdsdadshahdsjadadskasjhdjaakjdsakd</span>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
    <%--</div>--%>

</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/taskcenter/viewDetails.js" type="text/javascript"></script>
<script>
    $(function () {

        viewDetails.setPath("<%=request.getContextPath()%>")
        viewDetails.init()
    })
</script>