package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.YqsbjdjhService;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "yqsbjdjh")
public class YqsbjdjhController {
    @Autowired
    private YqsbjdjhService yqsbjdjhService;
    @RequestMapping(value = "/selectYqsbjdjh")
    @ResponseBody
    public DatatablesViewPage select_YqsbcgList(@RequestParam("start")Integer start,
                                                @RequestParam("length")Integer length,
                                                @RequestParam("sbmc")String sbmc,
                                                @RequestParam("skbh")String skbh
    ){
        Map map = new HashMap<>();
        map.put("start",start);
        map.put("length",length);
        map.put("sbmc",sbmc);
        map.put("skbh",skbh);
        List<Map> list = yqsbjdjhService.selectYqsbjdjh(map);
        int totalCount = 0;
        totalCount = yqsbjdjhService.selectJdjhCount(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    @RequestMapping(value = "/zdjdjh")
    @ResponseBody
    public JSONObject zdJdjh(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("skbh",((String[])map.get("skbh"))[0]);
        map2.put("sbmc",((String[])map.get("sbmc"))[0]);
        map2.put("jhjdrq",((String[])map.get("jhjdrq"))[0]);
        map2.put("jhxcjdrq",((String[])map.get("jhxcjdrq"))[0]);
        map2.put("zydm", CurrentLoginUser.getUser().getZydm());
        yqsbjdjhService.updateJdjh(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/zdwhjh")
    @ResponseBody
    public JSONObject zdWhjh(HttpServletRequest request)throws Exception{
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("skbh",((String[])map.get("skbh"))[0]);
        map2.put("sbmc",((String[])map.get("sbmc"))[0]);
        String jhwhrq = ((String[])map.get("jhwhrq"))[0];
        String jhxcwhrq = ((String[])map.get("jhxcwhrq"))[0];
        map2.put("jhwhrq",jhwhrq);
        map2.put("jhxcwhrq",jhxcwhrq);
        map2.put("zydm", CurrentLoginUser.getUser().getZydm());
        int tol = daysBetween(jhwhrq,jhxcwhrq);
        Integer bypc = 365/tol;
        map2.put("bypc",bypc);
        yqsbjdjhService.updateWhjh(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
    public static int daysBetween(String smdate,String bdate) throws Exception{
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.setTime(sdf.parse(smdate));
        long time1 = cal.getTimeInMillis();
        cal.setTime(sdf.parse(bdate));
        long time2 = cal.getTimeInMillis();
        long between_days=(time2-time1)/(1000*3600*24);
        return Integer.parseInt(String.valueOf(between_days));
    }
    @RequestMapping(value = "/zdhcjh")
    @ResponseBody
    public JSONObject zdHcjh(HttpServletRequest request)throws Exception{
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("skbh",((String[])map.get("skbh"))[0]);
        map2.put("sbmc",((String[])map.get("sbmc"))[0]);
        String jhhcrq = ((String[])map.get("jhhcrq"))[0];
        map2.put("jhhcrq",jhhcrq);
        SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd");
        String nowDate = sdf.format(new Date().getTime());
        int tol = daysBetween(nowDate,jhhcrq);
        Integer hcpc = 365/tol;
        map2.put("hcpc",hcpc);
        map2.put("zydm", CurrentLoginUser.getUser().getZydm());
        yqsbjdjhService.updateHcjh(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
}
