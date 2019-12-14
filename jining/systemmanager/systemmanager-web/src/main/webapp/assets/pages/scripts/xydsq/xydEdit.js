var xydEdit;
xydEdit = function () {
    'use strict';
    var configMap = {};
    var jqueryMap = {
        $container: null,
        $blockTarget: null
    };
    //赋值
    var setJqueryMap = function () {
        jqueryMap.$container = $('#xydForm_m');
        jqueryMap.$blockTarget = $('body');
    };
    setJqueryMap();
    $('#xydForm_m').parents('.modal-dialog').css({
        width: 1038
    });

    //对表单元素进行校验
    //提示
    function tip(msg,type){
        Messenger().post({
            message: msg,
            type: type
        });
    }


    var provincedm, citydm, countydm;
//1.先把省份的放进去
//     $.get('/commonmanager/xzqy/sj', function (data) {
//         for (var i = 0; i < data.length; i++) {
//             $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('[name="jkrsfdm"]', $('#xydForm_m')));
//         }
//     });

    $.ajax({
        url: "/commonmanager/xzqy/sj",
        async:false,
        success: function(data){
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('[name="jkrsfdm"]', $('#xydForm_m')));
            }
        }

    });

//    2.当省份代码变动的时候
    $('[name="jkrsfdm"]', $('#xydForm_m')).change(function () {
       var sheng =  $('[name="jkrsfdm"]', $('#xydForm_m')).val();
        $('[name="jkrxqdm"]', $('#xydForm_m')).empty();
        $('[name="jkrcsdm"]', $('#xydForm_m')).empty();

        $.ajax({
            url:'/commonmanager/xzqy/xjXzqy?sjdm=' + sheng,
            async:false,
            success:function (data) {
                for(var  i = 0; i < data.length; i++) {
                    $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('[name="jkrcsdm"]', $('#xydForm_m')));
                }
            }
        });
        $('[name="jkrcsdm"]', $('#xydForm_m')).trigger('change');

    });

//    3.当市区代码变动的时候
    $('[name="jkrcsdm"]', $('#xydForm_m')).change(function () {
        var city =  $('[name="jkrcsdm"]', $('#xydForm_m')).val();
        $('[name="jkrxqdm"]', $('#xydForm_m')).empty();

        $.ajax({
            url:'/commonmanager/xzqy/xjXzqy?sjdm=' + city,
            async:false,
            success:function (data) {
                for(var  i = 0; i < data.length; i++) {
                    $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('[name="jkrxqdm"]', $('#xydForm_m')));
                }
            }
        });

    });


//    企业注册类型写入
    $.ajax({
        url:'/systemmanager/xydsq/queryQydjzclx',
        type:'POST',
        success:function (data) {
            for(var  i = 0; i < data.data.length; i++) {
                $('<option value="' + data.data[i].CSDM + '">' + data.data[i].CSMC+ '</option>').appendTo($('[name="qydjzclxdm"]', $('#xydForm_m')));
            }
        }
    });
//    经营行业的写入
    $.ajax({
        url:'caiyunMobile/getIndustryType',
        type:'POST',
        success:function (data) {
            for(var  i = 0; i < data.data.length; i++) {
                $('<option value="' + data.data[i].szm + '">' + data.data[i].szm + '</option>').appendTo($('[name="jyhyMc"]', $('#xydForm_m')));
            }
        }
    });

//初始化显示表格
    function initTable(sqid) {

        $.post('/systemmanager/xydsq/xydsqQueryOne?sqid=' + sqid, function (result) {

            //     $('textarea[name="dkyt"]',$('#xydForm1')).val(result.data.dkyt);
            $('input[name="jkrqm"]', $('#xydForm_m')).val(result.data['jkrxm']);
            var sj = moment(result.data['lrrq']).format('YYYY-MM-DD ');
            var arrSj = sj.split('-');
            console.log(arrSj);
            $('input[name="year"]', $('#xydForm_m')).val(arrSj[0]);
            $('#xydQin').html(arrSj[0]-2);
            $('#xydQun').html(arrSj[0]-1);
            $('input[name="month"]', $('#xydForm_m')).val(arrSj[1]);
            $('input[name="day"]', $('#xydForm_m')).val(arrSj[2]);

            $.each(result.data, function (i, v) {
                $('[name="' + i + '"]', $('#xydForm_m')).not(':radio').val(result.data[i]);

                if (i == 'clsj')
                {
                    $('#xydClsjM').datepicker({
                        clearBtn: true,
                        format: 'yyyy-mm-dd',
                        autoclose: true,
                        language: 'zh-CN'
                    });
                    $('[name="clsj"]').val(moment(result.data.clsj).format('YYYY-MM-DD'));
                }
                //企业登记注册类型名称
                if(i == 'qydjzclxmc'){

                    $('option[value="'+result.data.qydjzclxdm +'"]',$('[name="qydjzclxmc"]', $('#xydForm_m'))).prop('selected','selected');
                }

                //经营行业
                if(i=='jyhyMc'){
                    $('option[value="'+result.data.jyhyMc +'"]',$('[name="jyhyMc"]', $('#xydForm_m'))).prop('selected','selected');
                }


                if (i == 'sqdkje') {
                    var a = result.data.sqdkje.toFixed(2);
                    $('input[name="sqdkje"]', $('#xydForm_m')).val(a);
                }

                if (i == 'jkrxb') {
                    if (result.data.jkrxb == 0) {
                        $('input[name="jkrxb"]', $('#xydForm_m')).val('男');
                    }
                    if (result.data.jkrxb == 1) {
                        $('input[name="jkrxb"]', $('#xydForm_m')).val('女');
                    }
                }

                if (i == 'jkrsfdm') {
                    provincedm = result.data.jkrsfdm;
                    // $('<option class="moren" selected value="' + result.data.jkrsfdm + '">' + result.data.jkrsfmc + '</option>').appendTo($('[name="jkrsfdm"]', $('#xydForm_m')));
                    $('option[value="'+provincedm +'"]',$('[name="jkrsfdm"]', $('#xydForm_m'))).prop('selected','selected');
                    $.ajax({
                        url:'/commonmanager/xzqy/xjXzqy?sjdm=' + provincedm,
                        async:false,
                        success:function (data) {
                            for(var  i = 0; i < data.length; i++) {
                                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('[name="jkrcsdm"]', $('#xydForm_m')));
                            }
                        }
                    });
                }

                if (i == 'jkrcsdm') {

                    citydm = result.data.jkrcsdm;
                    $('option[value="'+citydm +'"]',$('[name="jkrcsdm"]', $('#xydForm_m'))).prop('selected','selected');
                    $.ajax({
                        url:'/commonmanager/xzqy/xjXzqy?sjdm=' + citydm,
                        async:false,
                        success:function (data) {
                            for(var  i = 0; i < data.length; i++) {
                                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('[name="jkrxqdm"]', $('#xydForm_m')));
                            }
                        }
                    });
                }
                if (i == 'jkrxqdm') {
                    countydm = result.data.jkrxqdm;
                    $('option[value="'+countydm +'"]',$('[name="jkrxqdm"]', $('#xydForm_m'))).prop('selected','selected');

                }


                if (i == 'snkpje') {
                    var a = result.data.snkpje.toFixed(2);
                    $('input[name="snkpje"]', $('#xydForm_m')).val(a);
                }
                if (i == 'qnkpje') {
                    var a = result.data.qnkpje.toFixed(2);
                    $('input[name="qnkpje"]', $('#xydForm_m')).val(a);
                }

                if (i == 'sqqx') {
                    if (result.data.sqqx == 3) {
                        $('input[name="sqqx"]', $('#xydForm_m')).eq(0).prop('checked', 'checked');
                    }
                    if (result.data.sqqx == 6) {
                        $('input[name="sqqx"]', $('#xydForm_m')).eq(1).prop('checked', 'checked');
                    }

                    if (result.data.sqqx == 12) {
                        $('input[name="sqqx"]', $('#xydForm_m')).eq(2).prop('checked', 'checked');
                    }
                }
                if (i == 'qyxz') {

                    console.log(result.data.qyxz);
                    if (result.data.qyxz == 1) {
                        $('input[name="qyxz"]', $('#xydForm_m')).eq(0).prop('checked', 'checked');
                    }
                    if (result.data.qyxz == 2) {
                        $('input[name="qyxz"]', $('#xydForm_m')).eq(1).prop('checked', 'checked');
                    }

                    if (result.data.qyxz == 3) {
                        $('input[name="qyxz"]', $('#xydForm_m')).eq(2).prop('checked', 'checked');
                    }
                    if (result.data.qyxz == 4) {
                        $('input[name="qyxz"]', $('#xydForm_m')).eq(3).prop('checked', 'checked');
                    }
                    if (result.data.qyxz == 5) {
                        $('input[name="qyxz"]', $('#xydForm_m')).eq(4).prop('checked', 'checked');
                    }
                    if (result.data.qyxz == 6) {
                        $('input[name="qyxz"]', $('#xydForm_m')).eq(5).prop('checked', 'checked');
                    }
                    if (result.data.qyxz == 7) {
                        $('input[name="qyxz"]', $('#xydForm_m')).eq(6).prop('checked', 'checked');
                    }
                    if (result.data.qyxz == 8) {
                        $('input[name="qyxz"]', $('#xydForm_m')).eq(7).prop('checked', 'checked');
                    }
                    if (result.data.qyxz == 9) {
                        $('input[name="qyxz"]', $('#xydForm_m')).eq(8).prop('checked', 'checked');
                    }
                }


            });


        });
    }


    return {
        init: function (id) {
            $('[name="sqid"]','#xydForm_m').val(id);
            initTable(id);

            $.validator.addMethod("mobile", function (value, element) {
                var reg =  /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                return this.optional(element) || reg.test(value);
            },"请输入正确手机号码");
            $.validator.addMethod("IDsfz", function (value, element) {
                var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                return this.optional(element) || reg.test(value);
            },"请输入正确的身份证号码");
            $.validator.addMethod("nsrYZ", function (value, element) {
                var reg =  /^((?![a-zA-Z]*$)[a-zA-Z0-9]{15,18})$|(^\d{15,18}$)/;
                return this.optional(element) || reg.test(value);
            },"请输入正确的纳税人识别号");
            $.validator.addMethod("shuzi", function (value, element) {
                var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                return this.optional(element) || reg.test(value);
            },"请输入正确的金额");
            $("#xydForm_m").validate({
                onfocusout: function(element) { $(element).valid(); },
                rules: {
                    jkrxm:"required",
                    jkrsfzh:{
                        required:true,
                        IDsfz:true
                    },
                    jkrsfdm:"required",
                    jkrcsdm:"required",
                    nsrsbh:{
                        required:true,
                        nsrYZ:true
                    },
                    qymc:"required",
                    snkpje:{
                        required:true,
                        shuzi:true
                    },
                    qnkpje:{
                        required:true,
                        shuzi:true
                    },
                    jkrsjh: {
                        mobile:true,
                        required:true
                    }
                }
            });



        },
        setPath: function (path) {
            configMap.path = path;
        }
    }
}();