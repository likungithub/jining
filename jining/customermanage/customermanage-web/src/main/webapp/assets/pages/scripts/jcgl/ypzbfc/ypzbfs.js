var ypzbFsxz = function () {
    // 全局属性参数
    var configMap = {
        path: '',
        uuid:'',
        zbwcIds:'',
        zbypbms:'',
        ypmcs:''
    };
    // 全局Dom
    var jqueryMap = {
        $editForm: null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$editForm = $('#'+uuid+'zbfsForm');
    };
    return {
        // 初始化
        init: function (uuid,zbwcIds) {
            configMap.uuid=uuid;
            configMap.zbwcIds=zbwcIds;
            setJqueryMap(uuid);
            $("#bgbz_shr",jqueryMap.$editForm).empty();
            $.ajax({
                url:"/customermanage/ggDmGet/getZbfsList",
                type: 'POST',
                async:false,
                success: function (data) {
                    $("#zbfslab",jqueryMap.$editForm).html("");
                    for (var i = 0; i < data.length; i++) {
                        var zbfsChk = "<span style=\"font-size:17px\"><input type=\"checkbox\" name=\"zbfschk\" value=\""+ data[i].ZBFS_DM+"\" id=\""+ data[i].ZBFS_DM+"\" style=\"vertical-align:bottom;zoom: 1.5;\">" + data[i].ZBFS_MC+"<span><br>";
                        $("#zbfslab",jqueryMap.$editForm).append(zbfsChk);
                    }
                    $.ajax({
                        url:"/customermanage/ypglZbxx/getYpZbfs?zbwcIds="+configMap.zbwcIds,
                        type: 'POST',
                        async:false,
                        success: function (data) {
                             console.log("zbfsdms="+data);
                             if(data!=null && data!="" && data.length>3)
                             {


                                var zbfsdmArr = data.split(",");
                                for(var i=0;i<zbfsdmArr.length;i++)
                                {
                                    $("#"+zbfsdmArr[i]).attr("checked","checked");
                                }
                             }
                        }
                    });
                }
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        setPara:function(zbwcIds,zbypbms,ypmcs)
        {
            configMap.zbwcIds=zbwcIds;
            configMap.zbypbms=zbypbms;
            configMap.ypmcs=ypmcs;
        },
        //传递模态框的 审核人员
        getZbfs: function (callback) {
            var zbfsdms = "";
            jqueryMap.$editForm.find('[name=zbfschk]:checked').each(function () {
                var zbfsdm = $(this).val();
                zbfsdms=zbfsdms+","+zbfsdm;
            });
            if(zbfsdms!="" && zbfsdms.length>2)
            {
                zbfsdms= zbfsdms.substr(1);
            }
          return zbfsdms;
        }
    };
}();
