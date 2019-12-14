var addHcthNumList = function () {
    var uuid="";
    return {
       inint:function (u) {
            uuid=u;
       },
       getNum:function () {
           var num=$("#"+uuid+"HcthNum").val();
           return num;
       }
    }
}();