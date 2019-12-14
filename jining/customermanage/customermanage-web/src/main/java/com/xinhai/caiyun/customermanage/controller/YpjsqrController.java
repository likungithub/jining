package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.service.YpjsqrService;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/ypjsqr")
public class YpjsqrController {
    @Autowired
    private YpjsqrService ypjsqrService;
    @RequestMapping("/findAllYpjsqr")
    @ResponseBody
    public DatatablesViewPage findAllYpjsqr(@RequestParam("start")String start,
                                            @RequestParam("length")String length,
                                            @RequestParam("ypmc") String ypmc,
                                            @RequestParam("jszt") String jszt
                                        ) {
        Map map=new HashMap();
        map.put("start",Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("ypmc",ypmc);
        map.put("jszt",jszt);
        map.put("zydm",CurrentLoginUser.getUser().getZydm());
        String A=CurrentLoginUser.getUser().getZydm();
        List<Map> list= ypjsqrService.findAllYpjsqr(map);
        int num=ypjsqrService.findAllYpjsqrNum(map);
        DatatablesViewPage<Map> datatablesViewPage=new DatatablesViewPage<Map>();
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        return datatablesViewPage;
    }
    @RequestMapping(value = "/updateYpjszt",method = RequestMethod.POST)
    @ResponseBody
    public String updateYpjszt(String ids){
        String[] id=ids.split(",");
        for(int i=0;i<id.length;i++){
            ypjsqrService.updateJszt(id[i]);
        }
        return "OK";
    }
}
