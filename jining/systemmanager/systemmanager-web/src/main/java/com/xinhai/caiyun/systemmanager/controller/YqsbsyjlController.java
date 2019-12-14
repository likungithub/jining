package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.YqsbsyjlService;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "yqsbsyjl")
public class YqsbsyjlController {
    @Autowired
    private YqsbsyjlService yqsbsyjlService;
    @RequestMapping(value = "/yqsbsyjl")
    @ResponseBody
    public DatatablesViewPage cgsp_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("sbmc") String sbmc
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("sbmc",sbmc);
        System.out.print(sbmc);
        if(!sbmc.equals("")){
            List<Map>list1 = yqsbsyjlService.selectSKbh(map);
            map.put("skbh",list1.get(0).get("skbh"));
        }else{
            map.put("skbh",null);
        }
        List<Map> list = yqsbsyjlService.selectSyjl(map);
        int totalCount=0;
        totalCount= yqsbsyjlService.selectSyjlCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    /**
     * 获取仪器信息
     *
     */
    @RequestMapping(value = "/hqyqsb")
    @ResponseBody
    public List<Map> selectYqsbxx(){
        Map map = new HashMap();
        return yqsbsyjlService.selectYqsb(map);
    }

    /**
     * 获取
     * @return
     */
    @RequestMapping(value = "/hqypxx")
    @ResponseBody
    public List<Map> selectYpxx(){
        Map map = new HashMap();
        return yqsbsyjlService.selectYpxx(map);
    }
    /**
     * 获取相关检测项
     */
    @RequestMapping(value = "/hqjcxm")
    @ResponseBody
    public List<Map> selectJcxm(HttpServletRequest request){
        String ypid = request.getParameter("ypid");
        Map map = new HashMap();
        map.put("ypid",ypid);
        return yqsbsyjlService.selectYqjcx(map);
    }
    /**
     *添加仪器设备使用记录
     */
    @RequestMapping(value = "/addyqsbyp")
    @ResponseBody
    public JSONObject Addnewxx(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("skbh",((String[])map.get("skbh"))[0]);
        map2.put("ypid",((String[])map.get("ypid"))[0]);
        map2.put("jcxmid",((String[])map.get("jcxmid"))[0]);
        map2.put("yqzk",((String[])map.get("yqzk"))[0]);
        map2.put("yhzk",((String[])map.get("yhzk"))[0]);
        map2.put("czr", CurrentLoginUser.getUser().getZydm());
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        System.out.println(df.format(new Date()));// new Date()为获取当前系统时间
        map2.put("dqsj",df.format(new Date()));
        int i = yqsbsyjlService.selectcfwt(map2);
        System.out.print(i);
        if(yqsbsyjlService.selectcfwt(map2)==0){
            yqsbsyjlService.addYqsyjl(map2);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    /**
     * 仪器使用完毕
     */
    @RequestMapping(value = "/finishyqsbyp")
    @ResponseBody
    public JSONObject finishyqsb(Integer[]yqsyjlche){
        JSONObject jsonObject = new JSONObject();
        Map map = new HashMap();
        for (Integer i:yqsyjlche) {
            map.put("id",i);
            yqsbsyjlService.finishYqsy(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
}
