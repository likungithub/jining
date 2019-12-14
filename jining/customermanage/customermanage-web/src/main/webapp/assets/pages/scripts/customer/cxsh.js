/*global $, App, moment */

var cxshView = function () {
    'use strict';

    var configMap = {
        path: '',
        getOrgUrl: '/organization/organization/org',
        dataUrl: '/customermanage/customerManage/customer',
        id: '',
        customerId:'',
        imgUrl: '/customermanage/customer/showfile.jsp',
        dateUrl: '/customermanage/customerManage/getDays'

    };

    var jqueryMap = {
        $container: null
    };

    var cxShOperation = function (callback) {
    	var choosed = jqueryMap.$container.find('input.btnBlue'); //被选择的
    	if (choosed == null || choosed.length === 0) {
    		Messenger().post({message: '请选择撤回类型！',type: 'error'});
    		return false;
    	}
    	var choosedcode = '';
    	choosed.each(function(){
    		choosedcode = choosedcode + $(this)[0].name + ",";
    	});
    	
    	callback(choosedcode);
    }

    return {
        init: function (id,customerId) {
           
        	$('input').off().on('click', function(){
        		if ($(this).hasClass("btnBlue colorfff")) {
        			$(this).removeClass("btnBlue colorfff");
        		} else {
        			$(this).addClass("btnBlue colorfff");
        		}
        	});

        },
        setPath: function (path) {
            jqueryMap.$container = $('#cxsh-manager-view-data');
        },
        cxShOperation: function (callback) {
        	cxShOperation(callback);
        }
    };
}();
//@ sourceURL=view.js