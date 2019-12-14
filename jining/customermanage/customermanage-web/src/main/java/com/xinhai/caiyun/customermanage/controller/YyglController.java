package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.service.YyglService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class YyglController {
    @Autowired
    private YyglService yyglService;

    @RequestMapping(value = "/yygl/yyglSelect",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage yygl_queryList(@RequestParam("start") String start,
                                              @RequestParam("length") String length,
                                              @RequestParam("htmc") String htmc,
                                              @RequestParam("ypmc") String ypmc,
                                              @RequestParam("ypbctj") String ypbctj
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("htmc",htmc);
        map.put("ypmc",ypmc);
        map.put("ypbctj",ypbctj);
        List<Map>list = yyglService.yyglqueryList(map);
        int totalCount=0;
        totalCount=yyglService.yyglCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
}
