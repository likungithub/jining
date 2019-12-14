package com.xinhai.Log.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.Behavior;
import com.xinhai.Log.api.BehaviorService;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;

@Controller
@RequestMapping(value="/BehaviorLog")
public class BehaviorController {
    Logger logger = LogManager.getLogger(BehaviorController.class.getName());
    
    @Autowired
    private BehaviorService behaviorservice;
    
    /**
     * 查询出所有的行为日志
     * @return
     *          返回登录日志list
     */
    @RequestMapping(value = "/log", method = RequestMethod.POST)
    @ResponseBody
    public List<Behavior> findAllLogin(@RequestBody JSONObject date){
        Date starDate=date.getDate("starDate");
        Date endDate=date.getDate("endDate");
        List<Behavior> behavior = behaviorservice.findAll(starDate,endDate);
        return behavior;
    }
    
    @RequestMapping(value = "/log/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Behavior findLog(@PathVariable("id") String id){
        return behaviorservice.findById(id);
    }
    
    /**
     * 分页查询
     * @param start
     *              开始条数
     * @param length
     *              每页数据量
     * @param starDate
     *              开始时间
     * @param endDate
     *              结束时间
     * @return
     *              返回数据
     * @throws ParseException
     */
    @RequestMapping(value= "/log", method = RequestMethod.GET)
    @ResponseBody
    public DatatablesViewPage<Behavior> findAllLog(@RequestParam("start") String start,
            @RequestParam("length") String length,@RequestParam("starDate") String starDate,@RequestParam("endDate") String endDate) throws ParseException{
        String add = "";
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");//小写的mm表示的是分钟  
        Date sDate = sdf.parse(starDate);
        Date eDate = sdf.parse(endDate);
        Calendar begin=Calendar.getInstance();
        begin.setTime(eDate);
        begin.add(Calendar.DAY_OF_MONTH,1);
        add = sdf.format(begin.getTime());
        eDate = sdf.parse(add);
        long totalCount = behaviorservice.findAllLoginLogSize(sDate, eDate);
        List<Behavior> commonProblemTypeList = behaviorservice.getLoginLogByPage(Integer.parseInt(start), Integer.parseInt(length), sDate, eDate);
        DatatablesViewPage<Behavior> datatablesViewPage = new DatatablesViewPage<Behavior>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(commonProblemTypeList);
        return datatablesViewPage;
    }
}
