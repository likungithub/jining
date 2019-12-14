package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.caiyun.customermanage.service.YpzbfpService;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.KcglService;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/ypzbfp")
public class YpzbfpController {
    @Autowired
    private KcglService kcglService;
    @Autowired
    private SystemMessagesService systemMessagesService;
    @Autowired
    private YpzbfpService ypzbfpService;

    @RequestMapping(value = "/queryAll", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage yygl_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("ypbm") String ypbm,
                                             @RequestParam("ypmc") String ypmc,
                                             @RequestParam("zbfpzt") String zbfpzt
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNULL(ypbm)) {
            map.put("ypbm", ypbm);
        }
        if (notNULL(ypmc)) {
            map.put("ypmc", ypmc);
        }
        if (notNULL(zbfpzt)) {
            map.put("zbfpzt", zbfpzt);
        }
        List<Map> list = ypzbfpService.queryAll(map);
        int totalCount = 0;
        totalCount = ypzbfpService.queryAllNum(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    /**
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
     * 样品制备任务分配
     */
    @RequestMapping(value = "/saveFp", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveFp(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map map = new HashMap();
            SimpleDateFormat smf = new SimpleDateFormat("yyyy-MM-dd");
            String ypid = request.getParameter("ypid");
            String zbrydm = request.getParameter("zxry");
            if (notNULL(ypid)) {
                map.put("ypid", ypid);
            }
            if (notNULL(zbrydm)) {
                map.put("zbrydm", zbrydm);
            }
            map.put("zbfpsj", smf.format(new Date()));
            map.put("zbfpzt", "002");
            if(zbrydm!=null){
                String[] zydms=zbrydm.split(",");
                String zbryNames="";
                for(int i=0;i<zydms.length;i++){
                    zbryNames=zbryNames+","+ypzbfpService.getUserName(zydms[i]);
                }
                zbryNames=zbryNames.substring(1,zbryNames.length());
                map.put("zbrynames",zbryNames);
            }
            ypzbfpService.saveFp(map);
            jsonObject.put("success", true);
            SystemMessages systemMessages = new SystemMessages();
            List<String> zydmList = kcglService.queryZydm(null);
                for (String zydm : zydmList) {
                    try {
                        //消息提醒
                        String txbt = "";
                        String txnr = "";
                        String txlx = "";
                        txbt = "制备任务分配完成提醒";
                        txlx = "201";
                        txnr = CurrentLoginUser.getUser().getName() +"分配了制备任务，样品ID为："+ypid;
                        systemMessages.setXxid(UUID.randomUUID().toString());
                        systemMessages.setTxlx_dm(txlx);
                        systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                        systemMessages.setTxbt(txbt);
                        systemMessages.setTxnr(txnr);
                        systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                        systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                        systemMessages.setJsry_dm(zydm);
                        systemMessages.setFssj(new Date());
                        systemMessagesService.addSystemMessages(systemMessages);
                    } catch (Exception e) {
                        System.out.println("发送消息提醒错误！");
                        e.printStackTrace();
                    }
                }

        } catch (Exception e) {
            jsonObject.put("success", false);
        }
        return jsonObject;
    }
    /**
     * 样品制备任务退回
     */
    @RequestMapping(value = "/saveBack", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveBack(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map map = new HashMap();
            String ypid = request.getParameter("ypid");
            if (notNULL(ypid)) {
                map.put("ypid", ypid);
            }
            map.put("ypid",ypid);
            map.put("zbfpzt", "001");
            ypzbfpService.saveBack(map);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
        }
        return jsonObject;
    }
}
