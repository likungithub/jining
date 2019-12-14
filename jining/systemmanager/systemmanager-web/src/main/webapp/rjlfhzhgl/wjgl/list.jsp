<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
	.rotate1 {
		transform: rotate(180deg);
	}
</style>
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
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

										<label class="labelCommon labelBg color666 dateLabel-m">目录名称</label>
										<input type="text" class="inputCommon appsysinfo-m" name="wtdwmc" placeholder="请输入目录名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>

								</div>


								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button  class="btn  btnAdd btnBorderColor colorfff borderRadius4 mr pull-left"></i>目录管理</button>

								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="<%=uuid%>ManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left">文件名称</th>
							<th class="text-left">所属目录</th>
							<th class="text-left">文件版本</th>
							<th class="text-left">受控编号</th>
							<th class="text-left">上传时间</th>
							<th class="text-left">上传人</th>
							<th class="text-left">审核人</th>
							<th class="text-left">审核时间</th>
							<th class="text-left">修订人</th>
							<th class="text-left">修订时间</th>
							<th class="text-left">借阅人</th>
							<th class="text-left">借阅时间</th>
							<th class="text-left">回收人</th>
							<th class="text-left">回收时间</th>
							<th class="text-left">文档说明</th>
							<th width="150px" class="text-center">操作</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td class="text-left">文件名称</td>
							<td class="text-left">所属目录</td>
							<td class="text-left">文件版本</td>
							<td class="text-left">受控编号</td>
							<td class="text-left">上传时间</td>
							<td class="text-left">上传人</td>
							<td class="text-left">审核人</td>
							<td class="text-left">审核时间</td>
							<td class="text-left">修订人</td>
							<td class="text-left">修订时间</td>
							<td class="text-left">借阅人</td>
							<td class="text-left">借阅时间</td>
							<td class="text-left">回收人</td>
							<td class="text-left">回收时间</td>
							<td class="text-left">文档说明</td>
							<td width="150px" class="text-center">
								<a href="#">预览</a>
								<a href="#">下载</a>
								<a href="#">删除</a>
								<a href="#">审核</a>
								<a href="#">修订</a>
								<a href="#">借阅</a>
								<a href="#">回收</a>
							</td>
						</tr>
						<tr>
							<td class="text-left">文件名称</td>
							<td class="text-left">所属目录</td>
							<td class="text-left">文件版本</td>
							<td class="text-left">受控编号</td>
							<td class="text-left">上传时间</td>
							<td class="text-left">上传人</td>
							<td class="text-left">审核人</td>
							<td class="text-left">审核时间</td>
							<td class="text-left">修订人</td>
							<td class="text-left">修订时间</td>
							<td class="text-left">借阅人</td>
							<td class="text-left">借阅时间</td>
							<td class="text-left">回收人</td>
							<td class="text-left">回收时间</td>
							<td class="text-left">文档说明</td>
							<td width="150px" class="text-center">
								<a href="#">预览</a>
								<a href="#">下载</a>
								<a href="#">删除</a>
								<a href="#">审核</a>
								<a href="#">修订</a>
								<a href="#">借阅</a>
								<a href="#">回收</a>
							</td>
						</tr>
						<tr>
							<td class="text-left">文件名称</td>
							<td class="text-left">所属目录</td>
							<td class="text-left">文件版本</td>
							<td class="text-left">受控编号</td>
							<td class="text-left">上传时间</td>
							<td class="text-left">上传人</td>
							<td class="text-left">审核人</td>
							<td class="text-left">审核时间</td>
							<td class="text-left">修订人</td>
							<td class="text-left">修订时间</td>
							<td class="text-left">借阅人</td>
							<td class="text-left">借阅时间</td>
							<td class="text-left">回收人</td>
							<td class="text-left">回收时间</td>
							<td class="text-left">文档说明</td>
							<td width="150px" class="text-center">
								<a href="#">预览</a>
								<a href="#">下载</a>
								<a href="#">删除</a>
								<a href="#">审核</a>
								<a href="#">修订</a>
								<a href="#">借阅</a>
								<a href="#">回收</a>
							</td>
						</tr>
						<tr>
							<td class="text-left">文件名称</td>
							<td class="text-left">所属目录</td>
							<td class="text-left">文件版本</td>
							<td class="text-left">受控编号</td>
							<td class="text-left">上传时间</td>
							<td class="text-left">上传人</td>
							<td class="text-left">审核人</td>
							<td class="text-left">审核时间</td>
							<td class="text-left">修订人</td>
							<td class="text-left">修订时间</td>
							<td class="text-left">借阅人</td>
							<td class="text-left">借阅时间</td>
							<td class="text-left">回收人</td>
							<td class="text-left">回收时间</td>
							<td class="text-left">文档说明</td>
							<td width="150px" class="text-center">
								<a href="#">预览</a>
								<a href="#">下载</a>
								<a href="#">删除</a>
								<a href="#">审核</a>
								<a href="#">修订</a>
								<a href="#">借阅</a>
								<a href="#">回收</a>
							</td>
						</tr>
						<tr>
							<td class="text-left">文件名称</td>
							<td class="text-left">所属目录</td>
							<td class="text-left">文件版本</td>
							<td class="text-left">受控编号</td>
							<td class="text-left">上传时间</td>
							<td class="text-left">上传人</td>
							<td class="text-left">审核人</td>
							<td class="text-left">审核时间</td>
							<td class="text-left">修订人</td>
							<td class="text-left">修订时间</td>
							<td class="text-left">借阅人</td>
							<td class="text-left">借阅时间</td>
							<td class="text-left">回收人</td>
							<td class="text-left">回收时间</td>
							<td class="text-left">文档说明</td>
							<td width="150px" class="text-center">
								<a href="#">预览</a>
								<a href="#">下载</a>
								<a href="#">删除</a>
								<a href="#">审核</a>
								<a href="#">修订</a>
								<a href="#">借阅</a>
								<a href="#">回收</a>
							</td>
						</tr>
						<tr>
							<td class="text-left">文件名称</td>
							<td class="text-left">所属目录</td>
							<td class="text-left">文件版本</td>
							<td class="text-left">受控编号</td>
							<td class="text-left">上传时间</td>
							<td class="text-left">上传人</td>
							<td class="text-left">审核人</td>
							<td class="text-left">审核时间</td>
							<td class="text-left">修订人</td>
							<td class="text-left">修订时间</td>
							<td class="text-left">借阅人</td>
							<td class="text-left">借阅时间</td>
							<td class="text-left">回收人</td>
							<td class="text-left">回收时间</td>
							<td class="text-left">文档说明</td>
							<td width="150px" class="text-center">
								<a href="#">预览</a>
								<a href="#">下载</a>
								<a href="#">删除</a>
								<a href="#">审核</a>
								<a href="#">修订</a>
								<a href="#">借阅</a>
								<a href="#">回收</a>
							</td>
						</tr>
						<tr>
							<td class="text-left">文件名称</td>
							<td class="text-left">所属目录</td>
							<td class="text-left">文件版本</td>
							<td class="text-left">受控编号</td>
							<td class="text-left">上传时间</td>
							<td class="text-left">上传人</td>
							<td class="text-left">审核人</td>
							<td class="text-left">审核时间</td>
							<td class="text-left">修订人</td>
							<td class="text-left">修订时间</td>
							<td class="text-left">借阅人</td>
							<td class="text-left">借阅时间</td>
							<td class="text-left">回收人</td>
							<td class="text-left">回收时间</td>
							<td class="text-left">文档说明</td>
							<td width="150px" class="text-center">
								<a href="#">预览</a>
								<a href="#">下载</a>
								<a href="#">删除</a>
								<a href="#">审核</a>
								<a href="#">修订</a>
								<a href="#">借阅</a>
								<a href="#">回收</a>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>