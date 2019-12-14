var yqyysyListwjscmodal = function () {
    var jqueryMap = {
        $blockTarget:null,
        $selectSpgg:null
    };
    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$selectSpgg = $('#importFczzwj');
    };
    //获取页面数据
    var showRequest = function () {
        console.log(jqueryMap.$selectSpgg)
        var fileDir = $("#upFczzwj").val();
        var suffix = fileDir.substr(fileDir.lastIndexOf("."));
        if ("" == fileDir) {
            App.alert({
                container: jqueryMap.$selectSpgg.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '选择需要导入的Docx文件！',
                icon: 'fa fa-warning'
            });
            return false;
        }
        else if (".docx" != suffix) {
            App.alert({
                container: jqueryMap.$selectSpgg.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '选择.docx格式的文件导入！',
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    }
    var wjm = function () {
        var uploadfile = $("#upFczzwj").val();
        var fileName= getFileName(uploadfile);
        //获取文件名方式一
        function getFileName(file){//通过第一种方式获取文件名
            var pos=file.lastIndexOf("\\");//查找最后一个\的位置
            return file.substring(pos+1); //截取最后一个\位置到字符长度，也就是截取文件名
        }
        return fileName;
    }
    var subimtBtn = function () {
        var re = showRequest();
        console.log("jianghushuoshuren")
        console.log(re)
        if (re) {
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在导入数据，请稍候...'
            });
            var formData = new FormData($( "#formFczzwj" )[0]);
            console.log(formData)
            $.ajax({
                url: '/systemmanager/dzbgl/wjscfczz',
                type: 'post',
                data:formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    console.log(data)
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (data.success) {
                        Messenger().post({
                            message:'上传成功',
                            type:'info'
                        })
                        return true;
                    } else {
                        App.alert({
                            container: jqueryMap.$selectSpgg.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: data.message,
                            icon: 'fa fa-warning'
                        });

                    }
                },
                error: function () {
                    App.unblockUI(jqueryMap.$blockTarget);
                    App.alert({
                        container: jqueryMap.$selectSpgg.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '导入失败！',
                        icon: 'fa fa-warning'
                    });
                    return true;
                }
            });
        } else {
            return false;
        }
    }
    return{
        init:function () {
            setJqueryMap();
        },
        submit:function () {
            subimtBtn();
        }
    }
}();