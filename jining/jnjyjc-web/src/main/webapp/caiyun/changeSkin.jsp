<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/10/9 0009
  Time: 16:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>换肤</title>
    <style>
        .colorBlock {
            width: 100px;
            height: 100px;
        }

        #themeList_m > li:nth-child(1) > div {
            background: #435668;
        }

        #themeList_m > li:nth-child(2) > div {
            background: #F34541;
        }

        #themeList_m > li:nth-child(3) > div {
            background: #539FFF;
        }

        #themeList_m > li:nth-child(4) > div {
            background: #1a1b1f;
        }

        #themeList_m > li:nth-child(5) > div {
            background: #54a46a;
        }

        #themeList_m li {
            display: inline-block;
        }

        #themeList_m li label {
            vertical-align: text-bottom;
            cursor: pointer;
        }
    </style>
</head>
<body>
<form>
    <ul id="themeList_m">
        <li><input type="radio" name="theme" id="theme1_m" value="public base" checked><label for="theme1_m">洲际灰</label>
            <div class="colorBlock"></div>
        </li>
        <li><input type="radio" name="theme" id="theme2_m" value="public1 base1"><label for="theme2_m">中国红</label>
            <div class="colorBlock"></div>
        </li>
        <li><input type="radio" name="theme" id="theme3_m" value="public2 base2"><label for="theme3_m">宝石蓝</label>
            <div class="colorBlock"></div>
        </li>
        <li><input type="radio" name="theme" id="theme4_m" value="public3 base3"><label for="theme4_m">深空黑</label>
            <div class="colorBlock"></div>
        </li>
        <li><input type="radio" name="theme" id="theme5_m" value="public4 base4"><label for="theme5_m">草原绿</label>
            <div class="colorBlock"></div>
        </li>
    </ul>
</form>
<script>
    $(function () {
        $('#themeList_m>li>div')
            .css('cursor', 'pointer')
            .on('click', function () {
                $(this).siblings('[type = "radio"]')
                    .prop('checked', true);
            })
            .hover(function () {
                $(this).css('opacity', 0.5)
            }, function () {
                $(this).css('opacity', 1)
            });
    })
</script>
</body>
</html>
