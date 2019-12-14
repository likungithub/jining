package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.customermanage.service.JcxxlrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping("/jcxxlr")
public class jcxxlrController {
    @Autowired
    private JcxxlrService jcxxlrService;

    private List<Map> ids; //样品id和检测项目id的集合
    private List<Double> wds; //温度的集合
    private List<Double> sds;//湿度的集合

    //获取检测项目id和样品id的集合
    @RequestMapping(value = "/start", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject start(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            String ypid = request.getParameter("ypid");
            String jcxmid = request.getParameter("jcxmid");
            map.put("ypid", ypid);
            map.put("jcxmid", jcxmid);
            ids.add(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }

        return json;
    }

    //开始获取温湿度   放入全局变量中
    @RequestMapping(value = "/countWsd", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject countWsd(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            wds = new ArrayList<Double>();
            sds = new ArrayList<Double>();
            ids = new ArrayList<Map>();
            List<Map> list = jcxxlrService.startWsd();
            for (Map wsd : list) {
                wds.add(new Double(wsd.get("wd") + ""));
                sds.add(new Double(wsd.get("sd") + ""));
            }
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    //开始获取温湿度   放入全局变量中
    @RequestMapping(value = "/end", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject end(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            List<Map> list = jcxxlrService.startWsd();
            for (Map wsd : list) {
                wds.add(new Double(wsd.get("wd") + ""));
                sds.add(new Double(wsd.get("sd") + ""));
            }
            Double max_wd = Collections.max(wds);
            Double min_wd = Collections.min(wds);
            String wd = min_wd + "~" + max_wd;
            Double max_sd = Collections.max(sds);
            Double min_sd = Collections.min(sds);
            String sd = min_sd + "~" + max_sd;
            for (Map map : ids) {
                map.put("max_wd",max_wd+"");
                map.put("min_wd",min_wd+"");
                map.put("max_sd",max_sd+"");
                map.put("min_sd",min_sd+"");
                map.put("wd", wd);
                map.put("sd", sd);
                jcxxlrService.saveWsd(map);
            }
            wds = new ArrayList<Double>();
            sds = new ArrayList<Double>();
            ids = new ArrayList<Map>();
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }
}
