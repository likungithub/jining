<%--
  Created by IntelliJ IDEA.
  User: MDW
  Date: 2018/3/10 0010
  Time: 13:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    #HandlingProgress_mdw .info>div{
        float: left;
    }
    #HandlingProgress_mdw .bCcc{
        background: #ccc!important;
    }
    #HandlingProgress_mdw .info>div:nth-child(1){
        width: 6%;
        height: 60px;
    }
    #HandlingProgress_mdw .info>div:nth-child(2){
        width: 40%;
    }
    #HandlingProgress_mdw .info>div:nth-child(3){
        width: 20%;
    }
    #HandlingProgress_mdw .info>div:nth-child(4){
        width: 20%;
    }
    #HandlingProgress_mdw .info>div:nth-child(5){
    }
    #HandlingProgress_mdw .xuhao
    {
        height: 20px;
        width: 20px;
        background: #1D9FFF;
        color: #fff;
        display: block;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
    }
    #HandlingProgress_mdw   .line{
        height: 40px;
        width: 1px;
        background: #1D9FFF;
        margin-left: 9px;
    }
    #HandlingProgress_mdw .info:nth-last-child(1) .line{
        display: none;
    }
    #HandlingProgress_mdw .yjcqStyle{
        display: inline-block;
        background: #FFA14D;
        padding: 5px 15px;
        color: #ffff;
    }
</style>

<div class="container-fluid" id="HandlingProgress_mdw">
    <div class="row">
        <div class="col-xs-12">
            <div class="h4 text-center taskName"></div>
        </div>
        <div class="col-xs-12 yujichaoqiTitle" style="padding: 0 0 15px 33px">
            <div class="row">
                <span>
                    预计
                    <span class="yjjssj"></span>
                    天完成
                </span>
                <span style="display: inline-block;background: #FFA14D" class="borderRadius4 ml yjcqStyle">
                    已经超期
                    <span class="ycqts"></span>
                    天
                </span>
            </div>
        </div>

        <%--<div class="col-xs-12 info">
            <div>
                <i class="xuhao">1</i>
                <div class="line"></div>
            </div>
            <div>
                收集资料
            </div>
            <div>
                已完成
            </div>
            <div>
                张三
            </div>
            <div>
                2018-03-12
            </div>
        </div>
        <div class="col-xs-12 info">
            <div>
                <i class="xuhao">2</i>
                <div class="line"></div>
            </div>
            <div>
                收集资料
            </div>
            <div>
                已完成
            </div>
            <div>
                张三
            </div>
            <div>
                2018-03-12
            </div>
        </div>--%>
        
    </div>
</div>
