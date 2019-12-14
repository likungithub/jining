package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.Cgck2Service;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class Cgck2Controller {
    @Autowired
    private Cgck2Service cgck2Service;


    @RequestMapping(value = "/cgck2/queryList" )
    @ResponseBody
    //查找所有的检测量统计数据
    public DatatablesViewPage cgck2_queryList(@RequestParam("start") String start,
                                               @RequestParam("length") String length,
                                               @RequestParam("hcmc") String hcmc/*,
                                               @RequestParam("startDate") String startDate,
                                               @RequestParam("endDate") String endDate*/
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("hcmc",hcmc);
       /* SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
        if(startDate!=null && startDate!=""){
            try {
                map.put("startDate",sf.parse(startDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(endDate!=null && endDate!=""){
            try {
                map.put("endDate",sf.parse(endDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }*/
        List<Map> list=cgck2Service.cgck2_queryList(map);
        int totalCount=0;
        totalCount=cgck2Service.cgck2_findCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }


    @RequestMapping(value = "/cgck2/chuku" )
    @ResponseBody
    //出库操作
    public JSONObject cgck2_Chuku(HttpServletRequest request) throws Exception {
        JSONObject object = new JSONObject();
        String arry = request.getParameter("questionsList");
        List<Map>list = JSONArray.fromObject(arry);
        Map map= new HashMap();
        map.put("hcmc",list.get(0).get("hcmc"));
        map.put("gg",list.get(0).get("gg"));
        map.put("id",list.get(0).get("id"));
        String lx = (String) list.get(0).get("hclx");
        if(lx.equals("化学品")){
            map.put("hclx","2");
        }
        if(lx.equals("标准物质")){
            map.put("hclx","4");
        }
        if(lx.equals("易制毒")){
            map.put("hclx","3");
        }
        if(lx.equals("一般耗材")){
            map.put("hclx","1");
        }
      //  map.put("hclx",list.get(0).get("hclx"));
        int ti = Integer.parseInt((String)list.get(0).get("sl"));
        if(cgck2Service.cgck(map)!=null&&Integer.parseInt(cgck2Service.cgck(map))>=ti){
            map.put("sjsl",Integer.parseInt(cgck2Service.cgck(map))-ti);
            cgck2Service.updateKc(map);
            cgck2Service.updatesqKc(map);
            cgck2Service.updateZt(map);
            object.put("success", true);
        }else{
            object.put("success", false);
            object.put("message","库存数量不足!");
        };
        return object;
    }

}
