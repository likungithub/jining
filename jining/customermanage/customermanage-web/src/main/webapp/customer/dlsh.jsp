<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<style>
    .modal-dialog {
        width: 688px !important;
    }

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
<div class="row" id="dlsh-manager-view-data">
    <div class="col-md-12 form form-horizontal">
        <div class="form-body">
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666" style="float: left">
                           <span class="colorRed"> * </span> 审批状态
                        </label>
                        <div style="float: left;
    height: 33px;
    width: 500px;
    border: 1px solid #ccc;
    border-radius: 0 4px 4px 0!important;">
                            <input type="checkbox" name="shty" value="1" style="margin-top: 10px;margin-left: 10px;"> 同意
                            <input type="checkbox" name="shbty" value="0" style="margin-top: 10px;margin-left: 10px;"> 不同意
                        </div>
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                            <span class="colorRed"> * </span>试用期限
                        </label>
                        <div class="input-group pull-left">
                            <div class="input-group date shStartDate">
                                <input type="text" class="form-control inputCommon inputWidth-col-two"
                                       name="shStartDate" readonly
                                       style="width: 158px !important;border-top-right-radius: 0px !important;border-bottom-right-radius: 0px !important;background:#fff;"/>
                                <span>
	                                <button class="btn default" type="button"
                                            style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;">
	                                    <i class="fa fa-calendar"></i>
	                                </button>
	                            </span>
                            </div>
                        </div>
                        <label class="control-label"
                               style="padding: 0px 10px;height: 32px;line-height: 32px;">至 </label>
                        <div class="pull-left" style="margin-right:18px;">
                            <div class="input-group date shEndDate">
                                <input type="text" class="form-control inputCommon inputWidth-col-two" readonly
                                       name="shEndDate"
                                       style="width: 158px !important;border-top-left-radius: 4px !important;border-bottom-left-radius: 4px !important;
	                                border-top-right-radius: 0px !important;border-bottom-right-radius: 0px !important;background:#fff;"/>
                                <span>
	                                <button class="btn default" type="button"
                                            style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;">
	                                    <i class="fa fa-calendar"></i>
	                                </button>
	                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666" style="    height: 80px !important;
                           line-height: 80px;">
                            备注信息
                        </label>
                        <textarea id="shBzxx" name="companyProfile" maxlength="400" style="resize:none;height: 80px;
                        width: 502px;
                        border: 1px solid #ccc;
                        border-top-right-radius: 4px !important;
                        border-bottom-right-radius: 4px !important;padding:10px;"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/customer/dlsh.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        dlshView.setPath("<%=request.getContextPath() %>");
        dlshView.init("<%=request.getParameter("id")%>","<%=request.getParameter("customerId")%>");
        $(":checkbox").click(function () {
            $(this).attr("checked", true);//设置当前选中checkbox的状态为checked
            $(this).siblings().attr("checked", false); //设置当前选中的checkbox同级(兄弟级)其他checkbox状态为未选中
        });
    });
</script>