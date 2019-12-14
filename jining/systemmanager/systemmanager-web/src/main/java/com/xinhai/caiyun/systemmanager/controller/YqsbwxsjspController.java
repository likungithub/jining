package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
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
@RequestMapping(value = "yqsbwxsjsp")
public class YqsbwxsjspController {
    @Autowired
    private YqsbwxbfService yqsbwxbfService;
//    一级审批页面
    @RequestMapping(value = "/yqsbwxyjspSeatch")
    @ResponseBody
    public DatatablesViewPage wxyjspqueryList(@RequestParam("start") String start,
                                            @RequestParam("length") String length,
                                            @RequestParam("sbmc") String sbmc,
                                            @RequestParam("skbh") String skbh
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("sbmc",sbmc);
        map.put("skbh",skbh);
        List<Map> list = yqsbwxbfService.selectYqsbtzwxspyj(map);
        int totalCount=0;
        totalCount= yqsbwxbfService.selectYqtzCountwxspyj(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    @RequestMapping(value = "/yqsbwxspyj")
    @ResponseBody
    public JSONObject updateyqsbBfsqSp(Integer[]yqtzwxbfspche){
        JSONObject jsonObject = new JSONObject();
        for (Integer skbh:yqtzwxbfspche) {
            Map map = new HashMap();
            map.put("skbh",skbh);
            yqsbwxbfService.updateWxSpztyj(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/yqsbWxspthyj")
    @ResponseBody
    public JSONObject updateyqsbBfsqSpth(Integer[]yqtzwxbfspche){
        JSONObject jsonObject = new JSONObject();
        for (Integer skbh:yqtzwxbfspche) {
            Map map = new HashMap();
            map.put("skbh",skbh);
            yqsbwxbfService.updateWxSpztThyj(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
//    二级审批页面
@RequestMapping(value = "/yqsbwxejspSeatch")
@ResponseBody
public DatatablesViewPage wxejspqueryList(@RequestParam("start") String start,
                                          @RequestParam("length") String length,
                                          @RequestParam("sbmc") String sbmc,
                                          @RequestParam("skbh") String skbh
) {
    Map map=new HashMap();
    map.put("start", Integer.parseInt(start));
    map.put("length",Integer.parseInt(length));
    map.put("sbmc",sbmc);
    map.put("skbh",skbh);
    List<Map> list = yqsbwxbfService.selectYqsbtzwxspej(map);
    int totalCount=0;
    totalCount= yqsbwxbfService.selectYqtzCountwxspej(map);
    DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
    dv.setAaData(list);
    dv.setiTotalDisplayRecords(totalCount);
    dv.setiTotalRecords(totalCount);
    return dv;
}
//二级审批通过或退回
@RequestMapping(value = "/yqsbwxspej")
@ResponseBody
public JSONObject updateyqsbWXSpyj(Integer[]yqtzwxbfspche){
    JSONObject jsonObject = new JSONObject();
    for (Integer skbh:yqtzwxbfspche) {
        Map map = new HashMap();
        map.put("skbh",skbh);
        yqsbwxbfService.updateWxSpztej(map);
    }
    jsonObject.put("success",true);
    return jsonObject;
}
    @RequestMapping(value = "/yqsbWxspthej")
    @ResponseBody
    public JSONObject updateyqsbWXSpthyj(Integer[]yqtzwxbfspche){
        JSONObject jsonObject = new JSONObject();
        for (Integer skbh:yqtzwxbfspche) {
            Map map = new HashMap();
            map.put("skbh",skbh);
            yqsbwxbfService.updateWxSpztThej(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }

//    三级审批
@RequestMapping(value = "/yqsbwxsjspSeatch")
    @ResponseBody
    public DatatablesViewPage wxsjspqueryList(@RequestParam("start") String start,
                                              @RequestParam("length") String length,
                                              @RequestParam("sbmc") String sbmc,
                                              @RequestParam("skbh") String skbh
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("sbmc",sbmc);
        map.put("skbh",skbh);
        List<Map> list = yqsbwxbfService.selectYqsbtzwxspsj(map);
        int totalCount=0;
        totalCount= yqsbwxbfService.selectYqtzCountwxspsj(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    //三级审批通过或退回
    @RequestMapping(value = "/yqsbwxspsj")
    @ResponseBody
    public JSONObject updateyqsbWXSpsj(Integer[]yqtzwxbfspche){
        JSONObject jsonObject = new JSONObject();
        for (Integer skbh:yqtzwxbfspche) {
            Map map = new HashMap();
            map.put("skbh",skbh);
            yqsbwxbfService.updateWxSpztsj(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/yqsbWxspthsj")
    @ResponseBody
    public JSONObject updateyqsbWXSpthsj(Integer[]yqtzwxbfspche){
        JSONObject jsonObject = new JSONObject();
        for (Integer skbh:yqtzwxbfspche) {
            Map map = new HashMap();
            map.put("skbh",skbh);
            yqsbwxbfService.updateWxSpztThsj(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
//    四级审批
@RequestMapping(value = "/yqsbwxsijspSeatch")
@ResponseBody
public DatatablesViewPage wxsijspqueryList(@RequestParam("start") String start,
                                          @RequestParam("length") String length,
                                          @RequestParam("sbmc") String sbmc,
                                          @RequestParam("skbh") String skbh
) {
    Map map=new HashMap();
    map.put("start", Integer.parseInt(start));
    map.put("length",Integer.parseInt(length));
    map.put("sbmc",sbmc);
    map.put("skbh",skbh);
    List<Map> list = yqsbwxbfService.selectYqsbtzwxspsij(map);
    int totalCount=0;
    totalCount= yqsbwxbfService.selectYqtzCountwxspsij(map);
    DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
    dv.setAaData(list);
    dv.setiTotalDisplayRecords(totalCount);
    dv.setiTotalRecords(totalCount);
    return dv;
}
    //四级审批通过或退回
    @RequestMapping(value = "/yqsbwxspsij")
    @ResponseBody
    public JSONObject updateyqsbWXSpsij(Integer[]yqtzwxbfspche){
        JSONObject jsonObject = new JSONObject();
        for (Integer skbh:yqtzwxbfspche) {
            Map map = new HashMap();
            map.put("skbh",skbh);
            yqsbwxbfService.updateWxSpztsij(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/yqsbWxspthsij")
    @ResponseBody
    public JSONObject updateyqsbWXSpthsij(Integer[]yqtzwxbfspche){
        JSONObject jsonObject = new JSONObject();
        for (Integer skbh:yqtzwxbfspche) {
            Map map = new HashMap();
            map.put("skbh",skbh);
            yqsbwxbfService.updateWxSpztThsij(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
}
