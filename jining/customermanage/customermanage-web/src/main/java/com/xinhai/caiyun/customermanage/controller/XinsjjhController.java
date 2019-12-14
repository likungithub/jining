package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.xinhai.caiyun.customermanage.api.XinsjjhService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class XinsjjhController {
    @Autowired
    private XinsjjhService xinsjjhService;

    /**陈
     * *数据校验
     * @param start
     * @param length
     * @param ypid1
     * @return
     */
    @RequestMapping(value = "/xinsjjh/sjjh")
    @ResponseBody
    public DatatablesViewPage<Map> sjjh_queryList(  // HttpServletRequest request,
                                              @RequestParam("start") String start,
                                              @RequestParam("length") String length,
                                              @RequestParam("ypid1") String ypid1) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("ypid1",ypid1);
        List<Map> list1=xinsjjhService.sjjh_queryList(map);
        int totalCount=0;
        try {
            totalCount=xinsjjhService.sjjh_findCount(map);
        }catch (Exception e){
            totalCount=1;
        }
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list1);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    //数据复核
    @RequestMapping(value = "/xinsjjh/sjfh")
    @ResponseBody
    public DatatablesViewPage<Map> sjfh_queryList(  // HttpServletRequest request,
                                                    @RequestParam("start") String start,
                                                    @RequestParam("length") String length,
                                                    @RequestParam("ypid1") String ypid1) {
        //Map map = request.getParameterMap();
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("ypid1",ypid1);
        List<Map> list1=xinsjjhService.sjfh_queryList(map);
        int totalCount=0;
        try {
            totalCount=xinsjjhService.sjfh_findCount(map);
        }catch (Exception e){
            totalCount=1;
        }
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list1);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }


}
