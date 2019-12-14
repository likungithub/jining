var xgypzb =function () {
    configMap = {
        zbybm:"",

    }

    var save = function () {
        $.ajax({
            url:"customermanage/datatable/updateYpzb?id="+$("#zbybm").val()+"&zbDate="+$("#zbDate7").val()+"&zbfs="+$("#zbfs7").val()+"&zbzl="+$("#zbzl7").val()+"&dw="+$("#dw7").val(),
            type:"POST",
            success:function () {

            }
        });
    }
    /*时间格式转换*/
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    //回显
    var HuiXian = function () {
        $.ajax({
            url:"customermanage/datatable/HuiXian?zbybm="+configMap.zbybm,
            type:"POST",
            async:"false",
            success:function (data) {
                console.log(new Date(data.zbDate).Format("yyyy-MM-dd"))
                $("#zbDate7").val(new Date(data.zbDate).Format("yyyy-MM-dd"))
                $("#zbfs7").val(data.zbfs);
                $("#zbzl7").val(data.zbzl);
                $("#dw7").val(data.dw);
            }
        })
    }

    //初始化制备方式
    var StartZbfs = function () {
        $.ajax({
            url:"customermanage/datatable/getAllZbfs?lx=linzi",
            type:"POST",
            dataType: 'JSON',
            success:function (data) {
                $.each(data.info, function(i, item){
                  /*  $("#zbfsTable").append('<tr> <td>方式'+item.ID+'&nbsp;&nbsp;</td> <td>'+item.ZBFSNAME+'</td> </tr>');*/
                    $("#zbfs7").append('<option value="'+item.ID+'">制备方式'+item.ID+'</option>')
                });
            }
        })
    }


    return {
        init:function (zbybm) {
            configMap.zbybm=zbybm;
            HuiXian();
            $(".beginTime").datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            StartZbfs()
        },
        xiugai:function () {
            save();
        }
    }

}