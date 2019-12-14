<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
    .auto-table-area {
        width: 100%;
        overflow: auto;
    }
    .row {
        margin: 0 !important;
    }
</style>
<div id="kcyeinit-manager-content">
<div >
        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="table-toolbar" id="kcyeinit-toolbar">
                    <form class="form-inline">
                        <div style="margin-top:3px;">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button id="kcyeinitbtnSave" class="btn btn-primary" type="button">
                                            <i class="glyphicon glyphicon-save"></i> 保存
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
               </div>
               <div class="dataTables_wrapper no-footer">
                    <div class="form-body">
                    <div class="auto-table-area">
                        <table class="table table-striped table-bordered table-hover" style="center" id="kcyeinit_data">
                            <thead>
                                <tr class="auto-width">
                                	<th>操作</th>
                                    <th>货品名称</th>
                                    <th>规格</th>
                                    <th>批号</th>
                                    <th>库位</th>
                                    <th>期初数量</th>
                                    <th>期初金额</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>合计</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                        </div>
                    </div>
                </div>
               
          </div>
      </div>
  </div>
</div>
