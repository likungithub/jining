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
     width: 50px;
     color: #333;
     border-radius: 4px!important;
 }
</style>

<div id="addOrg-manager-content">
   <form action="#" class="form-horizontal" id="addOrgForm">
       <div class="form-body">
           <div class="row form-group">
               <div class="col-md-12">
                   <div class="input-group">
                       <label class="labelCommon labelWidth-col-one labelBg color333">
                               <span class="required"> * </span>部门名称
                       </label>
                       <input type="text" class="inputCommon inputWidth-col-one" name="orgName" maxlength="300">
                   </div>
               </div>
           </div>
           <div class="row form-group">
               <div class="col-md-12">
                   <div class="input-group">
                       <label class="labelCommon labelWidth-col-one labelBg color333">
                                                    备注
                       </label>
                       <input type="text" class="inputCommon inputWidth-col-one" name="orgRemark" maxlength="300">
                   </div>
               </div>
           </div>
       </div>
   </form>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/addNewOrg.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		addNewOrg.init();
	});
</script>