<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
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
    #specificSet-m .Customer>.row{
        height: 40px;
        line-height: 40px;
        border-bottom:1px dashed #dadada;
    }
    #specificSet-m .Customer>.row>.col-xs-1{
        width: 100px!important;
    }
    #specificSet-m .Customer{
        margin: 0 15px;
    }
    #specificSet-m .Customer>.row:nth-child(1){
        background: #F8F8F8;
    }
</style>
<div id="ywjswrap">
<div class="container-fluid allselect-m">
    <div class="row">
        <div class="col-xs-12">
            <input type="checkbox" id="ywjs-qx">
            <label for="ywjs-qx">全选</label>
            <button class="btn btn-primary btn-xs" style="margin-left: 15px;">保存</button>
        </div>
    </div>
</div>
<section id="specificSet-m">
<div class="container-fluid Customer">
    <div class="row">
        <div class="col-xs-12">
            <input type="checkbox" id="ywjs-ku">
            <label for="ywjs-ku">客户</label>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-1">
          <span>新增</span>
        </div>
        <div class="col-xs-1">
            <input type="checkbox" id="ywjs-xz">
            <label for="ywjs-xz">新增</label>
        </div>
        <div class="col-xs-1">
            <input type="checkbox" id="ywjs-dr">
            <label for="ywjs-dr">导入</label>
        </div>
        <div class="col-xs-1">
            <input type="checkbox" id="ywjs-dc">
            <label for="ywjs-dc">导出</label>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-1">
            <span>派工</span>
        </div>
        <div class="col-xs-1">
            <input type="checkbox" id="ywjs-pg">
            <label for="ywjs-pg">派工</label>
        </div>
        <div class="col-xs-1" style="width: 200px!important">
            <input type="checkbox" id="ywjs-thfw">
            <label for="ywjs-thfw">停止服务(恢复服务)</label>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-1">
            <span>审核</span>
        </div>
        <div class="col-xs-1">
            <input type="checkbox" id="ywjs-ht">
            <label for="ywjs-ht">合同</label>
        </div>
        <div class="col-xs-1">
            <input type="checkbox" id="ywjs-sf">
            <label for="ywjs-sf">收费</label>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-1">
            <span>管理</span>
        </div>
        <div class="col-xs-1">
            <input type="checkbox" id="ywjs-jz">
            <label for="ywjs-jz">记账</label>
        </div>
        <div class="col-xs-1">
            <input type="checkbox"id="ywjs-ht1">
            <label for="ywjs-ht1">合同</label>
        </div>
        <div class="col-xs-1">
            <input type="checkbox" id="ywjs-shoufei">
            <label for="ywjs-shoufei">收费</label>
        </div>
        <div class="col-xs-1">
            <input type="checkbox" id="ywjs-genjin">
            <label for="ywjs-genjin">跟进</label>
        </div>
        <div class="col-xs-1">
            <input type="checkbox" id="ywjs-shenbao">
            <label for="ywjs-shenbao">申报</label>
        </div>
    </div>
</div>

</section>
</div>