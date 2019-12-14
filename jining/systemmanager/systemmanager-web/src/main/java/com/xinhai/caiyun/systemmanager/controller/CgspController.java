package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.CgspService;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping(value = "/cgsp")
public class CgspController {
    @Autowired
    private CgspService cgspService;
    @Autowired
    private SystemMessagesService systemMessagesService;

    /**
     *
     * 获得审批的显示数据
     */
    @RequestMapping(value = "/cgspSeach",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> cgsp_queryList(@RequestParam("start") String start,
                                                  @RequestParam("length") String length,
                                                  @RequestParam("hcmc") String hcmc,
                                                  @RequestParam("hclx") String hclx,
                                                  @RequestParam("sqzt") String sqzt
    ) {
        Map map = new HashMap();
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNULL(hcmc)) {
            map.put("hcmc", hcmc);
        }
        if (notNULL(hclx)) {
            map.put("hclx", hclx);
        }
        if(notNULL(sqzt)){
            map.put("sqzt",sqzt);
        }
        String spr = CurrentLoginUser.getUser().getZydm();
        map.put("spr", spr);
        List<Map> list = cgspService.queryCgspXx(map);
        int num = cgspService.queryCgspXxNum(map);
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
     * 审批通过操作
     */
    @RequestMapping(value = "/sptg", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sptg(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            List<String> list = new ArrayList<String>();
            String[] ids = request.getParameter("ids").split(",");
            String zt = request.getParameter("zt");
            String spr = CurrentLoginUser.getUser().getZydm();
            map.put("spr", spr);//审批人
            map.put("sqzt", zt);//申请状态 002  通过
            for (int i = 0; i < ids.length; i++) {
                list.add(ids[i]);
            }
            map.put("ids", list);
            cgspService.saveSqzt(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /**
     * 陈
     * 退回操作
     */
    @RequestMapping(value = "/spth", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject spth(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            List<Map> mess = new ArrayList<Map>();//消息集合
            SystemMessages systemMessages = new SystemMessages();//发送消息
            List<String> list = new ArrayList<String>();
            String[] ids = request.getParameter("ids").split(",");
            String zt = request.getParameter("zt");
            String spr = CurrentLoginUser.getUser().getZydm();
            map.put("spr", spr);//审批人
            map.put("sqzt", zt);//申请状态 002  退回
            for (int i = 0; i < ids.length; i++) {
                list.add(ids[i]);
            }
            map.put("ids", list);
            cgspService.saveSqzt(map);//改变申请状态
            mess = cgspService.queryMess(list);
            for (Map user : mess) {//发送到消息提醒中
                try {
                    //消息提醒
                    String txbt ="耗材 "+ user.get("hcmc") + " 审批未通过";
                    String txnr ="耗材 "+ user.get("hcmc") + " 在审批环节中未通过";
                    String txlx = "000";
                    systemMessages.setXxid(UUID.randomUUID().toString());
                    systemMessages.setTxlx_dm(txlx);
                    systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                    systemMessages.setTxbt(txbt);
                    systemMessages.setTxnr(txnr);
                    systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                    systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                    systemMessages.setJsry_dm(user.get("sqr").toString());
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
