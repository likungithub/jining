<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="row" id="kq-list-con">
    <div class="col-md-12">
        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="table-toolbar" style="padding-bottom: 10px">
                    <div class="row">
                        <div class="col-md-12">
                           <div class="pull-left">
                               <div class="input-group">
                                   <button type="button" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr ml" id="addKqBtn"><i class="fa fa-plus mr"></i>新增</button>
                               </div>
                           </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" style="width:100%;" id="kqListTable">
                        <thead>
                        <tr>
                            <th width="20%" style="text-align: left;">考勤编号</th>
                            <th width="10%">上班时间</th>
                            <th width="10%">下班时间</th>
                            <th width="15%">休息时间</th>
                            <th width="10%">加班开始时间</th>
                            <th width="10%">打卡有效范围</th>
                            <th width="10%">补卡期限</th>
                            <th style="text-align: center;">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/attendance/kqlist.js"></script>
<script>
    $(function () {
        kqlist.setPath("<%=request.getContextPath()%>");
        kqlist.init();
    })
</script>