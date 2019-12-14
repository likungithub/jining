package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.service.YyclService;
import com.xinhai.security.api.CurrentLoginUser;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "yycl")
public class YyclController {
    @Autowired
    private YyclService yyclService;

    @RequestMapping(value = "/yycl")
    @ResponseBody
    public DatatablesViewPage yycl_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("htmc") String htmc,
                                             @RequestParam("ypmc") String ypmc,
                                             @RequestParam("xhyp") String xhyp,
                                             @RequestParam("clfs") String clfs,
                                             @RequestParam("sfbz") String sfbz
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("htmc",htmc);
        map.put("ypmc",ypmc);
        map.put("xhyp",xhyp);
        map.put("clfs",clfs);
        map.put("sfbz",sfbz);
        List<Map> list = yyclService.selectYycl(map);
        int totalCount=0;
        totalCount=yyclService.selectCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    @RequestMapping(value = "/destory")
    @ResponseBody
    public void destoryYp(String []che){
        Map map = null;
        for (String ch:che) {
            map = new HashMap();
            map.put("ypbm",ch);
            map.put("yyclry",CurrentLoginUser.getUser().getZydm());
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
            String str = sf.format(new Date().getTime());
            map.put("clsj",str);
            yyclService.destoryYpzt(map);
        }
    }
    @RequestMapping(value = "/yycldestory")
    @ResponseBody
    public JSONObject destoryYycldes(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        try {
            String array = request.getParameter("questionsList");
            List<Map> list = JSONArray.fromObject(array);
            Map map = new HashMap();
            map.put("ypbm", list.get(0).get("ypbm"));
            map.put("ajsr", list.get(0).get("ajsr"));
            map.put("atel", list.get(0).get("atel"));
            map.put("abz", list.get(0).get("abz"));
            yyclService.updateYycl(map);
            jsonObject.put("success", true);
        }catch (Exception e){
            jsonObject.put("success", false);
            jsonObject.put("message","保存失败！");
        }
        return jsonObject;
    }
    @RequestMapping(value = "/yyclXhsq")
    @ResponseBody
    public JSONObject destYycldes(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        try {
            String array = request.getParameter("questionsList");
            List<Map> list = JSONArray.fromObject(array);
            Map map = new HashMap();
            map.put("ypbm", list.get(0).get("ypbm"));
            map.put("xhsj", list.get(0).get("xhsj"));
            map.put("xhfs", list.get(0).get("xhfs"));
            map.put("xhyy", list.get(0).get("xhyy"));
            map.put("xhdd", list.get(0).get("xhdd"));
            yyclService.updateXhsq(map);
            jsonObject.put("success", true);
        }catch (Exception e){
            jsonObject.put("success", false);
            jsonObject.put("message","保存失败！");
        }
        return jsonObject;
    }
    @RequestMapping(value = "/spLc")
    @ResponseBody
    public DatatablesViewPage destYyclspLc(@RequestParam("start") String start,
                                           @RequestParam("length") String length,
                                           @RequestParam("htmc") String htmc,
                                           @RequestParam("ypmc") String ypmc,
                                           @RequestParam("clfs") String clfs,
                                           @RequestParam("sfbz") String sfbz
    ){
            Map map=new HashMap();
            map.put("start", Integer.parseInt(start));
            map.put("length",Integer.parseInt(length));
            map.put("htmc",htmc);
            map.put("ypmc",ypmc);
            map.put("clfs",clfs);
            map.put("sfbz",sfbz);
            String dqry = CurrentLoginUser.getUser().getZydm();
            map.put("dqry",dqry);
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
            String str = sf.format(new Date().getTime());
            map.put("clsj",str);
            List<Map>list1 = yyclService.findInd(map);
            System.out.println(list1.get(0).get("name"));
            if(list1.get(0).get("name").equals("技术负责人")){
                List<Map> list = yyclService.findCgsq(map);
                int totalCount=0;
                totalCount= yyclService.findCount(map);
                DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
                dv.setAaData(list);
                dv.setiTotalDisplayRecords(totalCount);
                dv.setiTotalRecords(totalCount);
                return dv;
            }
        if(list1.get(0).get("name").equals("经办人")){
            List<Map> list = yyclService.findjbCgsq(map);
            int totalCount=0;
            totalCount= yyclService.findjbCount(map);
            DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
            dv.setAaData(list);
            dv.setiTotalDisplayRecords(totalCount);
            dv.setiTotalRecords(totalCount);
            return dv;
        }
            return null;

    }
    @RequestMapping(value = "/spJssp")
    @ResponseBody
    public void cgsp_querySp(HttpServletRequest request
        ) {
        /*String strJson = "{ \"name\": \"张三\", \"age\": 12 }";
        JsonParser parser = new JsonParser();
        JsonElement je = parser.parse(strJson);
        JsonObject jobj = je.getAsJsonObject();//从json元素转变成json对象
        String name = jobj.get("name").getAsString();//从json对象获取指定属性的值
        System.out.println(name);
        int age = jobj.get("age").getAsInt();
        System.out.println(age);*/
        String arry = request.getParameter("stry");
        JsonParser parser = new JsonParser();
        JsonElement je = parser.parse(arry);
        JsonObject jobj = je.getAsJsonObject();
        System.out.println(jobj.get("ypbm").getAsString());
//        List<Map>list = JSONArray.fromObject(arry);
        Map map = new HashMap();
        String dqry = CurrentLoginUser.getUser().getZydm();
        map.put("dqry", dqry);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        String str1 = sf.format(new Date().getTime());
        map.put("clsj", str1);
        List<Map> list1 = yyclService.findInd(map);
        System.out.println(list1.get(0).get("name"));
        if (list1.get(0).get("name").equals("技术负责人")) {
                map.put("ypbm", jobj.get("ypbm").getAsString());
                yyclService.updateJssp(map);
        }
        if (list1.get(0).get("name").equals("经办人")) {
                map.put("ypbm",jobj.get("ypbm").getAsString());
                yyclService.updateJbr(map);
        }
    }
    @RequestMapping(value = "/spJsthcl")
    @ResponseBody
    public void cgsp_queryTh(HttpServletRequest request
    ) {
        /*String strJson = "{ \"name\": \"张三\", \"age\": 12 }";
        JsonParser parser = new JsonParser();
        JsonElement je = parser.parse(strJson);
        JsonObject jobj = je.getAsJsonObject();//从json元素转变成json对象
        String name = jobj.get("name").getAsString();//从json对象获取指定属性的值
        System.out.println(name);
        int age = jobj.get("age").getAsInt();
        System.out.println(age);*/
        String arry = request.getParameter("stary");
        JsonParser parser = new JsonParser();
        JsonElement je = parser.parse(arry);
        JsonObject jobj = je.getAsJsonObject();
        System.out.println(jobj.get("ypbm").getAsString());
//      List<Map>list = JSONArray.fromObject(arry);
        Map map = new HashMap();
        String dqry = CurrentLoginUser.getUser().getZydm();
        map.put("dqry", dqry);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        String str1 = sf.format(new Date().getTime());
        map.put("clsj", str1);
        List<Map> list1 = yyclService.findInd(map);
        System.out.println(list1.get(0).get("name"));
        if (list1.get(0).get("name").equals("技术负责人")) {
            map.put("ypbm", jobj.get("ypbm").getAsString());
            yyclService.updateJsth(map);
        }
        if (list1.get(0).get("name").equals("经办人")) {
            map.put("ypbm",jobj.get("ypbm").getAsString());
            yyclService.updateJbrth(map);
        }
    }
}
