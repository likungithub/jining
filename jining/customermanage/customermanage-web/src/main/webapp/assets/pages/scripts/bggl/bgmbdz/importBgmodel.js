var importBgmodel = function () {
    var jqueryMap = {
        $blockTarget: null,
        $blockTarget:null,
        $selectSpgg:null
    };
    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$selectSpgg = $('#importBgmodel');
    };
        //获取页面数据
    var showRequest = function () {
        console.log(jqueryMap.$selectSpgg)
        var fileDir = $("#upfile").val();
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
    var subimtBtn = function () {
        var re = showRequest();
        console.log(re)
        if (re) {
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在导入数据，请稍候...'
            });
            var formData = new FormData($( "#form1" )[0]);
            console.log(formData)
         $.ajax({
                url: '/customermanage/bgmodel/importBgmodel',
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
                        $('.custom-alerts').remove();
                        bgmodel.yincang();
                    } else {
                        App.alert({
                            container: jqueryMap.$selectSpgg.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: data.message,
                            icon: 'fa fa-warning'
                        });
                        bgmodel.yincang();
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