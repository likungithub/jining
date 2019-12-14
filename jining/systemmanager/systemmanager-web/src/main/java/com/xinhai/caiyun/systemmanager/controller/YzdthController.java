package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.YzdthService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class YzdthController {
    @Autowired
    private YzdthService yzdthService;


    @RequestMapping(value = "/yzdth/queryList" )
    @ResponseBody
    //查找所有的检测量统计数据
    public DatatablesViewPage yzdth_queryList(@RequestParam("start") String start,
                                               @RequestParam("length") String length,
                                               @RequestParam("hcmc") String hcmc
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("hcmc",hcmc);
        List<Map> list=yzdthService.yzdth_queryList(map);
        int totalCount=0;
        totalCount=yzdthService.yzdth_findCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    @RequestMapping(value = "/yzdth/ghsl" )
    @ResponseBody
    public JSONObject ghsl(HttpServletRequest request) {
        JSONObject object = new JSONObject();
        Map map= new HashMap();
        String arry = request.getParameter("ghsl");
        String arry1 = request.getParameter("id");


        map.put("id",arry1);
        map.put("ghsl",arry);

        String c= CurrentLoginUser.getUser().getZydm();
        map.put("zydm", CurrentLoginUser.getUser().getZydm());
        yzdthService.ghsl(map);
        return object;
    }
    @RequestMapping(value = "/yzdth/chuku" )
    @ResponseBody
    //出库操作
    public JSONObject yzdth_Chuku(HttpServletRequest request) throws Exception {
        JSONObject object = new JSONObject();
        String arry = request.getParameter("questionsList");
        List<Map>list = JSONArray.fromObject(arry);
        Map map= new HashMap();
        map.put("hcmc",list.get(0).get("hcmc"));
        map.put("gg",list.get(0).get("gg"));
        map.put("id",list.get(0).get("id"));
        map.put("hclx","3");
        int ti = Integer.parseInt((String)list.get(0).get("sl"));
        System.out.print(ti);
            map.put("sjsl",Integer.parseInt(yzdthService.cgck(map))+ti);


            yzdthService.updateKc(map);
            yzdthService.updateZt(map);
        return object;
    }

}
