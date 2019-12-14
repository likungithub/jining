<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<style>
 #customerOrg-manager-content   label {
      display: inline-block;
      max-width: none!important;
      margin-bottom: 0!important;
      font-weight: 400!important;
      cursor: pointer;
 }

 #customerOrg-manager-content .portlet > .portlet-title > .caption {
     font-size: 18px;
     line-height: 18px;
     padding: 10px 0;
     float: none;
 }
 #customerOrg-manager-content .wrap{
     padding-bottom: 15px;
 }
 #customerOrg-manager-content .wrap>button{
     width: 75px;
     color: #333;
     border-radius: 4px!important;
 }
    #customerOrg-manager-content .ui-layout-content{
        overflow: hidden!important;
    }
</style>

<div id="customerOrg-manager-content">
    <div class="ui-layout-center">
        <div class="ui-layout-content">
            <div class="portlet">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase">部门信息</span>
                    </div>
                    <div class="actions"></div>
                </div>
                <div class="portlet-body form">
                    <div class="portlet-scroller">
                        <form action="#" class="form-horizontal" id="customerOrgForm">
                            <div class="form-body" id="customerOrgFormDiv">
                                <div class="row form-group">
                                    <div class="col-md-12">
                                        <div class="input-group">
                                            <label class="labelCommon labelWidth-col-one labelBg color333">
                                                    <span class="required"> * </span>部门名称
                                            </label>
                                            <input type="text" class="inputCommon inputWidth-col-one" name="orgName" maxlength="50">
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-12">
                                        <div class="input-group">
                                            <label class="labelCommon labelWidth-col-one labelBg color333">
                                                                                                    备注
                                            </label>
                                            <input type="text" class="inputCommon inputWidth-col-one" name="orgRemark" maxlength="200">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label control-label-medium"></label>
                                    <div class="save saveOrg">
                                        <button type="button" class="btn btn btn-default btnBlue borderRadius4 colorfff" id="btnSaveOrg">
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
                        <span class="caption-subject bold uppercase">部门信息列表</span>
                    </div>
                    <div class="wrap" style="width: 260px;">
                        <button class="btn btn-xs btn-default" id="addNewOrg" >
                            <i class="fa fa-plus "></i>
                                                        新增同级
                        </button>
                        <button class="btn btn-xs btn-default" id="addNewSonOrg" >
                            <i class="fa fa-plus "></i>
                                                        新增下级
                        </button>
<!--                         <button class="btn btn-xs btn-default" id="editOrg" style="margin-left: 5px;">
                            <i class="fa fa-pencil" ></i>
                                                        编辑
                        </button> -->
                        <button class="btn btn-xs btn-default" id="delOrg"> <!-- style="margin-left: 5px;" -->
                            <i class="fa fa-trash" ></i>
                                                        删除
                        </button>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="portlet-scroller">
                        <div class="table-toolbar">
                            <div class="row">
                                <div class="col-md-12">
                                    <div id="customerOrg_manage_tree"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/org/customerList.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		customerOrgs.init();
	});
</script>