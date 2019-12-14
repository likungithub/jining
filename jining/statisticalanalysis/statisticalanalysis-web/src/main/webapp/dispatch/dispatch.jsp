<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
    #editBatchDispatch {
        background-color: #FF9800;
        border: none;
        border-radius: 3px;
        color: #fff;
        padding: 3px 12px;
        cursor: pointer;
        float: left;
        display: block;
        height:34px;
    }
    #editBatchDispatch .jstree-default .jstree-node {
        background-position: -292px -4px!important;
        background-repeat: repeat-y!important;
    }
	#page-container .pull-left #dispatchByPSLData_info{
		height:30px !important;
		line-height:20px !important;
	}
	#dispatchByPSL-manager-content .slimScrollDiv{
		height:auto !important;
	}
	#dispatchByPSL-manager-content .slimScrollDiv .portlet-scroller{
		height:auto !important;
	}
	#search_pg {
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid #ccc;
    }
    
	#dispatchByPSL-manager-content .useSearch {
	    /* width: 280px; */
	    height: 33px;
	    /* padding-left: 10px; */
	    /* padding-top: 10px; */
	    /*margin-bottom: 20px;*/
	    border-radius: 5px !important;
	    overflow: hidden;
	    border: 1px solid rgb(204, 204, 204);
	    float: left;
	}
	
	#dispatchByPSL-manager-content .useSearch input {
	    width: 227px;
	    height: 33px;
	    float: left;
	    border: 0;
	    padding-left: 10px;
	    outline: none;
        margin-right: 45px;
	}
</style>
<div id="dispatchByPSL-manager-content">
    <div class="ui-layout-center">
        <div class="ui-layout-content" style="padding: 15px">
            <div class="portlet">
                <div class="portlet-body form">
                    <div class="">
                        <div class="row">
                            <div class="col-md-12">
                                <div>
                                    <button type="button" id="editBatchDispatch" class="btn btn-default btnBlue borderRadius4 btn-sm"><i class="icon iconfont  icon-zhuanpaigong  iconFontColor-FFF iconFontSize"></i>批量转派工</button>
                                    <div id="editAndDeleteDispatchBtn"></div>
								</div>
                                <div style="float:right;">
                                    <div class="input-group  pull-left positionSpan" style="margin-left: 10px;">
	                                    <div class="useSearch" style="position: relative">
	                                        <input type="text" class="query" style="float: left;" placeholder="请输入客户名称" name="searchFilter">
                                            <i class="fa fa-search colorBlue-10a0f7 searchIcoBtn  Search-btn" style="position: absolute;
                                                                                                                            top: 0px;
                                                                                                                            right: 5px;
                                                                                                                            cursor: pointer;
                                                                                                                            font-size: 20px!important;
                                                                                                                            height: 33px;
                                                                                                                            line-height: 33px;
                                                                                                                            border-left: 1px solid #dedede;
                                                                                                                            width: 45px;
                                                                                                                            padding-left: 16px;"></i>
	                                        <div style="clear: both"></div>
	                                    </div>
	                                   <%-- <div class="input-group  pull-left" style="margin-left: 10px;">
                                            <button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr Search-btn" data-loading-text="Loading...">
                                                <i class="fa fa-search " style="margin-right: 5px;"></i>查&nbsp;询&nbsp;
                                            </button>
                                        </div>--%>
	                                </div>
                                </div>
		                    </div>
	                    </div>
	                </div>
                    <div class="portlet-scroller">
                        <div class="dataTables_wrapper no-footer">
		                    <table class="table table-striped table-bordered table-hover" id="dispatchByPSLData" style="margin-top: 15px!important">
		                        <thead>
			                        <tr>
			                        	<th width="20px">
	                                        <label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">
	                                            <input type="checkbox" class="group-checkable" id="allCheck"/>
	                                            <span></span>
	                                        </label>
	                                    </th>
			                            <!-- <th width="100px" class="text-left">客户编码</th> -->
			                            <th class="text-left">客户名称</th>
			                            <th width="130px" class="text-left">职员名称</th>
			                            <th width="100px" class="text-left">角色</th>
			                            <th width="130px"  class="text-left">部门</th>
			                            <th width="100px">操作</th>
			                        </tr>
		                        </thead>
		                    </table>
		                </div>
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
                        <span class="caption-subject bold uppercase">分组</span>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="portlet-scroller">
                        <div class="table-toolbar">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-icon">
                                        <i class="fa fa-search colorBlue-10a0f7"
                                           style="color: #ccc !important;"></i>
                                        <input type="search" class="form-control borderRadius4 btnBorderColor"
                                               id="search_pg" placeholder="搜索">
                                    </div>
                                    <div id="dispatchByPSL_tree"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/dispatch.css">
<script src="<%=request.getContextPath()%>/assets/pages/scripts/dispatch/dispatch.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        dispatchData.setPath('<%=request.getContextPath()%>');
        dispatchData.init();
    });
</script>
