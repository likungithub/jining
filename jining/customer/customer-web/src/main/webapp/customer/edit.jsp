<%--
  Created by IntelliJ IDEA.
  User: zhangjunlong
  Date: 2016/4/15
  Time: 11:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form action="#" id="customerForm" class="form form-horizontal">
    <div class="form-body">
        <div class="form-group">
            <label for="name" class="col-sm-3 control-label"><span class="required"> * </span>名称</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="name" name="name"
                       placeholder="请输入名字">
            </div>
        </div>
        <div class="form-group">
            <label for="code" class="col-sm-3 control-label"><span class="required"> * </span>编码</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="code" name="code"
                       placeholder="请输入编码">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label">是否启用</label>
            <div class="col-sm-9">
                    <input type="checkbox" checked id="state" name="state"/>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">扩展属性</label>
            <div class="col-lg-9">
                <select class="form-control select2" id="select2_extAtrr" name="extAtrr" >
                    <option></option></select>
            </div>
        </div>
    </div>
</form>