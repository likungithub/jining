var interactive = function () {
    'use strict';
    // 全局属性参数
    $('#customerManageEditForm').parents('.modal-dialog').css('width','900px');
    var configMap = {
        path: '',
        khdm:'',
        id:''
    };
    // 全局Dom
    var jqueryMap = {
        $container:null
    };
    //设置模态框的宽度
    $('#allWrapcommunicationRecord').parents('.modal-dialog').css('width',820);
    var setJqueryMap = function () {
        jqueryMap.$container = $('#allWrapcommunicationRecord');
    };
    var openModal = function (title, url, type, func) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 增&nbsp;加 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        }

        $.get(url, function (html) {
            jqueryMap.$khflAddDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    }

    //打开沟通记录的时候进行展示
    var firstRender = function(dm){
        $.get('/customermanage/gtxx/getAllGtxx/'+dm,function(d){
            $.each(d.data,function(i,v){
                var ind = i;
                var pic = v.grtx?v.grtx:'http://cloud-manager.oss-cn-beijing.aliyuncs.com/avatar/default2.png';
                $(
                    '<div class="floorHost pull-left animated bounceInDown floorHostFont floorHostFont-chat-item" style="margin: 10px 0;width: 100%;">'+
                    '<div class="info" style="position:relative;margin-left: 60px">'+
                    '<img src="'+pic+'" alt="头像">'+
                    '<div class="mainInfo">'+
                    '<div class="wrap1 clearfix" style="width: 600px;">'+
                    '<span class="hostName mr">'+v.name+'</span>'+
                    '<span class="hostTime">'+moment(v.lrrq).format ('YYYY-MM-DD HH:mm')+'</span>'+
                    '<a data-mykhmc="'+v.khmc+'"  data-myhfzydm="'+v.lrry+'" data-myname="'+v.name+'" data-sfid="'+v.id+'" href="javascript:void(0)" class="pull-right replyInfo replyFont" style="margin-right: 10px">回复</a>'+
                    '</div>'+
                    '<div class="wrap2">'+
                    '<div class="timeInfo">'+
                    '<span>沟通时间：</span>'+
                    '<span>'+moment(v.gtsj).format ('YYYY-MM-DD HH:mm')+'</span>'+
                    '</div>'+
                    '<div class="infoContent">'+
                    '<div style="word-wrap: break-word;word-break: normal;">'+
                   v.gtxx+
                    '</div>'+
                    '</div>'+
                    '<div class="Enclosure">'+
                    '<div class="files-content" filesurl=""></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'
                ).appendTo($('#allWrapcommunicationRecord>.top'));
                addChatFiles(this.data,1)
                if(v.list){
                    $.each(v.list,function(i,v){
                        $(
                            '<div class="replyInfo floorHostFont-chat-item" style="margin: 10px 0">'+
                            '<div class="replyTop clearfix">'+
                            '<span class="mr">'+v.lrmc+'回复'+v.hfxm+'</span>'+
                            '<span>'+moment(v.lrrq).format ('YYYY-MM-DD HH:mm')+'</span>'+
                            '<a  data-mykhmc="'+v.khmc+'"  data-myhfzydm="'+v.lrry+'" data-myname="'+v.name+'"  data-sfid="'+v.id+'" href="javascript:void(0)" class="pull-right replyInfo replyFont" >回复</a>'+
                            '</div>'+
                            '<div class="replyMid">'+
                            '<div class="replyFont" style="word-wrap: break-word;word-break: normal;">'+
                             v.hfxx+
                            '</div>'+
                            '</div>'+
                            '<div class="replyEnclosure">'+
                            '<div class="files-content" filesurl=""></div>'+
                            '</div>'+
                            '</div>'
                        ).appendTo($('#allWrapcommunicationRecord>.top>.floorHost:eq('+ind+')>.info'))
                        if(this.data.length != 0){
                            addChatFiles(this.data,1)
                        }
                    })
                }

            })

        });
    }

    //回复信息
    var replyInfo=function(){
        jqueryMap.$container.on('click','a.replyInfo[data-sfid]',function(){
            var _this = this;
            $('#communicationRecordsign',jqueryMap.$container).val('1');
            localStorage.setItem('replyhfxm',$(_this).attr('data-myname'));
            localStorage.setItem('replyhfzydm',$(_this).attr('data-myhfzydm'));
            $('#communicationRecordtextarea',jqueryMap.$container).attr('placeholder','正在回复'+$(this).attr('data-myname'));

                //这是回复id
                $('#communicationRecordsign1').val($(this).attr('data-sfid'));
            if($(this).parents('.mainInfo').length>0){
                //回复楼主
                //这是所属id
                $('#communicationRecordsign2').val($(_this).attr('data-sfid'));
                $('#communicationRecordhflx').val('002');
            }else{
                //回复的回复
                var a = $(_this).parents('.replyInfo').siblings('.mainInfo').find('a.replyInfo[data-sfid]').attr('data-sfid');
                $('#communicationRecordsign2').val(a);
                $('#communicationRecordhflx').val('003');
            }


        })
    }


    //删除当前人的信息
    var delInfo = function(){
        jqueryMap.$container.on('click','i.myclose.currentPer',function(){
            var clickThis = this;
            var id = $(this).attr('data-id');
            var hflx = $(this).parents('.currentsubmitter ').attr('data-hflx');
            $.post('/customermanage/gtxx/delGtxx/'+id+'/'+hflx,function(d){
                    if(d.success){
                    //    删除附件 $(".floorHostFont-chat-item:last").find(".files-content").attr("filesurl",usefulFileUrl);
                        var FilesUrl =$(clickThis).parents(".floorHostFont-chat-item").find(".files-content").attr("filesurl");
                        var data = {}
                        if(FilesUrl!="" && FilesUrl != undefined){
                            data.fjUrl = FilesUrl;
                        }
                        $.ajax({
                            url: '/customermanage/gtxx/delFJ',
                            dataType: 'JSON',
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify(data),
                            type: 'POST',
                            success:function (response) {
                                if(response.success){
                                    $('.currentsubmitter[data-id="'+id+'"]').remove();
                                }
                            }

                        })
                    }else{
                        alert('删除失败')
                    }
            });
        })
    }
//商机跟进添加文件 单文件或多个文件
    function addChatFiles(data,addposition) {//addposition->0添加新文件  addposition->1沟通记录内添加文件
        if(data.length){//多文件
            $(data).each(function (i,obj) {
                addChatFilesProcess(obj,addposition);
            })
        }else if(data.length==0){
            return false;
        }else{//单条文件信息
            addChatFilesProcess(data,addposition);
        }
    }
    //单条文件录入过程
    function addChatFilesProcess(data,addposition) {//addposition->0添加新文件  addposition->1沟通记录内添加文件
        var FilesStr = "";
        var closeBtn = "";
        var FilesUrl=data.data+"……"+data.fileName;
        var ifImg = GetFileExt(data.fileName);
        if(ifImg==".png"||ifImg==".jpg"){
            FilesStr+='<p class="chat-item-files" FilesUrlItem="'+data.data+'……'+data.fileName+'" title="'+data.fileName+'"><a href="'+data.data+'" target="_blank"><img src="'+data.data+'" alt="'+data.fileName+'" ></a><span>'+data.fileName+'</span></p>'
        }else{
            FilesStr+='<p class="chat-item-files" FilesUrlItem="'+data.data+'……'+data.fileName+'" title="'+data.fileName+'"><a href="'+data.data+'" target="_blank"><i class="iconfont icon-genjinguanli" style="font-size: 20px;"></i></a><span>'+data.fileName+'</span></p>'
        }
        if(addposition == 0){
            $(".allWrapcommunicationRecord-files").append(FilesStr);
            var oldFileUrl = $(".allWrapcommunicationRecord-files").attr("FilesUrl");
            if(oldFileUrl!=""){
                var usefulFileUrl=oldFileUrl+","+FilesUrl
            }else{
                var usefulFileUrl=FilesUrl
            }
            $(".allWrapcommunicationRecord-files").attr("FilesUrl",usefulFileUrl);
            closeBtn+='<b class="chat-item-filesclose">x</b>'
            $(".allWrapcommunicationRecord-files .chat-item-files").append(closeBtn)
            $(".allWrapcommunicationRecord-files .chat-item-files .chat-item-filesclose").click(function () {
                $(".allWrapcommunicationRecord-files").attr("FilesUrl",delFilesUrl($(this).parents(".chat-item-files").attr("FilesUrlItem"),$(this).parents(".chat-item-files")))
                $(this).parents(".chat-item-files").remove()
            })
        }else if(addposition == 1){//聊天窗口内插入图片
            $(".floorHostFont-chat-item:last").find(".files-content").append(FilesStr)
            $(".floorHostFont-chat-item:last").find(".chat-item-files").attr("followUpid",data.followUpId)
            $(".floorHostFont-chat-item:last").find(".chat-item-files").attr("imgid",data.id)
            // $(".floorHostFont-chat-item:last").find(".files-content").attr("FilesUrl",FilesUrl);
            var oldFileUrl = $(".floorHostFont-chat-item:last").find(".files-content").attr("filesurl");
            if(oldFileUrl!=""){
                var usefulFileUrl=oldFileUrl+","+FilesUrl
            }else{
                var usefulFileUrl=FilesUrl
            }
            $(".floorHostFont-chat-item:last").find(".files-content").attr("filesurl",usefulFileUrl)
        }
    }
    //字符转转数组删除某元素再转回去
    function delFilesUrl(data,Dom) {
        var FilesUrl =$(Dom).parents(".allWrapcommunicationRecord-files").attr("FilesUrl");
        var fileUrl = FilesUrl.split(",")
        for(var i=0; i<fileUrl.length; i++) {
            if(fileUrl[i] == data) {
                fileUrl.splice(i, 1);
                break;
            }
        }
        return fileUrl.join(",")
    }
    //取文件后缀名
    function GetFileExt(filepath) {
        if (filepath != "") {
            var pos = "." + filepath.replace(/.+\./, "");
            return pos;
        }
    }
    //发送按钮
    function  savemessages() {
        var blockTarget = $("#allWrapcommunicationRecord")
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var FilesUrl =$(".allWrapcommunicationRecord-files").attr("FilesUrl");
        if(!$('#communicationRecordtextarea').val()){
            if (FilesUrl == undefined || FilesUrl == "") {
                App.unblockUI(blockTarget);
                Messenger().post({message: '请输入内容！', type: 'warning'});
                return false;
            }
        }
        var d = {};
        var hflx;
        d.khbm = configMap.khdm;//'<%=khdm%>'
        d.gtxx = $('#communicationRecordtextarea').val() == null? '':$('#communicationRecordtextarea').val();
//                   回复的时候做一下区分
        if($('#communicationRecordsign').val()== 0 ){ //评论
            hflx = '001';
            d.hfid = 0;
            d.ssid = 0;
            d.hfxm =  '';
            d.khmc =  localStorage.getItem('mdw_khmc');
            d.hfzydm = '';
        }else{ //回复
            hflx = $('#communicationRecordhflx').val();
            d.hfid = $('#communicationRecordsign1').val();
            d.ssid = $('#communicationRecordsign2').val();
            d.khmc =  localStorage.getItem('mdw_khmc');
            d.hfxm = localStorage.getItem('replyhfxm');
            d.hfzydm = localStorage.getItem('replyhfzydm');
        }
        d.if_tx = $('#checkboxRemind').is(':checked')?1:0;
        if(FilesUrl!="" && FilesUrl != undefined){
            d.fjUrl = FilesUrl;
        }
        $('#communicationRecordsign').val('0');
        var gtsj = $('#communicateTime').val();
        $.ajax({
            url:'/customermanage/gtxx/addGtxx/' + gtsj+'/'+hflx+'/'+configMap.id ,
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify(d),
            type:'POST',
            success:function(d){
                App.unblockUI(blockTarget);
                var pic = d.data.grtx?d.data.grtx:'http://cloud-manager.oss-cn-beijing.aliyuncs.com/avatar/default2.png';
                if(d.type==1){
                    $(
                        '<div data-hflx="'+hflx +'" data-id='+d.data.id+' class="currentsubmitter pull-right animated bounceInDown floorHostFont-chat-item" FilesUrl="" style="padding: 10px 0;width: 600px;margin-right: 60px;position: relative;line-height:20px;clear:both;">'+
                        '<img src="'+pic+'" alt="头像">'+
                        '<div class="clearfix">'+
                        '<span class="pull-right">'+moment(d.data.lrrq).format ('YYYY-MM-DD HH:mm')+'</span>'+
                        '</div>'+
                        '<div class="publishContent">'+
                        '<div class="clearfix" style="margin-top: -5px;">'+
                        '<i class="fa fa-times myclose currentPer" data-id='+d.data.id +'></i>'+
                        '<span class="pull-right">沟通时间：'+
                        moment(d.data.gtsj).format ('YYYY-MM-DD HH:mm')+
                        '</span>'+
                        '</div>'+
                        '<div class="text-right">'+
                        '<div style="word-wrap: break-word;word-break: normal;">'+d.data.gtxx+'</div>'+
                        '</div>'+
                        '<div class="text-right">'+
                        '<div class="files-content" filesurl=""></div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'
                    ).appendTo($('#allWrapcommunicationRecord>.top'));
                    addChatFiles(d.data.data,1)
                    $('#allWrapcommunicationRecord>.top').scrollTop( $('#allWrapcommunicationRecord>.top')[0].scrollHeight);
                    $('#communicationRecordtextarea').attr('placeholder','请输入沟通记录').val('');
//                                文件移除
                    $('.allWrapcommunicationRecord-files').find(".chat-item-files").remove();
                    $('.allWrapcommunicationRecord-files').attr("filesurl","");
                    //                    可输入字体数恢复到300
                    $('#communicationRecordtextareaWords').html(300);
                }else{
                    $('#allWrapcommunicationRecord>.top').empty();
                    $.each(d.data,function(i,v){
                        var ind = i;
                        var pic = v.grtx?v.grtx:'http://cloud-manager.oss-cn-beijing.aliyuncs.com/avatar/default2.png';
                        $(
                            '<div class="floorHost pull-left animated bounceInDown floorHostFont-chat-item" FilesUrl="" style="margin: 10px 0;width: 100%;">'+
                            '<div class="info" style="position:relative;margin-left: 60px">'+
                            '<img src="'+pic+'" alt="头像">'+
                            '<div class="mainInfo">'+
                            '<div class="wrap1 clearfix" style="width: 600px;">'+
                            '<span class="hostName mr">'+v.name+'</span>'+
                            '<span class="hostTime">'+moment(v.lrrq).format ('YYYY-MM-DD HH:mm')+'</span>'+
                            '<a data-mykhmc="'+v.khmc+'"  data-myhfzydm="'+v.lrry+'" data-myname="'+v.name+'" data-sfid="'+v.id+'" href="javascript:void(0)" class="pull-right replyInfo replyFont" style="margin-right: 10px">回复</a>'+
                            '</div>'+
                            '<div class="wrap2">'+
                            '<div class="timeInfo">'+
                            '<span>沟通时间：</span>'+
                            '<span>'+moment(v.gtsj).format ('YYYY-MM-DD HH:mm')+'</span>'+
                            '</div>'+
                            '<div class="infoContent">'+
                            '<div style="word-wrap: break-word;word-break: normal;">'+
                            v.gtxx+
                            '</div>'+
                            '</div>'+
                            '<div class="Enclosure">'+
                            '<div class="files-content" filesurl=""></div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'
                        ).appendTo($('#allWrapcommunicationRecord>.top'));
                        addChatFiles(this.data,1)
                        if(v.list){
                            $.each(v.list,function(i,v){
                                $(
                                    '<div class="replyInfo floorHostFont-chat-item" FilesUrl="" style="margin: 10px 0">'+
                                    '<div class="replyTop clearfix">'+
                                    '<span class="mr">'+v.lrmc+'回复'+v.hfxm+'</span>'+
                                    '<span>'+moment(v.lrrq).format ('YYYY-MM-DD HH:mm')+'</span>'+
                                    '<a  data-mykhmc="'+v.khmc+'"  data-myhfzydm="'+v.lrry+'" data-myname="'+v.name+'"  data-sfid="'+v.id+'" href="javascript:void(0)" class="pull-right replyInfo replyFont" >回复</a>'+
                                    '</div>'+
                                    '<div class="replyMid">'+
                                    '<div  class="replyFont" style="word-wrap: break-word;word-break: normal;">'+
                                    v.hfxx+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="replyEnclosure">'+
                                    '<div class="files-content" filesurl=""></div>'+
                                    '</div>'+
                                    '</div>'
                                ).appendTo($('#allWrapcommunicationRecord>.top>.floorHost:eq('+ind+')>.info'))
                                if(this.data.length != 0){
                                    addChatFiles(this.data,1)
                                }
                            })
                        }

                    })

                    $('#communicationRecordtextarea').attr('placeholder','请输入沟通记录').val('');
//                                文件移除
                    $('.allWrapcommunicationRecord-files').find(".chat-item-files").remove();
                    $('.allWrapcommunicationRecord-files').attr("filesurl","");
                    //                    可输入字体数恢复到300
                    $('#communicationRecordtextareaWords').html(300);

                }


            }
        })
        // return false;
    }
    //发送按钮点击
    $("#communicationRecord-save").click(function () {
        savemessages();
    })
    //输入框获取焦点失去焦点
    $("#communicationRecordtextarea").focus(function () {
        $(".allWrapcommunicationRecord-files").addClass("active")
    })
    $("#communicationRecordtextarea").blur(function () {
        $(".allWrapcommunicationRecord-files").removeClass("active")
    })
    // var FilesUrl =$(".allWrapcommunicationRecord-files").attr("FilesUrl");
    // if(FilesUrl!=""){
    //     var fileUrl = FilesUrl.split(",");// 在每个逗号(,)处进行分解。
    // }else{
    //     var fileUrl = ""
    // }
    return {
        // 初始化
        init: function (khdm, id) {
            configMap.khdm = khdm;
            configMap.id = id;
            setJqueryMap();
            replyInfo();
            delInfo();
            var date = new Date();
            var date1 = moment(date.getTime()).format('YYYY-MM-DD HH:mm');
            $("#communicateTime",jqueryMap.$container).val(date1);
            $("#communicateTime",jqueryMap.$container).datetimepicker({
                dateformat: 'yyyy-mm-dd',
                timeFormat: 'HH24:mm:ss',//格式化时间
                language: 'zh-CN',
                weekStart: 1,
                autoclose: true,
                todayHighlight: false,
                startView: 2,
                minView: 0,  //Number, String. 默认值：0, 'hour'，日期时间选择器所能够提供的最精确的时间选择视图。
                minuteStep:1,
                pickerPosition: "top-left",
                clearBtn:false,//清除按钮
            }).on('show',function(){
                $('div.datetimepicker.datetimepicker-dropdown-bottom-right.dropdown-menu').find('th.prev').children('i').removeClass('glyphicon');
                $('div.datetimepicker.datetimepicker-dropdown-bottom-right.dropdown-menu').find('th.next').children('i').removeClass('glyphicon');
            });

            $('#communicateTimeBtn',jqueryMap.$container).click(function(){
                $("#communicateTime",jqueryMap.$container).trigger('focus');
            });

        //    上传附件的按钮
            $('#communicateAddFilesBtn',jqueryMap.$container).click(function(){
                //openModal('上传文件','/customermanage/mybusiness/addFiles.jsp?type=gtfj')

                var dialogButtons = {};
                dialogButtons.success = {
                    label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                    className: "btn btn-default btnBlue borderRadius4 colorfff",
                    callback: function() {
                        var file=$('#opportunityFlagFile').get(0).files[0];
                        if(file){
                            if(!file.name.endsWith("doc")&&!file.name.endsWith("pdf")&&!file.name.endsWith("jpg")&&!file.name.endsWith("png")&&!file.name.endsWith("gif")&&!file.name.endsWith("xls")&&!file.name.endsWith("zip")&&!file.name.endsWith("docx")&&!file.name.endsWith("xlsx")){
                                Messenger().post({
                                    message : "请上传doc/pdf/jpg/png/gif/xls/zip/docx/xlsx格式的文件",
                                    type: 'error'
                                });
                                return false;
                            }
                        }else{
                            Messenger().post({
                                message : "请上传文件",
                                type: 'error'
                            });
                            return false;
                        }
                        var url = '/customermanage/gtxx/addfile';
                        var inputform = {
                            url: url,
                            type: "POST",
                            dataType: 'json',
                            headers: {"ClientCallMode": "ajax"}, //添加请求头部
                            success: function (data) {
                                if (data.success) {
                                    addChatFiles(data,0)
                                } else {
                                    Messenger().post({
                                        message: data.message,
                                        type: 'error'
                                    });
                                }
                            },
                        };
                        $("#opportunityFlagFileForm").ajaxSubmit(inputform);
                    }
                };
                dialogButtons.cancel = {
                    label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                    className: 'btn btn-default borderRadius4 color666'
                };
                $.get("/customermanage/mybusiness/addFiles.jsp", function(html) {
                    jqueryMap.$setlogo = bootbox.dialog({
                        title: '选择附件',
                        message: html,
                        buttons: dialogButtons
                    });
                });
            });

            firstRender(khdm)
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        }
    }
}();