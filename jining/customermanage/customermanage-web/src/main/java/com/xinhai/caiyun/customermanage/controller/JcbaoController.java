package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.dao.JcbaoMapper;
import com.xinhai.caiyun.customermanage.service.JcbaoService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;

@Controller
@RequestMapping("jcb")
public class JcbaoController {
    @Autowired
    private JcbaoMapper jcbaoMapper;
    @Autowired
    private JcbaoService jcbaoService;
    /*    @RequestMapping(value = "getAllJcb")
        @ResponseBody
        public DatatablesViewPage getJcbAll(@RequestParam("start")Integer start,
                                            @RequestParam("length")Integer length,
                                            @RequestParam("ypmc")String ypmc,
                                            @RequestParam("wtdwmc") String wtdwmc )throws Exception{
            String str = CurrentLoginUser.getUser().getZydm();
            List<Map> map = this.jcbaoMapper.findAll(ypmc,wtdwmc,start,length,str);
            DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
            datatablesViewPage.setAaData(map);
            return datatablesViewPage;
        };*/
    @RequestMapping(value = "getAllJcb")
    @ResponseBody
    public DatatablesViewPage getJcbAll(@RequestParam("start")Integer start,
                                        @RequestParam("length")Integer length,
                                        @RequestParam("jcbname")String jcbname){

        List<Map> jcb = this.jcbaoMapper.getAll(start,length,jcbname);
        System.out.print(jcbname);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setAaData(jcb);
        Long l = this.jcbaoMapper.getAllCount(jcbname);
        datatablesViewPage.setiTotalRecords(l);
        datatablesViewPage.setiTotalDisplayRecords(l);
        return datatablesViewPage;
    }
    //*获取检测项目*//*
    @ResponseBody
    @RequestMapping(value = "getAllJcx")
    public DatatablesViewPage getJcxmById(@RequestParam("start")Integer start,
                                          @RequestParam("length")Integer length,
                                          @RequestParam("jcbid")String jcbid,
                                          @RequestParam("jcxmMc")String jcxmMc
    ){
        List<Map> jcx  = this.jcbaoMapper.getJcbByJcbAndJcxMc(start,length,jcbid,jcxmMc);
        Long l = this.jcbaoMapper.getJcbByJcbAndJcxMcNum(jcbid,jcxmMc);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setAaData(jcx);
        datatablesViewPage.setiTotalDisplayRecords(l);
        datatablesViewPage.setiTotalRecords(l);
        return datatablesViewPage;
    }
    @ResponseBody
    @RequestMapping(value = "addjcx")
    public DatatablesViewPage addJcx(@RequestBody JSONObject object ){
        JSONArray jcxmIds = object.getJSONArray("jcxmId");
        String jcbid = object.getString("jcbid");
        Map map = this.jcbaoMapper.findJcbinfo(jcbid);
        List<String> jcxs = this.jcbaoMapper.getAllJcxId(jcbid);
        //*删除原来对应关系*//*
        if (jcxs.size()>0){
            this.jcbaoMapper.deletejcx(jcxs,jcbid);
        }
        List<String> list = new ArrayList<String>();
        for (Object jcxmId : jcxmIds) {
            JSONObject o = (JSONObject) jcxmId;
            list.add(o.getString("jcxmId"));
        }
        list.addAll(jcxs);
        //*去除重复数据*//*
        HashSet h = new HashSet(list);
        list.clear();
        list.addAll(h);
        this.jcbaoMapper.addJcx(list,jcbid,map.get("jcbname").toString(),map.get("jcbdl").toString());
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        return  datatablesViewPage;
    }
    @ResponseBody
    @RequestMapping(value = "/addjcb")
    public String addJcb(String jcxmbname,String jcxmbdl){
        this.jcbaoMapper.addjcb(jcxmbname,jcxmbdl,UUID.randomUUID().toString());
        return "1";
    }
    @ResponseBody
    @RequestMapping(value = "/updatejcbName")
    public String updatejcbName(String jcbmc,String jcbid){
        this.jcbaoMapper.updatejcbName(jcbmc,jcbid);
        return "1";
    }
    @ResponseBody
    @RequestMapping(value = "deleteJcx")
    public String deleteJcx(@RequestBody JSONObject object){
        JSONArray jcxmIds = object.getJSONArray("jcxm");
        String jcbid = object.getString("jcbid");
        List<String> list = new ArrayList<String>();
        for (Object jcxmId : jcxmIds) {
            JSONObject o = (JSONObject) jcxmId;
            list.add(o.getString("jcxm"));
        }
        List<String> jcxs = this.jcbaoMapper.getAllJcxId(jcbid);
        //*删除原来对应关系*//*
        if (jcxs.size()>0){
            this.jcbaoMapper.deletejcx(list,jcbid);
        }
        return "1";
    }
    @ResponseBody
    @RequestMapping(value = "/getJcbInfo")
    public DatatablesViewPage getJcbInfo(@RequestParam("start")Integer start,
                                         @RequestParam("length")Integer length,
                                        @RequestParam("jcbname")String jcbname){
        List<Map> jcb = this.jcbaoMapper.getAll(start,length,jcbname);
        Long jcbCount = this.jcbaoMapper.getAllCount(jcbname);
        for (Map s:jcb){
            String jcbid = s.get("jcbid").toString();
            List<Map> jcx  = this.jcbaoMapper.getAllJcxNew(jcbid);
            String ZWMC_BM = "";
            for (Map s1:jcx){
                ZWMC_BM = ZWMC_BM+s1.get("ZWMC_BM").toString()+",";
            }
            s.put("ZWMC_BM",ZWMC_BM);
        }
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setiTotalDisplayRecords(jcbCount);
        datatablesViewPage.setiTotalRecords(jcbCount);
        datatablesViewPage.setAaData(jcb);
        return datatablesViewPage;
    }
    @ResponseBody
    @RequestMapping(value = "/insertJcx")
    public String insertJcx(String ypxx,String [] jcbid){
        JSONObject obj = JSONObject.parseObject(ypxx);
        JSONArray ypid =  obj.getJSONArray("ypxx");
        List<String> jcbids = Arrays.asList(jcbid);
        List<String> jcxlist = new ArrayList<>();
        HashSet jcx = new HashSet();
        for (String s:jcbids){
            List list = this.jcbaoMapper.getAllJcxId(s);
            jcx.addAll(list);
        }
        jcxlist.clear();
        jcxlist.addAll(jcx);
        for (Object jcxmId:ypid){
            String o = (String) jcxmId;
//            String wtid = this.jcbaoMapper.findWtidById(o);
//            this.jcbaoMapper.insertYpJcxmList(jcxlist,wtid);
            //样品制备 下添加检测项 下 导入检测包 不好用 ，这里 参数有问题 屏蔽了
            this.jcbaoMapper.insertYpJcxmList(jcxlist,o);
        }
        return "1";
    }

    /*导入Excel表中的数据*/
    @RequestMapping(value = "/downloadJcxmExcel")
    @OperateLog(describe = "loading.....")
    @ResponseBody
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importYqcgsq = "/ExcelModels/jcbmodel.xlsx";//导入摸板路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("jcbmodel.xlsx".getBytes("GBK"),"ISO-8859-1"));
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

    @RequestMapping(value = "/importJcxmbExcel")
    @ResponseBody
    public JSONObject importCgsqExcel(HttpServletRequest request, Model model) throws Exception {
        //获取上传的文件
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("upjcxmFile");
        InputStream in = file.getInputStream();
        String name=file.getOriginalFilename();
        jcbaoService.importjcbExcel(in,file,name);
        //数据导入
        in.close();
        JSONObject jo=new JSONObject();
        jo.put("success",true);
        return jo;
    }
    /*导出数据*/
    @RequestMapping(value = "/jcbDc")
    @ResponseBody
    public JSONObject daoChu(HttpServletRequest request, HttpServletResponse response)throws Exception{
        JSONObject jsonObject = new JSONObject();
        String jcbid = request.getParameter("jcbid");
        String[]jcbid1 = jcbid.split(",");
        if (jcbid1.length>0){
            //清除缓存
            response.reset();
            //创建Map
            Map<String,Object>map = new HashMap<>();
            //指定下载的文件名，浏览器gbk编码，需先用iso-8859-1解码，在用gbk编码
            response.setHeader("Content-Disposition","attachment;filename="+new String("检测项目包.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            //清除缓存
            response.setHeader("Pragma","no-cache");
            response.setHeader("Cache-Control","no-cache");
            response.setDateHeader("Expires",0);
            //引用XSSWorkbook
            XSSFWorkbook xssfWorkbook = null;
            xssfWorkbook = jcbaoService.exportjcbExcel(jcbid1);
            OutputStream outputStream;
            outputStream = response.getOutputStream();
            BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);
            bufferedOutputStream.flush();
            xssfWorkbook.write(bufferedOutputStream);
            bufferedOutputStream.close();
        }
        jsonObject.put("success",true);
        return jsonObject;
    }


    @ResponseBody
    @RequestMapping(value = "deleteJcb")
    public String deleteJcb(@RequestBody JSONObject object){

        JSONArray jcbIds = object.getJSONArray("jcb");
        List<String> list = new ArrayList<String>();
        for (Object jcbId : jcbIds) {
            JSONObject o = (JSONObject) jcbId;
            list.add(o.getString("jcbid"));
        }
        System.out.println("~~~");
        if(list.size()>0)
        {
            this.jcbaoMapper.deletejcb(list);
        }
        return "1";
    }
    //20190830添加新方法
    @ResponseBody
    @RequestMapping(value = "/updatejcbNameNew")
    public String updatejcbNameFc(HttpServletRequest request){
        Map cxtj = new HashMap();
        String jcbmc = request.getParameter("jcbmc");
        String jcxmNewDl = request.getParameter("jcxmNewDl");
        String jcbid = request.getParameter("jcbid");
        if (notNULL(jcbmc)) {
            cxtj.put("jcbmc", jcbmc);
        }
        if (notNULL(jcxmNewDl)) {
            cxtj.put("jcxmNewDl", jcxmNewDl);
        }
        if (notNULL(jcbid)) {
            cxtj.put("jcbid", jcbid);
        }
        this.jcbaoMapper.updatejcbNameNew(cxtj);
        return "1";
    }

    //通用
    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    //判空方法
    private String checkNull(Object obj)
    {
        return obj==null?" ":obj+" ";
    }


    //组装通用查询条件
    public Map getQueryTj(HttpServletRequest request) {
        String start = request.getParameter("start");
        String length = request.getParameter("length");

        Map cxtj = new HashMap();
        if (notNULL(start)) {
            cxtj.put("start", start);
        }

        if (notNULL(length)) {
            cxtj.put("length", length);
        }

        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        cxtj.put("zydm", zydm);
        return cxtj;
    }
}
