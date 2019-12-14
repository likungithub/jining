<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row" id="user-manager-view-data">
    <div class="col-md-12 form form-horizontal">
        <div class="form-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label col-md-4 color666 title-thick padding-reset-r">用户姓名：</label>
                        <div class="col-md-8">
                            <p class="form-control-static color666" id="name"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label col-md-4 color666 title-thick padding-reset-r">登录账号：</label>
                        <div class="col-md-8">
                            <p class="form-control-static color666" id="userAccount"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label col-md-4 color666 title-thick padding-reset-r">性别：</label>
                        <div class="col-md-8">
                            <p class="form-control-static color666" id="sex"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label col-md-4 color666 title-thick padding-reset-r">出生日期：</label>
                        <div class="col-md-8">
                            <p class="form-control-static color666" id="birth"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label col-md-4 color666 title-thick padding-reset-r">Email：</label>
                        <div class="col-md-8">
                            <p class="form-control-static color666" id="email"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label col-md-4 color666 title-thick padding-reset-r">手机：</label>
                        <div class="col-md-8">
                            <p class="form-control-static color666" id="phone"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label col-md-4 color666 title-thick padding-reset-r">联系电话：</label>
                        <div class="col-md-8">
                            <p class="form-control-static color666" id="tel"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label col-md-4 color666 title-thick padding-reset-r">QQ：</label>
                        <div class="col-md-8">
                            <p class="form-control-static color666" id="qq"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label col-md-4 color666 title-thick padding-reset-r">部门：</label>
                        <div class="col-md-8">
                            <p class="form-control-static color666" id="bmdm"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label col-md-4 color666 title-thick padding-reset-r">
                                                     入职日期：
                        </label>
                        <!-- <div class="input-group date dateOfBusiness"> -->
                            <div class="col-md-8">
                                <p class="form-control-static color666" id="dateOfBusiness"></p>
                            </div>
                        <!-- </div> -->
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">联系地址：</label>
                        <div class="col-md-10">
                            <p class="form-control-static color666" id="lxdz"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="display: none;">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">
                                                   员工学历：
                        </label>
                        <div class="col-md-10">
	                        <p class="form-control-static color666" id="education" style="width: 470px;vert-align: top;"></p>
	                        <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" name="image001" id="educationImage" type="button">查看附件</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="display: none;">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">
                                                    从业资质：
                        </label>
                        <div class="col-md-10">
                            <p class="form-control-static color666" id="qualifications" style="width: 470px;vert-align: top"></p>
                            <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" name="image002" id="qualificationsImage" type="button">查看附件</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="display: none;">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">
                                                    身份证：
                        </label>
                        <div class="col-md-10">
                            <p class="form-control-static color666" id="idCard" style="width: 470px;vert-align: top"></p>
                            <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" name="image003" id="idCardImage" type="button">查看附件</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">备注：</label>
                        <div class="col-md-8">
                            <p class="form-control-static color666" id="remark"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">角色：</label>
                        <div class="col-md-10 maleandfemale" id="js"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/users/view.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/view.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        userView.setPath("<%=request.getContextPath() %>");
        userView.init("<%=request.getParameter("id")%>", "<%=request.getParameter("dljgbm")%>", "<%=request.getParameter("zydm")%>");
    });
</script>