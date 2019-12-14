package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import com.xinhai.caiyun.customermanage.dao.BgmbxzMapper;
import com.xinhai.caiyun.customermanage.service.BgmbxzService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/bglq")
public class BglqController {
    @Autowired
    private BgmbxzService bgmbxzService;
    @Autowired
    private BgglMapper bgglMapper;
    @Autowired
    private BgmbxzMapper bgmbxzMapper;

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
        cxtj.put("zydm",zydm);
        return cxtj;
    }


    @RequestMapping(value = "/kehuqz" )
    @ResponseBody
    public JSONObject hehuqianzi(HttpServletRequest request)throws Exception {
        String wtid = request.getParameter("id");
        /*String qzlj = request.getParameter("url");*/
        request.getSession().getServletContext().setAttribute("id",wtid);
        JSONObject object = new JSONObject();
        String command = "cmd /c C:\\qianzidemo\\immortal.bat";
        try{
//            Runtime.getRuntime().exec(command);
            object.put("success", true);
        }catch (Exception e){
            object.put("success", false);
            object.put("message","操作失败！");
        }
        return object;
    }


    @RequestMapping(value = "/qzlj")
    @ResponseBody
    public JSONObject qianzilj(HttpServletRequest request){
        JSONObject object = new JSONObject();
        String id = request.getSession().getServletContext().getAttribute("id").toString();
        String url = request.getParameter("url");
        int ypcount = bgmbxzMapper.selectYpbm(id);
        //若样品表存在此样品编码则向样品表存入客户签字url
        if(ypcount > 0){
            Map map = new HashMap();
            map.put("ypbm",id);
            //查询样品编码ID
            Map ypId = bgmbxzMapper.selectYpid(map);
            String zz = ypId.get("id").toString();
            Map map1 = new HashMap();
            map1.put("url",url);
            map1.put("ypid",ypId.get("id").toString());
            bgmbxzMapper.upThrqz(map1);
        }else {
            Map qzlj = new HashMap();
            qzlj.put("id",id);
            qzlj.put("url",url);
            Map slzt = bgmbxzMapper.ifsl(qzlj);
            String ifsl = slzt.get("if_sl").toString();
            if(ifsl.equals("1")){
                bgmbxzMapper.updateqzlj(qzlj);
            }
            if(ifsl.equals("0")){
                bgmbxzMapper.updatewtqz(qzlj);
            }
        }
        return  object;
    }

    //报告领取
    @RequestMapping(value = "/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage bglqquerylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
        //rwfplb
      //  cxtj.put("bs","bglq");
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        if(notNULL(ypbm)){
            cxtj.put("ypbm",ypbm);
        }
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if(notNULL(ypmc)){
            cxtj.put("ypmc",ypmc);
        }

        List<Map> list = bgmbxzMapper.bglqfindAll(cxtj);
        long totalCount = bgmbxzMapper.bglqfindCount(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }



}
