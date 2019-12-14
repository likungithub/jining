<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<style>
    /*.modal-dialog {*/
        /*width: 688px !important;*/
    /*}*/

    .modal-footer {
        padding-right: 37px !important;
    }

    .inputWidth-col-three {
        width: 161px !important;
    }

    #Customerlogosrc {
        position: absolute;
        z-index: 100;
        bottom: -200px;
        left: 31%;
        display: none;
    }

    #Customerlogo:hover > img {
        display: block;
    }
</style>
<div class="row" id="cxsh-manager-view-data">
    <div class="col-md-12 form form-horizontal">
        <div class="form-body clearfix" style="padding-left: 140px;padding-top: 17px!important;">
          <%--  <div class="input-group" style="margin: 15px auto;">
                <input type="button" style="width:458px;" class="inputCommon" name="cscx" id="cscxBtn" value="初审撤销">
            </div>
            <div class="input-group" style="margin: 15px auto;">
                <input type="button" style="width:458px;" class="inputCommon" name="zscx" id="zscxBtn" value="终审撤销">
            </div>--%>


            <input type="button"     style="text-indent: 0;margin-right: 15px;width:80px;height: 80px;border-radius: 4px!important" class="inputCommon" name="cscx" id="cscxBtn" value="初审撤销">
            <input type="button"    style="text-indent: 0;width:80px;height: 80px;border-radius: 4px!important"  class="inputCommon" name="zscx" id="zscxBtn" value="终审撤销">


        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/customer/cxsh.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        $('#cxsh-manager-view-data').parents('.modal-dialog').css({width:476});
        cxshView.setPath("<%=request.getContextPath() %>");
        cxshView.init("<%=request.getParameter("id")%>","<%=request.getParameter("customerId")%>");
    });
</script>