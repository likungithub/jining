package com.xinhai.caiyun.systemmanager.controller;


import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.SyhcljlService;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import com.alibaba.fastjson.JSON;
@Controller
@RequestMapping(value = "syhcljl")
public class SyhcljlController {
    @Autowired
    private SyhcljlService syhcljlService;

    /**
     * 陈
     * 获得采购申请的数据
     *
     * @return
     */
    @RequestMapping(value = "/findByNaTy")
    @ResponseBody
    public DatatablesViewPage<Map> findByName(
            @RequestParam("start") String start,
            @RequestParam("length") String length,
            @RequestParam("hcmc") String hcmc,
            @RequestParam("hclx") String hclx
    ) {
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        Map map = new HashMap();
        if(notNULL(hclx)){
            map.put("hclx",hclx);
        }
        if(notNULL(hcmc)){
            map.put("hcmc",hcmc);
        }
        List<Map> list = syhcljlService.findByNaTy(map);
        Integer num = syhcljlService.findByNaTyNum(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        return datatablesViewPage;
    }
    /**
     * 陈
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
     * 新增操作
     */
    @RequestMapping(value = "/addCgsq",method =RequestMethod.POST)
    @ResponseBody
    public JSONObject addCgsq(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String hcmc = request.getParameter("hcmc");
            String kqr = request.getParameter("kqr");
            String kqsj = request.getParameter("kqsj");
            String syljl = request.getParameter("syljl");
            String bzq = request.getParameter("bzq");
            String cfwz = request.getParameter("cfwz");
            Map map = new HashMap();
            map.put("hcmc", hcmc);
            map.put("kqr", kqr);
            map.put("kqsj", kqsj);
            map.put("syljl", syljl);
            map.put("bzq", bzq);
            map.put("cfwz", cfwz);
            syhcljlService.addCgsq(map);
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
        }
        return json;
    }

    /**
     * 批量删除
     */
    @RequestMapping(value = "/deleteCgsq",method =RequestMethod.POST)
    @ResponseBody
    public JSONObject deleteCgsq(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String[] arryids = request.getParameter("ids").split(",");
            List<String> ids=new ArrayList<String>();
            for(int i=0;i<arryids.length;i++){
                ids.add(arryids[i]);
            }
//            删除
            syhcljlService.deleteCgsq(ids);
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
        }
        return json;
    }

    @RequestMapping(value = "/yp",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject yp(HttpServletRequest request){
        JSONObject json=new JSONObject();
        try {
        List dy=new ArrayList();
        String[] idsArry=request.getParameter("ids").split(",");
        for(int i=0;i<idsArry.length;i++){
                dy.add(idsArry[i]);
            }
            List<Map> list=syhcljlService.yp(dy);
            List list1=new ArrayList();
            List list2=new ArrayList();
            List list3=new ArrayList();
            List list4=new ArrayList();
            List list5=new ArrayList();
            List list6=new ArrayList();
            for(Map map : list){
//                tscDyypbm.setParmeter(map,sl);//调用打印机  进行打印
                String hcmc = map.get("hcmc").toString();
                String kqr = map.get("kqr").toString();
                String kqsj = map.get("kqsj").toString();
                String syl = map.get("syl").toString();
                String bzq = map.get("bzq").toString();
                String cfwz = map.get("cfwz").toString();
                list1.add(hcmc);
                list2.add(kqr);
                list3.add(kqsj);
                list4.add(syl);
                list5.add(bzq);
                list6.add(cfwz);
            }
            json.put("list1",list1);
            json.put("list2",list2);
            json.put("list3",list3);
            json.put("list4",list4);
            json.put("list5",list5);
            json.put("list6",list6);
            json.put("success",true);

        }
        catch (Exception e){
            json.put("success",false);
        }
        return  json;
    };
}
