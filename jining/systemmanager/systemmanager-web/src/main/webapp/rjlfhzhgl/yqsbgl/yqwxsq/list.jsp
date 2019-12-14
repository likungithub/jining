<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
 .rotate1 {
		transform: rotate(180deg);
	}
  .modal-content{
	  width:730px;
  }
 #user-form-datas	.labelWidth-col-two{
	 width: 110px!important;
 }
</style>
<%
	java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
	java.util.Date currentTime = new java.util.Date();//得到当前系统时间
	String txtDate = format.format(currentTime); //将日期时间格局化
%>
<%
String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
                                    <form id="query_form">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">仪器名称</label>
                                        <select id="selectname" style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;" name="name" >
                                            <option value="">请选择仪器名称</option>

                                        </select>
									</div>
									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">申请日期</label>
											<input type="text" readonly="" class="appsysinfo-m inputCommon " id="gzrstarDate" style="border-radius: 0 !important; width: 100px" name="stardate">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text" readonly="" class="inputCommon appsysinfo-m" id="gzrendDate" style="border-radius: 4px 0 0 4px!important;width: 100px" name="enddate">
											<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
										</div>
										<div style="clear: both"></div>
									</div>
                                    </form>
								</div>


								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4" id="query"><i class="fa fa-search iconMr"></i>查询</button>
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4" id="resert"><i class="fa fa-refresh iconMr"></i>重置</button>
								<%--	<button  class="btn  btnAdd btnBorderColor colorfff borderRadius4 mr pull-left"></i>提交</button>--%>
									<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4" id="btnNewUser"><i class="fa fa-plus iconMr"></i>新增</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="<%=uuid%>ManagerList_m" width="100%">
						<thead>
						<tr class="color333" id="first">
							<th class="text-left">仪器名称</th>
							<th class="text-left">生产厂家</th>
							<th class="text-left">生产日期</th>
							<th class="text-left">申请维修日期</th>
							<th class="text-left">申请人</th>
							<th class="text-left">申请部门</th>
							<th class="text-left">问题描述</th>
							<%--<th width="150px" class="text-center">操作</th>--%>
						</tr>
						</thead>
						<tbody id="sss">
							<c:forEach var="yq" items="${list}">
								<tr class="sb">
									<td>${yq.name}</td>
									<td>${yq.cj}</td>
									<td>${yq.scrq}</td>
									<td>${yq.sqrq}</td>
									<td>${yq.sqr}</td>
									<td>${yq.sqbm}</td>
									<td>${yq.wtms}</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script>
    //执行一个laydate实例
    laydate.render({
        elem: '#scrq' //指定元素
    });
    laydate.render({
        elem: '#sqrq' //指定元素
    });
    laydate.render({
        elem: '#gzrstarDate' //指定元素
    });
    laydate.render({
        elem: '#gzrendDate' //指定元素
    });
</script>
<script>
    $(document).ready(function () {
        $("#tijiao").click(function () {
            alert($("#addUser-form-datas").serialize());
            $.post("<%=request.getContextPath() %>/yqwxsq/insert",$("#addUser-form-datas").serialize(),function (data) {
                $("#myModal1").modal('hide')
                //删除数据，重新加载
                $(".sb").remove();
                for(var i=0;i<data.length;i++){
                    alert(i);
                    $("#sss").append(
                        "<tr class='sb'>" +
                        "<td>"+data[i].name+"</td>" +
                        "<td>"+data[i].scrq+"</td>" +
                        "<td>"+data[i].cj+"</td>" +
                        "<td>"+data[i].sqbm+"</td>" +
                        "<td>"+data[i].sqr+"</td>" +
                        "<td>"+data[i].sqrq+"</td>" +
                        "<td>"+data[i].wtms+"</td>" +
                        "</tr>");

                }
            },"json");
        });
        $("#query").click(function () {
            alert($("#query_form").serialize())
            $.post("<%=request.getContextPath()%>/yqwxsq/findsome",$("#query_form").serialize(),function (data) {
                $(".sb").remove();
                for(var i=0;i<data.length;i++){
                    $("#sss").append(
                        "<tr class='sb'>" +
                        "<td>"+data[i].name+"</td>" +
                        "<td>"+data[i].cj+"</td>" +
                        "<td>"+data[i].scrq+"</td>" +
                        "<td>"+data[i].sqrq+"</td>" +
                        "<td>"+data[i].sqr+"</td>" +
                        "<td>"+data[i].sqbm+"</td>" +
                        "<td>"+data[i].wtms+"</td>" +
                        "</tr>");

                }
            });


        });
        $.post("<%=request.getContextPath()%>/yqwxsq/findyqsbtz",function (data) {
            for (var i=0;i<data.length;i++) {
                console.log(data)
                $("#name").append("<option value="+data[i]+">"+data[i]+"</option>")
				$("#selectname").append("<option value="+data[i]+">"+data[i]+"</option>");

            }
        });

        $("#resert").click(function(){
            $("input").val("")
		});

    });

</script>
<!-- 模态框（Modal） -->
<form:form action="#" class="form form-horizontal" id="addUser-form-datas">
<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel12">样品维修申请</h4>
            </div>
            <div class="modal-body">
				<div class="form-body">
					<div class="row">
						<div class="col-md-6 col-xs-6">
							<div class="form-group">
								<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>仪器名称</label>
								<select class="form-control" name="name" style="width: 193px" id="name">
									<option value="null">请选择</option>
								</select>
							</div>
						</div>
						<div class="col-md-6  col-xs-6">
							<div class="form-group">
								<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>生产厂家&nbsp;&nbsp;</label>
								<input type="text" class="inputCommon inputWidth-col-two" placeholder="请输入6-20位字母和数字" name="cj">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6 col-xs-6">
							<div class="form-group">
								<label class="labelCommon labelWidth-col-two labelBg color666 pull-left">
									申请维修日期
								</label>
								<div class="input-group date dateOfBusiness">
									<input type="text" readonly value="<%=txtDate%>" class="form-control inputCommon" style="border-radius:0 !important;width: 162px;" name="sqrq" id="addDateOfBusiness">
									<span class="input-group-btn" style="float: left;">
                            <button class="btn btn-default" type="button" style="border-radius: 0 4px 4px 0!important;height: 33px;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-xs-6">
							<div class="form-group">
								<div class="date addBirthDay pull-left mr">
									<label class="labelCommon labelWidth-col-two color666">生产日期</label>
									<input type="text" readonly class="appsysinfo-m inputCommon " name="scrq" style="width: 160px!important;border-radius: 0 !important;">
									<span>
	                          <button class="btn btn-default appsysinfobtn-m" type="button" style="border-radius: 0 4px 4px 0!important;height: 33px;border-left: none">
	                              <i class="fa fa-calendar"></i>
	                          </button>
	                      </span>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6 col-xs-6">
							<div class="form-group">
								<label class="labelCommon labelWidth-col-two color666">申请人&nbsp;&nbsp;</label>
								<input type="text" class="inputCommon inputWidth-col-two" name="sqr" placeholder="使用登陆人ID">
							</div>
						</div>
						<div class="col-md-6 col-xs-6">
							<div class="form-group">
								<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>仪器所属部门</label>
								<input type="text" class="inputCommon inputWidth-col-two" name="sqbm">
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<label class="labelCommon labelWidth-col-two color666" style="height: 80px;line-height: 80px;">备注&nbsp;&nbsp;</label>
								<%--<input type="text" class="inputCommon inputWidth-col-two" name="addRemark" maxlength="500" style="width: 568px!important;"/> --%>
								<textarea name="bzxx" id="addRemark" maxlength="300" class="inputCommon mr" style="border: 1px solid #e5e5e5!important;height: 80px;width: 578px;border-radius: 0 4px 4px 0!important;"></textarea>
								<p class="wordNum" style="margin: 0;width: 90px;position: absolute;right:15px;bottom: -5px;text-align: right;">剩余<span class="num" id="addRemarkWords" style="color: red;">300</span>个字符</p>
							</div>
						</div>
					</div>
				</div>
            <div class="modal-footer">
				<button type="button" class="btn btn-default " data-dismiss="modal">关闭
				</button>
				<button type="button" class="btn btn-primary " id="tijiao"  >
					提交
				</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
	</div>
</form:form>
<script>
    $(document).ready(function () {
       $("#btnNewUser").on('click',function () {
           console.log($("#addUser-form-datas"))
		   console.log($("#tijiao"));
            $("#myModal1").modal({show:true});
       })
        $("#myModal").on("hidden", function() {
            $(this).removeData("modal");
        });
    });
</script>
