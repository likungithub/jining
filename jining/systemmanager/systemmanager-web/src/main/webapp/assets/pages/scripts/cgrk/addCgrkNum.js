var addCgrkNumList = function () {
    var uuid="";
    return {
       inint:function (u) {
            uuid=u;
       },
       getNum:function () {
           var num=$("#"+uuid+"cgrkNum").val();
           return num;
       }
    }
}();