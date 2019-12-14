<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
    UUID uuid = UUID.randomUUID();
%>

<style>
    #page-container #contacts_data_info {
        height: 30px !important;
        line-height: 20px !important;
    }
    .ygTabNav{
        width: 100%;
        height: 40px;
        border-bottom: 2px solid #ccc;
        position: relative;

    }
    .ygTabNav ul{
        height: 40px;
        position: absolute;
        left: -20px;
    }
    .ygTabNav ul li{
        float: left;
        line-height: 38px;
        margin-right: 25px;
        font-size: 14px;
    }
    .ygTabNav ul li:hover{
        cursor: pointer;
    }
    .colorBlue{
        color: #359BE6;
        border-bottom: 2px solid #359BE6;
    }
    .cylxrBox{
        display: none;
    }
</style>
<div class="row contentBgColor" id="contacts-manager-container_<%=uuid%>">
    <div class="col-md-12">

        <div class="portlet light bordered">
            <div class="ygTabNav">
                <ul>
                    <li class="colorBlue ygtxl">员工通讯录</li>
                    <li class="cylxr">常用联系人</li>
                </ul>
            </div>
            <div class="portlet-body ygxx">
                <div class="table-toolbar">
                    <div class="row">
                        <div class="col-md-12" style="    margin-bottom: 20px;">
                            <div class="pull-left">
                                <div class="input-icon" style="width: 190px;">
                                    <i class="fa fa-search  colorBlue-10a0f7"></i>
                                    <input type="search" class="form-control borderRadius4" id="searchFilter"
                                           placeholder="员工姓名"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped  table-hover" id="contacts_data">
                        <thead>
                        <tr class="color333">
                            <th>员工姓名</th>
                            <th>办公电话</th>
                            <th>手机</th>
                            <th>Email</th>
                            <th>QQ</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="portlet-body cylxrBox">
                <div class="table-toolbar">
                    <div class="row">
                        <div class="col-md-12"  style="    margin-bottom: 20px;">
                            <div class="pull-left" style="width: 100%">
                                <div class="input-group search-box search-input-small pull-left" style="width: 170px!important;">
                                    <button data="add" id="xzlxr" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">
                                        <i class="fa fa-plus" style="margin-right: 5px;"></i>新增
                                    </button>
                                    <button id="xzlxrDelAll" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4 pull-left mr">
                                        <i class="icon iconfont icon-shanchu3"></i> 删除
                                    </button>
                                </div>
                                <div style="float: right;margin-right:8px;width: 333px;">
                                    <div class="input-group search-box search-input-small pull-left" style="width: 360px!important;">
                                        <input type="text" class="lxrQuery inputCommon appsysinfo-m " style="float: left; width: 250px;border-radius: 4px !important;" placeholder="请输入联系人或单位名称">
                                        <button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr" id="ygcx-btn" style="height:33px; margin-left: 10px" data-loading-text="Loading...">
                                            <i class="fa fa-search "></i>
                                            搜&nbsp;索&nbsp;</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped  table-hover" id="cylxr_data">
                        <thead>
                        <tr class="color333">
                            <th width="2%" style="padding-left: 6px" class="text-left sorting_disabled" rowspan="1" colspan="1"><input name="selectAll" id="selectAll" type="checkbox" style="    margin: 0 2px;">
                            </th>
                            <th class="text-left" width="15%">联系人或单位</th>
                            <th  width="11%">手机号码</th>
                            <th  width="11%">办公电话</th>
                            <th  width="11%">QQ</th>
                            <%--<th  width="11%">Email</th>--%>
                            <th class="text-left"  width="15%">联系地址</th>
                            <th class="text-left"   width="15%">备注</th>
                            <th   width="10%">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/concat/concat.css" rel="stylesheet" type="text/css"/>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/contacts/contacts.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        contacts.setPath("<%= request.getContextPath()%>");
        contacts.init('<%=uuid%>');
    });
</script>

