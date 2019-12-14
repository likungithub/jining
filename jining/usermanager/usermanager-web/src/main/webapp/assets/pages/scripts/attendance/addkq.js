var addkq=function () {

    var configMap={
        path:'',
        map:'',
        addressData:''
    };

    var jqueryMap={
        $container:null,
        $blockTarget:null
    };

    var setJqueryMap = function(){
        jqueryMap.$container = $('#addKqSz');
        jqueryMap.$blockTarget = $('body');
    };

    var checkvalue = function (){
        if(configMap.addressData===''){
            App.alert({
                container: jqueryMap.$container.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请选择考勤地址！',
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    };

    /**
     * 保存地址信息，返回
     * @param callback
     */
    var save=function (callback) {
         callback(configMap.addressData);
    };

    /**
     * 输入查询地址
     */
    var searchKq=function () {
        var city=$(".city", jqueryMap.$container).val();
        var address=$(".address", jqueryMap.$container).val();
        if(city!==''){
            configMap.map.centerAndZoom(city,13);
            if(address!==''){
                var local = new BMap.LocalSearch(configMap.map, {
                    renderOptions:{map: configMap.map,autoViewport: false}
                });
                local.search(address);
            }
        }
    };

    /**
     * 清除覆盖物
     */
    var remove_overlay = function (){
        configMap.map.clearOverlays();
    };

    return{
        init:function (kqbh) {
            setJqueryMap();
            jqueryMap.$container.parents('.modal-dialog').css({
                width:800
            });
            configMap.map= new BMap.Map("allmap");
            var nowPoint;
            var defPoint = new BMap.Point(116.404, 39.915);                                                            //设置地图打开的中心点（中心点有问题，不展示在地图正中，而是左上角）
            configMap.map.centerAndZoom(defPoint,13);                                                                  //设置地图的级别
            configMap.map.enableScrollWheelZoom(true);                                                                 //启用滚轮放大缩小，默认禁用（不写就是默认），可以添加true或者false
            configMap.map.enableContinuousZoom();                                                                      //启用地图惯性拖拽，默认禁用（不写就是默认），可以添加true或者false
            configMap.map.addControl(new BMap.NavigationControl());                                                    //添加控件（缩放平移插件）
            var geolocation = new BMap.Geolocation();                                                                  //根据浏览器获取当前位置
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() === BMAP_STATUS_SUCCESS){
                    var mk = new BMap.Marker(r.point);
                    configMap.map.addOverlay(mk);
                    configMap.map.panTo(r.point);
                    $(".city", jqueryMap.$container).val(r.address.city);
                }
                else {
                    alert('failed'+this.getStatus());
                }
            },{enableHighAccuracy: true});
            var geoc = new BMap.Geocoder();
            configMap.map.addEventListener("click", function(e){                                                     //点击地图，获取点击的经纬度
                remove_overlay();
                var pt = e.point;
                geoc.getLocation(pt, function(rs){
                    nowPoint = new BMap.Point(rs.point.lng, rs.point.lat);
                    var marker = new BMap.Marker(nowPoint);                                                            //创建标注
                    var range = 50;
                    configMap.map.addOverlay(marker);                                                                   //将标注添加到地图中
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE);                                                         //跳动的动画
                    // $(".addressMs", jqueryMap.$container).html(rs.address+" 经度："+rs.point.lng+" 维度："+rs.point.lat);
                    $(".addressMs", jqueryMap.$container).html(rs.address);
                    configMap.addressData=new Object();
                    configMap.addressData.address=rs.address;
                    configMap.addressData.lng=rs.point.lng;
                    configMap.addressData.lat=rs.point.lat;
                    if($('.deviation').val()===null||$('.deviation').val()==='0'||$('.deviation').val()===''){
                        range = 50;
                    } else {
                        range = Number($('.deviation').val());
                    }
                    var circle = new BMap.Circle(nowPoint,range,{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});     //创建圆
                    configMap.map.addOverlay(circle);
                });
            });
            $(".addressOk", jqueryMap.$container).click(searchKq);                                                  //用户搜索位置

        },
        setPath:function (path) {
          configMap.path=path;
        },
        save:function (callback) {
            if(checkvalue()){
                save(callback);
            }
        }
    }
}();