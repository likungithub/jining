package com.xinhai.caiyun.customermanage.controller;


import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.GztzService;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("zgtz")
public class GztzCobtroller {

    @Autowired
    private GztzService kcglService;


    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    //组装通用查询条件
    public Map getQueryTj(HttpServletRequest request) {
        String start = request.getParameter("start");
        String length = request.getParameter("length");

        Map cxtj = new HashMap();
        if (notNULL(start)) {
            cxtj.put("start", start);
        }

        if (notNULL(length)) {
            cxtj.put("length", length);
        }

        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        cxtj.put("zydm", zydm);
        return cxtj;
    }

    //根据人员 获取 工作量统计信息
    @ResponseBody
    @RequestMapping("/getGzltjByRy")
    public DatatablesViewPage getGzltjByRy(HttpServletRequest request){
        Map map = getQueryTj(request);
        String ryxm = request.getParameter("ryxm");
        String rqq = request.getParameter("rqq");
        String rqz = request.getParameter("rqz");


        if(ryxm!=null && ryxm.trim().length()!=0)
        {
            map.put("ryxm",ryxm);
        }
        if(rqq!=null && rqq.trim().length()!=0)
        {
            map.put("rqq",rqq);
        }
        if(rqz!=null && rqz.trim().length()!=0)
        {
            map.put("rqz",rqz);
        }

        List<Map> list=this.kcglService.getGzltjByRy(map);
        long count = this.kcglService.getGzltjByRyNum(map);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setiTotalDisplayRecords(count);
        datatablesViewPage.setiTotalRecords(count);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    //根据人员 获取 工作量统计信息 明细
    @ResponseBody
    @RequestMapping("/getGzltjByRyMx")
    public DatatablesViewPage getGzltjByRyMx(HttpServletRequest request){
        Map map = getQueryTj(request);
        String ryxm = request.getParameter("name");
        String rqq = request.getParameter("rqq");
        String rqz = request.getParameter("rqz");
        String lie = request.getParameter("lie");

        if(ryxm!=null && ryxm.trim().length()!=0 && !ryxm.equals("null"))
        {
            map.put("ryxm",ryxm);
        }
        if(lie==null || lie.trim().length()==0 || lie.equals("null"))
        {
            lie="1";
        }
        map.put("lie",lie);
        if(rqq!=null && rqq.trim().length()!=0 && !rqq.equals("null"))
        {
            map.put("rqq",rqq);
        }
        if(rqz!=null && rqz.trim().length()!=0 && !rqz.equals("null"))
        {
            map.put("rqz",rqz);
        }

        List<Map> list=this.kcglService.getGzltjByRyMx(map);
        long count = this.kcglService.getGzltjByRyMxNum(map);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setiTotalDisplayRecords(count);
        datatablesViewPage.setiTotalRecords(count);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

}

