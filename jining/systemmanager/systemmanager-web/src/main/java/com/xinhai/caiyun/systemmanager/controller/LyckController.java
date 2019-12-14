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
import service.LyckService;
import service.LyspService;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/lyck")
public class LyckController {
    @Autowired
    private LyckService lyckService;

    /**
     *
     * 获得领用出库的数据
     */
    @RequestMapping(value = "/lyckSeach",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> lyckSeach(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("hcmc") String hcmc,
                                             @RequestParam("hclx") String hclx
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("lyr", CurrentLoginUser.getUser().getZydm());
        if(notNULL(hclx)){
            map.put("hclx",hclx);
        }
        if (notNULL(hcmc)) {
            map.put("hcmc", hcmc);
        }
        List<Map> list = lyckService.queryLyckAll(map);
        int totalCount = 0;
        totalCount = lyckService.queryLyckAllNum(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    /**
     *
     * 不为空的检测
     */
    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }


    /**
     *
     * 出库
     */
    @RequestMapping(value = "/saveCk", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveCk(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = null;
            String[] ids = request.getParameter("ids").split(",");
            for (int i = 0; i < ids.length; i++) {
                Integer kcsl= Integer.parseInt(lyckService.queryKcNum(ids[i]));//库存数量
                Integer lysl= Integer.parseInt(lyckService.queryLyNum(ids[i]));//领用数量
                Integer sl=0;
                try {
                    sl=kcsl-lysl;
                }catch (Exception e){
                    sl=kcsl;
                }
                map = new HashMap();
                map.put("id",ids[i]);
                map.put("sl",sl);
                lyckService.saveCkzt(map);
            }
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
        }
        return json;
    }

}
