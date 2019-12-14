<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style type="text/css">
    #announcementContent,#announcementDescription,#announcementName{
        width: 535px;
        word-break: break-all;
    }
    #announcementContent p{
        word-break: break-all;
    }
</style>
<div class="row" id="systemannouncementView">
    <div class="col-md-12 form form-horizontal">
        <div class="form-body">
            <div class="row">
                <div class="col-md-12">
                    <div style="text-align: center" class="form-control-static h2" id="announcementName">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div style="text-align: center" class="form-control-static" id="announcementDescription">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12" style="text-align: center;border-bottom: 1px solid #eeeeee;">
                    <span class="form-control-static" id="enterDate"></span>
                    &nbsp;&nbsp;发布人：<span class="form-control-static" id="announcementSource"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-control-static"  id="announcementContent">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/systemannouncement/systemannouncementview.css">
<script src="<%=request.getContextPath()%>/assets/pages/scripts/systemannouncement/systemMessageView.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        systemMessage.setPath("customermanage");
        systemMessage.init("<%=request.getParameter("systemAnnouncementId")%>");
    });
</script>