var ypzbinfo = function () {
    configMap = {
        url:'',
        ypbm:"",
        ypmc:""
    }
    var save = function () {
        var data = {}
        data.ypbm=$("#ypbm").val();
        data.zbDate=$("#zbDate").val();
        data.zbfs=$("#zbfs").val();
        data.zybm = $("#zybm").text();
        data.zydw=$("#zydw").val();
        data.fybm=$("#fybm").text();
        data.fydw=$("#fydw").val();
        data.bybm=$("#bybm").text();
        data.bydw=$("#bydw").val();
        data.zyzl=$("#zyzl").val();
        data.fyzl=$("#fyzl").val();
        data.byzl=$("#byzl").val();
        data.ypmc =$("#ypmc").val();
        data.id=$("#ypid").val();
        data.zywz=$("#zywz").val();
        data.fywz=$("#fywz").val();
        data.bywz=$("#bywz").val();
        console.log(data)
        $.ajax({
            url:"customermanage/datatable/addYpzb?sb=["+JSON.stringify(data)+"]",
            type:'POST',
            traditional:true,
            success:function (data) {
                Messenger().post("制备完成");
                ypjslist.reload();
            }
        });
    }
    //初始化制备方式
    var StartZbfs = function () {
        $.ajax({
            url:"customermanage/datatable/getAllZbfs?lx=linzi",
            type:"POST",
            dataType: 'JSON',
            success:function (data) {
                $.each(data.info, function(i, item){
                    $("#zbfsTable").append('<tr> <td>方式'+item.ID+'&nbsp;&nbsp;</td> <td>'+item.ZBFSNAME+'</td> </tr>');
                    $("#zbfs").append('<option value="'+item.ID+'">制备方式'+item.ID+'</option>')
                });
            }
        })
    }

    return{
    init:function (url,ypbm,ypmc) {
        configMap.url=url;
        configMap.ypbm=ypbm;
        configMap.ypmc=ypmc;
        $(".beginTime").datepicker({
            clearBtn: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN'
        });
        StartZbfs();
    },
    save:function () {
        save();

    }
    };
}();