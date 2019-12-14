<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<div id="nametree" style="float: left;width: 15%;height:calc(100% - 94px);"> tree</div>
<div style="float: left;width: 85%;height:100%;">
<iframe id="modeledit" name="modeledit" scrolling="auto" frameborder="0" src="<%=request.getContextPath()%>/pageconfig/modeledit.jsp" style="width:100%;height:100%;margin: 0px;padding: 0px;"></iframe>
</div>
<script type="text/javascript">
    $(document).ready(function () {
        $("#nametree").jstree({
            'core' : {
                'data' : [
                    {
                        'id' : 'zf',
                        'text' : '政府委托',
                        // 'state' : { 'selected' : true },
                    },
                    {
                        'id' : 'qy',
                        'text' : '企业委托'
                    },
                    {
                        'id' : 'gr',
                        'text' : '个人委托'
                    }
                ]
            }
        });
        $("#nametree").bind('click.jstree', function(event) {
            var eventNodeName = event.target.nodeName;
            if (eventNodeName == 'INS') {
                return;
            } else if (eventNodeName == 'A') {
                var $subject = $(event.target).parent();
                if ($subject.find('ul').length > 0) {
                } else {
                    //选择的id值
                    var id = $(event.target).parents('li').attr('id');
                    // console.log(id);
                    $.ajax({
                        url: '/customermanage/pageconfig/findconfig',
                        type: 'GET',
                        // dataType: 'json',
                        // contentType: 'application/json; charset=utf-8',
                        data: {ymbm:id},
                        success: function (result) {
                            console.log(result.data);
                            if (result.success) {
                                window.frames["modeledit"].initdata(result.data);
                            } else {
                                Messenger().post({
                                    message: result.message,
                                    type: 'danger'
                                });
                            }

                        },
                        error: function (result) {
                            Messenger().post({
                                message: '失败！' + result.message,
                                type: 'danger'
                            });
                        }
                    });
                }
            }
        });
    });

    function showmessage(msg, success) {
        if (success) {
            Messenger().post({
                message:msg,
                type:"info"
            });
        } else {
            Messenger().post({
                message: msg,
                type: 'danger'
            });
        }
    }
</script>