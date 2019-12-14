var addkqWifiCon=function () {

    var configMap={
        path:'',
        kqbh:'',
        dataUrl: '/attendance/kqwifi',
        saveButtonHtml: '<a href="javascript:;" class="btn btn-xs default" data-toggle="tooltip"' +
        'data-placement="left" name="WiFisave" data-original-title="保存" onclick="addkqWifiCon.save()">' +
        '<i class="fa fa-save iconFontColor-10a0f7 fontSize-16"></i></a>',
        deleteButtonHtml:'<a href="javascript:;" class="btn btn-xs default" data-toggle="tooltip"' +
        ' data-placement="left" name="WiFidelete" data-original-title="删除WiFi信息" onclick="addkqWifiCon.delete(this)">' +
        '<i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        editButtonHtml:'<a href="javascript:;" class="btn btn-xs default" data-toggle="tooltip"' +
        ' data-placement="left" name="WiFiedit" data-original-title="编辑WiFi" onclick="addkqWifiCon.edit(this)">' +
        '<i class="icon iconfont icon-bianji"></i></a>',
        AttendanceGrid:null
    };

    var jqueryMap = {
        $container:null,
        $blockTarget:null,
        $WiFiListDataTable:null,
        $kqszForm:null,
        $kqszAddWifi:null
    };

    var setJqueryMap = function(){
        jqueryMap.$container = $('#addWiFiDiv');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$WiFiListDataTable = $('#WiFiListTable', jqueryMap.$container);
        jqueryMap.$kqszForm = $('#kqszCon');
        jqueryMap.$kqszAddWifi=$('#addWiFiUl',jqueryMap.$kqszForm);
    };

    var initAttendanceWiFiWithOutAjax = function () {
        var wifilist = [];
        var obj;
        $('#addWiFiUl li').each(function(){
            obj = {};
            obj.name=$(this).attr('data-name');
            obj.mac=$(this).attr('data-mac');
            wifilist.push(obj);
        });
        jqueryMap.$WiFiListDataTable.DataTable({
            "dom": '<"clear">',
            "ordering": false,
            "searching": false,
            "autoWidth": false,
            "data":wifilist,
            "columns": [
                    {
                        class: "text-center",
                        "data":"name"
                    },
                    {
                        class:"text-center",
                        "data": "mac"
                    },
                    {
                        class:"text-center",
                        "render": function (data, type, row) {
                            return configMap.editButtonHtml + configMap.deleteButtonHtml;
                        }
                    }
                ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () {                                                                            // 数据加载完成后执行
                $('[data-toggle="tooltip"]', jqueryMap.$container).tooltip();
                if(wifilist.length===0){
                    $('tbody tr', jqueryMap.$WiFiListDataTable).remove();
                }
                var addButton = '<tr class="odd addtr" style="cursor:pointer"><td valign="top" colspan="3" class="dataTables_empty" onclick="addkqWifiCon.addwifi()"><i class="fa fa-plus mr">&nbsp;添加</i></td></tr>';
                jqueryMap.$WiFiListDataTable.find('tbody').append(addButton);

            }
        });
    };

    /**
     * 校验输入信息
     * @returns {boolean}
     */
    var checkvalue = function(){
        if($(".wifiName", jqueryMap.$container).val()===''){
            App.alert({
                container: jqueryMap.$container.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请填写WiFi名称！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if($(".wifiMac", jqueryMap.$container).val()===''){
            App.alert({
                container: jqueryMap.$container.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请填写Mac地址！',
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    };

    /**
     * 保存wifi信息
     */
    var save=function () {
        //移除设置页面的wifi  Li,遍历放入新的数据
        jqueryMap.$kqszAddWifi.find('li').remove();
        $('tbody [role="row"]', jqueryMap.$WiFiListDataTable).not('.edittr').each(function(){
            jqueryMap.$kqszAddWifi.append('<li data-name="' + $(this).find('td:eq(0)').html() + '" data-mac="' +
                $(this).find('td:eq(1)').html() + '"><span>' + $(this).find('td:eq(0)').html() + '</span><i class="fa fa-close closeAd" onclick="kqsz.closeAdd(this)" style="position: absolute;top: 10px;right: 5px;"></li>');
        });
    };

    return{
        init:function (kqbh) {
            setJqueryMap();
            configMap.kqbh = kqbh;
            jqueryMap.$container.closest(".modal-dialog").css("width", "600px");
            initAttendanceWiFiWithOutAjax();
        },
        setPath:function (path) {
            configMap.path=path;
        },
        save:function () {
            if(checkvalue()){
                var name=$(".wifiName", jqueryMap.$container).val();
                var mac=$(".wifiMac", jqueryMap.$container).val();
                //移除修改行，将输入数据放入新的tr中，设置保存按钮显示
                $('.edittr', jqueryMap.$container).remove();
                var trHtml = '<tr role="row" class="odd newtr" style="cursor:pointer"><td class="text-center">' +
                    name + '</td><td class="text-center">' + mac + '</td><td class="text-center">' + configMap.editButtonHtml + configMap.deleteButtonHtml + '</td></tr>';
                $('.addtr', jqueryMap.$WiFiListDataTable).before(trHtml);
                $('.addtr', jqueryMap.$WiFiListDataTable).removeClass('display-hide');
                $('[data-toggle="tooltip"]', jqueryMap.$container).tooltip();
                save();
            }
        },
        addwifi:function (){
            var trHtml = '<tr class="odd edittr" style="cursor:pointer"><td class="text-center">' +
                '<input type="text" class="inputStyle wifiName" placeholder="请输入WiFi名称"/>' +
                '</td><td class="text-center">' +
                '<input type="text" class="inputStyle wifiMac" placeholder="请输入mac地址"/>' +
                '</td><td class="text-center">' + configMap.saveButtonHtml + '</td></tr>';
            $('.addtr', jqueryMap.$WiFiListDataTable).before(trHtml);
            $('.addtr', jqueryMap.$WiFiListDataTable).addClass('display-hide');
            $('[data-toggle="tooltip"]', jqueryMap.$container).tooltip();
        },
        delete:function(e){
            $(e).parent().parent().remove();
            save();
        },
        edit:function (e){
            $(e).parent().parent().addClass('edittr');
            $(e).parent().parent().find('td:eq(0)').html('<input type="text" class="inputStyle wifiName" placeholder="请输入WiFi名称"/>');
            $(e).parent().parent().find('td:eq(1)').html('<input type="text" class="inputStyle wifiMac" placeholder="请输入mac地址"/>');
            $(e).parent().parent().find('td:eq(2)').html(configMap.saveButtonHtml);
            $('[data-toggle="tooltip"]', jqueryMap.$container).tooltip();
        }
    }
}();