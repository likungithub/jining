<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
UUID uuid = UUID.randomUUID();
%>
<style>
	#chargeaudit_data td,#chargeaudit_data th{text-align: center !important;}
	#chargeaudit_data td:nth-child(5){text-align: right !important;}
	#chargeaudit_data td:nth-child(6){text-align: right !important;}
	#chargeaudit_data td:nth-child(7){text-align: right !important;}
	#page-container #chargeaudit_data_info{
		height:30px !important;
		line-height:20px !important;
	}
	.number{
	   color: red;
	   font-size: 14px !important;
	}
  /*  .tryoutstatistics_id_div .dataTables_wrapper{
        border-top:1px solid #ccc;
    }*/
    .tryoutstatistics_id_div .SYclickMore{
        height: 34px;
        width: 45px;
        padding: 0;
        border: none;
        /* border-radius: 0 4px 4px 0!important; */
        background: none;
        float: left;
        margin-left: 10px;
        color: #10a0f7;
        outline: none;
    }
    .tryoutstatistics_id_div .SYshowMore{
        display: none;
        margin-right: 15px;
    }
    tryoutstatistics_id_div .rotate1{
        transform: rotate(180deg);
    }
</style>
<div class="row tryoutstatistics_id_div" id="tryoutstatistics_id_div_<%=uuid %>">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin: 0 0 15px">
					<div class="row">
					   <div class="col-md-12" style="padding-left: 25px;padding-top: 5px;padding-bottom: 5px;background: #F3F3F3;
width: 98%;
margin-left: 13px;margin-bottom: 15px">
                           <img style="vertical-align: text-bottom;margin-right: 5px;" src="/statisticalanalysis/assets/pages/img/remind.png" alt="">
                           截止今日，平台代理记账公司试用到期的用户有<label class="tryoutnumber number"></label>户。
                       </div>
						<div class="col-md-12">
                            <div class="input-group  pull-left">
                                <button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr" name="remind-btn" data-loading-text="Loading...">
                                    <i class="icon iconfont icon-cuifei"></i>
                                    催&nbsp;费&nbsp;</button>
                            </div>
							<div class="row search-body ml" style="
    width: 325px;
    float: right;">
                                <div class="input-group search-box search-label-small pull-left" style="position: relative">
                                    <input type="text" class="form-control input-sm  input-small" name="khbm" placeholder="客户名称" style=";padding-right: 47px;height:33px;border-radius: 4px !important;width: 220px!important;
    border-bottom-right-radius: 4px !important;"/>
                                    <i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" name="Search-btn" style=" margin-right: 5px;
                                                                                                                            position: absolute;
                                                                                                                            right: -4px;
                                                                                                                            top: 0;
                                                                                                                            cursor: pointer;
                                                                                                                            height: 33px;
                                                                                                                            line-height: 33px;
                                                                                                                            width: 45px;
                                                                                                                            text-align: center;
                                                                                                                            border-left: 1px solid #dedede;
                                                                                                                            font-size: 20px!important;
                                                                                                                            z-index: 10;"></i>
                                </div>
								<%--<div class="input-group  pull-left">
        							<button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr" name="Search-btn" data-loading-text="Loading...">
            							<i class="fa fa-search "></i>
            								查&nbsp;询&nbsp;</button>
    							</div>--%>
                                <button data="0" class="SYclickMore">更多</button>
                                <img style="    vertical-align: middle;margin-top: 12px;" class="rotate1" src="<%= request.getContextPath()%>/assets/pages/img/arrow.png" alt="arrow">

                            </div>

						</div>
                        <div class="col-md-12 SYshowMore" style="width:684px;
    border: 1px solid #ccc;
    padding: 20px 0;
    padding-left: 16px;
    border-radius: 4px!important;
    float: right;
    margin-top: 10px;">
                            <div class="date beginTime pull-left mr">
                                <label class="labelCommon labelBg color666 dateLabel-m">审核时间</label>
                                <input type="text" readonly class="appsysinfo-m inputCommon " name="shstarDate" style="border-radius: 0 !important; width: 80px">
                                <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                            </div>
                            <div class="input-group date endTime pull-left mr">
                                <label style="float: left; height: 33px;line-height: 33px;margin-right: 10px">-</label>
                                <input type="text" readonly class="inputCommon appsysinfo-m" name="shendDate" style="border-radius: 0 !important;width: 80px">
                                <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </button>
                                    </span>
                            </div>
                            <div class="date beginTime pull-left mr">
                                <label class="labelCommon labelBg color666 dateLabel-m">注册时间</label>
                                <input type="text" readonly class="appsysinfo-m inputCommon " name="zcstarDate" style="border-radius: 0 !important; width: 80px">
                                <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                            </div>
                            <div class="input-group date endTime pull-left mr">
                                <label style="float: left; height: 33px;line-height: 33px;margin-right: 10px">-</label>
                                <input type="text" readonly class="inputCommon appsysinfo-m" name="zcendDate" style="border-radius: 0 !important;width: 80px">
                                <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </button>
                                    </span>
                            </div>
                        </div>
					</div>
				</div>	
			    <div class="dataTables_wrapper no-footer">
				    <table class="table table-striped table-bordered table-hover"
						   id="tryoutstatistics_data">
						<thead>
						<tr>
						    <th width="5%"><input type="checkbox" class="selectAll" name="selectAll"/></th>
						    <th width="15%" style="text-align: left;">登录账号</th>
							<th width="25%" style="text-align: left;">客户名称</th>
							<th width="15%" style="text-align: center!important;">公司税号</th>
							<th width="10%" style="text-align: center!important;">有效期起</th>
							<th width="10%" style="text-align: center!important;">有效期止</th>
							<th width="10%" style="text-align: center!important;">客户</th>
							<th width="10%" style="text-align: center!important;">操作</th>
						</tr>
						</thead>
					</table>
			    </div>
		    </div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/agentstatistics/tryoutlist.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		tryoutlist.setPath("<%= request.getContextPath()%>");
		tryoutlist.init("<%=uuid %>");
	});
</script>