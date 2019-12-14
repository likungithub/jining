package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.YqsbjdjhService;
import service.YqsbjdjlService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
@RequestMapping(value = "yqsbjdjl")
public class YqsbjdjlController {
    @Autowired
    private YqsbjdjlService yqsbjdjlService;
    @RequestMapping(value = "/selectYqsbjdjl")
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
        List<Map> list = yqsbjdjlService.selectYqsbjdjl(map);
        int totalCount = 0;
        totalCount = yqsbjdjlService.selectJdjlCount(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    @RequestMapping(value = "/zdjdjl")
    @ResponseBody
    public JSONObject zdJdjh(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("skbh",((String[])map.get("skbh"))[0]);
        map2.put("sbmc",((String[])map.get("sbmc"))[0]);
        map2.put("jdjg",((String[])map.get("jdjg"))[0]);
        map2.put("jdrq",((String[])map.get("jdrq"))[0]);
        map2.put("yxrq",((String[])map.get("yxrq"))[0]);
        map2.put("jdyj",((String[])map.get("jdyj"))[0]);
        map2.put("jdjl",((String[])map.get("jdjl"))[0]);
        map2.put("zsbh",((String[])map.get("zsbh"))[0]);
        map2.put("qryj",((String[])map.get("qryj"))[0]);
        map2.put("jdjig",((String[])map.get("jdjig"))[0]);
        yqsbjdjlService.updateJdjl(map2);
        yqsbjdjlService.insertJdjllsb(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/zdwhjl")
    @ResponseBody
    public JSONObject zdWhjh(HttpServletRequest request)throws Exception{
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("skbh",((String[])map.get("skbh"))[0]);
        map2.put("sbmc",((String[])map.get("sbmc"))[0]);
        map2.put("whr",((String[])map.get("whr"))[0]);
        map2.put("whrq",((String[])map.get("whrq"))[0]);
        map2.put("whjl",((String[])map.get("whjl"))[0]);
        yqsbjdjlService.updateWhjl(map2);
        yqsbjdjlService.insertWhjllsb(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }

    @RequestMapping(value = "/zdhcjl")
    @ResponseBody
    public JSONObject zdHcjh(HttpServletRequest request)throws Exception{
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("skbh",((String[])map.get("skbh"))[0]);
        map2.put("sbmc",((String[])map.get("sbmc"))[0]);
        map2.put("hcr",((String[])map.get("hcr"))[0]);
        map2.put("hcrq",((String[])map.get("hcrq"))[0]);
        map2.put("hcyj",((String[])map.get("hcyj"))[0]);
        map2.put("hcjl",((String[])map.get("hcjl"))[0]);
        map2.put("hcjg",((String[])map.get("hcjg"))[0]);
        yqsbjdjlService.updateHcjl(map2);
        yqsbjdjlService.insertHcjllsb(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
    //导出检定记录excel表
    @RequestMapping("/exportDqJdjlExcel")
    @ResponseBody
    public void exportDqJdjlExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String jddj1 = request.getParameter("dq");
        String date1 = request.getParameter("sbjddata1");
        String date2 = request.getParameter("sbjddata2");
        List<Map<String,String>>list1 = new ArrayList<>();
        XSSFWorkbook workbook=null;
        Map map2 = new HashMap();
        if(!(jddj1).equals("")){
            if(("省").equals(jddj1.substring(jddj1.length()-1))){
                map2.put("province",jddj1);
                map2.put("city","");
                map2.put("village","");
                list1.add(map2);
//                list1 = addressResolution(jddj1);
            }else if(("市").equals(jddj1.substring(jddj1.length()-1))&&(!jddj1.contains("省"))){
                map2.put("province","");
                map2.put("city",jddj1);
                map2.put("village","");
                list1.add(map2);
            } else {
                list1 = addressResolution(jddj1);
            }
            System.out.print(list1.get(0).get("province"));
            Map map1 = new HashMap();

            if(!(list1.get(0).get("province").equals(""))){
                map1.put("province",list1.get(0).get("province"));
            }else{
                map1.put("province","暂无");
            }
            if(!(list1.get(0).get("city").equals(""))){
                map1.put("city",list1.get(0).get("city"));
            }else{
                map1.put("city","暂无");
            }
            if(!(list1.get(0).containsKey("village"))){
                map1.put("village",list1.get(0).get("village"));
            }else{
                map1.put("village","暂无");
            }

            map1.put("startDate",date1);
            map1.put("endDate",date2);
            response.reset(); //清除buffer缓存
            Map<String,Object> map=new HashMap<String,Object>();
            // 指定下载的文件名，浏览器都会使用本地编码，即GBK，浏览器收到这个文件名后，用ISO-8859-1来解码，然后用GBK来显示
            // 所以我们用GBK解码，ISO-8859-1来编码，在浏览器那边会反过来执行。
            response.setHeader("Content-Disposition", "attachment;filename=" + new String("检定记录表.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            workbook =yqsbjdjlService.exportdqExcel(map1);
        }else{
            response.reset(); //清除buffer缓存
            Map<String,Object> map=new HashMap<String,Object>();
            // 指定下载的文件名，浏览器都会使用本地编码，即GBK，浏览器收到这个文件名后，用ISO-8859-1来解码，然后用GBK来显示
            // 所以我们用GBK解码，ISO-8859-1来编码，在浏览器那边会反过来执行。
            response.setHeader("Content-Disposition", "attachment;filename=" + new String("检定记录表.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            workbook =yqsbjdjlService.exportdqAllExcel();
        }
        OutputStream output;
        try {
            output = response.getOutputStream();
            BufferedOutputStream bufferedOutPut = new BufferedOutputStream(output);
            bufferedOutPut.flush();
            workbook.write(bufferedOutPut);
            bufferedOutPut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static List<Map<String,String>> addressResolution(String address){
        String regex="((?<province>[^省]+省|.+自治区)|上海|北京|天津|重庆)(?<city>[^市]+市|.+自治州)(?<county>[^县]+县|.+区|.+镇|.+局)?(?<town>[^区]+区|.+镇)?(?<village>.*)";
        Matcher m=Pattern.compile(regex).matcher(address);
        String province=null,city=null,county=null,town=null,village=null;
        List<Map<String,String>> table=new ArrayList<Map<String,String>>();
        Map<String,String> row=null;
        while(m.find()){
            row=new LinkedHashMap<String,String>();
            province=m.group("province");
            row.put("province", province==null?"":province.trim());
            city=m.group("city");
            row.put("city", city==null?"":city.trim());
            county=m.group("county");
            row.put("county", county==null?"":county.trim());
            town=m.group("town");
            row.put("town", town==null?"":town.trim());
            village=m.group("village");
            row.put("village", village==null?"":village.trim());
            table.add(row);
        }
        return table;
    }
    //导出检定记录excel表
    @RequestMapping("/exportJdjlExcel")
    @ResponseBody
    public  void exportJdjlExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String tempids=request.getParameter("ids");
        String[] ids=tempids.split(",");
        if(ids.length>0){
            response.reset(); //清除buffer缓存
            Map<String,Object> map=new HashMap<String,Object>();
            // 指定下载的文件名，浏览器都会使用本地编码，即GBK，浏览器收到这个文件名后，用ISO-8859-1来解码，然后用GBK来显示
            // 所以我们用GBK解码，ISO-8859-1来编码，在浏览器那边会反过来执行。
            response.setHeader("Content-Disposition", "attachment;filename=" + new String("检定记录表.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            XSSFWorkbook workbook=null;
            workbook =yqsbjdjlService.exportExcel(ids);
            OutputStream output;
            try {
                output = response.getOutputStream();
                BufferedOutputStream bufferedOutPut = new BufferedOutputStream(output);
                bufferedOutPut.flush();
                workbook.write(bufferedOutPut);
                bufferedOutPut.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    //导出维护记录excel表
    @RequestMapping("/exportWhjlExcel")
    @ResponseBody
    public  void exportWhjlExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String tempids=request.getParameter("ids");
        String[] ids=tempids.split(",");
        if(ids.length>0){
            response.reset(); //清除buffer缓存
            Map<String,Object> map=new HashMap<String,Object>();
            // 指定下载的文件名，浏览器都会使用本地编码，即GBK，浏览器收到这个文件名后，用ISO-8859-1来解码，然后用GBK来显示
            // 所以我们用GBK解码，ISO-8859-1来编码，在浏览器那边会反过来执行。
            response.setHeader("Content-Disposition", "attachment;filename=" + new String("维护记录表.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            XSSFWorkbook workbook=null;
            workbook =yqsbjdjlService.exportwhjlExcel(ids);
            OutputStream output;
            try {
                output = response.getOutputStream();
                BufferedOutputStream bufferedOutPut = new BufferedOutputStream(output);
                bufferedOutPut.flush();
                workbook.write(bufferedOutPut);
                bufferedOutPut.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    //导出核查记录excel表
    @RequestMapping("/exportHcjlExcel")
    @ResponseBody
    public  void exportHcjlExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String tempids=request.getParameter("ids");
        String[] ids=tempids.split(",");
        if(ids.length>0){
            response.reset(); //清除buffer缓存
            Map<String,Object> map=new HashMap<String,Object>();
            // 指定下载的文件名，浏览器都会使用本地编码，即GBK，浏览器收到这个文件名后，用ISO-8859-1来解码，然后用GBK来显示
            // 所以我们用GBK解码，ISO-8859-1来编码，在浏览器那边会反过来执行。
            response.setHeader("Content-Disposition", "attachment;filename=" + new String("核查记录表.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            XSSFWorkbook workbook=null;
            workbook =yqsbjdjlService.exporthcjlExcel(ids);
            OutputStream output;
            try {
                output = response.getOutputStream();
                BufferedOutputStream bufferedOutPut = new BufferedOutputStream(output);
                bufferedOutPut.flush();
                workbook.write(bufferedOutPut);
                bufferedOutPut.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
