/*
 var configMap = {
 url: '',//
 dataUrl: '/contacts/contacts',//Controller类中的 @RequestMapping路径/方法名上方的@RequestMapping(value = "????", method = RequestMethod.GET)
 datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
 contactsGrid: null,
 };*/
var logo = $("#photo").attr("src");
var tabid = $('#messageBoard').parents('.tab-pane').attr('id').slice(17);

tabMenu(tabid);
LTLB();
$(".listHead li").on("click",function () {
    if($(this).attr("data")=="0"){
        $(".listHead li").removeClass("borderBottom");
        $(".listHead li:nth-child(1) i").attr("class","icon iconfont icon-huihua- mr").css("color","#0E9FF7");
        $(".listHead li:nth-child(2) i").attr("class","icon iconfont icon-kehuliebiaohuise- mr").css("color","#666");
        $(this).addClass("borderBottom");
        LTLB();
    }else{
        $(".listHead li").removeClass("borderBottom");
        $(".listHead li:nth-child(1) i").attr("class","icon iconfont icon-huihuahuise- mr").css("color","#666");
        $(".listHead li:nth-child(2) i").attr("class","icon iconfont icon-kehuliebiao- mr").css("color","#0E9FF7");
        $(this).addClass("borderBottom")
        khlb();
    }

})
$(".search").on("keyup",function () {
    var gsmc = $(".search input").val();
    if(gsmc == ""){
        $(".listHead li").each(function () {
            if($(this).hasClass("borderBottom")){
                if($(this).attr("data") == "0"){
                    LTLB()
                }else{
                    khlb()
                }
            }
        })
    }else{
        khlb(gsmc)
    }

})
function LTLB() {
    $.ajax({
        type: "post",
        url: "customermanage/SystemMessageController/getAllKhList",
        async: true,
        success: function (data) {
        	$('.messageUser').html(" ");
            if (data.data.length > 0) {
                $(data.data).each(function () {
                    var useName;
                    if(this.name.length>=10){
                        useName = this.name.substr(0, 9) + "...";
                    }else{
                        useName = this.name
                    }
                    if(this.ydzt !== 0){
                        var showHide = "messageShow";
                    }else{
                        var showHide = "";
                    }
                    if(this.img == ""){
                        var img = "securityassets/img/userLogo1.png";
                    }else{
                        var img = this.img;
                    }
                    var date = this.fssj.slice(5,10);
                    var userList = '<li useId = ' + this.id + '><div class="ltlb"><img src="' + img + '" /><div class="messageRed '+showHide+' message'+this.id+'"></div></div>' +
                        '<span class="userListName" title="'+this.name+'">' + useName + '</span><span class="date" style="float: right;margin-right: 4px;font-size: 2px;color: #999;">'+date+'</span>';
                    $('.messageUser').append(userList);
                })
            } else {
                if($(".messageMain").length == 0){
                    var noMessage = '<div class="messageMain">' +
                        '<img src="/customermanage/assets/pages/img/noMessage.png" alt="" class="nomessageImg"><p class="wordTop">打开世界的另一扇窗</p><p class="wordBottom">主动一点，世界会更大</p></div>';
                    $('#messageBoard').append(noMessage);

                }
                var noUser = '<div style="margin-top: 60px;"><p style="margin:  0;text-align: center;height: 72px;">'+
                    '<i class="icon iconfont icon-huihua- mr" style="font-size: 48px;margin-top:  30px;color: #ccc;"></i></p>'+
                    '<p style="margin: 0;text-align:  center;color: #ccc;">暂无消息</p> </div>';
                $(".messageUser").append(noUser);

            }

//		点击用户列表
            $('.messageUser li').on('click', function () {
                var clickThis = $(this);
                var useid = clickThis.attr("useid");
                var gsName = clickThis.find(".userListName").attr("title");
                clickThis.children("div").children("div").hide();
                $('.messageUser li').css("background", "#f5f5f5");
                // $('.messageUser li').css("border-left", "3px solid #f5f5f5");
                $('.messageMain').remove();
                $(this).css("background", "#ddd");
                // $(this).css("border-left", "3px solid #27a9f8");
                var clickId = $(this).attr('useId');
                var clickImg = $(this).children().children("img").attr('src');
                localStorage.setItem("clickId", clickId);
                $('.messageMain').remove();
//			插入右侧样式
                var messageMain = '<div class="messageMain">' +
                    '<p class="userName" userid = '+useid+'>'+gsName+'</p>' +
                    '<div class="messageMain-top"></div></p>' +
                    '<div class="messageMain-bottom">' +
                    '<textarea class="messageIpt" placeholder="输入文字"></textarea>' +
                    '<a class="sendBtn" href="#" onclick="sendMessage()">发送</a></div>';

                $('#messageBoard').append(messageMain)
                $(".messageIpt").on("keyup",function (e) {
// 回车键事件

                    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
                    if (eCode == 13){
                        sendMessage();
                    }
                });
//			请求用户消息
                $.ajax({
                    type: "post",
                    url: "customermanage/SystemMessageController/getLtxx",
                    async: true,
                    data: {
                        jsrid: clickId
                    },
                    success: function (data) {
                        $(data.data.ltxx).each(function () {
                            if (this.self == '') {
                                var messageMain =
                                    '<p class="messageTime">' + this.date + '</p>' +
                                    '<div class="userLeft"><img src="' + clickImg + '" alt="" />' +
                                    '<p class="message" ><span><em></em></span>' + this.text + '</p>' +
                                    '<div class="clear"></div></div>';

                                $('.messageMain-top').append(messageMain)
                            } else {
                                var admainMessage = '<p class="messageTime">' + this.date + '</p>' +
                                    '<div class="userRight">' +
                                    '<img src="' + logo + '" alt="" />' +
                                    '<p class="message" ><span><em></em></span>' + this.text + '</p>' +
                                    '<div class="clear"></div></div>';
                                $('.messageMain-top').append(admainMessage);
                            }
                        })
                        $('.messageMain-top').scrollTop( 15000000000);
                    }
                });


            })

        }
    });
}

function khlb(data1) {
    var urlType;
    if(data1 !== undefined){
        urlType = "customermanage/SystemMessageController/getAllKh?gsmc=" + data1;
    }else{
        urlType = "customermanage/SystemMessageController/getAllKh"
    }
    $.ajax({
        type: "post",
        url: urlType,
        async: true,
        success: function (data) {
        	$('.messageUser').html(" ");
            if (data.data.length > 0) {
                $(data.data).each(function () {
                    var useName;
                    if(this.name.length>=10){
                        useName = this.name.substr(0, 9) + "...";
                    }else{
                        useName = this.name
                    }
                    if(data.data.ydzt == 0){
                        var showHide = messageShow;
                    }else{
                        var showHide = "";
                    }
                    if(this.img == ""){
                        var img = "securityassets/img/userLogo1.png";
                    }else{
                        var img = this.img;
                    }
                    var userList = '<li useId = ' + this.id + '><div class="ltlb"><img src="' + img + '" /><div class="messageRed '+showHide+' message'+this.id+'"></div></div>' +
                        '<span class="userListName" title="'+this.name+'">' + useName + '</span>';
                    $('.messageUser').append(userList);
                })
            } else {
                if($(".messageMain").length == 0){
                    var noMessage = '<div class="messageMain">' +
                        '<img src="/customermanage/assets/pages/img/noMessage.png" alt=""  class="nomessageImg"><p class="wordTop">打开世界的另一扇窗</p><p class="wordBottom">主动一点，世界会更大</p></div>';
                    $('#messageBoard').append(noMessage);
                }
                var noUser = '<div style="margin-top: 60px;"><p style="margin:  0;text-align: center;height: 72px;">'+
                    '<i class="icon iconfont icon-huihua- mr" style="font-size: 48px;margin-top:  30px;color: #ccc;"></i></p>'+
                    '<p style="margin: 0;text-align:  center;color: #ccc;">暂无消息</p> </div>';
                $(".messageUser").append(noUser);
            }

//		点击用户列表
            $('.messageUser li').on('click', function () {
                var clickThis = $(this);
                var useid = clickThis.attr("useid");
                var gsName = clickThis.find(".userListName").attr("title");
                clickThis.children("div").children("div").hide();
                $('.messageUser li').css("background", "#f5f5f5");
                // $('.messageUser li').css("border-left", "3px solid #f5f5f5");
                $('.messageMain').remove();
                $(this).css("background", "#ddd");
                // $(this).css("border-left", "3px solid #27a9f8");
                var clickId = $(this).attr('useId');
                var clickImg = $(this).children().children("img").attr('src');
                localStorage.setItem("clickId", clickId);
                $('.messageMain').remove();
//			插入右侧样式
                var messageMain = '<div class="messageMain">' +
                    '<p class="userName" userid = '+useid+'>'+gsName+'</p>' +
                    '<div class="messageMain-top"></div></p>' +
                    '<div class="messageMain-bottom">' +
                    '<textarea class="messageIpt" placeholder="输入文字"></textarea>' +
                    '<a class="sendBtn" href="#" onclick="sendMessage()">发送</a></div>';

                $('#messageBoard').append(messageMain)
                $(".messageIpt").on("keyup",function (e) {
// 回车键事件

                    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
                    if (eCode == 13){
                        sendMessage();
                    }
                });
//			请求用户消息
                $.ajax({
                    type: "post",
                    url: "customermanage/SystemMessageController/getLtxx",
                    async: true,
                    data: {
                        jsrid: clickId
                    },
                    success: function (data) {
                        $(data.data.ltxx).each(function () {
                            if (this.self == '') {
                                var messageMain =
                                    '<p class="messageTime">' + this.date + '</p>' +
                                    '<div class="userLeft"><img src="' + clickImg + '" alt="" />' +
                                    '<p class="message" ><span><em></em></span>' + this.text + '</p>' +
                                    '<div class="clear"></div></div>';

                                $('.messageMain-top').append(messageMain)
                            } else {
                                var admainMessage = '<p class="messageTime">' + this.date + '</p>' +
                                    '<div class="userRight">' +
                                    '<img src="' + logo + '" alt="" />' +
                                    '<p class="message" ><span><em></em></span>' + this.text + '</p>' +
                                    '<div class="clear"></div></div>';
                                $('.messageMain-top').append(admainMessage);
                            }
                        })
                        $('.messageMain-top').scrollTop( 15000000000);
                    }
                });


            })

        }
    });
}
//点击发送
function sendMessage() {
    if (!$('.messageIpt').val()) {
        var messageNull = '<div class="messageNull">' +
            '<p class="message" ><span><em></em></span>消息不能为空！</p></div>';
        $('.messageMain-bottom').append(messageNull);
        $('.messageIpt').val("");
        setTimeout(function () {
            $('.messageNull').remove()
        }, 2000);

    }else if(javaTrim($('.messageIpt').val().replace(/\n/g,'')) == ""){
        var messageNull = '<div class="messageNull">' +
            '<p class="message" ><span><em></em></span>不能发送空白消息！</p></div>';
        $('.messageMain-bottom').append(messageNull);
        $('.messageIpt').val("");
        setTimeout(function () {
            $('.messageNull').remove()
        }, 2000);

    } else {
        var messageWord = $('.messageIpt').val();

        var myMessage = '<div class="userRight">' +
            '<img src="' + logo + '" alt="" />' +
            '<p class="message" ><img class="sendFail" src="/customermanage/assets/pages/img/fail.gif"><img class="sendState" src="/customermanage/assets/pages/img/loadding.gif"><span><em></em></span>' + messageWord + '</p>' +
            '<div class="clear"></div></div>';
        $('.messageMain-top').append(myMessage);
        $('.messageMain-bottom textarea').val('')
        $.ajax({
            type: "post",
            url: "/caiyunMobile/dl/addLtxx",
            async: true,
            data: {
                text: messageWord,
                jsrid: localStorage.getItem("clickId")
            },
            success: function (data) {

                if (data.message == "成功") {
                    $('.sendState').css('display', 'none')
                } else {
                    $(".userRight").each(function () {
                        if ($(this).children('.message').children('.sendState').css('display') == 'block') {
                            $(this).children('.message').children('.sendState').css('display', "none")
                            $(this).children('.message').children('.sendFail').css('display', "block")
                        }
                    })
                }
                $('.messageMain-top').scrollTop(3000000000);
            }
        });
    }

}

function javaTrim(str) {
    for (var i=0; (str.charAt(i)==' ') && i<str.length; i++);
    if (i == str.length) return ''; //whole string is space
    var newstr = str.substr(i);
    for (var i=newstr.length-1; newstr.charAt(i)==' ' && i>=0; i--);
    newstr = newstr.substr(0,i+1);
    return newstr;
}
/*搜索*/
$('.search input').on("input", function () {
    var searchVal = $(this).val();
    $('.messageUser li .userListName').each(function () {
        if (searchVal == "") {
            $(this).parent().css('display', "block")
        } else {
            $(this).parent().css('display', "none")
        }
        if (searchVal == $(this).text()) {
            $(this).parent().css('display', "block")
        }
    })
})



/*return {
 init: function (e) {
 //setJqueryMap(uuid);
 configMap.url = e;
 initcontactsGrid();
 initcontactsData();
 $('#searchFilter', jqueryMap.$container).on('keyup', function () {
 configMap.contactsGrid.search(this.value).draw();
 });
 },
 setPath: function (path) {

 }
 };*/

