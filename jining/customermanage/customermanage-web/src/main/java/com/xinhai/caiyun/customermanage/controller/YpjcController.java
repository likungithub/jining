package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.caiyun.customermanage.dao.YpjcMapper;
import com.xinhai.caiyun.customermanage.service.YpjcService;
import com.xinhai.security.api.CurrentLoginUser;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "/ypjc")
public class YpjcController {
    @Autowired
    private YpjcService ypjcService;
    @Autowired
    private SystemMessagesService systemMessagesService;
    @Autowired
    private YpjcMapper ypjcMapper;

    private String[] jcxIds = null;

    /**
     * 检测数据录入模态框显示数据源
     */
    @RequestMapping(value = "/ypjcEdit", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage ypjc_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("ypid1") String ypid1,
                                             @RequestParam("jcxmc") String jcxmc,
                                             @RequestParam("tjzt") String tjzt,
                                             @RequestParam("bzzt") String bzzt
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNULL(ypid1)) {
            map.put("ypid1", ypid1);
        }
        if (notNULL(jcxmc)) {
            map.put("jcxmc", jcxmc);
        }
        if (notNULL(tjzt)) {
            map.put("tjzt", tjzt);
        }
        if (notNULL(bzzt)) {
            map.put("bzzt", bzzt);
        }
        String dqry = CurrentLoginUser.getUser().getZydm();
        map.put("dqry", dqry);
        List<Map> list = ypjcService.selectLr(map);
        int totalCount = 0;
        totalCount = ypjcService.selectCount(map);

        //多检测项，不做检测值 是否合格判定
        List<Map> list2 = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++){
            Map map1 = new HashMap();
            if (list.get(i).get("jcz") != "" && list.get(i).get("jcz") != null){
                String jcz =list.get(i).get("jcz").toString();
                map1.put("jcz",jcz);
            }
            if (list.get(i).get("jcxmid") != "" && list.get(i).get("jcxmid") != null){
                String jcxmid =list.get(i).get("jcxmid").toString();
                map1.put("jcxmid",jcxmid);
            }
            if (list.get(i).get("xlzdw") != "" && list.get(i).get("xlzdw") != null){
                String xlzdw =list.get(i).get("xlzdw").toString();
                map1.put("xlzdw",xlzdw);
            }
            if (list.get(i).get("tjzt") != "" && list.get(i).get("tjzt") != null){
                String ttjzt =list.get(i).get("tjzt").toString();
                map1.put("tjzt",ttjzt);
            }
            if (list.get(i).get("jcxmbz") != "" && list.get(i).get("jcxmbz") != null){
                String jcxmbz =list.get(i).get("jcxmbz").toString();
                map1.put("jcxmbz",jcxmbz);
            }
            if (list.get(i).get("zbypbm") != "" && list.get(i).get("zbypbm") != null){
                String zbypbm =list.get(i).get("zbypbm").toString();
                map1.put("zbypbm",zbypbm);
            }
            if (list.get(i).get("xlz") != "" && list.get(i).get("xlz") != null){
                String xlz =list.get(i).get("xlz").toString();
                map1.put("xlz",xlz);
            }
            if (list.get(i).get("ypid") != "" && list.get(i).get("ypid") != null){
                String ypid =list.get(i).get("ypid").toString();
                map1.put("ypid",ypid);
            }
            if (list.get(i).get("zwmc") != "" && list.get(i).get("zwmc") != null){
                String zwmc =list.get(i).get("zwmc").toString();
                map1.put("zwmc",zwmc);
            }
            if (list.get(i).get("e_date") != "" && list.get(i).get("e_date") != null){
                String e_date =list.get(i).get("e_date").toString();
                map1.put("e_date",e_date);
            }
            if (list.get(i).get("wd") != "" && list.get(i).get("wd") != null){
                String wd =list.get(i).get("wd").toString();
                map1.put("wd",wd);
            }
            if (list.get(i).get("sd") != "" && list.get(i).get("sd") != null){
                String sd =list.get(i).get("sd").toString();
                map1.put("sd",sd);
            }
            if (list.get(i).get("yqnames") != "" && list.get(i).get("yqnames") != null){
                String yqnames =list.get(i).get("yqnames").toString();
                map1.put("yqnames",yqnames);
            }
            if (list.get(i).get("bzwz") != "" && list.get(i).get("bzwz") != null){
                String bzwz =list.get(i).get("bzwz").toString();
                map1.put("bzwz",bzwz);
            }
            if (list.get(i).get("jcr") != "" && list.get(i).get("jcr") != null){
                String jcr =list.get(i).get("jcr").toString();
                map1.put("jcr",jcr);
            }
            if (list.get(i).get("bzzt") != "" && list.get(i).get("bzzt") != null){
                String tbzzt =list.get(i).get("bzzt").toString();
                map1.put("bzzt",tbzzt);
            }
            if (list.get(i).get("s_date") != "" && list.get(i).get("s_date") != null){
                String s_date =list.get(i).get("s_date").toString();
                map1.put("s_date",s_date);
            }
            if (list.get(i).get("jcx") != "" && list.get(i).get("jcx") != null){
                String jcx =list.get(i).get("jcx").toString();
                map1.put("jcx",jcx);
            }
            if (list.get(i).get("jcff") != "" && list.get(i).get("jcff") != null){
                String jcff =list.get(i).get("jcff").toString();
                map1.put("jcff",jcff);
            }
            if (list.get(i).get("xlz") != "" && list.get(i).get("xlz") != null){
                String xlz =list.get(i).get("xlz").toString();
                map1.put("xlz",xlz);
            }
            if (list.get(i).get("jcfa") != "" && list.get(i).get("jcfa") != null){
                String jcfa =list.get(i).get("jcfa").toString();
                map1.put("jcfa",jcfa);
            }
            if (list.get(i).get("jcxmjl") != "" && list.get(i).get("jcxmjl") != null){
                String jcxmjl =list.get(i).get("jcxmjl").toString();
                map1.put("jcxmjl",jcxmjl);
            }
            if (list.get(i).get("jldw") != "" && list.get(i).get("jldw") != null){
                String jldw =list.get(i).get("jldw").toString();
                map1.put("jldw",jldw);
            }
            if (list.get(i).get("pdyj") != "" && list.get(i).get("pdyj") != null){
                String pdyj =list.get(i).get("pdyj").toString();
                map1.put("pdyj",pdyj);
            }
            if (list.get(i).get("BZFFJCXDW") != "" && list.get(i).get("BZFFJCXDW") != null){
                String jcxdw =list.get(i).get("BZFFJCXDW").toString();
                map1.put("BZFFJCXDW",jcxdw);
            }
            if (list.get(i).get("BJF") != "" && list.get(i).get("BJF") != null){
                String bjf =list.get(i).get("BJF").toString();
                map1.put("BJF",bjf);
            }
            if (list.get(i).get("WD") != "" && list.get(i).get("WD") != null){
                String wd =list.get(i).get("WD").toString();
                map1.put("WD",wd);
            }
            if (list.get(i).get("SD") != "" && list.get(i).get("SD") != null){
                String sd =list.get(i).get("SD").toString();
                map1.put("SD",sd);
            }
            Integer zongshu =totalCount;
            map1.put("zongshu",zongshu);
            list2.add(map1);
        }
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list2);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    /**
     * 检测的值更新到数据库里
     */
    @RequestMapping(value = "/updateYpjc", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject ypjc_update(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String array = request.getParameter("questionsList");
            List<Map> list = JSONArray.fromObject(array);
            SimpleDateFormat smf = new SimpleDateFormat("yyyy-MM-dd");
            for(Map jcxMap :list)
            {
                Map map = new HashMap();
                String jcz = jcxMap.get("jcz") + "";
                String wd = jcxMap.get("wd")+ "";
                String sd = jcxMap.get("sd")+ "";
                String bzzt = jcxMap.get("bzzt")+ "";
                String jcxmid = jcxMap.get("jcxmid") + "";
                String jcxmjl = jcxMap.get("jcxmjl")+ "";
                String ypid = jcxMap.get("ypid") + "";
                String bzwz = jcxMap.get("bzwz") + "";
                String xlz = jcxMap.get("xlz") + "";
                String jcxmbz = jcxMap.get("jcxmbz") + "";
                String jldw = jcxMap.get("jldw") + "";
                String xlzdw = jcxMap.get("xlzdw") + "";
                String jcx = jcxMap.get("jcx") + "";
                String jcx_bjf = jcxMap.get("jcx_bjf") + "";

                if (notNULL(jcz)) {
                    map.put("jcz", jcz);//检测值
                }
                if (notNULL(xlzdw)) {
                    map.put("xlzdw", xlzdw);//限量值单位
                }
                if (notNULL(jcxmbz)) {
                    map.put("jcxmbz", jcxmbz);//检测项备注
                }
                if (notNULL(xlz)) {
                    map.put("xlz", xlz);//限量值
                }
                if (notNULL(jldw)) {
                    map.put("jldw", jldw);//检测单位
                }
                if (notNULL(jcx)) {
                    map.put("jcx", jcx);//检测限
                }
                if (notNULL(bzwz)) {
                    map.put("bzwz", bzwz);//标准物质
                }
                if (notNULL(wd)) {
                    map.put("wd", wd);
                }
                if (notNULL(sd)) {
                    map.put("sd", sd);
                }
                if (notNULL(bzzt)) {//业务室保存检测项的状态
                    map.put("bzzt", bzzt);
                }
                if (notNULL(jcxmid)) {
                    map.put("jcxmid", jcxmid);//检测项目id
                }
                if (notNULL(ypid)) {
                    map.put("ypid", ypid);//样品id
                }
                if (notNULL(jcxmjl)) {
                    map.put("jcxmjl", jcxmjl);//检测项目结论
                }
                if (notNULL(jcx_bjf)) {
                    map.put("jcx_bjf", jcx_bjf);//检测项目的比较符号
                }
                if (notNULL(wd)) {
                    map.put("wd", wd);//检测项目结论
                }
                if (notNULL(sd)) {
                    map.put("sd", sd);//检测项目的比较符号
                }
                map.put("jcry", CurrentLoginUser.getUser().getZydm());
                ypjcService.updateYpjc(map);
            }
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /*关联仪器*/
    @RequestMapping("/addJcxIds")
    @ResponseBody
    public Map addJcxIds(String[] ypjcche) {
        jcxIds = null;
        jcxIds = ypjcche;
        Map map = new HashMap();
        map.put("info", "增加成功");
        return map;
    }

    /**
     * 增加仪器
     */
    @RequestMapping(value = "/addYq", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject addYq(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String ypid = request.getParameter("ypid");
            String jcxmid = request.getParameter("jcxmid");
            String yqids = request.getParameter("yqids");
            String yqnames = request.getParameter("yqnames");
            Map map = new HashMap();
            if (notNULL(ypid)) {
                map.put("ypid", ypid);
            }
            if (notNULL(jcxmid)) {
                map.put("jcxmid", jcxmid);
            }
            if (notNULL(yqids)) {
                map.put("yqids", yqids);
            }
            if (notNULL(yqnames)) {
                map.put("yqnames", yqnames);
            }
            ypjcService.addYqOnJcxm(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }

        return json;
    }

    /**
     * 保存报告制备选择仪器
     */
    @RequestMapping(value = "/addBgbzYq", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject addBgzbYq(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String ypid = request.getParameter("ypid");
            String yqids = request.getParameter("yqids");
            Map map = new HashMap();
            if (notNULL(ypid)) {
                map.put("ypid", ypid);
            }
            if (notNULL(yqids)) {
                map.put("yqids", yqids);
            }
            //查询样品编码是否存在
            String yqsb = ypjcMapper.yqsb(map);
            //如果存在，清空这个样品下所有数据
            if(yqsb == null || "".equals(yqsb)){
                ypjcMapper.insertYqsb(map);
            }else {
                ypjcMapper.delYqsb(map);
                ypjcMapper.insertYqsb(map);
            }
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }

        return json;
    }

    //查找所有仪器
    @RequestMapping(value = "/findAllYq", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> findAllYq(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("sbmc") String sbmc,
                                             @RequestParam("skbh") String skbh
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNULL(sbmc)) {
            map.put("sbmc", sbmc);
        }
        if (notNULL(skbh)) {
            map.put("skbh", skbh);
        }
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        List<Map> list = ypjcService.findAllYq(map);
        Integer num = ypjcService.findAllYqNum(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setiTotalDisplayRecords(num);
        return datatablesViewPage;
    }


    //根据样品查询仪器
    @RequestMapping(value = "/findYpYq", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> findYpYq(@RequestParam("start") String start,
                                            @RequestParam("length") String length,
                                            @RequestParam("sbmc") String sbmc,
                                            @RequestParam("skbh") String skbh,
                                            @RequestParam("ypid") String ypid
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNULL(sbmc)) {
            map.put("sbmc", sbmc);
        }
        if (notNULL(skbh)) {
            map.put("skbh", skbh);
        }
        map.put("ypid",ypid);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        List<Map> list = ypjcMapper.findYqByYpid(map);
        Integer num = ypjcMapper.findYqNumByYpid(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setiTotalDisplayRecords(num);
        return datatablesViewPage;
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
     * 保存检测信息录入中的数据；
     */
    @RequestMapping(value = "/updateJcxxlr", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject jcxxlr_update(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String array = request.getParameter("questionsList");
            List<Map> list = JSONArray.fromObject(array);
            SimpleDateFormat smf = new SimpleDateFormat("yyyy-MM-dd");
            String e_date = smf.format(new Date());
            String jcz = list.get(0).get("jcz") + "";
            String wd = list.get(0).get("wd").toString();
            String sd = list.get(0).get("sd").toString();
            String tjzt = list.get(0).get("tjzt") + "";
            String jcxmid = list.get(0).get("jcxmid") + "";
            String ypid = list.get(0).get("ypid") + "";
            Map map = new HashMap();
            if (notNULL(jcz)) {
                map.put("jcz", jcz);//检测值
            }
            if (notNULL(wd)) {
                map.put("wd", wd);
            }
            if (notNULL(sd)) {
                map.put("sd", sd);
            }
            if (notNULL(tjzt)) {//业务室保存检测项的状态
                map.put("tjzt", tjzt);
            }
            if (notNULL(jcxmid)) {
                map.put("jcxmid", jcxmid);//检测项目id
            }
            if (notNULL(ypid)) {
                map.put("ypid", ypid);//样品id
            }
            map.put("e_date", e_date);//j检测结束日期
            map.put("jcry", CurrentLoginUser.getUser().getZydm());//检测人员
            ypjcService.updateYpjc(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /**
     * 检测项提交发送消息提醒
     */
    @RequestMapping(value = "/sendMessage", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sendMessage(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            String messages= request.getParameter("messages");
            List<String> list = new ArrayList<String>();
            list.add("唐龙");
            list.add("史晓华");
            list.add("庞春燕");
            list.add("管理员");
            List<String> zydms = ypjcService.queryZydmByNames(list);
            SystemMessages systemMessages = new SystemMessages();
            if(messages!=null && !"".equals(messages)){
                for (String zydm : zydms) {
                    //消息提醒
                    String txbt = "";
                    String txnr = "";
                    String txlx = "";
                    txbt = "检测项提交提醒";
                    txlx = "201";
                    txnr = CurrentLoginUser.getUser().getName()+"提交了:"+messages;
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
                }
            }
            jsonObject.put("success",true);
        }catch (Exception e){
            jsonObject.put("success",false);
        }
        return jsonObject;
    }
}
