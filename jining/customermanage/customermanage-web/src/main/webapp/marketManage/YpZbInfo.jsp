<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    String txtDate = format.format(currentTime); //将日期时间格局化
    String loginuser = CurrentLoginUser.getUser().getName();
    String ypbm = request.getParameter("ypbm");
    String ypmc = request.getParameter("ypmc");
    String ypid = request.getParameter("ypid");
    String style = request.getParameter("style");
    if (style.equals("jdcc") || style.equals("aqcj")){
        style="";
    }else {
        style="none";
    }
%>
<div>
<div class="form-body form form-horizontal"  style="margin-left: 13px;">
    <div class="row">
        <div class="col-md-12 input-group">
            <div class="form-group">
                <div class="col-md-6" style="position: relative;">
                    <label class="labelCommon labelWidth-col-two labelBg color666" id="zjelabel1">
                        <span class="colorRed"> * </span>样品名称
                    </label>
                    <div class="col-md-6 input-group sfjeinput">
                        <input class="form-control" style="display: block;width: 169px !important;" name="zbypbm"  value="<%=ypmc%>" id="ypmc" readonly placeholder="<%=ypmc%>">
                        <input class="form-control" style="display: none;width: 150px !important;" name="ypid"  value="<%=ypid%>" id="ypid" readonly placeholder="<%=ypmc%>">
                    </div>
                </div>
                <div class="col-md-6" style="position: relative;">
                    <label class="labelCommon labelWidth-col-two labelBg color666" id="">
                        <span class="colorRed"> * </span>样品编码
                    </label>
                    <div class="col-md-6 input-group sfjeinput">
                        <input class="form-control" style="display: block;width: 150px !important;" name="zbypbm1"  value="<%=ypbm%>" id="ypbm" readonly>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 input-group">
            <div class="form-group">
                <div class="col-md-6" style="position: relative;" >
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="colorRed"> * </span>制备时间
                    </label>
                    <div class="input-group pull-left">
                        <div class="input-group date cyDate beginTime">
                            <input type="text" class="form-control inputCommon inputWidth-col-two"
                               name="zbDate" readonly style="width: 133px !important;text-indent:0;
                                border-bottom-right-radius: 0px !important;background:#fff;padding:6px;
                                border-top-right-radius: 0px !important;text-align: center;" value="<%=txtDate%>" id="zbDate"/>
                            <span>
                                <button class="btn btn-default" type="button"
                                        style="border-top-right-radius: 4px !important;
                                    border-bottom-right-radius: 4px !important;height: 33px;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6" style="position: relative;">
                <label class="labelCommon labelWidth-col-two labelBg color666">
                    <span class="colorRed"> * </span>制备方式
                </label>
                <div class="input-group sfjeinput">
                    <select class="form-control" id="zbfs" name="zbfs" readonly style="display: block;width: 150px !important;border-radius: 0 !important">
                    </select>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <table id="zbfsTable">
            <tr>
                <td>序号</td>
                <td>制备方式</td>
            </tr>
        </table>
    </div>
    <div class="row table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
            <tr>
                <th>制备样名称</th>
                <th style="display: none">制备样编码</th>
                <th>制备质量</th>
                <th>单位</th>
                <th>存储位置</th>
            </tr>
            </thead>
    <tbody>
            <tr>
                <td>检样1</td>
                <th style="display: none"><span id="zybm"><%=ypbm%>001</span></th>
                <td><input type="text" class="form-control" id="zyzl"></td>
                <td>
                    <select class="s" style="!important;height: 34px;width: 100px" id="zydw">
                        <option>g</option>
                        <option>kg</option>
                        <option>袋</option>
                </select>
                </td>
                <td><input type="text" class="form-control" id="zywz"></td>
            </tr>

            <tr>
                <td>检样2</td>
                <th style="display: none"><span id="fybm"><%=ypbm%>002</span></th>
                <td><input type="text" class="form-control" id="fyzl"></td>
                <td>
                    <select class="s" style="!important;height: 34px;width: 100px" id="fydw">
                        <option>g</option>
                        <option>kg</option>
                        <option>袋</option>
                    </select>
                </td>
                <td><input type="text" class="form-control" id="fywz"></td>
            </tr>

            <tr>
                <td>检样3</td>
                <th style="display: none"><span id="bybm"><%=ypbm%>003</span></th>
                <td><input type="text" class="form-control" id="byzl"></td>
                <td>
                    <select class="s" style="!important;height: 34px;width: 100px" id="bydw">
                        <option>g</option>
                        <option>kg</option>
                        <option>袋</option>
                    </select>
                </td>
                <td><input type="text" class="form-control" id="bywz"></td>
            </tr>
    </tbody>
        </table>
    </div>
    <div class="row">
        <div class="col-md-12  input-group">
            <div class="form-group">
                <div class="col-md-12" style="position: relative;">
                    <label class="labelCommon labelWidth-col-two labelBg color666" style="height: 74px;
                        line-height: 74px;">备注信息</label>
                    <textarea rows="3" class="form-control " name="bzxx" maxlength="300" style="height: 74px;
                        border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;
                        width:770px !important;font-size: 12px!important" id="bzxx1"></textarea>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<script type="text/javascript" src="<%=request.getContextPath() %>/assets/pages/scripts/marketManage/YpZbInfo.js"></script>
<script>
    ypzbinfo.init('<%=request.getContextPath()%>','<%=ypbm%>','<%=ypmc%>')
</script>
