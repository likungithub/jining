var goWorkList = function() {
    'use strict';

    // 全局属性参数
    var configMap = {
         
        path: ''
       
    };

   

    var close = function (id) {
    	//当前li标签id
    	var el = $("#tab-page-nav-" + id);
        var nextSelect = el.closest("li").prev('li:not(.dropdown)');
        if (nextSelect.length === 0) {
          nextSelect = el.closest("li").next('li:not(.dropdown)')
        }

        if (nextSelect.length === 0) {
          nextSelect = el.closest("ul.close-tab-nav")
            .children('li:not(.dropdown)')
            .last();
        }

        //标签移除
        el.remove();
        //内容移除
        $("#tab-page-content-" + id).remove();

        $('li[role = "presentation"].active').removeClass('active');
        $('div[role = "tabpanel"].active').removeClass('active');
        if (nextSelect.length > 0) {
          $(nextSelect).find('a').tab('show');
        }
      };
    
      var drop = function () {
	    if ($().tabdrop) {
	      $('.tabbable-tabdrop .nav-tabs').tabdrop('layout');
	    }
	  };
	  
	  var closeOther = function (id) {
	  	//当前li的ID
	  	var liId = "tab-page-nav-" + id;
	  	var el = $("#" + liId);
        
	  	$("#tab-page-nav-" + id).parent().children('li[role = "presentation"]').each(function(){
	  		var liId2 = $(this).attr("id");
	  		if(liId != liId2 && liId2 != "tab-page-nav-firstpage"){//不为当前的标签页和主页时
	  			var id2 = liId2.substring(13);
	  			 $("#"+liId2).remove();
	  	        $("#tab-page-content-" + id2).remove();
	  		}
	  	});
	  	
	  	el.find('a').tab('show');
      };

   
    var refresh = function(){
    	goWorkList.init();
    }

    
    return {
        init: function() {
            //派工界面
        	var kcyekqcurl = '/customermanage/customer/goWork.jsp';
        	$.get(kcyekqcurl, function(html) {
        		$('#goWork').html(html);
        	});
        	//派工查询界面
        	var khyekqcurl = '/customermanage/customer/goWorkSearch.jsp';
        	$.get(khyekqcurl, function(html) {
        		$('#goWorkSearch').html(html);
        	});

            
        	/*var divId = $("#goWorkList-manager-content").parent().attr("id");
		  	//当前li的ID
		  	var id = divId.substring(13); 
		  	
            var menu = new BootstrapMenu('#tab-page-nav-'+id, {
          	  actions: [{
          	      name: '关闭当前选项卡',
          	      onClick: function() {
          	    	  close(id);
          	      }
          	    }, {
          	      name: '关闭其他选项卡',
          	      onClick: function() {
          	    	  closeOther(id);
          	      }
          	    }, {
          	      name: '刷新该选项卡',
          	      onClick: function() {
          	        refresh();
          	      }
          	  }
          	 ]
          	});*/
            
        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();

$(".auto-table-area").on("mouseover", function(e) {
	$(".auto-table-area tr").unbind("mouseover").on("mouseover", function(e) {
		$(this).children("td").children("input.table-cell-style").addClass("table-cell-active");
	}).unbind("mouseout").on("mouseout", function(e) {
		$(this).children("td").children("input.table-cell-style").removeClass("table-cell-active");
	});
})
