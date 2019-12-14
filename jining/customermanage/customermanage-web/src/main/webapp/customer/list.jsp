<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
.search-input-small {
    width: 62px !important;
}
#dlsh-manager-container .clickMore {
    height: 34px;
    width: 82px;
    padding: 0;
    border: none;
    /* border-radius: 0 4px 4px 0!important; */
    background: none;
    float: left;
    margin-left: 10px;
    color: #10a0f7;
    outline: none;
}
#dlsh-manager-container  .moreTop > span {
    display: none;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: #CACACA transparent transparent transparent;
    position: absolute;
    top: 54px;
    right: 150px;
    z-index: 1;
}
#dlsh-manager-container  .moreTop > span em {
    display: block;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: #f6f6f6 transparent transparent transparent;
    position: absolute;
    top: -12px;
    left: -10px;
}
#dlsh-manager-container .rotate1 {
    transform: rotate(180deg);
}
</style>
<div class="row" id="dlsh-manager-container" style="height: 100%;background: #fff">
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 15px">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="height: 33px;margin: 0 0 15px">
                    <button id="sh" class="btn btn-default btnAdd pull-left borderRadius4  colorfff mr">
                        <i class="fa fa-plus"></i> 审核
                    </button>
                    <div class="pull-left" >
                        <button type="button" class="btn btn-default btnBlue pull-left borderRadius4 mr colorfff"
                                id="DRbtn" data-loading-text="Loading...">
                            <i class="icon iconfont icon-daoru" style="    margin-right: 6px;"></i>导&nbsp;入&nbsp;
                        </button>
                    </div>
                    <div class="search-box search-input-small pull-left">
                        <button type="button" class="btn btn-default btnBlue pull-left borderRadius4 mr colorfff"
                                id="DCbtn" data-loading-text="Loading...">
                            <i class="icon iconfont icon-daochu" style="    margin-right: 6px;"></i>导&nbsp;出&nbsp;
                        </button>
                    </div>
                    <div class="moreTop" style="width: 450px;float: right">
                        <%--<span style=""><em></em></span>--%>
                        <div class="pull-left" style="margin-left: 15px;width: 140px">
                            <label class="labelCommon labelBg color666 dateLabel-m">初审进度</label>
                            <select style="width:70px;height:33px;font-size:12px !important;border: 1px solid #ccc;border-radius: 0 4px 4px 0!important"
                                    id="JDSelect">
                                <option value="2">全部</option>
                                <option value="0">未审核</option>
                                <option value="1">已审核</option>
                            </select>
                        </div>
                        <div class="pull-left">
                            <div class="input-icon" style="width: 190px;position: relative">
                                <input style="width: 220px;float: left;border-radius: 4px !important;padding-left:10px;padding-right: 47px;" type="search" class="form-control borderRadius4" id="customerSearch"
                                       placeholder="公司税号/客户名称">
                                <i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="JDSearch-btn" style="margin-right: 5px;
                                                                                                                            position: absolute;
                                                                                                                            right: -34px;
                                                                                                                            top: -11px;
                                                                                                                            cursor: pointer;
                                                                                                                            height: 33px;
                                                                                                                            line-height: 33px;
                                                                                                                            width: 45px;
                                                                                                                            text-align: center;
                                                                                                                            border-left: 1px solid #dedede;
                                                                                                                            font-size: 20px!important"></i>
                            </div>
                        </div>
                        <%--<div class="search-box search-input-small pull-left" style="margin-left: 15px;">
                            <button type="button" class="btn btn-default btnBlue pull-left borderRadius4 mr colorfff"
                                    id="JDSearch-btn" data-loading-text="Loading...">
                                <i class="fa fa-search " ></i>查&nbsp;询&nbsp;
                            </button>
                        </div>--%>
                        <div>
                            <button class="clickMore"  data="0">更多</button>
                            <img style="    vertical-align: middle;margin-top: 12px;" class="rotate1" src="<%= request.getContextPath()%>/assets/pages/img/arrow.png" alt="arrow">
                        </div>
                    </div>

                </div>
                <div class="col-md-12 showMore" style="margin-bottom:20px;display:none;width: 342px;float: right;padding: 20px 0;border: 1px solid #ccc;border-radius: 4px!important;">
                    <div class="date beginTime pull-left" style="margin-left: 15px;">
                        <label class="labelCommon labelBg color666 dateLabel-m">注册时间</label>
                        <input type="text" readonly class="appsysinfo-m inputCommon " name="starDate"
                               style="border-radius: 0 !important; width: 80px">
                        <span>
                           <button class="btn btn-default appsysinfobtn-m" type="button"
                                   style="height: 33px;border-radius: 0 4px 4px 0!important;">
                               <i class="fa fa-calendar"></i>
                           </button>
                       </span>
                    </div>
                    <span style="float: left;margin: 5px">-</span>
                    <div class="date endTime pull-left">
                        <input type="text" readonly class="inputCommon appsysinfo-m" name="endDate"
                               style="border-radius:4px 0 0  4px !important;width: 80px">
                        <span>
                           <button class="btn btn-default appsysinfobtn-m" type="button"
                                   style="height: 33px;border-radius: 0 4px 4px 0!important;">
                       <i class="fa fa-calendar"></i>
                       </button>
                       </span>
                    </div>
                </div>
                <table class="table table-striped table-bordered table-hover" width="100%" cellspacing="0" id="customer_data" >
                    <thead>
                    <tr>
                        <th style="width: 2%" ><input type="checkbox" name="selectCustomer"/></th>
                        <th style="width: 18%" class="text-left">客户名称</th>
                        <th style="width: 14%;" >公司税号</th>
                        <th style="width: 6%;" >注册时间</th>
                        <th style="width: 14%;" >手机号码</th>
                        <th style="width: 10%;" >初审状态</th>
                        <th style="width: 6%;"  >初审时间</th>
                        <th style="width: 10%;"  >终审状态</th>
                        <th style="width: 6%;"  >终审时间</th>
                        <th style="width: 14%;" >操作</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>

<script src="<%= request.getContextPath()%>/assets/pages/scripts/customer/list.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        customerList.setPath('<%= request.getContextPath()%>');
        customerList.init();
        $('#dlsh-manager-container th').each(function(i,v){
            if(i==0){
                $(v).css({width:'2%'});
            }
            if(i==1){
                $(v).css({width:'18%'});
            }
            if(i==2){
                $(v).css({width:'14%'});
            }
            if(i==3){
                $(v).css({width:'6%'});
            }
            if(i==4){
                $(v).css({width:'14%'});
            }
            if(i==5){
                $(v).css({width:'10%'});
            }
            if(i==6){
                $(v).css({width:'6%'});
            }
            if(i==7){
                $(v).css({width:'10%'});
            }
            if(i==8){
                $(v).css({width:'6%'});
            }
            if(i==9){
                $(v).css({width:'14%'});
            }
        })
    });
</script>