package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.LysqService;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/lysq")
public class LysqController {
    // 查询全部
    @Autowired
    private LysqService lysqService;

    /**
     *
     * 显示耗材领用的信息
     */
    @RequestMapping(value = "/lysqSeach",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage lysqSeach(@RequestParam("start") String start,
                                        @RequestParam("length") String length,
                                        @RequestParam("hclx") String hclx
    ) {
        Map map = new HashMap();
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNULL(hclx)) {
            map.put("hclx", hclx);
        }
        map.put("lyr", CurrentLoginUser.getUser().getZydm());
        List<Map> list = lysqService.queryLysqAll(map);
        int totalCount = 0;
        totalCount = lysqService.queryLysqAllNum(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    /**
     *
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
     *
     * 条码扫描将申请库信息放入入库信息表
     */
    @RequestMapping(value = "/addHcly", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject addHcly(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String lysl = request.getParameter("lysl");//获得耗材数量
            if (!notNULL(lysl)) {
                lysl = "0";
            }
            String hcbm = request.getParameter("hcbm");//获得耗材编码
            List<Map> list = lysqService.queryCgrkByHcbm(hcbm);
            Map map = null;
            boolean flag = true;
            try {
                map = list.get(0);
            } catch (Exception e) {
                flag = false;
            }
            if (flag) {
                map.put("lyr", CurrentLoginUser.getUser().getZydm());
                map.put("lysl", lysl);
                String kcsl=map.get("sl")+"";
                if("".equals(kcsl)|| kcsl==null){
                    kcsl="0";
                }
                String sl=Integer.parseInt(kcsl)-Integer.parseInt(lysl)+"";
                map.put("sl",sl);
                lysqService.addHclyFromCgrk(map);
            }
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    ;

    /**
     *
     * 检测数据是否有重复的耗材编码
     */
    @RequestMapping(value = "/checkHcbm", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject checkHcbm(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String hcbm = request.getParameter("hcbm");
            List<String> list = lysqService.queryIdByHcbm(hcbm);
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
     *
     * 删除库存信息
     */
    @RequestMapping(value = "/delLysq", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delLysq(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String id = request.getParameter("id");
            lysqService.delLysq(id);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /**
     *
     * 获得库存的数量
     */
    @RequestMapping(value = "/queryKcNum", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject queryKcNum(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String hcbm = request.getParameter("hcbm");
            String kcsl = lysqService.queryKcNum(hcbm);
            json.put("kcsl", kcsl);
        } catch (Exception e) {
            json.put("kcsl", "0");
        }
        return json;
    }

}
