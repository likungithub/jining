<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/3/1 0001
  Time: 10:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    #footerPageSetWrap .pad15{
        padding:10px 15px;
    }
    #footerPageSetWrap .liSet{
        position: relative;
        top:1px;
        cursor: pointer;
    }
    #footerPageSetWrap .activeStyle{
        background: #fff;
        border: 1px solid #dedede;
        border-top: 2px solid #1E9EFF;
        border-bottom: none;
    }
    #footerPageSetWrap .inputW1{
        width: 528px;
    }
    #footerPageSetWrap  .must{
        color: red;
    }
    #footerPageSetWrap .qbRadio

    {
        width: 525px;
        height: 33px;
        text-align: center;
        padding: 4px;
    }
    #footerPageSetWrap .mr60{
        margin-right: 60px;
    }
</style>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String agencyCode=request.getParameter("agencyCode");
    if(agencyCode==null){
        agencyCode="";
    }
%>
<form id="footerPageSetForm">

<div class="container-fluid" id="footerPageSetWrap">
    <div class="row" style="margin-bottom: 10px">
        <div class="col-xs-12">
            <ul class="list-unstyled clearfix menu" style="border-bottom: 1px solid #dedede;padding-left: 10px">
                <li class="pull-left pad15 liSet activeStyle" data-code="001">关于我们</li>
                <li class="pull-left pad15 liSet" data-code="002">客户服务</li>
                <li class="pull-left pad15 liSet" data-code="003">法律声明</li>
                <li class="pull-left pad15 liSet" data-code="004">隐私条款</li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 contentM" style="position: relative">
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 ">
                    <span class="must">*</span>
                    关键词
                </label>
                <input type="text" class="inputCommon inputW1" id="keyWord" name="keyWord">
                <input type="hidden" id="code" name="code" value="001">
            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 " style="height: 80px;line-height: 80px">
                    <span class="must">*</span>
                    栏目描述
                </label>
                <textarea type="text" id="columnDescription" name="columnDescription" class="inputCommon inputW1" style="height: 80px"></textarea>
            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 " style="margin-right: 5px">
                    <span class="must">*</span>
                    栏目内容
                </label>
                    <div class="pull-left">
                        <!-- 加载编辑器的容器 -->
                        <script id="footerPageSetCon1" name="footerPageSetCon1"  type="text/plain"></script>
                    </div>
            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 ">
                    <span class="must">*</span>
                    是否启用
                </label>
                <div class="pull-left qbRadio">
                    <input type="radio" name="ifUsed" value="2"/>
                    <span  class="mr60">默认</span>
                    <input type="radio" name="ifUsed" value="0"/>
                    <span  class="mr60">启用</span>
                    <input type="radio"  name="ifUsed" value="1"/>
                    <span>不启用</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <p style="font-size: 14px;color: red">默认：网站信息默认显示云管家的信息。&nbsp&nbsp&nbsp启用：自定义栏目内容。&nbsp&nbsp&nbsp不启用：页脚不显示该栏目。</p>
            </div>
            <div style="position: absolute;left: 514px; bottom: -66px;"><a href="javascript:void(0)" class="btn btn-success btnBlue borderRadius4 colorfff" id="aboutMe"><i class="fa fa-save iconMr"></i>保存</a></div>
        </div>
        <div class="col-xs-12 contentM hide"  style="position: relative">
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 ">
                    <span class="must">*</span>
                    关键词
                </label>
                <input type="text" class="inputCommon inputW1" id="keyWord1" name="keyWord1">
                <input type="hidden" name="code1" id="code1" value="002">
            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 " style="height: 80px;line-height: 80px">
                    <span class="must">*</span>
                    栏目描述
                </label>
                <textarea type="text" class="inputCommon inputW1" style="height: 80px" id="columnDescription1" name="columnDescription1"></textarea>
            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 "  style="margin-right: 5px">
                    <span class="must">*</span>
                    栏目内容
                </label>
                <div class="pull-left">
                    <!-- 加载编辑器的容器 -->
                    <script id="footerPageSetCon2" name="footerPageSetCon2"  type="text/plain"></script>
                </div>


            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 ">
                    <span class="must">*</span>
                    是否启用
                </label>
                <div class="pull-left qbRadio">
                    <input type="radio" name="ifUsed1" value="2"/>
                    <span  class="mr60">默认</span>
                    <input type="radio" name="ifUsed1" value="0"/>
                    <span class="mr60">启用</span>
                    <input type="radio"  name="ifUsed1" value="1"/>
                    <span>不启用</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <p style="font-size: 14px;color: red">默认：网站信息默认显示云管家的信息。&nbsp&nbsp&nbsp启用：自定义栏目内容。&nbsp&nbsp&nbsp不启用：页脚不显示该栏目。</p>
            </div>
            <div style="position: absolute;left: 514px; bottom: -66px;"><a href="javascript:void(0)" class="btn btn-success btnBlue borderRadius4 colorfff" id="customerServiceByws"><i class="fa fa-save iconMr"></i>保存</a></div>
        </div>
        <div class="col-xs-12 contentM hide" style="position: relative;">
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 ">
                    <span class="must">*</span>
                    关键词
                </label>
                <input type="text" class="inputCommon inputW1" id="keyWord2" name="keyWord2">
                <input type="hidden" name="code2" id="code2" value="003">
            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 " style="height: 80px;line-height: 80px">
                    <span class="must">*</span>
                    栏目描述
                </label>
                <textarea type="text" class="inputCommon inputW1" style="height: 80px" id="columnDescription2" name="columnDescription2"></textarea>
            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 "  style="margin-right: 5px">
                    <span class="must">*</span>
                    栏目内容
                </label>
                <div class="pull-left">
                    <!-- 加载编辑器的容器 -->
                    <script id="footerPageSetCon3" name="footerPageSetCon3"  type="text/plain"></script>
                </div>


            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 ">
                    <span class="must">*</span>
                    是否启用
                </label>
                <div class="pull-left qbRadio">
                    <input type="radio" name="ifUsed2" value="2"/>
                    <span  class="mr60">默认</span>
                    <input type="radio" name="ifUsed2" value="0"/>
                     <span class="mr60">启用</span>
                    <input type="radio"  name="ifUsed2" value="1"/>
                    <span>不启用</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <p style="font-size: 14px;color: red">默认：网站信息默认显示云管家的信息。&nbsp&nbsp&nbsp启用：自定义栏目内容。&nbsp&nbsp&nbsp不启用：页脚不显示该栏目。</p>
            </div>
            <div  style="position: absolute;left: 514px; bottom: -66px;"><a href="javascript:void(0)" class="btn btn-success btnBlue borderRadius4 colorfff" id="flsmByws"><i class="fa fa-save iconMr"></i>保存</a></div>
        </div>

        <div class="col-xs-12 contentM hide" style="position: relative;">

            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 ">
                    <span class="must">*</span>
                    关键词
                </label>
                <input type="text" class="inputCommon inputW1" id="keyWord3" name="keyWord3">
                <input type="hidden" name="code3" id="code3" value="004">
            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 " style="height: 80px;line-height: 80px">
                    <span class="must">*</span>
                    栏目描述
                </label>
                <textarea type="text" class="inputCommon inputW1" style="height: 80px" id="columnDescription3" name="columnDescription3"></textarea>
            </div>
            <div class="form-group clearfix">
                <label class="labelCommon labelWidth-col-one color666 "  style="margin-right: 5px">
                    <span class="must">*</span>
                    栏目内容
                </label>
                <div class="pull-left">
                    <!-- 加载编辑器的容器 -->
                    <script id="footerPageSetCon4" name="footerPageSetCon4"  type="text/plain"></script>
                </div>

            </div>
            <div class="form-group clearfix">
            <label class="labelCommon labelWidth-col-one color666 ">
                <span class="must">*</span>
                是否启用
            </label>
                <div class="pull-left qbRadio">
                    <input type="radio" name="ifUsed3" value="2"/>
                    <span  class="mr60">默认</span>
                    <input type="radio" name="ifUsed3" value="0"/> <span class="mr60"> 启用</span>
                    <input type="radio"  name="ifUsed3" value="1"/> <span>不启用</span>
                </div>
        </div>
            <div class="form-group clearfix">
                <p style="font-size: 14px;color: red">默认：网站信息默认显示云管家的信息。&nbsp&nbsp&nbsp启用：自定义栏目内容。&nbsp&nbsp&nbsp不启用：页脚不显示该栏目。</p>
            </div>
            <div  style="position: absolute;left: 514px; bottom: -66px;"><a  href="javascript:void(0)" class="btn btn-success btnBlue borderRadius4 colorfff" id="ystkByws"><i class="fa fa-save iconMr"></i>保存</a></div>
        </div>
    </div>
</div>
</form>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/domainName/footerPageSet.js" type="text/javascript"></script>
<%--<script src="<%=request.getContextPath()%>/assets/pages/scripts/systemannouncement/systemannouncementedit.js" type="text/javascript"></script>--%>
<!-- 配置文件 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/ueditor/ueditor.config.js"></script>
<!-- 编辑器源码文件 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/ueditor/ueditor.all.js"></script>
<!-- 实例化编辑器 -->
<script type="text/javascript">
    var ue = UE.getEditor('footerPageSetCon1',{
        toolbars: [[ 'source','undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough','removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',  'lineheight', '|', 'paragraph', 'fontfamily', 'fontsize', 'simpleupload', 'insertimage', 'emotion']], textarea: "announcementContent", initialFrameHeight: 245, initialFrameWidth: 520
    });
   var ue1= UE.getEditor('footerPageSetCon2',{
        toolbars: [[ 'source','undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough','removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',  'lineheight', '|', 'paragraph', 'fontfamily', 'fontsize', 'simpleupload', 'insertimage', 'emotion']], textarea: "announcementContent", initialFrameHeight: 245, initialFrameWidth: 520
    });
    var ue2 = UE.getEditor('footerPageSetCon3',{
        toolbars: [[ 'source','undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough','removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',  'lineheight', '|', 'paragraph', 'fontfamily', 'fontsize', 'simpleupload', 'insertimage', 'emotion']], textarea: "announcementContent", initialFrameHeight: 245, initialFrameWidth: 520
    });
    var ue3 = UE.getEditor('footerPageSetCon4',{
        toolbars: [[ 'source','undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough','removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',  'lineheight', '|', 'paragraph', 'fontfamily', 'fontsize', 'simpleupload', 'insertimage', 'emotion']], textarea: "announcementContent", initialFrameHeight: 245, initialFrameWidth: 520
    });
   /* ue.addListener("ready", function () {
        // editor准备好之后才可以使用
        ue.setContent('44444444444444444');
    });
    ue1.addListener("ready", function () {
        // editor准备好之后才可以使用
        ue1.setContent('44444444444444444');
    });
    ue2.addListener("ready", function () {
        // editor准备好之后才可以使用
        ue2.setContent('44444444444444444');
    });
    ue3.addListener("ready", function () {
        // editor准备好之后才可以使用
        ue3.setContent('44444444444444444');
    });*/


</script>
<script type="text/javascript">
    $(function () {
        footerPageSet.setPath("<%=request.getContextPath()%>");
        footerPageSet.init("<%=id%>","<%=agencyCode%>",ue,ue1,ue2,ue3);
    });
</script>