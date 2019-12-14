/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment */

var messageView = function () {
  'use strict';

  var configMap = {
    path: '',
    getOrgUrl: '/systemmanager/messageremind/searchById',
    dataUrl: '/user/users/user/',
    id: ''
  };

  var jqueryMap = {
    $container: null
  };

  var getUser = function (id) {
    $.ajax({
        url: configMap.path + configMap.getOrgUrl + '/' + configMap.id,
        dataType: 'JSON',
        type: 'GET',
        success: function (data) {
        	
        	$('#messageTitle', jqueryMap.$container).text(data.txbt);
            $('#messageContent', jqueryMap.$container).text(data.txnr);
            $('#messageSource', jqueryMap.$container).text(data.fsry_mc);
            $('#time', jqueryMap.$container).text(moment(data.csrq).format('YYYY-MM-DD'));
            $('#readStat', jqueryMap.$container).text(data.ydzt_dm == 1 ? '已读' : '未读');
            if (data.jsdm != "" && data.jsdm != null){
      			var js = data.jsdm.split(',');
      			for(var i=0;i<js.length;i++){
      				jqueryMap.$container.find('span[id='+ js[i] +']').addClass("btnBlue colorfff");
      			}
      		}
        },
        error: function () {
          Messenger().post({
            message: '获取数据失败！',
            type: 'error'
          });
        }
      });
  };
  
  return {
    init: function (id) {
    	configMap.id = id;
    	getUser();
    },	
    setPath: function (path) {
      jqueryMap.$container = $('#messageview');
    }
  };
}();
//@ sourceURL=view.js