<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .common-pro-modal-hxq .modal-dialog{
        width: 800px;
    }
    .common-pro-modal-hxq .modal-dialog img{
        width: 787px;
    }
    #businessCooperateImage{
        width: 95%;
        margin: 0px 38px;
    }
    #businessCooperateImage img{
        width: 30%;
        margin-right: 9px;
        margin-bottom: 10px;
    }
</style>
<div class="row" id="businesscooperateView">
    <div class="col-md-12 form form-horizontal">
        <div class="form-body">
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label col-xs-2 color666 title-thick padding-reset-r">公司名称：</label>
                        <div class="col-xs-9">
                            <p class="form-control-static color666" id="gsmc_id"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label col-xs-2 color666 title-thick padding-reset-r">用户名称：</label>
                        <div class="col-xs-9">
                            <p class="form-control-static color666" id="customerName"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label col-xs-2 color666 title-thick padding-reset-r">受理状态：</label>
                        <div class="col-xs-9">
                            <p class="form-control-static color666" id="blztmc_id"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label col-xs-2 color666 title-thick padding-reset-r">业务类型：</label>
                        <div class="col-xs-9">
                            <p class="form-control-static color666" id="cooperateType"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label col-xs-2 color666 title-thick padding-reset-r">联系方式：</label>
                        <div class="col-xs-9">
                            <p class="form-control-static color666" id="contactInformation"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label col-xs-2 color666 title-thick padding-reset-r">申请日期：</label>
                        <div class="col-xs-9">
                            <p class="form-control-static color666" id="messageDate"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label col-xs-2 color666 title-thick padding-reset-r">留言信息：</label>
                        <div class="col-xs-9">
                            <p class="form-control-static color666" id="message"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div id="businessCooperateImage"></div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/businesscooperate/businesscooperateview.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        businesscooperateView.setPath("<%=request.getContextPath() %>");
        businesscooperateView.init("<%=request.getParameter("cooperateId")%>");
    });
</script>