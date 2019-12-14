<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<div id="org-manager-content">
    <div class="ui-layout-center">
        <div class="ui-layout-content">
            <div class="portlet">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase">组织结构信息</span>
                    </div>
                    <div class="actions"></div>
                </div>
                <div class="portlet-body form">
                    <div class="portlet-scroller">
                        <form action="#" class="form-horizontal" id="orgForm">
                            <div class="form-body">
                               <!--  <div class="form-group">
                                    <label class="control-label control-label-medium">部门名称：<span
                                            class="required"> * </span></label>
                                    <div class="col-md-7">
                                        <input type="text" class="form-control" name="orgName">
                                    </div>
                                </div> -->
                                
                               <!--   <div class="row">
						            <div class="col-md-12">
						                <div class="input-group col-md-12">
						                    <div class="col-md-12">
						                       <div class="input-group-addon col-md-4 required"> <span class="required"> * </span>部门名称： </div>
						                        <input type="text" orgName>
						                    </div>
						                </div>
						            </div>
						        </div> -->
									        <div class="row form-group">
									            <div class="col-md-12">
									                <div class="input-group">
															<label class="labelCommon labelWidth-col-one labelBg color333">
															 <span class="required"> * </span>部门名称
															</label>
															<input type="text" class="inputCommon inputWidth-col-one" name="orgName">
									                </div>
									            </div>
        									</div>
<!--                                 <div class="form-group">
                                    <label class="control-label control-label-medium">是否独立应用组织：</label>
                                    <div class="col-md-7">
                                        <div class="radio-list">
                                            <label class="radio-inline">
                                                <input type="radio" name="independentOrg"
                                                       value="true">
                                                是
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="independentOrg"
                                                       value="false">
                                                否
                                            </label>
                                        </div>
                                    </div>
                                </div> 
                                <div class="form-group">
                                    <label class="control-label control-label-medium">部门类型：</label>
                                    <div class="col-md-7">
                                        <select name="orgType" class="form-control" id="orgType">
                                            <option value="01"></option>
                                        </select>
                                    </div>
                                </div> -->
                               <!--  <div class="form-group">
                                    <label class="control-label control-label-medium">备注：</label>
                                    <div class="col-md-7">
                                    <textarea rows="4" class="form-control"
                                              name="orgRemark"></textarea>
                                    </div>
                                </div> -->
                              <!--    <div class="row">
						            <div class="col-md-12">
						                <div class="input-group col-md-12">
						                    <div class="col-md-12">
						                       <div class="input-group-addon col-md-4 required"> <span class="required"> * </span>备注： </div>
						                         <textarea rows="4" class="textArea"
                                              name="orgRemark"></textarea>
						                    </div>
						                </div>
						            </div>
						        </div> -->
						        <div class="row form-group">
									            <div class="col-md-12">
									                <div class="input-group">
															<label class="labelCommon labelWidth-col-one labelBg color333" style="height: 86px;line-height: 86px;">
															备注
															</label>
															  <textarea rows="4" class="textArea" name="orgRemark"></textarea>
									                </div>
									            </div>
        									</div>
                                <div class="form-group">
                                    <label class="control-label control-label-medium"></label>
                                    <div class="save saveOrg">
                                        <button type="button" class="btn btn btn-default btnBlue borderRadius4 colorfff"
                                                id="btnSaveOrg">
                                            <i class="fa fa-save"></i> 保&nbsp;存
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ui-layout-west">
        <div class="ui-layout-content">
            <div class="portlet">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase">组织结构信息列表</span>
                    </div>
                    <div class="actions">
                        <div class="btn-group">
                            <a class="btn btn-circle btn-default " href="javascript:;"
                               data-toggle="dropdown">
                                <i class="fa fa-wrench"></i>
                            </a>
                            <ul class="dropdown-menu pull-right">
                                <li>
                                    <a href="javascript:;" id="btnNewOrg">
                                        <i class="fa fa-plus"></i> 新增组织结构 </a>
                                </li>
                                <li>
                                    <a href="javascript:;" id="btnNewNextOrg">
                                        <i class="fa fa-plus"></i> 新增下级组织结构 </a>
                                </li>
                                <li>
                                    <a href="javascript:;" id="btnDelOrg">
                                        <i class="fa fa-trash-o"></i> 删除组织结构 </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="portlet-scroller">
                        <div class="table-toolbar">
                            <div class="row">
                                <div class="col-md-12">
                                    <div id="org_manage_tree"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/list.css">
<script src="<%=request.getContextPath()%>/assets/pages/scripts/org/org.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        organization.setPath('<%=request.getContextPath()%>');
        organization.init();
    });
</script>