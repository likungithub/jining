package com.xinhai.caiyun.systemmanager.controller;
import com.xinhai.caiyun.systemmanager.api.YqWhjl1;
import com.xinhai.caiyun.systemmanager.api.YqWxsq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.YqWhjlService;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "yqwhjl")
public class YqwhjlControl {
    @Autowired
    private YqWhjlService yqWhjlService;
    @RequestMapping(value = "/findall")
    public @ResponseBody List<YqWxsq> findAll(){
        List<YqWxsq> list = this.yqWhjlService.findAll();
        return list;
    }
    @RequestMapping(value = "/findall1")
    public  @ResponseBody List<YqWhjl1> findAll1(){
        List<YqWxsq> list=this.yqWhjlService.findAll();
        YqWhjl1 yqWhjl1 = null;
        List<YqWhjl1> list1 = new ArrayList<YqWhjl1>();
        for (YqWxsq  y:list){
            yqWhjl1=new YqWhjl1();
            yqWhjl1.setId(y.getId());
            yqWhjl1.setBzxx(y.getBzxx());
            yqWhjl1.setName(y.getName());
            yqWhjl1.setScrq(y.getScrq());
            yqWhjl1.setWhnr(y.getWhnr());
            yqWhjl1.setZt(y.getZt());
            yqWhjl1.setWhr(y.getWhr());
            yqWhjl1.setWhrq(y.getWhrq());
            list1.add(yqWhjl1);
        }
        return list1;
    }

    @RequestMapping(value = "/delete")
    public @ResponseBody List<YqWxsq> deleteOne(@RequestParam String id){
        System.out.println(id);
        this.yqWhjlService.deleteOne(id);
        return this.yqWhjlService.findAll();
    }
    @RequestMapping(value = "/findone")
    public @ResponseBody YqWxsq findOne(@RequestParam String id){
        return this.yqWhjlService.findOne(id);
    }
    @RequestMapping(value="/update")
    public @ResponseBody List<YqWxsq> updateOne(YqWxsq yqWxsq){
        this.yqWhjlService.update(yqWxsq);
        return this.yqWhjlService.findAll();
    }
}
