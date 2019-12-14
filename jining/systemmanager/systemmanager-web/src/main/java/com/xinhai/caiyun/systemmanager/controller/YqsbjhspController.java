package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.YqsbjhspService;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "yqsbjhsp")
public class YqsbjhspController {
    @Autowired
    private YqsbjhspService yqsbjhspService;
    @RequestMapping(value = "/selectJdjhSp")
    @ResponseBody
    public DatatablesViewPage select_YqsbcgList(@RequestParam("start")Integer start,
                                                @RequestParam("length")Integer length,
                                                @RequestParam("sbmc")String sbmc,
                                                @RequestParam("skbh")String skbh
    ){
        Map map = new HashMap<>();
        map.put("start",start);
        map.put("length",length);
        map.put("sbmc",sbmc);
        map.put("skbh",skbh);
        map.put("zydm", CurrentLoginUser.getUser().getZydm());
        /*查询身份*/
        List<Map>list2 = yqsbjhspService.selectInd(map);
        if(list2.get(0).get("name").equals("审核人")){
            List<Map> list = yqsbjhspService.selectYqsbjdjh(map);
            int totalCount = 0;
            totalCount = yqsbjhspService.selectJdjhCount(map);
            DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
            dv.setAaData(list);
            dv.setiTotalDisplayRecords(totalCount);
            dv.setiTotalRecords(totalCount);
            return dv;
        }
        if(list2.get(0).get("name").equals("批准人")||list2.get(0).get("name").equals("超级管理员")){
            List<Map> list = yqsbjhspService.selectJdpz(map);
            int totalCount = 0;
            totalCount = yqsbjhspService.selectJdpzCount(map);
            DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
            dv.setAaData(list);
            dv.setiTotalDisplayRecords(totalCount);
            dv.setiTotalRecords(totalCount);
            return dv;
        }
        List<Map> list =new ArrayList<>();
        int totalCount = 0;
        DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    /*审批操作*/
    @RequestMapping(value = "/jdjhsp")
    @ResponseBody
    public JSONObject spYqsbjdjh(Integer []yqzdjhche){
        JSONObject jsonObject =new JSONObject();
        Map map = new HashMap();
        map.put("zydm",CurrentLoginUser.getUser().getZydm());
        List<Map>list2 = yqsbjhspService.selectInd(map);
        if(list2.get(0).get("name").equals("审核人")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.shrsp(map);
            }
        }
        if(list2.get(0).get("name").equals("批准人")||list2.get(0).get("name").equals("超级管理员")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.pzrsp(map);
            }
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    /*退回操作*/
    @RequestMapping(value = "/jdjhth")
    @ResponseBody
    public JSONObject thYqsbjdjh(Integer []yqzdjhche){
        JSONObject jsonObject =new JSONObject();
        Map map = new HashMap();
        map.put("zydm",CurrentLoginUser.getUser().getZydm());
        List<Map>list2 = yqsbjhspService.selectInd(map);
        if(list2.get(0).get("name").equals("审核人")||list2.get(0).get("name").equals("超级管理员")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.shrth(map);
            }
        }
        if(list2.get(0).get("name").equals("批准人")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.pzrth(map);
            }
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/selectWhjhSp")
    @ResponseBody
    public DatatablesViewPage select_YqsbcgList1(@RequestParam("start")Integer start,
                                                @RequestParam("length")Integer length,
                                                @RequestParam("sbmc")String sbmc,
                                                @RequestParam("skbh")String skbh
    ){
        Map map = new HashMap<>();
        map.put("start",start);
        map.put("length",length);
        map.put("sbmc",sbmc);
        map.put("skbh",skbh);
        map.put("zydm", CurrentLoginUser.getUser().getZydm());
        /*查询身份*/
        List<Map>list2 = yqsbjhspService.selectInd(map);
        if(list2.get(0).get("name").equals("审核人")||list2.get(0).get("name").equals("超级管理员")){
            List<Map> list = yqsbjhspService.selectYqsbwhjh(map);
            int totalCount = 0;
            totalCount = yqsbjhspService.selectWhjhCount(map);
            DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
            dv.setAaData(list);
            dv.setiTotalDisplayRecords(totalCount);
            dv.setiTotalRecords(totalCount);
            return dv;
        }
        if(list2.get(0).get("name").equals("批准人")){
            List<Map> list = yqsbjhspService.selectWhpz(map);
            int totalCount = 0;
            totalCount = yqsbjhspService.selectWhpzCount(map);
            DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
            dv.setAaData(list);
            dv.setiTotalDisplayRecords(totalCount);
            dv.setiTotalRecords(totalCount);
            return dv;
        }
        List<Map> list =new ArrayList<>();
        int totalCount = 0;
        DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    /*审批操作*/
    @RequestMapping(value = "/whjhsp")
    @ResponseBody
    public JSONObject spYqsbwhjh(Integer []yqzdjhche){
        JSONObject jsonObject =new JSONObject();
        Map map = new HashMap();
        map.put("zydm",CurrentLoginUser.getUser().getZydm());
        List<Map>list2 = yqsbjhspService.selectInd(map);
        if(list2.get(0).get("name").equals("审核人")||list2.get(0).get("name").equals("超级管理员")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.whshrsp(map);
            }
        }
        if(list2.get(0).get("name").equals("批准人")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.whpzrsp(map);
            }
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    /*退回操作*/
    @RequestMapping(value = "/whjhth")
    @ResponseBody
    public JSONObject thYqsbwhjh(Integer []yqzdjhche){
        JSONObject jsonObject =new JSONObject();
        Map map = new HashMap();
        map.put("zydm",CurrentLoginUser.getUser().getZydm());
        List<Map>list2 = yqsbjhspService.selectInd(map);
        if(list2.get(0).get("name").equals("审核人")||list2.get(0).get("name").equals("超级管理员")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.whshrth(map);
            }
        }
        if(list2.get(0).get("name").equals("批准人")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.whpzrth(map);
            }
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/selectHcjhSp")
    @ResponseBody
    public DatatablesViewPage select_YqsbcgList2(@RequestParam("start")Integer start,
                                                 @RequestParam("length")Integer length,
                                                 @RequestParam("sbmc")String sbmc,
                                                 @RequestParam("skbh")String skbh
    ){
        Map map = new HashMap<>();
        map.put("start",start);
        map.put("length",length);
        map.put("sbmc",sbmc);
        map.put("skbh",skbh);
        map.put("zydm", CurrentLoginUser.getUser().getZydm());
        /*查询身份*/
        List<Map>list2 = yqsbjhspService.selectInd(map);
        if(list2.get(0).get("name").equals("审核人")||list2.get(0).get("name").equals("超级管理员")){
            List<Map> list = yqsbjhspService.selectHcpz(map);
            int totalCount = 0;
            totalCount = yqsbjhspService.selectHcjhCount(map);
            DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
            dv.setAaData(list);
            dv.setiTotalDisplayRecords(totalCount);
            dv.setiTotalRecords(totalCount);
            return dv;
        }
        if(list2.get(0).get("name").equals("批准人")){
            List<Map> list = yqsbjhspService.selectHcpz(map);
            int totalCount = 0;
            totalCount = yqsbjhspService.selectHcpzCount(map);
            DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
            dv.setAaData(list);
            dv.setiTotalDisplayRecords(totalCount);
            dv.setiTotalRecords(totalCount);
            return dv;
        }
        List<Map> list =new ArrayList<>();
        int totalCount = 0;
        DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    /*审批操作*/
    @RequestMapping(value = "/hcjhsp")
    @ResponseBody
    public JSONObject spYqsbhcjh(Integer []yqzdjhche){
        JSONObject jsonObject =new JSONObject();
        Map map = new HashMap();
        map.put("zydm",CurrentLoginUser.getUser().getZydm());
        List<Map>list2 = yqsbjhspService.selectInd(map);
        if(list2.get(0).get("name").equals("审核人")||list2.get(0).get("name").equals("超级管理员")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.hcshrsp(map);
            }
        }
        if(list2.get(0).get("name").equals("批准人")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.hcpzrsp(map);
            }
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    /*退回操作*/
    @RequestMapping(value = "/hcjhth")
    @ResponseBody
    public JSONObject thYqsbhcjh(Integer []yqzdjhche){
        JSONObject jsonObject =new JSONObject();
        Map map = new HashMap();
        map.put("zydm",CurrentLoginUser.getUser().getZydm());
        List<Map>list2 = yqsbjhspService.selectInd(map);
        if(list2.get(0).get("name").equals("审核人")||list2.get(0).get("name").equals("超级管理员")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.hcshrth(map);
            }
        }
        if(list2.get(0).get("name").equals("批准人")){
            for (Integer sk:yqzdjhche
            ) {
                map.put("skbh",sk);
                yqsbjhspService.hcpzrth(map);
            }
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
}
