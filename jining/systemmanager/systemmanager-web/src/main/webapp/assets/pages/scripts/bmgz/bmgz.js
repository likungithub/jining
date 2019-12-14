var yqyysyListbmgz = function () {
    var configMap = {
        path:'',
        uuid:'',
        wx:'',
        dataUrl: "systemmanager/bmgz/bmgzDT",
        nowData:"",
    };
    var jqueryMap ={
        $ypManageDialog:null,
        $container: null,
    }
    var setJqueryMap = function () {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
    };
    /*查询当前编码规则*/
    var initBmgz =  function () {
        $.ajax({
        url: '/systemmanager/bmgz/bmgzDT',
        type: 'POST',
        success: function (result) {
            if (result.success) {
                // debugger;
                console.log(result);
                $("#bmd1").val(result.data[0].bm1);
                $("#bmd2").val(result.data[0].bm2);
                /*$("#bmd3").val(result.data[0].bm3);
                $("#address").val(result.data[0].bm4);*/
                $("#ypaddress").val(result.data[0].ypaddress);
            } else {
                Messenger().post({
                    message: result.message,
                    type: 'danger'
                });
            }
        },
        error: function () {
            Messenger().post({
                message: '请求失败',
                type: 'error'
            })
        }
    })
    }
    /*修改委托单编码规则*/
    var updateBmgz = function () {
        console.log($("#" + configMap.uuid + "updateBmgz_from").serialize())
        $.ajax({
            url: '/systemmanager/bmgz/updateBmgz',
            data: $("#" + configMap.uuid + "updateBmgz_from").serialize(),
            type: 'POST',
            success: function () {
                Messenger().post({
                    message: '保存成功',
                    type: 'info'
                })
            },
            error: function () {
                Messenger().post({
                    message: '保存失败',
                    type: 'error'
                })
            }
        })

    }
    return{
        init:function (uuid) {
            initBmgz();
            configMap.uuid = uuid;
            $("#submityqsbtzupdate",jqueryMap.$container).off('click').on('click',function () {//修改
                updateBmgz();
            });

        },
        setPath:function (path) {
            configMap.path = path;
        },
    }
}();