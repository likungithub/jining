package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.service.HyglService;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class HyglController {
@Autowired
    private HyglService hyglService;
@RequestMapping(value = "/hygl/selectHygl")
@ResponseBody
public DatatablesViewPage hygl_queryList(@RequestParam("start") String start,
                                          @RequestParam("length") String length,
                                          @RequestParam("hyry") String hyry,
                                          @RequestParam("ypmc") String ypmc,
                                          @RequestParam("htmc") String htmc
) {
    Map map=new HashMap();
    map.put("start", Integer.parseInt(start));
    map.put("length",Integer.parseInt(length));
    map.put("htmc",htmc);
    map.put("ypmc",ypmc);
    map.put("hyry",hyry);
    List<Map>list = hyglService.selectHyglList(map);
    int totalCount=0;
    totalCount=hyglService.selectCount(map);
    DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
    dv.setAaData(list);
    dv.setiTotalDisplayRecords(totalCount);
    dv.setiTotalRecords(totalCount);
    return dv;
}
@RequestMapping(value = "/hygl/hyglUpdate")
    @ResponseBody
    public void hyglM(Integer[] che){
    Map map = null;
    for (Integer ch:che) {
        map=new HashMap();
        map.put("id",ch);
        System.out.println(ch);
        String zydm = CurrentLoginUser.getUser().getZydm();
        map.put("zydm",zydm);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        Date str = new Date();
        String s = sf.format(str.getTime());
        System.out.println(s);
        map.put("hysj",s);
        //TODO 将退还人员名称同时保存，看mapper的xml中对应的方法传参
        hyglService.updateHygl(map);
    }
    }
}
