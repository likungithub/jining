<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div id="role-manager-content">
    <div class="ui-layout-center">
        <div class="ui-layout-content">
            <div class="portlet">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase">角色及权限信息</span>
                    </div>
                    <div class="actions"></div>
                </div>
                <div class="portlet-body form">
                    <div class="portlet-scroller">
	                    <div class="table-toolbar">
		                    <div class="row">
		                        <div class="col-md-12">
		                            <button id="btnSetRoleAuth" class="btn  fffBg btnBorderColor colorBlue-10a0f7 borderRadius4 pull-left mr">
		                                <i class="icon iconfont icon-quanxianshezhi"></i> 设置功能权限
		                            </button>
		                            <!-- <button id="btnSetUser" class="btn  fffBg btnBorderColor colorBlue-10a0f7 borderRadius4 pull-left mr">
		                                <i class="icon iconfont icon-jiaoseshezhi"></i> 设置用户
		                            </button> -->
		                        </div>
		                    </div>
		                </div>
                        <form action="#" class="form-horizontal" id="roleForm">
                            <div class="form-body">
						        <div class="row">
						            <div class="col-md-12">
						                <div class="form-group">
						                    <label class=" labelCommon labelWidth-col-one color333 labelBg">
						                        <span class="required"> * </span>
                                                角色名称
                                            </label>
						                        <input type="text" class="form-control inputCommon inputWidth-col-one" name="roleName">
						                </div>
						            </div>
						        </div>
						        <div class="row">
						            <div class="col-md-12">
						                <div class="form-group">
						                    <label class="beizhulabel control-label labelCommon labelWidth-col-one color333 labelBg">备注</label>
						                        <textarea rows="5" class="form-control inputCommon inputWidth-col-one" name="roleRemark"></textarea>
						                </div>
						            </div>
						        </div>
						        <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label control-label-medium"></label>
		                                    <div class="save">
		                                        <button type="button" class="btn btn btn-default btnBlue borderRadius4 colorfff "
		                                                id="btnSaveRole">
		                                            <i class="fa fa-save"></i> 保&nbsp;存
		                                        </button>
		                                    </div>
                                        </div>
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
                        <span class="caption-subject bold uppercase">角色列表</span>
                    </div>
                    <!-- <div class="actions">
                        <div class="btn-group">
                            <a class="btn btn-circle btn-default " href="javascript:;"
                               data-toggle="dropdown">
                                <i class="fa fa-wrench"></i>
                            </a>
                            <ul class="dropdown-menu pull-right">
                                <li>
                                    <a href="javascript:;" id="btnNewRole">
                                        <i class="fa fa-plus"></i> 新增角色 </a>
                                </li>
                                <li>
                                    <a href="javascript:;" id="btnDelRole">
                                        <i class="fa fa-trash-o"></i> 删除角色 </a>
                                </li>
                            </ul>
                        </div>
                    </div> -->
                </div>
                <div class="portlet-body">
                    <div class="portlet-scroller">
                        <div class="table-toolbar">
                            <div class="row">
                                <div class="col-md-12">
                                    <div id="role_manage_tree"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/roles/list.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/roles/roles.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		roles.init();
	});
</script>