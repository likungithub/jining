package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.caiyun.systemmanager.dao.CgshMapper;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.CgshService;
import service.CgspService;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "/cgsh")
public class CgshController {
    @Autowired
    private CgshService cgshService;
    @Autowired
    private SystemMessagesService systemMessagesService;

    /**
     *
     * 获得审核的显示数据
     */
    @RequestMapping(value = "/cgshSeach",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> cgshSeach(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("hcmc") String hcmc,
                                             @RequestParam("hclx") String hclx,
                                             @RequestParam("shzt") String shzt,
                                             @RequestParam("startDate") String startDate,
                                             @RequestParam("endDate") String endDate

    ) {
        Map map = new HashMap();
        SimpleDateFormat smf=new SimpleDateFormat("yyyy-MM-dd");
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNULL(hcmc)) {
            map.put("hcmc", hcmc);
        }
        if (notNULL(hclx)) {
            map.put("hclx", hclx);
        }
        if (notNULL(shzt)) {
            map.put("shzt", shzt);
        }
        if(notNULL(startDate)){
            try {
                map.put("startDate",smf.parse(startDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(notNULL(endDate)){
            try {
                map.put("endDate",smf.parse(endDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        List<Map> list = cgshService.queryCgshXx(map);
        int num = cgshService.queryCgshXxNum(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setiTotalDisplayRecords(num);
        return datatablesViewPage;
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
     * 通过操作
     */
    @RequestMapping(value = "/shtg", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject shtg(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            List<String> list = new ArrayList<String>();
            String[] ids = request.getParameter("ids").split(",");
            String zt=request.getParameter("zt");
            String shr = CurrentLoginUser.getUser().getZydm();
            map.put("shr", shr);//审批人
            map.put("shzt",zt);//申请状态 002  通过
            for (int i = 0; i < ids.length; i++) {
                list.add(ids[i]);
            }
            map.put("ids", list);
            cgshService.saveShzt(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /**
     *
     * 退回操作
     */
    @RequestMapping(value = "/shth", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject shth(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            List<Map> mess = new ArrayList<Map>();//消息集合
            SystemMessages systemMessages = new SystemMessages();//发送消息
            List<String> list = new ArrayList<String>();
            String[] ids = request.getParameter("ids").split(",");
            String zt=request.getParameter("zt");
            String shr = CurrentLoginUser.getUser().getZydm();
            map.put("shr", shr);//审批人
            map.put("shzt",zt);//申请状态 002  退回
            for (int i = 0; i < ids.length; i++) {
                list.add(ids[i]);
            }
            map.put("ids", list);
            cgshService.saveShzt(map);//改变审核状态
            mess = cgshService.queryMess(list);
            for (Map user : mess) {//发送到消息提醒中
                try {
                    //消息提醒
                    String txbt = user.get("hcmc") + "审核未通过";
                    String txnr = user.get("hcmc") + "在审核环节中未通过";
                    String txlx = "000";
                    systemMessages.setXxid(UUID.randomUUID().toString());
                    systemMessages.setTxlx_dm(txlx);
                    systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                    systemMessages.setTxbt(txbt);
                    systemMessages.setTxnr(txnr);
                    systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                    systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                    systemMessages.setJsry_dm(user.get("sqr")+"");
                    systemMessages.setFssj(new Date());
                    systemMessagesService.addSystemMessages(systemMessages);
                } catch (Exception e) {
                    System.out.println("发送消息提醒错误！");
                    e.printStackTrace();
                }
            }
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }
}
