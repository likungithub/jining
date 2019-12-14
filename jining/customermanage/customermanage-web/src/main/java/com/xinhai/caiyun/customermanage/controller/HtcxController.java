package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.service.HtcxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Controller
@RequestMapping("/htcx")
public class HtcxController {
    @Autowired
    private HtcxService htcxService;
    @RequestMapping("/findAllWt")
    @ResponseBody
    public DatatablesViewPage findAllWt(@RequestParam("start")String start,
                                        @RequestParam("length")String length,
                                        @RequestParam("htmc")String htmc,
                                        @RequestParam("dwmc")String dwmc,
                                        @RequestParam("startDate")String startDate,
                                        @RequestParam("endDate")String endDate
                                        ) {
        Map map=new HashMap();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        map.put("start",Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("htmc",htmc);
        map.put("dwmc",dwmc);
        if(startDate!=null&&startDate!=""){
            try {
                map.put("startDate",sdf.parse(startDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(endDate!=null&&endDate!=""){
            try {
                map.put("endDate",sdf.parse(endDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        List<Map> list= htcxService.findAllWt(map);
        int num=htcxService.findWtCount(map);
        DatatablesViewPage<Map> datatablesViewPage=new DatatablesViewPage<Map>();
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        return datatablesViewPage;
    }
    /**
     * 查找对应样品信息
     */
    @RequestMapping("/findYp")
    @ResponseBody
    public DatatablesViewPage<Map> findYpByWtid(@RequestParam("wtid") String wtid,
                                                @RequestParam("start") String start,
                                                @RequestParam("length") String length
                                                ){
        Map map=new HashMap();
        map.put("wtid",wtid);
        map.put("start",Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        DatatablesViewPage<Map> datatablesViewPage=new DatatablesViewPage<Map>();
        Integer num=htcxService.findYpNum(map);
        List<Map> list=htcxService.findYpByWtid(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        return datatablesViewPage;
    };
}
