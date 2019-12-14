var addCykcslList = function () {
    var uuid="";
    return {
       inint:function (u) {
            uuid=u;
       },
       getNum:function () {
           var num=$("#"+uuid+"cykcsl").val();
           return num;
       }
    }
}();