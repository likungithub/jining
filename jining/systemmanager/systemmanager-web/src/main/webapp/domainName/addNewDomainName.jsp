<%--
  Created by IntelliJ IDEA.
  User: Mdw
  Date: 2018/2/28 0028
  Time: 17:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    #addDomainName_M .inputW{
        width: 534px;
    }
    #addDomainName_M .inputW1{
        width: 395px;
    }
    #addDomainName_M .must{
        color: red;
    }
     #addDomainNameInfo_M  span.select2.select2-container.select2-container--bootstrap
     {
         width: 395px !important;
         margin-left: 110px;
     }
    #addDomainNameInfo_M  span.select2-selection.select2-selection--single{
        border-radius: 0 4px 4px 0!important;
        height: 33px;
        border: 1px solid #dedede;
    }
</style>
<%

    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String ifview=request.getParameter("ifview");
    if(ifview==null){
        ifview="";
    }
%>

<form id="addDomainNameInfo_M">
<div class="container"  id="addDomainName_M">
    <div class="row">
        <div class="col-xs-12 clearfix">
            <div class="pull-left mr">
                <div class="form-group clearfix">
                    <label class="labelCommon labelWidth-col-one color666 ">
                        <span class="must">*</span>
                        公司名称
                    </label>
                    <select type="text" class="inputCommon inputW1" id="agencyCode"></select>
                    <input type="hidden" id="hiddenAgencyCode">
                </div>
                <div class="form-group clearfix">
                    <label class="labelCommon labelWidth-col-one color666 ">
                        <span class="must">*</span>
                        域名地址
                    </label>
                    <input type="text" class="inputCommon inputW1" id="domainAddress">
                </div>
                <div class="form-group clearfix">
                    <label class="labelCommon labelWidth-col-one color666 ">
                        <span class="must">*</span>
                        服务热线
                    </label>
                    <input type="text" class="inputCommon inputW1" id="servicePhone">
                </div>
            </div>
            <div class="pull-left borderRadius4 selectLogo" style="height: 125px;width: 125px; cursor: pointer">
                <img title="点击上传logo" src="/securityassets/img/userlogo.png"  id="logosrc" alt="公司logo" style="width: 125px">
                <input type="hidden" id="companyLogo_ws_mdw">
            </div>
        </div>
        <div class="col-xs-12">
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 mr">
                    <span class="must">*</span>
                    网站标志
                </label>
                <div class="mr" style="    border: 1px solid #dedede;
                                    height: 32px;
                                    width: 32px;
                                    float: left;">
                    <img style="width: 32px;height: 32px;cursor: pointer" src="/systemmanager/assets/pages/img/ICON.png" alt="ico" id="icoupload">
                    <input type="hidden" id="internetFlag">
                </div>
                <label class="labelCommon labelWidth-col-one color666">版权信息</label>
                <input type="text" class="inputCommon" style="width: 372px" id="copyrightInfo">
            </div>
        </div>
        <div class="col-xs-12">
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666">
                    <span class="must">*</span>
                    备案信息
                </label>
                <input type="text" class="inputCommon inputW" id="icpRecord" >
            </div>
        </div>
        <div class="col-xs-12">
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666">
                    <span class="must">*</span>
                    网站关键词
                </label>
                <input type="text" class="inputCommon inputW" id="keyWord" >
            </div>
        </div>
        <div class="col-xs-12">
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666">
                    <span class="must">*</span>
                    网站标题
                </label>
                <input type="text" class="inputCommon inputW" id="title" >
            </div>
        </div>
        <div class="col-xs-12 clearfix">
            <div class="form-group">
                <label class="labelCommon labelWidth-col-one color666" style="height: 77px;line-height: 77px">
                    <span class="must">*</span>
                    网站描述
                </label>
                <textarea type="text" class="inputCommon inputW" style="height: 77px" id="descriptionInfo"></textarea>
            </div>
        </div>
    </div>
</div>
</form>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/domainName/addDomainName.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        addDomainName.setPath("<%=request.getContextPath()%>");
        addDomainName.init("<%=id%>","<%=ifview%>");
    });
</script>
