package com.xinhai.caiyun.customermanage.controller.exceltest;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.deepoove.poi.data.RowRenderData;
import com.deepoove.poi.data.TextRenderData;
import com.deepoove.poi.data.style.Style;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.BgglService;
import com.xinhai.caiyun.customermanage.api.Jcx;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.api.staffList1;
import com.xinhai.caiyun.customermanage.controller.pageoffice.*;
import com.xinhai.caiyun.customermanage.controller.poitl.LzdglController;
import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import com.xinhai.caiyun.customermanage.dao.TqywtMapper;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Author 单亮
 * @Description：
 * @Date: ${DATE} ${TIME}
 * @Modified By:
 */
@Controller
@RequestMapping("/exceltest")
public class ExcelTestController {
    /**
     * 日志
     */
    private Logger logger = LogManager.getLogger(ExcelTestController.class.getName());


    /**
     * excel导入
     * @param data  excel文件的json数据
     * @param request
     * @return
     */
    @RequestMapping(value = "/imp", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject imp(@RequestBody String data,HttpServletRequest request) {
        JSONArray excelArray = JSONArray.parseArray(data);
        for (int i = 0; i < excelArray.size(); i++) {
            System.out.println(excelArray.get(i).toString());
        }
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("data","");
            jsonObject.put("success", true);
        }catch (Exception e){
            jsonObject.put("success", false);
            jsonObject.put("message","失败！");
        }
        return jsonObject;
    }

    /**
     * excel导出
     * @param data  excel文件的json数据
     * @param request
     * @return
     */
    @RequestMapping(value = "/exp", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject exp(@RequestBody String data,HttpServletRequest request) {
        List list = new ArrayList();
        HashMap m = new HashMap();
        m.put("key1","value1");
        m.put("key2","value1");
        m.put("key3","value1");
        m.put("key4","value1");
        list.add(m);
        m = new HashMap();
        m.put("key1","value2");
        m.put("key2","value2");
        m.put("key3","value2");
        m.put("key4","value2");
        list.add(m);
        net.sf.json.JSONArray json = net.sf.json.JSONArray.fromObject(list);
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("data",json.toString());
            jsonObject.put("success", true);
        }catch (Exception e){
            jsonObject.put("success", false);
            jsonObject.put("message","失败！");
        }
        return jsonObject;
    }


}
