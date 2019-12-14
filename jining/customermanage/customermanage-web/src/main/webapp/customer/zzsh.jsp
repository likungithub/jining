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
<div class="row" id="zzsh-manager-view-data">
    <div class="col-md-12 form form-horizontal">
        <div class="form-body">
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                                                        营业执照
                        </label>
                        <div class="input-group pull-left" style="height: 33px;
    width: 500px;
    border: 1px solid #ccc;
    border-radius: 0 4px 4px 0!important;
    line-height: 30px;">
                            <img id="yyzz" src="#" style="width: 520px;height: 694px;text-indent: 10px" alt="客户未上传">
                            <span id="khwsc" style="width: 520px;height: 694px;text-indent: 10px;margin-left: 10px;font-size: 15px;">客户未上传</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                            缴费状态
                        </label>
                        <input type="text" class="inputCommon inputWidth-col-three" id="zzsh_jfzt_id" readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                           <span class="colorRed"> * </span> 审批状态
                        </label>
                        <input type="checkbox" name="shty" value="1" style="margin-top: 10px;margin-left: 10px;"> 同意
                        <input type="checkbox" name="shbty" value="0" style="margin-top: 10px;margin-left: 10px;"> 不同意
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
                        <textarea id="shBzxx" name="companyProfile" maxlength="500" style="resize:none;height: 80px;
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
<script src="<%=request.getContextPath()%>/assets/pages/scripts/customer/zzsh.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        zzshView.setPath("<%=request.getContextPath() %>");
        zzshView.init("<%=request.getParameter("dljgbm")%>");
        $(":checkbox").click(function () {
            $(this).attr("checked", true);//设置当前选中checkbox的状态为checked
            $(this).siblings().attr("checked", false); //设置当前选中的checkbox同级(兄弟级)其他checkbox状态为未选中
        });
    });
</script>