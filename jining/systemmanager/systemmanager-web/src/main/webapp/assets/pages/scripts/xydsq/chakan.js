/**
 * Created by MDW on 2018/1/23 0023.
 */
var chakan = function() {
    'use strict';
    var configMap = {};
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$container = $('#xydchakan_M');
        jqueryMap.$blockTarget = $('body');
    };
    setJqueryMap();

    $('#xydchakan_M').parents('.modal-dialog').css({
        width:1000
    });
//初始化显示表格
        function initTable(sqid){
        $.post('/systemmanager/xydsq/xydsqQueryOne?sqid='+sqid,function(result){

        //     $('textarea[name="dkyt"]',$('#xydForm1')).val(result.data.dkyt);
            $('input[name="jkrqm"]', $('#xydForm_m')).val(result.data['jkrxm']);
            var sj =moment(result.data['lrrq']).format('YYYY-MM-DD ');
            var arrSj =sj.split('-');
            console.log(arrSj);
            $('input[name="year"]', $('#xydForm_m')).val(arrSj[0]);
            $('input[name="month"]', $('#xydForm_m')).val(arrSj[1]);
            $('input[name="day"]', $('#xydForm_m')).val(arrSj[2]);
            $('#xydChakanQian',jqueryMap.$container).html(arrSj[0]-2);
            $('#xydChakanQu',jqueryMap.$container).html(arrSj[0]-1);
              $.each(result.data,function(i,v){
                  $('[name="'+i+'"]',$('#xydForm_m')).not(':radio').val(result.data[i]);

                  if(i=='sqdkje'){
                      var a = moneySplitByComma(result.data.sqdkje.toFixed(2));
                      $('input[name="sqdkje"]', $('#xydForm_m')).val(a);
                  }

                  if(i=='jkrxb') {
                      if (result.data.jkrxb == 0) {
                          $('input[name="jkrxb"]', $('#xydForm_m')).val('男');
                      }
                          if (result.data.jkrxb == 1) {
                              $('input[name="jkrxb"]', $('#xydForm_m')).val('女');
                          }
                  }
                    if(i == 'clsj'){
                      var t = moment(result.data.clsj).format('YYYY-MM-DD');
                        $('input[name="clsj"]', $('#xydForm_m')).val(t);

                        if(!result.data.clsj){
                            $('input[name="clsj"]', $('#xydForm_m')).val('');
                        }
                    }
                  if(i=='snkpje'){
                        var  a=0;
                      result.data.snkpje?a = moneySplitByComma(result.data.snkpje.toFixed(2)) : a=(a=0).toFixed(2);
                      // var a = moneySplitByComma(result.data.snkpje.toFixed(2));
                      $('input[name="snkpje"]', $('#xydForm_m')).val(a);


                  }
                  if(i=='qnkpje'){
                      var  a=0;
                      result.data.qnkpje?a = moneySplitByComma(result.data.qnkpje.toFixed(2)):a=(a=0).toFixed(2);
                     // var a = moneySplitByComma(result.data.qnkpje.toFixed(2));
                      $('input[name="qnkpje"]', $('#xydForm_m')).val(a);
                  }

                  if(i=='sqqx'){
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
                    if (i=='qyxz'){
                        console.info(result.data.qyxz);
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
    init:function(id,type){
       if (type == 'chakan'){
           $('.mustSign',jqueryMap.$container).hide();
           initTable(id);
       }
        $('#xydForm_m input,#xydForm_m textarea').prop({readonly:true});


    },
    setPath: function(path) {
        configMap.path = path;
    }
}
}();