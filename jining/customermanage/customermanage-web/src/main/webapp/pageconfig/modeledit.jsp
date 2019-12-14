<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" session="false" %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="assets/css/custom.css" rel="stylesheet">
    <link href="assets/css/style-classic.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script data-main="assets/js/main-built.js" src="assets/js/require.js" ></script>
      <%--<script src="../../assets/global/plugins/messenger/js/messenger.min.js"></script>--%>
    <script src="assets/js/jquery.js"></script>
<script type="text/javascript">
// $(document).click(function(){
// 	window.parent.closeFloatContainer();
// });
var WindowController =function()
{
    var controller= new Object();
    controller.init = function(cmdbInfo) {
        cmdbModelInfoInit(cmdbInfo);
    };
	controller.getCollection = function() {
	    return getModelCollection();
	};
    controller.clearData = function() {
        mainFormView.$el.empty();
    };
    return controller;
};

var windowController = new WindowController();

function initdata(data) {
    windowController.init(data);
}
// 加载数据库中的模型属性信息
cmdbModelInfoInit=function (cmdbInfo)
{
	var viewCollection = mainFormView.collection;
	mainFormView.$el.empty();
	// collection清空
	viewCollection.reset();
	$("#target").removeClass("half-form");
	// $(".choice-full").addClass("selected");
	// $(".choice-half").removeClass("selected");
	var i =0;
	viewCollection.add([{
		 "title": "Hiddendiv"
    }]);
	if(cmdbInfo != null){
		for(var key in cmdbInfo){
			var result1 = cmdbInfo[key];
			var mapAttrName = result1["mapAttrName"];//属性名称
			var mapAttrType = result1["mapAttrType"];//属性类型
			var mapAttrId = result1["mapAttrId"];//属性编码
			var mapControlType = result1["mapControlType"];//控件类型
			var mapFixedAttr = result1["mapFixedAttr"];//固定属性
			var mapStoreColumn = result1["mapStoreColum"];//存储列名
			var isFix = false;
			if (mapFixedAttr == 1) {
				isFix = true;
			}
			var mapIsTitle = result1["mapIsTitle"];//分组标题
			var isTitle = false;
			if (mapIsTitle == 1) {
			    isTitle = true;
			}
			var mapDefauleValue = result1["mapDefauleValue"];//属性默认值
			var mapCheckRule = result1["mapCheckRule"];//校验规则
			var isVerify0 = true;
			var isVerify1 = false;
			if (mapCheckRule == 1) {
			    isVerify1 = true;
			    isVerify0 = false;
			}
			var isVerify2 = false;
			if (mapCheckRule == 2) {
			    isVerify2 = true;
			    isVerify0 = false;
			}
			var isVerify3 = false;
			if (mapCheckRule == 3) {
			    isVerify3 = true;
			    isVerify0 = false;
			}
			var isVerify4 = false;
			if (mapCheckRule == 4) {
			    isVerify4 = true;
			    isVerify0 = false;
			}
			var mapValueSource = result1["mapValueSource"];//数据字典编号
			var dataDicValue = "";
			if (!isEmptyObject(mapDefauleValue)) {
				dataDicValue = mapDefauleValue.split(",");// 数据字典数据取得
			}
			// 判断数据字典数据是否为空
			if (isEmptyObject(dataDicValue)) {
				dataDicValue = ["选项一", "选项二", "选项三"];
			}
			var mapIsRequired = result1["mapIsRequired"];//是否必填
			var isRequired;
			if (mapIsRequired == 1) {
			    isRequired = true;
			} else {
			    isRequired = false;
			}
			var mapAttrUnit = result1["mapAttrUnit"];//单位
			var mapMaxValue = result1["mapMaxValue"];//最大值
			// 需要判断最大值是否是默认的---------------------------------------需要解决
			var mapMinValue = result1["mapMinValue"];//最小值
			// 需要判断最小值是否是默认的---------------------------------------需要解决
			var mapDecimalLen = result1["mapDecimalLen"];//保留几位小数
			// 需要判断保留几位小数是否是默认的---------------------------------------需要解决
			var mapIsSample = result1["mapIsSample"];//不允许重复值
			var isSample;
			if (mapIsSample == 1){
			    isSample = true;
			} else {
			    isSample = false;
			}
			var mapColumnDisc = result1["mapColumnDisc"];//字段描述
			var mapCheckErrMsg = result1["mapCheckErrMsg"];//校验错误提示信息
			var mapDateType = result1["mapDateType"];//日期格式
			var dateType0 = false;
			if (mapDateType == 0) {
			    dateType0 = true;
			}
			var dateType1 = false;
			if (mapDateType == 1) {
			    dateType1 = true;
			}
			var dateType2 = false;
			if (mapDateType == 2) {
			    dateType2 = true;
			}
			var dateType3 = false;
			if (mapDateType == 3) {
			    dateType3 = true;
			}
			var mapConLayout = result1["mapConLayout"];//控件布局
			// var isAlone = true;
			// var isTwins = false;
			// if (mapConLayout == 2 && i ==0) {
			// 	$("#target").addClass("half-form");
			// 	$(".choice-full").removeClass("selected");
			// 	$(".choice-half").addClass("selected");
			// 	i++;
			// }
			var mapChild = result1["mapChild"];//单元格数据

			// 控件类型是单行文本
			if (mapControlType == "Text Input")
			{
			    viewCollection.add([{
					 "title": "Text Input",
			         "undeleted":isFix,
			         "unmove": false,
		             "fields": {
	                   "id": {
				         "label": "属性编码",
				         "type": "input",
	        	         "value": mapAttrId,
				         "readonly": true,
				         "hidden": false
	                   },
					   "storeColumn": {
						"label": "存储列名",
						"type": "input",
						"value": mapStoreColumn,
						"readonly": isFix,
						"hidden": false
					  },
	                   "label": {
	        	          "label": "字段名称",
	        	          "type": "input",
	        	          "value": mapAttrName,
	        	          "readonly": false,
	        	          "hidden": false
	                   },
	                   "placeholder": {
	        	          "label": "字段描述",
	        	          "type": "input",
	        	          "value": mapColumnDisc,
	        	          "readonly": isFix,
	        	          "hidden": true
	                   },
	                   "helptext": {
	                      "label": "默认值",
	                      "type": "input",
	                      "value": mapDefauleValue,
	                      "readonly": isFix,
	                      "hidden": true
	                   },
	                   "verifyrule": {
	                      "label": "校验规则",
	                      "type": "select",
	                      "readonly": isFix,
	                      "hidden": true,
	                      "value": [
	    	                {
	      	                  "value": "0",
	      	                  "label": "不使用校验规则",
	      	                  "selected": isVerify0
	      	                },
	                        {
	                          "value": "1",
	                          "label": "IP",
	                          "selected": isVerify1
	                        },
	                        {
	                          "value": "2",
	                          "label": "邮箱",
	                          "selected": isVerify2
	                        },
	                        {
	                          "value": "3",
	                          "label": "电话",
	                          "selected": isVerify3
	                        }
	                      ]
	                   },
	                   "errortip": {
	                      "label": "校验错误提示",
	                      "type": "input",
	                      "value": mapCheckErrMsg,
	                      "readonly": isFix,
	                      "hidden": true
	                   },
					 "sample": {
     				   "label": "不允许重复值",
      				   "type": "checkbox",
      				   "value": isSample,
      				   "readonly": isFix,
      				   "hidden": true
     				 },
					 "required": {
     				   "label": "是否必填",
      				   "type": "checkbox",
      				   "value": isRequired,
      				   "readonly": isFix,
      				   "hidden": true
     				 }
					}
			    }]);
			}

			// 控件类型是日期
			if (mapControlType == "Date Input")
			{
			    viewCollection.add([{
                    "title": "Date Input",
                    "undeleted": false,
                    "unmove": false,
                    "fields": {
                        "id": {
                            "label": "属性编码",
                            "type": "input",
                            "value": mapAttrId,
                            "readonly": false,
                            "hidden": false
                        },
                        "storeColumn": {
                            "label": "存储列名",
                            "type": "input",
                            "value": mapStoreColumn,
                            "readonly": false,
                            "hidden": false
                        },
                        "label": {
                            "label": "字段名称",
                            "type": "input",
                            "value": mapAttrName,
                            "readonly": false,
                            "hidden": false
                        },
                        "placeholder": {
                            "label": "字段描述",
                            "type": "input",
                            "value": mapColumnDisc,
                            "readonly": false,
                            "hidden": true
                        },
                        "helptext": {
                            "label": "默认值",
                            "type": "input",
                            "value": null,
                            "readonly": false,
                            "hidden": true
                        },
                        "datetype": {
                            "label": "日期格式",
                            "readonly": false,
                            "hidden": true,
                            "type": "select",
                            "value": [
                                {
                                    "value": "datetime-local",
                                    "label": "年/月/日/时间",
                                    "selected": false
                                },
                                {
                                    "value": "date",
                                    "label": "年/月/日",
                                    "selected": true
                                },
                                {
                                    "value": "month",
                                    "label": "年/月",
                                    "selected": false
                                },
                                {
                                    "value": "week",
                                    "label": "年/周",
                                    "selected": false
                                }
                            ]
                        },
                        "sample": {
                            "label": "不允许重复值",
                            "type": "checkbox",
                            "value": false,
                            "readonly": false,
                            "hidden": true
                        },
                        "required": {
                            "label": "是否必填",
                            "type": "checkbox",
                            "value": false,
                            "readonly": false,
                            "hidden": true
                        }
                    }
                }]);
			}
			// 控件类型是下拉单选
			if (mapControlType == "Select Basic")
			{
			    viewCollection.add([{
    "title": "Select Basic",
	"undeleted":isFix,
	"unmove": false,
    "fields": {
      "id": {
        "label": "属性编码",
        "type": "input",
        "value": mapAttrId,
        "readonly": true,
        "hidden": false
      },
	  "storeColumn": {
		"label": "存储列名",
		"type": "input",
		"value": mapStoreColumn,
		"readonly": isFix,
		"hidden": false
	  },
      "label": {
        "label": "字段名称",
        "type": "input",
        "value": mapAttrName,
        "readonly": false,
        "hidden": false
      },
      "placeholder": {
        "label": "字段描述",
        "type": "input",
        "value": mapColumnDisc,
        "readonly": isFix,
        "hidden": true
      },
      "helptext": {
        "label": "默认值",
        "type": "input",
        "value": mapDefauleValue,
        "readonly": isFix,
        "hidden": true
      },
      "dictionary": {
        "label": "数据字典",
        "type": "input",
        "value": mapValueSource,
        "readonly": isFix,
        "hidden": true
      },
      "options": {
        "label": "选项",
        "type": "textarea-split",
        "value": dataDicValue,
        "readonly": true,
        "hidden": false
      },
      "sample": {
        "label": "不允许重复值",
        "type": "checkbox",
        "value": isSample,
        "readonly": isFix,
        "hidden": true
      },
	  "required": {
        "label": "是否必填",
        "type": "checkbox",
        "value": isRequired,
        "readonly": isFix,
        "hidden": true
      }
    }
  }]);
			}

			
		}
	}
}

    // 取得属性的collection的json串
    function getModelCollection() {
    	// if ($(".choice-half").is(".selected") == true) {
    	// 	mainFormView.collection.models[0].set("halfForm",true);
    	// } else {
    	// 	mainFormView.collection.models[0].set("halfForm",false);
    	// }
    	return JSON.stringify(mainFormView.collection);
	}
   // 取得数据字典的值
    function getDicData(dicCode) {
	   var data;
    	$.ajax({
            type : "get",
            url : "getDicList.do",
            data : {
            	dic_code : dicCode
            },
            dataType : "json",
            async: false,
            success : function(result) {
            	data = result;
            },
            error: function(){
            	data = "";
            }
        });
    	return data;
	}
   // 判断是否为空
   function isEmptyObject(e){
	   var t;
	   for (t in e)
		   return !1;
	   return !0;
   }
   
</script>

  </head>

  <body>

    <div class="container">
      <div class="row clearfix">
        <!-- Building Form. -->
        <div class="span7">
          <div class="clearfix">

            <div id="build">
			
              <form id="target" class="form-horizontal">

              </form>
            </div>

          </div>
        </div>
        <!-- / Building Form. -->

        <!-- Components -->
        <div class="span4">

          <div class="tabbable">
            <ul class="nav nav-tabs" id="formtabs">
              <!-- Tab nav -->
            </ul>
            <form class="form-horizontal" id="components">
              <fieldset>
                <div class="tab-content">
                  <!-- Tabs of snippets go here -->
                </div>
              </fieldset>

              <div class="twins-select">
                <div class="title">
                    操作
                </div>
                <div >
                  <input type="button" onclick="pcsave()" value="保存"></input>
                    <%--<input type="button" onclick="test()" value="test"></input>--%>
                </div>
                </div>
            </form>
          </div>
        </div>
        <!-- / Components -->

      </div>


    </div> <!-- /container -->


  </body>
  <script type="text/javascript">
      function getSelectNodeId() {
          var treeNode = window.parent.$('#nametree').jstree(true).get_selected(true)[0]; //获取所有选中的节点对象
          var nodeId = treeNode.original.id;
          return nodeId;
      }

      function pcsave() {
          // console.log(getSelectNodeId());
          // console.log("aaa"+JSON.stringify(mainFormView.collection));
          $.ajax({
              url: '/customermanage/pageconfig/configsave',
              type: 'POST',
              // dataType: 'json',
              // contentType: 'application/json; charset=utf-8',
              data: {configdata: JSON.stringify(mainFormView.collection), ymbm: getSelectNodeId()},
              success: function (result) {
                  // console.log(result);
                  if (result.success) {
                      // Messenger().post({
                      //     message:"保存成功",
                      //     type:"info"
                      // });
                      window.parent.showmessage("保存成功", result.success);
                  } else {
                      // Messenger().post({
                      //     message: result.message,
                      //     type: 'danger'
                      // });
                      window.parent.showmessage(result.message, result.success);
                  }

              },
              error: function (result) {
                  // Messenger().post({
                  //     message: '保存失败！' + result.message,
                  //     type: 'danger'
                  // });
                  window.parent.showmessage('保存失败！', false);
              }
          });
      }
      function test() {
          // console.log(getSelectNodeId());
          // console.log("aaa"+JSON.stringify(mainFormView.collection));
          $.ajax({
              url: '/customermanage/zfwt/savetest',
              type: 'POST',
              // dataType: 'json',
              // contentType: 'application/json; charset=utf-8',
              // data: {configdata: JSON.stringify(mainFormView.collection), ymbm: getSelectNodeId()},
              success: function (result) {
                  // console.log(result);
                  if (result.success) {
                      // Messenger().post({
                      //     message:"保存成功",
                      //     type:"info"
                      // });
                      window.parent.showmessage("保存成功", result.success);
                  } else {
                      // Messenger().post({
                      //     message: result.message,
                      //     type: 'danger'
                      // });
                      window.parent.showmessage(result.message, result.success);
                  }

              },
              error: function (result) {
                  // Messenger().post({
                  //     message: '保存失败！' + result.message,
                  //     type: 'danger'
                  // });
                  window.parent.showmessage('保存失败！', false);
              }
          });
      }
  </script>
</html>