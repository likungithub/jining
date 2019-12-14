package com.xinhai.caiyun.systemmanager.controller;


import com.alibaba.fastjson.JSONObject;
import com.sun.org.apache.bcel.internal.generic.NEW;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.systemmanager.api.*;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.xml.crypto.Data;;
import java.util.*;


@Controller
@RequestMapping(value = "/OverdueReminder")
public class OverdueReminderControlle {

    @Autowired
    private OverdueReminderService overdueReminderService; //样品收样

    @Autowired
    private UserService userService;

    /*@RequestMapping(value = "/SelectOverdueReminder")
    @ResponseBody*/
  /*  public List<OverdueReminder> SelectOverdueReminder(HttpServletRequest request) {
        List<OverdueReminder> OverdueReminderResumo = new ArrayList<OverdueReminder>();
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息

        String zxry_dm = user.getZydm();
        // List<YPSYOverdueReminder> SampleCollection=overdueReminderService.querySampleCollection();//t_wt_jbxx  样品收样

        //  List<YPCFOverdueReminder> SampleSplit=overdueReminderService.querySampleSplit();//t_ypgl_jbxx  样品拆分

        //List<RWFPOverdueReminder> Distribution=overdueReminderService.queryDistribution();//ypcf   任务分配

        // List<RWFPOverdueReminder> DistributionPreparation=overdueReminderService.queryDistributionPreparation();//ypcf   任务分配 制备

        //List<YPZBOverdueReminder> Preparation=overdueReminderService.queryPreparation();//t_rwgl_jbxx  样品制备

        //List<JCOverdueReminder> Testing=overdueReminderService.queryTesting();//t_yp_zbwc  检测

        List<BGBZOverdueReminder> PresentationEdit = overdueReminderService.queryPresentationEdit();//t_jcgl_rydm (LX=1)  报告编制

        List<BGSHOverdueReminder> PresentationExamine = overdueReminderService.queryPresentationExamine(zxry_dm);//t_bggl_rydm (LX=0)  报告审核

        List<BGPZOverdueReminder> PresentationApproval = overdueReminderService.queryPresentationApproval(zxry_dm);//t_bggl_rydm (LX=1)  报告批准

        List<BGDYOverdueReminder> PresentationPrinting = overdueReminderService.queryPresentationPrinting();//t_bggl_rydm (LX=2)  报告打印

       *//* for (YPSYOverdueReminder ypsy:SampleCollection){
            OverdueReminder overdueReminder=new OverdueReminder();
            overdueReminder.setDWMC(ypsy.getDWMC());
            overdueReminder.setJchj(ypsy.getJchj());
            overdueReminder.setWTID(ypsy.getWTID());
            overdueReminder.setCqts(ypsy.getCqts());
            overdueReminder.setLRRQ(ypsy.getLRRQ().substring(0,10));
            OverdueReminderResumo.add(overdueReminder);
        }*//*
        *//*for (YPCFOverdueReminder ypcf:SampleSplit){   样品拆分
            OverdueReminder overdueReminder=new OverdueReminder();
            overdueReminder.setDWMC(ypcf.getDWMC());
            overdueReminder.setJchj(ypcf.getJchj());
            overdueReminder.setWTID(ypcf.getWTID());
            overdueReminder.setCqts(ypcf.getCqts());
            overdueReminder.setLRRQ(ypcf.getLRRQ().substring(0,10));
            OverdueReminderResumo.add(overdueReminder);
        }*//*

       *//* for (RWFPOverdueReminder rwfp:Distribution){
            OverdueReminder overdueReminder=new OverdueReminder();
            overdueReminder.setDWMC(rwfp.getDWMC());
            overdueReminder.setJchj(rwfp.getJchj());
            overdueReminder.setWTID(rwfp.getWTID());
            overdueReminder.setCqts(rwfp.getCqts());
            overdueReminder.setLRRQ(rwfp.getLRRQ().substring(0,10));
            OverdueReminderResumo.add(overdueReminder);
        }

        for (RWFPOverdueReminder rwfp:DistributionPreparation){
            OverdueReminder overdueReminder=new OverdueReminder();
            overdueReminder.setDWMC(rwfp.getDWMC());
            overdueReminder.setJchj(rwfp.getJchj());
            overdueReminder.setWTID(rwfp.getWTID());
            overdueReminder.setCqts(rwfp.getCqts());
            overdueReminder.setLRRQ(rwfp.getLRRQ().substring(0,10));
            OverdueReminderResumo.add(overdueReminder);
        }

        for (YPZBOverdueReminder ypzb:Preparation){
            OverdueReminder overdueReminder=new OverdueReminder();
            overdueReminder.setDWMC(ypzb.getDWMC());
            overdueReminder.setJchj(ypzb.getJchj());
            overdueReminder.setWTID(ypzb.getWTID());
            overdueReminder.setCqts(ypzb.getCqts());
            overdueReminder.setLRRQ(ypzb.getLRRQ().substring(0,10));
            OverdueReminderResumo.add(overdueReminder);
        }

        for (JCOverdueReminder jc:Testing){
            OverdueReminder overdueReminder=new OverdueReminder();
            overdueReminder.setDWMC(jc.getDWMC());
            overdueReminder.setJchj(jc.getJchj());
            overdueReminder.setWTID(jc.getWTID());
            overdueReminder.setCqts(jc.getCqts());
            overdueReminder.setLRRQ(jc.getLRRQ().substring(0,10));
            OverdueReminderResumo.add(overdueReminder);
        }
        for (BGBZOverdueReminder bgbz:PresentationEdit){
            OverdueReminder overdueReminder=new OverdueReminder();
            overdueReminder.setDWMC(bgbz.getDWMC());
            overdueReminder.setJchj(bgbz.getJchj());
            overdueReminder.setWTID(bgbz.getWTID());
            overdueReminder.setCqts(bgbz.getCqts());
            overdueReminder.setLRRQ(bgbz.getLRRQ().substring(0,10));
            OverdueReminderResumo.add(overdueReminder);
        }
        for (BGSHOverdueReminder bgsh:PresentationExamine){
            OverdueReminder overdueReminder=new OverdueReminder();
            overdueReminder.setDWMC(bgsh.getDWMC());
            overdueReminder.setJchj(bgsh.getJchj());
            overdueReminder.setWTID(bgsh.getWTID());
            overdueReminder.setCqts(bgsh.getCqts());
            overdueReminder.setLRRQ(bgsh.getLRRQ().substring(0,10));
            OverdueReminderResumo.add(overdueReminder);
        }
        for (BGPZOverdueReminder bgpz:PresentationApproval){
            OverdueReminder overdueReminder=new OverdueReminder();
            overdueReminder.setDWMC(bgpz.getDWMC());
            overdueReminder.setJchj(bgpz.getJchj());
            overdueReminder.setWTID(bgpz.getWTID());
            overdueReminder.setCqts(bgpz.getCqts());
            overdueReminder.setLRRQ(bgpz.getLRRQ().substring(0,10));
            OverdueReminderResumo.add(overdueReminder);
        }*//*
       *//* for (BGDYOverdueReminder bgdy : PresentationPrinting) {  //报告打印
            OverdueReminder overdueReminder = new OverdueReminder();
            overdueReminder.setDWMC(bgdy.getDWMC());
            overdueReminder.setJchj(bgdy.getJchj());
            //overdueReminder.setWTID(bgdy.getWTID());
            overdueReminder.setCqts(bgdy.getCqts());
            overdueReminder.setLRRQ(bgdy.getLRRQ().substring(0, 10));
            OverdueReminderResumo.add(overdueReminder);
        }*//*

       *//* return OverdueReminderResumo;*//*
    }*/

    @RequestMapping(value = "/SelectOverdueReminder1")
    @ResponseBody
    public JSONObject SelectOverdueReminder1(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
       /* List<OverdueReminder> OverdueReminderResumo = new ArrayList<OverdueReminder>();
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
*/
       /* String zxry_dm = user.getZydm();*/
       /* Map cxtj = getQueryTj(request);
        cxtj.put("bs", "bgdy");
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String ny = request.getParameter("ny");
        //杨
        String wtdw = request.getParameter("wtdw");
        if (notNULL(ypbm)) {
            cxtj.put("ypbm", ypbm);
        }
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        if (notNULL(ny)) {
            cxtj.put("ny", ny);
        }
        if (notNULL(wtdw)) {
            cxtj.put("wtdw", wtdw);
        }*/
        /*long totalCount = overdueReminderService.findCount();*/
        List<Map> list = overdueReminderService.findAll();
        jsonObject.put("data", list);

        /*jsonObject.put("YPBM", list);
        jsonObject.put("YPMC", list);
        jsonObject.put("SCDW", list);*/
        /*DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);*/
        return jsonObject;
    }

}
