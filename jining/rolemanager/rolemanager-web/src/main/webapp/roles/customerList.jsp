<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>

 #ywjswrap   label {
         display: inline-block;
         max-width: none!important;
         margin-bottom: 0!important;
         font-weight: 400!important;
         cursor: pointer;
    }
    .allselect-m{
        margin: 0 15px;
    }
    .allselect-m>.row{
        padding: 10px 0;
        /*border-bottom: 1px solid #dadada;*/
    }
    .specificSet-m .Customer>.row{
        line-height: 38px;
        border-bottom:1px dashed #dadada;
    }
    .specificSet-m .Customer>.row>.col-xs-1{
        width: 120px!important;
    }
    .specificSet-m .Customer>.row>.col-xs-11{
        width: 250px!important;
    }
    .specificSet-m .Customer{
        margin: 0 15px;
    }
    .specificSet-m .Customer>.row:nth-child(1){
        background: #F8F8F8;
    }
    .specificSet-m .Customer>.row>.col-xs-1:nth-child(1) {
	    width: 120px!important;
	}
    #customerRole-manager-content .portlet > .portlet-title > .caption {
        font-size: 18px;
        line-height: 18px;
        padding: 10px 0;
        float: none;
    }
 #customerRole-manager-content .wrap{
     padding-bottom: 15px;
 }
 #customerRole-manager-content .wrap>button{
     width: 50px;
     color: #333;
     border-radius: 4px!important;
 }
 .specificSet-m  div.row:nth-child(n+2)>div:nth-child(1)>span{
        font-weight: 800!important;
    }
 #MenuWrap>div.row{
     margin: 0;
 }
 #MenuWrap>div.row:first-child
 {
     height: 33px;
     line-height: 33px;
     background: #f8f8f8;
     font-size: 14px;
     border-bottom: 1px solid #10a0f7;
 }
 #MenuWrap>div.row:nth-child(n+2){
     font-size: 14px;
 }
 #MenuWrap>div.row:nth-child(n+2){
     margin-top: 15px;
     border: 1px solid #dedede;
 }
 #MenuWrap>div.row:nth-child(n+2)  .TTWrap
 {
     border-left: 1px solid #dedede;
 }
 #MenuWrap>div.row:nth-child(n+2)  .TTWrap:after{
     content: '';
     display: block;
     border-left: 1px solid #dedede;
     height: 100%;
     position: absolute;
     top: 0;
     left: 25%;

 }
 #MenuWrap>div.row:nth-child(n+2)  .TTWrap  [data-sid]{
     border-top: 1px solid #dedede;
 }
 #MenuWrap>div.row:nth-child(n+2)  .TTWrap  [data-sid]:first-child{
     border-top:none;
 }
</style>


<div id="customerRole-manager-content">
    <div class="ui-layout-center">
    
    <div id="ywjswrap">
		<div class="container-fluid allselect-m">
		    <div class="row">
		        <div class="col-xs-12">
		            <input type="checkbox" id="ywjs-qx">
		            <label for="ywjs-qx">全选</label>
		            <!-- <button class="btn btn-primary btn-xs" style="margin-left: 15px;">保存</button> -->
                    <button type="button" class="btn btn btn-default btnBlue borderRadius4 colorfff"
                            id="btnSaveCustomerRole">
                        <i class="fa fa-save"></i> 保&nbsp;存
                    </button>
                    <os:hasSecurityResource identifier="addNewMenuBtn">
                    <button type="button" class="btn btn btn-default btnBlue borderRadius4 colorfff"
                            id="btnAddCustomerRole">
                        <i class="fa fa-save"></i> 新&nbsp;增
                    </button>
                    </os:hasSecurityResource>
		        </div>
		    </div>
		</div>

        <div id="xtjs">
            <div class="container-fluid" id="MenuWrap">
                <div class="row">
                    <div class="col-sm-2">一级菜单</div>
                   <div class="col-sm-10">
                       <div class="row">
                           <div class="col-sm-3">二级菜单</div>
                           <div class="col-sm-9">按钮权限</div>
                       </div>
                   </div>
                </div>

            </div>
            
         <%--   <!-- 客户管理 -->
            <section id="specificSet-m" class="specificSet-m">
            <div class="container-fluid Customer" id="xtjs-kh-all">
                <div class="row">
                    <div class="col-xs-12">
                        <input type="checkbox" id="xtjs-kh" name="c55572d0-3212-465f-b243-880aefcacb15">
                        <label for="xtjs-kh"><strong>客户管理</strong></label>
                    </div>
                </div>
                <div class="row" id="xtjs-kh-1" style="border-bottom: none;">
                    <div class="col-xs-1">
                      <span>客户列表</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-11" name="9767fbd5-d675-4d91-91cf-39da4d948d75">
                        <label for="xtjs-kh-11">新增</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-14" name="82c42348-f620-4a40-bcdb-fe4bfac1c46a">
                        <label for="xtjs-kh-14">派工</label>
                    </div>
                    <div class="col-xs-1" style="width: 160px!important">
                        <input type="checkbox" id="xtjs-kh-15" name="c6d50617-e12b-460d-9e8d-04fa7f8dac7a">
                        <label for="xtjs-kh-15">停止服务(恢复服务)</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-12" name="7431125a-add1-43d1-a962-3a75213aae0a">
                        <label for="xtjs-kh-12">导入</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-13" name="e401e6dc-6aa9-48aa-a5ee-125c8e274ee1">
                        <label for="xtjs-kh-13">导出</label>
                    </div>
                </div>
                <div class="row" id="xtjs-kh-2" style="border-bottom: none;">
                    <div class="col-xs-1"></div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-21" name="be7d2a96-4721-4169-aa61-12aeed3e638a">
                        <label for="xtjs-kh-21">合同</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-22" name="9707f1f0-b4b9-418a-a035-34045c8122ab">
                        <label for="xtjs-kh-22">收费</label>
                    </div>
                    <div class="col-xs-1" style="width: 160px!important">
                        <input type="checkbox" id="xtjs-kh-23" name="60001d8c-0da4-4a47-8b01-824b4456625c">
                        <label for="xtjs-kh-23">记账</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-24" name="24a282d2-e7e8-46d1-91ae-f2e2a9f9d42f">
                        <label for="xtjs-kh-24">纳税</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-25" name="f7f19217-004a-42f0-8306-f1192de8d12a">
                        <label for="xtjs-kh-25">任务</label>
                    </div>
                </div>
                <div class="row" id="xtjs-kh-3">
                    <div class="col-xs-1"></div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-31" name="933fb5aa-17c1-4de4-a940-b4ed949149e8">
                        <label for="xtjs-kh-31">主管会计修改</label>
                    </div>
                </div>

                <div class="row" id="xtjs-kh-4">
                    <div class="col-xs-1">
                        <span>批量转派工</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-41" name="f10803c6-01e8-458f-8580-499605d1d4b9">
                        <label for="xtjs-kh-41">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-kh-5">
                    <div class="col-xs-1">
                        <span>客户留言</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-kh-51" name="6c3eccb2-d3b2-4315-a708-5a8b8bfc7772">
                        <label for="xtjs-kh-51">管理</label>
                    </div>
                </div>
            </div>
            </section>
            <!-- 商机管理 -->
            <section id="specificSet-m20" class="specificSet-m">
            <div class="container-fluid Customer" id="xtjs-sj-all">
                <div class="row">
                    <div class="col-xs-12">
                        <input type="checkbox" id="xtjs-sj" name="2f53f2f4-5fbb-422f-834f-0a5da6c89b4b">
                        <label for="xtjs-sj"><strong>商机管理</strong></label>
                    </div>
                </div>
                <div class="row" id="xtjs-sj-1">
                    <div class="col-xs-1">
                         <span>意向客户</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-sj-11" name="634d875e-e79d-4f74-884c-c87b75dde4b7">
                        <label for="xtjs-sj-11">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-sj-2">
                    <div class="col-xs-1">
                         <span>业务受理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-sj-21" name="56bfb6bd-173d-4b8d-b5f0-86d07ccd8abd">
                        <label for="xtjs-sj-21">管理</label>
                    </div>
                </div>
            </div>
            </section>
            <!-- 合同管理 -->
            <section id="specificSet-m21" class="specificSet-m">
            <div class="container-fluid Customer" id="xtjs-ht-all">
                <div class="row">
                    <div class="col-xs-12">
                        <input type="checkbox" id="xtjs-ht" name="29704421-86ff-4ccb-b261-0c89e34001bf">
                        <label for="xtjs-ht"><strong>合同管理</strong></label>
                    </div>
                </div>
                <div class="row" id="xtjs-ht-1">
                    <div class="col-xs-1">
                         <span>合同审核</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-ht-11" name="7025a486-4970-4911-a2a9-90a44a3b1623">
                        <label for="xtjs-ht-11">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-ht-2">
                    <div class="col-xs-1">
                         <span>合同续约</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-ht-21" name="a16785a4-8ed2-4414-afe8-0d3a7fc30efe">
                        <label for="xtjs-ht-21">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-ht-3">
                    <div class="col-xs-1">
                         <span>合同列表</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-ht-31" name="c4fc12bb-a6cc-4cb4-8f29-e32505bb013a">
                        <label for="xtjs-ht-31">管理</label>
                    </div>
                </div>
            </div>
            </section>
            <!-- 智能报税 -->
            <section id="specificSet-m24" class="specificSet-m">
                <div class="container-fluid Customer" id="xtjs-bs-all">
                    <div class="row">
                        <div class="col-xs-12">
                            <input type="checkbox" id="xtjs-znbs" name="4c5633a4-189f-4413-abe9-189145622865">
                            <label for="xtjs-znbs"><strong>智能报税</strong></label>
                        </div>
                    </div>
                    <div class="row" id="xtjs-znbs-1">
                        <div class="col-xs-1">
                            <span>纳税申报</span>
                        </div>
                        <div class="col-xs-1">
                            <input type="checkbox" id="xtjs-znbs-11" name="560631cf-52f0-43f3-85d3-6f89b01ee430">
                            <label for="xtjs-znbs-11">管理</label>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 收费管理 -->
            <section id="specificSet-m22" class="specificSet-m">
            <div class="container-fluid Customer" id="xtjs-sf-all">
                <div class="row">
                    <div class="col-xs-12">
                        <input type="checkbox" id="xtjs-sf" name="66420713-bc79-435d-bde2-7855b7c51177">
                        <label for="xtjs-sf"><strong>收费管理</strong></label>
                    </div>
                </div>
                <div class="row" id="xtjs-sf-1">
                    <div class="col-xs-1">
                         <span>收费台账</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-sf-11" name="2ce27699-5ae3-4ecd-87d6-5701a1196498">
                        <label for="xtjs-sf-11">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-sf-2">
                    <div class="col-xs-1">
                         <span>收费审核</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-sf-21" name="d763fd73-7603-4c46-914d-367161282c27">
                        <label for="xtjs-sf-21">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-sf-3">
                    <div class="col-xs-1">
                         <span>垫付台账</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-sf-31" name="62ba214f-f2e2-4867-8738-c7f8b08160d4">
                        <label for="xtjs-sf-31">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-sf-4">
                    <div class="col-xs-1">
                        <span>收据列表</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-sf-41" name="37e9d939-3f6e-4d94-9f0c-34ae876ad70f">
                        <label for="xtjs-sf-41">管理</label>
                    </div>
                </div>
            </div>
            </section>
            <!-- 任务管理 -->
            <section id="specificSet-m23" class="specificSet-m">
            <div class="container-fluid Customer" id="xtjs-rw-all">
                <div class="row">
                    <div class="col-xs-12">
                        <input type="checkbox" id="xtjs-rw" name="de15042b-d5c1-445f-9b2a-bb2c73e5d641">
                        <label for="xtjs-rw"><strong>任务管理</strong></label>
                    </div>
                </div>
                <div class="row" id="xtjs-rw-1">
                    <div class="col-xs-1">
                         <span>流程管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-rw-11" name="6a26a26e-580c-4278-821b-3ef0ace5d4ff">
                        <label for="xtjs-rw-11">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-rw-2">
                    <div class="col-xs-1">
                         <span>任务列表</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-rw-21" name="a13d18cf-10b1-436a-a52d-d8dde0319e3b">
                        <label for="xtjs-rw-21">任务跟进</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-rw-22" name="7a7c385f-4155-4ce2-b4d3-7cb476e3dfe3">
                        <label for="xtjs-rw-22">任务编辑</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-rw-23" name="d08fea08-91d7-44f3-8139-37b2211dc311">
                        <label for="xtjs-rw-23">任务垫付</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-rw-24" name="b7ec3ed9-0ead-4433-adbb-d78f47154ee1">
                        <label for="xtjs-rw-24">任务删除</label>
                    </div>

                </div>
            </div>
            </section>
            <!-- 员工管理 -->
            <section id="specificSet-m1" class="specificSet-m">
            <div class="container-fluid Customer" id="xtjs-yg-all">
                <div class="row">
                    <div class="col-xs-12">
                        <input type="checkbox" id="xtjs-yg" name="6d192b89-7750-4b2d-940a-bc6559a92c55">
                        <label for="xtjs-yg"><strong>员工管理</strong></label>
                    </div>
                </div>
                <div class="row" id="xtjs-yg-1" style="border-bottom: none;">
                    <div class="col-xs-1">
                                <span>管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-yg-11" name="92b92aff-87a9-489d-858c-7b5322b541c7">
                        <label for="xtjs-yg-11">新增员工</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-yg-12" name="93c5d2dc-b5f2-486b-bc25-d98a6af05145">
                        <label for="xtjs-yg-12">员工离职</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-yg-13" name="6e9171d6-836a-4bf9-9595-0d5427e44a0b">
                        <label for="xtjs-yg-13">设置角色</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-yg-14" name="d2cd76a7-bde1-4d32-93c6-17335e639300">
                        <label for="xtjs-yg-14">更改部门</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-yg-15" name="95822390-1af6-4f31-9042-ecc5212c0c7b">
                        <label for="xtjs-yg-15">重置密码</label>
                    </div>
                </div>
                <div class="row" id="xtjs-yg-2">
                    <div class="col-xs-1"></div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-yg-21" name="dc308123-00a2-486b-b4ae-a8bf3d34f5b0">
                        <label for="xtjs-yg-21">部门权限按钮</label>
                    </div>
                </div>
            </div>
            </section>
            <!-- 统计分析 -->
            <section id="specificSet-m3" class="specificSet-m">
            <div class="container-fluid Customer" id="xtjs-tjfx-all">
                <div class="row">
                    <div class="col-xs-12">
                        <input type="checkbox" id="xtjs-tj" name="435dcbff-bd27-4409-b7f3-c612aeff4d72">
                        <label for="xtjs-tj"><strong>统计分析</strong></label>
                    </div>
                </div>
                <div class="row" id="xtjs-tj-3">
                    <div class="col-xs-1">
                        <span>派工统计图表</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-tj-31" name="c85877cb-6056-41fe-b6cb-d8c6c2eb844b">
                        <label for="xtjs-tj-31">查看</label>
                    </div>
                </div>
                <div class="row" id="xtjs-tj-4">
                    <div class="col-xs-1">
                        <span>收费统计</span>
                    </div>
                    <div class="col-xs-1" style="width: 160px!important">
                        <input type="checkbox" id="xtjs-tj-41" name="xtSftjShow">
                        <label for="xtjs-tj-41">查看（含图表）</label>
                    </div>
                </div>
                <div class="row" id="xtjs-tj-5">
                    <div class="col-xs-1">
                        <span>欠费统计</span>
                    </div>
                    <div class="col-xs-1" style="width: 160px!important">
                        <input type="checkbox" id="xtjs-tj-51" name="xtQftjShow">
                        <label for="xtjs-tj-51">查看（含图表）</label>
                    </div>
                </div>
                <div class="row" id="xtjs-tj-6">
                    <div class="col-xs-1">
                        <span>任务统计</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-tj-61" name="d4188d89-7ca2-4a11-8072-53078e1c35b2">
                        <label for="xtjs-tj-61">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-tj-7">
                    <div class="col-xs-1">
                        <span>汇总统计</span>
                    </div>
                    <div class="col-xs-1" style="width: 160px!important">
                        <input type="checkbox" id="xtjs-tj-71" name="4e32d3c6-2c55-4a7c-b1b2-66ef42e283b9">
                        <label for="xtjs-tj-71">查看</label>
                    </div>
                </div>
            </div>
            </section>
            <!-- 系统管理 -->
            <section id="specificSet-m5" class="specificSet-m">
            <div class="container-fluid Customer" id="xtjs-xtgl-all">
                <div class="row">
                    <div class="col-xs-12">
                        <input type="checkbox" id="xtjs-xtgl" name="1759d70e-4b52-11e7-a919-92ebcb67fe33">
                        <label for="xtjs-xtgl"><strong>系统管理</strong></label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-1">
                    <div class="col-xs-1">
                        <span>支付方式</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-11" name="5aa2b9d8-d06e-408a-8b3b-9bc7a602a8d8">
                        <label for="xtjs-xtgl-11">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-2">
                    <div class="col-xs-1">
                        <span>权限管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-21" name="f7632cdb-87bb-4f6a-b493-f4aad78a91c0">
                        <label for="xtjs-xtgl-21">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-3">
                    <div class="col-xs-1">
                        <span>部门管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-31" name="a3c8e3e7-c493-4347-a7c2-31ddfb1d8967">
                        <label for="xtjs-xtgl-31">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-4">
                    <div class="col-xs-1">
                        <span>新手入门</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-41" name="0984cd89-23ea-4bd0-9d6c-85221a251c9a">
                        <label for="xtjs-xtgl-41">查看</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-5">
                    <div class="col-xs-1">
                        <span>基础参数</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-51" name="67c464ec-845f-4cd1-a68d-859e18693b30">
                        <label for="xtjs-xtgl-51">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-6">
                    <div class="col-xs-1">
                        <span>公告管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-61" name="55d7da64-514e-498a-b133-b079baafc2fa">
                        <label for="xtjs-xtgl-61">发布公告</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-62" name="b88915f2-eb3d-459a-9a25-ee4d850bd121">
                        <label for="xtjs-xtgl-62">删除公告</label>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-63" name="91647e70-de4d-4d8a-b92e-1f40f5b88339">
                        <label for="xtjs-xtgl-63">公告类型管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-7">
                    <div class="col-xs-1">
                        <span>税项设置</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-71" name="d9c70297-7069-4cb7-b6dd-24d33da054d5">
                        <label for="xtjs-xtgl-71">管理</label>
                    </div>
                </div>
                <!-- <div class="row" id="xtjs-xtgl-8">
                    <div class="col-xs-1">
                        <span>通讯录</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-81" name="41e47056-b70f-4895-a7de-d41591f5ed60">
                        <label for="xtjs-xtgl-81">查看</label>
                    </div>
                </div> -->
                <div class="row" id="xtjs-xtgl-9">
                    <div class="col-xs-1">
                        <span>消息提醒</span>
                    </div>
                    <div class="col-xs-11">
                        <input type="checkbox" id="xtjs-xtgl-91" name="b9df8b20-1fd0-426a-b35a-8f6f9a102799">
                        <label for="xtjs-xtgl-91">管理（包含工作台派工信息）</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-10">
                    <div class="col-xs-1">
                        <span>评价管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-101" name="25e9375e-c2fd-4f6e-a8c3-cfacc5407cce">
                        <label for="xtjs-xtgl-101">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-111">
                    <div class="col-xs-1">
                        <span>客户分类管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-1111" name="d824276d-e12d-4370-8d59-ab2949964819">
                        <label for="xtjs-xtgl-1111">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-12">
                    <div class="col-xs-1">
                        <span>工单管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-121" name="a8a61437-fd61-4987-a378-344554d7fe3d">
                        <label for="xtjs-xtgl-121">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-13">
                    <div class="col-xs-1">
                        <span>收费项目管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-131" name="ab646f5d-8262-49ed-b605-7721cf595479">
                        <label for="xtjs-xtgl-131">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-14">
                    <div class="col-xs-1">
                        <span>费用项目管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-141" name="71e4ee5a-d92e-4d71-97b3-b7a5db33f768">
                        <label for="xtjs-xtgl-141">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-15">
                    <div class="col-xs-1">
                        <span>代理欠费统计</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-151" name="f8cb44fe-763e-4d22-a83f-8e4a416fe298">
                        <label for="xtjs-xtgl-151">管理</label>
                    </div>
                </div>
                <div class="row" id="xtjs-xtgl-16">
                    <div class="col-xs-1">
                        <span>证件管理</span>
                    </div>
                    <div class="col-xs-1">
                        <input type="checkbox" id="xtjs-xtgl-161" name="21e4ee5a-d92e-4d71-97b3-b7a5db33f768">
                        <label for="xtjs-xtgl-161">管理</label>
                    </div>
                </div>
            </div>
            </section>--%>

        </div>
	</div>
    </div>
    <div class="ui-layout-west">
        <div class="ui-layout-content" style="overflow: hidden!important">
            <div class="portlet">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase">角色列表</span>
                    </div>
                    <div class="wrap" style="width: 180px;">
                        <button class="btn btn-xs btn-default" id="addNewRole" >
                            <i class="fa fa-plus "></i>
                                                        新增
                        </button>
                        <button class="btn btn-xs btn-default" id="editRole" style="margin-left: 5px;">
                            <i class="fa fa-pencil" ></i>
                                                        编辑
                        </button>
                        <button class="btn btn-xs btn-default" id="delRole" style="margin-left: 5px;">
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
                                    <div id="customerRole_manage_tree"></div>
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
<script src="<%=request.getContextPath()%>/assets/pages/scripts/roles/customerList.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		customerRoles.init();
	});
	
	
</script>