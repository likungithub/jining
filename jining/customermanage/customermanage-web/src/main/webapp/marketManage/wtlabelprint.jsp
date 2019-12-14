<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<form action="#" class="form form-horizontal" id="wtlbaelprint-form-datas">
	<div class="form-body">
		<div class="row" style="padding-left: 30px;">
            <div class="form-group">
                <label class="labelCommon labelBg color666" style="width: 70px;">抽验单编号</label>
                    <input type="text" class="inputCommon appsysinfo-m" placeholder="请输入抽验单编号" name="cydbm" style="width: 140px;">
            </div>
        </div>
        <div class="row" style="padding-left: 30px;">
            <div class="form-group">
                <label class="labelCommon labelBg color666" style="width: 70px;">任务类型</label>
                <select id="renwuleixing" name="rwlx" style="width: 140px;height: 32px;">
                    <option value="S2">食药任务(2)</option>
                    <option value="S3">食药任务(3)</option>
                    <option value="M2">畜牧任务(2)</option>
                    <option value="M3">畜牧任务(3)</option>
                    <option value="N2">农业任务(2)</option>
                    <option value="N3">农业任务(3)</option>
                    <option value="L2">水利任务(2)</option>
                    <option value="L3">水利任务(3)</option>
                    <option value="G2">粮食任务(2)</option>
                    <option value="G3">粮食任务(3)</option>
                    <option value="Y2">海洋渔业任务(2)</option>
                    <option value="Y3">海洋渔业任务(3)</option>
                    <option value="W2">卫生任务(2)</option>
                    <option value="W3">卫生任务(3)</option>
                    <option value="H2">化工(2)</option>
                    <option value="H3">化工(3)</option>
                    <option value="X2">纺织/纤维(2)</option>
                    <option value="X3">纺织/纤维(3)</option>
                    <option value="Q2">轻工产品(2)</option>
                    <option value="Q3">轻工产品(3)</option>
                </select>
            </div>
		</div>

	</div>
</form>
