<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container-fluid" id="domainNameManageByM" style="height: 100%;background: #ffffff">
    <div class="row">
        <div class="col-md-12" style="padding: 15px">
            <div class="row">
                <div class="col-md-6">
                    <button class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left" id="adddomainNameBasic">
                        <i class="fa fa-plus"></i>
                        新增
                    </button>
                </div>
                <div class="col-md-6" style="position:relative;">
                   <%-- <button class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-right" id="searchDomainName">
                        <i class="fa fa-search iconMr"></i>
                            查&nbsp;&nbsp;询
                    </button>--%>
                       <i id="searchDomainName" class="fa fa-search colorBlue-10a0f7 searchIcoBtn" style=" font-size: 20px!important;
                                                                                            position: absolute;
                                                                                            cursor: pointer;
                                                                                            right: 26px;
                                                                                            width: 45px;
                                                                                            height: 33px;
                                                                                            text-align: center;
                                                                                            line-height: 33px;
                                                                                            border-left: 1px solid #dedede;"></i>
                    <input style="width: 220px;padding-right: 48px;" type="text" placeholder="请输入公司名称" class="inputCommon borderRadius4 pull-right mr" id="searchTxt">
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped table-hover " id="domainNameManageT">
                <thead>
                    <th width="28%" class="text-left">公司名称</th>
                    <th width="27%" class="text-left">代理机构编码</th>
                    <th width="27%" class="text-left">域名地址</th>
                    <th width="18%" class="text-center">操作</th>
                </thead>
            </table>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/domainName/domainNameManage.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        domainNameBasic.setPath("<%=request.getContextPath()%>");
        domainNameBasic.init();
    });
</script>
