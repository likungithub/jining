<%--
  Created by IntelliJ IDEA.
  User: MDW
  Date: 2018/3/5
  Time: 9:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container-fluid" id="printInfo_sl">
    <div class="row">
        <div class="col-xs-12">
            <table class="table table-striped table-hover">
                <thead>
                <th>证件名称</th>
                <th>数量</th>
                <th>交接说明</th>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>
<script>
    $(function () {
    var printInfo = localStorage.getItem('printInfoArr').split(',');
    $.each(printInfo,function(i,v){
        $('<tr>' +
            ' <td>'+'<input type="text" value="'+v+'" style="border: none" readonly>' +'</td>' +
            ' <td><input type="text" value="1"></td>' +
            ' <td><textarea style="width: 200px;height: 60px; " maxlength="45" placeholder="点击修改备注信息（最多40个字符）"></textarea></td>' +
            '</tr>'
           ).appendTo($('#printInfo_sl tbody'));
    })



    })
</script>
