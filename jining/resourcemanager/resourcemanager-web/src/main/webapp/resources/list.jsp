<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    #resource-manager-content .required{
    color: #f00;
    }
</style>
<div id="resource-manager-content">
    <div class="ui-layout-center">
        <div class="ui-layout-content">
            <div class="portlet">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase">资源信息</span>
                    </div>
                    <div class="actions"></div>
                </div>
                <div class="portlet-body form">
                    <form action="#" class="form-horizontal" id="resourceForm">
                        <div class="form-body">
                             <div class="row">
						            <div class="col-md-12">
						                <div class="input-group col-md-12">
						                    <div class="col-md-12">
						                       <div class="input-group-addon  required labelCommon labelWidth-col-one color333">
                                                   <span class="required"> * </span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称
                                               </div>
						                        <input type="text" class="inputCommon inputWidth-col-one color666" name="resourceName">
						                    </div>
						                </div>
						            </div>
						        </div>
                            <div class="row" id="uuid_uuid">
                                <div class="col-md-12">
                                    <div class="input-group col-md-12">
                                        <div class="col-md-12">
                                            <div class="input-group-addon  required labelCommon labelWidth-col-one color333">
                                                UUID
                                            </div>
                                            <input type="text" readonly="readonly" class="inputCommon inputWidth-col-one color666" name="uuid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div class="row">
						            <div class="col-md-12">
						                <div class="input-group col-md-12">
						                    <div class="col-md-12">
						                       <div class="input-group-addon col-md-4 required labelCommon labelWidth-col-one color333 ">
                                                   <span class="required"> * </span>是否启用
                                               </div>
								                    <div class="radio-list isOrNoUse-m"
		                                         data-error-container="#form_enable_error">
		                                        <label class="radio-inline">
		                                            <input type="radio" name="resourceEnabled"
		                                                   value="true">
		                                            是
		                                        </label>
		                                        <label class="radio-inline">
		                                            <input type="radio" name="resourceEnabled"
		                                                   value="false"> 否
                                        </label>
                                    </div>
                                    <div id="form_enable_error"></div>
						                    </div>
						                </div>
						            </div>
						        </div>
                             <div class="row">
						            <div class="col-md-12">
						                <div class="input-group col-md-12">
						                    <div class="col-md-12">
						                       <div class="input-group-addon col-md-4 required  labelCommon labelWidth-col-one color333">
                                                   <span class="required"> * </span>资源类型
                                               </div>
						                        <div class="col-md-7">
			                                    <select name="resourceType" class="form-control"
			                                            id="resourceType"
			                                            data-error-container="#form_resource_error">
			                                        <option></option>
			                                        <option value="menu">功能菜单</option>
			                                        <option value="item">操作项</option>
			                                    </select>
                                    <div id="form_resource_error"></div>
                                </div>
						                    </div>
						                </div>
						            </div>
						        </div>
                              <div class="row" id="menu-url">
						            <div class="col-md-12">
						                <div class="input-group col-md-12">
						                    <div class="col-md-12">
						                       <div class="input-group-addon col-md-4 required  labelCommon labelWidth-col-one color333">
                                                   <span class="required"> * </span>资源地址
                                               </div>
						                         <input type="text" name="resourceUrl" class="inputCommon inputWidth-col-one color666">
						                    </div>
						                </div>
						            </div>
						        </div>
                             <div class="row">
						            <div class="col-md-12">
						                <div class="input-group col-md-12">
						                    <div class="col-md-12">
						                       <div class="input-group-addon col-md-4 required labelCommon labelWidth-col-one color333">
                                                   <span class="required "> * </span>权限标志
                                               </div>
						                          <input type="text" name="resourceIdentifier" class="inputCommon inputWidth-col-one color666">
						                    </div>
						                </div>
						            </div>
						        </div>
                              <div class="row" id="menu-img">
						            <div class="col-md-12">
						                <div class="input-group col-md-12">
						                    <div class="col-md-12">
						                       <div class="input-group-addon col-md-4 required  labelCommon labelWidth-col-one color333">
                                                   <span class="required"> * </span>资源图标
                                               </div>
						                          <input type="text" class="inputCommon inputWidth-col-one color666" name="resourceIcon">
						                    </div>
						                </div>
						            </div>
						        </div>
                            <div class="row">
						            <div class="col-md-12">
						                <div class="input-group col-md-12">
						                    <div class="col-md-12">
						                       <div class="input-group-addon col-md-4 required  labelCommon labelWidth-col-one color333 mr" id="list-description-m">描述
                                               </div>
						                          <textarea rows="4"
                                          name="resourceRemark" class="textArea"></textarea>
						                    </div>
						                </div>
						            </div>
						        </div>
                            <div class="form-group">
                                <label class="control-label control-label-medium"></label>
                                <div class="col-md-7 save">
                                    <button type="button" class="btn btn-default btnBlue borderRadius4 colorfff"
                                            id="btnSaveResource">
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
    <div class="ui-layout-west">
        <div class="ui-layout-content">
            <div class="portlet">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase">资源信息列表</span>
                    </div>
                    <div class="actions">
                        <div class="btn-group">
                            <a class="btn btn-circle btn-default " href="javascript:;"
                               data-toggle="dropdown" title="点击此处添加菜单">
                                <i class="fa fa-wrench"></i>
                            </a>
                            <ul class="dropdown-menu pull-right">
                                <li>
                                    <a href="javascript:;" id="btnNewResource">
                                        <i class="fa fa-plus"></i> 新增菜单 </a>
                                </li>
                                <li>
                                    <a href="javascript:;" id="btnNewNextResource">
                                        <i class="fa fa-plus"></i> 新增下级菜单 </a>
                                </li>
                                <li>
                                    <a href="javascript:;" id="btnDelResource">
                                        <i class="fa fa-trash-o"></i> 删除菜单 </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="portlet-scroller">
                        <div class="row">
                            <div class="col-md-12">
                                <div id="res_manage_tree"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/menu-manager/list.css">
<script src="<%=request.getContextPath()%>/assets/pages/scripts/resources/resource.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        resources.init();
    });
</script>