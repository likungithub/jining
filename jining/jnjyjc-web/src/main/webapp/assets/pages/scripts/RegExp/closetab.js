/**
 * @Author: shanliang
 * @Description:删除任务缓存
 * @Date:2017-12-09 10:48
 **/
function clearRWlocalstore() {
    localStorage.removeItem("khmbsmc");
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if ((key + "").startsWith("cjrw_")) {
            localStorage.removeItem(key);
        }
    }
}


/**
 * Created by MDW on 2017/8/30 0030.
 */
function closeTAB(id) {
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


function tabMenu(id) {
    var menu = new BootstrapMenu('#tab-page-nav-' + id, {
        actions: [{
            name: '关闭当前选项卡',
            onClick: function () {
                close(id);
            }
        }, {
            name: '关闭其他选项卡',
            onClick: function () {
                closeOther(id);
            }
        },
            //     {
            //     name: '刷新该选项卡',
            //     onClick: function () {
            //         refresh();
            //     }
            // }
        ]
    });


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

    var closeOther = function (id) {
        //当前li的ID
        var liId = "tab-page-nav-" + id;
        var el = $("#" + liId);

        $("#tab-page-nav-" + id).parent().children('li[role = "presentation"]').each(function () {
            var liId2 = $(this).attr("id");
            if (liId != liId2 && liId2 != "tab-page-nav-firstpage") {//不为当前的标签页和主页时
                var id2 = liId2.substring(13);
                $("#" + liId2).remove();
                $("#tab-page-content-" + id2).remove();
            }
        });

        el.find('a').tab('show');
    };
    // if(fnName){
    //     var refresh = function () {
    //         fnName.init();
    //     };
    // }

}
