package com.xinhai.caiyun.systemmanager.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.LyspService;
import service.LysqService;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/lysp")
public class LyspController {

    @Autowired
    private LyspService lyspService;

    /**
     *
     * 获得一级审批的数据
     */
    @RequestMapping(value = "/lysp1Seach",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> lysp1Seach(@RequestParam("start") String start,
                                              @RequestParam("length") String length,
                                              @RequestParam("hcmc") String hcmc
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("lyspr1", CurrentLoginUser.getUser().getZydm());
        if (ifNull(hcmc)) {
            map.put("hcmc", hcmc);
        }
        List<Map> list = lyspService.queryLysp1All(map);
        int totalCount = 0;
        totalCount = lyspService.queryLysp1AllNum(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    /**
     *
     * 判断是否为空值
     */
    public boolean ifNull(String obj) {
        Boolean flag = true;
        if (obj == null) {
            flag = false;
        }
        ;
        if ("".equals(obj)) {
            flag = false;
        }
        return flag;
    }

    /**
     * 一级审批的通过和退回操作
     */
    @RequestMapping(value = "/saveZt1",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveZt1(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            String lx = request.getParameter("lx");
            String[] ids = request.getParameter("ids").split(",");
            if (ifNull(lx)) {
                map.put("lx", lx);
            }
            map.put("lyspr1", CurrentLoginUser.getUser().getZydm());
            map.put("lyspr2", CurrentLoginUser.getUser().getZydm());
            if ("001".equals(lx)) {//通过
                for (int i = 0; i < ids.length; i++) {
                    String hclx=lyspService.queryHclxById(ids[i]);
                    String id=ids[i];
                    map.put("hclx",hclx);
                    map.put("id",id);
                    lyspService.saveZt1(map);
                }
            }
            if ("002".equals(lx)) {//退回
                for (int i = 0; i < ids.length; i++) {
                    //String lyr=lyspService.queryLyrById(ids[i]);
                    String id=ids[i];
                    map.put("id",id);
                    lyspService.saveZt1(map);
                }
            }
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
        }
        return json;
    }
    /**
     *
     * 获得二级审批的数据
     */
    @RequestMapping(value = "/lysp2Seach")
    @ResponseBody
    public DatatablesViewPage<Map> lysp2Seach(@RequestParam("start") String start,
                                              @RequestParam("length") String length,
                                              @RequestParam("hcmc") String hcmc
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("lyspr2", CurrentLoginUser.getUser().getZydm());
        if (ifNull(hcmc)) {
            map.put("hcmc", hcmc);
        }
        List<Map> list = lyspService.queryLysp2All(map);
        int totalCount = 0;
        totalCount = lyspService.queryLysp2AllNum(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    /**
     * 二级审批的通过和退回操作
     */
    @RequestMapping(value = "/saveZt2",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveZt2(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            String lx = request.getParameter("lx");
            String[] ids = request.getParameter("ids").split(",");
            if (ifNull(lx)) {
                map.put("lx", lx);
            }
            map.put("lyspr1", CurrentLoginUser.getUser().getZydm());
            map.put("lyspr2", CurrentLoginUser.getUser().getZydm());
            if ("001".equals(lx)) {//通过
                for (int i = 0; i < ids.length; i++) {
                    String id=ids[i];
                    map.put("id",id);
                    lyspService.saveZt2(map);
                }
            }
            if ("002".equals(lx)) {//退回
                for (int i = 0; i < ids.length; i++) {
                    //String lyr=lyspService.queryLyrById(ids[i]);
                    String id=ids[i];
                    map.put("id",id);
                    lyspService.saveZt2(map);
                }
            }
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
        }
        return json;
    }

}
