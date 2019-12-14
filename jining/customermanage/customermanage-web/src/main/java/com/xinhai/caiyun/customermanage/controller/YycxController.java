package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.service.YycxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class YycxController {
    @Autowired
    private YycxService yycxService;
    @RequestMapping(value = "/yycx/yycx")
    @ResponseBody
    public DatatablesViewPage yycx_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("htmc") String htmc,
                                             @RequestParam("ypmc") String ypmc
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("htmc",htmc);
        map.put("ypmc",ypmc);
        List<Map> list = yycxService.findYycx(map);
        int totalCount=0;
        totalCount=yycxService.findCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
}
