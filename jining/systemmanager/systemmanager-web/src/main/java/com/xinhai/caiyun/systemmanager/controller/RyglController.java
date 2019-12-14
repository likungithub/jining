package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.RyglService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "rygl")
public class RyglController {
    @Autowired
    private RyglService ryglService;
    @RequestMapping(value = "/seatchrygl")
    @ResponseBody
    public DatatablesViewPage selectRyxx(@RequestParam("start")String start,
                                         @RequestParam("length")String length,
                                         @RequestParam("name")String name
    ){
        Map map = new HashMap<>();
        map.put("start",start);
        map.put("length",length);
        map.put("name",name);
        List<Map> list = ryglService.selectRygl(map);
        int totalCount = 0;
        totalCount = ryglService.selectRyglCount(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    @RequestMapping(value = "/addrygl")
    @ResponseBody
    public JSONObject addDzbgl(HttpServletRequest request){
        JSONObject jsonObject =new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("name",((String[])map.get("name"))[0]);
        map2.put("sex",((String[])map.get("sex"))[0]);
        map2.put("mz",((String[])map.get("mz"))[0]);
        map2.put("csrq",((String[])map.get("csrq"))[0]);
        map2.put("jg",((String[])map.get("jg"))[0]);
        map2.put("zzmm",((String[])map.get("zzmm"))[0]);
        map2.put("czdz",((String[])map.get("czdz"))[0]);
        map2.put("lxfs",((String[])map.get("lxfs"))[0]);
        map2.put("ssks",((String[])map.get("ssks"))[0]);
        map2.put("zc",((String[])map.get("zc"))[0]);
        map2.put("hyzk",((String[])map.get("hyzk"))[0]);
        map2.put("csxl",((String[])map.get("csxl"))[0]);
        map2.put("xyxl",((String[])map.get("xyxl"))[0]);
        map2.put("byyx",((String[])map.get("byyx"))[0]);
//        新增党员信息
        ryglService.addRygl(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/deleterygl")
    @ResponseBody
    public JSONObject deleteDzbgl(Integer[]ryglche){
        JSONObject jsonObject = new JSONObject();
        Map map = new HashMap();
        for (Integer rygl: ryglche
        ) {
            map.put("id",rygl);
//            删除党员信息
            ryglService.deleteRygl(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/updaterygl")
    @ResponseBody
    public JSONObject updateDzbgl(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("name",((String[])map.get("name"))[0]);
        map2.put("sex",((String[])map.get("sex"))[0]);
        map2.put("mz",((String[])map.get("mz"))[0]);
        map2.put("csrq",((String[])map.get("csrq"))[0]);
        map2.put("jg",((String[])map.get("jg"))[0]);
        map2.put("zzmm",((String[])map.get("zzmm"))[0]);
        map2.put("czdz",((String[])map.get("czdz"))[0]);
        map2.put("lxfs",((String[])map.get("lxfs"))[0]);
        map2.put("ssks",((String[])map.get("ssks"))[0]);
        map2.put("zc",((String[])map.get("zc"))[0]);
        map2.put("hyzk",((String[])map.get("hyzk"))[0]);
        map2.put("csxl",((String[])map.get("csxl"))[0]);
        map2.put("xyxl",((String[])map.get("xyxl"))[0]);
        map2.put("byyx",((String[])map.get("byyx"))[0]);
        map2.put("id",((String[])map.get("id"))[0]);
//        修改党员信息
        ryglService.updateRygl(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
}
