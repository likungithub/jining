package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import service.YqsbcgService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "yqsbcg")
public class YqsbcgController {
@Autowired
    private YqsbcgService yqsbcgService;
/*查看仪器设备采购申请*/
    @RequestMapping(value = "/yqsbcgSeatch")
    @ResponseBody
    public DatatablesViewPage select_YqsbcgList(@RequestParam("start")Integer start,
                                                @RequestParam("length")Integer length,
                                                @RequestParam("cgmc")String cgmc
    ){
       Map map = new HashMap<>();
       map.put("start",start);
       map.put("length",length);
       map.put("cgmc",cgmc);
       List<Map> list = yqsbcgService.selectYqsbcg(map);
       int totalCount = 0;
       totalCount = yqsbcgService.selectYqCount(map);
       DatatablesViewPage<Map> dv = new DatatablesViewPage<>();
       dv.setAaData(list);
       dv.setiTotalDisplayRecords(totalCount);
       dv.setiTotalRecords(totalCount);
       return dv;
    }
    /*新增采购申请*/
    @RequestMapping(value = "/insertCgsq")
    @ResponseBody
    public Map addYq(HttpServletRequest request){
        Map map1 = request.getParameterMap();
        System.out.println(map1);
        Map map2 = new HashMap();
        map2.put("cgmc",((String[])map1.get("cgmc"))[0]);
        map2.put("pp",((String[])map1.get("pp"))[0]);
        map2.put("xh",((String[])map1.get("xh"))[0]);
        map2.put("zl",((String[])map1.get("zl"))[0]);
        map2.put("sqr", CurrentLoginUser.getUser().getZydm());
        List<Map>list2 = yqsbcgService.selectBmdm(map2);
        map2.put("sqbm",list2.get(0).get("bmdm"));
        map2.put("bzxx",((String[])map1.get("bzxx"))[0]);
        map2.put("bj",((String[])map1.get("bj"))[0]);
        map2.put("sl",((String[])map1.get("sl"))[0]);
        map2.put("yt",((String[])map1.get("yt"))[0]);
        yqsbcgService.insertYqsbcg(map2);
        Map map=new HashMap();
        map.put("info","增加成功");
        return map;
    }
    /*删除采购申请*/
    @RequestMapping(value = "/deleteYqsq")
    @ResponseBody
    public Map delYq(Integer []yqsbcgche){
        Map map1 = new HashMap();
        for(Integer ch:yqsbcgche){
            map1.put("id",ch);
            yqsbcgService.deleteYqsbcgsq(map1);
        }
        Map map=new HashMap();
        map.put("info","删除成功");
        return map;
    }
    /*修改仪器采购申请*/
    @RequestMapping(value = "/updateYqsbcgsq")
    @ResponseBody
    public Map updateYq(HttpServletRequest request){
        Map map1 = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("cgmc",((String[])map1.get("cgmc"))[0]);
        map2.put("pp",((String[])map1.get("pp"))[0]);
        map2.put("xh",((String[])map1.get("xh"))[0]);
        map2.put("zl",((String[])map1.get("zl"))[0]);
//        map2.put("sqr",((String[])map1.get("sqr"))[0]);
        map2.put("bzxx",((String[])map1.get("bzxx"))[0]);
        map2.put("bj",((String[])map1.get("bj"))[0]);
        map2.put("sl",((String[])map1.get("sl"))[0]);
        map2.put("yt",((String[])map1.get("yt"))[0]);
//        map2.put("sqbm",((String[])map1.get("sqbm"))[0]);
        map2.put("id",((String[])map1.get("id"))[0]);
        yqsbcgService.updateYqsbcgsq(map2);
        Map map=new HashMap();
        map.put("info","修改成功");
        return map;
    }
    /*提交采购申请*/
    @RequestMapping(value = "/cgsqSubmit")
    @ResponseBody
    public Map submitCgsq(Integer[]yqsbcgche){
        Map map1 = new HashMap();
        for(Integer ch:yqsbcgche){
            map1.put("id",ch);
            yqsbcgService.submitCgsq(map1);
        }
        Map map=new HashMap();
        map.put("info","提交成功");
        return map;
    }
    @RequestMapping(value = "/yqcgspSeach")
    @ResponseBody
    public DatatablesViewPage cgsp_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("cgmc") String cgmc
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("cgmc",cgmc);
        String dqry = CurrentLoginUser.getUser().getZydm();
        map.put("dqry",dqry);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        String str = sf.format(new Date().getTime());
        map.put("clsj",str);
        List<Map>list1 = yqsbcgService.findInd(map);
        System.out.println(list1.get(0).get("name"));
        if(list1.get(0).get("name").equals("实验室主管")){
            List<Map> list = yqsbcgService.findYqcgsqsys(map);
            int totalCount=0;
            totalCount= yqsbcgService.findCountsys(map);
            DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
            dv.setAaData(list);
            dv.setiTotalDisplayRecords(totalCount);
            dv.setiTotalRecords(totalCount);
            return dv;
        }
        if(list1.get(0).get("name").equals("分管主任")){
            List<Map> list = yqsbcgService.findYqcgsqfg(map);
            int totalCount=0;
            totalCount= yqsbcgService.findCountfg(map);
            DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
            dv.setAaData(list);
            dv.setiTotalDisplayRecords(totalCount);
            dv.setiTotalRecords(totalCount);
            return dv;
        }
        if(list1.get(0).get("name").equals("单位负责人")||list1.get(0).get("name").equals("超级管理员")){
            List<Map> list = yqsbcgService.findYqcgsqdw(map);
            int totalCount=0;
            totalCount= yqsbcgService.findCountdw(map);
            DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
            dv.setAaData(list);
            dv.setiTotalDisplayRecords(totalCount);
            dv.setiTotalRecords(totalCount);
            return dv;
        }
        /*id,cgmc,gg,xh,sl,dj,je,sfjj,sqzt,sqly*/
        List<Map>list3 = new ArrayList<>();
        int totalCount = 0;
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list3);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    /*审批仪器采购申请*/
    @RequestMapping(value = "/spyqcgsq")
    @ResponseBody
    public void cgsp_querySp(Integer[]yqsbcgspche) {
        Map map=new HashMap();
        String dqry = CurrentLoginUser.getUser().getZydm();
        map.put("dqry",dqry);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        String str = sf.format(new Date().getTime());
        map.put("spsj",str);
        List<Map>list1 = yqsbcgService.findInd(map);
        System.out.println(list1.get(0).get("name"));
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        String strdate = sd.format(new Date().getTime());
        if(list1.get(0).get("name").equals("实验室主管")){
            for (Integer ch:yqsbcgspche) {
                map.put("id",ch);
                map.put("sspsj",strdate);
                yqsbcgService.syszgSP(map);
            }
        }
        if(list1.get(0).get("name").equals("分管主任")){
            for (Integer ch:yqsbcgspche) {
                map.put("id",ch);
                map.put("fspsj",strdate);
                yqsbcgService.fggrSP(map);
            }
        }
        if(list1.get(0).get("name").equals("单位负责人")||list1.get(0).get("name").equals("超级管理员")){
            for (Integer ch:yqsbcgspche) {
                map.put("id",ch);
                map.put("dspsj",strdate);
                yqsbcgService.dwfzrSP(map);
            }
        }
    }
    @RequestMapping(value = "/yqspth")
    @ResponseBody
    public void cgsp_queryTh(Integer[]yqsbcgspche) {
        Map map=new HashMap();
        String dqry = CurrentLoginUser.getUser().getZydm();
        map.put("dqry",dqry);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        String str = sf.format(new Date().getTime());
        map.put("spsj",str);
        List<Map>list1 = yqsbcgService.findInd(map);
        System.out.println(list1.get(0).get("name"));
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        String strdate = sd.format(new Date().getTime());
        if(list1.get(0).get("name").equals("实验室主管")||list1.get(0).get("name").equals("超级管理员")){
            for (Integer ch:yqsbcgspche) {
                map.put("id",ch);
                map.put("sspsj",strdate);
                yqsbcgService.syszgTH(map);
            }
        }
        if(list1.get(0).get("name").equals("分管主任")){
            for (Integer ch:yqsbcgspche) {
                map.put("id",ch);
                map.put("fspsj",strdate);
                yqsbcgService.fggrTH(map);
            }
        }
        if(list1.get(0).get("name").equals("单位负责人")){
            for (Integer ch:yqsbcgspche) {
                map.put("id",ch);
                map.put("dspsj",strdate);
                yqsbcgService.dwfzrTH(map);
            }
        }
    }
    /*导入Excel表中的数据*/
    @RequestMapping(value = "/downloadYqcgsqExcel")
    @OperateLog(describe = "loading.....")
    @ResponseBody
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importYqcgsq = "/ExcelModel/yqsbcgsq.xlsx";//导入摸板路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("yqsbcgsq.xlsx".getBytes("GBK"),"ISO-8859-1"));
        //记录已完成下载的数据
        long downloadlength = 0L;
        try{
            /*①PrintWriter out=response.getWriter();
            out对象用于输出字符流数据
            ②ServletOutputStream  os=response.getOutputStream();
            os用于输出字符流数据或者二进制的字节流数据都可以*/
            //打开本地文件流
            InputStream in = this.getClass().getResourceAsStream(importYqcgsq);
            OutputStream os = response.getOutputStream();
            //字节流循环写入
            byte[]b = new byte[2048];
            int length;
            while ((length = in.read(b))>0){
                os.write(b,0,length);
               downloadlength +=b.length;
            }
            //关闭流
            os.close();
            in.close();
        }catch (Exception e){
            throw e;
        }
    }
    @RequestMapping(value = "/importYqsbcgsqExcel")
    @ResponseBody
    public JSONObject importCgsqExcel(HttpServletRequest request, Model model) throws Exception {
        //获取上传的文件
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("upYqcgsqFile");
        InputStream in = file.getInputStream();
        String name=file.getOriginalFilename();
        yqsbcgService.importCgsqExcel(in,file);
        //数据导入
        in.close();
        JSONObject jo=new JSONObject();
        jo.put("info","导入成功");
        return jo;
    }
}
