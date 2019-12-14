package com.xinhai.caiyun.systemmanager.controller;

import com.sun.org.apache.xpath.internal.operations.Mod;
import com.xinhai.caiyun.systemmanager.api.YqWxsq;
import com.xinhai.caiyun.systemmanager.api.Yqwxcx;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import service.YqWxsqService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
@Controller
@RequestMapping(value = "yqwxsq")
public class YqWxsqController {
    @Autowired
    private YqWxsqService yqWxsqService;
    @RequestMapping(value = "/all")
    public String findAll_yqwxsq(Model model){
        List<YqWxsq> list=yqWxsqService.findAll_YqWxsq();
        model.addAttribute("list",list);
        return "rjlfhzhgl/yqsbgl/yqwxsq/list";
    }
    @RequestMapping(value = "/insert")
    public @ResponseBody List<YqWxsq> insert_yqwxsq(YqWxsq yqWxsq){
        boolean b = yqWxsqService.insert_YqWxsq(yqWxsq);
        List<YqWxsq> list=yqWxsqService.findAll_YqWxsq();
        return list;
    }
    @RequestMapping(value = "/findsome")
    public @ResponseBody List<YqWxsq> findsome(Yqwxcx yqwxcx){
        List<YqWxsq> list = this.yqWxsqService.findsome(yqwxcx);
        return list;
    }
    @RequestMapping(value = "/findyqsbtz")
    public @ResponseBody List<String> findyqsbtz(){
        List<String> list = this.yqWxsqService.findyqsbtz();
        return list;
    }

}