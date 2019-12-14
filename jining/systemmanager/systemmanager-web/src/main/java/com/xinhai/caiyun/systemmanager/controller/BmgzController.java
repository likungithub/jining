package com.xinhai.caiyun.systemmanager.controller;

import com.xinhai.caiyun.systemmanager.api.SystemAnnouncement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import service.BmgzService;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


@Controller
@RequestMapping(value = "bmgz")
public class BmgzController {
    @Autowired
    private BmgzService bmgzService;

    /**
     * 查询当前编码规则
     */
    @RequestMapping(value = "/bmgzDT")
    @ResponseBody
    public JSONObject selectBmgz(){
        JSONObject jsonObject = new JSONObject();
        Map map = new HashMap();
        List<Map> list = bmgzService.selectBmgz();
        jsonObject.put("data",list);
        jsonObject.put("success",true);
        return jsonObject;
    }
    /**
     * 修改委托单编码规则
     * */
    @RequestMapping(value = "/updateBmgz", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateBmgz(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        List<Map> list = bmgzService.selectBmgz();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("bmd1",((String[])map.get("bmd1"))[0]);
        /*map2.put("address",((String[])map.get("address"))[0]);*/
        map2.put("bmd2",((String[])map.get("bmd2"))[0]);
        /*map2.put("bmd3",((String[])map.get("bmd3"))[0]);*/
        map2.put("ypaddress",((String[])map.get("ypaddress"))[0]);
        map2.put("wtId","2");
        map2.put("ypId","1");
        if(list ==null || list.isEmpty()){
            bmgzService.insertBmgz(map2);
            bmgzService.insertBmgzyp(map2);
        }else{
            bmgzService.updateBmgz(map2);
            bmgzService.updateBmgzyp(map2);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
}
