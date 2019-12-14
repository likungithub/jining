<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String dljgbm = request.getParameter("dljgbm");
    if (dljgbm == null) {
        dljgbm = "";
    }
%>
<style>
    .modal-dialog {
        width: 717px !important;
    }

    /* .ui-datepicker-calendar {
        display: none;
    }

    #sfjeinput input {
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        text-indent: 10px;
        width: 100px !important;
    }

    th {
        font-size: 12px !important;
    }


    .portlet.light .portlet-body {
        padding-top: 0px !important;
    }

    .portlet {
        margin-bottom: 11px;
    } */
</style>
<form action="#" id="remindForm" class="form form-horizontal">
    <div class="form-body">
        <div class="row form-group">
            <div class="col-md-12">
                <div class="form-group">
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-two labelBg color666">
                            <span class="colorRed"> * </span>
                           催费时间</label>
                        <div class="input-group date sfnf">
                            <input type="text" class="form-control inputCommon" name="sfnf" style="border-top-right-radius: 0px !important;
                                    border-bottom-right-radius: 0px !important;font-size:12px;background:#fff;"
                                   readonly>
                            <span class="input-group-btn">
                                <button class="btn default" type="button"
                                        style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>

                    </div>
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-two labelBg color666">
                            <span class="colorRed"> * </span>提醒方式</label>
                        <select class="inputCommon inputWidth-col-two" name="txfs">
                            <option value="0" selected="selected">电话</option>
                            <option value="1">短信</option>
                            <option value="2">微信</option>
                            <option value="3">邮件</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="form-group">
                    <div class="col-md-12">
	                    <label class="labelCommon labelWidth-col-two labelBg color666"
	                           style="height: 74px;line-height: 74px;"><span class="colorRed"> * </span>催费内容</label>
	                    <textarea rows="3" class="form-control " name="tbsx" style="width:540px !important;height: 74px;
	    border-top-right-radius: 4px !important;
	    border-bottom-right-radius: 4px !important;font-size: 12px!important" maxlength="500"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<div class="row" id="remind_data_list">
    <div class="col-md-12">
        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover contractTab" id="remind_data">
                        <thead>
                        <tr>
                            <th width="25%">催费编号</th>
                            <th width="10%">提醒方式</th>
                            <th width="35%">催费内容</th>
                            <th width="15%">催费时间</th>
                            <th width="10%">记录人</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/agentstatistics/remind.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
    	remindagent.setPath('<%=request.getContextPath()%>');
        remindagent.init('<%=dljgbm%>');
    });
</script>