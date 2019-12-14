var addHclyNumList = function () {
    var uuid="";
    return {
       inint:function (u) {
            uuid=u;
       },
       getNum:function () {
           var num=$("#"+uuid+"LysqNum").val();
           return num;
       }
    }
}();