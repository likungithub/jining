package com.xinhai.caiyun.customermanage.controller.pageconfig;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.customermanage.service.PageConfigService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author 单亮
 * @Description：
 * @Date: ${DATE} ${TIME}
 * @Modified By:
 */
@Controller
@RequestMapping("/pageconfig")
public class PageConfinController {
    /**
     * 日志
     */
    private Logger logger = LogManager.getLogger(PageConfinController.class.getName());

    @Autowired
    private PageConfigService configService;

    /**
     * excel导入
     * @param request
     * @return
     */
    @RequestMapping(value = "/configsave", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject configSave(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            String config = request.getParameter("configdata");
            String ymbm = request.getParameter("ymbm");
            JSONArray configArray = JSONArray.parseArray(config);
            HashMap delmap = new HashMap();
            delmap.put("ymbm",ymbm);
            configService.del(delmap);
            for (int i = 1; i < configArray.size(); i++) {
                JSONObject field = configArray.getJSONObject(i);
                JSONObject detail = field.getJSONObject("fields");
                String mapAttrType = field.getString("title");  //属性类型
                String mapAttrName = detail.getJSONObject("label").getString("value");	//属性名称
                String mapAttrId = detail.getJSONObject("id").getString("value");	//属性编码
                String mapControlType = field.getString("title");	//控件类型
                String mapStoreCol = detail.getJSONObject("storeColumn").getString("value");
                String mapDefauleValue = "";
                if (mapAttrType.equals("Select Basic")) {
                    JSONArray ara = detail.getJSONObject("options").getJSONArray("value");	//属性默认值
                    for (int j = 0; j <  ara.size(); j++) {
                        mapDefauleValue = mapDefauleValue + "," + ara.getString(j);
                    }
                    mapDefauleValue = mapDefauleValue.substring(1);
                }
                HashMap data = new HashMap();
                data.put("ymbm",ymbm);
                data.put("mapAttrName",mapAttrName);
                data.put("mapControlType",mapControlType);
                data.put("mapAttrId",mapAttrId);
                data.put("mapStoreColum",mapStoreCol);
                data.put("mapDefauleValue",mapDefauleValue);
                configService.add(data);
            }
            jsonObject.put("data","");
            jsonObject.put("success", true);
        }catch (Exception e){
            e.printStackTrace();
            jsonObject.put("success", false);
            jsonObject.put("message","失败！");
        }
        return jsonObject;
    }

    /**
     * 查询
     * @param request
     * @return
     */
    @RequestMapping(value = "/findconfig", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject findConfig(HttpServletRequest request) {

        JSONObject jsonObject = new JSONObject();
        try {
            // 取出数据
            HashMap data = new HashMap();
            data.put("ymbm",request.getParameter("ymbm"));
            List<Map> res = configService.findById(data);

            JSONArray configArray = new JSONArray();

            for (int i = 0; i < res.size(); i++) {

                Map dataMap = res.get(i);
                JSONObject field = new JSONObject();
                field.put("title", dataMap.get("mapControlType"));
                field.put("mapControlType", dataMap.get("mapControlType"));
                field.put("mapAttrName", dataMap.get("mapAttrName"));
                field.put("mapAttrId", dataMap.get("mapAttrId"));
                field.put("mapStoreColum", dataMap.get("mapStoreColum"));
                field.put("mapDefauleValue", dataMap.get("mapDefauleValue"));

//                JSONObject detail = new JSONObject();
//                detail.put("label",new JSONObject().put("value",dataMap.get("mapAttrName")));
//                detail.put("id",new JSONObject().put("value",dataMap.get("mapAttrId")));
//                detail.put("storeColumn",new JSONObject().put("value",dataMap.get("mapStoreCol")));
//                if (!"".equals(dataMap.get("mapDefauleValue"))) {
//                    detail.put("options", new JSONObject().put("value", dataMap.get("mapDefauleValue")));
//                }
//                field.put("fields", detail);
                configArray.add(field);
            }
            jsonObject.put("data",configArray);
            jsonObject.put("success", true);
        }catch (Exception e){
            e.printStackTrace();
            jsonObject.put("success", false);
            jsonObject.put("message","失败！");
        }
        return jsonObject;
    }


}
