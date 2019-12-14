package com.xinhai.caiyun.systemmanager.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.YqsbwxbfService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "yqsbwxbf")
public class YqsbwxbfController {
    @Autowired
    private YqsbwxbfService yqsbwxbfService;
    @RequestMapping(value = "/yqsbwxbfSeatch")
    @ResponseBody
    public DatatablesViewPage wxbfqueryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("sbmc") String sbmc,
                                             @RequestParam("skbh") String skbh
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("sbmc",sbmc);
        map.put("skbh",skbh);
        List<Map> list = yqsbwxbfService.selectYqsbtzwxbf(map);
        int totalCount=0;
        totalCount= yqsbwxbfService.selectYqtzCountwxbf(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    @RequestMapping(value = "/yqsbWxsq")
    @ResponseBody
    public JSONObject updateyqsbWxsq(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("skbh",((String[])map.get("skbh"))[0]);
        map2.put("sbzk",((String[])map.get("sbzk"))[0]);
        map2.put("wxyy",((String[])map.get("wxyy"))[0]);
        map2.put("wxbz",((String[])map.get("wxbz"))[0]);
        yqsbwxbfService.updateWxyy(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/yqsbBfsq")
    @ResponseBody
    public JSONObject updateyqsbBfsq(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("skbh",((String[])map.get("skbh"))[0]);
        map2.put("sbzk",((String[])map.get("sbzk"))[0]);
        map2.put("bfyy",((String[])map.get("bfyy"))[0]);
        map2.put("bfbz",((String[])map.get("bfbz"))[0]);
        yqsbwxbfService.updateBfyy(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/yqsbwxbfspSeatch")
    @ResponseBody
    public DatatablesViewPage wxbfspqueryList(@RequestParam("start") String start,
                                            @RequestParam("length") String length,
                                            @RequestParam("sbmc") String sbmc,
                                            @RequestParam("skbh") String skbh
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("sbmc",sbmc);
        map.put("skbh",skbh);
        List<Map> list = yqsbwxbfService.selectYqsbtzwxbfsp(map);
        int totalCount=0;
        totalCount= yqsbwxbfService.selectYqtzCountwxbfsp(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    @RequestMapping(value = "/yqsbBfsp")
    @ResponseBody
    public JSONObject updateyqsbBfsqSp(Integer[]yqtzwxbfspche){
        JSONObject jsonObject = new JSONObject();
        for (Integer skbh:yqtzwxbfspche) {
            Map map = new HashMap();
            map.put("skbh",skbh);
            yqsbwxbfService.updateWbSpzt(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/yqsbBfspth")
    @ResponseBody
    public JSONObject updateyqsbBfsqSpth(Integer[]yqtzwxbfspche){
        JSONObject jsonObject = new JSONObject();
        for (Integer skbh:yqtzwxbfspche) {
            Map map = new HashMap();
            map.put("skbh",skbh);
            yqsbwxbfService.updateWbSpztTh(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/yqsbwxbfWxSeatch")
    @ResponseBody
    public DatatablesViewPage wxqueryList(@RequestParam("start") String start,
                                            @RequestParam("length") String length,
                                            @RequestParam("sbmc") String sbmc,
                                            @RequestParam("skbh") String skbh
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("sbmc",sbmc);
        map.put("skbh",skbh);
        List<Map> list = yqsbwxbfService.selectYqsbtzwxbfWx(map);
        int totalCount=0;
        totalCount= yqsbwxbfService.selectYqtzCountwxbfWx(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    @RequestMapping(value = "/yqsbBfwxjl")
    @ResponseBody
    public JSONObject updateyqsbBfsqWx(Integer[]yqtzwxbfWx){
        JSONObject jsonObject = new JSONObject();
        Map map = new HashMap();
        for (Integer sk:yqtzwxbfWx) {
            map.put("skbh",sk);
            yqsbwxbfService.updateSbWx(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
}
