package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.HcthService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/hcth")
public class HcthController {
    // 查询全部
    @Autowired
    private HcthService hcthService;

    /**
     * 显示耗材领用的信息
     */
    @RequestMapping(value = "/hcthSeach",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage hcthSeach(@RequestParam("start") String start,
                                        @RequestParam("length") String length,
                                        @RequestParam("hclx") String hclx
                                        ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("thr", CurrentLoginUser.getUser().getZydm());
        if(notNULL(hclx)){
            map.put("hclx",hclx);
        }
        List<Map> list = hcthService.queryHcthAll(map);
        int totalCount = 0;
        totalCount = hcthService.queryHcthAllNum(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    /**
     * 不为空的检测
     */
    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    /**
     * 条码扫描将申请库信息放入入库信息表
     */
    @RequestMapping(value = "/addHcth", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject addHcth(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String thsl = request.getParameter("thsl");//获得耗材数量
            if (!notNULL(thsl)) {
                thsl = "0";
            }
            String hcbm = request.getParameter("hcbm");//获得耗材编码
            List<Map> list = hcthService.queryCgrkByHcbm(hcbm);
            Map map = null;
            boolean flag = true;
            try {
                map = list.get(0);
            } catch (Exception e) {
                flag = false;
            }
            if (flag) {
                map.put("thr", CurrentLoginUser.getUser().getZydm());
                map.put("thsl", thsl);
                map.put("hcbm", hcbm);
                String kcsl = map.get("sl").toString();
                map.put("kcsl", Integer.parseInt(thsl) + Integer.parseInt(kcsl));
                hcthService.addHcthFromCgrk(map);
            }
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    ;

    /**
     * 检测数据是否有重复的耗材编码
     */
    @RequestMapping(value = "/checkHcbm", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject checkHcbm(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String hcbm = request.getParameter("hcbm");
            List<Map> list = hcthService.queryCgrkByHcbm(hcbm);
            if (list.size() > 0) {
                json.put("flag", true);
            } else {
                json.put("flag", false);
            }
        } catch (Exception e) {
            json.put("flag", true);
        }
        return json;
    }

    /**
     * 删除耗材退回的信息
     */
    @RequestMapping(value = "/delHcth", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delHcth(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String id = request.getParameter("id");
            hcthService.delHcth(id);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }
}
