<%--
  Created by IntelliJ IDEA.
  User: zhangjunlong
  Date: 2016/4/15
  Time: 9:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div id="customer_container" class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="portlet light bordered">
                <div class="portlet-body">
                    <div class="table-toolbar">
                        <div class="row">
                            <div class="col-md-3">
                                <button id="btnNew_customer" class="btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4">
                                    <i class="fa fa-plus"></i> 新增客户
                                </button>
                            </div>
                            <div class="pull-right">
                                <div class="input-icon">
                                    <i class="fa fa-search"></i>
                                    <input type="text" class="form-control" id="searchFilter">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12" id="div_data_content">
                            <table class="table table-striped table-bordered table-hover"
                                   id="customer_data">
                                <thead>
                                <tr>
                                    <th width="27%">名称</th>
                                    <th width="25%">编码</th>
                                    <th width="20%">创建日期</th>
                                    <th width="15%">是否启用</th>
                                    <th width="13%">操作</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/customer/customer.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        customer.setPath('<%= request.getContextPath()%>')
        customer.init();
    });
</script>